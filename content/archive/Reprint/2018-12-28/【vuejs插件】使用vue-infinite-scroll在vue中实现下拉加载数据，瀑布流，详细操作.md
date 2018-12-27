---
title: '【vuejs插件】使用vue-infinite-scroll在vue中实现下拉加载数据，瀑布流，详细操作' 
date: 2018-12-28 2:30:10
hidden: true
slug: 4c4waz1ktxr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">在vue中实现下拉加载数据，瀑布流</h1>
<h2 id="articleHeader1">说明</h2>
<blockquote><p>节约流量<br>提高用户体验</p></blockquote>
<p>不至于每次把所有数据加载出来，出现用户等待时间较长</p>
<h2 id="articleHeader2">实现方式</h2>
<h3 id="articleHeader3">需求：</h3>
<p>当用户打开首页的时候显示8条数据，当用户滚动到屏幕可视区边缘的时候，然后触发一个函数，请求一个api加载新的数据，并且填充到之前的数据下面。</p>
<h3 id="articleHeader4">实现：</h3>
<p>vue-infinite-scroll</p>
<p>vue插件:<a href="https://www.npmjs.com/package/vue-infinite-scroll" rel="nofollow noreferrer" target="_blank">vue-infinite-scroll</a><br><a href="https://github.com/ElemeFE/vue-infinite-scroll/" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<h3 id="articleHeader5">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i vue-infinite-scroll -D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> vue-infinite-scroll -D
</code></pre>
<h3 id="articleHeader6">在main.js入口文件里面引入</h3>
<h4>使用CommonJS方式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册全局
var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)
 
