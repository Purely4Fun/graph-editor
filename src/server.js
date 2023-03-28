var sequest = require('sequest')
var fs = require('fs')
const readline = require('readline-sync');



let host  = readline.question("Enter hostname (username@hostname): ");

let pass = readline.question("Enter password: ");

let loc = readline.question("Enter location name: ");

var seq1 = sequest(host, { password: pass})
    seq1.pipe(process.stdout) // only necessary if you want to see the output in your terminal
    seq1.write('rm ~/graph.json')

var seq = sequest.connect(host, { password: pass})
var writer = seq.put('graph.json');
fs.createReadStream(__dirname+'/graph.json').pipe(writer)

writer.on('close', function () {})

seq1.write('ls')

seq1.write('docker cp graph.json hestia-prod-django:/app/web')

seq1.write('docker exec -i hestia-prod-django ./manage.py trans "graph.json" "'+loc+'"')