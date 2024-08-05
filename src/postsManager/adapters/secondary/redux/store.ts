import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import postsApiRTK from "src/postsManager/infrastructure/api/rtkQueryClient/postsApiRTK";
import themeReducer from "src/postsManager/adapters/secondary/redux/themeSlice";
import authReducer from "src/postsManager/adapters/secondary/redux/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    // Add the generated reducer as a specific top-level slice
    [postsApiRTK.reducerPath]: postsApiRTK.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApiRTK.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
