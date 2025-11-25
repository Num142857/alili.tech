---
title: '使用 Typescript 检查你的代码规范' 
date: 2018-12-14 2:30:11
hidden: true
slug: h2amhgeebhb
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">背景</h3>
<hr>
<p>越来越多的前端项目开始使用<code>typescript</code>这门静态检查语言了，它包括很多很棒的功能点，在这里就不细述，根据静态语法检查和<code>.d.ts</code>生成的代码提示两大特性，我们就可以来制定并且检查代码规范，现在我们来详细说一下。</p>
<h3 id="articleHeader1">代码规范</h3>
<hr>
<p>代码规范大家应该是从开始写第一行代码开始别人就开始和你说，要遵循xx代码规范。公司不同，规范的内容、形式、检查方式也不同，但最终是要验收你的规范。<br>如果是通过leader code review方式来检查代码，那效率也就太低了，<strong>最好的方式就是在GIT提交之前做检查。</strong>你的代码不合规范，提交都提交不上去，这样就能从入口上保证代码的规范性。<br>我们再说看下前端的代码规范情况，前端的代码主要就是js的代码，因为js的灵活性以及随意性，让工具来检查代码的规范成为不可能，这也是我一直头疼的事，因为规范这种东西，说再多遍，不来点强制手段，组内之前也是不可能达成一致的。直到<code>Typescript</code>的出现，解决了这个问题。</p>
<h3 id="articleHeader2">Typescript检查的原理</h3>
<hr>
<p><code>Typescript</code>是<code>javascript</code>的超集，所以<code>ts</code>在运行之前，得先编译成<code>js</code>，那么这个编译的过程，<code>ts</code>的编译引擎就得知道，文件里包括哪些方法，方法包含哪些参数，各参数的定义是什么，类型是什么，总之，所有源信息必须都知道，才能准确无误的把<code>ts</code>翻译成<code>js</code>。这些东西也正是我们需要的，通过这些信息，我们就可以对比规范和源信息，来确认是否是符合我们制定规范的代码。</p>
<h4>初步实现</h4>
<hr>
<p>顺着这个思路，我查了查<code>typescript</code>的官方文档，果然找到了一个，叫做<a href="https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API" rel="nofollow noreferrer" target="_blank">Compiler API</a>，最后的那个例子，是和我们的需求相关的，把代码拿下来，也是可以跑通的，所以呢，下一步，就是基于这个例子进行扩展，来满足我们自己的需求。<br>实现的过程，也是挺痛苦的，因为没有文档，也没有说明，幸亏在<code>vscode</code>可以点进行看声明文件，好消息是可以看到方法的定义，坏消息就是所有的方法的声明、类型，都没有注释，部分需要自己来猜，哈哈，有总比没有强，照猫画虎，总算实现了基本功能。</p>
<p><span class="img-wrap"><img data-src="/img/bV1KkE?w=545&amp;h=194" src="https://static.alili.tech/img/bV1KkE?w=545&amp;h=194" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>官方的<code>.d.ts</code>大致就长这样</em></p>
<p>开发之中，有一个问题比较难解决，就是在目前可观测的API中，只能<code>constructor</code>可以取到返回值类型，其他方法API根本不提供，最后借助<code>stackoverflow</code>上提问，解决了这个问题，有兴趣的同学可以参考下：<a href="https://stackoverflow.com/questions/47215069/how-to-use-typescript-compiler-api-to-get-normal-function-info-eg-returntype-p" rel="nofollow noreferrer" target="_blank">how to use typescript Compiler API to get normal function info, eg: returnType/parameters?</a></p>
<h3 id="articleHeader3">检查你的代码</h3>
<hr>
<p>现在已经可以检查你的代码了，我们上面也说了，最好的检查时机是开发人员提交的时候，这时会检查所有的代码，只有所有的代码都符合规范，才会提交成功，这是我们最理想的情况。<br>按照这个思路，我们可以查到，<code>Git</code>有很多钩子，<code>pre-commit</code>、<code>commit-msg</code>、<code>post-commit</code>等等，我们使用<code>pre-commit</code>：提交前检查，会执行<code>.git/hooks/pre-commit</code>下的脚本文件，但是这个文件分布在组内所有人的笔记本中，并且不能增加版本控制。带着这样的疑问，我们找到了<code>pre-commit</code>这个神器，它的实现原理也是修改上面的文件，不过它从<code>node</code>层屏蔽了实现细节，我们只要在<code>package.json</code>里面增加一个<code>script</code>就可以实现我们要的功能。</p>
<p>配置大概是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
&quot;pre-commit&quot;: [&quot;commit&quot;],
&quot;script&quot;:{
    ...
    &quot;commit&quot;: &quot;ts-node verify.ts&quot;
    ...
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>...
<span class="hljs-string">"pre-commit"</span>: [<span class="hljs-string">"commit"</span>],
<span class="hljs-string">"script"</span>:{
    ...
    <span class="hljs-string">"commit"</span>: <span class="hljs-string">"ts-node verify.ts"</span>
    ...
}
...</code></pre>
<p>这样在<code>git</code>里面<code>commit</code>（不管使用命令行还是<code>SourceTree</code>这样图形界面）的时候就会执行<code>ts-node verify.ts</code>，检查要是失败了，就会把错误信息打印到控制台上，并且提交会失败，直到所有的已定规则都验证通过，才会提交成功。</p>
<p>检查失败，大致就是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bV3qsi?w=579&amp;h=189" src="https://static.alili.tech/img/bV3qsi?w=579&amp;h=189" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">还有一个更大的作用</h3>
<hr>
<p>我们已经通过上一步，能够检查我们的规范了，知道代码的所有信息，比如<strong>生成<code>.d.ts</code>文件！</strong>对一个对外提供的工具库来讲，如果没有一套完整的<code>.d.ts</code>文件进行代码提示的话，那就显的太不专业了。如果要生成一个完整的提示文件，就必须要求你的类、方法、参数、返回值都要有完整的注释，这些就应该在你的代码规范中。</p>
<p>我们来看一下，比较好的例子：</p>
<p><span class="img-wrap"><img data-src="/img/bV1KFy?w=795&amp;h=175" src="https://static.alili.tech/img/bV1KFy?w=795&amp;h=175" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>知道了所有的信息，生成这个文件其实就是字符串的拼接，没什么技术含量，不过生成的格式还得注意一下。</p>
<h3 id="articleHeader5">兼容所有情况的<code>.d.ts</code>写法</h3>
<hr>
<p>一般我们使用一个库文件的时候，都会有三种用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Util from 'xxx/Util'
import {DateTime, Fiel} from 'xxx/Util'
import * as Util from 'xxx/Util'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Util <span class="hljs-keyword">from</span> <span class="hljs-string">'xxx/Util'</span>
<span class="hljs-keyword">import</span> {DateTime, Fiel} <span class="hljs-keyword">from</span> <span class="hljs-string">'xxx/Util'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> Util <span class="hljs-keyword">from</span> <span class="hljs-string">'xxx/Util'</span></code></pre>
<p>在使用的时候，这三种形式所需要的<code>.d.ts</code>文件的格式也是不一样的，所以作为对外提供服务的库文件来说，所有的使用方式，我们都应该兼容。经过多次尝试，这样格式的<code>.d.ts</code>文件是兼容所有用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class DateTime {
    static dateFormat(....)
}

declare const exDe: {
    DateTime: typeof DateTime
}

export default exDe
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DateTime</span> </span>{
    <span class="hljs-keyword">static</span> dateFormat(....)
}

declare <span class="hljs-keyword">const</span> exDe: {
    <span class="hljs-built_in">DateTime</span>: typeof <span class="hljs-built_in">DateTime</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> exDe
</code></pre>
<h3 id="articleHeader6">源码</h3>
<hr>
<p>Demo的源码以及使用效果，<a href="https://github.com/sunhaikuo/ts-inspector-demo" rel="nofollow noreferrer" target="_blank">用力点我</a><br>Demo中用到的代码检查工具，<a href="https://github.com/sunhaikuo/ts-inspector" rel="nofollow noreferrer" target="_blank">用力点我</a></p>
<h3 id="articleHeader7">使用效果</h3>
<ul><li>检查失败的情况</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV3q9s?w=562&amp;h=199" src="https://static.alili.tech/img/bV3q9s?w=562&amp;h=199" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>检查成功的情况</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV3q9E?w=618&amp;h=166" src="https://static.alili.tech/img/bV3q9E?w=618&amp;h=166" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Typescript 检查你的代码规范

## 原文链接
[https://segmentfault.com/a/1190000013173370](https://segmentfault.com/a/1190000013173370)

