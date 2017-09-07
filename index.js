const endOfStream = require('end-of-stream')
const { Readable } = require('readable-stream')
const FakeTransportStream = require('./fake-transport')
const dest = process.stdout || require('browser-stdout')()
const noop = () => { }

const source = new Readable({ read: noop })

const transport = new FakeTransportStream()

endOfStream(transport, (err) => {
  console.log('end!', err)
})

source
.pipe(transport)
.pipe(dest)

source.push('hello!\n')
source.push('hi!\n')

transport._onMessage('bonjour\n')
transport._onMessage('aloha\n')

transport._onDisconnect()

setTimeout(() => console.log('timeout'), 2000)