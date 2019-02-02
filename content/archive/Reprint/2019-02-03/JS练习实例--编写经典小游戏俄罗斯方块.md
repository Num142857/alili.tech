---
title: 'JS练习实例--编写经典小游戏俄罗斯方块' 
date: 2019-02-03 2:30:40
hidden: true
slug: u0pzym8k36o
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在学习JavaScript，想编一些实例练练手，之前编了个贪吃蛇，但是实现时没有注意使用面向对象的思想，实现起来也比较简单所以就不总结了，今天就总结下俄罗斯方块小游戏的思路和实现吧（需要下载代码也是有的），我会说得很详细很详细的所以要看完需要好多耐心的。。。</p>
<h2 id="articleHeader0">基本思路</h2>
<p>游戏区域：游戏区域是固定的，这里将它设为宽10单位，高16单位的矩形区域，前端显示用表格来实现，并将每个td保存在一个二维数组中，用于渲染游戏过程。<br>方块：方块有7种形状，用一个4*4的矩阵来保存方块的形状；按方向上键方块可以旋转，可通过矩阵旋转来实现；方块可以左右移动，需要判断是否出界机左右是否已有方块；还需注意判断方块是否已经触底。按方向下键方块可以速降。<br>分数：在每一次方块降落完成后判断能否得分。</p>
<h2 id="articleHeader1">具体实现</h2>
<h3 id="articleHeader2">工具变量</h3>
<p>这部分下文有用上在回来看就行，现在看可能有点混乱( ･ㅂ･)و 。</p>
<ol>
<li><p>block_now, block_next; 当前，下一方块对象，将block_next赋值给block_now，再创建新方块后赋值给block_next。</p></li>
<li><p>beforeBlock：16*10的矩阵 方块上一时刻的位置，用于擦除上一秒</p></li>
<li><p>allBlock： 16*10的矩阵 已完成方块</p></li>
<li><p>ground：16*10的游戏区域，获取DOM，渲染游戏区域</p></li>
</ol>
<h3 id="articleHeader3">方块类</h3>
<p>实现这个游戏的最核心就在于这个方块类了，我们将创建一个方块类型，然后7种形状的方块继承这个方块类。</p>
<h4>方块类的属性</h4>
<p>方块的实例属性有：移动方向，状态，形状，当前位置，颜色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Block() {
    this.dir = 40;//方块当前移动方向
    this.end = 0;//状态，是否下落完成
    this.shape = new Array();//4*4的方块
    for (var i = 0; i < 4; i++) {
        this.shape[i] = new Array();
    }
    this.pos = [0, 3];//所在行，列
    this.color = [&quot;#FFAEC9&quot;, &quot;#B5E61D&quot;, &quot;#99D9EA&quot;, &quot;#C8BFE7&quot;, &quot;#B97A57&quot;];
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Block</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.dir = <span class="hljs-number">40</span>;<span class="hljs-comment">//方块当前移动方向</span>
    <span class="hljs-keyword">this</span>.end = <span class="hljs-number">0</span>;<span class="hljs-comment">//状态，是否下落完成</span>
    <span class="hljs-keyword">this</span>.shape = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();<span class="hljs-comment">//4*4的方块</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">4</span>; i++) {
        <span class="hljs-keyword">this</span>.shape[i] = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
    }
    <span class="hljs-keyword">this</span>.pos = [<span class="hljs-number">0</span>, <span class="hljs-number">3</span>];<span class="hljs-comment">//所在行，列</span>
    <span class="hljs-keyword">this</span>.color = [<span class="hljs-string">"#FFAEC9"</span>, <span class="hljs-string">"#B5E61D"</span>, <span class="hljs-string">"#99D9EA"</span>, <span class="hljs-string">"#C8BFE7"</span>, <span class="hljs-string">"#B97A57"</span>];
        }</code></pre>
