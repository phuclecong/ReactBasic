# React Basic

## Table of Contents
- [Installation](#installation)
- [App](#app)
- [Components](#components)
- [Props](#props)
- [State](#state)
- [Handling Events](#handling-events)
- [Conditional Rendering](#conditional-rendering)
- [Lists and Keys](#lists-and-keys)
- [Form](#form)
- [Composition vs Inheritance](#composition-vs-inheritance)
- [Thinking in React](#thinking-in-react)

## Installation
- [Installation](https://facebook.github.io/react/docs/installation.html)
- [Create React App](https://github.com/facebookincubator/create-react-app)

```
npm run start
npm run build
```

## App
```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```


```js
// src/app/index.js
import React, { Component } from 'react';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="app">
          <h1>Hello!</h1>
      </div>
    );
  }
}

export default App;
```

## Components
[React.Component](https://facebook.github.io/react/docs/react-component.html)

## Props
- [Components and Props](https://facebook.github.io/react/docs/components-and-props.html)

> Welcome component

```js
// src/welcome/index.js
import React, { Component } from 'react';
import './style.css';

class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <h1 className="welcome__header">
                    Hello! {this.props.name}
                </h1>
                <p className="welcome__message">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
            </div>

        )
    }
}

export default Welcome;
```

```css
/* src/welcome/style.css */
$blue: #056ef0;

.welcome {
    &__header {
        color: $blue;
    }

    &__message {
        font-weight: bold;
    }
}
```

> App component

```js
// src/app/index.js
import React, { Component } from 'react';
import './style.css';
import Welcome from './../welcome';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Welcome name="aaa" />
          <Welcome name="bbb" />
      </div>
    );
  }
}

export default App;
```

## State
1. Reference:
    - [State and Lifecycle](https://facebook.github.io/react/docs/state-and-lifecycle.html)
    - [The Component Lifecycle](https://facebook.github.io/react/docs/react-component.html)

1. Using State Correctly
    - Do Not Modify State Directly: **~~this.state.comment = 'Hello';~~**
    - Instead, use setState(): **this.setState({comment: 'Hello'});**

1. Use setState
    ```js
    (prevState, props) => stateChange
    ```

    ```js
    this.setState((prevState, props) => {
      return {counter: prevState.counter + props.step};
    });
    ```

1. The Component Lifecycle
    1. **Mounting:** These methods are called when an instance of a component is being created and inserted into the DOM:
        ```js
        constructor()
        componentWillMount()
        render()
        componentDidMount()
        ```
    1. **Updating:** An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
        ```js
        componentWillReceiveProps()
        shouldComponentUpdate()
        componentWillUpdate()
        render()
        componentDidUpdate()
        ```
    1. **Unmounting:** This method is called when a component is being removed from the DOM:
        ```js
        componentWillUnmount()
        ```


> Clock component

```js
import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className="Clock">
                It is: {this.state.date.toLocaleTimeString()}
            </div>

        )
    }
}

export default Clock;
```

> App component

```js
import React, { Component } from 'react';
import './style.css';
import Clock from './../clock';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Clock />
      </div>
    );
  }
}

export default App;

```

## Handling Events
Reference guide: [SyntheticEvent](https://facebook.github.io/react/docs/events.html)

> Toggle component

```js
import React, { Component } from 'react';

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        }

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

export default Toggle;
```

> App component

```js
import React, { Component } from 'react';
import './style.css';
import Toggle from './../toggle';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Toggle />
      </div>
    );
  }
}

export default App;

```

## Conditional Rendering
> https://facebook.github.io/react/docs/conditional-rendering.html

1. Element Variables
    ```js
    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
      }
    ```

1. Inline If with Logical && Operator
    ```js
    {this.props.unreadMessages.length > 0 &&
    <h2>
        You have {unreadMessages.length} unread messages.
    </h2>
    }
    ```

    > It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false. Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.

1. Inline If-Else with Conditional Operator

    ```js
    The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    ```

    ```js
    {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
    ) : (
        <LoginButton onClick={this.handleLoginClick} />
    )}
    ```

1. Preventing Component from Rendering
    ```js
    if (!props.warn) {
        return null;
    }
    ```

    ```js
    <WarningBanner warn={this.state.showWarning} />
    ```

## Lists and Keys
> https://facebook.github.io/react/docs/lists-and-keys.html

1. List
    ```js
    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            <li key={number.toString()}>
                {number}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }
    ```

    ```js
    const numbers = [1, 2, 3, 4, 5];
    <NumberList numbers={numbers} />,
    ```

2. Key
    > Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity

    ```js
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );
    ```

    > Keys only make sense in the context of the surrounding array. For example, if you extract a ListItem component, you should keep the key on the <ListItem /> elements in the array rather than on the root li element in the ListItem itself.

    ```js
    function ListItem(props) {
        // Correct! There is no need to specify the key here:
        return <li>{props.value}</li>;
    }

    function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
            // Correct! Key should be specified inside the array.
            <ListItem  key={number.toString()} value={number} />
        );

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
    ```

## Form
> https://facebook.github.io/react/docs/forms.html

1. input
    ```js
    class NameForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    ```

1. textarea
    ```js
    class EssayForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          value: 'Please write an essay about your favorite DOM element.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <textarea value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    ```

1. select
    ```js
    class FlavorForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Pick your favorite La Croix flavor:
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
    ```

1. Handling Multiple Inputs
    > When you need to handle multiple controlled input elements, you can add a name attribute to each element and let the handler function choose what to do based on the value of event.target.name.

    ```js
    class Reservation extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          isGoing: true,
          numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
      }

      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          //[name]: value
        });
      }

      render() {
        return (
          <form>
            <label>
              Is going:
              <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Number of guests:
              <input
                name="numberOfGuests"
                type="number"
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange} />
            </label>
          </form>
        );
      }
    }
    ```

## Composition vs Inheritance
> https://facebook.github.io/react/docs/composition-vs-inheritance.html

> React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

1. Containment
    >Some components don't know their children ahead of time. This is especially common for components like Sidebar or Dialog that represent generic "boxes". We recommend that such components use the special children prop to pass children elements directly into their output:

    ```js
    function FancyBorder(props) {
      return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
          {props.children}
        </div>
      );
    }
    ```

    ```js
    function WelcomeDialog() {
        return (
            <FancyBorder color="blue">
              <h1 className="Dialog-title">
                Welcome
              </h1>
              <p className="Dialog-message">
                Thank you for visiting our spacecraft!
              </p>
            </FancyBorder>
        );
    }
    ```

    > While this is less common, sometimes you might need multiple "holes" in a component. In such cases you may come up with your own convention instead of using children:

    ```js
    function SplitPane(props) {
      return (
        <div className="SplitPane">
          <div className="SplitPane-left">
            {props.left}
          </div>
          <div className="SplitPane-right">
            {props.right}
          </div>
        </div>
      );
    }

    function App() {
      return (
        <SplitPane
          left={
            <Contacts />
          }
          right={
            <Chat />
          } />
      );
    }
    ```

1. Specialization
    > Sometimes we think about components as being "special cases" of other components. For example, we might say that a SignUpDialog is a special case of Dialog.

    > In React, this is also achieved by composition, where a more "specific" component renders a more "generic" one and configures it with props:

    ```js
    function Dialog(props) {
      return (
        <FancyBorder color="blue">
          <h1 className="Dialog-title">
            {props.title}
          </h1>
          <p className="Dialog-message">
            {props.message}
          </p>
          {props.children}
        </FancyBorder>
      );
    }

    class SignUpDialog extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
      }

      render() {
        return (
          <Dialog title="Mars Exploration Program"
                  message="How should we refer to you?">
            <input value={this.state.login}
                   onChange={this.handleChange} />
            <button onClick={this.handleSignUp}>
              Sign Me Up!
            </button>
          </Dialog>
        );
      }

      handleChange(e) {
        this.setState({login: e.target.value});
      }

      handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
      }
    }
    ```


## Thinking in React
> https://facebook.github.io/react/docs/thinking-in-react.html
