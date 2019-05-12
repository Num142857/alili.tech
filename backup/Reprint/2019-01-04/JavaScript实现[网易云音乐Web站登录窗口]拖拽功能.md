---
title: 'JavaScript实现[网易云音乐Web站登录窗口]拖拽功能' 
date: 2019-01-04 2:30:10
hidden: true
slug: j2raafyvjp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<blockquote><p>你可能发现有很多网站他们的登录窗口或者说是登录框是可以拖动的, 更有甚者他们的站点提示框都可以拖动, 你也许可能会对这个功能的实现感兴趣, 那么这篇文章可能会对你有所帮助！具体的网站示例以 <code>网易云音乐</code> Web站点为例，具体效果如下图所示:</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010741485" src="https://static.alili.tech/img/remote/1460000010741485" alt="网易云音乐登录窗口" title="网易云音乐登录窗口" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">JavaScript实现登录窗口的拖拽原理解析</h2>
<blockquote><p>预先假设要实现的登录框允许点击鼠标获取拖拽事件的具体位置就是登录框的标题区块也就是下图所示登录区块黑色部分在文章中以 <code>允许点击鼠标获取拖拽事件区域</code> 说明问题, 并且假定 <code>红色十字</code> 图标就是鼠标状态:</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010741486" src="https://static.alili.tech/img/remote/1460000010741486" alt="允许点击鼠标获取拖拽事件的具体位置" title="允许点击鼠标获取拖拽事件的具体位置" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>当鼠标在 <code>允许点击鼠标获取拖拽事件区域</code> 点击鼠标时触发 <code>onmousedown</code> 事件</p></li>
<li><p>获取鼠标在 <code>允许点击鼠标获取拖拽事件区域</code> 点击时的具体位置</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010741487" src="https://static.alili.tech/img/remote/1460000010741487" alt="点击时的具体位置" title="点击时的具体位置" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<p>当鼠标移动时改变 <code>登录窗口</code> 左上角位置(也是就是坐标点位置)距离页面可视区左上角位置, 那么这个 <code>登录窗口</code> 也就移动了, 也就实现了 <code>登录窗口</code> 的拖拽功能</p>
<ul><li><p>当鼠标移动时触发 <code>onmousemove</code> 事件</p></li></ul>
</li>
<li>
<p>当鼠标抬起时, 触发 <code>onmouseup</code> 事件</p>
<ul>
<li><p>释放 <code>onmousemove</code> 事件</p></li>
<li><p>释放 <code>onmouseup</code> 事件自身</p></li>
</ul>
</li>
</ul>
<blockquote><p>以上过程就是一个完整的 <code>登录窗口</code> 拖拽的过程, 不过要注意以下几点:</p></blockquote>
<ol>
<li>
<p>拖拽移动 <code>登录窗口</code> 时为 <code>document</code> 绑定 <code>onmousemove</code> 事件, 而不是 <code>允许点击鼠标获取拖拽事件区域</code></p>
<ul>
<li><p>为什么这样做呢? 如果只是为 <code>允许点击鼠标获取拖拽事件区域</code> 绑定 <code>onmousemove</code> 件事, 当鼠标移动的快了就会导致事件绑定丢失, 不过你可以去验证</p></li>
<li><p>下图是将 <code>onmousemove</code> 绑定到 <code>允许点击鼠标获取拖拽事件区域</code> 这样其是不对的！</p></li>
<li><p><span class="img-wrap"><img data-src="/img/remote/1460000010741488" src="https://static.alili.tech/img/remote/1460000010741488" alt="示例" title="示例" style="cursor: pointer;"></span></p></li>
<li><p>下图是将 <code>onmousemove</code> 绑定到 <code>document</code> 上的事件, 这样才是最完美的, 因为你不管怎么拖它都不会丢失事件绑定</p></li>
<li><p><span class="img-wrap"><img data-src="/img/remote/1460000010741489" src="https://static.alili.tech/img/remote/1460000010741489" alt="示例" title="示例" style="cursor: pointer;"></span></p></li>
</ul>
</li>
<li>
<p>抬起鼠标时同样也是为 <code>document</code> 绑定 <code>onmouseup</code> 事件, 而不是 <code>允许点击鼠标获取拖拽事件区域</code></p>
<ul>
<li><p>为什么呢？如果只是为 <code>允许点击鼠标获取拖拽事件区域</code> 绑定 <code>onmouseup</code> 事件, 你会发现当鼠标移动到脱离文档可视区域时，抬起点击的鼠标按键你会发现当再一次移动鼠标时它依然可以移动这就不符合常理了不是嘛！那就给 <code>document</code> 绑定 <code>onmouseup</code> 事件时，它就可以很好的解决这个怪异的问题！</p></li>
<li><p>下图是将 <code>onmouseup</code> 绑定到 <code>允许点击鼠标获取拖拽事件区域</code> 这样其是不对的！</p></li>
<li><p><span class="img-wrap"><img data-src="/img/remote/1460000010741490" src="https://static.alili.tech/img/remote/1460000010741490" alt="示例" title="示例" style="cursor: pointer;"></span></p></li>
<li><p>下图是将 <code>onmouseup</code> 绑定到 <code>document</code> 上的事件, 这样才是最完美的</p></li>
<li><p><span class="img-wrap"><img data-src="/img/remote/1460000010741491" src="https://static.alili.tech/img/remote/1460000010741491" alt="示例" title="示例" style="cursor: pointer;"></span></p></li>
<li><p>不过你会发现拖不回来了, 这是问题也是后面要说的优化问题, 先留一坑，一会填坑时再说！</p></li>
</ul>
</li>
</ol>
<h2 id="articleHeader2">JavaScript实现登录窗口的拖拽效果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>JS拖拽</title>
    <style>
        /* public style start */
        * { margin: 0; padding: 0; }
        body, textarea, select, input, button {font-size: 12px;color: white;font-family: Arial, Helvetica, sans-serif;-webkit-text-size-adjust: none;}
        .fl-l { float: left }
        .fl-r { float: right }
        .clearfix:after {visibility:hidden;display:block;font-size:0;content:'.';clear:both;height:0;}
        .clearfix {*zoom:1;}
        /* public style end */

        /* dialog window style start */

        /* dialog window main */
        #dialog {
            height: 200px;
            width: 400px;
            background-color: #EAF6DB;
            border: 1px solid lightslategray;
            position: absolute;
            top: 200px;
            left: 400px;
        }

        /* dialog window title section */
        .dialog-title {
            height: 40px;
            line-height: 40px;
            background-color: #3a3333;
            cursor: move;
        }

        /* dialog window title inner detail */
        .login, .close {
            display: inline-block;
            margin: 0 15px;
        }
    </style>
    <script>
        window.onload = function () {
            // 获取DOM元素
            var oDialog_title = document.getElementById( 'dialog-title' );  // 允许点击鼠标获取拖拽事件区域
            var oDialog = oDialog_title.parentNode; // 登录窗口

            // 初始化鼠标默认位置
            var iDisX = 0;
            var iDisY = 0;

            // 为获取到的DOM元素添加鼠标按下事件 `onmousedown`
            oDialog_title.onmousedown = function ( ent ) {
                // 保存鼠标事件对象
                var oEvent = ent || event;

                // 距离计算鼠标位于弹出框内的位置
                iDisX = oEvent.clientX - oDialog.offsetLeft;    // 鼠标X轴位置 - 弹出框X外左边距
                iDisY = oEvent.clientY - oDialog.offsetTop;     // 鼠标Y轴位置 - 弹出框Y外上边距

                // 点击弹出框后拖动鼠标, 移动弹出框
                document.onmousemove = function ( ent ) {
                    // 保存鼠标事件对象
                    var oEvent = ent || event;

                    // 当鼠标移动时改变弹出框的位置
                    oDialog.style.left = oEvent.clientX - iDisX + 'px';
                    oDialog.style.top = oEvent.clientY - iDisY + 'px';
                };

                // 当点击鼠标拖动弹出框, 抬起鼠标时
                document.onmouseup = function () {
                    // 清除弹出框的移动事件及本身
                    document.onmousemove = null;
                    document.onmouseup = null;
                };

                // 阻止默认事件, 如果不加这个阻止默认事件, 在firefox下会有一个获取焦点的光标一直在闪动, 在3.0及以下会出现拖动出现重影的情况
                return false;
            };


        };
    </script>
