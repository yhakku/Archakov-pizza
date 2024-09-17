import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';
import { Skeleton } from '../ui/skeleton';

interface Props {
    sumbitting: boolean;
    totalAmount: number;
    loading?: boolean;
    className?: string;
}

const VAT = 5;
const DELIVERY_PRICE = 99;

export const CheckoutSidebar: React.FC<Props> = ({ sumbitting, totalAmount, loading, className }) => {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;
    const zeroPrice = 0;

  return (
    <WhiteBlock className="p-6 sticky top-4">
        <div className="flex flex-col gap-1">
            <span className="text-xl">Итого</span>
            {loading ? <Skeleton className='w-48 h-10'/> : <span className="h-10 text-3xl font-extrabold">{totalAmount === 0 ? zeroPrice : totalPrice} ₽</span>}
        </div>
        <CheckoutItemDetails title={
            <div className="flex items-center">
                <Package size={16} className="mr-2 text-gray-300" />
                Корзина:
            </div>
        } value={loading ? <Skeleton className='w-20 h-6'/> : `${totalAmount} ₽`} />
        <CheckoutItemDetails title={
            <div className="flex items-center">
                <Percent  size={16} className="mr-2 text-gray-300" />
                Работа сервиса:
            </div>
        } value={loading ? <Skeleton className='w-20 h-6'/> : `${vatPrice} ₽`} />
        {totalAmount === 0 ? 
        <CheckoutItemDetails title={
            <div className="flex items-center">
                <Truck size={16} className="mr-2 text-gray-300" />
                Доставка:
            </div>
        } value={loading ? <Skeleton className='w-20 h-6'/> : "0 ₽"} /> : 
        <CheckoutItemDetails title={
            <div className="flex items-center">
                <Truck size={16} className="mr-2 text-gray-300" />
                Доставка:
            </div>
        } value={loading ? <Skeleton className='w-20 h-6'/> : `${DELIVERY_PRICE} ₽`} />}
        <Button loading={loading} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
            Оформить заказ
            <ArrowRight className="w-5 ml-2" />
        </Button>
    </WhiteBlock>
  );
};