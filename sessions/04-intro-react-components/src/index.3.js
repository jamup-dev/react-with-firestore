import React from 'react';
import ReactDOM from 'react-dom';

// A custom component
// It creates a HTML button with proper styles and stuff
// Also accepts children and onClick handler
function Button(props) {
  const { radius, onClick, children, className = '' } = props;
  let radiusClassName = 'rounded';
  // if on adjacent left, then delete
  if (radius === 'adjl') {
    radiusClassName = 'rounded-l border-r-0';
  } else if (radius === 'adjr') {
    radiusClassName = 'rounded-r border-l-0';
  }
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-1 border ${radiusClassName} border-blue-400 border-solid hover:border-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline text-blue-500 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

function Input(props) {
  const { value, onChange, ...inputProps } = props;
  return (
    <input
      className="px-4 py-1 border border-blue-400 border-solid hover:border-blue-500 focus:outline-none focus:shadow-outline text-blue-600"
      type="tel"
      value={value}
      onChange={onChange}
      {...inputProps}
    />
  );
}

function Title({ children, className = '' }) {
  return (
    <h2
      className={`font-sans-serif uppercase text-gray-600 text-lg mb-5 ${className}`}
    >
      {children}
    </h2>
  );
}

// Our primary App component
function App() {
  const [exampleState, setExampleState] = React.useState('state 1');
  const [clickedTimes, setClickedTimes] = React.useState(0);

  const [count, setCount] = React.useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const handleInput = e => {
    let val = Number.parseInt(e.target.value);
    if (Number.isNaN(val)) {
      val = 0;
    }
    setCount(val);
  };
  /** We utilize tailwind css classnames */
  const ui = (
    <div className="my-6 mx-auto p-4 max-w-lg shadow-xl rounded">
      <Title>Example State</Title>
      <p className="block my-5 text-green-600">
        Example State value is{' '}
        <code className="text-orange-700 font-mono">{exampleState}</code>.
      </p>
      <Button
        onClick={e => {
          setExampleState('changed value 1');
        }}
        className="mr-2"
      >
        Set Value 1
      </Button>
      <Button
        onClick={e => {
          setExampleState('changed value 2');
        }}
      >
        Set Value 2
      </Button>
      <Button
        className="block w-full justify-center my-5"
        onClick={() => {
          setClickedTimes(clickedTimes + 1);
        }}
      >
        You've clicked me {clickedTimes} time{clickedTimes === 1 ? '' : 's'}
      </Button>
      <Title className="mt-5">A Counter App</Title>
      <Button onClick={decrease} radius="adjl">
        -
      </Button>
      <Input
        placeholder="enter number here"
        value={count}
        onChange={handleInput}
      />
      <Button onClick={increase} radius="adjr">
        +
      </Button>
      <p className="text-gray-400 text-sm my-2 italic">
        Current count is: {count}
      </p>
    </div>
  );
  return ui;
}

ReactDOM.render(<App />, document.getElementById('root3'));
