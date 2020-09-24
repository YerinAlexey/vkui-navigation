[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# vkui-navigation
[![NPM version](https://img.shields.io/npm/v/vkui-navigation)](https://npmjs.com/package/vkui-navigation)
[![License](https://img.shields.io/github/license/YerinAlexey/vkui-navigation)](LICENSE)
![Lint](https://github.com/YerinAlexey/vkui-navigation/workflows/Lint/badge.svg)

[EN](./README.md) | **[RU](./README-ru.md)**

Современный роутер для VK Mini Apps.

Эта библиотека упрощает навигацию в приложениях на основе VKUI. Структура приложения остаётся той же ([`Epic`] -> [`Root`] -> `View` -> `Panel`) и даже компоненты называются так же, как и в VKUI. Это значит, Вам будет куда проще разобраться в `vkui-navigation` если Вы уже знакомы с VKUI.

# Установка
С помощью [Yarn](https://yarnpkg.com):
```sh
yarn add vkui-navigation
```
или NPM:
```sh
npm i vkui-navigation
```

Также, не забудьте установить `@vkontakte/vkui` и `@vkontakte/vk-bridge`

# Быстрый старт
## Структура
Примерно так выглядит структура простого приложения:
```js
import React from "react";
import { View, useNavigator, withNavigator } from "vkui-navigation";

// Функциональный компонент
function MyComponent() {
  const navigator = useNavigator();

  // Теперь Вы можете использовать navigator для переходов между View и панелями
}

// Классовый компонент
class MyClassComponent extends React.Component {
  /* ... */
}

// Его необходимо обернуть в withNavigator
const WrappedClassComponent = withNavigator(MyClassComponent);

// Теперь можно получить доступ к навгиатору через this.props.navigator

function App() {
  return <View homePanel="home">{/* Сюда нужно добавить панели */}</View>;
}

// ...
```

## Навигация между панелями
Это просто, вызовите `navigator.go` с ID панели. Также вторым параметром можно указать дополнительные параметры (будут переданы в `navigator.params` в новой панели):
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

Перейти на предыдущею панель можно с помощью `navigator.goBack`:
```js
function MyComponent() {
  const navigator = useNavigator();

  // snip

  return (
    <Panel id="whatever">
      <PanelHeader left={<PanelHeaderBack onClick={navigator.goBack} />}>
        Заголовок
      </PanelHeader>

      {/* snip */}
    </Panel>
  );
}
```

Также можно управлять `Popout`'ами с помощью `navigator.showPopout`/`navigator.hidePopout`:
```js
function MyComponent() {
  const navigator = useNavigator();

  // snip

  function loadData() {
    // Показываем спиннер
    navigator.showPopout(<ScreenSpinner />);

    // Загружаем данные ...

    // Убираем спиннер
    navigator.hidePopout();
  }

  // snip
}
```

## Переходы между `View`
VKUI поддерживает другой вид навигации - между несколькими `View`. Для этого, Вам нужно обернуть все `View` в компонент `Root`:
```js
import React from "react";
import { Root, View /* ... */ } from "vkui-navigation";

function OnboardingView({ id }) {
  // snip

  // Тут мы рендерим View
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

Переключатся между разными `View` можно с помощью `navigator.changeView`:
```js
function OnboardingView({ id }) {
  // snip

  function completeOnboarding() {
    navigator.changeView("main");
  }

  // snip
}
```
> Также можно передать дополнительные параметры вторым аргументом (будут переданы в `navigator.viewParams`)

**Заметка:** У `Root` нет истории переключений `View`. Вы не можете так же просто перейти на предыдущий `View`, как в случае с панелями. Именно поэтому метод называются `changeView`

## Bottom navigation
Для создания нижнего Таббара, Вам нужно обернуть несколько `View`/`Root` в `Epic` и описать вкладки:
```js
import React from "react";
import { View, Epic /* ... */ } from "vkui-navigation";
import Icon28Newsfeed from "@vkontakte/icons/dist/28/newsfeed";
import Icon28ServicesOutline from "@vkontakte/icons/dist/28/services_outline";

// snip

function Feed({ id }) {
  // snip

  return <View id={id}>{/* snip */}</View>;
}

// snip

function App() {
  // Описание вкладок
  const tabbar = [
    {
      text: "Feed",
      icon: <Icon28Newsfeed />,
      story: "feed", // ID для View, на который ведет эта вкладка
    },
    {
      text: "Services",
      icon: <Icon28ServicesOutline />,
      story: "services",
    },
    // Остальные вкладки
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
**Заметка:** `story` в `tabbar` должен совпадать с ID у `View` (или `Root`)

Описание вкладок может показаться непривычным, потому, что в VKUI для его
построения нужно использовать компоненты `Tabbar` и `TabbarItem`. С
`vkui-navigation` можно описать вкладки с помощью обычного массива объектов.
Принимаются все свойства из `TabbarItem` за исключением `selected` и `onClick`
(ими управляет навигатор) + два дополнительных:
 - `story: string` - ID `View` или `Root`, на который ведёт эта вкладка
 - `icon: ReactNode` - Иконка, которая передаётся как дочерний элемент в `TabbarItem`

# Большой пример
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

# Лицензия
MIT, [читать](LICENSE)
