import { z } from 'zod'

export const orderSchema = z.object({
  name: z.string().trim().min(3, 'Digite um nome com pelo menos 3 caracteres.'),
  email: z.string().trim().email('Informe um e-mail válido.'),
  phone: z.string().trim().min(10, 'Digite um telefone válido com DDD.'),
  item: z.string().min(1, 'Escolha um item do cardápio.'),
  pickupTime: z.string().min(1, 'Selecione um horário para retirada.'),
  quantidade: z.coerce
    .number()
    .int("A quantidade deve ser um numero inteiro.")
    .min(1, "A quantidade deve ser maior que 0."),
});
