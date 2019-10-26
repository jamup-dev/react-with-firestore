import React from 'react';

export default class App extends React.Component {
  constructor(...args) {
    super(...args);
    // our state variables
    this.state = {
      hourInput: 0,
      minuteInput: 0,
      secondInput: 0,
      time: null,
      timerId: null,
    };
  }

  // ===============
  // HANDLERS
  // ===============

  /**
   * Handle change of input elements
   */
  handleChange = e => {
    // don't let user change anything, if timer is running
    if (this.state.time !== null) {
      return;
    }

    // carry on with the user input
    let numValue = Number.parseInt(e.target.value);
    if (Number.isNaN(numValue)) {
      numValue = 0;
    }
    this.setState({ [e.target.name]: numValue });
  };

  startTimer = () => {
    // get total number of seconds from the input
    const totalSeconds =
      this.state.hourInput * 3600 +
      this.state.minuteInput * 60 +
      this.state.secondInput;
    // if totalSeconds is 0, then don't do anything
    if (totalSeconds === 0) {
      return;
    }
    // add it to interval
    const timerId = setInterval(this.tick, 1000);
    this.setState({ time: totalSeconds, timerId }, () => {
      this.tick();
    });
  };

  tick = () => {
    this.setState(state => {
      const timeRemaining = state.time;
      if (timeRemaining === 0) {
        // if timer has reached it's end, then reset
        if (this.state.timerId) {
          clearInterval(this.state.timerId);
        }
        return {
          timerId: null,
          time: null,
          hourInput: 0,
          minuteInput: 0,
          secondInput: 0,
        };
      }
      const hourInput = Math.floor(timeRemaining / 3600);
      const minuteInput = Math.floor((timeRemaining % 3600) / 60);
      const secondInput = Math.floor((timeRemaining % 3600) % 60);
      return {
        time: timeRemaining - 1,
        hourInput,
        minuteInput,
        secondInput,
      };
    });
  };

  toggleTimer = () => {
    // if there is no timer, then start it
    if (this.state.timerId === null) {
      const timerId = setInterval(this.tick, 1000);
      this.setState({ timerId });
    } else {
      // clear the interval
      clearInterval(this.state.timerId);
      this.setState({ timerId: null });
    }
  };

  resetTimer = () => {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
    this.setState({
      time: null,
      timerId: null,
      hourInput: 0,
      minuteInput: 0,
      secondInput: 0,
    });
  };

  // ===============
  // LIFE CYCLE
  // ===============

  componentDidMount() {
    console.log('component mounted');
    // good place to fetch data from APIs
  }

  componentDidUpdate() {
    // called whenever there is a change in state or prop
    if (this.state.timerId === null) {
      document.title = 'Timer App';
    } else {
      document.title = `Remaining: ${this.state.hourInput}:${this.state.minuteInput}:${this.state.secondInput}`;
    }
  }

  componentWillUnmount() {
    // called when the component will unmount from react tree
    // best place to cleanup side-effects from state changes or other
    // life-cycle methods
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
  }

  // For other life-cycle and static methods, refer to the official docs
  // https://reactjs.org/docs/state-and-lifecycle.html

  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <p className="control">
                  <input
                    type="tel"
                    className="input"
                    value={this.state.hourInput}
                    name="hourInput"
                    onChange={this.handleChange}
                  />
                </p>
                <p className="help">Hour</p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    type="tel"
                    className="input"
                    value={this.state.minuteInput}
                    name="minuteInput"
                    onChange={this.handleChange}
                  />
                </p>
                <p className="help">Min</p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    type="tel"
                    className="input"
                    value={this.state.secondInput}
                    name="secondInput"
                    onChange={this.handleChange}
                  />
                </p>
                <p className="help">Sec</p>
              </div>
            </div>
          </div>
          <div className="field is-grouped">
            {this.state.time === null ? (
              <p className="control">
                <button
                  className="button is-primary"
                  type="button"
                  onClick={this.startTimer}
                >
                  Start Timer
                </button>
              </p>
            ) : (
              <>
                <p className="control">
                  <button
                    className="button is-primary"
                    onClick={this.toggleTimer}
                  >
                    {this.state.timerId ? 'Pause' : 'Resume'}
                  </button>
                </p>
                <p className="control">
                  <button className="button is-light" onClick={this.resetTimer}>
                    Reset
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}
