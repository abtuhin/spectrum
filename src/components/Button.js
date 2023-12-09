export default function ({ name, onClick = () => {} }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div
        onClick={onClick} 
        style={{
          display: 'flex', 
          width: 200, 
          background: '#FFD700',
          padding: '1%',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
        }}
      >
        {name}
      </div>
    </div>
  )
}