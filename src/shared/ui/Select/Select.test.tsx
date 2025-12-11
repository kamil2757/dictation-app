import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
    { value: 'ru', label: 'Russian' },
    { value: 'en', label: 'English' },
];

describe('Select Component', () => {
    it('renders with placeholder', () => {
        render(<Select placeholder="Choose language" options={options} />);
        expect(screen.getByText('Choose language')).toBeInTheDocument();
    });

    it('opens dropdown and selects an option', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();

        render(
            <Select
                options={options}
                onChange={handleChange}
                placeholder="Select me"
            />
        );

        // 1. Находим селект
        const selectBox = screen.getByRole('combobox');

        // === ИСПРАВЛЕНИЕ ЗДЕСЬ ===
        // Вместо user.click используем fireEvent.mouseDown.
        // Ant Design открывает список именно по mouseDown.
        fireEvent.mouseDown(selectBox);

        // 2. Ждем появления опции (так как список открывается с анимацией)
        // Используем findByText, который сам ждет (await)
        const option = await screen.findByText('Russian');

        // 3. А вот по опции можно кликнуть как юзер
        await user.click(option);

        // 4. Проверки
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('ru', expect.anything());

        // Проверяем, что выбранное значение отобразилось
        // (AntD показывает выбранное значение в title или span)
        const selectedItems = screen.getAllByTitle('Russian');

        // Проверяем, что хотя бы один такой элемент есть
        expect(selectedItems.length).toBeGreaterThan(0);
        expect(selectedItems[0]).toBeInTheDocument();
    });

    it('renders as disabled', () => {
        render(<Select disabled options={options} />);
        const selectBox = screen.getByRole('combobox');
        expect(selectBox).toBeDisabled();
    });
});