/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import {login} from '../../services/authService'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers:{
        logout(state, action){
            window.localStorage.removeItem('user');
            return null; 
        },
        setUser(state, action){
            // console.log("🚀 ~ file: user.js:14 ~ setUser ~ action.payload:", action.payload)
            window.localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        }
    }
})

export const Login = credentials => {
    return async(dispatch) => {
        try {
            const user = await login(credentials);
            dispatch(setUser(user));
            return true; // Devuelve true si el inicio de sesión fue exitoso
        } catch (error) {
            console.log("🚀 ~ file: user.js:29 ~ returnasync ~ error:", error);
            return false; // Devuelve false si ocurrió un error
        }
    }
}

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;