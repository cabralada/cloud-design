import React from 'React';
import configureStore from 'redux-mock-store'

import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

import { createStore } from 'redux';
import dataReducer from './../reducers/data-reducer';

Enzyme.configure({ adapter: new Adapter() });

const initialState = {data:[]}
const mockStore = configureStore();

let store, component, redux;

beforeEach(()=>{
  redux = createStore(dataReducer);
  store = mockStore(initialState);
  component = shallow(<App store={store} />);
})

console.log('store:', store)
console.log('redux:', redux)
console.log('component:', component)

describe('<App />', () => {
  it('Should work a');
})