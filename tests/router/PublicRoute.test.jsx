import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/heroes";

describe('Pruebas en <PublicRoute />', () => {
    test('si NO esta authenticado debe de mostrar el children', () => {

        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Hola Mundo</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Hola Mundo')).toBeTruthy();
    });

    test('debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'felipe'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Hola Mundo</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={<h1>Marvel Page</h1>} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Marvel Page')).toBeTruthy();
    });
})
