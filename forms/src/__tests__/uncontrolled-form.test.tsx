import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import UncontrolledForm from '@/components/form-uncontrolled/uncontrolled-form';
import { createMockStore } from '@/__mocks__/store-mock';
import { useState } from 'react';

vi.mock('../../utils/picture-to-base64', () => ({
  default: async () => 'data:image/png;base64,dummy',
}));

vi.mock('../../utils/delay', () => ({
  default: async () => Promise.resolve(),
}));

describe('UncontrolledForm', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const TestWrapper = () => {
    const [show, setShow] = useState(true);
    return (
      <Provider store={store}>
        {show && <UncontrolledForm modalClose={() => setShow(false)} />}
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
    //
    vi.spyOn(window, 'FormData').mockImplementation(() => {
      const file = new File([new Uint8Array(10_000)], 'photo.png', {
        type: 'image/png',
      });

      const entries: [string, File | string][] = [
        ['name', 'John'],
        ['age', '30'],
        ['email', 'john@example.com'],
        ['password', 'Abcd1234!'],
        ['confirmPassword', 'Abcd1234!'],
        ['gender', 'Male'],
        ['country', 'Italy'],
        ['acceptTerms', 'on'],
        ['picture', file],
      ];

      const formDataLike = {
        get: (key: string): FormDataEntryValue | null =>
          (entries.find(([k]) => k === key)?.[1] as FormDataEntryValue) ?? null,
        [Symbol.iterator](): IterableIterator<[string, FormDataEntryValue]> {
          return entries[Symbol.iterator]() as IterableIterator<
            [string, FormDataEntryValue]
          >;
        },
      };

      return formDataLike as unknown as FormData;
    });
    //

    const fileContent = new Uint8Array(10_000).fill(97);
    const file = new File([fileContent], 'photo.png', { type: 'image/png' });
    const pictureInput = screen.getByLabelText('Picture') as HTMLInputElement;

    await userEvent.upload(pictureInput, file);
    expect(pictureInput.files?.[0]).toStrictEqual(file);
    await userEvent.click(screen.getByLabelText('Accept'));

    const submitButton = screen.getByText('Update user');
    expect(submitButton).not.toBeDisabled();
    await userEvent.click(submitButton);

    await waitFor(() => {
      const state = store.getState().formsData;
      expect(state.uncontrolled.name).toBe('John');
      expect(state.uncontrolled.age).toBe(30);
      expect(state.uncontrolled.country).toBe('Italy');
      // expect(state.uncontrolled.picture).toBe('data:image/png;base64,inner');
      expect(state.highlightUncontrolled).toBe(true);
      expect(screen.queryByText('Update user')).not.toBeInTheDocument();
    });
  });

  it('shows validation errors on empty fields', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm modalClose={() => {}} />
      </Provider>
    );

    const submitButton = screen.getByText('Update user');
    expect(submitButton).toBeEnabled();
    await userEvent.click(submitButton);

    expect(
      screen.getByText('Name should start with an uppercase letter')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Age cannot be negative or null')
    ).toBeInTheDocument();
    expect(screen.getByText('Country is required')).toBeInTheDocument();
    expect(screen.getByText('Enter valid email')).toBeInTheDocument();
    expect(screen.getByText('Add one special character')).toBeInTheDocument();
    // expect(screen.getByText('Invalid file type')).toBeInTheDocument();
    expect(screen.getByText('You must accept T&C')).toBeInTheDocument();
  });
});
