export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="app-nav">
      <h2 onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
        <img 
          src="/iconebarra.png" 
          alt="Vortex Logo" 
          style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
        />
        <span>VortexApp</span>
      </h2>
      {currentView === 'home' && (
        <button className="btn-primary" onClick={() => setCurrentView('form')}>
          + Novo Anúncio
        </button>
      )}
    </nav>
  );
}