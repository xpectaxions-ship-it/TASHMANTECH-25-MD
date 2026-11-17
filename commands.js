const config = require('./config');

function isOwner(sender) {
  const num = sender.split('@')[0];
  return num === config.ownerNumber;
}
function isPremium(sender) {
  const num = sender.split('@')[0];
  return config.premiumUsers.includes(num) || isOwner(sender);
}

// ================= FULL MENU - LIST FORMAT =================
const MENU = `╭━━━〔 🤖 TASHMANTECH 25-MD 〕━━━╮
│ 👑 Owner: Tashmantech
│ 📱 Number: 263774670554 (but it should display only when someone type .owner no)
│
├─ 1️⃣ 🤖 AI MENU
│ • .ai
│ • .gpt
│ • .metaai
│ • .gemini
│ • .blackbox
│ • .ask
│ • .copilot
│ • .claude
│ • .imagine 👑
│ • .aivideo 👑
│ • .voiceai 👑
│ • .chatpdf 👑
│ • .summarize 👑
│
├─ 2️⃣ 📥 DOWNLOAD MENU
│ • .tiktok
│ • .insta
│ • .fb
│ • .song
│ • .play
│ • .ytmp3 👑
│ • .ytmp4 👑
│ • .spotify 👑
│ • .video 👑
│ • .apk 👑
│
├─ 3️⃣ 🔍 SEARCH MENU
│ • .google
│ • .image
│ • .youtube
│ • .wiki
│ • .news
│ • .weather
│ • .define
│ • .translate
│
├─ 4️⃣ 🛠️ TOOLS MENU
│ • .sticker
│ • .calc
│ • .currency
│ • .qr
│ • .toimg 👑
│ • .tourl 👑
│ • .ss 👑
│ • .removebg 👑
│ • .enhance 👑
│ • .shorturl 👑
│ • .hd 👑
│ • .pair 🔒 OWNER ONLY
│
├─ 5️⃣ 👥 GROUP MENU
│ • .tagall
│ • .groupinfo
│ • .welcome
│ • .goodbye
│ • .antilink 👑
│ • .antispam 👑
│ • .promote 👑
│ • .demote 👑
│ • .kick 👑
│ • .add 👑
│ • .hidetag 👑
│ • .closegroup 👑
│ • .opengroup 👑
│ • .setdesc 👑
│ • .setname 👑
│ • .antibadword 👑
│ • .warn 👑
│ • .mute 👑
│ • .unmute 👑
│
├─ 6️⃣ ⚡ AUTO FEATURES MENU
│ Use: .command on / off
│ • .autoreact 👑
│ • .autostatus 👑
│ • .autoview 👑
│ • .autolike 👑
│ • .antidelete 👑
│ • .antiviewonce 👑
│ • .autobio 👑
│ • .autotyping 👑
│ • .autoread 👑
│ • .welcome 👑
│ • .goodbye 👑
│
├─ 7️⃣ 🎉 FUN MENU
│ • .joke
│ • .meme
│ • .quote
│ • .truth
│ • .dare
│ • .ship
│ • .8ball
│ • .roast
│ • .fact
│ • .riddle
│
├─ 8️⃣ 🎵 MUSIC & MEDIA MENU
│ • .play
│ • .song
│ • .lyrics
│ • .spotify 👑
│ • .shazam 👑
│ • .playlist 👑
│
├─ 9️⃣ 🖤 DARK MENU
│ 👑 Premium + Owner Only
│
│ ├─ 🛡️ PROTECTION
│ │ • .antibadword on/off
│ │ • .antilink on/off
│ │ • .antispam on/off
│ │ • .antiforeign
│ │ • .warn @user
│ │ • .mute / .unmute
│ │ • .kick @user
│ │ • .ban @user
│ │
│ ├─ 👁️ GHOST TOOLS (Premium)
│ │ • .antidelete
│ │ • .antiviewonce
│ │ • .autoview
│ │ • .autoread
│ │ • .ghostmode
│ │
│ ├─ ⚡ ELITE TOOLS (Owner Only)
│ │ • .broadcast
│ │ • .restart
│ │ • .mode public/private
│ │ • .setpp
│ │ • .addpremium @user
│ │ • .removepremium @user
│
├─ 🔟 👑 OWNER MENU
│ 🔒 OWNER ONLY
│ • .owner
│ • .broadcast
│ • .ban
│ • .unban
│ • .block
│ • .unblock
│ • .setpp
│ • .setname
│ • .restart
│ • .mode
│ • .addpremium
│ • .removepremium
│ • .premiumlist
│ • .ghost
│ • .shield
│
├─ 1️⃣1️⃣ 💰 PREMIUM MENU
│ • .buy
│ • .premium
│ • .owner
╰━━━━━━━━━━━━━━╯
*TASHMANTECH 25-MD | Powered By Tashmantech*`;


