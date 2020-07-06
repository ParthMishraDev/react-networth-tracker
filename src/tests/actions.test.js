import configureMockStore from 'redux-mock-store'
import * as actions from '../actions'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect'
import { networthMock } from './mock-data'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Networth actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates FETCH_NETWORTH_SUCESS when fetching networth has been done', () => {
    fetchMock.getOnce('https://localhost:44305/networth', {
      body: { networth: networthMock },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: actions.FETCH_NETWORTH_PENDING },
      { type: actions.FETCH_NETWORTH_SUCCESS, payload: { networth: networthMock } }
    ]
    const store = mockStore({ networth: {} })

    return store.dispatch(actions.fetchNetWorth()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates UPDATE_NETWORTH_SUCESS when update networth has been done', () => {
    fetchMock.putOnce('https://localhost:44305/networth', {
      body: { networth: networthMock },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: actions.UPDATE_NETWORTH_PENDING },
      { type: actions.UPDATE_NETWORTH_SUCCESS, payload: { networth: networthMock } }
    ]
    const store = mockStore({ networth: {} })

    return store.dispatch(actions.updateNetWorth()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})