import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/heroes";

describe('Pruebas en <PublicRoute />', () => {
    test('si NO esta authenticado debe de mostrar el children', () => {

        const contextValue = {
            logged: true,
            user: {
                id:'abc',
                name:'felipe'
            }
        };

        Storage.prototype.setItem = jest.fn();

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    });
})