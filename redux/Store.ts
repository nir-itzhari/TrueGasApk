import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { assignmentsReducer } from "./AssignmentState";
import { authReducer } from "./AuthState";





const RootReducer = combineReducers({
    assignmentsState: assignmentsReducer,
    authState: authReducer
});

const store = configureStore({ reducer: RootReducer });
export default store

