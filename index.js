const io = require("socket.io-client");

const ioClient = io.connect('wss://ws-feed.zebpay.com/marketdata', {
    transports: ['websocket']
});

const subscriptions = [
    'ticker_singapore/BTC-INR', //Ticker India. Worked. Other coins are ETH, BCH, LTC, XRP, EOS
    'book_singapore/BTC-INR', //Book India
    'history_singapore/BTC-INR', //History India
    'traderates/BTC-AUD', //Traderates. AUD for Australia, EUR for Europe
];

ioClient.on('connect', (data) => {
    console.log('connected');
    for (subscription of subscriptions) {
        ioClient.emit('subscribe', subscription);
        console.log('subscribed request sent for ', subscription);
    }
});

ioClient.on('disconnect', () => {
    console.log('disconnected');
    console.log('Trying reconnecting..');
    ioClient.open();
});

ioClient.on('connect_error', (error) => {
    console.log('error');
    console.log(error);
    ioClient.open();
});

ioClient.on('connect_timeout', (error) => {
    console.log('timeout');
    console.log(error);
});


for (subscription of subscriptions) {
    console.log('prepare subscription', subscription);
    listen(subscription);
}

function listen(topic) {
    console.log(topic);
    ioClient.on(topic, (data) => {
        console.log(topic, data);
    });
}