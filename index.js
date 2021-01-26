const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
} = require("@adiwajshing/baileys");
const {
	cekprefix
} = require('./src/cekprefix')
const { help} = require('./src/help')
const {donate}=require ('./src/donate')
const { cekvip } = require('./src/cekvip')
const { daftarvip } = require('./src/daftarvip')
const user = JSON.parse(fs.readFileSync('./src/user.json'))
ban = []
const vcard = 'BEGIN:VCARD\n' //
            + 'VERSION:0.1\n' //
            + 'FN: HIDENORY\n' //
            + 'ORG:Creator Hidenory;\n' //
            + 'TEL;type=CELL;type=VOICE;waid=6285810462881:+62-858-1046-2881\n' // NOMER HP LU
            + 'END:VCARD'
prefix = '.'
blocked = ['625810462882@s.whatsapp.net']


function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})
	client.on('credentials-updated', () => {
		fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Info Updated')
	})
	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://e.top4top.io/p_1837nveac0.jpg'
				}
				teks = `[ NEW MEMBER IN GROUP _*${mdata.subject}*_ ] \n*_____________*\n@${num.split('@')[0]}\nSELAMAT BERGABUNG\n *_____________*\nMoga betah Di group Dan Jangan Lupa Intro anjg`
				let buffer = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buffer, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://e.top4top.io/p_1837nveac0.jpg'
				}
				teks = `hey kak @${num.split('@')[0]}  Yang Ikut Keluar PeKaIH
				let buffer = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buffer, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'pJ6xKSMPCT8QMcvBzGFY'
			const insom = from.endsWith('@g.us')
			const botFebb = insom ? mek.participant : mek.key.remoteJid
			pushname2 = client.contacts[botFebb] != undefined ? client.contacts[botFebb].vname || client.contacts[botFebb].notify : undefined
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const speed = require('performance-now')
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			client.chatRead (from)

			mess = {
				wait: '[TUNGGU ASW]  sedang Di peroses',
				asik: '[TUNGGU ASW]  sedang Di peroses',
				success: 'Berhasil',
				error: {
					stick: ' Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ',
					Iv: ' [❗] Link yang lu kirim tidak valid!'
				},
				only: {
					group: '[❗] Perintah ini hanya bisa di gunakan dalam group tolol!',
					premium: '[❗] PERINTAH INI KHUSUS USER *PREMIUM*',
					mod: '[❗] PERINTAH INI KHUSUS USER *MOD HIDE BOT*',
					benned: 'Anda Ke Band Silahkan Hubungi Owner Agar Membuka Band Anda',
					ownerB: '[❗] sia saha anying? ini fitur khusus owner asw ❌',
					userB: '──「 DAFTAR 」──\nHalo COK !\nMaaf  Lu belum Terdaftar Sebagai Teman HIDE Daftar Untuk Berteman Dengan HIDE bot dengam cara, \n\nCommand : ${prefix}daftar nama|umur\nContoh : ${prefix}daftar DOBLEH|17\n\n──「 *HIDE BOT* 」──',
					admin: '[❗] Perintah ini hanya bisa di gunakan oleh admin group! ❌',
					Badmin: ' [❗] Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌',
				}
			}

const botNumber = client.user.jid
			const ownerNumber = ["6285810462881@s.whatsapp.net"]
			const mod = [ownerNumber,"6285810462881@s.whatsapp.net"]
			const adminbotnumber = ["6285810462881@s.whatsapp.net"]
			const frendsowner = ["6285810462881@s.whatsapp.net"]
			const premium = ["6285810462881@s.whatsapp.net","6282286737721@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupOwner = isGroup ? groupMetadata.owner : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isUser = user.includes(sender)
			const isOwner = ownerNumber.includes(sender)
			const isBanned = ban.includes(sender)
			const isPremium = premium.includes(sender)
			const ismod = mod.includes(sender)
			const errorurl2 = 'https://i.ibb.co/dttZM8b/591530180aad.png'
			const isadminbot = adminbotnumber.includes(sender)
			const isfrendsowner = frendsowner.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
		switch(command) {
				case 'help':
				case 'menu':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					client.sendMessage(from, help(prefix), text)
					break
				    case 'donate':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					client.sendMessage(from, donate(prefix), text)
					break
				    case 'sticker':
				    case 'stiker':
				    case 's':
					 if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'pJ6xKSMPCT8QMcvBzGFY'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break
				    case 'listsay':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply('Kamu Siapa Owner?')
					client.sendMessage(from, listsay(prefix), text, { quoted: mek })
					break
					case 'daftarvip':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					client.sendMessage(from, daftarvip(prefix) , text, { quoted: mek })
					break
					case 'cekvip':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (!isPremium) return reply('Anda bukan Member Premium, silakan hubungi owner atau ketik *#daftarvip* untuk membeli akses Premium!' ,text, { quoted: mek })
					me = client.user
					uptime = process.uptime()
					client.sendMessage(from,  `*──────────────────*\n*Nama bot:* *${me.name}*\n*─────────────────*\n『 *𝐕𝐈𝐏 𝐔𝐒𝐄𝐑*』\n*──────────────────*\n*•Nomor:* *${sender.split("@s.whatsapp.net")[0]}*\n*•Status:* *ACTIVE*\n*──────────────────*\n*Status Bot:* *${kyun(uptime)}*\n*──────────────────*` , text, { quoted: mek, })
					break
					case 'addvip':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (!isPremium) return reply('Anda bukan Member Premium, silakan hubungi owner atau ketik *#daftarvip* untuk membeli akses Premium!' ,text, { quoted: mek })
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '╭────「 *PREMIUM👑* 」──*\n│+ *Number* : \n│+ *Expired*: *30 Days*\n│+ *Status*: *ACTIVE*\n│ Thx for Upgrade to Premium🥰\n*╰──────「 *HIDENORY* 」────'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.sendMessage(from, mentioned)
					} else {
						mentions(`╭────「 *PREMIUM👑* 」──*\n│+ *Number* : @${mentioned[0].split('@')[0]}\n│+ *Expired*: *30 Days*\n│+ *Status*: *ACTIVE*\n│ Thx for Upgrade to Premium🥰\n*╰──────「 *HIDENORY* 」────`, mentioned, true)
					client.sendMessage(from, mentioned)
				    }
					break
					case 'dellvip':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					if (!isPremium) return reply('Anda bukan Member Premium, silakan hubungi owner atau ketik *#daftarvip* untuk membeli akses Premium!' ,text, { quoted: mek })
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '╭────「 *PREMIUM👑* 」──*\n│+ *Number* : \n│+ *Status*: *DEACTIVE*\n│ See u for next order🙂\n*╰──────「 *HIDENORY* 」────'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.sendMessage(from, mentioned)
					} else {
						mentions(`╭────「 *PREMIUM👑* 」──*\n│+ *Number* : @${mentioned[0].split('@')[0]}\n│+ *Status*: *DEACTIVE*\n│ See u for next order🙂\n*╰──────「 *HIDENORY* 」────`, mentioned, true)
					client.sendMessage(from, mentioned)
				    }
					break
					case 'daftar':
					client.updatePresence(from, Presence.composing)
					if (isUser) return reply('kamu sudah terdaftar')
					if (args.length < 1) return reply(`Parameter Salah\nCommand : ${prefix}daftar nama|umur\nContoh : ${prefix}daftar DOBLEH|17`)
					var reg = body.slice(8)
					var jeneng = reg.split("|")[0];
					var umure = reg.split("|")[1];
						user.push(sender)
						fs.writeFileSync('./src/user.json', JSON.stringify(user))
						client.sendMessage(from, `\`\`\`Pendaftaran berhasil dengan SN: TM08GK8HEUZBEHDO\`\`\`\n\n\`\`\`Pada ${date} ${time}\`\`\`\n\`\`\`[Nama]: ${jeneng}\`\`\`\n\`\`\`[Nomor]: wa.me/${sender.split("@")[0]}\`\`\`\n\`\`\`[Umur]: ${umure}\`\`\`\n\`\`\`Untuk menggunakan bot\`\`\`\n\`\`\`silahkan\`\`\`\n\`\`\`kirim ${prefix}help\`\`\`\n\`\`\`\nTotal Pengguna ${user.length}\`\`\``, text, {quoted: mek})
					break
					case 'premiumcek':
					if (isBanned) return reply(mess.only.benned)    
					if (!isUser) return reply(mess.only.userB)
					sa = await getBuffer(`https://i.ibb.co/PcQ6tsB/79ac87b9358c.jpg`)
					client.sendMessage(from, sa, image, { quoted: mek, caption: '*╭────*「 *PREMIUM USER👑* 」\n*│+ wa.me/6281368646011*╰──────*「 * HIDENORY* 」*────*\n\n*_JIKA INGIN MENJADI PREMIUM USER  HIDE BOT_*\n*_Ketik #daftarvip*' })
					break
					case 'cekmod': 
 
					if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)  
                 if (!ismod) return reply('kamu Belum Terdaftar sebagai User Modbot')
                reply('kamu udah ke daftar sebagai user Modbot')
                break
                    case 'modbotlist':
					teks = 'This is list of user premium :\n'
					for (let p of mod) {
						teks += `~> @${p.split('@')[0]}\n`
					}
					teks += `Total : ${mod.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": mod}})
					break
					case 'addpremium':
					if (isBanned) return reply(mess.only.benned)    
					client.updatePresence(from, Presence.composing) 
 
					if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					premium = args[0]
					reply(`Perintah Diterima menambah User Premium : ${premium}`)
					break
					case 'kalkulator':
					if (isBanned) return reply(mess.only.benned)    
				   if (!isUser) return reply(mess.only.userB)
				     if (args.length < 1) return reply(`[❗] Kirim perintah *${prefix}kalkulator [ Angka ]*\nContoh : ${prefix}kalkulator 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`)
				    const Math_js = require('mathjs')
				    mtk = body.slice(6)
				    if (typeof Math_js.evaluate(mtk) !== "number") {
					reply(`"${mtk}", bukan angka!\n[❗] Kirim perintah *${prefix}kalkulator [ Angka ]*\nContoh : ${prefix}kalkulator 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`)
				} else {
					reply(`*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`)
				}
				    break
				
 case 'ingfo':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Author* : *HIDENORY*\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}\n*Public:* ON\n*Total User Premium*: ${premium.length}\n*Total Chat* : ${totalchat.length}\n*`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
					case 'profile':
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (isBanned) return reply(mess.only.benned)    
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Anuther* : * HIDENORY*\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}\n*Public:* OFF`
					buffer111 = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer111, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
					 case 'chatlist':
					 client.updatePresence(from, Presence.composing)  
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                
					teks = 'This is list of chat number :\n'
					for (let all of totalchat) {
						teks += `~> @${all}\n`
					}
					teks += `Total : ${totalchat.length}`
					 client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": totalchat}})
					break
				case 'listblock': 
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (isBanned) return reply(mess.only.benned)    
					teks = '𝐁𝐋𝐎𝐂𝐊 𝐋𝐈𝐒𝐓 :\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `𝐓𝐨𝐭𝐚𝐥 : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
					case 'fitnah':
                 if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (!isGroup) return reply(mess.only.group)
					if (!isPremium) return reply(mess.only.premium)
				if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)
				var gh = body.slice(8)
				mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("|")[0];
					var target = gh.split("|")[1];
					var bot = gh.split("|")[2];
					client.sendMessage(from, `${bot}`, text, {quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` }}})
					break
					case 'hidetag':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (!isGroup) return reply(mess.only.group)
					if (!isPremium) return reply(mess.only.premium)
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
					case 'setprefix':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (args.length < 1) return
					if (!isPremium) return reply(mess.only.premium)
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi :「* ${prefix} *」`)
					break
					case 'bc':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (!isOwner) return reply('sia saha anying?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buffer = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buffer, image, {caption: `[ HIDENORY Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('Suksess broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ * HIDENORY Broadcast* ]\n\n${body.slice(4)}`)
						}
						reply('Suksess broadcast')
					}
					break
				case 'add':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
					break
			    case 'kick':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
			
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				})
					
		//comingsoon
				
			