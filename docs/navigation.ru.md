:ru: ([EN](./navigation.en.md) | [**RU**](./navigation.ru.md))

# Навигация между панелями
Для перехода на другую панель, используйте `navigator.go`:
```js
function showAbout() {
  navigator.go("about");
}
```

также можно передать дополнительные параметры (будут доступны в `navigator.params`):
```js
function showProductDetails() {
  navigator.go("details", { id: productId });
}
```

Можно перейти на предыдущую панель с помощью `navigator.goBack`:
```jsx
return (
  <PanelHeader left={<PanelHeaderBack onClick={navigator.goBack} />}>
    ...
  </PanelHeader>
);
```

# Навигация между несколькими `View`
Это реализуется с помощью `navigator.changeView`:
```js
function toAnotherView() {
  navigator.changeView("another-view");
}
```

Также можно передать параметры (как и в `go`), будут доступны в `navigator.viewParams`:
```js
function toAnotherView() {
  navigator.changeView("another-view", { spam: "eggs" });
}
```

# API
```typescript
go(panelId: string, params?: any): void
```

| Имя       | Описание                   |
| --------- | -------------------------- |
| `panelId` | **Обязательно.** ID панели |
| `params`  | Дополнительные параметры   |

---

```typescript
goBack(): void
```

---

```typescript
changeView(viewId: string, params?: any): void
```

| Имя      | Описание                                |
| -------- | --------------------------------------- |
| `viewId` | **Обязательно.** ID необходимого `View` |
| `params` | Дополнительные параметры                |

[← Основы](./basics.ru.md)
