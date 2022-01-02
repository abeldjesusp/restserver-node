const Role = require('../models/role');
const { Categoria, Usuario, Producto } = require('../models');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) throw new Error(`El rol ${ rol } no esta registrado en la BD.`)
}

const existeEmail = async(correo = '') => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail) throw new Error('El correo ya esta registrado.');
}

const existeUsuarioPorID = async( id ) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ) throw new Error('El id no existe.');
}

const existeCategoria = async( id ) => {
    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ) throw new Error('El id no existe.');
}

const existeProducto = async( id ) => {
    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ) throw new Error('El id no existe.');
}

const coleccionesPermitidas = async(coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);

    if(!incluida) 
        throw new Error(`La coleccion ${ coleccion } no es permitida. [${ colecciones }]`);

    return true;
}

module.exports = {
    coleccionesPermitidas,
    esRoleValido,
    existeCategoria,
    existeEmail,
    existeProducto,
    existeUsuarioPorID
}