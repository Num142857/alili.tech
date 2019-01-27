---
title: '用Canvas实现h5移动端图片裁剪' 
date: 2019-01-28 2:30:09
hidden: true
slug: 0iienoyhr9yf
categories: [reprint]
---

{{< raw >}}

                    
<p>前阵子七夕的时候搞了一个h5活动页，需要做一个本地图片的裁剪上传功能，用于生成一些特定的表白图片。主要是用到了H5的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader" rel="nofollow noreferrer" target="_blank">FileApi</a> 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial" rel="nofollow noreferrer" target="_blank">Canvas</a>。个人感觉图片裁剪功能还是很实用的，故写篇文章分享一下。</p>
<p>demo地址：<a href="https://github.com/Bless-L/img-clipping" rel="nofollow noreferrer" target="_blank">https://github.com/Bless-L/im...</a><br>效果gif：<br><span class="img-wrap"><img data-src="/img/remote/1460000008040493?w=774&amp;h=649" src="https://static.alili.tech/img/remote/1460000008040493?w=774&amp;h=649" alt="效果图demo" title="效果图demo" style="cursor: pointer;"></span></p>
<p>（PS：这个demo本来是移动端的，但了为了方便录制效果，所以我用chrome模拟地跑了一下。<br>还有就是demo是配合<a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a>实现的，因为我是直接在项目中复制过来改改的，就懒得转换了）</p>
<h2 id="articleHeader0"><strong>图片读取</strong></h2>
<p>要裁剪首先肯定就是读取图片文件。其实也很简单，用一个input指定为file类型就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;file&quot; class=&quot;file&quot; accept=&quot;image/*;capture=camera&quot; name=&quot;img&quot; @change=&quot;clipImg($event)&quot;>

//Vue里面的methods
clipImg(event){
    this.clip = new Clip('container',this);
    this.clip.init(event.target.files[0]);
    this.isClip = true;
    document.body.addEventListener('touchmove',this.noScoll,false);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"image/*;capture=camera"</span> name=<span class="hljs-string">"img"</span> <span class="hljs-meta">@change</span>=<span class="hljs-string">"clipImg($event)"</span>&gt;

<span class="hljs-comment">//Vue里面的methods</span>
clipImg(event){
    <span class="hljs-keyword">this</span>.clip = <span class="hljs-keyword">new</span> <span class="hljs-type">Clip</span>(<span class="hljs-symbol">'containe</span>r',<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.clip.init(event.target.files[<span class="hljs-number">0</span>]);
    <span class="hljs-keyword">this</span>.isClip = <span class="hljs-literal">true</span>;
    document.body.addEventListener(<span class="hljs-symbol">'touchmov</span>e',<span class="hljs-keyword">this</span>.noScoll,<span class="hljs-literal">false</span>);
},</code></pre>
<p>然后就是处理获得的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这些方法是写在Clip类里面的

handleFiles(file){
    let t = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        t.imgUrl = this.result;
        t.paintImg(this.result);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//这些方法是写在Clip类里面的</span>

handleFiles(file){
    <span class="hljs-keyword">let</span> t = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">let</span> reader = <span class="hljs-keyword">new</span> FileReader();
    reader.readAsDataURL(file);
    reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        t.imgUrl = <span class="hljs-keyword">this</span>.result;
        t.paintImg(<span class="hljs-keyword">this</span>.result);
    }
}</code></pre>
<p>先新建一个<code>FileReader</code>类，然后把读得的文件用<code>readAsDataURL</code>转换为base64编码，再通过<code>paintImg</code>方法进行绘制处理。</p>
<p>需要注意的是文件读取是异步的，所以读取后的操作需要在<code>onload</code>函数中进行。</p>
<h2 id="articleHeader1"><strong>绘制裁剪界面</strong></h2>
<h3 id="articleHeader2"><strong>初始化</strong></h3>
<p>先是初始化一些基本参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//初始化
init(file){
    this.sx = 0; //裁剪框的初始x
    this.sy = 0; //裁剪框的初始y
    this.sWidth = 233; //裁剪框的宽
    this.sHeight = 175; //裁剪框的高 
    this.chooseBoxScale = 233/175;//裁剪框的宽高比

    this.handleFiles(file);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//初始化</span>
init(file){
    <span class="hljs-keyword">this</span>.sx = <span class="hljs-number">0</span>; <span class="hljs-comment">//裁剪框的初始x</span>
    <span class="hljs-keyword">this</span>.sy = <span class="hljs-number">0</span>; <span class="hljs-comment">//裁剪框的初始y</span>
    <span class="hljs-keyword">this</span>.sWidth = <span class="hljs-number">233</span>; <span class="hljs-comment">//裁剪框的宽</span>
    <span class="hljs-keyword">this</span>.sHeight = <span class="hljs-number">175</span>; <span class="hljs-comment">//裁剪框的高 </span>
    <span class="hljs-keyword">this</span>.chooseBoxScale = <span class="hljs-number">233</span>/<span class="hljs-number">175</span>;<span class="hljs-comment">//裁剪框的宽高比</span>

    <span class="hljs-keyword">this</span>.handleFiles(file);
}</code></pre>
<p>在这里裁剪框的比例是固定的4：3，有需要的同学可以自行更改。至于宽高那个是先照着设计稿设一个数值，后面会根据不同的图片而重新设置。</p>
<h3 id="articleHeader3"><strong>绘制裁剪界面</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="paintImg(picUrl){
    //other code
    //.....
    img.onload = function() {

        let imgScale = img.width / img.height;
        let boxScale = t.regional.offsetWidth / t.regional.offsetHeight;

        //判断盒子与图片的比列
        if (imgScale < boxScale) {
            //设置图片的像素
            t.imgWidth = t.regional.offsetHeight * imgScale;
            t.imgHeight = t.regional.offsetHeight;
        } else {
            //设置图片的像素
            t.imgWidth = t.regional.offsetWidth;
            t.imgHeight = t.regional.offsetWidth / imgScale;
        }

        //判断图片与选择框的比例大小，作出裁剪
        if (imgScale < t.chooseBoxScale) {
            //设置选择框的像素
            t.sWidth = t.imgWidth;
            t.sHeight = t.imgWidth / t.chooseBoxScale;

            //设置初始框的位置
            t.sx = 0;
            t.sy = (t.imgHeight - t.sHeight) / 2;
        } else {
            //设置选择框的像素
            t.sWidth = t.imgHeight * t.chooseBoxScale;
            t.sHeight = t.imgHeight;

            t.sx = (t.imgWidth - t.sWidth) / 2;
            t.sy = 0;
        }
        //(1)
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">paintImg(picUrl){
    <span class="hljs-comment">//other code</span>
    <span class="hljs-comment">//.....</span>
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

        <span class="hljs-keyword">let</span> imgScale = img.width / img.height;
        <span class="hljs-keyword">let</span> boxScale = t.regional.offsetWidth / t.regional.offsetHeight;

        <span class="hljs-comment">//判断盒子与图片的比列</span>
        <span class="hljs-keyword">if</span> (imgScale &lt; boxScale) {
            <span class="hljs-comment">//设置图片的像素</span>
            t.imgWidth = t.regional.offsetHeight * imgScale;
            t.imgHeight = t.regional.offsetHeight;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//设置图片的像素</span>
            t.imgWidth = t.regional.offsetWidth;
            t.imgHeight = t.regional.offsetWidth / imgScale;
        }

        <span class="hljs-comment">//判断图片与选择框的比例大小，作出裁剪</span>
        <span class="hljs-keyword">if</span> (imgScale &lt; t.chooseBoxScale) {
            <span class="hljs-comment">//设置选择框的像素</span>
            t.sWidth = t.imgWidth;
            t.sHeight = t.imgWidth / t.chooseBoxScale;

            <span class="hljs-comment">//设置初始框的位置</span>
            t.sx = <span class="hljs-number">0</span>;
            t.sy = (t.imgHeight - t.sHeight) / <span class="hljs-number">2</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//设置选择框的像素</span>
            t.sWidth = t.imgHeight * t.chooseBoxScale;
            t.sHeight = t.imgHeight;

            t.sx = (t.imgWidth - t.sWidth) / <span class="hljs-number">2</span>;
            t.sy = <span class="hljs-number">0</span>;
        }
        <span class="hljs-comment">//(1)</span>
    }</code></pre>
<p>这段代码比较长。</p>
<p>先说一下裁剪界面的结构。看那demo及动图可以知道，裁剪界面中，首先有一个最外层的容器，装着图片，即id为<code>container</code>的div，称为1；<br>然后是图片容器，即id为<code>image-box</code>的canvas，称为2；<br>最后是最外面被掏空裁剪区域的模糊层，即id为<code>cover-box</code>的canvas，称为3。</p>
<p>这几个容器中，1的宽高是固定的。而2则在保证比例不变的情况下有一边占满整个1。所以可以看到上面那段判断盒子与图片比列的代码是在实现这个显示方式。<br>同时可以看到3的裁剪区域也是同理的，在保证比例不变的情况下有一边占满整个2。亦即裁剪区域的比例是在事先就设计好的，在这里是4：3。</p>
<p>所以我在效果图中将<strong>高填满容器</strong>和<strong>宽填满容器</strong>的图片都演示了一遍。</p>
<h3 id="articleHeader4"><strong>一些处理</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //续上面(1)
    
    //高分屏下图片模糊，需要2倍处理
    t.getImage.height = 2 * t.imgHeight;
    t.getImage.width = 2 * t.imgWidth;
    t.getImage.style.width = t.imgWidth + 'px';
    t.getImage.style.height = t.imgHeight + 'px';
    
    let vertSquashRatio = t.detectVerticalSquash(img);
    
    cxt.drawImage(img, 0, 0,2 * t.imgWidth * vertSquashRatio, 2 * t.imgHeight * vertSquashRatio)
    
    t.cutImage();
    t.drag();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    <span class="hljs-comment">//续上面(1)</span>
    
    <span class="hljs-comment">//高分屏下图片模糊，需要2倍处理</span>
    t.getImage.<span class="hljs-built_in">height</span> = <span class="hljs-number">2</span> * t.imgHeight;
    t.getImage.<span class="hljs-built_in">width</span> = <span class="hljs-number">2</span> * t.imgWidth;
    t.getImage.style.<span class="hljs-built_in">width</span> = t.imgWidth + <span class="hljs-string">'px'</span>;
    t.getImage.style.<span class="hljs-built_in">height</span> = t.imgHeight + <span class="hljs-string">'px'</span>;
    
    let vertSquashRatio = t.detectVerticalSquash(img);
    
    cxt.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>,<span class="hljs-number">2</span> * t.imgWidth * vertSquashRatio, <span class="hljs-number">2</span> * t.imgHeight * vertSquashRatio)
    
    t.cutImage();
    t.drag();</code></pre>
<p>第一个是高分屏下图片模糊的问题，在高分屏下用canvas绘制某些图片是会出现模糊，估计是和canvas的绘制机制有关，具体原因<a href="https://www.html5rocks.com/en/tutorials/canvas/hidpi/" rel="nofollow noreferrer" target="_blank">戳这里</a>。解决办法也比较简单，将canvas的css宽高固定，容器宽高扩大两倍。（我的理解，css宽高就是canvas标签style样式设置的宽高，容器宽高就是里面那个画板的宽高，不是同一个东西）经过这样的处理后，绝大多数图片的模糊问题解决了。</p>
<p>第二个是图片绘制压缩问题，在低版本的ios机型下绘制1m多以上的图片时会出现压缩，翻转等问题，详情及解决办法<a href="http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios" rel="nofollow noreferrer" target="_blank">戳这里</a>。我上面就是用了一个stackflow里面的fix方法。</p>
<p>从这两个问题可以见到，canvas绘制还不是非常成熟，使用时要注意一些bug及相关修复办法。</p>
<h3 id="articleHeader5"><strong>移动时绘制</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="drag(){
    let t = this;
    let draging = false;

    //记录初始点击的pageX，pageY。用于记录位移
    let pageX = 0;
    let pageY = 0;

    //初始位移
    let startX = 0;
    let startY = 0;


    t.editBox.addEventListener('touchmove', function(ev) {
        let e = ev.touches[0];

        let offsetX = e.pageX - pageX;
        let offsetY = e.pageY - pageY;
        if (draging) {

            if (t.imgHeight == t.sHeight) {

                t.sx = startX + offsetX;

                if (t.sx <= 0) {
                    t.sx = 0;
                } else if (t.sx >= t.imgWidth - t.sWidth) {
                    t.sx = t.imgWidth - t.sWidth;
                }
            } else {
                t.sy = startY + offsetY;

                if (t.sy <= 0) {
                    t.sy = 0;
                } else if (t.sy >= t.imgHeight - t.sHeight) {
                    t.sy = t.imgHeight - t.sHeight;
                }
            }
            t.cutImage();
        }
    });
    t.editBox.addEventListener('touchstart', function(ev) {
        let e = ev.touches[0];
        draging = true;

        pageX = e.pageX;
        pageY = e.pageY;

        startX = t.sx;
        startY = t.sy;

    })
    t.editBox.addEventListener('touchend', function() {
        draging = false;
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>drag(){
    <span class="hljs-keyword">let</span> <span class="hljs-attr">t</span> = this;
    <span class="hljs-keyword">let</span> <span class="hljs-attr">draging</span> = <span class="hljs-literal">false</span>;

    //记录初始点击的pageX，pageY。用于记录位移
    <span class="hljs-keyword">let</span> <span class="hljs-attr">pageX</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> <span class="hljs-attr">pageY</span> = <span class="hljs-number">0</span>;

    //初始位移
    <span class="hljs-keyword">let</span> <span class="hljs-attr">startX</span> = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">let</span> <span class="hljs-attr">startY</span> = <span class="hljs-number">0</span>;


    t.editBox.addEventListener('touchmove', function(ev) {
        <span class="hljs-keyword">let</span> <span class="hljs-attr">e</span> = ev.touches[<span class="hljs-number">0</span>];

        <span class="hljs-keyword">let</span> <span class="hljs-attr">offsetX</span> = e.pageX - pageX;
        <span class="hljs-keyword">let</span> <span class="hljs-attr">offsetY</span> = e.pageY - pageY;
        <span class="hljs-keyword">if</span> (draging) {

            <span class="hljs-keyword">if</span> (t.<span class="hljs-attr">imgHeight</span> == t.sHeight) {

                t.<span class="hljs-attr">sx</span> = startX + offsetX;

                <span class="hljs-keyword">if</span> (t.sx &lt;= <span class="hljs-number">0</span>) {
                    t.<span class="hljs-attr">sx</span> = <span class="hljs-number">0</span>;
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (t.sx &gt;= t.imgWidth - t.sWidth) {
                    t.<span class="hljs-attr">sx</span> = t.imgWidth - t.sWidth;
                }
            } <span class="hljs-keyword">else</span> {
                t.<span class="hljs-attr">sy</span> = startY + offsetY;

                <span class="hljs-keyword">if</span> (t.sy &lt;= <span class="hljs-number">0</span>) {
                    t.<span class="hljs-attr">sy</span> = <span class="hljs-number">0</span>;
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (t.sy &gt;= t.imgHeight - t.sHeight) {
                    t.<span class="hljs-attr">sy</span> = t.imgHeight - t.sHeight;
                }
            }
            t.cutImage();
        }
    });
    t.editBox.addEventListener('touchstart', function(ev) {
        <span class="hljs-keyword">let</span> <span class="hljs-attr">e</span> = ev.touches[<span class="hljs-number">0</span>];
        <span class="hljs-attr">draging</span> = <span class="hljs-literal">true</span>;

        <span class="hljs-attr">pageX</span> = e.pageX;
        <span class="hljs-attr">pageY</span> = e.pageY;

        <span class="hljs-attr">startX</span> = t.sx;
        <span class="hljs-attr">startY</span> = t.sy;

    })
    t.editBox.addEventListener('touchend', function() {
        <span class="hljs-attr">draging</span> = <span class="hljs-literal">false</span>;
    })</code></pre>
<p>这里逻辑不算太复杂，先是记录初始位置，然后判断是左右移动还是上下移动（对应高填满容器和宽填满容器），再根据pageX，pageY这些判断位置量即可。</p>
<h3 id="articleHeader6"><strong>保存图片</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="save(){
    let t = this;
    let saveCanvas = document.createElement('canvas');
    let ctx = saveCanvas.getContext('2d');

    //图片裁剪后的尺寸
    saveCanvas.width = 466;
    saveCanvas.height = 350;

    let images = new Image();
    images.src = t.imgUrl;

    images.onload = function(){

        //计算裁剪尺寸比例，用于裁剪图片
        let cropWidthScale = images.width/t.imgWidth;
        let cropHeightScale = images.height/t.imgHeight;

        t.drawImageIOSFix(ctx, images,cropWidthScale * t.sx , cropHeightScale* t.sy,
                        t.sWidth * cropWidthScale, t.sHeight * cropHeightScale, 0, 0, 466, 350);
    //    ctx.drawImage(images,2 * t.sx, 2 * t.sy, t.sWidth * 2, t.sHeight * 2, 0, 0, 466, 350);
        t.$vm.clipUrl = saveCanvas.toDataURL();
        t.regional.removeChild(t.getImage);
        t.regional.removeChild(t.editBox);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>save(){
    <span class="hljs-keyword">let</span> t = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">let</span> saveCanvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
    <span class="hljs-keyword">let</span> ctx = saveCanvas.getContext(<span class="hljs-string">'2d'</span>);

    <span class="hljs-comment">//图片裁剪后的尺寸</span>
    saveCanvas.width = <span class="hljs-number">466</span>;
    saveCanvas.height = <span class="hljs-number">350</span>;

    <span class="hljs-keyword">let</span> images = <span class="hljs-keyword">new</span> Image();
    images.src = t.imgUrl;

    images.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

        <span class="hljs-comment">//计算裁剪尺寸比例，用于裁剪图片</span>
        <span class="hljs-keyword">let</span> cropWidthScale = images.width/t.imgWidth;
        <span class="hljs-keyword">let</span> cropHeightScale = images.height/t.imgHeight;

        t.drawImageIOSFix(ctx, images,cropWidthScale * t.sx , cropHeightScale* t.sy,
                        t.sWidth * cropWidthScale, t.sHeight * cropHeightScale, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">466</span>, <span class="hljs-number">350</span>);
    <span class="hljs-comment">//    ctx.drawImage(images,2 * t.sx, 2 * t.sy, t.sWidth * 2, t.sHeight * 2, 0, 0, 466, 350);</span>
        t.$vm.clipUrl = saveCanvas.toDataURL();
        t.regional.removeChild(t.getImage);
        t.regional.removeChild(t.editBox);
    }
}</code></pre>
<p>这部分也挺简单的，裁剪框那里记录了裁剪开始及结束的坐标，然后新建一个canvas裁出来，并用<code>toDataURL</code>方法转换为base64编码，就可以传输到后台了。我这里裁剪后的尺寸是固定的，这是业务需求，有需要的可以更改</p>
<h3 id="articleHeader7"><strong>总结</strong></h3>
<p>大致的流程就是这样，感谢大家的阅读，如有错误，多多包涵。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Canvas实现h5移动端图片裁剪

## 原文链接
[https://segmentfault.com/a/1190000008040490](https://segmentfault.com/a/1190000008040490)

