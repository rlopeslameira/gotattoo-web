import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Content, Profile, Menu, Fechar } from './styles';

// import Notifications from '~/components/Notifications/';
import logo from '../../assets/logo.png'
import { signOut } from '../../store/modules/auth/actions';
import history from '../../services/history';

import { MdMenu, MdClose } from 'react-icons/md';

function Header() {
  const [menuShow, setMenuShow] = useState(false);
  
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleOpenMenu(){
    setMenuShow(!menuShow);
  }

  function handleSignOut(){
    dispatch(signOut());
  }

  function handleClickPerfil(){
    history.push('/profile');
    // console.log('Click');
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoTattoo" width={45} height={45} onClick={() => history.push('/dashboard')}/> 
  
          {!menuShow && <MdMenu size={40} onClick={handleOpenMenu}/>}
        </nav>

        <Menu id="menu" className="menu" showMenu={menuShow}>
          <Fechar>
            <MdClose size={40} onClick={handleOpenMenu}/>
          </Fechar>
          <Link to="/dashboard" onClick={() => setMenuShow(false)}>Agenda</Link>
          <Link to="/scheduling" onClick={() => setMenuShow(false)}>Novo Agendamento</Link>
          <Link to="/profile" onClick={() => setMenuShow(false)}>Meus Dados</Link>
          <Link to="/" onClick={handleSignOut}>Sair</Link>
        </Menu>

        <aside>
          <Profile onClick={handleClickPerfil}>
            <div>
              <strong >{profile.name}</strong>
            </div>
            <img width={45} height={45} src={profile.avatar ? profile.avatar.url : "https://avatars.dicebear.com/api/male/rodrigo.svg?mood[]=happy"} alt={profile.name}/>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;