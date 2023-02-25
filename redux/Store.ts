import { CombinedState, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "./AuthState";
import { assignmentsReducer, AssignmentsState } from "./AssignmentsState";


// import { assignmentsReducer } from './AssignmentsState';
// import { combineReducers } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { authReducer } from './AuthState'

// const RootReducer = combineReducers({
//     AssignmentsState: assignmentsReducer,
//     authState: authReducer
// });

// const store = configureStore({ reducer: RootReducer });
// export default store
interface RootState extends CombinedState<{
    assignments: AssignmentsState;
    auth: AuthState;
}> { }

const rootReducer = combineReducers({
    authState: authReducer,
    assignmentsState: assignmentsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            // Be sure to ONLY add this middleware in development!
            immutableCheck: process.env.NODE_ENV !== 'production',
            serializableCheck: process.env.NODE_ENV !== 'production',
        });

        return middleware;
    },
});

export default store;