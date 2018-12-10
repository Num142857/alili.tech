---
title: 'vue-cli中一些webpack的配置总结' 
date: 2018-12-11 2:30:10
hidden: true
slug: qi9he6u1z3
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一：配置npm run dev时直接打开浏览器</h3>
<ol>
<li>在bulid的目录下直接找到webpack.dev.conf.js</li>
<li>搜索devServer，找到open: config.dev.autoOpenBrowser,你会发现依赖于config的文件夹，</li>
<li>进去config文件夹找到index.js</li>
<li>搜索autoOpenBrowser这个关键字，把后面的值改为true。</li>
</ol>
<h3 id="articleHeader1">二：修改端口号的两种方法</h3>
<ol>
<li>和上面一样，在config的index的文件里面搜索port直接修改；</li>
<li>在命令行启动的时候修改: PORT=4000 npm run dev</li>
</ol>
<h3 id="articleHeader2">三：打包时候加上--report来分析代码</h3>
<p>npm run build --report</p>
<h3 id="articleHeader3">四：配置代理</h3>
<ol>
<li>在config的目录下面找到dev（开发环境里）的proxyTable</li>
<li>配置代理</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api/**': {
    target: 'http://www.xxx.com', // 你接口的域名
    secure: false,      // 如果是https接口，需要配置这个参数
    changeOrigin: true,     // 如果接口跨域，需要进行这个参数配置
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">proxyTable: {
  <span class="hljs-string">'/api/**'</span>: {
    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://www.xxx.com'</span>, <span class="hljs-comment">// 你接口的域名</span>
    secure: <span class="hljs-literal">false</span>,      <span class="hljs-comment">// 如果是https接口，需要配置这个参数</span>
    changeOrigin: <span class="hljs-literal">true</span>,     <span class="hljs-comment">// 如果接口跨域，需要进行这个参数配置</span>
  }
}</code></pre>
<h3 id="articleHeader4">五：使用less预编译语言</h3>
<p>1：安装less的loader：npm install less less-loader --save-dev</p>
<h3 id="articleHeader5">六：配置组件里面的路径</h3>
<p>1: 在webpack.base.conf.js搜索resolve，在alias对象里面配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        '@': resolve('src'),
        'common': resolve('src/common'),
        'components':  resolve('src/components'),
        'base': resolve('src/base'),
        'api': resolve('src/api')
    }
}
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        '@': resolve('src'),
        'common': resolve('src/common'),
        'components':  resolve('src/components'),
        'base': resolve('src/base'),
        'api': resolve('src/api')
    }
}
   </code></pre>
<p>2: 在组建里面使用就不用使用相对路径一直向上找了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 组件里面使用例子
import Scroll from 'base/scroll/scroll';
import {prefixStyle} from 'common/js/dom'；
import {getRecommend, getDiscList} from 'api/recommend'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 组件里面使用例子</span>
<span class="hljs-keyword">import</span> Scroll <span class="hljs-keyword">from</span> <span class="hljs-string">'base/scroll/scroll'</span>;
<span class="hljs-keyword">import</span> {prefixStyle} <span class="hljs-keyword">from</span> <span class="hljs-string">'common/js/dom'</span>；
<span class="hljs-keyword">import</span> {getRecommend, getDiscList} <span class="hljs-keyword">from</span> <span class="hljs-string">'api/recommend'</span></code></pre>
<h3 id="articleHeader6">七：处理打包上线后生成的js和css文件加载404</h3>
<p>在根目录的config文件下面找的index.js文件，修改bulid下面的配置assetsPublicPath，在/前面加一个.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assetsPublicPath: './'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">assetsPublicPath:</span> <span class="hljs-string">'./'</span>,</code></pre>
<h3 id="articleHeader7">八：去掉打包后生成的map文件</h3>
<p>在根目录的config文件下面找的index.js文件，修改bulid下面的配置productionSourceMap为false</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="productionSourceMap: false," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">productionSourceMap:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli中一些webpack的配置总结

## 原文链接
[https://segmentfault.com/a/1190000013648542](https://segmentfault.com/a/1190000013648542)

