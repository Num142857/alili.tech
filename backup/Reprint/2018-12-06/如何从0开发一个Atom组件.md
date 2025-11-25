---
title: '如何从0开发一个Atom组件' 
date: 2018-12-06 2:30:09
hidden: true
slug: vruzw3u67ba
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近用Atom写博客比较多，然后发现一个很严重的问题。。<br>没有一个我想要的上传图片的方式，比如某乎上边就可以直接copy/paste文件，然后进行上传。<br>然而在Atom上没有找到类似的插件，最接近的一个，也还是需要手动选择文件，然后进行上传。<br>这个操作流程太繁琐，索性自己写一个插件用好了。</blockquote>
<p>成品插件下载地址：<a href="https://atom.io/packages/atom-image-uploader" rel="nofollow noreferrer" target="_blank">https://atom.io/packages/atom-image-uploader</a></p>
<h2 id="articleHeader0">规划</h2>
<p>首先，我们确定了需求，要通过可以直接<code>copy</code>文件，然后在Atom中<code>paste</code>即可完成上传的操作。<br>确定了以后，我们就要开始搬砖了。</p>
<h2 id="articleHeader1">插件开发</h2>
<p>因为<code>Atom</code>是一个<code>Electron</code>应用：<a href="https://electronjs.org" rel="nofollow noreferrer" target="_blank">https://electronjs.org</a></p>
<p>是使用<code>JavaScript</code>来开发的桌面应用，所以对于一个前端来说，简直是太美好了。<br>我们先去翻看<code>Atom</code>的官方文档，查看关于创建插件相关的操作：<br>首先我们在<code>Atom</code>中打开命令面板，然后输入<code>Generate Package</code><br><span class="img-wrap"><img data-src="/img/remote/1460000014322525?w=1204&amp;h=292" src="https://static.alili.tech/img/remote/1460000014322525?w=1204&amp;h=292" alt="" title="" style="cursor: pointer;"></span><br>按下回车后，将会弹出一个对话框，在框中输入要建立的包名即可完成一个<code>Package</code>的创建。<br><span class="img-wrap"><img data-src="/img/remote/1460000014322526?w=1234&amp;h=164" src="https://static.alili.tech/img/remote/1460000014322526?w=1234&amp;h=164" alt="" title="" style="cursor: pointer; display: inline;"></span><br><code>Atom</code>会生成一套默认文件，并打开一个新的窗口。</p>
<h2 id="articleHeader2">项目结构</h2>
<p>生成的插件目录如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── keymaps
│&nbsp;&nbsp; └── first-package.json
├── lib
│&nbsp;&nbsp; ├── first-package-view.js
│&nbsp;&nbsp; └── first-package.js
├── menus
│&nbsp;&nbsp; └── first-package.json
├── package.json
├── spec
│&nbsp;&nbsp; ├── first-package-spec.js
│&nbsp;&nbsp; └── first-package-view-spec.js
└── styles
    └── first-package.less" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">.
├── keymaps
│&nbsp;&nbsp; └── first-package<span class="hljs-selector-class">.json</span>
├── lib
│&nbsp;&nbsp; ├── first-package-view<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── first-package<span class="hljs-selector-class">.js</span>
├── menus
│&nbsp;&nbsp; └── first-package<span class="hljs-selector-class">.json</span>
├── package<span class="hljs-selector-class">.json</span>
├── spec
│&nbsp;&nbsp; ├── first-package-spec<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── first-package-view-spec<span class="hljs-selector-class">.js</span>
└── styles
    └── first-package.less</code></pre>
