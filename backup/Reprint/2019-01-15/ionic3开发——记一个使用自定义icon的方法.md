---
title: 'ionic3开发——记一个使用自定义icon的方法' 
date: 2019-01-15 2:30:12
hidden: true
slug: 66e9cf21zd4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近在使用<code>ionic3</code>和<code>Angular</code>开发一款App。开发体验还是挺好的。期间遇到如何在项目中使用自定义图标字体文件的问题，经过研究，找到了一个解决方法，记录一下。</p></blockquote>
<h2 id="articleHeader0">问题描述</h2>
<p><code>ionic</code>项目提供了一套丰富的图标库，在ionic3中也进行了升级。虽然很实用，但是在实际项目中，还是需要根据视觉稿来增加图标。</p>
<p>通常，我们都会使用<code>@font-face</code>导入自定的字体文件。那么我们怎么将这些图标融入到ionic3的项目中去呢？</p>
<p>下面以<code>ionic3</code>中的<code>tabs</code>组件作为例子，提出一种解决方式。</p>
<p>话说问题是解决了，但是看起来其实并不优雅，不过能解决问题。=.=||</p>
<h2 id="articleHeader1">理解<code>ionic3</code>中的图标组件</h2>
<h3 id="articleHeader2">ionic icon的使用</h3>
<p>ionic3中提供图标使用的方式有不少，其中非常重要的组件是:<code>ion-icon</code>，基本的使用方法如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-icon name=&quot;heart&quot; ></ion-icon>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">ion-icon</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"heart"</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ion-icon</span>&gt;</span></code></pre>
<p><code>name</code>属性是图标的名称，这样ionic就会在这个标签处渲染生成一个图标。其他的用法，还有:</p>
<ul>
<li><p>根据不同的设计风格使用不同的图标(<code>ios</code> or <code>md</code>--&gt;Material Design)</p></li>
<li><p>设置图标的不同状态</p></li>
<li><p>作为特定组件的属性</p></li>
</ul>
<p>ionic也为自己的图标库提供了一个预览的页面，<a href="http://ionicframework.com/docs/ionicons/" rel="nofollow noreferrer" target="_blank">Ionicons</a></p>
<h3 id="articleHeader3">
<code>tabs</code>组件中使用icon</h3>
<p>在例子中，<code>tabs</code>组件使用图标的方式，是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-tabs>
    <ion-tab tabIcon=&quot;heart&quot; [root]='tabPage1'></ion-tab>
    <ion-tab tabIcon=&quot;alarm&quot; [root]=&quot;tabPage2&quot;></ion-tab>
    <ion-tab tabIcon=&quot;at&quot; [root]=&quot;tabPage3&quot;></ion-tab>
