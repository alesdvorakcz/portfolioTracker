import { AxiosError } from 'axios';

import { FormSubmitResult } from './formik';

export function handleSubmitErrors<T>(error: any): FormSubmitResult<T> {
  const axiosError = error as AxiosError;
  if (axiosError?.response) {
    //Server responded
    return { success: false, errors: axiosError.response.data };
  } else if (axiosError?.request) {
    //Request was made but no response
    return {
      success: false,
      errors: {},
      error: axiosError.response?.statusText ?? 'Unknown Error while communicating with server',
    };
  } else {
    //Other unknown error
    console.log('Unknown Erorr!', error);
    return { success: false, errors: {}, error: 'Unknown Error' };
  }
}
