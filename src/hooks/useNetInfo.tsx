import * as React from 'react';

import NetInfo from '@react-native-community/netinfo';

export default function UseNetInfo() {
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const _isConnected: boolean = state.isInternetReachable ?? false;
      const _isReachable: boolean = state.isInternetReachable ?? false;
      setIsConnected(_isConnected && _isReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
}
