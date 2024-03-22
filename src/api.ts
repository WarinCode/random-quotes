import axios, { isAxiosError, AxiosError, AxiosResponse } from "axios";

const fetchAPI = async (options: RapidAPI.APIOptions): Promise<RapidAPI.APIResponse | null> => {
  try {
    const response: AxiosResponse<RapidAPI.APIResponse> = await axios.request<RapidAPI.APIResponse>(options);
    const data: RapidAPI.APIResponse = response.data;
    return data;
  } catch (err: unknown) {
    if (isAxiosError(err) || err instanceof AxiosError) {
      console.error(new AxiosError(err.message));
    }
    throw null;
  }
}

export default fetchAPI;
