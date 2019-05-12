---
title: '解决Vue引入百度地图JSSDK：BMap is undefined 问题' 
date: 2018-12-18 2:30:10
hidden: true
slug: rbh8472za3f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文链接：<a href="http://www.huchiwei.com/2018/01/11/%E8%A7%A3%E5%86%B3Vue%E5%BC%95%E5%85%A5%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BEJSSDK%EF%BC%9ABMap%20is%20undefined%20%E9%97%AE%E9%A2%98/" rel="nofollow noreferrer" target="_blank">解决Vue引入百度地图JSSDK：BMap is undefined 问题</a>
</blockquote>
<p>百度地图官网文档介绍使用JSSDK时，仅提供了2种引入方式：</p>
<ul>
<li>script引入</li>
<li>异步加载</li>
</ul>
<p>但vue项目中仅某一两个页面需要用到百度地图，所以不想在 <code>index.html</code> 中全局引用。</p>
<p>那在单个vue组件页面中如何引入呢？</p>
<p>刚开始时，是直接通过 DOM 操作方式插入script标签到当前document中，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let scriptNode = document.createElement(&quot;script&quot;);
scriptNode.setAttribute(&quot;type&quot;, &quot;text/javascript&quot;);
scriptNode.setAttribute(&quot;src&quot;, &quot;http://api.map.baidu.com/api?v=3.0&amp;ak=您的密钥&quot;);
document.body.appendChild(scriptNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> scriptNode = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
scriptNode.setAttribute(<span class="hljs-string">"type"</span>, <span class="hljs-string">"text/javascript"</span>);
scriptNode.setAttribute(<span class="hljs-string">"src"</span>, <span class="hljs-string">"http://api.map.baidu.com/api?v=3.0&amp;ak=您的密钥"</span>);
<span class="hljs-built_in">document</span>.body.appendChild(scriptNode);</code></pre>
<p><strong>结果是不行的。</strong></p>
<p>然后考虑使用异步加载的方式，结合参考网上方案，单独创建<code>baidu-map.js</code>脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  init: function (){
    const AK = &quot;AK密钥&quot;;
    const apiVersion = &quot;3.0&quot;;
    const timestamp = new Date().getTime();
    const BMap_URL = &quot;http://api.map.baidu.com/api?v=&quot;+ apiVersion +&quot;&amp;ak=&quot;+ AK +&quot;&amp;services=&amp;t=&quot; + timestamp;
    return new Promise((resolve, reject) => {
      // 插入script脚本
      let scriptNode = document.createElement(&quot;script&quot;);
      scriptNode.setAttribute(&quot;type&quot;, &quot;text/javascript&quot;);
      scriptNode.setAttribute(&quot;src&quot;, BMap_URL);
      document.body.appendChild(scriptNode);

      // 等待页面加载完毕回调
      window.onload = function () {  
         resolve(BMap)  
       } 
    });
  }
}

// -------------------------
// vue引入调用
import BaiduMap from 'baidu-map';

...
mounted(){
    BauduMap.init()
    .then((BMap) => {
        console.log(BMap)
        console.log(&quot;加载成功...&quot;)
    })
}
...  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">const</span> AK = <span class="hljs-string">"AK密钥"</span>;
    <span class="hljs-keyword">const</span> apiVersion = <span class="hljs-string">"3.0"</span>;
    <span class="hljs-keyword">const</span> timestamp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
    <span class="hljs-keyword">const</span> BMap_URL = <span class="hljs-string">"http://api.map.baidu.com/api?v="</span>+ apiVersion +<span class="hljs-string">"&amp;ak="</span>+ AK +<span class="hljs-string">"&amp;services=&amp;t="</span> + timestamp;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-comment">// 插入script脚本</span>
      <span class="hljs-keyword">let</span> scriptNode = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
      scriptNode.setAttribute(<span class="hljs-string">"type"</span>, <span class="hljs-string">"text/javascript"</span>);
      scriptNode.setAttribute(<span class="hljs-string">"src"</span>, BMap_URL);
      <span class="hljs-built_in">document</span>.body.appendChild(scriptNode);

      <span class="hljs-comment">// 等待页面加载完毕回调</span>
      <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
         resolve(BMap)  
       } 
    });
  }
}

