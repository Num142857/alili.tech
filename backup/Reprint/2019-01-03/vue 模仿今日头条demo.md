---
title: 'vue 模仿今日头条demo' 
date: 2019-01-03 2:30:11
hidden: true
slug: 5dc9h9cvdct
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue 头条 demo</h2>
<h4>写在前面</h4>
<blockquote>总结一下写 demo 过程中 遇到的一些问题，方便自己的学习总结！如有错误，还请指正！</blockquote>
<ol>
<li>一直想学习使用 vue ，并准备以后在实际项目使用，之前跟着慕课网 黄轶 老师 敲了一下 饿了么商品购买页的demo<br><a href="https://segmentfault.com/a/1190000010263373">ele效果预览</a>
</li>
<li>该 demo 借鉴自 <a href="https://github.com/hcy1996/vue-toutiao" rel="nofollow noreferrer" target="_blank">hcy1996-github</a> 这个项目，但内部内容，布局风格，完全不同，只为共同学习，共同交流</li>
<li>数据接口 直接打开 今日头条 网页版 ，在 network 分析了下，直接 copy 过来的</li>
<li>还有很多功能没有实现，后期在完善吧！</li>
<li>项目地址：<a href="https://github.com/hugeorange/vue-study" rel="nofollow noreferrer" target="_blank">github-项目地址</a>
</li>
<li>预览效果: <a href="https://hugeorange.github.io/gh-pages/toutiao" rel="nofollow noreferrer" target="_blank">demo预览效果</a>
</li>
<li>建议在 chrome 浏览器查看（不知道为什么在手机上数据请求，一个劲卡死，不知道是不是因为今日头条接口的原因）</li>
</ol>
<h3 id="articleHeader1">演示</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016603178" src="https://static.alili.tech/img/remote/1460000016603178" alt="演示gif" title="演示gif" style="cursor: pointer; display: inline;"></span></p>
<h5>静态资源</h5>
<ol>
<li>头部添加 rem 布局</li>
<li>引入 reset.css</li>
<li>使用 阿里妈妈图标库，index.html 引入</li>
</ol>
<h4>　使用 css 预处理器 sass</h4>
<ol>
<li>安装 <code>node-sass sass-loader</code>  <code>npm install node-sass sass-loader --save-dev</code>
</li>
<li>使用 <code>&lt;style rel="stylesheet/scss" lang="scss"&gt;</code>
</li>
<li>参考文章： <code>http://www.jianshu.com/p/67f52071657d</code>
</li>
</ol>
<h4>app.vue</h4>
<ol>
<li>
<p>底部导航栏栏  ==&gt; 刚开始时用的 <code>vux</code> 的 <code>tabbar tabbar-item</code> 组件，发现有需求实现不了，刚开始还改了源码，最后实在受不了了<br>  就用   <code>vue-router roter-link</code> 自己写了<br>  底部导航栏 四个按钮分别对应 四个组件</p>
<ul>
<li>由于自己对 vue-router 理解还欠火候，所以遇到了一个问题</li>
<li>routes 数组里面的内容对应的就是 组件 ，</li>
<li>path 选项对应的是路由路径,初始时没有路由嵌套 即为 <code>\index</code>
</li>
<li>components 选项对应该路由对应的组件，由于组件已经全部通过 <code>import</code> 引入了，所以不需要写路径了</li>
<li>底部通用 tab 导航栏</li>
<li>本想单独抽出一个 bottom.vue 组件呢，但在左右切换的滑动样式中，表现并不好，因为希望底部导航栏不滑动这才符合人的预期需求</li>
<li>所以最终还是选择不抽离这个组件，直接写在了 app.vue 里面了</li>
</ul>
</li>
<li>通用样式库 common scss 目录 base.scss mixin.scss 通过 一个 index.scss 导入</li>
<li>
<p>引入 axios ，由于 axios 不支持jsonp，所以还得引入 jsonp</p>
<ul>
<li><code> npm install axios jsonp --save </code></li>
<li>在 common/js/ajax.js 下使用这两个库</li>
<li><code>import axios from 'axios'</code></li>
<li><code>import jsonp from 'jsonp'</code></li>
<li>将 ajax 请求，封装在 一个通用的 js 文件里，方便统一处理 ajax</li>
<li>即前后端协作时 定义的一些返回值代表的意义，都可以在此方法里统一处理</li>
</ul>
</li>
<li>
<p>遇到个问题不知道怎么解决</p>
<ul>
<li>我想有 loading.vue 组件，就是可以在通用的 ajax.js 文件里引用，</li>
<li>问题是，我发现 当加载 ajax.js 文件时 ，loading.vue 组件 import 不进来的，所以无法使用</li>
<li>但我又想要 当用统一 ajax 处理的时候，统一执行 loading</li>
<li>最终我想了一个下下策，把 loading组件的内容直接写在了index.html 文件里，这样就可以加载到了，就可以在 ajax处理的时候集中使用 loading.vue 了</li>
<li>不仅 loading 组件，还有 通用弹框组件，（就是想在一个通用的 js 文件里，每次只要在使用的地方 import 这个 js 文件，就能使用这些 通用组件，而不必每次都要 import 这些组件）</li>
<li>现在的解决办法太渣，看以后能不能想到什么好的办法</li>
<li>如果各位大大，有什么好的方法，希望能告知 小弟 一声</li>
</ul>
</li>
</ol>
<h3 id="articleHeader2">index.vue 文件</h3>
<ol>
<li>顶部 x-header 组件 ，感觉使用不够灵活<br>不知道如何 自定义左右图标<br>因为 vux 的 icon 是引自 <a href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="nofollow noreferrer" target="_blank">icon图标css库</a>
</li>
<li>右侧icon 是我引用 阿里妈妈图标库里面的图标的</li>
<li>标签导航一栏 本来是用  vux 的scroller 组件写的，但看到官方文档上写 ，此组件已不在维护，且不建议开发者继续使用<br>自己按着 demo 用了一下发现不知道 如何 refresh，就放弃了</li>
<li>自己 用 better-scroll 处理滚动 tab 标签栏横线滚动没碰到问题</li>
</ol>
<ul>
<li>新闻内容列表滚动也是用的 better-scroll 碰到了一个问题，<br>下拉刷新的logo 总是无法藏在 列表后面，无论怎么设置 z-index</li>
<li>最后才发现问题，自己还真的是蠢，列表容器没写背景颜色，自然永远都能看到loading图标</li>
</ul>
<blockquote>在纠结的过程中也发现了几个问题：</blockquote>
<ul>
<li>移动端百分比布局时：html,body一定要设置宽高百分比，不然会遇到很多坑</li>
<li>better-scroll 滚动容器一定要有明确的宽高，建议最好用绝对定位，背景颜色，overflow:hidden</li>
<li>
<p>最大的一个坑，列表总是有一部分滚动不上来，碰到这个问题，首先想到：</p>
<ul>
<li>列表高度是否大于容器高度</li>
<li>refresh 时机不对最终，发现确实时是 refresh 时机不对，</li>
<li>但接下来纠结的时刻到了，无论放在哪都不对，最终写了 setTimeout(fn,3000),可以正常工作，但这肯定不是解决办法</li>
<li>最后想到：因为列表中的图片容器高度，是靠图片撑开的，但图片加载的比较慢所以 better-scroll 计算不到准确的高度，</li>
<li>解决办法：图片容器高度事先写死，完美的解决了</li>
</ul>
</li>
</ul>
<ol><li>
<p>图片懒加载  vue-lazyload 插件，超好用</p>
<ul>
<li>懒加载引用的图片地址：loading 图片</li>
<li>如果 在js 引用静态图片，因为webpack 不会解析 js 文件里的图片，<br>所以要用 import 引用 <code>import logo from './assets/loading.gif'</code>
</li>
<li>或是把图片放在顶层的 <code>static</code> 目录里</li>
</ul>
</li></ol>
<h3 id="articleHeader3">微信左右滚动效果（切换底部tab时）---以下是通用思路</h3>
<ul>
<li>在 全局路由 <code>beforeEach(function(to,from,next){***})</code> 钩子里 要做下面的事情</li>
<li>假如待切换的组件为 <code>index1，index2</code>
</li>
<li>在 <code>sessionStorage</code> 里面 创建 一个 <code>__router__</code> 值</li>
<li>
<code>__router__</code>的值包括：<code>count, transitionName , to.path ,from.path</code>
</li>
<li>count 初识值为 0；</li>
<li>transitionName 初始值为 ''</li>
<li>to.path 初始值为  undefined</li>
<li>form.path 初始值为 undefined</li>
<li>首次进入时 to.index(index1) 为空 执行 else</li>
<li>count++</li>
<li>判断 <code>to.path !== '/' &amp;&amp; history[to.path] = historyCount</code>
</li>
<li>
<code>history['transitionName'] = 'forward'</code>; 为前进状态</li>
<li>此时： <code>index1:1,count:1</code>
</li>
<li>二次 进入（路由已跳转过一次） 此时 <code>to.path</code> 依旧 为 <code>undefined</code> ，而 <code>from.path 为 to.path 的值</code>
</li>
<li>继续走 else 里面，重复上面的步骤 此时<code> index2:2,count2,index1:1</code>
</li>
<li>在继续点第一个 tab 相当于回到第一个 tab</li>
<li>此时：<code>to.path == index1, from.path == index2</code>
</li>
<li>假如 ：!fromIndex || parseInt(toIndex) &gt; parseInt(fromIndex</li>
<li>或：toIndex === '0' &amp;&amp; fromIndex === '0'</li>
<li>为 <code>forward</code> 前进状态</li>
<li>否则： 为 <code>reserve</code> 后退状态</li>
<li>这样就能判断是前进状态还是后退状态，就可以用样式控制滚动方向了</li>
<li>
<p>Do not bb ，show me code</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach(function (to, from, next) {
  let history = window.sessionStorage.__router__;
  if(!history){
    history = {};
  }else{
    history = JSON.parse(history);
  }

  let historyCount = history.count * 1;    //记录走过的 tab 页数量
  const toIndex = history[to.path];        // 要去的索引
  const fromIndex = history[from.path];    //要离开的索引

  if (toIndex) {
      if (!fromIndex || parseInt(toIndex) > parseInt(fromIndex) || (toIndex === '0' &amp;&amp; fromIndex === '0')) {
      history['transitionName'] = 'forward';
      } else {
          history['transitionName'] = 'reverse';
      }
  } else {
      //第一次没有记录session-storage 的情况
      ++historyCount;
      history['count'] = historyCount;

      to.path !== '/' &amp;&amp; (history[to.path] = historyCount);
      history['transitionName'] = 'forward';
  }

  history = JSON.stringify(history);

  window.sessionStorage.__router__ = history;

  if (/\/http/.test(to.path)) {
      let url = to.path.split('http')[1];
      window.location.href = `http${url}`
  } else {
      next()
  }
  });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>router.beforeEach(<span class="hljs-keyword">function</span> (to, from, next) {
  <span class="hljs-built_in">let</span> <span class="hljs-built_in">history</span> = window.sessionStorage.__router__;
  <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">history</span>){
    <span class="hljs-built_in">history</span> = {};
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-built_in">history</span> = JSON.parse(<span class="hljs-built_in">history</span>);
  }

  <span class="hljs-built_in">let</span> <span class="hljs-built_in">history</span>Count = history.count * 1;    //记录走过的 tab 页数量
  const toIndex = <span class="hljs-built_in">history</span>[to.path];        // 要去的索引
  const fromIndex = <span class="hljs-built_in">history</span>[from.path];    //要离开的索引

  <span class="hljs-keyword">if</span> (toIndex) {
      <span class="hljs-keyword">if</span> (!fromIndex || parseInt(toIndex) &gt; parseInt(fromIndex) || (toIndex === <span class="hljs-string">'0'</span> &amp;&amp; fromIndex === <span class="hljs-string">'0'</span>)) {
      <span class="hljs-built_in">history</span>[<span class="hljs-string">'transitionName'</span>] = <span class="hljs-string">'forward'</span>;
      } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">history</span>[<span class="hljs-string">'transitionName'</span>] = <span class="hljs-string">'reverse'</span>;
      }
  } <span class="hljs-keyword">else</span> {
      //第一次没有记录session-storage 的情况
      ++<span class="hljs-built_in">history</span>Count;
      <span class="hljs-built_in">history</span>[<span class="hljs-string">'count'</span>] = <span class="hljs-built_in">history</span>Count;

      to.path !== <span class="hljs-string">'/'</span> &amp;&amp; (<span class="hljs-built_in">history</span>[to.path] = <span class="hljs-built_in">history</span>Count);
      <span class="hljs-built_in">history</span>[<span class="hljs-string">'transitionName'</span>] = <span class="hljs-string">'forward'</span>;
  }

  <span class="hljs-built_in">history</span> = JSON.stringify(<span class="hljs-built_in">history</span>);

  window.sessionStorage.__router__ = <span class="hljs-built_in">history</span>;

  <span class="hljs-keyword">if</span> (/\/http/.test(to.path)) {
      <span class="hljs-built_in">let</span> url = to.path.split(<span class="hljs-string">'http'</span>)[1];
      window.location.href = `http<span class="hljs-variable">${url}</span>`
  } <span class="hljs-keyword">else</span> {
      next()
  }
  });
