import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMenuDto, UpdateMenuDto } from './dto/create-menu.dto';
import { PrismaService } from 'src/prisma.service';
import { Response } from 'express';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(userId: string) {
    try {
      const menus = await this.prisma.menus.findMany({
        where: {
          user_id: userId,
        },
        include: {
          recipe: {
            select: {
              id: true,
              title: true,
              image: true,
              calories: true,
            },
          },
        },
      });

      if (!menus.length) {
        throw new NotFoundException("Can't found any menus");
      }
      return menus;
    } catch (error) {
      console.log('🚀 ~ MenusService ~ findAll ~ error:', error);
      throw (
        error || new BadRequestException('There was an error finding menus')
      );
    }
  }

  async findOne(userId: string, recipeId: string) {
    try {
      const menu = await this.prisma.menus.findFirst({
        where: {
          recipe_id: recipeId,
          user_id: userId,
        },
        include: {
          recipe: {
            select: {
              id: true,
              title: true,
              image: true,
              calories: true,
            },
          },
        },
      });

      if (!menu?.id) {
        throw new NotFoundException('No menus found');
      }

      return menu;
    } catch (error) {
      console.log('🚀 ~ MenusService ~ findOne ~ error:', error);
      throw (
        error || new BadRequestException('There was an error finding menus')
      );
    }
  }

  async create(res: Response, userId: string, createMenuDto: CreateMenuDto) {
    const { meal, date } = createMenuDto;
    const existingMenu = await this.prisma.menus.findFirst({
      where: {
        user_id: userId,
        recipe_id: createMenuDto.recipe,
        meal,
        date,
      },
    });
    if (existingMenu) {
      throw new BadRequestException(
        `Menu already exists at this date. Kindly choose another date, meal or recipe or update the existing menu. #id: ${existingMenu.id}`,
      );
    }

    try {
      const menu = await this.prisma.menus.create({
        data: {
          meal,
          date,
          user: {
            connect: {
              id: userId,
            },
          },
          recipe: {
            connect: {
              id: createMenuDto.recipe,
            },
          },
        },
      });
      return res.status(201).json({ message: 'Menu added', menu });
    } catch (error) {
      console.log('🚀 ~ MenusService ~ create ~ error:', error);
      throw (
        error || new BadRequestException('There was an error creating menus')
      );
    }
  }

  async update(userId: string, updateMenuDto: UpdateMenuDto, recipeId: string) {
    try {
      if (!updateMenuDto.date) {
        throw new BadRequestException('No data provided for required date');
      }

      const existingMenu = await this.prisma.menus.findFirst({
        where: {
          user_id: userId,
          recipe_id: recipeId,
          date: updateMenuDto.date,
        },
      });
      if (!existingMenu) {
        throw new NotFoundException('No menus found');
      }

      const { meal, date } = updateMenuDto;
      if (!meal && !date) {
        throw new BadRequestException('No data provided to update');
      }

      await this.prisma.menus.update({
        where: {
          id: existingMenu.id,
        },
        data: {
          ...updateMenuDto,
        },
      });
      return { message: `The menu was updated`, id: existingMenu.id };
    } catch (error) {
      console.log('🚀 ~ MenusService ~ update ~ error:', error);
      throw (
        error || new BadRequestException('There was an error updating menus')
      );
    }
  }

  async delete(userId: string, recipeId: string) {
    try {
      const existingMenu = await this.prisma.menus.findFirst({
        where: {
          user_id: userId,
          recipe_id: recipeId,
        },
      });

      if (!existingMenu) {
        throw new NotFoundException('No menus found');
      }

      await this.prisma.menus.delete({
        where: {
          id: existingMenu.id,
        },
      });
      return `The menu was removed`;
    } catch (error) {
      console.log('🚀 ~ MenusService ~ delete ~ error:', error);
      throw (
        error || new BadRequestException('There was an error deleting menus')
      );
    }
  }
}
