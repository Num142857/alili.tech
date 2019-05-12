---
title: '小程序练习，仿bilibili小程序' 
date: 2019-01-06 2:30:10
hidden: true
slug: du7y0fu7qk
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">微信小程序学习 &nbsp;仿哔哩哔哩制作的小程序（待完善）</h1>
<h2 id="articleHeader1">项目预览图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010418829" src="https://static.alili.tech/img/remote/1460000010418829" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">小程序？大改变？</h2>
<p>之前就被朋友安利使用小程序，最近接近了小程序，发现了它竟然带来了一场“大革命”。<br>简单说，它就是一个可以实现之前只能是原生态APP可以实现的效果和功能。比如说，一些酷炫的页面与转场，一些可以直接和手机硬件交互的功能，录音啊，拍视频啊，调用手机的重力感应啊，GPS啊等等。<br>专业点来说，是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或搜一下即可打开应用。<br>小程序的轻量化带来了app所不具有的许多优点，它同时也在向着我们的日常app“宣战”，这场战争花落谁家，就让我们拭目以待吧。</p>
<h2 id="articleHeader3">制作简单？</h2>
<p>小程序作为一颗冉冉升起的新星，他之所以能被大家接受，不仅仅是因为他的轻量化，脱去了app的繁重外壳，还因为他很容易上手。在经过几天时间去熟悉小程序的构建和说明文档等，我这种初学者也能慢慢地摸到小程序的门槛，进入小程序这个新世界，完成自己的构思。</p>
<h2 id="articleHeader4">我们能做什么？</h2>
<p>作为一个二次元爱好者（别看着我，我当然不是死宅(ノ=Д=)ノ┻━┻），使用最多的app当然就是我大b站了（哔哩哔哩 (゜-゜)つロ 干杯~-bilibili），所以应着自己的爱好，尝试着制作了一个哔哩哔哩的小程序，途中简直是经历了千难万险，最后因为能力问题只是制作了一个半成品，尚有很多功能尚未实现，但是我是有梦想的人，之后还是要多学习，将它慢慢完善，这次就当交流，大家互相学习（｡ò ∀ ó｡）</p>
<h2 id="articleHeader5">项目工具及文档</h2>
<ol>
<li>
<strong>微信web开发者工具：</strong><a href="https://mp.weixin.qq.com/debug/wxadoc/dev/" rel="nofollow noreferrer" target="_blank">微信小程序官网</a> 微信开发的小程序编辑软件，下载安装即可使用；</li>
<li>
<strong>开发文档：</strong><a href="https://www.w3cschool.cn/weixinapp/9wou1q8j.html" rel="nofollow noreferrer" target="_blank">微信小程序宝典秘籍</a> 这里面详细的介绍了小程序的各种信息，包括组件、框架、API等等，有很多值得我们去阅读的信息；</li>
<li>
<strong>图标库：</strong> <a href="http://www.iconfont.cn/" rel="nofollow noreferrer" target="_blank">Iconfont-阿里巴巴矢量图标库</a> 这个是网站简直是神器，什么图标都能找到，我很喜欢。</li>
</ol>
<h2 id="articleHeader6">目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── app.js
├── app.json
├── app.wxss
├── utils
│   └── util.js
├── pages
│&nbsp;&nbsp; ├── common
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── header.wxml
│&nbsp;&nbsp; │&nbsp;&nbsp; └── item.wxml
│&nbsp;&nbsp; ├── index
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.wxml
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.wxss
│&nbsp;&nbsp; ├── selectColor
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── selectColor.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── selectColor.wxml
│&nbsp;&nbsp; │&nbsp;&nbsp; └── selectColor.wxss
│&nbsp;&nbsp; ├── play
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── play.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── play.json
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── play.wxml
│&nbsp;&nbsp; │&nbsp;&nbsp; └── play.wxss
└── resources
  &nbsp; └── images
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── app<span class="hljs-selector-class">.js</span>
├── app<span class="hljs-selector-class">.json</span>
├── app<span class="hljs-selector-class">.wxss</span>
├── utils
│   └── util<span class="hljs-selector-class">.js</span>
├── pages
│&nbsp;&nbsp; ├── common
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.wxml</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── item<span class="hljs-selector-class">.wxml</span>
│&nbsp;&nbsp; ├── index
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.wxml</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.wxss</span>
│&nbsp;&nbsp; ├── selectColor
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── selectColor<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── selectColor<span class="hljs-selector-class">.wxml</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── selectColor<span class="hljs-selector-class">.wxss</span>
│&nbsp;&nbsp; ├── play
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── play<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── play<span class="hljs-selector-class">.json</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── play<span class="hljs-selector-class">.wxml</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── play<span class="hljs-selector-class">.wxss</span>
└── resources
  &nbsp; └── images
    </code></pre>
