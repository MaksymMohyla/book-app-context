/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://api.jsonbin.io/v3'; // free service for storing JSON data

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json',
      'X-Master-Key':
        '$2a$10$D5N9sKTEB9OgooFcrVceVudcZ9o6dVsjnf.QqqKWkXvA2DM0k5JwC',
    };
  }

  return fetch(BASE_URL + url, options)
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  put: <T>(url: string, data: any) => request<T>(url, 'PUT', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
