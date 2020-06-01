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
    min-width: 140px;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #EEE;
    }

    a {
      font-weight: bold;
      color: #162447;
      margin-left: 15px;
    }

    svg {
      cursor: pointer;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }

`;

export const Menu = styled.div`
  top: 0;
  left: 0;
  z-index: 99999;
	position: fixed;
	width: 250px;
	height: 100%;
	background: #1f4068;
	padding-top: 6px;
  transform:  ${props => props.showMenu ? 'translateX(0%)' : 'translateX(-100%)'};
	transition: transform 0.7s ease;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  a {
    font-weight: bold;
    color: #FFF;
    padding: 10px;
    margin-top: 10px;
  }

`;

export const Fechar = styled.button`
  display: flex;
  margin-bottom: 20px;
  background: none;
  border: 0;
  align-self: flex-end;
  margin-right: 20px;
  padding: 5px;
  color: #FFF;
  cursor: pointer;
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #EEE;
  cursor: pointer;


  div {
    display: flex;
    flex-direction: column;
    text-align: right;
    margin-right: 6px;
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

    small {
      font-size: 10px;
    }
  }

  img {
    height: 45px;
    width: 45px;
    object-fit: contain;
    border-radius: 50%;
    border: 1px solid #999;
  }
`;