import { useMemo, useState } from "react";
import {
  FiArrowRight,
  FiChevronDown,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";
import Form from "./pages/Form/Form";

function App() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const categories = [
    "Todos",
    ...new Set(products.map(({ category }) => category)),
  ];
  const visibleProducts = useMemo(
    () =>
      products.filter(({ name, category }) => {
        const matchesCategory =
          activeCategory === "Todos" || category === activeCategory;
        const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [activeCategory, search],
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(({ id }) => id === product.id);
      return existing
        ? currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...currentCart, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} foi adicionado à sua sacola.`);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const updateQuantity = (id, direction) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + direction }
            : item,
        )
        .filter(({ quantity }) => quantity > 0),
    );
  };

  return (
    <div className="app-shell">
      <Header
        search={search}
        onSearch={setSearch}
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
      />

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">café feito com intenção</p>
            <h1>
              Seu momento gostoso <em>começa aqui.</em>
            </h1>
            <p className="hero-description">
              Bebidas especiais, grãos selecionados e um pouco mais de calma no
              seu dia.
            </p>
            <a className="button button-dark" href="#menu">
              explorar cardápio <FiArrowRight />
            </a>
          </div>
          <div className="hero-visual">
            <div className="hero-stamp">
              desde
              <br />
              <strong>2024</strong>
            </div>
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=85"
              alt="Café coado sendo servido em uma xícara"
            />
            <p>Feito do seu jeito, no seu ritmo.</p>
          </div>
        </section>

        <section className="intro-band" id="sobre">
          <p>café é pausa, encontro, cuidado</p>
          <h2>Uma casa de café para acompanhar os seus dias.</h2>
          <a href="#pedido">
            conheça o CaféBear <FiArrowRight />
          </a>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">nosso cardápio</p>
              <h2>Escolha seu favorito.</h2>
            </div>
            <p>
              Preparos clássicos, receitas da casa e opções para cada vontade.
            </p>
          </div>
          <div className="filters" aria-label="Filtrar cardápio">
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
              />
            ))}
          </div>
          {visibleProducts.length === 0 && (
            <p className="empty-state">
              Nenhum item encontrado. Tente outra busca.
            </p>
          )}
        </section>

        <section className="feature" aria-label="CaféBear em casa">
          <div className="feature-photo">
            <img
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=85"
              alt="Mesa com café e doces"
            />
          </div>
          <div className="feature-copy">
            <p className="eyebrow">leve para casa</p>
            <h2>Grãos que contam histórias.</h2>
            <p>
              Torra fresca, produtores que a gente conhece e sabores para
              descobrir sem pressa.
            </p>
            <button
              className="text-button"
              onClick={() => {
                setActiveCategory("Grãos");
                document
                  .querySelector("#menu")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              ver cafés em grãos <FiArrowRight />
            </button>
          </div>
        </section>

        <section className="order-section" id="pedido">
          <div className="order-copy">
            <p className="eyebrow">retire sem fila</p>
            <h2>Seu café esperando por você.</h2>
            <p>
              Faça o pedido para retirada e escolha o melhor horário. Nós
              cuidamos do resto.
            </p>
            <div className="order-details">
              <span>01</span>
              <p>
                <strong>Peça com carinho</strong>
                <br />
                Monte sua escolha no formulário.
              </p>
              <span>02</span>
              <p>
                <strong>Busque na loja</strong>
                <br />
                Fresquinho e pronto no horário.
              </p>
            </div>
          </div>

          <Form />
        </section>
      </main>

      <Footer />
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
      {cartOpen && (
        <aside className="cart-panel" aria-label="Sua sacola">
          <div className="cart-heading">
            <h2>Sua sacola</h2>
            <button
              onClick={() => setCartOpen(false)}
              aria-label="Fechar sacola"
            >
              <FiX />
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="cart-empty">
              <FiShoppingBag />
              <p>Ainda está vazia.</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  document
                    .querySelector("#menu")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                ver cardápio
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt="" />
                    <div>
                      <strong>{item.name}</strong>
                      <p>R$ {item.price.toFixed(2).replace(".", ",")}</p>
                      <div className="quantity">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <p>
                  Subtotal{" "}
                  <strong>R$ {cartTotal.toFixed(2).replace(".", ",")}</strong>
                </p>
                <a
                  className="button button-dark"
                  href="#pedido"
                  onClick={() => setCartOpen(false)}
                >
                  continuar pedido <FiChevronDown />
                </a>
              </div>
            </>
          )}
        </aside>
      )}
      {cartOpen && (
        <button
          className="overlay"
          onClick={() => setCartOpen(false)}
          aria-label="Fechar sacola"
        />
      )}
    </div>
  );
}

export default App;
