import React,{useEffect} from 'react';
import LoginForm from './components/Form';
import { useTranslation } from 'react-i18next';
import './App.css';

function App() {

  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
