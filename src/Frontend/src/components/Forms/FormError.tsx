import { Alert } from 'antd';
import { useFormikContext } from 'formik';
import React from 'react';

interface Props {}

const FormError: React.FC<Props> = () => {
  const { status, isSubmitting } = useFormikContext();

  if (!status || isSubmitting) return <div />;

  return <Alert type="error" message={status} />;
};

export default FormError;
