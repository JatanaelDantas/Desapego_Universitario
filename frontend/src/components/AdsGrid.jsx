// frontend/src/components/AdsGrid.jsx
export default function AdsGrid({ ads, filter, setFilter }) {
  const categories = ['Todos', 'Livros', 'Eletrônicos', 'Vestuário'];

  const getCategoryIcon = (category) => {
    if (category === 'Livros') return '📚';
    if (category === 'Eletrônicos') return '🧮';
    return '🥼';
  };

  return (
    <section className="showcase-section">
      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? 'active-filter' : 'filter-btn'}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="ads-grid">
        {ads.length === 0 ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px' }}>
            Nenhum anúncio encontrado. Seja o primeiro a anunciar!
          </p>
        ) : (
          ads.map(ad => (
            <div key={ad.id} className="ad-card">
              <div className="ad-image">{getCategoryIcon(ad.category)}</div>
              <h4>{ad.title}</h4>
              <span className="ad-badge" style={{ textTransform: 'capitalize' }}>
                {ad.type === 'doacao' ? 'Doação' : 'Venda'}
              </span>
              <p className="ad-price">
                {ad.type === 'doacao' ? 'Grátis' : `R$ ${Number(ad.price).toFixed(2)}`}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}