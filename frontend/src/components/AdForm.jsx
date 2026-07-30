import { useState } from 'react';

export default function AdForm({ onCancel, onSubmitSuccess }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('venda');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAd = {
      title,
      category,
      type,
      price: type === 'doacao' ? 0 : Number(price),
      description: 'Anúncio universitário',
      imageUrl: ''
    };
    onSubmitSuccess(newAd);
  };

  return (
    <section className="form-section">
      <h2>Criar Anúncio</h2>
      <form className="ad-form" onSubmit={handleSubmit}>
        <label>Título do Item</label>
        <input
          type="text"
          placeholder="Ex: Livro de Física"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Categoria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecione...</option>
          <option value="Livros">Livros</option>
          <option value="Eletrônicos">Eletrônicos</option>
          <option value="Vestuário">Vestuário</option>
        </select>

        <label>Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="venda">Venda</option>
          <option value="doacao">Doação</option>
        </select>

        <label>Preço (R$)</label>
        <input
          type="number"
          placeholder="0.00 se for doação"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={type === 'doacao'}
          required={type === 'venda'}
        />

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Publicar Anúncio
          </button>
        </div>
      </form>
    </section>
  );
}