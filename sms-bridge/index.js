const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// --- AAPKI DETAILS (VERIFIED FROM SCREENSHOTS) ---
const BOT_TOKEN = '8394719862:AAGdG06eMVj_Mz4hFCqv-jHrmyiSqsDXppk'; 
const CHAT_ID = '7128071523'; 
// -----------------------------------------------

// Root route (Check karne ke liye ki server chal raha hai ya nahi)
app.get('/', (req, res) => {
    res.send('SMS Bridge is Online!');
});

// Forward route (Android App ispe data bhejegi)
app.post('/forward', async (req, res) => {
    const { sender, message } = req.body;
    
    // Telegram API URL
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    // Message Format jo Telegram par dikhega
    const text = `📩 *Naya SMS Aaya Hai*\n\n👤 *Sender:* ${sender}\n💬 *Message:* ${message}`;

    try {
        await axios.post(telegramUrl, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'Markdown'
        });
        console.log(`Success: Message from ${sender} sent to Telegram.`);
        res.status(200).json({ status: 'success', info: 'Sent to Telegram' });
    } catch (error) {
        console.error('Error sending to Telegram:', error.response ? error.response.data : error.message);
        res.status(500).json({ status: 'error', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
