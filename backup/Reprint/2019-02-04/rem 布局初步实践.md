---
title: 'rem 布局初步实践' 
date: 2019-02-04 2:30:58
hidden: true
slug: 53nwvpy18dm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">先说结论</h2>
<p>实用而论，不想了解具体原理的同学只要记住一点即可：在配置好环境的情况下，拿到设计稿并发现需要使用固定宽高比元素的时候，在css中做好px（设计稿中的px）与rem换算就行（即便这个过程也有不少偷懒的办法,减轻工作量）.</p>
<h2 id="articleHeader1">关于rem的基础知识</h2>
<p>这部分比较懒,可以参考</p>
<ol>
<li><p><a href="https://www.zhihu.com/question/21504656" rel="nofollow noreferrer" target="_blank">知乎-css3的字体大小单位rem到底好在哪？</a></p></li>
<li><p><a href="http://ybshare.coding.io/share/flexible.htm" rel="nofollow noreferrer" target="_blank">移动端页面适配方案</a> (主要参考的这个，还看不明白的可以看看)</p></li>
</ol>
<h2 id="articleHeader2">rem解决了什么问题?</h2>
<p>针对文博在线微网站,rem能解决什么问题?他有什么好处呢?</p>
<p>我们是否遇到这样的情况:一个按钮,它的宽度可以做到自适应地随着设备的变化而去响应,但是高度呢?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006839120" src="https://static.alili.tech/img/remote/1460000006839120" alt="按钮高度不可以响应式变化" title="按钮高度不可以响应式变化" style="cursor: pointer;"></span></p>
<p>再比如一个两列的图片列表（<strong>这个图表达的有些问题，还没想好该怎么表达~~</strong>）:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006839121" src="https://static.alili.tech/img/remote/1460000006839121" alt="图片没有响应式的变化" title="图片没有响应式的变化" style="cursor: pointer;"></span></p>
<p>我们发现在没有使用特殊处理的情况下,想要图片按照给定的比例去显示是比较困难的.主要的原因是在<strong>css中height属性是不会轻易按照百分比去计算</strong>.之前项目中的pc站借助了javascript才搞定(当然最后发现没有什么实际的作用).但是在移动端,这个问题变的有意义了.</p>
<p>可能有人对rem兼容性有疑问,请看<a href="http://caniuse.com/#search=rem" rel="nofollow noreferrer" target="_blank">这里</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006839122" src="https://static.alili.tech/img/remote/1460000006839122" alt="图片没有响应式的变化" title="图片没有响应式的变化" style="cursor: pointer;"></span></p>
<p>可以说在手机端使用,应该是没有问题的.淘宝的手机站已经采取了rem的方案.</p>
<h2 id="articleHeader3">rem实战</h2>
<p>下面说说如何在实战中使用rem.首先我们设定,<code>1rem</code>等于当前设备状态下(不论横屏还是竖屏)的宽度的10%.</p>
<h4>设计稿到css</h4>
<p>以640设计稿举例,图中左右两个300px×150px的item</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006839123" src="https://static.alili.tech/img/remote/1460000006839123" alt="640设计稿" title="640设计稿" style="cursor: pointer;"></span></p>
<p>那么我们分成10份后,<code>1rem=64px</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006839124" src="https://static.alili.tech/img/remote/1460000006839124" alt="640设计稿" title="640设计稿" style="cursor: pointer;"></span></p>
<p>如果是原来的写法的话</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rem-block-wrap{
    float:left;
    width: 300px;
    height:150px;
    padding:10px;
    box-sizing: content-box;
}
.rem-block{
    width: 100%;
    height: 100%;
    background: #fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rem-block-wrap</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">150px</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">box-sizing</span>: content-box;
}
<span class="hljs-selector-class">.rem-block</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}</code></pre>
<p>转换成rem写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".rem-block-wrap{
    float:left;
    width: 4.6875rem; /*300px*/
    height:2.34375rem;/*150px*/
    padding:.15625rem;/*10px*/
}
.rem-block{
    width: 100%;
    height: 100%;
    background: #fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.rem-block-wrap</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4.6875rem</span>; <span class="hljs-comment">/*300px*/</span>
    <span class="hljs-attribute">height</span>:<span class="hljs-number">2.34375rem</span>;<span class="hljs-comment">/*150px*/</span>
    <span class="hljs-attribute">padding</span>:.<span class="hljs-number">15625rem</span>;<span class="hljs-comment">/*10px*/</span>
}
<span class="hljs-selector-class">.rem-block</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}</code></pre>
<p>针对字体的话,保留了使用px,因为有的时候我们并不希望字体出现奇怪的值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".example-item:nth-child(2),
.example-item:nth-child(2) button{
  font-size: 12px;
}
[data-dpr=&quot;2&quot;] .example-item:nth-child(2),
[data-dpr=&quot;2&quot;] .example-item:nth-child(2) button
{
  font-size: 24px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.example-item</span><span class="hljs-selector-pseudo">:nth-child(2)</span>,
<span class="hljs-selector-class">.example-item</span><span class="hljs-selector-pseudo">:nth-child(2)</span> <span class="hljs-selector-tag">button</span>{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}
<span class="hljs-selector-attr">[data-dpr="2"]</span> <span class="hljs-selector-class">.example-item</span><span class="hljs-selector-pseudo">:nth-child(2)</span>,
<span class="hljs-selector-attr">[data-dpr="2"]</span> <span class="hljs-selector-class">.example-item</span><span class="hljs-selector-pseudo">:nth-child(2)</span> <span class="hljs-selector-tag">button</span>
{
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
}</code></pre>
<blockquote><p>在dpr等于2,且缩放为0.5的情况下(<code>&lt;meta name="viewport" content="initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no"&gt;</code>),<code>24px</code>其实相当于之前的<code>12px</code>,这么做的目的主要是消除ios系统下的1px偏差,了解具体,请<a href="http://wweggplant.github.io/blog/example/rem.html" rel="nofollow noreferrer" target="_blank">点击这里</a></p></blockquote>
<p>css文件编写完毕后,在实际的html中我们需要计算真实设备中<code>html</code>的<code>font-size</code>的值,关键的代码如下:</p>
<h4>计算font-size和缩放的比例</h4>
<p>这里也是参考了 <a href="http://www.meow.re/demo/screen-adaptation-in-mobileweb/mobile-util.js" rel="nofollow noreferrer" target="_blank">别人的代码</a> :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.mobileUtil = (function(win, doc) {
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) &amp;&amp; !isAndroid, // 据说某些国产机的UA会同时包含 android iphone 字符
        isMobile = isAndroid || isIos;  // 粗略的判断

    return {
        isAndroid: isAndroid,
        isIos: isIos,
        isMobile: isMobile,

        isNewsApp: /NewsApp\/[\d\.]+/gi.test(UA),
        isWeixin: /MicroMessenger/gi.test(UA),
        isQQ: /QQ\/\d/gi.test(UA),
        isYixin: /YiXin/gi.test(UA),
        isWeibo: /Weibo/gi.test(UA),
        isTXWeibo: /T(?:X|encent)MicroBlog/gi.test(UA),

        tapEvent: isMobile ? 'tap' : 'click',

        /**
         * 缩放页面
         */
        fixScreen: function() {
            var metaEl = doc.querySelector('meta[name=&quot;viewport&quot;]'),
                metaCtt = metaEl ? metaEl.content : '',
                matchScale = metaCtt.match(/initial\-scale=([\d\.]+)/),
                matchWidth = metaCtt.match(/width=([^,\s]+)/);

            if ( !metaEl ) { // REM
                var docEl = doc.documentElement,
                    maxwidth = docEl.dataset.mw || 750, // 每 dpr 最大页面宽度
                    dpr = isIos ? Math.min(win.devicePixelRatio, 3) : 1,
                    scale = 1/dpr,
                    tid;

                docEl.removeAttribute('data-mw');
                docEl.dataset.dpr = dpr;
                metaEl = doc.createElement('meta');
                metaEl.name = 'viewport';
                metaEl.content = fillScale(scale);
                docEl.firstElementChild.appendChild(metaEl);

                var refreshRem = function() {
                    var width = docEl.getBoundingClientRect().width;
                    if (width / dpr > maxwidth) {
                        width = maxwidth * dpr;
                    }
                    var rem = width / 10;
                    docEl.style.fontSize = rem + 'px';
                };

                win.addEventListener('resize', function() {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 300);
                }, false);
                win.addEventListener('pageshow', function(e) {
                    if (e.persisted) {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, 300);
                    }
                }, false);

                refreshRem();
            } else if ( isMobile &amp;&amp; !matchScale &amp;&amp; ( matchWidth &amp;&amp; matchWidth[1] != 'device-width' ) ) { // 定宽
                var width = parseInt(matchWidth[1]),
                    iw = win.innerWidth || width,
                    ow = win.outerWidth || iw,
                    sw = win.screen.width || iw,
                    saw = win.screen.availWidth || iw,
                    ih = win.innerHeight || width,
                    oh = win.outerHeight || ih,
                    ish = win.screen.height || ih,
                    sah = win.screen.availHeight || ih,
                    w = Math.min(iw,ow,sw,saw,ih,oh,ish,sah),
                    scale = w / width;

                if ( scale < 1 ) {
                    metaEl.content = metaCtt + ',' + fillScale(scale);
                }
            }

            function fillScale(scale) {
                return 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';
            }


            if (!isMobile) {
                alert(&quot;请在现代浏览器(chrome,火狐)的开发者模式下,模拟移动端设计查看&quot;);
            }
        },

        /**
         * 转href参数成键值对
         * @param href {string} 指定的href，默认为当前页href
         * @returns {object} 键值对
         */
        getSearch: function(href) {
            href = href || win.location.search;
            var data = {},reg = new RegExp( &quot;([^?=&amp;]+)(=([^&amp;]*))?&quot;, &quot;g&quot; );
            href &amp;&amp; href.replace(reg,function( $0, $1, $2, $3 ){
                data[ $1 ] = $3;
            });
            return data;
        }
    };
})(window, document);
// 默认直接适配页面
mobileUtil.fixScreen();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.mobileUtil = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">win, doc</span>) </span>{
    <span class="hljs-keyword">var</span> UA = navigator.userAgent,
        isAndroid = <span class="hljs-regexp">/android|adr/gi</span>.test(UA),
        isIos = <span class="hljs-regexp">/iphone|ipod|ipad/gi</span>.test(UA) &amp;&amp; !isAndroid, <span class="hljs-comment">// 据说某些国产机的UA会同时包含 android iphone 字符</span>
        isMobile = isAndroid || isIos;  <span class="hljs-comment">// 粗略的判断</span>

    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">isAndroid</span>: isAndroid,
        <span class="hljs-attr">isIos</span>: isIos,
        <span class="hljs-attr">isMobile</span>: isMobile,

        <span class="hljs-attr">isNewsApp</span>: <span class="hljs-regexp">/NewsApp\/[\d\.]+/gi</span>.test(UA),
        <span class="hljs-attr">isWeixin</span>: <span class="hljs-regexp">/MicroMessenger/gi</span>.test(UA),
        <span class="hljs-attr">isQQ</span>: <span class="hljs-regexp">/QQ\/\d/gi</span>.test(UA),
        <span class="hljs-attr">isYixin</span>: <span class="hljs-regexp">/YiXin/gi</span>.test(UA),
        <span class="hljs-attr">isWeibo</span>: <span class="hljs-regexp">/Weibo/gi</span>.test(UA),
        <span class="hljs-attr">isTXWeibo</span>: <span class="hljs-regexp">/T(?:X|encent)MicroBlog/gi</span>.test(UA),

        <span class="hljs-attr">tapEvent</span>: isMobile ? <span class="hljs-string">'tap'</span> : <span class="hljs-string">'click'</span>,

        <span class="hljs-comment">/**
         * 缩放页面
         */</span>
        fixScreen: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> metaEl = doc.querySelector(<span class="hljs-string">'meta[name="viewport"]'</span>),
                metaCtt = metaEl ? metaEl.content : <span class="hljs-string">''</span>,
                matchScale = metaCtt.match(<span class="hljs-regexp">/initial\-scale=([\d\.]+)/</span>),
                matchWidth = metaCtt.match(<span class="hljs-regexp">/width=([^,\s]+)/</span>);

            <span class="hljs-keyword">if</span> ( !metaEl ) { <span class="hljs-comment">// REM</span>
                <span class="hljs-keyword">var</span> docEl = doc.documentElement,
                    maxwidth = docEl.dataset.mw || <span class="hljs-number">750</span>, <span class="hljs-comment">// 每 dpr 最大页面宽度</span>
                    dpr = isIos ? <span class="hljs-built_in">Math</span>.min(win.devicePixelRatio, <span class="hljs-number">3</span>) : <span class="hljs-number">1</span>,
                    scale = <span class="hljs-number">1</span>/dpr,
                    tid;

                docEl.removeAttribute(<span class="hljs-string">'data-mw'</span>);
                docEl.dataset.dpr = dpr;
                metaEl = doc.createElement(<span class="hljs-string">'meta'</span>);
                metaEl.name = <span class="hljs-string">'viewport'</span>;
                metaEl.content = fillScale(scale);
                docEl.firstElementChild.appendChild(metaEl);

                <span class="hljs-keyword">var</span> refreshRem = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">var</span> width = docEl.getBoundingClientRect().width;
                    <span class="hljs-keyword">if</span> (width / dpr &gt; maxwidth) {
                        width = maxwidth * dpr;
                    }
                    <span class="hljs-keyword">var</span> rem = width / <span class="hljs-number">10</span>;
                    docEl.style.fontSize = rem + <span class="hljs-string">'px'</span>;
                };

                win.addEventListener(<span class="hljs-string">'resize'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, <span class="hljs-number">300</span>);
                }, <span class="hljs-literal">false</span>);
                win.addEventListener(<span class="hljs-string">'pageshow'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                    <span class="hljs-keyword">if</span> (e.persisted) {
                        clearTimeout(tid);
                        tid = setTimeout(refreshRem, <span class="hljs-number">300</span>);
                    }
                }, <span class="hljs-literal">false</span>);

                refreshRem();
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( isMobile &amp;&amp; !matchScale &amp;&amp; ( matchWidth &amp;&amp; matchWidth[<span class="hljs-number">1</span>] != <span class="hljs-string">'device-width'</span> ) ) { <span class="hljs-comment">// 定宽</span>
                <span class="hljs-keyword">var</span> width = <span class="hljs-built_in">parseInt</span>(matchWidth[<span class="hljs-number">1</span>]),
                    iw = win.innerWidth || width,
                    ow = win.outerWidth || iw,
                    sw = win.screen.width || iw,
                    saw = win.screen.availWidth || iw,
                    ih = win.innerHeight || width,
                    oh = win.outerHeight || ih,
                    ish = win.screen.height || ih,
                    sah = win.screen.availHeight || ih,
                    w = <span class="hljs-built_in">Math</span>.min(iw,ow,sw,saw,ih,oh,ish,sah),
                    scale = w / width;

                <span class="hljs-keyword">if</span> ( scale &lt; <span class="hljs-number">1</span> ) {
                    metaEl.content = metaCtt + <span class="hljs-string">','</span> + fillScale(scale);
                }
            }

            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fillScale</span>(<span class="hljs-params">scale</span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-string">'initial-scale='</span> + scale + <span class="hljs-string">',maximum-scale='</span> + scale + <span class="hljs-string">',minimum-scale='</span> + scale + <span class="hljs-string">',user-scalable=no'</span>;
            }


            <span class="hljs-keyword">if</span> (!isMobile) {
                alert(<span class="hljs-string">"请在现代浏览器(chrome,火狐)的开发者模式下,模拟移动端设计查看"</span>);
            }
        },

        <span class="hljs-comment">/**
         * 转href参数成键值对
         * @param href {string} 指定的href，默认为当前页href
         * @returns {object} 键值对
         */</span>
        getSearch: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">href</span>) </span>{
            href = href || win.location.search;
            <span class="hljs-keyword">var</span> data = {},reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>( <span class="hljs-string">"([^?=&amp;]+)(=([^&amp;]*))?"</span>, <span class="hljs-string">"g"</span> );
            href &amp;&amp; href.replace(reg,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> $<span class="hljs-number">0</span>, $<span class="hljs-number">1</span>, $<span class="hljs-number">2</span>, $<span class="hljs-number">3</span> </span>)</span>{
                data[ $<span class="hljs-number">1</span> ] = $<span class="hljs-number">3</span>;
            });
            <span class="hljs-keyword">return</span> data;
        }
    };
})(<span class="hljs-built_in">window</span>, <span class="hljs-built_in">document</span>);
<span class="hljs-comment">// 默认直接适配页面</span>
mobileUtil.fixScreen();</code></pre>
<p>这段代码主要有两个作用:</p>
<ol>
<li><p>计算出适应宽度的<code>meta</code>标签的内容,<code>&lt;meta name="viewport" content="initial-scale=x,maximum-scale=x,minimum-scale=x,user-scalable=no"&gt;</code></p></li>
<li><p>计算html节点的<code>font-size</code></p></li>
</ol>
<p>效果如下图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006839125" src="https://static.alili.tech/img/remote/1460000006839125" alt="javascript计算" title="javascript计算" style="cursor: pointer;"></span></p>
<p>具体请点击<a href="http://wweggplant.github.io/blog/example/rem.html" rel="nofollow noreferrer" target="_blank">demo</a></p>
<h4>px转rem</h4>
<p>到这里就会有一个问题,那就是px转到rem需要过程,这个工作想想就头大,不过这里我提供了几种方式减轻这个工作.</p>
<p>1.Sublime Text 2/3</p>
<p>效果如下图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006839126" src="https://static.alili.tech/img/remote/1460000006839126" alt="px2rem" title="px2rem" style="cursor: pointer;"></span></p>
<p>具体情况请<a href="http://www.07net01.com/2015/08/900796.html" rel="nofollow noreferrer" target="_blank">点击</a></p>
<p>2.gulp插件</p>
<p>使用<code>postcss</code>中的<code>postcss-px2rem</code>插件,具体情况请<a href="http://www.jianshu.com/p/b130293511af" rel="nofollow noreferrer" target="_blank">点击</a></p>
<blockquote><p>phpStorm中也可以整合gulp</p></blockquote>
<h2 id="articleHeader4">什么情况下使用rem?</h2>
<ol>
<li><p>整体的布局还是使用百分比</p></li>
<li><p>使用rem的最佳场景是,遇到例如多列带有图片的列表,常常需要图片固定宽高比例</p></li>
<li><p>字体一般情况建议使用px</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
rem 布局初步实践

## 原文链接
[https://segmentfault.com/a/1190000006839117](https://segmentfault.com/a/1190000006839117)

