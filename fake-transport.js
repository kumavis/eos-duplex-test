const Duplex = require('readable-stream').Duplex
const inherits = require('util').inherits
const noop = () => { }

module.exports = FakeTransportStream


inherits(FakeTransportStream, Duplex)

function FakeTransportStream () {
  Duplex.call(this, {
    objectMode: true,
  })
}

// private

FakeTransportStream.prototype._onMessage = function (msg) {
  this.push(msg)
}

FakeTransportStream.prototype._onDisconnect = function () {
  this.push(null)
}

// stream plumbing

FakeTransportStream.prototype._read = noop

FakeTransportStream.prototype._write = function (msg, encoding, cb) {
  try {
    // push into transport
    // this._port.postMessage(msg)
  } catch (err) {
    // console.error(err)
    return cb(new Error('FakeTransportStream - disconnected'))
  }
  cb()
}
