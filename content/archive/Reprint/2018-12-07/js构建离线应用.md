---
title: 'js构建离线应用' 
date: 2018-12-07 2:30:10
hidden: true
slug: clzese052j6
categories: [reprint]
---

{{< raw >}}

                    
<h4>内容主要引用自吴浩麟著《webpack深入浅出》</h4>
<h2 id="articleHeader0">离线应用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="离线应用的优点：
在没有网络的情况下能打开网页。
由于部分缓存的资源直接从本地加载，所以对用户来说可以加快网页的加载速度，减少服务器压力。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>离线应用的优点：
在没有网络的情况下能打开网页。
由于部分缓存的资源直接从本地加载，所以对用户来说可以加快网页的加载速度，减少服务器压力。
</code></pre>
<h3 id="articleHeader1">技术实现：</h3>
<p>离线应用的核心是离线缓存技术，历史上曾先后出现两种离线缓存技术。</p>
<ul>
<li>AppCache：又叫做Application Cache，目录已经从web标准中删除，尽量不要使用。</li>
<li>Service Workers：目前最新的离线缓存技术，是Web Worker的一部分，它通过拦截网络请求实现离线缓存，比                    AppCache更灵活。因为它可以通过js代码去控制缓存的逻辑。</li>
</ul>
<blockquote></blockquote>
<h3 id="articleHeader2">Service Workers</h3>
<blockquote>Service Workers是一个在浏览器后台运行的脚本，它的生命周期完全独立于网页，它无法直接访问DOM。它可以通过postMessage接口发送消息来和UI进程通信。   <p>拦截网络功能是Service Workers的重要功能。通过Service Workers能完成离线缓存，编辑响应，过滤响应等功能。</p>
<p>目前Chrome,Firefox,Opera都已经全面支持Service Workers。但只有高版本的Android支持移动端的浏览器。，由于Service Workers无法通过注入Polyfill实现兼容，所以在打算使用它前，请先确认自己的网页的运行场景。</p>
</blockquote>
<p>注：Polyfill：<br><em>垫片，就是帮你加一层东西来解决问题，不光是兼容性问题，pollyfill是个概念举个例子，有些旧浏览器不支持Number.isNaN方法，Polyfill就可以是这样的</em>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="·if(!Number.isNaN) {
    Number.isNaN = function(num) {
        return(num !== num);
    }
}·" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>·<span class="hljs-keyword">if</span>(!<span class="hljs-built_in">Number</span>.isNaN) {
    <span class="hljs-built_in">Number</span>.isNaN = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">num</span>) </span>{
        <span class="hljs-keyword">return</span>(num !== num);
    }
}·</code></pre>
<p>啥意思呢，就是假如浏览器没有Number.isNaN方法，那咱们就给它添加上去，所谓Polyfill就是这样解决API的兼容问题的。<br>判断浏览器是否支持Service Workers的最简单方法是通过以下代码：<br>if(navigator.serviceWorker){alert(true)}</p>
<blockquote></blockquote>
<h3 id="articleHeader3">注册Service Workers</h3>
<p>要为网页接入Service Workers，需要在网页加载后注册一个描述Service Workers逻辑的脚本，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`if(navigator.serviceWorker)
{
    window.addEventListener('DOMContentLoaded',function(){
        navigator.serviceWorker.register('./sw.js')
    })
}`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>`<span class="javascript"><span class="hljs-keyword">if</span>(navigator.serviceWorker)
{
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        navigator.serviceWorker.register(<span class="hljs-string">'./sw.js'</span>)
    })
}</span>`
</code></pre>
<p>一旦这个脚本文件被加载，Service Workers的安装就开始了，在这个脚本被安装到浏览器中后，<br>就算是用户关闭了当前网页，它仍会存在，也就是第一次打开该网页时，Service Workers的逻辑不会生效。<br>因为脚本还没有被加载和注册，但是以后再次打开该网页时脚本里的逻辑将会生效。</p>
<p>在Chrome中可以通过打开网址chrome://inspect/#service-workers来查看当前浏览器中所有已注册的Service Workers。</p>
<h3 id="articleHeader4">更新缓存</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="浏览器针对Service Workers有如下机制：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">浏览器针对Service Workers有如下机制：</code></pre>
<ul>
<li>每次打开接入了Service Workers的网页时，浏览器都会重新下载Service Workers脚本文件，所以要注意该脚本文件不要太大，如果发现和当前已经注册过的文件存在字节差异，就将其视为“新服务工作线程”。</li>
<li>新的Service Workers线程将会启动，且将会触发其install事件。</li>
<li>当网站上当前打开的页面关闭时，旧的Service Workers线程将会被终止，新的Service Workers线程将会取得控制权。</li>
<li>新的Service Workers线程取得控制权后，将会触发其activate事件。</li>
<li>
<p>新的Service Workers线程中的activate事件就是清理旧缓存的最佳时间点</p>
<p>Service Workers在注册成功后会在其生命周期中派发一些事件，通过监听对应的事件，在特定的时间上做一些事情。</p>
<p>在Service Workers脚本中引入了新的关键字self，代表当前的Service Workers实例。</p>
<p>在Service Workers安装成功后会派发出install事件，需要在这个事件中执行缓存资源的逻辑。</p>
</li>
</ul>
<h3 id="articleHeader5">接入webpack</h3>
<p>用webpack构建接入Service Workers的离线应用时，要解决的问题在于如何生成之前提到的sw.js文件。<br>并且sw.js文件中的cacheFileList变量，代表需要被缓存文件的URL列表，需要根据输出文件列表所对应的URL来决定。而不是写成静态值。</p>
<p>webpack没有原生功能可以完成以上需求，可以使用插件serviceworker-webpack-plugin<br>·</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ServiceWorkerWebpackPlugin=require('serviceworker-webpack-plugin')
    new ServiceWorkerWebpackPlugin({
            // 自定义的 sw.js 文件所在路径
            // ServiceWorkerWebpackPlugin 会把文件列表注入到生成的 sw.js 中
            entry: path.join(__dirname, 'sw.js'),
        })
    devServer: {
        //Service Workers依赖HTTPS，使用DevServer提供的HTTPS功能。
        https:true
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> ServiceWorkerWebpackPlugin=require(<span class="hljs-string">'serviceworker-webpack-plugin'</span>)
    <span class="hljs-keyword">new</span> ServiceWorkerWebpackPlugin({
            <span class="hljs-comment">// 自定义的 sw.js 文件所在路径</span>
            <span class="hljs-comment">// ServiceWorkerWebpackPlugin 会把文件列表注入到生成的 sw.js 中</span>
            entry: path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'sw.js'</span>),
        })
    devServer: {
        <span class="hljs-comment">//Service Workers依赖HTTPS，使用DevServer提供的HTTPS功能。</span>
        https:<span class="hljs-literal">true</span>
    }</code></pre>