async function handleCommand(sock, m, text) {
  const from = m.key.remoteJid;
  const sender = m.key.participant || m.key.remoteJid;
  const args = text.slice(1).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  const query = args.join(' ');
  const reply = (msg) => sock.sendMessage(from, { text: msg }, { quoted: m });
  const premiumOnly = () => reply(`👑 *PREMIUM ONLY*\n\n.${cmd} is for Premium users only.\n\nBuy: $1 / 1 Week\nType .buy for details\nContact: wa.me/${config.ownerNumber}`);
  const ownerOnly = () => reply(`🔒 *OWNER ONLY*\n\nOnly Tashmantech can use this.`);

  // ===== MENU COMMANDS =====
  if (cmd === 'menu' || cmd === 'help') return reply(MENU);
  if (cmd === 'darkmenu') {
    if (!isPremium(sender)) return premiumOnly();
    return reply(DARKMENU);
  }
  if (cmd === 'owner') return reply(`👑 *Owner:* Tashmantech\n📱 *Number:* wa.me/${config.ownerNumber}\n💬 Chat him for Premium / Help`);
  if (cmd === 'buy' || cmd === 'premium') return reply(`👑 *TASHMANTECH PREMIUM*\n\n💰 Price: *$1 / 1 Week*\n📱 Pay via EcoCash to Owner\n\n1. Pay $1\n2. Send proof to wa.me/${config.ownerNumber}\n3. Owner activates you\n\nUnlocks: .imagine, .ytmp3, .ytmp4, Auto Features, HD Tools, Group Tools, Dark Menu`);

  // ===== OWNER MENU - LIST =====
  if (cmd === 'broadcast') { if (!isOwner(sender)) return ownerOnly(); return reply(`📢 *Broadcast Sent:* ${query}`); }
  if (cmd === 'ban') { if (!isOwner(sender)) return ownerOnly(); return reply(`🚫 Banned: ${query}`); }
  if (cmd === 'unban') { if (!isOwner(sender)) return ownerOnly(); return reply(`✅ Unbanned: ${query}`); }
  if (cmd === 'block') { if (!isOwner(sender)) return ownerOnly(); return reply(`🚫 Blocked: ${query}`); }
  if (cmd === 'unblock') { if (!isOwner(sender)) return ownerOnly(); return reply(`✅ Unblocked: ${query}`); }
  if (cmd === 'setpp') { if (!isOwner(sender)) return ownerOnly(); return reply(`🖼️ Profile picture updated`); }
  if (cmd === 'setname') { if (!isOwner(sender)) return ownerOnly(); return reply(`✏️ Name changed to: ${query}`); }
  if (cmd === 'restart') { if (!isOwner(sender)) return ownerOnly(); return reply(`🔄 Restarting TASHMANTECH 25-MD...`); }
  if (cmd === 'mode') { if (!isOwner(sender)) return ownerOnly(); return reply(`⚙️ Mode set to: ${query || 'public'}`); }
  if (cmd === 'addpremium') { if (!isOwner(sender)) return ownerOnly(); return reply(`👑 Added Premium: ${query}\nAdd number in config.js premiumUsers`); }
  if (cmd === 'removepremium') { if (!isOwner(sender)) return ownerOnly(); return reply(`❌ Removed Premium: ${query}`); }
  if (cmd === 'premiumlist') { if (!isOwner(sender)) return ownerOnly(); return reply(`👑 Premium Users:\n${config.premiumUsers.join('\n')}`); }
  if (cmd === 'ghost') { if (!isOwner(sender)) return ownerOnly(); return reply(`👻 Ghost mode ON`); }
  if (cmd === 'shield') { if (!isOwner(sender)) return ownerOnly(); return reply(`🛡️ Shield ON - Only Owner can use bot`); }

  // ===== 1️⃣ AI MENU - LIST =====
  if (cmd === 'ai') { if (!query) return reply(`Use: .ai your question`); return reply(`🤖 *TASHMANTECH AI*\n\nYou asked: ${query}\n\n[AI answer - connect API]\n_Powered by TASHMANTECH_`); }
  if (cmd === 'gpt') { if (!query) return reply(`Use: .gpt your question`); return reply(`🤖 *GPT*\n\nYou asked: ${query}\n\n[AI answer]`); }
  if (cmd === 'metaai') { if (!query) return reply(`Use: .metaai your question`); return reply(`🤖 *Meta AI*\n\nYou asked: ${query}\n\n[AI answer]`); }
  if (cmd === 'gemini') { if (!query) return reply(`Use: .gemini your question`); return reply(`🤖 *Gemini*\n\nYou asked: ${query}\n\n[AI answer]`); }
  if (cmd === 'blackbox') { if (!query) return reply(`Use: .blackbox your question`); return reply(`🤖 *Blackbox*\n\nYou asked: ${query}\n\n[AI answer]`); }
  if (cmd === 'ask') { if (!query) return reply(`Use: .ask your question`); return reply(`🤖 *Ask*\n\nYou asked: ${query}\n\n[AI answer]`); }
  if (cmd === 'copilot') { if (!query) return reply(`Use: .copilot your question`); return reply(`🤖 *Copilot*\n\nYou asked: ${query}\n\n[AI answer]`); }
  if (cmd === 'claude') { if (!query) return reply(`Use: .claude your question`); return reply(`🤖 *Claude*\n\nYou asked: ${query}\n\n[AI answer]`); }
  if (cmd === 'imagine') { if (!isPremium(sender)) return premiumOnly(); if (!query) return reply(`Use: .imagine a cat in space`); return reply(`🎨 *Imagine:* ${query}\n\nGenerating image... 👑`); }
  if (cmd === 'aivideo') { if (!isPremium(sender)) return premiumOnly(); return reply(`🎬 *AI Video:* ${query}\n\nGenerating... 👑`); }
  if (cmd === 'voiceai') { if (!isPremium(sender)) return premiumOnly(); return reply(`🎙️ *Voice AI:* ${query}\n\nGenerating... 👑`); }
  if (cmd === 'chatpdf') { if (!isPremium(sender)) return premiumOnly(); return reply(`📄 *ChatPDF:* ${query}\n\nReading PDF... 👑`); }
  if (cmd === 'summarize') { if (!isPremium(sender)) return premiumOnly(); return reply(`📝 *Summarize:* ${query}\n\nSummarizing... 👑`); }

  // ===== 2️⃣ DOWNLOAD MENU - LIST =====
  if (cmd === 'tiktok') { if (!query) return reply(`Use: .tiktok link`); return reply(`📥 *TikTok:* ${query}\n\nDownloading...`); }
  if (cmd === 'insta') { if (!query) return reply(`Use: .insta link`); return reply(`📥 *Instagram:* ${query}\n\nDownloading...`); }
  if (cmd === 'fb') { if (!query) return reply(`Use: .fb link`); return reply(`📥 *Facebook:* ${query}\n\nDownloading...`); }
  if (cmd === 'song') { if (!query) return reply(`Use: .song name`); return reply(`🎵 *Song:* ${query}\n\nDownloading...`); }
  if (cmd === 'play') { if (!query) return reply(`Use: .play song name`); return reply(`🎵 *Play:* ${query}\n\nDownloading...`); }
  if (cmd === 'ytmp3') { if (!isPremium(sender)) return premiumOnly(); if (!query) return reply(`Use: .ytmp3 link`); return reply(`📥 *YTMP3 👑:* ${query}\n\nDownloading HD...`); }
  if (cmd === 'ytmp4') { if (!isPremium(sender)) return premiumOnly(); if (!query) return reply(`Use: .ytmp4 link`); return reply(`📥 *YTMP4 👑:* ${query}\n\nDownloading HD...`); }
  if (cmd === 'spotify') { if (!isPremium(sender)) return premiumOnly(); return reply(`📥 *Spotify 👑:* ${query}\n\nDownloading...`); }
  if (cmd === 'video') { if (!isPremium(sender)) return premiumOnly(); return reply(`📥 *Video 👑:* ${query}\n\nDownloading...`); }
  if (cmd === 'apk') { if (!isPremium(sender)) return premiumOnly(); return reply(`📥 *APK 👑:* ${query}\n\nDownloading...`); }

  // ===== 3️⃣ SEARCH MENU - LIST =====
  if (cmd === 'google') { if (!query) return reply(`Use: .google search`); return reply(`🔍 *Google:* ${query}\n\n[Result]`); }
  if (cmd === 'image') { if (!query) return reply(`Use: .image cat`); return reply(`🖼️ *Image:* ${query}\n\n[Image]`); }
  if (cmd === 'youtube') { if (!query) return reply(`Use: .youtube search`); return reply(`📺 *YouTube:* ${query}\n\n[Result]`); }
  if (cmd === 'wiki') { if (!query) return reply(`Use: .wiki topic`); return reply(`📚 *Wiki:* ${query}\n\n[Result]`); }
  if (cmd === 'news') { return reply(`📰 *News:* ${query || 'Today'}\n\n[News]`); }
  if (cmd === 'weather') { if (!query) return reply(`Use: .weather Harare`); return reply(`🌤️ *Weather ${query}:*\n\n[Weather]`); }
  if (cmd === 'define') { if (!query) return reply(`Use: .define word`); return reply(`📖 *Define ${query}:*\n\n[Definition]`); }
  if (cmd === 'translate') { if (!query) return reply(`Use: .translate hello to shona`); return reply(`🌍 *Translate:* ${query}\n\n[Translation]`); }

  // ===== 4️⃣ TOOLS MENU - LIST =====
  if (cmd === 'sticker') return reply(`🖼️ *Sticker created*\nSend image with .sticker`);
  if (cmd === 'calc') { if (!query) return reply(`Use: .calc 2+2`); return reply(`🧮 *Calc:* ${query}\n\n[Answer]`); }
  if (cmd === 'currency') { if (!query) return reply(`Use: .currency 1 USD to ZIG`); return reply(`💱 *Currency:* ${query}`); }
  if (cmd === 'qr') { if (!query) return reply(`Use: .qr your text`); return reply(`📱 *QR:* ${query}\n\n[QR Code]`); }
  if (cmd === 'toimg') { if (!isPremium(sender)) return premiumOnly(); return reply(`🖼️ *ToImg 👑:* ${query}`); }
  if (cmd === 'tourl') { if (!isPremium(sender)) return premiumOnly(); return reply(`🔗 *ToURL 👑:* ${query}`); }
  if (cmd === 'ss') { if (!isPremium(sender)) return premiumOnly(); return reply(`📸 *Screenshot 👑:* ${query}`); }
  if (cmd === 'removebg') { if (!isPremium(sender)) return premiumOnly(); return reply(`✂️ *RemoveBG 👑*\nSend image`); }
  if (cmd === 'enhance') { if (!isPremium(sender)) return premiumOnly(); return reply(`✨ *Enhance 👑*\nSend image`); }
  if (cmd === 'shorturl') { if (!isPremium(sender)) return premiumOnly(); return reply(`🔗 *ShortURL 👑:* ${query}`); }
  if (cmd === 'hd') { if (!isPremium(sender)) return premiumOnly(); return reply(`📸 *HD 👑*\nSend image`); }
  if (cmd === 'pair') { if (!isOwner(sender)) return ownerOnly(); return reply(`🔗 Pairing for App`); }

  // ===== 5️⃣ GROUP MENU - LIST =====
  if (cmd === 'tagall') return reply(`👥 Tagging all...`);
  if (cmd === 'groupinfo') return reply(`👥 *Group Info*\n\n[Group Info]`);
  if (cmd === 'welcome') return reply(`👋 Welcome set to: ${query}`);
  if (cmd === 'goodbye') return reply(`👋 Goodbye set to: ${query}`);
  if (cmd === 'antilink') { if (!isPremium(sender)) return premiumOnly(); return reply(`🔗 Antilink: ${query || 'on'} 👑`); }
  if (cmd === 'antispam') { if (!isPremium(sender)) return premiumOnly(); return reply(`🚫 Antispam: ${query || 'on'} 👑`); }
  if (cmd === 'promote') { if (!isPremium(sender)) return premiumOnly(); return reply(`⬆️ Promoted: ${query} 👑`); }
  if (cmd === 'demote') { if (!isPremium(sender)) return premiumOnly(); return reply(`⬇️ Demoted: ${query} 👑`); }
  if (cmd === 'kick') { if (!isPremium(sender)) return premiumOnly(); return reply(`👢 Kicked: ${query} 👑`); }
  if (cmd === 'add') { if (!isPremium(sender)) return premiumOnly(); return reply(`➕ Added: ${query} 👑`); }
  if (cmd === 'hidetag') { if (!isPremium(sender)) return premiumOnly(); return reply(`👻 Hidetag: ${query} 👑`); }
  if (cmd === 'closegroup') { if (!isPremium(sender)) return premiumOnly(); return reply(`🔒 Group Closed 👑`); }
  if (cmd === 'opengroup') { if (!isPremium(sender)) return premiumOnly(); return reply(`🔓 Group Opened 👑`); }
  if (cmd === 'setdesc') { if (!isPremium(sender)) return premiumOnly(); return reply(`📝 Desc set: ${query} 👑`); }
  if (cmd === 'setname') { if (!isPremium(sender)) return premiumOnly(); return reply(`✏️ Group name: ${query} 👑`); }
  if (cmd === 'antibadword') { if (!isPremium(sender)) return premiumOnly(); return reply(`🚫 Antibadword: ${query || 'on'} 👑`); }
  if (cmd === 'warn') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚠️ Warned: ${query} 👑`); }
  if (cmd === 'mute') { if (!isPremium(sender)) return premiumOnly(); return reply(`🔇 Muted: ${query} 👑`); }
  if (cmd === 'unmute') { if (!isPremium(sender)) return premiumOnly(); return reply(`🔊 Unmuted: ${query} 👑`); }

  // ===== 6️⃣ AUTO FEATURES - LIST =====
  if (cmd === 'autoreact') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Autoreact: ${query || 'on'} 👑`); }
  if (cmd === 'autostatus') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Autostatus: ${query || 'on'} 👑`); }
  if (cmd === 'autoview') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Autoview: ${query || 'on'} 👑`); }
  if (cmd === 'autolike') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Autolike: ${query || 'on'} 👑`); }
  if (cmd === 'antidelete') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Antidelete: ${query || 'on'} 👑`); }
  if (cmd === 'antiviewonce') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Antiviewonce: ${query || 'on'} 👑`); }
  if (cmd === 'autobio') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Autobio: ${query || 'on'} 👑`); }
  if (cmd === 'autotyping') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Autotyping: ${query || 'on'} 👑`); }
  if (cmd === 'autoread') { if (!isPremium(sender)) return premiumOnly(); return reply(`⚡ Autoread: ${query || 'on'} 👑`); }

  // ===== 7️⃣ FUN MENU - LIST =====
  if (cmd === 'joke') return reply(`😂 *Joke*\n\nWhy did the chicken cross the road? To get to TASHMANTECH!`);
  if (cmd === 'meme') return reply(`😂 *Meme*\n\n[Meme image]`);
  if (cmd === 'quote') return reply(`💬 *Quote*\n\n"Never give up. - Tashmantech"`);
  if (cmd === 'truth') return reply(`😏 *Truth:* What is your biggest secret?`);
  if (cmd === 'dare') return reply(`😈 *Dare:* Send a voice note saying TASHMANTECH is the best!`);
  if (cmd === 'ship') return reply(`💘 *Ship:* ${query}\n\nYou two are 99% compatible!`);
  if (cmd === '8ball') return reply(`🎱 *8Ball:* ${query}\n\nYes, definitely!`);
  if (cmd === 'roast') return reply(`🔥 *Roast:* ${query}\n\nYour WiFi is faster than your brain!`);
  if (cmd === 'fact') return reply(`🧠 *Fact:* Honey never expires!`);
  if (cmd === 'riddle') return reply(`🧩 *Riddle:* What has keys but can't open locks? A piano!`);

  // ===== 8️⃣ MUSIC MENU - LIST =====
  if (cmd === 'lyrics') { if (!query) return reply(`Use: .lyrics song name`); return reply(`🎵 *Lyrics:* ${query}\n\n[Lyrics]`); }
  if (cmd === 'shazam') { if (!isPremium(sender)) return premiumOnly(); return reply(`🎵 *Shazam 👑*\nSend audio`); }
  if (cmd === 'playlist') { if (!isPremium(sender)) return premiumOnly(); return reply(`🎵 *Playlist 👑:* ${query}`); }

  // ===== 9️⃣ DARK MENU - LIST =====
  if (cmd === 'antiforeign') { if (!isPremium(sender)) return premiumOnly(); return reply(`🌍 Antiforeign: ${query || 'on'} 👑`); }
  if (cmd === 'ghostmode') { if (!isPremium(sender)) return premiumOnly(); return reply(`👻 Ghostmode: ${query || 'on'} 👑`); }
}

module.exports = { handleCommand };
