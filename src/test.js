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



/*var Client = require('ssh2').Client;
var connSettings = {
     host: 'feel.sfedu.ru.hosting.r61.net',
     port: 22, // Normal is 22 port
     username: 'delkin',
     password: '@%eP4dBzwq^ode'
     // You can use a key file too, read the ssh2 documentation
};
var remotePathToList = '/home/delkin';

var conn = new Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         
         sftp.readdir(remotePathToList, function(err, list) {
                if (err) throw err;
                // List the directory in the console
                console.dir(list);
                // Do not forget to close the connection, otherwise you'll get troubles
                conn.end();
         });
    });
}).connect(connSettings);*/