</head>
<body>
    <!-- 假设这个DIV就是一个登录窗口 -->
    <div id=&quot;dialog&quot;>
        <div id=&quot;dialog-title&quot; class=&quot;dialog-title clearfix&quot;>
            <span class=&quot;fl-l login&quot;>登录</span>
            <span class=&quot;fl-r close&quot;>X</span>
        </div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS拖拽<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
        /* public style start */
        * { margin: 0; padding: 0; }
        body, textarea, select, input, button {font-size: 12px;color: white;font-family: Arial, Helvetica, sans-serif;-webkit-text-size-adjust: none;}
        .fl-l { float: left }
        .fl-r { float: right }
        .clearfix:after {visibility:hidden;display:block;font-size:0;content:'.';clear:both;height:0;}
        .clearfix {*zoom:1;}
        /* public style end */

        /* dialog window style start */

        /* dialog window main */
        #dialog {
            height: 200px;
            width: 400px;
            background-color: #EAF6DB;
            border: 1px solid lightslategray;
            position: absolute;
            top: 200px;
            left: 400px;
        }

        /* dialog window title section */
        .dialog-title {
            height: 40px;
            line-height: 40px;
            background-color: #3a3333;
            cursor: move;
        }

        /* dialog window title inner detail */
        .login, .close {
            display: inline-block;
            margin: 0 15px;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取DOM元素</span>
            <span class="hljs-keyword">var</span> oDialog_title = <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'dialog-title'</span> );  <span class="hljs-comment">// 允许点击鼠标获取拖拽事件区域</span>
            <span class="hljs-keyword">var</span> oDialog = oDialog_title.parentNode; <span class="hljs-comment">// 登录窗口</span>

            <span class="hljs-comment">// 初始化鼠标默认位置</span>
            <span class="hljs-keyword">var</span> iDisX = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> iDisY = <span class="hljs-number">0</span>;

            <span class="hljs-comment">// 为获取到的DOM元素添加鼠标按下事件 `onmousedown`</span>
            oDialog_title.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> ent </span>) </span>{
                <span class="hljs-comment">// 保存鼠标事件对象</span>
                <span class="hljs-keyword">var</span> oEvent = ent || event;

                <span class="hljs-comment">// 距离计算鼠标位于弹出框内的位置</span>
                iDisX = oEvent.clientX - oDialog.offsetLeft;    <span class="hljs-comment">// 鼠标X轴位置 - 弹出框X外左边距</span>
                iDisY = oEvent.clientY - oDialog.offsetTop;     <span class="hljs-comment">// 鼠标Y轴位置 - 弹出框Y外上边距</span>

                <span class="hljs-comment">// 点击弹出框后拖动鼠标, 移动弹出框</span>
                <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> ent </span>) </span>{
                    <span class="hljs-comment">// 保存鼠标事件对象</span>
                    <span class="hljs-keyword">var</span> oEvent = ent || event;

                    <span class="hljs-comment">// 当鼠标移动时改变弹出框的位置</span>
                    oDialog.style.left = oEvent.clientX - iDisX + <span class="hljs-string">'px'</span>;
                    oDialog.style.top = oEvent.clientY - iDisY + <span class="hljs-string">'px'</span>;
                };

                <span class="hljs-comment">// 当点击鼠标拖动弹出框, 抬起鼠标时</span>
                <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// 清除弹出框的移动事件及本身</span>
                    <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;
                    <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
                };

                <span class="hljs-comment">// 阻止默认事件, 如果不加这个阻止默认事件, 在firefox下会有一个获取焦点的光标一直在闪动, 在3.0及以下会出现拖动出现重影的情况</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            };


        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 假设这个DIV就是一个登录窗口 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dialog"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dialog-title"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-title clearfix"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl-l login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl-r close"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<blockquote><p>以上就是以一个简单的DIV模拟 <code>登录窗口</code> 实现的一个简单拖拽过程</p></blockquote>
