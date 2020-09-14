---
title: 'Vue+WebSocket+ES6+Canvas 制作【你画我猜】小游戏' 
date: 2019-02-08 2:30:40
hidden: true
slug: ao1nnx7t0lo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>项目地址：<a href="https://github.com/jrainlau/draw-something" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/draw-something</a></p></blockquote>
<h2 id="articleHeader0">下载 &amp; 运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:jrainlau/draw-something.git
cd draw-something

node ws-server.js // 开启websocket服务器

npm run dev  // 运行客户端程序

然后浏览器打开localhost:8080即可" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git clone git@github<span class="hljs-selector-class">.com</span>:jrainlau/draw-something<span class="hljs-selector-class">.git</span>
cd draw-something

node ws-server<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 开启websocket服务器</span>

npm run dev  <span class="hljs-comment">// 运行客户端程序</span>

然后浏览器打开localhost:<span class="hljs-number">8080</span>即可</code></pre>
<p>效果预览：</p>
<p><span class="img-wrap"><img data-src="/img/bVyv5J" src="https://static.alili.tech/img/bVyv5J" alt="效果预览" title="效果预览" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">整体架构</h2>
<p>因为闲得慌，一直和朋友在玩你画我猜之类的小游戏，突然想到能不能自己也做一个呢，反正闲着也是闲着，同时正好可以学习一下websocket的用法。</p>
<p>首先分析整体架构部分：</p>
<p><span class="img-wrap"><img data-src="/img/bVyv9d" src="https://static.alili.tech/img/bVyv9d" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，整体架构非常简单，仅仅是一台服务器和两个客户端。</p>
<ul>
<li><p>WebSocket服务器：提供数据同步，内容分发功能，采用nodejs写成。</p></li>
<li><p>绘图画布：进行绘图的区域，同时能够获取关键词，其绘制的内容会同步到猜图画布中。</p></li>
<li><p>猜图画布：同步自绘图画布，输入框能够提交关键词，检测答案是否正确。</p></li>
</ul>
<p>下面来看具体的代码实现。</p>
<h2 id="articleHeader2">WebSocket服务器</h2>
<p>服务器采用<code>node.js</code>进行搭建，使用了<a href="https://github.com/websockets/ws" rel="nofollow noreferrer" target="_blank"><code>ws</code>库</a>实现websocket功能。新建一个名为<code>ws-socket.js</code>的文件，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*** ws-socket.js ***/

'use strict'
// 实例化WebSocketServer对象，监听8090端口
const WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8090})

// 定义关键词数组
let wordArr = ['Monkey', 'Dog', 'Bear', 'Flower', 'Girl']

