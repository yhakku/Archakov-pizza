import { ProductItem } from "@prisma/client";
import { pizzaTypes } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvailablePizzaType = (items: ProductItem[], size: number): Variant[] => {
    const filteredPizzasBySize = items.filter(item => item.size === size)
    
    return pizzaTypes.map((item) => ({ 
        name: item.name, 
        value: item.value, 
        disabled: !filteredPizzasBySize.some(pizza => Number(pizza.pizzaType) === Number(item.value))
    }));
}