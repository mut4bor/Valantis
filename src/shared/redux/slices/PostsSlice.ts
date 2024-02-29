import { createSlice } from '@reduxjs/toolkit';

const PostsSlice = createSlice({
  name: 'posts',

  initialState: {
    value: 1,
  },

  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value > 1 && state.value--;
    },
  },
});

export const { increment, decrement } = PostsSlice.actions;
export default PostsSlice.reducer;
