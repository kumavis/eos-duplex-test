const endOfStream = require('end-of-stream')
const { Readable } = require('readable-stream')
const FakeTransportStream = require('./fake-transport')
const BrowserStdout = require('browser-stdout')
const noop = () => {}

const source = new Readable({ read: noop })
const transport = new FakeTransportStream()
const dest = process.stdout || BrowserStdout()

// setup end listener
endOfStream(transport, (err) => {
  console.log('end!', err)
})

// connect streams
source
.pipe(transport)
.pipe(dest)

// simulate traffic
source.push('hello!\n')
source.push('hi!\n')
transport._onMessage('bonjour\n')
transport._onMessage('aloha\n')

// simulate disconnect
transport._onDisconnect()

// keep process running (just in case?)
setTimeout(() => console.log('timeout'), 2000)