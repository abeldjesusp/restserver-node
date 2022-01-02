const path = require('path');
const fs = require('fs');

const { request, response } = require("express");
const cloudinary = require('cloudinary').v2;

const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async(req = request, res = response) => {

    try {
        const nombre = await subirArchivo( req.files );
        res.json({ nombre });
    } catch (error) {
        res.status(400).json({ msg });
    }

}

const actualizarImagen = async(req = request, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    // Limpiar imagenes previas
    try {
        if(modelo.img) {
            // Hay que borrar la imagen del servidor
            const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if( fs.existsSync(pathImage) ) fs.unlinkSync(pathImage);

            const nombre = await subirArchivo( req.files, coleccion );
            modelo.img = nombre;

            await modelo.save();

            res.json(modelo);
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const actualizarImagenCloudinary = async(req = request, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    try {

        // Limpiar imagenes previas
        if(modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [ public_id ] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }

        // Guardar imagenes
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        modelo.img = secure_url;

        await modelo.save();

        res.json(modelo);
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const mostrarImagen = async(req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }

            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    try {
        if(modelo.img) {
            const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if( fs.existsSync(pathImage) ) res.sendFile(pathImage);
        }
    } catch (error) {
        return res.status(400).json({ error });
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(pathImagen);

    
}

module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    cargarArchivo,
    mostrarImagen,
}