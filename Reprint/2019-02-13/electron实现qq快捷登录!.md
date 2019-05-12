---
title: 'electron实现qq快捷登录!' 
date: 2019-02-13 2:31:23
hidden: true
slug: jczs4kd3b3a
categories: [reprint]
---

{{< raw >}}

                    
<p>之前本来想不写这个功能的,结果客户死活要qq登录! 实在没办法就写了,顺便写个文章!<br>在写之前有两个问题:<br>1: 打开qq授权页面点击页面中的链接会又打开一个页面! .....<br>2: 授权之后是否成功很难去判断 </p>
<p>不过脑海中有一个想法就是,electron就是一个类似于浏览器一样,既然是浏览器那肯定可以阻止链接的点击 也可以判断状态!<br>就去啃文档了!!!</p>
<p>推荐大家去w3c去看文档 比较全 而且速度较快 文档也比较新: <a href="https://www.w3cschool.cn/electronmanual/" rel="nofollow noreferrer" target="_blank">https://www.w3cschool.cn/elec...</a></p>
<p><a href="https://electronjs.org/docs" rel="nofollow noreferrer" target="_blank">https://electronjs.org/docs</a> 这里面的响应速度比较慢 里面很多文档都很久了 参数也有失效的!!!</p>
<p>言归正传 说qq登录!</p>
<p>后端是使用PHP实现的 没什么难度,主要的就是客户端的一些处理!</p>
<h2 id="articleHeader0">演示</h2>
<p><span class="img-wrap"><img data-src="/img/bVbisUs?w=1021&amp;h=619" src="https://static.alili.tech/img/bVbisUs?w=1021&amp;h=619" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">放置qq登录按钮</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>

        <button @click=&quot;qqLogin&quot;>qq登录</button>
    </div>
</template>

