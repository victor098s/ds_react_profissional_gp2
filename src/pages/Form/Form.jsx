import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { orderSchema } from "../../schema";
import styles from "./Form.module.css";

const pickupTimes = [
  { value: "em até 15 minutos", label: "Em até 15 minutos" },
  { value: "12:00 — 12:30", label: "12:00 — 12:30" },
  { value: "15:00 — 15:30", label: "15:00 — 15:30" },
  { value: "17:00 — 17:30", label: "17:00 — 17:30" },
];

const Form = () => {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: { pickupTime: "" },
  });

  const onSubmit = () => {
    setEnviado(true);
    reset();
  };
  const campo = (nome) =>
    `${styles.input} ${errors[nome] ? styles.inputError : ""}`;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit, () => setEnviado(false))}
      noValidate
    >
      <label className={styles.label} htmlFor="name">
        Nome:
        <input
          className={campo("name")}
          type="text"
          id="name"
          placeholder="Digite o seu nome"
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </label>

      <label className={styles.label} htmlFor="email">
        E-mail:
        <input
          className={campo("email")}
          type="email"
          id="email"
          placeholder="Digite o seu e-mail"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </label>

      <label className={styles.label} htmlFor="phone">
        Telefone:
        <input
          className={campo("phone")}
          type="tel"
          id="phone"
          placeholder="(11) 99999-9999"
          aria-invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </label>

      <label className={styles.label} htmlFor="item">
        Produto:
        <input
          className={campo("item")}
          type="text"
          id="item"
          list="lista-produtos"
          placeholder="Clique ou digite..."
          aria-invalid={Boolean(errors.item)}
          {...register("item")}
        />
        {errors.item && (
          <span className={styles.error}>{errors.item.message}</span>
        )}
        <datalist id="lista-produtos">
          <option value="Latte Baunilha" />
          <option value="Cappuccino Bear" />
          <option value="Cold Brew Tônica" />
          <option value="Matcha Cloud" />
          <option value="Cookie de Chocolate" />
          <option value="Pão de Queijo" />
          <option value="Serra do Caparaó" />
          <option value="Mogiana Paulista" />
        </datalist>
      </label>

      <label className={styles.label} htmlFor="quantidade">
        Quantidade:
        <input
          className={campo("quantidade")}
          type="number"
          id="quantidade"
          min="1"
          placeholder="Digite a quantidade"
          aria-invalid={Boolean(errors.quantidade)}
          {...register("quantidade")}
        />
        {errors.quantidade && (
          <span className={styles.error}>{errors.quantidade.message}</span>
        )}
      </label>

      <label className={styles.label} htmlFor="pickupTime">
        Horário de retirada:
        <select
          className={`${campo("pickupTime")} ${styles.select}`}
          id="pickupTime"
          aria-invalid={Boolean(errors.pickupTime)}
          {...register("pickupTime")}
        >
          <option value="" disabled hidden>
            Escolha um horário
          </option>
          {pickupTimes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.pickupTime && (
          <span className={styles.error}>{errors.pickupTime.message}</span>
        )}
      </label>

      <input className={styles.submit} type="submit" value="Enviar" />
      {enviado && (
        <p className={styles.success}>Obrigado por comprar conosco ☺</p>
      )}
    </form>
  );
};

export default Form;
