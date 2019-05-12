---
title: '【二次元的CSS】—— 用 DIV + LESS 做一个小黄人构造器' 
date: 2019-02-10 2:30:42
hidden: true
slug: zvznwwryj8
categories: [reprint]
---

{{< raw >}}

                    
<p>仅仅使用div作为身体的布局，用css3的各种transform和圆角属性来绘制各个细节的形状，当然也不会使用任何图片哦。那就没意思了。</p>
<p>有的同学说，用canvas不是能画得更逼真而且更简单吗？这点我也非常赞同，但我的理由还是，那就没意思了。</p>
<p><strong>这次用到了一些LESS的特性，通过设置一些指定的参数来生成不同种类、不同身材的小黄人。</strong></p>
<blockquote><p>GitHub传送门：<a href="https://github.com/lancer07/css3Minons" rel="nofollow noreferrer" target="_blank">https://github.com/lancer07/css3Minons</a></p></blockquote>
<p>效果是这个样子的</p>
<p><span class="img-wrap"><img data-src="/img/bVvxKj" src="https://static.alili.tech/img/bVvxKj" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">首先 先做个标准版的（ps：也就是图中的第一个小黄人)</h3>
<p>HTML结构如下：（ps：每个小黄人的html结构都是一样的）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;minions&quot;>
            <div class=&quot;hairs&quot;>
                <div class=&quot;hair1&quot;></div>
                <div class=&quot;hair2&quot;></div>
                <div class=&quot;hair3&quot;></div>
            </div>
            <div class=&quot;body&quot;>
                <div class=&quot;cloth&quot;></div>
                <div class=&quot;straps left-straps&quot;>
                    <div class=&quot;fastener&quot;></div>
                </div>
                <div class=&quot;straps right-straps&quot;>
                    <div class=&quot;fastener&quot;></div>
                </div>
            </div>
            <div class=&quot;glasses-type&quot;></div>
            <div class=&quot;glasses left-glasses&quot;>
                <div class=&quot;eye&quot;>
                    <div class=&quot;ball&quot;>
                        <strong></strong></div>
                </div>
            </div>
            <div class=&quot;glasses right-glasses&quot;>
                <div class=&quot;eye&quot;>
                    <div class=&quot;ball&quot;>
                        <strong></strong></div>
                </div>
            </div>
            <div class=&quot;mouth&quot;>
                <div class=&quot;tooths&quot;>
                    <div class=&quot;line&quot;></div>
                    <div class=&quot;tooth1&quot;></div>
                    <div class=&quot;tooth2&quot;></div>
                    <div class=&quot;tooth3&quot;></div>
                </div>
            </div>
            <div class=&quot;arm left-arm&quot;>
                <div class=&quot;hand&quot;></div>
            </div>
            <div class=&quot;arm right-arm&quot;>
                <div class=&quot;hand&quot;></div>
            </div>
            <div class=&quot;pocket&quot;>
                <div>
                    <div></div>
                </div>
            </div>
            <div class=&quot;trousers&quot;></div>
            <div class=&quot;leg left-leg&quot;>
                <div class=&quot;footer&quot;></div>
            </div>
            <div class=&quot;leg right-leg&quot;>
                <div class=&quot;footer&quot;></div>
            </div>
        </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"minions"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"hairs"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"hair1"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"hair2"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"hair3"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"body"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"cloth"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"straps left-straps"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fastener"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"straps right-straps"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fastener"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"glasses-type"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"glasses left-glasses"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"eye"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ball"</span>&gt;
                        &lt;strong&gt;&lt;/strong&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"glasses right-glasses"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"eye"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ball"</span>&gt;
                        &lt;strong&gt;&lt;/strong&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"mouth"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"tooths"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"line"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"tooth1"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"tooth2"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"tooth3"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"arm left-arm"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"hand"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"arm right-arm"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"hand"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"pocket"</span>&gt;
                &lt;<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"trousers"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"leg left-leg"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footer"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"leg right-leg"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footer"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><strong>LESS代码如下：（ps：先定义一个小黄人的类，然后通过设置参数来实例化每个小黄人)</strong></p>
