# Sample rtb app
Handy playground for playing with RealtimeBoard API and Webhooks.


### How to use
1) Run `npm install`
2) Run `npm run start`
3) Run `ngrok http 3000`
4) Edit `config.js`:
    - Set BASE_URL from ngrok
    - Set CLIENT_SECRET from the App settings
    - Set VERIFICATION_TOKEN from the App settings


### How it works

`app.js` is entry point

`api.js` contains methods for work with API

`config.js` contains configs, edit this file before usage

`events.js` process webhook events
 
`db.js` is simple DataBase which works with file database.txt
