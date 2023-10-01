# youtube shorts clone

## 建置環境

1. download dependencies

```sh
npm install
```

2. api server

- 有資料的，改 `.env` 的 VITE_APP_SERVER 位置
- 沒資料的，用假資料

```sh
npm run api
```

3. client server

```sh
vite run build

npx serve dist
```
