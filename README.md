[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# vkui-navigation
Modern router for VK Mini Apps.

This library simplifies navigation with VKUI and provides API to control it. Application structure is kept the same ([`Root`] -> `View` -> `Panel`) and even components are named as in VKUI so it will be much easier to get started if you already know how VKUI works.

# Example
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
