---
title: 'webpack学习笔记' 
date: 2019-02-11 2:30:49
hidden: true
slug: 0cf3lk5kevy5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、webpack是流行的资源打包工具，属于前端workflow（工作流）的一部分。</h2>
<p>简单说，它牛逼的地方就是把一切静态资源打包在一个文件，并且有一堆的插件。</p>
<h2 id="articleHeader1">2、安装webpack</h2>
<p>把webpack安装到项目依赖<br>npm install webpack --save-dev 安装到项目。</p>
<h2 id="articleHeader2">3、webpack要工作，依赖于一个webpack.config.js的配置文件。</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={        //node.js的模块输出标准格式
    entry: './main.js',     //entry是入口文件,是程序的入口文件的相对地址
    output: {               //打包后输出的文件
        filename: 'bundle.js'       //输出的文件叫做bundle.js
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>={        <span class="hljs-comment">//node.js的模块输出标准格式</span>
    entry: <span class="hljs-string">'./main.js'</span>,     <span class="hljs-comment">//entry是入口文件,是程序的入口文件的相对地址</span>
    output: {               <span class="hljs-comment">//打包后输出的文件</span>
        filename: <span class="hljs-string">'bundle.js'</span>       <span class="hljs-comment">//输出的文件叫做bundle.js</span>
    }
};
</code></pre>
<h2 id="articleHeader3">4、命令行执行webpack</h2>
<p>调用全局安装的webpack工具对资源进行打包，最后输出或创建bundle.js文件</p>
<h2 id="articleHeader4">5、index.html script src = bundle.js</h2>
<p>网页最后调用的是打包后的文件</p>
<h2 id="articleHeader5">6、入口文件的数量有多个</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//node.js的模块输出标准格式
module.exports = {
    //entry是入口文件,是程序的入口文件的相对地址
    entry: {
        bundle1: './main1.js',
        bundle2: './main2.js'
    },
    //打包后输出的文件
    output: {
        filename: '[name].js'
    }
    //输出的文件叫做bundle.js
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">//node.js的模块输出标准格式</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    <span class="hljs-comment">//entry是入口文件,是程序的入口文件的相对地址</span>
    entry: {
        bundle1: <span class="hljs-string">'./main1.js'</span>,
        bundle2: <span class="hljs-string">'./main2.js'</span>
    },
    <span class="hljs-comment">//打包后输出的文件</span>
    output: {
        filename: <span class="hljs-string">'[name].js'</span>
    }
    <span class="hljs-comment">//输出的文件叫做bundle.js</span>
};
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack学习笔记

## 原文链接
[https://segmentfault.com/a/1190000005061052](https://segmentfault.com/a/1190000005061052)

