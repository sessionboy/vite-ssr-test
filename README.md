# vite-ssr-test

#### Before the first start
```
yarn
```

#### Development environment start

Two servers 3000 (vite dev server) and 3001 (vite ssr server) will be started.

```
yarn dev
```
There may be some warnings, but you can ignore it.

Now you can visit the following addresses: `http://localhost:3000 (dev server)` and `http://localhost:3001 (ssr server)`

#### Known issues

1, ssr hmr is invalid

2, Static resources such as svg cannot be accessed

Other unknown issues...