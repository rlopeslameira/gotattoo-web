import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom:  10px;
  width: 100%;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    label {
      width: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }

      #avatar {
        display: none;
      }

      #icon{
        margin-left: 10px;
      }
    }

    #tattoo_txt {
      width: 100%;
      background: rgba(0,0,0, 0.2);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      color: rgba(255, 255, 255, 0.4);

      &:focus {
        border: 1px solid rgba(255, 255, 255, 0.1);
        height: 42px;
      }
    }
  }

  img {
      width: 90%;
      object-fit: contain;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #EEE;
    }

  strong {
    display: block;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 10px;
  }

  
`;