<h2 id="articleHeader3">JavaScript实现登录窗口的拖拽具体效果</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010741492" src="https://static.alili.tech/img/remote/1460000010741492" alt="JavaScript实现登录窗口的拖拽具体效果" title="JavaScript实现登录窗口的拖拽具体效果" style="cursor: pointer;"></span></p>
<blockquote><p>你可能已经发现了这个 <code>登录窗口</code> 与 <code>网易云音乐</code> 最大的区别在于它可以拖拽出文档可视区域, 它甚至可以拖拽到文档不可见区域, 那就永远拖不回了, 就像那已分手并结婚了的前女友永远也回不来一样</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010741493" src="https://static.alili.tech/img/remote/1460000010741493" alt="就像那已分手并结婚了的前女友永远也回不来一样" title="就像那已分手并结婚了的前女友永远也回不来一样" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<p>(好了, 找一没人的地哭晕在厕所好了 <img src="https://static.alili.techundefined" class="emoji" alt="sob" title="sob"> 是不是同时又想起来那几句话[得不到的永远在骚动, 失去的永远在怀念, 身边的永远成为风景, ......]), 以上是逗逼时刻就当没发生一样好了 <img src="https://static.alili.techundefined" class="emoji" alt="joy" title="joy"></p>
<p>其实这也是上面留的一个坑, 现在来优化填坑, 就是实现和 <code>网易云音乐</code> 网站 <code>登录窗口</code> 一样的效果, 禁止 <code>登录窗口</code> 拖拽出文档可视区以外! 下面是填坑时刻, 非战斗人员请火速离开现场  <img src="https://static.alili.techundefined" class="emoji" alt="joy" title="joy"></p>
</blockquote>
<h2 id="articleHeader4">JavaScript实现登录窗口的拖拽优化填坑</h2>
<blockquote><p>其实思路很简单就是当 <code>登录窗口</code> 的四个边和文档窗口的其一边界重合时, 就让 <code>登录窗口</code> 的那一个边的外边距值与重合的文档那一个边的值相等, 那这个事情就妥妥的搞定了!</p></blockquote>
<ul><li><p>只需要修改 <code>documnet.onmousemove</code> 事件方法 <code>登录窗口</code> 当前位置即可!</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当鼠标移动时改变弹出框的位置
oDialog.style.left = oEvent.clientX - iDisX + 'px';
oDialog.style.top = oEvent.clientY - iDisY + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nsis"><code class="console">// 当鼠标移动时改变弹出框的位置
oDialog.style.<span class="hljs-literal">left</span> = oEvent.clientX - iDisX + <span class="hljs-string">'px'</span><span class="hljs-comment">;</span>
oDialog.style.<span class="hljs-literal">top</span> = oEvent.clientY - iDisY + <span class="hljs-string">'px'</span><span class="hljs-comment">;</span></code></pre>
<ul><li><p>改写如下:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 优化填坑 - 禁止 `登录窗口` 拖拽出文档可视区域, 保存 `登录窗口` 在文档中具体位置
var iCurrentDialogDisLift = oEvent.clientX - iDisX; // `登录窗口` 当前位置于X轴具体值
var iCurrentDialogDisTop = oEvent.clientY - iDisY;  // `登录窗口` 当前位置于Y轴具体值

// 检测当前 `登录窗口` X轴是否位于文档可视区域最左侧或最右侧
if ( iCurrentDialogDisLift < 0 ) {
    iCurrentDialogDisLift = 0;
} else if ( iCurrentDialogDisLift > document.documentElement.clientWidth - oDialog.offsetWidth  ) {
    // 当前文档X轴可视区域大小包括左右边框线宽度 - `登录窗口` X轴区域大小包括左右边框线宽度
    iCurrentDialogDisLift = document.documentElement.clientWidth - oDialog.offsetWidth;
}

// 检测当前 `登录窗口` Y轴是否位于文档可视区域最上端或最下端
if ( iCurrentDialogDisTop < 0 ) {
    iCurrentDialogDisTop = 0;
} else if ( iCurrentDialogDisTop > document.documentElement.clientHeight - oDialog.offsetHeight ) {
    // 当前文档Y轴可视区域大小包括上下边框线宽度 - `登录窗口` Y轴区域大小包括上下边框线宽度
    iCurrentDialogDisTop = document.documentElement.clientHeight - oDialog.offsetHeight;
}

// 当鼠标移动时改变弹出框的位置
oDialog.style.left = iCurrentDialogDisLift + 'px';
oDialog.style.top = iCurrentDialogDisTop + 'px';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code class="console"><span class="hljs-comment">// 优化填坑 - 禁止 `登录窗口` 拖拽出文档可视区域, 保存 `登录窗口` 在文档中具体位置</span>
<span class="hljs-keyword">var</span> iCurrentDialogDisLift = oEvent.clientX - iDisX; <span class="hljs-comment">// `登录窗口` 当前位置于X轴具体值</span>
<span class="hljs-keyword">var</span> iCurrentDialogDisTop = oEvent.clientY - iDisY;  <span class="hljs-comment">// `登录窗口` 当前位置于Y轴具体值</span>

