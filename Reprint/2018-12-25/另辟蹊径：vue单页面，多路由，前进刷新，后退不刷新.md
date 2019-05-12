---
title: '另辟蹊径：vue单页面，多路由，前进刷新，后退不刷新' 
date: 2018-12-25 2:30:11
hidden: true
slug: 397c8kh1eta
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>目的：vue-cli构建的vue单页面应用，某些特定的页面，实现前进刷新，后退不刷新，类似app般的用户体验。<br>注：　此处的刷新特指当进入此页面时，触发ajax请求，向服务器获取数据。不刷新特指当进入此页面时，不触发ajax请求，而是使用之前缓存的数据，以便减少服务器请求，用户体验更流畅。</p></blockquote>
<h3 id="articleHeader0">项目需求：</h3>
<p>任何技术的探索，都来自项目的需求。之前经手的一个项目是微信端商城，使用的是传统的mvc模式，利用的是jq+js，因此对于商城的项目需求比较熟悉。目前在学习vue，练手一个商城，遇到之前经常提及而无法很好解决的需求。有些页面需要前进刷新，后退不刷新。比如，从商城的【首页】--&gt;【详情页】--&gt;【订单提交页】，每次打开新页面都需要获取新数据，但是按下返回键后，就不需要再获取新数据了，而滚动条还保留在之前的位置。最常见的操作是从【首页】--&gt;【详情页】，然后在从【详情页】--&gt;【首页】，如此反复。<br>实例如图：<br><span class="img-wrap"><img data-src="/img/bVYPIY?w=377&amp;h=672" src="https://static.alili.tech/img/bVYPIY?w=377&amp;h=672" alt="首页" title="首页" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYPIn?w=381&amp;h=671" src="https://static.alili.tech/img/bVYPIn?w=381&amp;h=671" alt="详情页" title="详情页" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVYPIw?w=374&amp;h=671" src="https://static.alili.tech/img/bVYPIw?w=374&amp;h=671" alt="订单提交页" title="订单提交页" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">前人经验：</h3>
<p>前人栽树，后人好乘凉。技术圈的分享一直都在蓬勃发展。遇到问题，我们可以尽情去搜索，去寻找大佬的足迹。针对上述需求，看到一个分享<a href="http://www.jianshu.com/p/0b0222954483" rel="nofollow noreferrer" target="_blank">vue-router 之 keep-alive</a>，比较符合我的需求，但是使用到我的项目上发现，稍微有点不适合。此分享技术要点，比较适合两个页面之前的跳转，返回。而我的页面是多个路由（2+）之间的跳转，返回。无奈，只能去自己探索发现。不过此技术要点给了我很好的启发，特此感谢作者。@ RoamIn</p>
<h3 id="articleHeader2">实现思路：</h3>
<p>注：demo中，index页面包含三个链接导航。page1--&gt;page2--&gt;page3.依次前进，每次前进到一个新页面都需要获取数据，而按下后退键后，从page3返回到page2，page2不再获取新数据，而是使用之前缓存的数据。从page2返回到page1时，page1不再获取新数据，而是使用之前的数据。所以，page1和page2需要缓存，page3不需要缓存。可以把page1想象成首页，page2想象成详情页，page3想象成订单提交页。这样方便理解。</p>
<ul>
<li>
<h4>利用keep-alive 缓存需要缓存的页面</h4>
<ul>
<li>
<p>在app.vue中改写router-view</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
    <router-view v-if=&quot;$route.meta.keepAlive&quot;>
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
    </router-view>
</keep-alive>

<router-view v-if=&quot;!$route.meta.keepAlive&quot;>
    <!-- 这里是不被缓存的视图组件，比如 page3 -->
