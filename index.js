const Discord = require ('discord.js');
const bot = new Discord.Client();


const ytdl = require("ytdl-core");
const PREFIX = '--'; 
var servers = {};

bot.on('ready', () => {
    console.log('El bot esta en linea');
})

bot.on('message', message=>{
    let args = message.content.slice(PREFIX.length).split(" ");

    switch (args[0]){
        case 'help':
            const embed2 = new Discord.MessageEmbed()
            .setTitle('Comandos')
            .addField('--help', 'Muestra comandos')
            .addField('--Hola', 'Te respondo bonito')
            .addField('--info version', 'Muestra version del bot')
            .addField('--clear # ', 'Elimina n cantidad de mensajes anteriores')
            .addField('--embed', 'Muestra un embed del perfil del usuario')
            .addField('--twitch', 'Canal del poderisismo bogi')
            .setFooter('--Help 2 para mas ayuda')
            .setColor(0xffe400);
            message.channel.send(embed2);
            break;
        case 'Hola':
            message.channel.send("Que pedo puto ya te cargo el payaso perra",{tts : true})
            break;
        case 'twitch':
            message.channel.send('twitch.tv/boggi_174')
            break;
        case 'info':
            if(args[1]=== 'version'){
                message.channel.send('Version tus nalgas perra')
            }
            else{
                message.channel.send('Escribe bien puñetas')
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('Pon un segundo argumento perro')
            message.channel.bulkDelete(args[1]);
            break;
        case 'embed':
            const embed = new Discord.MessageEmbed()
            .setTitle('Info de Usuario')
            .addField('Usuario', message.author.username)
            .setColor(0xffe400)
            .addField('Version', '1.0.1')
            .setThumbnail(message.author.displayAvatarURL())
            .addField('Servidor', message.guild.name);
            message.channel.send(embed);
            break;
        case 'mvp':
            const vchannel = message.member.voice.channel;
            if(!vchannel){
                return message.reply('Unete a un canal de voz primero wey');
            }
            if(!args[1]){ return message.reply('Pon un segundo argumento perro')}
            else{
            vchannel.join().then(connection =>{
                if (args[1]==='1'){
               const player= connection.play('mvp.mp3', {volume : 1});
               player.on('end', () => vchannel.leave())
                }
                else if (args[1]==='2'){ 
                const player= connection.play('mvp1.mp3', {volume : 1});
                player.on('end', () => vchannel.leave())
                }
                else if (args[1]==='3'){ 
                    const player= connection.play('mvp2.mp3', {volume : 1});
                    player.on('end', () => vchannel.leave())
                }
                else if (args[1]==='4'){ 
                        const player= connection.play('mvp3.mp3', {volume : 1});
                        player.on('end', () => vchannel.leave())
                }
            })
            }
            break;
            case 'play':
                const vchannel3 = message.member.voice.channel;
            if(!vchannel3){
                return message.reply('Unete a un canal de voz primero wey');
            }
            if(!args[1]){ return message.reply('Pon un link wey')}
            else{
            vchannel3.join().then(connection =>{
                connection.play(ytdl(args[1], {filter : "audioonly"}))
            })    
            }
            break;
            case 'leave':
               const vchannel2 = message.member.voice.channel;
                vchannel2.leave()
                break;
            case 'addqueue':
                function play(connection,message){
                    var server = servers[message.guild.id];
                    server.dispatcher=connection.playStream(ytdl(server.queue[0], {filter: 'audioonly'}));
                    server.queue.shift();
                    server.dispatcher.on('end', function(){
                        if (server.queue[0]){
                            play(connection, message);
                        }else{
                            connection.disconnect();
                        }
                    });


                }
                const vchannel4 = message.member.voice.channel;
                if(!args[1]){
                    message.channel.send("Necesitas introducir un link");
                    return;
                }
                if(!message.member.vchannel4){
                    message.channel.send("Tienes que estar en un canal porfa we");
                    return;
                }
                if(!servers[message.guild.id])servers[message.guild.id]={ 
                    queue: []
                }
        
                var server = servers[message.guild.id];

                server.queue.push(args[1]);
        
                if(!message.guild.voiceConnection) message.member.vchannel4.join().then(function(connection){
                    play(connection, message);    
                })  


                break;
      
        

    }
})
/* Music bot */




const fs = require('fs');
const token= fs.readFileSync('token.txt').toString().trim();
bot.login(token);