<h4>页面注册</h4>
<h4>app.json</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;pages&quot;:[
        &quot;pages/index/index&quot;,
        &quot;pages/play/play&quot;,    
        &quot;pages/selectColor/selectColor&quot;
      ],
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>    <span class="hljs-string">"pages"</span>:[
        <span class="hljs-string">"pages/index/index"</span>,
        <span class="hljs-string">"pages/play/play"</span>,    
        <span class="hljs-string">"pages/selectColor/selectColor"</span>
      ],
</code></pre>
<h2 id="articleHeader7">项目功能</h2>
<h4>已实现功能：</h4>
<ul>
<li>广告轮播图</li>
<li>视频播放</li>
<li>弹幕功能</li>
<li>弹窗功能</li>
<li>分享功能</li>
</ul>
<h4>未实现功能：</h4>
<p>这个有点多。。。毕竟是我大B站，目前只实现了一些力所能及的功能，以后会完善的。</p>
<h2 id="articleHeader8">部分功能实现</h2>
<h4>顶部导航栏</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       <scroll-view class=&quot;scroll-view_H&quot; scroll-x=&quot;true&quot; style=&quot;width: 100%&quot;>
         <text wx:for=&quot;"{{"section"}}"&quot; wx:key=&quot;id&quot; id=&quot;"{{"item.id"}}"&quot; catchtap=&quot;handleTap&quot;
               class=&quot;nav-name "{{"item.id == currentId ? 'nav-hover' : ''"}}"&quot;
               style=&quot; padding-right:"{{"topdistance"}}"px;padding-left:"{{"topdistance"}}"px&quot;>"{{"item.name"}}"</text>
       </scroll-view>
     </view>
   </view>
   <block wx:if=&quot;"{{"currentId == 1001"}}"&quot;>
   <view class=&quot;slider-wrapper&quot;>
   <swiper indicator-dots=&quot;"{{"indicatorDots"}}"&quot; autoplay=&quot;"{{"autoplay"}}"&quot;
      interval=&quot;"{{"interval"}}"&quot; duration=&quot;"{{"duration"}}"&quot; indicator-active-color=&quot;#EA6CAF&quot;>
         <block wx:for=&quot;"{{"imgUrls"}}"&quot;>
           <swiper-item>
              <navigator url=&quot;"{{"item.link"}}"&quot; hover-class=&quot;navigator-hover&quot;>
               <image src=&quot;"{{"item.url"}}"&quot; class=&quot;slide-image&quot; width=&quot;355&quot; height=&quot;150&quot; />
              </navigator>
           </swiper-item>
         </block>
   </swiper>
 </view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">       <span class="hljs-tag">&lt;<span class="hljs-name">scroll-view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"scroll-view_H"</span> <span class="hljs-attr">scroll-x</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"section"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">"id"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.id"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">catchtap</span>=<span class="hljs-string">"handleTap"</span>
               <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-name </span></span></span><span class="hljs-template-variable">"{{"item.id == currentId ? 'nav-hover' : ''"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>
               <span class="hljs-attr">style</span>=<span class="hljs-string">" padding-right:</span></span></span><span class="hljs-template-variable">"{{"topdistance"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">px;padding-left:</span></span></span><span class="hljs-template-variable">"{{"topdistance"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">px"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">scroll-view</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:if</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"currentId == 1001"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-wrapper"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">indicator-dots</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"indicatorDots"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">autoplay</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"autoplay"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>
      <span class="hljs-attr">interval</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"interval"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">duration</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"duration"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">indicator-active-color</span>=<span class="hljs-string">"#EA6CAF"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"imgUrls"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">swiper-item</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">navigator</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.link"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">hover-class</span>=<span class="hljs-string">"navigator-hover"</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"item.url"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slide-image"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"355"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"150"</span> /&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">navigator</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-item</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setTopDistance();
    this.setData({
      stagePoint: util.stagePoint()
    })
    if (this.data.currentId == 1001) {
      this.Page();
    }
    else if (this.data.currentId == 1004) {
      this.channelPage();
    }
    else if (this.data.currentId == 1003) {
      this.livePage();
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> onLoad: function (options) {
    <span class="hljs-comment">// 页面初始化 options为页面跳转所带来的参数</span>
    <span class="hljs-keyword">this</span>.setTopDistance();
    <span class="hljs-keyword">this</span>.setData({
      stagePoint: util.stagePoint()
    })
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>.currentId == <span class="hljs-number">1001</span>) {
      <span class="hljs-keyword">this</span>.Page();
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>.currentId == <span class="hljs-number">1004</span>) {
      <span class="hljs-keyword">this</span>.channelPage();
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.<span class="hljs-keyword">data</span>.currentId == <span class="hljs-number">1003</span>) {
      <span class="hljs-keyword">this</span>.livePage();
    }
  }</code></pre>
<p>顶部导航栏实际就是利用scroll-view控件，给他绑定当前页面的id，当触发点击事件时，加载与该id匹配的信息。要注意的是一开始要给currentId一个页面的值，不然无法显示出来。</p>
<h4>弹幕功能</h4>
<p>小程序本身具备弹幕功能，阅读api，对着原版代码进行了一些改变，实现了弹幕自己选择颜色，并且将弹幕和弹出层结合在一起使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Page({
  inputValue: '',
  data: {
    isRandomColor: true,
    src: '',
    numberColor: &quot;#ff0000&quot;,
    danmuList: [{
      text: '这波不亏呀',
      color: '#ff0000',
      time: 1
    }, {
      text: '大神666',
      color: '#00ff00',
      time: 2
    },
    {
      text: '今生无悔入fate',
      color: '#D9D919',
      time: 3
    },
    {
      text: '吾王赛高（｡ò ∀ ó｡）',
      color: '#C0D9D9',
      time: 4
    }
    ],
    showModalStatus: false
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: &quot;linear&quot;, //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停 
    animation.translateY(240).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画：Y轴不偏移，停 
      animation.translateY(0).step()
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭抽屉 
      if (currentStatu == &quot;close&quot;) {
        wx.createVideoContext('myVideo').play();
        this.setData(
          {
            showModalStatus: false,
          }
        );
      }
    }.bind(this), 200)

    // 显示抽屉 
    if (currentStatu == &quot;open&quot;) {
      wx.createVideoContext('myVideo').pause();
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  onLoad: function onLoad() {
    var _this = this;
    wx.getSystemInfo({
      success: function success(res) {
        // video标签默认宽度300px、高度225px
        var windowWidth = res.windowWidth;
        var videoHeight = 225 / 300 * windowWidth;
        _this.setData({
          videoWidth: windowWidth,
          videoHeight: videoHeight
        });
      }
    });
  },
  onReady: function onReady(res) {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  onShow: function onShow() {
    var _this = this;
    wx.getStorage({
      key: 'numberColor',
      success: function success(res) {
        _this.setData({
          numberColor: res.data
        });
      }
    });
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value;
  }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Page({
  inputValue: <span class="hljs-string">''</span>,
  data: {
    isRandomColor: <span class="hljs-literal">true</span>,
    src: <span class="hljs-string">''</span>,
    numberColor: <span class="hljs-string">"#ff0000"</span>,
    danmuList: [{
      text: <span class="hljs-string">'这波不亏呀'</span>,
      color: <span class="hljs-string">'#ff0000'</span>,
      time: <span class="hljs-number">1</span>
    }, {
      text: <span class="hljs-string">'大神666'</span>,
      color: <span class="hljs-string">'#00ff00'</span>,
      time: <span class="hljs-number">2</span>
    },
    {
      text: <span class="hljs-string">'今生无悔入fate'</span>,
      color: <span class="hljs-string">'#D9D919'</span>,
      time: <span class="hljs-number">3</span>
    },
    {
      text: <span class="hljs-string">'吾王赛高（｡ò ∀ ó｡）'</span>,
      color: <span class="hljs-string">'#C0D9D9'</span>,
      time: <span class="hljs-number">4</span>
    }
    ],
    showModalStatus: <span class="hljs-literal">false</span>
  },
  powerDrawer: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span> </span>{
    <span class="hljs-keyword">var</span> currentStatu = e.currentTarget.dataset.statu;
    <span class="hljs-keyword">this</span>.util(currentStatu)
  },
  util: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(currentStatu)</span> </span>{
    <span class="hljs-comment">/* 动画部分 */</span>
    <span class="hljs-comment">// 第1步：创建动画实例 </span>
    <span class="hljs-keyword">var</span> animation = wx.createAnimation({
      duration: <span class="hljs-number">200</span>, <span class="hljs-comment">//动画时长 </span>
      timingFunction: <span class="hljs-string">"linear"</span>, <span class="hljs-comment">//线性 </span>
      delay: <span class="hljs-number">0</span> <span class="hljs-comment">//0则不延迟 </span>
    });

    <span class="hljs-comment">// 第2步：这个动画实例赋给当前的动画实例 </span>
    <span class="hljs-keyword">this</span>.animation = animation;

    <span class="hljs-comment">// 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停 </span>
    animation.translateY(<span class="hljs-number">240</span>).step();

    <span class="hljs-comment">// 第4步：导出动画对象赋给数据对象储存 </span>
    <span class="hljs-keyword">this</span>.setData({
      animationData: animation.export()
    })

    <span class="hljs-comment">// 第5步：设置定时器到指定时候后，执行第二组动画 </span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// 执行第二组动画：Y轴不偏移，停 </span>
      animation.translateY(<span class="hljs-number">0</span>).step()
      <span class="hljs-comment">// 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 </span>
      <span class="hljs-keyword">this</span>.setData({
        animationData: animation
      })

      <span class="hljs-comment">//关闭抽屉 </span>
      <span class="hljs-keyword">if</span> (currentStatu == <span class="hljs-string">"close"</span>) {
        wx.createVideoContext(<span class="hljs-string">'myVideo'</span>).play();
        <span class="hljs-keyword">this</span>.setData(
          {
            showModalStatus: <span class="hljs-literal">false</span>,
          }
        );
      }
    }.bind(<span class="hljs-keyword">this</span>), <span class="hljs-number">200</span>)

    <span class="hljs-comment">// 显示抽屉 </span>
    <span class="hljs-keyword">if</span> (currentStatu == <span class="hljs-string">"open"</span>) {
      wx.createVideoContext(<span class="hljs-string">'myVideo'</span>).pause();
      <span class="hljs-keyword">this</span>.setData(
        {
          showModalStatus: <span class="hljs-literal">true</span>
        }
      );
    }
  },
  onLoad: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onLoad</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    wx.getSystemInfo({
      success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span><span class="hljs-params">(res)</span> </span>{
        <span class="hljs-comment">// video标签默认宽度300px、高度225px</span>
        <span class="hljs-keyword">var</span> windowWidth = res.windowWidth;
        <span class="hljs-keyword">var</span> videoHeight = <span class="hljs-number">225</span> / <span class="hljs-number">300</span> * windowWidth;
        _this.setData({
          videoWidth: windowWidth,
          videoHeight: videoHeight
        });
      }
    });
  },
  onReady: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onReady</span><span class="hljs-params">(res)</span> </span>{
    <span class="hljs-keyword">this</span>.videoContext = wx.createVideoContext(<span class="hljs-string">'myVideo'</span>);
  },
  onShow: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onShow</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    wx.getStorage({
      key: <span class="hljs-string">'numberColor'</span>,
      success: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span><span class="hljs-params">(res)</span> </span>{
        _this.setData({
          numberColor: res.data
        });
      }
    });
  },
  bindInputBlur: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(e)</span> </span>{
    <span class="hljs-keyword">this</span>.inputValue = e.detail.value;
  }
  }
})</code></pre>
<p>参考了开源代码后，发现弹幕其实就是对字进行动画效果，沿着y轴滚动出现，利用计时器不停播放多组动画，抽屉效果也就是对遮罩层的利用，然后利用动画效果，将弹出栏显示出来，在制作时，记得让视频暂停，这样才能给用户一个好的体验，毕竟没有人想错过一部精彩的视频(￣y▽￣)~</p>
<h4>分享功能</h4>
<p>其实也是对api的一种利用，（这里强调一下，api真的很重要，喜欢大家好好阅读），微信小程序也是前段时间才可以通过按钮实现分享功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onShareAppMessage: function onShareAppMessage() {
    wx.createVideoContext('myVideo').pause();
    return {
      title: '【Fate全系列】英灵乱斗: 夺回未来的战争「Grand Order」',
      desc: '【Fate全系列】英灵乱斗: 夺回未来的战争「Grand Order」',
      path: '/pages/play/play',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
          wx.createVideoContext('myVideo').play();       
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
          wx.createVideoContext('myVideo').play();
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">onShareAppMessage</span>: function onShareAppMessage() {
    wx.createVideoContext(<span class="hljs-string">'myVideo'</span>).pause();
    <span class="hljs-selector-tag">return</span> {
      <span class="hljs-attribute">title</span>: <span class="hljs-string">'【Fate全系列】英灵乱斗: 夺回未来的战争「Grand Order」'</span>,
      <span class="hljs-attribute">desc</span>: <span class="hljs-string">'【Fate全系列】英灵乱斗: 夺回未来的战争「Grand Order」'</span>,
      <span class="hljs-attribute">path</span>: <span class="hljs-string">'/pages/play/play'</span>,
      <span class="hljs-attribute">success</span>: function (res) {
        <span class="hljs-comment">// 转发成功</span>
        wx.showToast({
          <span class="hljs-attribute">title</span>: <span class="hljs-string">'成功'</span>,
          <span class="hljs-attribute">icon</span>: <span class="hljs-string">'succes'</span>,
          <span class="hljs-attribute">duration</span>: <span class="hljs-number">1000</span>,
          <span class="hljs-attribute">mask</span>: true
        })
          wx.createVideoContext(<span class="hljs-string">'myVideo'</span>).play();       
      },
      <span class="hljs-attribute">fail</span>: function (res) {
        <span class="hljs-comment">// 转发失败</span>
        wx.showToast({
          <span class="hljs-attribute">title</span>: <span class="hljs-string">'失败'</span>,
          <span class="hljs-attribute">icon</span>: <span class="hljs-string">'fail'</span>,
          <span class="hljs-attribute">duration</span>: <span class="hljs-number">1000</span>,
          <span class="hljs-attribute">mask</span>: true
        })
          wx.createVideoContext(<span class="hljs-string">'myVideo'</span>).play();
      }
    }
  }</code></pre>
<p>&nbsp;这是我的写法，下面给出api内容，可以根据不同人的想法进行修改。</p>
<h4>分享api格式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" onShareAppMessage: function () {
   return {
     title: '自定义分享标题',
     path: '/page/user?id=123'
   }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> onShareAppMessage: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
   <span class="hljs-keyword">return</span> {
     title: <span class="hljs-string">'自定义分享标题'</span>,
     path: <span class="hljs-string">'/page/user?id=123'</span>
   }
 }</code></pre>
<p>但是这个id很多人不明白是什么id，之前我也不明白，后来发现这个id就是你要分享的这篇文章的id，但是一定要注意异步与同步的问题。</p>
<h2 id="articleHeader9">踩过的坑&lt;(｀^´)&gt;</h2>
<p>1.微信小程序的编译包是不能超过2M的，一开始放了一大堆的本地图片，结果打包的时候，告诉我太大了，无奈下想办法将图片上传到云端，将图片链接化；<br> 2.再次强调，小程序api很重要，里面包含了很多知识，我的弹幕功能也是后来查找时发现了api，这可以让我们少走很多弯路；<br> 3.重要的事情说三遍，页面内跳转不能超过5级，页面内跳转不能超过5级，页面内跳转不能超过5级。_(:з」∠)_</p>
<h2 id="articleHeader10">项目地址</h2>
<p><a href="https://github.com/wuyangshu/bilibili" rel="nofollow noreferrer" target="_blank">https://github.com/wuyangshu/...</a></p>
<h2 id="articleHeader11">最后要说的话</h2>
<p>现在的自己技术还是有些不太成熟，接触小程序不久，还有很多需要学习的地方，不能很好的重现哔哩哔哩的功能，不过作为一个学生，还有很长的学习之路要走。<br> 最后希望能得到各位在求学路上同行的小伙伴的小星星⭐，谢谢(´∀｀)♡</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小程序练习，仿bilibili小程序

## 原文链接
[https://segmentfault.com/a/1190000010418824](https://segmentfault.com/a/1190000010418824)