</ion-tabs>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ion-tabs</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-tab</span> <span class="hljs-attr">tabIcon</span>=<span class="hljs-string">"heart"</span> [<span class="hljs-attr">root</span>]=<span class="hljs-string">'tabPage1'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ion-tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-tab</span> <span class="hljs-attr">tabIcon</span>=<span class="hljs-string">"alarm"</span> [<span class="hljs-attr">root</span>]=<span class="hljs-string">"tabPage2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ion-tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-tab</span> <span class="hljs-attr">tabIcon</span>=<span class="hljs-string">"at"</span> [<span class="hljs-attr">root</span>]=<span class="hljs-string">"tabPage3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ion-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ion-tabs</span>&gt;</span></code></pre>
<p>通过设置<code>tabIcon</code>属性,就可以使用图标库中指定的图标。</p>
<p>仔细看一下渲染后的html结构，你会发现，<code>ion-tab</code>其实是在模板中加入了<code>ion-icon</code>组件：</p>
<p><span class="img-wrap"><img data-src="/img/bVM72X?w=635&amp;h=272" src="https://static.alili.tech/img/bVM72X?w=635&amp;h=272" alt="渲染后的tabs组件使用了ion-icon组件" title="渲染后的tabs组件使用了ion-icon组件" style="cursor: pointer; display: inline;"></span></p>
<p>那么，ionic是如何根据一个<code>name</code>属性，就链接到他的图标库中的图标呢？</p>
<h3 id="articleHeader4">ionic使用图标的原理</h3>
<p>由于ionic3使用了Angular作为框架开发，因此<code>ion-icon</code>要么是组件，要么是指令。所以我们看看它的源码，是如何实现图标文件的使用的。</p>
<p>源码传送门：<a href="https://github.com/driftyco/ionic/blob/3.0.1/src/components/icon/icon.ts" rel="nofollow noreferrer" target="_blank">ion-icon</a></p>
<p>从源码中我们可以看到，ionic把<code>ion-icon</code>定义为一个指令，有三个步骤:</p>
<ol>
<li><p>进行平台风格(<code>ios</code>、<code>md</code>）判断和状态的判断。</p></li>
<li>
<p>根据判断的结果，将输入的图标名称，进一步组合成为如下形式的格式化文本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ion-{平台风格标识}-{图标名}-{修饰}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml">ion-</span><span class="hljs-template-variable">{平台风格标识}</span><span class="xml">-</span><span class="hljs-template-variable">{图标名}</span><span class="xml">-</span><span class="hljs-template-variable">{修饰}</span></code><span class="xml"></span></pre>
</li>
<li><p>将上一步得到的格式文本，添加到元素的<code>class</code>属性中。</p></li>
</ol>
<p>至此，也很好理解了，通过一个css类，就可以使用图标库中的字体定义(<code>@font-face</code>)</p>
<p>ionic将自己的图标字体的scss文件放在<a href="https://github.com/driftyco/ionic/blob/3.0.1/src/fonts/ionicons.scss" rel="nofollow noreferrer" target="_blank">ionicons.scss</a>中，定义字体名称为<code>Ionicons</code>。</p>
<p>而图标库则成为另外一个git项目，相关的类型放在<a href="https://github.com/driftyco/ionicons/blob/3.0/dist/scss/ionicons-icons.scss" rel="nofollow noreferrer" target="_blank">ionicons-icon.scss</a>中。在<code>github</code>中打开源码文件，<code>ctrl+f</code>搜索<code>heart</code>，可以看到css是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ion-ios-heart:before { content: &quot;\f443&quot;; }
.ion-ios-heart-outline:before { content: &quot;\f442&quot;; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ion-ios-heart</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\f443"</span>; }
<span class="hljs-selector-class">.ion-ios-heart-outline</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\f442"</span>; }</code></pre>
<p>通过伪元素，指明了对应的图标字体。<code>-outline</code>后缀指明的是轮廓形状的图标。</p>
<p>知道了这些，我们就可以自定义字体文件和css类，从而让<code>ion-icon</code>也支持我们自定义的图标了。</p>
<h2 id="articleHeader5">准备工作</h2>
<h3 id="articleHeader6">图标文件</h3>
<p>图标文件，一般大家都会用illustrator矢量设计软件设计，然后导出<code>.svg</code>格式的文件。</p>
<p>要打包成字体文件，也有不少工具，常用的是阿里出品的 <a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a>。具体使用方法，网站上讲解的非常清楚，这里就不多说了。</p>
<p>当你上传自己的图标<code>svg</code>文件，导入项目，下载完成后，会得到一堆文件。<br><span class="img-wrap"><img data-src="/img/bVM8ef?w=389&amp;h=267" src="https://static.alili.tech/img/bVM8ef?w=389&amp;h=267" alt="图标字体文件" title="图标字体文件" style="cursor: pointer; display: inline;"></span></p>
<p>有3种方式，可以使用图标:</p>
<ul>
<li><p><code>unicode</code> 最原始的方式，但是兼容性好。</p></li>
<li><p><code>fontclass</code> 使用伪元素和css类的方式，与ionic一样，兼容限制ie8+</p></li>
<li><p><code>symbol</code> 唯一支持保留颜色的方式，但是兼容性需要考虑(支持svg的设备和浏览器可以)</p></li>
</ul>
<p>在例子中，我们选用<code>fontclass</code>足矣。</p>
<h3 id="articleHeader7">部署文件</h3>
<p>将生成的字体文件拷贝到ionic项目<code>src</code>目录下<code>assets</code>中(具体目录根据项目的要求，这里只是例子)的<code>fonts</code>目录里。</p>
<p>然后，书写一份<code>.scss</code>文件，内容如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;ionicons-variables&quot;;

$jpicons-font-path: $font-path !default;

@font-face {
  font-family: &quot;jp-icon&quot;;
  src: url('#{$jpicons-font-path}/iconfont.eot?t=1493779389504'); /* IE9*/
  src: url('#{$jpicons-font-path}/iconfont.eot?t=1493779389504#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('#{$jpicons-font-path}/iconfont.woff?t=1493779389504') format('woff'), /* chrome, firefox */
  url('#{$jpicons-font-path}/iconfont.ttf?t=1493779389504') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('#{$jpicons-font-path}/iconfont.svg?t=1493779389504#jp-iconfont') format('svg'); /* iOS 4.1- */
}

.jp-icon {
  font-family:&quot;jp-icon&quot; !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss">@<span class="hljs-keyword">import</span> <span class="hljs-string">"ionicons-variables"</span>;

<span class="hljs-variable">$jpicons-font-path</span>: <span class="hljs-variable">$font-path</span> !default;

@font-face {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"jp-icon"</span>;
  src: url(<span class="hljs-string">'#{$jpicons-font-path}/iconfont.eot?t=1493779389504'</span>); <span class="hljs-comment">/* IE9*/</span>
  src: url(<span class="hljs-string">'#{$jpicons-font-path}/iconfont.eot?t=1493779389504#iefix'</span>) format(<span class="hljs-string">'embedded-opentype'</span>), /* IE6-IE8 */
  url(<span class="hljs-string">'#{$jpicons-font-path}/iconfont.woff?t=1493779389504'</span>) format(<span class="hljs-string">'woff'</span>), /* chrome, firefox */
  url(<span class="hljs-string">'#{$jpicons-font-path}/iconfont.ttf?t=1493779389504'</span>) format(<span class="hljs-string">'truetype'</span>), /* chrome, firefox, opera, Safari, Android, iOS <span class="hljs-number">4.2</span>+*/
  url(<span class="hljs-string">'#{$jpicons-font-path}/iconfont.svg?t=1493779389504#jp-iconfont'</span>) format(<span class="hljs-string">'svg'</span>); <span class="hljs-comment">/* iOS 4.1- */</span>
}

<span class="hljs-selector-class">.jp-icon</span> {
  <span class="hljs-attribute">font-family</span>:<span class="hljs-string">"jp-icon"</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">16px</span>;
  <span class="hljs-attribute">font-style</span>:normal;
  -webkit-<span class="hljs-attribute">font</span>-smoothing: antialiased;
  -moz-osx-<span class="hljs-attribute">font</span>-smoothing: grayscale;
}</code></pre>
<p>字体名和路径等等，根据需要自定义就可以了。</p>
<p>下一步，就可以定义自己的类名了，由于例子使用<code>Material Design</code>风格，因此，定义如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ion-md-jpicon__evalTab:before { content: &quot;\e64e&quot;; }

.ion-md-jpicon__recTab:before { content: &quot;\e650&quot;; }

.ion-md-jpicon__storeTab:before { content: &quot;\e651&quot;; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ion-md-jpicon__evalTab</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e64e"</span>; }

<span class="hljs-selector-class">.ion-md-jpicon__recTab</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e650"</span>; }

<span class="hljs-selector-class">.ion-md-jpicon__storeTab</span><span class="hljs-selector-pseudo">:before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e651"</span>; }</code></pre>
<p>名字的定义按照之前提到的格式化文本的形式就可以，这里由于想说明清楚的原因，我把名字定义的略复杂了一点，实际使用中可以按自己需要修改。</p>
<p>最后别忘了一点，在你的基础样式表，比如:<code>app.scss</code>中导入这个<code>scss</code>文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import '../assets/fonts/jpicons.scss';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss" style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">import</span> <span class="hljs-string">'../assets/fonts/jpicons.scss'</span>;</code></pre>
<p>无论怎样，当你准备好这些文件时，下一步就可以使用自己的图标字体啦。</p>
<h2 id="articleHeader8">使用字体</h2>
<p>在<code>tabs</code>组件中，可以很方便的使用定义好的字体：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ion-tabs class=&quot;jp-tabs&quot; >
    <ion-tab tabIcon=&quot;jpicon__storeTab&quot; [root]=&quot;store&quot; tabTitle=&quot;精选推荐&quot; tabUrlPath=&quot;store&quot; >
    </ion-tab>
    <ion-tab tabIcon=&quot;jpicon__recTab&quot; [root]=&quot;recommend&quot; tabTitle=&quot;应用场景&quot; tabUrlPath=&quot;recommend&quot; >
    </ion-tab>
    <ion-tab tabIcon=&quot;jpicon__evalTab&quot; [root]=&quot;evaluation&quot; tabTitle=&quot;深度评测&quot; tabUrlPath=&quot;evaluation&quot; >
    </ion-tab>
</ion-tabs>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ion-tabs</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"jp-tabs"</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-tab</span> <span class="hljs-attr">tabIcon</span>=<span class="hljs-string">"jpicon__storeTab"</span> [<span class="hljs-attr">root</span>]=<span class="hljs-string">"store"</span> <span class="hljs-attr">tabTitle</span>=<span class="hljs-string">"精选推荐"</span> <span class="hljs-attr">tabUrlPath</span>=<span class="hljs-string">"store"</span> &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ion-tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-tab</span> <span class="hljs-attr">tabIcon</span>=<span class="hljs-string">"jpicon__recTab"</span> [<span class="hljs-attr">root</span>]=<span class="hljs-string">"recommend"</span> <span class="hljs-attr">tabTitle</span>=<span class="hljs-string">"应用场景"</span> <span class="hljs-attr">tabUrlPath</span>=<span class="hljs-string">"recommend"</span> &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ion-tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ion-tab</span> <span class="hljs-attr">tabIcon</span>=<span class="hljs-string">"jpicon__evalTab"</span> [<span class="hljs-attr">root</span>]=<span class="hljs-string">"evaluation"</span> <span class="hljs-attr">tabTitle</span>=<span class="hljs-string">"深度评测"</span> <span class="hljs-attr">tabUrlPath</span>=<span class="hljs-string">"evaluation"</span> &gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ion-tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ion-tabs</span>&gt;</span></code></pre>
<p>在tabs组件的<code>.scss</code>文件中,我们重新定义在该tabs组件下使用的字体名称:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".jp-tabs{
   .tab-button{
      &amp;>ion-icon{
        font-family:&quot;jp-icon&quot; !important;   /*指定在当前组件中的ion-icon使用的字体名称*/
      }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.jp-tabs</span>{
   <span class="hljs-selector-class">.tab-button</span>{
      &amp;&gt;ion-<span class="hljs-attribute">icon</span>{
        <span class="hljs-attribute">font-family</span>:<span class="hljs-string">"jp-icon"</span> <span class="hljs-meta">!important</span>;   <span class="hljs-comment">/*指定在当前组件中的ion-icon使用的字体名称*/</span>
      }
  }
}</code></pre>
<p>此外，如果有定义图标字体颜色的需求，简单粗暴的方式是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".tabs-md .tab-button[aria-selected=true]{
  color:$jp-color;
  .tab-button-icon{
    color:$jp-color;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.tabs-md</span> <span class="hljs-selector-class">.tab-button</span><span class="hljs-selector-attr">[aria-selected=true]</span>{
  <span class="hljs-attribute">color</span>:<span class="hljs-variable">$jp-color</span>;
  <span class="hljs-selector-class">.tab-button-icon</span>{
    <span class="hljs-attribute">color</span>:<span class="hljs-variable">$jp-color</span>;
  }
}</code></pre>
<p>当一个tab被选中时，ionic会修改对应组件元素上的<code>aria-selected</code>,值是<code>true/false</code>。</p>
<p>运行<code>ionic serve</code>，查看渲染后的效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVM8jh?w=427&amp;h=154" src="https://static.alili.tech/img/bVM8jh?w=427&amp;h=154" alt="自定义图标后的tabs组件" title="自定义图标后的tabs组件" style="cursor: pointer;"></span></p>
<p>再看html代码，可以验证上面所讲到的内容。</p>
<p><span class="img-wrap"><img data-src="/img/bVM8jz?w=590&amp;h=263" src="https://static.alili.tech/img/bVM8jz?w=590&amp;h=263" alt="使用自定义图标后的html" title="使用自定义图标后的html" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">总结</h2>
<p>如果自定义组件和指令是不是也可以实现图标字体的使用？我想是可以的。</p>
<p>本文只是提供了一种方法而已，不太优雅，但是可以解决问题。好处是，可以使用ionic中的一些关于图标的功能，例如，在<code>tabs</code>组件中，可以设置<code>tabLayout</code>属性来决定图标和文字的布局关系，如果要自己开发布局等功能，当然可行，但是需要花费时间。作为一种实现，本文的介绍也算作一种方式吧。但作为研究和推敲原理，我想应该更深入的发现更好的方式。</p>
<p>个人能力有限，如果有什么错漏，请大家批评指正，之后会再补充内容。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ionic3开发——记一个使用自定义icon的方法

## 原文链接
[https://segmentfault.com/a/1190000009288336](https://segmentfault.com/a/1190000009288336)

