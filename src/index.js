import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import carregando from './assets/carregando.gif';

const LoadingIndicator = props => {
  return (
    <div id="loadingIncicator" >
      <img src={carregando} />
    </div>
  );
}

ReactDOM.render(<div><App /><LoadingIndicator /></div>, document.getElementById('root'));
