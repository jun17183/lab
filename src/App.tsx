import React from 'react';
import AppRouter from 'routes/AppRouter';
import Header from 'components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="relative">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
