export const requiredValidator = (value: string | number | null | undefined) => {
  let error;
  if (value === undefined || value === '' || value === null) {
    error = 'This field is required!';
  }
  return error;
};

const maxOptionsValidator = (optionsCount: number) => {
  return (value?: string[] | number[]) => {
    let error;
    if (value && value.length > optionsCount) {
      error = `Maximum ${optionsCount} are available`;
    }

    return error;
  };
};

export const maxOptionsValidator5 = maxOptionsValidator(5);

// TODO: merge validator
