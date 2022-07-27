import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
QuantityFiled.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

const useStyle = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '250px',
  },
}));
function QuantityFiled(props) {
  const { form, name, label, disabled } = props;
  const { errors, setValue } = form;

  const hasErrors = !!errors[name];

  const classes = useStyle();
  return (
    <FormControl variant="outlined" fullWidth margin="normal" error={hasErrors} size="small">
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={form.control}
        // as={OutlinedInput}
        render={({ onChange, onBlur, value, name }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)
              }
            >
              <RemoveCircleOutline />
            </IconButton>
            <OutlinedInput
              id={name}
              type="number"
              disabled={disabled}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            <IconButton
              onClick={() =>
                setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)
              }
            >
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText id={name}>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default QuantityFiled;
