import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import api from '../../../services/api';
import { Container } from './styles';
import { MdAddAPhoto } from 'react-icons/md';

import { WaveLoading } from 'react-loadingg';

function TattooInput() {

  const { defaultValue, registerField } = useField('tattoo');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url)
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);
    
    const {id, url} = response.data;

    setPreview(url);
    setFile(id);
    setLoading(false);
  }

  return (
    <Container>
      <div>
        <input id="tattoo_txt" type="text" readOnly value={preview || 'Selecione uma imagem'}/>
        <label htmlFor="avatar">
          <MdAddAPhoto id="icon" size={40} color="#FFF"/>
          <input 
          type="file" 
          id="avatar" 
          accept="image/*" 
          data-file={file}
          onChange={handleChange} 
          ref={ref}/>
        </label>
      </div>
      {loading ? (
        <div id="carregando">
          <WaveLoading style={{ position: 'relative', alignSelf: 'center', width: '50%'}}/>
          Carregando
        </div>
      ) : (
        <>
          {preview && (
            <img src={preview} alt=""/>
          )}
        </>
      )}
    </Container>
  );
}

export default TattooInput;