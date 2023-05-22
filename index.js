// This is a swear generator for Turkish language.

/* example target array element:
    {
        main: "yemek borusun",
        suffix_status: "da",
        suffix_orientation: "a"
    
    },
    
    example predicate array element:
     exports.suffix_status = [
        "boza pişiririm",
     ],
    exports.suffix_orientation = [
       "kafamı sokarım",
    ],
    */

const { targets } = require('./data/targets');
const { adjectives } = require('./data/adjectives');
const { subjects } = require('./data/subjects.js');
const { suffix_status, suffix_orientation } = require('./data/predicates.js');
const express = require('express');
const app = express();

const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const generate = () => {
    const adjective = getRandom(adjectives);
    const subject = getRandom(subjects);

    /*
    Target has two options:   
    -suffix_status
    -suffix_orientation
    
    predicate has also two options:
    -suffix_status
    -suffix_orientation
    
    select one of suffix_status or suffix_orientation randomly
    */



    const suffix = Math.random() > 0.5 ? 'suffix_status' : 'suffix_orientation';

    const target_element = getRandom(targets);
    const target = target_element.main + target_element[suffix];
    const predicate = getRandom(suffix === 'suffix_status' ? suffix_status : suffix_orientation) + ".";

    return `${adjective} ${subject} ${target} ${predicate}`;

}

app.get('/', (req, res) => {
    res.send(generate());
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = app;