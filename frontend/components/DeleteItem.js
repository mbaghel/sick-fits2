import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

function DeleteItem({ name, id, children }) {
  const [deleteItem, { loading }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
          deleteItem().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}

export default DeleteItem;