</code></pre>
</li>
</ul>
<h3 id="articleHeader4">遇到问题（2017-08-10）</h3>
<ul>
<li>当第一次进入页面时 ，如果不是处在第一个 tab 时，history 里面记录的索引就会出现错乱现象</li>
<li>解决办法：事先设置好 首页出现的四个 tab 的索引，设置好 初始的 count 为 4</li>
<li>这样就不会发生索引错乱现象</li>
</ul>
<h3 id="articleHeader5">切换时的一个小问题</h3>
<ul><li>当左右华东切换时，要注意将各个 tab 页顶层设置 ，position：absolute，这样才会排在同一排，否则会出现一上一下的现象</li></ul>
<h3 id="articleHeader6">具体实现查看 <a href="https://github.com/hugeorange/vue-demo/tree/master/toutiao" rel="nofollow noreferrer" target="_blank">github-项目地址</a> 里面的 main.js</h3>
<h4>app.vue</h4>
<p>通过 watch 选项监测 <code>$route</code> 动态的改变<code>transitionName</code> 的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <transition :name=&quot;transitionName&quot;>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </transition>

  watch: {
      '$route' (to, from) {
          console.log(to,from);
          this.transitionName = JSON.parse(window.sessionStorage.__router__).transitionName;
      }
  },

  样式：
    //微信切换样式 ，左右滚动
  //前进动画样式
  .forward-enter-active,.forward-leave-active{
    transition: all 0.3s;
  }

  .forward-enter{
    transform: translateX(100%);
  }
  .forward-leave-to{
    transform: translateX(-100%);
  }

  // 后退动画样式
  .reverse-enter-active,.reverse-leave-active{
    transition: all 0.3s;
  }
  .reverse-enter{
    transform: translateX(-100%);
  }
  .reverse-leave-to{
    transform: translateX(100%);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>   &lt;transition :<span class="hljs-built_in">name</span>=<span class="hljs-string">"transitionName"</span>&gt;
        &lt;keep-<span class="hljs-built_in">alive</span>&gt;
            &lt;router-view&gt;&lt;/router-view&gt;
        &lt;/keep-<span class="hljs-built_in">alive</span>&gt;
    &lt;/transition&gt;

  watch: {
      <span class="hljs-string">'$route'</span> (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>) {
          console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">to</span>,<span class="hljs-keyword">from</span>);
          this.transitionName = JSON.parse(window.sessionStorage.<span class="hljs-variable">__router__</span>).transitionName;
      }
  },

  样式：
    <span class="hljs-comment">//微信切换样式 ，左右滚动</span>
  <span class="hljs-comment">//前进动画样式</span>
  .forward-enter-active,.forward-leave-active{
    transition: all <span class="hljs-number">0.3</span>s;
  }

  .forward-enter{
    transform: translateX(<span class="hljs-number">100</span>%);
  }
  .forward-leave-<span class="hljs-keyword">to</span>{
    transform: translateX(-<span class="hljs-number">100</span>%);
  }

  <span class="hljs-comment">// 后退动画样式</span>
  .<span class="hljs-built_in">reverse</span>-enter-active,.<span class="hljs-built_in">reverse</span>-leave-active{
    transition: all <span class="hljs-number">0.3</span>s;
  }
  .<span class="hljs-built_in">reverse</span>-enter{
    transform: translateX(-<span class="hljs-number">100</span>%);
  }
  .<span class="hljs-built_in">reverse</span>-leave-<span class="hljs-keyword">to</span>{
    transform: translateX(<span class="hljs-number">100</span>%);
  }</code></pre>
<h3 id="articleHeader7">sessionStorage 和 localStorage 本地存储问题</h3>
<ol>
<li>sessionStorage 本地会话存储，会话结束-浏览器关闭（不包括刷新页面，恢复页面），存储结果清除</li>
<li>localStorage 本地存储，除非手动清除，否则永不清除</li>
<li>大小传说 5M</li>
<li>方法1：getItem(key),setItem(key,value),clear()</li>
<li>方法2：利用 . 或 [] 语法，访问或设置</li>
<li>事件：</li>
<li>
<p>如果你监听storage变更事件你就会发现，当数据发生变化时本页是监听不到storage事件变更消息的。而同域的其他打开的页面反而监听到了该消息。悲剧不？</p>
<ul><li>解决办法百度</li></ul>
</li>
</ol>
<h3 id="articleHeader8">storage只能存储字符串 不能存储其他类型数据</h3>
<ol><li>存储对象,读取对象：</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let history = window.sessionStorage.__router__;
  if(!history){
    history = {};
  }else{
    //读取
    history = JSON.parse(history);
  }
  //存储
  history = JSON.stringify(history);
  window.sessionStorage.__router__ = history;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> <span class="hljs-built_in">history</span> = window.sessionStorage.__router__;
  <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">history</span>){
    <span class="hljs-built_in">history</span> = {};
  }<span class="hljs-keyword">else</span>{
    //读取
    <span class="hljs-built_in">history</span> = JSON.parse(<span class="hljs-built_in">history</span>);
  }
  //存储
  <span class="hljs-built_in">history</span> = JSON.stringify(<span class="hljs-built_in">history</span>);
  window.sessionStorage.__router__ = <span class="hljs-built_in">history</span>;</code></pre>
