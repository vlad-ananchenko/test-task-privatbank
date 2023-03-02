export type HttpMethods = 'GET';

export interface HttpResponse<T> {
  data?: T;
  error?: string;
}

export const useFetchData = async <T>(
  url: string = process.env.REACT_APP_PUBLIC_API_URI || '',
  method: HttpMethods = 'GET'
): Promise<HttpResponse<T>> => {
  try {
    const res = await fetch(url, {
      method
    });

    if (!res.ok) {
      throw new Error('Something went wrong...');
    }

    const responseData = await res.json();
    return responseData;
  } catch (e) {
    return { error: 'Something went wrong' };
  }
};
