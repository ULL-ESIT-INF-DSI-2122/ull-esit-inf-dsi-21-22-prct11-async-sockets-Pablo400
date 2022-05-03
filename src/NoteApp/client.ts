import * as net from 'net';

const client = net.connect({port: 8080}, function() {
  console.log('connected to server!');
});

client.on('data', function(data: any) {
  console.log(data.toString());
  client.end();
});

client.on('end', function() {
  console.log('disconnected from server');
});