//单独的组件里面使用
var infiniteScroll = require('vue-infinite-scroll');
new Vue({
  directives: {infiniteScroll}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 注册全局</span>
<span class="hljs-keyword">var</span> infiniteScroll =  <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-infinite-scroll'</span>);
Vue.<span class="hljs-keyword">use</span>(infiniteScroll)
 
<span class="hljs-comment">//单独的组件里面使用</span>
<span class="hljs-keyword">var</span> infiniteScroll = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-infinite-scroll'</span>);
<span class="hljs-keyword">new</span> Vue({
  directives: {infiniteScroll}
})</code></pre>
<h4>使用 ES2015的方式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注册全局
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
 
//单独的组件里面使用
import infiniteScroll from 'vue-infinite-scroll'
new Vue({
  directives: {infiniteScroll}
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// 注册全局</span>
<span class="hljs-keyword">import</span> infiniteScroll <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-infinite-scroll'</span>
Vue.use(infiniteScroll)
 
<span class="hljs-comment">//单独的组件里面使用</span>
<span class="hljs-keyword">import</span> infiniteScroll <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-infinite-scroll'</span>
<span class="hljs-keyword">new</span> Vue({
  directives: {infiniteScroll}
})</code></pre>
<h2 id="articleHeader7">使用方式</h2>
<p>Use v-infinite-scroll to enable the infinite scroll, and use infinite-scroll-* attributes to define its options.<br>使用v-infinite-scroll启用无限滚动，并使用无限滚动- *属性来定义它的选项。</p>
<p>The method appointed as the value of v-infinite-scroll will be executed when the bottom of the element reaches the bottom of the viewport.</p>
<p>当元素底部到达viewport底部时，将触发v-infinite-scroll值的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-infinite-scroll=&quot;loadMore&quot; infinite-scroll-disabled=&quot;busy&quot; infinite-scroll-distance=&quot;10&quot;>
  ...
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-infinite-scroll</span>=<span class="hljs-string">"loadMore"</span> <span class="hljs-attr">infinite-scroll-disabled</span>=<span class="hljs-string">"busy"</span> <span class="hljs-attr">infinite-scroll-distance</span>=<span class="hljs-string">"10"</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var count = 0;

new Vue({
  el: '#app',
  data: {
    data: [],
    busy: false
  },
  methods: {
    loadMore: function() {
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">data</span>: [],
    <span class="hljs-attr">busy</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">loadMore</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.busy = <span class="hljs-literal">true</span>;

      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, j = <span class="hljs-number">10</span>; i &lt; j; i++) {
          <span class="hljs-keyword">this</span>.data.push({ <span class="hljs-attr">name</span>: count++ });
        }
        <span class="hljs-keyword">this</span>.busy = <span class="hljs-literal">false</span>;
      }, <span class="hljs-number">1000</span>);
    }
  }
});</code></pre>
<h1 id="articleHeader8">选项</h1>
<table>
<thead><tr>
<th>选项</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>infinite-scroll-disabled</td>
<td>如果该属性的值为true，则将禁用无限滚动。</td>
</tr>
<tr>
<td>infinite-scroll-distance</td>
<td>数字(默认值= 0)——在执行v -infinite- scroll方法之前，元素底部和viewport底部之间的最小距离。</td>
</tr>
<tr>
<td>infinite-scroll-immediate-check</td>
<td>布尔值(默认值= true)表示该指令应该在绑定后立即检查。如果可能，内容不够高，不足以填满可滚动的容器。</td>
</tr>
<tr>
<td>infinite-scroll-listen-for-event</td>
<td>当事件在Vue实例中发出时，无限滚动将再次检查。</td>
</tr>
<tr>
<td>infinite-scroll-throttle-delay</td>
<td>下次检查和这次检查之间的间隔(默认值= 200)</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader9">后端实现：</h2>
<h3 id="articleHeader10">需求分析：</h3>
<p>接收参数：</p>
<p>每页有多少条 prePage<br>第几页(当前页) page<br>当我们第一次加载数据的时候加载8条<br>区分第一次和不是第一次加载</p>
<h3 id="articleHeader11">代码实现</h3>
<h4>在dom里面</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;accessory-list-wrap&quot;>
                    <div class=&quot;accessory-list col-4&quot;>
                        <ul>
                            <li v-for=&quot;(item,index) in goods&quot; :key=&quot;index&quot;>
                                <div class=&quot;pic&quot;>
                                    <a href=&quot;#&quot;><img v-lazy=&quot;'/static/img/' + item.productImage&quot; alt=&quot;&quot;></a>
                                </div>
                                <div class=&quot;main&quot;>
                                    <div class=&quot;name&quot;>"{{"item.productName"}}"</div>
                                    <div class=&quot;price&quot;>"{{"item.salePrice"}}"</div>
                                    <div class=&quot;btn-area&quot;>
                                        <a href=&quot;javascript:;&quot; class=&quot;btn btn--m&quot;>加入购物车</a>
                                    </div>
                                </div>
                            </li>
                            <div v-infinite-scroll=&quot;loadMore&quot; infinite-scroll-disabled=&quot;busy&quot; infinite-scroll-distance=&quot;10&quot;>
                            ...
                            </div>
                        </ul>
                    </div>
                </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"accessory-list-wrap"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"accessory-list col-4"</span>&gt;
                        &lt;ul&gt;
                            &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in goods"</span> :key=<span class="hljs-string">"index"</span>&gt;
                                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pic"</span>&gt;
                                    &lt;a href=<span class="hljs-string">"#"</span>&gt;&lt;img v-lazy=<span class="hljs-string">"'/static/img/' + item.productImage"</span> alt=<span class="hljs-string">""</span>&gt;&lt;/a&gt;
                                &lt;/<span class="hljs-keyword">div</span>&gt;
                                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main"</span>&gt;
                                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"name"</span>&gt;"{{"<span class="hljs-built_in">item</span>.productName"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
                                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"price"</span>&gt;"{{"<span class="hljs-built_in">item</span>.salePrice"}}"&lt;/<span class="hljs-keyword">div</span>&gt;
                                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn-area"</span>&gt;
                                        &lt;a href=<span class="hljs-string">"javascript:;"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"btn btn--m"</span>&gt;加入购物车&lt;/a&gt;
                                    &lt;/<span class="hljs-keyword">div</span>&gt;
                                &lt;/<span class="hljs-keyword">div</span>&gt;
                            &lt;/li&gt;
                            &lt;<span class="hljs-keyword">div</span> v-infinite-scroll=<span class="hljs-string">"loadMore"</span> infinite-scroll-disabled=<span class="hljs-string">"busy"</span> infinite-scroll-distance=<span class="hljs-string">"10"</span>&gt;
                            ...
                            &lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;/ul&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h4>vue 组件里面：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
    return{
            busy: true,
        page:1,
        pageSize:8,
    }
},methods:{


 getGoodsList(flag){
                let sort = this.sortFlag ? 1 : -1;
                let param = {
                    sort:sort,
                    priceLevel:this.priceChecked,
                    page:this.page,
                    pageSize:this.pageSize
                }
                axios.get('/goods/list',{params:param}).then(res=>{
                    if(flag){
                        // 多次加载数据
                        this.goods = this.goods.concat(res.data.result);
                        if(res.data.result.length == 0){
                            this.busy = true;
                        }else{
                            this.busy = false;
                        }
                    }else{
                        // 第一次加载数据
                        this.goods = res.data.result;
                        // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                        this.busy = false;
                    }
                })
            },
            loadMore: function() {
                this.busy = true;
                // 多次加载数据
                setTimeout(() => {
                    this.page ++;
                    this.getGoodsList(true);
                }, 1000);
            }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>(){
    <span class="hljs-keyword">return</span>{
            busy: <span class="hljs-literal">true</span>,
        page:<span class="hljs-number">1</span>,
        pageSize:<span class="hljs-number">8</span>,
    }
},methods:{


 getGoodsList(flag){
                let sort = <span class="hljs-keyword">this</span>.sortFlag ? <span class="hljs-number">1</span> : <span class="hljs-number">-1</span>;
                let param = {
                    sort:sort,
                    priceLevel:<span class="hljs-keyword">this</span>.priceChecked,
                    page:<span class="hljs-keyword">this</span>.page,
                    pageSize:<span class="hljs-keyword">this</span>.pageSize
                }
                axios.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/goods/list'</span>,{params:param}).then(res=&gt;{
                    <span class="hljs-keyword">if</span>(flag){
                        <span class="hljs-comment">// 多次加载数据</span>
                        <span class="hljs-keyword">this</span>.goods = <span class="hljs-keyword">this</span>.goods.concat(res.<span class="hljs-keyword">data</span>.result);
                        <span class="hljs-keyword">if</span>(res.<span class="hljs-keyword">data</span>.result.length == <span class="hljs-number">0</span>){
                            <span class="hljs-keyword">this</span>.busy = <span class="hljs-literal">true</span>;
                        }<span class="hljs-keyword">else</span>{
                            <span class="hljs-keyword">this</span>.busy = <span class="hljs-literal">false</span>;
                        }
                    }<span class="hljs-keyword">else</span>{
                        <span class="hljs-comment">// 第一次加载数据</span>
                        <span class="hljs-keyword">this</span>.goods = res.<span class="hljs-keyword">data</span>.result;
                        <span class="hljs-comment">// 当第一次加载数据完之后，把这个滚动到底部的函数触发打开</span>
                        <span class="hljs-keyword">this</span>.busy = <span class="hljs-literal">false</span>;
                    }
                })
            },
            loadMore: function() {
                <span class="hljs-keyword">this</span>.busy = <span class="hljs-literal">true</span>;
                <span class="hljs-comment">// 多次加载数据</span>
                setTimeout(() =&gt; {
                    <span class="hljs-keyword">this</span>.page ++;
                    <span class="hljs-keyword">this</span>.getGoodsList(<span class="hljs-literal">true</span>);
                }, <span class="hljs-number">1000</span>);
            }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let currentPage = parseInt(req.param('page')) > 0 ? parseInt(req.param('page')) : 1;
    let pageSize = parseInt(req.param('pageSize')) > 0 ? parseInt(req.param('pageSize')) : 8;
  // 要跳过多少条
    let skip = (currentPage - 1) * pageSize;

     let goodsModel = Goods.find(param);
    goodsModel.sort({ 'salePrice': sort }).skip(skip).limit(pageSize);

    goodsModel.exec({}, function(err, doc) {
        if (err) {
            res.json({ status: &quot;1&quot;, msg: err.message })
        } else {
            res.json({ status: '0', msg: '', result: doc })
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">let</span> currentPage = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'page'</span>)) &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'page'</span>)) : <span class="hljs-number">1</span>;
    <span class="hljs-keyword">let</span> pageSize = <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageSize'</span>)) &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">parseInt</span>(req.param(<span class="hljs-string">'pageSize'</span>)) : <span class="hljs-number">8</span>;
  <span class="hljs-comment">// 要跳过多少条</span>
    <span class="hljs-keyword">let</span> skip = (currentPage - <span class="hljs-number">1</span>) * pageSize;

     <span class="hljs-keyword">let</span> goodsModel = Goods.find(param);
    goodsModel.sort({ <span class="hljs-string">'salePrice'</span>: sort }).skip(skip).limit(pageSize);

    goodsModel.exec({}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, doc</span>) </span>{
        <span class="hljs-keyword">if</span> (err) {
            res.json({ <span class="hljs-attr">status</span>: <span class="hljs-string">"1"</span>, <span class="hljs-attr">msg</span>: err.message })
        } <span class="hljs-keyword">else</span> {
            res.json({ <span class="hljs-attr">status</span>: <span class="hljs-string">'0'</span>, <span class="hljs-attr">msg</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">result</span>: doc })
        }
    })</code></pre>
<h2 id="articleHeader12">后续会优化</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vuejs插件】使用vue-infinite-scroll在vue中实现下拉加载数据，瀑布流，详细操作

## 原文链接
[https://segmentfault.com/a/1190000011693433](https://segmentfault.com/a/1190000011693433)

