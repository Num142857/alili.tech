---
title: 'vue.js+socket.io打造一个好玩的新闻社区' 
date: 2019-01-12 2:30:24
hidden: true
slug: y6vmy9cvs5
categories: [reprint]
---

{{< raw >}}

                    
<hr>
<p>title: Socket.io+vue打造新闻社区<br>date: 2017-06-12 20:19:05</p>
<h2 id="articleHeader0">tags: [vue.js,javascript,socket.io]</h2>
<h2 id="articleHeader1">vue2.0 + socket.io打造一个DIY新闻社区（web第一版）</h2>
<p>学习vue快有一个多月了，想着动手做一个DIY项目，就选择了做一个新闻方面的社区，很多不足的地方，希望大家  <br>  见谅，但是对于初学的小伙伴来说，相信还是可以帮助到大家，毕竟我只是一个爱分享的小学渣。<br>  ### 效果预览</p>
<p><a href="https://keephhh.com/news" rel="nofollow noreferrer" target="_blank">演示地址</a></p>
<p><a href="https://github.com/keephhh/news" rel="nofollow noreferrer" target="_blank">源码地址 </a></p>
<p>### 项目描述<br><span class="img-wrap"><img data-src="/img/remote/1460000009813479" src="https://static.alili.tech/img/remote/1460000009813479" alt="1" title="1" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000009813480?w=375&amp;h=667" src="https://static.alili.tech/img/remote/1460000009813480?w=375&amp;h=667" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000009813481" src="https://static.alili.tech/img/remote/1460000009813481" alt="6" title="6" style="cursor: pointer;"></span><br>  前端部分</p>
<ul>
<li><p>SPA单页应用，前后端的分离， webpack build to dist</p></li>
<li><p>移动设备兼容：使用flexible.js和rem处理兼容问题</p></li>
<li><p>axios做ajax请求</p></li>
<li><p>使用了 Vuex 管理组件间的状态，实现非父子组件之间的通信</p></li>
<li><p>canvas实现了一个页面加载的时间动画</p></li>
</ul>
<p>后端部分</p>
<ul>
<li><p>直接搭建在自己的服务器上，API数据是聚合上的数据</p></li>
<li><p>express 做静态资源目录</p></li>
<li><p>启用了socket.io实现一个简易的聊天窗口</p></li>
</ul>
<p>待更新的功能</p>
<ul>
<li><p>用户登录功能，目前收藏只能保存在localstore里面</p></li>
<li><p>用 express + mongodb 保存用户状态</p></li>
<li><p>用户的评论功能</p></li>
</ul>
<h2 id="articleHeader2">具体功能的实现</h2>
<p>使用了Vue组件化开发的概念，将端后端分离开，样式统一放在一个单独的文件夹，方便管理的复用，使用vuex  <br>统一做一个资源管理，当各个组件需要数据时就向vuex仓库请求，极大的方便了管理，模块化更加的清晰明了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state: {
    // url: [require('../../pic/home_1.png') , require('../../pic/home_2.png')],
    Title: '云新闻',
    newslist: [],
    url: [require('./pic/like_1.png') , require('./pic/like_2.png')],
    isShowAsideMenu: false,
    isShowAbout: false,
    ischangeC: false,
    tab: 'top',
    Tab: 'guoji',
    title: '云新闻',
    showmenu: true,
    showback: false,
    msg: true,
    ismore: false,
    hid: true,
    hod: false,
    hmd: false,
    bgColor: '',
    like: 0,
    status: '收藏',
    v1: true,
    isshowf: true,
    isLoading: false,
    isShare: false,
    isCollection: false
  },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-comment">// url: [require('../../pic/home_1.png') , require('../../pic/home_2.png')],</span>
    Title: <span class="hljs-string">'云新闻'</span>,
    <span class="hljs-attr">newslist</span>: [],
    <span class="hljs-attr">url</span>: [<span class="hljs-built_in">require</span>(<span class="hljs-string">'./pic/like_1.png'</span>) , <span class="hljs-built_in">require</span>(<span class="hljs-string">'./pic/like_2.png'</span>)],
    <span class="hljs-attr">isShowAsideMenu</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">isShowAbout</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">ischangeC</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">tab</span>: <span class="hljs-string">'top'</span>,
    <span class="hljs-attr">Tab</span>: <span class="hljs-string">'guoji'</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">'云新闻'</span>,
    <span class="hljs-attr">showmenu</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">showback</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">msg</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">ismore</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">hid</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">hod</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">hmd</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">bgColor</span>: <span class="hljs-string">''</span>,
    <span class="hljs-attr">like</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">status</span>: <span class="hljs-string">'收藏'</span>,
    <span class="hljs-attr">v1</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">isshowf</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">isShare</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">isCollection</span>: <span class="hljs-literal">false</span>
  },
