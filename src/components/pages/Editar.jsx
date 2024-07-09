import React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from '../../hooks/useForm.js'
import { Peticion } from '../../helpers/Peticion';
import { global } from '../../helpers/Global.jsx';
import { useParams } from 'react-router-dom';

const Editar = () => {
    const [articulo, setArticulo] = useState([]);
    const { formulario, enviado, cambiado } = useForm({});
    const [resultado, setResultado] = useState("no_enviado");
    const params = useParams();

    useEffect(() => {
        conseguirArticulo();
    }, []);

    const conseguirArticulo = async () => {

        const { datos } = await Peticion(global.url + 'articulo/' + params.id, 'GET');

        if (datos.status === "success") {
            setArticulo(datos.articulo);
        }
    };

    const editarArticulo = async (e) => {
        e.preventDefault();
        let nuevoArticulo = formulario;
        const { datos } = await Peticion(global.url + 'articulo/'+params.id, 'PUT', nuevoArticulo);

        if (datos.status === 'success') {
            setResultado("guardado");
        } else {
            setResultado("error");
        }

        const fileInput = document.getElementById('file');

        if (datos.status === 'success' && fileInput.files[0]) {
            setResultado("guardado");

            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);

            const subida = await Peticion(global.url + 'subir-imagen/' + datos.articulo_actualizado._id, 'POST', formData, true);

            if (subida.datos.status === 'success') {
                setResultado("guardado");
            } else {
                setResultado("error");
            }
        }
    }

    return (
        <div className='jumbo'>
            <h1>Editar artículo</h1>
            <p>Formulario para editar: {articulo.titulo}</p>
            <strong>{resultado == 'guardado' ? 'Artículo editado correctamente' : ''}</strong>
            <strong>{resultado == 'error' ? 'Los datos son incorrectos' : ''}</strong>

            <form className='formulario' onSubmit={editarArticulo}>
                <div className='form-group'>
                    <label htmlFor="titulo">Título</label>
                    <input type="text" name="titulo" onChange={cambiado} defaultValue={articulo.titulo} />
                </div>
                <div className='form-group'>
                    <label htmlFor="contenido">Contenido</label>
                    <textarea type="text" name="contenido" onChange={cambiado} defaultValue={articulo.contenido} />
                </div>
                <div className='form-group'>
                    <label htmlFor="file0">Imagen</label>
                    <div className="mascara">
                        {articulo.imagen != "default.jpg" && <img src={global.url + 'imagen/' + articulo.imagen} />}
                        {articulo.imagen == "default.jpg" && <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" />}
                    </div>
                    <input type="file" name="file0" id='file' />
                </div>
                <input type="submit" value="Guardar" className='btn btn-success' />
            </form>
        </div>
    )
}

export default Editar
