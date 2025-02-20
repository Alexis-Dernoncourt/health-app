import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {COLORS} from '../../lib/constants';
import Input from '../Form/Input';
import {Button} from 'react-native-paper';

const IngredientsForm = ({
  itemId,
  setIngredientArray,
  setIngredients,
}: {
  itemId: number;
  setIngredientArray: React.Dispatch<React.SetStateAction<number[]>>;
  setIngredients: React.Dispatch<
    React.SetStateAction<
      {id: string; name: string; quantity: string; unit: string}[]
    >
  >;
}) => {
  const [ingredient, setIngredient] = React.useState('');
  const [ingredientEdited, setIngredientEdited] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [quantityEdited, setQuantityEdited] = React.useState('');
  const [unite, setUnite] = React.useState('');
  const [uniteEdited, setUniteEdited] = React.useState('');

  const updateIngredients = useCallback(
    (action = '') =>
      setIngredients(prev => {
        // TODO: refactor to set ingredients with new value edited (filter)
        if (prev?.some(item => item.id === itemId.toString())) {
          if (action === 'delete') {
            return prev.filter(item => item.id !== itemId.toString());
          }
          return prev.map(item => {
            if (item.id === itemId.toString()) {
              return {
                ...item,
                name: ingredientEdited,
                quantity: quantityEdited,
                unit: uniteEdited,
              };
            } else {
              return item;
            }
          });
        } else {
          if (!ingredientEdited || !quantityEdited || !uniteEdited) {
            return [];
          }
          return [
            ...prev,
            {
              id: itemId.toString(),
              name: ingredientEdited,
              quantity: quantityEdited,
              unit: uniteEdited,
            },
          ];
        }
      }),
    [itemId, setIngredients, ingredientEdited, quantityEdited, uniteEdited],
  );

  useEffect(() => {
    if (ingredientEdited && quantityEdited && uniteEdited) {
      updateIngredients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientEdited, quantityEdited, uniteEdited]);

  return (
    <View>
      <View style={styles.groupWrapper}>
        <Input
          label="Ingrédient"
          keyboardType="default"
          value={ingredient}
          // error={emailErrorText.length > 0}
          style={styles.ingredientInput}
          onChangeText={(val: string) => setIngredient(val)}
          onEndEditing={e => {
            setIngredientEdited(e.nativeEvent.text);
          }}
        />
        {/* {title->error && (
            <Text style={styles.errorText}>{titleErrorText}</Text>
            )} */}
        <Input
          label="Quantité"
          keyboardType="number-pad"
          value={quantity}
          // error={emailErrorText.length > 0}
          style={styles.quantityInput}
          onChangeText={(val: string) => setQuantity(val)}
          onEndEditing={e => {
            setQuantityEdited(e.nativeEvent.text);
          }}
        />
        {/* {title->error && (
            <Text style={styles.errorText}>{titleErrorText}</Text>
            )} */}
        <Input
          label="Unité"
          keyboardType="default"
          value={unite}
          // error={emailErrorText.length > 0}
          style={styles.quantityInput}
          onChangeText={(val: string) => setUnite(val)}
          onEndEditing={e => {
            setUniteEdited(e.nativeEvent.text);
          }}
        />
        <Button
          compact={true}
          contentStyle={styles.removeButtonContent}
          style={styles.removeButton}
          labelStyle={styles.removeLabel}
          onPress={() => {
            setIngredientArray(prev =>
              prev.filter(prevItem => prevItem !== itemId),
            );
            updateIngredients('delete');
          }}>
          x
        </Button>
      </View>
    </View>
  );
};

export default IngredientsForm;

const styles = StyleSheet.create({
  groupWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    marginTop: 20,
  },
  ingredientInput: {
    width: '45%',
  },
  quantityInput: {
    width: '20%',
  },
  unitListInput: {
    width: '20%',
  },
  removeButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    justifyContent: 'center',
    minWidth: 10,
    width: 25,
    height: 25,
    backgroundColor: COLORS.red,
    borderRadius: 100,
  },
  removeLabel: {
    lineHeight: 20,
    fontSize: 20,
    marginHorizontal: 2,
    marginVertical: 2,
    color: COLORS.white,
  },
});
