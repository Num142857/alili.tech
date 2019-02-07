---
title: 'HTML 简单拼图游戏' 
date: 2019-02-08 2:30:41
hidden: true
slug: 990vsm47t8i
categories: [reprint]
---

{{< raw >}}

                    
<p>先不废话，<a href="http://www.lemonvc.com/html/20160616/pintu.html" rel="nofollow noreferrer" target="_blank">请看演示</a>。</p>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVyoj2" src="https://static.alili.tech/img/bVyoj2" alt="拼图游戏" title="拼图游戏" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVyoj5" src="https://static.alili.tech/img/bVyoj5" alt="开始游戏" title="开始游戏" style="cursor: pointer; display: inline;"></span></p>
<p>公司要搞这么个微信活动，可现在没有前端开发，没办法，身为打杂总监只好临时顶下这个空缺了。先找了一些 JS 代码，试用了下都不太理想，好一点的写的又太复杂，改起来有难度，干脆撸起袖子自己干。</p>
<h2 id="articleHeader0">基本需求</h2>
<p>有一个固定区域，被拆分成 c*r 个同等大小的碎片，拿走其中一块，靠近缺口的块可以向缺口方向移动；当拼出原来的图样视为完成。</p>
<p>依照此需求，需要经历 加载图片-》拆分图片-》随机打散-》移动碎片-》判定完成 这些步骤。为了更有可玩性，能自行选择自己的图片就更妙了。</p>
<p>下面就重点说明下各个步骤，为编写方便，引入 jQuery 作为辅助库。</p>
<h2 id="articleHeader1">加载图片</h2>
<p>首先当然是载入图片，计算宽高，对比拼图区域的尺寸进行缩放，如果比例不同，还得“裁剪”掉多余的部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 加载图片
 * cal 的回调参数为:
 *  ox 横向偏移
 *  oy 纵向偏移
 *  this 指向载入的图片的 jQuery 对象
 * @param {String} src 图片路径
 * @param {int} w 额定宽
 * @param {int} h 额定高
 * @param {Fucntion} cal 加载完成后的回调方法
 */
function loadr(src, w, h, cal) {
    var img  =  new Image();
    img.onload = function() {
        var xw = img.width ;
        var xh = img.height;
        var zw = xh * w / h;
        if (zw > xw) {
            // 宽度优先
            img.width   = w;
            img.height  = xh * w / xw;
            xh = (h - img.height) / 2;
            xw = 0;
        } else {
            // 高度优先
            img.height  = h;
            img.width   = xw * h / xh;
            xw = (w - img.width ) / 2;
            xh = 0;
        }

        cal.call(img, xw, xh);
    };
    img.src = src ;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 加载图片
 * cal 的回调参数为:
 *  ox 横向偏移
 *  oy 纵向偏移
 *  this 指向载入的图片的 jQuery 对象
 * @param {String} src 图片路径
 * @param {int} w 额定宽
 * @param {int} h 额定高
 * @param {Fucntion} cal 加载完成后的回调方法
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadr</span>(<span class="hljs-params">src, w, h, cal</span>) </span>{
    <span class="hljs-keyword">var</span> img  =  <span class="hljs-keyword">new</span> Image();
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> xw = img.width ;
        <span class="hljs-keyword">var</span> xh = img.height;
        <span class="hljs-keyword">var</span> zw = xh * w / h;
        <span class="hljs-keyword">if</span> (zw &gt; xw) {
            <span class="hljs-comment">// 宽度优先</span>
            img.width   = w;
            img.height  = xh * w / xw;
            xh = (h - img.height) / <span class="hljs-number">2</span>;
            xw = <span class="hljs-number">0</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 高度优先</span>
            img.height  = h;
            img.width   = xw * h / xh;
            xw = (w - img.width ) / <span class="hljs-number">2</span>;
            xh = <span class="hljs-number">0</span>;
        }

        cal.call(img, xw, xh);
    };
    img.src = src ;
}</code></pre>
<p>以上的“裁剪”仅仅是计算出偏移，然后将其传递给加载就绪的回调函数。</p>
<h2 id="articleHeader2">拆分图片</h2>
<p>图有了，已缩放，现在需要“拆分”成碎片。这里自然不是真的切割了，而是将图片 clone 出 c*r 片，然后利用负的坐标定位，其实质是用一个块遮盖了“切除”的部分，仅显示需要的碎片部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 拆分图片
 * @param {jQuery} that 容器对象
 * @param {int} cols 行
 * @param {int} rows 列
 * @param {int} ew 板块宽度
 * @param {int} eh 板块高度
 * @param {int} ox 图片横向偏移
 * @param {int} oy 图片纵向偏移
 * @param {Image} im 图片对象
 */
