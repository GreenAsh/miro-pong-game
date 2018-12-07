const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mustacheExpress = require('mustache-express')
const https = require('https')
const http = require('http')
const fs = require('fs')

const api = require('./api')
const db = require('./db')
const events = require('./events')
const config = require('./config')

const app = express()
const port = 3000

app.engine('html', mustacheExpress())
app.use(cors())
app.use('/static', express.static('static'))
app.set('view engine', 'html')
app.set('views', __dirname + '/../views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.render('index', {baseUrl: config.BASE_URL})
})

app.get('/playground', async (req, res) => {
	res.render('playground')
})

app.get('/oauth', async (req, res) => {
	const response = await api.oauth.getToken(req.query.code, req.query.client_id)
	console.log('/oauth/ response = ', response)
	if (response) {
		db.addAuthorization(response)
	}
	res.send('response: ' + JSON.stringify(response))
})

app.post('/events', (req, res) => {
	const verificationToken = req.get('X-RTB-Verification-Token')
	if (verificationToken === config.VERIFICATION_TOKEN) {
		events.processEvent(req.body, res)
	} else {
		res.status(200).send()
	}
})

// app.listen(port, () => {
// 	console.log(`App listening on port ${port}`)
// 	db.init()
// })
const httpServer = http.createServer(app);
httpServer.listen(port);

// let privateKey  = fs.readFileSync('/Users/moskalenko/Documents/GitHub/rtbhackaton5/key.pem', 'utf8');
// let certificate = fs.readFileSync('/Users/moskalenko/Documents/GitHub/rtbhackaton5/certificate.pem', 'utf8');
// let credentials = {key: privateKey, cert: certificate};
// const httpsServer = https.createServer(credentials);

/***
 * WEBSOCKET
 */

const WebSocket = require('ws');
const wss = new WebSocket.Server({
	server: httpServer
});

wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

const STOPPED = 0;
const AWAITING = 1;
const STARTED = 2;

let game = {
	state: STOPPED,
	initiator: null,
}

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(data) {
		switch (data) {
			case "prepare":
				if (game.state === STOPPED){
					game.state = AWAITING;
					game.initiator = ws;
					wss.clients.forEach(function each(client) {
						if (client !== ws && client.readyState === WebSocket.OPEN) {
							client.send(JSON.stringify({
								state: game.state
							}));
						}
					});
					game.initiator.send(JSON.stringify({
						state: game.state,
						host: true
					}));
					game.initiator.on("close", function close() {
						game.state = STOPPED;
						wss.broadcast(JSON.stringify({
							state: game.state
						}));
					})
				} else {
					ws.send(JSON.stringify({
						state: game.state
					}));
				}
				break;
			case "start":
				if (game.state === AWAITING && game.initiator === ws){
					game.state = STARTED;
					wss.broadcast(JSON.stringify({
						state: game.state
					}));
				} else {
					ws.send(JSON.stringify({
						state: game.state,
						errorMessage: "You aren't creator of this session"
					}));
				}
				break;
			case "stop":
				if (game.state === STARTED && game.initiator === ws){
					game.state = STOPPED;
					game.initiator = null;
					wss.broadcast(JSON.stringify({
						state: game.state
					}));
				} else {
					ws.send(JSON.stringify({
						state: game.state,
						errorMessage: "You aren't creator of this session"
					}));
				}
				break;
			case "state":
				ws.send(JSON.stringify({
					state: game.state
				}));
				break;
			case "whoAmI":
				ws.send(JSON.stringify({
					state: game.state,
					command: data,
					host: ws === game.initiator
				}))
				break;
			case "sync":
				if (game.state === AWAITING && game.initiator === ws){
					wss.clients.forEach(function each(client) {
						if (client !== ws && client.readyState === WebSocket.OPEN) {
							client.send(JSON.stringify({
								state: game.state,
								command: ""
							}));
						}
					});
				}
				break;
			case "join":
				if (game.state === AWAITING && game.initiator !== ws){
					ws.send(JSON.stringify({
						state: game.state,
						command: "joined"
					}))
				}
				break;
			default:
				if (game.state === STARTED && game.initiator != null){
					game.initiator.send(JSON.stringify({
						state: game.state,
						command: data
					}));
				}
				break;
		}
		ws.send(JSON.stringify({
			state: game.state
		}));
	});
});