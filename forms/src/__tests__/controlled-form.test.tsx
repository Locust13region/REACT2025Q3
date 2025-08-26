import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import ControlledForm from '@/components/form-controlled/controlled-form';
import { createMockStore } from '@/__mocks__/store-mock';
import { useState } from 'react';

vi.mock('../../utils/picture-to-base64', () => ({
  default: async () => 'data:image/png;base64,dummy',
}));

vi.mock('../../utils/delay', () => ({
  default: async () => Promise.resolve(),
}));

describe('ControlledForm', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  const TestWrapper = () => {
    const [show, setShow] = useState(true);
    return (
      <Provider store={store}>
        {show && <ControlledForm modalClose={() => setShow(false)} />}
      </Provider>
    );
  };

  it('renders all fields and submits valid data', async () => {
    render(<TestWrapper />);

    await userEvent.type(screen.getByLabelText('Name'), 'John');
    await userEvent.type(screen.getByLabelText('Age'), '30');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'Abcd1234!');
    await userEvent.type(
      screen.getByLabelText('Confirm password'),
      'Abcd1234!'
    );
    await userEvent.click(screen.getByLabelText('Male'));
    await userEvent.selectOptions(screen.getByLabelText('Country'), 'Italy');
    const file = new File(['inner'], 'photo.png', { type: 'image/png' });
    const pictureInput = screen.getByLabelText('Picture') as HTMLInputElement;
    await userEvent.upload(pictureInput, file);
    expect(pictureInput.files?.[0]).toStrictEqual(file);
    await userEvent.click(screen.getByLabelText('Accept'));

    const submitButton = screen.getByText('Update user');
    expect(submitButton).toBeEnabled();
    await userEvent.click(submitButton);

    await waitFor(() => {
      const state = store.getState().formsData;
      expect(state.controlled.name).toBe('John');
      expect(state.controlled.age).toBe(30);
      expect(state.controlled.country).toBe('Italy');
      expect(state.highlightControlled).toBe(true);
      expect(screen.queryByText('Update user')).not.toBeInTheDocument();
    });
  });

  it('shows validation errors on empty fields', async () => {
    render(
      <Provider store={store}>
        <ControlledForm modalClose={() => {}} />
      </Provider>
    );

    const submitButton = screen.getByText('Update user');
    expect(submitButton).toBeDisabled();
  });

  it('shows validation errors on user enter invalid data', async () => {
    render(
      <Provider store={store}>
        <ControlledForm modalClose={() => {}} />
      </Provider>
    );

    await userEvent.click(screen.getByLabelText('Name'));
    await userEvent.click(screen.getByLabelText('Age'));
    await userEvent.selectOptions(
      screen.getByLabelText('Country'),
      'Please select a country'
    );
    await userEvent.click(screen.getByLabelText('Email'));
    await userEvent.click(screen.getByLabelText('Password'));
    await userEvent.click(screen.getByLabelText('Accept'));
    await userEvent.click(screen.getByLabelText('Accept'));

    const submitButton = screen.getByText('Update user');
    expect(submitButton).toBeDisabled();

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(
      await screen.findByText('Age must be specified')
    ).toBeInTheDocument();
    expect(await screen.findByText('Country is required')).toBeInTheDocument();
    expect(await screen.findByText('Enter valid email')).toBeInTheDocument();
    expect(
      await screen.findByText('Must be at least 8 characters')
    ).toBeInTheDocument();
    expect(await screen.findByText('You must accept T&C')).toBeInTheDocument();
  });
});
