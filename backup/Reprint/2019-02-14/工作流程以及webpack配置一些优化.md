---
title: '工作流程以及webpack配置一些优化' 
date: 2019-02-14 2:30:37
hidden: true
slug: 7jcgfbk2fwj
categories: [reprint]
---

{{< raw >}}

                    
<p>前端工程化这些事情现在已经算是深入人心了，即便不清楚具体含义<code>vue-cli</code> <code>creat-react-app</code>之类的脚手架也帮助大家快速开发了不少项目。</p>
<p>今天顺便总结了下之前的一些经验，希望对大家的工作或者学习有一些帮助。<br>老生常谈的<code>splitChunks</code>、<code>Dll</code>啥的就不多说了，简单分享些插件和配置功能优化，方便大家更省力地写代码。</p>
<h1 id="articleHeader0">配置</h1>
<h2 id="articleHeader1">1. 代理配置：</h2>
<p>很多时候我们为了跨域会给<code>devServer</code>配个proxy啥的，没数据的时候要连接到mock接口上，有数据的时候又要切换到dev上，有时候又要调试复现qa环境的问题，一般像这个时候我们可以简单配个<code>npm script</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    # 默认 dev 环境
    npm run dev

    # mock 环境
    npm run dev --mock " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    <span class="hljs-comment"># 默认 dev 环境</span>
    npm run dev

    <span class="hljs-comment"># mock 环境</span>
    npm run dev --mock </code></pre>
<p>那对webpack怎么配置呢</p>
<p>新建一个<code>proxy.js</code>文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = {
    dev: {
         ... // 你的proxy配置 文档自行参考 https://webpack.js.org/configuration/dev-server/#devserver-proxy  
    },
    mock: {
        ...
    }
};

let proxy = config.dev;

for (const key in proxy) {
    if (process.env[`npm_config_${key}`]) {
        current = { ...proxy, ...config[key] };
    };
};
module.exports = current;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> config = {
    <span class="hljs-attr">dev</span>: {
         ... <span class="hljs-comment">// 你的proxy配置 文档自行参考 https://webpack.js.org/configuration/dev-server/#devserver-proxy  </span>
    },
    <span class="hljs-attr">mock</span>: {
        ...
    }
};

<span class="hljs-keyword">let</span> proxy = config.dev;

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> proxy) {
    <span class="hljs-keyword">if</span> (process.env[<span class="hljs-string">`npm_config_<span class="hljs-subst">${key}</span>`</span>]) {
        current = { ...proxy, ...config[key] };
    };
};
<span class="hljs-built_in">module</span>.exports = current;</code></pre>
<p>然后导入到你的<code>webpack.config.dev.js</code>中，设置为devServer的proxy</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const proxy = require('./proxy.js');

...
devServer: {
    ...
    proxy: proxy
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> proxy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./proxy.js'</span>);

...
devServer: {
    ...
    proxy: proxy
}</code></pre>
<p>然后就完事了，当然了，这是最简单的方式，一般情况下我们是还需要根据当前运行的环境变量再做判定的。业务上的问题这里就不展开了。</p>
<h2 id="articleHeader2">2. log信息</h2>
<p>很多时候我们会在项目运行或者打包的时候出现一大堆没啥用的信息，<br>改下webpack里的<a href="https://webpack.js.org/configuration/stats/#stats" rel="nofollow noreferrer" target="_blank">stats</a>即可<br>开发环境也可以用<a href="https://github.com/geowarin/friendly-errors-webpack-plugin" rel="nofollow noreferrer" target="_blank">friendly-errors-webpack-plugin</a>也是挺方便的</p>
<h2 id="articleHeader3">3.sourceMap</h2>
<p>开发环境随便配个喜欢的sourceMap就好，但是生产环境就要去掉了，当然为了方便qa调试，最好也为打包做好各种环境设置，<br>但是别把sourcemap打到业务代码里是每个程序员的基本素养。对，我说的就是<code>inline-source-map</code>这种配置，有的话赶紧改掉，相信我这是为了你的职业生涯考虑。生产环境要用也只能用<code>source-map</code>,然后让运维大哥随手屏蔽下所有<code>.map</code>文件即可。</p>
<h1 id="articleHeader4">功能插件</h1>
<h2 id="articleHeader5">1. 依赖分析</h2>
<p>这个是之前在vue-cli上找的，用着感觉也挺顺手的，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 下载插件
npm i -D webpack-bundle-analyzer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 下载插件</span>
npm i -D webpack-bundle-analyzer</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 注入webpack.config.prod.js
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    
    // 写入plugin     
    ...
    plugins: [
        process.env.npm_config_report &amp;&amp; new BundleAnalyzerPlugin()
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// 注入webpack.config.prod.js</span>
    <span class="hljs-keyword">const</span> { BundleAnalyzerPlugin } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>);
    
    <span class="hljs-comment">// 写入plugin     </span>
    ...
    plugins: [
        process.env.npm_config_report &amp;&amp; <span class="hljs-keyword">new</span> BundleAnalyzerPlugin()
    ]</code></pre>
<p>然后你就可以在打完包后来一个依赖分析,用着也挺方便的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">    npm run build --report</code></pre>
<h2 id="articleHeader6">2. 邮件</h2>
<p>有些利用travis 或者jenkins做远端打包的项目，在项目发布前可以简单配置一个邮件功能，包含打包内容、git commit信息什么的， 就不需要专门找人一一告知，方便所有开发人员根据业务，提高开发效率。<br>推荐<a href="https://github.com/nodemailer/nodemailer" rel="nofollow noreferrer" target="_blank">nodemailer</a></p>
<h1 id="articleHeader7">工作流程优化</h1>
<h2 id="articleHeader8">Makefile</h2>
<p>很多时候npm script 可能不够用或者说看上去并不怎么直观，因为没法写备注可能也说不清具体什么用<br>这时候可以使用Makefile<br>在根目录建个<code>Makefile</code>文件<br>然后就可以在里面配置一些基本命令，可以理解为对npm script做一个简单的封装，关键是可以写备注</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 开发
start:
    npm run dev

# 打包
build:
    npm run build

# mock环境
mock:
    npm run dev --mock
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 开发</span>
start:
    npm run dev

<span class="hljs-comment"># 打包</span>
build:
    npm run build

<span class="hljs-comment"># mock环境</span>
mock:
    npm run dev --mock
</code></pre>
<p>然后你在当前目录下输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    make start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">    make start</code></pre>
<p>就可以开始干活了</p>
<h2 id="articleHeader9">异常追踪</h2>
<p>线上环境为了保证用户隐私是不允许开发人员直接接触用户信息的，但是有些问题光靠公司现有的测试机也无法完全覆盖，异常跟踪的框架网上挺多，这里简单提一下不做深入讨论。</p>
<p>【待续】</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
工作流程以及webpack配置一些优化

## 原文链接
[https://segmentfault.com/a/1190000016823969](https://segmentfault.com/a/1190000016823969)

