---
title: '微信小程序的数据绑定与下拉刷新与template模块使用问题' 
date: 2018-12-23 2:30:06
hidden: true
slug: wsnkvwgnkl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>最近10几天都在学习小程序的开发，遇到了一些问题和笔记有趣的东西，今天总结了一下，和大家分享</p>
<h3 id="articleHeader1">1.小程序中的template模块使用</h3>
<p>在一个月黑风高的夜晚，我突然发现一个很有意思的东西，那就是template模块，它可以将你定义的一个HTML5模块包住，然后利用template，在你的小程序任意一个页面使用，这样极大的减少了程序中的复制-粘贴，复制-粘贴(一般用于需要循环使用的界面)。下面就用我自己的一个template模块来讲解下。</p>
<h4>第一步：创建页面</h4>
<p>在pages里面创建存储你template模块的页面，便于其他页面对其的引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;pages/index/index&quot;,
&quot;pages/find/find&quot;,
&quot;pages/gift/gift&quot;,
&quot;pages/activity/activity&quot;,
&quot;pages/common/list&quot;,//存储template模块的页面
&quot;pages/white/white&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"pages/index/index"</span>,
<span class="hljs-string">"pages/find/find"</span>,
<span class="hljs-string">"pages/gift/gift"</span>,
<span class="hljs-string">"pages/activity/activity"</span>,
<span class="hljs-string">"pages/common/list"</span>,<span class="hljs-comment">//存储template模块的页面</span>
<span class="hljs-string">"pages/white/white"</span>
</code></pre>
<h4>第二步：创建template模块</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="template模块实例
<template name=&quot;job_list&quot;>
 <view class=&quot;br&quot;></view>
 <navigator url=&quot;../white/white&quot; class=&quot;page_appmsg&quot;>  //点击跳转
        <view class=&quot;page&quot;>
                <view class=&quot;page__hd &quot;>
                    <image class=&quot;page__thumb&quot; src=&quot;"{{"image"}}"&quot; mode=&quot;aspectFill&quot;/>
                    <view class=&quot;page__hd_title&quot;>
                        <view class=&quot;page__hd_title title&quot;>"{{"title"}}"</view>
                        <view class=&quot;page__hd_title school&quot;>"{{"school"}}"</view>
                        <view class=&quot;page__hd_title request&quot;>
                            <text class=&quot;page__hd_title pink&quot;>"{{"pink"}}"</text>
                            <text class=&quot;page__hd_title time&quot;>"{{"time"}}"</text>
                            <view class=&quot;page__hd_title cool&quot;><i class=&quot;iconfont icon-zan1 active&quot;></i>"{{"cool"}}"</view>
                        </view>
                    </view>
                </view>   
                <view class='page__ft'>
                 <i class=&quot;iconfont icon-jian-copy active&quot;></i>"{{"page__ft"}}"}
                </view>
        </view>
