---
title: '从 0 开始，vue 项目实战（二）' 
date: 2019-01-29 2:30:10
hidden: true
slug: x3eq24su2mi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在 <a href="https://segmentfault.com/a/1190000007663659">上一篇文章</a> ，已经搭建好所需要的开发环境了,接下来让开发一个简单的项目吧。<br>关于 less 我就不贴代码了。</p>
<p><a href="https://github.com/viewweiwu/menu" rel="nofollow noreferrer" target="_blank">源码地址</a></p>
<h2 id="articleHeader1">正题</h2>
<p>先对默认的文件进行改造一下。<br>删除了默认的 App.vue、Hello.vue。<br>然后加了一个 list.vue。<br>修改一下main.js<br>然后看到页面打印出一个 “列表页” 三个字的时候，就表示成功了。</p>
<p><span class="img-wrap"><img data-src="/img/bVGtiD?w=1033&amp;h=505" src="https://static.alili.tech/img/bVGtiD?w=1033&amp;h=505" alt="列表页1" title="列表页1" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVGtiM?w=976&amp;h=497" src="https://static.alili.tech/img/bVGtiM?w=976&amp;h=497" alt="列表页2" title="列表页2" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">1、实例1</h3>
<p>先弄个最简单的实例看看是不是能跑起来。<br><span class="img-wrap"><img data-src="/img/bVGtmJ?w=1269&amp;h=715" src="https://static.alili.tech/img/bVGtmJ?w=1269&amp;h=715" alt="列表页3" title="列表页3" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="so easy。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">so</span> easy。
</code></pre>
<h3 id="articleHeader3">2、实例2</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="接下来弄个有动态数据的列表，就是这篇文章的主菜，
大概效果长这样。
1.上一页
2.下一页
3.分类" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>接下来弄个有动态数据的列表，就是这篇文章的主菜，
大概效果长这样。
<span class="hljs-number">1.</span>上一页
<span class="hljs-number">2.</span>下一页
<span class="hljs-number">3.</span>分类</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGOz6?w=515&amp;h=692" src="https://static.alili.tech/img/bVGOz6?w=515&amp;h=692" alt="列表页4" title="列表页4" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">3、导入</h3>
<p>先装上我们需要的东西。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm i mint-ui -D
cnpm i vue-router -D
cnpm i less less-loader -S
cnpm i jquery -S

mint-ui => 组件库，暂时只用到了其中的loading
vue-router => 路由
less => css的预处理器
jquery => 老朋友

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>cnpm <span class="hljs-selector-tag">i</span> mint-ui -D
cnpm <span class="hljs-selector-tag">i</span> vue-router -D
cnpm <span class="hljs-selector-tag">i</span> less less-loader -S
cnpm <span class="hljs-selector-tag">i</span> jquery -S

mint-ui =&gt; 组件库，暂时只用到了其中的loading
vue-router =&gt; 路由
less =&gt; css的预处理器
jquery =&gt; 老朋友

