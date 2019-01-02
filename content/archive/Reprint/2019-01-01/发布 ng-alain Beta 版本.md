---
title: '发布 ng-alain Beta 版本' 
date: 2019-01-01 2:30:07
hidden: true
slug: 4nzasbbwpmb
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://cipchk.github.io/ng-alain/" rel="nofollow noreferrer" target="_blank">ng-alain</a> 基于 <a href="https://ng.ant.design/" rel="nofollow noreferrer" target="_blank">ng-zorro-antd</a> 的企业管理后台脚手架。</p>
<p>从开始我一直把它定位在一个 Angular 企业管理后台最佳实践，同时，在公司内部也开始正式基于此模板开发。</p>
<p>她包括几个特性：</p>
<ul>
<li>基于 <code>ng-zorro-antd</code>
</li>
<li>响应式</li>
<li>国际化</li>
<li>
<p>ACL访问控制</p>
<ul>
<li>基于角色</li>
<li>路由守卫</li>
</ul>
</li>
<li>延迟加载及良好的启用画面</li>
<li>良好的UI路由设计</li>
<li>十种颜色版本</li>
<li>
<p>SCSS预编译</p>
<ul><li>增加排印、颜色、若干小插件</li></ul>
</li>
<li>良好的目录组织结构</li>
<li>简单升级</li>
<li>模块热替换</li>
</ul>
<p>虽然时间只有短短3周，但上述性也是基于项目经验的一次整合。</p>
<h1 id="articleHeader0">一、如何下载？</h1>
<p>ng-alain 本身并非组件，只是一个单纯的企业后台模板，你可以<strong>直接克隆</strong>到你的本地，然后立即进入实际开发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# clone ng-alain repo
# --depth 1 removes all but one .git commit history
git clone --depth 1 https://github.com/cipchk/ng-alain.git

# change directory
cd ng-alain

# install npm package
# in china please use cnpm （https://github.com/cnpm/cnpm）
npm install

# start the serve
npm start

# use HMR
npm run serve:hmr" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># clone ng-alain repo</span>
<span class="hljs-comment"># --depth 1 removes all but one .git commit history</span>
git <span class="hljs-built_in">clone</span> --depth 1 https://github.com/cipchk/ng-alain.git

<span class="hljs-comment"># change directory</span>
<span class="hljs-built_in">cd</span> ng-alain

<span class="hljs-comment"># install npm package</span>
<span class="hljs-comment"># in china please use cnpm （https://github.com/cnpm/cnpm）</span>
npm install

<span class="hljs-comment"># start the serve</span>
npm start

<span class="hljs-comment"># use HMR</span>
npm run serve:hmr</code></pre>
<h1 id="articleHeader1">二、如何开发？</h1>
<p><code>ng-alain</code> 会一直与 <code>ng-zorro-antd</code> 保持同步更新，但这不代表你需要重新克隆 <code>ng-alain</code>。</p>
<blockquote><p>注：完整的项目会包括很多示例代码、第三方依赖包等，后续会维护一个简化版本。</p></blockquote>
<h2 id="articleHeader2">1、目录结构</h2>
<p>项目是通过 <code>ng new</code> 来构建的，就如同你平时要创建项目一样，因此，当你克隆 <code>ng-alain</code> 到你本地后，只需要执行 <code>npm install</code>，那么就相当构建好一个新项目。</p>
<p>以下是一个完整的大概结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_documents (允许删除)
_screenshot (允许删除)
src
    app
        core
            preloader
            settings
            translator (可选：国际化)
            acl (可选：国际化)
            net (可选：HTTP拦截器)
        layout
        routes
        shared
            directives (可选：若干自定义的指令)
            pipes
            styles
    assets
        i18n (可选：国际化)
        img  (可选：一些图片资源)
