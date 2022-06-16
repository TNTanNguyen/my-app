import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
// import InputField from '../../../../components/form-controls-InputField';
import InputField from 'components/form-controls-InputField'; //jscònig.json

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required('Hãy nhập nội dung.').min(4, 'Nội dung ít nhất 4 ký tự'),
  });
  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    // console.log('Todo Form:', values);
    const { onSubmit } = props;
    if (!onSubmit) {
      return;
    }
    onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField form={form} name="title" label="Todo" />
    </form>
  );
}

export default TodoForm;
