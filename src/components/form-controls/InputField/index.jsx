import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;

  // const hasErrors = formState.touched[name] && errors[name];
  const hasErrors = errors[name];

  return (
    <Controller
      name={name} //Bắt buộc => *
      control={form.control} // *
      //sử dụng UI lib nào ?
      as={TextField}
      margin="normal"
      variant="outlined"
      fullWidth
      label={label}
      disabled={disabled}
      error={!!hasErrors}
      helperText={errors[name]?.message}
    />
  );
}

export default InputField;
