import { Button, Col, Row } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import { Ref } from 'react';

import { AccountDetail } from '../../../api/models';
import { FormikTextInput } from '../../../components/Forms/formik';

interface Props {
  formRef?: Ref<FormikProps<FormValues>>;
  hideSubmitButton?: boolean;
  account: AccountDetail;
}

export interface FormValues {
  name?: string;
  slug?: string;
  currencyId?: string;
}

const EditAccountForm: React.FC<Props> = ({ formRef, account, hideSubmitButton }) => {
  const initialValues: FormValues = {
    name: account.name,
    slug: account.slug,
    currencyId: account.currencyId,
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          //TODO
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
        innerRef={formRef}
      >
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <FormikTextInput name="name" label="Name" />
            </Col>

            <Col span={12}>
              <FormikTextInput name="slug" label="Slug" />
            </Col>
          </Row>
          <FormikTextInput name="currencyId" label="Currency" />
          {!hideSubmitButton && (
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default EditAccountForm;
