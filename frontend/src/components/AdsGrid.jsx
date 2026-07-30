export default function AdsGrid({ ads, filter, setFilter }) {
  const categories = ['Todos', 'Livros', 'Eletrônicos', 'Vestuário'];


  const getCategoryIcon = (category) => {
    if (!category) return '/roupas.png';
    const cat = category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    if (cat.includes('livro')) return '/livros.png';
    if (cat.includes('eletronico')) return '/eletronicos.png';
    
    return '/roupas.png';
  };

  return (
    <section className="showcase-section">
      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
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
              <div className="ad-image">
                <img
                  src={getCategoryIcon(ad.category)}
                  alt={ad.category}
                  style={{ width: '56px', height: '56px', objectFit: 'contain' }}
                />
              </div>
              <h4>{ad.title}</h4>
              <span className="ad-badge">
                {ad.type === 'doacao' ? 'Doação' : 'Venda'}
              </span>
              
              <p className="ad-price">
                {ad.type === 'doacao' ? 'Grátis' : `R$ ${Number(ad.price).toFixed(2)}`}
              </p>

              <button 
                type="button"
                className="btn-secondary" 
                style={{ width: '100%', marginTop: '12px', fontSize: '0.85rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Você demonstrou interesse em: "${ad.title}". A negociação ocorre presencialmente no campus!`);
                }}
              >
                {ad.type === 'doacao' ? 'Quero receber' : 'Tenho interesse'}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}