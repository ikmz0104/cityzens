# Cityzens
## `https://v3.football.api-sports.io/teams/statistics`
2021-22: マンチェスターシティのクラブstats
```
league: 39
season: 2021
team: 50
date: null
```
## `https://v3.football.api-sports.io/players`
2021-22: マンチェスターシティの選手stats
```
id: null
search: null
league: 39
season: 2021
team: 50
page: null
```

## 環境変数
プレフィックスつければいけるのね！！

https://chaika.hatenablog.com/entry/2021/07/20/083000

## 顔写真入れる
```
Unhandled Runtime Error
Error: Invalid src prop (https://media.api-sports.io/football/players/625.png) on `next/image`, hostname "media.api-sports.io" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
```
https://chaika.hatenablog.com/entry/2021/07/20/083000

できた。

## Server Error ReferenceError: window is not defined

https://nextjs.org/docs/advanced-features/dynamic-import
https://github.com/vercel/next.js/blob/canary/examples/with-dynamic-import/components/hello1.js

よく読みなさい
https://blog.sethcorker.com/question/how-to-solve-referenceerror-next-js-window-is-not-defined/

## アルファベット並べ替え
https://www.delftstack.com/ja/howto/javascript/javascript-sort-array-of-objects-alphabetically/