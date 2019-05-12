---
title: '由一个“bug”到鲜为人知的jQuery.cssHooks' 
date: 2018-12-13 2:30:07
hidden: true
slug: cwyv0xn6tvs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在最前</h2>
<p>本次分享一下在一次jQuery赋值样式失效的结果中来分析背后原因的过程。在翻jQuery源码的过程中，感觉真是还不能说自己只是会用jQuery，我好像连会用都达不到（逃</p>
<p>欢迎关注<a href="https://github.com/Aaaaaaaty/Blog" rel="nofollow noreferrer" target="_blank">我的博客</a>，不定期更新中——</p>
<h3 id="articleHeader1">一个很简单的赋值问题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#' + id).css({&quot;left&quot;: &quot;200&quot;})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$(</span><span class="hljs-string">'#'</span> + id).css({<span class="hljs-string">"left"</span>: <span class="hljs-string">"200"</span>})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013273852?w=199&amp;h=93" src="https://static.alili.tech/img/remote/1460000013273852?w=199&amp;h=93" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>我只是单纯的想控制一个left值，大家都懂，但是竟然失败了，打印出的元素属性中可以看到left为""；我其实一开始没想到可能是jQuery本身的原因导致的，我先考虑的是我这个元素是不是当前要赋值的？js的问题？等等。。干想了半天，认为可能还是本身的写法问题。所以进行了如下实验：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#' + id).css({&quot;left&quot;: 200})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$(</span><span class="hljs-string">'#'</span> + id).css({<span class="hljs-string">"left"</span>: <span class="hljs-number">200</span>})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013273853?w=187&amp;h=87" src="https://static.alili.tech/img/remote/1460000013273853?w=187&amp;h=87" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>看起来是字符串和数字的区别！omg，从来没想过字符串和数字的效果竟然会不一致。。你以为事情已经结束了？no，看下面这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#' + id).css({&quot;width&quot;: &quot;200&quot;})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$(</span><span class="hljs-string">'#'</span> + id).css({<span class="hljs-string">"width"</span>: <span class="hljs-string">"200"</span>})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013273854?w=193&amp;h=84" src="https://static.alili.tech/img/remote/1460000013273854?w=193&amp;h=84" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>好的为什么，width设定字符串就可以被添加px后缀，left就不可以？？</p>
<p>现在我们可以总结一下通过jQuery.fn.css方法来设定元素属性的时候会有一些不一致的情况，以width和left为例子（因为属性很多，不一致的情况很多，了解原理即可）：</p>
<ul>
<li>left通过number类型可以补全px完成样式设定，string类型无法设定属性</li>
<li>width均可以通过number或string类型完成设定属性</li>
</ul>
<p>从而可以抛出由一开始的奇怪现象的底层问题：<strong>为什么通过jQuery.fn.css方法设定样式时，string类型的值在某些属性上无法生效？</strong></p>
<h3 id="articleHeader2">从源码中找线索</h3>
<p>jQuery的源码相比react、vue相比应该是很直接的了，就是一个js。（不过我仍然看不懂？</p>
<p>首先引入一个没有压缩过的jQuery，里面保留了所有的注释和代码结构，很方便大家阅读</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://cdn.bootcss.com/jquery/3.3.1/jquery.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">https:<span class="hljs-regexp">//</span>cdn.bootcss.com<span class="hljs-regexp">/jquery/</span><span class="hljs-number">3.3</span>.<span class="hljs-number">1</span><span class="hljs-regexp">/jquery.js</span></code></pre>
<p>先找到我们本次设定样式的方法jQuery.fn.css：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.fn.extend( {
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;
                if ( Array.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;
    
                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }
    
                    return map;
                }
    
                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        }
    } );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>jQuery.fn.extend( {
        css: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( name, value )</span></span> {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">access</span>( this, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">( elem, name, value )</span></span> {
                var styles, len,
                    map = {},
                    i = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">if</span> ( Array.isArray( <span class="hljs-keyword">name</span> ) ) {
                    styles = getStyles( elem );
                    len = <span class="hljs-keyword">name</span>.length;
    
                    for ( ; i &lt; len; i++ ) {
                        map[ <span class="hljs-keyword">name</span>[ i ] ] = jQuery.css( elem, <span class="hljs-keyword">name</span>[ i ], false, styles );
                    }
    
                    <span class="hljs-keyword">return</span> map;
                }
    
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> <span class="hljs-comment">!== undefined ?</span>
                    jQuery.style( elem, <span class="hljs-keyword">name</span>, <span class="hljs-keyword">value</span> ) :
                    jQuery.css( elem, <span class="hljs-keyword">name</span> );
            }, <span class="hljs-keyword">name</span>, <span class="hljs-keyword">value</span>, arguments.length &gt; <span class="hljs-number">1</span> );
        }
    } );</code></pre>
