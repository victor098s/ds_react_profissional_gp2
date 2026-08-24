import { FiPlus } from "react-icons/fi";

const ProductCard = ({
  product: { name, price, description, image },
  onAdd,
  product,
}) => (
  <article className="product-card">
    <img src={image} alt={name} />
    <div className="card-content">
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="card-bottom">
        <strong>R$ {price.toFixed(2).replace(".", ",")}</strong>
        <button onClick={() => onAdd(product)} aria-label={`Adicionar ${name}`}>
          <FiPlus />
        </button>
      </div>
    </div>
  </article>
);
export default ProductCard;
