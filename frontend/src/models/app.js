export default {
  namespace: 'app',
  state: {
    token: '',
  },
  reducers:{
    setState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  }
}