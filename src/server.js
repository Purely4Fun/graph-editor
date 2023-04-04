const sequest = require('sequest');
const fs = require('fs');
const readline = require('readline-sync');
const readline1 = require("readline");

const host = readline.question("Enter hostname (username@hostname): ");
const pass = readline.question("Enter password: ");

const rl = readline1.createInterface({
  input: process.stdin,
  output: process.stdout,
  encoding: "utf8"
});

rl.question("Enter location name: ", function(loc) {
  const seq1 = sequest(host, { password: pass });
  const seq = sequest.connect(host, { password: pass });
  seq1.pipe(process.stdout);

  seq('ls', function (e, stdout) {
    if (stdout.split('\n').includes('graph.json')) {
      seq1.write('rm ~/graph.json');
      const writer = seq.put('graph.json');
      fs.createReadStream(__dirname+'/graph.json').pipe(writer);
      writer.on('close', () => {
        seq1.write('docker cp graph.json hestia-prod-django:/app/web');
        seq1.write('docker exec -i hestia-prod-django ./manage.py trans "graph.json" "'+loc+'"');
      });
    } else {
      const writer = seq.put('graph.json');
      fs.createReadStream(__dirname+'/graph.json').pipe(writer);
      writer.on('close', () => {
        seq1.write('docker cp graph.json hestia-prod-django:/app/web');
        seq1.write('docker exec -i hestia-prod-django ./manage.py trans "graph.json" "'+loc+'"');
      });
    }
  });

  // закрываем интерфейс
  rl.close();
});
