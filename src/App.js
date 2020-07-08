import React, { useEffect, useCallback } from 'react';
import Networth from './components/Networth';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchNetWorth } from './actions';
import { getNetWorth } from './selectors';
import { SettingsProvider } from './contexts/SettingsContext';

const App = () => {
  const networth = useSelector(getNetWorth, shallowEqual);
  
  const dispatch = useDispatch();
  const fetchNetWorthData = useCallback(() => dispatch(fetchNetWorth()), [dispatch]);

  useEffect(() => {
    fetchNetWorthData();
  }, [fetchNetWorthData])

  return (
    <div>
      <SettingsProvider>
        {networth ? <Networth data={networth} /> : 'Loading...'}
      </SettingsProvider>
    </div>
  );
}

export default React.memo(App);