<p>这里先明确一下方块和形状的关系哈，后面经常用上这个概念。如下，4*4的矩阵我把它叫“方块”然后有颜色（绿色）的部分我叫它形状。</p>
<p><span class="img-wrap"><img data-src="/img/bVC7Z7?w=184&amp;h=187" src="https://static.alili.tech/img/bVC7Z7?w=184&amp;h=187" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>7种方块子类</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Block_i() {
    Block.call(this);
    this.shape = [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}  
Block_i.prototype = new Block();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>function Block_i() {
    Block.call(this);
    this.shape = [
        [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
        [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
        [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
        [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>]
    ];
}  
Block_i.prototype = new Block();</code></pre>
<p>其他形状与上面类似：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="s : [[0, 1, 1, 0],[1, 1, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
j : [[0, 1, 0, 0],[0, 1, 0, 0],[1, 1, 0, 0],[0, 0, 0, 0]];
o : [[1, 1, 0, 0],[1, 1, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
z : [[1, 1, 0, 0],[0, 1, 1, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
t : [[0, 1, 0, 0],[1, 1, 1, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
l : [[1, 0, 0, 0],[1, 0, 0, 0],[1, 1, 0, 0],[0, 0, 0, 0]];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs inform7"><code>s : <span class="hljs-comment">[<span class="hljs-comment">[0, 1, 1, 0]</span>,<span class="hljs-comment">[1, 1, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>]</span>;
j : <span class="hljs-comment">[<span class="hljs-comment">[0, 1, 0, 0]</span>,<span class="hljs-comment">[0, 1, 0, 0]</span>,<span class="hljs-comment">[1, 1, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>]</span>;
o : <span class="hljs-comment">[<span class="hljs-comment">[1, 1, 0, 0]</span>,<span class="hljs-comment">[1, 1, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>]</span>;
z : <span class="hljs-comment">[<span class="hljs-comment">[1, 1, 0, 0]</span>,<span class="hljs-comment">[0, 1, 1, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>]</span>;
t : <span class="hljs-comment">[<span class="hljs-comment">[0, 1, 0, 0]</span>,<span class="hljs-comment">[1, 1, 1, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>]</span>;
l : <span class="hljs-comment">[<span class="hljs-comment">[1, 0, 0, 0]</span>,<span class="hljs-comment">[1, 0, 0, 0]</span>,<span class="hljs-comment">[1, 1, 0, 0]</span>,<span class="hljs-comment">[0, 0, 0, 0]</span>]</span>;</code></pre>
<h4>方块类的方法</h4>
<p>方块类的方法有：旋转方块，移动方块，速降方块，打印方块</p>
<p><span class="img-wrap"><img data-src="/img/bVC6o2?w=454&amp;h=334" src="https://static.alili.tech/img/bVC6o2?w=454&amp;h=334" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h5>旋转方块</h5>
<p>1.旋转方块时我们先将矩阵顺时针旋转90度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0,dst = 3;i < 4;i++, dst--){
    for(var j = 0;j < 4;j++)  
        tmp[j][dst] = this.shape[i][j]; 
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,dst = <span class="hljs-number">3</span>;i &lt; <span class="hljs-number">4</span>;i++, dst--){
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>;j &lt; <span class="hljs-number">4</span>;j++)  
        tmp[j][dst] = <span class="hljs-keyword">this</span>.shape[i][j]; 
    }</code></pre>
<p>2.再将旋转后的图像移到矩阵左上角，这样可以表现出在原地旋转的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(var i = 0;i < 4;i++){
    var flag = 1;
    for(var j = 0;j < 4;j++){//判断第一列是否有图像
        if (tmp[j][0]) {
            flag = 0;
        }
    }
    if (flag) {//第一列没图像，将第一列移除，并在最后添一列空白
        for(var j = 0;j < 4;j++){
            tmp[j].shift();
            tmp[j].push(0);
        }
    }
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>for(var i = <span class="hljs-number">0</span>;i &lt; <span class="hljs-number">4</span>;i++){
    var flag = <span class="hljs-number">1</span>;
    for(var j = <span class="hljs-number">0</span>;j &lt; <span class="hljs-number">4</span>;j++){<span class="hljs-comment">//判断第一列是否有图像</span>
        if (tmp[j][<span class="hljs-number">0</span>]) {
            flag = <span class="hljs-number">0</span>;
        }
    }
    if (flag) {<span class="hljs-comment">//第一列没图像，将第一列移除，并在最后添一列空白</span>
        for(var j = <span class="hljs-number">0</span>;j &lt; <span class="hljs-number">4</span>;j++){
            tmp[j].shift();
            tmp[j].push(<span class="hljs-number">0</span>);
        }
    }
} </code></pre>
<p>3.最后将旋转后的矩阵保存回原来的矩阵</p>
<h5>速降方块</h5>
<p>用户按方向下键，方块将直接降落完成。这个步骤我纠结了挺久的，最后用了个比较笨的方法吧，这里简单说下原理，具体可以下载源码看看。</p>
<p>1.先算出方块矩阵中有形状的内容的右边界和下边界（因为我们已经将图案放在左上角了所以不用求左上边界ヾ(￣▽￣)），比如s形的方块右边界是3，下边界是2这样。这个用两个循环就能实现了。</p>
<p><span class="img-wrap"><img data-src="/img/bVC7Zg?w=360&amp;h=310" src="https://static.alili.tech/img/bVC7Zg?w=360&amp;h=310" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.判断形状（注意是形状）的正下方有没有方块（检查allBlock）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="下方有方块时：
（1）计算当前形状下边界的块对应下方的块的距离y,如图
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>下方有方块时：
（<span class="hljs-number">1</span>）计算当前形状下边界的块对应下方的块的距离y,如图
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVC74V?w=407&amp;h=390" src="https://static.alili.tech/img/bVC74V?w=407&amp;h=390" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（2）计算下方最顶方块距离上方块对应位置距离x,如图
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>（<span class="hljs-number">2</span>）计算下方最顶方块距离上方块对应位置距离<span class="hljs-keyword">x</span>,如图
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVC77j?w=378&amp;h=391" src="https://static.alili.tech/img/bVC77j?w=378&amp;h=391" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（3）取两个距离中较小的距离为方块垂直移动距离，移动方块。并将方块状态修改。
下方没有方块时，方块降至最低，计算距离时，记得得加上方块底部与形状底部的距离。并将方块状态修改。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>（<span class="hljs-number">3</span>）取两个距离中较小的距离为方块垂直移动距离，移动方块。并将方块状态修改。
下方没有方块时，方块降至最低，计算距离时，记得得加上方块底部与形状底部的距离。并将方块状态修改。
</code></pre>
<h5>移动方块</h5>
<p>用户通过键盘方向键来移动方块：左(37) 上(38) 右(39) 下(40)括号内为键码。<br>对键盘事件进行监听：<br>用this.dir记录方块当前移动方向。</p>
<ol>
<li><p>当用户按上键时，调用旋转方块函数；</p></li>
<li><p>按左右时，将方块所在列（this.pos[1]）加或减1;</p></li>
<li><p>按下键时，调用速降方块函数。<br>最后打印方块（判断是否出界等问题在打印方块步骤）</p></li>
</ol>
<h5>打印方块</h5>
<ol>
<li><p>判断待打印方块是否超出边界</p></li>
<li><p>判断要渲染（给形状上色）的地方是否已经有方块了</p></li>
<li><p>擦除上一时刻方块</p></li>
<li><p>绘制这一时刻方块</p></li>
<li><p>若方块下落完毕（this.end = 1），将方块加入到已下落方块矩阵（allBlock）中</p></li>
</ol>
<p>好啦！完成到这步就胜利在望了，撒花ヾ(￣▽￣)~</p>
<h3 id="articleHeader4">工具函数</h3>
<ol><li><p>产生方块</p></li></ol>
<p>用两个随机数随机产生方块形状和颜色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createBlock(r1, r2) {
    // var r = 0;
    switch (r1) {
        case 0: block_new = new Block_i();break;
        case 1: block_new = new Block_j();break;
        case 2: block_new = new Block_l();break;
        case 3: block_new = new Block_o();break;
        case 4: block_new = new Block_s();break;
        case 5: block_new = new Block_t();break;
        case 6: block_new = new Block_z();break;
    }
    block_new.color = block_new.color[r2];
    return block_new;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createBlock</span></span>(r1, r2) {
    <span class="hljs-comment">// var r = 0;</span>
    <span class="hljs-keyword">switch</span> (r1) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>: <span class="hljs-type">block_new </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">Block_i</span>();<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>: <span class="hljs-type">block_new </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">Block_j</span>();<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>: <span class="hljs-type">block_new </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">Block_l</span>();<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>: <span class="hljs-type">block_new </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">Block_o</span>();<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>: <span class="hljs-type">block_new </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">Block_s</span>();<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>: <span class="hljs-type">block_new </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">Block_t</span>();<span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>: <span class="hljs-type">block_new </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">Block_z</span>();<span class="hljs-keyword">break</span>;
    }
    block_new<span class="hljs-type"></span>.color = block_new<span class="hljs-type"></span>.color[r2];
    <span class="hljs-keyword">return</span> block_new<span class="hljs-type"></span>;
}</code></pre>
<p>2.生产分数<br>在每次打印方块时都判断一下是否可以得分消去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="若可以得分，就将allBlock中该行删除（splice），并在最开始位置加上一行空白行（[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]）
然后在ground中，将该行样式变为上一行样式，以此类推。呈现出消去该行的效果。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>若可以得分，就将allBlock中该行删除（splice），并在最开始位置加上一行空白行（[<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>]）
然后在ground中，将该行样式变为上一行样式，以此类推。呈现出消去该行的效果。</code></pre>
<p>3.记录最高分<br>我还弄了个用cookie记录最高分的功能，每次得分时判断下是否为最高分，并显示，具体还是看代码啦。</p>
<p>最后付上代码<a href="https://pan.baidu.com/s/1nu9ptRr" rel="nofollow noreferrer" target="_blank">下载地址</a><br>差不多啦，恩恩去吃饭。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS练习实例--编写经典小游戏俄罗斯方块

## 原文链接
[https://segmentfault.com/a/1190000006904356](https://segmentfault.com/a/1190000006904356)