<p>如何通过浏览器来调试源码呢？（因为直接看源码太繁琐了，通过debug的形式可以看到每次的调用栈）我们可以通过console.log的形式，在这段源码中将console写入，之后在控制台中就可以看到对应源码的调用：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013273855?w=1037&amp;h=471" src="https://static.alili.tech/img/remote/1460000013273855?w=1037&amp;h=471" alt="wechatimg152" title="wechatimg152" style="cursor: pointer; display: inline;"></span></p>
<p>进入jQuery.style之后就会来到最终产生区别的地方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="style: function( elem, name, value, extra ) {
    
            ...
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
            if ( value !== undefined ) {
                type = typeof value;
                if ( type === &quot;string&quot; &amp;&amp; ( ret = rcssNum.exec( value ) ) &amp;&amp; ret[ 1 ] ) {
                    value = adjustCSS( elem, name, ret );
                    type = &quot;number&quot;;
                }
                ...
                if ( type === &quot;number&quot; ) {
                    value += ret &amp;&amp; ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? &quot;&quot; : &quot;px&quot; );
                }
                ...
                if ( !hooks || !( &quot;set&quot; in hooks ) ||( value = hooks.set( elem, value, extra ) ) !== undefined ) {
                    //此时的value到底是200还是200px;只有添加了后缀才能赋值成功
                    if ( isCustomProp ) {
                        style.setProperty( name, value );
                    } else {
                        style[ name ] = value;
                    }
                }
    
            } 
            ...
        }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>style: function( elem, name, <span class="hljs-keyword">value</span>, extra ) {
    
            ...
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
            <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">value</span> !== undefined ) {
                type = <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">value</span>;
                <span class="hljs-keyword">if</span> ( type === <span class="hljs-string">"string"</span> &amp;&amp; ( ret = rcssNum.exec( <span class="hljs-keyword">value</span> ) ) &amp;&amp; ret[ <span class="hljs-number">1</span> ] ) {
                    <span class="hljs-keyword">value</span> = adjustCSS( elem, name, ret );
                    type = <span class="hljs-string">"number"</span>;
                }
                ...
                <span class="hljs-keyword">if</span> ( type === <span class="hljs-string">"number"</span> ) {
                    <span class="hljs-keyword">value</span> += ret &amp;&amp; ret[ <span class="hljs-number">3</span> ] || ( jQuery.cssNumber[ origName ] ? <span class="hljs-string">""</span> : <span class="hljs-string">"px"</span> );
                }
                ...
                <span class="hljs-keyword">if</span> ( !hooks || !( <span class="hljs-string">"set"</span> <span class="hljs-keyword">in</span> hooks ) ||( <span class="hljs-keyword">value</span> = hooks.<span class="hljs-keyword">set</span>( elem, <span class="hljs-keyword">value</span>, extra ) ) !== undefined ) {
                    <span class="hljs-comment">//此时的value到底是200还是200px;只有添加了后缀才能赋值成功</span>
                    <span class="hljs-keyword">if</span> ( isCustomProp ) {
                        style.setProperty( name, <span class="hljs-keyword">value</span> );
                    } <span class="hljs-keyword">else</span> {
                        style[ name ] = <span class="hljs-keyword">value</span>;
                    }
                }
    
            } 
            ...
        },</code></pre>
