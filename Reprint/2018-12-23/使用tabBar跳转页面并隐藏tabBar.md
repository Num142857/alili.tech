---
title: '使用tabBar跳转页面并隐藏tabBar' 
date: 2018-12-23 2:30:06
hidden: true
slug: sjwnsit3fxg
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>在开发小程序过程中，相信有一部分人，遇到过一个问题：当使用tabBar跳转页面时，所跳转的页面下方必定有 tabBar显示，而当你需要把它隐藏时，却束手无策。话不多说，在这里给大家分享如何隐藏tabBar的方法。</p>
<h4>方法一:自定义tabBar</h4>
<p>使用自定义tabBar，新建一个tarBar.wxml模板页，然后引用模板的页面传入数据即可，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template name=&quot;tabBar&quot;>  
  <view class=&quot;flex-h&quot; style=&quot;color: "{{"tabBar.color"}}"; background: "{{"tabBar.backgroundColor"}}"; "{{"tabBar.position=='top'? 'top: 0' : 'bottom: 0'"}}"; "{{"tabBar.borderStyle? (tabBar.position=='top'? 'border-bottom: solid 1px '+tabBar.borderStyle + ';' : 'border-top: solid 1px '+tabBar.borderStyle + ';') : ''"}}"&quot;>  
  <block wx:for=&quot;"{{"tabBar.list"}}"&quot; wx:key=&quot;pagePath&quot;>  
    <navigator url=&quot;"{{"item.pagePath"}}"&quot; open-type=&quot;"{{"item.pageTum"}}"&quot; class=&quot;menu-item&quot; style=&quot;"{{"item.active? 'color: '+(item.selectedColor? item.selectedColor : tabBar.selectedColor) : ''"}}"&quot;>  
      <image src=&quot;"{{"item.selectedIconPath"}}"&quot; wx:if=&quot;"{{"item.active"}}"&quot;></image>  
      <image src=&quot;"{{"item.iconPath"}}"&quot; wx:if=&quot;"{{"!item.active"}}"&quot;></image>  
      <text>"{{"item.text"}}"</text>  
    </navigator>  
    </block>  
  </view>  
