const Discord = require ('discord.js');
const bot = new Discord.Client();

const token = '';

const PREFIX = '--'; 

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
            message.channel.send('Que pedo puto')
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
               const player= connection.play('E:\mvp.mp3', {volume : 1});
               player.on('end', () => vchannel.leave())
                }
                else if (args[1]==='2'){ 
                const player= connection.play('E:\mvp1.mp3', {volume : 1});
                player.on('end', () => vchannel.leave())
                }
                else if (args[1]==='3'){ 
                    const player= connection.play('E:\mvp2.mp3', {volume : 1});
                    player.on('end', () => vchannel.leave())
                }
                else if (args[1]==='4'){ 
                        const player= connection.play('E:\mvp3.mp3', {volume : 1});
                        player.on('end', () => vchannel.leave())
                }
            })
            }
            break;
      
      

    }
})

bot.login(token);
