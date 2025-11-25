---
title: '基于 socket.io 实现实时你画我猜游戏' 
date: 2019-02-09 2:30:58
hidden: true
slug: ek8xqibfb9d
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>一直都想好好的学习运用<code>node</code>，一直都不知道要做什么东西，最近Java Web老师要求做个前端的应用，既然是前端应用，那肯定得是单页应用了，而且node很适用于高并发的实时应用，所以便选择<code>node</code>以及基于<code>node</code>的<code>socket.io</code>。</p>
<h2 id="articleHeader1">演示地址</h2>
<ul>
<li><p>实时画板+聊天室（<a href="https://github.com/moyuyc/paint_online" rel="nofollow noreferrer" target="_blank">GitHub</a>）</p></li>
<li><p>你画我猜+聊天室（<a href="http://paintgame.moyuyc.xyz/" rel="nofollow noreferrer" target="_blank">Demo</a> | <a href="https://github.com/moyuyc/paint_game" rel="nofollow noreferrer" target="_blank">GitHub</a>）</p></li>
<li><p>图片抢先看<br><span class="img-wrap"><img data-src="/img/bVx1Ww" src="https://static.alili.tech/img/bVx1Ww" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
<h2 id="articleHeader2">解释</h2>
<h3 id="articleHeader3">关于<code>Socket.IO</code>
</h3>
<blockquote><p><code>Socket.IO</code> 是基于node实现的套接字前端后端数据交互的库，通过它的封装，使用者可以很方便的开发，而且支持<code>websocket</code>/<code>ajax 长轮询</code>等方法，兼容低版本浏览器。</p></blockquote>
<p>基本使用如下：</p>
<p><em>服务器端</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var httpd = require('http').createServer(handler);
var io = require('socket.io').listen(httpd);
function handler(req,res) {
    
}
io.sockets.on('connection',function(socket){
    //新的客户端连接
    socket.on('login',(name,age)=>{
        socket.emit('message',name+','+age);//触发客户端message事件
    })
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> httpd = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>).createServer(handler);
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>).listen(httpd);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params">req,res</span>) </span>{
    
}
io.sockets.on(<span class="hljs-string">'connection'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>)</span>{
    <span class="hljs-comment">//新的客户端连接</span>
    socket.on(<span class="hljs-string">'login'</span>,(name,age)=&gt;{
        socket.emit(<span class="hljs-string">'message'</span>,name+<span class="hljs-string">','</span>+age);<span class="hljs-comment">//触发客户端message事件</span>
    })
});</code></pre>
<p><em>客户端</em></p>
<p>引入<code>js</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;socket.io/socket.io.js'></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"socket.io/socket.io.js'&gt;&lt;/script&gt;</span></span></code></pre>
<p>进行交互</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var socket = io.connect();      //触发服务器端connection事件
socket.emit('login','moyu',20); //触发服务器端login事件
socket.on('message',function(msg){
    alert(msg);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> socket = io.connect();      <span class="hljs-comment">//触发服务器端connection事件</span>
socket.emit(<span class="hljs-string">'login'</span>,<span class="hljs-string">'moyu'</span>,<span class="hljs-number">20</span>); <span class="hljs-comment">//触发服务器端login事件</span>
socket.on(<span class="hljs-string">'message'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    alert(msg);
})</code></pre>
<h3 id="articleHeader4">关于排行榜</h3>
<p>利用了js的匿名立即执行函数进行模块化包装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tops = (function () {
    /*
     * _tops : 存放所有id,按照回答正确数倒序排列
     * idmap : 一个hash map结构，key为id，value为名字与回答正确数
     * n : 前n个，在toJSON调用
     */
    var _tops = [],idmap={},n=10;
    return {
        set : function (id,name,v) {
            if(this.isExists(id))//如果id已经存在则删除，防止出现重复id
                this.remove(id);
            // 找到按照v从大到小所对应的位置
            var i = _tops.findIndex(x=>{return idmap[x].v<v;});
            i= i===-1 ? _tops.length : i;
            // id在i+1位置插入至_tops
            _tops.splice(i,0,id);
            idmap[id] = {name:name,v:v};
        },
        isExists : function (id) {
            return idmap[id]!=null;
        },
        remove : function (id) {
            var i = _tops.indexOf(id);
            if(i!==-1) {
                _tops.splice(i, 1);
                delete idmap[id];
                return true;
            }
            return false;
        },
        get:function (id) {
            return idmap[id];
        },
        toJSON:function () {
            // JSON.stringify方法会隐式调用该方法        
            var arr = [];
            _tops.every((x,i)=>{
                if(i>=n) return false;
                arr.push({id:x,v:idmap[x].v,name:idmap[x].name});
                return true;
            });
            return arr;
        }
    }
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tops = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">/*
     * _tops : 存放所有id,按照回答正确数倒序排列
     * idmap : 一个hash map结构，key为id，value为名字与回答正确数
     * n : 前n个，在toJSON调用
     */</span>
    <span class="hljs-keyword">var</span> _tops = [],idmap={},n=<span class="hljs-number">10</span>;
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">set</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id,name,v</span>) </span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isExists(id))<span class="hljs-comment">//如果id已经存在则删除，防止出现重复id</span>
                <span class="hljs-keyword">this</span>.remove(id);
            <span class="hljs-comment">// 找到按照v从大到小所对应的位置</span>
            <span class="hljs-keyword">var</span> i = _tops.findIndex(<span class="hljs-function"><span class="hljs-params">x</span>=&gt;</span>{<span class="hljs-keyword">return</span> idmap[x].v&lt;v;});
            i= i===<span class="hljs-number">-1</span> ? _tops.length : i;
            <span class="hljs-comment">// id在i+1位置插入至_tops</span>
            _tops.splice(i,<span class="hljs-number">0</span>,id);
            idmap[id] = {<span class="hljs-attr">name</span>:name,<span class="hljs-attr">v</span>:v};
        },
        <span class="hljs-attr">isExists</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
            <span class="hljs-keyword">return</span> idmap[id]!=<span class="hljs-literal">null</span>;
        },
        <span class="hljs-attr">remove</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
            <span class="hljs-keyword">var</span> i = _tops.indexOf(id);
            <span class="hljs-keyword">if</span>(i!==<span class="hljs-number">-1</span>) {
                _tops.splice(i, <span class="hljs-number">1</span>);
                <span class="hljs-keyword">delete</span> idmap[id];
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            }
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        },
        <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
            <span class="hljs-keyword">return</span> idmap[id];
        },
        <span class="hljs-attr">toJSON</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// JSON.stringify方法会隐式调用该方法        </span>
            <span class="hljs-keyword">var</span> arr = [];
            _tops.every(<span class="hljs-function">(<span class="hljs-params">x,i</span>)=&gt;</span>{
                <span class="hljs-keyword">if</span>(i&gt;=n) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                arr.push({<span class="hljs-attr">id</span>:x,<span class="hljs-attr">v</span>:idmap[x].v,<span class="hljs-attr">name</span>:idmap[x].name});
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            });
            <span class="hljs-keyword">return</span> arr;
        }
    }
}());</code></pre>
<h3 id="articleHeader5">关于<code>Bootstrap</code>栅格</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
    margin-right: auto;
    margin-left: auto;
    //防止最外层的.row元素左右扩展15px
    padding-left: 15px;
    padding-right: 15px;
}

