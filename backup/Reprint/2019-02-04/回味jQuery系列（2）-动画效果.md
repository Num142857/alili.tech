---
title: '回味jQuery系列（2）-动画效果' 
date: 2019-02-04 2:30:58
hidden: true
slug: lzg0z89lp8b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">jQuery-动画效果浅析</h2>
<p>动画可以给网站的用户体验加分，让网页更加活泼。不过，什么东西都需要适量，简易快捷的动画会给网站加分不少。比如购物网站的个人中心按钮hover效果啊，各种hover产生的动画等。不过，现在CSS3的新特性可以模拟很多动画，可以多用CSS3去实现一些动画效果了。比如box-shadow，text-shaow，animation，transform等。jquery作为全明星级别插件，是有很强的动画功能的。</p>
<h3 id="articleHeader1">全局属性</h3>
<p>jQuery在动画中提供了两个全局属性（不常在代码中使用），分别为：<br>$.fx.interval，设置每秒运行的帧数，默认13ms，越小越流畅，但太小耗费浏览器性能<br>$.fx.off，关闭页面上所有的动画，浏览器不支持动画时可以全部关掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fx.interval = 100; //默认为13
$.fx.off = true; //默认false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$.</span>fx.interval = <span class="hljs-number">100</span>; <span class="hljs-regexp">//</span>默认为<span class="hljs-number">13</span>
<span class="hljs-variable">$.</span>fx.off = <span class="hljs-keyword">true</span>; <span class="hljs-regexp">//</span>默认<span class="hljs-keyword">false</span></code></pre>
<p>那么，我们看看jquery都提供了哪些动画方法。</p>
<h3 id="articleHeader2">显示&amp;&amp;隐藏</h3>
<p>jQuery 中显示方法为：.show(speed,callback)，隐藏方法为：.hide(speed,callback)。在无参数的时候，只是硬性的显示内容和隐藏内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.show').click(function () { 
    $('.xzavier').show();
});
$('.hide').click(function () { 
    $('.xzavier').hide();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.show'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    $(<span class="hljs-string">'.xzavier'</span>).show();
});
$(<span class="hljs-string">'.hide'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    $(<span class="hljs-string">'.xzavier'</span>).hide();
});</code></pre>
<p>两个可选参数。参数speed，毫秒，表示运动所花时间，用速度来说更切合动画一词。可以是number，也可以是这个三个参数字符串：slow、normal 和fast，分别对应600ms、400 ms和200ms。如果传参错误或者不传，默认normal，即400ms。参数callback代表回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.show').click(function () {
    $('.xzavier').show('fast'); 
});
$('.show').click(function () {
    $('.xzavier').show('');   //normal
});

$('.show').click(function () {
    $('.xzavier').show('fast', function () {
        console.log('animation is over');  //其他可执行代码
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.show'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).show(<span class="hljs-string">'fast'</span>); 
});
$(<span class="hljs-string">'.show'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).show(<span class="hljs-string">''</span>);   <span class="hljs-comment">//normal</span>
});

