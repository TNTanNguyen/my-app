import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import InputField from '../../../../components/form-controls-InputField';
import InputField from 'components/form-controls/InputField'; //jsconig.json

import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PasswordField from 'components/form-controls/PasswordFiled';
import * as yup from 'yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '16px auto',
    position: 'relative',
  },

  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));
function RegisterForm(props) {
  //Style
  const classes = useStyles();
  //validation
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Vui lòng nhập Họ Tên')
      .test('Nên nhập ít nhất hai chữ', 'Nhập ít nhất hai chữ', (value) => {
        console.log(value);
        return value.split(' ').length >= 2;
      }),
    email: yup.string().email('Email chưa đúng định dạng').required('Vui lòng nhập Email'),
    password: yup.string().required('Nhập Password').min(6, 'Password có ít nhất 6 ký tự'),
    retypePassword: yup
      .string()
      .required('Nhập lại password')
      .oneOf([yup.ref('password')], 'Password chưa trùng khớp'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    // console.log('Todo Form:', values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    // form.reset();
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>

      <Typography component="h1" variant="h5" className={classes.title}>
        Create an Account
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
