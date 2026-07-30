import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { getAds, createAd } from './services/api';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AdsGrid from './components/AdsGrid';
import AdForm from './components/AdForm';
import Toast from './components/Toast';

function App() {
  const [ads, setAds] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [currentView, setCurrentView] = useState('home');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const fetchAds = useCallback(async (categoriaAtual) => {
    try {
      const data = await getAds(categoriaAtual);
      setAds(data);
    } catch (error) {
      console.error(error);
      showToast('Erro ao carregar os anúncios da nuvem.', 'error');
    }
  }, []);

  useEffect(() => {
    fetchAds(filter);
  }, [filter, fetchAds]);

  const handleCreateAd = async (newAdData) => {
    try {
      await createAd(newAdData);
      showToast('🎉 Anúncio publicado com sucesso!', 'success');
      fetchAds(filter);
      setCurrentView('home');
    } catch (error) {
      console.error(error);
      showToast(`Erro: ${error.message || 'Verifique os dados informados'}`, 'error');
    }
  };

  return (
    <div className="landing-container">
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {currentView === 'home' ? (
        <>
          <HeroSection adsCount={ads.length} />
          <AdsGrid ads={ads} filter={filter} setFilter={setFilter} />
        </>
      ) : (
        <AdForm
          onCancel={() => setCurrentView('home')}
          onSubmitSuccess={handleCreateAd}
        />
      )}
    </div>
  );
}

export default App;