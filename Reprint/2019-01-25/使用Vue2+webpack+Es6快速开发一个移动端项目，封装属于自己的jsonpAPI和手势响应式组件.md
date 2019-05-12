---
title: '使用Vue2+webpack+Es6快速开发一个移动端项目，封装属于自己的jsonpAPI和手势响应式组件' 
date: 2019-01-25 2:30:23
hidden: true
slug: n2smulswod
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-1849aa83e2decf56.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-1849aa83e2decf56.gif?imageMogr2/auto-orient/strip" alt="test.gif" title="test.gif" style="cursor: pointer; display: inline;"></span></p>
<h4>导语</h4>
<h5>最近看到不少使用vue制作的音乐播放器，挺好玩的，本来工作中也经常使用Vue，一起交流学习，好的话点个star哦</h5>
<blockquote>
<p>本项目特点如下 ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 原生js封装自己的跨域请求函数，支持promise调用，支持错误处理
2. 制作一些复用性强的vue组件，如轮播图组件，支持手势滑动，无限循环，图片按需加载
3. 清晰明了的项目目录
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>原生js封装自己的跨域请求函数，支持promise调用，支持错误处理
<span class="hljs-bullet">2. </span>制作一些复用性强的vue组件，如轮播图组件，支持手势滑动，无限循环，图片按需加载
<span class="hljs-bullet">3. </span>清晰明了的项目目录
</code></pre>
</blockquote>
<h3 id="articleHeader0"><a href="https://github.com/derickweng/vue-mymusic" rel="nofollow noreferrer" target="_blank">项目仓库地址</a></h3>
<h3 id="articleHeader1"><a href="https://derickweng.github.io/test/" rel="nofollow noreferrer" target="_blank">项目演示地址</a></h3>
<h3 id="articleHeader2"><a href="https://github.com/derickweng/vue-banner" rel="nofollow noreferrer" target="_blank">从项目中提取的banner组件地址</a></h3>
<hr>
<h3 id="articleHeader3">一、规划目录</h3>
<p>一个易于维护和迭代的项目，应该是具有可靠的项目目录的，这里，在vue-cli生成的目录中，加入了services、directives、utils、store等目录，并在webpack中修改相应的导入地址：</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-9291a38e485c3eae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-9291a38e485c3eae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1.  services 用于全局管理接口和http请求
    2.  directives 用于添加全局指令
    3.  utils 用于放置通用js函数
    4.  store 用于管理vuex数据等" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-number">1.</span>  services 用于全局管理接口和http请求
    <span class="hljs-number">2.</span>  directives 用于添加全局指令
    <span class="hljs-number">3.</span>  utils 用于放置通用js函数
    <span class="hljs-number">4.</span>  store 用于管理vuex数据等</code></pre>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-bf018eddbdc2d5cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-bf018eddbdc2d5cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="目录" title="目录" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h3 id="articleHeader4">二、制作公共css，</h3>
<h4>主要采用scss+em单位+currentColor继承父级颜色+before&amp;after伪类制作</h4>
<h4>本项目制作的公共css有:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1. 播放器要用到的图标
    2. 用于vue transition标签切换时使用的css3动画
    3. css reset
    4. 项目主题颜色，目前只能在项目初始化之前设置主题颜色,用于管理，所有组件主题颜色都来源于此
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-number">1.</span> 播放器要用到的图标
    <span class="hljs-number">2.</span> 用于vue transition标签切换时使用的css3动画
    <span class="hljs-number">3.</span> css reset
    <span class="hljs-number">4.</span> 项目主题颜色，目前只能在项目初始化之前设置主题颜色,用于管理，所有组件主题颜色都来源于此
