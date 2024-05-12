import api from "./middleware";

export const getChats = async (id: string | undefined) => {
  try {
    if (!id)
      return {
        success: false,
        response: "",
      };
    const { data } = await api.get(`/message/${id}`);

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const sendMessage = async ({
  message,
  id,
}: {
  message: string;
  id: string;
}) => {
  try {
    if (!id)
      return {
        success: false,
        response: "Please select a conversation to send message",
      };
    const { data } = await api.post(`/message/send/${id}`, { message });

    return {
      success: true,
      response: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      response: error?.response?.data?.message || "Something went wrong",
    };
  }
};