.angular-cli.json
package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">_documents</span> (允许删除)
<span class="hljs-selector-tag">_screenshot</span> (允许删除)
<span class="hljs-selector-tag">src</span>
    <span class="hljs-selector-tag">app</span>
        <span class="hljs-selector-tag">core</span>
            <span class="hljs-selector-tag">preloader</span>
            <span class="hljs-selector-tag">settings</span>
            <span class="hljs-selector-tag">translator</span> (可选：国际化)
            <span class="hljs-selector-tag">acl</span> (可选：国际化)
            <span class="hljs-selector-tag">net</span> (可选：HTTP拦截器)
        <span class="hljs-selector-tag">layout</span>
        <span class="hljs-selector-tag">routes</span>
        <span class="hljs-selector-tag">shared</span>
            <span class="hljs-selector-tag">directives</span> (可选：若干自定义的指令)
            <span class="hljs-selector-tag">pipes</span>
            <span class="hljs-selector-tag">styles</span>
    <span class="hljs-selector-tag">assets</span>
        <span class="hljs-selector-tag">i18n</span> (可选：国际化)
        <span class="hljs-selector-tag">img</span>  (可选：一些图片资源)
<span class="hljs-selector-class">.angular-cli</span><span class="hljs-selector-class">.json</span>
<span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span></code></pre>
<p>对于<strong>可选</strong>的文件夹，允许你<strong>直接删除</strong>，但可能会由于一些依赖倒置编译失败，可以根据编译结果自行调整并删除相关语句。</p>
<p><strong>core</strong></p>
<p>core文件夹包括菜单配置、布局配置、颜色主题、国际化（可选）；我建议如果企业后台无须国际化允许删除它。而其他建议保留。</p>
<p><strong>layout</strong></p>
<p>页面整体布局结构，包括：头部、左边菜单，<strong>除非在更新日志中明确提醒否则该目录不太会变动</strong>。</p>
<p><strong>routes</strong></p>
<p>具体业务页面可以全部放在该目录下面。有关文件结构，可以参考里面的风格。<strong>这里的内容对于后续的升级不会有任何是影响。</strong></p>
<p><strong>shared/styles</strong></p>
<p>核心文件，除非你知道你在干什么，否则不建议你去调整它们。</p>
<p><strong>.angular-cli.json</strong></p>
<p><code>scripts</code> 节点包括第三方类库包引用配置，可以放心移除。</p>
<h2 id="articleHeader3">2、项目名称问题</h2>
<p>由于是直接克隆的基础上进行开发，因此，对于项目命名上面，有一个窍门是搜索整个文件夹把 <code>ng-alain</code> 替换成你的名称即可。</p>
<h1 id="articleHeader4">三、增强 CSS</h1>
<p>ng-alain 增加了一些便于微调的样式脚本，包括：排印、颜色、工具类等，有关更多细节可以参与项目 <strong>_document</strong> 目录的相关文档。</p>
<h1 id="articleHeader5">四、关于Antd</h1>
<p>ANT Design 官网有一句话：<strong>一个 UI 设计语言</strong>。除了官网的 react、Angular 实现版本外，还有人实现了 Vue 版本，可以说主流的框架都有它的相应的版本在维护着。</p>
<p>Ant Design 热度非常高，甚至开始有企业在招聘上明确写明有该经验会有加分项。其<a href="https://ant.design/docs/spec/introduce-cn" rel="nofollow noreferrer" target="_blank">指引文章系列</a>真心是经典，因此，我建议在你开始接触Antd可以先好好阅读它们。</p>
<h1 id="articleHeader6">五、后续</h1>
<p>ng-alain 我会一直维护着它，并保持与 Angular、Angular-Cli、ng-zorro-antd 的同步更新。同时，会逐一丰富示例代码，希望这些示例代码能简化日常开发模板需求，同时也欢迎各位PR你的示例代码。</p>
<h1 id="articleHeader7">截图</h1>
<p><span class="img-wrap"><img data-src="/img/bVTvMa?w=1366&amp;h=768" src="https://static.alili.tech/img/bVTvMa?w=1366&amp;h=768" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVTvMd?w=769&amp;h=581" src="https://static.alili.tech/img/bVTvMd?w=769&amp;h=581" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVTvMh?w=412&amp;h=590" src="https://static.alili.tech/img/bVTvMh?w=412&amp;h=590" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
发布 ng-alain Beta 版本

## 原文链接
[https://segmentfault.com/a/1190000011137662](https://segmentfault.com/a/1190000011137662)

