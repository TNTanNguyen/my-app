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

  const hasErrors = formState.touched[name] && errors[name];
  // console.log('form:', form);
  // console.log('errors', errors);
  // console.log('formState', formState);
  // console.log(errors[name], formState.touched[name]);
  return (
    <Controller
      name={name} //Bắt buộc => *
      control={form.control} // *
      //sử dụng UI lib nào ?
      as={TextField}
      fullWidth
      label={label}
      disabled={disabled}
      error={!!hasErrors}
      helperText={errors[name]?.message}
    />
    //  <TextField fullWidth />
    //</Controller>
  );
}

export default InputField;
