import InputField from 'components/form-controls/InputField'; //jsconig.json
import PropTypes from 'prop-types';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityFiled from 'components/form-controls/QuantityFiled';
AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .required('Please enter quantity')
      .min(1, 'Minimum value is 1')
      .typeError('please enter number'),
  });
  const form = useForm({
    defaultValues: {
      quantity: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <QuantityFiled name="quantity" label="Quantity" form={form} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: '200px' }}
          size="large"
        >
          Add to cart
        </Button>
      </form>
    </div>
  );
}

export default AddToCartForm;
