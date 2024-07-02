import { messageAction } from "./message-slice";

export const sendMessage = (message) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://side-project-message-default-rtdb.firebaseio.com/.json",
        {
          method: "PUT",
          body: JSON.stringify({
            message: message,
          }),
        }
      );
    };
    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMessage = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(
        "https://side-project-message-default-rtdb.firebaseio.com/message.json"
      );
      const data = await response.json();
      return data;
    };
    try {
      const data = await fetchRequest();

      dispatch(messageAction.ReplaceMessage(data || []));
    } catch (error) {}
  };
};
