const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "p";

client.login('NTk3MTMxNzUyNjM2NDE2MDAw.XSDoYw.3_RiFWbR-VigVEFSWkrK2Cs0PyU');

client.on('message', message => {
    if(message.content === "phelp"){
        message.reply("Paradise In Beta")
        console.log('Le Bot est operationnel !');
    }
});

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don't have permission to use this command ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Please mention a user")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("You can't kick this user")
       if (!member.kickable) return message.channel.send("I can't kick this user")
       member.kick()
    }
})

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You don't have permission to use this command ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Please mention a user")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("You can't ban this user")
       if (!member.bannable) return message.channel.send("I can't ban this user")
       message.guild.ban(member, {days: 7})
    }
})

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have permission to use this command")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Please indicate the number of messages to be deleted")
        if (isNaN(count)) return message.channel.send("Please indicate a valid number")
        if (count < 1 || count > 100) return message.channel.send("Please indicate a number between 1 and 100")
        message.channel.bulkDelete(count + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have permission to use this command")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("This Player is not recognized")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("You can't mute it")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("I can't mute it")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' was mute')
        }
    }
})

