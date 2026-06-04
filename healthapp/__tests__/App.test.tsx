/* import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('renders TabNavigator', () => {
    render(<App />);
    expect(screen.getByTestId('tab-navigator')).toBeTruthy();
  });

  it('calls useOnlineManager', () => {
    const useOnlineManagerMock = jest.spyOn(
      require('./hooks/useOnlineManager'),
      'useOnlineManager',
    );
    render(<App />);
    expect(useOnlineManagerMock).toHaveBeenCalled();
  });

  it('calls useAppState with onAppStateChange', () => {
    const useAppStateMock = jest.spyOn(
      require('./hooks/useAppState'),
      'useAppState',
    );
    render(<App />);
    expect(useAppStateMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('calls useMMKVListener with a callback', () => {
    const useMMKVListenerMock = jest.spyOn(
      require('react-native-mmkv'),
      'useMMKVListener',
    );
    render(<App />);
    expect(useMMKVListenerMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
 */
