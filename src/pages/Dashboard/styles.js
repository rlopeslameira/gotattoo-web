import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;


  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #FFF;
      font-size: 24px;
      margin: 0 15px;
    }
  }
  
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 10px;
  border-radius: 4px;
  background: ${props => props.avaliable ? '#FFF' : '#1f4068'} ;
  opacity: ${props => props.past ? 0.6 : 1};
  display: flex;
  flex-direction: row;
  
  div {
    display: flex;
    flex-direction: column;
    flex: 1;

    strong {
      display: block;
      color: ${props => props.avaliable ? '#000' : '#FFF'} ;
      font-size: 24px;
      font-weight: bold;
    }

    span {
      display: block;
      margin-top: 3px;
      color: ${props => props.avaliable ? '#000' : '#FFF'} ;
      font-style: ${props => props.avaliable ? 'italic' : 'normal'} ;
    }
  }
  
  button {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    background: #162447;
    color: #FFF;
    border: 0;
  }
`;
