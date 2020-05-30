import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import tattoo from '~/assets/tattoo.png';

import api from '~/services/api';
import { Container } from './styles';

function TattooInput() {

  const { defaultValue, registerField } = useField('tattoo');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url)

  const ref = useRef();

  useEffect(() => {
    if (ref.current)
    {
      registerField({
        name: 'tattoo_id',
        ref: ref.current,
        path: 'dataset.file'
      })
    }
  }, [ref, registerField]);

  async function handleChange(e){
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);
    
    const {id, url} = response.data;

    setPreview(url);
    setFile(id);

  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || tattoo} alt=""/>
        <input 
        type="file" 
        id="avatar" 
        accept="image/*" 
        data-file={file}
        onChange={handleChange} 
        ref={ref}/>
      </label>
      <strong>
        Selecione a imagem
      </strong>
    </Container>
  );
}

export default TattooInput;