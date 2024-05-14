import { CHANGE_BLOCK, CHANGE_CHAT } from "../actionTypes/ChatTypes";

const initialState = {
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
};

export const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CHAT: {
      const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
        action.payload;
      return {
        chatId,
        user,
        isCurrentUserBlocked,
        isReceiverBlocked,
      };
    }
    case CHANGE_BLOCK: {
      return {
        ...state,
        isReceiverBlocked: !state.isReceiverBlocked,
      };
    }
    default: {
      return state;
    }
  }
};
