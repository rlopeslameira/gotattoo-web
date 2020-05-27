import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Form, Input} from '@rocketseat/unform';

import { Container } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

function Profile() {

  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  async function handleSubmit(data){
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail"/>
        <hr/>
        <Input name="oldPassword" type="password" placeholder="Sua senha atual"/>
        <Input name="nepwPassword" type="password" placeholder="Sua nova senha"/>
        <Input name="confirmPassword" type="password" placeholder="Confirmação de senha"/>

        <button type="submit">Atualizar perfil</button>
      </Form>
      
      <button type="button">Sair do GoTattoo</button>

    </Container>
  );
}

export default Profile;