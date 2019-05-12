---
title: '小程序TAB列表切换内容动态变化，scrollview高度根据内容动态获取' 
date: 2018-12-30 2:30:10
hidden: true
slug: gj5oro3w0ca
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">滑动tab选项卡</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="一、在小程序里面tab选项卡是用的是自带的swiper组件，下面直接上代码
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>一、在小程序里面<span class="hljs-literal">tab</span>选项卡是用的是自带的swiper组件，下面直接上代码
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <view class=&quot;container&quot;>
  <view class=&quot;tab&quot;>
    <view class=&quot;tab-list "{{"currentTab==0? 'active':''"}}"&quot; data-current=&quot;0&quot; bindtap='switchNav'>运动专区</view>
    <view class=&quot;tab-list "{{"currentTab==1? 'active':''"}}"&quot; data-current=&quot;1&quot; bindtap='switchNav'>美食专区</view>
  </view>
  <swiper current='"{{"currentTab"}}"' class=&quot;swiper-box&quot; duration='300' bindchange='bindChange' style=&quot;height: "{{"clientHeight?clientHeight+'px':'auto'"}}"&quot;>
  <!--运动专区  -->
  <swiper-item class=&quot;swiper-content&quot;>
    <scroll-view scroll-y=&quot;"{{"true"}}"&quot; style=&quot;height: "{{"clientHeight?clientHeight+'px':'auto'"}}"&quot;>
      <block wx:for=&quot;"{{"video"}}"&quot; wx:key=&quot;video&quot;>
      <!-- <template name=&quot;video-detail&quot;> -->
        <view class=&quot;video-detail-list&quot;>
          <view class=&quot;original&quot;>
            <text class=&quot;original-name&quot;>"{{"original"}}"</text>
            <view class=&quot;original-video&quot;>
              <video src=&quot;"{{"item.url"}}"&quot;></video>
            </view>
            <view class=&quot;original-video-explain&quot;>
                <text class=&quot;original-video-date&quot;>"{{"item.addtime"}}"</text>
                <text class=&quot;original-video-name&quot;>"{{"item.title"}}"</text>
                <view class=&quot;original-video-detail&quot;>
                  <text>"{{"originalContent"}}"</text>
                </view>
            </view>
          </view>
        </view>
      </block>
    </scroll-view> 
  </swiper-item>