<h3 id="articleHeader3">keymaps</h3>
<p>这里可以配置要监听的快捷键，我们可以设置一些自定义快捷键来触发一些我们插件的行为。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;atom-workspace&quot;: {
    &quot;ctrl-alt-o&quot;: &quot;first-package:toggle&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"atom-workspace"</span>: {
    <span class="hljs-attr">"ctrl-alt-o"</span>: <span class="hljs-string">"first-package:toggle"</span>
  }
}</code></pre>
<p>我们可以添加各种自定义的快捷键在这里。<br><code>Value</code>的定义为：<code>包名:触发的事件名</code><br>需要注意的是：<br>这里配置的快捷键还有一个作用域的概念。也就是<code>JSON</code>外边的那个<code>key</code>。<br><code>atom-workspace</code>表示在<code>Atom</code>中生效<br><code>atom-text-editor</code>表示只在文本编辑器范围内生效。<br><span class="img-wrap"><img data-src="/img/remote/1460000014322527?w=2560&amp;h=1436" src="https://static.alili.tech/img/remote/1460000014322527?w=2560&amp;h=1436" alt="" title="" style="cursor: pointer; display: inline;"></span><br><a href="https://flight-manual.atom.io/behind-atom/sections/keymaps-in-depth/" rel="nofollow noreferrer" target="_blank">Atom官方文档</a></p>
<h3 id="articleHeader4">lib</h3>
<p>这里就是存放插件主要代码的地方了。<br>默认会生成两个文件：</p>
<ol>
<li><code>package.js</code></li>
<li><code>package.view.js</code></li>
</ol>
<p>默认插件生成的主入口文件指向这里。<br><span class="img-wrap"><img data-src="/img/remote/1460000014322528?w=1072&amp;h=992" src="https://static.alili.tech/img/remote/1460000014322528?w=1072&amp;h=992" alt="" title="" style="cursor: pointer;"></span></p>
<p>入口文件的表现方式为一个<code>JSON</code>对象，可以实现如下几个函数：</p>
<ol>
<li>
<code>activate</code>: 当<code>Package</code>被激活时会执行该方法，函数的签名表示会接受一个<code>state</code>参数，该参数是通过<code>serialize</code>方法传递过来的（如果有实现它的话）</li>
<li>
<code>deactivate</code>: 当<code>Package</code>失效时会出发的方法，这两个方法可以理解为<code>React</code>中的<code>componentWillMount</code>和<code>componentWillUnmount</code>
</li>
<li>
<code>serialize</code>: 也就是上边说到的那个方法，可以返回一个<code>JSON</code>对象供下次激活后使用</li>
<li>自定义快捷键对应的事件名: 每次<code>Package</code>被触发对应快捷键时都会执行的方法</li>
</ol>
<h3 id="articleHeader5">menus</h3>
<p>这里存放的是在应用菜单和编辑区域菜单栏的配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;context-menu&quot;: {
    &quot;atom-text-editor&quot;: [
      {
        &quot;label&quot;: &quot;Toggle first-package&quot;,
        &quot;command&quot;: &quot;first-package:toggle&quot;
      }
    ]
  },
  &quot;menu&quot;: [
    {
      &quot;label&quot;: &quot;Packages&quot;,
      &quot;submenu&quot;: [
        {
          &quot;label&quot;: &quot;first-package&quot;,
          &quot;submenu&quot;: [
            {
              &quot;label&quot;: &quot;Toggle&quot;,
              &quot;command&quot;: &quot;first-package:toggle&quot;
            }
          ]
        }
      ]
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"context-menu"</span>: {
    <span class="hljs-attr">"atom-text-editor"</span>: [
      {
        <span class="hljs-attr">"label"</span>: <span class="hljs-string">"Toggle first-package"</span>,
        <span class="hljs-attr">"command"</span>: <span class="hljs-string">"first-package:toggle"</span>
      }
    ]
  },
  <span class="hljs-attr">"menu"</span>: [
    {
      <span class="hljs-attr">"label"</span>: <span class="hljs-string">"Packages"</span>,
      <span class="hljs-attr">"submenu"</span>: [
        {
          <span class="hljs-attr">"label"</span>: <span class="hljs-string">"first-package"</span>,
          <span class="hljs-attr">"submenu"</span>: [
            {
              <span class="hljs-attr">"label"</span>: <span class="hljs-string">"Toggle"</span>,
              <span class="hljs-attr">"command"</span>: <span class="hljs-string">"first-package:toggle"</span>
            }
          ]
        }
      ]
    }
  ]
}</code></pre>
<p><code>context-menu</code>对应的元素会在对应的区域内右键触发时显示。<br><code>menu</code>则是出现在<code>Atom</code>主菜单栏上：<br><span class="img-wrap"><img data-src="/img/remote/1460000014322529?w=430&amp;h=864" src="https://static.alili.tech/img/remote/1460000014322529?w=430&amp;h=864" alt="" title="" style="cursor: pointer;"></span><br>同样的，<code>context-menu</code>会区分两个环境，<code>text-editor</code>和<code>workspace</code>。</p>
<h3 id="articleHeader6">spec</h3>
<p>这里存放的是一些测试用例，创建<code>Package</code>会生成一些默认的断言。<br><em>写测试确实是一个好习惯。</em></p>
<h3 id="articleHeader7">styles</h3>
<p>如果<code>Package</code>有很多<code>View</code>要展示的话，可以在这里编写，默认使用的是<code>Less</code>语法。<br>由于我们只做一个<code>C/V</code>的操作，不会涉及到界面，所以<code>styles</code>直接就删掉了。</p>
<h2 id="articleHeader8">开始搬砖</h2>
<p>大致结构已经了解了，我们就可以开始搬砖了。<br>因为是一个<code>Electron</code>应用，所以我们直接在<code>Atom</code>中按下<code>alt + command + i</code>，呼出我们熟悉的控制台界面。<br><span class="img-wrap"><img data-src="/img/remote/1460000014322530?w=2160&amp;h=1146" src="https://static.alili.tech/img/remote/1460000014322530?w=2160&amp;h=1146" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>Atom</code>是不会把<code>Electron</code>的各种文档重新写一遍的，所以我们现在控制台里边试一下我们的猜测是否正确。<br>一些想要的东西是否存在。<br><span class="img-wrap"><img data-src="/img/remote/1460000014322531?w=2160&amp;h=1146" src="https://static.alili.tech/img/remote/1460000014322531?w=2160&amp;h=1146" alt="" title="" style="cursor: pointer;"></span><br>经过验证确定了，<code>Electron</code>的<code>clipboard</code>对象可以直接在<code>Atom</code>中使用，这就很开心了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('electron').clipboard.readImage().toPng()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'electron'</span>).clipboard.readImage().toPng()</code></pre>
<p>这样我们就拿到剪切板中的图片数据了，一个二进制的数组对象。<br>我们在触发<code>Paste</code>操作时，从<code>clipboard</code>中获取，如果剪切板中是图片的话，我们就将它上传并显示到编辑器中。<br>所以，接下来我们要做的就是：</p>
<ol>
<li>进行上传图片的操作</li>
<li>将上传后的图片显示到编辑器中</li>
</ol>
<h3 id="articleHeader9">上传图片</h3>
<p>上传图片我们选择的是七牛，我们选择七牛来作为图床使用，因为他家提供了10GB的免费存储，灰常适合自己这样的笔记型博客。<br>但是用他家SDK时发现一个问题。。我将二进制数据转换为<code>ReadStream</code>后上传的资源损坏了-.-目前还没有找到原因。<br>所以我们做了曲线救国的方式。<br>将剪切板中的数据转换为<code>Buffer</code>然后暂存到本地，通过本地文件的方式来进行上传七牛。<br>在操作完成后我们再将临时文件移除。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  let buffer = clipboard.readImage().toPng()
  let tempFilePath = 'XXX'
  fs.writeFileSync(tempFilePath, Buffer.from(buffer))
} catch (e) {
  // catch error
} finally {
  fs.unlink(tempFilePath) // 因为我们并不依赖于删除成功的回调，所以直接空调用异步方法即可
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">let</span> buffer = clipboard.readImage().toPng()
  <span class="hljs-keyword">let</span> tempFilePath = <span class="hljs-string">'XXX'</span>
  fs.writeFileSync(tempFilePath, Buffer.from(buffer))
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-comment">// catch error</span>
} <span class="hljs-keyword">finally</span> {
  fs.unlink(tempFilePath) <span class="hljs-comment">// 因为我们并不依赖于删除成功的回调，所以直接空调用异步方法即可</span>
}</code></pre>
<h3 id="articleHeader10">将上传后的资源显示到编辑器中</h3>
<p>因为考虑到上传可能会受到网络影响，从而上传时间不可预估。<br>所以我们会先在文件中显示一部分占位文字。<br>通过全局的<code>atom</code>对象可以拿到当前活跃的窗口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let editor = atom.workspace.getActiveTextEditor()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> editor = atom.workspace.getActiveTextEditor()</code></pre>
<p>为了避免同时上传多张图片时出现问题，我们将临时文件名作为填充的一部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="editor.insertText(`![](${placeHolderText})`, editor)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">editor.insertText(<span class="hljs-string">`![](<span class="hljs-subst">${placeHolderText}</span>)`</span>, editor)</code></pre>
<p>然后在上传成功后，我们将对应的填充字符替换为上传后的URL就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="editor.scan(new RegExp(placeHolderText), tools => tools.replace(url))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">editor.scan(<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(placeHolderText), tools =&gt; tools.replace(url))</code></pre>
<p><code>scan</code>方法接收一个正则对象和回调函数。<br>我们将前边用到的占位文本作为正则对象，然后在回调将其替换为上传后的<code>url</code>。<br>至此，我们的代码已经编写完了，剩下的就是一些交互上的优化。</p>
<p>完成后的效果图：<br><span class="img-wrap"><img data-src="/img/remote/1460000014322532?w=1265&amp;h=658" src="https://static.alili.tech/img/remote/1460000014322532?w=1265&amp;h=658" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>以及，最后：我们要进行<code>Package</code>的上传。</p>
<h3 id="articleHeader11">上传开发完的Package</h3>
<p>首先我们需要保证<code>package.json</code>中存在如下几个参数：</p>
<ol>
<li><code>name</code></li>
<li><code>description</code></li>
<li><code>repository</code></li>
</ol>
<p>我们可以先使用如下命令来检查包名是否冲突。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apm show 你的包名" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code class="shell" style="word-break: break-word; white-space: initial;">apm <span class="hljs-keyword">show</span> 你的包名</code></pre>
<p>如果没有冲突，我们就可以直接执行以下命令进行上传了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apm publish 你的包名" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">apm</span> publish 你的包名</code></pre>
<p>后续的代码修改，只需在该包的目录下执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apm publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">apm publish</span></code></pre>
<p>一些可选的参数：</p>
<ol>
<li>
<code>major</code>，增加版本号的第一位<code>1.0.0</code> -&gt; <code>2.0.0</code>
</li>
<li>
<code>minor</code>，增加版本号的第二位<code>0.1.0</code> -&gt; <code>0.2.0</code>
</li>
<li>
<code>patch</code>，增加版本号的第三位<code>0.0.1</code> -&gt; <code>0.0.2</code>
</li>
</ol>
<p>通过<code>apm help</code>可以获取到更多的帮助信息。</p>
<p>以上，就是开发一个<code>Atom</code>插件的完整流程咯。</p>
<h2 id="articleHeader12">参考资料</h2>
<p><a href="https://flight-manual.atom.io/hacking-atom/" rel="nofollow noreferrer" target="_blank">hacking-atom</a><br><a href="https://electronjs.org/docs" rel="nofollow noreferrer" target="_blank">electron-doc</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何从0开发一个Atom组件

## 原文链接
[https://segmentfault.com/a/1190000014322520](https://segmentfault.com/a/1190000014322520)

