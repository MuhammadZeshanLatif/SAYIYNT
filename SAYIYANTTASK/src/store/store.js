import { configureStore } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk to fetch user data from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://reqres.in/api/users?page=1');
  return response.data.data;
});

// Create a slice for user data
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add a new user to the list
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    // Update an existing user in the list
    updateUser: (state, action) => {
      const { id, ...updatedUser } = action.payload;
      const userIndex = state.list.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.list[userIndex] = { ...state.list[userIndex], ...updatedUser };
      }
    },
    // Remove a user from the list
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.list = state.list.filter(user => user.id !== userId);
    },
  },
  extraReducers: builder => {
    // Handle the API request lifecycle actions
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export default configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
