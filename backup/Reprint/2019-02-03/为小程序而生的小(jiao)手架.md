---
title: '为小程序而生的小(jiao)手架' 
date: 2019-02-03 2:30:39
hidden: true
slug: brw3ebywoba
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote><p>不久前我们一直所期待的应（xiao）用（cheng）号（xu）终于诞生了，但微信制造了一系列的封闭环境，在内测版中，我们看见了开发其实是十分不便利的。为了能提升咱们的工作效率，小手架由此而生 --- wxapp</p></blockquote>
<h2 id="articleHeader1">wxapp介绍</h2>
<h4>优势</h4>
<p>1.可以在任意IDE中开发</p>
<p>2.可使用ES6或ES5</p>
<p>3.可使用sass</p>
<p>4.可以同时编写<code>.html|.wxml</code>，<code>.wxss|.scss</code> 文件，最后都会转换为<code>.wxml</code>和<code>.wxss</code></p>
<p>5.编写完任何文件（包括.json）只需要去微信开发者工具中点击重启即可预览</p>
<p>6.NODE_ENV 环境切换</p>
<h4>劣势</h4>
<p>1.由于微信封闭的环境内，所以没有<code>sourcemap</code>，但这不太影响调试（即使是经过编译后的代码，本人测试了出bug的代码，还是可以从控制台跳到源码的地方）</p>
<p>2.由于微信封闭的环境内，无法实现<code>reload</code>或者<code>hot reload</code></p>
<blockquote><p>PS: 当然如果你不想写ES6也是完全可以的 在后面统一介绍命令</p></blockquote>
<h2 id="articleHeader2">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装我们的命令
//mac
sudo npm i -g wxapp
// window
npm i -g wxapp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 安装我们的命令</span>
<span class="hljs-comment">//mac</span>
sudo npm i -g wxapp
<span class="hljs-comment">// window</span>
npm i -g wxapp</code></pre>
<h2 id="articleHeader3">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 初始化一个目录结构
wxapp init [project_name]

// 如
wxapp init first-wxapp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 初始化一个目录结构</span>
wxapp init [project_name]

<span class="hljs-comment">// 如</span>
wxapp init first-wxapp</code></pre>
<h2 id="articleHeader4">DEV</h2>
<p><code>npm run dev</code> // 默认启用了ES6模式</p>
<p><code>npm run dev-es5</code> // 不启用ES6模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
--- dist
... // 这里的文件是编译处理过后的，和src目录结构完全相同     
--- src
    |--- image
    |--- pages
        |--- index
            |--- index.js
            |--- index.scss （可直接编写sass）
            |--- index.html (可直接编写html文件)
        |--- logs
            |--- logs.js
            |--- logs.json （json文件也会实时编译）
            |--- logs.wxml （也可直接写wxml文件）
            |--- logs.wxss （也可直接写wxss文件）
    app.js
    app.json
    app.sass
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
--- dist
... <span class="hljs-comment">// 这里的文件是编译处理过后的，和src目录结构完全相同     </span>
--- src
    |--- image
    |--- pages
        |--- index
            |--- index.js
            |--- index.scss （可直接编写sass）
            |--- index.html (可直接编写html文件)
        |--- logs
            |--- logs.js
            |--- logs.json （json文件也会实时编译）
            |--- logs.wxml （也可直接写wxml文件）
            |--- logs.wxss （也可直接写wxss文件）
    app.js
    app.json
    app.sass
...</code></pre>
<p>接着我们只需要打开微信开发者工具，添加项目，那个项目目录指向为<code>dist</code>目录即可。<br><span class="img-wrap"><img data-src="/img/remote/1460000007007993?w=581&amp;h=493" src="https://static.alili.tech/img/remote/1460000007007993?w=581&amp;h=493" alt="微信开发者工具" title="微信开发者工具" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">NODE_ENV</h2>
<p>开发中往往我们需要有<code>dev</code>和<code>pro</code>环境，根据不同环境下做一些事情，比如HTTP的请求链接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6开发模式下
//  ./src/utils/ajaxurl.js
var server1 = 'https://im.server1.url';
var server2 = 'https://im.server2.url';

var server = null;
        
if(NODE_ENV === 'dev') {
    server = server1;
} else if(NODE_ENV === 'production') {
    server = server2;
}
  