</code></pre>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-7dd2f1c9c88ec9b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-7dd2f1c9c88ec9b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="自定义公共图标" title="自定义公共图标" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h3 id="articleHeader5">三、全局API</h3>
<p>分成两个部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.  jsonp分装，负责http请求
2.  收集url地址，并放在API类上，并循环将url用bind函数导入到jsonp封装函数中，其他请求同样可用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1.  </span>jsonp分装，负责http请求
<span class="hljs-bullet">2.  </span>收集url地址，并放在API类上，并循环将url用bind函数导入到jsonp封装函数中，其他请求同样可用
</code></pre>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-b1a658393c03b4dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-b1a658393c03b4dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="jsonp封装" title="jsonp封装" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-a73204d598c1f14f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-a73204d598c1f14f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="api公共类，seturl函数用于参数传入接口地址时，用call函数直接调用services服务" title="api公共类，seturl函数用于参数传入接口地址时，用call函数直接调用services服务" style="cursor: pointer;"></span></p>
<hr>
<h3 id="articleHeader6">四、核心组件</h3>
<p>包括 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. banner组件
2. 播放器" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>banner组件
<span class="hljs-bullet">2. </span>播放器</code></pre>
<h4>1.banner组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 该组件只对传入的数据进行处理，并相应转化，保证了组件的通用性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;"> 该组件只对传入的数据进行处理，并相应转化，保证了组件的通用性</code></pre>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-230bced1cf9499a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-230bced1cf9499a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  核心的函数主要是对***无限循环的处理、触摸屏滑动,图片按需加载***处理：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">  核心的函数主要是对<span class="hljs-strong">***无限循环的处理、触摸屏滑动,图片按需加载**</span>*处理：</code></pre>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-be61325c795bb1a3.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-be61325c795bb1a3.gif?imageMogr2/auto-orient/strip" alt="banner插件效果示意" title="banner插件效果示意" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  computed : {
        sliderImg : function(){
            const [...saveImg] = this.bannerlist,    //拷贝图片列表数据，在展示区域的图片实际上首尾拷贝了一样的图片，即尾端拷贝第一张，首端拷贝最后一张
                  [imgfirst, ...other] = this.bannerlist;
            saveImg.unshift(other[other.length-1])      
            saveImg.push(imgfirst)
            return saveImg
        },
    },
    mounted () {
        if (this.bannerlist &amp;&amp; this.bannerlist.length) {
            this.interTimer = setInterval(()=>{
                this.sliderStart()
            },3000)
        }
    },
    methods : {
        linkURl (item) {
            window.open(item[this.linkurl])
        },
        getURl (item,index) {  //用于减少一次性请求，只加载当前的图片，加载之后添加标识
            if (!item) {
                return reloadImg
            }
            if (item.hasload) {
                return item[this.picurl]
            }
            if (this.nowSlider == index-1) {
                item.hasload = true
                return item[this.picurl]
            }
            return reloadImg
        },
        stopSlider (e) {
            e.preventDefault()
            e.stopPropagation()
            if (e.target != e.currentTarget) {  //事件委托节省下事件绑定，排除当前绑定的dom
                clearInterval(this.interTimer)
                delete this.sliderActive['transition'] //关闭css3过渡效果
                this.startTouch = e.targetTouches[0].screenX
            }
        },
        moveSlider (e) {
            e.preventDefault()
            e.stopPropagation()
            if (this.nowSlider === -1||this.nowSlider === this.bannerlist.length) {  //首端与尾端未连接好禁止滑动
                return;
            }
            if (e.target != e.currentTarget) {
                this.moveTouch = e.targetTouches[0].screenX
                let slideDir = this.moveTouch - this.startTouch,
                    targetWidth = parseInt(window.getComputedStyle(e.target).width),
                    tranDir;
                if (slideDir < -50 || slideDir > 50) {  //加了50容错值，能预防触摸时图片突然闪动
                    if (slideDir < 0) {  //再重新补回差值
                        slideDir -= 50
                    } else {
                        slideDir += 50
                    }
                    tranDir = -targetWidth * (this.nowSlider+1) + slideDir//触摸时图片随手指移动，距离须减去当前图片宽度乘以当前滚动索引
                    this.sliderActive.transform = `translate3d(${tranDir}px,0,0)`
                }
            }
        },
        continSilder (e) { //结束触摸
            e.preventDefault()
            e.stopPropagation()
            if (e.target != e.currentTarget &amp;&amp; this.moveTouch) {
                const slideDir = this.moveTouch - this.startTouch
                if (slideDir < 0) {
                    this.nowSlider ++
                } else if (slideDir > 0) {
                    this.nowSlider -- 
                }
                this.nowSlider --
                this.sliderStart() //立即设置位置
                this.moveTouch = 0  //清空手势位置
                this.startTouch = 0
                this.interTimer = setInterval(()=>{
                    this.sliderStart()
                },3000)
            }
        },
        sliderStart () {
           this.nowSlider ++ 
           this.nowSlider %= this.sliderImg.length
           if (this.nowSlider === this.bannerlist.length) {  //向右滑动到最大值时，将位置初始化并清0 nowSlider
               setTimeout(() => { //设置一个定时器，用于异步处理，一个进行尾端拷贝的图片的正常滑动，这个处理在差不多到达时重置，造成无限循环的错觉
                    this.sliderActive = {
                        transform: `translate3d(-100vw,0,0)`
                    }
                    this.nowSlider = 0
               }, 500)         
            }
            if (this.nowSlider === -1) {  //向右滑动到最小值时，将位置置为最大值
               setTimeout(() => {
                    this.nowSlider = this.bannerlist.length-1
                    this.sliderActive = {
                        transform: `translate3d(${-100*(this.nowSlider+1)}vw,0,0)`
                    }
               }, 500)       
            }
            this.sliderActive = Object.assign({},{
                transition:'transform 0.5s',
                transform: `translate3d(${-100*(this.nowSlider+1)}vw,0,0)`
            })
        } 
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  computed : {
        sliderImg : function(){
            const [...saveImg] = <span class="hljs-keyword">this</span>.bannerlist,    <span class="hljs-comment">//拷贝图片列表数据，在展示区域的图片实际上首尾拷贝了一样的图片，即尾端拷贝第一张，首端拷贝最后一张</span>
                  [imgfirst, ...other] = <span class="hljs-keyword">this</span>.bannerlist;
            saveImg.unshift(other[other.length<span class="hljs-number">-1</span>])      
            saveImg.push(imgfirst)
            <span class="hljs-keyword">return</span> saveImg
        },
    },
    mounted () {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.bannerlist &amp;&amp; <span class="hljs-keyword">this</span>.bannerlist.length) {
            <span class="hljs-keyword">this</span>.interTimer = setInterval(()=&gt;{
                <span class="hljs-keyword">this</span>.sliderStart()
            },<span class="hljs-number">3000</span>)
        }
    },
    methods : {
        linkURl (item) {
            window.<span class="hljs-keyword">open</span>(item[<span class="hljs-keyword">this</span>.linkurl])
        },
        getURl (item,index) {  <span class="hljs-comment">//用于减少一次性请求，只加载当前的图片，加载之后添加标识</span>
            <span class="hljs-keyword">if</span> (!item) {
                <span class="hljs-keyword">return</span> reloadImg
            }
            <span class="hljs-keyword">if</span> (item.hasload) {
                <span class="hljs-keyword">return</span> item[<span class="hljs-keyword">this</span>.picurl]
            }
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowSlider == index<span class="hljs-number">-1</span>) {
                item.hasload = <span class="hljs-literal">true</span>
                <span class="hljs-keyword">return</span> item[<span class="hljs-keyword">this</span>.picurl]
            }
            <span class="hljs-keyword">return</span> reloadImg
        },
        stopSlider (e) {
            e.preventDefault()
            e.stopPropagation()
            <span class="hljs-keyword">if</span> (e.target != e.currentTarget) {  <span class="hljs-comment">//事件委托节省下事件绑定，排除当前绑定的dom</span>
                clearInterval(<span class="hljs-keyword">this</span>.interTimer)
                delete <span class="hljs-keyword">this</span>.sliderActive[<span class="hljs-string">'transition'</span>] <span class="hljs-comment">//关闭css3过渡效果</span>
                <span class="hljs-keyword">this</span>.startTouch = e.targetTouches[<span class="hljs-number">0</span>].screenX
            }
        },
        moveSlider (e) {
            e.preventDefault()
            e.stopPropagation()
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowSlider === <span class="hljs-number">-1</span>||<span class="hljs-keyword">this</span>.nowSlider === <span class="hljs-keyword">this</span>.bannerlist.length) {  <span class="hljs-comment">//首端与尾端未连接好禁止滑动</span>
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-keyword">if</span> (e.target != e.currentTarget) {
                <span class="hljs-keyword">this</span>.moveTouch = e.targetTouches[<span class="hljs-number">0</span>].screenX
                let slideDir = <span class="hljs-keyword">this</span>.moveTouch - <span class="hljs-keyword">this</span>.startTouch,
                    targetWidth = parseInt(window.getComputedStyle(e.target).width),
                    tranDir;
                <span class="hljs-keyword">if</span> (slideDir &lt; <span class="hljs-number">-50</span> || slideDir &gt; <span class="hljs-number">50</span>) {  <span class="hljs-comment">//加了50容错值，能预防触摸时图片突然闪动</span>
                    <span class="hljs-keyword">if</span> (slideDir &lt; <span class="hljs-number">0</span>) {  <span class="hljs-comment">//再重新补回差值</span>
                        slideDir -= <span class="hljs-number">50</span>
                    } <span class="hljs-keyword">else</span> {
                        slideDir += <span class="hljs-number">50</span>
                    }
                    tranDir = -targetWidth * (<span class="hljs-keyword">this</span>.nowSlider+<span class="hljs-number">1</span>) + slideDir<span class="hljs-comment">//触摸时图片随手指移动，距离须减去当前图片宽度乘以当前滚动索引</span>
                    <span class="hljs-keyword">this</span>.sliderActive.transform = `translate3d(${tranDir}px,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)`
                }
            }
        },
        continSilder (e) { <span class="hljs-comment">//结束触摸</span>
            e.preventDefault()
            e.stopPropagation()
            <span class="hljs-keyword">if</span> (e.target != e.currentTarget &amp;&amp; <span class="hljs-keyword">this</span>.moveTouch) {
                const slideDir = <span class="hljs-keyword">this</span>.moveTouch - <span class="hljs-keyword">this</span>.startTouch
                <span class="hljs-keyword">if</span> (slideDir &lt; <span class="hljs-number">0</span>) {
                    <span class="hljs-keyword">this</span>.nowSlider ++
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (slideDir &gt; <span class="hljs-number">0</span>) {
                    <span class="hljs-keyword">this</span>.nowSlider -- 
                }
                <span class="hljs-keyword">this</span>.nowSlider --
                <span class="hljs-keyword">this</span>.sliderStart() <span class="hljs-comment">//立即设置位置</span>
                <span class="hljs-keyword">this</span>.moveTouch = <span class="hljs-number">0</span>  <span class="hljs-comment">//清空手势位置</span>
                <span class="hljs-keyword">this</span>.startTouch = <span class="hljs-number">0</span>
                <span class="hljs-keyword">this</span>.interTimer = setInterval(()=&gt;{
                    <span class="hljs-keyword">this</span>.sliderStart()
                },<span class="hljs-number">3000</span>)
            }
        },
        sliderStart () {
           <span class="hljs-keyword">this</span>.nowSlider ++ 
           <span class="hljs-keyword">this</span>.nowSlider %= <span class="hljs-keyword">this</span>.sliderImg.length
           <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowSlider === <span class="hljs-keyword">this</span>.bannerlist.length) {  <span class="hljs-comment">//向右滑动到最大值时，将位置初始化并清0 nowSlider</span>
               setTimeout(() =&gt; { <span class="hljs-comment">//设置一个定时器，用于异步处理，一个进行尾端拷贝的图片的正常滑动，这个处理在差不多到达时重置，造成无限循环的错觉</span>
                    <span class="hljs-keyword">this</span>.sliderActive = {
                        transform: `translate3d(<span class="hljs-number">-100</span>vw,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)`
                    }
                    <span class="hljs-keyword">this</span>.nowSlider = <span class="hljs-number">0</span>
               }, <span class="hljs-number">500</span>)         
            }
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowSlider === <span class="hljs-number">-1</span>) {  <span class="hljs-comment">//向右滑动到最小值时，将位置置为最大值</span>
               setTimeout(() =&gt; {
                    <span class="hljs-keyword">this</span>.nowSlider = <span class="hljs-keyword">this</span>.bannerlist.length<span class="hljs-number">-1</span>
                    <span class="hljs-keyword">this</span>.sliderActive = {
                        transform: `translate3d(${<span class="hljs-number">-100</span>*(<span class="hljs-keyword">this</span>.nowSlider+<span class="hljs-number">1</span>)}vw,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)`
                    }
               }, <span class="hljs-number">500</span>)       
            }
            <span class="hljs-keyword">this</span>.sliderActive = Object.assign({},{
                transition:<span class="hljs-string">'transform 0.5s'</span>,
                transform: `translate3d(${<span class="hljs-number">-100</span>*(<span class="hljs-keyword">this</span>.nowSlider+<span class="hljs-number">1</span>)}vw,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)`
            })
        } 
    }</code></pre>
