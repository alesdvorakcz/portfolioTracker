export const requiredValidator = (value: string | number | null | undefined) => {
  let error;
  if (value === undefined || value === '' || value === null) {
    error = 'This field is required!';
  }
  return error;
};
