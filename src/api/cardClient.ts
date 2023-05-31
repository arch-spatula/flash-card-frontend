import { AxiosError } from 'axios';
import { API_URLS, BASE_URL } from '../constant/config';
import axiosClient from './AxiosClient';

async function getCardsAPI() {
  try {
    const res = await axiosClient.get(BASE_URL + API_URLS.CARDS);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

async function createCardsAPI(cards: any) {
  try {
    const res = await axiosClient.post(BASE_URL + API_URLS.CARDS, cards);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

async function updateCardsAPI(id: string, cards: any) {
  try {
    const res = await axiosClient.patch(
      `${BASE_URL + API_URLS.CARDS}/${id}`,
      cards
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
