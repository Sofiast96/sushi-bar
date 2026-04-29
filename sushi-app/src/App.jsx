import { useState } from 'react'
import './index.css'
import { supabase } from './supabaseClient' // Переконайся, що назва файлу збігається з твоєю (може бути просто supabase.js)

function App() {
  const [cart, setCart] = useState([])
  const [activeCategory, setActiveCategory] = useState("Роли")
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // 🌸 Оновлена база товарів з твоїми картинками
  const [products] = useState([
    // РОЛИ
    { id: 1, name: "Рол Філадельфія", category: "Роли", description: "300 грам / 8 шт", price: 499, oldPrice: 579, tag: "Hit", img: "https://rnr.ua/storage/2025/01/01/f8c77a05ce9307debbfbb849c1d597ed/conversions/19169359846924198-webp_wide.webp" },
    { id: 2, name: "Рол з тунцем", category: "Роли", description: "280 грам / 8 шт", price: 469, oldPrice: null, tag: "Hot", img: "https://dnipro.sushiboss.od.ua/image/cache/catalog/2025%20%D1%80%D0%BE%D0%BB/%20%D1%84%D0%B8%D0%BB%D0%B0%20%D1%81%20%D1%82%D1%83%D0%BD%D1%86%D0%BE%D0%BC%20%D0%BA%D0%BB%D0%B0%D1%81%D0%B8%D0%BA-700x700-product_thumb.png" },
    { id: 3, name: "Дракон мікс", category: "Роли", description: "320 грам / 8 шт", price: 619, oldPrice: null, tag: "Iconic", img: "https://proglot.kyiv.ua/wp-content/uploads/2025/01/66.jpg" },
    { id: 4, name: "Каліфорнія в ікрі", category: "Роли", description: "290 грам / 8 шт", price: 589, oldPrice: 689, tag: "Promo", img: "https://x100-venus-es-ua.gumlet.io/es-ua/products/0001-kaliforniya-z-lososem-v-ikri.png?&w=1200&h=660&format=webp&mode=fit&q=90" },
    { id: 5, name: "Чорний Дракон", category: "Роли", description: "310 грам / 8 шт", price: 650, oldPrice: null, tag: "Premium", img: "https://resto-presto.com.ua/image/cache/catalog/chernijdrakon-1000x667.jpg" },
    { id: 6, name: "Веган Макі", category: "Роли", description: "200 грам / 6 шт", price: 299, oldPrice: null, tag: "Vegan", img: "https://dostavochka.in.ua/upload/slava/sushizoom/Maki_Vegan.png" },
    
    // СЕТИ
    { id: 8, name: "Сет 'Сакура'", category: "Сети", description: "1200 грам / 32 шт", price: 1599, oldPrice: 1800, tag: "Sale", img: "https://x100-venus-es-ua.gumlet.io/es-ua/products/0001-set-fudzi.png?&w=1200&h=660&format=webp&mode=fit&q=90" },
    { id: 9, name: "Сет 'Дракони'", category: "Сети", description: "950 грам / 24 шт", price: 1299, oldPrice: null, tag: null, img: "https://omnomnom.dp.ua/image/cache/catalog/new_sets/dscf5083-500x500.jpg" },
    { id: 10, name: "Кілограм щастя", category: "Сети", description: "1000 грам / 40 шт", price: 1100, oldPrice: 1350, tag: "Hit", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5rMGYkUJJoZ7jHMS1TPdc1LlGYNQ0PnKzag&s" },
    
    // НАПОЇ
    { id: 12, name: "Лимонад Цитрус", category: "Напої", description: "0.5 л", price: 95, oldPrice: null, tag: null, img: "https://img.freepik.com/free-photo/refreshing-mojito-cocktail-with-lime-mint-sprinkled-with-sugar_84443-83887.jpg?semt=ais_hybrid&w=740&q=80" },
    { id: 13, name: "Матча Лате", category: "Напої", description: "0.4 л", price: 120, oldPrice: null, tag: "New", img: "https://api.papakava.ua/uploads/blogs/143/Ut3L1L9lA-q1fdVSYeA3l-ZptZje2rXl.jpg" },
    { id: 14, name: "Кока-Кола", category: "Напої", description: "0.5 л", price: 65, oldPrice: null, tag: null, img: "https://png.pngtree.com/thumb_back/fw800/background/20221020/pngtree-coca-cola-on-black-background-in-kuala-lumpur-photo-image_34310300.jpg" },
    { id: 15, name: "Мохіто", category: "Напої", description: "0.4 л", price: 110, oldPrice: null, tag: "Cool", img: "https://i.pinimg.com/736x/a6/12/0f/a6120fa39bad9ff61774736701c0d2af.jpg" },
  ])

  const handleBuy = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => setCart(prevCart => prevCart.filter(item => item.id !== id))
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const filteredProducts = products.filter(p => p.category === activeCategory)

  const handleCheckout = async () => {
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          items: cart,
          total_price: totalPrice 
        }
      ])

    if (error) {
      console.error("Помилка відправки:", error)
      // 👇 ТУТ МИ ПОБАЧИМО СПРАВЖНЮ ПРИЧИНУ
      alert("Помилка від бази: " + error.message) 
      return 
    }

    setIsCheckoutOpen(true)
    setCart([]) 
  }

  return (
        <div className="main-layout">
      {/* НОВЕ: верхнє меню */}
      <nav className="top-nav">
        <div className="logo">🌸 SAKURA</div>
        <div className="nav-links">
          {['Роли', 'Сети', 'Напої'].map(cat => (
            <button
              key={cat}
              className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'Роли' ? '🍣' : cat === 'Сети' ? '🍱' : '🥤'} {cat}
            </button>
          ))}
        </div>
      </nav>

      <main className="content">
        <header className="top-header">
          <div className="location">📍 Київ</div>
          <div className="cart-btn">🛒 Кошик ({totalItems}) - {totalPrice} грн</div>
        </header>

        <div className="promo-banner">
          <h2>Знижка -20% на всі сети у вихідні! 🎉</h2>
          <p>Скуштуй нашу новинку "Кілограм щастя" за супер-ціною.</p>
        </div>

        <section className="catalog">
          <h2 className="category-title">{activeCategory}</h2>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="card">
                {product.tag && <span className={`tag ${product.tag.toLowerCase()}`}>{product.tag}</span>}
               <img src={product.img} alt={product.name} className="image" />
                <div className="card-info">
                  <h3>{product.name}</h3>
                  <p className="desc">{product.description}</p>
                  <div className="card-footer">
                    <div className="price-block">
                      {product.oldPrice && <span className="old-price">{product.oldPrice} грн</span>}
                      <span className="price">{product.price} грн</span>
                    </div>
                    <button className="buy-button" onClick={() => handleBuy(product)}>Купити</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {cart.length > 0 && (
          <section className="cart-section">
            <h2>Ваше замовлення 🛍️</h2>
            <div className="cart-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-qty">x{item.quantity}</span>
                  <span className="cart-item-price">{item.price * item.quantity} грн</span>
                  <button className="delete-btn" onClick={() => removeFromCart(item.id)}>❌</button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Разом до сплати: <span className="total-highlight">{totalPrice} грн</span></h3>
              <button className="checkout-button" onClick={handleCheckout}>Оформити замовлення</button>
            </div>
          </section>
        )}

        {isCheckoutOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Дякуємо за замовлення! 🍣</h2>
              <p>Наш менеджер зв'яжеться з вами за 5 хвилин.</p>
              <button className="close-modal-btn" onClick={() => setIsCheckoutOpen(false)}>Повернутися до меню</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App