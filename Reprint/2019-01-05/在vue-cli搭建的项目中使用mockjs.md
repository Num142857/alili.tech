---
title: '在vue-cli搭建的项目中使用mockjs' 
date: 2019-01-05 2:30:10
hidden: true
slug: ffvlhoxjisd
categories: [reprint]
---

{{< raw >}}

                    
<p>在使用vue开发的时候，一直疑惑与mockjs怎么用，开了<a href="https://github.com/nuysoft/Mock/wiki" rel="nofollow noreferrer" target="_blank">mockjs的开发文档</a>，还是一脸蒙蔽，无从下手！mockjs在前后端分离开发上进行模拟数据，是不可避掉的一环。在网上看了一些博文还有查阅了其文档，终于搞明白了它的基础用法，有什么不完整的地方，还请大家多多指正。</p>
<ul><li><p>搭建一个vue项目</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack vue-mock
# 安装依赖，走你
$ cd my-project
$ npm install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 全局安装 vue-cli</span>
<span class="hljs-variable">$ </span>npm install --global vue-cli
<span class="hljs-comment"># 创建一个基于 webpack 模板的新项目</span>
<span class="hljs-variable">$ </span>vue init webpack vue-mock
<span class="hljs-comment"># 安装依赖，走你</span>
<span class="hljs-variable">$ </span>cd my-project
<span class="hljs-variable">$ </span>npm install
</code></pre>
<ul><li><p>安装mockjs</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mockjs --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install mockjs --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<ul><li><p>启动项目</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<ul><li><p>创建一个mockjs文档<br>此时可以看到类似于这样的一个项目结构</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVSBcW?w=158&amp;h=403" src="https://static.alili.tech/img/bVSBcW?w=158&amp;h=403" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>其中mockjs是我自己创建的一个mock文件，用于存放模拟的数据</p>
<p>项目搭建起来之后，能够在package.json里面看到  "mockjs": "^1.0.1-beta3" 这块代码，就说明mockjs已经引入载入成功，就可以开始我们下一步的操作；<br>我所理解的有两种方法使用mockjs，第一种是比较简答你的使用，还有一种是模块化的使用</p>
<h2 id="articleHeader0">简单的使用</h2>
<p>（1）在项目中的mock.js文件中，写入模拟的数据，此时我们需要参照一下<a href="https://github.com/nuysoft/Mock/wiki" rel="nofollow noreferrer" target="_blank">mockjs</a>文档中的这样一块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//参照mockjs的文档，进行操作
// 配置 Mock 路径
require.config({
    paths: {
        mock: 'http://mockjs.com/dist/mock'
    }
})
// 加载 Mock
require(['mock'], function(Mock){
    // 使用 Mock
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    })
    // 输出结果
    document.body.innerHTML +=
        '<pre>' +
        JSON.stringify(data, null, 4) +
        '</pre>'
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//参照mockjs的文档，进行操作</span>
<span class="hljs-comment">// 配置 Mock 路径</span>
<span class="hljs-built_in">require</span>.config({
    <span class="hljs-attr">paths</span>: {
        <span class="hljs-attr">mock</span>: <span class="hljs-string">'http://mockjs.com/dist/mock'</span>
    }
})
<span class="hljs-comment">// 加载 Mock</span>
<span class="hljs-built_in">require</span>([<span class="hljs-string">'mock'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Mock</span>)</span>{
    <span class="hljs-comment">// 使用 Mock</span>
    <span class="hljs-keyword">var</span> data = Mock.mock({
        <span class="hljs-string">'list|1-10'</span>: [{
            <span class="hljs-string">'id|+1'</span>: <span class="hljs-number">1</span>
        }]
    })
    <span class="hljs-comment">// 输出结果</span>
    <span class="hljs-built_in">document</span>.body.innerHTML +=
        <span class="hljs-string">'&lt;pre&gt;'</span> +
        <span class="hljs-built_in">JSON</span>.stringify(data, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>) +
        <span class="hljs-string">'&lt;/pre&gt;'</span>
})
</code></pre>
<p>（2）我们在mockjs中进行以下编写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
Mock.mock('/api/data', (req, res) => {
    return {
        data: ['a','b']
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//引入mockjs</span>
<span class="hljs-keyword">const</span> Mock = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mockjs'</span>)
<span class="hljs-comment">//使用mockjs模拟数据</span>
Mock.mock(<span class="hljs-string">'/api/data'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        data: [<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>]
    }
})</code></pre>
<p>同时，不要忘记了，需要在main.js里面引入该文档，告诉程序，使用了mockjs，来进行数据模拟</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./mock')//此部分引入的是我们所编写的mockjs文档" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'./mock'</span>)</span></span><span class="hljs-comment">//此部分引入的是我们所编写的mockjs文档</span></code></pre>
<p>（3）重写了Hello.vue</p>
<p><span class="img-wrap"><img data-src="/img/bVSBjX?w=1245&amp;h=564" src="https://static.alili.tech/img/bVSBjX?w=1245&amp;h=564" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>hello.vue中的AJAX请求与mockjs里里面的url相同，这个时候我们可以看到页面上的显示如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVSBke?w=917&amp;h=222" src="https://static.alili.tech/img/bVSBke?w=917&amp;h=222" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">模块化的使用</h2>
<p>（1）在build的文件夹下面的dev-server文件中进行配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="首先，需要引入mockjs =》 require('mockjs')
其次在dev-server里面配置
app.use('/api/data', (req, res) => {
  res.send({
    data:['a','s']
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>首先，需要引入mockjs =》 <span class="hljs-built_in">require</span>(<span class="hljs-string">'mockjs'</span>)
其次在dev-server里面配置
app.use(<span class="hljs-string">'/api/data'</span>, <span class="hljs-function"><span class="hljs-params">(req, res)</span> =&gt;</span> {
  res.send({
    data:[<span class="hljs-string">'a'</span>,<span class="hljs-string">'s'</span>]
  })
})</code></pre>
<p>此块代码写到如下图所在的区域</p>
<p><span class="img-wrap"><img data-src="/img/bVSBMj?w=686&amp;h=511" src="https://static.alili.tech/img/bVSBMj?w=686&amp;h=511" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>其中res.send的意思就是把它所包含的数据抛出去，使AJAX能够请求的到，使用这个方法的时候，我们不需要在main.js里面引入就可以直接使用，但是有一点不好的是，这种方法，因为卸载配置里面，比较混乱，跟我们模块化开发的意愿相悖，我们可以尝试这把数据的这一块单独拿出去，我们只需要在这里面引用就可以了；</p>
<p>把上面引入的mockjs注掉，把app.use改写成app.use('/api', require('../src/mock.js'))的形式，其中api是根路径，类似于router中的base路径，后面的require引入的是mock.js里的数据<br>在mockjs文档中，我们进行一下数据改写，如下图所示</p>
<p><span class="img-wrap"><img data-src="/img/bVSBMM?w=669&amp;h=398" src="https://static.alili.tech/img/bVSBMM?w=669&amp;h=398" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此时页面显示为</p>
<p><span class="img-wrap"><img data-src="/img/bVSBMV?w=687&amp;h=271" src="https://static.alili.tech/img/bVSBMV?w=687&amp;h=271" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在vue-cli搭建的项目中使用mockjs

## 原文链接
[https://segmentfault.com/a/1190000010592626](https://segmentfault.com/a/1190000010592626)