<span class="hljs-comment">// 检测当前 `登录窗口` X轴是否位于文档可视区域最左侧或最右侧</span>
<span class="hljs-keyword">if</span> ( iCurrentDialogDisLift &lt; <span class="hljs-number">0</span> ) {
    iCurrentDialogDisLift = <span class="hljs-number">0</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( iCurrentDialogDisLift &gt; <span class="hljs-built_in">document</span>.documentElement.clientWidth - oDialog.offsetWidth  ) {
    <span class="hljs-comment">// 当前文档X轴可视区域大小包括左右边框线宽度 - `登录窗口` X轴区域大小包括左右边框线宽度</span>
    iCurrentDialogDisLift = <span class="hljs-built_in">document</span>.documentElement.clientWidth - oDialog.offsetWidth;
}

<span class="hljs-comment">// 检测当前 `登录窗口` Y轴是否位于文档可视区域最上端或最下端</span>
<span class="hljs-keyword">if</span> ( iCurrentDialogDisTop &lt; <span class="hljs-number">0</span> ) {
    iCurrentDialogDisTop = <span class="hljs-number">0</span>;
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( iCurrentDialogDisTop &gt; <span class="hljs-built_in">document</span>.documentElement.clientHeight - oDialog.offsetHeight ) {
    <span class="hljs-comment">// 当前文档Y轴可视区域大小包括上下边框线宽度 - `登录窗口` Y轴区域大小包括上下边框线宽度</span>
    iCurrentDialogDisTop = <span class="hljs-built_in">document</span>.documentElement.clientHeight - oDialog.offsetHeight;
}

<span class="hljs-comment">// 当鼠标移动时改变弹出框的位置</span>
oDialog.style.left = iCurrentDialogDisLift + <span class="hljs-string">'px'</span>;
oDialog.style.top = iCurrentDialogDisTop + <span class="hljs-string">'px'</span>;</code></pre>
<h2 id="articleHeader5">JavaScript实现登录窗口的拖拽优化填坑全文档</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>JS拖拽</title>
    <style>
        /* public style start */
        * { margin: 0; padding: 0; }
        body, textarea, select, input, button {font-size: 12px;color: white;font-family: Arial, Helvetica, sans-serif;-webkit-text-size-adjust: none;}
        .fl-l { float: left }
        .fl-r { float: right }
        .clearfix:after {visibility:hidden;display:block;font-size:0;content:'.';clear:both;height:0;}
        .clearfix {*zoom:1;}
        /* public style end */

        /* dialog window style start */

        /* dialog window main */
        #dialog {
            height: 200px;
            width: 400px;
            background-color: #EAF6DB;
            border: 1px solid lightslategray;
            position: absolute;
            top: 200px;
            left: 400px;
        }

        /* dialog window title section */
        .dialog-title {
            height: 40px;
            line-height: 40px;
            background-color: #3a3333;
            cursor: move;
        }

        /* dialog window title inner detail */
        .login, .close {
            display: inline-block;
            margin: 0 15px;
        }
    </style>
    <script>
        window.onload = function () {
            // 获取DOM元素
            var oDialog_title = document.getElementById( 'dialog-title' );  // 允许点击鼠标获取拖拽事件区域
            var oDialog = oDialog_title.parentNode; // 登录窗口

            // 初始化鼠标默认位置
            var iDisX = 0;
            var iDisY = 0;

            // 为获取到的DOM元素添加鼠标按下事件 `onmousedown`
            oDialog_title.onmousedown = function ( ent ) {
                // 保存鼠标事件对象
                var oEvent = ent || event;

                // 距离计算鼠标位于弹出框内的位置
                iDisX = oEvent.clientX - oDialog.offsetLeft;    // 鼠标X轴位置 - 弹出框X外左边距
                iDisY = oEvent.clientY - oDialog.offsetTop;     // 鼠标Y轴位置 - 弹出框Y外上边距

                // 点击弹出框后拖动鼠标, 移动弹出框
                document.onmousemove = function ( ent ) {
                    // 保存鼠标事件对象
                    var oEvent = ent || event;

                    // 优化填坑 - 禁止 `登录窗口` 拖拽出文档可视区域, 保存 `登录窗口` 在文档中具体位置
                    var iCurrentDialogDisLift = oEvent.clientX - iDisX; // `登录窗口` 当前位置于X轴具体值
                    var iCurrentDialogDisTop = oEvent.clientY - iDisY;  // `登录窗口` 当前位置于Y轴具体值

                    // 检测当前 `登录窗口` X轴是否位于文档可视区域最左侧或最右侧
                    if ( iCurrentDialogDisLift < 0 ) {
                        iCurrentDialogDisLift = 0;
                    } else if ( iCurrentDialogDisLift > document.documentElement.clientWidth - oDialog.offsetWidth  ) {
                        // 当前文档X轴可视区域大小包括左右边框线宽度 - `登录窗口` X轴区域大小包括左右边框线宽度
                        iCurrentDialogDisLift = document.documentElement.clientWidth - oDialog.offsetWidth;
                    }

                    // 检测当前 `登录窗口` Y轴是否位于文档可视区域最上端或最下端
                    if ( iCurrentDialogDisTop < 0 ) {
                        iCurrentDialogDisTop = 0;
                    } else if ( iCurrentDialogDisTop > document.documentElement.clientHeight - oDialog.offsetHeight ) {
                        // 当前文档Y轴可视区域大小包括上下边框线宽度 - `登录窗口` Y轴区域大小包括上下边框线宽度
                        iCurrentDialogDisTop = document.documentElement.clientHeight - oDialog.offsetHeight;
                    }

                    // 当鼠标移动时改变弹出框的位置
                    oDialog.style.left = iCurrentDialogDisLift + 'px';
                    oDialog.style.top = iCurrentDialogDisTop + 'px';
                };

                // 当点击鼠标拖动弹出框, 抬起鼠标时
                document.onmouseup = function () {
                    // 清除弹出框的移动事件及本身
                    document.onmousemove = null;
                    document.onmouseup = null;
                };

                // 阻止默认事件, 如果不加这个阻止默认事件, 在firefox下会有一个获取焦点的光标一直在闪动, 在3.0及以下会出现拖动出现重影的情况
                return false;
            };
        };
    </script>
</head>
<body>
    <!-- 假设这个DIV就是一个登录窗口 -->
    <div id=&quot;dialog&quot;>
        <div id=&quot;dialog-title&quot; class=&quot;dialog-title clearfix&quot;>
            <span class=&quot;fl-l login&quot;>登录</span>
            <span class=&quot;fl-r close&quot;>X</span>
        </div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="console"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS拖拽<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
        /* public style start */
        * { margin: 0; padding: 0; }
        body, textarea, select, input, button {font-size: 12px;color: white;font-family: Arial, Helvetica, sans-serif;-webkit-text-size-adjust: none;}
        .fl-l { float: left }
        .fl-r { float: right }
        .clearfix:after {visibility:hidden;display:block;font-size:0;content:'.';clear:both;height:0;}
        .clearfix {*zoom:1;}
        /* public style end */

        /* dialog window style start */

        /* dialog window main */
        #dialog {
            height: 200px;
            width: 400px;
            background-color: #EAF6DB;
            border: 1px solid lightslategray;
            position: absolute;
            top: 200px;
            left: 400px;
        }

        /* dialog window title section */
        .dialog-title {
            height: 40px;
            line-height: 40px;
            background-color: #3a3333;
            cursor: move;
        }

        /* dialog window title inner detail */
        .login, .close {
            display: inline-block;
            margin: 0 15px;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取DOM元素</span>
            <span class="hljs-keyword">var</span> oDialog_title = <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'dialog-title'</span> );  <span class="hljs-comment">// 允许点击鼠标获取拖拽事件区域</span>
            <span class="hljs-keyword">var</span> oDialog = oDialog_title.parentNode; <span class="hljs-comment">// 登录窗口</span>

            <span class="hljs-comment">// 初始化鼠标默认位置</span>
            <span class="hljs-keyword">var</span> iDisX = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> iDisY = <span class="hljs-number">0</span>;

            <span class="hljs-comment">// 为获取到的DOM元素添加鼠标按下事件 `onmousedown`</span>
            oDialog_title.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> ent </span>) </span>{
                <span class="hljs-comment">// 保存鼠标事件对象</span>
                <span class="hljs-keyword">var</span> oEvent = ent || event;

                <span class="hljs-comment">// 距离计算鼠标位于弹出框内的位置</span>
                iDisX = oEvent.clientX - oDialog.offsetLeft;    <span class="hljs-comment">// 鼠标X轴位置 - 弹出框X外左边距</span>
                iDisY = oEvent.clientY - oDialog.offsetTop;     <span class="hljs-comment">// 鼠标Y轴位置 - 弹出框Y外上边距</span>

                <span class="hljs-comment">// 点击弹出框后拖动鼠标, 移动弹出框</span>
                <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> ent </span>) </span>{
                    <span class="hljs-comment">// 保存鼠标事件对象</span>
                    <span class="hljs-keyword">var</span> oEvent = ent || event;

                    <span class="hljs-comment">// 优化填坑 - 禁止 `登录窗口` 拖拽出文档可视区域, 保存 `登录窗口` 在文档中具体位置</span>
                    <span class="hljs-keyword">var</span> iCurrentDialogDisLift = oEvent.clientX - iDisX; <span class="hljs-comment">// `登录窗口` 当前位置于X轴具体值</span>
                    <span class="hljs-keyword">var</span> iCurrentDialogDisTop = oEvent.clientY - iDisY;  <span class="hljs-comment">// `登录窗口` 当前位置于Y轴具体值</span>

                    <span class="hljs-comment">// 检测当前 `登录窗口` X轴是否位于文档可视区域最左侧或最右侧</span>
                    <span class="hljs-keyword">if</span> ( iCurrentDialogDisLift &lt; <span class="hljs-number">0</span> ) {
                        iCurrentDialogDisLift = <span class="hljs-number">0</span>;
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( iCurrentDialogDisLift &gt; <span class="hljs-built_in">document</span>.documentElement.clientWidth - oDialog.offsetWidth  ) {
                        <span class="hljs-comment">// 当前文档X轴可视区域大小包括左右边框线宽度 - `登录窗口` X轴区域大小包括左右边框线宽度</span>
                        iCurrentDialogDisLift = <span class="hljs-built_in">document</span>.documentElement.clientWidth - oDialog.offsetWidth;
                    }

                    <span class="hljs-comment">// 检测当前 `登录窗口` Y轴是否位于文档可视区域最上端或最下端</span>
                    <span class="hljs-keyword">if</span> ( iCurrentDialogDisTop &lt; <span class="hljs-number">0</span> ) {
                        iCurrentDialogDisTop = <span class="hljs-number">0</span>;
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( iCurrentDialogDisTop &gt; <span class="hljs-built_in">document</span>.documentElement.clientHeight - oDialog.offsetHeight ) {
                        <span class="hljs-comment">// 当前文档Y轴可视区域大小包括上下边框线宽度 - `登录窗口` Y轴区域大小包括上下边框线宽度</span>
                        iCurrentDialogDisTop = <span class="hljs-built_in">document</span>.documentElement.clientHeight - oDialog.offsetHeight;
                    }

                    <span class="hljs-comment">// 当鼠标移动时改变弹出框的位置</span>
                    oDialog.style.left = iCurrentDialogDisLift + <span class="hljs-string">'px'</span>;
                    oDialog.style.top = iCurrentDialogDisTop + <span class="hljs-string">'px'</span>;
                };

                <span class="hljs-comment">// 当点击鼠标拖动弹出框, 抬起鼠标时</span>
                <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// 清除弹出框的移动事件及本身</span>
                    <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;
                    <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
                };

                <span class="hljs-comment">// 阻止默认事件, 如果不加这个阻止默认事件, 在firefox下会有一个获取焦点的光标一直在闪动, 在3.0及以下会出现拖动出现重影的情况</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            };
        };
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 假设这个DIV就是一个登录窗口 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dialog"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dialog-title"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-title clearfix"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl-l login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl-r close"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader6">JavaScript实现登录窗口的拖拽优化填坑后具体效果</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010741494" src="https://static.alili.tech/img/remote/1460000010741494" alt="JavaScript实现登录窗口的拖拽优化填坑后具体效果" title="JavaScript实现登录窗口的拖拽优化填坑后具体效果" style="cursor: pointer;"></span></p>
<blockquote>
<p>文章写到这里可能也有不伙伴说了, 滚动一小段距离也就是出现滚动条时, 再拖拽还是会出现 <code>登录窗口</code> 脱离可视区域的情况!</p>
<p>对于小伙伴提出的问题至少有二种解决方案！</p>
</blockquote>
<ul>
<li><p>添加滚动距离计算, 当页面滚动后实时让 <code>登录窗口</code> 位于正中间并且只允许在可视区域拖拽</p></li>
<li><p>添加模态框, 就是当出现 <code>登录窗口</code> 时禁止滚动</p></li>
</ul>
<blockquote><p>下面来一个一个的说:</p></blockquote>
<h2 id="articleHeader7">JavaScript实现登录窗口的拖拽优化填坑 - 滚动距离计算</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>JS拖拽扩展-计算滚动距离</title>
    <style>
        /* public style start */
        * { margin: 0; padding: 0; }
        body, textarea, select, input, button {font-size: 12px;color: white;font-family: Arial, Helvetica, sans-serif;-webkit-text-size-adjust: none;}
        .fl-l { float: left }
        .fl-r { float: right }
        .clearfix:after {visibility:hidden;display:block;font-size:0;content:'.';clear:both;height:0;}
        .clearfix {*zoom:1;}
        /* public style end */

        /* dialog window style start */

        /* dialog window main */
        #dialog {
            height: 200px;
            width: 400px;
            background-color: #EAF6DB;
            border: 1px solid lightslategray;
            position: absolute;
        }

        /* dialog window title section */
        .dialog-title {
            height: 40px;
            line-height: 40px;
            background-color: #3a3333;
            cursor: move;
        }

        /* dialog window title inner detail */
        .login, .close {
            display: inline-block;
            margin: 0 15px;
        }
    </style>
    <script>
        window.onload = function () {
            // 获取DOM元素
            var oDialog_title = document.getElementById( 'dialog-title' );  // 允许点击鼠标获取拖拽事件区域
            var oDialog = oDialog_title.parentNode; // 登录窗口

            // 初始化 `登录窗口` 默认居中位置 start

            // 获取当前文档可视区宽度和高度
            var iScreenHeight = document.documentElement.clientHeight;  // 可视区高度
            var iScreenWidth = document.documentElement.clientWidth;  // 可视区宽度

            // 获取当前 `登录窗口` 宽度和高度
            var iCurrentDialogHeight = oDialog.offsetHeight;    // 窗口高度
            var iCurrentDialogWidth = oDialog.offsetWidth;    // 窗口宽度

            // 计算保存初始化后 `登录窗口` 的默认垂直水平居中位置
            var iCurrentDialogTop = parseInt( ( iScreenHeight / 2 ) - ( iCurrentDialogHeight / 2 ) );
            var iCurrentDialogLeft = parseInt( ( iScreenWidth / 2 ) - ( iCurrentDialogWidth / 2 ) );

            // 修改 `登录窗口` 默认位置
            oDialog.style.top = iCurrentDialogTop + 'px';
            oDialog.style.left = iCurrentDialogLeft + 'px';

            // 初始化 `登录窗口` 默认居中位置 end


            // 初始化当前滚动条滚动距离
            var iCurrentScrollTop = 0;
            // 初始化当前 `登录窗口` 应该滚动距离
            var iRealTimeTop = 0;

            // 计算当前滚动条滚动距离
            window.onscroll = function () {
                // 兼容写法获取当前滚动条滚动距离
                iCurrentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                // 直接这么改变top值, 会出现抖动, 这样感觉太生硬, 体验也不太好
                // oDialog.style.top = iCurrentDialogTop + iCurrentScrollTop + 'px';

                // 当前 `登录窗口` 应该实时滚动距离
                iRealTimeTop = iCurrentDialogTop + iCurrentScrollTop;

                // 为了防止出现抖动, 这样感觉也不太生硬, 优化体验可以采用缓冲运动方式
                fnBufferMotion( oDialog, iRealTimeTop );
            };

            // 初始化鼠标默认位置
            var iDisX = 0;
            var iDisY = 0;

            // 为获取到的DOM元素添加鼠标按下事件 `onmousedown`
            oDialog_title.onmousedown = function ( ent ) {
                // 保存鼠标事件对象
                var oEvent = ent || event;

                // 距离计算鼠标位于弹出框内的位置
                iDisX = oEvent.clientX - oDialog.offsetLeft;    // 鼠标X轴位置 - 弹出框X外左边距
                iDisY = oEvent.clientY + iCurrentDialogTop - oDialog.offsetTop;     // 鼠标Y轴位置 + 当前滚动条滚动距离 - 弹出框Y外上边距

                console.log( iCurrentDialogTop );

                // 点击弹出框后拖动鼠标, 移动弹出框
                document.onmousemove = function ( ent ) {
                    // 保存鼠标事件对象
                    var oEvent = ent || event;

                    // 优化填坑 - 禁止 `登录窗口` 拖拽出文档可视区域, 保存 `登录窗口` 在文档中具体位置
                    var iCurrentDialogDisLift = oEvent.clientX - iDisX; // `登录窗口` 当前位置于X轴具体值
                    var iCurrentDialogDisTop = oEvent.clientY + iCurrentDialogTop - iDisY;  // `登录窗口` 当前位置于Y轴具体值

                    // 检测当前 `登录窗口` X轴是否位于文档可视区域最左侧或最右侧
                    if ( iCurrentDialogDisLift < 0 ) {
                        iCurrentDialogDisLift = 0;
                    } else if ( iCurrentDialogDisLift > document.documentElement.clientWidth - oDialog.offsetWidth  ) {
                        // 当前文档X轴可视区域大小包括左右边框线宽度 - `登录窗口` X轴区域大小包括左右边框线宽度
                        iCurrentDialogDisLift = document.documentElement.clientWidth - oDialog.offsetWidth;
                    }

                    // 检测当前 `登录窗口` Y轴是否位于文档可视区域 + 当前滚动条滚动距离 的最上端或最下端
                    if ( iCurrentDialogDisTop < iCurrentScrollTop ) {
                        iCurrentDialogDisTop = iCurrentScrollTop;
                    } else if ( iCurrentDialogDisTop > document.documentElement.clientHeight + iCurrentScrollTop - oDialog.offsetHeight ) {
                        // 当前文档Y轴可视区域大小包括上下边框线宽度 + 当前滚动条滚动距离 - `登录窗口` Y轴区域大小包括上下边框线宽度
                        iCurrentDialogDisTop = document.documentElement.clientHeight + iCurrentScrollTop - oDialog.offsetHeight;
                    }

                    // 当鼠标移动时改变弹出框的位置
                    oDialog.style.left = iCurrentDialogDisLift + 'px';
                    oDialog.style.top = iCurrentDialogDisTop + 'px';
                };

                // 当点击鼠标拖动弹出框, 抬起鼠标时
                document.onmouseup = function () {
                    // 清除弹出框的移动事件及本身
                    document.onmousemove = null;
                    document.onmouseup = null;
                };

                // 阻止默认事件, 如果不加这个阻止默认事件, 在firefox下会有一个获取焦点的光标一直在闪动, 在3.0及以下会出现拖动出现重影的情况
                return false;
            };
        };

        // 初始化定义器
        var oTimer = null;
        /**
         * 缓冲运动
         * @param oElement   运动对象
         * @param iTarget   目标位置或者说目标点
         */
        function fnBufferMotion( oElement, iTarget ) {
            // 首先就是清除定时器, 因为当下面开启定时器之前禁止存在还有再执行的定时器, 要不然会存在问题, 你可以验证一下
            clearInterval( oTimer );
            // 开启定时器
            oTimer = setInterval( function () {

                // 缓冲运动速度
                var iSpeed = ( iTarget - oElement.offsetTop ) / 8;

                // 缓冲运动速度取整
                iSpeed = iSpeed > 0 ? Math.ceil( iSpeed ) : Math.floor( iSpeed );

                // 判断是否缓冲运动到目标点, 是就关闭定时器, 否则就接着运动呗
                if ( iTarget == oElement.offsetTop ) {
                    clearInterval( oTimer );    // 关闭定时器
                } else {
                    oElement.style.top = oElement.offsetTop + iSpeed + 'px';    // 缓冲运动改变 `登录窗口` 的上外边距
                }
            }, 30 );
        }
    </script>
