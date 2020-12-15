import React, { Component } from 'react';
import { render } from 'react-dom';

import './styles.scss';

import  { bindActionCreators, createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const initialState = {
  count: 0,
}

// type set to avoid any typos
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

// action creators to avoid any misspell errors 
const increment = () => ({
  type: INCREMENT,
})

const decrement = () => ({
  type: DECREMENT,
})

const reset = () => ({
  type: RESET,
})


// define reducer
const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      count: state.count + 1
    }
  } 
  
  if (action.type === DECREMENT) {
    return {
      count: state.count - 1
    }
  }
  
  if (action.type === RESET) {
    return {
      count: initialState.count
    }
  }
  
  return state;
}

// create store
const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { count, increment, decrement, reset } = this.props;
    
    console.log({
      count, 
      increment
    });
    return (
      <main className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </section>
      </main>
    );
  }
}

// provides the state to the components as props
const mapStateToProps = (state) => { return state };

// provides the dispatch to the components as props
const mapDispatchToProps = {
  increment,
  decrement,
  reset
};

// connects react application with react store
const CountContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Counter);

// NOTE:
// connect(mapStateToProps, mapDispatchToProps)(Counter)
// this gives a brand new componet and does not mutates
// the count

render(
  <Provider store={store}>
    <CountContainer />
  </Provider>,
  document.getElementById('root')
);