function split(that, cols, rows, ew, eh, ox, oy, im) {
    that.empty();

    for(var j = 0 ; j < rows; j ++) {
        for(var i = 0 ; i < cols; i ++) {
            var k = i + j * rows;

            var pic = $('<div class=&quot;pt-pic&quot;></div>');
            pic.attr(&quot;id&quot;, &quot;pt-pic-&quot;+k);
            pic.data(&quot;idx&quot;, k);
            pic.appendTo(that);
            pic.css ({
                &quot;position&quot;: &quot;relative&quot;,
                &quot;overflow&quot;: &quot;hidden&quot;,
                &quot;border&quot;  : &quot;0&quot;,
                &quot;width&quot;   : ew + &quot;px&quot;,
                &quot;height&quot;  : eh + &quot;px&quot;
            });

            var img = $(im.cloneNode());
            img.appendTo(pic);
            img.css ({
                &quot;position&quot;: &quot;absolute&quot;,
                &quot;z-index&quot; : &quot;88&quot;,
                &quot;border&quot;  : &quot;0&quot;,
                &quot;left&quot;    : (0 - i * ew + ox) + &quot;px&quot;,
                &quot;top&quot;     : (0 - j * eh + oy) + &quot;px&quot;
            });

            // 因边框可能影响宽高计算, 故边框单独用一个块来放
            var bor = $('<div class=&quot;pt-bor&quot;></div>');
            bor.appendTo(pic);
            bor.css ({
                &quot;position&quot;: &quot;absolute&quot;,
                &quot;z-index&quot; : &quot;99&quot;,
                &quot;width&quot;   : &quot;100%&quot;,
                &quot;height&quot;  : &quot;100%&quot;
            });
            // 由于样式宽高并不含边框, 故再次计算尺寸的偏移量
            bor.css ({
                &quot;width&quot;   : (2 * bor.width () - bor.outerWidth ()) + &quot;px&quot;,
                &quot;height&quot;  : (2 * bor.height() - bor.outerHeight()) + &quot;px&quot;
            });
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 拆分图片
 * @param {jQuery} that 容器对象
 * @param {int} cols 行
 * @param {int} rows 列
 * @param {int} ew 板块宽度
 * @param {int} eh 板块高度
 * @param {int} ox 图片横向偏移
 * @param {int} oy 图片纵向偏移
 * @param {Image} im 图片对象
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">split</span>(<span class="hljs-params">that, cols, rows, ew, eh, ox, oy, im</span>) </span>{
    that.empty();

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span> ; j &lt; rows; j ++) {
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span> ; i &lt; cols; i ++) {
            <span class="hljs-keyword">var</span> k = i + j * rows;

            <span class="hljs-keyword">var</span> pic = $(<span class="hljs-string">'&lt;div class="pt-pic"&gt;&lt;/div&gt;'</span>);
            pic.attr(<span class="hljs-string">"id"</span>, <span class="hljs-string">"pt-pic-"</span>+k);
            pic.data(<span class="hljs-string">"idx"</span>, k);
            pic.appendTo(that);
            pic.css ({
                <span class="hljs-string">"position"</span>: <span class="hljs-string">"relative"</span>,
                <span class="hljs-string">"overflow"</span>: <span class="hljs-string">"hidden"</span>,
                <span class="hljs-string">"border"</span>  : <span class="hljs-string">"0"</span>,
                <span class="hljs-string">"width"</span>   : ew + <span class="hljs-string">"px"</span>,
                <span class="hljs-string">"height"</span>  : eh + <span class="hljs-string">"px"</span>
            });

            <span class="hljs-keyword">var</span> img = $(im.cloneNode());
            img.appendTo(pic);
            img.css ({
                <span class="hljs-string">"position"</span>: <span class="hljs-string">"absolute"</span>,
                <span class="hljs-string">"z-index"</span> : <span class="hljs-string">"88"</span>,
                <span class="hljs-string">"border"</span>  : <span class="hljs-string">"0"</span>,
                <span class="hljs-string">"left"</span>    : (<span class="hljs-number">0</span> - i * ew + ox) + <span class="hljs-string">"px"</span>,
                <span class="hljs-string">"top"</span>     : (<span class="hljs-number">0</span> - j * eh + oy) + <span class="hljs-string">"px"</span>
            });

            <span class="hljs-comment">// 因边框可能影响宽高计算, 故边框单独用一个块来放</span>
            <span class="hljs-keyword">var</span> bor = $(<span class="hljs-string">'&lt;div class="pt-bor"&gt;&lt;/div&gt;'</span>);
            bor.appendTo(pic);
            bor.css ({
                <span class="hljs-string">"position"</span>: <span class="hljs-string">"absolute"</span>,
                <span class="hljs-string">"z-index"</span> : <span class="hljs-string">"99"</span>,
                <span class="hljs-string">"width"</span>   : <span class="hljs-string">"100%"</span>,
                <span class="hljs-string">"height"</span>  : <span class="hljs-string">"100%"</span>
            });
            <span class="hljs-comment">// 由于样式宽高并不含边框, 故再次计算尺寸的偏移量</span>
            bor.css ({
                <span class="hljs-string">"width"</span>   : (<span class="hljs-number">2</span> * bor.width () - bor.outerWidth ()) + <span class="hljs-string">"px"</span>,
                <span class="hljs-string">"height"</span>  : (<span class="hljs-number">2</span> * bor.height() - bor.outerHeight()) + <span class="hljs-string">"px"</span>
            });
        }
    }
}</code></pre>
<p>稍微注意，为方便人眼分辨碎片，最好给碎片加个边框，但加边框必然影响坐标的计算，故在图片上再覆盖一层，边框设在他上面，就算加个撕裂效果的透明图做边框都没问题了。这样碎片内图片的偏移坐标的计算就少了些麻烦了。</p>
<h2 id="articleHeader3">随机打散</h2>
<p>这游戏当然是跟电脑玩了，总不能自己打散自己玩吧？但这个打散不能给每个图片一个随机位置，那很可能你永远也拼不回去了。小时拿那种拼图游戏板整人就干过这种事，故意抠下来把头和脚交换再打散，然后跟其他小朋友打赌。所以程序也得守规矩一块一块的移动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 打散图片
 * @param {jQuery} that 容器对象
 * @param {int} cols 列
 * @param {int} rows 行
 * @param {int} rand 打散步数
 */