<script>
    export default {
        name: &quot;home&quot;,
        mounted() {
            this.$electron.ipcRenderer.on('reply', (e, data) => {
                console.log(data)
                let httpCode = data.request_code[0];
                if (httpCode === '1') {
                    alert(data.token[0])
                }
            })
        },
        methods: {
            qqLogin() {
            //请求服务器获取授权页面和参数
                this.$http.get('xxxxx')
                    .then((result) => {
                        if (result.data.status === 1) {
                            this.$electron.ipcRenderer.send('qqLogin', {url: result.data.data});
                        }
                    })
                    .catch()
            },
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"qqLogin"</span>&gt;</span>qq登录<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"home"</span>,
        mounted() {
            <span class="hljs-keyword">this</span>.$electron.ipcRenderer.on(<span class="hljs-string">'reply'</span>, (e, data) =&gt; {
                <span class="hljs-built_in">console</span>.log(data)
                <span class="hljs-keyword">let</span> httpCode = data.request_code[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">if</span> (httpCode === <span class="hljs-string">'1'</span>) {
                    alert(data.token[<span class="hljs-number">0</span>])
                }
            })
        },
        <span class="hljs-attr">methods</span>: {
            qqLogin() {
            <span class="hljs-comment">//请求服务器获取授权页面和参数</span>
                <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'xxxxx'</span>)
                    .then(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
                        <span class="hljs-keyword">if</span> (result.data.status === <span class="hljs-number">1</span>) {
                            <span class="hljs-keyword">this</span>.$electron.ipcRenderer.send(<span class="hljs-string">'qqLogin'</span>, {<span class="hljs-attr">url</span>: result.data.data});
                        }
                    })
                    .catch()
            },
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader2">问题解决</h2>
<h3 id="articleHeader3">点击a链接会打开一个新窗口</h3>
<p>解决打开qq授权页面点击页面中的链接会又打开一个窗口的问题 使用webContents 的 new-window 事件  组织默认事件 调用Shell利用默认浏览器打开就行了!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   loginWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>   loginWindow.webContents.<span class="hljs-literal">on</span>(<span class="hljs-string">'new-window'</span>, <span class="hljs-function"><span class="hljs-params">(event, url)</span> =&gt;</span> {
        event.preventDefault();
        shell.openExternal(url);
    });</code></pre>
<h3 id="articleHeader4">授权后是否成功很难去判断</h3>
<p>到这个问题后我就想到一个词 那就是 Response 和 code 然后就去搜索了嘛  结果在 webContents找到了! <code>did-get-redirect-request</code> 事件 ! <br>但是我们不能直接使用他 要在点击授权之后再去使用他</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     loginWindow.webContents.on('will-navigate', (e, url,) => {
        content.on('did-get-response-details', (e, status, url, originalURL, httpResponseCode, requestMethod, referrer, header) => {
            if (httpResponseCode === 200) {
                event.sender.send('reply', header);
                // loginWindow.close();
            }
        })
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>     loginWindow.webContents.<span class="hljs-literal">on</span>(<span class="hljs-string">'will-navigate'</span>, <span class="hljs-function"><span class="hljs-params">(e, url,)</span> =&gt;</span> {
        content.<span class="hljs-literal">on</span>(<span class="hljs-string">'did-get-response-details'</span>, <span class="hljs-function"><span class="hljs-params">(e, status, url, originalURL, httpResponseCode, requestMethod, referrer, header)</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (httpResponseCode === <span class="hljs-number">200</span>) {
                event.sender.send(<span class="hljs-string">'reply'</span>, header);
                <span class="hljs-regexp">//</span> loginWindow.close();
            }
        })
    });</code></pre>
<p>will-navigate事件解释:<br>当用户或 page 想要开始导航的时候发出事件.它可在当 window.location 对象改变或用户点击 page 中的链接的时候发生.<br>当使用 api(如 webContents.loadURL 和 webContents.back) 以编程方式来启动导航的时候，这个事件将不会发出.<br>它也不会在页内跳转发生， 例如点击锚链接或更新 window.location.hash.使用 did-navigate-in-page 事件可以达到目的</p>
<p>did-get-response-details 事件解释:<br>当有关请求资源的详细信息可用的时候发出事件. status 标识了 socket链接来下载资源.</p>
<p>拿到这两个之后我们就可以写代码啦!<br>在点击授权之后授权页面会跳转到我们服务器的一个回调地址 在里面做一个操作 比如获取用户<code>token</code>乱七八糟的! 之后将生成的<code>token</code>返回给客户端!</p>
<p>但是要注意这里服务端返回的数据客户端不能解析 大家可以使用:<code>findInPage</code> 去查询返回的内容!<br>但是我没去这么做 </p>
<p>因为 <code>did-get-response-details</code> 事件返回了:<br><code>status</code>,<code>newURL</code>,<code>originalURL</code>,<code>httpResponseCode</code>,<code>requestMethod</code>,<code>referrer</code>,<code>headers</code> 八个参数 <br>最后我们只需要判断<code>httpResponseCode</code> 是200的时候 将<code>header</code>里面的参数从主进程返回给渲染进程<br>大概的数据是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="access-control-allow-credentials:[&quot;true&quot;]
access-control-allow-headers:[&quot;token,Origin, X-Requested-With, Content-Type, Accept&quot;]
access-control-allow-methods:[&quot;POST,GET,DELETE,PUT&quot;]
cache-control:[&quot;no-store, no-cache, must-revalidate&quot;]
connection:[&quot;Keep-Alive&quot;]
content-type:[&quot;application/json; charset=utf-8&quot;]
date:[&quot;Sun, 21 Oct 2018 14:02:20 GMT&quot;]
expires:[&quot;Thu, 19 Nov 1981 08:52:00 GMT&quot;]
keep-alive:[&quot;timeout=5, max=100&quot;]
request_code:[&quot;1&quot;]
msg:[&quot;登录成功&quot;]
token:[&quot;xxxxxxxx&quot;]
pragma:[&quot;no-cache&quot;]
server:[&quot;Apache/2.4.23 (Win32) OpenSSL/1.0.2j mod_fcgid/2.3.9&quot;]
set-cookie:[&quot;PHPSESSID=6b0esq5jd8vloess2c96ove86s; path=/; HttpOnly&quot;]
transfer-encoding:[&quot;chunked&quot;]
x-powered-by:[&quot;PHP/7.2.1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>access-control-allow-<span class="hljs-string">credentials:</span>[<span class="hljs-string">"true"</span>]
access-control-allow-<span class="hljs-string">headers:</span>[<span class="hljs-string">"token,Origin, X-Requested-With, Content-Type, Accept"</span>]
access-control-allow-<span class="hljs-string">methods:</span>[<span class="hljs-string">"POST,GET,DELETE,PUT"</span>]
cache-<span class="hljs-string">control:</span>[<span class="hljs-string">"no-store, no-cache, must-revalidate"</span>]
<span class="hljs-string">connection:</span>[<span class="hljs-string">"Keep-Alive"</span>]
content-<span class="hljs-string">type:</span>[<span class="hljs-string">"application/json; charset=utf-8"</span>]
<span class="hljs-string">date:</span>[<span class="hljs-string">"Sun, 21 Oct 2018 14:02:20 GMT"</span>]
<span class="hljs-string">expires:</span>[<span class="hljs-string">"Thu, 19 Nov 1981 08:52:00 GMT"</span>]
keep-<span class="hljs-string">alive:</span>[<span class="hljs-string">"timeout=5, max=100"</span>]
<span class="hljs-string">request_code:</span>[<span class="hljs-string">"1"</span>]
<span class="hljs-string">msg:</span>[<span class="hljs-string">"登录成功"</span>]
<span class="hljs-string">token:</span>[<span class="hljs-string">"xxxxxxxx"</span>]
<span class="hljs-string">pragma:</span>[<span class="hljs-string">"no-cache"</span>]
<span class="hljs-string">server:</span>[<span class="hljs-string">"Apache/2.4.23 (Win32) OpenSSL/1.0.2j mod_fcgid/2.3.9"</span>]
set-<span class="hljs-string">cookie:</span>[<span class="hljs-string">"PHPSESSID=6b0esq5jd8vloess2c96ove86s; path=/; HttpOnly"</span>]
transfer-<span class="hljs-string">encoding:</span>[<span class="hljs-string">"chunked"</span>]
x-powered-<span class="hljs-string">by:</span>[<span class="hljs-string">"PHP/7.2.1"</span>]</code></pre>
<p>以上参数中 <code>msg</code> <code>request_code</code>  <code>token</code>为自定义参数 是服务器代码生成的!</p>
<p>能得到这些就好办了!</p>
<p>渲染进程拿到<code>header</code>中的<code>token</code>根据 <code>token</code>获取用户信息这之后就简单的很了!!!</p>
<h2 id="articleHeader5">主进程代码:</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {ipcMain, BrowserWindow, shell} from 'electron'

ipcMain.on('qqLogin', (event, data) => {
    const loginWindow = new BrowserWindow({
        width: 750,
        height: 450,
        resizable: false,
        minimizable: false,
        maximizable: false,
        webPreferences: {
            devTools: false,
        }
    });

    loginWindow.setMenu(null);

    loginWindow.loadURL(data.url);
    
    loginWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });
    const content = loginWindow.webContents;

    content.on('will-navigate', (e, status, url,) => {
        content.on('did-get-response-details', (e, status, url, originalURL, httpResponseCode, requestMethod, referrer, header) => {
            if (httpResponseCode === 200) {
                event.sender.send('reply', header);
                loginWindow.close();
            }
        })
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> {ipcMain, BrowserWindow, shell} <span class="hljs-keyword">from</span> <span class="hljs-string">'electron'</span>

ipcMain.<span class="hljs-literal">on</span>(<span class="hljs-string">'qqLogin'</span>, <span class="hljs-function"><span class="hljs-params">(event, data)</span> =&gt;</span> {
    const loginWindow = <span class="hljs-keyword">new</span> BrowserWindow({
        width: <span class="hljs-number">750</span>,
        height: <span class="hljs-number">450</span>,
        resizable: <span class="hljs-literal">false</span>,
        minimizable: <span class="hljs-literal">false</span>,
        maximizable: <span class="hljs-literal">false</span>,
        webPreferences: {
            devTools: <span class="hljs-literal">false</span>,
        }
    });

    loginWindow.setMenu(<span class="hljs-literal">null</span>);

    loginWindow.loadURL(data.url);
    
    loginWindow.webContents.<span class="hljs-literal">on</span>(<span class="hljs-string">'new-window'</span>, <span class="hljs-function"><span class="hljs-params">(event, url)</span> =&gt;</span> {
        event.preventDefault();
        shell.openExternal(url);
    });
    const content = loginWindow.webContents;

    content.<span class="hljs-literal">on</span>(<span class="hljs-string">'will-navigate'</span>, <span class="hljs-function"><span class="hljs-params">(e, status, url,)</span> =&gt;</span> {
        content.<span class="hljs-literal">on</span>(<span class="hljs-string">'did-get-response-details'</span>, <span class="hljs-function"><span class="hljs-params">(e, status, url, originalURL, httpResponseCode, requestMethod, referrer, header)</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (httpResponseCode === <span class="hljs-number">200</span>) {
                event.sender.send(<span class="hljs-string">'reply'</span>, header);
                loginWindow.close();
            }
        })
    });
});</code></pre>
<h2 id="articleHeader6">注意点</h2>
<p>返回的header里面是一个数组 这种写法真是坑爹啊! 还要去写一个 <code>header.token[0]</code> 这种写法有点不喜欢 但是没法子!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
electron实现qq快捷登录!

## 原文链接
[https://segmentfault.com/a/1190000016754668](https://segmentfault.com/a/1190000016754668)

