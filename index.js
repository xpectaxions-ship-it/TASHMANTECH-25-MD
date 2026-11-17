const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const config = require('./config');
const { handleCommand } = require('./commands');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    auth: state,
    printInTerminal: true,
    browser: ["TASHMANTECH 25-MD", "Chrome", "1.0"]
  });

  // Pairing Code - For Termux, no QR needed
  if (!sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        const code = await sock.requestPairingCode(config.pairingNumber);
        console.log("\n=================================");
        console.log("YOUR PAIRING CODE: " + code);
        console.log("Go to WhatsApp > Linked Devices > Link with phone number");
        console.log("Enter this code: " + code);
        console.log("=================================\n");
      } catch (e) {
        console.log("Pairing error:", e.message);
      }
    }, 3000);
  }

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Disconnected, restarting...');
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log('✅ TASHMANTECH 25-MD ONLINE!');
    }
  });

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;
    const text = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || m.message.videoMessage?.caption || "";
    if (!text.startsWith(config.prefix)) return;
    try {
      await handleCommand(sock, m, text);
    } catch (e) {
      console.log("Command error:", e.message);
    }
  });
}

startBot();
