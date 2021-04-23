const { response } = require("express");
const SessionModel = require("../models/SessionModel");



exports.sessionUpdate = async (req, res = response, next) => {

    //obtener la id desde la url
    const sessionId = req.params.id2;
    const state = req.state;

    try {

        const session = await SessionModel.findById(sessionId);
        if(!session){
            res.status(404).json({
                ok:false,
                msg: 'No hay eventos con esa id'
            });
        }

        if(session._id.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'El usuario no tiene privilegios para editar este evento'
            });
        }

        const newSession = {
            ...req.body,
            state
        }

        const updatedSession = await SessionModel.findByIdAndUpdate(sessionId,newSession,{new:true});
        res.status(201).json({
            ok:true,
            event: updatedSession
        })


       /*  res.status(201).json({
            ok: true,
            eventId
        }) */
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        })
    }

}