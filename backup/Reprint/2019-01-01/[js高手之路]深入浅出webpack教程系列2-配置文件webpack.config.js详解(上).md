---
title: '[js高手之路]深入浅出webpack教程系列2-配置文件webpack.config.js详解(上)' 
date: 2019-01-01 2:30:07
hidden: true
slug: owa0alo9oia
categories: [reprint]
---

{{< raw >}}

                    
<p>接着上文，重新在webpack文件夹下面新建一个项目文件夹demo2，然后用npm init --yes初始化项目的package.json配置文件，然后安装webpack( npm install webpack@3.5.6 --save-dev )，然后创建基本的项目文件夹结构，好了，我们的又一个基本项目结构就搭建好了.</p>
<p><span class="img-wrap"><img data-src="/img/bVUQZF?w=935&amp;h=867" src="https://static.alili.tech/img/bVUQZF?w=935&amp;h=867" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>第一、开始通过webpack.config.js文件配置我们的webpack项目</p>
<p>首先在项目文件夹demo2下面，新建一个webpack.config.js文件，这个webpack.config.js文件可以简化命令行操作，主要配置webpack的四大核心：entry(项目入口), output(输出路径) loaders(加载loader), and plugins(插件使用)，官网有详细配置说明：<a href="https://webpack.js.org/concepts/." rel="nofollow noreferrer" target="_blank">https://webpack.js.org/concep...</a> 那么什么是entry(入口)呢，就是项目运行时，第一个要被执行的文件，叫入口文件</p>
<p><span class="img-wrap"><img data-src="/img/bVUQZN?w=1302&amp;h=774" src="https://static.alili.tech/img/bVUQZN?w=1302&amp;h=774" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>webpack.config.js 文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log( __dirname ); //D:\ghostWu\bak\webpack\demo2
module.exports = {
    entry : './src/js/main.js', // 入口文件
    output : {
        //__dirname，就是当前webpack.config.js文件所在的绝对路径
        path : __dirname + '/dist', //输出路径，要用绝对路径
        filename : 'index.bundle.js' //打包之后输出的文件名
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>console.log( __dirname ); <span class="hljs-comment">//D:\ghostWu\bak\webpack\demo2</span>
module.exports = {
    <span class="hljs-string">entry :</span> <span class="hljs-string">'./src/js/main.js'</span>, <span class="hljs-comment">// 入口文件</span>
    <span class="hljs-string">output :</span> {
        <span class="hljs-comment">//__dirname，就是当前webpack.config.js文件所在的绝对路径</span>
        <span class="hljs-string">path :</span> __dirname + <span class="hljs-string">'/dist'</span>, <span class="hljs-comment">//输出路径，要用绝对路径</span>
        <span class="hljs-string">filename :</span> <span class="hljs-string">'index.bundle.js'</span> <span class="hljs-comment">//打包之后输出的文件名</span>
    }
};
</code></pre>
<p>配置文件写好之后，执行webpack打包命令，就会去当前目录下寻找webpack.config.js文件，把main.js文件 打包到dist/index.bundle.js，如果main.js输入以下代码，再执行webpack打包一次</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 function say(){
2     alert( 'ghostwu告诉你怎么学习webpack' );
3 }
4 say();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-symbol">1 </span>function say(){
<span class="hljs-symbol">2 </span>    alert( <span class="hljs-comment">'ghostwu告诉你怎么学习webpack' );</span>
<span class="hljs-symbol">3 </span>}
<span class="hljs-symbol">4 </span>say();
</code></pre>
<p>然后在index.html文件通过&lt;script src="./dist/index.bundle.js"&gt;&lt;/script&gt;引入打包后的文件，那么就会弹出say函数中的内容</p>
<p>第二、如果配置文件webpack.config.js被修改成别的名字(如webpack.dev.config.js)，执行webpack打包命令，是不能正常打包的(命令行会提示，找不到配置文件)，所以需要在打包的时候，通过--config指定配置文件的名字（webpack --config webpack.dev.config.js）才能正常打包</p>
<p><span class="img-wrap"><img data-src="/img/bVUQZ5?w=933&amp;h=750" src="https://static.alili.tech/img/bVUQZ5?w=933&amp;h=750" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>第三、通过package.json文件的script部分，简化打包操作</p>
<p>把package.json文件的scripts部分修改成：</p>
<p>"scripts": {<br>"d" : "webpack --config webpack.dev.config.js --progress --display-modules --colors --display-reasons"<br>},<br>d后面的命令如果看不懂，请移步这里<br> 然后在命令行下用 npm run d 这个快捷方式就可以执行scripts添加的"d"项对应的命令</p>
<p><span class="img-wrap"><img data-src="/img/bVUQ0l?w=1096&amp;h=891" src="https://static.alili.tech/img/bVUQ0l?w=1096&amp;h=891" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[js高手之路]深入浅出webpack教程系列2-配置文件webpack.config.js详解(上)

## 原文链接
[https://segmentfault.com/a/1190000011127793](https://segmentfault.com/a/1190000011127793)