function upset(that, cols, rows, rand) {
    var v ;
    var r = Math.floor(Math.random()  *  cols  *  rows);
    var hole = that.children().eq(r).addClass(&quot;pt-pix&quot;);
    var part ;
    var step = [];
    var dbug = [];
    for(var  i = 0, j = rand; i < j; i ++) {
        var  x = cols - 1;
        var  y = rows - 1;
        var  z = cols;
        var rx = r % cols;
        var ry = Math.floor(r / cols);
        var rv = [];

        if (rx > 0 &amp;&amp; rx < x) {
            rv.push(r - 1, r + 1); // 可左右移动
        } else
        if (rx > 0) {
            rv.push(r - 1); // 可向左移动
        } else
        {
            rv.push(r + 1); // 可向右移动
        }
        if (ry > 0 &amp;&amp; ry < y) {
            rv.push(r - z, r + z); // 可上下移动
        } else
        if (ry > 0) {
            rv.push(r - z); // 可向上移动
        } else
        {
            rv.push(r + z); // 可向下移动
        }

        // 排除来源位置
        if (step.length > 0) {
            v = step[step.length - 1];
            v = $.inArray(v, rv);
            if (v > -1) {
                rv.splice(v, 1 );
            }
        }
        // 排除回旋位置
        if (step.length > 2 &amp;&amp; rv.length > 1) {
            v = step[step.length - 3];
            v = $.inArray(v, rv);
            if (v > -1) {
                rv.splice(v, 1 );
            }
        }

        // 随机方向
        r = rv[Math.floor(Math.random()* rv.length)];
        v = hole.index();
            step.push(v);

        // 交换位置
        part  = that.children().eq( r );
        if (r < v) {
            part.insertBefore(hole);
            hole.insertBefore(that.children().eq(r));
        } else {
            hole.insertBefore(part);
            part.insertBefore(that.children().eq(v));
        }

        // 调试步骤
        if (r == v + 1) {
            dbug.push(&quot;左&quot;);
        } else
        if (r == v - 1) {
            dbug.push(&quot;右&quot;);
        } else
        if (r > v) {
            dbug.push(&quot;上&quot;);
        } else
        if (r < v) {
            dbug.push(&quot;下&quot;);
        }
    }

    // 攻略
    dbug = dbug.reverse().join(&quot; &quot;); alert(dbug);
    console.log( &quot;攻略: &quot;+dbug+&quot;\r\n此非最优解, 仅为随机打散时的逆向步骤, 上下左右为相对缺口的板块, 祝您玩的开心!&quot; );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 打散图片
 * @param {jQuery} that 容器对象
 * @param {int} cols 列
 * @param {int} rows 行
 * @param {int} rand 打散步数
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upset</span>(<span class="hljs-params">that, cols, rows, rand</span>) </span>{
    <span class="hljs-keyword">var</span> v ;
    <span class="hljs-keyword">var</span> r = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()  *  cols  *  rows);
    <span class="hljs-keyword">var</span> hole = that.children().eq(r).addClass(<span class="hljs-string">"pt-pix"</span>);
    <span class="hljs-keyword">var</span> part ;
    <span class="hljs-keyword">var</span> step = [];
    <span class="hljs-keyword">var</span> dbug = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span>  i = <span class="hljs-number">0</span>, j = rand; i &lt; j; i ++) {
        <span class="hljs-keyword">var</span>  x = cols - <span class="hljs-number">1</span>;
        <span class="hljs-keyword">var</span>  y = rows - <span class="hljs-number">1</span>;
        <span class="hljs-keyword">var</span>  z = cols;
        <span class="hljs-keyword">var</span> rx = r % cols;
        <span class="hljs-keyword">var</span> ry = <span class="hljs-built_in">Math</span>.floor(r / cols);
        <span class="hljs-keyword">var</span> rv = [];

        <span class="hljs-keyword">if</span> (rx &gt; <span class="hljs-number">0</span> &amp;&amp; rx &lt; x) {
            rv.push(r - <span class="hljs-number">1</span>, r + <span class="hljs-number">1</span>); <span class="hljs-comment">// 可左右移动</span>
        } <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">if</span> (rx &gt; <span class="hljs-number">0</span>) {
            rv.push(r - <span class="hljs-number">1</span>); <span class="hljs-comment">// 可向左移动</span>
        } <span class="hljs-keyword">else</span>
        {
            rv.push(r + <span class="hljs-number">1</span>); <span class="hljs-comment">// 可向右移动</span>
        }
        <span class="hljs-keyword">if</span> (ry &gt; <span class="hljs-number">0</span> &amp;&amp; ry &lt; y) {
            rv.push(r - z, r + z); <span class="hljs-comment">// 可上下移动</span>
        } <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">if</span> (ry &gt; <span class="hljs-number">0</span>) {
            rv.push(r - z); <span class="hljs-comment">// 可向上移动</span>
        } <span class="hljs-keyword">else</span>
        {
            rv.push(r + z); <span class="hljs-comment">// 可向下移动</span>
        }

        <span class="hljs-comment">// 排除来源位置</span>
        <span class="hljs-keyword">if</span> (step.length &gt; <span class="hljs-number">0</span>) {
            v = step[step.length - <span class="hljs-number">1</span>];
            v = $.inArray(v, rv);
            <span class="hljs-keyword">if</span> (v &gt; <span class="hljs-number">-1</span>) {
                rv.splice(v, <span class="hljs-number">1</span> );
            }
        }
        <span class="hljs-comment">// 排除回旋位置</span>
        <span class="hljs-keyword">if</span> (step.length &gt; <span class="hljs-number">2</span> &amp;&amp; rv.length &gt; <span class="hljs-number">1</span>) {
            v = step[step.length - <span class="hljs-number">3</span>];
            v = $.inArray(v, rv);
            <span class="hljs-keyword">if</span> (v &gt; <span class="hljs-number">-1</span>) {
                rv.splice(v, <span class="hljs-number">1</span> );
            }
        }

        <span class="hljs-comment">// 随机方向</span>
        r = rv[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()* rv.length)];
        v = hole.index();
            step.push(v);

        <span class="hljs-comment">// 交换位置</span>
        part  = that.children().eq( r );
        <span class="hljs-keyword">if</span> (r &lt; v) {
            part.insertBefore(hole);
            hole.insertBefore(that.children().eq(r));
        } <span class="hljs-keyword">else</span> {
            hole.insertBefore(part);
            part.insertBefore(that.children().eq(v));
        }

        <span class="hljs-comment">// 调试步骤</span>
        <span class="hljs-keyword">if</span> (r == v + <span class="hljs-number">1</span>) {
            dbug.push(<span class="hljs-string">"左"</span>);
        } <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">if</span> (r == v - <span class="hljs-number">1</span>) {
            dbug.push(<span class="hljs-string">"右"</span>);
        } <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">if</span> (r &gt; v) {
            dbug.push(<span class="hljs-string">"上"</span>);
        } <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">if</span> (r &lt; v) {
            dbug.push(<span class="hljs-string">"下"</span>);
        }
    }

    <span class="hljs-comment">// 攻略</span>
    dbug = dbug.reverse().join(<span class="hljs-string">" "</span>); alert(dbug);
    <span class="hljs-built_in">console</span>.log( <span class="hljs-string">"攻略: "</span>+dbug+<span class="hljs-string">"\r\n此非最优解, 仅为随机打散时的逆向步骤, 上下左右为相对缺口的板块, 祝您玩的开心!"</span> );
}</code></pre>
<p>把打散的步骤记录下来，然后反转数组，就是攻略啦。</p>
<p>不过随机时需要避免往回走，否则出现 左-&gt;右-&gt;左 这类情况就不好玩了；还得避免其他循环，如 上-&gt;右-&gt;下-&gt;左 这样的，这会回到原点，等于什么也没干；但更大的循环没想好怎么处理，暂时不去纠结了。</p>
<h2 id="articleHeader4">移动判定</h2>
<p>移动碎片到缺口，也就是交换碎片与缺口的位置。左右移动很简单，序号大的 insertBefore 序号小的即可。上下移动有个小坑，开始自己没注意，我原本想不管横向还是纵向，没有两次 insertBefore 搞不定的，但是如果 3 和 7 交换位置(3x3, 0~8)，3 移动到 7 前，7 再移动到 3 前，此时原来的 3 变成了 6。的确，没有什么是不能两次 insertBefore 解决的，但还得考虑让序号大的先动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 移动板块
 * @param {jQuery} that 容器对象
 * @param {int} cols 列数
 * @param {int} rows 行数
 * @param {jQuery} hole 缺口对象
 * @param {jQuery} part 板块对象
 */
