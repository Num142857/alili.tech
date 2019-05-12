---
title: '前端面试的一道算法题（使用canvas解答）' 
date: 2019-01-12 2:30:25
hidden: true
slug: frsbi4ovsz
categories: [reprint]
---

{{< raw >}}

                    
<hr>
<p>据了解，现在前端面试也喜欢考算法题了。前几天去面试，果不其然的，面试官给我四道算法题，让我自己回去做。下面说一个跟前端有点相关并且有点趣的一道算法题。</p>
<h3 id="articleHeader0">题目：</h3>
<p><strong>平面上有若干个不特定的形状，如下图所示。请写程序求出物体的个数，以及每个不同物体的面积。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009738790" src="https://static.alili.tech/img/remote/1460000009738790" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">分析</h3>
<p>想要知道有多少个图形，想到的就是先获取图片中的每一个像素点然后判获取像素点的背景颜色（RGBA）。想要获得图片中的每一个像素点，那就可以联想到使用h5的canvas。<br><strong>如下：</strong></p>
<p><a href="http://www.runoob.com/tags/canvas-getimagedata.html" rel="nofollow noreferrer" target="_blank">菜鸟教程中canvas的getimagedata方法</a></p>
<ul><li><p>书写html标签。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <canvas id=&quot;canvas&quot; height=&quot;200&quot; width=&quot;350&quot;>对不你，你的浏览器不支持Canvas</canvas> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"> &lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">"canvas"</span> <span class="hljs-attribute">height</span>=<span class="hljs-string">"200"</span> width=<span class="hljs-string">"350"</span>&gt;对不你，你的浏览器不支持Canvas&lt;/canvas&gt; </code></pre>
<ul><li><p>js获取canvas对象</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ctxt = canvas.getContext('2d');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let ctxt</span> = canvas.getContext(<span class="hljs-string">'2d'</span>);</code></pre>
<ul><li><p>js创建image对象</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let img = new Image;
img.src = './image.png'; //图片路径
img.onload = function(){}  //加载成功后的执行函数，之后的代码就写在其中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> img = <span class="hljs-keyword">new</span> Image;
img.src = <span class="hljs-string">'./image.png'</span>; <span class="hljs-comment">//图片路径</span>
img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}  <span class="hljs-comment">//加载成功后的执行函数，之后的代码就写在其中</span></code></pre>
<ul><li><p>创建存储图片像素点的二维数组</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let coordinates = [];
for(let i=0; i<200; i++){
       coordinates[i] = [];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>let coordinates = [];
<span class="hljs-keyword">for</span>(let <span class="hljs-built_in">i</span>=<span class="hljs-number">0</span>; <span class="hljs-built_in">i</span>&lt;<span class="hljs-number">200</span>; <span class="hljs-built_in">i</span>++){
       coordinates[i] = [];
}</code></pre>
<ul><li><p>获取像素点，也就是使用getimagedata方法。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctxt.drawImage(img, 0, 0);  //将图片画如canvas
let data = ctxt.getImageData(0, 0, 350, 200).data;//读取整张图片的像素。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ctxt.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);  <span class="hljs-comment">//将图片画如canvas</span>
let data = ctxt.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">350</span>, <span class="hljs-number">200</span>).data;<span class="hljs-comment">//读取整张图片的像素。</span></code></pre>
<ul><li><p>将像素存入二维数组</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let x=0,y=0;  //二维数组的行和列， x：列  y：行
for(let i =0,len = data.length; i<len;i+=4){
        let red = data[i],//红色色深
        green = data[i+1],//绿色色深
        blue = data[i+2],//蓝色色深
        alpha = data[i+3];//透明度
        //把每个像素点，以二位数组的形式展开
        if(`${red} ${green} ${blue}` === '210 227 199'){
            coordinates[y][x] = 0;
        }else{
            coordinates[y][x] = 1;
        }
        x++;
        if(x >= 350){
            x = 0;
            y++;
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let x=<span class="hljs-number">0</span>,y=<span class="hljs-number">0</span>;  <span class="hljs-comment">//二维数组的行和列， x：列  y：行</span>
for(let i =<span class="hljs-number">0</span>,len = data.length; i&lt;len;i+=<span class="hljs-number">4</span>){
        let red = data[i],<span class="hljs-comment">//红色色深</span>
        green = data[i+<span class="hljs-number">1</span>],<span class="hljs-comment">//绿色色深</span>
        blue = data[i+<span class="hljs-number">2</span>],<span class="hljs-comment">//蓝色色深</span>
        alpha = data[i+<span class="hljs-number">3</span>];<span class="hljs-comment">//透明度</span>
        <span class="hljs-comment">//把每个像素点，以二位数组的形式展开</span>
        if(`${red} ${green} ${blue}` === '<span class="hljs-number">210</span> <span class="hljs-number">227</span> <span class="hljs-number">199</span>'){
            coordinates[y][x] = <span class="hljs-number">0</span>;
        }else{
            coordinates[y][x] = <span class="hljs-number">1</span>;
        }
        x++;
        if(x &gt;= <span class="hljs-number">350</span>){
            x = <span class="hljs-number">0</span>;
            y++;
        }
}</code></pre>
<ul><li><p>目前代码如下：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
        let ctxt = canvas.getContext('2d');
        let img = new Image;
        let coordinates = [];
        let h = 200,
            w = 350;
        for(let i=0; i<200; i++){
            coordinates[i] = [];
        }
        img.src = './image.png'; //图片路径
        img.onload = function(){
            ctxt.drawImage(img, 0, 0);
            let data = ctxt.getImageData(0, 0, 350, 200).data;//读取整张图片的像素。
            let x=0,y=0;
            for(let i =0,len = data.length; i<len;i+=4){
                    let red = data[i],//红色色深
                    green = data[i+1],//绿色色深
                    blue = data[i+2],//蓝色色深
                    alpha = data[i+3];//透明度
                    //把每个像素点，以二位数组的形式展开
                    if(`${red} ${green} ${blue}` === '210 227 199'){
                        coordinates[y][x] = 0;
                    }else{
                        coordinates[y][x] = 1;
                    }
                    x++;
                    if(x >= 350){
                        x = 0;
                        y++;
                    }
                }
                console.log(coordinates);
        }
    })();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(){
        let ctxt = canvas.getContext(<span class="hljs-symbol">'2d</span>')<span class="hljs-comment">;</span>
        let img = new Image<span class="hljs-comment">;</span>
        let coordinates = []<span class="hljs-comment">;</span>
        let h = <span class="hljs-number">200</span>,
            w = <span class="hljs-number">350</span><span class="hljs-comment">;</span>
        for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> i=0<span class="hljs-comment">; i&lt;200; i++){</span>
            coordinates[<span class="hljs-name">i</span>] = []<span class="hljs-comment">;</span>
        }
        img.src = <span class="hljs-symbol">'./image.png</span>'<span class="hljs-comment">; //图片路径</span>
        img.onload = function(){
            ctxt.drawImage(<span class="hljs-name">img</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
            let data = ctxt.getImageData(<span class="hljs-name">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">350</span>, <span class="hljs-number">200</span>).data<span class="hljs-comment">;//读取整张图片的像素。</span>
            let x=0,y=0<span class="hljs-comment">;</span>
            for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> i =0,len = data.length<span class="hljs-comment">; i&lt;len;i+=4){</span>
                    let red = data[<span class="hljs-name">i</span>],//红色色深
                    green = data[<span class="hljs-name">i+1</span>],//绿色色深
                    blue = data[<span class="hljs-name">i+2</span>],//蓝色色深
                    alpha = data[<span class="hljs-name">i+3</span>]<span class="hljs-comment">;//透明度</span>
                    //把每个像素点，以二位数组的形式展开
                    if(`${red} ${green} ${blue}` === <span class="hljs-symbol">'210</span> <span class="hljs-number">227</span> <span class="hljs-number">199</span>'){
                        coordinates[<span class="hljs-name">y</span>][<span class="hljs-name">x</span>] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                    }else{
                        coordinates[<span class="hljs-name">y</span>][<span class="hljs-name">x</span>] = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
                    }
                    x++<span class="hljs-comment">;</span>
                    if(<span class="hljs-name">x</span> &gt;= <span class="hljs-number">350</span>){
                        x = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                        y++<span class="hljs-comment">;</span>
                    }
                }
                console.log(<span class="hljs-name">coordinates</span>)<span class="hljs-comment">;</span>
        }
    })()<span class="hljs-comment">;</span></code></pre>