wss.on('connection', (ws) => {
    console.log('connected.')
    
    // 随机获取一个关键词
    let keyWord = ((arr) => {
            let num = Math.floor(Math.random()*arr.length)
            return arr[num]
        })(wordArr)
        
    // 当服务器接收到客户端传来的消息时
    // 判断消息内容与关键词是否相等
    // 同时向所有客户端派发消息
    ws.on('message', (message) => {
        console.log('received: %s', message)
        if (message == keyWord) {
            console.log('correct')
            wss.clients.forEach((client) => {
                client.send('答对了！！')
            })
        } else {
            console.log('wrong')
            wss.clients.forEach((client) => {
                client.send(message)
            })
        }
    })
    
    // 服务器初始化时即向客户端提供一个关键词
    wss.clients.forEach((client) => {
        client.send('keyword:' + keyWord)
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/*** ws-socket.js ***/</span>
<span class="hljs-meta">
'use strict'</span>
<span class="hljs-comment">// 实例化WebSocketServer对象，监听8090端口</span>
<span class="hljs-keyword">const</span> WebSocketServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ws'</span>).Server
  , wss = <span class="hljs-keyword">new</span> WebSocketServer({<span class="hljs-attr">port</span>: <span class="hljs-number">8090</span>})

<span class="hljs-comment">// 定义关键词数组</span>
<span class="hljs-keyword">let</span> wordArr = [<span class="hljs-string">'Monkey'</span>, <span class="hljs-string">'Dog'</span>, <span class="hljs-string">'Bear'</span>, <span class="hljs-string">'Flower'</span>, <span class="hljs-string">'Girl'</span>]

wss.on(<span class="hljs-string">'connection'</span>, (ws) =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'connected.'</span>)
    
    <span class="hljs-comment">// 随机获取一个关键词</span>
    <span class="hljs-keyword">let</span> keyWord = <span class="hljs-function">(<span class="hljs-params">(arr</span>) =&gt;</span> {
            <span class="hljs-keyword">let</span> num = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*arr.length)
            <span class="hljs-keyword">return</span> arr[num]
        })(wordArr)
        
    <span class="hljs-comment">// 当服务器接收到客户端传来的消息时</span>
    <span class="hljs-comment">// 判断消息内容与关键词是否相等</span>
    <span class="hljs-comment">// 同时向所有客户端派发消息</span>
    ws.on(<span class="hljs-string">'message'</span>, (message) =&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'received: %s'</span>, message)
        <span class="hljs-keyword">if</span> (message == keyWord) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'correct'</span>)
            wss.clients.forEach(<span class="hljs-function">(<span class="hljs-params">client</span>) =&gt;</span> {
                client.send(<span class="hljs-string">'答对了！！'</span>)
            })
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'wrong'</span>)
            wss.clients.forEach(<span class="hljs-function">(<span class="hljs-params">client</span>) =&gt;</span> {
                client.send(message)
            })
        }
    })
    
    <span class="hljs-comment">// 服务器初始化时即向客户端提供一个关键词</span>
    wss.clients.forEach(<span class="hljs-function">(<span class="hljs-params">client</span>) =&gt;</span> {
        client.send(<span class="hljs-string">'keyword:'</span> + keyWord)
    })
})</code></pre>
<p>使用方法基本按照<a href="https://github.com/websockets/ws" rel="nofollow noreferrer" target="_blank"><code>ws</code>库</a>的文档即可。其中<code>ws.on('message', (message) =&gt; { .. })</code>方法会在接收到从客户端传来消息时执行，利用这个方法，我们可以从绘图画布不断地向服务器发送绘图位点的坐标，再通过<code>.send()</code>方法把坐标分发出去，在猜图画布中获取坐标，实现绘图数据的同步。</p>
<h2 id="articleHeader3">客户端结构</h2>
<p>作为客户端，我选择了<code>vue</code>进行开发，原因是因为<code>vue</code>使用简单快速。事先说明，本项目仅仅作为日常学习练手的项目而非vue的使用，所以有蛮多地方我是图方便暴力使用诸如<code>document.getElementById()</code>之类的写法的，以后有机会再改成符合<code>vue</code>审美的代码吧~</p>
<p>客户端结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|
|-- script
|       |-- components
|       |        |-- drawing-board.vue
|       |        |-- showing-board.vue
|       |
|       |-- App.vue
|       |
|       |-- index.js
|
|-- index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">
</span>|<span class="hljs-string">-- script
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- components
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">        </span>|<span class="hljs-string">-- drawing-board.vue
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">        </span>|<span class="hljs-string">-- showing-board.vue
</span>|<span class="hljs-string">       </span>|
|<span class="hljs-string">       </span>|<span class="hljs-string">-- App.vue
</span>|<span class="hljs-string">       </span>|
|<span class="hljs-string">       </span>|<span class="hljs-string">-- index.js
</span>|
|<span class="hljs-string">-- index.html</span></code></pre>
<p>详细代码请直接浏览<a href="https://github.com/jrainlau/draw-something" rel="nofollow noreferrer" target="_blank">项目</a>，这里仅对关键部分代码进行剖析。</p>
<h2 id="articleHeader4">绘图画布</h2>
<p>位于<code>./script/components/</code>的<code>drawing-board.vue</code>文件即为绘图画布组件。首先我们定义一个<code>Draw</code>类，里面是所有绘图相关的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*** drawing-board.vue ***/


'use strict'

