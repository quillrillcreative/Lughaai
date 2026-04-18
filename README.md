# 🌍 LughaAI — Kenyan Language AI Assistant

> *Mazungumzo kwa lugha yako. Chat in your language.*

LughaAI is a free, open-source AI chat assistant built specifically for Kenyan languages. Chat naturally in **Swahili, Kikuyu, Luo, Kamba, or English** — and get instant translations into any language in the world.

---

## ✨ Features

- 🗣️ **Chat in 5 Kenyan languages** — Swahili, Kikuyu, Luo, Kamba, English
- 🌐 **Auto-translation** — every reply includes an instant translation
- 🔒 **Secure API proxy** — your Anthropic key is never exposed to users
- 📱 **Works on any device** — mobile, tablet, desktop, no app needed
- ⚡ **Fast & lightweight** — single HTML file, no frameworks required
- 🎙️ **Voice-ready** — architecture supports speech input (coming soon)

---

## 🚀 Quick Start

### Prerequisites
- Free [Cloudflare account](https://cloudflare.com)
- Free [Anthropic API key](https://console.anthropic.com/keys)
- Free [Netlify account](https://netlify.com)

### 1. Deploy the Worker (keeps your key secret)
1. Go to **Cloudflare Workers & Pages → Create Worker**
2. Paste the contents of `worker.js` into the editor
3. Click **Deploy** and copy your worker URL

### 2. Add your secret API key
1. In your Worker → **Settings → Variables**
2. Add variable: `ANTHROPIC_API_KEY` = your key
3. Click **Encrypt** → **Save and Deploy**

### 3. Update the website
Open `index.html` and update this line:
```javascript
const WORKER_URL = 'https://lughaai.YOUR-NAME.workers.dev';
```

### 4. Deploy the website
Drag and drop `index.html` onto [Netlify](https://netlify.com) — done!

---

## 📁 Project Structure

```
lughaai/
├── index.html      # Full chat app (front-end)
├── worker.js       # Cloudflare Worker proxy (keeps API key secret)
└── README.md       # This file
```

---

## 🔒 Security

The app uses a **Cloudflare Worker proxy** so your Anthropic API key is:
- Never stored in the HTML
- Never visible to users
- Encrypted in Cloudflare's environment variables

```
User → index.html → worker.js (secret key) → Anthropic API → Response
```

---

## 💰 Estimated Costs

| Service | Cost |
|---|---|
| Cloudflare Worker | Free (up to 100k requests/day) |
| Netlify Hosting | Free |
| Anthropic API | ~$0.003 per conversation |
| Domain (.co.ke) | ~KES 1,000/year |

---

## 🗺️ Roadmap

**v1.0 (Current)**
- [x] Web chat in 5 Kenyan languages
- [x] Auto-translation to any world language
- [x] Secure Cloudflare Worker proxy

**v2.0 (Coming Soon)**
- [ ] WhatsApp bot via WATI
- [ ] Voice input and output
- [ ] Offline mode for low-connectivity areas

**v3.0 (Vision)**
- [ ] LughaFarm, LughaHealth, LughaShule (domain-specific bots)
- [ ] Expansion to other African languages
- [ ] SMS support for feature phones

---

## 🛠️ Customisation

### Add a new language
In `index.html`, add a chip in the language bar:
```html
<div class="lchip" onclick="setLang(this,'Kalenjin','KA','Andika Kalenjin...')">Kalenjin</div>
```

### Change the AI behaviour
Edit the `systemPrompt` variable in `index.html` to focus on a specific topic (farming, health, education) or adjust the tone.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🤝 Contributing

Pull requests are welcome! Please open an issue first to discuss what you'd like to change.

---

## 📬 Contact

- 🌐 Website: [lughaai.netlify.app](https://lughaai.netlify.app)
- 📧 Email: hello@lughaai.co.ke
- 🐦 Twitter: [@LughaAI](https://twitter.com/lughaai)

---

*Powered by [Claude AI](https://anthropic.com) by Anthropic*

*Asante kwa kutumia LughaAI 🌍 — Thank you for using LughaAI*
