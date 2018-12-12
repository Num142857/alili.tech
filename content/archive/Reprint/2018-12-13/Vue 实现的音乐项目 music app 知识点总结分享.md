---
title: 'Vue 实现的音乐项目 music app 知识点总结分享' 
date: 2018-12-13 2:30:07
hidden: true
slug: 1jjailw41yxi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">项目总结</h1>
<p>这是我第二个用 Vue 实现的项目，下面内容包括了在实现过程中所记录的知识点以及一些小技巧</p>
<p>项目演示地址：<a href="https://music-vue.n-y.io" rel="nofollow noreferrer" target="_blank">https://music-vue.n-y.io</a><br>源代码地址：<a href="https://github.com/nanyang24/music-vue" rel="nofollow noreferrer" target="_blank">https://github.com/nanyang24/...</a></p>
<h3 id="articleHeader1">其他</h3>
<p>此应用的全部数据来自 QQ音乐，利用 axios 结合 node.js 代理后端请求抓取</p>
<p>全局通用的应用级状态使用 vuex 集中管理</p>
<p>全局引入 fastclick 库，消除 click 移动浏览器 300ms 延迟</p>
<p>页面是响应式的，适配常见的移动端屏幕，采用 flex 布局</p>
<h1 id="articleHeader2">疑难总结 &amp; 小技巧</h1>
<h2 id="articleHeader3">关于 Vue 知识 &amp; 使用技巧</h2>
<h3 id="articleHeader4">v-html 可以转义字符，处理特定接口很有用</h3>
<h3 id="articleHeader5">watch 对象可以观测 属性 的变化</h3>
<h3 id="articleHeader6">像这种父组件传达子组件的参数通常都是在data()里面定义的，为什么这里要放到created()定义，两者有什么区别呢？</h3>
<p>因为这个变量不需要观测它的变化，因此不用定义在 data 里，这样也会对性能有所优化</p>
<h3 id="articleHeader7">不明白什么时候要把变量放在data()里，什么时候又不需要放 ？</h3>
<p>需要监测这个数据变化的时候，放在 data() 里，会给数据添加 getter 和 setter</p>
<h3 id="articleHeader8">生命周期 钩子函数</h3>
<p>生命周期钩子函数，比如 mounted 是先触发子组件的 mounted，再会触发父组件的 mounted，但是对于 created 钩子，又会先触发父组件，再触发子组件。</p>
<h3 id="articleHeader9">销毁计数器</h3>
<p>如果组件有计数器，在组件销毁时期要记得清理，好习惯</p>
<h3 id="articleHeader10">对于 Vue 组件，this.$refs.xxx 拿到的是 Vue 实例，所以需要再通过 $el 拿到真实的 dom</h3>
<h2 id="articleHeader11">关于 JS 知识 &amp; 技巧</h2>
<h3 id="articleHeader12">setTimeout(fn, 20)</h3>
<p>一般来说 JS 线程执行完毕后一个 Tick 的时间约17ms内 DOM 就可以渲染完毕所以课程中 setTimeout(fn, 20) 是非常稳妥的写法</p>
<h2 id="articleHeader13">关于 webpack 知识 &amp; 技巧</h2>
<h3 id="articleHeader14">" ~ " 使 SCSS 可以使用 webpack 的相对路径</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;~common/scss/mixin&quot;;
@import &quot;~common/scss/variable&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">@<span class="hljs-keyword">import</span> <span class="hljs-string">"~common/scss/mixin"</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">"~common/scss/variable"</span>;</code></pre>
<h3 id="articleHeader15">babel-runtime 会在编译阶段把 es6 语法编译的代码打包到业务代码中，所以要放在dependencies里。</h3>
<h3 id="articleHeader16">Fast Click 是一个简单、易用的库，专为消除移动端浏览器从物理触摸到触发点击事件之间的300ms延时</h3>
<h3 id="articleHeader17">为什么会存在延迟呢？</h3>
<p>从触摸按钮到触发点击事件，移动端浏览器会等待接近300ms，原因是浏览器会等待以确定你是否执行双击事件</p>
<h4>何时不需要使用</h4>
<ol>
<li>FastClick 不会伴随监听任何桌面浏览器</li>
<li>Android 系统中，在头部 meta 中设置 width=device-width 的Chrome32+ 浏览器不存在300ms 延时，所以，也不需要</li>
</ol>
<p><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></p>
<ol>
<li>同样的情况也适用于 Android设备（任何版本），在viewport 中设置 user-scalable=no，但这样就禁止缩放网页了</li>
<li>IE11+ 浏览器中，你可以使用 touch-action: manipulation;  禁止通过双击来放大一些元素（比如：链接和按钮）。IE10可以使用 -ms-touch-action: manipulation</li>
</ol>
<h2 id="articleHeader18">请求接口</h2>
<p>jsonp:</p>
<p>XHR:</p>
<h2 id="articleHeader19">手写轮播图</h2>
<p>利用 BScroll</p>
<p>BScroll 设置 loop 会自动 clone 两个轮播插在前后位置</p>
<p>如果轮播循环播放，是前后各加一个轮播图保证无缝切换，所以需要再加两个宽度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (this.loop) {
  width += 2 * sliderWidth
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.loop) {
  width += <span class="hljs-number">2</span> * sliderWidth
}</code></pre>
<p>初始化 dots 要在 BScroll 克隆插入两个轮播图之前</p>
<p>dots active状态 是通过判断 currentIndex 与 index 是否相等</p>
<p>currentIndex 更新是通过获取 scroll 当前 page，BScroll 提供了 api 方便调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.currentPageIndex = this.scroll.getCurrentPage().pageX" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.currentPageIndex = <span class="hljs-keyword">this</span>.scroll.getCurrentPage().pageX</code></pre>
<p>为了保证改变窗口大小依然正常轮播，监听窗口 resize 事件，重新渲染轮播图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('resize', () => {
  if (!this.scroll || !this.scroll.enabled) return

  clearTimeout(this.resizeTimer)
  this.resizeTimer = setTimeout(() => {
    if (this.scroll.isInTransition) {
      this._onScrollEnd()
    } else {
      if (this.autoPlay) {
        this._play()
      }
    }
    this.refresh()
  }, 60)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, () =&gt; {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.scroll || !<span class="hljs-keyword">this</span>.scroll.enabled) <span class="hljs-keyword">return</span>

  clearTimeout(<span class="hljs-keyword">this</span>.resizeTimer)
  <span class="hljs-keyword">this</span>.resizeTimer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.scroll.isInTransition) {
      <span class="hljs-keyword">this</span>._onScrollEnd()
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.autoPlay) {
        <span class="hljs-keyword">this</span>._play()
      }
    }
    <span class="hljs-keyword">this</span>.refresh()
  }, <span class="hljs-number">60</span>)
})</code></pre>
<p>在切换 tab 相当于 切换了 keep-alive 的组件<br>轮播会出问题，需要手动帮助执行，利用了 activated , deactivated 钩子函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="activated() {
  this.scroll.enable()
  let pageIndex = this.scroll.getCurrentPage().pageX
  this.scroll.goToPage(pageIndex, 0, 0)
  this.currentPageIndex = pageIndex
  if (this.autoPlay) {
    this._play()
  }
},
deactivated() {
  this.scroll.disable()
  clearTimeout(this.timer)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">activated() {
  <span class="hljs-keyword">this</span>.scroll.enable()
  <span class="hljs-keyword">let</span> pageIndex = <span class="hljs-keyword">this</span>.scroll.getCurrentPage().pageX
  <span class="hljs-keyword">this</span>.scroll.goToPage(pageIndex, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
  <span class="hljs-keyword">this</span>.currentPageIndex = pageIndex
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.autoPlay) {
    <span class="hljs-keyword">this</span>._play()
  }
},
deactivated() {
  <span class="hljs-keyword">this</span>.scroll.disable()
  clearTimeout(<span class="hljs-keyword">this</span>.timer)
}</code></pre>
<p><strong>实测</strong>，首次打开网页并不会执行 activated，只有在之后切换 tab ，切回来才会执行</p>
<p>在组件销毁之前  beforeDestroy 销毁定时器是好习惯，keep-alive 因为是将组件缓存了，所以不会触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeDestroy() {
  this.scroll.disable()
  clearTimeout(this.timer)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">beforeDestroy() {
  <span class="hljs-keyword">this</span>.scroll.disable()
  clearTimeout(<span class="hljs-keyword">this</span>.timer)
}</code></pre>
<h2 id="articleHeader20">后端接口代理</h2>
<p>简单设置一下 Referer, Host，让别人直接通过浏览器抓到你的接口<br>但是这种方式防不了后端代理的方式</p>
<p>前端 XHR 会有跨域限制，后端发送 http 请求则没有限制，因此可以伪造请求</p>
<p>axios 可以在浏览器端发送 <code>XMLHttpRequest</code> 请求，在服务器端发送 <code>http</code> 请求</p>
<p>（在项目编写阶段，可以将后端代理请求写在 webpack 的 dev 文件的 before 函数内）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="before(app) {
  app.get('/api/getDiscList', function (req, res) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data) // axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)
    }).catch((e) => {
      console.log(e)
    })
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">before(app) {
  app.get(<span class="hljs-string">'/api/getDiscList'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    <span class="hljs-keyword">const</span> url = <span class="hljs-string">'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'</span>
    axios.get(url, {
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-attr">referer</span>: <span class="hljs-string">'https://c.y.qq.com/'</span>,
        <span class="hljs-attr">host</span>: <span class="hljs-string">'c.y.qq.com'</span>
      },
      <span class="hljs-attr">params</span>: req.query
    }).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
      res.json(response.data) <span class="hljs-comment">// axios 返回的数据在 response.data，要把数据透传到我们自定义的接口里面 res.json(response.data)</span>
    }).catch(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(e)
    })
  });
}</code></pre>
<p>定义一个路由，get 到一个 <code>/api/getDiscList</code> 接口，通过 axios 伪造 headers，发送给QQ音乐服务器一个 http 请求，还有 param 参数。<br>得到服务端正确的响应，通过 <code>res.json(response.data)</code> 返回到浏览器端</p>
<blockquote>另外 因为是 http 请求数据，是ajax，所以 format 参数要将原本接口的 jsonp 改为 json</blockquote>
<p>大公司怎么防止被恶意代理呢？当你的访问量大的时候，出口ip会被查到获取封禁，还有一种就是参数验签，也就是请求人家的数据必须带一个签名参数，然后这个签名参数是很难拿到的这个正确的签名，从而达到保护数据的目的</p>
<p>当然，获取的数据并不能直接拿来用，需要做进一步的规格化，达到我们使用的要求，所以在这方面单独封装了一个 class 来处理这方面的数据，具体请看src/common/js/song.js</p>
<h2 id="articleHeader21">flex 布局，热门歌单推荐</h2>
<p>左侧 icon 固定大小，<code>flex: 0 0 60px</code></p>
<p>flex 属性是 <code>flex-grow</code> , <code>flex-shrink</code> 和 <code>flex-basis</code> 的简写，默认值为 0 1 auto。后两个属性可选。</p>
<ol>
<li>
<code>flex-grow</code> 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。</li>
<li>
<code>flex-shrink</code> 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。</li>
<li>
<code>flex-basis</code> 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。</li>
</ol>
<p>右侧 text 区块 自适应占据剩下的空间，并且内部也采用 flex，使用 <code>flex-direction: column; justify-content: center;</code> 来达到纵向居中排列</p>
<h2 id="articleHeader22">recommend 页面 利用 BScroll 滚动</h2>
<p>Scroll 初始化但却没有滚动，是因为初始化时机不对，必须保证数据到来，DOM 成功渲染之后 再去进行初始化<br>可以使用父组件 给 Scrol组件传 <code>:data</code> 数据，Scroll 组件自己 <code>watch</code> 这个 data，有变化就立刻 refesh 滚动</p>
<p><strong>新版本 BScroll 已经自己实现检测 DOM 变化，自动刷新，大部分场景下无需传 data 了</strong></p>
<p>所以也就 无需监听 img 的 onload 事件 然后执行 滚动刷新 了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img @load=&quot;loadImage&quot; class=&quot;needsclick&quot; :src=&quot;item.picUrl&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;img @load=<span class="hljs-string">"loadImage"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"needsclick"</span> :src=<span class="hljs-string">"item.picUrl"</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loadImage() {
  if (!this.checkloaded) {
    this.checkloaded = true
    this.$refs.scroll.refresh()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">loadImage() {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.checkloaded) {
    <span class="hljs-keyword">this</span>.checkloaded = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">this</span>.$refs.scroll.refresh()
  }
}</code></pre>
<h2 id="articleHeader23">歌手页面 数据重构</h2>
<p>歌手页面的结构是 <code>热门、 A-Z</code> 的顺序排列，但抓取的接口数据只是 100条常见的歌手，并且是乱序的，但我们可以利用接口的 Findex 进行数据的重构</p>
<p>首先可以定义一个 map 结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let map = {
  hot: {
    title: HOT_NAME,
    item: []
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> map = {
  <span class="hljs-attr">hot</span>: {
    <span class="hljs-attr">title</span>: HOT_NAME,
    <span class="hljs-attr">item</span>: []
  }
}</code></pre>
<p>接着遍历得到的数据，将前10条添加到热门 hot 里<br>然后查看每条的 Findex ，如果 map[Findex] 没有，创建 map[Findex] push 进新条目，如果 map[Findex] 有，则向其 push 进新条目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="list.forEach((item, index) => {
  if (index < HOT_SINGER_LEN) {
    map.hot.item.push(new SingerFormat({
      id: item.Fsinger_mid,
      name: item.Fsinger_name,
    }))
  }
  const key = item.Findex
  if (!map[key]) {
    map[key] = {
      title: key,
      items: []
    }
  }
  map[key].items.push(new SingerFormat({
    id: item.Fsinger_mid,
    name: item.Fsinger_name
  }))
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">list.forEach(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (index &lt; HOT_SINGER_LEN) {
    map.hot.item.push(<span class="hljs-keyword">new</span> SingerFormat({
      <span class="hljs-attr">id</span>: item.Fsinger_mid,
      <span class="hljs-attr">name</span>: item.Fsinger_name,
    }))
  }
  <span class="hljs-keyword">const</span> key = item.Findex
  <span class="hljs-keyword">if</span> (!map[key]) {
    map[key] = {
      <span class="hljs-attr">title</span>: key,
      <span class="hljs-attr">items</span>: []
    }
  }
  map[key].items.push(<span class="hljs-keyword">new</span> SingerFormat({
    <span class="hljs-attr">id</span>: item.Fsinger_mid,
    <span class="hljs-attr">name</span>: item.Fsinger_name
  }))
})</code></pre>
<p>这样就得到了一个 符合我们基本预期的 map 结构，但是因为 map 是一个对象，数据是乱序的，Chrome 控制台在展示的时候会对 key 做排序，但实际上我们代码并没有做。</p>
<p>所以还要将其进行排序，这里会用到 数组的 sort 方法，所以我们要先把 map对象 转为 数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let hot = []
let ret = []
let un = []
for (let key in map) {
  let val = map[key]
  if (val.title.match(/[a-zA-z]/)) {
    ret.push(val)
  } else if (val.title === HOT_NAME) {
    hot.push(val)
  } else {
    un.push(val)
  }
}
ret.sort((a, b) => {
  return a.title.charCodeAt(0) - b.title.charCodeAt(0)
})
return hot.concat(ret, un)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> hot = []
<span class="hljs-keyword">let</span> ret = []
<span class="hljs-keyword">let</span> un = []
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> map) {
  <span class="hljs-keyword">let</span> val = map[key]
  <span class="hljs-keyword">if</span> (val.title.match(<span class="hljs-regexp">/[a-zA-z]/</span>)) {
    ret.push(val)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (val.title === HOT_NAME) {
    hot.push(val)
  } <span class="hljs-keyword">else</span> {
    un.push(val)
  }
}
ret.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> a.title.charCodeAt(<span class="hljs-number">0</span>) - b.title.charCodeAt(<span class="hljs-number">0</span>)
})
<span class="hljs-keyword">return</span> hot.concat(ret, un)</code></pre>
<p>根据 title 字母的 Unicode 编码大小排序的（比如：'A'.charCodeAt(0)=65；'B'.charCodeAt(0)=66）然后就a,b,c,d...的顺序了</p>
<h2 id="articleHeader24">歌手页面</h2>
<h3 id="articleHeader25">shortcut 定位</h3>
<p>因为 shortcut 整体的高度是不确定的，所以采用的是 <code>top:50%</code> 之后，<code>transform: translateY(-50%);</code> 这样就能动态的根据内容高度而垂直居中</p>
<h3 id="articleHeader26">歌手页面 区块与锚点 的联动</h3>
<h3 id="articleHeader27">点击或滑动 shortcut 不同的锚点 ，自动滚动至相应的标题列表</h3>
<p>利用了 BScroll 的 api ，scrollToElement</p>
<ul><li>scrollToElement 可以滚动至相应的 index 值的区块</li></ul>
<p>第一次点击触碰 shortcut ，获取点击具体锚点的 index 值，记录触碰位置的 index ，利用 scrollToElement ，滚动至相应 index 的区块<br>而之后，滑动锚点实现滚动是利用 touchmove 事件，将两次触碰的的位置计算值变成 delta 差值：变成改变后的锚点区块 index 值，再将首次触碰的 index 值 + 改变的 delta 值，再利用 scrollToElement ，滚动至相应的区块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onShortcutTouchStart(e) {
  let anchorIndex = getData(e.target, 'index')  // 获取 点击具体锚点的 index 值
  let firstTouch = e.touches[0]   // 第一次触碰的位置
  this.touch.y1 = firstTouch.pageY  // 保存 第一次触碰的位置的Y值
  this.touch.anchorIndex = anchorIndex  // 保存 第一次触碰时的锚点 index 值
  this._scrollTo(anchorIndex)
},
onShortcutTouchMove(e) {
  let firstTouch = e.touches[0]
  this.touch.y2 = firstTouch.pageY
  let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 // 两次触碰 Y 轴的偏移锚点值
  let anchorIndex = +this.touch.anchorIndex + delta  // 获取 偏移了多少 index 值  ，因为 anchorIndex 是字符串，所以要转成数字再相加
  this._scrollTo(anchorIndex)
},
_scrollTo(index) {
  this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 200)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">onShortcutTouchStart(e) {
  <span class="hljs-keyword">let</span> anchorIndex = getData(e.target, <span class="hljs-string">'index'</span>)  <span class="hljs-comment">// 获取 点击具体锚点的 index 值</span>
  <span class="hljs-keyword">let</span> firstTouch = e.touches[<span class="hljs-number">0</span>]   <span class="hljs-comment">// 第一次触碰的位置</span>
  <span class="hljs-keyword">this</span>.touch.y1 = firstTouch.pageY  <span class="hljs-comment">// 保存 第一次触碰的位置的Y值</span>
  <span class="hljs-keyword">this</span>.touch.anchorIndex = anchorIndex  <span class="hljs-comment">// 保存 第一次触碰时的锚点 index 值</span>
  <span class="hljs-keyword">this</span>._scrollTo(anchorIndex)
},
onShortcutTouchMove(e) {
  <span class="hljs-keyword">let</span> firstTouch = e.touches[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">this</span>.touch.y2 = firstTouch.pageY
  <span class="hljs-keyword">let</span> delta = (<span class="hljs-keyword">this</span>.touch.y2 - <span class="hljs-keyword">this</span>.touch.y1) / ANCHOR_HEIGHT | <span class="hljs-number">0</span> <span class="hljs-comment">// 两次触碰 Y 轴的偏移锚点值</span>
  <span class="hljs-keyword">let</span> anchorIndex = +<span class="hljs-keyword">this</span>.touch.anchorIndex + delta  <span class="hljs-comment">// 获取 偏移了多少 index 值  ，因为 anchorIndex 是字符串，所以要转成数字再相加</span>
  <span class="hljs-keyword">this</span>._scrollTo(anchorIndex)
},
_scrollTo(index) {
  <span class="hljs-keyword">this</span>.$refs.listview.scrollToElement(<span class="hljs-keyword">this</span>.$refs.listGroup[index], <span class="hljs-number">200</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Scroll class=&quot;listview&quot; ref=&quot;listview&quot;>
    <!--歌手列表-->
    <ul>
      <li v-for=&quot;group in data&quot; class=&quot;list-group&quot; ref=&quot;listGroup&quot;>
        <h2 class=&quot;list-group-title&quot;>"{{"group.title"}}"</h2>
        <!--首字母条目-->
        <ul>
          <li v-for=&quot;item in group.items&quot; class=&quot;list-group-item&quot;>
            <img :src=&quot;item.avatar&quot; class=&quot;avatar&quot;>
            <span class=&quot;name&quot;>"{{"item.name"}}"</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class=&quot;list-shortcut&quot; @touchstart=&quot;onShortcutTouchStart&quot; @touchmove.stop.prevent=&quot;onShortcutTouchMove&quot;>
      <ul>
        <li v-for=&quot;(item, index) in shortcutlist&quot; :data-index=&quot;index&quot; class=&quot;item&quot;>
          "{{"item"}}"
        </li>
      </ul>
    </div>
</Scroll>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">Scroll</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"listview"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"listview"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--歌手列表--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"group in data"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"listGroup"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-title"</span>&gt;</span>"{{"group.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-comment">&lt;!--首字母条目--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in group.items"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item.avatar"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>"{{"item.name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-shortcut"</span> @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">"onShortcutTouchStart"</span> @<span class="hljs-attr">touchmove.stop.prevent</span>=<span class="hljs-string">"onShortcutTouchMove"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in shortcutlist"</span> <span class="hljs-attr">:data-index</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
          "{{"item"}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Scroll</span>&gt;</span></code></pre>
<h3 id="articleHeader28">滑动主列表，侧边 shortcut 自动高亮不同锚点</h3>
<ol><li>首先 BScroll 组件 监听滚动事件，并派发事件以供父组件监听，将 pos 值传出去</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (this.listenScroll) {
  let self = this
  this.scroll.on('scroll', (pos) => { // 实时监测滚动事件，派发事件：Y轴距离
    self.$emit('scroll', pos)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.listenScroll) {
  <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">this</span>.scroll.on(<span class="hljs-string">'scroll'</span>, (pos) =&gt; { <span class="hljs-comment">// 实时监测滚动事件，派发事件：Y轴距离</span>
    self.$emit(<span class="hljs-string">'scroll'</span>, pos)
  })
}</code></pre>
<ol><li>父组件监听到滚动派发的事件</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" @scroll=&quot;scroll&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> @scroll=<span class="hljs-string">"scroll"</span></code></pre>
<p>将 pos.y 存在 this.scrollY</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scroll(pos) {
  this.scrollY = pos.y    // 实时获取 BScroll 滚动的 Y轴距离
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">scroll(pos) {
  <span class="hljs-keyword">this</span>.scrollY = pos.y    <span class="hljs-comment">// 实时获取 BScroll 滚动的 Y轴距离</span>
}</code></pre>
<ol><li>再用 watch 检测数据的变化，一旦变化，重新计算每个区块的高度列表。再判断当前滚动的 Y轴值 是否落在相应的 group 高度区间，然后更新 currentIndex ，使 shortcut 的锚点高亮</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  data() {
    // 延时，确保DOM渲染之后执行，通常是nextTick，这里用setTimeout是为了兼容更低
    setTimeout(() => {
      this._calculateHeight()
    }, 20)
  },
  
  // 这里的 scrollY 是当前组件上的，和 BScroll 的并不是一个
  scrollY(newY) {
  const listHeight = this.listHeight
  // 1. 当滚动至顶部以上
  if (newY > 0) {
    this.currentIndex = 0
    return
  }
  // 2. 当在中间部分滚动，length之所以 -1 是因为 当初高度列表定义必须多一个
  for (let i = 0; i < listHeight.length - 1; i++) {
    let height1 = listHeight[i]
    let height2 = listHeight[i + 1]
    if (-newY >= height1 &amp;&amp; -newY < height2) {
      this.currentIndex = i
      this.diff = height2 + newY  // height 上限 - newY 的值
      return
    }
  }
  // 3. 当滚动至底部，且 newY 大于最后一个元素的上限
  this.currentIndex = listHeight.length - 2
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">watch: {
  data() {
    <span class="hljs-comment">// 延时，确保DOM渲染之后执行，通常是nextTick，这里用setTimeout是为了兼容更低</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>._calculateHeight()
    }, <span class="hljs-number">20</span>)
  },
  
  <span class="hljs-comment">// 这里的 scrollY 是当前组件上的，和 BScroll 的并不是一个</span>
  scrollY(newY) {
  <span class="hljs-keyword">const</span> listHeight = <span class="hljs-keyword">this</span>.listHeight
  <span class="hljs-comment">// 1. 当滚动至顶部以上</span>
  <span class="hljs-keyword">if</span> (newY &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">this</span>.currentIndex = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-comment">// 2. 当在中间部分滚动，length之所以 -1 是因为 当初高度列表定义必须多一个</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; listHeight.length - <span class="hljs-number">1</span>; i++) {
    <span class="hljs-keyword">let</span> height1 = listHeight[i]
    <span class="hljs-keyword">let</span> height2 = listHeight[i + <span class="hljs-number">1</span>]
    <span class="hljs-keyword">if</span> (-newY &gt;= height1 &amp;&amp; -newY &lt; height2) {
      <span class="hljs-keyword">this</span>.currentIndex = i
      <span class="hljs-keyword">this</span>.diff = height2 + newY  <span class="hljs-comment">// height 上限 - newY 的值</span>
      <span class="hljs-keyword">return</span>
    }
  }
  <span class="hljs-comment">// 3. 当滚动至底部，且 newY 大于最后一个元素的上限</span>
  <span class="hljs-keyword">this</span>.currentIndex = listHeight.length - <span class="hljs-number">2</span>
  }
}</code></pre>
<h4>每个区块的高度列表是 通过 <code>_calculateHeight</code> 函数实现的</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_calculateHeight() {
  this.listHeight = []
  const list = this.$refs.listGroup
  let height = 0
  this.listHeight.push(height)
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    height += item.clientHeight
    this.listHeight.push(height)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_calculateHeight() {
  <span class="hljs-keyword">this</span>.listHeight = []
  <span class="hljs-keyword">const</span> list = <span class="hljs-keyword">this</span>.$refs.listGroup
  <span class="hljs-keyword">let</span> height = <span class="hljs-number">0</span>
  <span class="hljs-keyword">this</span>.listHeight.push(height)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; list.length; i++) {
    <span class="hljs-keyword">let</span> item = list[i]
    height += item.clientHeight
    <span class="hljs-keyword">this</span>.listHeight.push(height)
  }
}</code></pre>
<ol><li>最后只要在 li 上绑定class就可以实现不同位置的锚点高亮了</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":class=&quot;{'current': currentIndex === index}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">:<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"{'current': currentIndex === index}"</span></code></pre>
<p><strong>这里的 Vue 用法提示</strong>：<br><code>watch</code> 的 <code>scrollY(newY){}</code></p>
<ol>
<li>当我们在 Vue 里修改了在 data 里定义的变量，就会出发这个变量的 setter，经过一系列的处理，会触发 watch 的回调函数，也就是 scrollY(newY) {} 这里的函数会执行，同时，newY 就是我们修改后的值。</li>
<li>scrollY 是定义在 data 里的，列表滚动的时候，scroll 事件的回调函数里有修改 this.scrollY，所以能 watch 到它的变化。</li>
<li>watch 的回调函数的第一个参数表示变化的新值</li>
</ol>
<h3 id="articleHeader29">滚动固定标题 效果实现</h3>
<p>在中间部分滚动时，会不断设置 diff 值，每个区块的高度上限（也就是底部）减去 Y轴偏移的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.diff = height2 + newY  // 就是 height 上限 - newY 的值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">this</span>.diff = height2 + newY  <span class="hljs-comment">// 就是 height 上限 - newY 的值</span></code></pre>
<p>watch 检测 diff 变化，判断如果 diff&gt;0 且 小于 title 块的高度，设为差值，否则为0<br>再将 fixed 的 title 块 translate 偏移</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="diff(newVal) {
  let fixedTop = (newVal > 0 &amp;&amp; newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
  if (this.fixedTop === fixedTop) return   // 判断如果两个title区块没有碰到，是不会触发 DOM 操作的
  this.fixedTop = fixedTop
  this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">diff(newVal) {
  <span class="hljs-keyword">let</span> fixedTop = (newVal &gt; <span class="hljs-number">0</span> &amp;&amp; newVal &lt; TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : <span class="hljs-number">0</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.fixedTop === fixedTop) <span class="hljs-keyword">return</span>   <span class="hljs-comment">// 判断如果两个title区块没有碰到，是不会触发 DOM 操作的</span>
  <span class="hljs-keyword">this</span>.fixedTop = fixedTop
  <span class="hljs-keyword">this</span>.$refs.fixed.style.transform = <span class="hljs-string">`translate3d(0,<span class="hljs-subst">${fixedTop}</span>px,0)`</span>
}</code></pre>
<h2 id="articleHeader30">歌手详情页</h2>
<p>singer page 页面 引入 singer-detail 二级路由</p>
<p>index.js 路由里配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  path: '/singer',
  component: Singer,
  children: [
    {
      path: ':id', // 表示 id 为变量
      component: SingerDetail
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">path</span>: <span class="hljs-string">'/singer'</span>,
  <span class="hljs-attr">component</span>: Singer,
  <span class="hljs-attr">children</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">':id'</span>, <span class="hljs-comment">// 表示 id 为变量</span>
      component: SingerDetail
    }
  ]
}</code></pre>
<p>singer.vue 里设定跳转路由 <code>this.$router.push({})</code><br>html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-view></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></code></pre>
<p>js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectSinger(singer){
  this.$router.push({
    path: `/singer/${singer.id}`
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">selectSinger(singer){
  <span class="hljs-keyword">this</span>.$router.push({
    <span class="hljs-attr">path</span>: <span class="hljs-string">`/singer/<span class="hljs-subst">${singer.id}</span>`</span>
  })
}</code></pre>
<h2 id="articleHeader31">Vuex</h2>
<p>Vuex 教程见：<a href="https://github.com/nanyang24/blog/issues/60" rel="nofollow noreferrer" target="_blank">Vuex</a></p>
<p>通常的流程为：</p>
<ol>
<li>定义 state，考虑项目需要的原始数据（最好为底层数据）</li>
<li>getters，就是对原始数据的一层映射，可以只为底层数据做一个访问代理，也可以根据底层数据映射为新的计算数据（相当于 vuex 的计算属性）</li>
<li>修改数据：mutations，定义如何修改数据的逻辑（本质是函数）。</li>
</ol>
<p>在定义 mutations 之前 要先定义 mutation-types （通常为动词+名词）</p>
<p><code>actions.js</code> 通常是两种操作</p>
<ol>
<li>异步操作</li>
<li>是对mutation的封装，比如一个动作需要触发多个mutation的时候，就可以把多个mutation封装到一个action中，达到调用一个action去修改多个mutation的目的。</li>
</ol>
<h3 id="articleHeader32">歌手页面，数据利用 vuex 传递</h3>
<h4>1. 首先 listview.vue 检测点击事件，将具体点击的歌手派发出去，以供父组件 singer 监听</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectItem(item) {
  this.$emit('select', item)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">selectItem(item) {
  <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'select'</span>, item)
},</code></pre>
<h4>2. 父组件监听事件执行 selectSinger(singer)</h4>
<ol>
<li>指向子路由，向地址栏加上 <code>singer.id</code>
</li>
<li>向 mutation 提 <code>SET_SINGER</code> 的 commit</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectSinger(singer) {
  this.$router.push({
    path: `/singer/${singer.id}`
  })
  this.setSinger(singer)
},

...mapMutations({ // 语法糖，'...'将多个对象注入当前对象
  setSinger: 'SET_SINGER' // 将 this.setSinger() 映射为 this.$store.commit('SET_SINGER')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">selectSinger(singer) {
  <span class="hljs-keyword">this</span>.$router.push({
    <span class="hljs-attr">path</span>: <span class="hljs-string">`/singer/<span class="hljs-subst">${singer.id}</span>`</span>
  })
  <span class="hljs-keyword">this</span>.setSinger(singer)
},

...mapMutations({ <span class="hljs-comment">// 语法糖，'...'将多个对象注入当前对象</span>
  setSinger: <span class="hljs-string">'SET_SINGER'</span> <span class="hljs-comment">// 将 this.setSinger() 映射为 this.$store.commit('SET_SINGER')</span>
})</code></pre>
<p>mapMutations (语法糖) 映射 mutations ，<code>this.setSinger(singer)</code> 相当于执行 <code>this.$store.commit('SET_SINGER')</code> （singer 为 mutation 的第二个参数）<br>而 mutations 内 <code>SET_SINGER</code> 的逻辑为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[types.SET_SINGER](state, singer) {
  state.singer = singer
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[types.SET_SINGER](state, singer) {
  state.singer = singer
}</code></pre>
<h4>3. singer-detail 取 vuex 中存好的数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  ...mapGetters([
    'singer'
  ])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">computed: {
  ...mapGetters([
    <span class="hljs-string">'singer'</span>
  ])
}</code></pre>
<p>getters 内 <code>singer</code> 的逻辑为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="singer = state => state.singer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">singer = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.singer</code></pre>
<h2 id="articleHeader33">musiclist 与 songlist</h2>
<h3 id="articleHeader34">滑动 songlist 与背景图的联动</h3>
<p>主要是 监听滚动距离，根据不同的距离条件发生不同的效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
  this.imageHeight = this.$refs.bgImage.clientHeight
  this.$refs.list.$el.style.top = `${this.imageHeight}px` // 对于 Vue 组件，this.$refs.xxx 拿到的是 Vue 实例，所以需要再通过 $el 拿到真实的 dom
  this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
},

watch: {
  scrollY(newY) {
    let translateY = Math.max(this.minTransalteY, newY)   // 最远滚动改变的距离就是 minTransalteY
    let zIndex = 0
    let scale = 1
    const percent = Math.abs(newY / this.imageHeight)

    this.$refs.layer.style.transform = `translate3d(0,${translateY}px,0)`
    this.$refs.layer.style.webkitTransform = `translate3d(0,${translateY}px,0)`
    if (newY < this.minTransalteY) {
      zIndex = 10
      this.$refs.bgImage.style.paddingTop = 0
      this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
    } else {
      this.$refs.bgImage.style.paddingTop = '70%'
      this.$refs.bgImage.style.height = 0
    }
    if (newY > 0) {
      scale = 1 + percent
      zIndex = 10
    }
    this.$refs.bgImage.style.zIndex = zIndex
    this.$refs.bgImage.style.transform = `scale(${scale})`
    this.$refs.bgImage.style.webkitTransform = `scale(${scale})`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">mounted() {
  <span class="hljs-keyword">this</span>.imageHeight = <span class="hljs-keyword">this</span>.$refs.bgImage.clientHeight
  <span class="hljs-keyword">this</span>.$refs.list.$el.style.top = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.imageHeight}</span>px`</span> <span class="hljs-comment">// 对于 Vue 组件，this.$refs.xxx 拿到的是 Vue 实例，所以需要再通过 $el 拿到真实的 dom</span>
  <span class="hljs-keyword">this</span>.minTransalteY = -<span class="hljs-keyword">this</span>.imageHeight + RESERVED_HEIGHT
},

<span class="hljs-attr">watch</span>: {
  scrollY(newY) {
    <span class="hljs-keyword">let</span> translateY = <span class="hljs-built_in">Math</span>.max(<span class="hljs-keyword">this</span>.minTransalteY, newY)   <span class="hljs-comment">// 最远滚动改变的距离就是 minTransalteY</span>
    <span class="hljs-keyword">let</span> zIndex = <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> scale = <span class="hljs-number">1</span>
    <span class="hljs-keyword">const</span> percent = <span class="hljs-built_in">Math</span>.abs(newY / <span class="hljs-keyword">this</span>.imageHeight)

    <span class="hljs-keyword">this</span>.$refs.layer.style.transform = <span class="hljs-string">`translate3d(0,<span class="hljs-subst">${translateY}</span>px,0)`</span>
    <span class="hljs-keyword">this</span>.$refs.layer.style.webkitTransform = <span class="hljs-string">`translate3d(0,<span class="hljs-subst">${translateY}</span>px,0)`</span>
    <span class="hljs-keyword">if</span> (newY &lt; <span class="hljs-keyword">this</span>.minTransalteY) {
      zIndex = <span class="hljs-number">10</span>
      <span class="hljs-keyword">this</span>.$refs.bgImage.style.paddingTop = <span class="hljs-number">0</span>
      <span class="hljs-keyword">this</span>.$refs.bgImage.style.height = <span class="hljs-string">`<span class="hljs-subst">${RESERVED_HEIGHT}</span>px`</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.$refs.bgImage.style.paddingTop = <span class="hljs-string">'70%'</span>
      <span class="hljs-keyword">this</span>.$refs.bgImage.style.height = <span class="hljs-number">0</span>
    }
    <span class="hljs-keyword">if</span> (newY &gt; <span class="hljs-number">0</span>) {
      scale = <span class="hljs-number">1</span> + percent
      zIndex = <span class="hljs-number">10</span>
    }
    <span class="hljs-keyword">this</span>.$refs.bgImage.style.zIndex = zIndex
    <span class="hljs-keyword">this</span>.$refs.bgImage.style.transform = <span class="hljs-string">`scale(<span class="hljs-subst">${scale}</span>)`</span>
    <span class="hljs-keyword">this</span>.$refs.bgImage.style.webkitTransform = <span class="hljs-string">`scale(<span class="hljs-subst">${scale}</span>)`</span>
  }
}</code></pre>
<h2 id="articleHeader35">自动判断浏览器加CSS兼容前缀 prefixStyle</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) return key
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) return false

  if (vendor === 'standard') return style

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> elementStyle = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>).style

<span class="hljs-keyword">let</span> vendor = <span class="hljs-function">(<span class="hljs-params">(</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> transformNames = {
    <span class="hljs-attr">webkit</span>: <span class="hljs-string">'webkitTransform'</span>,
    <span class="hljs-attr">Moz</span>: <span class="hljs-string">'MozTransform'</span>,
    <span class="hljs-attr">O</span>: <span class="hljs-string">'OTransform'</span>,
    <span class="hljs-attr">ms</span>: <span class="hljs-string">'msTransform'</span>,
    <span class="hljs-attr">standard</span>: <span class="hljs-string">'transform'</span>
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> transformNames) {
    <span class="hljs-keyword">if</span> (elementStyle[transformNames[key]] !== <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> key
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
})()

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">prefixStyle</span>(<span class="hljs-params">style</span>) </span>{
  <span class="hljs-keyword">if</span> (vendor === <span class="hljs-literal">false</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>

  <span class="hljs-keyword">if</span> (vendor === <span class="hljs-string">'standard'</span>) <span class="hljs-keyword">return</span> style

  <span class="hljs-keyword">return</span> vendor + style.charAt(<span class="hljs-number">0</span>).toUpperCase() + style.substr(<span class="hljs-number">1</span>)
}</code></pre>
<ol>
<li>首先生成基于用户浏览器的div样式</li>
<li>根据 vendor 供应商定义的不同浏览器前缀，去测试用户浏览器。</li>
</ol>
<p>方法就是判断创建的 div 样式是否有相应的前缀样式，如果有，则返回前缀样式的key，也就是需要的 前缀</p>
<ol><li>通过 prefixStyle 函数，参数为我们需要兼容的样式。如果需要加签注，返回的格式是 前缀 + 首字母大写的样式（应为通常前缀样式为 <code>-webkit-transform-origin</code>，JS操作时，不能写 <code>-</code>，可以采用驼峰写法，也就是样式首字母大写）</li></ol>
<h2 id="articleHeader36">播放器 player</h2>
<p>把播放器组件放在 App.vue 下，因为它是一个跟任何路由都不相关的东西。在任何路由下，它都可以去播放。切换路由并不会影响播放器的播放。</p>
<h3 id="articleHeader37">播放器 vuex 设计</h3>
<p>点击 歌手/歌单 都会进入详情页，详情页 created() 会根据点击的歌手请求相应的数据，然后利用 _normalizeSongs 将数据整理，其中很重要的函数是 createSong ，生成自定义 song 类，方便以后读取</p>
<h3 id="articleHeader38">播放器 图片旋转</h3>
<p><code>animation-play-state</code> <br>animation-play-state CSS 属性定义一个动画是否运行或者暂停。可以通过查询它来确定动画是否正在运行。另外，它的值可以被设置为暂停和恢复的动画的重放。<br>恢复一个已暂停的动画，将从它开始暂停的时候，而不是从动画序列的起点开始在动画。</p>
<p>修复BUG：ios下safari与chrome浏览器,animation-play-state样式失效 #60<br>点击暂停播放的时候，歌曲的图片会继续转动，导致的原因是因为animation-play-state:paused这个样式失效了<br><a href="https://github.com/ustbhuangyi/vue-music/commit/9de934081be8353d872d23c4d72bfb77752ab5a1" rel="nofollow noreferrer" target="_blank">修复具体代码</a><br>核心代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 计算内层Image的transform，并同步到外层容器
 * @param wrapper
 * @param inner
 */
syncWrapperTransform(wrapper, inner) {
  if (!this.$refs[wrapper]) return

  let imageCdWrapper = this.$refs[wrapper]
  let image = this.$refs[inner]
  let wTransform = getComputedStyle(imageCdWrapper)[transform]
  let iTransform = getComputedStyle(image)[transform]
  imageCdWrapper.style[transform] = wTransform === 'none' ? iTransform : iTransform.concat(' ', wTransform)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 计算内层Image的transform，并同步到外层容器
 * @param wrapper
 * @param inner
 */</span>
syncWrapperTransform(wrapper, inner) {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.$refs[wrapper]) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">let</span> imageCdWrapper = <span class="hljs-keyword">this</span>.$refs[wrapper]
  <span class="hljs-keyword">let</span> image = <span class="hljs-keyword">this</span>.$refs[inner]
  <span class="hljs-keyword">let</span> wTransform = getComputedStyle(imageCdWrapper)[transform]
  <span class="hljs-keyword">let</span> iTransform = getComputedStyle(image)[transform]
  imageCdWrapper.style[transform] = wTransform === <span class="hljs-string">'none'</span> ? iTransform : iTransform.concat(<span class="hljs-string">' '</span>, wTransform)
}</code></pre>
<h3 id="articleHeader39">解决快速切换歌曲引发的错误</h3>
<p>这个错误是由于切换的太快，歌曲并未获取到播放地址，而提前播放</p>
<p>利用了H5新api： <code>canplay</code><br>当终端可以播放媒体文件时触发该canplay事件，估计加载足够的数据来播放媒体直到其结束，而不必停止以进一步缓冲内容。<br>利用这个api，在audio上监听 canplay 派发的事件，做成标志位</p>
<blockquote>后来 api 改至 <code>playing</code>
</blockquote>
<h3 id="articleHeader40">播放器 进度条 功能</h3>
<h4>normal 的长形进度条</h4>
<p>在 progress 上监听 <code>touchstart</code>, <code>touchmove</code>, <code>touchend</code> 三个事件</p>
<ul>
<li>touchstart: 获取第一次点击的横坐标和已播放的进度条长度</li>
<li>touchmove: 获取移动后的横坐标，并定义 delta 为 移动后坐标 - 第一次点击的横坐标</li>
</ul>
<p>设置 偏移量 offsetWidth 为 已播放的进度条长度 + delta<br>在去设置 progress 和 progressBtn 的宽度和transform 量都为 offsetWidth</p>
<ul><li>touchend: 一些组件特有的逻辑，和进度条不太相关暂不赘述</li></ul>
<p>而点击任意位置，移动进度按钮，则是通过为 progress 进度条添加点击事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="progressClick(e) {
  this._offset(e.offsetX - progressBtnWidth / 2)
  this._triggerPercent()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">progressClick(e) {
  <span class="hljs-keyword">this</span>._offset(e.offsetX - progressBtnWidth / <span class="hljs-number">2</span>)
  <span class="hljs-keyword">this</span>._triggerPercent()
}</code></pre>
<h4>mini 的圆形进度条</h4>
<p>利用了 SVG 实现，其中有两个圆，一个是背景圆形，另一个为已播放的圆形进度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;progress-circle&quot;>
  <svg :width=&quot;radius&quot; :height=&quot;radius&quot; viewBox=&quot;0 0 100 100&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>
    <circle class=&quot;progress-background&quot; r=&quot;50&quot; cx=&quot;50&quot; cy=&quot;50&quot; fill=&quot;transparent&quot;/>
    <circle class=&quot;progress-bar&quot; r=&quot;50&quot; cx=&quot;50&quot; cy=&quot;50&quot; fill=&quot;transparent&quot;    :stroke-dasharray=&quot;dashArray&quot;
    :stroke-dashoffset=&quot;dashOffset&quot;/>
  </svg>
  <slot></slot>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"progress-circle"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">:width</span>=<span class="hljs-string">"radius"</span> <span class="hljs-attr">:height</span>=<span class="hljs-string">"radius"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 100 100"</span> <span class="hljs-attr">version</span>=<span class="hljs-string">"1.1"</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progress-background"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"transparent"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progress-bar"</span> <span class="hljs-attr">r</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">"50"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"transparent"</span>    <span class="hljs-attr">:stroke-dasharray</span>=<span class="hljs-string">"dashArray"</span>
    <span class="hljs-attr">:stroke-dashoffset</span>=<span class="hljs-string">"dashOffset"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h4>修复进度条的 BUG</h4>
<p>迷你播放器暂停状态，进入全屏，按钮在进度条最左边</p>
<ul>
<li>原因：当播放器最小化的时候，progress-bar 仍然在监听 percent 的变化，所以在不断计算进度条的位置，然而这个时候由于播放器隐藏，进度条的宽度 this.$refs.progressBar.clientWidth 计算为0，因此计算出来的 offset 也是不对的，导致再次最大化播放器的时候，由于播放器是暂停状态， percent 并不会变化，也不会重新计算这个 offset ，导致 Bug。</li>
<li>解决方案：当播放器最大化的时候，手动去计算一次 offset，确保进度条的位置正确。</li>
</ul>
<p>progress-bar 组件要 watch 下 fullScreen，在进入全屏的时候调用一下 移动按钮函数</p>
<h3 id="articleHeader41">歌词 lyric</h3>
<p>获取歌词，虽然我们约定返回数据是 json，但QQ音乐 返回的是依然是 jsonp，所以我们需要做一层数据的处理</p>
<p><code>const reg = /^\w+\(({.+})\)$/</code><br>就是将返回的jsonp格式摘取出我们需要的json字段</p>
<p><code>ret = JSON.parse(matches[1])</code><br>将正则分组（就是正则括号内的内容）捕获的json字符串数据 转成 json 格式</p>
<p>然后我们在 player 组件中监听 currentSong 的变化，获取 this.currentSong.getLyric()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get(url, {
  headers: {
    referer: 'https://c.y.qq.com/',
    host: 'c.y.qq.com'
  },
  params: req.query
}).then((response) => {
  let ret = response.data
  if (typeof ret === 'string') {
    const reg = /^\w+\(({.+})\)$/
    const matches = ret.match(reg)
    if (matches) {
      ret = JSON.parse(matches[1])
    }
  }
  res.json(ret)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.get(url, {
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-attr">referer</span>: <span class="hljs-string">'https://c.y.qq.com/'</span>,
    <span class="hljs-attr">host</span>: <span class="hljs-string">'c.y.qq.com'</span>
  },
  <span class="hljs-attr">params</span>: req.query
}).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> ret = response.data
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> ret === <span class="hljs-string">'string'</span>) {
    <span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/^\w+\(({.+})\)$/</span>
    <span class="hljs-keyword">const</span> matches = ret.match(reg)
    <span class="hljs-keyword">if</span> (matches) {
      ret = <span class="hljs-built_in">JSON</span>.parse(matches[<span class="hljs-number">1</span>])
    }
  }
  res.json(ret)
})</code></pre>
<p>然后我们得到的返回数据的是 base64 的字符串，需要解码，这里用到了第三方库: <code>js-base64</code><br>（我们这次用的是QQ音乐pc版的歌词，需要解码base64，而移动版的QQ音乐是不需要的）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.lyric = Base64.decode(res.lyric)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.lyric = Base64.decode(res.lyric)</code></pre>
<p>之后利用第三方库: <code>js-lyric</code> ，解析我们的歌词，生成方便操作的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getLyric() {
  this.currentSong.getLyric()
    .then(lyric => {
      this.currentLyric = new Lyric(lyric)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">getLyric() {
  <span class="hljs-keyword">this</span>.currentSong.getLyric()
    .then(<span class="hljs-function"><span class="hljs-params">lyric</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.currentLyric = <span class="hljs-keyword">new</span> Lyric(lyric)
    })
}</code></pre>
<h4>歌词滚动</h4>
<p>当前歌曲的歌词高亮是利用 <code>js-lyric</code> 会派发的 handle 事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.currentLyric = new Lyric(lyric, this.handleLyric)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">this</span>.currentLyric = <span class="hljs-keyword">new</span> Lyric(lyric, <span class="hljs-keyword">this</span>.handleLyric)</code></pre>
<p><code>js-lyric</code> 会在每次改变当前歌词时触发这个函数，函数的参数为 当前的 lineNum 和 txt</p>
<h4>而 使当前高亮歌词保持最中间 是利用了 BScroll 滚动至高亮的歌词</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let middleLine = isIphoneX() ? 7 : 5  // 鉴于iphonex太长了，做个小优化
if (lineNum > middleLine) {
  let lineEl = this.$refs.lyricLine[lineNum - middleLine]
  this.$refs.lyricList.scrollToElement(lineEl, 1000)
} else {
  this.$refs.lyricList.scrollTo(0, 0, 1000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> middleLine = isIphoneX() ? <span class="hljs-number">7</span> : <span class="hljs-number">5</span>  <span class="hljs-comment">// 鉴于iphonex太长了，做个小优化</span>
<span class="hljs-keyword">if</span> (lineNum &gt; middleLine) {
  <span class="hljs-keyword">let</span> lineEl = <span class="hljs-keyword">this</span>.$refs.lyricLine[lineNum - middleLine]
  <span class="hljs-keyword">this</span>.$refs.lyricList.scrollToElement(lineEl, <span class="hljs-number">1000</span>)
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">this</span>.$refs.lyricList.scrollTo(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1000</span>)
}</code></pre>
<h3 id="articleHeader42">cd 与 歌词 之间滑动</h3>
<p>通过监听 middle 的 三个 touch 事件</p>
<p><code>offsetWidth</code> 是为了计算歌词列表的一个偏移量的，首先它的偏移量不能大于0，也不能小于 <code>-window.innerWidth</code>。<br>left 是根据当前显示的是 cd 还是歌词列表初始化的位置，如果是 cd，那么 left 为 0 ，歌词是从右往左拖的，deltaX 是小于 0 的，所以最终它的偏移量就是 <code>0+deltaX</code>；如果已经显示歌词了，那么 left 为 <code>-window.innerWidth</code>，歌词是从左往右拖，deltaX 是大于 0 的，所以最终它的偏移量就是 <code>-window.innerWidth + deltaX</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="middleTouchStart(e) {
  this.touch.initiated = true
  this.touch.startX = e.touches[0].pageX
  this.touch.startY = e.touches[0].pageY
},
middleTouchMove(e) {
  if (!this.touch.initiated) return
  const deltaX = e.touches[0].pageX - this.touch.startX
  const deltaY = e.touches[0].pageY - this.touch.startY
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return
  }
  const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
  const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
  this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
  console.log(this.touch.percent)
  this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
  this.$refs.lyricList.$el.style[transitionDuration] = 0
  this.$refs.middleL.style.opacity = 1 - this.touch.percent
  this.$refs.middleL.style[transitionDuration] = 0
},
middleTouchEnd() {
  let offsetWidth, opacity
  // 从右向左滑 的情况
  if (this.currentShow === 'cd') {
    if (this.touch.percent > 0.1) {
      offsetWidth = -window.innerWidth
      opacity = 0
      this.currentShow = 'lyric'
    } else {
      offsetWidth = 0
      opacity = 1
    }
  } else {
    //  从左向右滑 的情况
    if (this.touch.percent < 0.9) {
      offsetWidth = 0
      opacity = 1
      this.currentShow = 'cd'
    } else {
      offsetWidth = -window.innerWidth
      opacity = 0
    }
  }
  const durationTime = 300
  this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
  this.$refs.lyricList.$el.style[transitionDuration] = `${durationTime}ms`
  this.$refs.middleL.style.opacity = opacity
  this.$refs.middleL.style[transitionDuration] = `${durationTime}ms`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">middleTouchStart(e) {
  <span class="hljs-keyword">this</span>.touch.initiated = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">this</span>.touch.startX = e.touches[<span class="hljs-number">0</span>].pageX
  <span class="hljs-keyword">this</span>.touch.startY = e.touches[<span class="hljs-number">0</span>].pageY
},
middleTouchMove(e) {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.touch.initiated) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">const</span> deltaX = e.touches[<span class="hljs-number">0</span>].pageX - <span class="hljs-keyword">this</span>.touch.startX
  <span class="hljs-keyword">const</span> deltaY = e.touches[<span class="hljs-number">0</span>].pageY - <span class="hljs-keyword">this</span>.touch.startY
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(deltaY) &gt; <span class="hljs-built_in">Math</span>.abs(deltaX)) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">const</span> left = <span class="hljs-keyword">this</span>.currentShow === <span class="hljs-string">'cd'</span> ? <span class="hljs-number">0</span> : -<span class="hljs-built_in">window</span>.innerWidth
  <span class="hljs-keyword">const</span> offsetWidth = <span class="hljs-built_in">Math</span>.min(<span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.max(-<span class="hljs-built_in">window</span>.innerWidth, left + deltaX))
  <span class="hljs-keyword">this</span>.touch.percent = <span class="hljs-built_in">Math</span>.abs(offsetWidth / <span class="hljs-built_in">window</span>.innerWidth)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.touch.percent)
  <span class="hljs-keyword">this</span>.$refs.lyricList.$el.style[transform] = <span class="hljs-string">`translate3d(<span class="hljs-subst">${offsetWidth}</span>px,0,0)`</span>
  <span class="hljs-keyword">this</span>.$refs.lyricList.$el.style[transitionDuration] = <span class="hljs-number">0</span>
  <span class="hljs-keyword">this</span>.$refs.middleL.style.opacity = <span class="hljs-number">1</span> - <span class="hljs-keyword">this</span>.touch.percent
  <span class="hljs-keyword">this</span>.$refs.middleL.style[transitionDuration] = <span class="hljs-number">0</span>
},
middleTouchEnd() {
  <span class="hljs-keyword">let</span> offsetWidth, opacity
  <span class="hljs-comment">// 从右向左滑 的情况</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.currentShow === <span class="hljs-string">'cd'</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.touch.percent &gt; <span class="hljs-number">0.1</span>) {
      offsetWidth = -<span class="hljs-built_in">window</span>.innerWidth
      opacity = <span class="hljs-number">0</span>
      <span class="hljs-keyword">this</span>.currentShow = <span class="hljs-string">'lyric'</span>
    } <span class="hljs-keyword">else</span> {
      offsetWidth = <span class="hljs-number">0</span>
      opacity = <span class="hljs-number">1</span>
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">//  从左向右滑 的情况</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.touch.percent &lt; <span class="hljs-number">0.9</span>) {
      offsetWidth = <span class="hljs-number">0</span>
      opacity = <span class="hljs-number">1</span>
      <span class="hljs-keyword">this</span>.currentShow = <span class="hljs-string">'cd'</span>
    } <span class="hljs-keyword">else</span> {
      offsetWidth = -<span class="hljs-built_in">window</span>.innerWidth
      opacity = <span class="hljs-number">0</span>
    }
  }
  <span class="hljs-keyword">const</span> durationTime = <span class="hljs-number">300</span>
  <span class="hljs-keyword">this</span>.$refs.lyricList.$el.style[transform] = <span class="hljs-string">`translate3d(<span class="hljs-subst">${offsetWidth}</span>px,0,0)`</span>
  <span class="hljs-keyword">this</span>.$refs.lyricList.$el.style[transitionDuration] = <span class="hljs-string">`<span class="hljs-subst">${durationTime}</span>ms`</span>
  <span class="hljs-keyword">this</span>.$refs.middleL.style.opacity = opacity
  <span class="hljs-keyword">this</span>.$refs.middleL.style[transitionDuration] = <span class="hljs-string">`<span class="hljs-subst">${durationTime}</span>ms`</span>
}</code></pre>
<h2 id="articleHeader43">优化</h2>
<p>Vue 按需加载路由：</p>
<p>当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。</p>
<p>结合 <strong>Vue 的异步组件</strong>和 <strong>Webpack 的代码分割功能</strong>，轻松实现路由组件的懒加载。</p>
<ul><li>首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：</li></ul>
<p><code>const Foo = () =&gt; Promise.resolve({ /* 组件定义对象 */ })</code></p>
<ul><li>第二，在 Webpack 2 中，我们可以使用动态 import语法来定义代码分块点 (split point)：</li></ul>
<p><code>import('./Foo.vue') // 返回 Promise</code></p>
<p>在我们的项目中的 router/index.js 是这样定义的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Vue 异步加载路由
// 引入5个 一级路由组件
const Recommend = () => import('components/recommend/recommend')
const Singer = () => import('components/singer/singer')
const Rank = () => import('components/rank/rank')
const Search = () => import('components/search/search')
const UserCenter = () => import('components/user-center/user-center')
// 二级路由组件
const SingerDetail = () => import('components/singer-detail/singer-detail')
const Disc = () => import('components/disc/disc')
const TopList = () => import('components/top-list/top-list')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Vue 异步加载路由</span>
<span class="hljs-comment">// 引入5个 一级路由组件</span>
<span class="hljs-keyword">const</span> Recommend = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/recommend/recommend'</span>)
<span class="hljs-keyword">const</span> Singer = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/singer/singer'</span>)
<span class="hljs-keyword">const</span> Rank = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/rank/rank'</span>)
<span class="hljs-keyword">const</span> Search = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/search/search'</span>)
<span class="hljs-keyword">const</span> UserCenter = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/user-center/user-center'</span>)
<span class="hljs-comment">// 二级路由组件</span>
<span class="hljs-keyword">const</span> SingerDetail = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/singer-detail/singer-detail'</span>)
<span class="hljs-keyword">const</span> Disc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/disc/disc'</span>)
<span class="hljs-keyword">const</span> TopList = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'components/top-list/top-list'</span>)</code></pre>
<p>无需改动其他的代码</p>
<h2 id="articleHeader44">手机联调</h2>
<p>电脑，手机 同一WIFI下</p>
<p>配置 config 的 index.js 里的 host 为 '0.0.0.0'，手机可以打开电脑的IP地址+端口查看</p>
<p>mac下 ifconfig 查看ip</p>
<h2 id="articleHeader45">移动端调试工具</h2>
<p>移动端console：vConsole<br>移动端抓包工具：charles</p>
<h1 id="articleHeader46">结语</h1>
<p>以上是在实现这个音乐 Vue 项目中遇到的难点以及一些使用技巧。在这里记录下来方便以后自己查阅，还能够给同样在前端这个小领域奋斗的大家提供一小些学习资料~</p>
<p>我的 Github：<a href="https://github.com/nanyang24" rel="nofollow noreferrer" target="_blank">https://github.com/nanyang24</a><br>如果对你有帮助，欢迎 star 和 互粉 ~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 实现的音乐项目 music app 知识点总结分享

## 原文链接
[https://segmentfault.com/a/1190000013294187](https://segmentfault.com/a/1190000013294187)

