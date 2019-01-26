---
title: 'Vue 2.0 + cordova 构建Android应用（一）' 
date: 2019-01-27 2:30:59
hidden: true
slug: 516yxg0tftf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、环境准备（Windows、Android）</h2>
<h3 id="articleHeader1">1、<a href="http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html" rel="nofollow noreferrer" target="_blank">官方安装参考</a>
</h3>
<blockquote><p>包括Java、Android SDK 及相关环境变量配置</p></blockquote>
<h3 id="articleHeader2">2、<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">Node.js</a>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="安装Node.js（主要是为了使用npm安装cordova、vue），当前选择稳定版6.9.x LTS 即可
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>安装<span class="hljs-keyword">Node</span>.<span class="hljs-title">js</span>（主要是为了使用npm安装cordova、vue），当前选择稳定版<span class="hljs-number">6.9</span>.x LTS 即可
</code></pre>
<h3 id="articleHeader3">3、Android SDK</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="建议直接下载安装Android Studio，当前版本2.2.2.0
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>建议直接下载安装<span class="hljs-selector-tag">Android</span> <span class="hljs-selector-tag">Studio</span>，当前版本2<span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.2</span><span class="hljs-selector-class">.0</span>
</code></pre>
<p>选择包含 <a href="http://www.android-studio.org/index.php/download" rel="nofollow noreferrer" target="_blank">Android SDK</a> 的安装包，安装完毕后打开SDK配置路径中的SDK Manager.exe，下载所需版本Android SDK Tool和对应SDK Platform，建议真机开发调试。</p>
<blockquote><p>下载速度慢或无法下载，则使用代理，配置如下，或可使用其他代理路径</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVIKYV?w=1094&amp;h=712" src="https://static.alili.tech/img/bVIKYV?w=1094&amp;h=712" alt="代理加速下载" title="代理加速下载" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">4、Cordova</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参照官方指南首页，安装Cordova、配置已下载的SDK环境变量，并按照指南进行初步测试" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">参照官方指南首页，安装Cordova、配置已下载的SDK环境变量，并按照指南进行初步测试</code></pre>
<p>cordova 相关命令参考：<a href="http://cordova.apache.org/docs/en/6.x/reference/cordova-cli/index.html" rel="nofollow noreferrer" target="_blank">http://cordova.apache.org/doc...</a></p>
<blockquote><p>注意命令中的各种默认设置</p></blockquote>
<p>假设构建名为<code>cordovaApp</code>的项目</p>
<blockquote><p><code>cordova create cordova-app com.lxlazy.www.app cordovaApp</code>  <br><code>cd cordova-app</code>  <br><code>cordova platforms add android</code></p></blockquote>
<p>命令行提示项目中已默认安装 <code>cordova-plugin-whitelist</code> 插件。</p>
<p>检查整体环境是否正确，注意查看提示</p>
<blockquote><p><code>cordova requirements</code></p></blockquote>
<p>建议使用真机调试，记得打开USB调试模式</p>
<blockquote><p>cordova run</p></blockquote>
<hr>
<p><strong>注意：</strong>首次使用时，命令行提示 <code>Downloading https://services.gradle.org/distributions/gradle-2.14.1-all.zip</code>，是在下载对应的gradle并自动解压安装，根据网络状况，可能耗时极长，且容易报错。</p>
<blockquote><p>windows环境下，在命令行窗口下载安装时，点击窗口内部，会使其暂停下载工作，有下载进度提示的时候才可以看出来。按下<code>Esc</code>键就能继续工作。坑我好几次。当然也可使用VSCode控制台代替。</p></blockquote>
<p><strong>也可使用以下方法：</strong>找到如 <code>cordova-app/platforms/android/cordova/lib/buildersGradleBuilder.js</code>，其中有</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] ||'https\\://services.gradle.org/distributions/gradle-2.14.1-all.zip'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">var</span> distributionUrl = process.env[<span class="hljs-symbol">'CORDOVA_ANDROID_GRADLE_DISTRIBUTION_UR</span>L'] ||<span class="hljs-symbol">'https</span>\\:<span class="hljs-comment">//services.gradle.org/distributions/gradle-2.14.1-all.zip'</span>
</code></pre>
<p>根据路径，使用迅雷等工具下载对应安装包，并修改上述语句中的外链为已下载好的路径，如，将<code>gradle-2.14.1-all.zip</code>放在了D盘根路径，则修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var distributionUrl = process.env['CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'] || 'file:///gradle-2.14.1-all.zip';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var distributionUrl</span> = process.env[<span class="hljs-string">'CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL'</span>] || <span class="hljs-string">'file:///gradle-2.14.1-all.zip'</span>;
</code></pre>
<p>然后重新运行<code>cordova build</code> 或 <code>cordova run</code></p>
<p>缺点是每新建一个工程就得改一遍，当然速度快多了</p>
<hr>
<h3 id="articleHeader5">5、Vue.js</h3>
<p>参照官方指南，使用官方脚手架 vue-cli 初步构建项目：<a href="http://vuejs.org/v2/guide/installation.html" rel="nofollow noreferrer" target="_blank">http://vuejs.org/v2/guide/ins...</a></p>
<p>该项目将与之前的<code>cordovaApp</code>项目整合，假设为vueApp（默认使用vue-router、标准ESLint，不用测试模块，因为并不复杂）</p>
<blockquote><p><code>vue init webpack vue-app</code><br><code>cd vue-app</code><br><code>cnpm install</code></p></blockquote>
<p>只在下载包时使用<a href="http://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">cnpm</a>命令加快下载速度，其他情况最好使用npm或 <a href="https://yarnpkg.com/" rel="nofollow noreferrer" target="_blank">yarn</a>（然而官网太难进），否则可能出现各种问题……</p>
<blockquote><p><code>npm run dev</code></p></blockquote>
<p>注意界面上的各种地址</p>
<h3 id="articleHeader6">6、<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">Visual Studio Code</a>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="没什么好说的，相比 sublime text 而言，插件化定制等功能更加方面好用，而且免费
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>没什么好说的，相比 sublime <span class="hljs-built_in">text</span> 而言，插件化定制等功能更加方面好用，而且免费
</code></pre>
<hr>
<h2 id="articleHeader7">二、项目整合</h2>
<p><strong>即：</strong>将<code>vue-app</code>项目默认的构建位置<code>dist</code>目录修改为<code>cordova-app</code>项目中的<code>www</code>目录，并能够使用cordova命令直接运行在手机端</p>
<h3 id="articleHeader8">1、构建</h3>
<p>给出vue项目构建需要修改的地方，如图所示</p>
<p><span class="img-wrap"><img data-src="/img/bVIRfk?w=1030&amp;h=571" src="https://static.alili.tech/img/bVIRfk?w=1030&amp;h=571" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>修改后，<code>npm run build</code> 会将工程打包到与 <code>app-vue</code> 项目同级的 <code>app-cordova</code> 项目下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└── www
    ├── css
    ├── fonts
    ├── img
    ├── js
    └── index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>└── www
    ├── css
    ├── fonts
    ├── <span class="hljs-selector-tag">img</span>
    ├── js
    └── index.html</code></pre>
