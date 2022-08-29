import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchPage } from "../../../src/heroes";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container } =
            render(
                <MemoryRouter>
                    <SearchPage />
                </MemoryRouter>

            );

        expect(container).toMatchSnapshot();

        // screen.debug()
    });

    test('debe de mostrar a batman en la caja de texto y una tarjeta con info de batman', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>

        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('batman.jpg');

        const bloqueShowError = screen.getByTestId('bloqueShowError');
        expect(bloqueShowError.style.display).toBe('none');

    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>

        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman123');

        const bloqueShowError = screen.getByTestId('bloqueShowError');
        expect(bloqueShowError.style.display).toBe('');

    });

    test('debe de llamar el navigate a la pantalla nueva', () => {

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>

        );

        const query = 'felipe';

        const input = screen.getByRole('textbox');
        const form = screen.getByTestId('form');

        fireEvent.input(input, { target: { value: query } });
        fireEvent.submit(form);

        screen.debug();

        expect(input.value).toBe(query);
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${query}`);

    });

})