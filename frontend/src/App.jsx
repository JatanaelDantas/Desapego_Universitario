import { useState } from 'react';
import './App.css';

const mockAds = [
  { id: 1, title: 'Livro de Cálculo Vol 1', category: 'Livros', price: 50, type: 'Venda', img: '📚' },
  { id: 2, title: 'Calculadora Científica', category: 'Eletrônicos', price: 0, type: 'Doacao', img: '🧮' },
  { id: 3, title: 'Jaleco Laboratório', category: 'Vestuário', price: 35, type: 'Venda', img: '🥼' },
  { id: 4, title: 'Arduino Uno', category: 'Eletrônicos', price: 80, type: 'Venda', img: '🔌' },
];

function App() {
  const [filter, setFilter] = useState('Todos');
 
  const [currentView, setCurrentView] = useState('home');

  const filteredAds = filter === 'Todos' 
    ? mockAds 
    : mockAds.filter(ad => ad.category === filter);

  return (
    <div className="landing-container">
      {/* Navegação super simples simulando um App */}
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
            <div className="stat-card"><h3>320</h3><p>Reaproveitados</p></div>
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
              {filteredAds.map(ad => (
                <div key={ad.id} className="ad-card">
                  <div className="ad-image">{ad.img}</div>
                  <h4>{ad.title}</h4>
                  <span className="ad-badge">{ad.type}</span>
                  <p className="ad-price">{ad.type === 'Doacao' ? 'Grátis' : `R$ ${ad.price.toFixed(2)}`}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* TELA DO FORMULÁRIO */
        <section className="form-section">
          <h2>Criar Anúncio</h2>
          <form className="ad-form" onSubmit={(e) => { e.preventDefault(); alert("Formulário será integrado em breve!"); setCurrentView('home'); }}>
            <label>Título do Item</label>
            <input type="text" placeholder="Ex: Livro de Física" required />

            <label>Categoria</label>
            <select required>
              <option value="">Selecione...</option>
              <option value="Livros">Livros</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Vestuário">Vestuário</option>
            </select>

            <label>Tipo</label>
            <select required>
              <option value="Venda">Venda</option>
              <option value="Doacao">Doação</option>
            </select>

            <label>Preço (R$)</label>
            <input type="number" placeholder="0.00 se for doação" required />

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