<p>不知道为什么之前这样是报错的，需要把<code>img</code>文件夹移动到<code>css</code>文件夹下，后来莫名其妙就好了……</p>
<h3 id="articleHeader9">2、vue 本地调试</h3>
<p>至少在<code>index.html</code>中添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width&quot;>  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>&lt;meta <span class="hljs-attr">name="viewport"</span> <span class="hljs-attr">content="user-scalable=no,</span> <span class="hljs-attr">initial-scale=1,</span> <span class="hljs-attr">maximum-scale=1,</span> <span class="hljs-attr">minimum-scale=1,</span> <span class="hljs-attr">width=device-width"&gt;</span>  
</code></pre>
<p>在浏览器运行后，打开控制台，切换成设备视图，跟普通html界面一样调试，开发模式下，可使用<a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">vue-devtools</a>浏览器拓展插件获取有效界面信息。如图</p>
<p><span class="img-wrap"><img data-src="/img/bVIRci?w=1349&amp;h=844" src="https://static.alili.tech/img/bVIRci?w=1349&amp;h=844" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">3、Cordova 本机调试</h3>
<p>将构建好的项目运行在手机端，USB连接手机，打开调试模式</p>
<blockquote><p><strong>注意：</strong>一切正常但还是安装出错，1、卸载之前的app；2、确认允许cordova安装。我没遇到过其他的了</p></blockquote>
<p>打开 Chrome 浏览器，输入地址<code>chrome://inspect</code>，默认进入 <code>chrome://inspect/#devices</code>，将在页面显示当前可用设备，点击链接弹出控制台界面，然后跟普通页面一样调试</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 + cordova 构建Android应用（一）

## 原文链接
[https://segmentfault.com/a/1190000008281748](https://segmentfault.com/a/1190000008281748)

