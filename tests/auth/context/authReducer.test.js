import { useReducer } from "react";
import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {

    const user = {
        id: 'ABC',
        name: 'felipe'
    };

    const initialState = {
        logged: false,
        user: null
    };

    test('debe de retornar el estado por defecto', () => {

        const state = authReducer(initialState, {});

        expect(state).toEqual(initialState);

    });

    test('debe de llamar el login autenticar y establecer el usuario', () => {

        
        const action = {
            type: types.login,
            payload: user
        };
        
        const state = authReducer(initialState, action);

        expect(state.logged).toBeTruthy();
        expect(state.user).toEqual(action.payload);

    });

    test('debe de llamar el logout borrar el usuario y logged en false', () => {

        const state = {
            logged: true,
            user
        }
        
        const action = { type: types.logout };
        
        const newState = authReducer(state, action);

        expect(newState.logged).toBeFalsy();
        expect(newState.user).toBeUndefined();

    });
})