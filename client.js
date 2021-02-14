const udp = require("dgram");
const argv = require("minimist")(process.argv.slice(2));
const host = argv.host || "0.0.0.0";
const port = argv.port || 8080;

// creating a client socket
var client = udp.createSocket("udp4");

client.on("message", function (msg, info) {
  console.log("Data received from server : " + msg.toString());
  console.log(
    "Received %d bytes from %s:%d\n",
    msg.length,
    info.address,
    info.port
  );
});

setInterval(() => {
  message = Date.now().toString();
  client.send(Buffer.from(message), port, host, function (error) {
    if (error) {
      client.close();
    } else {
      console.log("Data Sent: ", message);
    }
  });
}, 1000);
