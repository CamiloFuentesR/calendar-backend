const { response } = require("express");
const { findById } = require("../models/EventModel");
const EventModel = require("../models/EventModel");


exports.createEvent = async (req, res = response, next) => {

    //instancia de evento
    const event = new EventModel(req.body);
    try {
        event.user = req.uid;
        const eventSave = await event.save()
        const { title, notes } = event;
        res.status(201).json({
            ok: true,
            msg: 'Evento creado',
            event: eventSave
        });
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        })
    }

}

exports.getEvent = async (req, res = response, next) => {
    try {
        const events = await EventModel.find({})
                                       .populate('user', 'name');

        res.status(201).json({
            ok: true,
            msg: 'Evento obtenido',
            events
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: 'No se logro obtener el evento'
        })
        next();
    }

}

exports.updateEvent = async (req, res = response, next) => {

    //obtener la id desde la url
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await EventModel.findById(eventId);
        if(!event){
            res.status(404).json({
                ok:false,
                msg: 'No hay eventos con esa id'
            });
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'El usuario no tiene privilegios para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await EventModel.findByIdAndUpdate(eventId,newEvent,{new:true});
        res.status(201).json({
            ok:true,
            event: updatedEvent
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

exports.deleteEvent = async (req, res = response, next) => {

    const eventId = req.params.id;
    const uid = req.uid;

    
    try {
        const event = await EventModel.findById(eventId);
        if(!event){
            return res.status(404).json({
                ok:false,
                msg: 'No se encuentra un evento con esta id para eliminar'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg: 'El usuario no tiene privilegios para eliminar este evento'
            });
        }

        await EventModel.findByIdAndDelete(eventId);
        res.status(201).json({
            ok: true,
            msg: 'Evento eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: 'No se pudo eliminar el evento'
        })
    }


}