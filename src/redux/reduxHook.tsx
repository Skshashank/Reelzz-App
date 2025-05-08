import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();


// useDispatch() → lets you send (dispatch) actions to the Redux store.

// useSelector() → lets you read parts of the Redux state inside your component.

//The plain useDispatch and useSelector are untyped.

// With these typed hooks:

// When you use useAppDispatch, TypeScript knows the correct action types.

// When you use useAppSelector, TypeScript knows the state shape, giving full autocompletion and error checking.

