import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../store/store.js';

const UserList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {list.map(user => (
        <li key={user.id}>
          {user.first_name} {user.last_name}
          <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