$(<span class="hljs-string">'.show'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).show(<span class="hljs-string">'fast'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'animation is over'</span>);  <span class="hljs-comment">//其他可执行代码</span>
    });
});</code></pre>
<p>原理上，.hide(speed,callback)方法其实就是在行内设置CSS 代码：display:none; 而.show(speed,callback)方法要根据原来元素是区块还是内联来决定，如果是区块，则设置CSS 代码：display:block; 如果是内联，则设置CSS 代码：display:inline。</p>
<p>.show()和.hide()的在同一元素的时候，需要一个按钮切换操作，或者需要进行一些条件判<br>断。而jQuery 提供给我们一个类似功能的独立方法：.toggle(speed,callback)，自动切换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.toggle').click(function () {
    $(this).toggle('fast');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.toggle'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).toggle(<span class="hljs-string">'fast'</span>);
});</code></pre>
<h3 id="articleHeader3">收缩&amp;&amp;展开</h3>
<p>jQuery 提供了一组改变元素高度的方法：.slideUp(speed,callback)，向上收缩、.slideDown(speed,callback)，向下展开和.slideToggle(speed,callback)，自动切换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.slidedown').click(function () {
    $('.xzavier').slideDown('slow');
});
$('.slideup').click(function () {
    $('.xzavier').slideUp();
});
$('.slidetoggle').click(function () {
    $('.xzavier').slideToggle('fast');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.slidedown'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).slideDown(<span class="hljs-string">'slow'</span>);
});
$(<span class="hljs-string">'.slideup'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).slideUp();
});
$(<span class="hljs-string">'.slidetoggle'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).slideToggle(<span class="hljs-string">'fast'</span>);
});
</code></pre>
<h3 id="articleHeader4">淡入&amp;&amp;淡出</h3>
<p>jQuery 提供了一组专门用于透明度变化的方法：.fadeIn(speed,callback)，淡入、.fadeOut(speed,callback)，淡出、.fadeToggle(speed,callback)，自动切换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.fadein').click(function () {
    $('.xzavier').fadeIn('slow');
});
$('.fadeout').click(function () {
    $('.xzavier').fadeOut();
});
$('.fadetoggle').click(function () {
    $('.xzavier').fadeToggle('fast');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.fadein'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).fadeIn(<span class="hljs-string">'slow'</span>);
});
$(<span class="hljs-string">'.fadeout'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).fadeOut();
});
$(<span class="hljs-string">'.fadetoggle'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).fadeToggle(<span class="hljs-string">'fast'</span>);
});</code></pre>
<p>这三个方法只能透明度变化只能从0 到100，或者从100 到0。不能自己设定变化到一个值。不过，jQuery提供了.fadeTo(speed,opacity，callback)方法解决了这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.fadeto').click(function () {
    $('.xzavier').fadeTo('1000', 0.4); //0.4代表上面方法的30
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.fadeto'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).fadeTo(<span class="hljs-string">'1000'</span>, <span class="hljs-number">0.4</span>); <span class="hljs-comment">//0.4代表上面方法的30</span>
});</code></pre>
<p>如果本身透明度大于指定值，会淡出，否则相反。</p>
<h3 id="articleHeader5">自定义动画</h3>
<p>jQuery提供了几种简单常用的固定动画方法供开发使用。随着业务逻辑的复杂，这些简单动画无法满足我们更加复杂的需求。这时，开发可以使用jQuery提供了一个.animate(params,speed,easing,callback);方法来创建我效果更为复杂的自定义动画。<br>参数为：CSS变化样式的对象（必传），速度（可选），回调函数（可选）。easing后面解释。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".xzavier {width:200px;height:100px;opacity:1;}
$('.animate').click(function () {
    $('.xzavier').animate({
        'width' : '800px',
        'height' : '400px',
        'opacity' : 0.3
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>.xzavier {<span class="hljs-attr">width</span>:<span class="hljs-number">200</span>px;height:<span class="hljs-number">100</span>px;opacity:<span class="hljs-number">1</span>;}
$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).animate({
        <span class="hljs-string">'width'</span> : <span class="hljs-string">'800px'</span>,
        <span class="hljs-string">'height'</span> : <span class="hljs-string">'400px'</span>,
        <span class="hljs-string">'opacity'</span> : <span class="hljs-number">0.3</span>
    });
});</code></pre>
<p>class为xzavier的盒子多重动画同步运动。变宽，变长，变淡。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.animate').click(function () {
    $('.xzavier').animate({
        'top' : '400px', 
        'left' : '200px'
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).animate({
        <span class="hljs-string">'top'</span> : <span class="hljs-string">'400px'</span>, 
        <span class="hljs-string">'left'</span> : <span class="hljs-string">'200px'</span>
    });
});
</code></pre>
<p>如果元素位置需要运动变化，需要设置元素的position为absolute。</p>
<p>jQuery还提供了自定义动画的累加、累减功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.animate').click(function () {
    $('.xzavier').animate({
        'top' : '+=100px',
        'left' : '+=100px'
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).animate({
        <span class="hljs-string">'top'</span> : <span class="hljs-string">'+=100px'</span>,
        <span class="hljs-string">'left'</span> : <span class="hljs-string">'+=100px'</span>
    });
});</code></pre>
<p>包括jquery固定的几个动画在内，都有可选参数easing，即运动方式，seasing有两个值：swing(缓动)、linear(匀速)，默认为swing。不过这个参数很少用到O(∩_∩)O~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.animate').click(function () {
    $('.xzaiver').animate({
        left : '800px'
    }, 'slow', 'swing');
    $('.xzavier').animate({
        top : '40px'
    }, 'fast', 'linear');
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzaiver'</span>).animate({
        <span class="hljs-attr">left</span> : <span class="hljs-string">'800px'</span>
    }, <span class="hljs-string">'slow'</span>, <span class="hljs-string">'swing'</span>);
    $(<span class="hljs-string">'.xzavier'</span>).animate({
        <span class="hljs-attr">top</span> : <span class="hljs-string">'40px'</span>
    }, <span class="hljs-string">'fast'</span>, <span class="hljs-string">'linear'</span>);
});
</code></pre>
<h3 id="articleHeader6">列队动画</h3>
<p>自定义实现列队动画的方式，有3种：<br>1.在回调函数中再执行一个动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.animate').click(function () {
    $('.xzavier').animate({
        'left' : '800px'
    }, function () {
        $('.xzavier').animate({
            'top' : '400px'
        }, function () {
            $('.xzavier').animate({
                'opacity' : 0.3
            });
        });
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).animate({
        <span class="hljs-string">'left'</span> : <span class="hljs-string">'800px'</span>
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'.xzavier'</span>).animate({
            <span class="hljs-string">'top'</span> : <span class="hljs-string">'400px'</span>
        }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'.xzavier'</span>).animate({
                <span class="hljs-string">'opacity'</span> : <span class="hljs-number">0.3</span>
            });
        });
    });
});
</code></pre>
<p>2.通过连缀来实现列队动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.animate').click(function () {
    $('.xzavier').animate({
        'left' : '800px'
    }).animate({
        'top' : '400px'
    }).animate({
        'opacity' : 0.3
    });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).animate({
        <span class="hljs-string">'left'</span> : <span class="hljs-string">'800px'</span>
    }).animate({
        <span class="hljs-string">'top'</span> : <span class="hljs-string">'400px'</span>
    }).animate({
        <span class="hljs-string">'opacity'</span> : <span class="hljs-number">0.3</span>
    });
});
</code></pre>
<p>3.通过顺序来实现列队动画（需要时同一元素动画，否则，就是同步动画）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.animate').click(function () {
    $('.xzavier').animate({'left' : '100px'});
    $('.xzavier').animate({'top' : '100px'});
    $('.xzavier').animate({'opacity' : 0.3});
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).animate({<span class="hljs-string">'left'</span> : <span class="hljs-string">'100px'</span>});
    $(<span class="hljs-string">'.xzavier'</span>).animate({<span class="hljs-string">'top'</span> : <span class="hljs-string">'100px'</span>});
    $(<span class="hljs-string">'.xzavier'</span>).animate({<span class="hljs-string">'opacity'</span> : <span class="hljs-number">0.3</span>});
});</code></pre>
<p>这样来看，我们更倾向于后面两种写法，因为嵌套多了就出现了"}}""}}""}}""}}""}}"</p>
<h3 id="articleHeader7">连缀非动画方法</h3>
<p>先看个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//连缀
$('.xzavier').slideUp().slideDown().css('background', '#ccc');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//连缀</span>
$(<span class="hljs-string">'.xzavier'</span>).slideUp().slideDown().css(<span class="hljs-string">'background'</span>, <span class="hljs-string">'#ccc'</span>);</code></pre>
<p>这里面css方法并不是动画方法，不会排在列队之后执行，但是，我们又需要它在前面动画执行之后再执行。这是，肯定会想到采用回调函数来解决。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.xzavier').slideUp().slideDown(function () {
    $(this).css('background', '#ccc');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.xzavier'</span>).slideUp().slideDown(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">'background'</span>, <span class="hljs-string">'#ccc'</span>);
});</code></pre>
<p>确实可以解决问题，但是当列队动画变多时，回调函数"}}""}}""}}""}}""}}"的可读性大大降低确实一个非常烦人的问题。jQuery 提供了一个类似于回调函数的方法：.queue()。.queue()方法将css方法跟随动画方法之后。如果还需继续调用动画方法，使用.dequeue()方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.xzavier').slideUp();
$('.xzavier').slideDown();
$('.xzavier').queue(function () {
    $(this).css('background', '#ccc');
    $(this).dequeue();
})
$('.xzavier').hide('slow');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.xzavier'</span>).slideUp();
$(<span class="hljs-string">'.xzavier'</span>).slideDown();
$(<span class="hljs-string">'.xzavier'</span>).queue(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).css(<span class="hljs-string">'background'</span>, <span class="hljs-string">'#ccc'</span>);
    $(<span class="hljs-keyword">this</span>).dequeue();
})
$(<span class="hljs-string">'.xzavier'</span>).hide(<span class="hljs-string">'slow'</span>);</code></pre>
<h3 id="articleHeader8">停止动画&amp;&amp;延迟动画</h3>
<p>停止正在运行中的动画：.stop()方法。可选参数：clearQueue, gotoEnd。clearQueue 传递一个布尔值，代表是否清空未执行完的动画列队，gotoEnd 代表是否直接将正在执行的动画跳转到末状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.stop').click(function () {
    $('.xzavier').stop(true ,true);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.stop'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).stop(<span class="hljs-literal">true</span> ,<span class="hljs-literal">true</span>);
});</code></pre>
<p>延迟执行动画：.delay()方法。可以在动画之前设置延迟，也可以在列队动画设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.animate').click(function () {
    $('.xzavier').delay(1000).animate({
        'opacity' : 0.3
    }, 1000);
    $('.xzavier').delay(1000).animate({
        'width' : '800px'
    }, 1000);
    $('.xzavier').animate({
        'height' : '400px'
    }, 1000);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-string">'.animate'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.xzavier'</span>).delay(<span class="hljs-number">1000</span>).animate({
        <span class="hljs-string">'opacity'</span> : <span class="hljs-number">0.3</span>
    }, <span class="hljs-number">1000</span>);
    $(<span class="hljs-string">'.xzavier'</span>).delay(<span class="hljs-number">1000</span>).animate({
        <span class="hljs-string">'width'</span> : <span class="hljs-string">'800px'</span>
    }, <span class="hljs-number">1000</span>);
    $(<span class="hljs-string">'.xzavier'</span>).animate({
        <span class="hljs-string">'height'</span> : <span class="hljs-string">'400px'</span>
    }, <span class="hljs-number">1000</span>);
});
</code></pre>
<p>周末好天气，打篮球去咯。代码，篮球，生活...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
回味jQuery系列（2）-动画效果

## 原文链接
[https://segmentfault.com/a/1190000006740827](https://segmentfault.com/a/1190000006740827)

