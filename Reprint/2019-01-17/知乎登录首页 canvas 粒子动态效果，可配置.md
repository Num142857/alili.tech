---
title: '知乎登录首页 canvas 粒子动态效果，可配置' 
date: 2019-01-17 2:30:25
hidden: true
slug: 7zzxkgxprp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>个人博客 <a href="http://taoquns.com/paper/59ba5627a157197cdcc0a033" rel="nofollow noreferrer" target="_blank">http://taoquns.com/paper/59ba...</a></p>
<ul>
<li>canvas 封装方法，增加点击，移动效果，配置颜色线条粗细功能</li>
<li>在线查看 <a href="http://jsrun.net/3PkKp/edit" rel="nofollow noreferrer" target="_blank">http://jsrun.net/3PkKp/edit</a>
</li>
<li>传到github了，以后也许用得着，地址: <a href="https://github.com/Taoqun/canvas_zhihu_login" rel="nofollow noreferrer" target="_blank">https://github.com/Taoqun/can...</a>
</li>
</ul>
</blockquote>
<p>先上效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009038498?w=1065&amp;h=522" src="https://static.alili.tech/img/remote/1460000009038498?w=1065&amp;h=522" alt="GIF.gif" title="GIF.gif" style="cursor: pointer; display: inline;"></span></p>
<p>点击效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009038499" src="https://static.alili.tech/img/remote/1460000009038499" alt="GIF2.gif" title="GIF2.gif" style="cursor: pointer; display: inline;"></span></p>
<blockquote><ul>
<li>默认生成随机大小的100个小点点</li>
<li>鼠标移动，修改鼠标小点点的xy轴坐标</li>
<li>鼠标点击，增加随机大小小点点</li>
<li>增加离屏canvas 优化性能</li>
<li>修复鼠标移出，去除鼠标效果的小点点</li>
<li>增加暂停开始功能</li>
</ul></blockquote>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;root&quot; width=&quot;1000&quot; height=&quot;500&quot;></canvas>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">"root"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"1000"</span> height=<span class="hljs-string">"500"</span>&gt;&lt;/canvas&gt;</code></pre>
<p>index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var root = document.querySelector(&quot;#root&quot;)
var a = new CanvasAnimate(root,{length:80,clicked:true,moveon:true})
    a.Run() // 开始运行
    a.pause() //  暂停" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> root = document.querySelector(<span class="hljs-string">"#root"</span>)
<span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = new CanvasAnimate(root,{length:<span class="hljs-number">80</span>,clicked:true,moveon:true})
    <span class="hljs-selector-tag">a</span>.Run() <span class="hljs-comment">// 开始运行</span>
    <span class="hljs-selector-tag">a</span>.pause() <span class="hljs-comment">//  暂停</span></code></pre>
<p>CanvasAnimate.js</p>
<blockquote><p>说明，配置参数</p></blockquote>
<ul>
<li>
<code>length</code>  <code>Number</code>   生成的小点点数量</li>
<li>
<code>RoundColor</code>  <code>String</code> 小点点颜色</li>
<li>
<code>LineColor</code> <code>String</code> 线条颜色</li>
<li>
<code>LineWeight</code> <code>Number</code> 线条宽度</li>
<li>
<code>clicked</code> <code>Boolean</code> 鼠标点击是否增加连接小点点</li>
<li>
<code>moveon</code> <code>Boolean</code> 鼠标移动是否增加连接效果</li>
</ul>
<hr>
<blockquote><p>方法</p></blockquote>
<ul>
<li>Run 开始运行</li>
<li>pause 暂停动画 或者 开始动画 切换</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CanvasAnimate(Dom,options){
    options = options || {}
    this.Element = Dom
    this.cvs = Dom.getContext(&quot;2d&quot;)
    this.off_cvs = document.createElement(&quot;canvas&quot;)
    this.off_cvs.width = Dom.width
    this.off_cvs.height = Dom.height
    this.Dom = this.off_cvs.getContext(&quot;2d&quot;)
    this.width = Dom.width
    this.height = Dom.height
    this.length = options.length || 100
    this.RoundColor = options.RoundColor || &quot;#999&quot; 
    this.RoundDiameter = options.RoundDiameter || 2
    this.LineColor = options.LineColor || &quot;#ccc&quot;
    this.LineWeight = options.LineWeight || 1
    this.clicked = options.clicked || false
    this.moveon = options.moveon || false
    this.list = []
    this.paused = true
}
CanvasAnimate.prototype.Run = function(){
    if( this.clicked ){
        this.Element.addEventListener( &quot;click&quot;,this.Clicked.bind(this) )
    }
    if( this.moveon ){
        this.Element.addEventListener( &quot;mousemove&quot;,this.moveXY.bind(this) )
        this.Element.addEventListener( &quot;mouseout&quot;,this.moveoutXY.bind(this) )
    }
    this.Draw( this.getLength() )
}
CanvasAnimate.prototype.getLength=function(){
    let arr = []
    for(let i=0;i< this.length ;i++){
        let obj = {}
            obj.x = parseInt( Math.random() * this.width )
            obj.y = parseInt( Math.random() * this.height )
            obj.r = parseInt( Math.random()*10 )
            obj.controlX = parseInt( Math.random()*10 ) > 5 ? &quot;left&quot;:&quot;right&quot;
            obj.controlY = parseInt( Math.random()*10 ) > 5 ? &quot;bottom&quot;:&quot;top&quot;
        arr.push(obj)
    }
    return arr
}
CanvasAnimate.prototype.Draw = function(list){
    let new_arr = []
    let line_arr = []

    list.map((item,index)=>{
        let xy = this.ControlXY(item)
        let obj = this.ControlRound(xy)
        new_arr.push( obj )
    });
    
    new_arr.map((item1,index1)=>{
        new_arr.map((item2,index2)=>{
            if(item1 !== item2){
                let x = item1.x - item2.x
                let y = item1.y - item2.y
                if( Math.abs(x)< 100 &amp;&amp; Math.abs(y)<100 ){
                    let obj = {
                        x1:item1.x,
                        y1:item1.y,
                        x2:item2.x,
                        y2:item2.y,
                    }
                    line_arr.push(obj)
                }
            }
        })
    })

    this.drawLine(line_arr)
    
    new_arr.map((item)=>{
        this.drawRound(item)
    })

    this.list = new_arr

    this.cvs.drawImage(this.off_cvs,0,0,this.width,this.height)
    
    setTimeout(()=>{
        if(this.paused){
            this.next()
        }
    },50)
}
CanvasAnimate.prototype.next = function(){
    this.cvs.clearRect( 0,0,this.width,this.height )
    this.Dom.clearRect( 0,0,this.width,this.height )
    this.Draw( this.list )
}
CanvasAnimate.prototype.drawRound = function(obj){
    let {x,y,r} = obj
    this.Dom.beginPath()
    this.Dom.arc( x,y,r, 0, 2*Math.PI )
    this.Dom.fillStyle = this.RoundColor
    this.Dom.fill()
    this.Dom.closePath()
}
CanvasAnimate.prototype.drawLine = function(list){
    list.map( (item)=>{
        this.Dom.beginPath()
        this.Dom.moveTo( item.x1,item.y1 )
        this.Dom.lineTo( item.x2,item.y2 )
        this.Dom.lineWidth = this.LineWeight
        this.Dom.strokeStyle = this.LineColor
        this.Dom.stroke()
        this.Dom.closePath()
    })
}
CanvasAnimate.prototype.ControlXY = function(obj){
    if(obj.x >= (this.width - obj.r) ){
        obj.controlX = 'left'
    }else if( obj.x <= parseInt(obj.r/2)  ){
        obj.controlX = &quot;right&quot;
    }

    if( obj.y >= (this.height - obj.r) ){
        obj.controlY = &quot;bottom&quot;
    }else if( obj.y <= parseInt(obj.r/2) ){
        obj.controlY = &quot;top&quot;
    }
    return obj
}
CanvasAnimate.prototype.ControlRound = function(obj){
    switch(obj.controlX){
        case &quot;right&quot;:
            obj.x++;
            break;
        case &quot;left&quot;:
            obj.x--;
            break;
    }
    switch(obj.controlY){
        case &quot;top&quot;:
            obj.y++;
            break;
        case &quot;bottom&quot;:
            obj.y--;
            break;
    }
    return obj
}
CanvasAnimate.prototype.Clicked = function(event){
    let obj = {}
        obj.x = event.clientX
        obj.y = event.clientY
        obj.r = parseInt( Math.random()*10 )
        obj.controlX = parseInt( Math.random()*10 ) > 5 ? 'left' :'right'
        obj.controlY = parseInt( Math.random()*10 ) > 5 ? 'bottom' :'top'
    this.list.push(obj)
}
CanvasAnimate.prototype.moveXY = function(event){
    let obj = {}
        obj.x = event.clientX
        obj.y = event.clientY
        obj.r = 0
        obj.move = true
    if( this.list[0][&quot;move&quot;] ){
        this.list[0][&quot;x&quot;] = obj.x
        this.list[0][&quot;y&quot;] = obj.y
        this.list[0][&quot;r&quot;] = 1
    }else{
        this.list.unshift(obj)
    }
}
CanvasAnimate.prototype.moveoutXY = function(event){
    this.list.shift()
}
CanvasAnimate.prototype.pause = function(){
    this.paused = !this.paused
    if( this.paused){
        this.Draw(this.list)
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CanvasAnimate</span>(<span class="hljs-params">Dom,options</span>)</span>{
    options = options || {}
    <span class="hljs-keyword">this</span>.Element = Dom
    <span class="hljs-keyword">this</span>.cvs = Dom.getContext(<span class="hljs-string">"2d"</span>)
    <span class="hljs-keyword">this</span>.off_cvs = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"canvas"</span>)
    <span class="hljs-keyword">this</span>.off_cvs.width = Dom.width
    <span class="hljs-keyword">this</span>.off_cvs.height = Dom.height
    <span class="hljs-keyword">this</span>.Dom = <span class="hljs-keyword">this</span>.off_cvs.getContext(<span class="hljs-string">"2d"</span>)
    <span class="hljs-keyword">this</span>.width = Dom.width
    <span class="hljs-keyword">this</span>.height = Dom.height
    <span class="hljs-keyword">this</span>.length = options.length || <span class="hljs-number">100</span>
    <span class="hljs-keyword">this</span>.RoundColor = options.RoundColor || <span class="hljs-string">"#999"</span> 
    <span class="hljs-keyword">this</span>.RoundDiameter = options.RoundDiameter || <span class="hljs-number">2</span>
    <span class="hljs-keyword">this</span>.LineColor = options.LineColor || <span class="hljs-string">"#ccc"</span>
    <span class="hljs-keyword">this</span>.LineWeight = options.LineWeight || <span class="hljs-number">1</span>
    <span class="hljs-keyword">this</span>.clicked = options.clicked || <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>.moveon = options.moveon || <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>.list = []
    <span class="hljs-keyword">this</span>.paused = <span class="hljs-literal">true</span>
}
CanvasAnimate.prototype.Run = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>( <span class="hljs-keyword">this</span>.clicked ){
        <span class="hljs-keyword">this</span>.Element.addEventListener( <span class="hljs-string">"click"</span>,<span class="hljs-keyword">this</span>.Clicked.bind(<span class="hljs-keyword">this</span>) )
    }
    <span class="hljs-keyword">if</span>( <span class="hljs-keyword">this</span>.moveon ){
        <span class="hljs-keyword">this</span>.Element.addEventListener( <span class="hljs-string">"mousemove"</span>,<span class="hljs-keyword">this</span>.moveXY.bind(<span class="hljs-keyword">this</span>) )
        <span class="hljs-keyword">this</span>.Element.addEventListener( <span class="hljs-string">"mouseout"</span>,<span class="hljs-keyword">this</span>.moveoutXY.bind(<span class="hljs-keyword">this</span>) )
    }
    <span class="hljs-keyword">this</span>.Draw( <span class="hljs-keyword">this</span>.getLength() )
}
CanvasAnimate.prototype.getLength=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> arr = []
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt; <span class="hljs-keyword">this</span>.length ;i++){
        <span class="hljs-keyword">let</span> obj = {}
            obj.x = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random() * <span class="hljs-keyword">this</span>.width )
            obj.y = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random() * <span class="hljs-keyword">this</span>.height )
            obj.r = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span> )
            obj.controlX = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span> ) &gt; <span class="hljs-number">5</span> ? <span class="hljs-string">"left"</span>:<span class="hljs-string">"right"</span>
            obj.controlY = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span> ) &gt; <span class="hljs-number">5</span> ? <span class="hljs-string">"bottom"</span>:<span class="hljs-string">"top"</span>
        arr.push(obj)
    }
    <span class="hljs-keyword">return</span> arr
}
CanvasAnimate.prototype.Draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">list</span>)</span>{
    <span class="hljs-keyword">let</span> new_arr = []
    <span class="hljs-keyword">let</span> line_arr = []

    list.map(<span class="hljs-function">(<span class="hljs-params">item,index</span>)=&gt;</span>{
        <span class="hljs-keyword">let</span> xy = <span class="hljs-keyword">this</span>.ControlXY(item)
        <span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">this</span>.ControlRound(xy)
        new_arr.push( obj )
    });
    
    new_arr.map(<span class="hljs-function">(<span class="hljs-params">item1,index1</span>)=&gt;</span>{
        new_arr.map(<span class="hljs-function">(<span class="hljs-params">item2,index2</span>)=&gt;</span>{
            <span class="hljs-keyword">if</span>(item1 !== item2){
                <span class="hljs-keyword">let</span> x = item1.x - item2.x
                <span class="hljs-keyword">let</span> y = item1.y - item2.y
                <span class="hljs-keyword">if</span>( <span class="hljs-built_in">Math</span>.abs(x)&lt; <span class="hljs-number">100</span> &amp;&amp; <span class="hljs-built_in">Math</span>.abs(y)&lt;<span class="hljs-number">100</span> ){
                    <span class="hljs-keyword">let</span> obj = {
                        <span class="hljs-attr">x1</span>:item1.x,
                        <span class="hljs-attr">y1</span>:item1.y,
                        <span class="hljs-attr">x2</span>:item2.x,
                        <span class="hljs-attr">y2</span>:item2.y,
                    }
                    line_arr.push(obj)
                }
            }
        })
    })

    <span class="hljs-keyword">this</span>.drawLine(line_arr)
    
    new_arr.map(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
        <span class="hljs-keyword">this</span>.drawRound(item)
    })

    <span class="hljs-keyword">this</span>.list = new_arr

    <span class="hljs-keyword">this</span>.cvs.drawImage(<span class="hljs-keyword">this</span>.off_cvs,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-keyword">this</span>.width,<span class="hljs-keyword">this</span>.height)
    
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.paused){
            <span class="hljs-keyword">this</span>.next()
        }
    },<span class="hljs-number">50</span>)
}
CanvasAnimate.prototype.next = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.cvs.clearRect( <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-keyword">this</span>.width,<span class="hljs-keyword">this</span>.height )
    <span class="hljs-keyword">this</span>.Dom.clearRect( <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-keyword">this</span>.width,<span class="hljs-keyword">this</span>.height )
    <span class="hljs-keyword">this</span>.Draw( <span class="hljs-keyword">this</span>.list )
}
CanvasAnimate.prototype.drawRound = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">let</span> {x,y,r} = obj
    <span class="hljs-keyword">this</span>.Dom.beginPath()
    <span class="hljs-keyword">this</span>.Dom.arc( x,y,r, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI )
    <span class="hljs-keyword">this</span>.Dom.fillStyle = <span class="hljs-keyword">this</span>.RoundColor
    <span class="hljs-keyword">this</span>.Dom.fill()
    <span class="hljs-keyword">this</span>.Dom.closePath()
}
CanvasAnimate.prototype.drawLine = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">list</span>)</span>{
    list.map( <span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
        <span class="hljs-keyword">this</span>.Dom.beginPath()
        <span class="hljs-keyword">this</span>.Dom.moveTo( item.x1,item.y1 )
        <span class="hljs-keyword">this</span>.Dom.lineTo( item.x2,item.y2 )
        <span class="hljs-keyword">this</span>.Dom.lineWidth = <span class="hljs-keyword">this</span>.LineWeight
        <span class="hljs-keyword">this</span>.Dom.strokeStyle = <span class="hljs-keyword">this</span>.LineColor
        <span class="hljs-keyword">this</span>.Dom.stroke()
        <span class="hljs-keyword">this</span>.Dom.closePath()
    })
}
CanvasAnimate.prototype.ControlXY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">if</span>(obj.x &gt;= (<span class="hljs-keyword">this</span>.width - obj.r) ){
        obj.controlX = <span class="hljs-string">'left'</span>
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>( obj.x &lt;= <span class="hljs-built_in">parseInt</span>(obj.r/<span class="hljs-number">2</span>)  ){
        obj.controlX = <span class="hljs-string">"right"</span>
    }

    <span class="hljs-keyword">if</span>( obj.y &gt;= (<span class="hljs-keyword">this</span>.height - obj.r) ){
        obj.controlY = <span class="hljs-string">"bottom"</span>
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>( obj.y &lt;= <span class="hljs-built_in">parseInt</span>(obj.r/<span class="hljs-number">2</span>) ){
        obj.controlY = <span class="hljs-string">"top"</span>
    }
    <span class="hljs-keyword">return</span> obj
}
CanvasAnimate.prototype.ControlRound = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">switch</span>(obj.controlX){
        <span class="hljs-keyword">case</span> <span class="hljs-string">"right"</span>:
            obj.x++;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">"left"</span>:
            obj.x--;
            <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-keyword">switch</span>(obj.controlY){
        <span class="hljs-keyword">case</span> <span class="hljs-string">"top"</span>:
            obj.y++;
            <span class="hljs-keyword">break</span>;
        <span class="hljs-keyword">case</span> <span class="hljs-string">"bottom"</span>:
            obj.y--;
            <span class="hljs-keyword">break</span>;
    }
    <span class="hljs-keyword">return</span> obj
}
CanvasAnimate.prototype.Clicked = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-keyword">let</span> obj = {}
        obj.x = event.clientX
        obj.y = event.clientY
        obj.r = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span> )
        obj.controlX = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span> ) &gt; <span class="hljs-number">5</span> ? <span class="hljs-string">'left'</span> :<span class="hljs-string">'right'</span>
        obj.controlY = <span class="hljs-built_in">parseInt</span>( <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span> ) &gt; <span class="hljs-number">5</span> ? <span class="hljs-string">'bottom'</span> :<span class="hljs-string">'top'</span>
    <span class="hljs-keyword">this</span>.list.push(obj)
}
CanvasAnimate.prototype.moveXY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-keyword">let</span> obj = {}
        obj.x = event.clientX
        obj.y = event.clientY
        obj.r = <span class="hljs-number">0</span>
        obj.move = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">if</span>( <span class="hljs-keyword">this</span>.list[<span class="hljs-number">0</span>][<span class="hljs-string">"move"</span>] ){
        <span class="hljs-keyword">this</span>.list[<span class="hljs-number">0</span>][<span class="hljs-string">"x"</span>] = obj.x
        <span class="hljs-keyword">this</span>.list[<span class="hljs-number">0</span>][<span class="hljs-string">"y"</span>] = obj.y
        <span class="hljs-keyword">this</span>.list[<span class="hljs-number">0</span>][<span class="hljs-string">"r"</span>] = <span class="hljs-number">1</span>
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.list.unshift(obj)
    }
}
CanvasAnimate.prototype.moveoutXY = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-keyword">this</span>.list.shift()
}
CanvasAnimate.prototype.pause = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.paused = !<span class="hljs-keyword">this</span>.paused
    <span class="hljs-keyword">if</span>( <span class="hljs-keyword">this</span>.paused){
        <span class="hljs-keyword">this</span>.Draw(<span class="hljs-keyword">this</span>.list)
    }
}

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
知乎登录首页 canvas 粒子动态效果，可配置

## 原文链接
[https://segmentfault.com/a/1190000009037017](https://segmentfault.com/a/1190000009037017)