</router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"$route.meta.keepAlive"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 这里是会被缓存的视图组件，比如 page1,page2 --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!$route.meta.keepAlive"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 这里是不被缓存的视图组件，比如 page3 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></code></pre>
</li>
<li>
<p>在router/index.js中添加<a href="https://router.vuejs.org/zh-cn/advanced/meta.html" rel="nofollow noreferrer" target="_blank">路由元信息</a>，设置需要缓存的页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes: [{
        path: '/',
        name: 'index',
        component: index,
        meta: {
            keepAlive: false, //此组件不需要被缓存
        }
    },
    {
        path: '/page1',
        name: 'page1',
        component: page1,
        meta: {
            keepAlive: true, //此组件需要被缓存
            
        }
    },
    {
        path: '/page2',
        name: 'page2',
        component: page2,
        meta: {
            keepAlive: true, // 此组件需要被缓存
           
        }
    },
    {
        path: '/page3',
        name: 'page3',
        component: page3,
        meta: {
            keepAlive: false, // 此组件不需要被缓存
        }
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">routes</span>: [{
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attribute">component</span>: index,
        <span class="hljs-attribute">meta</span>: {
            <span class="hljs-attribute">keepAlive</span>: false, <span class="hljs-comment">//此组件不需要被缓存</span>
        }
    },
    {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/page1'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'page1'</span>,
        <span class="hljs-attribute">component</span>: page1,
        <span class="hljs-attribute">meta</span>: {
            <span class="hljs-attribute">keepAlive</span>: true, <span class="hljs-comment">//此组件需要被缓存</span>
            
        }
    },
    {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/page2'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'page2'</span>,
        <span class="hljs-attribute">component</span>: page2,
        <span class="hljs-attribute">meta</span>: {
            <span class="hljs-attribute">keepAlive</span>: true, <span class="hljs-comment">// 此组件需要被缓存</span>
           
        }
    },
    {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/page3'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'page3'</span>,
        <span class="hljs-attribute">component</span>: page3,
        <span class="hljs-attribute">meta</span>: {
            <span class="hljs-attribute">keepAlive</span>: false, <span class="hljs-comment">// 此组件不需要被缓存</span>
        }
    }
]</code></pre>
</li>
<li>
<p>钩子函数的执行顺序</p>
<ul>
<li><p>不使用keep-alive<br> beforeRouteEnter --&gt; created --&gt; mounted --&gt; destroyed</p></li>
<li><p>使用keep-alive<br> beforeRouteEnter --&gt; created --&gt; mounted --&gt; activated --&gt; deactivated<br> 再次进入缓存的页面，只会触发beforeRouteEnter --&gt;activated --&gt; deactivated 。created和mounted不会再执行。我们可以利用不同的钩子函数，做不同的事。<strong>务必理解上述钩子函数的执行时机和执行顺序，本教程的核心就依赖于此钩子函数</strong><br><em>activated和deactivated是使用keep-alive后，vue中比较重要的两个钩子函数，建议详细了解下</em>。</p></li>
</ul>
</li>
</ul>
</li>
<li>
<h4>需缓存的页面的写法</h4>
<p>注：demo中的page1和page2，这两个页面都需要缓存，思路一样，以下以page1为例，page2不再赘述。<br>示例文件：<em>components/page1.vue</em></p>
<ul><li><p>data中初始化一个str字符串，存放从后台获取的数据</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     data() {
       return {
         msg: &quot;我是第一个页面&quot;,
         str: &quot;&quot;  // 加载页面后执行获取数据的方法，插入到此
       };
     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>     data() {
       <span class="hljs-class">return </span>{
<span class="hljs-symbol">         msg:</span> <span class="hljs-string">"我是第一个页面"</span>,
<span class="hljs-symbol">         str:</span> <span class="hljs-string">""</span>  <span class="hljs-comment">// 加载页面后执行获取数据的方法，插入到此</span>
       };
     }</code></pre>
<ul><li><p>methods中创建一个方法，模拟从后台获取数据</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     methods: {
       getData() {
         // getData方法，模拟从后台请求数据
         this.str = &quot;我是通过调用方法加载的数据。。。&quot;;
       }
     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>     methods: {
       getData() {
         <span class="hljs-comment">// getData方法，模拟从后台请求数据</span>
         <span class="hljs-keyword">this</span>.<span class="hljs-keyword">str</span> = <span class="hljs-string">"我是通过调用方法加载的数据。。。"</span>;
       }
     }</code></pre>
<ul>
<li>
<p>修改router/index.js中的配置</p>
<ul>
<li><p>每次进入页面，我们都需要知晓是从哪个页面进来的，用以判断是否需要获取数据。以这个page1页面为例，当我们知晓是从page2过来的，我们就可以认为是用户操作了返回键，这时page1页面就不需要再获取新数据了，使用之前缓存的数据就可以了。如果是从别的页面过来的，我们就需要获取数据。</p></li>
<li><p>我们可以通过<a href="https://router.vuejs.org/zh-cn/advanced/navigation-guards.html" rel="nofollow noreferrer" target="_blank">beforeRouteEnter</a>这个钩子函数中的from参数判断是从哪个页面过来的，这个参数执行时，组件实例还没创建，所有不能在data中定义变量。我们可以在路由中定义一个变量，用来判断。</p></li>
<li><p>在router/index.js的meta中添加isBack变量，默认false</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     {
          path: '/page1',
          name: 'page1',
          component: page1,
          meta: {
              keepAlive: true, //此组件需要被缓存
              isBack:false, //用于判断上一个页面是哪个
          }
      },
      {
          path: '/page2',
          name: 'page2',
          component: page2,
          meta: {
              keepAlive: true, // 此组件需要被缓存
              isBack:false, //用于判断上一个页面是哪个
          }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>     {
          <span class="hljs-attribute">path</span>: <span class="hljs-string">'/page1'</span>,
          <span class="hljs-attribute">name</span>: <span class="hljs-string">'page1'</span>,
          <span class="hljs-attribute">component</span>: page1,
          <span class="hljs-attribute">meta</span>: {
              <span class="hljs-attribute">keepAlive</span>: true, <span class="hljs-comment">//此组件需要被缓存</span>
              <span class="hljs-attribute">isBack</span>:false, <span class="hljs-comment">//用于判断上一个页面是哪个</span>
          }
      },
      {
          <span class="hljs-attribute">path</span>: <span class="hljs-string">'/page2'</span>,
          <span class="hljs-attribute">name</span>: <span class="hljs-string">'page2'</span>,
          <span class="hljs-attribute">component</span>: page2,
          <span class="hljs-attribute">meta</span>: {
              <span class="hljs-attribute">keepAlive</span>: true, <span class="hljs-comment">// 此组件需要被缓存</span>
              <span class="hljs-attribute">isBack</span>:false, <span class="hljs-comment">//用于判断上一个页面是哪个</span>
          }
      },</code></pre>
</li>
<li>
<p>beforeRouteEnter中判断是从哪个页面过来的</p>
<ul><li><p>判断是从哪个路由过来的，如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html
      // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
      // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html
      if(from.name=='page2'){
          to.meta.isBack=true;
          //判断是从哪个路由过来的，
          //如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
      }
  
      next();
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>    beforeRouteEnter(<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, next) {
      <span class="hljs-comment">// 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）</span>
      <span class="hljs-comment">// 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html</span>
      <span class="hljs-comment">// 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack</span>
      <span class="hljs-comment">// 参考 https://router.vuejs.org/zh-cn/advanced/meta.html</span>
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">from</span>.<span class="hljs-built_in">name</span>==<span class="hljs-string">'page2'</span>){
          <span class="hljs-keyword">to</span>.meta.isBack=<span class="hljs-literal">true</span>;
          <span class="hljs-comment">//判断是从哪个路由过来的，</span>
          <span class="hljs-comment">//如果是page2过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可</span>
      }
  
      next();
    },</code></pre>
</li>
<li>
<p>activated中执行getData这个获取数据的方法</p>
<ul><li>
<p>因为这个页面需要缓存。只有第一次进入时才会执行created和mounted方法，再次进入就不执行了。而activated每次进入都执行，所以在这个钩子函数中获取数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="activated() {
  if(!this.$route.meta.isBack){
    // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
    this.getData();
  }
  // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
  this.$route.meta.isBack=false

}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>activated() {
  <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.$route.meta.isBack){
    <span class="hljs-comment">// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据</span>
    <span class="hljs-keyword">this</span>.getData();
  }
  <span class="hljs-comment">// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据</span>
  <span class="hljs-keyword">this</span>.$route.meta.isBack=<span class="hljs-literal">false</span>

},</code></pre>
</li></ul>
</li>
<li>
<p>这样就可以了？</p>
<ul>
<li><p>当这样设置完毕后，你执行起来，貌似是可以了。第一次进入page1，能获取新数据，从page2返回时，不再获取新数据了，而是使用之前缓存的数据。但这样还有一个问题，当用户从page1进入page2后，因为某种原因，手动刷新了page2的页面。这时再返回到page1，发现之前缓存的数据丢失了，而且也没有再重新获取。所以我们还需要再添加一个判断条件，当用户手动刷新页面后，再返回时就需要重新获取数据了。</p></li>
<li><p>如何添加这个条件，判断用户是否刷新了页面呢？我们知道，当使用keep-alive后，只有第一次进入后会触发created钩子函数，再次进入就不再执行了。当用户刷新了页面，这个钩子函数就会又执行，所以，我们可以利用这个小技巧来做点文章。</p></li>
<li>
<p>data中定义变量isFirstEnter用来判断是否第一次进入，或是否刷新了页面，默认false</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   data() {
     return {
       msg: &quot;我是第一个页面&quot;,
       str: &quot;&quot;,  // 加载页面后执行获取数据的方法，插入到此
       isFirstEnter:false // 是否第一次进入，默认false
     };
   }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>   data() {
     <span class="hljs-class">return </span>{
<span class="hljs-symbol">       msg:</span> <span class="hljs-string">"我是第一个页面"</span>,
<span class="hljs-symbol">       str:</span> <span class="hljs-string">""</span>,  <span class="hljs-comment">// 加载页面后执行获取数据的方法，插入到此</span>
<span class="hljs-symbol">       isFirstEnter:</span>false <span class="hljs-comment">// 是否第一次进入，默认false</span>
     };
   },</code></pre>
