import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: 'abc23',
            name: 'felipe'
        },
        logout: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrar el nombre del usuario', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByTestId('user_name').innerHTML).toBe(contextValue.user.name);

    });

    test.only('debe de llamar el logout y navigate cuanso de hace click en el boton logout', () => {

        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const btnLogout = screen.getByTestId('btnLogout');

        fireEvent.click(btnLogout);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
        

    });
})