import React from 'react';
import ReactDOM from 'react-dom';

function FormControl({ label, children }) {
  return (
    <label className="block my-5">
      <span className="text-gray-700">{label}</span>
      {children}
    </label>
  );
}

function Button({ children, ...btnProps }) {
  return (
    <button
      className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...btnProps}
    >
      {children}
    </button>
  );
}

function JSONViewer({ json }) {
  return (
    <pre className="bg-gray-100 font-mono text-orange-700 p-5 my-5 rounded overflow-x-auto">
      {JSON.stringify(json, null, 4)}
    </pre>
  );
}

const multipleItems = [
  {
    value: 'option-1',
    label: 'Option 1',
  },
  {
    value: 'option-2',
    label: 'Option 2',
  },
  {
    value: 'option-3',
    label: 'Option 3',
  },
];

function App() {
  // controlled values with useState for all our form elements
  const [text, setText] = React.useState('');
  const [textarea, setTextarea] = React.useState('');
  const [select, setSelect] = React.useState('option-3');
  const [checked, setChecked] = React.useState(false);
  const [groupChecked, setGroupChecked] = React.useState(['option-1']);
  const [radio, setRadio] = React.useState('option-2');

  // Just a state to show the JSONViewer below uncontrolled form
  const [uncontrolledFormValues, setUncontrolledFormValues] = React.useState(
    {}
  );
  return (
    <div className="my-6 mx-auto p-4 max-w-4xl shadow-xl rounded">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 mb-4 p-2">
          {/** Here all the components are un-controlled */}
          <h2 className="font-sans-serif uppercase text-gray-600 text-lg mb-5">
            Controlled Form Components
          </h2>
          <form
            onSubmit={e => {
              // do nothing
              e.preventDefault();
            }}
          >
            {/** <input type="text" /> */}
            <FormControl label="Input Text">
              <input
                type="text"
                name="text"
                className="form-input mt-1 block w-full"
                placeholder="Your name"
                value={text} // when undefined or null not passed to value it is in controlled state
                onChange={e => {
                  setText(e.target.value);
                }}
              />
            </FormControl>
            {/** textarea */}
            <FormControl label="TextArea">
              <textarea
                name="textarea"
                className="form-textarea mt-1 block w-full"
                placeholder="Your Bio..."
                value={textarea}
                onChange={e => {
                  setTextarea(e.target.value);
                }}
                rows="3"
              />
            </FormControl>
            {/** <select> */}
            <FormControl label="Select">
              <select
                className="form-select mt-1 block w-full"
                name="select"
                value={select}
                onChange={e => {
                  setSelect(e.target.value);
                }}
              >
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
                <option value="option-3">Option 3</option>
                <option value="option-4">Option 4</option>
              </select>
            </FormControl>
            {/** <input type="checkbox" /> */}
            <div className="my-5">
              <p className="block mb-2 text-gray-700">Single Checkbox</p>
              <label className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={e => {
                    setChecked(e.target.checked);
                  }}
                  className="form-checkbox"
                />
                <span className="ml-2">Option 1</span>
              </label>
            </div>
            <div className="my-5">
              <p className="block mb-2 text-gray-700">Grouped Checkbox</p>
              {multipleItems.map(item => (
                <label className="mb-2 flex items-center" key={item.value}>
                  <input
                    type="checkbox"
                    checked={groupChecked.includes(item.value)}
                    value={item.value}
                    onChange={e => {
                      // if status set to checked then add to the list
                      if (e.target.checked) {
                        // create a copy so that setGroupChecked work as intended
                        const newGroupChecked = [...groupChecked];
                        // add to the list, only if it not there
                        if (!newGroupChecked.includes(e.target.value)) {
                          newGroupChecked.push(e.target.value);
                        }
                        setGroupChecked(newGroupChecked);
                      } else {
                        // remove the item, using Array.filter
                        const newGroupChecked = groupChecked.filter(
                          v => v !== e.target.value
                        );
                        setGroupChecked(newGroupChecked);
                      }
                    }}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{item.label}</span>
                </label>
              ))}
            </div>

            {/** <input type="radio" /> */}
            <div className="my-5">
              <p className="block mb-2 text-gray-700">Radio</p>
              {multipleItems.map(radioItem => (
                <label className="mb-2 flex items-center" key={radioItem.value}>
                  <input
                    type="radio"
                    value={radioItem.value}
                    className="form-radio"
                    checked={radio === radioItem.value}
                    /** The best thing is it will be called only checking a radio */
                    onChange={e => {
                      console.log(e.target);
                      setRadio(e.target.value);
                    }}
                  />
                  <span className="ml-2">{radioItem.label}</span>
                </label>
              ))}
            </div>

            <Button type="submit">Submit</Button>
          </form>
          <JSONViewer
            json={{ text, textarea, select, checked, groupChecked, radio }}
          />
        </div>
        <div className="w-full lg:w-1/2 mb-4 p-2">
          {/** Here all the components are un-controlled */}
          <h2 className="font-sans-serif uppercase text-gray-600 text-lg mb-5">
            Uncontrolled Form Components
          </h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              // to access the HTML Form element we use e.target
              const form = e.target;

              // Now extract the value just like we would in JavaScript
              const formValue = {
                text: form.text.value,
                textarea: form.textarea.value,
                select: form.select.value,
                checkbox: form.checkbox.checked,
                groupChecked: [],
                radio: form.radio.value,
              };

              // we need something special for the grouped checkbox
              // loop over all the ReactNodeElements
              form.groupChecked.forEach(gc => {
                // push value if it is checked in the DOM
                if (gc.checked) {
                  formValue.groupChecked.push(gc.value);
                }
              });

              // show it in the viewer
              setUncontrolledFormValues(formValue);
            }}
          >
            {/** <input type="text" /> */}
            <FormControl label="Input Text">
              <input
                type="text"
                name="text"
                className="form-input mt-1 block w-full"
                placeholder="Your name"
                value={undefined} // have to pass undefined or null or don't write it
              />
            </FormControl>
            {/** textarea */}
            <FormControl label="TextArea">
              <textarea
                name="textarea"
                className="form-textarea mt-1 block w-full"
                placeholder="Your Bio..."
                defaultValue="This value can be changed freely" // the defaultValue sets the initial value
                rows="3"
              />
            </FormControl>
            {/** <select> */}
            <FormControl label="Select">
              <select
                className="form-select mt-1 block w-full"
                name="select"
                defaultValue="option-3"
              >
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
                <option value="option-3">Option 3</option>
                <option value="option-4">Option 4</option>
              </select>
            </FormControl>
            {/** <input type="checkbox" /> */}
            <div className="my-5">
              <p className="block mb-2 text-gray-700">Single Checkbox</p>
              <label className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  name="checkbox"
                  value="option-1"
                  className="form-checkbox"
                />
                <span className="ml-2">Option 1</span>
              </label>
            </div>
            <div className="my-5">
              <p className="block mb-2 text-gray-700">Grouped Checkbox</p>
              {multipleItems.map(item => (
                <label className="mb-2 flex items-center" key={item.value}>
                  <input
                    type="checkbox"
                    defaultChecked={item.value === 'option-2'}
                    value={item.value}
                    name="groupChecked" // name has to be same, then only react would create a list to iterate
                    className="form-checkbox"
                  />
                  <span className="ml-2">{item.label}</span>
                </label>
              ))}
            </div>

            {/** <input type="radio" /> */}
            <div className="my-5">
              <p className="block mb-2 text-gray-700">Radio</p>
              {multipleItems.map(radioItem => (
                <label className="mb-2 flex items-center" key={radioItem.value}>
                  <input
                    type="radio"
                    name="radio" // giving same name is required here so that browser can group things
                    value={radioItem.value}
                    className="form-radio"
                    defaultChecked={radioItem.value === 'option-3'} // Checked by default but still editable
                  />
                  <span className="ml-2">{radioItem.label}</span>
                </label>
              ))}
            </div>

            <Button type="submit">Submit</Button>
          </form>
          <JSONViewer json={uncontrolledFormValues} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root4'));
