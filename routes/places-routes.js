const express = require('express');
const uuid = require('uuid');
const HttpError = require('../models/http-error');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Rotonda',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Centro Cívico',
        creator: 'u1'
    }
];

router.get('/', (req, res, next)=>{
    res.json({places : DUMMY_PLACES});
});

router.get('/:pid', (req, res, next) => {    
    const place = DUMMY_PLACES.find(p => {
        return p.id === req.params.pid;
    });
    if (!place){        
        const error = new Error('Lugar no existe para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({place});
    }    
});

router.get('/users/:uid', (req, res, next)=>{
    const places = DUMMY_PLACES.find(p => {
        return p.creator === req.params.uid
    });    

    if (!places){
        const error = new HttpError('Lugar no existe para el id de usuario especificado', 404);
        throw error;
    }

    res.json({places});
});

router.post('/', (req, res, next)=>{
    const {title, creator} = req.body;
    const createdPlace = {
        id: uuid.v4(),
        title,
        creator
    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place:createdPlace});
});

module.exports = router;
