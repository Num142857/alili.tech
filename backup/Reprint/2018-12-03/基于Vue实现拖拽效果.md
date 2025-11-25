---
title: '基于Vue实现拖拽效果' 
date: 2018-12-03 2:30:08
hidden: true
slug: mdukp9h9zjl
categories: [reprint]
---

{{< raw >}}

                    
<h2>效果图</h2>
<p><span class="img-wrap"><img data-src="https://upload-images.jianshu.io/upload_images/10414430-93d8911b63914b85.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttps://upload-images.jianshu.io/upload_images/10414430-93d8911b63914b85.gif?imageMogr2/auto-orient/strip" alt="demo1.gif" title="demo1.gif"></span></p>
<h2>分清clientY pageY screenY layerY offsetY的区别</h2>
<p>在我们想要做出拖拽这个效果的时候，我们需要分清这几个属性的区别，这几个属性都是计算鼠标点击的偏移值，我们需要对其进行了解才可以继续实现我们的拖拽效果</p>
<ul>
<li>clientY 指的是距离可视页面左上角的距离</li>
<li>pageY 指的是距离可视页面左上角的距离(不受页面滚动影响)</li>
<li>screenY 指的是距离屏幕左上角的距离</li>
<li>layerY 指的是找到它或它父级元素中最近具有定位的左上角距离</li>
<li>offsetY 指的是距离它自己左上角的距离</li>
</ul>
<p>一张图带大家简单了解了解</p>
<p><span class="img-wrap"><img data-src="https://upload-images.jianshu.io/upload_images/10414430-a468320f760ce39f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttps://upload-images.jianshu.io/upload_images/10414430-a468320f760ce39f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="区别" title="区别"></span></p>
<p>在我们简单了解完这些个属性以后，有几个属性需要分清。</p>
<table>
<thead><tr>
<th align="center"> </th>
<th>相同点</th>
<th>不同点</th>
</tr></thead>
<tbody>
<tr>
<td align="center">clientY</td>
<td>距离页面左上角距离</td>
<td>受页面滚动的影响</td>
</tr>
<tr>
<td align="center">pageY</td>
<td>距离页面左上角的距离</td>
<td>不受页面滚动影响</td>
</tr>
</tbody>
</table>
<table>
<thead><tr>
<th align="center"> </th>
<th>相同点</th>
<th>不同点</th>
</tr></thead>
<tbody>
<tr>
<td align="center">layerY</td>
<td>距离元素的左上角距离</td>
<td>受元素的定位的影响，会从本元素往上找到第一个定位的元素的左上角</td>
</tr>
<tr>
<td align="center">offsetY</td>
<td>距离元素左上角的距离</td>
<td>计算相对于本元素的左上角，不在乎定位问题，计算的是内交点。是IE浏览器的特有属性</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="https://upload-images.jianshu.io/upload_images/10414430-6c1bccb989903dfb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttps://upload-images.jianshu.io/upload_images/10414430-6c1bccb989903dfb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="layerY与offsetY区别" title="layerY与offsetY区别"></span></p>
<h2>实现拖拽功能</h2>
<p>我们既然熟悉了这几个偏移属性的意思，那么我们就进入我们的重点。话不多说直接上代码</p>
<pre><code>// darg.html

&lt;style&gt;
    #app{
        position: relative;     /*定位*/
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background: #666;       /*设置一下背景*/
    }
&lt;/style&gt;
&lt;body&gt;
    &lt;div id="app" @mousedown="move"&gt;       &lt;!--绑定按下事件--&gt;
        "{{"positionX"}}"
        "{{"positionY"}}"
    &lt;/div&gt;
&lt;/body&gt;</code></pre>
<pre><code>//main.js
let app = new Vue({
    el:'#app',
    data:{
        positionX:0,
        positionY:0,
    },
    methods:{
        move(e){
            let odiv = e.target;        //获取目标元素
            
            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e)=&gt;{       //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;    
                let top = e.clientY - disY;
                
                //绑定元素位置到positionX和positionY上面
                this.positionX = top;
                this.positionY = left;
                
                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';
            };
            document.onmouseup = (e) =&gt; {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }    
    
    },
    computed:{},
});
</code></pre>
<p>当然，我们可以将它绑定为一个自定义指令，这样的话就可以用调用指令的形式来实现拖拽效果，下面是定义自定义指令的代码</p>
<pre><code>// darg.html

&lt;style&gt;
    #app{
        position: relative;     /*定位*/
        top: 10px;
        left: 10px;
        width: 200px;
        height: 200px;
        background: #666;       /*设置一下背景*/
    }
&lt;/style&gt;
&lt;body&gt;
    &lt;div id="app" v-drag&gt;       &lt;!--实现用指令形式实现拖拽效果--&gt;
        
    &lt;/div&gt;
&lt;/body&gt;</code></pre>
<pre><code>//main.js

let app = new Vue({
    el:'#app',
    data:{},
    methods:{},
    directives: {
        drag: {
            // 指令的定义
            bind: function (el) {
                let odiv = el;   //获取当前元素
                oDiv.onmousedown = (e) =&gt; {
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - odiv.offsetLeft;
                    let disY = e.clientY - odiv.offsetTop;
                    
                    document.onmousemove = (e)=&gt;{
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX;    
                        let top = e.clientY - disY;
                      
                        //绑定元素位置到positionX和positionY上面
                        this.positionX = top;
                        this.positionY = left;
                
                        //移动当前元素
                        odiv.style.left = left + 'px';
                        odiv.style.top = top + 'px';
                    };
                    document.onmouseup = (e) =&gt; {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        }
    }
});</code></pre>
<h2>最后</h2>
<p>到这里我们就已经把拖拽效果用Vue实现了，我们用了两种不同的方式实现了拖拽，但实际上换汤不换药，我们需要弄清楚pageY、screenY、clientY、layerY、offsetY等区别。当然我们同时也学习了Vue的一些方法，例如自定义指令等。</p>
<p>成功不在一朝一夕间，我们都需要努力</p>
<p>原创文章，转载需联系</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue实现拖拽效果

## 原文链接
[https://segmentfault.com/a/1190000014572113](https://segmentfault.com/a/1190000014572113)

