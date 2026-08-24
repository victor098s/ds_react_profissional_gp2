import { z } from "zod";

export const schema = z.object({
  nome: z.string().trim().min(3, "O nome deve conter ao menos 3 letras."),
  email: z.string().trim().email("Digite um e-mail valido. Ex.: nome@gmail.com."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  telefone: z
    .string()
    .refine((telefone) => telefone.replace(/\D/g, "").length >= 10, "Digite um telefone valido."),
  produto: z.string().trim().min(3, "O produto deve conter ao menos 3 letras."),
  quantidade: z.coerce
    .number()
    .int("A quantidade deve ser um numero inteiro.")
    .min(1, "A quantidade deve ser maior que 0."),
});
