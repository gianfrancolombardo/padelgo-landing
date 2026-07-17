import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingMonthPicker from './BookingMonthPicker';

describe('BookingMonthPicker', () => {
  it('renders available days and selects one', () => {
    const onSelect = vi.fn();

    const { container } = render(
      <BookingMonthPicker
        availableDateKeys={['2030-07-20', '2030-07-21']}
        selectedDateKey={null}
        onSelectDateKey={onSelect}
        locale="en"
      />
    );

    expect(screen.getByTestId('booking-date-calendar')).toBeInTheDocument();
    const dayButton = container.querySelector('[data-date-key="2030-07-20"]');
    expect(dayButton).not.toBeNull();
    fireEvent.click(dayButton!);
    expect(onSelect).toHaveBeenCalledWith('2030-07-20');
  });

  it('highlights the selected day', () => {
    render(
      <BookingMonthPicker
        availableDateKeys={['2030-07-20', '2030-07-21']}
        selectedDateKey="2030-07-20"
        onSelectDateKey={vi.fn()}
        locale="es"
      />
    );

    expect(screen.getByRole('button', { pressed: true })).toHaveAttribute('data-date-key', '2030-07-20');
  });

  it('navigates to the next month with one click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <BookingMonthPicker
        availableDateKeys={['2030-07-20', '2030-08-05']}
        selectedDateKey="2030-07-20"
        onSelectDateKey={onSelect}
        locale="es"
      />
    );

    expect(screen.getByText(/julio/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /mes siguiente/i }));
    expect(screen.getByText(/agosto/i)).toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledWith('2030-08-05');
  });

  it('disables past days without availability', () => {
    render(
      <BookingMonthPicker
        availableDateKeys={['2026-07-25']}
        selectedDateKey={null}
        onSelectDateKey={vi.fn()}
        locale="es"
      />
    );

    expect(screen.getByRole('button', { name: /10 de julio/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /25 de julio/i })).not.toBeDisabled();
  });
});
