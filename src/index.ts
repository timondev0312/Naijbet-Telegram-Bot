import TelegramBot, { Message } from "node-telegram-bot-api";
// import { userLogin } from "./auth";
import { BOT_TOKEN, WEB_APP_URL } from "./config";

export const runBot = () => {
  const bot = new TelegramBot(BOT_TOKEN as string, {
    polling: true,
  });

  bot.on("polling_error", console.log);

  bot.getMe().then(function (info) {
    console.log(`
        ${info.first_name} is ready, the username is @${info.username}
        `);
  });

  bot.onText(
    /\/start(?:\s+(.*))?/,
    (msg: Message, match: RegExpExecArray | null) => {
      const chatId = msg.chat.id;
      // const userName = msg.from.username;

      console.log(match, "this is match", msg, "this is msg");

      // if (match) {
      //   const referral = match[1];
      //   userLogin({
      //     userEmail: msg.from?.username,
      //     userName: msg.from?.first_name,
      //   });
      // }

      const replyMarkup = {
        inline_keyboard: [
          [{ text: "Open Vegastar", web_app: { url: WEB_APP_URL as string } }],
        ],
      };

      bot.sendPhoto(
        chatId,
        "https://admin.naijabet.bet/static/media/logo.21c8b3b3.png",
        {
          caption: `Welcome, @${msg.from?.username}, to the NaijaBet!`,
          reply_markup: replyMarkup,
        }
      );

      // bot.sendPhoto(chatId, "https://contents.static-slotcity.com/game_pic/ppc/en/216x160/vs12scode.jpg", { reply_markup: replyMarkup });
      // bot.sendMessage(chatId, `Welcome, ${userName}, to the Vegastar Casino!`, { reply_markup: replyMarkup });
    }
  );
};

runBot();