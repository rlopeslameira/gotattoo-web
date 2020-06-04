import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import carregando from './assets/carregando.gif';

const LoadingIndicator = props => {
  return (
    <div id="loadingIncicator" style={{ display: 'none', }}>
      <img src={carregando} alt="Imagem" />
    </div>
  );
}

ReactDOM.render(<><App /><LoadingIndicator /></>, document.getElementById('root'));
