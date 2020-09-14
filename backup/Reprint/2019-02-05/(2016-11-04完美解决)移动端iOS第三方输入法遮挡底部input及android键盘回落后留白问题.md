---
title: '(2016-11-04完美解决)移动端iOS第三方输入法遮挡底部input及android键盘回落后留白问题' 
date: 2019-02-05 2:30:09
hidden: true
slug: 64nerx21sx5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题概述</h2>
<blockquote><p>问题1：H5 web 移动端 输入框, 键盘唤起后fixed定位好的元素跟随页面滚动了起来… <strong>fixed属性失效</strong>了！满屏任性横飞, 如下图:</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVAmvA?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVAmvA?w=1080&amp;h=1920" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>问题2：有第三方输入法的ios机还会出现键盘弹出延迟，导致普通布局 输入框(input/textarea等) 位置靠下的被键盘挡住, 如下图:</p></blockquote>
<p>(这个'完成'出来, 然后'键盘'再顶起)</p>
<p><span class="img-wrap"><img data-src="/img/bVAmxI?w=719&amp;h=1280" src="https://static.alili.tech/img/bVAmxI?w=719&amp;h=1280" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2016-11-04完美解决方案</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CSS
.scrollWrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
}
bottomInput {
    position: absolute;
    bottom:0;
    left:0;
    right: 0;
}

// HTML
<body>
    <div class=&quot;scrollWrapper&quot;>
        <div class=&quot;bottomInput&quot;>
            <input type=&quot;text&quot; placeholder=&quot;input&quot;/>
        </div>
    </div>
</body>

