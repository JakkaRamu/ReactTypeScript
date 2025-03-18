// App.tsx
import React from 'react';
import Calculator from './Calculator';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>React TypeScript Calculator</h1>
      <Calculator />
    </div>
  );
};

export default App;