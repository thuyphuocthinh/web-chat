import { CHANGE_CHAT } from "../actionTypes/ChatTypes";

export const changeChatAction = (chatId, currentUser, user) => {
  if (user.blocked.includes(currentUser.id)) {
    return {
      type: CHANGE_CHAT,
      payload: {
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      },
    };
  } else if (user.blocked.includes(user.id)) {
    return {
      type: CHANGE_CHAT,
      payload: {
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      },
    };
  } else {
    return {
      type: CHANGE_CHAT,
      payload: {
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false,
      },
    };
  }
};
