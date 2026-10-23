// Username of someone who is currently live
import { TikTokLiveConnection, WebcastEvent } from "tiktok-live-connector";
import type { WebcastChatMessage } from "tiktok-live-connector";
import type { WebcastLikeMessage } from "tiktok-live-connector";

const tiktokUsername = "hydrogen_yt1";

// Create a new wrapper object and pass the username
const connection = new TikTokLiveConnection(tiktokUsername, {});

// Connect to the chat (await can be used as well)
connection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

// comments
/* connection.on(WebcastEvent.CHAT, (data: WebcastChatMessage) => {
  const userId = data?.user?.id;
  const displayId = data?.user?.displayId;
  const comment = data?.content;

  console.log(`${userId} (userId:${displayId}) writes: ${comment}`);
  console.log();
}); */

// gifts
/* connection.on(WebcastEvent.GIFT, (data) => {
  const userId = data?.user?.id;
  const displayId = data?.user?.displayId;

  console.log(`${displayId} (userId:${userId}) sends ${data.giftId}`);
}); */

connection.on(WebcastEvent.LIKE, (data: WebcastLikeMessage) => {
  const user = data?.user?.nickname;

  console.log(user);
});
