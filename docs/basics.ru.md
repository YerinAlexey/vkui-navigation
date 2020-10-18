:ru: ([EN](./basics.en.md) | [**RU**](./basics.ru.md))

# Объект навигатора
Это основная часть библиотеки, большая част функциональности предоставляется им. Чтобы получить его, можно использовать хук `useNavigator`:

```jsx
import { useNavigator } from "vkui-navigation";

const Component = () => {
  const navigator = useNavigator();
};
```

либо HOC `withNavigator` чтобы передать `navigator` в props:
```jsx
import { withNavigator } from "vkui-navigation";

const Component = ({ navigator }) => {
  
};

const FinalComponent = withNavigator(Component);
```

# Замена VKUI
Чтобы навигация обрабатывалась, необходимо заменить `View`/`Root` из VKUI на таковые из `vkui-navigation`. Заметьте, что некоторые свойства отличаются.

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

### Свойства

| Имя         | Описание                       |
| ----------- | ------------------------------ |
| `homePanel` | **Обязательно.** ID начальной панели |

Всё свойства `View` принимаются за исключением `activePanel`, `history`, `popout` и `onSwipeBack`.

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

### Свойства

| Имя        | Описание                      |
| ---------- | ----------------------------- |
| `homeView` | **Обязательно.** ID начального `View` |

Всё свойства `Root` принимаются за исключением `activeView`.

[Навигация →](./navigation.ru.md)
