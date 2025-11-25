---
title: 'webpack+vue项目实战（五，监听路由，实现同个页面不同状态的切换）' 
date: 2019-01-09 2:30:12
hidden: true
slug: bw59nhomm0n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>今天发完这一篇，就要这个系列告一段落了！以后如果有什么要补充的会继续补充！因为在后台管理项目上，搭建的话，主要就是这样了！还有的一些是具体到交互的处理，那个是要根据后端的需求，来进来比较细化的工作，我在这里就不说了！说了意义也不大，大家的项目的项目不一样的，细化的工作肯定是不一样的，然后开发的人不一样，对接的工作肯定也是不一样的！所以这个得靠小伙伴自己来处理和学习了！我写这文章的目的，<strong>希望起到的作用是授人以渔，而不是授人以鱼。</strong><br>好了，闲话不多说！今天要说的时利用监听路由的方式，实现同个页面不同状态的切换。具体怎样呢，看下面。</p>
<h2 id="articleHeader1">2.使用路由</h2>
<h3 id="articleHeader2">2-1运用场景</h3>
<p>大家看侧边栏的时候，有一个‘回款管理’和‘待确认回款’。大家都应该知道。这两个页面只是筛选的条件有一个不一样，其他都是一样的。所以没必要弄两个基本一模一样文件。所以还是公用一个文件比较好！但是如果是公用一个文件，那么在vue的生命周期那里，是不会重新渲染页面的。但根据项目的需求，在回款管理’和‘待确认回款’来回切换的时候，有很多数据是要更新的。但是‘回款管理’和‘待确认回款’是同一个文件，在这里来回切换，很多数据没法更新。所以这个时候，就要用到路由了！<br><span class="img-wrap"><img data-src="/img/bVQomx?w=588&amp;h=712" src="https://static.alili.tech/img/bVQomx?w=588&amp;h=712" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">2-2实现过程</h3>
<h4>2-2-1准备步骤</h4>
<p>要实现‘待确认回款’回款也能和‘回款管理’那样切换，就必须要在<code>router.js</code>那里配置一下！</p>
<p><span class="img-wrap"><img data-src="/img/bVQon5?w=1724&amp;h=666" src="https://static.alili.tech/img/bVQon5?w=1724&amp;h=666" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>status是指一个参数，就是利用这个参数，让页面在‘回款管理’和‘待确认回款’这两个这里来回切换。<br>同时，在<code>cashList.vue</code>的data那里也要初始化一个变量(pageStatus)。用来记录当前的时回款管理还是待确认回款！<br><code>router.js</code>配置好了之后，然后去到<code>snav-component.vue</code>。然后在url‘待确认回款’那里，找到<code>menus</code>设置下url，设置一个将要传给status的参数。</p>
<p><span class="img-wrap"><img data-src="/img/bVQooK?w=743&amp;h=119" src="https://static.alili.tech/img/bVQooK?w=743&amp;h=119" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里传的时0，也就是代表着，如果路由的参数上，如果<code>status</code>是等于0的话，就是‘待确认回款’页面，否则就是‘回款管理’页面。<br>详细教程可以参考官网--<a href="https://router.vuejs.org/zh-cn/essentials/getting-started.html" rel="nofollow noreferrer" target="_blank">vue-router</a></p>
<h4>2-2-2监听路由</h4>
<p>从这里开始，操作的页面都是<strong><code>cashList.vue</code></strong>了，小伙伴要注意哦！<br>首先，使用路由，就要监听路由，我们使用<a href="http://cn.vuejs.org/v2/api/#vm-watch" rel="nofollow noreferrer" target="_blank">watch</a>监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
    //监听路由
    $route: {
        handler: function (val, oldVal) {
            //获取路由参数
            let _urlParams = this.$route.params;
            //先清空搜索字段（this.keyFrom）所有属性的值
            for (let key in this.keyFrom) {
                this.keyFrom[key] = null
            }
            //如果路由参数存在，并且参数含有status。
            if (_urlParams &amp;&amp; _urlParams.status) {
                //就把回款状态keyFrom.cashStatus成‘待确认回款’状态！
                this.keyFrom.cashStatus = _urlParams.status;
                //pageStatus小伙伴自己在data定义哦，记录当前状态！
                this.pageStatus = _urlParams.status;
            }
            //添加标签
            this.addTags();
            //更新数组cashList
            this.getList();
        },
        //深度观察监听
        deep: true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>watch: {
    <span class="hljs-comment">//监听路由</span>
    $route: {
        handler: function (<span class="hljs-keyword">val</span>, oldVal) {
            <span class="hljs-comment">//获取路由参数</span>
            let _urlParams = <span class="hljs-keyword">this</span>.$route.params;
            <span class="hljs-comment">//先清空搜索字段（this.keyFrom）所有属性的值</span>
            <span class="hljs-keyword">for</span> (let key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.keyFrom) {
                <span class="hljs-keyword">this</span>.keyFrom[key] = <span class="hljs-literal">null</span>
            }
            <span class="hljs-comment">//如果路由参数存在，并且参数含有status。</span>
            <span class="hljs-keyword">if</span> (_urlParams &amp;&amp; _urlParams.status) {
                <span class="hljs-comment">//就把回款状态keyFrom.cashStatus成‘待确认回款’状态！</span>
                <span class="hljs-keyword">this</span>.keyFrom.cashStatus = _urlParams.status;
                <span class="hljs-comment">//pageStatus小伙伴自己在data定义哦，记录当前状态！</span>
                <span class="hljs-keyword">this</span>.pageStatus = _urlParams.status;
            }
            <span class="hljs-comment">//添加标签</span>
            <span class="hljs-keyword">this</span>.addTags();
            <span class="hljs-comment">//更新数组cashList</span>
            <span class="hljs-keyword">this</span>.getList();
        },
        <span class="hljs-comment">//深度观察监听</span>
        deep: <span class="hljs-literal">true</span>
    }
}</code></pre>
<p>$route.params就是路由的参数，大家要注意理解哦！</p>
<p><span class="img-wrap"><img data-src="/img/bVQqFD?w=1708&amp;h=408" src="https://static.alili.tech/img/bVQqFD?w=1708&amp;h=408" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>2-2-3页面处理</h4>
<p>监听完路由<br>就处理一下，页面上了，有什么处理呢，大家分析下。<br><strong>1.‘待确认回款’页面中，回款状态这个下拉框，是固定的，不定改的，在页面上，就要禁用</strong><br><span class="img-wrap"><img data-src="/img/bVQqGd?w=151&amp;h=507" src="https://static.alili.tech/img/bVQqGd?w=151&amp;h=507" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个很简单，只要绑定disabled属性就可以了，后面的判断就是，只要pageStatus等于0就绑定，路由的参数是字符串的'0',大家也可以pageStatus==0。只要pageStatus等于0，那么页面就是‘待确认回款页面’</p>
<p><span class="img-wrap"><img data-src="/img/bVQqIl?w=1069&amp;h=396" src="https://static.alili.tech/img/bVQqIl?w=1069&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2.进入‘待确认回款’页面中，回款状态的筛选标签要加上。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVQqGn?w=311&amp;h=56" src="https://static.alili.tech/img/bVQqGn?w=311&amp;h=56" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个就是在监听路由的时候已经做了，数组也更新了。</p>
<p><span class="img-wrap"><img data-src="/img/bVQqGH?w=650&amp;h=434" src="https://static.alili.tech/img/bVQqGH?w=650&amp;h=434" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3.‘待确认回款’页面中，重置搜索的时候，其它条件清除，回款状态依然存在。</strong><br>这个其实和监听路由一样的道理，也是一样的做法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resetSearch(){
    //先清空搜索字段keyFrom
    for (let key in this.keyFrom) {
        this.keyFrom[key] = null
    }
    //如果是待确认回款页面，就设置回款状态keyFrom.cashStatus=0
    if (this.pageStatus === &quot;0&quot;) {
        this.keyFrom.cashStatus = '0';
    }
    //添加标签和更新数组
    this.addTags();
    this.getList();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>resetSearch(){
    <span class="hljs-comment">//先清空搜索字段keyFrom</span>
    <span class="hljs-keyword">for</span> (let key <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.keyFrom) {
        <span class="hljs-keyword">this</span>.keyFrom[key] = <span class="hljs-literal">null</span>
    }
    <span class="hljs-comment">//如果是待确认回款页面，就设置回款状态keyFrom.cashStatus=0</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageStatus === <span class="hljs-string">"0"</span>) {
        <span class="hljs-keyword">this</span>.keyFrom.cashStatus = <span class="hljs-string">'0'</span>;
    }
    <span class="hljs-comment">//添加标签和更新数组</span>
    <span class="hljs-keyword">this</span>.addTags();
    <span class="hljs-keyword">this</span>.getList();
}</code></pre>
<p><strong>4.页面标题的改变！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVQqHN?w=267&amp;h=82" src="https://static.alili.tech/img/bVQqHN?w=267&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这个就真的太简单了。根据pageStatus判断就好。</p>
<p><span class="img-wrap"><img data-src="/img/bVQqJv?w=1114&amp;h=113" src="https://static.alili.tech/img/bVQqJv?w=1114&amp;h=113" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">3.总结</h2>
<p>利用路由做的一些小操作，今天就说到这里了！大家也可以想一下，如果不用路由，这个可以怎么实现。路由这里用的也是比较基础的用法。小伙伴可以自行研究下，另外项目上，这些一系列文章，说的也是很大体的一些东西，开发细节上的一些处理，这个要看项目需求，看对接的人等，在这里无法一一说明，得靠小伙伴们自己随机应变的处理。我写这一系列文章，<strong>希望起到的作用的是授人以渔，不是授人以鱼</strong>。希望能对大家有所帮助。<br>到这里，项目实战就到这里高一段落了，但是文章不能停，以后有什么觉得可以分享的，开发了什么有趣的玩意，我会在第一时间分享。让大家一起交流下，一起学习下。<br>最后，还是那句话，有什么写的不好，或者写错了的，欢迎指正，让大家相互学习下，相互帮助下。</p>
<h2 id="articleHeader5">4.往期回顾</h2>
<p><a href="https://segmentfault.com/a/1190000010025189">webpack+vue项目实战（一,搭建运行环境和相关配置）</a><br><a href="https://segmentfault.com/a/1190000010039810" target="_blank">webpack+vue项目实战（二，开发管理系统主页面）</a><br><a href="https://segmentfault.com/a/1190000010053886">webpack+vue项目实战（三，配置功能操作页和组件的按需加载）</a><br><a href="https://segmentfault.com/a/1190000010063757" target="_blank">webpack+vue项目实战（四，前端与后端的数据交互和前端展示数据）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue项目实战（五，监听路由，实现同个页面不同状态的切换）

## 原文链接
[https://segmentfault.com/a/1190000010079980](https://segmentfault.com/a/1190000010079980)