function mover(that, cols, rows, hole, part) {
    var move = false ;
    var i  = part.index();
    var j  = hole.index();
    var ix = i % cols;
    var jx = j % cols;
    var iy = Math.floor(i / cols);
    var jy = Math.floor(j / cols);

    if (iy == jy) { // 在同一行
        move  = ix == jx + 1  // 可向左边移动
             || ix == jx - 1; // 可向右边移动
    } else
    if (ix == jx) { // 在同一列
        move  = iy == jy + 1  // 可向上移动
             || iy == jy - 1; // 可向下移动
    }

    // 互换位置
    if (move) {
        if (i  <  j ) {
            part.insertBefore(hole);
            hole.insertBefore(that.children().eq(i));
        } else {
            hole.insertBefore(part);
            part.insertBefore(that.children().eq(j));
        }
    }

    // 判断是否拼图完成
    move = true;
    for (i = 0, j = cols * rows; i < j; i ++) {
        if (that.children().eq(i).data(&quot;idx&quot;) != i) {
            move = false;
        }
    }

    return  move;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 移动板块
 * @param {jQuery} that 容器对象
 * @param {int} cols 列数
 * @param {int} rows 行数
 * @param {jQuery} hole 缺口对象
 * @param {jQuery} part 板块对象
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mover</span>(<span class="hljs-params">that, cols, rows, hole, part</span>) </span>{
    <span class="hljs-keyword">var</span> move = <span class="hljs-literal">false</span> ;
    <span class="hljs-keyword">var</span> i  = part.index();
    <span class="hljs-keyword">var</span> j  = hole.index();
    <span class="hljs-keyword">var</span> ix = i % cols;
    <span class="hljs-keyword">var</span> jx = j % cols;
    <span class="hljs-keyword">var</span> iy = <span class="hljs-built_in">Math</span>.floor(i / cols);
    <span class="hljs-keyword">var</span> jy = <span class="hljs-built_in">Math</span>.floor(j / cols);

    <span class="hljs-keyword">if</span> (iy == jy) { <span class="hljs-comment">// 在同一行</span>
        move  = ix == jx + <span class="hljs-number">1</span>  <span class="hljs-comment">// 可向左边移动</span>
             || ix == jx - <span class="hljs-number">1</span>; <span class="hljs-comment">// 可向右边移动</span>
    } <span class="hljs-keyword">else</span>
    <span class="hljs-keyword">if</span> (ix == jx) { <span class="hljs-comment">// 在同一列</span>
        move  = iy == jy + <span class="hljs-number">1</span>  <span class="hljs-comment">// 可向上移动</span>
             || iy == jy - <span class="hljs-number">1</span>; <span class="hljs-comment">// 可向下移动</span>
    }

    <span class="hljs-comment">// 互换位置</span>
    <span class="hljs-keyword">if</span> (move) {
        <span class="hljs-keyword">if</span> (i  &lt;  j ) {
            part.insertBefore(hole);
            hole.insertBefore(that.children().eq(i));
        } <span class="hljs-keyword">else</span> {
            hole.insertBefore(part);
            part.insertBefore(that.children().eq(j));
        }
    }

    <span class="hljs-comment">// 判断是否拼图完成</span>
    move = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>, j = cols * rows; i &lt; j; i ++) {
        <span class="hljs-keyword">if</span> (that.children().eq(i).data(<span class="hljs-string">"idx"</span>) != i) {
            move = <span class="hljs-literal">false</span>;
        }
    }

    <span class="hljs-keyword">return</span>  move;
}</code></pre>
<p>判断是否完成就来个笨办法吧，依次遍历所有碎片，只要有一个没对上序号就是还没成功。</p>
<p>未处理滑动事件，以后闲了再加吧。</p>
<h2 id="articleHeader5">整合游戏程序</h2>
<p>上面分散的几个函数用起来还是不太方便，整合成一个 jQuery 插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 拼图游戏
 * @param {String} src 图片路径
 * @param {int} cols 列数
 * @param {int} rows 行数
 * @param {int} rand 打散步数
 */
