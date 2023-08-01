
const TOKEN = 'MTEzNTcxMDI3ODExODU1NTgyOQ.GojwXM.mE3Iw0acv_ExEsX0QylKADSrk0uqAvk9aTuDYU';


import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

  
client.login(TOKEN);