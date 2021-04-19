const { response } = require('express');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

exports.createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            })
        }

        user = new UserModel(req.body);

        //encriptar password
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);

        //guardado en la bdd co hash incluido
        await user.save();

        //generar jwt
        const token = await generateJWT(user.id, user.name)


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

exports.loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            })
        }

        //confirmar los passwords

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no válido'
            })
        }

        //Generar nuestro JWT

        const token = await generateJWT(user.id, user.name)
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
};

exports.renewToken = async(req, res = response) => {

    const {uid,name} = req;

    //generar un nuevo token despues de revalidar el token anterior
    const token = await generateJWT(uid,name)

    res.status(201).json({
        ok: true,
        token,
        uid,
        name
    })
};



