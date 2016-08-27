import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const {
      header,
      children,
    } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{header}</h2>
        </div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  header: React.PropTypes.string,
  children: React.PropTypes.any,
}

export default App;
