---
title: 'CSS3实现伪类hover离开时平滑过渡效果' 
date: 2019-01-05 2:30:10
hidden: true
slug: kpcvnwzmli
categories: [reprint]
---

{{< raw >}}

                    
<p>由于hover伪类添加的动画效果，仅当鼠标放在元素上时会被触发，而当鼠标离开时，效果会中断，会显得很生硬。    <br>   大多数人的想法都是使用js的onmouseover和onmouseleave事件来实现动画效果。其实不必这么麻烦，CSS3便可以帮你解决这些问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
        <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
        <title>离开时效果生硬</title>
        <style type=&quot;text/css&quot;>
            div{
                width: 100px;
                height: 100px;
                border:1px solid;
    
                margin:0px auto;
                margin-top: 200px;
            }
            div:hover{
                transform: scale(2);
                transition: all 1s linear;
            }
        </style>
    </head>
    <body>
        <div></div>
    </body>
    </html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>离开时效果生硬<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">div</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid;
    
                <span class="hljs-attribute">margin</span>:<span class="hljs-number">0px</span> auto;
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">200px</span>;
            }
            <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:hover</span>{
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(2);
                <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> linear;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>由于div元素只有在:hover伪类触发的时候，效果才能加到div元素上。</p>
<p>当鼠标离开div元素的时候，:hover伪类将不再生效，瞬间丢掉hover里写的动画效果。</p>
<p>此时，我们应当在原本元素上再写一个一模一样的transition效果，将离开断掉的动画效果续接上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
        <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
        <title>简单解决</title>
        <style type=&quot;text/css&quot;>
            div{
                width: 100px;
                height: 100px;
                border:1px solid;
    
                margin:0px auto;
                margin-top: 200px;
    
                /* 在原本元素上再加一个transition */
                transition: all 1s linear;
            }
            div:hover{
                transform: scale(2);
                transition: all 1s linear;
            }
        </style>
    </head>
    <body>
        <div></div>
    </body>
    </html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>简单解决<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">div</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid;
    
                <span class="hljs-attribute">margin</span>:<span class="hljs-number">0px</span> auto;
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">200px</span>;
    
                <span class="hljs-comment">/* 在原本元素上再加一个transition */</span>
                <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> linear;
            }
            <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:hover</span>{
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(2);
                <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> linear;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>此时，不管鼠标在什么时候离开元素，都会原样返回。</p>
<p>但此时会有一个问题，鼠标放上去，立马离开，或者鼠标从上边匀速划过，div回到原样的时间，依旧是1s。</p>
<p>其实，我们在hover里写的transition:all 1s linear完全是多余的。</p>
<p>transition有一个特性，只要是带有数值类型的属性（例如：% , rgba() , rgb() , hsla() , 数字等），在其发生变化的时候，均会被触发动画效果。</p>
<p>因此，不管:hover伪类什么时候丢掉我的动画，也不管我:hover时，元素动画走到了什么地步。只要元素本身带有transitioin，该动画便会从当前动画执行到的地方，以相同的时间返回原样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
        <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
        <title>简单解决</title>
        <style type=&quot;text/css&quot;>
            div{
                width: 100px;
                height: 100px;
                border:1px solid;
    
                margin:0px auto;
                margin-top: 200px;
    
                /* 在此处留一个transition就够了 */
                transition: all 1s linear;
            }
            div:hover{
                transform: scale(2);
                 /* 去掉这个tansition */
                /* transition:  all 1s linear; */
            }
        </style>
    </head>
    <body>
        <div></div>
    </body>
    </html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>简单解决<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
            <span class="hljs-selector-tag">div</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
                <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid;
    
                <span class="hljs-attribute">margin</span>:<span class="hljs-number">0px</span> auto;
                <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">200px</span>;
    
                <span class="hljs-comment">/* 在此处留一个transition就够了 */</span>
                <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> linear;
            }
            <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:hover</span>{
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(2);
                 <span class="hljs-comment">/* 去掉这个tansition */</span>
                <span class="hljs-comment">/* transition:  all 1s linear; */</span>
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>这只是最简单的动画实现，但对于目前大部分需求来说，配合配合贝塞尔曲线，已经足够用了。</p>
<p>你仅仅需要做到，hover中的最终样式，保证为数值样式变OK了。</p>
<p>像display:block变为display:none就不好使了，此时我们可以用visibilty:1变为visibilty:0，同样也可以简单实现显示到隐藏的效果。</p>
<p>另外加一句，不太清楚transition属性的可以自行去百度去，transition-timing-function属性定义的速度曲线，使用cubic-bezier贝塞尔曲线，可以做到很多效果，大家可以上这个网址去试一试<a href="http://cubic-bezier.com/#.2,1.68,.87,-0.38" rel="nofollow noreferrer" target="_blank">贝塞尔曲线实现的动画</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3实现伪类hover离开时平滑过渡效果

## 原文链接
[https://segmentfault.com/a/1190000010583130](https://segmentfault.com/a/1190000010583130)