<p>定义<code>小黄人</code>类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".Minion(@width:1;@height:1;@eye:2){
    width: 380px * @width;
    height:700px * @height;
    position:absolute;
    margin-top: -100px;
    margin-left:-20px;
    transform : scale(0.5,0.5);
    .hairs{
        position:absolute;
        top: -40px;
        z-index: 3;
        width: 100%;
        .hair{
            background:#000;
            width:2px;
            height:70px;
            position:absolute
        }
        .hair1{
            .hair;
            left:45%;
            transform:rotate(-20deg);
        }
        .hair2{
            .hair;
            left:50%;
        }
        .hair3{
            .hair;
            left:55%;
            transform:rotate(20deg);
        }
    }
    .body{
        overflow: hidden;
        background: #fff500;

        width: 380px * @width;
        position:absolute;
        z-index: 1;
        height:700px * @height;
        border-radius: 180px * @width;
    }
    .glasses-type{ //眼镜
        height:52px;
        background:#1f1a17;
        width:100%;
        position: absolute;
        top: 200px;
        z-index: 1;
    }
    
    .glasses{
        z-index: 2;
        position:absolute;
        background:#dededd;
        border:2px solid #1f1a17;
        width:150px;
        height:150px;
        border-radius: 50%;
        top: 140px;
        &amp;.left-glasses when (@eye = 2){
            left:8%;
            .ball{
                //left : 45%;
                animation: eye 1.5s infinite ease;
            }
        }
        &amp;.right-glasses when (@eye = 2){
            right:8%;
            .ball{
                //right:45%;
                animation: eye 1.5s infinite ease;
            }
        }
        &amp;.left-glasses when (@eye = 1){
            left:50%;
            margin-left: -90px;
            width: 180px;
            height: 180px;
            .eye{
                width: 150px;
                height: 150px;
                .ball{
                    animation: eye 1.5s infinite ease;
                }
            }
        }
        &amp;.right-glasses when (@eye = 1){
            display: none;
        }
        .eye{
            background:#fff;
            width:120px;
            height:120px;
            border-radius: 50%;
            border:2px solid #1f1a17;
            margin:15px auto;
            position:relative;
            .ball{
                background:#8f5444;
                width:40px;
                height:40px;
                border-radius: 50%;
                border:2px solid #1f1a17;
                position:absolute;
                top: 40%;
                transition: all .15s linear;
                strong{
                    display: block;
                    width:20px;
                    height:20px;
                    background:#1f1a17;
                    border-radius: 50%;
                    position:absolute;
                    top: 10px;
                    left:10px;
                }
            }
        }
    }

    .mouth{
        width:40%;
        height:80px;
        background:#fff;
        position:absolute;
        bottom:42%;
        left:30%;
        z-index: 1;
        border-radius: 120px 120px 40px 40px;
        border:2px solid #1f1a17;
        overflow:hidden;
        animation: up-down 0.5s infinite ease;
        .tooths{
            .tooth{
                border-right:2px solid #1f1a17;
                height:100%;
                width:0;
                position:absolute;
            }
            .tooth1{
                .tooth;
                left:25%;
            }
            .tooth2{
                .tooth;
                left:50%;
            }
            .tooth3{
                .tooth;
                left:75%;
            }
            .line{
                width:100%;
                top: 48%;
                border-top:3px solid #1f1a17;
                position:absolute;
            }
        }

    }
    .arm{
        position:absolute;
        width:50px;
        height:400px;
        background:#fff500;
        border-radius: 50px;
        top: 190px;
        z-index: 0;
        &amp;.left-arm{
            left:-20px;
            transform:rotate(20deg);
        }
        &amp;.right-arm{
            right:-20px;
            transform:rotate(-20deg);
        }
        .hand{
            position:absolute;
            bottom:0;
            width:60px;
            height:60px;
            border-radius: 50%;
            background:#1f1a17;
            left:-5px;
        }
    }
    .cloth{
        background:#667ab3;
        border-radius: 20px;
        bottom:20px;
        width:80%;
        height:250px;
        position:absolute;
        z-index: 1;
        left:10%;
    }
    .pocket{
        border:2px solid #1f1a17;
        border-radius: 5px 5px 30px 30px;
        width:100px;
        left:50%;
        margin-left: -50px;
        height:100px;
        position:absolute;
        z-index: 2;
        bottom: 80px;
        >div{
            background:#1f1a17;
            width:50px;
            height:50px;
            border-radius: 50%;
            top: 20px;
            left:25px;
            position:absolute;
            >div{
                width:20px;
                height:20px;
                border:5px solid #667ab3;
                transform:rotate(45deg);
                position:absolute;
                top: 10px;
                left:10px
            }
        }
    }
    .trousers{
        background:#667ab3;
        border-radius: 10px 10px 130px 130px;
        bottom:0;
        width:100%;
        height:160px;
        position:absolute;
        z-index: 1;
    }
    .straps{
        width:40px;
        height:150px;
        position:absolute;
        z-index: 1;
        background:#667ab3;
        bottom:230px;
        &amp;.left-straps{
            left:10px;
            transform:rotate(-40deg);
        }
        &amp;.right-straps{
            right:10px;
            transform:rotate(40deg);
        }
        .fastener{
            background:#1f1a17;
            width:20px;
            height:20px;
            border-radius: 50%;
            bottom:10px;
            position:absolute;
            left:10px;
        }
    }

    .leg{
        background:#667ab3;
        width:70px;
        height:120px;
        position:absolute;
        bottom:-80px;
        &amp;.left-leg{
            left:20%;
            .footer{
                right:-2px;
                border-radius: 100px 0 0 20px;
            }
        }
        &amp;.right-leg{
            right:20%;
            .footer{
                left:-2px;
                border-radius: 0 100px 20px 0;
            }
        }
        .footer{
            background:#1f1a17;
            width:100px;
            height:50px;
            position:absolute;
            bottom:0;
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.Minion</span>(@width:<span class="hljs-number">1</span>;@height:<span class="hljs-number">1</span>;@eye:<span class="hljs-number">2</span>){
    <span class="hljs-attribute">width</span>: <span class="hljs-number">380px</span> * @width;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">700px</span> * @height;
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">20px</span>;
    <span class="hljs-attribute">transform</span> : scale(<span class="hljs-number">0.5</span>,<span class="hljs-number">0.5</span>);
    <span class="hljs-selector-class">.hairs</span>{
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">top</span>: -<span class="hljs-number">40px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">3</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-selector-class">.hair</span>{
            <span class="hljs-attribute">background</span>:<span class="hljs-number">#000</span>;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">2px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">70px</span>;
            <span class="hljs-attribute">position</span>:absolute
        }
        .hair1{
            .hair;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">45%</span>;
            <span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">20deg</span>);
        }
        <span class="hljs-selector-class">.hair2</span>{
            <span class="hljs-selector-class">.hair</span>;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        }
        <span class="hljs-selector-class">.hair3</span>{
            <span class="hljs-selector-class">.hair</span>;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">55%</span>;
            <span class="hljs-attribute">transform</span>:rotate(<span class="hljs-number">20deg</span>);
        }
    }
    <span class="hljs-selector-class">.body</span>{
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff500</span>;

        <span class="hljs-attribute">width</span>: <span class="hljs-number">380px</span> * @width;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">700px</span> * @height;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">180px</span> * @width;
    }
    <span class="hljs-selector-class">.glasses-type</span>{ <span class="hljs-comment">//眼镜</span>
        <span class="hljs-attribute">height</span>:<span class="hljs-number">52px</span>;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#1f1a17</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    }
    
    <span class="hljs-selector-class">.glasses</span>{
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#dededd</span>;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#1f1a17</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">150px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">150px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">140px</span>;
        &amp;<span class="hljs-selector-class">.left-glasses</span> when (@eye = 2){
            <span class="hljs-attribute">left</span>:<span class="hljs-number">8%</span>;
            <span class="hljs-selector-class">.ball</span>{
                <span class="hljs-comment">//left : 45%;</span>
                <span class="hljs-attribute">animation</span>: eye <span class="hljs-number">1.5s</span> infinite ease;
            }
        }
        &amp;<span class="hljs-selector-class">.right-glasses</span> when (@eye = 2){
            <span class="hljs-attribute">right</span>:<span class="hljs-number">8%</span>;
            <span class="hljs-selector-class">.ball</span>{
                <span class="hljs-comment">//right:45%;</span>
                <span class="hljs-attribute">animation</span>: eye <span class="hljs-number">1.5s</span> infinite ease;
            }
        }
        &amp;<span class="hljs-selector-class">.left-glasses</span> when (@eye = 1){
            <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
            <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">90px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">180px</span>;
            <span class="hljs-selector-class">.eye</span>{
                <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
                <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
                <span class="hljs-selector-class">.ball</span>{
                    <span class="hljs-attribute">animation</span>: eye <span class="hljs-number">1.5s</span> infinite ease;
                }
            }
        }
        &amp;<span class="hljs-selector-class">.right-glasses</span> when (@eye = 1){
            <span class="hljs-attribute">display</span>: none;
        }
        <span class="hljs-selector-class">.eye</span>{
            <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">120px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">120px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#1f1a17</span>;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">15px</span> auto;
            <span class="hljs-attribute">position</span>:relative;
            <span class="hljs-selector-class">.ball</span>{
                <span class="hljs-attribute">background</span>:<span class="hljs-number">#8f5444</span>;
                <span class="hljs-attribute">width</span>:<span class="hljs-number">40px</span>;
                <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
                <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#1f1a17</span>;
                <span class="hljs-attribute">position</span>:absolute;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">40%</span>;
                <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">15s</span> linear;
                <span class="hljs-selector-tag">strong</span>{
                    <span class="hljs-attribute">display</span>: block;
                    <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
                    <span class="hljs-attribute">height</span>:<span class="hljs-number">20px</span>;
                    <span class="hljs-attribute">background</span>:<span class="hljs-number">#1f1a17</span>;
                    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
                    <span class="hljs-attribute">position</span>:absolute;
                    <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
                    <span class="hljs-attribute">left</span>:<span class="hljs-number">10px</span>;
                }
            }
        }
    }

    <span class="hljs-selector-class">.mouth</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">40%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">80px</span>;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">42%</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">30%</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">120px</span> <span class="hljs-number">120px</span> <span class="hljs-number">40px</span> <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#1f1a17</span>;
        <span class="hljs-attribute">overflow</span>:hidden;
        <span class="hljs-attribute">animation</span>: up-down <span class="hljs-number">0.5s</span> infinite ease;
        <span class="hljs-selector-class">.tooths</span>{
            <span class="hljs-selector-class">.tooth</span>{
                <span class="hljs-attribute">border-right</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#1f1a17</span>;
                <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
                <span class="hljs-attribute">width</span>:<span class="hljs-number">0</span>;
                <span class="hljs-attribute">position</span>:absolute;
            }
            <span class="hljs-selector-class">.tooth1</span>{
                <span class="hljs-selector-class">.tooth</span>;
                <span class="hljs-attribute">left</span>:<span class="hljs-number">25%</span>;
            }
            <span class="hljs-selector-class">.tooth2</span>{
                <span class="hljs-selector-class">.tooth</span>;
                <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
            }
            <span class="hljs-selector-class">.tooth3</span>{
                <span class="hljs-selector-class">.tooth</span>;
                <span class="hljs-attribute">left</span>:<span class="hljs-number">75%</span>;
            }
            <span class="hljs-selector-class">.line</span>{
                <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">48%</span>;
                <span class="hljs-attribute">border-top</span>:<span class="hljs-number">3px</span> solid <span class="hljs-number">#1f1a17</span>;
                <span class="hljs-attribute">position</span>:absolute;
            }
        }

    }
    <span class="hljs-selector-class">.arm</span>{
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">400px</span>;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff500</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">190px</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">0</span>;
        &amp;<span class="hljs-selector-class">.left-arm</span>{
            <span class="hljs-attribute">left</span>:-<span class="hljs-number">20px</span>;
            <span class="hljs-attribute">transform</span>:rotate(<span class="hljs-number">20deg</span>);
        }
        &amp;<span class="hljs-selector-class">.right-arm</span>{
            <span class="hljs-attribute">right</span>:-<span class="hljs-number">20px</span>;
            <span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">20deg</span>);
        }
        <span class="hljs-selector-class">.hand</span>{
            <span class="hljs-attribute">position</span>:absolute;
            <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">60px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">60px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">background</span>:<span class="hljs-number">#1f1a17</span>;
            <span class="hljs-attribute">left</span>:-<span class="hljs-number">5px</span>;
        }
    }
    <span class="hljs-selector-class">.cloth</span>{
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#667ab3</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">20px</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">80%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">250px</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">10%</span>;
    }
    <span class="hljs-selector-class">.pocket</span>{
        <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#1f1a17</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span> <span class="hljs-number">5px</span> <span class="hljs-number">30px</span> <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">80px</span>;
        &gt;<span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">background</span>:<span class="hljs-number">#1f1a17</span>;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">50px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">25px</span>;
            <span class="hljs-attribute">position</span>:absolute;
            &gt;<span class="hljs-selector-tag">div</span>{
                <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
                <span class="hljs-attribute">height</span>:<span class="hljs-number">20px</span>;
                <span class="hljs-attribute">border</span>:<span class="hljs-number">5px</span> solid <span class="hljs-number">#667ab3</span>;
                <span class="hljs-attribute">transform</span>:rotate(<span class="hljs-number">45deg</span>);
                <span class="hljs-attribute">position</span>:absolute;
                <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>;
                <span class="hljs-attribute">left</span>:<span class="hljs-number">10px</span>
            }
        }
    }
    .trousers{
        background:<span class="hljs-number">#667ab3</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">130px</span> <span class="hljs-number">130px</span>;
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">160px</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    }
    <span class="hljs-selector-class">.straps</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">40px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">150px</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#667ab3</span>;
        <span class="hljs-attribute">bottom</span>:<span class="hljs-number">230px</span>;
        &amp;<span class="hljs-selector-class">.left-straps</span>{
            <span class="hljs-attribute">left</span>:<span class="hljs-number">10px</span>;
            <span class="hljs-attribute">transform</span>:rotate(-<span class="hljs-number">40deg</span>);
        }
        &amp;<span class="hljs-selector-class">.right-straps</span>{
            <span class="hljs-attribute">right</span>:<span class="hljs-number">10px</span>;
            <span class="hljs-attribute">transform</span>:rotate(<span class="hljs-number">40deg</span>);
        }
        <span class="hljs-selector-class">.fastener</span>{
            <span class="hljs-attribute">background</span>:<span class="hljs-number">#1f1a17</span>;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">20px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">bottom</span>:<span class="hljs-number">10px</span>;
            <span class="hljs-attribute">position</span>:absolute;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">10px</span>;
        }
    }

    <span class="hljs-selector-class">.leg</span>{
        <span class="hljs-attribute">background</span>:<span class="hljs-number">#667ab3</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">70px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">120px</span>;
        <span class="hljs-attribute">position</span>:absolute;
        <span class="hljs-attribute">bottom</span>:-<span class="hljs-number">80px</span>;
        &amp;<span class="hljs-selector-class">.left-leg</span>{
            <span class="hljs-attribute">left</span>:<span class="hljs-number">20%</span>;
            <span class="hljs-selector-class">.footer</span>{
                <span class="hljs-attribute">right</span>:-<span class="hljs-number">2px</span>;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">100px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
            }
        }
        &amp;<span class="hljs-selector-class">.right-leg</span>{
            <span class="hljs-attribute">right</span>:<span class="hljs-number">20%</span>;
            <span class="hljs-selector-class">.footer</span>{
                <span class="hljs-attribute">left</span>:-<span class="hljs-number">2px</span>;
                <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span> <span class="hljs-number">100px</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
            }
        }
        <span class="hljs-selector-class">.footer</span>{
            <span class="hljs-attribute">background</span>:<span class="hljs-number">#1f1a17</span>;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
            <span class="hljs-attribute">position</span>:absolute;
            <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
        }
    }
}
</code></pre>
<p>实例化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".minion-1{
    z-index: 1;
    top: 50px;
    left: 0;
    .Minion(1,1,2);    
}

