import { useReducer } from 'react';
import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import useTheme from '../useTheme';

describe('Tests for useTheme hook', () => {
  it('should test that the default theme is light', async () => {
    const { result } = renderHook(() => useTheme());
    const { theme } = result.current;

    expect(theme.palette.type).toBe('light');
  });
});
