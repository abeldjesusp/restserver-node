const bcryptjs = require('bcryptjs');
const { response, request } = require('express');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar el password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la DB
    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async(req = request, res = response) => {
    const id = req.params.id;
    const { password, google, correo, ...data } = req.body;

    if(password) {
         // Encriptar el password
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, data );

    res.json(usuario);
}

const usuariosDelete = async(req = request, res = response) => {

    const { id } = req.params;
    // const uid = req.uid;

    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        mgs: 'Patch API - Controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}