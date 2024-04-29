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

//public
app.use(express.static('public'));

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generate() {
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

function html(content) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Küfür Oluşturucu</title>
        <link rel="stylesheet" href="style.css">
    
    </head>
    <body>
            <h1>Küfür Oluşturucu</h1>
            <p>Arkadaşlarınıza sövmekten sıkıldınız mı? İşte size küfür oluşturucu!</p>
            <code>
                <span id="swear">${content}</span>
                <button id="copy-button" onclick="copy()">
                    <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;" id="check-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z" fill="currentColor"></path></svg>
                    <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;" id="copy-icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z" fill="currentColor"></path></svg>
                </button>
            </code>
            <div id="buttons">
                <button onclick="location.reload()" class="button">Yeni Küfür</button>
                <a class="button secondary" href="/raw">JSON API</a>
            </div>
    </body>
    <script src="script.js"></script>
    
    </html>`;

}

app.get('/', (req, res) => {
    res.send(html(generate()));
});

app.get('/raw', (req, res) => {
    res.json({ swear: generate() });
});
app.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = app;