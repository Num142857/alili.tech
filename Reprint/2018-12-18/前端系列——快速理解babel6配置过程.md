---
title: '前端系列——快速理解babel6配置过程' 
date: 2018-12-18 2:30:11
hidden: true
slug: 6f7jm1rn8y3
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">繁琐的配置？</h3>
<p>你能快速读懂babel的官方文档吗？</p>
<p>你能根据官方文档快速配置好babelrc吗？</p>
<p>你能明白自己需要哪些插件吗？</p>
<p>没有搞明白这3个问题，请往下看。</p>
<h3 id="articleHeader1">快速理解babel 6</h3>
<h4>来看一张让人颤抖的babel插件图</h4>
<p>下图仅仅截取了部分，一屏都截取不完，还有babel插件隐藏在下面，你害怕了吗？</p>
<p><span class="img-wrap"><img data-src="/img/bV1FKh?w=2248&amp;h=1342" src="https://static.alili.tech/img/bV1FKh?w=2248&amp;h=1342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>忘记上面的图吧，那是罪恶之源</h4>
<p>当你忘记一切的时候，你只需要理解几个基本的东西即可。</p>
<p><strong>只需要下面几个babel插件，就能解析大部分ES方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、babel-core //必备的核心库
2、babel-loader //webpack loader配置必备
3、babel-preset-env //有了它，你不再需要添加2015、2016、2017，全都支持
4、babel-preset-stage-0 //有了它，你不再需要添加stage-1,stage-2,stage-3,默认向后支持
5、babel-plugin-transform-runtime 
6、babel-runtime //5和6是一起使用的，支持helpers，polyfill，regenerator配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、babel-core <span class="hljs-comment">//必备的核心库</span>
<span class="hljs-number">2</span>、babel-loader <span class="hljs-comment">//webpack loader配置必备</span>
<span class="hljs-number">3</span>、babel-preset-env <span class="hljs-comment">//有了它，你不再需要添加2015、2016、2017，全都支持</span>
<span class="hljs-number">4</span>、babel-preset-stage<span class="hljs-number">-0</span> <span class="hljs-comment">//有了它，你不再需要添加stage-1,stage-2,stage-3,默认向后支持</span>
<span class="hljs-number">5</span>、babel-plugin-transform-runtime 
<span class="hljs-number">6</span>、babel-runtime <span class="hljs-comment">//5和6是一起使用的，支持helpers，polyfill，regenerator配置</span></code></pre>
<p><strong>上面6大插件添加到package.json，便可完成一个普通开发者的需求了，那么，如果是个react开发者，则还需要添加下面几个插件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、babel-plugin-transform-decorators-legacy //支持修饰符语法 @connect
2、babel-preset-react //支持解析react语法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、babel-plugin-transform-decorators-legacy <span class="hljs-comment">//支持修饰符语法 @connect</span>
<span class="hljs-number">2</span>、babel-preset-react <span class="hljs-comment">//支持解析react语法</span></code></pre>
<p><strong>如果你想要支持热更新呢，还需要一个插件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、react-hot-loader //虽然它长得不像babel，但是它也需要在babelrc做配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">1</span>、react-hot-loader <span class="hljs-comment">//虽然它长得不像babel，但是它也需要在babelrc做配置</span></code></pre>
<p><strong>其他插件呢？</strong><br>从我的感受来看，上面这几个插件的集合已经覆盖了大部分ES语法了，如果是vue开发者，则把react的替换成vue。通常我们不再需要考虑其他插件。</p>
<h4>这些插件的具体版本号</h4>
<p>请注意，babel插件一直在更新，至今已经出了babel7。而本章内容是介绍babel6，请不要乱用版本。</p>
<p>下面提供具体的版本号给大家参考</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;babel-core&quot;: &quot;^6.26.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.2&quot;,
    &quot;babel-plugin-transform-decorators-legacy&quot;: &quot;^1.3.4&quot;,
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.23.0&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.6.1&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.24.1&quot;,
    &quot;babel-preset-stage-0&quot;: &quot;^6.24.1&quot;,
    &quot;babel-runtime&quot;: &quot;^6.26.0&quot;,
    &quot;react-hot-loader&quot;: &quot;^3.1.2&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>    <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.26.0"</span>,
    <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^7.1.2"</span>,
    <span class="hljs-string">"babel-plugin-transform-decorators-legacy"</span>: <span class="hljs-string">"^1.3.4"</span>,
    <span class="hljs-string">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.23.0"</span>,
    <span class="hljs-string">"babel-preset-env"</span>: <span class="hljs-string">"^1.6.1"</span>,
    <span class="hljs-string">"babel-preset-react"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-string">"babel-preset-stage-0"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-string">"babel-runtime"</span>: <span class="hljs-string">"^6.26.0"</span>,
    <span class="hljs-string">"react-hot-loader"</span>: <span class="hljs-string">"^3.1.2"</span>,</code></pre>
