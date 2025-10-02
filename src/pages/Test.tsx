export default function Test() {
  console.log('🧪 [TEST] Test page rendering...');
  
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '40px',
      minHeight: '100vh',
      fontSize: '24px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        ✅ TEST PAGE - REACT IS WORKING!
      </h1>
      <p>If you can see this red page with white text, React is rendering correctly.</p>
      <p>The problem is likely CSS/Tailwind related.</p>
      
      <div style={{ marginTop: '40px', backgroundColor: 'blue', padding: '20px' }}>
        <h2>Tailwind Test:</h2>
        <div className="bg-green-500 text-white p-4 mt-4">
          If this is GREEN with white text, Tailwind is working
        </div>
        <div className="bg-background text-foreground p-4 mt-4 border-2 border-white">
          If this is visible, CSS variables are working
        </div>
      </div>
    </div>
  );
}
