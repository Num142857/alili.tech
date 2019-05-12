---
title: 'Angular2如何使用第三方类库（如：jQuery）' 
date: 2019-01-19 2:30:10
hidden: true
slug: zcgaz8uie
categories: [reprint]
---

{{< raw >}}

                    
<p>Angular2是以TypeScript语言作为默认编码语言，所以你看到的全部都是.ts结尾的文件。</p>
<h1 id="articleHeader0">什么是TypeScript</h1>
<p>首先，它是一个编译型语言；既然是编译型，那么你像重构、导航、智能提醒这种工具属性就可以发挥出来，所以你会发现使用VS CODE来写Angular简直就是绝配。</p>
<p>同时，TypeScript还带来一些ES6/7才有特性，比如let、const、async等，你无须关心ES几。</p>
<p>最霸气，TypeScript还是一个强类型、泛型、多态等一些面向对象编程的东西。</p>
<p>那，为何我们不选它呢？</p>
<p>当然，说了这么多，这跟主题看似无关，但如果你了解这些，才能看到问题的本质。</p>
<h1 id="articleHeader1">如何导入第三方类库？</h1>
<p>类库都是通过 <code>npm</code> 进行安装的，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save jquery" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install --save jquery</code></pre>
<p>会将所需要的类库文件下载至 <code>node_modules/jquery</code> 当中；所以还需要将类库与Angular进行关联。</p>
<p>打开 <code>src/.angular-cli.json</code> 找到 <code>apps/scripts</code> 节点，添加相应的类库至此。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: [
    &quot;../node_modules/jquery/dist/jquery.js&quot;
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: [
    <span class="hljs-string">"../node_modules/jquery/dist/jquery.js"</span>
]</code></pre>
<h1 id="articleHeader2">如何在Angular中使用呢？</h1>
<p>首先，第一关键点TypeScript是<strong>编译型</strong>，既然是编译型，那么你在代码中出现的任何变量、类、函数都是必须要存在，否则编译器就会在编译时报错。</p>
<p>但，问题来了，现在的JavaScript世界中已经有那么多现成的第三方库，难道说都不能用了？非也！</p>
<p>TypeScript一开始就照顾这些了，所以就会有一个叫.d.ts的声明文件。MS当然不会让你去编写这一个文件，所以就有一个叫 <a href="http://definitelytyped.org/" rel="nofollow noreferrer" target="_blank">definitelytyped</a> 网站，TA汇集了很多现成类库的第三方.d.ts的声明文件提供我们下载。</p>
<h2 id="articleHeader3">方法一</h2>
<p>当然是使用最正规军了，用命令安装jQuery的声明文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -D @types/jquery" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install -D @types/jquery</code></pre>
<p>最后，你可以在代码中这么使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as $ from 'jquery';

$('body').addClass('');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;

$(<span class="hljs-string">'body'</span>).addClass(<span class="hljs-string">''</span>);</code></pre>
<p>完美的智能提示，如果你在VS CODE下的话。</p>
<h2 id="articleHeader4">方法二</h2>
<p>对于一些并未提供 .d.ts 声明文件的类库，我们怎么办？那当然只能自己写了。</p>
<p>什么？自己写？很困难吧！很复杂吧！</p>
<p>没那么一回事，声明文件其实是对一些类库接口的描述，以下是我截取一段jQuery声明文件的部分代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface JQueryStatic {
    /**
     * 去掉字符串首尾空格
     *
     * @param str 字符串
     * @see {@link https://api.jquery.com/jQuery.trim/}
     */
    trim(str: string): string;
}

declare var $: JQueryStatic;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-class"><span class="hljs-keyword">interface</span> <span class="hljs-title">JQueryStatic</span> </span>{
    <span class="hljs-comment">/**
     * 去掉字符串首尾空格
     *
     * <span class="hljs-doctag">@param</span> str 字符串
     * <span class="hljs-doctag">@see</span> {<span class="hljs-doctag">@link</span> https://api.jquery.com/jQuery.trim/}
     */</span>
    trim(str: string): string;
}

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">var</span> $: JQueryStatic;</code></pre>
<p>我还特意译成中文，这里的含量很少，最关键的就是 <code>declare</code> 它就是把一个变量 <code>$</code> 定义成类型 <code>JQueryStatic</code> （还是个接口）。</p>
<p>这样，TS编译器在遇到 <code>$</code> 时会去找该类型，并且你的代码里面不能出现 <code>$.time1()</code> 之类的，因为你的接口，只有一个 <code>$.trim()</code>。</p>
<p>等等，jQuery几十个接口，我都要这么写吗？</p>
<p>NO！！！当然不是，除非你想写一个又漂亮、又好看、又是中文、又是完美智能提示的声明文件的话。</p>
<p>否则，你那就拿 <code>any</code> 类型吧，TA就是万能货。你不需要写一个很复杂的声明文件，只需要：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare var $: any;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">declare</span> <span class="hljs-keyword">var</span> $: <span class="hljs-keyword">any</span>;</code></pre>
<p>简单粗暴有效！</p>
<h1 id="articleHeader5">结论</h1>
<p>哎~其实是因群里每天都可以看到一句【怎么使用jQuery】；虽然最简单的结果只需要一句话 <code>declare var $: any;</code>，但我还是啰里吧嗦将了一大堆，可不把前因后果将清楚，我烦~。</p>
<p>另，此解只是抛砖引玉，在很多类库中都是通用的办法。但我建议还是找一些Angular2类库来使用，因为如何更有效的管理JavaScript运行，是一门学问。</p>
<p>希望此篇对你的帮助，快乐编程！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular2如何使用第三方类库（如：jQuery）

## 原文链接
[https://segmentfault.com/a/1190000008605017](https://segmentfault.com/a/1190000008605017)

