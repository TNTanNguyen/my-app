import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

FillterByService.propTypes = {
  onChange: PropTypes.func,
  fillter: PropTypes.object,
};
const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    padding: '0',
    listStyle: 'none',
    margin: theme.spacing(0),
  },
}));
function FillterByService({ onChange = null, fillter = {} }) {
  const classes = useStyle();

  const handleChange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dịch Vụ</Typography>
      <Box>
        <ul className={classes.list}>
          {[
            {
              value: 'isPromotion',
              label: 'Có khuyến mãi',
            },
            {
              value: 'isFreeShip',
              label: 'Vận chuyển miễn phí',
            },
          ].map((service) => (
            <li key={service.value}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(fillter[service.value])}
                    onChange={handleChange}
                    name={service.value}
                  />
                }
                label={service.label}
              />
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

export default FillterByService;
