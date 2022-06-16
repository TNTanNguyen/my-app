import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

//material UI
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 36,
    padding: '0 30px',
    margin: '0px 15px 0px 0px',
  },
});

CounterFeature.propTypes = {};

function CounterFeature(props) {
  //material UI
  const classes = useStyles();

  const dispatch = useDispatch();

  const counter = useSelector((state) => state.counter);

  const handleIncrease = () => {
    const action = increase(); //action creator
    console.log(action);
    dispatch(action);
  };
  const handleDecrease = () => {
    const action = decrease(); //action creator
    dispatch(action);
  };

  return (
    <div>
      counter:{counter}
      <br />
      <Button onClick={handleIncrease} className={classes.root}>
        Increase
      </Button>
      <Button onClick={handleDecrease} className={classes.root}>
        Decrease
      </Button>
    </div>
  );
}

export default CounterFeature;
