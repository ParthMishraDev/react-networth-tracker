import React, { useEffect, useCallback } from 'react';
import Networth from './components/Networth';
import './App.css';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchNetWorth } from './actions';
import { getNetWorth, getNetWorthPending } from './selectors';

const App = () => {

  const dispatch = useDispatch();
  const networth = useSelector(getNetWorth, shallowEqual);
  const pending = useSelector(getNetWorthPending, shallowEqual);
  const fetchNetWorthData = useCallback(() => dispatch(fetchNetWorth()), [dispatch]);

  useEffect(() => {
    fetchNetWorthData();
  }, [fetchNetWorthData])

  return (
    <div>
      {networth && !pending ? <Networth data={networth} /> : 'Loading...'}
    </div>
  );
}

export default App;
