import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFilltersForm.propTypes = {
  onSubmit: PropTypes.func,
};
PostFilltersForm.defaultProps = {
  onSubmit: null,
};
function PostFilltersForm(props) {
  const { onSubmit } = props;
  const [searchTemr, setSearchTemr] = useState('');
  const typingTimeoutRef = useRef(null);

  const handleSearchTemrChange = (e) => {
    setSearchTemr(e.target.value);
    const value = e.target.value;
    if (!onSubmit) {
      return;
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      const valueForm = {
        searchTemr: value,
      };
      onSubmit(valueForm);
    }, 300);
  };
  return (
    <form>
      <input type="text" value={searchTemr} onChange={handleSearchTemrChange} />
    </form>
  );
}

export default PostFilltersForm;
