'use client'

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
    product: ProductWithRelations;
    onAddPizza?: VoidFunction;
    onAddProduct?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onAddPizza: _onAddPizza, onAddProduct: _onAddProduct }) => {
    const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);

    const onAddPizza = async (productItemId: number, ingredients: number[]) => {
        try {
          addCartItem({
            productItemId,
            ingredients,
          })
          toast.success('Пицца добавлена в корзину!');
          _onAddPizza?.();
        } catch (error) {
          toast.error('Не удалось добавить пиццу в корзину!');
          console.error(error);
        }
      }
  
      const onAddProduct = () => {
        addCartItem({
          productItemId: firstItem.id,
        })
        toast.success('Товар добавлен в корзину!');
        _onAddProduct?.();
      }

      if(isPizzaForm) {
        return (
            <ChoosePizzaForm 
              imageUrl={product.imageUrl} 
              name={product.name} 
              ingredients={product.ingredients} 
              items={product.items} 
              onSubmit={onAddPizza}
              loading={loading}
            /> 
        )}

  return (
    <ChooseProductForm 
        imageUrl={product.imageUrl} 
        name={product.name}
        onSubmit={onAddProduct} 
        price={firstItem.price}
        loading={loading}
    />
  );
}