require("dotenv").config();
const { Telegraf } = require("telegraf");
const { chromium } = require("playwright");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply("Send me a website URL, I will extract video links.");
});

bot.on("text", async (ctx) => {
    const url = ctx.message.text;

    if (!url.startsWith("http")) {
        return ctx.reply("❌ Send a valid URL starting with http.");
    }

    ctx.reply("⏳ Loading page & scanning...");

    try {
        const browser = await chromium.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });

        const page = await browser.newPage();

        let links = [];

        page.on("request", (req) => {
            const link = req.url();

            if (
                link.endsWith(".m3u8") ||
                link.endsWith(".mp4") ||
                link.includes("/hls/") ||
                link.includes("playlist") ||
                link.includes("master.m3u8")
            ) {
                links.push(link);
            }
        });

        await page.goto(url, { waitUntil: "networkidle" });

        const videoTags = await page.$$eval("video", (v) => v.map((x) => x.src));
        links.push(...videoTags);

        await browser.close();

        links = [...new Set(links)];

        if (links.length === 0) {
            return ctx.reply("⚠ No video links found!");
        }

        let msg = "🎥 Video Links Found:\n\n";
        links.forEach((l, i) => (msg += `${i + 1}. ${l}\n\n`));

        ctx.reply(msg);

    } catch (err) {
        ctx.reply("❌ Error loading page.");
        console.error(err);
    }
});

bot.launch();
console.log("BOT RUNNING...");