</code></pre>
<h2 id="articleHeader3">vuex的使用</h2>
<ul>
<li><p>需要注意的地方：Action提交的是mution，而不是直接的状态变更</p></li>
<li><p>Action 可以包含任意异步操作。</p></li>
</ul>
<h2 id="articleHeader4">socket.io的使用</h2>
<p>利用socket实现了简单的聊天功能，在同一个服务器下。看看新闻的同时还可以相互讨论一下,这是在后端请求，当然你  <br>得事先安装一下socket了 <code>npm install socket.io --save</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var server = http.createServer(app)
var io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log('启动了Socket.io');
  socket.on('sendGroupMsg', function(value){
    this.broadcast.emit('receiveGroupMsg', value);
  })
  // socket.broadcast.emit('user connected');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> server = http.createServer(app)
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(server)

io.on(<span class="hljs-string">'connection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">socket</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'启动了Socket.io'</span>);
  socket.on(<span class="hljs-string">'sendGroupMsg'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
    <span class="hljs-keyword">this</span>.broadcast.emit(<span class="hljs-string">'receiveGroupMsg'</span>, value);
  })
  <span class="hljs-comment">// socket.broadcast.emit('user connected');</span>
})</code></pre>
<p>前端再运用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  socket.emit('sendGroupMsg', this.value.trim());

  socket.on('receiveGroupMsg',() => {
    ...
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  socket.emit(<span class="hljs-string">'sendGroupMsg'</span>, <span class="hljs-keyword">this</span>.value.trim());

  socket.on(<span class="hljs-string">'receiveGroupMsg'</span>,() =&gt; {
    ...
  })</code></pre>
<h3 id="articleHeader5">前期我遇到的问题(分享一下)</h3>
<ul><li><p>API存在跨域问题啊，新手肯定有这样的疑惑，这可怎么决解？</p></li></ul>
<p>遇到这个肯定是要现在自己的后台对这个数据进行处理一下吗，不然你自己的前端根本访问不了那个接口，相  <br> 当于自己做一下转接。其实也挺容易的  <br> (后端处理接口)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apiRoutes.get('/news/:type', (req, res) => {
  let type = req.params.type;
  function search(tab) {
    return new Promise((resolve, reject) => {
      let searchResult = '';
      url = 'http://v.juhe.cn/toutiao/index?type='+ tab +'........';
      http.get(url, response => {
        response.on('data', data => {
          searchResult += data;
        });
        response.on('end', () => {
          resolve(searchResult)
        })
      })
    })
  }
  search(type)
    .then(searchResult => {
      res.json(JSON.parse(searchResult))
    })
});

app.use('/api', apiRoutes);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">apiRoutes.get(<span class="hljs-string">'/news/:type'</span>, (req, res) =&gt; {
  <span class="hljs-keyword">let</span> type = req.params.type;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">search</span>(<span class="hljs-params">tab</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">let</span> searchResult = <span class="hljs-string">''</span>;
      url = <span class="hljs-string">'http://v.juhe.cn/toutiao/index?type='</span>+ tab +<span class="hljs-string">'........'</span>;
      http.get(url, response =&gt; {
        response.on(<span class="hljs-string">'data'</span>, data =&gt; {
          searchResult += data;
        });
        response.on(<span class="hljs-string">'end'</span>, () =&gt; {
          resolve(searchResult)
        })
      })
    })
  }
  search(type)
    .then(<span class="hljs-function"><span class="hljs-params">searchResult</span> =&gt;</span> {
      res.json(<span class="hljs-built_in">JSON</span>.parse(searchResult))
    })
});

app.use(<span class="hljs-string">'/api'</span>, apiRoutes);</code></pre>
<p>(前端请求自定义路由)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.axios.get('/api/news/' + type)
    .then(data => {
          // console.log(data);

          if(data.status) {
            this.$store.commit('changeTab', {news: data.data.result.data, type: type, isloading: false})
            this.$store.commit('details', {data: this.$store.state.Title, fa: true, fb: false, fc: true,})
          }
      })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">'/api/news/'</span> + type)
    .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
          <span class="hljs-comment">// console.log(data);</span>

          <span class="hljs-keyword">if</span>(data.status) {
            <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'changeTab'</span>, {<span class="hljs-attr">news</span>: data.data.result.data, <span class="hljs-attr">type</span>: type, <span class="hljs-attr">isloading</span>: <span class="hljs-literal">false</span>})
            <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'details'</span>, {<span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.$store.state.Title, <span class="hljs-attr">fa</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">fb</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">fc</span>: <span class="hljs-literal">true</span>,})
          }
      })</code></pre>
<p>刚学的小伙伴们是不是瞬间觉得还是自己可以处理的呢，实在不行你就把我的项目拷到自己的目录下安装运行一  <br>下，再研究一下。但是一个很难受的事就是我请求的API放在自己的网站服务器上，由于我的域名是https的，API  <br>里面的文章详情的地址是http，还没备案，存在打不开的缺陷， 但是你们自己拷贝到自己的电脑下正常安装依赖  <br>运行还是没问题的了，请谅解，不是不可以访问哦。  </p>
<p>安装并运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build

<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm run build --report</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js+socket.io打造一个好玩的新闻社区

## 原文链接
[https://segmentfault.com/a/1190000009813474](https://segmentfault.com/a/1190000009813474)

