'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, pizzaSizes, PizzaType } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { Ingredients } from './ingredients';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    loading: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;   
  }

export const ChoosePizzaForm: React.FC<Props> = ({ name, items, imageUrl, ingredients, onSubmit, className, loading }) => {
  const { size, setSize, type, setType, selectedIngredients, addIngredients, availableTypes, currentItemId } = usePizzaOptions(items);
  const { totalPrice, textDetaills } = getPizzaDetails(size, type, items, ingredients, selectedIngredients);

    const handleClickAdd = () => {
      if(currentItemId) {
        onSubmit(currentItemId, Array.from(selectedIngredients));
      }
    }

  return (
    <div className={cn(className, 'flex flex-1')}>
        <PizzaImage imageUrl={imageUrl} size={size} />

        <div className="w-[490px] bg-[#fcfcfc] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />
            <p className="text-gray-400 mb-5">{textDetaills}</p>

            <div className='flex flex-col gap-4 mb-5'>
              <GroupVariants items={pizzaSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
              <GroupVariants items={availableTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
            </div>

            <div className="bg-[#f3f3f7] p-5 rounded-md h-[410px] overflow-auto scrollbar">
              <div className='grid grid-cols-3 gap-3'>
                {ingredients.map((ingredient) => (
                  <Ingredients 
                  key={ingredient.id} 
                  imageUrl={ingredient.imageUrl} 
                  name={ingredient.name} 
                  price={ingredient.price} 
                  active={selectedIngredients.has(ingredient.id)} 
                  onClick={() => addIngredients(ingredient.id)}/>
              ))}
              </div>
            </div>

            <Button
            loading={loading}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
            onClick={handleClickAdd}
            >
            Добавить в корзину за {totalPrice} ₽
            </Button>
        </div>
    </div>
  );
};