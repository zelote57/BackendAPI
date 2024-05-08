const express = require('express');

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
    console.log(req.params.pid);
    const places = DUMMY_PLACES.find(p => {
        return p.id === req.params.pid;
    });
    res.json({places});
});

module.exports = router;
