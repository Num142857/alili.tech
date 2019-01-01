---
title: '客服系统从Require.js到Webpack' 
date: 2019-01-02 2:30:08
hidden: true
slug: gx81cpxwumd
categories: [reprint]
---

{{< raw >}}

                    
<p>客服系统之前都是用Require.js 2.2.0进行模块化编程，并使用相应的r.js打包js文件，本次迁移成Webpack3.3.0。</p>
<h2 id="articleHeader0">为什么迁移</h2>
<p>项目前期，require.js可以很好的解决需求，但是随着项目成长到具有上百个JS文件，越来越多的工作需要处理。除了组件化开发、打包发布，还有性能优化、工程化管理需要考虑，而require.js并不擅长做这些事情，如tree shaking, hot reloading, code splitting等。</p>
<p>令一方面现有项目的CSS打包、CSS预处理、文件合并等自动化构建也需要借助gulp或者shell脚本等工具实现，而这些工作，使用更先进生产力的webpack就可以全部完成。</p>
<h2 id="articleHeader1">Require.js写法</h2>
<p>首先需要了解使用require.js的js文件的写法，baseUrl是默认路径，paths中定义了各个路径的别名，然后使用标准的AMD语法引用定义过的模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="requirejs.config({
    //设定为git repo的dev路径;
    baseUrl: &quot;../../../&quot;,
    paths: {
        test: &quot;js/module/test&quot;,
        main : &quot;js/module/main&quot;,
        model : &quot;js/model&quot;,
        view : &quot;js/view&quot;,
        api : &quot;js/model&quot;,
        artTemplate: &quot;js/3rdParty/artTemplate&quot;,
        util: &quot;js/util&quot;,
        // &quot;bootstrap&quot; : &quot;http://boss.static.xiaomi.net/common/bootstrap/3.3.4-fix/bootstrap&quot;,
        &quot;bootstrap&quot; : &quot;js/3rdParty/bootstrap/3.3.4-fix/bootstrap&quot;,
        &quot;jquery&quot; : &quot;http://boss.static.xiaomi.net/common/jquery/1.11.2/jquery&quot;,
        &quot;jquery.validate&quot; : &quot;http://boss.static.xiaomi.net/common/jquery.validate/1.13.1/jquery.validate&quot;
    }
});

// 注意:
// require选定某一个模块的baseUrl，是基于git repo的dev路径的;
require(['jquery', 'bootstrap', 'main/_main'], function( $, bt, _main ){
    _main.run();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">requirejs</span><span class="hljs-selector-class">.config</span>({
    <span class="hljs-comment">//设定为git repo的dev路径;</span>
    <span class="hljs-attribute">baseUrl</span>: <span class="hljs-string">"../../../"</span>,
    <span class="hljs-attribute">paths</span>: {
        <span class="hljs-attribute">test</span>: <span class="hljs-string">"js/module/test"</span>,
        <span class="hljs-attribute">main </span>: <span class="hljs-string">"js/module/main"</span>,
        <span class="hljs-attribute">model </span>: <span class="hljs-string">"js/model"</span>,
        <span class="hljs-attribute">view </span>: <span class="hljs-string">"js/view"</span>,
        <span class="hljs-attribute">api </span>: <span class="hljs-string">"js/model"</span>,
        <span class="hljs-attribute">artTemplate</span>: <span class="hljs-string">"js/3rdParty/artTemplate"</span>,
        <span class="hljs-attribute">util</span>: <span class="hljs-string">"js/util"</span>,
        <span class="hljs-comment">// "bootstrap" : "http://boss.static.xiaomi.net/common/bootstrap/3.3.4-fix/bootstrap",</span>
        <span class="hljs-string">"bootstrap"</span> : <span class="hljs-string">"js/3rdParty/bootstrap/3.3.4-fix/bootstrap"</span>,
        <span class="hljs-string">"jquery"</span> : <span class="hljs-string">"http://boss.static.xiaomi.net/common/jquery/1.11.2/jquery"</span>,
        <span class="hljs-string">"jquery.validate"</span> : <span class="hljs-string">"http://boss.static.xiaomi.net/common/jquery.validate/1.13.1/jquery.validate"</span>
    }
});

