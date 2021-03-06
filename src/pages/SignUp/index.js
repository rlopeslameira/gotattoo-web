import React from 'react';
import { Link } from 'react-router-dom';

import {useDispatch} from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'No mínimo 6 caracteres.').required('Senha é obrigatória'),

});

function SignUp() {

  const dispatch = useDispatch();
  
  function handleSubmit ({name, email, password}) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" width={140} height={140}/>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo"/>
        <Input name="email" type="email" placeholder="Seu e-mail"/>
        <Input name="password" type="password" placeholder="Sua senha"/>
        
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}

export default SignUp;