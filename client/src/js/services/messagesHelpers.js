import { getNewId } from './idGenHelper';
import { getTimeFromMs } from './timeFormatHelper';

export function extendMessageData(messages) {
  return messages.map((message) => {
    if (!message.hasOwnProperty('likes')) message.likes = 0;
    message.date = new Date(message.createdAt);
    message.time = getTimeFromMs(message.createdAt);
    // message.likes = 0;
    // message.date = new Date(message.createdAt);
    // message.time = getTimeFromMs(message.createdAt);
    return message;
  });
}

export function getChatStats(messages) {
  const members = new Set();
  let messagesTotal = 0;
  let lastMessageAt = 0;

  messages.forEach((message) => {
    messagesTotal++;
    members.add(message.userId);
    const messageTime = Date.parse(message.createdAt) || message.createdAt;
    lastMessageAt = lastMessageAt < messageTime ? messageTime : lastMessageAt;
  });
  const membersTotal = members.size;
  lastMessageAt = getTimeFromMs(lastMessageAt);
  return { membersTotal, messagesTotal, lastMessageAt };
}

export function createNewMessage(text, id) {
  return {
    text,
    userId: id,
    createdAt: Date.now(),
    date: new Date(),
    isOwn: true,
    likes: 0,
    time: getTimeFromMs(Date.now()),
    id: getNewId(),
  };
}