<h3 id="articleHeader9">activated 钩子</h3>
<ol>
<li>在 &lt;keep-alive&gt;&lt;/keep-alive&gt; 组件中使用</li>
<li>keep-alive 组件在第二次渲染时不会触发 create mounted updated 钩子</li>
<li>但是会触发 activated 钩子</li>
<li>
<p>使用场景： 列表页==&gt; 详情页的切换</p>
<ul>
<li>第一次从列表页进详情页时会加载数据 触发 created,mounted,updated 钩子</li>
<li>第二次以上钩子就不会被触发了， 需要加上一个 activated 生命周期钩子，在里面加载请求数据</li>
</ul>
</li>
<li>
<ul>
<li>路由跳转时 需要用到 动态路由 即在 路径后面加个 id</li>
<li>我用query 进行传递参数，如果不主动传递参数，跳转后的子页面刷新时数据就丢失了（原计划用 vuex 做收藏功能）</li>
<li>index.js <code>{path: '/newsDetails/:key', name: 'newsDetails',component:newsDetails },</code>
</li>
<li>导航写法：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link class=&quot;news-item&quot; v-for=&quot;(item,index) in newsData&quot;
    :to ='{
        path: &quot;/newsDetails&quot; + item.source_url,
        query:{
            newsItem:JSON.stringify(item)
        }
    }'
    tag='li'
    :key='index'
