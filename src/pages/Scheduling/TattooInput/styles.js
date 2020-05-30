import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom:  10px;
  width: 100%;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }

    img {
      height: 120px;
      width: 120px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #EEE;
    }

    input {
      display: none;
    }
  }

  strong {
    display: block;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 10px;
  }

  
`;