</head>
<body style=&quot;height: 4000px;&quot;>
    <!-- 假设这个DIV就是一个登录窗口 -->
    <div id=&quot;dialog&quot;>
        <div id=&quot;dialog-title&quot; class=&quot;dialog-title clearfix&quot;>
            <span class=&quot;fl-l login&quot;>登录</span>
            <span class=&quot;fl-r close&quot;>X</span>
        </div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS拖拽扩展-计算滚动距离<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
        /* public style start */
        * { margin: 0; padding: 0; }
        body, textarea, select, input, button {font-size: 12px;color: white;font-family: Arial, Helvetica, sans-serif;-webkit-text-size-adjust: none;}
        .fl-l { float: left }
        .fl-r { float: right }
        .clearfix:after {visibility:hidden;display:block;font-size:0;content:'.';clear:both;height:0;}
        .clearfix {*zoom:1;}
        /* public style end */

        /* dialog window style start */

        /* dialog window main */
        #dialog {
            height: 200px;
            width: 400px;
            background-color: #EAF6DB;
            border: 1px solid lightslategray;
            position: absolute;
        }

        /* dialog window title section */
        .dialog-title {
            height: 40px;
            line-height: 40px;
            background-color: #3a3333;
            cursor: move;
        }

        /* dialog window title inner detail */
        .login, .close {
            display: inline-block;
            margin: 0 15px;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取DOM元素</span>
            <span class="hljs-keyword">var</span> oDialog_title = <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'dialog-title'</span> );  <span class="hljs-comment">// 允许点击鼠标获取拖拽事件区域</span>
            <span class="hljs-keyword">var</span> oDialog = oDialog_title.parentNode; <span class="hljs-comment">// 登录窗口</span>

            <span class="hljs-comment">// 初始化 `登录窗口` 默认居中位置 start</span>

            <span class="hljs-comment">// 获取当前文档可视区宽度和高度</span>
            <span class="hljs-keyword">var</span> iScreenHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight;  <span class="hljs-comment">// 可视区高度</span>
            <span class="hljs-keyword">var</span> iScreenWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth;  <span class="hljs-comment">// 可视区宽度</span>

            <span class="hljs-comment">// 获取当前 `登录窗口` 宽度和高度</span>
            <span class="hljs-keyword">var</span> iCurrentDialogHeight = oDialog.offsetHeight;    <span class="hljs-comment">// 窗口高度</span>
            <span class="hljs-keyword">var</span> iCurrentDialogWidth = oDialog.offsetWidth;    <span class="hljs-comment">// 窗口宽度</span>

            <span class="hljs-comment">// 计算保存初始化后 `登录窗口` 的默认垂直水平居中位置</span>
            <span class="hljs-keyword">var</span> iCurrentDialogTop = <span class="hljs-built_in">parseInt</span>( ( iScreenHeight / <span class="hljs-number">2</span> ) - ( iCurrentDialogHeight / <span class="hljs-number">2</span> ) );
            <span class="hljs-keyword">var</span> iCurrentDialogLeft = <span class="hljs-built_in">parseInt</span>( ( iScreenWidth / <span class="hljs-number">2</span> ) - ( iCurrentDialogWidth / <span class="hljs-number">2</span> ) );

            <span class="hljs-comment">// 修改 `登录窗口` 默认位置</span>
            oDialog.style.top = iCurrentDialogTop + <span class="hljs-string">'px'</span>;
            oDialog.style.left = iCurrentDialogLeft + <span class="hljs-string">'px'</span>;

            <span class="hljs-comment">// 初始化 `登录窗口` 默认居中位置 end</span>


            <span class="hljs-comment">// 初始化当前滚动条滚动距离</span>
            <span class="hljs-keyword">var</span> iCurrentScrollTop = <span class="hljs-number">0</span>;
            <span class="hljs-comment">// 初始化当前 `登录窗口` 应该滚动距离</span>
            <span class="hljs-keyword">var</span> iRealTimeTop = <span class="hljs-number">0</span>;

            <span class="hljs-comment">// 计算当前滚动条滚动距离</span>
            <span class="hljs-built_in">window</span>.onscroll = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">// 兼容写法获取当前滚动条滚动距离</span>
                iCurrentScrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop;

                <span class="hljs-comment">// 直接这么改变top值, 会出现抖动, 这样感觉太生硬, 体验也不太好</span>
                <span class="hljs-comment">// oDialog.style.top = iCurrentDialogTop + iCurrentScrollTop + 'px';</span>

                <span class="hljs-comment">// 当前 `登录窗口` 应该实时滚动距离</span>
                iRealTimeTop = iCurrentDialogTop + iCurrentScrollTop;

                <span class="hljs-comment">// 为了防止出现抖动, 这样感觉也不太生硬, 优化体验可以采用缓冲运动方式</span>
                fnBufferMotion( oDialog, iRealTimeTop );
            };

            <span class="hljs-comment">// 初始化鼠标默认位置</span>
            <span class="hljs-keyword">var</span> iDisX = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> iDisY = <span class="hljs-number">0</span>;

            <span class="hljs-comment">// 为获取到的DOM元素添加鼠标按下事件 `onmousedown`</span>
            oDialog_title.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> ent </span>) </span>{
                <span class="hljs-comment">// 保存鼠标事件对象</span>
                <span class="hljs-keyword">var</span> oEvent = ent || event;

                <span class="hljs-comment">// 距离计算鼠标位于弹出框内的位置</span>
                iDisX = oEvent.clientX - oDialog.offsetLeft;    <span class="hljs-comment">// 鼠标X轴位置 - 弹出框X外左边距</span>
                iDisY = oEvent.clientY + iCurrentDialogTop - oDialog.offsetTop;     <span class="hljs-comment">// 鼠标Y轴位置 + 当前滚动条滚动距离 - 弹出框Y外上边距</span>

                <span class="hljs-built_in">console</span>.log( iCurrentDialogTop );

                <span class="hljs-comment">// 点击弹出框后拖动鼠标, 移动弹出框</span>
                <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"> ent </span>) </span>{
                    <span class="hljs-comment">// 保存鼠标事件对象</span>
                    <span class="hljs-keyword">var</span> oEvent = ent || event;

                    <span class="hljs-comment">// 优化填坑 - 禁止 `登录窗口` 拖拽出文档可视区域, 保存 `登录窗口` 在文档中具体位置</span>
                    <span class="hljs-keyword">var</span> iCurrentDialogDisLift = oEvent.clientX - iDisX; <span class="hljs-comment">// `登录窗口` 当前位置于X轴具体值</span>
                    <span class="hljs-keyword">var</span> iCurrentDialogDisTop = oEvent.clientY + iCurrentDialogTop - iDisY;  <span class="hljs-comment">// `登录窗口` 当前位置于Y轴具体值</span>

                    <span class="hljs-comment">// 检测当前 `登录窗口` X轴是否位于文档可视区域最左侧或最右侧</span>
                    <span class="hljs-keyword">if</span> ( iCurrentDialogDisLift &lt; <span class="hljs-number">0</span> ) {
                        iCurrentDialogDisLift = <span class="hljs-number">0</span>;
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( iCurrentDialogDisLift &gt; <span class="hljs-built_in">document</span>.documentElement.clientWidth - oDialog.offsetWidth  ) {
                        <span class="hljs-comment">// 当前文档X轴可视区域大小包括左右边框线宽度 - `登录窗口` X轴区域大小包括左右边框线宽度</span>
                        iCurrentDialogDisLift = <span class="hljs-built_in">document</span>.documentElement.clientWidth - oDialog.offsetWidth;
                    }

                    <span class="hljs-comment">// 检测当前 `登录窗口` Y轴是否位于文档可视区域 + 当前滚动条滚动距离 的最上端或最下端</span>
                    <span class="hljs-keyword">if</span> ( iCurrentDialogDisTop &lt; iCurrentScrollTop ) {
                        iCurrentDialogDisTop = iCurrentScrollTop;
                    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( iCurrentDialogDisTop &gt; <span class="hljs-built_in">document</span>.documentElement.clientHeight + iCurrentScrollTop - oDialog.offsetHeight ) {
                        <span class="hljs-comment">// 当前文档Y轴可视区域大小包括上下边框线宽度 + 当前滚动条滚动距离 - `登录窗口` Y轴区域大小包括上下边框线宽度</span>
                        iCurrentDialogDisTop = <span class="hljs-built_in">document</span>.documentElement.clientHeight + iCurrentScrollTop - oDialog.offsetHeight;
                    }

                    <span class="hljs-comment">// 当鼠标移动时改变弹出框的位置</span>
                    oDialog.style.left = iCurrentDialogDisLift + <span class="hljs-string">'px'</span>;
                    oDialog.style.top = iCurrentDialogDisTop + <span class="hljs-string">'px'</span>;
                };

                <span class="hljs-comment">// 当点击鼠标拖动弹出框, 抬起鼠标时</span>
                <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">// 清除弹出框的移动事件及本身</span>
                    <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;
                    <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
                };

                <span class="hljs-comment">// 阻止默认事件, 如果不加这个阻止默认事件, 在firefox下会有一个获取焦点的光标一直在闪动, 在3.0及以下会出现拖动出现重影的情况</span>
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            };
        };

        <span class="hljs-comment">// 初始化定义器</span>
        <span class="hljs-keyword">var</span> oTimer = <span class="hljs-literal">null</span>;
        <span class="hljs-comment">/**
         * 缓冲运动
         * @param oElement   运动对象
         * @param iTarget   目标位置或者说目标点
         */</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fnBufferMotion</span>(<span class="hljs-params"> oElement, iTarget </span>) </span>{
            <span class="hljs-comment">// 首先就是清除定时器, 因为当下面开启定时器之前禁止存在还有再执行的定时器, 要不然会存在问题, 你可以验证一下</span>
            clearInterval( oTimer );
            <span class="hljs-comment">// 开启定时器</span>
            oTimer = setInterval( <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

                <span class="hljs-comment">// 缓冲运动速度</span>
                <span class="hljs-keyword">var</span> iSpeed = ( iTarget - oElement.offsetTop ) / <span class="hljs-number">8</span>;

                <span class="hljs-comment">// 缓冲运动速度取整</span>
                iSpeed = iSpeed &gt; <span class="hljs-number">0</span> ? <span class="hljs-built_in">Math</span>.ceil( iSpeed ) : <span class="hljs-built_in">Math</span>.floor( iSpeed );

                <span class="hljs-comment">// 判断是否缓冲运动到目标点, 是就关闭定时器, 否则就接着运动呗</span>
                <span class="hljs-keyword">if</span> ( iTarget == oElement.offsetTop ) {
                    clearInterval( oTimer );    <span class="hljs-comment">// 关闭定时器</span>
                } <span class="hljs-keyword">else</span> {
                    oElement.style.top = oElement.offsetTop + iSpeed + <span class="hljs-string">'px'</span>;    <span class="hljs-comment">// 缓冲运动改变 `登录窗口` 的上外边距</span>
                }
            }, <span class="hljs-number">30</span> );
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height: 4000px;"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 假设这个DIV就是一个登录窗口 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dialog"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dialog-title"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-title clearfix"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl-l login"</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fl-r close"</span>&gt;</span>X<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader8">JavaScript实现登录窗口的拖拽优化填坑 - 滚动距离计算效果</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010758284" src="https://static.alili.tech/img/remote/1460000010758284" alt="JavaScript实现登录窗口的拖拽优化填坑 - 滚动距离计算效果" title="JavaScript实现登录窗口的拖拽优化填坑 - 滚动距离计算效果" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>至于添加模态框, 就是当出现 <code>登录窗口</code> 时禁止滚动这种方法你可以试着实现一下！</p></blockquote>
<p><a href="https://github.com/warnerwu/NetEase-cloud-music-Web-station-login-window-drafting" rel="nofollow noreferrer" target="_blank">Github: JavaScript实现【网易云音乐Web站登录窗口】拖拽功能</a></p>
<blockquote>
<p>以上就是实现与 <code>网易云音乐</code> Web站 <code>登录窗口</code>  拖拽效果一致的具体过程</p>
<p>希望本文对你的工作和学习有所帮助</p>
<p>如果觉得还不错怎么感谢我呢？ 妈呀! 点赞啊!</p>
<p>Good Luck! from warnerwu at 2017.08.19 AM</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript实现[网易云音乐Web站登录窗口]拖拽功能

## 原文链接
[https://segmentfault.com/a/1190000010741480](https://segmentfault.com/a/1190000010741480)

