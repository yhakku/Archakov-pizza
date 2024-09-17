import * as React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymenUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymenUrl }) => (
  <div>
    <h1>Заказ №{orderId}</h1>

    <p>
      Оплатите заказ на сумму <b>{totalAmount} ₽</b>. Перейдите по этой{' '}
      <a href={paymenUrl}> ссылке</a> для оплаты заказа.
    </p>
  </div>
);
