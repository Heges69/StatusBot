const Discord = require('discord.js')
const client = new Discord.Client();
const UR = require('uptime-robot');
const ur = new UR(process.env.URTOKEN);
require('dotenv').configure();

client.on('ready', async () => {
    const channel = await client.channels.fetch(process.env.CHANNEL);
    try {
        await channel.bulkDelete(100);
    } catch (e) { }
    var msg = await channel.send(`**Starting...**`);
    check(msg);
    setInterval(()=>{check(msg)}, 120000);
})

async function check(msg) {
    var monitors = await ur.getMonitors();
    var text = ``
    monitors.forEach(m => {
        text += `**${m.friendlyname}** - Uptime: ${m.alltimeuptimeratio}%. Status: ${(m.status == 2) ? "<:online:822529778350948452>" : "<:offline:822529831039402024>"}\n\n`
    })
    var embd = new Discord.MessageEmbed()
        .setColor('ffcc4d')
        .setTitle(`**Status of all of our Systems**`)
        .setDescription(text);
    console.log(monitors);
    msg.edit(embd);
    msg.edit('');
}




client.login(process.env.TOKEN);