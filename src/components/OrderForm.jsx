import { useState } from 'react'
import { FiCheck, FiSend } from 'react-icons/fi'
import { orderSchema } from '../schema'

const initialValues = { name: '', email: '', phone: '', item: '', pickupTime: '' }
const OrderForm = ({ products, cart, onSuccess }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const suggestedItem = cart[0]?.name || ''
  const updateField = ({ target: { name, value } }) => { setValues((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: '' })); setSubmitted(false) }
  const submitOrder = (event) => { event.preventDefault(); const result = orderSchema.safeParse(values); if (!result.success) { const fieldErrors = result.error.issues.reduce((acc, issue) => ({ ...acc, [issue.path[0]]: issue.message }), {}); setErrors(fieldErrors); return } setErrors({}); setSubmitted(true); setValues(initialValues); onSuccess() }
  return <form className="order-form" onSubmit={submitOrder} noValidate>{submitted && <div className="success"><FiCheck /> Pedido enviado! Vamos preparar tudo.</div>}<div className="form-grid"><label>seu nome<input name="name" value={values.name} onChange={updateField} placeholder="Como podemos chamar você?" />{errors.name && <small>{errors.name}</small>}</label><label>e-mail<input name="email" type="email" value={values.email} onChange={updateField} placeholder="voce@email.com" />{errors.email && <small>{errors.email}</small>}</label><label>telefone<input name="phone" value={values.phone} onChange={updateField} placeholder="(11) 99999-9999" />{errors.phone && <small>{errors.phone}</small>}</label><label>o que vai hoje?<select name="item" value={values.item} onChange={updateField}><option value="">Selecione seu favorito</option>{suggestedItem && <option value={suggestedItem}>★ {suggestedItem} (na sacola)</option>}{products.map(({ id, name }) => <option key={id} value={name}>{name}</option>)}</select>{errors.item && <small>{errors.item}</small>}</label><label className="full">horário de retirada<select name="pickupTime" value={values.pickupTime} onChange={updateField}><option value="">Escolha um horário</option><option>em até 15 minutos</option><option>12:00 — 12:30</option><option>15:00 — 15:30</option><option>17:00 — 17:30</option></select>{errors.pickupTime && <small>{errors.pickupTime}</small>}</label></div><button className="button button-light" type="submit">enviar pedido <FiSend /></button></form>
}
export default OrderForm
