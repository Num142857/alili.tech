---
title: 'canvas 识别图片颜色 解析图片颜色' 
date: 2019-01-15 2:30:12
hidden: true
slug: hofbklzxw3e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在线 预览 <a href="http://jsrun.net/DjkKp/edit" rel="nofollow noreferrer" target="_blank">http://jsrun.net/DjkKp/edit</a><br>github  <a href="https://github.com/Taoqun/canvas_get_image_colors" rel="nofollow noreferrer" target="_blank">https://github.com/Taoqun/can...</a></p></blockquote>
<p><a href="http://upload-images.jianshu.io/upload_images/768057-314ae064a1cedce9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" rel="nofollow noreferrer" target="_blank">image.png</a><br><span class="img-wrap"><img data-src="/img/remote/1460000009345756?w=1240&amp;h=722" src="https://static.alili.tech/img/remote/1460000009345756?w=1240&amp;h=722" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://upload-images.jianshu.io/upload_images/768057-4ea8bab4c72e0f25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" rel="nofollow noreferrer" target="_blank">image.png</a><br><span class="img-wrap"><img data-src="/img/remote/1460000009345757?w=1240&amp;h=722" src="https://static.alili.tech/img/remote/1460000009345757?w=1240&amp;h=722" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009345758?w=1240&amp;h=722" src="https://static.alili.tech/img/remote/1460000009345758?w=1240&amp;h=722" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span><br><a href="http://upload-images.jianshu.io/upload_images/768057-da6bf63aede91a6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" rel="nofollow noreferrer" target="_blank">image.png</a></p>
<p><a href="http://upload-images.jianshu.io/upload_images/768057-1aeef656d4750b73.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" rel="nofollow noreferrer" target="_blank">image.png</a><br><span class="img-wrap"><img data-src="/img/remote/1460000009345759?w=1240&amp;h=722" src="https://static.alili.tech/img/remote/1460000009345759?w=1240&amp;h=722" alt="image.png" title="image.png" style="cursor: pointer;"></span></p>
<blockquote><p>方法</p></blockquote>
<ul>
<li><p>getColorXY(x,y) 传入坐标点，获取坐标点的颜色值</p></li>
<li><p>getColors()  返回 promise 对象  解析完成之后返回图片的颜色列表</p></li>
</ul>
<blockquote><p>属性</p></blockquote>
<ul>
<li><p>progress <code>String</code> 解析图像时的进度 百分比</p></li>
<li><p>accuracy  <code>Number</code> 解析图像颜色时的精度</p></li>
</ul>
<p><code>html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <input type=&quot;file&quot; id=&quot;file&quot;>
    <img src=&quot;&quot; id=&quot;img&quot;>
    <p id=&quot;text&quot;></p>
    <ul id=&quot;ul&quot;></ul>
    <script src=&quot;./index.js&quot;></script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"file"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"img"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ul"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><code>js方法</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入canvas_get_image_colors库
// 实例代码