module.exports = server;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES6开发模式下</span>
<span class="hljs-comment">//  ./src/utils/ajaxurl.js</span>
<span class="hljs-keyword">var</span> server1 = <span class="hljs-string">'https://im.server1.url'</span>;
<span class="hljs-keyword">var</span> server2 = <span class="hljs-string">'https://im.server2.url'</span>;

<span class="hljs-keyword">var</span> server = <span class="hljs-literal">null</span>;
        
<span class="hljs-keyword">if</span>(NODE_ENV === <span class="hljs-string">'dev'</span>) {
    server = server1;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(NODE_ENV === <span class="hljs-string">'production'</span>) {
    server = server2;
}
  
<span class="hljs-built_in">module</span>.exports = server;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES5开发模式下  
//  ./src/utils/ajaxurl.js
var server1 = 'https://im.server1.url';
var server2 = 'https://im.server2.url';

var server = null;
        
if('NODE_ENV' === 'dev') { // 这里要写字符串，我会替换这里的字符串
    server = server1;
} else if('NODE_ENV' === 'production') {
    server = server2;
}
  
module.exports = server;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ES5开发模式下  </span>
<span class="hljs-comment">//  ./src/utils/ajaxurl.js</span>
<span class="hljs-keyword">var</span> server1 = <span class="hljs-string">'https://im.server1.url'</span>;
<span class="hljs-keyword">var</span> server2 = <span class="hljs-string">'https://im.server2.url'</span>;

<span class="hljs-keyword">var</span> server = <span class="hljs-literal">null</span>;
        
<span class="hljs-keyword">if</span>(<span class="hljs-string">'NODE_ENV'</span> === <span class="hljs-string">'dev'</span>) { <span class="hljs-comment">// 这里要写字符串，我会替换这里的字符串</span>
    server = server1;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-string">'NODE_ENV'</span> === <span class="hljs-string">'production'</span>) {
    server = server2;
}
  
<span class="hljs-built_in">module</span>.exports = server;</code></pre>
<h2 id="articleHeader6">Build</h2>
<p><code>npm run build</code> // 默认ES6模式 </p>
<p><code>npm run build-es5</code> // 使用ES5编写模式</p>
<p>PS：这里有个坑，由于build会压缩代码，所以如果你用ES5编写，别用promise这样的ES6的代码，uglify压缩不支持。</p>
<p>虽然微信开发者工具用谷歌内核貌似支持部分ES6的代码，但现在也不能保证用户真正使用是否支持。如果写了ES5模式，建议大家写纯纯的ES5</p>
<h2 id="articleHeader7">TODO</h2>
<p>我们知道微信希望我们创建4个文件来写page或者组件。所以下一个版本我会写个命令创建这4个文件的template。</p>
<ul><li><p>[ ] 一键创建文件</p></li></ul>
<h2 id="articleHeader8">后话</h2>
<blockquote>
<p>小程序目前还在内测当中，本人凭着直觉和经验直接做出了这一套脚手架，在测试上可能略有不足。（目前测试了node5和node6版本，window10和mac）。大家有问题可以第一时间给我提issue，我会在一天内给你答复。</p>
<p>未来小程序完全公测了，微信可能会把工程化的问题也一并解决了。但是我还是更愿意在喜欢的IDE中编写代码 :)</p>
</blockquote>
<p>最后给出github地址：<a href="https://github.com/MeCKodo/wxapp-cli" rel="nofollow noreferrer" target="_blank">https://github.com/MeCKodo/wxapp-cli</a></p>
<h2 id="articleHeader9">硬广！</h2>
<p>最近我们创建了一个线上组织 --- 裂变科研中心</p>
<p>裂变科研中心是一个致力于开源的线上自由组织。</p>
<p>我们一直保持着对高效、创新、开源的追求。</p>
<p>希望能给大家在技术或人生的道路上带来不一样的陪伴。 </p>
<p>裂变式的成长期待你的加入。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007007994?w=430&amp;h=430" src="https://static.alili.tech/img/remote/1460000007007994?w=430&amp;h=430" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为小程序而生的小(jiao)手架

## 原文链接
[https://segmentfault.com/a/1190000007007990](https://segmentfault.com/a/1190000007007990)

