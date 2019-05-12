---
title: 'vue使用mint-ui实现下拉刷新和无限滚动' 
date: 2018-12-27 2:30:13
hidden: true
slug: 7vdo5wrmzj6
categories: [reprint]
---

{{< raw >}}

                    
<p>在开发web-app中，总会遇到v-for出来的li会有很多，当数据达几百上千条的时候，一起加载出来会造成用户体验很差的效果。<br>这时候我们可以使用无限滚动和下拉刷新来实现控制显示的数量，当刷新到底部的边界的时候会触发无限滚动的事件，再次加载一定数量的条目。</p>
<p>还是拿在项目中的功能来举栗子介绍。</p>
<p><span class="img-wrap"><img data-src="/img/bVXkS5?w=258&amp;h=444" src="https://static.alili.tech/img/bVXkS5?w=258&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>有个列表，几千条数据，做分页查询，限制每次显示查询20条，每次拉到最后20条边缘的时候，触发无限滚动，这时候会出现加载图标，继续加载后续20条数据，加载到最后的时候会提示数据“加载完毕”。<br><span class="img-wrap"><img data-src="/img/bVXkTe?w=589&amp;h=476" src="https://static.alili.tech/img/bVXkTe?w=589&amp;h=476" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>项目的ui使用的mint-ui，所以使用的无限滚动也是mint-ui里面的，详细参考<a href="http://mint-ui.github.io/docs/#/zh-cn2/infinite-scroll" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<p>接下来给大家介绍代码实现：<br>1、为元素添加 v-infinite-scroll 指令即可使用无限滚动。滚动该元素，当其底部与被滚动元素底部的距离小于给定的阈值（通过 infinite-scroll-distance 设置）时，绑定到 v-infinite-scroll 指令的方法就会被触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--ul里面几个scoller就是无限滚动的几个api-->
<ul class=&quot;mui-table-view&quot; v-infinite-scroll=&quot;loadMore&quot; infinite-scroll-disabled=&quot;moreLoading&quot; infinite-scroll-distance=&quot;0&quot; infinite-scroll-immediate-check=&quot;false&quot;>
  <!--li数据遍历循环部分-->
  <li class=&quot;mui-table-view-cell&quot; v-for=&quot;item in list&quot;>
    <a class=&quot;mui-navigate-right&quot;>
      <span class=&quot;mui-pull-left&quot;>"{{"item.name"}}"</span>
      <span class=&quot;mui-pull-right&quot;>"{{"item.date.substring(0,10)"}}"</span>
    </a>
  </li>
  <!--底部判断是加载图标还是提示“全部加载”-->
  <li class=&quot;more_loading&quot; v-show=&quot;!queryLoading&quot;>
    <mt-spinner type=&quot;snake&quot; color=&quot;#00ccff&quot; :size=&quot;20&quot; v-show=&quot;moreLoading&amp;&amp;!allLoaded&quot;></mt-spinner>
    <span v-show=&quot;allLoaded&quot;>已全部加载</span>
  </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!--ul里面几个scoller就是无限滚动的几个api--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-table-view"</span> <span class="hljs-attr">v-infinite-scroll</span>=<span class="hljs-string">"loadMore"</span> <span class="hljs-attr">infinite-scroll-disabled</span>=<span class="hljs-string">"moreLoading"</span> <span class="hljs-attr">infinite-scroll-distance</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">infinite-scroll-immediate-check</span>=<span class="hljs-string">"false"</span>&gt;</span>
  <span class="hljs-comment">&lt;!--li数据遍历循环部分--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-table-view-cell"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-navigate-right"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-pull-left"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mui-pull-right"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.date.substring(0,10)"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-comment">&lt;!--底部判断是加载图标还是提示“全部加载”--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"more_loading"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!queryLoading"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mt-spinner</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"snake"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#00ccff"</span> <span class="hljs-attr">:size</span>=<span class="hljs-string">"20"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"moreLoading&amp;&amp;!allLoaded"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-spinner</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"allLoaded"</span>&gt;</span>已全部加载<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>2、script部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  export default {
    data() {
      return {
        //初始化无限加载相关参数
        queryLoading: false,
        moreLoading: false,
        allLoaded: false,
        totalNum: 0,
        pageSize: 20,
        pageNum: 1,
      }
    },
    computed: {
      params() {
        return{
          //这里先定义要传递给后台的数据
          //然后将每次请求20条的参数一起提交给后台
          pageSize: this.pageSize
          }
      }
    },
    methods: {
      //无限加载函数
      loadMore() {
        if(this.allLoaded){
          this.moreLoading = true;
          return;
        }
        if(this.queryLoading){
          return;
        }
        this.moreLoading = !this.queryLoading;
        this.pageNum++;
        this.$http.post(&quot;请求后台数据的接口&quot;,Object.assign({pageNum:this.pageNum},this.params)).then((res) => {
          if(res.sData &amp;&amp; res.sData.list){
            this.list = this.list.concat(res.sData.list);
            this.allLoaded = this.debtList.length==this.totalNum;
          }
          this.moreLoading = this.allLoaded;
        });
      }
    },
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script&gt;
  export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">data</span>() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">//初始化无限加载相关参数</span>
        queryLoading: <span class="hljs-literal">false</span>,
        moreLoading: <span class="hljs-literal">false</span>,
        allLoaded: <span class="hljs-literal">false</span>,
        totalNum: <span class="hljs-number">0</span>,
        pageSize: <span class="hljs-number">20</span>,
        pageNum: <span class="hljs-number">1</span>,
      }
    },
    computed: {
      params() {
        <span class="hljs-keyword">return</span>{
          <span class="hljs-comment">//这里先定义要传递给后台的数据</span>
          <span class="hljs-comment">//然后将每次请求20条的参数一起提交给后台</span>
          pageSize: <span class="hljs-keyword">this</span>.pageSize
          }
      }
    },
    methods: {
      <span class="hljs-comment">//无限加载函数</span>
      loadMore() {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.allLoaded){
          <span class="hljs-keyword">this</span>.moreLoading = <span class="hljs-literal">true</span>;
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.queryLoading){
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.moreLoading = !<span class="hljs-keyword">this</span>.queryLoading;
        <span class="hljs-keyword">this</span>.pageNum++;
        <span class="hljs-keyword">this</span>.$http.post(<span class="hljs-string">"请求后台数据的接口"</span>,Object.assign({pageNum:<span class="hljs-keyword">this</span>.pageNum},<span class="hljs-keyword">this</span>.params)).then((res) =&gt; {
          <span class="hljs-keyword">if</span>(res.sData &amp;&amp; res.sData.list){
            <span class="hljs-keyword">this</span>.list = <span class="hljs-keyword">this</span>.list.concat(res.sData.list);
            <span class="hljs-keyword">this</span>.allLoaded = <span class="hljs-keyword">this</span>.debtList.length==<span class="hljs-keyword">this</span>.totalNum;
          }
          <span class="hljs-keyword">this</span>.moreLoading = <span class="hljs-keyword">this</span>.allLoaded;
        });
      }
    },
  }
&lt;/script&gt;</code></pre>
<p>到这里就可以实现无限滚动了，这里结合了mint-ui的<a href="http://mint-ui.github.io/docs/#/zh-cn2/infinite-scroll" rel="nofollow noreferrer" target="_blank">Infinite scroll</a>和<a href="http://mint-ui.github.io/docs/#/zh-cn2/spinner" rel="nofollow noreferrer" target="_blank">Spinner</a></p>
<p>谢谢大家的阅读，若是觉得有用，请不要吝啬，赏赐小的一个赞！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue使用mint-ui实现下拉刷新和无限滚动

## 原文链接
[https://segmentfault.com/a/1190000011719169](https://segmentfault.com/a/1190000011719169)

