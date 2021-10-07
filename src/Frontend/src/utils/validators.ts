export const requiredValidator = (value: string | number | undefined) => {
  let error;
  if (value === undefined || value === '') {
    error = 'This field is required!';
  }
  return error;
};