</li>
<li>
<p>created中把isFirstEnter变为true，说明是第一次进入或刷新了页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   created() {
     this.isFirstEnter=true;
     // 只有第一次进入或者刷新页面后才会执行此钩子函数
     // 使用keep-alive后（2+次）进入不会再执行此钩子函数
   }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>   created() {
     <span class="hljs-keyword">this</span>.isFirstEnter=<span class="hljs-literal">true</span>;
     <span class="hljs-comment">// 只有第一次进入或者刷新页面后才会执行此钩子函数</span>
     <span class="hljs-comment">// 使用keep-alive后（2+次）进入不会再执行此钩子函数</span>
   },</code></pre>
</li>
<li>
<p>activated中增加判断条件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   activated() {
     if(!this.$route.meta.isBack || this.isFirstEnter){
         // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
         // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
         this.str=''// 把数据清空，可以稍微避免让用户看到之前缓存的数据
         this.getData();
     }
     // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
     this.$route.meta.isBack=false
     // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
     this.isFirstEnter=false;
 
   }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>   activated() {
     <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.$route.meta.isBack || <span class="hljs-keyword">this</span>.isFirstEnter){
         <span class="hljs-comment">// 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据</span>
         <span class="hljs-comment">// 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据</span>
         <span class="hljs-keyword">this</span>.str=<span class="hljs-string">''</span><span class="hljs-comment">// 把数据清空，可以稍微避免让用户看到之前缓存的数据</span>
         <span class="hljs-keyword">this</span>.getData();
     }
     <span class="hljs-comment">// 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据</span>
     <span class="hljs-keyword">this</span>.$route.meta.isBack=<span class="hljs-literal">false</span>
     <span class="hljs-comment">// 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据</span>
     <span class="hljs-keyword">this</span>.isFirstEnter=<span class="hljs-literal">false</span>;
 
   },</code></pre>
