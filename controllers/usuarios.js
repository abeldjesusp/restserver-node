const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const params = req.query;

    res.json({
        mgs: 'get API - Controller',
        params
    });
}

const usuariosPost = (req = request, res = response) => {
    const body = req.body;

    res.json({
        mgs: 'Post API - Controller',
        body
    });
}

const usuariosPut = (req = request, res = response) => {
    const id = req.params.id;

    res.json({
        mgs: 'Put API - Controller',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        mgs: 'Delete API - Controller'
    });
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