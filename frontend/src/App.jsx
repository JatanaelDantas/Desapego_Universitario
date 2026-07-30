import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [currentView, setCurrentView] = useState('home');

  // Sistema de Toast Flutuante (substitui o alert)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000); // Some sozinho após 4 segundos
  };

  // Estados para o formulário (tudo padronizado em minúsculo pro banco aceitar!)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('venda');
  const [price, setPrice] = useState('');

  // 1. BUSCAR ANÚNCIOS DA API
  const fetchAds = useCallback(async (categoriaAtual) => {
    try {
      const url = categoriaAtual === 'Todos' 
        ? 'https://desapego-universitario-poy6.onrender.com/ads' 
        : `https://desapego-universitario-poy6.onrender.com/ads?category=${categoriaAtual}`;

      const response = await fetch(url);
      const data = await response.json();
      setAds(data);
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error);
      showToast('Erro ao carregar os anúncios da nuvem.', 'error');
    }
  }, []);

  useEffect(() => {
    fetchAds(filter);
  }, [filter, fetchAds]);

  // 2. CADASTRAR NOVO ANÚNCIO (POST /ads)
  const handleCreateAd = async (e) => {
    e.preventDefault();

    const newAd = {
      title,
      category,
      type, // Agora envia 'venda' ou 'doacao' em minúsculo perfeitamente
      price: type === 'doacao' ? 0 : Number(price),
      description: 'Anúncio universitário',
      imageUrl: ''
    };

    try {
      const response = await fetch('https://desapego-universitario-poy6.onrender.com/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd)
      });

      if (response.ok) {
        showToast('🎉 Anúncio publicado com sucesso!', 'success');
        setTitle('');
        setCategory('');
        setPrice('');
        fetchAds(filter);
        setCurrentView('home');
      } else {
        const errorData = await response.json();
        showToast(`Erro: ${errorData.error || 'Verifique os dados informados'}`, 'error');
      }
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
      showToast('Erro de conexão com o servidor.', 'error');
    }
  };

  return (
    <div className="landing-container">
      {/* Toast Notificador Flutuante */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '16px 24px',
          backgroundColor: toast.type === 'success' ? '#10B981' : '#EF4444',
          color: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
          fontWeight: 'bold',
          zIndex: 9999,
          transition: 'all 0.3s ease'
        }}>
          {toast.message}
        </div>
      )}

      <nav className="app-nav">
        <h2 onClick={() => setCurrentView('home')} style={{cursor: 'pointer'}}>♻️ VortexApp</h2>
        {currentView === 'home' && (
          <button className="btn-primary" onClick={() => setCurrentView('form')}>
            + Novo Anúncio
          </button>
        )}
      </nav>

      {currentView === 'home' ? (
        <>
          <header className="hero-section">
            <h1>Desapego Universitário</h1>
            <p>A economia circular do nosso campus. Doe o que não usa, compre o que precisa por menos.</p>
          </header>

          <section className="stats-section">
            <div className="stat-card"><h3>+500</h3><p>Alunos</p></div>
            <div className="stat-card"><h3>{ads.length}</h3><p>Itens Listados</p></div>
            <div className="stat-card"><h3>R$ 5k</h3><p>Economizados</p></div>
          </section>

          <section className="showcase-section">
            <div className="filters">
              {['Todos', 'Livros', 'Eletrônicos', 'Vestuário'].map(cat => (
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
                    <div className="ad-image">
                      {ad.category === 'Livros' ? '📚' : ad.category === 'Eletrônicos' ? '🧮' : '🥼'}
                    </div>
                    <h4>{ad.title}</h4>
                    <span className="ad-badge" style={{ textTransform: 'capitalize' }}>{ad.type}</span>
                    <p className="ad-price">
                      {ad.type === 'doacao' ? 'Grátis' : `R$ ${Number(ad.price).toFixed(2)}`}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </>
      ) : (
        <section className="form-section">
          <h2>Criar Anúncio</h2>
          <form className="ad-form" onSubmit={handleCreateAd}>
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
              <button type="button" className="btn-secondary" onClick={() => setCurrentView('home')}>Cancelar</button>
              <button type="submit" className="btn-primary">Publicar Anúncio</button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}

export default App;