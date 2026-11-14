const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const config = require('./config.js');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise(res => rl.question(q, res));

let autoFeatures = {
  autoreact: false,
  autostatus: false,
  autoview: false,
  autolike: false,
  antidelete: false,
  antiviewonce: false,
  autobio: false,
  autotyping: false,
  autoread: false,
  welcome: false,
  goodbye: false
};

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const sock = makeWASocket({ logger: pino({ level: 'silent' }), auth: state, printQRInTerminal: false });

  if (!sock.authState.creds.registered) {
    let num = await question('Enter your number with country code (e.g 263774670554): ');
    let code = await sock.requestPairingCode(num.trim());
    console.log('\nYOUR PAIRING CODE:', code);
    console.log('Go to WhatsApp > Linked Devices > Link with phone number > Enter code\n');
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (u) => {
    if (u.connection === 'open') console.log('✅ TASHMANTECH 25-MD CONNECTED!');
    if (u.connection === 'close' && u.lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) start();
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;
    const from = m.key.remoteJid;
    const sender = m.key.participant || m.key.remoteJid;
    const senderNum = sender.split('@')[0];
    const isOwner = senderNum === config.ownerNumber;
    const text = m.message.conversation || m.message.extendedTextMessage?.text || "";
    if (!text.startsWith(config.prefix)) return;
    const args = text.slice(1).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const reply = (t) => sock.sendMessage(from, { text: t }, { quoted: m });

    // OWNER COMMAND
    if (cmd === 'owner') {
      return reply(`*TASHMANTECH 25-MD*\n\nOwner: ${config.ownerName}\nNumber: 0774670554\nBot: ${config.botName}`);
    }

    // MENU COMMAND
    if (cmd === 'menu' || cmd === 'help') {
      return reply(`╭━━━〔 ${config.botName} 〕━━━╮\n│ Owner: ${config.ownerName}\n│ Number: 0774670554\n│\n├─ AI MENU\n│ .ai .gpt .metaai .gemini .blackbox .ask .copilot .claude .imagine\n│\n├─ DOWNLOAD MENU\n│ .tiktok .insta .fb .ytmp3 .ytmp4 .spotify .song .video .play .apk\n│\n├─ SEARCH MENU\n│ .google .image .youtube .wiki .news .weather .define .translate\n│\n├─ TOOLS MENU\n│ .sticker .toimg .tourl .ss .qr .removebg .enhance .shorturl .calc .currency .hd .pair\n│\n├─ GROUP MENU\n│ .antilink .antispam .welcome .goodbye .promote .demote .kick .add .tagall .hidetag .groupinfo .closegroup .opengroup .setdesc .setname\n│\n├─ AUTO FEATURES MENU\n│ Use: .command on / off\n│ .autoreact .autostatus .autoview .autolike .antidelete .antiviewonce .autobio .autotyping .autoread .welcome .goodbye\n│\n├─ FUN MENU\n│ .joke .meme .quote .truth .dare .ship .8ball .roast .fact .riddle\n│\n├─ MUSIC & MEDIA MENU\n│ .play .song .lyrics .spotify .shazam .playlist\n│\n├─ OWNER MENU\n│ .owner .broadcast .ban .unban .block .unblock .setpp .setname .restart .mode\n│\n╰━━━━━━━━━━━━━━╯\n${config.botName} | By ${config.ownerName}`);
    }

    // AUTO FEATURES ON/OFF
    if (autoFeatures.hasOwnProperty(cmd)) {
      if (!isOwner) return reply('❌ Only owner can use this.');
      let action = args[0]?.toLowerCase();
      if (action === 'on') { autoFeatures[cmd] = true; return reply(`✅ ${cmd} turned ON`); }
      if (action === 'off') { autoFeatures[cmd] = false; return reply(`❌ ${cmd} turned OFF`); }
      return reply(`Use: .${cmd} on / off\nCurrent: ${autoFeatures[cmd] ? 'ON ✅' : 'OFF ❌'}`);
    }

    if (cmd === 'ping') return reply('Pong! TASHMANTECH 25-MD is alive ✅');
  });
}
start();
