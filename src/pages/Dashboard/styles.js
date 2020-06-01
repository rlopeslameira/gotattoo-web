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
  flex-direction: column;
  cursor: ${props => props.avaliable ? 'pointer' : 'auto'};;

  background: ${props => props.selected && '#00FA9A'} ;
  
  .detalhes {
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
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 4px;
    background: none;
    border: 0;
    margin-top: 5px;
    margin-right: 10px;
  }
`;

export const Options = styled.div`
  width: 100%;  
`;
