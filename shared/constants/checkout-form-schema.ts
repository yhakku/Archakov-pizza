import {z} from 'zod'

export const CheckoutFormSchema = z.object({
    firstName: z.string().min(2, {message: 'Имя должно содержать не менее 2 букв'}),
    lastName: z.string().min(2, {message: 'Фамилия должна содержать не менее 2 букв'}),
    email: z.string().email({message: 'Некорректная почта'}),
    phone: z.string().min(11, {message: 'Телефон должен содержать не менее 11 цифр'}),
    adress: z.string().min(5, {message: 'Введите корректный адрес'}),
    comment: z.string().optional()
})

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>