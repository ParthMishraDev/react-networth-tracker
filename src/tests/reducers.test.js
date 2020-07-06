import { netWorthReducer } from '../reducers';
import * as actions from '../actions';
import { networthMock } from './mock-data';

describe('Networth reducer', () => {
  it('should return the initial state', () => {
    expect(netWorthReducer(undefined, {})).toEqual(
      {
        pending: true,
        networth: null,
        error: null
      })
  })

  it('should returned networth for fetch action', () => {
    expect(netWorthReducer({}, 
      { 
        type: actions.FETCH_NETWORTH_SUCCESS,
        payload: networthMock     
      })).toEqual(
      {
        pending: false,
        networth: networthMock
      })
  })

  it('should add line item', () => {
    expect(netWorthReducer({ networth: networthMock }, 
      { 
        type: actions.ADD_LINE_ITEM,
        payload: {type: 0, id: "cd57ee40-33fb-47d2-a62e-b7f43a1b1242", label: "Investment 1", amount: "360001", networthType: "Asset"}  
      })).toEqual(
      {
        networth: {...networthMock, assets: [].concat({type: 0, id: "cd57ee40-33fb-47d2-a62e-b7f43a1b1242", label: "Investment 1", amount: "360001", networthType: "Asset"})},
      })
  })
  
  it('should delete line item', () => {
    const networthDeleted = {networth: {...networthMock, assets: [].concat({type: 0, id: "cd57ee40-33fb-47d2-a62e-b7f43a1b1242", label: "Investment 1", amount: "360001", networthType: "Asset"})}};
    expect(netWorthReducer(networthDeleted, 
      { 
        type: actions.DELETE_LINE_ITEM,
        payload: {type: 0, id: "cd57ee40-33fb-47d2-a62e-b7f43a1b1242", label: "Investment 1", amount: "360001", networthType: "Asset"}  
      })).toEqual(
      {
        networth: networthMock,
      })
  })  

  it('should update line item', () => {
    const networthUpdated = {networth: {...networthMock, assets: [].concat({type: 0, id: "cd57ee40-33fb-47d2-a62e-b7f43a1b1242", label: "Investment 1", amount: "360001", networthType: "Asset"})}};
    expect(netWorthReducer(networthUpdated, 
      { 
        type: actions.UPDATE_LINE_ITEM,
        payload: {type: 0, id: "cd57ee40-33fb-47d2-a62e-b7f43a1b1242", label: "Investment 1", amount: "360002", networthType: "Asset"}  
      })).toEqual(
      {
        networth: {...networthMock, assets: [].concat({type: 0, id: "cd57ee40-33fb-47d2-a62e-b7f43a1b1242", label: "Investment 1", amount: 360002, networthType: "Asset"})},
      })
  })
})