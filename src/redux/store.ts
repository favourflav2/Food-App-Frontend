import { combineReducers, configureStore} from "@reduxjs/toolkit";
import foodSlice from "./features/foodSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
  
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  food: foodSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
     serializableCheck: false,
    //{
    //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,'food.setDateState'],
    //   ignoredPaths: ['food.DateState','food.TimeState','food.setDateState'],
    // },
  }),
});

// Need this in order to use useDipatch and useSelctor
export const Dispatch: () => typeof store.dispatch = useDispatch;
export const UseSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