<h4>2.播放器功能</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  播放器的所有功能主要依赖vuex（store.js）的控制，由于音乐是在整个app内都播放的，故audio标签放在了App.vue中：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">  播放器的所有功能主要依赖<span class="hljs-selector-tag">vuex</span>（<span class="hljs-selector-tag">store</span><span class="hljs-selector-class">.js</span>）的控制，由于音乐是在整个<span class="hljs-selector-tag">app</span>内都播放的，故<span class="hljs-selector-tag">audio</span>标签放在了<span class="hljs-selector-tag">App</span><span class="hljs-selector-class">.vue</span>中：</code></pre>
<p>store.js:<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4149586-55ddca87a97b00b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4149586-55ddca87a97b00b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="播放数据控制" title="播放数据控制" style="cursor: pointer; display: inline;"></span></p>
<p>APP.vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  computed : {
    audioSrc : function () {  //对当前播放的音频切换，放在顶层
      const song = this.$store.state.nowsong;
      let audioTimer;
      if (!song) {
        this.$store.state.playing = false
        clearInterval(audioTimer)
        return null
      }
      this.$store.state.playing = true
      audioTimer = setInterval(()=>{  //每秒获取进度
        let audio = document.getElementById('m-audio');
        if (audio) {
           this.$store.state.audioProgss = audio.currentTime/audio.duration*100+'%'
        }  else {
           clearInterval(audioTimer)
        }
      },1000)
      return `${API.url.getsong}${song.songid}.m4a?fromtag=46` //播放一首歌曲
    },
    playing : function () {
       return this.$store.state.playing
    },
  },
  directives : {
    play : {  //控制是否播放
      update : function(el,binding) {
        if (binding.value) {
          el.play()
        } else {
          el.pause()
        }
      }
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  computed : {
    <span class="hljs-attr">audioSrc</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  <span class="hljs-comment">//对当前播放的音频切换，放在顶层</span>
      <span class="hljs-keyword">const</span> song = <span class="hljs-keyword">this</span>.$store.state.nowsong;
      <span class="hljs-keyword">let</span> audioTimer;
      <span class="hljs-keyword">if</span> (!song) {
        <span class="hljs-keyword">this</span>.$store.state.playing = <span class="hljs-literal">false</span>
        clearInterval(audioTimer)
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
      }
      <span class="hljs-keyword">this</span>.$store.state.playing = <span class="hljs-literal">true</span>
      audioTimer = setInterval(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{  <span class="hljs-comment">//每秒获取进度</span>
        <span class="hljs-keyword">let</span> audio = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'m-audio'</span>);
        <span class="hljs-keyword">if</span> (audio) {
           <span class="hljs-keyword">this</span>.$store.state.audioProgss = audio.currentTime/audio.duration*<span class="hljs-number">100</span>+<span class="hljs-string">'%'</span>
        }  <span class="hljs-keyword">else</span> {
           clearInterval(audioTimer)
        }
      },<span class="hljs-number">1000</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${API.url.getsong}</span><span class="hljs-subst">${song.songid}</span>.m4a?fromtag=46`</span> <span class="hljs-comment">//播放一首歌曲</span>
    },
    <span class="hljs-attr">playing</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.playing
    },
  },
  <span class="hljs-attr">directives</span> : {
    <span class="hljs-attr">play</span> : {  <span class="hljs-comment">//控制是否播放</span>
      update : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,binding</span>) </span>{
        <span class="hljs-keyword">if</span> (binding.value) {
          el.play()
        } <span class="hljs-keyword">else</span> {
          el.pause()
        }
      }
    }
  },</code></pre>
<h2 id="articleHeader7">整体项目核心功能介绍到此.有好的建议尽管提哦</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue2+webpack+Es6快速开发一个移动端项目，封装属于自己的jsonpAPI和手势响应式组件

## 原文链接
[https://segmentfault.com/a/1190000008528539](https://segmentfault.com/a/1190000008528539)

