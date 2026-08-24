import { useState } from 'react'
import { FiMenu, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi'

const Header = ({ search, onSearch, cartCount, onCart }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <header className="site-header"><a className="brand" href="#inicio" onClick={closeMenu}><span>cb</span> cafébear</a><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <FiX /> : <FiMenu />}</button><nav className={menuOpen ? 'open' : ''}><a href="#inicio" onClick={closeMenu}>início</a><a href="#menu" onClick={closeMenu}>cardápio</a><a href="#sobre" onClick={closeMenu}>nossa casa</a><a href="#pedido" onClick={closeMenu}>peça agora</a></nav><div className="header-actions"><label className="search"><FiSearch /><input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="buscar" aria-label="Buscar no cardápio" /></label><button className="bag-button" onClick={onCart} aria-label="Abrir sacola"><FiShoppingBag />{cartCount > 0 && <span>{cartCount}</span>}</button></div></header>
}
export default Header
