import { useState } from 'react';
import './OrderModal.css';

function OrderModal({ isOpen, onClose, onSubmit, cart, totalPrice }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phone, address, cart, totalPrice });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Оформлення замовлення</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Ваше ім'я" value={name} onChange={e => setName(e.target.value)} required />
          <input type="tel" placeholder="Номер телефону" value={phone} onChange={e => setPhone(e.target.value)} required />
          <input type="text" placeholder="Адреса доставки" value={address} onChange={e => setAddress(e.target.value)} required />
          <button type="submit" className="submit-order-btn">Підтвердити замовлення</button>
          <button type="button" onClick={onClose} className="cancel-order-btn">Скасувати</button>
        </form>
      </div>
    </div>
  );
}

export default OrderModal;

