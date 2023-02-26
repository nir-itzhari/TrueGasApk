import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { assignmentsReducer } from "./AssignmentsState";
import { authReducer } from "./AuthState";





const RootReducer = combineReducers({
    AssignmentsState: assignmentsReducer,
    authState: authReducer
});

const store = configureStore({ reducer: RootReducer });
export default store

