---
title: 'css中div垂直居中的方法。' 
date: 2018-12-03 2:30:08
hidden: true
slug: 21iztzdcb7e
categories: [reprint]
---

{{< raw >}}

                    
<h1>利用绝对定位实现的居中</h1>
<p>代码如下：</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;居中&lt;/title&gt;
        &lt;style type="text/css"&gt;
            *{
                padding: 0px;
                margin: 0px;
            }
            body {
                height: 100%;
                overflow: hidden;
            }
            .father{
                position: absolute;
                height: 500px;
                width: 100%;
                background-color:#2AABD2;
            }
            .children{
                position: absolute;
                top: 50%;
                left: 50%;
                background-color: red;
                width: 100px; 
                height: 100px;
                margin: -50px 0 0 -50px;
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div class="father"&gt;
            &lt;div class="children"&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>效果图如下：<br><span class="img-wrap"><img data-src="/img/bV9iVj?w=1919&amp;h=957" src="https://static.alili.tech/img/bV9iVj?w=1919&amp;h=957" alt="图片描述" title="图片描述"></span></p>
<h1>利用flex垂直居中</h1>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;居中&lt;/title&gt;
        &lt;style type="text/css"&gt;
            *{
                padding: 0px;
                margin: 0px;
            }
            body {
                height: 100%;
                overflow: hidden;
            }
            .father{
                height: 500px;
                width: 100%;
                background-color:#2AABD2;
                display: flex;
                justify-content: center;/*实现水平居中*/
                align-items:center; /*实现垂直居中*/
            }
            .children{
                background-color: red;
                width: 100px; 
                height: 100px;
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div class="father"&gt;
            &lt;div class="children"&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>效果图如下：<span class="img-wrap"><img data-src="/img/bV9iV3?w=1917&amp;h=954" src="https://static.alili.tech/img/bV9iV3?w=1917&amp;h=954" alt="图片描述" title="图片描述"></span></p>
<h1>transform+relative实现的居中</h1>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;居中&lt;/title&gt;
        &lt;style type="text/css"&gt;
            *{
                padding: 0px;
                margin: 0px;
            }
            body {
                height: 100%;
                overflow: hidden;
            }
            .father{
                position: absolute;
                height: 500px;
                width: 100%;
                background-color:#2AABD2;
            }
            .children
            {
                width: 300px;
                height: 150px;
                background-color: #333333;
            
                position: relative;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div class="father"&gt;
            &lt;div class="children"&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>效果图如下：<span class="img-wrap"><img data-src="/img/bV9jrK?w=1919&amp;h=955" src="https://static.alili.tech/img/bV9jrK?w=1919&amp;h=955" alt="图片描述" title="图片描述"></span><br>多谢@alexxxcs1提供的另一种方式(不晓得这样能否@到^_^)，嘛其实网上实现居中的方式确实很多，互相探讨加深印象。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css中div垂直居中的方法。

## 原文链接
[https://segmentfault.com/a/1190000014571778](https://segmentfault.com/a/1190000014571778)