</navigator>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">template模块实例
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"job_list"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"br"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">navigator</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"../white/white"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page_appmsg"</span>&gt;</span>  //点击跳转
        <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd "</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__thumb"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"image"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">"aspectFill"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd_title"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd_title title"</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd_title school"</span>&gt;</span></span><span class="hljs-template-variable">"{{"school"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd_title request"</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd_title pink"</span>&gt;</span></span><span class="hljs-template-variable">"{{"pink"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd_title time"</span>&gt;</span></span><span class="hljs-template-variable">"{{"time"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page__hd_title cool"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-zan1 active"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span><span class="hljs-template-variable">"{{"cool"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>   
                <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'page__ft'</span>&gt;</span>
                 <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-jian-copy active"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span><span class="hljs-template-variable">"{{"page__ft"}}"</span><span class="xml">}
                <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">navigator</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>在你需要重复使用的html用一个&lt;template&gt;标签包起来，并给它取个名字 。<br>（当然了，还有WXSS的编写，这里因为不是很重要我就不放出来了）<br>完成了这步，你就可以尽情的在你需要这个模板的页面引用这个模块了。</p>
<h4>第三步：在各个页面引用template模块</h4>
<p>①在你想要引用的界面的WXSS和WXML上引用template的wxml和wxss，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import '../common/list.wxss';
<import src=&quot;../common/list.wxml&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>@<span class="hljs-keyword">import</span> '../common/list.wxss';
&lt;<span class="hljs-keyword">import</span> src=<span class="hljs-string">"../common/list.wxml"</span> /&gt;</code></pre>
<p>②在你需要的盒子里面添加template标签，你想要引用那个template模块，就在is里面填哪个模块的名字</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template is=&quot;job_list&quot; data=&quot;"{{"jobs"}}"&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code style="word-break: break-word; white-space: initial;">  &lt;<span class="hljs-keyword">template</span> <span class="hljs-keyword">is</span>=<span class="hljs-string">"job_list"</span> data=<span class="hljs-string">""{{"jobs"}}""</span>/&gt;</code></pre>
<p>如果你是在一个循环里面引用的template就需要改为data=""{{"...item"}}""如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <block wx:for=&quot;"{{"jobs"}}"&quot; wx:key=&quot;"{{"index"}}"&quot;>
            <template is=&quot;job_list&quot; data=&quot;"{{"...item"}}"&quot;/>
        </block>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">        <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"jobs"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"index"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"job_list"</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"...item"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span></span></code></pre>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<import src=&quot;../common/list.wxml&quot; />
<view class=&quot;swiper-tab&quot;>
    <view class=&quot;swiper-tab-item "{{"activeIndex==0?'active':''"}}"&quot; data-current=&quot;0&quot; bindtap=&quot;clickTab&quot;>活动</view>
    <view class=&quot;swiper-tab-item "{{"activeIndex==1?'active':''"}}"&quot; data-current=&quot;1&quot; bindtap=&quot;clickTab&quot;>视频</view>
    <view class=&quot;swiper-tab-item "{{"activeIndex==2?'active':''"}}"&quot; data-current=&quot;2&quot; bindtap=&quot;clickTab&quot;>直播</view>
</view>
<swiper current='"{{"activeIndex"}}"' bindchange=&quot;swiperTab&quot;>
    <swiper-item>
        <view class=&quot;swiper-item__content&quot;>
            <block wx:for=&quot;"{{"jobs"}}"&quot; wx:key=&quot;"{{"index"}}"&quot;>
                <template is=&quot;job_list&quot; data=&quot;"{{"...item"}}"&quot;/>
            </block>
        </view>
    </swiper-item>
    <swiper-item>
            <view class=&quot;swiper-item__content&quot;>
                    <block wx:for=&quot;"{{"jobs"}}"&quot; wx:key=&quot;"{{"index"}}"&quot;>
                        <template is=&quot;job_list&quot; data=&quot;"{{"...item"}}"&quot;/>
                    </block>
                </view>
    </swiper-item>
    <swiper-item>
            <view class=&quot;swiper-item__content&quot;>
                    <block wx:for=&quot;"{{"jobs"}}"&quot; wx:key=&quot;"{{"index"}}"&quot;>
                        <template is=&quot;job_list&quot; data=&quot;"{{"...item"}}"&quot;/>
                    </block>
                </view>
    </swiper-item>
</swiper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">import</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../common/list.wxml"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-tab"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-tab-item </span></span></span><span class="hljs-template-variable">"{{"activeIndex==0?'active':''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">data-current</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">"clickTab"</span>&gt;</span>活动<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-tab-item </span></span></span><span class="hljs-template-variable">"{{"activeIndex==1?'active':''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">data-current</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">"clickTab"</span>&gt;</span>视频<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-tab-item </span></span></span><span class="hljs-template-variable">"{{"activeIndex==2?'active':''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">data-current</span>=<span class="hljs-string">"2"</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">"clickTab"</span>&gt;</span>直播<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">current</span>=<span class="hljs-string">'</span></span></span><span class="hljs-template-variable">"{{"activeIndex"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">'</span> <span class="hljs-attr">bindchange</span>=<span class="hljs-string">"swiperTab"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-item__content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"jobs"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"index"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"job_list"</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"...item"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-item__content"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"jobs"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"index"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"job_list"</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"...item"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-item</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper-item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-item__content"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"jobs"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"index"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"job_list"</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"...item"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span></span></code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVZ0NQ?w=416&amp;h=733" src="https://static.alili.tech/img/bVZ0NQ?w=416&amp;h=733" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">2.数据绑定</h3>
<p>又是一个月黑风高的夜晚，我在实现点亮的功能的时候，发现我只点了一个地方的点赞，整个页面的点赞都亮了起来，这肯定是不行的，用户明明只对这一个感兴趣，你怎么能全部点亮呢？于是我开始了思考，发现我犯了一个十分愚蠢的问题，那就是没有给我的数据绑定一个值，这就好像没有给喊名字一样：到了饭点你出去大喊一声:儿子,回家吃饭了!结果肯定是家家的儿子都回去吃饭了，然而别人家的饭都还没开始煮呢，你怎么就喊人家回去了呢，你肯定得喊：二狗子，回家吃饭了！别人家的娃才不会也跟着回家。这和点击事件是一个道理的，你必须给你的每项数据绑定一个id，用if语句，将数组遍历一遍，将每个数据的ID拿出来看看，看下你点的这个数据的ID，与数组中哪个相符合。如何成功配对了 ，恭喜，你可以执行点亮操作了！<br>功能实现如下：</p>
<ul><li>
<p>wxml</p>
<p>&lt;a wx:if=""{{"!item.isSelected"}}"" id="dianzan1" data-id = ""{{"item.id"}}""</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindtap=&quot;cool&quot;>
<i class=&quot;iconfont icon-dianzan1 active&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>bindtap=<span class="hljs-string">"cool"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-dianzan1 active"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span></code></pre>
<p><br>&lt;a wx:if=""{{"item.isSelected"}}"" id="dianzan1" data-id = ""{{"item.id"}}""</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindtap=&quot;cool&quot;>
<i class=&quot;iconfont icon-dianzan1-copy active&quot;></i>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>bindtap=<span class="hljs-string">"cool"</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"iconfont icon-dianzan1-copy active"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span></code></pre>
<p></p>
</li></ul>
<p>在数据中，我不仅给了它一个ID，还给了它一个布尔值，并且全部定为false，这样便可以通过<br>wx:if=""{{"!item.isSelected"}}"" wx:if=""{{"item.isSelected"}}"" 来判断展示的是点亮与否。</p>
<ul>
<li>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  cool:function(e) {
     let jobs = this.data.jobs
     for(let key in jobs){                       // 遍历一遍数据
      // console.log(jobs[key].id);           
                                         //将界面的数据与jobs的数据进行匹配
       if (jobs[key].id === e.currentTarget.dataset.id){ 
         if (!jobs[key].isSelected){             //处于未点亮状态时的操作
           jobs[key].isSelected = true;
           wx.showToast({
             title: '点赞成功',
             icon: 'success',
             duration: 1500,
           })    
         }else{                                 //处于点亮时的操作
           jobs[key].isSelected = false;
           wx.showToast({
             title: '取消点赞',
             icon: 'success',
             duration: 1500,
           })
         }       
       }
     }
     this.setData({                             // 将界面更新
       jobs : jobs,
     });
  
   }, 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>  cool:<span class="hljs-keyword">function</span>(e) {
     <span class="hljs-built_in">let</span> <span class="hljs-built_in">jobs</span> = this.data.jobs
     <span class="hljs-keyword">for</span>(<span class="hljs-built_in">let</span> key <span class="hljs-keyword">in</span> <span class="hljs-built_in">jobs</span>){                       // 遍历一遍数据
      // console.log(<span class="hljs-built_in">jobs</span>[key].id);           
                                         //将界面的数据与<span class="hljs-built_in">jobs</span>的数据进行匹配
       <span class="hljs-keyword">if</span> (<span class="hljs-built_in">jobs</span>[key].id === e.currentTarget.dataset.id){ 
         <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">jobs</span>[key].isSelected){             //处于未点亮状态时的操作
           <span class="hljs-built_in">jobs</span>[key].isSelected = <span class="hljs-literal">true</span>;
           wx.showToast({
             title: <span class="hljs-string">'点赞成功'</span>,
             icon: <span class="hljs-string">'success'</span>,
             duration: 1500,
           })    
         }<span class="hljs-keyword">else</span>{                                 //处于点亮时的操作
           <span class="hljs-built_in">jobs</span>[key].isSelected = <span class="hljs-literal">false</span>;
           wx.showToast({
             title: <span class="hljs-string">'取消点赞'</span>,
             icon: <span class="hljs-string">'success'</span>,
             duration: 1500,
           })
         }       
       }
     }
     this.setData({                             // 将界面更新
       <span class="hljs-built_in">jobs</span> : <span class="hljs-built_in">jobs</span>,
     });
  
   }, 

</code></pre>
</li>
<li>效果图</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVZ06W?w=416&amp;h=761" src="https://static.alili.tech/img/bVZ06W?w=416&amp;h=761" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">3.下拉刷新触发过多问题</h3>
<p>又是一个月黑风高的夜晚，我突然发现了一个bug！在小程序下拉刷新时，我明明只加了一组数据，然而却刷出来了2到3组数据，（这里我使用的是scroll-view组件的bindscrolltolower属性）</p>
<p><span class="img-wrap"><img data-src="/img/bVZ0ko?w=451&amp;h=733" src="https://static.alili.tech/img/bVZ0ko?w=451&amp;h=733" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>吓得我赶紧回去看了一波代码，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   lower:function(){
    // if(i!=1){
    //   return
    // }i++;
    var that = this;
    // console.log('下拉加载');
    wx.showToast({
      title:'加载中',
      icon:'loading',
      duration: 1000,
    });
    setTimeout(function(){
      wx.showToast({
        title:'加载成功',
        icon:'success',
        duration:1000,
      });

      wx.request({
        url:'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc',
        complete:(res)=>{
          console.log(that.data.jobs);
          var jobs = that.data.jobs.concat(res.data.data.jobs)
         that.setData({
            jobs:jobs,
          })
        },
      })
    },1000);
   
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   lower:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// if(i!=1){</span>
    <span class="hljs-comment">//   return</span>
    <span class="hljs-comment">// }i++;</span>
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// console.log('下拉加载');</span>
    wx.showToast({
      <span class="hljs-attr">title</span>:<span class="hljs-string">'加载中'</span>,
      <span class="hljs-attr">icon</span>:<span class="hljs-string">'loading'</span>,
      <span class="hljs-attr">duration</span>: <span class="hljs-number">1000</span>,
    });
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      wx.showToast({
        <span class="hljs-attr">title</span>:<span class="hljs-string">'加载成功'</span>,
        <span class="hljs-attr">icon</span>:<span class="hljs-string">'success'</span>,
        <span class="hljs-attr">duration</span>:<span class="hljs-number">1000</span>,
      });

      wx.request({
        <span class="hljs-attr">url</span>:<span class="hljs-string">'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc'</span>,
        <span class="hljs-attr">complete</span>:<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
          <span class="hljs-built_in">console</span>.log(that.data.jobs);
          <span class="hljs-keyword">var</span> jobs = that.data.jobs.concat(res.data.data.jobs)
         that.setData({
            <span class="hljs-attr">jobs</span>:jobs,
          })
        },
      })
    },<span class="hljs-number">1000</span>);
   
  },</code></pre>
<p>仔细看看，发现并没有逻辑错误，我思前想后，觉得有可能是函数多次触发导致的，于是我在函数的开始加入 console.log('下拉加载');在调试器中，我发现下拉刷新也是跟着出现了2次，为了更加保险，我在page外定义了一个var i = 1；并在函数外面加上了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(i!=1){
     return
 }i++;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">if</span>(i!=<span class="hljs-number">1</span>){
     <span class="hljs-keyword">return</span>
 }i++;</code></pre>
<p>再次测试，发现只出现了一组数据，由此我确定了这个bug是由于下拉刷新触发过多的原因。但是怎么解决呢，我想了想，觉得可以用一个锁，把这个函数锁起来，等函数执行完毕，在把函数打开。<br>修改后的函数如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data: {
    jobs:[],
    windowHeigt:0,
    pullUpAllow:true,
    pullLowAllow:true
  },
lower:function(){
    var that = this;
    if(that.data.pullLowAllow) {        //确定开关的开启与否
      that.setData({
        pullLowAllow:false              //关闭开关
      })
       console.log('下拉加载');
      wx.showToast({
        title:'加载中',
        icon:'loading',
        duration: 1000,
      });
      setTimeout(function(){
        wx.showToast({
          title:'加载成功',
          icon:'success',
          duration:1000,
        });
        wx.request({
          url:'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc',
          complete:(res)=>{
            console.log(that.data.jobs);
            var jobs = that.data.jobs.concat(res.data.data.jobs)
          that.setData({
              jobs:jobs,
              pullLowAllow:true            //加载完毕，开启开关
            })
          },
        })
      },1000);
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  data: {
    <span class="hljs-attr">jobs</span>:[],
    <span class="hljs-attr">windowHeigt</span>:<span class="hljs-number">0</span>,
    <span class="hljs-attr">pullUpAllow</span>:<span class="hljs-literal">true</span>,
    <span class="hljs-attr">pullLowAllow</span>:<span class="hljs-literal">true</span>
  },
<span class="hljs-attr">lower</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">if</span>(that.data.pullLowAllow) {        <span class="hljs-comment">//确定开关的开启与否</span>
      that.setData({
        <span class="hljs-attr">pullLowAllow</span>:<span class="hljs-literal">false</span>              <span class="hljs-comment">//关闭开关</span>
      })
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'下拉加载'</span>);
      wx.showToast({
        <span class="hljs-attr">title</span>:<span class="hljs-string">'加载中'</span>,
        <span class="hljs-attr">icon</span>:<span class="hljs-string">'loading'</span>,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">1000</span>,
      });
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        wx.showToast({
          <span class="hljs-attr">title</span>:<span class="hljs-string">'加载成功'</span>,
          <span class="hljs-attr">icon</span>:<span class="hljs-string">'success'</span>,
          <span class="hljs-attr">duration</span>:<span class="hljs-number">1000</span>,
        });
        wx.request({
          <span class="hljs-attr">url</span>:<span class="hljs-string">'https://www.easy-mock.com/mock/5a24075682614c0dc1bf0997/abc/abc'</span>,
          <span class="hljs-attr">complete</span>:<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(that.data.jobs);
            <span class="hljs-keyword">var</span> jobs = that.data.jobs.concat(res.data.data.jobs)
          that.setData({
              <span class="hljs-attr">jobs</span>:jobs,
              <span class="hljs-attr">pullLowAllow</span>:<span class="hljs-literal">true</span>            <span class="hljs-comment">//加载完毕，开启开关</span>
            })
          },
        })
      },<span class="hljs-number">1000</span>);
    }
  },</code></pre>
<p>结果：<br><span class="img-wrap"><img data-src="/img/bVZ0oy?w=424&amp;h=180" src="https://static.alili.tech/img/bVZ0oy?w=424&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里</p>
<h2 id="articleHeader4">项目展示</h2>
<p>在最后，也把我辛苦Coding了N天的项目展示一下给大家吧<br>（由于一开始选题的失败，并没有完成什么重要的功能，大家就别说出来了T-T）</p>
<ul><li>底部tabBar切换</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVZ01u?w=416&amp;h=733" src="https://static.alili.tech/img/bVZ01u?w=416&amp;h=733" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>图片轮播与界面切换</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVZ00Y?w=416&amp;h=733" src="https://static.alili.tech/img/bVZ00Y?w=416&amp;h=733" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul><li>点击事件</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVZ01P?w=416&amp;h=733" src="https://static.alili.tech/img/bVZ01P?w=416&amp;h=733" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul><li>下拉刷新与上拉刷新</li></ul>
<p><span class="img-wrap"><img data-src="/img/bVZ02v?w=416&amp;h=761" src="https://static.alili.tech/img/bVZ02v?w=416&amp;h=761" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">总结</h2>
<ul>
<li>要熟读微信小程序官方文档,勤用小程序自带的API，可以节省很多时间和精力</li>
<li>阿里巴巴的iconfont是真的好用，很多图标都可以在上面下载，不仅有png版还有svg版</li>
<li>Easy Mock 可以建立一个假后台，对于我们学习小程序有很大的帮助</li>
<li>weui框架对小程序有很大的帮助</li>
</ul>
<h2 id="articleHeader6">项目地址</h2>
<p><a href="https://github.com/fsafafaf/daojuchen" rel="nofollow noreferrer" target="_blank">https://github.com/fsafafaf/d...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序的数据绑定与下拉刷新与template模块使用问题

## 原文链接
[https://segmentfault.com/a/1190000012358393](https://segmentfault.com/a/1190000012358393)

