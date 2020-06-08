import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: 0;
  }

  *:focus{
    outline: 0;
  }

  html, body, #root {
    height: 100%;
    background: #1b1b2f;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  #carregando{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    color: rgba(255, 255, 255, 0.4);
    width: 100%;
  }

  .loading-indicator {    
    background: rgba(255,255,255,0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;

    img {
      position: relative;
      left: 50%;
      top: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
    }
  }
  
`;