<p>·<br>在目录下新建sw.js文件，手动写手更新缓存里的代码，。</p>
<p>serviceworker-webpack-plugin为了保证灵活性，允许使用都自定义sw.js，构建输出的sw.js文件中会在头部注入一个变量serviceWorkerOption.assets到全局，里面存放着所有需要被缓存的文件的URL列表。</p>
<p>需要将sw.js里的文件列表变量写成动态的<br>·</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cacheFileList=global.serviceWorkerOption.assets

在main.js代码中注册:
if (navigator.serviceWorker) {
    window.addEventListener('DOMContentLoaded',function() {
        // 调用 serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径
        navigator.serviceWorker.register('sw.js');
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> cacheFileList=global.serviceWorkerOption.assets

在main.js代码中注册:
<span class="hljs-keyword">if</span> (navigator.serviceWorker) {
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 调用 serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径</span>
        navigator.serviceWorker.register(<span class="hljs-string">'sw.js'</span>);
    });
}</code></pre>
<p>·</p>
<p>**<br>注：使用Service Workers技术需要依赖HTTPS，可以使用DevServer提供的HTTPS功能。DevServer会自动生成一份HTTPS证书。<br>**</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js构建离线应用

## 原文链接
[https://segmentfault.com/a/1190000014107047](https://segmentfault.com/a/1190000014107047)

