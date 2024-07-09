import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Inicio from "../components/pages/Inicio";
import Articulos from "../components/pages/Articulos";
import Articulo from "../components/pages/Articulo";
import Header from "../components/layaout/Header";
import Nav from "../components/layaout/Nav";
import Sidebar from "../components/layaout/Sidebar";
import Footer from "../components/layaout/Footer";
import Crear from "../components/pages/Crear";
import Busqueda from "../components/pages/Busqueda";
import Editar from "../components/pages/Editar";

export const Rutas = () => {

    return (
        <BrowserRouter>

            {/*Layaout*/}
            <Header />
            <Nav />
            {/*Conetenido central y rutas*/}
            <section id="content" className="content">
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/articulos" element={<Articulos />} />
                    <Route path="/articulo/:id" element={<Articulo />} />
                    <Route path="/editar/:id" element={<Editar />} />
                    <Route path="/crear-articulo" element={<Crear />} />
                    <Route path="/buscar/:busqueda" element={<Busqueda />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </section>
            <Sidebar />
            <Footer />
        </BrowserRouter>
    )
}