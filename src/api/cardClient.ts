import { AxiosError } from 'axios';
import { API_URLS, BASE_URL } from '../constant/config';
import { axiosClient } from './AxiosClient';

async function getCardsAPI() {
  try {
    const res = await axiosClient.get<{ documents: Card[] }>(API_URLS.CARDS);
    return res.data.documents;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.message;
    }
  }
}

async function createCardsAPI(card: Card) {
  try {
    const res = await axiosClient.post(BASE_URL + API_URLS.CARDS, card);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

async function updateCardsAPI(id: string, card: Card) {
  try {
    const res = await axiosClient.patch(
      `${BASE_URL + API_URLS.CARDS}/${id}`,
      card
    );
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

async function deleteCardsAPI(id: string) {
  try {
    const res = await axiosClient.post(`${BASE_URL + API_URLS.CARDS}/${id}`);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export { getCardsAPI, createCardsAPI, updateCardsAPI, deleteCardsAPI };
