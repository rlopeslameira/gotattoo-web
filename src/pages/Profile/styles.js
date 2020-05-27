import styled from 'styled-components';
import {darken} from 'polished';

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

    span {
      color: #e43f5a;
      opacity: 0.8;
      align-self: flex-start;
      margin: 0 5px 10px;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
    
    button {
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
  }

  > button {
      width: 100%;
      margin: 5px 0 0 ;
      height: 44px;
      background: #e43f5a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.5s;

      &:hover{
        background: ${darken(0.05, '#e43f5a')};
      }
    }
`;
