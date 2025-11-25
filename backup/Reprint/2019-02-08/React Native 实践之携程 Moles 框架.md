---
title: 'React Native 实践之携程 Moles 框架' 
date: 2019-02-08 2:30:41
hidden: true
slug: p9y8vgc0mz
categories: [reprint]
---

{{< raw >}}

                    
<p><em>编者：本文来自携程框架研发部高级经理魏晓军在第二期<strong>【携程技术微分享】</strong>上的分享，以下为整理后的文字实录。视频回放可点击<a href="http://v.qq.com/page/w/u/g/w0304ucmlug.html" rel="nofollow noreferrer" target="_blank">这里</a>。关注携程技术中心微信公号ctriptech，可获知更多微分享课程信息。</em></p>
<p>因为支持用javascript开发原生应用，React Native一推出就受到不少公司热捧，各家都跃跃欲试。但有一个痛点是，<strong>在移动端，我们是否有必要开发多套程序：iOS、Android和H5？</strong>本次将通过对Moles框架的分享，介绍携程在React Native方面的实战干货，希望给大家一些灵感和启发。</p>
<p>本次分享的内容包括三个方面：</p>
<ol>
<li><p>Moles框架在React Native和我们主App的集成中起到了什么作用？</p></li>
<li><p>Moles框架是如何打通Android、iOS、H5、SEO，让我们一套代码跑在多个平台上？</p></li>
<li><p>Moles框架的组成以及原理是怎样的?</p></li>
</ol>
<p>这些内容将通过以下几个部分的讲解来一一给大家进行解答：</p>
<ul>
<li><p>React Native的现状</p></li>
<li><p>Moles 框架的出现</p></li>
<li><p>Moles 框架的组成</p></li>
<li><p>Moles 框架的功能</p></li>
<li><p>Moles 框架的原理简析</p></li>
<li><p>Moles 框架的使用</p></li>
<li><p>Moles 框架的案例</p></li>
<li><p>开源计划</p></li>
</ul>
<h3 id="articleHeader0"><strong>一、React Native的现状</strong></h3>
<p>React Native是2015年3月份Facebook开源的一个Native上的一个框架。那么为什么它现在会这么火呢。</p>
<p>我们先来看看它有什么优点。</p>
<p>首先，对于做前端的我来说，最吸引的就是可以用javascript来开发Native应用了。之前javascript只可以开发浏览器上的一些功能，随着Node.js的出现，又让javascript走向了服务端，现在React Native的出现又让javascript走向了Native端。如果要用现在一个时髦的词来形容javascript的话，我觉得“全栈”真的不为过。</p>
<p>其次，React Native是Facebook将ReactJS的思想移植到Native端。所以React Native就拥有了RectJS的很多特性，如：组件化思想、Virtual Dom技术以及JSX与Flexbox组合完成的布局等等，同时React Native又引入了热更新机制、CssLayout机制，让开发人员尤其是Native开发人员眼前一亮。</p>
<p>有优点也有缺点，我们再来看看它的不足。</p>
<p>我们知道React Native先出了iOS版本，然后出了Android版本。两个版本之间存在很多的差异性，甚至有好多组件都会带有平台的后缀，这使得开发人员必须要为这两个平台写不同的代码。</p>
<p>此外，对于公司来说，在移动上的投入，不仅有Native还会有H5，而在H5上React Native并没有考虑。从MVC框架的角度来看，React Native只做了View这一层，那么Controller、Model、Router还需要做。从App的完整性来看，只学会React Native并不能开发一个健全的App。它的更新策略、Hybrid API的提供，配套的UI组件、监控机制等等这些都没有。</p>
<h3 id="articleHeader1"><strong>二、Moles 框架的出现</strong></h3>
<p>伴随着React Native项目的开发，逐渐的Moles框架就形成了。</p>
<p>mole [məʊl] 小鼹鼠，是种凿洞能力非常强的啮齿类动物。把框架称为之为Moles，也是寄希望我们的框架能像mole一样，能够打洞，能够打通Android、iOS、H5、SEO这几个平台。当然一个mole的能力是有限的，所以我们取其复数形式Moles。</p>
<p>如果说当前移动端的三大痛点是：性能、动态性、多端适配的话。那么我认为React Native解决了性能、动态性，而我们Moles则解决了多端适配的问题。</p>
<p><strong>Moles的目标是要尽可能的做到在H5端开发的内容可以直接运行在Native上，在Native端开发的内容也可以直接运行在H5上。</strong></p>
<h3 id="articleHeader2"><strong>三、Moles 框架的组成</strong></h3>
<p>该框架主要由三部分组成</p>
<p><strong>1. moles-web</strong></p>
<p>该部分主要是为H5服务，是将React Native在Android、iOS中没有差异化的Components、APIs提取出来，单独封装成一个Library供H5端来使用。这样做的好处是，这个Library只在H5上会是使用到，在Native是不需要的，以减少框架在Native的体积。</p>
<p><strong>2. moles-cui</strong></p>
<p>该部分主要是是将React Native在Android、iOS中有差异化的Components、APIs提取出来，并且添加一些公司定制化的组件进去，包括：UI组件、监控组件、采集组件、路由组件等等。moles-cui可以说是Moles框架的核心部分，它不但Native开发需要使用，在H5上的开发也需要使用。</p>
<p><strong>3. moles-cli</strong></p>
<p>该部分主要包括Moles项目的初始化、编译、打包等功能。</p>
<p>下面是moles-web与moles-cui的一个关系图</p>
<p><span class="img-wrap"><img data-src="/img/bVyoVL" src="https://static.alili.tech/img/bVyoVL" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3"><strong>四、Moles 框架的功能</strong></h3>
<p>Moles框架的功能可以用下图来说明</p>
<p><span class="img-wrap"><img data-src="/img/bVyoVV" src="https://static.alili.tech/img/bVyoVV" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>主要涵盖的对不同平台的适配、对底层API的调用以及对APP中性能和错误的监控等等。</p>
<p>那么Moles在携程主App中所处的位置如何呢？</p>
<p><span class="img-wrap"><img data-src="/img/bVyoV4" src="https://static.alili.tech/img/bVyoV4" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示它就是BU开发人员和React Native、Ctrip React Native 的一个桥梁。让开发人员更专注于自己的业务逻辑，而不必为React Native的更新问题、不同平台的兼容性问题等等而烦恼。</p>
<h3 id="articleHeader4"><strong>五、Moles 框架的原理简析</strong></h3>
<p>由于Moles涉及的内容众多，如：路由的设计、页面生命周期的设计、打包的设计等等。这里我们仅以组件的设计为例，来简析其实现原理。</p>
<p>要做到Native和H5代码共享，通常想到的做法有两种：</p>
<p>1、Native组件运行在H5上，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloWorld extends Component{
  render(){
   return(
    <View>
      <Text>HelloWorld</Text>
    </View>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render(){
   <span class="hljs-keyword">return</span>(
    &lt;<span class="hljs-type">View</span>&gt;
      &lt;<span class="hljs-type">Text</span>&gt;<span class="hljs-type">HelloWorld</span>&lt;/<span class="hljs-type">Text</span>&gt;
    &lt;/<span class="hljs-type">View</span>&gt;
    )
  }
}</code></pre>
<p>2、H5组件运行在Native上，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloWorld extends Component{
  render(){
     return(
    <Div>
      <Span>HelloWorld</Span>
    </Div>
     )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render(){
     <span class="hljs-keyword">return</span>(
    &lt;<span class="hljs-type">Div</span>&gt;
      &lt;<span class="hljs-type">Span</span>&gt;<span class="hljs-type">HelloWorld</span>&lt;/<span class="hljs-type">Span</span>&gt;
    &lt;/<span class="hljs-type">Div</span>&gt;
     )
  }
}</code></pre>
<p>Moles中组件的设计采用了做法1的思路，就是将Native上支持的View、Text、Navigator等组件运行在H5上。要实现Native组件运行在H5上，需要解决两个难点：1、组件化 2、组件的生命周期。</p>
<p>我们刚开始的时候就讲到，React Native上的组件化思想是Facebook将ReactJS的思想用在Native上。这就为我们能在H5上实现Native的组件奠定了基础。所以我们完全可以借助ReactJS来开发这些组件，但是在实际的开发中，发现ReactJS的体量实在是太大了，所以我们最后采用了携程开源的react-lite框架。</p>
<h3 id="articleHeader5"><strong>六、Moles 框架的使用</strong></h3>
<p>为了减少大家的学习成本，Moles框架在设计方面尽量采用大家比较熟悉的语法和命令。要使用Moles，需要先安装moles-cli。</p>
<p>下面是第一次使用moles-cli的简单流程：</p>
<p>安装moles-cli</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo cnpm install @ctrip/moles-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>sudo cnpm install <span class="hljs-variable">@ctrip</span>/moles-cli -g</code></pre>
<p>初始化Moles项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ moles init ProjectName" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>moles init ProjectName</code></pre>
<p>安装项目依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd ProjectName
$ cnpm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd ProjectName
<span class="hljs-variable">$ </span>cnpm install</code></pre>
<p>moles-cli初始化后的目录结构和react-native-cli初始化出来的结构几乎一样，唯一不同的是多了一个web目录，该目录主要是为H5服务。</p>
<p>下面来看下简单的代码使用情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React,{
  View
} from 'react-native'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> React,{
  View
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span></code></pre>
<p>上面的代码若在Native端会调用React Natie提供的react-native模块，在H5端会调用moles-web模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import{
  Application,
  Page
}from 'moles-cui'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span>{
  Application,
  Page
}<span class="hljs-keyword">from</span> <span class="hljs-string">'moles-cui'</span></code></pre>
<p>上面的代码为moles-cui的使用，不论在Native端还是H5端，都需要通过引入'moles-cui'模块来使用。</p>
<p>以运行iOS项目为例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ moles run-ios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ moles <span class="hljs-keyword">run</span><span class="bash">-ios</span></code></pre>
<p>打包、拆包项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ moles packer 
    --input /path/to/project 
    --entry index.ios.js 
    --output /path/to/build 
    --bundle bu.bundle 
    --common true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>$ moles packer 
    -<span class="ruby">-input /path/to/project 
</span>    -<span class="ruby">-entry index.ios.js 
</span>    -<span class="ruby">-output /path/to/build 
</span>    -<span class="ruby">-bundle bu.bundle 
</span>    -<span class="ruby">-common <span class="hljs-literal">true</span></span></code></pre>
<p>参数说明：</p>
<ul>
<li><p>input：项目目录（默认为当前目录）</p></li>
<li><p>entry：入口文件名称（默认为 index.js）</p></li>
<li><p>output：输出目录（默认为 ./build 目录）</p></li>
<li><p>bundle：默认输出文件名称与入口文件同名，也可指定文件名</p></li>
<li><p>common：是否打common包（默认为false）</p></li>
</ul>
<h3 id="articleHeader6"><strong>七、Moles 框架的案例</strong></h3>
<p>目前Moles框架已在携程的主App上投入生产，有兴趣的同学可以安装携程App 6.17，进入”我的携程“频道，其中的站内信页面就是基于Moles框架开发的。现在还有攻略、游轮等频道也在陆陆续续的接入中。相信在不久的将来，大家会在携程的各大频道上看到Moles的身影。我们也希望Moles能成为携程乃至业内基于React Native开发项目的首选框架。</p>
<p>下面是基于Moles开发的效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVyoWr" src="https://static.alili.tech/img/bVyoWr" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><em>我携频道</em></p>
<p><span class="img-wrap"><img data-src="/img/bVyoWx" src="https://static.alili.tech/img/bVyoWx" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><em>攻略频道</em></p>
<h3 id="articleHeader7"><strong>八、开源计划</strong></h3>
<p>之前分享的时候，就有不少同学咨询开源的事情。这里简述下，Moles未来将是一个开源的框架。是一个为开发React Native项目提供解决方案的开源框架。我们会将Moles框架的相关产品逐步的开源给大家。</p>
<p>目前已将Moles框架的打包工具moles-packer开源在了github上。</p>
<p>关于moles-packer的一些介绍：</p>
<blockquote>
<p>moles-packer 是由携程框架团队研发的，与携程Moles框架配套使用的React Native 打包和拆包工具，同时支持原生的 React Native 项目。</p>
<p>当前版本：0.1.3<br>GitHub 地址：<a href="https://github.com/ctripcorp/moles-packer" rel="nofollow noreferrer" target="_blank">https://github.com/ctripcorp/moles-packer</a><br>npm 地址：<a href="https://www.npmjs.com/package/moles-packer" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/moles-packer</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Native 实践之携程 Moles 框架

## 原文链接
[https://segmentfault.com/a/1190000005776912](https://segmentfault.com/a/1190000005776912)

