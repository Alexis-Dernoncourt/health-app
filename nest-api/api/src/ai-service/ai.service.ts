import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  GenerateContentParameters,
  GenerateContentResponse,
  GoogleGenAI,
} from '@google/genai';

@Injectable()
export class AiService {
  private model: (
    params: GenerateContentParameters,
  ) => Promise<GenerateContentResponse>;

  constructor() {
    const API_KEY = process.env.GEMINI_API_KEY as string;
    const genAI = new GoogleGenAI({ apiKey: API_KEY });
    this.model = genAI.models.generateContent;
  }

  async analyzeRecipe(base64Image: string) {
    try {
      if (!base64Image) {
        throw new UserFriendlyError('Aucune image reçue.');
      }

      const result = await this.model({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Analyse cette image de recette et renvoie uniquement un JSON structuré avec les champs suivants :
                  {
                    "title": string,
                    "description": string,
                    "ingredients": string,
                    "steps": string[],
                    "prep_time": string,
                    "cook_time": string,
                    "servings": string,
                    "calories": string
                    "image": base64
                  }
                  Si une information manque, laisse le champ vide.
                  NE RAJOUTE AUCUN COMMENTAIRE, SEULEMENT LE JSON.

                  Si les ingrédients sont dans un bloc, identifie-les clairement.
                  Si le titre est en majuscule, convertis-le en minuscule (avec une majuscule au début).
                  Les ingrédients doivent apparaitre dans une phrase, séparés par une virgule.
                  Chaque étape de préparation doit être une phrase dans un tableau.
                  Si la recette n'a pas de description, essaie de générer une description simple de maximum 200 caractères via le titre de la recette ou laisse le champ vide.
                  Si la recette n'a pas de temps de cuisson, laisse le champ cook_time vide.
                  Si la recette n'a pas de temps de préparation, laisse le champ prep_time vide.
                  Si la recette n'a pas de portions par personne, laisse le champ servings vide.
                  Si la recette n'a pas de classement de calories, essaie d'estimer les calories de la recette en kcal pour 100 grammes ou laisse le champ vide.
                  Essaie d'extraire l'image de la recette et renvoie uniquement le base64 de l'image ou laisse le champ image vide.`,
              },
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: base64Image,
                },
              },
            ],
          },
        ],
      });

      if (!result || !result.text) {
        throw new Error('Impossible de structurer la recette');
      }
      const textResponse = result.text.trim();

      // Nettoyage (Gemini renvoie parfois des ```json ... ```)
      const cleaned = textResponse
        ?.replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const jsonResponse = JSON.parse(cleaned);

      if (
        !jsonResponse.title &&
        (!jsonResponse.ingredients || jsonResponse.ingredients.length === 0)
      ) {
        throw new UserFriendlyError(
          "Je n'ai pas reconnu de recette sur cette image. Vérifie qu'il s'agit bien d'une page de recette.",
        );
      }

      return jsonResponse;
    } catch (error: any) {
      if (error instanceof UserFriendlyError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error.message?.includes('API key')) {
        throw new HttpException(
          'Problème de configuration serveur : clé API Gemini invalide.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (
        error.message?.includes('quota') ||
        error.message?.includes('billing')
      ) {
        throw new HttpException(
          "Le quota d'utilisation de l’IA est atteint. Réessaie plus tard.",
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      if (
        error.message?.includes('network') ||
        error.message?.includes('503')
      ) {
        throw new HttpException(
          'Impossible de contacter le service IA. Vérifie la connexion réseau.',
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      console.error('Erreur Gemini:', error);
      throw new HttpException(
        'Une erreur inattendue est survenue. Réessaie plus tard.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

class UserFriendlyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserFriendlyError';
  }
}