<span class="hljs-comment">// -------------------------</span>
<span class="hljs-comment">// vue引入调用</span>
<span class="hljs-keyword">import</span> BaiduMap <span class="hljs-keyword">from</span> <span class="hljs-string">'baidu-map'</span>;

...
mounted(){
    BauduMap.init()
    .then(<span class="hljs-function">(<span class="hljs-params">BMap</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(BMap)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"加载成功..."</span>)
    })
}
...  </code></pre>
<p><strong>结果还是不行。</strong></p>
<p>想了下原因，一、可能是vue中window.onload没有触发，二、百度地图JSSDK没有真正加载成功。</p>
<p>继续验证测试，发现window.onload能够正常触发，那就是JSSDK没有加载成功。</p>
<p>直接复制JSSDK URL浏览器中打开 <a href="http://api.map.baidu.com/api?v=3.0&amp;ak=" rel="nofollow noreferrer" target="_blank">http://api.map.baidu.com/api?v=3.0&amp;ak=您的密钥</a> ，<strong>关键点来了</strong>，打开后内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){ 
window.BMap_loadScriptTime = (new Date).getTime(); 
document.write('<script type=&quot;text/javascript&quot; src=&quot;http://api.map.baidu.com/getscript?v=3.0&amp;ak=您的密钥&amp;services=&amp;t=20180102163224&quot;></script>');
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
<span class="hljs-built_in">window</span>.BMap_loadScriptTime = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).getTime(); 
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;script type="text/javascript" src="http://api.map.baidu.com/getscript?v=3.0&amp;ak=您的密钥&amp;services=&amp;t=20180102163224"&gt;&lt;/script&gt;'</span>);
})();</code></pre>
<p>从返回内容中看出，立即执行函数中再次插入了另外一个&lt;scirpt&gt;标签，经检查发现这个&lt;scirpt&gt;实际并没有插入成功。</p>
<p><strong>既然如此，那就直接把脚本放到我们上面的代码中去加载，结果就真的成功了。</strong></p>
<p><strong>修改优化后的代码如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  init: function (){
    console.log(&quot;初始化百度地图脚本...&quot;);
    const AK = &quot;AK密钥&quot;;
    const apiVersion = &quot;3.0&quot;;
    const timestamp = new Date().getTime();
    const BMap_URL = &quot;http://api.map.baidu.com/getscript?v=&quot;+ apiVersion +&quot;&amp;ak=&quot;+ AK +&quot;&amp;services=&amp;t=&quot; + timestamp;
    return new Promise((resolve, reject) => {
      if(typeof BMap !== &quot;undefined&quot;) {
        resolve(BMap);
        return true;
      }

      // 插入script脚本
      let scriptNode = document.createElement(&quot;script&quot;);
      scriptNode.setAttribute(&quot;type&quot;, &quot;text/javascript&quot;);
      scriptNode.setAttribute(&quot;src&quot;, BMap_URL);
      document.body.appendChild(scriptNode);

      // 等待页面加载完毕回调
      let timeout = 0;
      let interval = setInterval(() => {
        // 超时10秒加载失败
        if(timeout >= 20) {
          reject();
          clearInterval(interval);
          console.error(&quot;百度地图脚本初始化失败...&quot;);
        }
        // 加载成功
        if(typeof BMap !== &quot;undefined&quot;) {
          resolve(BMap);
          clearInterval(interval);
          console.log(&quot;百度地图脚本初始化成功...&quot;);
        }
        timeout += 1;
      }, 500);
    });
  }
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"初始化百度地图脚本..."</span>);
    <span class="hljs-keyword">const</span> AK = <span class="hljs-string">"AK密钥"</span>;
    <span class="hljs-keyword">const</span> apiVersion = <span class="hljs-string">"3.0"</span>;
    <span class="hljs-keyword">const</span> timestamp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
    <span class="hljs-keyword">const</span> BMap_URL = <span class="hljs-string">"http://api.map.baidu.com/getscript?v="</span>+ apiVersion +<span class="hljs-string">"&amp;ak="</span>+ AK +<span class="hljs-string">"&amp;services=&amp;t="</span> + timestamp;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> BMap !== <span class="hljs-string">"undefined"</span>) {
        resolve(BMap);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      }

      <span class="hljs-comment">// 插入script脚本</span>
      <span class="hljs-keyword">let</span> scriptNode = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
      scriptNode.setAttribute(<span class="hljs-string">"type"</span>, <span class="hljs-string">"text/javascript"</span>);
      scriptNode.setAttribute(<span class="hljs-string">"src"</span>, BMap_URL);
      <span class="hljs-built_in">document</span>.body.appendChild(scriptNode);

      <span class="hljs-comment">// 等待页面加载完毕回调</span>
      <span class="hljs-keyword">let</span> timeout = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">let</span> interval = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 超时10秒加载失败</span>
        <span class="hljs-keyword">if</span>(timeout &gt;= <span class="hljs-number">20</span>) {
          reject();
          clearInterval(interval);
          <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"百度地图脚本初始化失败..."</span>);
        }
        <span class="hljs-comment">// 加载成功</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> BMap !== <span class="hljs-string">"undefined"</span>) {
          resolve(BMap);
          clearInterval(interval);
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"百度地图脚本初始化成功..."</span>);
        }
        timeout += <span class="hljs-number">1</span>;
      }, <span class="hljs-number">500</span>);
    });
  }
}  </code></pre>
<p>问题到此就解决了，至于为什么用官网提供的地址没有真正加载到JSSDK这个问题有空再研究下。</p>
<hr>
<p><strong>最新解决方案</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  init: function (){
    //console.log(&quot;初始化百度地图脚本...&quot;);
    const AK = &quot;AK密钥&quot;;
    const BMap_URL = &quot;https://api.map.baidu.com/api?v=2.0&amp;ak=&quot;+ AK +&quot;&amp;s=1&amp;callback=onBMapCallback&quot;;
    return new Promise((resolve, reject) => {
      // 如果已加载直接返回
      if(typeof BMap !== &quot;undefined&quot;) {
        resolve(BMap);
        return true;
      }
      // 百度地图异步加载回调处理
      window.onBMapCallback = function () {
        console.log(&quot;百度地图脚本初始化成功...&quot;);
        resolve(BMap);
      };

      // 插入script脚本
      let scriptNode = document.createElement(&quot;script&quot;);
      scriptNode.setAttribute(&quot;type&quot;, &quot;text/javascript&quot;);
      scriptNode.setAttribute(&quot;src&quot;, BMap_URL);
      document.body.appendChild(scriptNode);
    });
  }
}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//console.log("初始化百度地图脚本...");</span>
    <span class="hljs-keyword">const</span> AK = <span class="hljs-string">"AK密钥"</span>;
    <span class="hljs-keyword">const</span> BMap_URL = <span class="hljs-string">"https://api.map.baidu.com/api?v=2.0&amp;ak="</span>+ AK +<span class="hljs-string">"&amp;s=1&amp;callback=onBMapCallback"</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-comment">// 如果已加载直接返回</span>
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> BMap !== <span class="hljs-string">"undefined"</span>) {
        resolve(BMap);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      }
      <span class="hljs-comment">// 百度地图异步加载回调处理</span>
      <span class="hljs-built_in">window</span>.onBMapCallback = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"百度地图脚本初始化成功..."</span>);
        resolve(BMap);
      };

      <span class="hljs-comment">// 插入script脚本</span>
      <span class="hljs-keyword">let</span> scriptNode = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
      scriptNode.setAttribute(<span class="hljs-string">"type"</span>, <span class="hljs-string">"text/javascript"</span>);
      scriptNode.setAttribute(<span class="hljs-string">"src"</span>, BMap_URL);
      <span class="hljs-built_in">document</span>.body.appendChild(scriptNode);
    });
  }
}  </code></pre>
<p>优化如下：</p>
<ul>
<li>直接使用官网提供的引用地址：<code>http://api.map.baidu.com/api?v=2.0&amp;ak=您的密钥</code>
</li>
<li>启用 <code>callback</code> 参数，异步加载必须使用此参数才可以生效</li>
<li>启用 <code>https</code> 配置，通过 <code>s=1</code> 参数实现</li>
<li>API版本为<code>2.0</code>，经测试使用，发现<code>3.0</code>版本在HTTPS环境下是有问题的，脚本内部某些请求固定使用HTTP，无法正常使用。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决Vue引入百度地图JSSDK：BMap is undefined 问题

## 原文链接
[https://segmentfault.com/a/1190000012815739](https://segmentfault.com/a/1190000012815739)