</code></pre>
<h3 id="articleHeader5">4、配置</h3>
<p><strong>路由（vue-router）</strong>：现在只有一个列表页，那就只写一个列表页的路径，配置    文件放在跟 main.js 同级的地方。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path: '/list',
    name: 'list',
    component: List
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">path</span>: <span class="hljs-string">'/list'</span>,
    name: <span class="hljs-string">'list'</span>,
    component: List
}</code></pre>
<p>关于 vue-router 更多的信息，<a href="https://router.vuejs.org/" rel="nofollow noreferrer" target="_blank">点这里</a><br><span class="img-wrap"><img data-src="/img/bVGYR3?w=877&amp;h=409" src="https://static.alili.tech/img/bVGYR3?w=877&amp;h=409" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果有更多页面需要配置的地方，比如编辑页，详情页之类的在这里添加就对了。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>如果有更多页面需要配置的地方，比如编辑页，详情页之类的在这里添加就对了。
</code></pre>
<p><strong>入口（main.js）</strong>: 函数入口，改了一下之前的配置。</p>
<p><span class="img-wrap"><img data-src="/img/bVGYS8?w=757&amp;h=449" src="https://static.alili.tech/img/bVGYS8?w=757&amp;h=449" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">5、列表页结构</h3>
<p>页面分为了三层，所以对应的页面也有三层。<br><span class="img-wrap"><img data-src="/img/bVG0mt?w=802&amp;h=786" src="https://static.alili.tech/img/bVG0mt?w=802&amp;h=786" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVG0nf?w=930&amp;h=764" src="https://static.alili.tech/img/bVG0nf?w=930&amp;h=764" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">6、列表页代码</h3>
<p>分类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;type-pnl&quot;>
    <ul class=&quot;type-list&quot;>
        <li v-for=&quot;type in types&quot; @click=&quot;onTabSelect(type.value)&quot; :key=&quot;type.value&quot;>"{{"type.text"}}"</li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"type-pnl"</span>&gt;
    &lt;ul <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"type-list"</span>&gt;
        &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"type in types"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"onTabSelect(type.value)"</span> :key=<span class="hljs-string">"type.value"</span>&gt;"{{"<span class="hljs-class"><span class="hljs-keyword">type</span>.<span class="hljs-title">text</span>"}}"<span class="hljs-title">&lt;/li&gt;</span></span>
    &lt;/ul&gt;
