import queryString from 'query-string';
import { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import PostFilltersForm from './components/PostFilltersForm';
import PostList from './components/PostList';
PostFeature.propTypes = {};

function PostFeature(props) {
  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({ _page: 1, _limit: 10, _totalRows: 1 });

  const [fillter, setFillter] = useState({
    _page: 1,
    _limit: 10,
    title_like: '',
  });

  useEffect(() => {
    async function fetchData() {
      //...
      try {
        //_limit=10&_page=1
        const paramPage = queryString.stringify(fillter);
        // console.log(paramPage);
        const url = `http://js-post-api.herokuapp.com/api/posts?${paramPage}`;
        const response = await fetch(url);
        const responseJSON = await response.json();

        // console.log({ responseJSON });

        const { data, pagination } = responseJSON;

        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Failed to fetch data post list', error.message);
      }
    }
    fetchData();
  }, [fillter]);
  const handlePageChange = (newPage) => {
    // console.log('NewPage :', newPage);
    setFillter({
      ...fillter,
      _page: newPage,
    });
  };

  const handleSubmit = (valueForm) => {
    // console.log(valueForm);
    setFillter({
      ...fillter,
      _page: 1,
      title_like: valueForm.searchTemr,
    });
  };

  return (
    <div>
      <h1>Post List</h1>
      <PostFilltersForm onSubmit={handleSubmit} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default PostFeature;
