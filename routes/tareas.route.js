'use strict';
const express = require('express');
const router = express.Router();
const tareas = require('../models/tareas.model');


router.post('/registrar-tarea', (req, res) => {


    let nuevaTarea = new Tareas({
        fecha: req.body.fecha,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad,
        encargado: req.body.encargado,
    });

    nuevaTarea.save((error) => { //.save() para que esa información se intente guardar en la base de datos.
        if (error) {
            res.json({
                msj: 'Ocurrió un error al agregar el padecimiento',
                error
            });
        } else {
            res.json({
                msj: 'El nuevo padecimiento se agregó correctamente'
            });
        }

    });
});


router.get('/listar-tarea', (req, res) => {

    Tareas.find((error, ListaDeTareas) => {
        if (error) {
            res.json({
                msj: 'Ocurrió un error al listar las razas',
                error
            });
        } else {
            res.json({
                ListaDeTareas
            });
        }
    });

});

router.put('/modificar-tarea', (req, res) => {

    Tareas.updateOne({ _id: req.body._id }, {
        $set: req.body,
        nombreUsuario: req.body.nombreUsuario,
        tipoUsuario: req.body.tipoUsuario,
    }, (error) => {
        if (error) {
            Bitacora.guardarAccion(new Date(), "Error al modificar un tarea", req.body.nombreUsuario, req.body.tipoUsuario);
            res.json({
                msj: 'El tareas no se pudo modificar',
                error
            });
        } else {
            Bitacora.guardarAccion(new Date(), "Modificar un tarea", req.body.nombreUsuario, req.body.tipoUsuario);
            res.json({
                msj: 'El tareas se modificó correctamente'
            });
        }
    });
});


router.delete('/eliminar-tarea', (req, res) => {
    Tareas.deleteOne({ _id: req.body._id }, (error) => {
        if (error) {
            Bitacora.guardarAccion(new Date(), "Error al eliminar un tarea", req.body.nombreUsuario, req.body.tipoUsuario);
            res.json({
                msj: 'Ocurrió un error al eliminar el tareas',
                error
            });
        } else {
            Bitacora.guardarAccion(new Date(), "Eliminar un tarea", req.body.nombreUsuario, req.body.tipoUsuario);
            res.json({
                msj: 'Padecimiento eliminado correctamente'
            });
        }
    });
});

module.exports = router;