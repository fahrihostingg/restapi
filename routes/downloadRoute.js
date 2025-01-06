const express = require("express");

const router = express.Router();

router.get('/ytdl', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({
            status: 400,
            message: "URL youtube tidak diberikan!"
        });
    }
    try {
        const result = await ytdl(url);
        res.json(result);
    } catch (error) {
        console.error('Error fetching youtube data:', error);
        res.status(500).json({ error: 'Gagal mengambil data youtube.' });
    }
});

async function ytdl(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(`https://cdn35.savetube.me/info?url=${url}`);
            const result = {
                title: data.data.title,
                thumbnail: data.data.thumbnail,
                duration: {
                    seconds: data.data.duration,
                    formatted: data.data.durationLabel,
                },
                quality: data.data.video_formats[0].quality,
                url: data.data.video_formats[0].url,
            };
            return(result)
            resolve(data);            
        }
        catch (err) {
            reject(err);
        }
    });
}

module.exports = router;
