import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SideNav, TopNav } from "./SideNav.tsx";

const mockNavigate = jest.fn();

jest.mock('../../hooks/useMenu.ts', () => ({
    useMenu: () => [
        {
            title: 'TestItem',
            action: () => mockNavigate('/home/transactions'),
            icon: () => <div></div>,
        },
    ],
}));

describe('SideNav', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Renders correctly', async () => {
        const { container } = render(<SideNav />);
        const sidenav = container.querySelector('.sidenav');
        await userEvent.hover(sidenav);
        expect(screen.getByText('TestItem')).toBeInTheDocument();
    })

    test('Redirects correctly', async () => {
        const { container } = render(<SideNav />);
        const sidenav = container.querySelector('.sidenav');
        await userEvent.hover(sidenav);
        const itemButton = screen.getByText('TestItem');
        await userEvent.click(itemButton);
        expect(mockNavigate).toHaveBeenCalled();
    });
});

describe('TopNav', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Renders correctly', () => {
        render(<TopNav />);
        const menuButton = screen.getByTestId('topnav-button');
        expect(menuButton).toBeInTheDocument();
    })

    test('Displays menu correctly', async () => {
        render(<TopNav />);
        const menuButton = screen.getByTestId('topnav-button');
        expect(menuButton).toBeInTheDocument();
        await userEvent.click(menuButton);
        expect(screen.getByText('TestItem')).toBeInTheDocument();
    });

    test('Redirects correctly', async () => {
        render(<TopNav />);
        const menuButton = screen.getByTestId('topnav-button');
        expect(menuButton).toBeInTheDocument();
        await userEvent.click(menuButton);
        const itemButton = screen.getByText('TestItem');
        await userEvent.click(itemButton);
        expect(mockNavigate).toHaveBeenCalled();
    });
});