class Draw {
    constructor(el) {
        this.el = el
        this.canvas = document.getElementById(this.el)
        this.cxt = this.canvas.getContext('2d')
        this.stage_info = canvas.getBoundingClientRect()
        // 记录绘图位点的坐标
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    // 初始化
    init(ws, btn) {
        this.canvas.onmousedown = () => {
            this.drawBegin(event, ws)
        }
        this.canvas.onmouseup = () => {
            this.drawEnd()
            ws.send('stop')
        }
        this.clearCanvas(ws, btn)
    }
    
    drawBegin(e, ws) {
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        this.cxt.strokeStyle = &quot;#000&quot;
        
        // 开始新的路径（这一句很关键，你可以注释掉看看有什么不同）
        this.cxt.beginPath()
        this.cxt.moveTo(
            e.clientX - this.stage_info.left,
            e.clientY - this.stage_info.top
        )
        // 记录起点
        this.path.beginX = e.clientX - this.stage_info.left
        this.path.beginY = e.clientY - this.stage_info.top

        document.onmousemove = () => {
            this.drawing(event, ws)
        }
    }
    
    drawing(e, ws) {
        this.cxt.lineTo(
            e.clientX - this.stage_info.left,
            e.clientY - this.stage_info.top
        )
        // 记录终点
        this.path.endX = e.clientX - this.stage_info.left
        this.path.endY = e.clientY - this.stage_info.top
        // 把位图坐标发送到服务器
        ws.send(this.path.beginX + '.' + this.path.beginY + '.' + this.path.endX + '.' + this.path.endY)

        this.cxt.stroke()
    }
    
    drawEnd() {
        document.onmousemove = document.onmouseup = null
    }
    
    clearCanvas(ws, btn) {
        // 点击按钮清空画布
        btn.onclick = () => {
            this.cxt.clearRect(0, 0, 500, 500)
            ws.send('clear')
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/*** drawing-board.vue ***/</span>


<span class="hljs-string">'use strict'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Draw</span> </span>{
    <span class="hljs-keyword">constructor</span>(el) {
        <span class="hljs-keyword">this</span>.el = el
        <span class="hljs-keyword">this</span>.canvas = document.getElementById(<span class="hljs-keyword">this</span>.el)
        <span class="hljs-keyword">this</span>.cxt = <span class="hljs-keyword">this</span>.canvas.getContext(<span class="hljs-string">'2d'</span>)
        <span class="hljs-keyword">this</span>.stage_info = canvas.getBoundingClientRect()
        <span class="hljs-comment">// 记录绘图位点的坐标</span>
        <span class="hljs-keyword">this</span>.path = {
            beginX: <span class="hljs-number">0</span>,
            beginY: <span class="hljs-number">0</span>,
            endX: <span class="hljs-number">0</span>,
            endY: <span class="hljs-number">0</span>
        }
    }
    <span class="hljs-comment">// 初始化</span>
    init(ws, btn) {
        <span class="hljs-keyword">this</span>.canvas.onmousedown = () =&gt; {
            <span class="hljs-keyword">this</span>.drawBegin(event, ws)
        }
        <span class="hljs-keyword">this</span>.canvas.onmouseup = () =&gt; {
            <span class="hljs-keyword">this</span>.drawEnd()
            ws.send(<span class="hljs-string">'stop'</span>)
        }
        <span class="hljs-keyword">this</span>.clearCanvas(ws, btn)
    }
    
    drawBegin(e, ws) {
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        <span class="hljs-keyword">this</span>.cxt.strokeStyle = <span class="hljs-string">"#000"</span>
        
        <span class="hljs-comment">// 开始新的路径（这一句很关键，你可以注释掉看看有什么不同）</span>
        <span class="hljs-keyword">this</span>.cxt.beginPath()
        <span class="hljs-keyword">this</span>.cxt.moveTo(
            e.clientX - <span class="hljs-keyword">this</span>.stage_info.left,
            e.clientY - <span class="hljs-keyword">this</span>.stage_info.top
        )
        <span class="hljs-comment">// 记录起点</span>
        <span class="hljs-keyword">this</span>.path.beginX = e.clientX - <span class="hljs-keyword">this</span>.stage_info.left
        <span class="hljs-keyword">this</span>.path.beginY = e.clientY - <span class="hljs-keyword">this</span>.stage_info.top

        document.onmousemove = () =&gt; {
            <span class="hljs-keyword">this</span>.drawing(event, ws)
        }
    }
    
    drawing(e, ws) {
        <span class="hljs-keyword">this</span>.cxt.lineTo(
            e.clientX - <span class="hljs-keyword">this</span>.stage_info.left,
            e.clientY - <span class="hljs-keyword">this</span>.stage_info.top
        )
        <span class="hljs-comment">// 记录终点</span>
        <span class="hljs-keyword">this</span>.path.endX = e.clientX - <span class="hljs-keyword">this</span>.stage_info.left
        <span class="hljs-keyword">this</span>.path.endY = e.clientY - <span class="hljs-keyword">this</span>.stage_info.top
        <span class="hljs-comment">// 把位图坐标发送到服务器</span>
        ws.send(<span class="hljs-keyword">this</span>.path.beginX + <span class="hljs-string">'.'</span> + <span class="hljs-keyword">this</span>.path.beginY + <span class="hljs-string">'.'</span> + <span class="hljs-keyword">this</span>.path.endX + <span class="hljs-string">'.'</span> + <span class="hljs-keyword">this</span>.path.endY)

        <span class="hljs-keyword">this</span>.cxt.stroke()
    }
    
    drawEnd() {
        document.onmousemove = document.onmouseup = <span class="hljs-literal">null</span>
    }
    
    clearCanvas(ws, btn) {
        <span class="hljs-comment">// 点击按钮清空画布</span>
        btn.onclick = () =&gt; {
            <span class="hljs-keyword">this</span>.cxt.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">500</span>, <span class="hljs-number">500</span>)
            ws.send(<span class="hljs-string">'clear'</span>)
        }
    }
}</code></pre>
<p>嗯，相信看代码很容易就看懂了当中逻辑，关键就是在<code>drawing()</code>的时候要不断地把坐标发送到服务器。</p>
<p>定义好<code>Draw</code>类以后，在<code>ready</code>阶段使用即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ready: () => {
        const ws = new WebSocket('ws://localhost:8090')
        let draw = new Draw('canvas')
        // 清空画布按钮
        let btn = document.getElementById('btn')
        // 与服务器建立连接后执行
        ws.onopen = () => {
            draw.init(ws, btn)
        }
        // 判断来自服务器的消息并操作
        ws.onmessage = (msg) => {
            msg.data.split(':')[0] == 'keyword' ?
                document.getElementById('keyword').innerHTML = msg.data.split(':')[1] :
                false
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>ready: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-string">'ws://localhost:8090'</span>)
        <span class="hljs-keyword">let</span> draw = <span class="hljs-keyword">new</span> Draw(<span class="hljs-string">'canvas'</span>)
        <span class="hljs-comment">// 清空画布按钮</span>
        <span class="hljs-keyword">let</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'btn'</span>)
        <span class="hljs-comment">// 与服务器建立连接后执行</span>
        ws.onopen = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            draw.init(ws, btn)
        }
        <span class="hljs-comment">// 判断来自服务器的消息并操作</span>
        ws.onmessage = <span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
            msg.data.split(<span class="hljs-string">':'</span>)[<span class="hljs-number">0</span>] == <span class="hljs-string">'keyword'</span> ?
                <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'keyword'</span>).innerHTML = msg.data.split(<span class="hljs-string">':'</span>)[<span class="hljs-number">1</span>] :
                <span class="hljs-literal">false</span>
        }
    }</code></pre>
<h2 id="articleHeader5">猜图画布</h2>
<p>猜图画布很简单，只需要定义一个canvas画布，然后接收服务器发送来的坐标并绘制即可。看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ready: () => {
            'use strict'
            const ws = new WebSocket('ws://localhost:8090');
            const canvas = document.getElementById('showing')
            const cxt = canvas.getContext('2d')
            // 是否重新设定路径起点
            // 为了避免把路径起点重复定义在同一个地方
            let moveToSwitch = 1
            ws.onmessage = (msg) => {
              let pathObj = msg.data.split('.')
              cxt.strokeStyle = &quot;#000&quot;
              
              if (moveToSwitch &amp;&amp; msg.data != 'stop' &amp;&amp; msg.data != 'clear') {
                  cxt.beginPath()
                  cxt.moveTo(pathObj[0], pathObj[1])
                  moveToSwitch = 0
              } else if (!moveToSwitch &amp;&amp; msg.data == 'stop') {
                  cxt.beginPath()
                  cxt.moveTo(pathObj[0], pathObj[1])
                  moveToSwitch = 1
              } else if (moveToSwitch &amp;&amp; msg.data == 'clear') {
                  cxt.clearRect(0, 0, 500, 500)
              } else if (msg.data == '答对了！！') {
                  alert('恭喜你答对了！！')
              }

              cxt.lineTo(pathObj[2], pathObj[3])
              cxt.stroke()
            }

            ws.onopen = () => {
                let submitBtn = document.getElementById('submit')
                // 发送答案到服务器
                submitBtn.onclick = () => {
                    let keyword = document.getElementById('answer').value
                    ws.send(keyword)
                }
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>ready: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-string">'use strict'</span>
            <span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-string">'ws://localhost:8090'</span>);
            <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'showing'</span>)
            <span class="hljs-keyword">const</span> cxt = canvas.getContext(<span class="hljs-string">'2d'</span>)
            <span class="hljs-comment">// 是否重新设定路径起点</span>
            <span class="hljs-comment">// 为了避免把路径起点重复定义在同一个地方</span>
            <span class="hljs-keyword">let</span> moveToSwitch = <span class="hljs-number">1</span>
            ws.onmessage = <span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
              <span class="hljs-keyword">let</span> pathObj = msg.data.split(<span class="hljs-string">'.'</span>)
              cxt.strokeStyle = <span class="hljs-string">"#000"</span>
              
              <span class="hljs-keyword">if</span> (moveToSwitch &amp;&amp; msg.data != <span class="hljs-string">'stop'</span> &amp;&amp; msg.data != <span class="hljs-string">'clear'</span>) {
                  cxt.beginPath()
                  cxt.moveTo(pathObj[<span class="hljs-number">0</span>], pathObj[<span class="hljs-number">1</span>])
                  moveToSwitch = <span class="hljs-number">0</span>
              } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!moveToSwitch &amp;&amp; msg.data == <span class="hljs-string">'stop'</span>) {
                  cxt.beginPath()
                  cxt.moveTo(pathObj[<span class="hljs-number">0</span>], pathObj[<span class="hljs-number">1</span>])
                  moveToSwitch = <span class="hljs-number">1</span>
              } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (moveToSwitch &amp;&amp; msg.data == <span class="hljs-string">'clear'</span>) {
                  cxt.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">500</span>, <span class="hljs-number">500</span>)
              } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (msg.data == <span class="hljs-string">'答对了！！'</span>) {
                  alert(<span class="hljs-string">'恭喜你答对了！！'</span>)
              }

