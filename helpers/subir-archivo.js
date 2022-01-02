const path = require("path");
const { v4 } = require('uuid');

const subirArchivo = (files, carpeta = '', extensionesValidas = ['png', 'jpg', 'jpeg', 'gif']) => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1];

        // VALIDAR LA EXTENSION
        if( !extensionesValidas.includes(extension) ) {
            return reject(`La extension ${ extension } no es permitida. [ ${ extensionesValidas } ]`);
        }

        const nombreTemp = v4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    });
}

module.exports = {
    subirArchivo
}