import React from 'react';
import { useField } from '@rocketseat/unform';
import { Container } from './styles';

function AvatarInput() {

  function handleChange(e){

  }

  return (
    <Container>
      <label htmlFor="">
        <img src="" alt=""/>
        <input type="file" id="avatar" accept="image/*" onChange={handleChange}/>
      </label>
    </Container>
  );
}

export default AvatarInput;