>
</router-link>
//路由外链
<router-view></router-view>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"news-item"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in newsData"</span>
    <span class="hljs-attr">:to</span> =<span class="hljs-string">'</span></span></span><span class="hljs-template-variable">{
        path: "/newsDetails" + item.source_url,
        query:{
            newsItem:JSON.stringify(item)
        }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">
    }'</span>
    <span class="hljs-attr">tag</span>=<span class="hljs-string">'li'</span>
    <span class="hljs-attr">:key</span>=<span class="hljs-string">'index'</span>
&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
//路由外链
<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
</span></code></pre>
</li>
</ol>
<h3 id="articleHeader10">或者</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link
    class=&quot;news-item&quot; v-for=&quot;(item,index) in newsData&quot;
    :to=&quot; 'newsDetail' + item.source_url &quot;
    tag='li'
   :key='index'
   >
</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;router-link
    <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"news-item"</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in newsData"</span>
    :to=<span class="hljs-string">" 'newsDetail' + item.source_url "</span>
    tag=<span class="hljs-string">'li'</span>
   :key=<span class="hljs-string">'index'</span>
   &gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></span></code></pre>
<h4>列表页 ==&gt; 详情页</h4>
<blockquote>从列表页到详情页不适合用嵌套路由<br>因为其是两个单独的页面，并不会同时出现在一屏上</blockquote>
<h3 id="articleHeader11">嵌套路由写法</h3>
<ul><li>route.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  {path: '/index', name:'index', component: index,
    children:[
        {path: '/index/newsDetails/:id', name: 'newsDetails',component:newsDetails },
    ]
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/index'</span>, <span class="hljs-attribute">name</span>:<span class="hljs-string">'index'</span>, <span class="hljs-attribute">component</span>: index,
    <span class="hljs-attribute">children</span>:[
        {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/index/newsDetails/:id'</span>, <span class="hljs-attribute">name</span>: <span class="hljs-string">'newsDetails'</span>,<span class="hljs-attribute">component</span>:newsDetails },
    ]
  }</code></pre>
<ul><li>index.vue</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link>
  :to = &quot;'index/newsDetails' + item.source_url&quot;
</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;router-link&gt;</span>
  :to = <span class="hljs-string">"'index/newsDetails' + item.source_url"</span>
<span class="hljs-params">&lt;/router-link&gt;</span></code></pre>
<h3 id="articleHeader12">路由传参</h3>
<ul>
<li>不仅仅传递一个动态路由id还可以 通过 params 和 query进行传递，但都会显示在 url上</li>
<li>列表页 ==&gt; 将该项所有参数传递到详情页，可以现将对象数据 序列化为字符串，放在 query li</li>
<li>在详情页时，取值时反序列化，继而可以在详情页里面使用</li>
<li>由于数据是存在 url 里 故可以在刷新页面仍可以拿到数据</li>
</ul>
<h3 id="articleHeader13">路由小结</h3>
<ol>
<li>路由中的三个基本概念： <code>route</code> <code>routes</code> <code>router</code>
</li>
<li>route 一条路由（单条路由的走向）   routes 一组路由（静止的一组路由的集合）</li>
<li>router 是一种机制相当于一个管理者（当用户点击时  去 routes 去执行相应的路由）</li>
<li>普通路由</li>
<li>动态路由</li>
<li>嵌套路由</li>
<li>编程式导航</li>
<li>组件内的挂载到 根实例上的两个对象  路由源信息对象： <code>this.$route</code> 和  路由实例对象 <code>this.$router</code>
</li>
</ol>
<h3 id="articleHeader14">父子组件通讯</h3>
<ul>
<li>父组件 =&gt; 子组件</li>
<li>父组件传递： <code> &lt;to-top :flag="toTop" @scrolltoTop="scroll_to"&gt;&lt;/to-top&gt;</code>
</li>
<li>简写方式（直接传值）数组形式 ==&gt; ： props:['flag']</li>
<li>
<p>默认值写法： 对象形式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    props:{
        flag:{
            type:Bollean,
            dafault(){
                return false;
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-tag">props</span>:{
        <span class="hljs-attribute">flag</span>:{
            type:Bollean,
            <span class="hljs-built_in">dafault</span>(){
                return false;
            }
        }
    }</code></pre>
</li>
<li>子组件 ==&gt; 父组件</li>
<li>
<code>v-on</code> 绑定 子组件派发而来的事件</li>
<li>父组件接收： <code> &lt;to-top :flag="toTop" @scrolltoTop="scroll_to"&gt;&lt;/to-top&gt;</code>
</li>
</ul>
<p>-</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
    scroll_to(childmsg){
        //执行 。。。
        childmsg  为子组件向父组件传递的参数
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">methods:</span>{
    scroll_to(childmsg){
        <span class="hljs-comment">//执行 。。。</span>
        childmsg  为子组件向父组件传递的参数
    }
}</code></pre>
<ul><li>
<p>子组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
   xxx(){
       this.$emit('scrolltoTop','aaa向父组件传递的参数')
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>methods:{
   xxx(){
       this.$emit(<span class="hljs-string">'scrolltoTop'</span>,<span class="hljs-string">'aaa向父组件传递的参数'</span>)
   }
}</code></pre>
</li></ul>
<blockquote>注意不能直接使用 $on 监听子组件抛出的事件，而必须在模板里使用 v-on 绑定</blockquote>
<h3 id="articleHeader15">收藏页 ==&gt; vuex</h3>
<ul>
<li>在详情页进行 收藏/取消 操作</li>
<li>将该操作的数据存在 vuex 里，然后存在 localStorage 里，</li>
<li>store.js 里建一个 newsItem字段，值为数组，然后通过 mutations 操作，</li>
<li>向数组里添加或删除元素</li>
<li>在收藏组件里进行渲染</li>
</ul>
<h3 id="articleHeader16">原计划收藏页的新闻是可以 收藏/取消收藏的</h3>
<ul>
<li>收藏 存进vuex，取消收藏从vuex里删除</li>
<li>但今日头条的数据结构感觉有点乱</li>
<li>想着真实开发中，后台肯定会返回一个字段告诉该条新闻本人是否已经收藏过</li>
<li>只做了收藏，暂无取消收藏功能，收藏之后存进 vuex ==&gt; localstorage</li>
<li>bug ==&gt; 同一条新闻可重复收藏</li>
<li>vuex 操作流程</li>
<li>store.js</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{         //数据管理中心
        count:0,
    },
    mutations,     //使用处进行 commit
    getters:{      //外界在此处获得 vuex 数据
        nowTime(state){
            return new Date() - 0 + '-' + state.count;
        }
    }
});
export default store;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations'</span>
Vue.use(Vuex);
<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">state</span>:{         <span class="hljs-comment">//数据管理中心</span>
        count:<span class="hljs-number">0</span>,
    },
    mutations,     <span class="hljs-comment">//使用处进行 commit</span>
    getters:{      <span class="hljs-comment">//外界在此处获得 vuex 数据</span>
        nowTime(state){
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - <span class="hljs-number">0</span> + <span class="hljs-string">'-'</span> + state.count;
        }
    }
});
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;
</code></pre>
<ul><li>mutations.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//全局触发事件
export default {
    increment (state){   // 只有通过此处的方法才能改变vuex 内的数据
        state.count++;
    },
    decrement (state){
        state.count--;
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>//全局触发事件
export <span class="hljs-keyword">default</span> {
    increment (<span class="hljs-keyword">state</span>){   // 只有通过此处的方法才能改变vuex 内的数据
        <span class="hljs-keyword">state</span>.count++;
    },
    decrement (<span class="hljs-keyword">state</span>){
        <span class="hljs-keyword">state</span>.count--;
    },
}</code></pre>
<ul>
<li>使用的时候 引入  <code>import {mapState,mapMutations,mapGetters} from 'vuex'</code>
</li>
<li>然后通过 <code>this.$store</code> 对象进行操作</li>
</ul>
<h3 id="articleHeader17">vuex 待续。。。</h3>
<h3 id="articleHeader18">处理资源</h3>
<ol>
<li>js 引用图片 必须用 import 导入 import logo.png from '相对路径'</li>
<li>放在 src 目录里的文件都是交由 webpack 处理的</li>
<li>放在 static 目录里面的文件 webpack 不会处理，而是在 build 之后，直接拷贝 相应目录里</li>
<li>所以在 项目里如果要引用 static 目录里的文件 必须要使用绝对路径 <code>/static/[filename]</code>
</li>
<li>main.js 里 引用 图片懒加载 的加载中图片时 路径必须为 <code>'./static/img/loading.gif'</code>(我也不知道原因)</li>
</ol>
<ul><li>具体可参考此回答： <a href="https://segmentfault.com/q/1010000009842688">vue static目录资源使用</a>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 模仿今日头条demo

## 原文链接
[https://segmentfault.com/a/1190000010755470](https://segmentfault.com/a/1190000010755470)

