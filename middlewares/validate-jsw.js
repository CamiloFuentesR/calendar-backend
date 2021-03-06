const { response } = require("express");
const jwt = require('jsonwebtoken');


exports.validateJWT = (req, res = response, next) => {
    //x-token headers
    //aqui se revlida el token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        //verificando un token válido
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = payload.uid;
        req.name = payload.name;
        req.time = payload.iat        // tiempo de inicio del token
            // console.log(req.time)
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();

}