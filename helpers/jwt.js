const jwt = require('jsonwebtoken');

exports.generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name };
        //firmar el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '10m'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })
}