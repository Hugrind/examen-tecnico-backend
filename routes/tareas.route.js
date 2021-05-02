'use strict';
const express = require('express');
const router = express.Router();
const Tareas = require('../models/tareas.model');


router.post('/registrar-tarea', (req, res) => {

    console.log(req.body.tarea);
    // console.log(req.body.fechaTarea);


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
                msj: 'Ocurrió un error al agregar la tarea',
                error
            });
        } else {
            res.json({
                msj: 'La nueva tarea se agregó correctamente'
            });
        }

    });
});


router.get('/listar-tarea', (req, res) => {

    Tareas.find((error, tareas) => {
        if (error) {
            res.json({
                msj: 'Ocurrió un error al listar la tarea',
                error
            });
        } else {
            res.json({
                tareas
            });
        }
    });

});

router.put('/modificar-tarea', (req, res) => {

    Tareas.updateOne({ tarea: req.body.tarea }, {
        $set: req.body,

    }, (error) => {
        if (error) {
            res.json({
                msj: 'La tarea no se pudo modificar',
                error
            });
        } else {
            res.json({
                msj: 'La tarea se modificó correctamente'
            });
        }
    });
});


router.delete('/eliminar-tarea', (req, res) => {
    Tareas.deleteOne({ tarea: req.body.tarea }, (error) => {
        if (error) {
            res.json({
                msj: 'Ocurrió un error al eliminar la tarea',
                error
            });
        } else {
            res.json({
                msj: 'tarea eliminada correctamente'
            });
        }
    });
});

module.exports = router;