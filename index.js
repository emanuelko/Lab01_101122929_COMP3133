const fs = require('fs');
const csv = require('csv-parser');

fs.unlink('canada.txt',(err)=>{
    if (err) throw err;
    console.log('canada.txt was deleted');
})

fs.unlink('usa.txt',(err)=>{
    if (err) throw err;
    console.log('usa.txt was deleted');
})

const readStream = fs.createReadStream('input_countries.csv')
const title="country,year,population"
fs.appendFileSync('canada.txt', title + `\n`)
fs.appendFileSync('usa.txt', title + `\n`)

readStream.pipe(csv()).on('data', (chunk) => {
    if (chunk.country==='Canada'){
        fs.appendFileSync('canada.txt', `${chunk.country},${chunk.year},${chunk.population}\n`)
    } else if (chunk.country==='United States'){
        fs.appendFileSync('usa.txt', `${chunk.country},${chunk.year},${chunk.population}\n`)
    }
})