<ul><li><p>如图：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009738791?w=663&amp;h=234" src="https://static.alili.tech/img/remote/1460000009738791?w=663&amp;h=234" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>
<p>构成类似如下二维数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 0,0,0,0,0,0,0,0,0,0,0,0
 0,0,1,1,1,0,0,0,0,0,0,0
 0,1,1,1,1,0,0,0,0,0,0,0
 0,1,1,1,0,0,0,1,1,1,1,0
 0,0,0,0,0,0,1,1,1,0,0,0
 0,0,0,0,0,0,1,1,1,0,0,0
 0,0,0,0,0,0,0,0,0,0,0,0
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>
 <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>
 <span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>
 <span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>
 <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>
 <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>
 <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>
</code></pre>
</li></ul>
<p><strong>那么我们就只需要知道二维数组中这种连续为1的块有多少个就知道了图片中形状有多少个，并且块中有多少个1，那么这个块的面积就是1的个数。</strong></p>
<h3 id="articleHeader2">递归回溯算法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//计算连续的面积和个数
const linkSum = (i,j,num)=>{
        //走过的路就置0
      coordinates[i][j] = 0;
      num++;
      //向上
      if((i+1 < h) &amp;&amp; coordinates[i+1][j] == 1){
        num = linkSum(i+1 , j , num);
      }
      //向下
      if((j+1 < w) &amp;&amp; coordinates[i][j+1] == 1){
        num = linkSum(i , j+1 , num);
      }
      //向左
      if((i-1 >= 0) &amp;&amp; coordinates[i-1][j] == 1){
        num = linkSum(i-1 , j , num);
      }
      //向右
    if((j-1 >= 0) &amp;&amp; coordinates[i][j-1] == 1){
        num = linkSum(i , j-1 , num);
    }

    return num;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//计算连续的面积和个数</span>
const linkSum = (i,j,num)=&gt;{
        <span class="hljs-comment">//走过的路就置0</span>
      coordinates[i][j] = <span class="hljs-number">0</span>;
      num++;
      <span class="hljs-comment">//向上</span>
      if((i+<span class="hljs-number">1</span> &lt; h) &amp;&amp; coordinates[i+<span class="hljs-number">1</span>][j] == <span class="hljs-number">1</span>){
        num = linkSum(i+<span class="hljs-number">1</span> , j , num);
      }
      <span class="hljs-comment">//向下</span>
      if((j+<span class="hljs-number">1</span> &lt; w) &amp;&amp; coordinates[i][j+<span class="hljs-number">1</span>] == <span class="hljs-number">1</span>){
        num = linkSum(i , j+<span class="hljs-number">1</span> , num);
      }
      <span class="hljs-comment">//向左</span>
      if((i<span class="hljs-number">-1</span> &gt;= <span class="hljs-number">0</span>) &amp;&amp; coordinates[i<span class="hljs-number">-1</span>][j] == <span class="hljs-number">1</span>){
        num = linkSum(i<span class="hljs-number">-1</span> , j , num);
      }
      <span class="hljs-comment">//向右</span>
    if((j<span class="hljs-number">-1</span> &gt;= <span class="hljs-number">0</span>) &amp;&amp; coordinates[i][j<span class="hljs-number">-1</span>] == <span class="hljs-number">1</span>){
        num = linkSum(i , j<span class="hljs-number">-1</span> , num);
    }

    return num;
}</code></pre>
<p>不熟悉的，直接百度就好，这里就不多说了，其实代码就反应了很多信息。</p>
<h3 id="articleHeader3">使用算法，统计并计算出结果。</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getCountAndArea = () =>{
    let sum = [];
    let count = 0;
    for(let i = 0; i < h; i++)  //遍历二维数组
    {
      for(let j = 0; j < w; j++)
      {
       //连续1的个数
       if(coordinates[i][j] == 1)
       {
        let buf = 0;  //连续1的个数
        buf = linkSum(i,j,buf);
        count++;  //形状的总数
        sum.push({
            index: count,   //第几个形状
            area: buf         //形状的面积
        });
       }
      }
    }
    return {
        count,
        sum
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>const getCountAndArea = () =&gt;{
    <span class="hljs-keyword">let</span> sum = [];
    <span class="hljs-keyword">let</span> <span class="hljs-built_in">count</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; h; i++)  <span class="hljs-comment">//遍历二维数组</span>
    {
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; w; j++)
      {
       <span class="hljs-comment">//连续1的个数</span>
       <span class="hljs-keyword">if</span>(coordinates[i][j] == <span class="hljs-number">1</span>)
       {
        <span class="hljs-keyword">let</span> buf = <span class="hljs-number">0</span>;  <span class="hljs-comment">//连续1的个数</span>
        buf = linkSum(i,j,buf);
        <span class="hljs-built_in">count</span>++;  <span class="hljs-comment">//形状的总数</span>
        sum.push({
            index: <span class="hljs-built_in">count</span>,   <span class="hljs-comment">//第几个形状</span>
            area: buf         <span class="hljs-comment">//形状的面积</span>
        });
       }
      }
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-built_in">count</span>,
        sum
    };
}</code></pre>
<h3 id="articleHeader4">最后的代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
        let ctxt = canvas.getContext('2d');
        let img = new Image;
        let coordinates = [];
        let h = 200,
            w = 350;
        for(let i=0; i<200; i++){
            coordinates[i] = [];
        }
        img.src = './image.png'; //图片路径
        img.onload = function(){
            ctxt.drawImage(img, 0, 0);
            let data = ctxt.getImageData(0, 0, 350, 200).data;//读取整张图片的像素。
            let x=0,y=0;
            for(let i =0,len = data.length; i<len;i+=4){
                    let red = data[i],//红色色深
                    green = data[i+1],//绿色色深
                    blue = data[i+2],//蓝色色深
                    alpha = data[i+3];//透明度
                    //把每个像素点，以二位数组的形式展开
                    if(`${red} ${green} ${blue}` === '210 227 199'){
                        coordinates[y][x] = 0;
                    }else{
                        coordinates[y][x] = 1;
                    }
                    x++;
                    if(x >= 350){
                        x = 0;
                        y++;
                    }
                }
                // console.log(coordinates);
                let rst = getCountAndArea();
                // console.log(rst);
                console.log('个数： ' + rst.count);
                for(let i=0; i<rst.sum.length; i++){
                    console.log(`第${i+1}个面积为: ${rst.sum[i].area} px`);
                }
        }
    
        const getCountAndArea = () =>{
            let sum = [];
            let count = 0;
            for(let i = 0; i < h; i++)
            {
              for(let j = 0; j < w; j++)
              {
               //连续1的个数
               if(coordinates[i][j] == 1)
               {
                let buf = 0;
                buf = linkSum(i,j,buf);
                count++;
                sum.push({
                    index: count,
                    area: buf
                });
               }
              }
            }
            return {
                count,
                sum
            };
        }

        //计算连续的面积和个数
        const linkSum = (i,j,num)=>{
            //走过的路就置0
          coordinates[i][j] = 0;
          num++;
          //向上
          if((i+1 < h) &amp;&amp; coordinates[i+1][j] == 1){
            num = linkSum(i+1 , j , num);
          }
          //向下
          if((j+1 < w) &amp;&amp; coordinates[i][j+1] == 1){
            num = linkSum(i , j+1 , num);
          }
          //向左
          if((i-1 >= 0) &amp;&amp; coordinates[i-1][j] == 1){
            num = linkSum(i-1 , j , num);
          }
          //向右
        if((j-1 >= 0) &amp;&amp; coordinates[i][j-1] == 1){
            num = linkSum(i , j-1 , num);
        }

        return num;
        }
    })();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(){
        let ctxt = canvas.getContext(<span class="hljs-symbol">'2d</span>')<span class="hljs-comment">;</span>
        let img = new Image<span class="hljs-comment">;</span>
        let coordinates = []<span class="hljs-comment">;</span>
        let h = <span class="hljs-number">200</span>,
            w = <span class="hljs-number">350</span><span class="hljs-comment">;</span>
        for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> i=0<span class="hljs-comment">; i&lt;200; i++){</span>
            coordinates[<span class="hljs-name">i</span>] = []<span class="hljs-comment">;</span>
        }
        img.src = <span class="hljs-symbol">'./image.png</span>'<span class="hljs-comment">; //图片路径</span>
        img.onload = function(){
            ctxt.drawImage(<span class="hljs-name">img</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
            let data = ctxt.getImageData(<span class="hljs-name">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">350</span>, <span class="hljs-number">200</span>).data<span class="hljs-comment">;//读取整张图片的像素。</span>
            let x=0,y=0<span class="hljs-comment">;</span>
            for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> i =0,len = data.length<span class="hljs-comment">; i&lt;len;i+=4){</span>
                    let red = data[<span class="hljs-name">i</span>],//红色色深
                    green = data[<span class="hljs-name">i+1</span>],//绿色色深
                    blue = data[<span class="hljs-name">i+2</span>],//蓝色色深
                    alpha = data[<span class="hljs-name">i+3</span>]<span class="hljs-comment">;//透明度</span>
                    //把每个像素点，以二位数组的形式展开
                    if(`${red} ${green} ${blue}` === <span class="hljs-symbol">'210</span> <span class="hljs-number">227</span> <span class="hljs-number">199</span>'){
                        coordinates[<span class="hljs-name">y</span>][<span class="hljs-name">x</span>] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                    }else{
                        coordinates[<span class="hljs-name">y</span>][<span class="hljs-name">x</span>] = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
                    }
                    x++<span class="hljs-comment">;</span>
                    if(<span class="hljs-name">x</span> &gt;= <span class="hljs-number">350</span>){
                        x = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                        y++<span class="hljs-comment">;</span>
                    }
                }
                // console.log(<span class="hljs-name">coordinates</span>)<span class="hljs-comment">;</span>
                let rst = getCountAndArea()<span class="hljs-comment">;</span>
                // console.log(<span class="hljs-name">rst</span>)<span class="hljs-comment">;</span>
                console.log(<span class="hljs-symbol">'个数：</span> ' + rst.count)<span class="hljs-comment">;</span>
                for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> i=0<span class="hljs-comment">; i&lt;rst.sum.length; i++){</span>
                    console.log(`第${i+1}个面积为: ${rst.sum[<span class="hljs-name">i</span>].area} px`)<span class="hljs-comment">;</span>
                }
        }
    
        const getCountAndArea = () =&gt;{
            let sum = []<span class="hljs-comment">;</span>
            let count = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
            for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; h; i++)</span>
            {
              for(<span class="hljs-name"><span class="hljs-builtin-name">let</span></span> j = <span class="hljs-number">0</span><span class="hljs-comment">; j &lt; w; j++)</span>
              {
               //连续1的个数
               if(<span class="hljs-name">coordinates</span>[<span class="hljs-name">i</span>][<span class="hljs-name">j</span>] == <span class="hljs-number">1</span>)
               {
                let buf = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
                buf = linkSum(<span class="hljs-name">i</span>,j,buf)<span class="hljs-comment">;</span>
                count++<span class="hljs-comment">;</span>
                sum.push({
                    index: count,
                    area: buf
                })<span class="hljs-comment">;</span>
               }
              }
            }
            return {
                count,
                sum
            }<span class="hljs-comment">;</span>
        }

        //计算连续的面积和个数
        const linkSum = (<span class="hljs-name">i</span>,j,num)=&gt;{
            //走过的路就置0
          coordinates[<span class="hljs-name">i</span>][<span class="hljs-name">j</span>] = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
          num++<span class="hljs-comment">;</span>
          //向上
          if((<span class="hljs-name">i+1</span> &lt; h) &amp;&amp; coordinates[<span class="hljs-name">i+1</span>][<span class="hljs-name">j</span>] == <span class="hljs-number">1</span>){
            num = linkSum(<span class="hljs-name">i+1</span> , j , num)<span class="hljs-comment">;</span>
          }
          //向下
          if((<span class="hljs-name">j+1</span> &lt; w) &amp;&amp; coordinates[<span class="hljs-name">i</span>][<span class="hljs-name">j+1</span>] == <span class="hljs-number">1</span>){
            num = linkSum(<span class="hljs-name">i</span> , j+1 , num)<span class="hljs-comment">;</span>
          }
          //向左
          if((<span class="hljs-name">i-1</span> &gt;= <span class="hljs-number">0</span>) &amp;&amp; coordinates[<span class="hljs-name">i-1</span>][<span class="hljs-name">j</span>] == <span class="hljs-number">1</span>){
            num = linkSum(<span class="hljs-name">i-1</span> , j , num)<span class="hljs-comment">;</span>
          }
          //向右
        if((<span class="hljs-name">j-1</span> &gt;= <span class="hljs-number">0</span>) &amp;&amp; coordinates[<span class="hljs-name">i</span>][<span class="hljs-name">j-1</span>] == <span class="hljs-number">1</span>){
            num = linkSum(<span class="hljs-name">i</span> , j-1 , num)<span class="hljs-comment">;</span>
        }

        return num<span class="hljs-comment">;</span>
        }
    })()<span class="hljs-comment">;</span>
</code></pre>
<h3 id="articleHeader5">运行的结果：</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009738792?w=841&amp;h=425" src="https://static.alili.tech/img/remote/1460000009738792?w=841&amp;h=425" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试的一道算法题（使用canvas解答）

## 原文链接
[https://segmentfault.com/a/1190000009738785](https://segmentfault.com/a/1190000009738785)