<p>你相信吗？上面9个插件，就能生成图片上那几十个插件，这一切归功于插件之间的依赖关系。</p>
<h3 id="articleHeader2">babelrc配置</h3>
<p>现在，你只要考虑上面列举的插件以及版本号，就能把babel快速配置出来了，相当简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    &quot;env&quot;,
    &quot;react&quot;,
    &quot;stage-0&quot;
  ],
  &quot;plugins&quot;: [
    [&quot;transform-runtime&quot;, {
      &quot;helpers&quot;: false, //建议为false
      &quot;polyfill&quot;: false, //是否开始polyfill，根据你的网站兼容性情况来看，通常我不开启，开启会增加很多额外的代码
      &quot;regenerator&quot;: true //必须true，否则js就废了
    }],
    &quot;react-hot-loader/babel&quot;, //热更新插件
    &quot;transform-decorators-legacy&quot; //修饰符语法转换插件
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    <span class="hljs-string">"env"</span>,
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"stage-0"</span>
  ],
  <span class="hljs-attr">"plugins"</span>: [
    [<span class="hljs-string">"transform-runtime"</span>, {
      <span class="hljs-attr">"helpers"</span>: <span class="hljs-literal">false</span>, //建议为false
      <span class="hljs-attr">"polyfill"</span>: <span class="hljs-literal">false</span>, //是否开始polyfill，根据你的网站兼容性情况来看，通常我不开启，开启会增加很多额外的代码
      <span class="hljs-attr">"regenerator"</span>: <span class="hljs-literal">true</span> //必须<span class="hljs-literal">true</span>，否则js就废了
    }],
    <span class="hljs-string">"react-hot-loader/babel"</span>, //热更新插件
    <span class="hljs-string">"transform-decorators-legacy"</span> //修饰符语法转换插件
  ]
}</code></pre>
<h3 id="articleHeader3">webpack loader配置</h3>
<p>babel-loader配置也相当简单，至于react-hot-loader在webpack中的配置，请自行查看文档。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader'
        }]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
        <span class="hljs-attribute">rules</span>: [{
            test: /\.jsx?$/,
            use: <span class="hljs-string">'babel-loader'</span>
        }]
    }</code></pre>
<h3 id="articleHeader4">总结</h3>
<p>我始终相信，一个好的工程，应该尽量用简单的代码去解决简单的事情，而不是用复杂的代码去解决简单的事情。</p>
<p>很多人，包括我自己，在以前也经常被babel和webpack的配置搞的焦头烂额，特别是babel，经常报这个插件的错、那个插件的错，有时候不知道少了什么插件。</p>
<p>好了，现在不害怕了，因为babel配置原来如此的简单。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端系列——快速理解babel6配置过程

## 原文链接
[https://segmentfault.com/a/1190000012753134](https://segmentfault.com/a/1190000012753134)

