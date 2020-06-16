import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0,0,0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      &:focus {
        border: 1px solid rgba(255, 255, 255, 0.1);
        height: 42px;
      }
    }

    textarea {
      background: rgba(0,0,0, 0.2);
      border: 0;
      border-radius: 4px;
      padding: 15px;
      color: #fff;
      margin: 0 0 5px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }

      &:focus {
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    
    > button {
      margin: 5px 0 0 ;
      height: 44px;
      background: #1f4068;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.5s;

      &:hover{
        background: ${darken(0.05, '#1f4068')};
      }
    }

    a{
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover{
        opacity: 1;
      }
    }

    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    
    
  }
`;


export const ContentDatePicker = styled.div`
  background: #FFF;
  width: 304px;
  align-self: center;
  margin-bottom: 20px;
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
      white-space: break-spaces;
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
  display: flex;
  flex: 1;
  justify-content: space-between;
`;