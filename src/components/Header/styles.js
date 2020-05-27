import styled from "styled-components";

export const Container = styled.div`
  background: #FFF;
  padding: 0 3px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #EEE;
    }

    a{
      font-weight: bold;
      color: #162447;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }

`;


export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #EEE;

  div {
    display: flex;
    flex-direction: column;
    text-align: right;
    margin-right: 10px;
    justify-content: center;
    
    strong {
      display: flex;
      color: #1b1b2f;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    height: 45px;
    border-radius: 50%;
    border: 1px solid #999;
  }
`;