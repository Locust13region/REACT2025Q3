import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import formsReducer, { initialState } from '@/redux/form-data-slice';
import FormsView from '@/components/form-view/forms-view';

describe('FormsView', () => {
  const store = configureStore({
    reducer: { formsData: formsReducer },
    preloadedState: { formsData: initialState },
  });

  it('renders cards with correct headings and default data', () => {
    render(
      <Provider store={store}>
        <FormsView />
      </Provider>
    );

    expect(screen.getByText('Controlled')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled')).toBeInTheDocument();

    const genderFields = screen.getAllByText('Male');
    expect(genderFields).toHaveLength(2);

    const acceptFields = screen.getAllByText('false');
    expect(acceptFields).toHaveLength(2);
  });
});