</li>
<li><p>这样应该就可以了</p></li>
</ul>
</li>
</ul>
</li>
<li>
<h4>不需要缓存页面的写法</h4>
<p>注：demo中的page3，这个页面不需要缓存，该怎么写就怎么写，不需要做特别的设置。</p>
</li>
</ul>
<h3 id="articleHeader3">其它设置：</h3>
<p>使用keep-alive后，可能有点小问题：第二个页面可能继承第一个页面的滚动条的高度。（在我项目中遇到的）<br>比如：page1向下滚动后，再进入page2，这时page2的滚动条可能是之前的高度，可能不会在顶部。</p>
<ul>
<li><p>解决方法一<br>每次离开记录滚动条的高度，再次进入时根据项目需要再恢复之前的高度，或者置顶。</p></li>
<li>
<p>解决方法二（推荐）<br>router/index.js中添加如下代码（如不理解，请看参考链接）<br>参考：<a href="https://router.vuejs.org/zh-cn/essentials/history-mode.html" rel="nofollow noreferrer" target="_blank">HTML5 History 模式</a>　　　　　<a href="https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html" rel="nofollow noreferrer" target="_blank">滚动行为</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          return {
              x: 0,
              y: 0
          }
      }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  mode: <span class="hljs-string">'history'</span>,
  scrollBehavior(to, from, savedPosition) {
      <span class="hljs-keyword">if</span> (savedPosition) {
          <span class="hljs-keyword">return</span> savedPosition
      } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> {
              x: <span class="hljs-number">0</span>,
              y: <span class="hljs-number">0</span>
          }
      }
  }</code></pre>