              cxt.lineTo(pathObj[<span class="hljs-number">2</span>], pathObj[<span class="hljs-number">3</span>])
              cxt.stroke()
            }

            ws.onopen = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-keyword">let</span> submitBtn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'submit'</span>)
                <span class="hljs-comment">// 发送答案到服务器</span>
                submitBtn.onclick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">let</span> keyword = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'answer'</span>).value
                    ws.send(keyword)
                }
            }
        }</code></pre>
<p>到这里，游戏已经可以玩啦！不过还有很多细节是有待加强和修改的，比如可以给画笔选择颜色啊，多个用户抢答计分啊等等。</p>
<h2 id="articleHeader6">后记</h2>
<p>大半天时间鼓捣出来的玩意儿，虽然粗糙，但是学到的东西还真不少，尤其是websocket和canvas这两个我所不熟悉的领域，果然实践才能出真知。</p>
<p>选择ES6真的能够极大地提升工作效率，<code>Class</code>语法的出现简直不能更赞，作为才学习<code>jQuery</code>源码没多久的我来说，ES6真的非常小清新。</p>
<p>欢迎持续关注我的专栏，会不断送出干货哦，尽请期待！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue+WebSocket+ES6+Canvas 制作【你画我猜】小游戏

## 原文链接
[https://segmentfault.com/a/1190000005804860](https://segmentfault.com/a/1190000005804860)

