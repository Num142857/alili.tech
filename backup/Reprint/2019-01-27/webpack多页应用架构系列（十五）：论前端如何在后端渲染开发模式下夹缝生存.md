---
title: 'webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存' 
date: 2019-01-27 2:31:00
hidden: true
slug: pbfo9js3if
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000008203380"><code>https://segmentfault.com/a/1190000008203380</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>近年来前端领域发展迅猛，<strong>前后端分离</strong>早已成为业界共识，各类管控系统(to B)上个SPA什么的也不值一提，但唯独<strong>偏展示类的项目</strong>，为了SEO，始终还是需要依赖于服务器端渲染html。</p>
<p>我<a href="https://segmentfault.com/a/1190000004127975">过往</a>也曾尝试为SPA弥补SEO，但现在看来，效果虽然达到了，但工作量也大大地增加（因为后端用的PHP，不能做到前后同构）。</p>
<p>虽然无法改变<em>依赖服务器端渲染</em>这一现实，但我们可以去勇敢地拥抱它，用前端的坚船利炮(aka webpack)，把服务器端模板层给啃下来！</p>
<h2 id="articleHeader1">前导知识</h2>
<ul>
<li>webpack的基本使用</li>
<li>利用webpack<a href="https://segmentfault.com/a/1190000007126268" target="_blank">生成HTML文件</a>，及，<a href="https://segmentfault.com/a/1190000007159115">构建模板布局系统</a>
</li>
<li>你所在项目后端模板引擎（如我目前使用的Slim框架，模板引擎仅为原生PHP）</li>
</ul>
<h2 id="articleHeader2">两个阶段</h2>
<p>整个前端项目，以本文主题的视角来看，可以分为两个阶段：</p>
<h3 id="articleHeader3">纯静态页面开发阶段</h3>
<p>在这个阶段里，一切开发都跟静态网站无二致，按UI稿切好页面搞好交互，要用到ajax请求API的也尽管写，跟后端的协作点仅在于API文档。</p>
<p>传统前端的工作也就到这里为止了，但对我们来说，目前的成果并不是我们最终的交付；因此，注意了，在这个阶段我们是可以<strong>“偷懒”</strong>的，比如说，一些明显应该由服务器端循环生成的部分（商品列表、文章列表等），我们写一遍就OK了。</p>
<h3 id="articleHeader4">动态页面改造阶段</h3>
<p>这就是所谓的<strong>“套页面”</strong>，传统来说是由后端来做的，实际上后端也是苦不堪言，毕竟模板不是自己写的，有时还是需要改造一番，而这正是我们前端要大力争取的活。</p>
<p>在这个阶段里，我们的主要工作是按照后端模板引擎的规则来撰写模板变量占位符，当然这里面也不会少了循环输出和逻辑判断，另外也可能需要用到后端定义的一些函数，视项目需求而定。</p>
<h3 id="articleHeader5">在两个阶段里来回往返</h3>
<p>这两个阶段不一定是完全独立的，有需要的话也是可以做到来回往返的。</p>
<p>那什么时候才叫做<em>“有需要”</em>呢？举个例子，当你把原先的静态页面都改造成需要后端渲染的页面模板后，却发现后端此时并未准备好相应的模板变量，而你此时又需要对页面的UI部分进行修改，那么你就很被动了，因为改好的这些页面模板根本跑不起来了。有两种解决方案：</p>
<ul>
<li>参考<code>API mock</code>的思路，来个<code>模板变量 mock</code>，这就相当于一直留在<strong>动态页面改造</strong>阶段了。</li>
<li>
<p>回到<strong>纯静态页面开发</strong>阶段，让页面不需要后端渲染也能跑起来。具体怎么做呢？</p>
<ol>
<li>区分开两个阶段，使用不同的webpack配置。</li>
<li>在我们构建生成页面的<a href="https://segmentfault.com/a/1190000007126268#articleHeader8" target="_blank">前端模板</a>（注意分清与后端模板的区别），判断（判断依据看<a href="https://segmentfault.com/a/1190000006952432">这里</a>）本次执行webpack打包是在哪个“阶段”，继而选择是生成静态（且完整）的element，还是带有模板变量占位符的element。这样一来，我们就可以随时选择在不同的阶段（或称环境）里进行开发了。</li>
</ol>
</li>
</ul>
<h2 id="articleHeader6">改造开始</h2>
<p>本文着重介绍如何将静态页面改造成后端渲染需要的模板。</p>
<h3 id="articleHeader7">配合后端模板命名规则生成相应模板文件</h3>
<p>不同项目因应本身所使用的后端框架或是其它需求，对模板放置的目录结构也会有所不一样，那么，如何构建后端所需要的目录结构呢？</p>
<p>在静态网页阶段，我习惯把html/css/js都按照所属页面归到各自的目录中（公用的css/js也当然是放到公用目录中），看HtmlWebpackPlugin配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/index.html`, // page变量形如'product/index'、'product/detail'
    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
    chunks: [page, 'commons/commons'],
    hash: true,
    xhtml: true,
  });
  pluginsConfig.push(htmlPlugin);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pageArr.forEach(<span class="hljs-function">(<span class="hljs-params">page</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> htmlPlugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">`<span class="hljs-subst">${page}</span>/index.html`</span>, <span class="hljs-comment">// page变量形如'product/index'、'product/detail'</span>
    template: path.resolve(dirVars.pagesDir, <span class="hljs-string">`./<span class="hljs-subst">${page}</span>/html.js`</span>),
    <span class="hljs-attr">chunks</span>: [page, <span class="hljs-string">'commons/commons'</span>],
    <span class="hljs-attr">hash</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">xhtml</span>: <span class="hljs-literal">true</span>,
  });
  pluginsConfig.push(htmlPlugin);
});</code></pre>
<p>而在改造阶段，则放到后端指定位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `../../view/frontend/${page}.php`, // 通过控制相对路径来确定模板的根目录
    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
    chunks: [page, 'commons/commons'],
    hash: true,
    xhtml: true,
  });
  pluginsConfig.push(htmlPlugin);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pageArr.forEach(<span class="hljs-function">(<span class="hljs-params">page</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> htmlPlugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">`../../view/frontend/<span class="hljs-subst">${page}</span>.php`</span>, <span class="hljs-comment">// 通过控制相对路径来确定模板的根目录</span>
    template: path.resolve(dirVars.pagesDir, <span class="hljs-string">`./<span class="hljs-subst">${page}</span>/html.js`</span>),
    <span class="hljs-attr">chunks</span>: [page, <span class="hljs-string">'commons/commons'</span>],
    <span class="hljs-attr">hash</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">xhtml</span>: <span class="hljs-literal">true</span>,
  });
  pluginsConfig.push(htmlPlugin);
});</code></pre>
<p>此时我模板目录结构是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  
├─alert
│      index.php
│      
├─article
│      detail.php
│      index.php
│      
├─index
│      index.php
│      
├─product
│      detail.php
│      index.php
│      
└─user
        edit-password.php
        modify-info.php" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">│  
├─alert
│      index.php
│      
├─article
│      detail.php
│      index.php
│      
├─index
│      index.php
│      
├─product
│      detail.php
│      index.php
│      
└─user
        edit-password.php
        modify-info.php</code></pre>
<p>这里需要注意的是，我的前端项目目录实际上是作为后端目录里的一个子目录来存放的，这样才能依靠相对路径来确定模板文件存放的根目录位置。</p>
<h3 id="articleHeader8">处理站内链接</h3>
<p>对于站内链接，我建议在前端模板里使用一个函数来适配两个阶段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  /* 拼接系统内部的URL */
  constructInsideUrl(url, request, urlTail) {
    urlTail = urlTail || '';
    let finalUrl = config.PAGE_ROOT_PATH + url;
    if (!config.IS_PRODUCTION_MODE) {
      finalUrl += '/index.html' + urlTail;
      return finalUrl;
    }
    return `<?php echo cf::constructInsideUrl(array('module' => '${url}'), $isStaticize)?>`;
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-comment">/* 拼接系统内部的URL */</span>
  constructInsideUrl(url, request, urlTail) {
    urlTail = urlTail || <span class="hljs-string">''</span>;
    <span class="hljs-keyword">let</span> finalUrl = config.PAGE_ROOT_PATH + url;
    <span class="hljs-keyword">if</span> (!config.IS_PRODUCTION_MODE) {
      finalUrl += <span class="hljs-string">'/index.html'</span> + urlTail;
      <span class="hljs-keyword">return</span> finalUrl;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">`&lt;?php echo cf::constructInsideUrl(array('module' =&gt; '<span class="hljs-subst">${url}</span>'), $isStaticize)?&gt;`</span>;
  },
};</code></pre>
<p>在前端模板里这么用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;<%= constructInsideUrl('index/index') %>&quot;>
  <img src=&quot;<%= require('./logo.png') %>&quot;>
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code class="ejs"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> constructInsideUrl(<span class="hljs-string">'index/index'</span>) </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"&lt;%=</span></span></span><span class="ruby"> <span class="hljs-keyword">require</span>(<span class="hljs-string">'./logo.png'</span>) </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span></code></pre>
<p>这样做，就能分别在静态页面阶段和后端渲染阶段生成相应的超链接。再者，在后端渲染阶段，我们生成出来的也不一定是一个完整的url，可以像我上述代码一样，生成调用后端函数的模板代码，从而灵活满足后端的一些需求（比如说，我的项目有静态化的需求，那么，静态化后的站内链接跟动态渲染的又会有所不同了）。</p>
<h3 id="articleHeader9">处理模板变量</h3>
<p>这一块其实我要说的不多，无非就是按照后端模板引擎的规则，输出变量、循环输出变量、判断条件输出变量、调用后端（模板引擎）函数调整输出变量。</p>
<p>关键是，我们需要拿到一份<strong>模板变量文档</strong>，跟API文档类似，它实际上也是一份前后端的数据协议。有了这份文档，我们才能在后端未完工的情况下，进入<strong>动态页面改造阶段</strong>，并根据其中内容实现<code>模板变量 mock</code>。</p>
<h3 id="articleHeader10">争讨模板布局渲染权</h3>
<p>关于利用模板布局系统对多个页面共有的部分实现复用，在<a href="https://segmentfault.com/a/1190000007159115" target="_blank">之前的文章</a>里已经提及了，我设计该系统的思路恰恰是来自于后端模板渲染。那么，在前后端均可以实现<strong>模板布局系统</strong>的前提下，我们应如何抉择呢？我的答案是，前端一定要吃下来！</p>
<p>从前端的角度来看：</p>
<ul>
<li>我们在<strong>纯静态页面开发阶段</strong>的产物就已经是一个个完整的页面了，再要拆开并不现实。</li>
<li>由于在webpack的辅助下这套<strong>模板布局系统</strong>功能相当强大，因此并没有给整个项目添加额外的成本。</li>
</ul>
<p>从后端的角度来看：</p>
<ul>
<li>服务器拼接多个HTML代码段本身也是有成本（比如磁盘IO成本）的，倒不如渲染一个完整的页面。</li>
<li>在公共组件的分治管理上不会有很大变化，只不过以前是一个一个组件渲染好后再拼在一起，而现在是把各个组件的数据整合在一起来统一渲染罢了。</li>
</ul>
<h2 id="articleHeader11">总结</h2>
<p>在后端渲染的项目里使用webpack多页应用架构是绝对可行的，可不要给老顽固们吓唬得又回到传统前端架构了。</p>
<h2 id="articleHeader12">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>（<code>https://github.com/Array-Huang/webpack-seed</code>）。</p>
<h2 id="articleHeader13">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点</a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？</a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？</a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？</a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？</a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？</a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？</a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？</a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码</a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap</a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译</a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板</a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统</a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施</a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000008203380"><code>https://segmentfault.com/a/1190000008203380</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存

## 原文链接
[https://segmentfault.com/a/1190000008203380](https://segmentfault.com/a/1190000008203380)