.minion-2{
    z-index: 2;
    top: 0;
    left: 24%;
    .Minion(0.88,1.1,1);    
}

.minion-3{
    z-index: 2;
    top: 44px;
    left: 42%;
    .Minion(1.15,1.02,1);    
}

.minion-4{
    z-index: 1;
    top: 5px;
    left: 67%;
    .Minion(1,1.1,2);    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.minion-1</span>{
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-selector-class">.Minion</span>(1,1,2);    
}

<span class="hljs-selector-class">.minion-2</span>{
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">24%</span>;
    <span class="hljs-selector-class">.Minion</span>(0<span class="hljs-selector-class">.88</span>,1<span class="hljs-selector-class">.1</span>,1);    
}

<span class="hljs-selector-class">.minion-3</span>{
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">44px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">42%</span>;
    <span class="hljs-selector-class">.Minion</span>(1<span class="hljs-selector-class">.15</span>,1<span class="hljs-selector-class">.02</span>,1);    
}

<span class="hljs-selector-class">.minion-4</span>{
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">67%</span>;
    <span class="hljs-selector-class">.Minion</span>(1,1<span class="hljs-selector-class">.1</span>,2);    
}</code></pre>
<h3 id="articleHeader1">最后加点料</h3>
<p>附加了2个小动画效果，眼睛转动和牙齿抖动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes eye {
    0% {  
        transform:rotate(0,0);
    }
    50% {  
        transform:translate(70px,0px)
    }
    100% {  
        transform:translate(0px,0px)
    }
}

@keyframes up-down {
    0% {  
        transform:rotate(0,0);
    }
    50% {  
        transform:translate(0,2px)
    }
    100% {  
        transform:translate(0,0)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> eye {
    0% {  
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(0,0);
    }
    50% {  
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(70px,0px)
    }
    100% {  
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(0px,0px)
    }
}

@<span class="hljs-keyword">keyframes</span> up-down {
    0% {  
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(0,0);
    }
    50% {  
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(0,2px)
    }
    100% {  
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translate</span>(0,0)
    }
}</code></pre>
<h3 id="articleHeader2">后续</h3>
<p>没有特别详细的描述每个细节部分，大家看一下源码或者fork一下就能知道具体每个元素是怎么实现的了。<br>当然这个肯定是有bug的，比如参数设置的过大或者过小，都会导致生成出来的小黄人乱七八糟，也欢迎大家吐槽。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【二次元的CSS】—— 用 DIV + LESS 做一个小黄人构造器

## 原文链接
[https://segmentfault.com/a/1190000005095807](https://segmentfault.com/a/1190000005095807)

