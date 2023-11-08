# youtube shorts clone

## 建置環境

1. download dependencies

```sh
npm install
```

2. api server

- 有資料的，改 `.env` 的 `STREAM_API_BASE_PATH` 位置
- 沒資料的，用假資料，再把 `.env` 中 `STREAM_API_BASE_PATH` 註解拿掉

```sh
# 假資料 server
npm run api
```

3. web server

```sh
npm run build && npm run start
```

4. client

連 `localhost:3000/shorts` 查看 short 影片

## 功能

- RWD (breakpoints:[768px])
- 影片
  - 支援的操作暫停、播放、跳轉影片進度、靜音
  - 支援 hls 影片
- 手勢
  - 上下 swipe 可切換影片
  - 左右拖拉影片進度條可跳轉進度

測試裝置:
- 1920x1080 顯示器
- iphone 12pro simulator
- iphone 12mini 實機