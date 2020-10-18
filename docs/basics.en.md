:gb: ([**EN**](./basics.en.md) | [RU](./basics.ru.md))

# Navigator object
This is a main part of the library, most of the functionality is provided by it. To get navigator object you need to either call `useNavigator`:

```jsx
import { useNavigator } from "vkui-navigation";

const Component = () => {
  const navigator = useNavigator();
};
```

or use `withNavigator` HOC to pass `navigator` in props:
```jsx
import { withNavigator } from "vkui-navigation";

const Component = ({ navigator }) => {
  
};

const FinalComponent = withNavigator(Component);
```

# Replacing VKUI
To handle navigation, you need to replace `View`/`Root` from VKUI with the ones from `vkui-navigation`. Note that some properties are different.

## View
```jsx
import { View } from "vkui-navigation";

return (
  <View homePanel="panel1">
    <Panel1 />
    <Panel2 />
  </View>
);
```

### Properties

| Name        | Description                    |
| ----------- | ------------------------------ |
| `homePanel` | **Required.** Default Panel ID |

All the properties from original `View` are accepted except `activePanel`, `history`, `popout` and `onSwipeBack`.

## Root
```jsx
import { Root } from "vkui-navigation";

return (
  <Root homeView="view1">
    <View1 />
    <View2 />
  </Root>
);
```

### Properties

| Name       | Description                   |
| ---------- | ----------------------------- |
| `homeView` | **Required.** Default View ID |

All the properties from original `Root` are accepted except `activeView`.

[Navigation →](./navigation.en.md)
