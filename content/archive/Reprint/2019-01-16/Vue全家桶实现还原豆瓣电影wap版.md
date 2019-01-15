---
title: 'Vue全家桶实现还原豆瓣电影wap版' 
date: 2019-01-16 2:30:07
hidden: true
slug: kbhj85i3ffs
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">douban-movie(豆瓣电影wap版)</h1>
<p>用vue全家桶仿写豆瓣电影wap版。</p>
<p>最近在公司项目中尝试使用vue，但奈何自己初学水平有限，上了vue没有上vuex，开发过程特别难受。</p>
<p>于是玩一玩本项目，算是对相关技术更加熟悉了。</p>
<p>原计划仿写完所有页面，碍于豆瓣的接口API有限，实现页面也有限。</p>
<p>由于公开的<a href="https://developers.douban.com/wiki/?title=movie_v2#subject" rel="nofollow noreferrer" target="_blank">豆瓣接口</a>具有访问次数限制，克隆到本地体验效果更加！</p>
<p>web端访问已设置宽度适配。</p>
<p>进入GitHub查看<a href="https://github.com/xingbofeng/douban-movie" rel="nofollow noreferrer" target="_blank">本项目源码</a></p>
<p>欢迎<code>issue</code>，<code>pr</code>，<code>star</code> or <code>follow</code>！我将继续开源更多有趣的项目！</p>
<p>推荐一些之前写的新手入门项目</p>
<ul>
<li><p><a href="https://github.com/xingbofeng/wx-audio" rel="nofollow noreferrer" target="_blank">wx-audio(微信小程序：音乐播放器)</a></p></li>
<li><p><a href="https://github.com/xingbofeng/paintCanvas" rel="nofollow noreferrer" target="_blank">paintCanvas(vue实现的你画我猜)</a></p></li>
<li><p><a href="https://github.com/xingbofeng/css-grid-flex" rel="nofollow noreferrer" target="_blank">css-grid-flex(关于css的grid布局和flex布局的入门心得)</a></p></li>
</ul>
<h2 id="articleHeader1">在线版</h2>
<p><a href="http://www.angryzhangzhe.cn:3000/" rel="nofollow noreferrer" target="_blank">点击进入</a></p>
<h2 id="articleHeader2">部分效果截图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009165078?w=444&amp;h=801" src="https://static.alili.tech/img/remote/1460000009165078?w=444&amp;h=801" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">工具&amp;技能</h2>
<ul>
<li><p><code>vue</code> + <code>vuex</code>+ <code>vue-router</code>全家桶</p></li>
<li><p><code>webpack</code> + <code>webpack-dev-server</code> + <code>http-proxy-middleware</code>进行本地开发环境http请求转发，实现跨域请求</p></li>
<li><p>线上使用<code>express</code>的<code>http-proxy-middleware</code>实现请求转发</p></li>
<li><p><code>iView</code>一款vue的组件库</p></li>
<li><p><code>vue-lazyload</code>实现图片懒加载</p></li>
<li><p><code>rem</code> + <code>flex</code> + <code>grid</code>实现移动端适配</p></li>
<li><p><code>http-proxy-middleware</code> 一个http代理的中间件，进行http请求转发，实现跨域请求</p></li>
<li><p><code>postman</code> 接口测试工具</p></li>
</ul>
<h2 id="articleHeader4">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/xingbofeng/douban-movie.git

cd douban-movie

npm install 

npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/xingbofeng/douban-movie.git

cd douban-movie

npm install 

