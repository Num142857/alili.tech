---
title: '瞅瞅Facebook是怎么保证CSS代码质量的' 
date: 2019-02-09 2:30:58
hidden: true
slug: obbxs1xycsg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://code.facebook.com/posts/879890885467584/improving-css-quality-at-facebook-and-beyond/" rel="nofollow noreferrer" target="_blank">原文地址</a><br>本文从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与最佳实践</a></p></blockquote>
<p>在Facebook里，上千名工程师工作在不同的产品线上，为全世界的用户提供可靠优质的服务，而我们在代码质量管理方面也面临着独一无二的挑战。不仅仅是因为我们面对的是一个庞大的代码基库，还有日渐增加的各种各样的特性，有时候如果你想去重构提高某一个模块，往往会影响到其他很多模块。具体在CSS而言，我们需要处理上千份不停变化的CSS文件。之前我们着力于通过Code Review、代码样式规范以及重构等手段协同工作，而保障代码质量，但是还是会有很多的错误悄悄从眼皮底下溜走，被提交进入到代码库里。我们一直用自建的CSS Linter来检测基本的代码错误与保证一致的编码风格，尽管它基本上已经满足了我们的目标，但还是存在很多的问题，因此我也想在这篇文章里对如何保障CSS的代码质量进行一些讨论。</p>
<h1 id="articleHeader0">Regex is not Enough:之前用的是正则匹配，不咋的啊</h1>
<p>老的Linter主要是基于很多个正则表达式对CSS中的语法进行提取，大概是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
preg_match_all(
 // This pattern matches [attr] selectors with no preceding selector.  
    '/\/\*.*?\*\/|\{[^}]*\}|\s(\[[^\]]+\])/s',
 $data,   
 $matches,   
 PREG_SET_ORDER | PREG_OFFSET_CAPTURE);
 foreach ($matches as $match) {
   if (isset($match[1])) {
     raiseError(...);
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>
preg_match_all(
 // This pattern matches [attr] selectors with no preceding selector.  
    '/<span class="hljs-symbol">\/</span><span class="hljs-symbol">\*</span>.*?<span class="hljs-symbol">\*</span><span class="hljs-symbol">\/</span>|<span class="hljs-symbol">\{</span>[^}]*<span class="hljs-symbol">\}</span>|<span class="hljs-symbol">\s</span>(<span class="hljs-symbol">\[</span>[^<span class="hljs-symbol">\]</span>]+<span class="hljs-symbol">\]</span>)/s',
 <span class="hljs-keyword">$data,   
 $matches,   
 PREG_SET_ORDER | PREG_OFFSET_CAPTURE);
 foreach </span>(<span class="hljs-keyword">$matches as $match) {
   if </span>(isset(<span class="hljs-keyword">$match[1])) {
     raiseError</span>(...);
   }</code></pre>
<p>基本上一个检测规则就需要添加一个专门的匹配规则，非常不好维护，在性能上也有很大的问题。对于每个规则俺们都需要遍历整个文件，性能差得很。</p>
<h1 id="articleHeader1">Abstract Syntax Tree</h1>
<p>受够了正则表达式，我们想搞一个更好用的也是更细致的CSS解释器。CSS本身也是一门语言，老把它当做纯文本文件处理也不好，因此我们打算用AST，即抽象语法树的方式构建一个解析器。这种新的处理方式在性能上面有个很不错的提升，譬如我们的代码库中有这么一段CSS代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
  display: none:
  background-color: #8B1D3;
  padding: 10px,10px,0,0;
  opacity: 1.0f;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
{
  <span class="hljs-attribute">display</span>: none:
  background-color: <span class="hljs-number">#8B1D3</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>,<span class="hljs-number">10px</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>;
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1.0</span>f;
}</code></pre>
<p>眼神好的估计才能看出这个代码片段中存在的问题，譬如某个属性名错了、十六进制的颜色代码写错的，分隔符写错了等等。浏览器才不会主动给你报错呢，这样开发者自己也就很难找到错误了。在具体实现上，我们发现<a href="http://postcss.org/" rel="nofollow noreferrer" target="_blank">PostCSS</a> 是个不错的工具，因此我们选择了<a href="http://stylelint.io/" rel="nofollow noreferrer" target="_blank">Stylelint</a>作为我们新的Linter工具，它是基于PostCSS构建的，非常的灵活，社区也不错。</p>
<p>就像JavaScript中的Esprima以及ESLint一样，Stylelint提供了对于完整的AST的访问方式，能够让你根据不同的情况更快速简单的访问具体的代码节点，譬如现在我们的检测规则写成了这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
root.walkDecls(node => {
  if (node.prop === 'text-transform' &amp;&amp; node.value === 'uppercase') {
    report({
      ...
    });
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>
root.walkDecls(<span class="hljs-keyword">node</span> <span class="hljs-title">=&gt; {
  if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">prop</span> === 'text-transform' &amp;&amp; <span class="hljs-keyword">node</span>.<span class="hljs-title">value</span> === 'uppercase') {
    report({
      ...
    });
  }
});</code></pre>
<p>我们也可以传入一些基本的函数，譬如<code>linear-gradient</code>，就像这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// disallow things like linear-gradient(top, blue, green) w. incorrect first valueroot.walkDecls(node => {
  const parsedValue = styleParser(node.value);
  parsedValue.walk(valueNode => {
    if (valueNode.type === 'function' &amp;&amp; valueNode.value === 'linear-gradient') {
      const firstValueInGradient = styleParser.stringify(valueNode.nodes[0]);
      if (disallowedFirstValuesInGradient.indexOf(firstValueInGradient) > -1) {
        report({
          ...
        });
      }
    }
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>
<span class="hljs-comment">// disallow things like linear-gradient(top, blue, green) w. incorrect first valueroot.walkDecls(node =&gt; {</span>
  <span class="hljs-keyword">const</span> parsedValue = styleParser(node.<span class="hljs-keyword">value</span>);
  parsedValue.walk(valueNode =&gt; {
    <span class="hljs-keyword">if</span> (valueNode.type === <span class="hljs-string">'function'</span> &amp;&amp; valueNode.<span class="hljs-keyword">value</span> === <span class="hljs-string">'linear-gradient'</span>) {
      <span class="hljs-keyword">const</span> firstValueInGradient = styleParser.stringify(valueNode.nodes[<span class="hljs-number">0</span>]);
      <span class="hljs-keyword">if</span> (disallowedFirstValuesInGradient.indexOf(firstValueInGradient) &gt; <span class="hljs-number">-1</span>) {
        report({
          ...
        });
      }
    }
  });
});</code></pre>
<p>这样子写出来的检测规则可读性更好，也更好去理解与维护，并且这种方式无论是在怎样的CSS格式化的情况下，以及不管规则和声明放在哪边，都能正常地工作。</p>
<h1 id="articleHeader2">Custom rules:自定义规则</h1>
<p>我们默认使用了一些Stylelint内置的规则，譬如<a href="https://www.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fstylelint%2Fstylelint%2Ftree%2Fmaster%2Fsrc%2Frules%2Fdeclaration-no-important&amp;h=oAQG1Tctr&amp;s=1" rel="nofollow noreferrer" target="_blank">declaration-no-important</a>,<a href="https://github.com/stylelint/stylelint/blob/master/src/rules/selector-no-universal/README.md" rel="nofollow noreferrer" target="_blank">selector-no-universal</a>, 以及 <a href="https://github.com/stylelint/stylelint/tree/master/src/rules/selector-class-pattern" rel="nofollow noreferrer" target="_blank">selector-class-pattern</a>。如何添加自定义规则的方法可以参考<a href="http://stylelint.io/developer-guide/plugins/" rel="nofollow noreferrer" target="_blank">built-in plugin mechanism</a>，而我们使用的譬如：</p>
<ul>
<li>
</li>
<li><p>slow-css-properties 来告警一些性能较差的属性，譬如opacity或者box-shadow</p></li>
<li><p>filters-with-svg-files 来告警Edge中不支持SVG的过滤</p></li>
<li><p>use-variables来告警那些可以被内置的常量替换的一些变量</p></li>
<li><p>common-properties-whitelist 来检测是否有些误写的其实不存在的属性</p></li>
<li><p>mobile-flexbox 来检测一些不被老版本手机浏览器支持的属性</p></li>
<li><p>text-transform-uppercase 来告警 "text-transform: uppercase"，这个在某些语言表现的不友好</p></li>
</ul>
<p>我们也贡献了部分<a href="https://www.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fstylelint%2Fstylelint%2Fpull%2F675&amp;h=GAQF25sgV&amp;s=1" rel="nofollow noreferrer" target="_blank">规则</a> 以及 <a href="https://www.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fstylelint%2Fstylelint%2Fpull%2F689&amp;h=hAQHu_d3q&amp;s=1" rel="nofollow noreferrer" target="_blank">ad插件itions</a> 给Stylelint。</p>
<h1 id="articleHeader3">Automatic replacement:自动替换</h1>
<p>我们检测过程中有一个重要的工作就是自动格式化，Linter会在发现某些问题的时候问你是否需要根据规则进行替换，这个功能会节约你大量的手动修改校正的时间。一般来说，我们提交代码之前都会审视下Linter报出的错误，然后去修复这些错误。可惜的是Stylelint并没有内嵌的自动格式化与修复机制，因此我们重写了部分的Stylelint的规则来增加一个自动替换与修复的功能。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006772126?w=736&amp;h=689" src="https://static.alili.tech/img/remote/1460000006772126?w=736&amp;h=689" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">Test all the things</h1>
<p>我们老的Linter还有个问题就是没有单元测试，这点就好像代码上线前不进行单元测试一样不靠谱。我们面对的可能是任意格式的处理文本，因此我们也要保证我们的检测规则能够适用于真实有效的环境，这里我们是选择了Jest这个测试框架，Stylelint对它的支持挺好的，然后大概一个单元测试是这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
test.ok('div { background-image: linear-gradient( 0deg, blue, green 40%, red ); }', 
  'linear gradient with valid syntax');
test.notOk('a { background: linear-gradient(top, blue, green); }', 
  message, 
    'linear-gradient with invalid syntax');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>
test.ok('div { <span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: <span class="hljs-built_in">linear</span>-gradient( <span class="hljs-number">0deg</span>, blue, green <span class="hljs-number">40</span><span class="hljs-symbol">%</span>, red ); }', 
  '<span class="hljs-built_in">linear</span> gradient with valid syntax');
test.notOk('a { <span class="hljs-built_in">background</span>: <span class="hljs-built_in">linear</span>-gradient(top, blue, green); }', 
  message, 
    '<span class="hljs-built_in">linear</span>-gradient with invalid syntax');
</code></pre>
<h1 id="articleHeader5">What‘s next</h1>
<p>换一个靠谱的CSS Linter工具只是保证高质量的CSS的代码的第一步，我们还打算添加很多自定义的检测规则来捕获一些常见的错误，保证使用规定的最佳实践以及统一代码约定规范。我们已经在JavaScript的校验中进行了这一工作。</p>
<p>另外对于React社区中存在的CSS-in-JS这种写法，对于CSS Linter也是个不小的挑战，现在的大部分的Linter都是着眼于处理传统的CSS文件，以后会添加对于JSX的处理规范吧。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006058452" src="https://static.alili.tech/img/remote/1460000006058452" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
瞅瞅Facebook是怎么保证CSS代码质量的

## 原文链接
[https://segmentfault.com/a/1190000005719354](https://segmentfault.com/a/1190000005719354)

