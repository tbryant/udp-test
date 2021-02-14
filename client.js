const udp = require("dgram");
const argv = require("minimist")(process.argv.slice(2));
const host = argv.host || "0.0.0.0";
const port = argv.port || 8080;

// creating a client socket
var client = udp.createSocket("udp4");

//buffer msg
var data = new Uint8Array([1, 2, 3]);

client.on("message", function (msg, info) {
  console.log("Data received from server : " + msg.toString());
  console.log(
    "Received %d bytes from %s:%d\n",
    msg.length,
    info.address,
    info.port
  );
});

//sending msg
client.send(data, port, host, function (error) {
  if (error) {
    client.close();
  } else {
    console.log("Data sent !!!");
  }
});

var data1 = Buffer.from("hello");
var data2 = Buffer.from("world");

//sending multiple msg
client.send([data1, data2], port, host, function (error) {
  if (error) {
    client.close();
  } else {
    console.log("Data sent !!!");
  }
});