.col-3{
    width: 30%;
}
.col-4{
    width: 40%;
}
.col-9{
    width: 90%;
}

/.../

.row{
    /* 向外左右延伸15px */
    margin-right: -15px;
    margin-left: -15px;
}
/* 防止子元素为float,父元素的高度为0 */
.row:before,
.row:after {
    content: &quot; &quot;;
    display: table;
}
.row:after {
    clear: both;
}

.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9{
    padding-left: 15px;
    padding-right: 15px;
    float:left;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">margin-right</span>: auto;
    <span class="hljs-attribute">margin-left</span>: auto;
    //防止最外层的.row元素左右扩展15px
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">15px</span>;
}

<span class="hljs-selector-class">.col-3</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30%</span>;
}
<span class="hljs-selector-class">.col-4</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">40%</span>;
}
<span class="hljs-selector-class">.col-9</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
}

/.../

<span class="hljs-selector-class">.row</span>{
    <span class="hljs-comment">/* 向外左右延伸15px */</span>
    <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">15px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">15px</span>;
}
<span class="hljs-comment">/* 防止子元素为float,父元素的高度为0 */</span>
<span class="hljs-selector-class">.row</span><span class="hljs-selector-pseudo">:before</span>,
<span class="hljs-selector-class">.row</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
    <span class="hljs-attribute">display</span>: table;
}
<span class="hljs-selector-class">.row</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">clear</span>: both;
}

<span class="hljs-selector-class">.col-1</span>, <span class="hljs-selector-class">.col-2</span>, <span class="hljs-selector-class">.col-3</span>, <span class="hljs-selector-class">.col-4</span>, <span class="hljs-selector-class">.col-5</span>, <span class="hljs-selector-class">.col-6</span>, <span class="hljs-selector-class">.col-7</span>, <span class="hljs-selector-class">.col-8</span>, <span class="hljs-selector-class">.col-9</span>{
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">float</span>:left;
}</code></pre>
<p>HTML结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<main class='container'>
    <div class='row'>
        <div class='col-8'>
            <div class='row'>
                <div class='col-6'>
                    <p>col-6</p>
                </div>
                <div class='col-4'>
                    <div>col-4</div>
                </div>
            </div>
        </div>
        <div class='col-2'>
            <div>col-2</div>
        </div>
    </div>
</main>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'container'</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'row'</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'col-8'</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'row'</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'col-6'</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>col-6<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'col-4'</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>col-4<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'col-2'</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>col-2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></code></pre>
<h3 id="articleHeader6">关于一栏（多栏）宽度固定，一栏自适应</h3>
<ul>
<li><p><a href="http://moyuyc.github.io/htm/%E5%9C%A3%E6%9D%AF%E5%B8%83%E5%B1%80.html" rel="nofollow noreferrer" target="_blank">圣杯布局</a></p></li>
<li><p><a href="http://moyuyc.github.io/htm/%E5%8F%8C%E9%A3%9E%E7%BF%BC.html" rel="nofollow noreferrer" target="_blank">双飞翼</a></p></li>
</ul>
<h2 id="articleHeader7">感受</h2>
<p>...做单页应用真的需要挺大的心脏，而且需要较好的整体的架构，好在<code>socket.io</code>对websocket封装的不错，变成了面向消息的方式，代码结构相对更加清晰了些。</p>
<p>...不敢想象用Java做这种实时单页应用后端会有多么的「拗口」。最后推荐一个实时的更加优秀的游戏：<a href="http://slither.io/" rel="nofollow noreferrer" target="_blank">slithe</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 socket.io 实现实时你画我猜游戏

## 原文链接
[https://segmentfault.com/a/1190000005688286](https://segmentfault.com/a/1190000005688286)

