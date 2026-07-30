const BASE_URL = 'https://desapego-universitario-poy6.onrender.com';

export const getAds = async (category = 'Todos') => {
  const url = category === 'Todos'
    ? `${BASE_URL}/ads`
    : `${BASE_URL}/ads?category=${category}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar anúncios');
  return response.json();
};

export const createAd = async (newAd) => {
  const response = await fetch(`${BASE_URL}/ads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAd)
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Erro ao publicar anúncio');
  return data;
};