// javascript
// 在输入框获取焦点, 键盘弹起后, 真的是一行代码
var interval = setInterval(function() {
    document.body.scrollTop = document.body.scrollHeight
}, 100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// CSS</span>
<span class="hljs-selector-class">.scrollWrapper</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
}
bottomInput {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-comment">// HTML</span>
&lt;body&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"scrollWrapper"</span>&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"bottomInput"</span>&gt;
            &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span> placeholder=<span class="hljs-string">"input"</span>/&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;

<span class="hljs-comment">// javascript</span>
<span class="hljs-comment">// 在输入框获取焦点, 键盘弹起后, 真的是一行代码</span>
<span class="hljs-selector-tag">var</span> interval = setInterval(function() {
    document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollTop</span> = document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.scrollHeight</span>
}, <span class="hljs-number">100</span>)</code></pre>
<hr>
<h2 id="articleHeader2">
<strong>注意:</strong> 下面解决ios键盘问题的是之前的旧方法, 还是有瑕疵, 可跳过看其他</h2>
<h2 id="articleHeader3">解决思路</h2>
<h3 id="articleHeader4">问题1:</h3>
<ul><li><p>不让页面整体滚动, 绝对布局滚动内容, 局部滚动.</p></li></ul>
<h3 id="articleHeader5">问题2:</h3>
<ol>
<li><p>键盘完全弹出时, <strong>判断键盘是否在可视区域</strong>(即屏幕除去键盘占用的区域)</p></li>
<li><p>通过js来调整输入框的位置;</p></li>
<li><p>键盘完全收起后, 调整键盘到页面底部;</p></li>
</ol>
<h2 id="articleHeader6">相关代码</h2>
<h3 id="articleHeader7">问题1:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// HTML
<body> 
    <!-- 可以滚动的区域 -->
    <main className='scrollWrapper'>
        <!-- 内容在这里... -->
    </main>
    
    <!-- fixed定位在底部的输入框 -->
    <footer>
       <div className='inputBox' contenteditable='true' placeholder='请输入评论'></div>
    </footer>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// HTML
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span> 
    <span class="hljs-comment">&lt;!-- 可以滚动的区域 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'scrollWrapper'</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 内容在这里... --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
    
    <span class="hljs-comment">&lt;!-- fixed定位在底部的输入框 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'inputBox'</span> <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">'true'</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">'请输入评论'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CSS
.scrollWrapper {
    position: absolute;/* 绝对定位，进行内部滚动 */
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: atuo;/* 或者scroll */
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
}
footer {
    position: fixed;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">// <span class="hljs-selector-tag">CSS</span>
<span class="hljs-selector-class">.scrollWrapper</span> {
    <span class="hljs-attribute">position</span>: absolute;<span class="hljs-comment">/* 绝对定位，进行内部滚动 */</span>
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow-y</span>: atuo;<span class="hljs-comment">/* 或者scroll */</span>
    <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;<span class="hljs-comment">/* 解决ios滑动不流畅问题 */</span>
}
<span class="hljs-selector-tag">footer</span> {
    <span class="hljs-attribute">position</span>: fixed;
}</code></pre>
<h3 id="articleHeader8">问题2:</h3>
<p>原因如下面两张图所示, 其实稍微注意一下, 可以看到原生输入法比第三方输入法少了一个tool bar, 就是这个罪魁祸首:</p>
<p><span class="img-wrap"><img data-src="/img/bVAnRl?w=955&amp;h=339" src="https://static.alili.tech/img/bVAnRl?w=955&amp;h=339" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     // 输入框获取焦点, 键盘完全弹出再调整输入框位置(因ios键盘弹出不会触发resize事件, 故延时600ms)
     // 选择setInterval轮询几次更好
     setTimeout(() => {
        // 挂载this上, 或者声明一个全局变量, 用于在失去焦点时, 要不要执行调整代码(非第三方不调整)
        this.inputIsNotInView = this.notInView()
        
        if (this.inputIsNotInView) {
            // Width, Height: 分别是键盘没有弹出时window.innerWidth和window.innerHeight
            // 88: 是第三方输入法比原生输入法多的那个tool bar(输入时显示带选项) 的高度, 做的不是太绝, 高度是统一的
            // ios第三方输入法的tool bar 甚至 键盘也被当作可视区域了(包含在键盘弹出时的window.innerHeight)
            if (Width != 750) {
                let bottomAdjust = (Height - window.innerHeight - 88) + 'px'
                $(this.inputBoxContainer).css('bottom', bottomAdjust)
            }
            else {
                // 'iphone 6 6s, 需要额外减去键盘高度432(见下图), 还算有良心, 高度和原生保持一致')
                let bottomAdjust = (Height - window.innerHeight - 88 - 432) + 'px'
                $(this.inputBoxContainer).css('bottom', bottomAdjust)
            }
        }
    }, 600)

--------------------------------------------------------------------------------------
   
    // 失去焦点, 键盘开始收起, 隐藏inputBox; 等键盘完全收起, 再显示inputBox, 设置在底部, 避免闪跳
    if (this.inputIsNotInView) {
        // display和opacity + bottom 会有闪跳
        $(this.inputBoxContainer).css({ 'opacity': 0, bottom: 0 })
        setTimeout(() => {
            $(this.inputBoxContainer).css('opacity', 1)
        }, 600)
    }

--------------------------------------------------------------------------------------
    //判断元素是否在可视区域，不在的话返回true, 在返回false
    notInView() {
        // getBoundingClientRect 是获取定位的，很怪异, (iphone 6s 10.0 bate版表现特殊)
        // top: 元素顶部到窗口（可是区域）顶部
        // bottom: 元素底部到窗口顶部
        // left: 元素左侧到窗口左侧
        // right: 元素右侧到窗口左侧
        // width/height 元素宽高
           let bottom = this.inputBoxContainer.getBoundingClientRect().bottom
           
           // 可视区域高度 - 元素底部到窗口顶部的高度 < 0, 则说明被键盘挡住了
        if (window.innerHeight - bottom < 0) {
            return true
        }
        return false
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">     <span class="hljs-comment">// 输入框获取焦点, 键盘完全弹出再调整输入框位置(因ios键盘弹出不会触发resize事件, 故延时600ms)</span>
     <span class="hljs-comment">// 选择setInterval轮询几次更好</span>
     setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 挂载this上, 或者声明一个全局变量, 用于在失去焦点时, 要不要执行调整代码(非第三方不调整)</span>
        <span class="hljs-keyword">this</span>.inputIsNotInView = <span class="hljs-keyword">this</span>.notInView()
        
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.inputIsNotInView) {
            <span class="hljs-comment">// Width, Height: 分别是键盘没有弹出时window.innerWidth和window.innerHeight</span>
            <span class="hljs-comment">// 88: 是第三方输入法比原生输入法多的那个tool bar(输入时显示带选项) 的高度, 做的不是太绝, 高度是统一的</span>
            <span class="hljs-comment">// ios第三方输入法的tool bar 甚至 键盘也被当作可视区域了(包含在键盘弹出时的window.innerHeight)</span>
            <span class="hljs-keyword">if</span> (Width != <span class="hljs-number">750</span>) {
                <span class="hljs-keyword">let</span> bottomAdjust = (Height - <span class="hljs-built_in">window</span>.innerHeight - <span class="hljs-number">88</span>) + <span class="hljs-string">'px'</span>
                $(<span class="hljs-keyword">this</span>.inputBoxContainer).css(<span class="hljs-string">'bottom'</span>, bottomAdjust)
            }
            <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">// 'iphone 6 6s, 需要额外减去键盘高度432(见下图), 还算有良心, 高度和原生保持一致')</span>
                <span class="hljs-keyword">let</span> bottomAdjust = (Height - <span class="hljs-built_in">window</span>.innerHeight - <span class="hljs-number">88</span> - <span class="hljs-number">432</span>) + <span class="hljs-string">'px'</span>
                $(<span class="hljs-keyword">this</span>.inputBoxContainer).css(<span class="hljs-string">'bottom'</span>, bottomAdjust)
            }
        }
    }, <span class="hljs-number">600</span>)

