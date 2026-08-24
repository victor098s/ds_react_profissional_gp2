import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../../schema";
import styles from "./Form.module.css";

const Form = () => {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = () => setEnviado(true);
  const campo = (nome) => `${styles.input} ${errors[nome] ? styles.inputError : ""}`;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, () => setEnviado(false))} noValidate>
        <label className={styles.label} htmlFor="nome">
          Nome:
          <input className={campo("nome")} type="text" id="nome" placeholder="Digite o seu nome" aria-invalid={Boolean(errors.nome)} {...register("nome")} />
          {errors.nome && <span className={styles.error}>{errors.nome.message}</span>}
        </label>

        <label className={styles.label} htmlFor="email">
          E-mail:
          <input className={campo("email")} type="email" id="email" placeholder="Digite o seu e-mail" aria-invalid={Boolean(errors.email)} {...register("email")} />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </label>

        <label className={styles.label} htmlFor="senha">
          Senha:
          <input className={campo("senha")} type="password" id="senha" placeholder="Digite a senha" aria-invalid={Boolean(errors.senha)} {...register("senha")} />
          {errors.senha && <span className={styles.error}>{errors.senha.message}</span>}
        </label>

        <label className={styles.label} htmlFor="telefone">
          Telefone:
          <input className={campo("telefone")} type="tel" id="telefone" placeholder="(11) 99999-9999" aria-invalid={Boolean(errors.telefone)} {...register("telefone")} />
          {errors.telefone && <span className={styles.error}>{errors.telefone.message}</span>}
        </label>

        <label className={styles.label} htmlFor="produto">
          Produto:
          <input className={campo("produto")} type="text" id="produto" list="lista-produtos" placeholder="Clique ou digite..." aria-invalid={Boolean(errors.produto)} {...register("produto")} />
          {errors.produto && <span className={styles.error}>{errors.produto.message}</span>}
          <datalist id="lista-produtos">
            <option value="Notebook Dell Inspiron" />
            <option value="Mouse Sem Fio Logitech" />
            <option value="Teclado Mecanico RGB" />
            <option value="Monitor Ultrawide 29" />
            <option value="Fone de Ouvido Bluetooth" />
          </datalist>
        </label>

        <label className={styles.label} htmlFor="quantidade">
          Quantidade:
          <input className={campo("quantidade")} type="number" id="quantidade" min="1" placeholder="Digite a quantidade" aria-invalid={Boolean(errors.quantidade)} {...register("quantidade")} />
          {errors.quantidade && <span className={styles.error}>{errors.quantidade.message}</span>}
        </label>

        <input className={styles.submit} type="submit" value="Enviar" />
        {enviado && <p className={styles.success}>Formulario enviado com sucesso!</p>}
      </form>
    </div>
  );
};

export default Form;
