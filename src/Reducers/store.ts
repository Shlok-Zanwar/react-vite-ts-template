import { configureStore, } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import counterReducer from './countReducer';
import authReducer from './authReducer';
import globalReducer from './globalReducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type I_ReduxRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type I_AppDispatch = typeof store.dispatch;
export type I_AppSelector = (state: I_ReduxRootState) => any;

export const useAppDispatch: () => I_AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<I_ReduxRootState> = useSelector
