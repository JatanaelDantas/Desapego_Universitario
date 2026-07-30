import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [currentView, setCurrentView] = useState('home');

  // Estados para o formulário
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('Venda');
  const [price, setPrice] = useState('');

  // 1. BUSCAR ANÚNCIOS DA API JÁ FILTRADOS (GET /ads?category=...)
  const fetchAds = useCallback(async (categoriaAtual) => {
    try {
      // Se for "Todos", busca normal: /ads. Se for categoria específica, usa a query param do backend:
      const url = categoriaAtual === 'Todos' 
        ? 'http://localhost:3000/ads' 
        : `http://localhost:3000/ads?category=${categoriaAtual}`;

      const response = await fetch(url);
      const data = await response.json();
      setAds(data);
    } catch (error) {
      console.error('Erro ao buscar anúncios:', error);
    }
  }, []);

  // Dispara a busca quando a página abre OU quando o usuário clica em outro filtro
  useEffect(() => {
    fetchAds(filter);
  }, [filter, fetchAds]);

  // 2. CADASTRAR NOVO ANÚNCIO (POST /ads)
  const handleCreateAd = async (e) => {
    e.preventDefault();

    const newAd = {
      title,
      category,
      type,
      price: type === 'doacao' ? 0 : Number(price),
      description: 'Anúncio universitário',
      imageUrl: ''
    };

    try {
      const response = await fetch('http://localhost:3000/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd)
      });

      if (response.ok) {
        alert('Anúncio publicado com sucesso!');
        setTitle('');
        setCategory('');
        setPrice('');
        // Atualiza a lista trazendo a categoria atual e volta pra Home
        fetchAds(filter);
        setCurrentView('home');
      } else {
        const errorData = await response.json();
        alert(`Erro ao publicar: ${errorData.error || 'Verifique os dados'}`);
      }
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="landing-container">
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

            {/* A listagem agora renderiza direto da resposta da API sem filtro manual */}
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
                    <span className="ad-badge">{ad.type}</span>
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
              <option value="venda">venda</option>
              <option value="doacao">doacao</option>
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