<p>源码中可以看到在传入的value中确实对string和number做了区分；而不是我之前所认为的，string应该和number差不多：）如果传入number类型，便会为其添加px后缀；但是这仍然没有解释为什么left和width均传入string而结果不同的问题。重点在于这句话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
...
if ( !hooks || !( &quot;set&quot; in hooks ) ||
    ( value = hooks.set( elem, value, extra ) ) !== undefined ) {
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>hooks = <span class="hljs-keyword">jQuery.cssHooks[ </span>name ] <span class="hljs-title">||</span> <span class="hljs-keyword">jQuery.cssHooks[ </span><span class="hljs-keyword">origName </span>]<span class="hljs-comment">;</span>
...
if ( !hooks <span class="hljs-title">||</span> !( <span class="hljs-string">"set"</span> in hooks ) <span class="hljs-title">||</span>
    ( value = hooks<span class="hljs-meta">.set</span>( elem, value, <span class="hljs-keyword">extra </span>) ) !== undefined ) {
    ...
}</code></pre>
<p>在value是string类型，到最终赋值之前，还会经过<code>value = hooks.set( elem, value, extra ) ) !== undefined</code>的判断，也就是说如果hooks.set方法存在，我们还有一次通过这个方法来将string类型的value进行后缀补全的机会。而这个hooks是由jQuery.cssHooks得到的，那么jQuery.cssHooks是什么:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013273856?w=570&amp;h=186" src="https://static.alili.tech/img/remote/1460000013273856?w=570&amp;h=186" alt="wechatimg153" title="wechatimg153" style="cursor: pointer; display: inline;"></span></p>
<p>从源码中可以看出，cssHooks中包含了属性的一些方法，其中left只有get；width有get和set。再结合上面的判断条件就可以推断出，由于width存在了set方法，在其方法中对string类型的value完成了后缀的补齐，而left则不行从而形成了文中一开始的“神奇”现象。</p>
<h4>cssHooks</h4>
<blockquote>直接向 jQuery 中添加钩子，用于覆盖设置或获取特定 CSS   属性时的方法，目的是为了标准化 CSS 属性名或创建自定义属性。<br> $.cssHooks 对象提供了一种通过定义函数来获取或设置特定 CSS 值的方法。可以用它来创建新的 cssHooks 用于标准化 CSS3 功能，例如，盒子阴影（box shadows）及渐变（gradients）。<p>例如，某些基于 Webkit 的浏览器会使用 -webkit-border-radius 来设置对象的 border-radius，然而,早先版本的 Firefox 则使用 -moz-border-radius。cssHook 就可以将这些不同的写法进行标准化，从而让 .css() 可以使用统一的标准化属性名(border-radius 或对应的 DOM 属性写法 borderRadius)。</p>
<p>该方法除了提供了对特定样式的处理可以采用更加细致的控制外，$.cssHooks 同时还扩展了 .animate() 方法上的属性集。</p>
</blockquote>
<p>简单来说，jQuery给我们暴露了一个钩子，我们可以自己定义方法比如set，来实现针对某个属性的特定行为。所以出现left和width的问题就是有没有set这个钩子方法。so。。我们还剩最后一个问题：</p>
<p><strong>为什么width要对其设定钩子函数？</strong></p>
<p>答案可以从其set方法来窥探一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="set: function( elem, value, extra ) {
    var matches,
        styles = getStyles( elem ),
        isBorderBox = jQuery.css( elem, &quot;boxSizing&quot;, false, styles ) === &quot;border-box&quot;,
        subtract = extra &amp;&amp; boxModelAdjustment(
            elem,
            dimension,
            extra,
            isBorderBox,
            styles
        );

    // Account for unreliable border-box dimensions by comparing offset* to computed and
    // faking a content-box to get border and padding (gh-3699)
    if ( isBorderBox &amp;&amp; support.scrollboxSize() === styles.position ) {
        subtract -= Math.ceil(
            elem[ &quot;offset&quot; + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
            parseFloat( styles[ dimension ] ) -
            boxModelAdjustment( elem, dimension, &quot;border&quot;, false, styles ) -
            0.5
        );
    }

    // Convert to pixels if value adjustment is needed
    if ( subtract &amp;&amp; ( matches = rcssNum.exec( value ) ) &amp;&amp;
        ( matches[ 3 ] || &quot;px&quot; ) !== &quot;px&quot; ) {

        elem.style[ dimension ] = value;
        value = jQuery.css( elem, dimension );
    }

    return setPositiveNumber( elem, value, subtract );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>set: function( <span class="hljs-built_in">elem</span>, value, extra ) {
    <span class="hljs-built_in">var</span> matches,
        styles = getStyles( <span class="hljs-built_in">elem</span> ),
        isBorderBox = jQuery.css( <span class="hljs-built_in">elem</span>, <span class="hljs-string">"boxSizing"</span>, <span class="hljs-literal">false</span>, styles ) === <span class="hljs-string">"border-box"</span>,
        subtract = extra &amp;&amp; boxModelAdjustment(
            <span class="hljs-built_in">elem</span>,
            <span class="hljs-built_in">dimension</span>,
            extra,
            isBorderBox,
            styles
        );

    // Account <span class="hljs-keyword">for</span> unreliable <span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span> <span class="hljs-built_in">dimensions</span> by comparing offset* to computed <span class="hljs-keyword">and</span>
    // faking a <span class="hljs-built_in">content</span>-<span class="hljs-built_in">box</span> to <span class="hljs-built_in">get</span> <span class="hljs-built_in">border</span> <span class="hljs-keyword">and</span> padding (gh-<span class="hljs-number">3699</span>)
    <span class="hljs-keyword">if</span> ( isBorderBox &amp;&amp; support.scrollboxSize() === styles.<span class="hljs-built_in">position</span> ) {
        subtract -= Math.ceil(
            <span class="hljs-built_in">elem</span>[ <span class="hljs-string">"offset"</span> + <span class="hljs-built_in">dimension</span>[ <span class="hljs-number">0</span> ].toUpperCase() + <span class="hljs-built_in">dimension</span>.slice( <span class="hljs-number">1</span> ) ] -
            parseFloat( styles[ <span class="hljs-built_in">dimension</span> ] ) -
            boxModelAdjustment( <span class="hljs-built_in">elem</span>, <span class="hljs-built_in">dimension</span>, <span class="hljs-string">"border"</span>, <span class="hljs-literal">false</span>, styles ) -
            <span class="hljs-number">0.5</span>
        );
    }

    // Convert to pixels <span class="hljs-keyword">if</span> value adjustment <span class="hljs-built_in">is</span> needed
    <span class="hljs-keyword">if</span> ( subtract &amp;&amp; ( matches = rcssNum.exec( value ) ) &amp;&amp;
        ( matches[ <span class="hljs-number">3</span> ] || <span class="hljs-string">"px"</span> ) !== <span class="hljs-string">"px"</span> ) {

        <span class="hljs-built_in">elem</span>.<span class="hljs-built_in">style</span>[ <span class="hljs-built_in">dimension</span> ] = value;
        value = jQuery.css( <span class="hljs-built_in">elem</span>, <span class="hljs-built_in">dimension</span> );
    }

    <span class="hljs-built_in">return</span> setPositiveNumber( <span class="hljs-built_in">elem</span>, value, subtract );
}</code></pre>
<p>从这个钩子函数中我们可以看出，要对width做特殊处理是因为css的盒模型有好几种，content-box|border-box|inherit分别代表“不包括padding、border、margin” | “包含border和padding” | “继承”；故为了统一外界的调用，隐藏这些背后的判断，从而增加了这个set方法。顺带着在其中把px补全了。同时left这种没什么需要兼容的故没有设定set方法。</p>
<h3 id="articleHeader3">小结</h3>
<p>虽然cssHooks不常用（我反正从来没用过，现在对于标准化格式有很多其他的方法来做，cssHooks的钩子感觉还是有些复杂了），但这次通过页面上一个很小的问题从而引发思考并且试图深挖一些的过程还是值得总结下来的。虽然我们不是造轮子的人，但理解别人的轮子也是比“会用”好一些的；更何况看了cssHooks我感觉我都不会用jQuery：)</p>
<h3 id="articleHeader4">参考文章</h3>
<ul>
<li><a href="http://blog.csdn.net/vbdfforever/article/details/51059440" rel="nofollow noreferrer" target="_blank">jQuery源码解析</a></li>
<li><a href="http://jquery.cuishifeng.cn/jQuery.cssHooks.html" rel="nofollow noreferrer" target="_blank">jQuer中文文档</a></li>
</ul>
<h2 id="articleHeader5">最后</h2>
<p>惯例po<a href="https://github.com/Aaaaaaaty/Blog" rel="nofollow noreferrer" target="_blank">作者的博客</a>，不定时更新中——</p>
<p>有问题欢迎在issues下交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
由一个“bug”到鲜为人知的jQuery.cssHooks

## 原文链接
[https://segmentfault.com/a/1190000013274020](https://segmentfault.com/a/1190000013274020)

