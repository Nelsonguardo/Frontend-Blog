import React from 'react'
import { Link } from 'react-router-dom'

const Inicio = () => {
    return (
        <div className="jumbo">
            <h1> Bienvenido al Blog con React </h1>
            <p> Blog desarrollado con el MERN Stack (MongoDB, Express, React y NodeJS)</p>
            <Link to="/articulos" className='button'>ir a articulos</Link>
        </div>
    )
}

export default Inicio
