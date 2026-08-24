import { z } from "zod";

export const schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),

  email: z.string().email("Digite um e-mail válido"),

  idade: z

    .number({ invalid_type_error: "A idade deve ser maior que um número" })
    .min(16, "A idade mínima é 16 anos."),

  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),

  telefone: z.string().min(10, "Digite um número de telefone válido."),
});
