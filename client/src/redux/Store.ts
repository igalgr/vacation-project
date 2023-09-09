import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./AuthReducer";
import { vacationReducer } from "./VacationReducer";
import { followReducer } from "./FollowReducer";

const authPersistConfig = {
    key: "auth",
    storage,
};

const vacationPersistConfig = {
    key: "vacation",
    storage,
}

const followPersistConfig = {
    key: "follows",
    storage,
  };

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const persistedVacationReducer = persistReducer(
    vacationPersistConfig,
    vacationReducer
);

const persistedFollowReducer = persistReducer(
    followPersistConfig,
    followReducer
  );

const rootReducer = {
    auth:persistedAuthReducer,
    vacation: persistedVacationReducer,
    follows: persistedFollowReducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  
  export const persistor = persistStore(store);
  export type RootState = ReturnType<typeof store.getState>;