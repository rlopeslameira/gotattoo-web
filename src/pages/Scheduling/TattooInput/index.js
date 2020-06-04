import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';
import { MdAddAPhoto } from 'react-icons/md';

import { WaveLoading } from 'react-loadingg';

function TattooInput() {

  const { defaultValue, registerField } = useField('tattoo');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url)
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  setFile(defaultValue && defaultValue.id);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'tattoo_id',
        ref: ref.current,
        path: 'dataset.file'
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    setLoading(true);

    const file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      var img = document.createElement("img");
      img.onload = () => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 800;
        var MAX_HEIGHT = 600;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataurl = canvas.toDataURL("image/png");
        setPreview(dataurl);
      }
      img.src = e.target.result;
    }
    reader.readAsDataURL(file);

    setLoading(false);

  }

  return (
    <Container>
      <div>
        <input id="tattoo_txt" type="text" readOnly value={preview || 'Selecione uma imagem'} />
        <label htmlFor="avatar">
          <MdAddAPhoto id="icon" size={40} color="#FFF" />
          <input
            type="file"
            id="avatar"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
            ref={ref} />
        </label>
      </div>
      {loading ? (
        <div id="carregando">
          <WaveLoading style={{ position: 'relative', alignSelf: 'center', width: '50%' }} />
          Carregando
        </div>
      ) : (
          <>
            {preview && (
              <img src={preview} alt="" />
            )}
          </>
        )}
    </Container>
  );
}

export default TattooInput;