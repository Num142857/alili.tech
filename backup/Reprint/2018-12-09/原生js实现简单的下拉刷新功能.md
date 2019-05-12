---
title: '原生js实现简单的下拉刷新功能' 
date: 2018-12-09 2:30:08
hidden: true
slug: 5in4e6tf5rj
categories: [reprint]
---

{{< raw >}}

                    
<p>前言：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我们在浏览移动端web页面的时候，经常会用到下拉刷新。
现在我们用原生的js实现这个非常简单的下拉刷新功能。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>我们在浏览移动端web页面的时候，经常会用到下拉刷新。
现在我们用原生的<span class="hljs-keyword">js</span>实现这个非常简单的下拉刷新功能。</code></pre>
<p>（温馨提示：本文比较基础，功能也很简单。写的不好的地方，希望大神提点一二。）</p>
<p>一、创建简单的html页面：<br><span class="img-wrap"><img data-src="/img/bV6y0u?w=299&amp;h=71" src="https://static.alili.tech/img/bV6y0u?w=299&amp;h=71" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>假设代码里的float-box是一个主页面。</p>
<p>二、封装下拉刷新的功能模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1）首先创建一个Slide构造函数，用来初始化属性与函数。
function Slide(dom){
    this.start_y=null;//手指滑动屏幕的初始位置
    this.end_y=null;//手指滑动屏幕的结束位置
    this.render(dom);//初始化下拉功能的render函数，这里的dom参数是你的主页面。
}
（2）编写render函数
render函数是用来动态创建下拉刷新的动画图。现在我们在Slide原型上编写render函数。
    Slide.prototype={
    render:function(dom){
        //拿到body节点
        var body = document.getElementsByTagName('body');
        //创建div，用来显示下拉效果。这个div有'正在刷新。。' 和 '下拉刷新' 这个两个子节点。
        var newItem = document.createElement('div');
        //给div设置class属性，该class是下拉效果的样式
        newItem.className = 'slide-wrap';
        //利用innerHTML将  '正在刷新。。。' 和 '下拉刷新' 这两个子节点插入到上面创建的div中。
        newItem.innerHTML = '<div class=&quot;slided&quot;>正在刷新。。。</div>'+'<div class=&quot;sliding&quot;>下拉刷新</div>';
        //然后将创建的div插入到主页面的前面
        body[0].insertBefore(newItem,dom[0]);
        //获取创建完成的下拉刷新div
        var dom2 = document.getElementsByClassName('slide-wrap');
        //运行slide_start（）
        this.slide_start(dom2);
    "}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>（<span class="hljs-number">1</span>）首先创建一个Slide构造函数，用来初始化属性与函数。
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Slide</span></span>(dom){
    <span class="hljs-built_in">this</span>.start_y=<span class="hljs-literal">null</span>;<span class="hljs-comment">//手指滑动屏幕的初始位置</span>
    <span class="hljs-built_in">this</span>.end_y=<span class="hljs-literal">null</span>;<span class="hljs-comment">//手指滑动屏幕的结束位置</span>
    <span class="hljs-built_in">this</span>.render(dom);<span class="hljs-comment">//初始化下拉功能的render函数，这里的dom参数是你的主页面。</span>
}
（<span class="hljs-number">2</span>）编写render函数
render函数是用来动态创建下拉刷新的动画图。现在我们在Slide原型上编写render函数。
    Slide.prototype={
    render:<span class="hljs-type">function</span>(dom){
        <span class="hljs-comment">//拿到body节点</span>
        <span class="hljs-keyword">var</span> body = document.getElementsByTagName(<span class="hljs-string">'body'</span>);
        <span class="hljs-comment">//创建div，用来显示下拉效果。这个div有'正在刷新。。' 和 '下拉刷新' 这个两个子节点。</span>
        <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Item</span> = document.createElement(<span class="hljs-string">'div'</span>);
        <span class="hljs-comment">//给div设置class属性，该class是下拉效果的样式</span>
        <span class="hljs-keyword">new</span><span class="hljs-type">Item</span>.className = <span class="hljs-string">'slide-wrap'</span>;
        <span class="hljs-comment">//利用innerHTML将  '正在刷新。。。' 和 '下拉刷新' 这两个子节点插入到上面创建的div中。</span>
        <span class="hljs-keyword">new</span><span class="hljs-type">Item</span>.innerHTML = <span class="hljs-string">'&lt;div class="slided"&gt;正在刷新。。。&lt;/div&gt;'</span>+<span class="hljs-string">'&lt;div class="sliding"&gt;下拉刷新&lt;/div&gt;'</span>;
        <span class="hljs-comment">//然后将创建的div插入到主页面的前面</span>
        body[<span class="hljs-number">0</span>].insertBefore(<span class="hljs-keyword">new</span><span class="hljs-type">Item</span>,dom[<span class="hljs-number">0</span>]);
        <span class="hljs-comment">//获取创建完成的下拉刷新div</span>
        <span class="hljs-keyword">var</span> dom2 = document.getElementsByClassName(<span class="hljs-string">'slide-wrap'</span>);
        <span class="hljs-comment">//运行slide_start（）</span>
        <span class="hljs-built_in">this</span>.slide_start(dom2);
    "}}"</code></pre>
<p>下图为下拉刷新的css样式：<br><span class="img-wrap"><img data-src="/img/bV6zih?w=314&amp;h=394" src="https://static.alili.tech/img/bV6zih?w=314&amp;h=394" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>（3）编写slide_start()函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="slide_start:function(dom2){
    var _this = this;
    //监听document整个文档的touchstart事件
    document.addEventListener('touchstart',function(evt){
        var touch = evt.touches[0]; //获取第一个触点
        _this.start_y = Number(touch.pageY);//第一个触点的Y坐标 
    });
    //运行slide_move
    _this.slide_move(dom2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>slide_start:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom2</span>)</span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">//监听document整个文档的touchstart事件</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
        <span class="hljs-keyword">var</span> touch = evt.touches[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取第一个触点</span>
        _this.start_y = <span class="hljs-built_in">Number</span>(touch.pageY);<span class="hljs-comment">//第一个触点的Y坐标 </span>
    });
    <span class="hljs-comment">//运行slide_move</span>
    _this.slide_move(dom2);
}</code></pre>
<p>（4）编写slide_move()函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="slide_move:function(dom2){
    var _this = this;
    //监听document的touchmove事件
    document.addEventListener('touchmove',function(evt){
        //下面这一行代码是保证在手指移动的距离还不到规定的长度时候，就不显示 '正在刷新。。' 
        dom2[0].childNodes[0].style.display='none';
        var touch = evt.touches[0]; //获取第一个触点
        //获取手指向下移动的长度距离
        _this.end_y = Number(touch.pageY) - _this.start_y; 
        //判断手指移动距离是否大于5.这个为什么设置为5，而不是0呢，主要是为了避免用户不觉意的轻微滑动
        if(_this.end_y > 5){
        //当滑动距离大于5时，将 ‘下拉刷新’ 的效果显示出来，同时将它的高度赋值为手指滑动的距离，以达到慢慢下拉的效果
            dom2[0].childNodes[1].style.display = 'block';
            dom2[0].childNodes[1].style.height = _this.end_y +'px';
            dom2[0].childNodes[1].style.lineHeight = _this.end_y +'px';
        }
   });
   //执行slide_end()函数
   this.slide_end(dom2);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>slide_move:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom2</span>)</span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">//监听document的touchmove事件</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
        <span class="hljs-comment">//下面这一行代码是保证在手指移动的距离还不到规定的长度时候，就不显示 '正在刷新。。' </span>
        dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">0</span>].style.display=<span class="hljs-string">'none'</span>;
        <span class="hljs-keyword">var</span> touch = evt.touches[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取第一个触点</span>
        <span class="hljs-comment">//获取手指向下移动的长度距离</span>
        _this.end_y = <span class="hljs-built_in">Number</span>(touch.pageY) - _this.start_y; 
        <span class="hljs-comment">//判断手指移动距离是否大于5.这个为什么设置为5，而不是0呢，主要是为了避免用户不觉意的轻微滑动</span>
        <span class="hljs-keyword">if</span>(_this.end_y &gt; <span class="hljs-number">5</span>){
        <span class="hljs-comment">//当滑动距离大于5时，将 ‘下拉刷新’ 的效果显示出来，同时将它的高度赋值为手指滑动的距离，以达到慢慢下拉的效果</span>
            dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.display = <span class="hljs-string">'block'</span>;
            dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.height = _this.end_y +<span class="hljs-string">'px'</span>;
            dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.lineHeight = _this.end_y +<span class="hljs-string">'px'</span>;
        }
   });
   <span class="hljs-comment">//执行slide_end()函数</span>
   <span class="hljs-keyword">this</span>.slide_end(dom2);
}</code></pre>
<p>（5）编写slide_end()函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="slide_end:function(dom2){
    var _this = this;
    //监听touchend事件
    document.addEventListener('touchend',function(evt){
    //当手指送开的时候，判断手指的滑动距离如果大于100就将 '正在刷新。。' 的效果显示出来，同时隐藏 '下拉刷新' 的效果
      if(_this.end_y > 100){
          dom2[0].childNodes[1].style.display='none';
          dom2[0].childNodes[0].style.display='block';
          console.log('开始刷新');
          //这里是模拟3秒后刷新成功，然后隐藏 '正在刷新。。' 效果 
          setTimeout(function(){
              dom2[0].childNodes[0].style.display='none';
          },3000);
      }else{
      //这里是当手指滑动距离小于100时，就将 '下拉刷新' 效果隐藏。也就是什么也不做
          dom2[0].childNodes[1].style.display = 'none';
      }
   });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>slide_end:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom2</span>)</span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">//监听touchend事件</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchend'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
    <span class="hljs-comment">//当手指送开的时候，判断手指的滑动距离如果大于100就将 '正在刷新。。' 的效果显示出来，同时隐藏 '下拉刷新' 的效果</span>
      <span class="hljs-keyword">if</span>(_this.end_y &gt; <span class="hljs-number">100</span>){
          dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.display=<span class="hljs-string">'none'</span>;
          dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">0</span>].style.display=<span class="hljs-string">'block'</span>;
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始刷新'</span>);
          <span class="hljs-comment">//这里是模拟3秒后刷新成功，然后隐藏 '正在刷新。。' 效果 </span>
          setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
              dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">0</span>].style.display=<span class="hljs-string">'none'</span>;
          },<span class="hljs-number">3000</span>);
      }<span class="hljs-keyword">else</span>{
      <span class="hljs-comment">//这里是当手指滑动距离小于100时，就将 '下拉刷新' 效果隐藏。也就是什么也不做</span>
          dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.display = <span class="hljs-string">'none'</span>;
      }
   });
}
</code></pre>
<p>（5）最后将Slide构造函数暴露到全局window里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.Slide=Slide;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>window.Slide=Slide<span class="hljs-comment">;</span>
</code></pre>
<p>整个下刷新功能到这了就完了。很简单吧。<br>下面是完整的封装代码。<br>;(function(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Slide(dom){
    this.start_y=null;
    this.end_y=null;
    this.render(dom);
}
Slide.prototype={
    // 动态创建下拉刷新特效
    render:function(dom){
        var body = document.getElementsByTagName('body');
        var newItem = document.createElement('div');
        newItem.className = 'slide-wrap';
        newItem.innerHTML = '<div class=&quot;slided&quot;>正在刷新。。。</div>'+'<div class=&quot;sliding&quot;>下拉刷新</div>';
        body[0].insertBefore(newItem,dom[0]);
        var dom2 = document.getElementsByClassName('slide-wrap');
        this.slide_start(dom2);
    },
    slide_start:function(dom2){
        var _this = this;
            document.addEventListener('touchstart',function(evt){
                 var touch = evt.touches[0]; //获取第一个触点
                 _this.start_y = Number(touch.pageY); 
            });
        _this.slide_move(dom2);
    },
    slide_move:function(dom2){
            var _this = this;
            document.addEventListener('touchmove',function(evt){
                 dom2[0].childNodes[0].style.display='none';
                 var touch = evt.touches[0]; //获取第一个触点
                 _this.end_y = Number(touch.pageY) - _this.start_y; 
                 if(_this.end_y > 5){
                     dom2[0].childNodes[1].style.display = 'block';
                     dom2[0].childNodes[1].style.height = _this.end_y +'px';
                     dom2[0].childNodes[1].style.lineHeight = _this.end_y +'px';
                 }
            });
        this.slide_end(dom2);
    },
    slide_end:function(dom2){
        var _this = this;
            document.addEventListener('touchend',function(evt){
                if(_this.end_y > 100){
                    dom2[0].childNodes[1].style.display='none';
                    dom2[0].childNodes[0].style.display='block';
                       console.log('开始刷新');
                    setTimeout(function(){
                        dom2[0].childNodes[0].style.display='none';
                    },3000);
                }else{
                     dom2[0].childNodes[1].style.display = 'none';
                }
            });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Slide</span>(<span class="hljs-params">dom</span>)</span>{
    <span class="hljs-keyword">this</span>.start_y=<span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.end_y=<span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.render(dom);
}
Slide.prototype={
    <span class="hljs-comment">// 动态创建下拉刷新特效</span>
    render:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom</span>)</span>{
        <span class="hljs-keyword">var</span> body = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'body'</span>);
        <span class="hljs-keyword">var</span> newItem = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
        newItem.className = <span class="hljs-string">'slide-wrap'</span>;
        newItem.innerHTML = <span class="hljs-string">'&lt;div class="slided"&gt;正在刷新。。。&lt;/div&gt;'</span>+<span class="hljs-string">'&lt;div class="sliding"&gt;下拉刷新&lt;/div&gt;'</span>;
        body[<span class="hljs-number">0</span>].insertBefore(newItem,dom[<span class="hljs-number">0</span>]);
        <span class="hljs-keyword">var</span> dom2 = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'slide-wrap'</span>);
        <span class="hljs-keyword">this</span>.slide_start(dom2);
    },
    <span class="hljs-attr">slide_start</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom2</span>)</span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
                 <span class="hljs-keyword">var</span> touch = evt.touches[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取第一个触点</span>
                 _this.start_y = <span class="hljs-built_in">Number</span>(touch.pageY); 
            });
        _this.slide_move(dom2);
    },
    <span class="hljs-attr">slide_move</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom2</span>)</span>{
            <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchmove'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
                 dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">0</span>].style.display=<span class="hljs-string">'none'</span>;
                 <span class="hljs-keyword">var</span> touch = evt.touches[<span class="hljs-number">0</span>]; <span class="hljs-comment">//获取第一个触点</span>
                 _this.end_y = <span class="hljs-built_in">Number</span>(touch.pageY) - _this.start_y; 
                 <span class="hljs-keyword">if</span>(_this.end_y &gt; <span class="hljs-number">5</span>){
                     dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.display = <span class="hljs-string">'block'</span>;
                     dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.height = _this.end_y +<span class="hljs-string">'px'</span>;
                     dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.lineHeight = _this.end_y +<span class="hljs-string">'px'</span>;
                 }
            });
        <span class="hljs-keyword">this</span>.slide_end(dom2);
    },
    <span class="hljs-attr">slide_end</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dom2</span>)</span>{
        <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchend'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>)</span>{
                <span class="hljs-keyword">if</span>(_this.end_y &gt; <span class="hljs-number">100</span>){
                    dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.display=<span class="hljs-string">'none'</span>;
                    dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">0</span>].style.display=<span class="hljs-string">'block'</span>;
                       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'开始刷新'</span>);
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                        dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">0</span>].style.display=<span class="hljs-string">'none'</span>;
                    },<span class="hljs-number">3000</span>);
                }<span class="hljs-keyword">else</span>{
                     dom2[<span class="hljs-number">0</span>].childNodes[<span class="hljs-number">1</span>].style.display = <span class="hljs-string">'none'</span>;
                }
            });
    }
}</code></pre>
<p>window.Slide=Slide;<br>})();</p>
<p>使用方法也很简单：在你的页面里new一个Slide()。并且将主页面的dom节点传进去即可。<br>var target = document.getElementsByClassName('float-box');<br>new Slide(target);</p>
<p>最后的效果如下图：<br>持续下拉的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV6zF1?w=309&amp;h=371" src="https://static.alili.tech/img/bV6zF1?w=309&amp;h=371" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>松开手指，正在刷新的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV6zGu?w=308&amp;h=287" src="https://static.alili.tech/img/bV6zGu?w=308&amp;h=287" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当然，这效果是很丑，因为只是个小demo，所以css样式非常简单。你们可以自己发挥想象力，写更好看的css样式即可。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生js实现简单的下拉刷新功能

## 原文链接
[https://segmentfault.com/a/1190000013921296](https://segmentfault.com/a/1190000013921296)

