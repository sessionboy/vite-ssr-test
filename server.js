import path from "path"
import { createServer } from "http"
import Koa from "koa"
import serve from "koa-static"
import proxy from "koa2-proxy-middleware"

const port = 3001;
const root = path.dirname(import.meta.url).replace("file://",'');

const app = new Koa();
const server = createServer(app.callback());

app.use(serve(path.join(root,'/src')));

app.use(proxy({
  targets:{
    "/@react-refresh":{
      target: 'http://localhost:3000',
      changeOrigin: true
    },
    "/src":{
      target: 'http://localhost:3000',
      changeOrigin: true
    }
  }
}));

app.use(async (ctx)=>{
  ctx.type = "html";
  ctx.body=`
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Vite App</title>            
        </head>
        <body>
          <div id="root">hello world!</div>
          <script type="module" src="http://localhost:3000/@vite/client"></script>
          <script type="module">              
            import RefreshRuntime from "/@react-refresh"
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => {}
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true        
          </script>
          <script type="module" src="http://localhost:3000/src/main.tsx"></script>
        </body>
      </html>
    `
})

server.listen(port,()=>{
  console.log(`ssr-server url: http://localhost:${port}`);
})