let input = document.querySelector(&quot;#file&quot;)

input.addEventListener(&quot;change&quot;, (event) => {
    /**
     * 上传图片之后
     * 替换图片
     * 执行方法
     */
    let img = document.querySelector(&quot;#img&quot;)
    let file = event.target.files[0]
    let fr = new FileReader() 

    fr.onload = (e) => {
        let n_img = new Image()
        n_img.src = e.target.result
        n_img.onload = (e) => {
            n_img.id = 'img'
            n_img.width = n_img.width
            n_img.height = n_img.height
            document.body.replaceChild(n_img, img)
            getImg()
        }
    }

    fr.readAsDataURL(file)
})

function getImg() {
    /**
     * 获取图片，实例化图片
     * 执行方法
     * 解析完成，获得数组，操作回调函数
     * 
     */
    let img = document.querySelector(&quot;#img&quot;)
    let a = new getImgColor(img)
    
    // 获取 坐标 0 0 点的颜色值
    console.log(a.getColorXY(0, 0))

    a.getColors().then((arr) => {

        let ul = document.querySelector(&quot;#ul&quot;)
        let text = document.querySelector(&quot;#text&quot;)
            text.innerText = '共有' + arr.length + '个颜色';
        let str = ''

        arr.forEach((obj, index) => {
            str += `<li style=&quot;background-color:${obj['#']}&quot;>${obj['#']} - ${obj['index']}次</li>`;
        })

        ul.innerHTML = str
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 引入canvas_get_image_colors库</span>
<span class="hljs-comment">// 实例代码</span>

<span class="hljs-keyword">let</span> input = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#file"</span>)

input.addEventListener(<span class="hljs-string">"change"</span>, (event) =&gt; {
    <span class="hljs-comment">/**
     * 上传图片之后
     * 替换图片
     * 执行方法
     */</span>
    <span class="hljs-keyword">let</span> img = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#img"</span>)
    <span class="hljs-keyword">let</span> file = event.target.files[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">let</span> fr = <span class="hljs-keyword">new</span> FileReader() 

    fr.onload = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> n_img = <span class="hljs-keyword">new</span> Image()
        n_img.src = e.target.result
        n_img.onload = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
            n_img.id = <span class="hljs-string">'img'</span>
            n_img.width = n_img.width
            n_img.height = n_img.height
            <span class="hljs-built_in">document</span>.body.replaceChild(n_img, img)
            getImg()
        }
    }

    fr.readAsDataURL(file)
})

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getImg</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">/**
     * 获取图片，实例化图片
     * 执行方法
     * 解析完成，获得数组，操作回调函数
     * 
     */</span>
    <span class="hljs-keyword">let</span> img = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#img"</span>)
    <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">new</span> getImgColor(img)
    
    <span class="hljs-comment">// 获取 坐标 0 0 点的颜色值</span>
    <span class="hljs-built_in">console</span>.log(a.getColorXY(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>))

    a.getColors().then(<span class="hljs-function">(<span class="hljs-params">arr</span>) =&gt;</span> {

        <span class="hljs-keyword">let</span> ul = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#ul"</span>)
        <span class="hljs-keyword">let</span> text = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#text"</span>)
            text.innerText = <span class="hljs-string">'共有'</span> + arr.length + <span class="hljs-string">'个颜色'</span>;
        <span class="hljs-keyword">let</span> str = <span class="hljs-string">''</span>

        arr.forEach(<span class="hljs-function">(<span class="hljs-params">obj, index</span>) =&gt;</span> {
            str += <span class="hljs-string">`&lt;li style="background-color:<span class="hljs-subst">${obj[<span class="hljs-string">'#'</span>]}</span>"&gt;<span class="hljs-subst">${obj[<span class="hljs-string">'#'</span>]}</span> - <span class="hljs-subst">${obj[<span class="hljs-string">'index'</span>]}</span>次&lt;/li&gt;`</span>;
        })

        ul.innerHTML = str
    })
}</code></pre>
<p><code>canvas_get_image_colors.js库</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 封装函数库
function getImgColor(img) {
    /**
     * @ param 传入的图片 
     * @ this.progress 解析图片的进度 实时
     * @ this.canvas canvas元素
     * @ this.cvs context对象
     * @ this.accuracy Number 解析图片颜色的精确度 1 - 7 数字选择 
     *
     * 
     * @ anther taoqun <taoquns@foxmail.com>
     */

    this.canvas = document.createElement(&quot;canvas&quot;)
    this.canvas.width = img.width
    this.canvas.height = img.height
    this.cvs = this.canvas.getContext(&quot;2d&quot;)
    this.cvs.drawImage(img, 0, 0)
    this.accuracy = 5
    this.progress = ''
}
getImgColor.prototype.getColorXY = function(x, y) {

    /**
     * @param x Number x坐标起点
     * @param y Number y坐标起点
     * @return color Object 包含颜色的rgba #16进制颜色
     */

    let obj = this.cvs.getImageData(x, y, 1, 1)
    let arr = obj.data.toString().split(&quot;,&quot;)

    let first = parseInt(arr[0]).toString(16)
    first = first.length === 2 ? first : first + first

    let second = parseInt(arr[1]).toString(16)
    second = second.length === 2 ? second : second + second

    let third = parseInt(arr[2]).toString(16)
    third = third.length === 2 ? third : third + third

    let last = parseInt(arr.pop()) / 255
    last = last.toFixed(0)

    let color = {}
    color['rgba'] = 'rgba(' + arr.join(',') + ',' + last + ')'
    color['#'] = '#' + first + second + third
    return color
}
getImgColor.prototype.getColors = function() {

    /**
     * 避免图片过大，阻塞卡死
     * 每加载一行像素，延迟20毫秒加载下一行
     * return Promise 
     * promise resolve 解析完成后，返回颜色的总计数组，降序排列
     * promise reject none
     */

    return (new Promise((resolve, reject) => {

        let arr = []
        let getY = (i) => {
            for(let j = 0; j < this.canvas.height; j++) {
                let obj = {}
                obj = this.getColorXY(i, j)
                obj.index = 1
                let is = true

                arr.forEach((item) => {
                    if (item['#'] === obj['#']) {
                        is = false
                        item.index += 1
                    }

                    let l = []

                    for (let i = 0; i < obj['#'].length; i++) {

                        if (item['#'].indexOf(obj['#'][i]) > -1) {
                            l.push('1')
                        }
                    }

                    let acc = (this.accuracy > 7) ? 7 : this.accuracy
                    acc = (this.accuracy < 1) ? 2 : this.accuracy
                    if (l.length > acc) {
                        is = false
                        item.index += 1
                    }
                })

                if (is) {
                    arr.push(obj)
                }
            }
        };

        let getX = (i) => {
            if (i < this.canvas.width) {

                getY(i)
                this.progress = (i / this.canvas.width * 100).toFixed(2) + '%'
                console.log(this.progress)
                setTimeout(() => {
                    getX(++i)
                }, 20)

            } else {

                this.progress = '100%'
                console.log( this.progress )

                resolve(arr.sort(function(a, b) {
                    return a.index < b.index ? 1 : (a.index > b.index ? -1 : 0)
                }))
            }
        };

        getX(0)

    }))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 封装函数库</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getImgColor</span>(<span class="hljs-params">img</span>) </span>{
    <span class="hljs-comment">/**
     * @ param 传入的图片 
     * @ this.progress 解析图片的进度 实时
     * @ this.canvas canvas元素
     * @ this.cvs context对象
     * @ this.accuracy Number 解析图片颜色的精确度 1 - 7 数字选择 
     *
     * 
     * @ anther taoqun &lt;taoquns@foxmail.com&gt;
     */</span>

    <span class="hljs-keyword">this</span>.canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"canvas"</span>)
    <span class="hljs-keyword">this</span>.canvas.width = img.width
    <span class="hljs-keyword">this</span>.canvas.height = img.height
    <span class="hljs-keyword">this</span>.cvs = <span class="hljs-keyword">this</span>.canvas.getContext(<span class="hljs-string">"2d"</span>)
    <span class="hljs-keyword">this</span>.cvs.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
    <span class="hljs-keyword">this</span>.accuracy = <span class="hljs-number">5</span>
    <span class="hljs-keyword">this</span>.progress = <span class="hljs-string">''</span>
}
getImgColor.prototype.getColorXY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x, y</span>) </span>{

    <span class="hljs-comment">/**
     * @param x Number x坐标起点
     * @param y Number y坐标起点
     * @return color Object 包含颜色的rgba #16进制颜色
     */</span>

    <span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">this</span>.cvs.getImageData(x, y, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>)
    <span class="hljs-keyword">let</span> arr = obj.data.toString().split(<span class="hljs-string">","</span>)

    <span class="hljs-keyword">let</span> first = <span class="hljs-built_in">parseInt</span>(arr[<span class="hljs-number">0</span>]).toString(<span class="hljs-number">16</span>)
    first = first.length === <span class="hljs-number">2</span> ? first : first + first

    <span class="hljs-keyword">let</span> second = <span class="hljs-built_in">parseInt</span>(arr[<span class="hljs-number">1</span>]).toString(<span class="hljs-number">16</span>)
    second = second.length === <span class="hljs-number">2</span> ? second : second + second

    <span class="hljs-keyword">let</span> third = <span class="hljs-built_in">parseInt</span>(arr[<span class="hljs-number">2</span>]).toString(<span class="hljs-number">16</span>)
    third = third.length === <span class="hljs-number">2</span> ? third : third + third

    <span class="hljs-keyword">let</span> last = <span class="hljs-built_in">parseInt</span>(arr.pop()) / <span class="hljs-number">255</span>
    last = last.toFixed(<span class="hljs-number">0</span>)

    <span class="hljs-keyword">let</span> color = {}
    color[<span class="hljs-string">'rgba'</span>] = <span class="hljs-string">'rgba('</span> + arr.join(<span class="hljs-string">','</span>) + <span class="hljs-string">','</span> + last + <span class="hljs-string">')'</span>
    color[<span class="hljs-string">'#'</span>] = <span class="hljs-string">'#'</span> + first + second + third
    <span class="hljs-keyword">return</span> color
}
getImgColor.prototype.getColors = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-comment">/**
     * 避免图片过大，阻塞卡死
     * 每加载一行像素，延迟20毫秒加载下一行
     * return Promise 
     * promise resolve 解析完成后，返回颜色的总计数组，降序排列
     * promise reject none
     */</span>

    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-params">(<span class="hljs-params">resolve, reject</span>) =&gt; {

        <span class="hljs-keyword">let</span> arr = []
        <span class="hljs-keyword">let</span> getY = (<span class="hljs-params">i</span>) =&gt; {
            <span class="hljs-keyword">for</span>(<span class="hljs-params"><span class="hljs-keyword">let</span> j = 0; j &lt; <span class="hljs-keyword">this</span>.canvas.height; j++</span>) {
                <span class="hljs-keyword">let</span> obj = {}
                obj = <span class="hljs-keyword">this</span>.getColorXY(<span class="hljs-params">i, j</span>)
                obj.index = 1
                <span class="hljs-keyword">let</span> is = <span class="hljs-literal">true</span>

                arr.forEach(<span class="hljs-params">(<span class="hljs-params">item</span>) =&gt; {
                    <span class="hljs-keyword">if</span> (<span class="hljs-params">item['#'] === obj['#']</span>) {
                        is = <span class="hljs-literal">false</span>
                        item.index += 1
                    }

                    <span class="hljs-keyword">let</span> l = []

                    <span class="hljs-keyword">for</span> (<span class="hljs-params"><span class="hljs-keyword">let</span> i = 0; i &lt; obj['#'].length; i++</span>) {

                        <span class="hljs-keyword">if</span> (<span class="hljs-params">item['#'].indexOf(<span class="hljs-params">obj['#'][i]</span>) &gt; -1</span>) {
                            l.push(<span class="hljs-params">'1'</span>)
                        }
                    }

                    <span class="hljs-keyword">let</span> acc = (<span class="hljs-params"><span class="hljs-keyword">this</span>.accuracy &gt; 7</span>) ? 7 : <span class="hljs-keyword">this</span>.accuracy
                    acc = (<span class="hljs-params"><span class="hljs-keyword">this</span>.accuracy &lt; 1</span>) ? 2 : <span class="hljs-keyword">this</span>.accuracy
                    <span class="hljs-keyword">if</span> (<span class="hljs-params">l.length &gt; acc</span>) {
                        is = <span class="hljs-literal">false</span>
                        item.index += 1
                    }
                }</span>)

                <span class="hljs-keyword">if</span> (<span class="hljs-params">is</span>) {
                    arr.push(<span class="hljs-params">obj</span>)
                }
            }
        };

        <span class="hljs-keyword">let</span> getX = (<span class="hljs-params">i</span>) =&gt; {
            <span class="hljs-keyword">if</span> (<span class="hljs-params">i &lt; <span class="hljs-keyword">this</span>.canvas.width</span>) {

                getY(<span class="hljs-params">i</span>)
                <span class="hljs-keyword">this</span>.progress = (<span class="hljs-params">i / <span class="hljs-keyword">this</span>.canvas.width * 100</span>).toFixed(<span class="hljs-params">2</span>) + '%'
                <span class="hljs-built_in">console</span>.log(<span class="hljs-params"><span class="hljs-keyword">this</span>.progress</span>)
                setTimeout(<span class="hljs-params">(<span class="hljs-params"></span>) =&gt; {
                    getX(<span class="hljs-params">++i</span>)
                }, 20</span>)

            } <span class="hljs-keyword">else</span> {

                <span class="hljs-keyword">this</span>.progress = '100%'
                <span class="hljs-built_in">console</span>.log(<span class="hljs-params"> <span class="hljs-keyword">this</span>.progress </span>)

                resolve(<span class="hljs-params">arr.sort(<span class="hljs-params"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) {
                    <span class="hljs-keyword">return</span> a.index &lt; b.index ? 1 : (<span class="hljs-params">a.index &gt; b.index ? -1 : 0</span>)
                }</span>)</span>)
            }
        };

        getX(<span class="hljs-params">0</span>)

    }</span>)</span>)
}</span></code></pre>
<p><code>css</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
}
ul{
    margin: 20px auto;
    font-size: 0px;
}
ul li{
    display: inline-block;
    min-width: 100px;
    height: 50px;
    padding: 0 20px;
    margin: 1px;
    text-align: center;
    font-size: 15px;
    line-height: 50px;
    color: #000;
    border-radius: 4px;
    transition: all 0.3s linear 0s;
    cursor: pointer;
    border: 1px solid #e8e8e8;
}

ul li:hover{
    opacity: 0.8;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ul</span>,<span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">ul</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0px</span>;
}
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">min-width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.3s</span> linear <span class="hljs-number">0s</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#e8e8e8</span>;
}

<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span>{
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.8</span>;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas 识别图片颜色 解析图片颜色

## 原文链接
[https://segmentfault.com/a/1190000009345753](https://segmentfault.com/a/1190000009345753)

