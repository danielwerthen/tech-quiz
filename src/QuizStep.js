import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.initialValue || '',
    };
  }
  componentWillMount() {
    this.updateValue(this.state.value);
  }
  updateValue(value) {
    const {
      prefix = '',
      suffix = '',
    } = this.props;
    const messages = [];
    const errors = [];
    let result = null;
    try {
      const log = (...str) => messages.push(str.join(' '));
      result = eval([
        prefix,
        value,
        suffix,
      ].join('\n'));
    } catch (e) {
      errors.push(e.message);
    }
    const {
      predicate,
      onPass,
    } = this.props;
    const passed = predicate(result);
    if (passed && onPass) {
      onPass();
    }
    this.setState({
      value,
      messages,
      errors,
      passed,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.initialValue !== nextProps) {
      this.updateValue(nextProps.initialValue);
    }
  }
  render() {
    const {
      prefix,
      suffix,
    } = this.props;
    const {
      value,
      messages = [],
      errors = [],
      passed = false,
    } = this.state;
    return (
      <div>
        {prefix && <pre
          style={{
            width: '80%',
            margin: '50px auto -45px auto',
            textAlign: 'left',
          }}
        >{prefix}</pre>}
        <textarea
          style={{
            borderColor: passed ? 'green' : '#333',
            outlineColor: passed ? 'green' : '#333',
          }}
          value={value}
          rows={10}
          onChange={e => this.updateValue(e.target.value)}
        />
        {suffix && <pre
          style={{
            width: '80%',
            margin: '-45px auto 50px auto',
            textAlign: 'left',
          }}
        >{suffix}</pre>}
        <p style={{ color: 'red' }}>{errors.join('\n')}</p>
        <pre>{messages.join('\n')}</pre>
      </div>
    );
  }
}

App.propTypes = {
  initialValue: React.PropTypes.string,
  predicate: React.PropTypes.func,
  onPass: React.PropTypes.func,
}

App.defaultProps = {
  predicate: i => i,
};

export default App;