</li>
</ul>
<h3 id="articleHeader4">疑问点：</h3>
<p>在此次demo练习中，打印了一下钩子函数的执行顺序，发现一个疑问点(我对钩子函数理解也很浅显)：<br>从page1进入page2时，先执行了page2的beforeRouteEnter和created方法，然后才执行page1的deactivated方法。<br>所以我把这两个初始化设置，放在了activated里面，而没有放在deactivated中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.$route.meta.isBack=false;
    this.isFirstEnter=false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-keyword">this</span>.$route.meta.isBack=<span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>.isFirstEnter=<span class="hljs-literal">false</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVYRj2?w=296&amp;h=244" src="https://static.alili.tech/img/bVYRj2?w=296&amp;h=244" alt="钩子函数执行顺序" title="钩子函数执行顺序" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">结束语：</h3>
<p>为了解决这个前进刷新后退不刷新问题，让我整整苦恼了一周时间，想了很多方法，也没能解决。最后综合各个大佬经验，试验了很多次，才归结出这个比较‘low’的方法。<br>目前，我也是vue小白，也在探索着前进，如果这个方法能解决你遇到的难题，我很高兴。如果你认为的确很low，求轻喷。<br>demo在下方的GitHub中，欢迎star。<br>也欢迎大家提供意见和建议，谢谢大家</p>
<h2 id="articleHeader6"><a href="https://github.com/bingyang519/vueGoBack" rel="nofollow noreferrer" target="_blank">GitHub</a></h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
另辟蹊径：vue单页面，多路由，前进刷新，后退不刷新

## 原文链接
[https://segmentfault.com/a/1190000012083511](https://segmentfault.com/a/1190000012083511)

