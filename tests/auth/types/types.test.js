import { types } from "../../../src/auth/types/types"

describe('Pruebas en "types"', () => {
    test.only('debe de regresar nuevos types', () => {

        expect(types).toEqual(
            {
                login: 'AuthLogin',
                logout: 'AuthLogout'
            }
        );

    });
})