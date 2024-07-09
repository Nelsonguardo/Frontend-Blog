import React from 'react'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm.js'
import { Peticion } from '../../helpers/Peticion';
import { global } from '../../helpers/Global.jsx';

const Crear = () => {

    const { formulario, enviado, cambiado } = useForm({});
    const [ resultado, setResultado] = useState("no_enviado");

    const guardarArticulo = async (e) => {
        e.preventDefault();
        let nuevoArticulo = formulario;
        const { datos } = await Peticion(global.url + 'crear', 'POST', nuevoArticulo);

        if(datos.status === 'success'){
            setResultado("guardado");
        }else{
            setResultado("error");
        }

        const fileInput = document.getElementById('file');

        if (datos.status === 'success' && fileInput.files[0]) {
            setResultado("guardado");

            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);

            const subida = await Peticion(global.url + 'subir-imagen/'+ datos.articuloGuardado._id, 'POST', formData, true);
            
            if(subida.datos.status === 'success'){
                setResultado("guardado");
            }else{
                setResultado("error");
            }
        }
    }

    return (
        <div className='jumbo'>
            <h1>Crear artículo</h1>
            <p>Formulario para crear un artículo</p>
            <strong>{resultado == 'guardado' ? 'Artículo creado correctamente' : ''}</strong>
            <strong>{resultado == 'error' ? 'Los datos son incorrectos' : ''}</strong>

            <form className='formulario' onSubmit={guardarArticulo}>
                <div className='form-group'>
                    <label htmlFor="titulo">Título</label>
                    <input type="text" name="titulo" onChange={cambiado} />
                </div>
                <div className='form-group'>
                    <label htmlFor="contenido">Contenido</label>
                    <textarea type="text" name="contenido" onChange={cambiado} />
                </div>
                <div className='form-group'>
                    <label htmlFor="file0">Imagen</label>
                    <input type="file" name="file0" id='file' />
                </div>
                <input type="submit" value="Guardar" className='btn btn-success' />
            </form>
        </div>
    )
}

export default Crear
