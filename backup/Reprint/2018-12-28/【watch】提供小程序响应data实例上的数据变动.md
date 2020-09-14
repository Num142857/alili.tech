---
title: '【watch】提供小程序响应data实例上的数据变动' 
date: 2018-12-28 2:30:11
hidden: true
slug: 4l495xxbicj
categories: [reprint]
---

{{< raw >}}

                    
<p>小程序不提供类似于vue一样监听数据(<a href="https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E8%A2%AB%E8%A7%82%E5%AF%9F%E7%9A%84%E5%B1%9E%E6%80%A7" rel="nofollow noreferrer" target="_blank">vm.watch</a>)，当数据改变时触发回调检测改变数据类型是否符合要求。  <br><span class="img-wrap"><img data-src="https://sfault-image.b0.upaiyun.com/270/694/2706941227-59df1b4702528_articlex" src="https://static.alili.techhttps://sfault-image.b0.upaiyun.com/270/694/2706941227-59df1b4702528_articlex" alt="enter image description here" title="enter image description here" style="cursor: pointer; display: inline;"></span></p>
<p>现在，使用wach即可扩展类似vm.watch的功能<br><a href="https://github.com/jayZOU/watch" rel="nofollow noreferrer" target="_blank">源码链接</a></p>
<h2 id="articleHeader0">install</h2>
<p><a href="https://raw.githubusercontent.com/jayZOU/watch/master/src/libs/watch.js" rel="nofollow noreferrer" target="_blank">链接下载</a></p>
<h2 id="articleHeader1">Usage</h2>
<h3 id="articleHeader2">引入watch库</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Watch from '../../libs/watch';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Watch <span class="hljs-keyword">from</span> <span class="hljs-string">'../../libs/watch'</span>;</code></pre>
<h3 id="articleHeader3">配置初始化检察对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Watch from '../../libs/watch';
let watch;
Page({
    data: {
        a: '1',
        b: {
            c: {
                d: 33
            },
            e: [1, 2, [3, 4]]
        }
    },
    watch: {
        a: function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        'b.c.d': function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        'b.e[2][0]': function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        'b.e[3][4]': function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Watch <span class="hljs-keyword">from</span> <span class="hljs-string">'../../libs/watch'</span>;
<span class="hljs-keyword">let</span> watch;
Page({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">a</span>: <span class="hljs-string">'1'</span>,
        <span class="hljs-attr">b</span>: {
            <span class="hljs-attr">c</span>: {
                <span class="hljs-attr">d</span>: <span class="hljs-number">33</span>
            },
            <span class="hljs-attr">e</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]
        }
    },
    <span class="hljs-attr">watch</span>: {
        <span class="hljs-attr">a</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, oldVal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'new: %s, old: %s'</span>, val, oldVal);
        },
        <span class="hljs-string">'b.c.d'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, oldVal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'new: %s, old: %s'</span>, val, oldVal);
        },
        <span class="hljs-string">'b.e[2][0]'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, oldVal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'new: %s, old: %s'</span>, val, oldVal);
        },
        <span class="hljs-string">'b.e[3][4]'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">val, oldVal</span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'new: %s, old: %s'</span>, val, oldVal);
        },
    }
})</code></pre>
<p>可以将需要监听的数据放入<strong>watch</strong>里面，当数据改变时推送相应的订阅事件(注：不在data里面的数据项不会放入观察者列表，比如上面的<code>'b.e[3][4]'</code>)</p>
<h3 id="articleHeader4">实例化watch</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch = new Watch(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">watch = <span class="hljs-keyword">new</span> Watch(<span class="hljs-keyword">this</span>);</code></pre>
<p>当<strong>watch</strong>创建示例初始化时会把监听数据项放入观察者列表里面</p>
<h3 id="articleHeader5">改变数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch.setData({
    a: 2,
    'b.c.d': 3,
    'b.e[2][0]': 444,
    c: 123
})

watch.data('b.e[2][0]', 555);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watch.setData({
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">'b.c.d'</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">'b.e[2][0]'</span>: <span class="hljs-number">444</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-number">123</span>
})

watch.data(<span class="hljs-string">'b.e[2][0]'</span>, <span class="hljs-number">555</span>);</code></pre>
<h2 id="articleHeader6">API</h2>
<h3 id="articleHeader7">watch.setData(obj)</h3>
<p>等价于原生小程序<code>this.setData</code>，会改变数据并更新视图，也会触发回调（假如有配置）  </p>
<p><strong>示例：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch.setData({
    a: 2,
    'b.c.d': 3,
    'b.e[2][0]': 444,
    c: 123
})
//等价于
// this.setData({
//     a: 2,
//     'b.c.d': 3,
//     'b.e[2][0]': 444,
//     c: 123
// })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watch.setData({
    <span class="hljs-attr">a</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">'b.c.d'</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">'b.e[2][0]'</span>: <span class="hljs-number">444</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-number">123</span>
})
<span class="hljs-comment">//等价于</span>
<span class="hljs-comment">// this.setData({</span>
<span class="hljs-comment">//     a: 2,</span>
<span class="hljs-comment">//     'b.c.d': 3,</span>
<span class="hljs-comment">//     'b.e[2][0]': 444,</span>
<span class="hljs-comment">//     c: 123</span>
<span class="hljs-comment">// })</span></code></pre>
<h3 id="articleHeader8">watch.data(key, val)</h3>
<p>等价于原生小程序<code>this.data.a = 3</code>，之后改变数据不更新视图，也会触发回调（假如有配置）  </p>
<p><strong>示例：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch.data('b.e[2][0]', 555);
//等价于this.b.e[2][0] = 555" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watch.data(<span class="hljs-string">'b.e[2][0]'</span>, <span class="hljs-number">555</span>);
<span class="hljs-comment">//等价于this.b.e[2][0] = 555</span></code></pre>
<h3 id="articleHeader9">watch.getter(data, path)</h3>
<p>能根据提供的路径深度获取数据  </p>
<p><strong>示例：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch.get({
        a: '1',
        b: {
            c: {
                d: 33
            },
            e: [1, 2, [3, 4]]
        }
    }, 'b.e[2][0]');
 //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">watch.get({
        <span class="hljs-attr">a</span>: <span class="hljs-string">'1'</span>,
        <span class="hljs-attr">b</span>: {
            <span class="hljs-attr">c</span>: {
                <span class="hljs-attr">d</span>: <span class="hljs-number">33</span>
            },
            <span class="hljs-attr">e</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, [<span class="hljs-number">3</span>, <span class="hljs-number">4</span>]]
        }
    }, <span class="hljs-string">'b.e[2][0]'</span>);
 <span class="hljs-comment">//3</span></code></pre>
<h3 id="articleHeader10">watch.unSubscribe(key)</h3>
<p>删除观察者，改变数据不触发回调  </p>
<p><strong>示例：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch.unSubscribe('b.e[2][0]');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">watch.unSubscribe(<span class="hljs-string">'b.e[2][0]'</span>);</code></pre>
<h2 id="articleHeader11">test</h2>
<p><code>npm test</code></p>
<h2 id="articleHeader12">demo</h2>
<p><code>git clone https://github.com/jayZOU/watch.git</code>   <br>打开小程序开发工具，新建项目，定位目录到<strong>watch/src</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【watch】提供小程序响应data实例上的数据变动

## 原文链接
[https://segmentfault.com/a/1190000011594464](https://segmentfault.com/a/1190000011594464)

