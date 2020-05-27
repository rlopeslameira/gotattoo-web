import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import Notifications from '~/components/Notifications/';
import logo from '~/assets/logo.png'

function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoTattoo" width={45} height={45}/>  
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <aside>
          <Notifications/>
          <Profile>
            <div>
              <strong>Maickon Farias</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img width={45} height={45} src="https://avatars.dicebear.com/api/male/rodrigo.svg?mood[]=happy" alt="Maickon Farias"/>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;