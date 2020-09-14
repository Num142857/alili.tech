---
title: '通过 InnoSetup 美化安装界面' 
date: 2019-01-15 2:30:12
hidden: true
slug: o3zs5h6t6r
categories: [reprint]
---

{{< raw >}}

                    
<p>在 github 仓库里的 <a href="https://github.com/anchengjian/anchengjian.github.io/blob/master/posts/2017/use-innosetup-to-build-a-beautiful-installation-interface.md" rel="nofollow noreferrer" target="_blank">通过 InnoSetup 美化安装界面</a> 提供持续更新  </p>
<p>InnoSetup 的美化相应的帖子也比较多，但是代码不是很全。。。所以我专门出了这篇文章来记录下这个美化过程。  <br>废话不多说，先上个成果：  <br><span class="img-wrap"><img data-src="/img/bVM2uq?w=882&amp;h=607" src="https://static.alili.tech/img/bVM2uq?w=882&amp;h=607" alt="安装界面" title="安装界面" style="cursor: pointer; display: inline;"></span></p>
<p>前端er们可以直接下载 <a href="https://github.com/anchengjian/vue-nw-seed/tree/win-beautiful-setup/" rel="nofollow noreferrer" target="_blank">vue-nw-seed</a> 这个分支，一键 build就出效果了。</p>
<h2 id="articleHeader0">一、InnoSetup 增强版</h2>
<p>这个部分很重要，是实现自定义界面的绝对前置步骤。  <br>完成这个任务也很简单，可以自己下载安装就搞定。  <br>当然，找资源的过程比较麻烦，所以直接提供了一个，并用 <a href="https://github.com/felicienfrancois/node-innosetup-compiler" rel="nofollow noreferrer" target="_blank">node-innosetup-compiler</a> 包裹了一下，使之可以直接在 Node.js 下应用，最终的增强版在 <a href="https://github.com/anchengjian/vue-nw-seed/tree/win-beautiful-setup/deps/innosetup" rel="nofollow noreferrer" target="_blank">deps/innosetup</a> 这里可以看到。  <br><strong>注意</strong><br>InnoSetup 本身是开源免费的，希望大家在用的过程中注意一下作者的 <strong>LICENSE</strong> 。</p>
<h2 id="articleHeader1">二、iss 配置文件</h2>
<p>这个部分无需赘述，对于新手来说比较复杂的一个事儿，给个文档 <a href="http://www.jrsoftware.org/ishelp/" rel="nofollow noreferrer" target="_blank">What is Inno Setup?</a> 先。</p>
<h3 id="articleHeader2">1、Setup Script Sections</h3>
<p>可以直接双击 <code>deps/innosetup/bin/Compil32.exe</code> 打开一个可视化的配置窗口，按照引导可以直接生成一个通用流程中简单的安装配置，会生成一个类似 <a href="https://github.com/anchengjian/vue-nw-seed/blob/win-beautiful-setup/config/setup-simple.iss" rel="nofollow noreferrer" target="_blank">setup-simple.iss</a> 这种的 iss 配置文件。  <br>当然，一个扁平漂亮的界面，肯定不是这种简单的配置能满足的。。。   <br>所以，看我提供的一个 <a href="https://github.com/anchengjian/vue-nw-seed/blob/win-beautiful-setup/config/setup.iss" rel="nofollow noreferrer" target="_blank">setup.iss</a> ，其包含完整的流程控制和界面的控制。   <br>这里的代码太长了，加上注释 455 行，就不贴过来了，戳链接进去看吧。</p>
<h3 id="articleHeader3">2、Pascal Script</h3>
<p>在那 455 行代码中主要就是 <code>[code]</code> 块下面的 <code>Pascal Script</code> ，通过它来控制安装流程和界面的美化。</p>
<ul>
<li><p>控制安装流程的原理是 InnoSetup 通过 <a href="http://www.jrsoftware.org/ishelp/topic_scriptevents.htm" rel="nofollow noreferrer" target="_blank">Pascal Scripting: Event Functions</a> 这种事件机制，把流程节点的控制交给 <code>Pascal Script</code> ，使其可以控制<code>上一步</code>、<code>下一步</code>等等的操作。</p></li>
<li><p>界面的美化，主要是调用两个美化插件动态库：<code>botva2.dll</code> 和 <code>InnoCallback.dll</code>。用其来控制贴图的位置和样式，和给按钮绑定相应的事件等等的。</p></li>
</ul>
<p>详细的控制方式参见 <a href="https://github.com/anchengjian/vue-nw-seed/blob/win-beautiful-setup/config/setup.iss" rel="nofollow noreferrer" target="_blank">setup.iss</a> 文件中的注释，此处不再详细解释啦。。。解释起来太多了。</p>
<h3 id="articleHeader4">3、setup resources</h3>
<p>这个部分就是用来存放贴图资源和美化插件动态库的地方。 <br>我默认放在示例项目的 <a href="https://github.com/anchengjian/vue-nw-seed/tree/win-beautiful-setup/build/setup_resources" rel="nofollow noreferrer" target="_blank">/build/setup_resources</a> 这个位置。  <br>如果你去看过上文 <a href="https://github.com/anchengjian/vue-nw-seed/blob/win-beautiful-setup/config/setup.iss" rel="nofollow noreferrer" target="_blank">setup.iss</a> 这个文件的话，就会发现里面的资源文件路径的配置被搞成类似这个样子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#define LicenseFilePath &quot;_resourcesPath_\license.txt&quot;
#define SetupIconFilePath &quot;_resourcesPath_\logo.ico&quot;
#define ResourcesPath &quot;_resourcesPath_\*&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> LicenseFilePath <span class="hljs-meta-string">"_resourcesPath_\license.txt"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> SetupIconFilePath <span class="hljs-meta-string">"_resourcesPath_\logo.ico"</span></span>
<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> ResourcesPath <span class="hljs-meta-string">"_resourcesPath_\*"</span></span></code></pre>
<p>这是因为各个项目要求的打包配置和路径可能不一致，<strong>特意</strong>做了一个处理，详见<a href="https://github.com/anchengjian/vue-nw-seed/blob/win-beautiful-setup/build/build-win-setup.js#L44-L70" rel="nofollow noreferrer" target="_blank">build-win-setup.js</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// rewrite name, version to iss
fs.readFile(issPath, null, function(err, text) {
  if (err) return reject(err)

  let str = iconv.decode(text, 'gbk')
    .replace(/_name_/g, name)
    .replace(/_appName_/g, appName)
    .replace(/_version_/g, version)
    .replace(/_outputPath_/g, outputPath)
    .replace(/_outputFileName_/g, getOutputName(outputFileName, { name, version, platform }))
    .replace(/_filesPath_/g, files)
    .replace(/_resourcesPath_/g, resourcesPath)
    .replace(/_appPublisher_/g, appPublisher)
    .replace(/_appURL_/g, appURL)
    .replace(/_appId_/g, appId)


  fs.writeFile(tmpIssPath, iconv.encode(str, 'gbk'), null, function(err) {
    if (err) return reject(err)

    // inno setup start
    innosetupCompiler(tmpIssPath, { gui: false, verbose: true }, function(err) {
      fs.unlinkSync(tmpIssPath)
      if (err) return reject(err)
      resolve(opt)
    })
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// rewrite name, version to iss</span>
fs.readFile(issPath, <span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, text</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err)

  <span class="hljs-keyword">let</span> str = iconv.decode(text, <span class="hljs-string">'gbk'</span>)
    .replace(<span class="hljs-regexp">/_name_/g</span>, name)
    .replace(<span class="hljs-regexp">/_appName_/g</span>, appName)
    .replace(<span class="hljs-regexp">/_version_/g</span>, version)
    .replace(<span class="hljs-regexp">/_outputPath_/g</span>, outputPath)
    .replace(<span class="hljs-regexp">/_outputFileName_/g</span>, getOutputName(outputFileName, { name, version, platform }))
    .replace(<span class="hljs-regexp">/_filesPath_/g</span>, files)
    .replace(<span class="hljs-regexp">/_resourcesPath_/g</span>, resourcesPath)
    .replace(<span class="hljs-regexp">/_appPublisher_/g</span>, appPublisher)
    .replace(<span class="hljs-regexp">/_appURL_/g</span>, appURL)
    .replace(<span class="hljs-regexp">/_appId_/g</span>, appId)


  fs.writeFile(tmpIssPath, iconv.encode(str, <span class="hljs-string">'gbk'</span>), <span class="hljs-literal">null</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err)

    <span class="hljs-comment">// inno setup start</span>
    innosetupCompiler(tmpIssPath, { <span class="hljs-attr">gui</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span> }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
      fs.unlinkSync(tmpIssPath)
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err)
      resolve(opt)
    })
  })
})</code></pre>
<p><strong>如果仅仅想单纯的用  InnoSetup 打包安装美观的界面，可以自直接换一下相应的配路径置。</strong></p>
<h2 id="articleHeader5">三、Q &amp; A</h2>
<p>需要单独说一下几个踩到的坑。。。<br>1、iss 文件需要什么特定的编码格式吗？  <br>中文的话，需要 ansi 编码，不然用其他编码，打包出来在界面上的中文会乱码！  <br>这也是我直接用文字贴图来代替 label 以确保界面中的文字显示万无一失的原因。</p>
<p>2、这个 InnoSetup 增强版 和和普通的有啥区别？  <br>说实在的，我也没太搞明白，InnoSetup 本身就是开源和免费的，可以自己修改并编译。现在我用的这个版本应该是国内某前辈搜集的一些脚本等东西集合出来单独打包出来的一个增强版。</p>
<p>3、为啥不单独搞个 InnoSetup 美化的项目？  <br>一方面不确定 InnoSetup 增强版 这个版权协议，另一方面不确定大家的需求咋样，暂时这样，让大家可以通过 <strong>源码 + 详细的注释</strong> 习得这部分的技能。如果确实这部分需求很强大，请私信我，或者发 issue 讨论下这个项目该咋整吧。</p>
<h2 id="articleHeader6">四、参考资料</h2>
<ul>
<li><p><a href="http://blog.csdn.net/oceanlucy/article/details/50033773" rel="nofollow noreferrer" target="_blank">互联网软件的安装包界面设计-Inno setup</a></p></li>
<li><p><a href="http://blog.csdn.net/HarounCloud/article/details/50613590" rel="nofollow noreferrer" target="_blank">INNOSETUP 仿有道云安装包界面</a></p></li>
<li><p><a href="http://www.yiibai.com/pascal" rel="nofollow noreferrer" target="_blank">Pascal 入门</a></p></li>
<li><p><a href="http://www.jrsoftware.org/ishelp/topic_scriptevents.htm" rel="nofollow noreferrer" target="_blank">InnoSetup docs: Event Functions</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
通过 InnoSetup 美化安装界面

## 原文链接
[https://segmentfault.com/a/1190000009265336](https://segmentfault.com/a/1190000009265336)