$.fn.hsPintu = function(src, cols, rows, rand) {
    var that = $(this);
    var srz  = that.data(&quot;src&quot;);
    var img  = that.data(&quot;img&quot;);

    var aw = that.width ();
    var ah = that.height();
    var ew = aw / rows;
    var eh = ah / cols;

    // 状态: 0 进行中, 1 成功, 2 结束
    that.data(&quot;hsPintuStatus&quot;, 2);
    that.data(&quot;cols&quot;, cols);
    that.data(&quot;rows&quot;, rows);

    /**
     * img 存在且 src 没变化
     * 则不需要再次加载图片
     * 直接取出存储好的数据
     */
    if (img &amp;&amp; srz === src) {
        var ox = that.data(&quot;pos_x&quot;);
        var oy = that.data(&quot;pos_y&quot;);
        console.log(&quot;Note: 图片无变化&quot;);

        split(that, cols, rows, ew, eh, ox, oy, img );

        // 未给 rand 则仅拆分而不打散
        if (rand === undefined) return;

        upset(that, cols, rows, rand);
        that.data(&quot;hsPintuStatus&quot;, 0);
        that.trigger(&quot;hsPintuLaunch&quot;);
    } else
    loadr(src, aw, ah, function(ox, oy) {
        that.data(&quot;src&quot;, src );
        that.data(&quot;img&quot;, this);
        that.data(&quot;pos_x&quot;, ox);
        that.data(&quot;pos_y&quot;, oy);
        console.log(&quot;Note: 载入新图片&quot;);

        split(that, cols, rows, ew, eh, ox, oy, this);

        // 未给 rand 则仅拆分而不打散
        if (rand === undefined) return;

        upset(that, cols, rows, rand);
        that.data(&quot;hsPintuStatus&quot;, 0);
        that.trigger(&quot;hsPintuLaunch&quot;);
    });

    // 已经初始化过就不要再绑定事件了
    if (! that.data(&quot;hsPintuInited&quot;)) {
        that.data(&quot;hsPintuInited&quot;, 1);

        that.on(&quot;click&quot;, &quot;.pt-pic:not(.pt-pix)&quot;, function() {
            if (that.data(&quot;hsPintuStatus&quot;) === 0) {
                var cols =that.data(&quot;cols&quot;);
                var rows =that.data(&quot;rows&quot;);
                var hole =that.children(&quot;.pt-pix&quot;);
                if (mover(that, cols, rows, hole, $(this))) {
                    that.data(&quot;hsPintuStatus&quot;, 1);
                    that.trigger(&quot;hsPintuFinish&quot;);
                }
            }
        });
    }

    return  this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 拼图游戏
 * @param {String} src 图片路径
 * @param {int} cols 列数
 * @param {int} rows 行数
 * @param {int} rand 打散步数
 */</span>
$.fn.hsPintu = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">src, cols, rows, rand</span>) </span>{
    <span class="hljs-keyword">var</span> that = $(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">var</span> srz  = that.data(<span class="hljs-string">"src"</span>);
    <span class="hljs-keyword">var</span> img  = that.data(<span class="hljs-string">"img"</span>);

    <span class="hljs-keyword">var</span> aw = that.width ();
    <span class="hljs-keyword">var</span> ah = that.height();
    <span class="hljs-keyword">var</span> ew = aw / rows;
    <span class="hljs-keyword">var</span> eh = ah / cols;

    <span class="hljs-comment">// 状态: 0 进行中, 1 成功, 2 结束</span>
    that.data(<span class="hljs-string">"hsPintuStatus"</span>, <span class="hljs-number">2</span>);
    that.data(<span class="hljs-string">"cols"</span>, cols);
    that.data(<span class="hljs-string">"rows"</span>, rows);

    <span class="hljs-comment">/**
     * img 存在且 src 没变化
     * 则不需要再次加载图片
     * 直接取出存储好的数据
     */</span>
    <span class="hljs-keyword">if</span> (img &amp;&amp; srz === src) {
        <span class="hljs-keyword">var</span> ox = that.data(<span class="hljs-string">"pos_x"</span>);
        <span class="hljs-keyword">var</span> oy = that.data(<span class="hljs-string">"pos_y"</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Note: 图片无变化"</span>);

        split(that, cols, rows, ew, eh, ox, oy, img );

        <span class="hljs-comment">// 未给 rand 则仅拆分而不打散</span>
        <span class="hljs-keyword">if</span> (rand === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span>;

        upset(that, cols, rows, rand);
        that.data(<span class="hljs-string">"hsPintuStatus"</span>, <span class="hljs-number">0</span>);
        that.trigger(<span class="hljs-string">"hsPintuLaunch"</span>);
    } <span class="hljs-keyword">else</span>
    loadr(src, aw, ah, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ox, oy</span>) </span>{
        that.data(<span class="hljs-string">"src"</span>, src );
        that.data(<span class="hljs-string">"img"</span>, <span class="hljs-keyword">this</span>);
        that.data(<span class="hljs-string">"pos_x"</span>, ox);
        that.data(<span class="hljs-string">"pos_y"</span>, oy);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Note: 载入新图片"</span>);

        split(that, cols, rows, ew, eh, ox, oy, <span class="hljs-keyword">this</span>);

        <span class="hljs-comment">// 未给 rand 则仅拆分而不打散</span>
        <span class="hljs-keyword">if</span> (rand === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span>;

        upset(that, cols, rows, rand);
        that.data(<span class="hljs-string">"hsPintuStatus"</span>, <span class="hljs-number">0</span>);
        that.trigger(<span class="hljs-string">"hsPintuLaunch"</span>);
    });

    <span class="hljs-comment">// 已经初始化过就不要再绑定事件了</span>
    <span class="hljs-keyword">if</span> (! that.data(<span class="hljs-string">"hsPintuInited"</span>)) {
        that.data(<span class="hljs-string">"hsPintuInited"</span>, <span class="hljs-number">1</span>);

        that.on(<span class="hljs-string">"click"</span>, <span class="hljs-string">".pt-pic:not(.pt-pix)"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (that.data(<span class="hljs-string">"hsPintuStatus"</span>) === <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">var</span> cols =that.data(<span class="hljs-string">"cols"</span>);
                <span class="hljs-keyword">var</span> rows =that.data(<span class="hljs-string">"rows"</span>);
                <span class="hljs-keyword">var</span> hole =that.children(<span class="hljs-string">".pt-pix"</span>);
                <span class="hljs-keyword">if</span> (mover(that, cols, rows, hole, $(<span class="hljs-keyword">this</span>))) {
                    that.data(<span class="hljs-string">"hsPintuStatus"</span>, <span class="hljs-number">1</span>);
                    that.trigger(<span class="hljs-string">"hsPintuFinish"</span>);
                }
            }
        });
    }

    <span class="hljs-keyword">return</span>  <span class="hljs-keyword">this</span>;
};</code></pre>
<p>用 <code>$("#pt-box").hsPintu(图片URL, 列数, 行数[, 随机步数]);</code> 即可初始化拼图游戏了, 拼图区域需要固定宽高；随机步数参数不提供时，仅拆解不打散。</p>
<p>图片没变化时没必要重新加载，避免下时间损耗。当然了，更好的办法是再判断行、列和区域尺寸，没变化则直接排列好碎片。懒得写了，先这样吧。</p>
<h2 id="articleHeader6">选择任意图片</h2>
<p>上面都是固定的图片，参与感不好，让用户自行“上传”图片岂不更有意思。其实不必真的上传到服务器，既然“缩放”、“裁剪”上面都有了，直接加载本地图片不就好了嘛。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 预载文件
 * @param {Function} cal 回调函数
 * @returns {jQuery} 当前文件节点
 */
$.fn.hsFileLoad = function(cal) {
    this.each(function() {
        var that = this;
        if (window.FileReader) {
            var fr = new FileReader( );
            fr.onloadend = function(e) {
                cal.call(that, e.target.result);
            };  cal.call(that);
            $.each( this.files, function(i, fo) {
                fr.readAsDataURL( fo );
            });
        } else
        if (this.getAsDataURL) {
            cal.call(that, that.getAsDataURL());
        } else {
            cal.call(that, that.value);
        }
    });
    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 预载文件
 * @param {Function} cal 回调函数
 * @returns {jQuery} 当前文件节点
 */</span>
$.fn.hsFileLoad = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cal</span>) </span>{
    <span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.FileReader) {
            <span class="hljs-keyword">var</span> fr = <span class="hljs-keyword">new</span> FileReader( );
            fr.onloadend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
                cal.call(that, e.target.result);
            };  cal.call(that);
            $.each( <span class="hljs-keyword">this</span>.files, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">i, fo</span>) </span>{
                fr.readAsDataURL( fo );
            });
        } <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.getAsDataURL) {
            cal.call(that, that.getAsDataURL());
        } <span class="hljs-keyword">else</span> {
            cal.call(that, that.value);
        }
    });
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>这段代码也能从我的开源项目内找到 <a href="https://github.com/ihongs/HongsCORE/blob/master/hongs-web/web/static/assets/src/hongscore-fork.js#L472" rel="nofollow noreferrer" target="_blank">预载文件</a> 方法，此工具包还有些其他的文件上传预览类的方法，这是我对 bootstrap-fileinput 没有图片裁剪功能（与最终服务端处理后的结果一致）而“一气之下”自己写的一点零散代码。</p>
<p>完整的代码及演示可在 <a href="http://www.lemonvc.com/html/20160616/pintu.html" rel="nofollow noreferrer" target="_blank"><strong>这里</strong></a> 看到，有朋友说看不到图，但图片我用的百度图片搜索的缩略图，不清楚怎么回事，看不到可以自己从本地选择图片。只是那个“加载”(Image.onload)和“切片”(Image.cloneNode)比较耗时，比较大的图片请耐心等等。</p>
<p>当然了，也可以光顾我们的活动页玩一把 <a href="http://www.lemonvc.com/html/20160616/index.html" rel="nofollow noreferrer" target="_blank">拼图抽奖</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML 简单拼图游戏

## 原文链接
[https://segmentfault.com/a/1190000005773885](https://segmentfault.com/a/1190000005773885)

