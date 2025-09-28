import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AddTransactionModal } from './AddTransactionModal.tsx';

const mockAddTransaction = jest.fn((values) => {});

jest.mock('../../../hooks/useTransactions.ts', () => ({
    useAddTransaction: () => ({
        addTransaction: mockAddTransaction,
    }),
}));
jest.mock('../../../hooks/useEmployees.ts', () => ({
    useEmployees: () => ({
        employees: [
            {
                _id: '123abc',
                name: 'Test',
                lastname: 'Employee',
                services: [ 'Tattoo', 'Piercing' ],
            },
        ],
    }),
    useGetEmployeeServices: () => ({
        getEmployeeServices: (id) => Promise.resolve([
            'Tattoo',
            'Piercing',
        ]),
    }),
}));

const props = {
    open: true,
    handleClose: () => {},
    setOpen: (open) => {},
    getTransactions: () => {}
};

describe('AddTransactionModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('Renders correctly', () => {
       render(<AddTransactionModal {...props} />);
       expect(screen.getByText('Add Sale')).toBeInTheDocument();
       // expect(screen.getByTestId('datepicker')).toBeInTheDocument();
       expect(screen.getByTestId('employee-select')).toBeInTheDocument();
       expect(screen.getByTestId('service-select')).toBeInTheDocument();
       expect(screen.getByTestId('amount-input')).toBeInTheDocument();
       expect(screen.getByTestId('details-input')).toBeInTheDocument();
       expect(screen.getByTestId('client-name-input')).toBeInTheDocument();
       expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
       expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    /* test('User can fill the form and submit', async () => {
        render(<AddTransactionModal {...props} />);
        const datepicker = screen.getByTestId('datepicker');
        const employee_id = screen.getByRole('combobox', { name: /employee/i });
        const services = screen.getByRole('combobox', { name: /services/i });
        const amount = screen.getByLabelText(/amount/i);
        const details = screen.getByLabelText(/details/i);
        const clientName = screen.getByLabelText(/client name/i);
        const submitButton = screen.getByRole('button', { name: 'Add' });
        const values = {
            date: '2025-09-15T00:00:00.000Z',
            employee_id: '123abc',
            employee_lastname: 'Employee',
            employee_name: 'Test',
            services: ['Tattoo'],
            amount: 10000,
            details: 'Test',
            client_name: 'Pepito',
            employee: {
                _id: '123abc',
                name: 'Test',
                lastname: 'Employee',
                services: [ 'Tattoo', 'Piercing' ],
            },
        };

        fireEvent.change(datepicker, { target: { value: '2025-09-15' } });

        await userEvent.click(employee_id);
        const employeeOption = await screen.findByRole('option', { name: /test employee/i });
        await userEvent.click(employeeOption);
        
        await userEvent.click(services);
        const serviceOption = await screen.findByRole('option');
        await userEvent.click(serviceOption);

        await userEvent.type(amount, '10000');

        await userEvent.type(details, 'Test');

        await userEvent.type(clientName, 'Pepito');

        expect(datepicker).toHaveValue('2025-09-15');
        expect(screen.getByText(/test employee/i)).toBeInTheDocument();
        expect(screen.getAllByRole('textbox', { value: /tattoo/i, hidden: true })[0]).toBeInTheDocument();
        expect(amount).toHaveValue(10000);
        expect(details).toHaveValue('Test');
        expect(clientName).toHaveValue('Pepito');
        await userEvent.click(submitButton);
        expect(mockAddTransaction).toHaveBeenCalledWith(expect.objectContaining(values));
    }); */
});