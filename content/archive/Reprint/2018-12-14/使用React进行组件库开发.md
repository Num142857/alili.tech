---
title: '使用React进行组件库开发' 
date: 2018-12-14 2:30:11
hidden: true
slug: 7wsntafy0w
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近针对日常业务需求使用react封装了一套[组件库], 大概记录下整个开发过程中的心得。由于篇幅原因，在这里只对开发过程中比较纠结的选型和打包等进行讨论，后续再对具体组件的封装进行讨论。<br>文章首发于<a href="http://helloathon.club/2018/02/05/develop-component-library-with-react/" rel="nofollow noreferrer" target="_blank">个人博客</a>
</blockquote>
<h2 id="articleHeader0">概述</h2>
<p>我们都知道，组件化的开发模式对于我们的开发效率有着极大的提升，针对我们日常使用的基本组件进行封装，可以大量的简化我们对于基本UI的关注度，让我们的工作聚焦在业务逻辑上，很好的分离业务与基础UI的代码，使得整个项目更有调理，这也是我们要进行本组件库开发的原因。</p>
<p>然而现有React开源组件有很多，像ant-design和material-ui等等，是否需要花费精力打造适合自身团队的组件库往往需要酌情考虑。我们来看下我现有团队及业务的几个特点：</p>
<ol>
<li>前端人员较多，需要相互协作，且有余力对组件进行开发</li>
<li>产品业务相对复杂，需对某些组件进行定制化开发</li>
<li>已经有成熟的设计规范，针对各种基础组件、基础样式等进行定义</li>
<li>目前的项目较为凌乱，第三方组件引用杂乱无章</li>
</ol>
<p>可以看出，我们拥有封装自己组件的精力和基础，并且拥有通过基础组件封装改变目前开发现状的需求。所以，这件事情是我们应该并且需要尽快完成的事情。</p>
<h2 id="articleHeader1">技术选型</h2>
<p>针对组件库的封装，我们首先面对的是技术选型以及方案的规划。大概包括以下两点：</p>
<ul>
<li>最基本的技术方案</li>
<li>开发流程和规范</li>
</ul>
<h3 id="articleHeader2">技术方案选择</h3>
<p>Webpack + React + Sass</p>
<p>由于团队现有的项目都是基于React+Redux进行开发的，那我们选择的开发语言无疑是React。</p>
<h4>SASS</h4>
<p>针对css选择，虽然现在针对组件化开发，比较流行CSS Modules<br>和CSS-IN-JS两中模块化解决方案，我们更希望我们的组件是可进行定制的。因此针对组件，我们以Sass作为预编译语言，提搞效率和规范性。配合css-modules，我们可以很方便的进行针对实际需求进行样式更改。例如我们有一个Tab组件，我们已经定义好了其通用的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tip-tab {
  border: 1px solid #ccc;
}
.tip-tab-item {
  border: 1px solid #ccc;
  
  &amp;.active {
    border-color: red;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.tip-tab</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}
<span class="hljs-selector-class">.tip-tab-item</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
  
  &amp;.active {
    <span class="hljs-attribute">border-color</span>: red;
  }
}</code></pre>
<p>而在业务中，针对某一个需求，我们需要针对Tab组件的样式进行微调。让其在激活(active)状态下border-color是蓝色的。你当然可以说，我们可以让我们的组件暴露出一些props，针对这些修改进行配置，传入不同的props对应不同的风格。但是我们往往无法满足所有的业务需求，不可能针对组件把各种样式都封装进去。针对这种方案，我们采用css-modules为其添加唯一的模块样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Tab styleName=&quot;unique-tab&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;Tab styleName=<span class="hljs-string">"unique-tab"</span> /&gt;</code></pre>
<p>针对该模块，对其进行基本样式的修改:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".unique-tab {
  :global {
      .tip-tab-item {
        border-color: #eee;
        
        &amp;.active {
          border-color: blue;
        }
      }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.unique-tab</span> {
  :global {
      .tip-tab-item {
        <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#eee</span>;
        
        &amp;.active {
          <span class="hljs-attribute">border-color</span>: blue;
        }
      }
  }
}</code></pre>
<p>这样，针对该模块的定制样式，能很好的进行针对需求的样式定制，同时不对全局样式进行污染。</p>
<h4>Icon</h4>
<p>针对项目图标，计划使用svg-sprite方案。但是由于产品处于在不断迭代的过程中，新的图标不断在增加。目前我们并不会对图标统一进行打包，而是在每次进行组件打包的过程中，从项目中导入所有的图标。用以下方式进行引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Icon from '@common/lib'
import errorIcon from '@images/error.svg'

<Icon link={errorIcon} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'@common/lib'</span>
<span class="hljs-keyword">import</span> errorIcon <span class="hljs-keyword">from</span> <span class="hljs-string">'@images/error.svg'</span>

&lt;Icon link={errorIcon} /&gt;</code></pre>
<p>其实更好的方式是针对所有的图标进行统一打包，生成svg-spirte文件(具体原理可以查询svg-sprite,在此不再赘述)。当我们进行使用时，只需直接引用即可，避免每次都进行打包，减少webpack处理依赖的时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Icon type=&quot;error&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">&lt;Icon <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"error"</span> /&gt;</code></pre>
<h3 id="articleHeader3">开发流程和规范</h3>
<p>针对开发流程和规范，我们遵循以下几个原则：</p>
<ul>
<li>组件库完全独立于项目进行开发，便于后续多个项目进行使用等</li>
<li>组件库包含三种模式：开发，测试，打包，文档案例，区分不同的入口及状态</li>
<li>使用pure-renderautobind等尽可能保证组件的性能及效率</li>
<li>保证props和回调的语义性，如回调统一使用handleXXX进行处理</li>
</ul>
<p>为了便于后续的扩展，我们更希望整个组件库完全脱离于项目进行开发。保证组件库仅对于最基本的组件进行封装，将项目UI代码与业务逻辑进行分离。</p>
<p>针对不同的模式下，我们有不同的文件入口，针对开发模式，我们启动一个dev-server, 在里面对组件进行基本的封装，并进行调试。打包时，我们只需对组件内容进行封装，暴露统一的接口。在文档中，我们需要进行案例和说明的展示。所以我们在利用webpack的特性进行各种环境的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev  // 开发
npm run test  // 测试
npm run build  // 构建
npm run styleguide  // 文档开发
npm run styleguide:build // 文档打包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev  // 开发
</span>npm <span class="hljs-keyword">run</span><span class="bash"> <span class="hljs-built_in">test</span>  // 测试
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build  // 构建
</span>npm <span class="hljs-keyword">run</span><span class="bash"> styleguide  // 文档开发
</span>npm <span class="hljs-keyword">run</span><span class="bash"> styleguide:build // 文档打包</span></code></pre>
<p>组件库作为项目的最小力度支持，我们需要保证其最基本的渲染效率，因此我们采用pure-render/autobind等对其进行基本的优化。React有很多优化方式，在此不进行赘述。</p>
<h2 id="articleHeader4">打包</h2>
<h3 id="articleHeader5">基础</h3>
<p>针对组件库的打包，我们以UMD格式对其进行打包。webpack可以针对输出进行格式设置：（引自<a href="https://cnodejs.org/topic/5833e104bde2b59e06141e16" rel="nofollow noreferrer" target="_blank">cnode</a>)</p>
<ul>
<li>“var” 以变量方式输出</li>
<li>“this” 以 this 的一个属性输出： this[“Library”] = xxx；</li>
<li>“commonjs” 以 exports 的一个属性输出：exports[“Library”] = xxx；</li>
<li>“commonjs2” 以 module.exports 形式输出：module.exports = xxx；</li>
<li>“amd” 以 AMD 格式输出；</li>
<li>“umd” 同时以 AMD、CommonJS2 和全局属性形式输出。</li>
</ul>
<p>配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  path: config.build.assetsRoot,
  filename: utils.assetsPath('js/[name].js'),
  chunkFilename: utils.assetsPath('js/[id].js'),
  library: 'TipUi',
  libraryTarget: 'umd'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">output</span>: {
  <span class="hljs-attribute">path</span>: config.build.assetsRoot,
  filename: utils.<span class="hljs-built_in">assetsPath</span>(<span class="hljs-string">'js/[name].js'</span>),
  chunkFilename: utils.<span class="hljs-built_in">assetsPath</span>(<span class="hljs-string">'js/[id].js'</span>),
  library: <span class="hljs-string">'TipUi'</span>,
  libraryTarget: <span class="hljs-string">'umd'</span>
}</code></pre>
<h3 id="articleHeader6">依赖</h3>
<p>很明显，我们封装的是一个针对React的组件库，并不应该把React引用进去。一般我们可以采用externals的方式对其进行处理。</p>
<p>在这里, 我们采用dll方式将其与其他第三方依赖统一进行打包，并将manifest.json和三方依赖的输出文件输出到项目中去，在项目中也使用dllReference进行引用。避免在项目中使用到这些依赖时重复进行打包。</p>
<p>同时，由于我们的组件库处于一个不断维护的状态。这就需要我们维持好项目库和项目之间的打包关系，具体的流程如图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV3kZu?w=1750&amp;h=1366" src="https://static.alili.tech/img/bV3kZu?w=1750&amp;h=1366" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在每次进行项目打包的时候，首先检测UI库是否有更新，若没有更新，则直接进行打包。反之继续检测dll的依赖是否有变化，若有，则打包dll,否则直接打包组件库内容。然后将输出结果同步到项目中，再进行最终打包。</p>
<p>当然，以上的这些流程都是<strong><em>自动</em></strong>进行的。</p>
<h2 id="articleHeader7">文档和示例</h2>
<p>一个完善的文档对于一个组件库是及其重要的，每个组件有什么样的配置参数，拥有哪些事件回调，对应的Demo和展示效果。假设没有这些，除了封装组件的人，没有人知道它该如何使用。但是写文档的过程往往是痛苦的，在这里推荐几个文档生成库，可以极大的简化文档工作：</p>
<ul>
<li>
<a href="https://docsify.js.org" rel="nofollow noreferrer" target="_blank">docsify</a> 基于Vue的组件生成器，轻量好用</li>
<li>
<a href="https://react-styleguidist.js.org/" rel="nofollow noreferrer" target="_blank">react-styleguidist</a> 基于React的组件库文档生成器，自动根据注释生成文档，支持Demo展示。<strong><em>超好用</em></strong>
</li>
<li>
<a href="https://github.com/benjycui/bisheng" rel="nofollow noreferrer" target="_blank">bisheng</a> ant design自己写的文档生成器</li>
</ul>
<p>我们使用的styleguidist, 可以将md自动转化为文档，支持在md内直接调用你封装好的组件并进行展示，简单好用。最后封装的文档大概长这样：</p>
<p><span class="img-wrap"><img data-src="/img/bV3kZD?w=1560&amp;h=957" src="https://static.alili.tech/img/bV3kZD?w=1560&amp;h=957" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">总结</h2>
<p>其实封装组件库这种工作有很多的东西值得琢磨和钻研，由于篇幅原因，在这里只对开发过程中比较纠结的选型和打包等进行讨论，后续再对具体组件的封装进行讨论。在书写的同时，不断参考下ant design这种优秀的组件库，能学到很多的东西。更深刻的理解封装组件的思想，是一个很好的过程。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React进行组件库开发

## 原文链接
[https://segmentfault.com/a/1190000013149710](https://segmentfault.com/a/1190000013149710)

