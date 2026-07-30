// frontend/src/components/Toast.jsx
export default function Toast({ message, type }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      padding: '16px 24px',
      backgroundColor: type === 'success' ? '#10B981' : '#EF4444',
      color: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)',
      fontWeight: 'bold',
      zIndex: 9999,
      transition: 'all 0.3s ease'
    }}>
      {message}
    </div>
  );
}