npm run dev</code></pre>
<h2 id="articleHeader5">实现功能</h2>
<h3 id="articleHeader6">首页</h3>
<ul>
<li><p>[x] 影院热映、即将上映、top250、北美票房榜</p></li>
<li><p>[x] 电影条目可横向滚动</p></li>
<li><p>[x] 预览电影评分</p></li>
</ul>
<h3 id="articleHeader7">搜索页</h3>
<p>输入搜索关键词，<code>回车键</code>搜索，或者点击搜索按钮。</p>
<ul>
<li><p>[x] 搜索功能</p></li>
<li><p>[x] 热门搜索词条的记录</p></li>
</ul>
<h3 id="articleHeader8">查看更多</h3>
<ul>
<li><p>[x] 预览电影评分</p></li>
<li><p>[x] 滚动动态加载</p></li>
<li><p>[x] 数据缓存入vuex</p></li>
</ul>
<h3 id="articleHeader9">电影详情</h3>
<ul>
<li><p>[x] 电影评分</p></li>
<li><p>[x] 电影条目</p></li>
<li><p>[x] 演员列表</p></li>
<li><p>[x] 剧情简介</p></li>
<li><p>[x] 数据缓存入vuex</p></li>
</ul>
<h3 id="articleHeader10">搜索结果页</h3>
<ul>
<li><p>[x] 翻页功能</p></li>
<li><p>[x] 图片懒加载</p></li>
<li><p>[x] 预览电影条目</p></li>
<li><p>[x] 本地缓存浏览信息</p></li>
</ul>
<h2 id="articleHeader11">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|
|—— build 
|—— config
|—— server 服务端
| |—— app.js 服务端启动入口文件
| |—— static 打包后的资源文件
| |__ index.html 网页入口
|
|——src 资源文件
| |—— assets 组件静态资源库
| |—— components 组件库
| |—— router 路由配置
| |—— store vuex状态管理
| |—— App.vue douban-movieSPA
| |__ main.js douban-movieSPA入口
|
|__ static 静态资源目录
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">
</span>|<span class="hljs-string">—— build 
</span>|<span class="hljs-string">—— config
</span>|<span class="hljs-string">—— server 服务端
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">—— app.js 服务端启动入口文件
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">—— static 打包后的资源文件
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">__ index.html 网页入口
</span>|
|<span class="hljs-string">——src 资源文件
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">—— assets 组件静态资源库
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">—— components 组件库
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">—— router 路由配置
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">—— store vuex状态管理
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">—— App.vue douban-movieSPA
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">__ main.js douban-movieSPA入口
</span>|
|<span class="hljs-string">__ static 静态资源目录
</span></code></pre>
<h2 id="articleHeader12">开发心得</h2>
<h3 id="articleHeader13">如何缓存数据</h3>
<p>这个问题在我之前的的项目总结已经总结过。</p>
<p>加入我们有电影条目A、B、C三个电影条目详情。进入A加载A，进入B加载B。此时也要把A缓存入vuex中。</p>
<p>可以类似于下面的写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  [`${A.id}`]: A,
  ...store.state
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  [`${A.id}`]: A,
  ...store.state
}</code></pre>
<p>具体代码可见<code>/src/router/routes</code>下列相关文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeEnter: (to, before, next) => {
  const currentMovieId = to.params.currentMovieId;
  if (store.state.moviedetail.currentMovie[`${currentMovieId}`]) {
    store.commit(types.LOADING_FLAG, false);
    next();
    return;
  }
  store.commit(types.LOADING_FLAG, true);
  currentMovie(currentMovieId).then((currentMovieDetail) => {
    // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
    const id = currentMovieDetail.id;
    store.commit(types.CURRENT_MOVIE, {
      [`${id}`]: currentMovieDetail,
      ...store.state.moviedetail.currentMovie,
    });
    store.commit(types.LOADING_FLAG, false);
    store.commit(types.NET_STATUS, '');
    document.title = `${currentMovieDetail.title} - 电影 - 豆瓣`;
  }).catch((error) => {
    document.title = '出错啦 Oops… - 豆瓣';
    store.commit(types.NET_STATUS, error);
    store.commit(types.LOADING_FLAG, false);
  });
  next();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">beforeEnter: <span class="hljs-function">(<span class="hljs-params">to, before, next</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> currentMovieId = to.params.currentMovieId;
  <span class="hljs-keyword">if</span> (store.state.moviedetail.currentMovie[<span class="hljs-string">`<span class="hljs-subst">${currentMovieId}</span>`</span>]) {
    store.commit(types.LOADING_FLAG, <span class="hljs-literal">false</span>);
    next();
    <span class="hljs-keyword">return</span>;
  }
  store.commit(types.LOADING_FLAG, <span class="hljs-literal">true</span>);
  currentMovie(currentMovieId).then(<span class="hljs-function">(<span class="hljs-params">currentMovieDetail</span>) =&gt;</span> {
    <span class="hljs-comment">// 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。</span>
    <span class="hljs-keyword">const</span> id = currentMovieDetail.id;
    store.commit(types.CURRENT_MOVIE, {
      [<span class="hljs-string">`<span class="hljs-subst">${id}</span>`</span>]: currentMovieDetail,
      ...store.state.moviedetail.currentMovie,
    });
    store.commit(types.LOADING_FLAG, <span class="hljs-literal">false</span>);
    store.commit(types.NET_STATUS, <span class="hljs-string">''</span>);
    <span class="hljs-built_in">document</span>.title = <span class="hljs-string">`<span class="hljs-subst">${currentMovieDetail.title}</span> - 电影 - 豆瓣`</span>;
  }).catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
    <span class="hljs-built_in">document</span>.title = <span class="hljs-string">'出错啦 Oops… - 豆瓣'</span>;
    store.commit(types.NET_STATUS, error);
    store.commit(types.LOADING_FLAG, <span class="hljs-literal">false</span>);
  });
  next();
}</code></pre>
<h3 id="articleHeader14">翻页加载</h3>
<p>其实这个在之前的React项目中也有做过，设置一个<code>currentPage</code>的状态，然后根据这个状态来渲染页面。</p>
<p>具体代码可见<code>/src/containers/Tag.vue</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  ...mapState({
    tagData(state) {
      return state.tag.tagData[`${this.$route.params.currentTagId}`];
    },
  }),

  subjects() {
    return this.tagData.subjects.slice(
      (this.currentPage - 1) * 10,
      this.currentPage * 10,
    );
  },
},

