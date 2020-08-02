[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# vkui-navigation
Modern router for VK Mini Apps.

This library simplifies navigation with VKUI and provides API to control it. Application structure is kept the same ([`Root`] -> `View` -> `Panel`) and even components are named as in VKUI so it will be much easier to get started if you already know how VKUI works.

# Quick start
## Structure
This is how basic structure of the application looks like:
```js
import React from "react";
import { View, useNavigator, withNavigator } from "vkui-navigation";

// Function component example
function MyComponent() {
  const navigator = useNavigator();

  // Now you can navigate between Views and Panels using that navigator
}

// Class-based component example
class MyClassComponent extends React.Component {
  /* ... */
}

// Wrap class component
const WrappedClassComponent = withNavigator(MyClassComponent);

// Now you can access navigator from this.props.navigator

function App() {
  return <View homePanel="home">{/* Panels go here */}</View>;
}

// Rest of your code ...
```
## Navigating between Panels
It's easy, just use `navigator.go` with your panel's ID and optional params (can be accessed via `navigator.params`):
```js
function MyComponent() {
  const navigator = useNavigator();

  // snip

  function goSomewhere() {
    navigator.go("other-panel", { hello: "world" });
  }

  // snip
}
```

To go to the previous panel, you can use `navigator.goBack`:
```js
function MyComponent() {
  const navigator = useNavigator();

  // snip

  return (
    <Panel id="whatever">
      <PanelHeader left={<PanelHeaderBack onClick={navigator.goBack} />}>
        Header
      </PanelHeader>

      {/* snip */}
    </Panel>
  );
}
```

You can also set popouts with `navigator.showPopout`/`navigator.hidePopout`:
```js
function MyComponent() {
  const navigator = useNavigator();

  // snip

  function loadData() {
    // Show spinner
    navigator.showPopout(<ScreenSpinner />);

    // Fetch data ...

    // Hide spinner
    navigator.hidePopout();
  }

  // snip
}
```

## Navigation between Views
VKUI supports second type of navigation - between `View`s. To achieve this, you need to wrap your `View`s in `Root` component:
```js
import React from "react";
import { Root } from "vkui-navigation";

function OnboardingView({ id }) {
  // snip

  // Note that it returns a View
  return <View id={id}>{/* snip */}</View>;
}

// snip

function App() {
  return (
    <Root homeView="onboarding">
      <OnboardingView id="onboarding" />
      <MainView id="main" />
    </Root>
  );
}

// snip
```

To navigate between `View`s you can use `navigator.changeView` with `View`'s ID and optional params (can be accessed via `navigator.viewParams`):
```js
function OnboardingView({ id }) {
  // snip

  function completeOnboarding() {
    navigator.changeView("main");
  }

  // snip
}
```

**Note:** `Root` does not have a history so you can't navigate to previous `View` directly. This is why method is called `changeView`.

# Full example
```js
import React from "react";
import ReactDOM from "react-dom";
import { View, withNavigator, useNavigator } from "vkui-navigation";
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Div,
  Button,
} from "@vkontakte/vkui";

// With hooks
function Home({ id }) {
  const navigator = useNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Home</PanelHeader>

      <Div>
        <Button
          size="xl"
          onClick={() => {
            navigator.go("next", {});
          }}
        >
          Go to the next panel
        </Button>
      </Div>
    </Panel>
  );
}

// With class component
class NextComponent extends React.Component {
  render() {
    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={<PanelHeaderBack onClick={this.props.navigator.goBack} />}
        >
          Empty page
        </PanelHeader>

        <Div>There's nothing to see here</Div>
      </Panel>
    );
  }
}

// Wrap component in withNavigator HOC to get access to navigator
const Next = withNavigator(NextComponent);

function App() {
  return (
    <View homePanel="home">
      <Home id="home" />
      <Next id="next" />
    </View>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

# License
MIT, [learn more](LICENSE)
