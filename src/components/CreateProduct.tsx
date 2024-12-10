import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/productsSlice';
import { Link, useNavigate } from 'react-router-dom';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [temperament, setTemperament] = useState('');
  const [errors, setErrors] = useState<{ url?: string; name?: string; temperament?: string }>({});

  const validateForm = () => {
    const newErrors: { url?: string; name?: string; temperament?: string } = {};
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlPattern.test(url)) {
      newErrors.url = 'Введите корректный URL изображения.';
    }

    if (name.length < 2 || name.length > 30) {
      newErrors.name = 'Поле должно содержать от 2 до 30 символов.';
    }

    if (temperament.length < 2 || temperament.length > 30) {
      newErrors.temperament = 'Поле должно содержать от 2 до 30 символов.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newProduct = {
        id: Date.now().toString(),
        url,
        breeds: [{ name, temperament }],
        liked: false,
      };
      dispatch(addProduct(newProduct));
      navigate('/products');
    }
  };

  return (
    <div>
      <h2>Создать карточку</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL изображения:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          {errors.url && <div className="error-message">{errors.url}</div>}
        </div>
        <div>
          <label>Название породы:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div>
          <label>Темперамент:</label>
          <input
            type="text"
            value={temperament}
            onChange={(e) => setTemperament(e.target.value)}
            required
          />
          {errors.temperament && <div className="error-message">{errors.temperament}</div>}
        </div>
        <button type="submit">Создать карточку</button>
        <button type="button"><Link to="/products">Назад</Link></button>
      </form>
    </div>
  );
};

export default CreateProduct;