&lt;/div&gt;</code></pre>
<p>循环列表，展示内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;list-container&quot;>
    <li v-for=&quot;(item, i) in list&quot; :key=&quot;item.id&quot;>
        <span class=&quot;index&quot; :title=&quot;i + 1&quot;>"{{"(i + 1) > 9999 ? &quot;...&quot; : (i + 1)"}}"</span>
        <span class=&quot;face&quot;>
            <img :src=&quot;item.author.avatar_url&quot; alt=&quot;&quot; :title=&quot;item.author.loginname&quot;/>
        </span>
        <span :class=&quot;{type: item.tab, good: item.good}&quot; v-if=&quot;item.tab&quot;>"{{"item.tab | tab"}}"</span>
        <span class=&quot;name&quot; :title=&quot;item.title&quot;>"{{"item.title"}}"</span>
    </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, i) in list"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"i + 1"</span>&gt;</span></span><span class="hljs-template-variable">"{{"(i + 1) &gt; 9999 ? "..." : (i + 1)}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item.author.avatar_url"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"item.author.loginname"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{type: item.tab, good: item.good}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"item.tab"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.tab | tab}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"item.title"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span></code></pre>
<p>分页</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;load-more&quot;>
    <span class=&quot;prev&quot; @click=&quot;prev&quot; v-show=&quot;page != 1&quot;>上一页</span>
    <span class=&quot;next&quot; @click=&quot;next&quot;>下一页</span>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"load-more"</span>&gt;
    &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"prev"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"prev"</span> v-show=<span class="hljs-string">"page != 1"</span>&gt;上一页&lt;/span&gt;
    &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"next"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"next"</span>&gt;下一页&lt;/span&gt;
&lt;/div&gt;</code></pre>
<p>mounted 做了三件事：<br>1.从路由获取数据，也就是从地址栏里面获取 分类 和 页数。<br>2.请求列表数据<br>3.设置 分类 的数据</p>
<p>之所以在mounted里面设置 分类 的数据，是因为不想data里面数据太乱。 如果把 请求数据那一段话注释掉的话，就可以看到 分类 的数据了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
    // 设置默认页数
    this.page = parseInt(this.$route.query.page) || 1;
    // 设置默认分类
    this.tab = this.$route.query.tab;
    // 请求数据
    this.getData();
    // 设置默认头部分类
    this.types = [{
        text: &quot;全部&quot;,
        value: &quot;&quot;
    }, {
        text: &quot;精华&quot;,
        value: &quot;good&quot;
    }, {
        text: &quot;分享&quot;,
        value: &quot;share&quot;
    }, {
        text: &quot;招聘&quot;,
        value: &quot;job&quot;
    }, {
        text: &quot;回答&quot;,
        value: &quot;ask&quot;
    }];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>mounted() {
    <span class="hljs-comment">// 设置默认页数</span>
    <span class="hljs-keyword">this</span>.page = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.$route.query.page) || <span class="hljs-number">1</span>;
    <span class="hljs-comment">// 设置默认分类</span>
    <span class="hljs-keyword">this</span>.tab = <span class="hljs-keyword">this</span>.$route.query.tab;
    <span class="hljs-comment">// 请求数据</span>
    <span class="hljs-keyword">this</span>.getData();
    <span class="hljs-comment">// 设置默认头部分类</span>
    <span class="hljs-keyword">this</span>.types = [{
        <span class="hljs-built_in">text</span>: <span class="hljs-string">"全部"</span>,
        value: <span class="hljs-string">""</span>
    }, {
        <span class="hljs-built_in">text</span>: <span class="hljs-string">"精华"</span>,
        value: <span class="hljs-string">"good"</span>
    }, {
        <span class="hljs-built_in">text</span>: <span class="hljs-string">"分享"</span>,
        value: <span class="hljs-string">"share"</span>
    }, {
        <span class="hljs-built_in">text</span>: <span class="hljs-string">"招聘"</span>,
        value: <span class="hljs-string">"job"</span>
    }, {
        <span class="hljs-built_in">text</span>: <span class="hljs-string">"回答"</span>,
        value: <span class="hljs-string">"ask"</span>
    }];
}</code></pre>
<p>methods 里面添加 getData() 方法，将 ajax 请求回来的数据保存到 list 数据，然后把页面滚到顶层，这样子就能够看到数据了。<br>至于 common.ajaxGet() 方法，我吧所有的 ajax 请求进行了封装到公共方法里面了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getData() {
    // 打开loading
    Indicator.open();
    // 请求数据
    common.ajaxGet(common.api + '/topics', {
        page: this.page, // 页数
        tab: this.tab // 分类
    }).then(data => {
        if (data.success) {
            // 填充数据
            this.list = data.data;
            // 移动到顶层
            $(&quot;.list&quot;).animate({
                scrollTop: 0
            }, 200);
        }
        // 关闭loading
        Indicator.close();
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>getData() {
    <span class="hljs-comment">// 打开loading</span>
    Indicator.<span class="hljs-keyword">open</span>();
    <span class="hljs-comment">// 请求数据</span>
    common.ajaxGet(common.api + <span class="hljs-string">'/topics'</span>, {
        page: <span class="hljs-keyword">this</span>.page, <span class="hljs-comment">// 页数</span>
        tab: <span class="hljs-keyword">this</span>.tab <span class="hljs-comment">// 分类</span>
    }).then(<span class="hljs-keyword">data</span> =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">data</span>.success) {
            <span class="hljs-comment">// 填充数据</span>
            <span class="hljs-keyword">this</span>.list = <span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>;
            <span class="hljs-comment">// 移动到顶层</span>
            $(<span class="hljs-string">".list"</span>).animate({
                scrollTop: <span class="hljs-number">0</span>
            }, <span class="hljs-number">200</span>);
        }
        <span class="hljs-comment">// 关闭loading</span>
        Indicator.close();
    });
}</code></pre>
<p>新建一个文件 src/lib/common.js，这个文件主要放公共的方法，现在暂时只用到里面的 ajaxGet() 这个方法，ajaxGet() 用了个 promise 包装了一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery';
let common = {
    api: &quot; https://cnodejs.org/api/v1&quot;,
    isPhone() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid || isiOS;
    },
    getType(value) {
        let result = value;
        switch (value) {
            case &quot;job&quot;:
                result = &quot;招聘&quot;;
                break;
            case &quot;good&quot;:
                result = &quot;精华&quot;;
                break;
            case &quot;share&quot;:
                result = &quot;分享&quot;;
                break;
            case &quot;ask&quot;:
                result = &quot;问答&quot;;
                break;
            default:
                result = &quot;全部&quot;
                break;
        }
        return result;
    },
    ajaxGet(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: data || {},
                success: data => {
                    resolve(data);
                },
                error: data => {
                    reject();
                    console.error(&quot;数据请求失败&quot;);
                }
            })
        });
    }
}
export default common;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;
<span class="hljs-keyword">let</span> common = {
    <span class="hljs-attr">api</span>: <span class="hljs-string">" https://cnodejs.org/api/v1"</span>,
    isPhone() {
        <span class="hljs-keyword">let</span> u = navigator.userAgent;
        <span class="hljs-keyword">let</span> isAndroid = u.indexOf(<span class="hljs-string">'Android'</span>) &gt; <span class="hljs-number">-1</span> || u.indexOf(<span class="hljs-string">'Adr'</span>) &gt; <span class="hljs-number">-1</span>; <span class="hljs-comment">//android终端</span>
        <span class="hljs-keyword">let</span> isiOS = !!u.match(<span class="hljs-regexp">/\(i[^;]+;( U;)? CPU.+Mac OS X/</span>); <span class="hljs-comment">//ios终端</span>
        <span class="hljs-keyword">return</span> isAndroid || isiOS;
    },
    getType(value) {
        <span class="hljs-keyword">let</span> result = value;
        <span class="hljs-keyword">switch</span> (value) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">"job"</span>:
                result = <span class="hljs-string">"招聘"</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"good"</span>:
                result = <span class="hljs-string">"精华"</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"share"</span>:
                result = <span class="hljs-string">"分享"</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">case</span> <span class="hljs-string">"ask"</span>:
                result = <span class="hljs-string">"问答"</span>;
                <span class="hljs-keyword">break</span>;
            <span class="hljs-keyword">default</span>:
                result = <span class="hljs-string">"全部"</span>
                <span class="hljs-keyword">break</span>;
        }
        <span class="hljs-keyword">return</span> result;
    },
    ajaxGet(url, data) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
            $.ajax({
                <span class="hljs-attr">url</span>: url,
                <span class="hljs-attr">data</span>: data || {},
                <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                    resolve(data);
                },
                <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
                    reject();
                    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"数据请求失败"</span>);
                }
            })
        });
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> common;</code></pre>
<p>data里面加上几个使用的参数就OK了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
    return {
        list: [],
        types: [],
        tab: &quot;&quot;,
        page: 1
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>data() {
    <span class="hljs-keyword">return</span> {
        lis<span class="hljs-variable">t:</span> [],
        <span class="hljs-built_in">type</span><span class="hljs-variable">s:</span> [],
        <span class="hljs-keyword">ta</span><span class="hljs-variable">b:</span> <span class="hljs-string">""</span>,
        page: <span class="hljs-number">1</span>
    }
}</code></pre>
<p>使用 getType() 方法，对数据过滤一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filters: {
    tab(value) {
        return common.getType(value);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>filters: {
    tab(<span class="hljs-keyword">value</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">common</span>.getType(<span class="hljs-keyword">value</span>);
    }
}</code></pre>
<p>加上css的话，上面几个步骤应该就可以看到页面效果了。<br><span class="img-wrap"><img data-src="/img/bVG0wD?w=447&amp;h=772" src="https://static.alili.tech/img/bVG0wD?w=447&amp;h=772" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里 分页 还有 分类 其实都是请求同一个接口，为了在地址栏直接改变 分类 和 分页 有效，所以只要监控地址栏的变化，然后动态的改数据就ok了，不必再写重复的请求接口了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
    $route() {
        // 检测路由变化
        this.page = this.$route.query.page || 1;
        this.tab = this.$route.query.tab;

        // 获取数据
        this.getData();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>watch: {
    $route() {
        <span class="hljs-comment">// 检测路由变化</span>
        <span class="hljs-keyword">this</span>.page = <span class="hljs-keyword">this</span>.$route.query.page || <span class="hljs-number">1</span>;
        <span class="hljs-keyword">this</span>.tab = <span class="hljs-keyword">this</span>.$route.query.tab;

        <span class="hljs-comment">// 获取数据</span>
        <span class="hljs-keyword">this</span>.getData();
    }
}</code></pre>
<p>这三个方法都是改变地址栏然后通过 wacth 检测地址栏变化去请求数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="prev() {
    this.page--;

    // 改变路由
    let query = {
        page: this.page
    }
    if (this.tab) {
        query.tab = this.tab;
    }
    this.$router.push({
        path: 'list',
        query: query
    })
},
next() {
    // 改变当前页数
    this.page++;

    // 改变路由
    let query = {
        page: this.page
    }
    if (this.tab) {
        query.tab = this.tab;
    }
    this.$router.push({
        path: 'list',
        query: query
    })
},
onTabSelect(value) {
    // 改变当前分类
    this.tab = value;
    this.page = 1;

    // 改变路由
    let query = {
        page: this.page
    }
    if (this.tab) {
        query.tab = this.tab;
    }
    this.$router.push({
        path: 'list',
        query: query
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>prev() {
    <span class="hljs-keyword">this</span>.page--;

    <span class="hljs-comment">// 改变路由</span>
    let query = {
        page: <span class="hljs-keyword">this</span>.page
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.tab) {
        query.tab = <span class="hljs-keyword">this</span>.tab;
    }
    <span class="hljs-keyword">this</span>.$router.push({
        path: <span class="hljs-string">'list'</span>,
        query: query
    })
},
next() {
    <span class="hljs-comment">// 改变当前页数</span>
    <span class="hljs-keyword">this</span>.page++;

    <span class="hljs-comment">// 改变路由</span>
    let query = {
        page: <span class="hljs-keyword">this</span>.page
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.tab) {
        query.tab = <span class="hljs-keyword">this</span>.tab;
    }
    <span class="hljs-keyword">this</span>.$router.push({
        path: <span class="hljs-string">'list'</span>,
        query: query
    })
},
onTabSelect(value) {
    <span class="hljs-comment">// 改变当前分类</span>
    <span class="hljs-keyword">this</span>.tab = value;
    <span class="hljs-keyword">this</span>.page = <span class="hljs-number">1</span>;

    <span class="hljs-comment">// 改变路由</span>
    let query = {
        page: <span class="hljs-keyword">this</span>.page
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.tab) {
        query.tab = <span class="hljs-keyword">this</span>.tab;
    }
    <span class="hljs-keyword">this</span>.$router.push({
        path: <span class="hljs-string">'list'</span>,
        query: query
    })
}</code></pre>
<p>输入 <a href="http://localhost:8080/list?page=3&amp;tab=good" rel="nofollow noreferrer" target="_blank">http://localhost:8080/list?pa...</a> 看看页面是不是就会跳到对应的页面了呢，这样子把链接分享出去的话，也能定位到当时的状态。<br><span class="img-wrap"><img data-src="/img/bVG0zP?w=381&amp;h=574" src="https://static.alili.tech/img/bVG0zP?w=381&amp;h=574" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>项目结构<br><span class="img-wrap"><img data-src="/img/bVG0CK?w=347&amp;h=743" src="https://static.alili.tech/img/bVG0CK?w=347&amp;h=743" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">最后</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果有什么想跟我讨论的话，请私信。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>如果有什么想跟我讨论的话，请私信。
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 0 开始，vue 项目实战（二）

## 原文链接
[https://segmentfault.com/a/1190000007828224](https://segmentfault.com/a/1190000007828224)

