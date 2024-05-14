
const HttpError = require('../models/http-error');
const uuid = require('uuid');

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

const getAllPlaces = (req, res, next)=>{
    res.json({places : DUMMY_PLACES});
};

const getPlacesById = (req, res, next) => {    
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
};

const getPlacesByUsers = (req, res, next)=>{
    const places = DUMMY_PLACES.find(p => {
        return p.creator === req.params.uid
    });    

    if (!places){
        const error = new HttpError('Lugar no existe para el id de usuario especificado', 404);
        throw error;
    }

    res.json({places});
};

const postPlaces = (req, res, next)=>{
    const {title, creator} = req.body;
    const createdPlace = {
        id: uuid.v4(),
        title,
        creator
    };
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place:createdPlace});
};

exports.getAllPlaces = getAllPlaces;
exports.getPlacesById = getPlacesById;
exports.getPlacesByUsers = getPlacesByUsers;
exports.postPlaces = postPlaces;