import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('Pruebas en <AppRouter />', () => {
    test('debe de mostrar el login si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThan(1);

    });

    test.only('debe de mostrar el componente de Marvel si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'abc123',
                name: 'felipe'
            }
        };

        // Aun cdo el initialEntries es login, lo que estamos forzando es que
        // por default, si esta autenticado nos redirigira a /marvel

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBe('Marvel Comics');

    });

})