import UpdateItem from '../components/UpdateItem';

function UpdatePage({ query }) {
  return <UpdateItem id={query.id} />;
}

export default UpdatePage;
