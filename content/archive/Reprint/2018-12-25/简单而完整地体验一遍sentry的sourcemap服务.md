---
title: '简单而完整地体验一遍sentry的sourcemap服务' 
date: 2018-12-25 2:30:11
hidden: true
slug: l7nuulsjwd
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">sentry</h3>
<p>Sentry是一个日志平台, 支持多种语言多种框架, 在接入sentry的同时, 也接入了国内的fundebug, 相对而言, sentry的服务会比较完善, 比如上报控制, cross-original, 40M的sourcemap(如果自行搭建可以忽略), 支持自行搭建服务.... 当然了, 也很感谢fundebug的技术人员耐心为我解答了几个问题</p>
<h5>官网</h5>
<p><a href="https://sentry.io" rel="nofollow noreferrer" target="_blank">https://sentry.io</a></p>
<h5>具体接入流程(简单体验, 不使用框架)</h5>
<ol>
<li><p>注册(登录)-&gt;创建团队-&gt;创建项目(这些不细讲, 官网对这些步骤的提醒很明确)</p></li>
<li>
<p>创建完之后sentry会指引我们怎么在代码层接入<span class="img-wrap"><img data-src="/img/bVYIUQ?w=1161&amp;h=1100" src="https://static.alili.tech/img/bVYIUQ?w=1161&amp;h=1100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>   我这里选择的是Vue,由于只是简单体验, 这里我不使用Vue, copy其中的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://cdn.ravenjs.com/3.20.0/vue/raven.min.js&quot; crossorigin=&quot;anonymous&quot;></script>
<script>
    Raven.config('https://xxxxxxxxxxxxx').install();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.ravenjs.com/3.20.0/vue/raven.min.js"</span> <span class="hljs-attr">crossorigin</span>=<span class="hljs-string">"anonymous"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    Raven.config(<span class="hljs-string">'https://xxxxxxxxxxxxx'</span>).install();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
</li>
<li>
<p>新建一个html文件, 并在head标签内粘贴以上代码, 然后添加一个可以点击的元素:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <button id=&quot;container&quot;>上报</button>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"container"</span>&gt;</span>上报<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
</li>
<li>
<p>新建一个test.ts(习惯性问题, 具体新建js/ts自行选择)文件, 简单写一个必然报错的事件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(() => {
  window.onload = () => {
    document.getElementById('container').addEventListener('click', e => {
      console.log(window['aaa'].aaa)
    }, false)
  }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(() =&gt; {
  window.onload = () =&gt; {
    document.getElementById(<span class="hljs-name">'container'</span>).addEventListener(<span class="hljs-name">'click'</span>, e =&gt; {
      console.log(<span class="hljs-name">window</span>['aaa'].aaa)
    }, <span class="hljs-literal">false</span>)
  }
})()</code></pre>
</li>
<li>
<p>编译并生成sourcemap(--inlineSources为保证sourcemap内有sourceContent, 如果没有sourceContent, sentry后台会报找不到test.ts的错误, 这个时候需要连同test.ts上传才能正常使用, 使用webpack时请<a href="https://docs.fundebug.com/notifier/javascript/sourcemap/generate/webpack.html" rel="nofollow noreferrer" target="_blank">参考</a>):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tsc test.ts --sourcemap --inlineSources" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">tsc</span> <span class="hljs-comment">test</span><span class="hljs-string">.</span><span class="hljs-comment">ts</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">sourcemap</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inlineSources</span></code></pre>
</li>
<li>
<p>由于日常项目中静态资源都放在七牛, 为保证完整性, 也同样手动上传到七牛, 上传后的可访问地址为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://mydomain/assets/test.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">https:<span class="hljs-regexp">//my</span>domain<span class="hljs-regexp">/assets/</span>test.js</code></pre>
</li>
<li>
<p>在html&gt;head标签结束前添加script标签引用tets.js(这里不需要加crossorigin, 使用fundebug不加的话会报错):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://mydomain/assets/tets.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://mydomain/assets/tets.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>部署html到服务器, 使其可访问</p>
</li>
<li>
<p>在sentry中用鼠标点击左下角API生成一个token:</p>
<p><span class="img-wrap"><img data-src="/img/bVYI7B?w=264&amp;h=232" src="https://static.alili.tech/img/bVYI7B?w=264&amp;h=232" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>生成时保证勾选了选项中的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" project:write" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">project</span>:<span class="hljs-keyword">write</span></code></pre>
</li>
<li>
<p>sentry-cli上传sourcemap(注意下载时不要过新的node版本, 当时用9.2.0报错, 切回到6.11.1正常下载):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo npm install sentry-cli-binary -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">sudo npm <span class="hljs-keyword">install </span>sentry-cli-<span class="hljs-keyword">binary </span>-g</code></pre>
<p>登录(这样要使用到上面生成的token):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sentry-cli login" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">sentry-<span class="hljs-keyword">cli</span> login</code></pre>
<p>创建一个release</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sentry-cli releases -o 团队名称 -p 项目名称 new release名称" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">sentry-cli releases -o 团队名称 -p 项目名称 <span class="hljs-keyword">new</span> <span class="hljs-built_in">release</span>名称</code></pre>
<p>注意"release名称"这个东东, 官方有明确声明, 在上传sourcemap到sentry这种做法下, 必须要在Raven初始化时匹配上release, 否则会sentry后台接收到错误上报之后会报找不到该sourcemap的错误, 所以, 需要修改script标签中的Raven.config为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Raven.config('https://xxxxxxxxxxxxx', {
    release: 'release名称'
}).install();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>Raven.<span class="hljs-built_in">config</span>(<span class="hljs-string">'https://xxxxxxxxxxxxx'</span>, {
    <span class="hljs-built_in">release</span>: <span class="hljs-string">'release名称'</span>
}).install();</code></pre>
<p>上传</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sentry-cli releases -o 团队名称 -p 项目名称 files release名称 upload-sourcemaps --url-prefix URL_PREFIX DIR" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">sentry-cli releases -o 团队名称 -p 项目名称 <span class="hljs-built_in">files</span> release名称 upload-sourcemaps <span class="hljs-comment">--url-prefix URL_PREFIX DIR</span></code></pre>
<p>其中的URL_PREFIX必须你要与js文件访问的路径保持一致, 即:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://mydomain/assets" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">https:</span><span class="hljs-comment">//mydomain/assets</span></code></pre>
<p>DIR为你的本地sourcemap目录(我个人做法是把sourcemap提取到一个名为sourcemaps的目录下, 这样就不用管有其他文件影响)</p>
</li>
<li>
<p>访问刚刚部署的这个html, 点击, 使其上报一次错误, network中会有这样的一个post请求:</p>
<p><span class="img-wrap"><img data-src="/img/bVYJfG?w=1283&amp;h=233" src="https://static.alili.tech/img/bVYJfG?w=1283&amp;h=233" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>   sentry控制台上会出现一个Unresolved Issues, 点击查看详细</p>
<p><span class="img-wrap"><img data-src="/img/bVYJgu?w=1327&amp;h=1075" src="https://static.alili.tech/img/bVYJgu?w=1327&amp;h=1075" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>   sentry会根据sourcemap的内容去解析出这一个错误的位置</p>
</li>
</ol>
<p>11.访问<a href="https://mydomain/assets/tets.js.map," rel="nofollow noreferrer" target="_blank">https://mydomain/assets/tets....</a> 确认我们的sourcemap没有被用户访问到</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单而完整地体验一遍sentry的sourcemap服务

## 原文链接
[https://segmentfault.com/a/1190000012051620](https://segmentfault.com/a/1190000012051620)

