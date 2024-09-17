import React from "react"
import { Variant } from "../components/shared/group-variants"
import { PizzaSize, PizzaType } from "../constants/pizza"
import { useSet } from "react-use"
import { getAvailablePizzaType } from "../lib"
import { ProductItem } from "@prisma/client"

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredients: (id: number) => void;
  availableTypes: Variant[];
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20)
    const [type, setType] = React.useState<PizzaType>(1)

    const [selectedIngredients, { toggle: addIngredients }] = useSet(new Set<number>([]))
    const availableTypes = getAvailablePizzaType(items, size);

    const currentItemId = items.find(item => item.size === size && item.pizzaType === type)?.id

    React.useEffect(() => {
        const currentType = availableTypes?.find(item => Number(item.value) === type && !item.disabled)
        const availableType = availableTypes?.find(item => !item.disabled)
  
        if(!currentType && availableType) {
          setType(Number(availableType.value) as PizzaType)
        }
      }, [size])

      return {
        size,
        type,
        setSize,
        setType,
        selectedIngredients,
        addIngredients,
        availableTypes,
        currentItemId
      }
}