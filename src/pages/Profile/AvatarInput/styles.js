import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom:  30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }

    img {
      height: 120px;
      width: 120px;
      object-fit: contain;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #EEE;
    }

    input {
      display: none;
    }
  }
`;
