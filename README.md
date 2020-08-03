[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# vkui-navigation
Modern router for VK Mini Apps.

This library simplifies navigation with VKUI and provides API to control it. Application structure is kept the same ([`Epic`] -> [`Root`] -> `View` -> `Panel`) and even components are named as in VKUI so it will be much easier to get started if you already know how VKUI works.

# Installation
With [Yarn](https://yarnpkg.com):
```sh
yarn add vkui-navigation
```
or with NPM:
```sh
npm i vkui-navigation
```

Also, don't forget to install `@vkontakte/vkui` and `@vkontakte/vk-bridge`

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
It's easy, just use `navigator.go` with your `Panel`'s ID and optional params (will be available via `navigator.params` from newly created `Panel`):
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

To go to the previous `Panel`, you can use `navigator.goBack`:
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

You can also set `Popout`s with `navigator.showPopout`/`navigator.hidePopout`:
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
VKUI supports second type of navigation - between `View`s. First of, you need to wrap your `View`s in `Root` component:
```js
import React from "react";
import { Root, View /* ... */ } from "vkui-navigation";

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

And after that you can navigate between them using `navigator.changeView` with `View`'s ID and optional params (will be available via `navigator.viewParams` from newly created `View`):
```js
function OnboardingView({ id }) {
  // snip

  function completeOnboarding() {
    navigator.changeView("main");
  }

  // snip
}
```

**Note:** `Root` does not have a history of `View`s so you can't navigate to previous `View` directly. This is why method is called `changeView`.

## Bottom navigation
To create bottom navigation bar you can wrap your `View`s or `Root`s in `Epic` and define your tab bar:
```js
import React from "react";
import { View } from "@vkontakte/vkui";
import { View, Epic /* ... */ } from "vkui-navigation";
import Icon28Newsfeed from "@vkontakte/icons/dist/28/newsfeed";
import Icon28ServicesOutline from "@vkontakte/icons/dist/28/services_outline";

function Feed({ id }) {
  // snip

  return <View id={id}>{/* snip */}</View>;
}

function App() {
  // Define bottom tab bar
  const tabbar = [
    {
      text: "Feed",
      icon: <Icon28Newsfeed />,
      story: "feed", // Story ID for this tab
    },
    {
      text: "Services",
      icon: <Icon28ServicesOutline />,
      story: "services", // Story ID for this tab
    },
    // Other tabs ...
  ];

  return (
    <Epic tabbar={tabbar} homeStory="feed">
      <Feed id="feed" />
      <Services id="services" />
      <Messages id="messages" />
      <Clips id="clips" />
      <Profile id="profile" />
    </Epic>
  );
}
```
_Note:_ `story` in `tabbar` should match corresponding `View`'s (or `Root`'s) ID

Defining a tab bar can be confusing because in VKUI you need to use `Tabbar`
and `TabbarItem` components to build it. With `vkui-navigation` you can write
your tabs as an array of objects. It accepts all properties from `TabbarItem`
except `selected` and `onClick` (they're handled by navigator). Also, two
properties were added:
 - `story: string` - `View`'s or `Root`'s ID that belongs to this tab
 - `icon: ReactNode` - Icon that will be normally passed as `TabbarItem`'s child node

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

        <Div>There is nothing to see here</Div>
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