<span class="hljs-comment">// 注意:</span>
<span class="hljs-comment">// require选定某一个模块的baseUrl，是基于git repo的dev路径的;</span>
<span class="hljs-selector-tag">require</span>([<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'bootstrap'</span>, <span class="hljs-string">'main/_main'</span>], function( $, bt, _main ){
    <span class="hljs-selector-tag">_main</span><span class="hljs-selector-class">.run</span>();
});</code></pre>
<h2 id="articleHeader2">开始迁移</h2>
<p>Webpack本身是支持Amd的，所以不需要修改各个js组件的语法，只需要修改对应入口文件的require.js的配置即可。<br>修改后如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _main from 'main/_main';
_main.run();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>import <span class="hljs-variable">_main</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'main/_main'</span>;
<span class="hljs-variable">_main</span>.run();</code></pre>
<p>相应的paths对应到了webpack中的resolve中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  extensions: [' ', '.js', '.css'],
  modules: [path.join(__dirname, 'dev/')],
  alias: {
    test: path.join(__dirname, 'dev/js/module/test'),
    main: path.join(__dirname, 'dev/js/module/main'),
    libs : path.join(__dirname, &quot;dev/js/3rdParty&quot;),
    model: path.join(__dirname, 'dev/js/model'),
    view: path.join(__dirname, 'dev/js/view'),
    api: path.join(__dirname, 'dev/js/model'),
    artTemplate: path.join(__dirname, 'dev/js/3rdParty/artTemplate'),
    util: path.join(__dirname, 'dev/js/util'),
    jquery: path.join(__dirname, 'dev/js/3rdParty/jquery/1.11.2/jquery'),
    bootstrap: path.join(__dirname, 'dev/js/3rdParty/bootstrap/3.3.4-fix/bootstrap'),
    'jquery.validate': path.join(__dirname, 'dev/js/3rdParty/jquery.validate/1.13.1/jquery.validate'),
    'datatables.css': path.join(__dirname,'dev/css/3rdparty_libs/datatables/1.10.13/dataTables.bootstrap'),
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
  <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">' '</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.css'</span>],
  modules: [path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/'</span>)],
  alias: {
    test: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/module/test'</span>),
    main: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/module/main'</span>),
    libs : path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">"dev/js/3rdParty"</span>),
    model: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/model'</span>),
    view: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/view'</span>),
    api: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/model'</span>),
    artTemplate: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/3rdParty/artTemplate'</span>),
    util: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/util'</span>),
    jquery: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/3rdParty/jquery/1.11.2/jquery'</span>),
    bootstrap: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/3rdParty/bootstrap/3.3.4-fix/bootstrap'</span>),
    <span class="hljs-string">'jquery.validate'</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'dev/js/3rdParty/jquery.validate/1.13.1/jquery.validate'</span>),
    <span class="hljs-string">'datatables.css'</span>: path.<span class="hljs-built_in">join</span>(__dirname,<span class="hljs-string">'dev/css/3rdparty_libs/datatables/1.10.13/dataTables.bootstrap'</span>),
  },
}</code></pre>
<p>项目中有大量依赖jQuery的第三方库，所以需要把jQuery暴露到全局中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /jquery.js/,
  use: [{
    loader: 'expose-loader',
      options: '$'
  },
  {
    loader: 'expose-loader',
    options: 'jQuery'
  }]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">test</span>: /jquery.js/,
  use: [{
    loader: <span class="hljs-string">'expose-loader'</span>,
      options: <span class="hljs-string">'$'</span>
  },
  {
    <span class="hljs-attribute">loader</span>: <span class="hljs-string">'expose-loader'</span>,
    options: <span class="hljs-string">'jQuery'</span>
  }]
},</code></pre>
<h2 id="articleHeader3">总结</h2>
<p>项目使用webpack替换掉原有繁杂的shell脚本打包文件，移除require.js，取得了很好的效果，且方便日常维护扩展。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
客服系统从Require.js到Webpack

## 原文链接
[https://segmentfault.com/a/1190000010998493](https://segmentfault.com/a/1190000010998493)

