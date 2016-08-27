import React from 'react';
import App from './App';
import QuizStep from './QuizStep';

const steps = [
{
  header: 'Make it true',
  initialValue: '5 == 4',
},
{
  header: 'Variable assignment',
  initialValue: 'var i = 5;\n\nlog("I is equal to", i);\n\ni == 10',
},
{
  header: 'Loops',
  prefix: `var sum = 0;
for (var i = 0; i <= 10; i++) {`,
  initialValue: `sum += 0;`,
  suffix: `}
log('Sum:', sum);
sum`,
  predicate: x => x == 55
},
{
  header: 'Function that sums its two parameters',
  initialValue: `function foo(a, b) {
log('a:', a, 'b:', b);
return 0;
}`,
  suffix: 'foo',
  predicate: x => x(2,5) == 7 && x(25, 55) == 80,
},
];

export default class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      idx: 3,
    };

    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
  }
  start() {
    this.setState({
      idx: 0,
      startedAt: Date.now(),
    });
  }
  next() {
    const nextIdx = this.state.idx + 1;
    if (nextIdx >= steps.length) {
      setTimeout(() => {
        this.setState({
          idx: this.state.idx + 1,
          passed: true,
          stoppedAt: Date.now(),
        });
      }, 1500);
      return;
    }
    setTimeout(() => {
      this.setState({
        idx: this.state.idx + 1,
      });
    }, 1500);
  }
  render() {
    const {
      idx,
      passed,
      startedAt,
      stoppedAt,
    } = this.state;
    if (passed) {
      return (<App header="You made it!">
        <p>You finished all the challenges in {Math.round((stoppedAt - startedAt) / 1000)} seconds.</p>
      </App>);
    }
    const step = steps[idx];
    if (!step) {
      return (<App header="Ready?">
        <button onClick={this.start}>Go</button>
      </App>);
    }
    const {
      header,
      ...quizProps,
    } = step;
    return (<App header={header}>
      <QuizStep
        {...quizProps}
        onPass={this.next}
      />
    </App>);

  }
}
