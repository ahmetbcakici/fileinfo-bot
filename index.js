const cheerio = require("cheerio");
const request = require("request");
const Discord = require("discord.js");
const token = ""; //bot key

const client = new Discord.Client();

client.on('message', (msg) => {
    if (msg.content.substring(0, 9) === "!fileinfo") {
        var message = msg.content;
        var words = message.split(' ');

        request(`https://fileinfo.com/extension/${words[1]}`, function(error, response, body) {
            const $ = cheerio.load(body);
            const siteBody = $('body');
            msg.channel.send(siteBody.find('div.infoBox:nth-child(4) > p:nth-child(1) > span:nth-child(1)').text());
        });
    }

    if (msg.content.substring(0, 6) === "!timer") {
        var message = msg.content;
        var words = message.split(' ');

        var type = words[1].slice(-1);
        var limit = words[1].slice(0, words[1].length - 1);

        if (type == 'm') limit *= 60;
        let counter = 0;

        var tmr = setInterval(function() {
            if (counter >= limit) {
                clearInterval(tmr);
                msg.channel.send("Time is up!");
            }
            counter++;
        }, 1000);
    }
})

client.on('ready', () => {
    console.log("Bot is running!");
})

client.login(token);