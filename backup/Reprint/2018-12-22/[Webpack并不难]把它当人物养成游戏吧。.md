---
title: '[Webpack并不难]把它当人物养成游戏吧。' 
date: 2018-12-22 2:30:11
hidden: true
slug: m0uczd2v9n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<ul>
<li>这段可以跳过看下面的。</li>
<li>本来，这个教程想完结的了。但回头看自己写的，感觉就像写明了什么意思，具体怎么使用都没说明白，而且让人看得会有点乏味吧。</li>
<li>我也是刚开始写文章，在学习怎样可以写好有趣味性而且学东西起来又不枯燥的文章，一步一步坚持走下去咯。</li>
</ul>
<h2 id="articleHeader1">序言</h2>
<ul>
<li>刚接触 <strong><em>webpack</em></strong> 的人，会觉得蛮复杂的哦，网上的教程都是列出一堆选项和配置 （我写的也是这样....哈哈），那么就会等有时间再去看看吧。我刚学也是这样。这念头是不行的哦，后来啃文档和看网上教程，自己动手配置。发觉 <strong><em>webpack</em></strong>其实真的不难，毕竟它是一个工具，如果用起来都不顺手，那为什么那么多人用，是不是。</li>
<li>找对学习的方法，才容易理解它。我觉得可以把 <strong><em>webpack</em></strong> 当成人物养成游戏来玩，哦不，来学。</li>
</ul>
<h3 id="articleHeader2">一. 游戏设定</h3>
<ul>
<li>有个叫<code>wp仔</code>（ <em>webpack</em> 来的，下面也这样叫了。）的员工，在名叫<em>Web</em>的公司上班，工作是处理一些文件。</li>
<li>我们玩家就要武装 <strong>wp仔</strong>，让他能够处理 <em>Boss</em> 给各种各样任务，不让他被 <em>Boss</em> 在开会的时候点名批评。</li>
<li>那我们来看看 <em>wp仔</em> 的基础属性吧。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: __dirname +'/src/main.js',
  output: {
    path: __dirname + + '/build',
    filename: 'bundle.js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: __dirname +<span class="hljs-string">'/src/main.js'</span>,
  output: {
    path: __dirname + + <span class="hljs-string">'/build'</span>,
    filename: <span class="hljs-string">'bundle.js'</span>
  }
};</code></pre>
<h3 id="articleHeader3">二. 游戏开始</h3>
<h4>小试身手</h4>
<ul>
<li>一天 <em>Boss</em> 跟 <strong>wp仔</strong> 说，你的打包文件技能能不能加强点啊，小心我批评你呀。</li>
<li>这时，我们玩家就要让 <em>wp仔</em> 学习新的打包技术了。到哪里找？不要慌，这游戏有个官方资源库，什么技能书，饰品，配件，应有尽有，大家可以点<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">资源商店</a>，进去看看里面的东西。</li>
<li>好啦，我们找到了一款 <strong><em>eval-source-map</em></strong> 的技能书，点击学习。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    .... // 其他的配置
    devtool: 'eval-source-map'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">module</span>.exports = {
    .... <span class="hljs-comment">// 其他的配置</span>
    devtool: <span class="hljs-string">'eval-source-map'</span>
};</code></pre>
<h4>
<em>Boss</em> 的不满，只好加强属性。</h4>
<ul>
<li>
<em>Boss</em> ：虽然打包是快了，但有些文件错误，你没发现吗，注意下。</li>
<li>
<em>wp仔</em> 瑟瑟发抖，玩家们要帮他度过难关啊。快去<strong>资源商店</strong>看看，找找看什么帮得上忙。</li>
<li>找到了一个饰品 <strong><em>webpack.NoEmitOnErrorsPlugin</em></strong> 记录错误，我们玩家就可知道哪里出错然后去改咯，赶快带上。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modul.exports = {
    ... // 其他属性
    pilugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>modul.exports = {
    ... <span class="hljs-comment">// 其他属性</span>
    pilugins: <span class="hljs-type"></span>[
        <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.NoEmitOnErrorsPlugin()
    ]
}</code></pre>
<ul>
<li>
<em>Boss</em> ：<em>wp仔</em> 啊，你就没发现很多重复的文件吗？而且，刚修改过的文件有没有加进去啦，求求你别秀了。</li>
<li>我去，连放在中间的相同文件都发现，秦始皇的长生不老药我都不服，就服你。</li>
<li>还好，找到了 <strong><em>webpack.optimize.DedupePlugin</em></strong> 饰品可以去掉重复的，而 <strong><em>devServer</em></strong> 工具虽然不是在<strong>资源店</strong>，是在楼下小卖部的获得的。听说把 <strong><em>hot</em></strong>宝石放进这工具就能自动更新打包。装上去试试。</li>
<li>
<strong><em>webpack.optimize.DedupePlugin</em></strong>，已被移除了。感谢<a href="https://segmentfault.com/u/lowrytang">@LowryTang</a>指出。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modul.exports = {
    ... // 其他属性
    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true
    },
    pilugins: [
        ...
        new webpack.optimize.DedupePlugin()
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>modul<span class="hljs-selector-class">.exports</span> = {
    ... <span class="hljs-comment">// 其他属性</span>
    devServer: {
        host: <span class="hljs-string">'localhost'</span>,
        port: <span class="hljs-number">8080</span>,
        hot: true
    },
    pilugins: [
        ...
        new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.DedupePlugin</span>()
    ]
}</code></pre>
<h4>你还要我会文言文 ？</h4>
<ul>
<li>
<em>Boss</em>：最近表现不错。公司最近弄来了一些未来的文言文，你把它翻译成现代文吧。</li>
<li>什么鬼，文言文？还是未来的？我的天。</li>
<li>找遍<strong>资源店</strong>都没有适合，还好楼下小卖部神通广大，居然有这 <strong><em>babel</em></strong> 这逆天的装备，不过听说要自己配置这装备的属性。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// .babelrc
{
  &quot;presets&quot;: [
    &quot;env&quot;,
    &quot;stage-2&quot;
  ],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;] //可以理解为装备的插槽。之前文章中有说过简单用法。
}

// webpack.config.js
module.exports = {
    ... // 其他属性
    module: {
        rules: [
            {
              test: /\.js$/,
              loader: 'babel-loader'
            }
        ]
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// .babelrc</span>
{
  <span class="hljs-string">"presets"</span>: [
    <span class="hljs-string">"env"</span>,
    <span class="hljs-string">"stage-2"</span>
  ],
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>] <span class="hljs-comment">//可以理解为装备的插槽。之前文章中有说过简单用法。</span>
}

<span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-built_in">module</span>.exports = {
    ... <span class="hljs-comment">// 其他属性</span>
    <span class="hljs-keyword">module</span>: {
        rules: [
            {
              test: <span class="hljs-regexp">/\.js$/</span>,
              loader: <span class="hljs-string">'babel-loader'</span>
            }
        ]
    }
},</code></pre>
<h2 id="articleHeader4">最后</h2>
<p>文章写成这样不知效果怎样，但主要想说明的是，<strong><em>webpack</em></strong> 真不难，面对不同的场景给 <strong>wp仔</strong> 搭配不同的属性。尽管上面说的只是很简单的配置，你们也可以弄个满状态的 <strong>wp仔</strong> ，可我想让大家换个角度学习，这样学起来乐趣很多。  </p>
<p>谢谢观看。</p>
<hr>
<h2 id="articleHeader5"><a href="https://segmentfault.com/a/1190000012433099" target="_blank">总结</a></h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[Webpack并不难]把它当人物养成游戏吧。

## 原文链接
[https://segmentfault.com/a/1190000012416205](https://segmentfault.com/a/1190000012416205)

