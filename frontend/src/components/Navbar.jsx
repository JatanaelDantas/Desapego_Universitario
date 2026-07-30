// frontend/src/components/Navbar.jsx
export default function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="app-nav">
      <h2 onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
        ♻️ VortexApp
      </h2>
      {currentView === 'home' && (
        <button className="btn-primary" onClick={() => setCurrentView('form')}>
          + Novo Anúncio
        </button>
      )}
    </nav>
  );
}