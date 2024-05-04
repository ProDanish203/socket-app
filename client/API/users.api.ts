import api from "./middleware";

export const getAllUsers = async ({
  page,
  limit,
  search,
  filter,
}: {
  page: number;
  limit: number;
  search: string;
  filter: string;
}) => {
  try {
    const { data } = await api.get(
      `/users?limit=${limit || 25}&page=${page || 1}&search=${
        search || ""
      }&filter=${filter}`
    );
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
