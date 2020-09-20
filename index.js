
require('dotenv');

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'https://SparklingDarkseagreenJavabeans.corgidev.repl.run',
    title: 'Second',
    interval: 30 // minutes
});


//bot

require('dotenv').config(); 
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const { getPokemon } = require('./utils/pokemon');
client.login(process.env.BOT_TOKEN);

client.on("ready", () => console.log('pkmn plug-in on'));

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith('ottr.pokemon')) {
        const pokemon = message.content.split(" ")[1];
        const pokeData = await getPokemon(pokemon);
        const { sprites, stats, weight, name, id, base_experience } = pokeData;
        const embed = new MessageEmbed();
        embed.setTitle(`${name} #${id}`)
        embed.setThumbnail(`${sprites.front_default}`);
        stats.forEach(stat => embed.addField(stat.stat.name, stat.base_stat, true));
        embed.addField('weight', weight, true);
        embed.addField(`Base Experience`, base_experience, true);
        message.channel.send(embed);
        
    }
});