'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <div className="relative w-full">
      <AddressSuggestions
        token="cc850b5bebe46d92eca87e23c529d289d64b1407"
        onChange={(data) => onChange?.(data?.value)}
        inputProps={{
          className:
            'flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10 text-md',
          placeholder: 'Ваш адрес',
        }}
        suggestionsClassName="grid absolute left-0 bottom-full mb-1 z-10 bg-white border border-gray-300 rounded-lg w-full"
        suggestionClassName="flex align-items-left p-2 hover:bg-[#fefbf8] cursor-pointer"
        highlightClassName="bg-[#feeedf]"
      />
    </div>
  );
};