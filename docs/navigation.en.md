:gb: ([**EN**](./navigation.en.md) | [RU](./navigation.ru.md))

# Navigation between panels
All navigation is done by using functions on the Navigator object.

To navigate to a different panel you can use `navigator.go`:
```js
function showAbout() {
  navigator.go("about");
}
```

you can also pass parameters to the panel (will be available via `navigator.params`):
```js
function showProductDetails() {
  navigator.go("details", { id: productId });
}
```

Other useful thing is going to the previous panel (for back buttons) which can be done using `navigator.goBack`:
```jsx
return (
  <PanelHeader left={<PanelHeaderBack onClick={navigator.goBack} />}>
    ...
  </PanelHeader>
);
```

# Navigation between views
This is done by using `navigator.changeView`:
```js
function toAnotherView() {
  navigator.changeView("another-view");
}
```

Parameters can be passed as well (will be available via `navigator.viewParams`):
```js
function toAnotherView() {
  navigator.changeView("another-view", { spam: "eggs" });
}
```

# API
```typescript
go(panelId: string, params?: any): void
```

| Name      | Description                   |
| --------- | ----------------------------- |
| `panelId` | **Required.** Target panel ID |
| `params`  | Custom parameters to pass     |

---

```typescript
goBack(): void
```

---

```typescript
changeView(viewId: string, params?: any): void
```

| Name     | Description                    |
| -------- | ------------------------------ |
| `viewId` | **Required.** Target `View` ID |
| `params` | Custom parameters to pass      |

[← Basics](./basics.en.md)
