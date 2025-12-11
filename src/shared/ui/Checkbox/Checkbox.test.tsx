import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders children correctly', () => {
    render(<Checkbox>Accept Terms</Checkbox>);
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
  });

  it('toggles state when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Checkbox onChange={handleChange}>Click me</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(screen.getByText('Click me'));

    expect(handleChange).toHaveBeenCalledTimes(1);

  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled>Disabled</Checkbox>);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});