--------------------------------------------------------------------------------------
   
    <span class="hljs-comment">// 失去焦点, 键盘开始收起, 隐藏inputBox; 等键盘完全收起, 再显示inputBox, 设置在底部, 避免闪跳</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.inputIsNotInView) {
        <span class="hljs-comment">// display和opacity + bottom 会有闪跳</span>
        $(<span class="hljs-keyword">this</span>.inputBoxContainer).css({ <span class="hljs-string">'opacity'</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">bottom</span>: <span class="hljs-number">0</span> })
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            $(<span class="hljs-keyword">this</span>.inputBoxContainer).css(<span class="hljs-string">'opacity'</span>, <span class="hljs-number">1</span>)
        }, <span class="hljs-number">600</span>)
    }

--------------------------------------------------------------------------------------
    <span class="hljs-comment">//判断元素是否在可视区域，不在的话返回true, 在返回false</span>
    notInView() {
        <span class="hljs-comment">// getBoundingClientRect 是获取定位的，很怪异, (iphone 6s 10.0 bate版表现特殊)</span>
        <span class="hljs-comment">// top: 元素顶部到窗口（可是区域）顶部</span>
        <span class="hljs-comment">// bottom: 元素底部到窗口顶部</span>
        <span class="hljs-comment">// left: 元素左侧到窗口左侧</span>
        <span class="hljs-comment">// right: 元素右侧到窗口左侧</span>
        <span class="hljs-comment">// width/height 元素宽高</span>
           <span class="hljs-keyword">let</span> bottom = <span class="hljs-keyword">this</span>.inputBoxContainer.getBoundingClientRect().bottom
           
           <span class="hljs-comment">// 可视区域高度 - 元素底部到窗口顶部的高度 &lt; 0, 则说明被键盘挡住了</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.innerHeight - bottom &lt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }</code></pre>
<p>iphone 6 和 6s 奇葩现象</p>
<p><span class="img-wrap"><img data-src="/img/bVAmEN?w=784&amp;h=1228" src="https://static.alili.tech/img/bVAmEN?w=784&amp;h=1228" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">部分低端android机, 键盘收起后, 键盘区域显示空白, 需重新设置height, 如图:</h3>
<p><span class="img-wrap"><img data-src="/img/bVAmAK?w=816&amp;h=1300" src="https://static.alili.tech/img/bVAmAK?w=816&amp;h=1300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // android, 键盘弹起/收回会触发resize事件
    window.onresize = function () {
        // Height: 键盘没有弹出时window.innerHeight
        if (Height == window.innerHeight) {
            $(this.scrollWrapper).css('height', window.innerHeight + 'px')
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// android, 键盘弹起/收回会触发resize事件</span>
    <span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// Height: 键盘没有弹出时window.innerHeight</span>
        <span class="hljs-keyword">if</span> (Height == <span class="hljs-built_in">window</span>.innerHeight) {
            $(<span class="hljs-keyword">this</span>.scrollWrapper).css(<span class="hljs-string">'height'</span>, <span class="hljs-built_in">window</span>.innerHeight + <span class="hljs-string">'px'</span>)
        }
    }
</code></pre>
<h2 id="articleHeader10">另外需要注意的是</h2>
<ol>
<li><p>js拿不到键盘的 弹起/收起 事件;</p></li>
<li><p>ios上键盘 弹起/收回 不会触发window.resize事件;</p></li>
<li><p>android 4.4 以下, 键盘唤起时, 不仅会触发resize, 而且会触发scroll事件;<br>   (如果有需要滑动失去焦点这个需求, 选择touchMove, 不要选择scroll)</p></li>
<li><p>ios之所以会遮挡输入框, 是因为, 第三方输入法的tool bar 或者 键盘也被当做可视区域了(包含在键盘弹出时的window.innerHeight)</p></li>
</ol>
<h2 id="articleHeader11">总结</h2>
<blockquote><p>最后建议(ios已经完美解决, 此建议可酌情忽略了), 类似这种需求,尽量不要放在屏幕下50%</p></blockquote>
<ol>
<li><p>转场输入评论, 微博等;</p></li>
<li><p>弹窗到可视区域上50%区域, 3G门户;</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVAmCj?w=720&amp;h=1280" src="https://static.alili.tech/img/bVAmCj?w=720&amp;h=1280" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
(2016-11-04完美解决)移动端iOS第三方输入法遮挡底部input及android键盘回落后留白问题

## 原文链接
[https://segmentfault.com/a/1190000006243816](https://segmentfault.com/a/1190000006243816)

