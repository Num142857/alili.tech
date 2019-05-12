---
title: '移动web 1像素边框 瞧瞧大公司是怎么做的' 
date: 2019-01-31 2:31:16
hidden: true
slug: rcthy000sg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>移动端web项目越来越多，要求也越来越高，好多设计师都发现了，你们前端实现的边线为什么是糊的，根本不是1像素，好吧，我只能找参考，要么征服设计，要么征服自己。</p>
<blockquote><p>关于为什么设置的是1px，而显示出来却不是呢，这里我就不多做介绍了；<br>放出几个链接， <a href="http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/" rel="nofollow noreferrer" target="_blank">设备像素比devicePixelRatio简单介绍</a>，还有  <a href="http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041" rel="nofollow noreferrer" target="_blank">移动端高清、多屏适配方案</a> 以及 <a href="http://wileam.com/iphone-6-screen-cn/" rel="nofollow noreferrer" target="_blank">iPhone 6 屏幕揭秘</a>，相信大家看完这几个自己也就能想出解决的办法了。</p></blockquote>
<hr>
<h3 id="articleHeader1">哪些项目实现了</h3>
<blockquote><p>一般遇到问题，都是找一下成熟项目他们公司的代码看看，自己也翻看了好多关于移动端的知识点，特别推荐博客<a href="http://peunzhang.cnblogs.com/" rel="nofollow noreferrer" target="_blank">白色橡树</a>和<a href="https://github.com/AlloyTeam/Mars" rel="nofollow noreferrer" target="_blank">腾讯移动知识库</a>，有很多移动相关的知识，那我们先来找几个参考看看吧。</p></blockquote>
<p><strong>京东 首页边线几乎都为1像素边框</strong><br><span class="img-wrap"><img data-src="/img/bVF1k1?w=856&amp;h=1522" src="https://static.alili.tech/img/bVF1k1?w=856&amp;h=1522" alt="京东" title="京东" style="cursor: pointer; display: inline;"></span></p>
<p><strong>携程 </strong><br><span class="img-wrap"><img data-src="/img/bVF1lz?w=856&amp;h=1522" src="https://static.alili.tech/img/bVF1lz?w=856&amp;h=1522" alt="携程" title="携程" style="cursor: pointer; display: inline;"></span></p>
<p>大众点评<br><span class="img-wrap"><img data-src="/img/bVF1lX?w=856&amp;h=1522" src="https://static.alili.tech/img/bVF1lX?w=856&amp;h=1522" alt="大众点评" title="大众点评" style="cursor: pointer; display: inline;"></span></p>
<p><strong>糯米团</strong><br><span class="img-wrap"><img data-src="/img/bVF1mb?w=856&amp;h=1522" src="https://static.alili.tech/img/bVF1mb?w=856&amp;h=1522" alt="糯米团" title="糯米团" style="cursor: pointer; display: inline;"></span></p>
<p>翻看几个项目中发现，并不是所有的边线都是1像素，但是这些足够我们来参考了，如果电脑上的截图区分不出来，我们可以在自己的手机上查看对比一下，应该跟自己浏览器里导航栏或者工具条的1像素是一样的，而会出现模糊不清晰的状况。</p>
<h2 id="articleHeader2">实现方法</h2>
<h3 id="articleHeader3">border-image 图片 实现</h3>
<p>这篇文章是腾讯github上的解决方案<code>border-image</code>来实现的 链接走起 <a href="https://github.com/AlloyTeam/Mars/blob/master/solutions/border-1px.md" rel="nofollow noreferrer" target="_blank">《使用border-image实现类似iOS7的1px底边》</a>，缺点是，你需要制作图片，圆角的时候会出现模糊。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border-image-1px {
    border-width: 1px 0px;
    -webkit-border-image: url(&quot;data:image/png;base64,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&quot;) 2 0 stretch;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>.border-image<span class="hljs-string">-1</span>px {
    border-width: 1px 0px;
    -webkit-border-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAABP2FU6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167<span class="hljs-string">+3</span>t<span class="hljs-string">+9</span>f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC<span class="hljs-string">+0</span>lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB<span class="hljs-string">+7</span>gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q<span class="hljs-string">+0</span>hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq<span class="hljs-string">+2</span>mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o<span class="hljs-string">+02</span>PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r<span class="hljs-string">+00</span>umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle<span class="hljs-string">+70</span>eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN<span class="hljs-string">+1</span>n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ<span class="hljs-string">+2</span>e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e<span class="hljs-string">+2</span>Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX<span class="hljs-string">+39</span>QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y<span class="hljs-string">+1</span>XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y<span class="hljs-string">+2</span>v3qB/oP6n<span class="hljs-string">+0</span>/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO<span class="hljs-string">+638</span>e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAcSURBVHjaBMEBDQAADMMgckv1r20H1WxzoNoPAER9BjAKc4kUAAAAAElFTkSuQmCC") 2 0 stretch;
}</code></pre>
<h3 id="articleHeader4">background-image 渐变实现</h3>
<p>除啦用图片，难道纯粹的css就不能实现吗？我的确不想使用图片，感觉制作起来很麻烦，其实<code>百度糯米团首页就是这么做的</code>但是这种方法有个缺点，就是不能实现圆角</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".border {
      background-image:linear-gradient(180deg, red, red 50%, transparent 50%),
      linear-gradient(270deg, red, red 50%, transparent 50%),
      linear-gradient(0deg, red, red 50%, transparent 50%),
      linear-gradient(90deg, red, red 50%, transparent 50%);
      background-size: 100% 1px,1px 100% ,100% 1px, 1px 100%;
      background-repeat: no-repeat;
      background-position: top, right top,  bottom, left top;
      padding: 10px;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.border</span> {
      <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">linear-gradient</span>(180deg, red, red 50%, transparent 50%),
      <span class="hljs-built_in">linear-gradient</span>(270deg, red, red 50%, transparent 50%),
      <span class="hljs-built_in">linear-gradient</span>(0deg, red, red 50%, transparent 50%),
      <span class="hljs-built_in">linear-gradient</span>(90deg, red, red 50%, transparent 50%);
      <span class="hljs-attribute">background-size</span>: <span class="hljs-number">100%</span> <span class="hljs-number">1px</span>,<span class="hljs-number">1px</span> <span class="hljs-number">100%</span> ,<span class="hljs-number">100%</span> <span class="hljs-number">1px</span>, <span class="hljs-number">1px</span> <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">background-repeat</span>: no-repeat;
      <span class="hljs-attribute">background-position</span>: top, right top,  bottom, left top;
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
  }</code></pre>
<h3 id="articleHeader5">viewport+rem实现</h3>
<p>这篇文章的解决方案是使用<code>viewport</code>+<code>rem</code>+<code>js</code>来实现的 链接走起 <a href="http://blog.csdn.net/bbnbf/article/details/51580569" rel="nofollow noreferrer" target="_blank">《移动端1像素边框问题的解决方案》</a>，里边还引入了张鑫旭大神的文章 <a href="http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/" rel="nofollow noreferrer" target="_blank">《设备像素比devicePixelRatio简单介绍》</a>，优点是可以直接设置1px就行了，剩下的就交给js了，而且圆角什么的都没问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span style=&quot;font-size:18px;&quot;><html>  
  
    <head>  
        <title>1px question</title>  
        <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html;charset=UTF-8&quot;>  
        <meta name=&quot;viewport&quot; id=&quot;WebViewport&quot; content=&quot;initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no&quot;>       
        <style>  
            html {  
                font-size: 1px;  
            }             
            * {  
                padding: 0;  
                margin: 0;  
            }  
              
            .bds_b {  
                border-bottom: 1px solid #ccc;  
            }  
              
            .a,  
            .b {  
                margin-top: 1rem;  
                padding: 1rem;                
                font-size: 1.4rem;  
            }  
              
            .a {  
                width: 30rem;  
            }  
              
            .b {  
                background: #f5f5f5;  
                width: 20rem;  
            }  
        </style>  
        <script>  
          
            var viewport = document.querySelector(&quot;meta[name=viewport]&quot;);  
            //下面是根据设备像素设置viewport  
            if (window.devicePixelRatio == 1) {  
                viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');  
            }  
            if (window.devicePixelRatio == 2) {  
                viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');  
            }  
            if (window.devicePixelRatio == 3) {  
                viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');  
            }  
            var docEl = document.documentElement;  
            var fontsize = 10 * (docEl.clientWidth / 320) + 'px';  
            docEl.style.fontSize = fontsize;  
              
        </script>  
    </head>  
  
    <body>  
        <div class=&quot;bds_b a&quot;>下面的底边宽度是虚拟1像素的</div>  
        <div class=&quot;b&quot;>上面的边框宽度是虚拟1像素的</div>  
    </body>  
  
</html></span>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"font-size:18px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>  
  
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>1px question<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html;charset=UTF-8"</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"WebViewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"</span>&gt;</span>       
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">  
            <span class="hljs-selector-tag">html</span> {  
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1px</span>;  
            }             
            * {  
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;  
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;  
            }  
              
            <span class="hljs-selector-class">.bds_b</span> {  
                <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;  
            }  
              
            <span class="hljs-selector-class">.a</span>,  
            <span class="hljs-selector-class">.b</span> {  
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1rem</span>;  
                <span class="hljs-attribute">padding</span>: <span class="hljs-number">1rem</span>;                
                <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.4rem</span>;  
            }  
              
            <span class="hljs-selector-class">.a</span> {  
                <span class="hljs-attribute">width</span>: <span class="hljs-number">30rem</span>;  
            }  
              
            <span class="hljs-selector-class">.b</span> {  
                <span class="hljs-attribute">background</span>: <span class="hljs-number">#f5f5f5</span>;  
                <span class="hljs-attribute">width</span>: <span class="hljs-number">20rem</span>;  
            }  
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">  
          
            <span class="hljs-keyword">var</span> viewport = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"meta[name=viewport]"</span>);  
            <span class="hljs-comment">//下面是根据设备像素设置viewport  </span>
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.devicePixelRatio == <span class="hljs-number">1</span>) {  
                viewport.setAttribute(<span class="hljs-string">'content'</span>, <span class="hljs-string">'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'</span>);  
            }  
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.devicePixelRatio == <span class="hljs-number">2</span>) {  
                viewport.setAttribute(<span class="hljs-string">'content'</span>, <span class="hljs-string">'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no'</span>);  
            }  
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.devicePixelRatio == <span class="hljs-number">3</span>) {  
                viewport.setAttribute(<span class="hljs-string">'content'</span>, <span class="hljs-string">'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no'</span>);  
            }  
            <span class="hljs-keyword">var</span> docEl = <span class="hljs-built_in">document</span>.documentElement;  
            <span class="hljs-keyword">var</span> fontsize = <span class="hljs-number">10</span> * (docEl.clientWidth / <span class="hljs-number">320</span>) + <span class="hljs-string">'px'</span>;  
            docEl.style.fontSize = fontsize;  
              
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>  
  
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bds_b a"</span>&gt;</span>下面的底边宽度是虚拟1像素的<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"b"</span>&gt;</span>上面的边框宽度是虚拟1像素的<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>  
  
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>  </code></pre>
<h3 id="articleHeader6">box-shadow 实现</h3>
<p>利用阴影我们也可以实现，那么我们来看看阴影，优点是圆角不是问题，缺点是颜色不好控制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
    -webkit-box-shadow:0 1px 1px -1px rgba(0, 0, 0, 0.5);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">-webkit-box-shadow</span>:<span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> -<span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
}</code></pre>
<h3 id="articleHeader7">transform: scale(0.5) 实现 <code>推荐相当灵活</code>
</h3>
<p>其实我们刚才列举了那么多例子，无非就是把1px缩放都0.5px的状态下，而0.5px并不是所有都支持，再根据媒体查询设置不同的缩放比例就可以了，那么我们就开始玩儿缩放吧。</p>
<p><strong>1.用<code>height：1px</code>的div，然后根据媒体查询设置<code>transform: scaleY(0.5);</code>，</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
    height:1px;
    background:#000;
    -webkit-transform: scaleY(0.5);
    -webkit-transform-origin:0 0;
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">height</span>:<span class="hljs-number">1px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scaleY</span>(0.5);
    <span class="hljs-attribute">-webkit-transform-origin</span>:<span class="hljs-number">0</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p><strong>2.用<code>::after</code>和<code>::befor</code>,设置<code>border-bottom：1px solid #000</code>,然后在缩放<code>-webkit-transform: scaleY(0.5);</code>可以实现<code>两根边线</code>的需求</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div::after{
    content:'';width:100%;
    border-bottom:1px solid #000;
    transform: scaleY(0.5);}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">content</span>:<span class="hljs-string">''</span>;<span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.5);}</code></pre>
<p><strong>3.用<code>::after</code>设置<code>border：1px solid #000; width:200%; height:200%</code>,然后再缩放<code>scaleY(0.5);</code> 优点可以<code>实现圆角</code>，<code>京东</code>就是这么实现的，缺点是按钮添加<code>active</code>比较麻烦。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".div::after {
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    -webkit-transform: scale(0.5,0.5);
    transform: scale(0.5,0.5);
    -webkit-transform-origin: top left;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.div</span><span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200%</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#bfbfbf</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scale</span>(0.5,0.5);
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.5,0.5);
    <span class="hljs-attribute">-webkit-transform-origin</span>: top left;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动web 1像素边框 瞧瞧大公司是怎么做的

## 原文链接
[https://segmentfault.com/a/1190000007604842](https://segmentfault.com/a/1190000007604842)