</template>   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"tabBar"</span>&gt;</span>  
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flex-h"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: </span></span></span><span class="hljs-template-variable">"{{"tabBar.color"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">; background: </span></span></span><span class="hljs-template-variable">"{{"tabBar.backgroundColor"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">; </span></span></span><span class="hljs-template-variable">"{{"tabBar.position=='top'? 'top: 0' : 'bottom: 0'"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">; </span></span></span><span class="hljs-template-variable">"{{"tabBar.borderStyle? (tabBar.position=='top'? 'border-bottom: solid 1px '+tabBar.borderStyle + ';' : 'border-top: solid 1px '+tabBar.borderStyle + ';') : ''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>  
  <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"tabBar.list"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"pagePath"</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">navigator</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.pagePath"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">open-type</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.pageTum"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"menu-item"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.active? 'color: '+(item.selectedColor? item.selectedColor : tabBar.selectedColor) : ''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>  
      <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.selectedIconPath"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:if</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.active"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span>  
      <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.iconPath"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:if</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"!item.active"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span>  
      <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>  
    <span class="hljs-tag">&lt;/<span class="hljs-name">navigator</span>&gt;</span>  
    <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>  
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>   </span></code></pre>
<p>接下来是在index.js的配置对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tabBar:{
    &quot;color&quot;: &quot;#9E9E9E&quot;,
    &quot;selectedColor&quot;: &quot;#f00&quot;,
    &quot;backgroundColor&quot;: &quot;#fff&quot;,
    &quot;borderStyle&quot;: &quot;#ccc&quot;,
    &quot;list&quot;:[{
            &quot;pagePath&quot;: &quot;/pages/index/index&quot;,
            &quot;text&quot;: &quot;主页&quot;,
            &quot;iconPath&quot;: &quot;../../images/index.png&quot;,
            &quot;selectedIconPath&quot;: &quot;../../images/index_active.png&quot;,
            &quot;pageTum&quot;: &quot;redirect&quot;,
            &quot;selectedColor&quot;: &quot;#4EDF80&quot;,
            active: true
            },
            {
            &quot;pagePath&quot;: &quot;/pages/tum/tum&quot;,
            &quot;text&quot;: &quot;其他&quot;,
            &quot;iconPath&quot;: &quot;../../images/pageTum.png&quot;,
            &quot;pageTum&quot;: &quot;navigate&quot;,
            &quot;selectedColor&quot;: &quot;#4EDF80&quot;,
            active: false
            },
            {
            &quot;pagePath&quot;: &quot;/pages/mine/mine&quot;,
            &quot;text&quot;: &quot;我的&quot;,
            &quot;iconPath&quot;: &quot;../../images/mine.png&quot;,
            &quot;selectedIconPath&quot;: &quot;../../images/mine_active.png&quot;,
            &quot;pageTum&quot;: &quot;redirect&quot;,
            &quot;selectedColor&quot;: &quot;#4EDF80&quot;,
            active: false
            }],
            &quot;position&quot;: &quot;bottom&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>tabBar:{
    <span class="hljs-string">"color"</span>: <span class="hljs-string">"#9E9E9E"</span>,
    <span class="hljs-string">"selectedColor"</span>: <span class="hljs-string">"<span class="hljs-subst">#f00</span>"</span>,
    <span class="hljs-string">"backgroundColor"</span>: <span class="hljs-string">"<span class="hljs-subst">#fff</span>"</span>,
    <span class="hljs-string">"borderStyle"</span>: <span class="hljs-string">"<span class="hljs-subst">#ccc</span>"</span>,
    <span class="hljs-string">"list"</span>:[{
            <span class="hljs-string">"pagePath"</span>: <span class="hljs-string">"/pages/index/index"</span>,
            <span class="hljs-string">"text"</span>: <span class="hljs-string">"主页"</span>,
            <span class="hljs-string">"iconPath"</span>: <span class="hljs-string">"../../images/index.png"</span>,
            <span class="hljs-string">"selectedIconPath"</span>: <span class="hljs-string">"../../images/index_active.png"</span>,
            <span class="hljs-string">"pageTum"</span>: <span class="hljs-string">"redirect"</span>,
            <span class="hljs-string">"selectedColor"</span>: <span class="hljs-string">"#4EDF80"</span>,
            active: <span class="hljs-literal">true</span>
            },
            {
            <span class="hljs-string">"pagePath"</span>: <span class="hljs-string">"/pages/tum/tum"</span>,
            <span class="hljs-string">"text"</span>: <span class="hljs-string">"其他"</span>,
            <span class="hljs-string">"iconPath"</span>: <span class="hljs-string">"../../images/pageTum.png"</span>,
            <span class="hljs-string">"pageTum"</span>: <span class="hljs-string">"navigate"</span>,
            <span class="hljs-string">"selectedColor"</span>: <span class="hljs-string">"#4EDF80"</span>,
            active: <span class="hljs-literal">false</span>
            },
            {
            <span class="hljs-string">"pagePath"</span>: <span class="hljs-string">"/pages/mine/mine"</span>,
            <span class="hljs-string">"text"</span>: <span class="hljs-string">"我的"</span>,
            <span class="hljs-string">"iconPath"</span>: <span class="hljs-string">"../../images/mine.png"</span>,
            <span class="hljs-string">"selectedIconPath"</span>: <span class="hljs-string">"../../images/mine_active.png"</span>,
            <span class="hljs-string">"pageTum"</span>: <span class="hljs-string">"redirect"</span>,
            <span class="hljs-string">"selectedColor"</span>: <span class="hljs-string">"#4EDF80"</span>,
            active: <span class="hljs-literal">false</span>
            }],
            <span class="hljs-string">"position"</span>: <span class="hljs-string">"bottom"</span>
    }
}</code></pre>
<p>在这里要注意的是，active表示该页面是否被选中，pageTum表示点击该页面跳转方式，‘其他’这个页面不用设置tabBar，并且它的pageTum的值是navigate，表示点击‘其他’跳转的页面就不会显示tabBar。</p>
<p>index.wxml引入模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<import src=&quot;../template/tabBar.wxml&quot; />  
<template is=&quot;tabBar&quot; data=&quot;"{{"tabBar: tabBar"}}"&quot; /> 
<text>主页面</text>    //显示内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>&lt;<span class="hljs-keyword">import</span> src=<span class="hljs-string">"../template/tabBar.wxml"</span> /&gt;  
&lt;template <span class="hljs-keyword">is</span>=<span class="hljs-string">"tabBar"</span> <span class="hljs-keyword">data</span>=<span class="hljs-string">""{{"tabBar: tabBar"}}""</span> /&gt; 
&lt;<span class="hljs-keyword">text</span>&gt;主页面&lt;/<span class="hljs-keyword">text</span>&gt;    <span class="hljs-comment">//显示内容</span></code></pre>
<p>然后在mine页面也一样配置数据把active的值改为true，引入模板。效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012365055?w=280&amp;h=500" src="https://static.alili.tech/img/remote/1460000012365055?w=280&amp;h=500" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>方法二：使用中间页面跳转</h4>
<p>使用原生tabBar跳转至一级页面，再利用周期函数onShow的特性直接跳转到我们需要看到的页面，并且在返回时使用wx.swicthTab跳转至程序设计所需的一级页面。下面来看一看实现方法：</p>
<p>首先在app.json中设置tabBar</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;tabBar&quot;: {
        &quot;color&quot;: &quot;#9E9E9E&quot;,
        &quot;selectedColor&quot;: &quot;#f00&quot;,
        &quot;backgroundColor&quot;: &quot;#fff&quot;,
        &quot;borderStyle&quot;: &quot;#ccc&quot;,
        &quot;list&quot;: [{
                &quot;pagePath&quot;: &quot;pages/index/index&quot;,
                &quot;text&quot;: &quot;主页&quot;,
                &quot;iconPath&quot;: &quot;images/index.png&quot;,
                &quot;selectedIconPath&quot;: &quot;images/index_active.png&quot;
            },
            {
                &quot;pagePath&quot;: &quot;pages/tum/pageTum&quot;,
                &quot;text&quot;: &quot;其他&quot;,
                &quot;iconPath&quot;: &quot;images/pageTum.png&quot;
            },
            {
                &quot;pagePath&quot;: &quot;pages/mine/mine&quot;,
                &quot;text&quot;: &quot;我的&quot;,
                &quot;iconPath&quot;: &quot;images/mine.png&quot;,
                &quot;selectedIconPath&quot;: &quot;images/mine_active.png&quot;
            }
        ]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> <span class="hljs-string">"tabBar"</span>: {
        <span class="hljs-string">"color"</span>: <span class="hljs-string">"#9E9E9E"</span>,
        <span class="hljs-string">"selectedColor"</span>: <span class="hljs-string">"#f00"</span>,
        <span class="hljs-string">"backgroundColor"</span>: <span class="hljs-string">"#fff"</span>,
        <span class="hljs-string">"borderStyle"</span>: <span class="hljs-string">"#ccc"</span>,
        <span class="hljs-string">"list"</span>: [{
                <span class="hljs-string">"pagePath"</span>: <span class="hljs-string">"pages/index/index"</span>,
                <span class="hljs-string">"text"</span>: <span class="hljs-string">"主页"</span>,
                <span class="hljs-string">"iconPath"</span>: <span class="hljs-string">"images/index.png"</span>,
                <span class="hljs-string">"selectedIconPath"</span>: <span class="hljs-string">"images/index_active.png"</span>
            },
            {
                <span class="hljs-string">"pagePath"</span>: <span class="hljs-string">"pages/tum/pageTum"</span>,
                <span class="hljs-string">"text"</span>: <span class="hljs-string">"其他"</span>,
                <span class="hljs-string">"iconPath"</span>: <span class="hljs-string">"images/pageTum.png"</span>
            },
            {
                <span class="hljs-string">"pagePath"</span>: <span class="hljs-string">"pages/mine/mine"</span>,
                <span class="hljs-string">"text"</span>: <span class="hljs-string">"我的"</span>,
                <span class="hljs-string">"iconPath"</span>: <span class="hljs-string">"images/mine.png"</span>,
                <span class="hljs-string">"selectedIconPath"</span>: <span class="hljs-string">"images/mine_active.png"</span>
            }
        ]
    }</code></pre>
<p>在‘其他’这个页面中设置跳转页面为一个中间过渡页面pageTum，然后利用pageTum的周期函数onShow跳转至无tabBar的二级页面tum，返回时就能直接返回至主页面，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    data: {
        num: 0,
    },
    onLoad: function() {},
    onShow: function() {
        this.data.num++;
        if (this.data.num % 2 == 0) {
            wx.switchTab({
                url: '../index/index'
            });
        } else {
            wx.navigateTo({
                url: './tum'
            })
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    data: {
        num: <span class="hljs-number">0</span>,
    },
    onLoad: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{},
    onShow: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">this</span>.data.num++;
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.data.num % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>) {
            wx.switchTab({
                url: <span class="hljs-string">'../index/index'</span>
            });
        } <span class="hljs-keyword">else</span> {
            wx.navigateTo({
                url: <span class="hljs-string">'./tum'</span>
            })
        }
    }</code></pre>
<p>实现效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012365056" src="https://static.alili.tech/img/remote/1460000012365056" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果有错误或者其他的方法，希望可以指出和交流，谢谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用tabBar跳转页面并隐藏tabBar

## 原文链接
[https://segmentfault.com/a/1190000012365052](https://segmentfault.com/a/1190000012365052)