<!--美食专区  -->
    <swiper-item class=&quot;swiper-content&quot;>
      <scroll-view scroll-y=&quot;"{{"true"}}"&quot; style=&quot;height: "{{"clientHeight?clientHeight+'px':'auto'"}}"&quot;>
        <block wx:for=&quot;"{{"video"}}"&quot; wx:key=&quot;video&quot;>
          <view class=&quot;video-detail-list&quot;>
            <view class=&quot;original&quot;>
              <text class=&quot;original-name&quot;>"{{"original"}}"</text>
              <view class=&quot;original-video&quot;>
                <video src=&quot;"{{"item.url"}}"&quot;></video>
              </view>
              <view class=&quot;original-video-explain&quot;>
                  <text class=&quot;original-video-date&quot;>"{{"item.addtime"}}"</text>
                  <text class=&quot;original-video-name&quot;>"{{"item.title"}}"</text>
                  <view class=&quot;original-video-detail&quot;>
                    <text>"{{"originalContent"}}"</text>
                  </view>
              </view>
            </view>
          </view>
        </block>
      </scroll-view> 
    </swiper-item>
  </swiper>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-list </span></span></span><span class="hljs-template-variable">"{{"currentTab==0? 'active':''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">data-current</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">'switchNav'</span>&gt;</span>运动专区<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tab-list </span></span></span><span class="hljs-template-variable">"{{"currentTab==1? 'active':''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">data-current</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">'switchNav'</span>&gt;</span>美食专区<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">current</span>=<span class="hljs-string">'</span></span></span><span class="hljs-template-variable">"{{"currentTab"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">'</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-box"</span> <span class="hljs-attr">duration</span>=<span class="hljs-string">'300'</span> <span class="hljs-attr">bindchange</span>=<span class="hljs-string">'bindChange'</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height: </span></span></span><span class="hljs-template-variable">"{{"clientHeight?clientHeight+'px':'auto'"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
  <span class="hljs-comment">&lt;!--运动专区  --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">swiper-item</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">scroll-view</span> <span class="hljs-attr">scroll-y</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"true"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height: </span></span></span><span class="hljs-template-variable">"{{"clientHeight?clientHeight+'px':'auto'"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"video"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"video"</span>&gt;</span>
      <span class="hljs-comment">&lt;!-- &lt;template name="video-detail"&gt; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"video-detail-list"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-name"</span>&gt;</span></span><span class="hljs-template-variable">"{{"original"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.url"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-explain"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-date"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.addtime"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-name"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-detail"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"originalContent"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">scroll-view</span>&gt;</span> 
  <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-item</span>&gt;</span>

<span class="hljs-comment">&lt;!--美食专区  --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper-item</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-content"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">scroll-view</span> <span class="hljs-attr">scroll-y</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"true"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height: </span></span></span><span class="hljs-template-variable">"{{"clientHeight?clientHeight+'px':'auto'"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"video"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"video"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"video-detail-list"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original"</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-name"</span>&gt;</span></span><span class="hljs-template-variable">"{{"original"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.url"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-explain"</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-date"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.addtime"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-name"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"original-video-detail"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span></span><span class="hljs-template-variable">"{{"originalContent"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
                  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">scroll-view</span>&gt;</span> 
    <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-item</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ps:大家都知道小程序是不能操作DOM的，所以这里用getSystemInfo获取设备高度,scrollview在这里是一个内嵌的框架，列表在框架内滚动，它的高度其实就是屏幕的高度，不是里边列表项目的高度，
所以这里设置max-height等都是无效的。



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>ps:大家都知道小程序是不能操作DOM的，所以这里用getSystemInfo获取设备高度,scrollview在这里是一个内嵌的框架，列表在框架内滚动，它的高度其实就是屏幕的高度，不是里边列表项目的高度，
所以这里设置<span class="hljs-built_in">max</span>-<span class="hljs-built_in">height</span>等都是无效的。



</code></pre>
<p>样式代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container{
  width:100%;
  height: 100%; 
  background:#eee;
}

/*tab切换导航 */
.tab{
  width: 100%;
  color:#666666;
  height: 70rpx;
  font-size:28rpx;
  display: inline-block;
  text-align: center;
  background: #fff;
}
.tab-list{
  height: 70rpx;
  line-height: 70rpx;
  width: 50%;
  display: inline-block;
  z-index: 1000;
}
.active{
  border-bottom:4rpx solid #FD9D80;
}
.swiper-box{
  width: 100%;
  max-height:9999px; 
  display: block;
}


.video-detail-list{
  margin-top:16rpx;
  width:100%;
  background: #fff;

}
.video-detail-list .original-name{
   height: 80rpx;
   line-height: 80rpx; 
  text-align: center;
  display: block;
  font-size:28rpx;
}
.original-name{
  color:#999999;
}
.original-video{
  text-align: center;
}
.original-video video{
  width: 640rpx;
}
.original-video video{
  border-radius:16rpx;
}
.original-video-explain{
  width: 640rpx;
  margin-left:50rpx;
}
.original-video-date{
  font-size:28rpx;
  color:#6C6C6C;
}
.original-video-date text{
  display: inline-block;
}
.original-video-name{
  text-align: center;
  width: 55%;
  margin-top:8rpx;
  float:right;
  font-size:28rpx;
  color:#6C6C6C;
  overflow: hidden;  /* 超出自动隐藏 */
  text-overflow:ellipsis;  /* 文字隐藏后添加省略号 */
  white-space:nowrap;    /*  强制不换行 */
}
.original-video-detail{
  color:#A1A1A1;
  height: 30rpx;
  font-size:20rpx;
  /* margin-top:-10rpx; */
  
}
.original-video-detail text{
    width: 100%;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    overflow: hidden;
    text-overflow:ellipsis;
    color:#666;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.container</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; 
  <span class="hljs-attribute">background</span>:<span class="hljs-number">#eee</span>;
}

<span class="hljs-comment">/*tab切换导航 */</span>
<span class="hljs-selector-class">.tab</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#666666</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">70</span>rpx;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">28</span>rpx;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.tab-list</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">70</span>rpx;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">70</span>rpx;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1000</span>;
}
<span class="hljs-selector-class">.active</span>{
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">4</span>rpx solid <span class="hljs-number">#FD9D80</span>;
}
<span class="hljs-selector-class">.swiper-box</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">max-height</span>:<span class="hljs-number">9999px</span>; 
  <span class="hljs-attribute">display</span>: block;
}


<span class="hljs-selector-class">.video-detail-list</span>{
  <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">16</span>rpx;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;

}
<span class="hljs-selector-class">.video-detail-list</span> <span class="hljs-selector-class">.original-name</span>{
   <span class="hljs-attribute">height</span>: <span class="hljs-number">80</span>rpx;
   <span class="hljs-attribute">line-height</span>: <span class="hljs-number">80</span>rpx; 
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">28</span>rpx;
}
<span class="hljs-selector-class">.original-name</span>{
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#999999</span>;
}
<span class="hljs-selector-class">.original-video</span>{
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.original-video</span> <span class="hljs-selector-tag">video</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">640</span>rpx;
}
<span class="hljs-selector-class">.original-video</span> <span class="hljs-selector-tag">video</span>{
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">16</span>rpx;
}
<span class="hljs-selector-class">.original-video-explain</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">640</span>rpx;
  <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">50</span>rpx;
}
<span class="hljs-selector-class">.original-video-date</span>{
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">28</span>rpx;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#6C6C6C</span>;
}
<span class="hljs-selector-class">.original-video-date</span> <span class="hljs-selector-tag">text</span>{
  <span class="hljs-attribute">display</span>: inline-block;
}
<span class="hljs-selector-class">.original-video-name</span>{
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">55%</span>;
  <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">8</span>rpx;
  <span class="hljs-attribute">float</span>:right;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">28</span>rpx;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#6C6C6C</span>;
  <span class="hljs-attribute">overflow</span>: hidden;  <span class="hljs-comment">/* 超出自动隐藏 */</span>
  <span class="hljs-attribute">text-overflow</span>:ellipsis;  <span class="hljs-comment">/* 文字隐藏后添加省略号 */</span>
  <span class="hljs-attribute">white-space</span>:nowrap;    <span class="hljs-comment">/*  强制不换行 */</span>
}
<span class="hljs-selector-class">.original-video-detail</span>{
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#A1A1A1</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">30</span>rpx;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20</span>rpx;
  <span class="hljs-comment">/* margin-top:-10rpx; */</span>
  
}
<span class="hljs-selector-class">.original-video-detail</span> <span class="hljs-selector-tag">text</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">word-break</span>: break-all;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">-webkit-line-clamp</span>:<span class="hljs-number">3</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">text-overflow</span>:ellipsis;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#666</span>;
}</code></pre>
<p>js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var videoUrl = 'http://t.jingduhealth.com/index/xcsvideo'
var app = getApp()
Page({
  data: {
    true:true,
    video:[],
    winWidth: 0,
    winHeight: 0, 
    currentTab: 0,  // tab切换 
  },
  //tab导航条切换事件
  bindChange:function(e){
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  switchNav:function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current){
      return false;
    }else{
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: function () {
    var that = this;
    //进入页面显示正在加载的图标
    wx.showToast({
      title: '正在加载中...',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url:videoUrl,
      data:{},
      header:{
        'ContentType':'application/json'
      },
      success: function (res){
        //获取到数据后隐藏正在加载图标
        wx.hideLoading();
        console.log(res.data)
        that.setData({
            video:res.data.slice(0,2)  //获取的数据截取数组下标0-2的数据
        })
      }
    })

    //获取系统信息
    wx.getSystemInfo({
      success:function(res){
        that.setData({
          clientHeight: res.windowHeight   //设备的高度等于scroll-view内容的高度
        })
      }
    })
  }
})
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> videoUrl = <span class="hljs-string">'http://t.jingduhealth.com/index/xcsvideo'</span>
<span class="hljs-keyword">var</span> app = getApp()
Page({
  data: {
    <span class="hljs-literal">true</span>:<span class="hljs-literal">true</span>,
    video:[],
    winWidth: <span class="hljs-number">0</span>,
    winHeight: <span class="hljs-number">0</span>, 
    currentTab: <span class="hljs-number">0</span>,  <span class="hljs-comment">// tab切换 </span>
  },
  <span class="hljs-comment">//tab导航条切换事件</span>
  bindChange:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    that.setData({
      currentTab: e.detail.current
    })
  },
  switchNav:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span></span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.data.currentTab === e.target.dataset.current){
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }<span class="hljs-keyword">else</span>{
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">//进入页面显示正在加载的图标</span>
    wx.showToast({
      title: <span class="hljs-string">'正在加载中...'</span>,
      icon: <span class="hljs-string">'loading'</span>,
      duration: <span class="hljs-number">10000</span>
    })
    wx.request({
      url:videoUrl,
      data:{},
      header:{
        <span class="hljs-string">'ContentType'</span>:<span class="hljs-string">'application/json'</span>
      },
      success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(res)</span></span>{
        <span class="hljs-comment">//获取到数据后隐藏正在加载图标</span>
        wx.hideLoading();
        console.log(res.data)
        that.setData({
            video:res.data.slice(<span class="hljs-number">0</span>,<span class="hljs-number">2</span>)  <span class="hljs-comment">//获取的数据截取数组下标0-2的数据</span>
        })
      }
    })

    <span class="hljs-comment">//获取系统信息</span>
    wx.getSystemInfo({
      success:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span></span>{
        that.setData({
          clientHeight: res.windowHeight   <span class="hljs-comment">//设备的高度等于scroll-view内容的高度</span>
        })
      }
    })
  }
})
 </code></pre>
<h3 id="articleHeader1">成功后的截图</h3>
<p><span class="img-wrap"><img data-src="/img/bVVKST?w=375&amp;h=668" src="https://static.alili.tech/img/bVVKST?w=375&amp;h=668" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小程序TAB列表切换内容动态变化，scrollview高度根据内容动态获取

## 原文链接
[https://segmentfault.com/a/1190000011342605](https://segmentfault.com/a/1190000011342605)