methods: {
  ...mapActions(['getMoreTagData']),
  changePage(flag) {
    const currentTagId = this.$route.params.currentTagId;
    const { start, count } = this.tagData;
    // 第一页不能往前翻页，最后一页不能往后翻页。
    if ((this.currentPage === 1 &amp;&amp; flag === 'reduce') ||
      (this.currentPage === Math.ceil(this.tagData.total / 10) &amp;&amp; flag === 'add')
    ) {
      return;
    }
    if (flag === 'add') {
      this.currentPage = this.currentPage + 1;
      // 每次请求十条数据
      this.getMoreTagData({
        tag: currentTagId,
        count: 10,
        start: count + start,
      });
      // 需要使用localStorge保存当前的页码信息，再次进入可以有这个页码信息。
      const doubanMovieCurrentPage = JSON.parse(window.localStorage.doubanMovieCurrentPage);
      window.localStorage.doubanMovieCurrentPage = JSON.stringify({
        ...doubanMovieCurrentPage,
        [`${currentTagId}`]: this.currentPage,
      });
    } else {
      this.currentPage = this.currentPage - 1;
    }
    window.scrollTo(0, 0);
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">computed: {
  ...mapState({
    tagData(state) {
      <span class="hljs-keyword">return</span> state.tag.tagData[<span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$route.params.currentTagId}</span>`</span>];
    },
  }),

  subjects() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.tagData.subjects.slice(
      (<span class="hljs-keyword">this</span>.currentPage - <span class="hljs-number">1</span>) * <span class="hljs-number">10</span>,
      <span class="hljs-keyword">this</span>.currentPage * <span class="hljs-number">10</span>,
    );
  },
},

<span class="hljs-attr">methods</span>: {
  ...mapActions([<span class="hljs-string">'getMoreTagData'</span>]),
  changePage(flag) {
    <span class="hljs-keyword">const</span> currentTagId = <span class="hljs-keyword">this</span>.$route.params.currentTagId;
    <span class="hljs-keyword">const</span> { start, count } = <span class="hljs-keyword">this</span>.tagData;
    <span class="hljs-comment">// 第一页不能往前翻页，最后一页不能往后翻页。</span>
    <span class="hljs-keyword">if</span> ((<span class="hljs-keyword">this</span>.currentPage === <span class="hljs-number">1</span> &amp;&amp; flag === <span class="hljs-string">'reduce'</span>) ||
      (<span class="hljs-keyword">this</span>.currentPage === <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.tagData.total / <span class="hljs-number">10</span>) &amp;&amp; flag === <span class="hljs-string">'add'</span>)
    ) {
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span> (flag === <span class="hljs-string">'add'</span>) {
      <span class="hljs-keyword">this</span>.currentPage = <span class="hljs-keyword">this</span>.currentPage + <span class="hljs-number">1</span>;
      <span class="hljs-comment">// 每次请求十条数据</span>
      <span class="hljs-keyword">this</span>.getMoreTagData({
        <span class="hljs-attr">tag</span>: currentTagId,
        <span class="hljs-attr">count</span>: <span class="hljs-number">10</span>,
        <span class="hljs-attr">start</span>: count + start,
      });
      <span class="hljs-comment">// 需要使用localStorge保存当前的页码信息，再次进入可以有这个页码信息。</span>
      <span class="hljs-keyword">const</span> doubanMovieCurrentPage = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">window</span>.localStorage.doubanMovieCurrentPage);
      <span class="hljs-built_in">window</span>.localStorage.doubanMovieCurrentPage = <span class="hljs-built_in">JSON</span>.stringify({
        ...doubanMovieCurrentPage,
        [<span class="hljs-string">`<span class="hljs-subst">${currentTagId}</span>`</span>]: <span class="hljs-keyword">this</span>.currentPage,
      });
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.currentPage = <span class="hljs-keyword">this</span>.currentPage - <span class="hljs-number">1</span>;
    }
    <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  },</code></pre>
<h3 id="articleHeader15">滚动加载</h3>
<p>类似于瀑布流布局的实现方式，当用户滚动到距离页面底部一定范围的时候去请求后端接口。</p>
<p>具体代码可见<code>src/containers/More.vue</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleScroll() {
  // 函数的作用是滚动加载电影详情信息
  // 判断是否为请求后台中的状态，如果是则返回
  const { start, count, total } = this.currentSeeMore;
  if (!this.requestFlag) {
    return;
  }
  // 不同浏览器top展现会不一致
  let top = window.document.documentElement.scrollTop;
  if (top === 0) {
    top = document.body.scrollTop;
  }
  const clientHeight = document.getElementById('app').clientHeight;
  const innerHeight = window.innerHeight;
  const proportion = top / (clientHeight - innerHeight);
  // 但如果已把所有数据加载完毕了，则不请求
  if (proportion > 0.6 &amp;&amp; (start + count) < total) {
    this.getMoreData({
      count,
      start: start + count,
      title: this.$route.params.title,
    });
    this.requestFlag = false;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleScroll() {
  <span class="hljs-comment">// 函数的作用是滚动加载电影详情信息</span>
  <span class="hljs-comment">// 判断是否为请求后台中的状态，如果是则返回</span>
  <span class="hljs-keyword">const</span> { start, count, total } = <span class="hljs-keyword">this</span>.currentSeeMore;
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.requestFlag) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-comment">// 不同浏览器top展现会不一致</span>
  <span class="hljs-keyword">let</span> top = <span class="hljs-built_in">window</span>.document.documentElement.scrollTop;
  <span class="hljs-keyword">if</span> (top === <span class="hljs-number">0</span>) {
    top = <span class="hljs-built_in">document</span>.body.scrollTop;
  }
  <span class="hljs-keyword">const</span> clientHeight = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'app'</span>).clientHeight;
  <span class="hljs-keyword">const</span> innerHeight = <span class="hljs-built_in">window</span>.innerHeight;
  <span class="hljs-keyword">const</span> proportion = top / (clientHeight - innerHeight);
  <span class="hljs-comment">// 但如果已把所有数据加载完毕了，则不请求</span>
  <span class="hljs-keyword">if</span> (proportion &gt; <span class="hljs-number">0.6</span> &amp;&amp; (start + count) &lt; total) {
    <span class="hljs-keyword">this</span>.getMoreData({
      count,
      <span class="hljs-attr">start</span>: start + count,
      <span class="hljs-attr">title</span>: <span class="hljs-keyword">this</span>.$route.params.title,
    });
    <span class="hljs-keyword">this</span>.requestFlag = <span class="hljs-literal">false</span>;
  }
}</code></pre>
<h3 id="articleHeader16">滚动节流</h3>
<p>滚动节流主要作用是控制滚动事件的频率，设置一个<code>flag</code>。未超过频率则直接在函数中返回。</p>
<p>具体代码可见<code>src/containers/More.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrolling() {
  // scrolling函数用于作函数节流
  if (this.scrollFlag) {
    return;
  }
  this.scrollFlag = true;
  setTimeout(() => {
    this.handleScroll();
    this.scrollFlag = false;
  }, 20);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">scrolling() {
  <span class="hljs-comment">// scrolling函数用于作函数节流</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.scrollFlag) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">this</span>.scrollFlag = <span class="hljs-literal">true</span>;
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.handleScroll();
    <span class="hljs-keyword">this</span>.scrollFlag = <span class="hljs-literal">false</span>;
  }, <span class="hljs-number">20</span>);
}</code></pre>
<ol><li><p>404与加载页面的实现</p></li></ol>
<p>这里主要是在<code>vuex</code>中设定两个状态。根据这两个状态返回不同的页面。</p>
<p>具体代码可见<code>src/App.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <net-error
      v-if=&quot;netStatus&quot;
      :netStatus=&quot;netStatus&quot;
    />
    <loading
      v-else-if=&quot;!netStatus &amp;&amp; loadingFlag&quot;
    />
    <router-view v-else></router-view>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">net-error</span>
      <span class="hljs-attr">v-if</span>=<span class="hljs-string">"netStatus"</span>
      <span class="hljs-attr">:netStatus</span>=<span class="hljs-string">"netStatus"</span>
    /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">loading</span>
      <span class="hljs-attr">v-else-if</span>=<span class="hljs-string">"!netStatus &amp;&amp; loadingFlag"</span>
    /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-else</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader17">在路由钩子函数中改变状态</h3>
<p>之前在公司做React项目的时候运用了<a href="https://github.com/kriasoft/universal-router" rel="nofollow noreferrer" target="_blank">universal-router</a>，当时我们可以在进入路由的时候dispatch一个action改变状态，并且使用async/await函数实现异步。</p>
<p>贴一段之前的React代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async action({ store, params }) {
  // 判断store里的id和当前id是否一致，若一致，则不请求后台
  console.log(&quot;chapter&quot;)
  const chapterInfos = store.getState().home.chapterInfos;
  if (Object.keys(chapterInfos).length === 0 ||
    chapterInfos.subject.id !== parseInt(params.chapter, 10)) {
    await store.dispatch(chapter(params.chapter));
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> action({ store, params }) {
  <span class="hljs-comment">// 判断store里的id和当前id是否一致，若一致，则不请求后台</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"chapter"</span>)
  <span class="hljs-keyword">const</span> chapterInfos = store.getState().home.chapterInfos;
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(chapterInfos).length === <span class="hljs-number">0</span> ||
    chapterInfos.subject.id !== <span class="hljs-built_in">parseInt</span>(params.chapter, <span class="hljs-number">10</span>)) {
    <span class="hljs-keyword">await</span> store.dispatch(chapter(params.chapter));
  }
}</code></pre>
<p>类似的，在vue中我们也可以这么做！</p>
<p>具体代码可见<code>/src/router/routes</code>下的相关代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeEnter: (to, before, next) => {
  document.title = '电影 - 豆瓣';
  if (Object.keys(store.state.home.homeData).length !== 0) {
    store.commit(types.LOADING_FLAG, false);
    next();
    return;
  }
  store.commit(types.LOADING_FLAG, true);
  Promise.all([
    hotMovie(8, 0),
    commingSoon(8, 0),
    top250(8, 0),
    usBox(8, 0),
  ]).then((homeData) => {
    // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
    store.commit(types.HOME_DATA, homeData);
    store.commit(types.LOADING_FLAG, false);
    store.commit(types.NET_STATUS, '');
  }).catch((error) => {
    document.title = '出错啦 Oops… - 豆瓣';
    store.commit(types.NET_STATUS, error);
    store.commit(types.LOADING_FLAG, false);
  });
  next();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">beforeEnter: <span class="hljs-function">(<span class="hljs-params">to, before, next</span>) =&gt;</span> {
  <span class="hljs-built_in">document</span>.title = <span class="hljs-string">'电影 - 豆瓣'</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(store.state.home.homeData).length !== <span class="hljs-number">0</span>) {
    store.commit(types.LOADING_FLAG, <span class="hljs-literal">false</span>);
    next();
    <span class="hljs-keyword">return</span>;
  }
  store.commit(types.LOADING_FLAG, <span class="hljs-literal">true</span>);
  <span class="hljs-built_in">Promise</span>.all([
    hotMovie(<span class="hljs-number">8</span>, <span class="hljs-number">0</span>),
    commingSoon(<span class="hljs-number">8</span>, <span class="hljs-number">0</span>),
    top250(<span class="hljs-number">8</span>, <span class="hljs-number">0</span>),
    usBox(<span class="hljs-number">8</span>, <span class="hljs-number">0</span>),
  ]).then(<span class="hljs-function">(<span class="hljs-params">homeData</span>) =&gt;</span> {
    <span class="hljs-comment">// 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。</span>
    store.commit(types.HOME_DATA, homeData);
    store.commit(types.LOADING_FLAG, <span class="hljs-literal">false</span>);
    store.commit(types.NET_STATUS, <span class="hljs-string">''</span>);
  }).catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
    <span class="hljs-built_in">document</span>.title = <span class="hljs-string">'出错啦 Oops… - 豆瓣'</span>;
    store.commit(types.NET_STATUS, error);
    store.commit(types.LOADING_FLAG, <span class="hljs-literal">false</span>);
  });
  next();
}</code></pre>
<h3 id="articleHeader18">Ajax的封装</h3>
<p>其实我就是不想用Ajax操作的相关库罢了……</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import serverConfig from './serverConfig';

const Ajax = url => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(`错误: ${xhr.status}`);
      }
    }
  };
});

// 影院热映
export const hotMovie = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/in_theaters?count=${count}&amp;start=${start}`);
// 即将上映
export const commingSoon = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/coming_soon?count=${count}&amp;start=${start}`);
// top250
export const top250 = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/top250?count=${count}&amp;start=${start}`);
// 北美票房榜
export const usBox = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/us_box?count=${count}&amp;start=${start}`);
// 当前电影详情信息
export const currentMovie = currentMovieId =>
  Ajax(`${serverConfig}/v2/movie/subject/${currentMovieId}`);
// 当前标签详情信息
export const getTagData = (tag, count, start) =>
  Ajax(`${serverConfig}/v2/movie/search?tag=${tag}&amp;count=${count}&amp;start=${start}`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> serverConfig <span class="hljs-keyword">from</span> <span class="hljs-string">'./serverConfig'</span>;

<span class="hljs-keyword">const</span> Ajax = <span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.open(<span class="hljs-string">'GET'</span>, url);
  xhr.send(<span class="hljs-literal">null</span>);
  xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (xhr.readyState === <span class="hljs-number">4</span>) {
      <span class="hljs-keyword">if</span> (xhr.status === <span class="hljs-number">200</span>) {
        resolve(<span class="hljs-built_in">JSON</span>.parse(xhr.responseText));
      } <span class="hljs-keyword">else</span> {
        reject(<span class="hljs-string">`错误: <span class="hljs-subst">${xhr.status}</span>`</span>);
      }
    }
  };
});

<span class="hljs-comment">// 影院热映</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> hotMovie = <span class="hljs-function">(<span class="hljs-params">count, start</span>) =&gt;</span>
  Ajax(<span class="hljs-string">`<span class="hljs-subst">${serverConfig}</span>/v2/movie/in_theaters?count=<span class="hljs-subst">${count}</span>&amp;start=<span class="hljs-subst">${start}</span>`</span>);
<span class="hljs-comment">// 即将上映</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> commingSoon = <span class="hljs-function">(<span class="hljs-params">count, start</span>) =&gt;</span>
  Ajax(<span class="hljs-string">`<span class="hljs-subst">${serverConfig}</span>/v2/movie/coming_soon?count=<span class="hljs-subst">${count}</span>&amp;start=<span class="hljs-subst">${start}</span>`</span>);
<span class="hljs-comment">// top250</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> top250 = <span class="hljs-function">(<span class="hljs-params">count, start</span>) =&gt;</span>
  Ajax(<span class="hljs-string">`<span class="hljs-subst">${serverConfig}</span>/v2/movie/top250?count=<span class="hljs-subst">${count}</span>&amp;start=<span class="hljs-subst">${start}</span>`</span>);
<span class="hljs-comment">// 北美票房榜</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> usBox = <span class="hljs-function">(<span class="hljs-params">count, start</span>) =&gt;</span>
  Ajax(<span class="hljs-string">`<span class="hljs-subst">${serverConfig}</span>/v2/movie/us_box?count=<span class="hljs-subst">${count}</span>&amp;start=<span class="hljs-subst">${start}</span>`</span>);
<span class="hljs-comment">// 当前电影详情信息</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> currentMovie = <span class="hljs-function"><span class="hljs-params">currentMovieId</span> =&gt;</span>
  Ajax(<span class="hljs-string">`<span class="hljs-subst">${serverConfig}</span>/v2/movie/subject/<span class="hljs-subst">${currentMovieId}</span>`</span>);
<span class="hljs-comment">// 当前标签详情信息</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getTagData = <span class="hljs-function">(<span class="hljs-params">tag, count, start</span>) =&gt;</span>
  Ajax(<span class="hljs-string">`<span class="hljs-subst">${serverConfig}</span>/v2/movie/search?tag=<span class="hljs-subst">${tag}</span>&amp;count=<span class="hljs-subst">${count}</span>&amp;start=<span class="hljs-subst">${start}</span>`</span>);</code></pre>
<h3 id="articleHeader19">代理的配置</h3>
<p>为了解决浏览器跨域问题，需要在本地服务端配合实现请求转发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/v2': {
    target: 'http://api.douban.com',
    changeOrigin: true,
    pathRewrite: {
      '^/v2': '/v2'
    }
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
  <span class="hljs-string">'/v2'</span>: {
    <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://api.douban.com'</span>,
    <span class="hljs-attribute">changeOrigin</span>: true,
    <span class="hljs-attribute">pathRewrite</span>: {
      <span class="hljs-string">'^/v2'</span>: <span class="hljs-string">'/v2'</span>
    }
  }
},</code></pre>
<p>实际环境中，服务器端配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
app.use('/static', express.static('static'));
app.use('/v2', proxy({
  target: 'http://api.douban.com', 
  changeOrigin: true, 
  headers: {
    Referer: 'http://api.douban.com'
  }
}
));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">var</span> proxy = <span class="hljs-keyword">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);

<span class="hljs-keyword">var</span> app = express();
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/static'</span>, express.<span class="hljs-keyword">static</span>(<span class="hljs-string">'static'</span>));
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/v2'</span>, proxy({
  target: <span class="hljs-string">'http://api.douban.com'</span>, 
  changeOrigin: <span class="hljs-keyword">true</span>, 
  headers: {
    Referer: <span class="hljs-string">'http://api.douban.com'</span>
  }
}
));

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  res.sendFile(__dirname + <span class="hljs-string">'/index.html'</span>);
});
app.listen(<span class="hljs-number">3000</span>);</code></pre>
<h3 id="articleHeader20">移动端的适配</h3>
<p>我们使用<code>rem</code>作单位，本项目中标准为1rem = 100px，适配750px设备。</p>
<p>浏览器执行下列代码，改变根元素的<code>font-size</code>，做到移动端的适配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth > 750 ? 360 : docEl.clientWidth ;
      if (!clientWidth) return;
      docEl.style.fontSize = clientWidth / 750 * 100 + 'px';
    };
  if (!doc.addEventListener) return;
  doc.addEventListener('DOMContentLoaded', recalc, false);
  if (docEl.clientWidth > 750) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">doc, win</span>) </span>{
  <span class="hljs-keyword">var</span> docEl = doc.documentElement,
    resizeEvt = <span class="hljs-string">'orientationchange'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span> ? <span class="hljs-string">'orientationchange'</span> : <span class="hljs-string">'resize'</span>,
    recalc = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> clientWidth = docEl.clientWidth &gt; <span class="hljs-number">750</span> ? <span class="hljs-number">360</span> : docEl.clientWidth ;
      <span class="hljs-keyword">if</span> (!clientWidth) <span class="hljs-keyword">return</span>;
      docEl.style.fontSize = clientWidth / <span class="hljs-number">750</span> * <span class="hljs-number">100</span> + <span class="hljs-string">'px'</span>;
    };
  <span class="hljs-keyword">if</span> (!doc.addEventListener) <span class="hljs-keyword">return</span>;
  doc.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, recalc, <span class="hljs-literal">false</span>);
  <span class="hljs-keyword">if</span> (docEl.clientWidth &gt; <span class="hljs-number">750</span>) <span class="hljs-keyword">return</span>;
  win.addEventListener(resizeEvt, recalc, <span class="hljs-literal">false</span>);
})(<span class="hljs-built_in">document</span>, <span class="hljs-built_in">window</span>);</code></pre>
<p>文档借鉴自我的同学<a href="https://github.com/ShanaMaid" rel="nofollow noreferrer" target="_blank">ShanaMaid</a>。</p>
<h2 id="articleHeader21">支持</h2>
<p>BUG提交请发送邮箱: me@xingbofeng.com</p>
<p>欢迎<code>issue</code>，<code>pr</code>，<code>star</code> or <code>follow</code>！我将继续开源更多有趣的项目!</p>
<p>你的支持将有助于项目维护以及提高用户体验，感谢各位的支持！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶实现还原豆瓣电影wap版

## 原文链接
[https://segmentfault.com/a/1190000009165075](https://segmentfault.com/a/1190000009165075)

