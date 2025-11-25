---
title: 'Vue.js移动端左滑删除组件' 
date: 2019-01-01 2:30:07
hidden: true
slug: cl0fczjmjrv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue.js移动端左滑删除组件</h2>
<p><span class="img-wrap"><img data-src="/img/bVUzBL?w=527&amp;h=148" src="https://static.alili.tech/img/bVUzBL?w=527&amp;h=148" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="左滑删除在移动端很常见。下面我们一起来封装一下这个简单的小组件。我们想要是：
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>左滑删除在移动端很常见。下面我们一起来封装一下这个简单的小组件。我们想要是：
 
</code></pre>
<ul>
<li>当滑块没有超过删除按钮的一半时自动回到起点位置。</li>
<li>滑动距离超过一半滑动到最大值（删除按钮宽度）</li>
<li>尽量精简代码</li>
</ul>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在开始之前，我们先得将 [touchEventApi][1]弄清楚了。这个小组件中，用到了：

1.  TouchEvent.touches （表示一 个 TouchList 对象，包含了所有当前接触触摸平面的触点的Touch对象）

2.  TouchEvent.changedTouches （一个 TouchList 对象，包含了代表所有从上一次触摸事件到此次事件过程中，
    状态发生了改变的触点的 Touch 对象。）


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>在开始之前，我们先得将 [<span class="hljs-string">touchEventApi</span>][<span class="hljs-symbol">1</span>]弄清楚了。这个小组件中，用到了：

<span class="hljs-bullet">1.  </span>TouchEvent.touches （表示一 个 TouchList 对象，包含了所有当前接触触摸平面的触点的Touch对象）

<span class="hljs-bullet">2.  </span>TouchEvent.changedTouches （一个 TouchList 对象，包含了代表所有从上一次触摸事件到此次事件过程中，
<span class="hljs-code">    状态发生了改变的触点的 Touch 对象。）</span>


</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="话不多说，直接上代码:

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>话不多说，直接上代码:

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <template>
     <div class=&quot;delete&quot;>
             <div class=&quot;slider&quot;>
                   <div class=&quot;content&quot; 
                      @touchstart='touchStart'
                      @touchmove='touchMove'
                      @touchend='touchEnd'
                      :style=&quot;deleteSlider&quot;
                   >
                <!-- 插槽中放具体项目中需要内容         -->   
                    <slot></slot>
                   </div>
                   <div class=&quot;remove&quot; ref='remove'>
                       删除
                   </div>
            </div>
        
     </div>
</template>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"delete"</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider"</span>&gt;</span>
                   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span> 
                      @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">'touchStart'</span>
                      @<span class="hljs-attr">touchmove</span>=<span class="hljs-string">'touchMove'</span>
                      @<span class="hljs-attr">touchend</span>=<span class="hljs-string">'touchEnd'</span>
                      <span class="hljs-attr">:style</span>=<span class="hljs-string">"deleteSlider"</span>
                   &gt;</span>
                <span class="hljs-comment">&lt;!-- 插槽中放具体项目中需要内容         --&gt;</span>   
                    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
                   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                   <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"remove"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">'remove'</span>&gt;</span>
                       删除
                   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
     <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

</code></pre>
<p>然后是css，这里我使用的是less</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped lang=&quot;less&quot; scoped>
    .slider{
        width: 100%;
        height:200px;
        position: relative;
         user-select: none;
        .content{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background:green;
            z-index: 100;
            //    设置过渡动画
            transition: 0.3s;
             
        }
        .remove{
            position: absolute;
            width:200px;
            height:200px;
            background:red;
            right: 0;
            top: 0;
            color:#fff;
            text-align: center;
            font-size: 40px;
            line-height: 200px;
        }
    }
 
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;style scoped lang=<span class="hljs-string">"less"</span> scoped&gt;
    .slider{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
        <span class="hljs-attribute">position</span>: relative;
         user-select: <span class="hljs-attribute">none</span>;
        .<span class="hljs-attribute">content</span>{
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">background</span>:green;
            <span class="hljs-attribute">z-index</span>: <span class="hljs-number">100</span>;
            <span class="hljs-comment">//    设置过渡动画</span>
            <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.3s</span>;
             
        }
        .remove{
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background</span>:red;
            <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">200px</span>;
        }
    }
 
&lt;/style&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/ecmascript-6&quot;>
  export default {
     data() {
     return {
        startX:0,   //触摸位置
        endX:0,     //结束位置
        moveX: 0,   //滑动时的位置
        disX: 0,    //移动距离
        deleteSlider: '',//滑动时的效果,使用v-bind:style=&quot;deleteSlider&quot;
     }
    
     },
     methods:{
         touchStart(ev){
                ev= ev || event
          //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
    
            if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                }
            },
         touchMove(ev){
                ev = ev || event;
                   //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd=this.$refs.remove.offsetWidth;
                    if(ev.touches.length == 1) {
                        // 滑动时距离浏览器左侧实时距离
                        this.moveX = ev.touches[0].clientX
                
                        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                        this.disX = this.startX - this.moveX;
                   console.log(this.disX)
                        // 如果是向右滑动或者不滑动，不改变滑块的位置
                        if(this.disX < 0 || this.disX == 0) {
                            this.deleteSlider = &quot;transform:translateX(0px)&quot;;
                        // 大于0，表示左滑了，此时滑块开始滑动 
                        }else if (this.disX > 0) {
                             //具体滑动距离我取的是 手指偏移距离*5。
                            this.deleteSlider = &quot;transform:translateX(-&quot; + this.disX*5 + &quot;px)&quot;;
                            
                            // 最大也只能等于删除按钮宽度 
                            if (this.disX*5 >=wd) {
                                this.deleteSlider = &quot;transform:translateX(-&quot; +wd+ &quot;px)&quot;;
                             
                            }
                        }
                    }
              },
         touchEnd(ev){
              ev = ev || event;
              let wd=this.$refs.remove.offsetWidth;
              if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                      
                        this.disX = this.startX - endX;
                        console.log(this.disX)
                        //如果距离小于删除按钮一半,强行回到起点
                        
                        if ((this.disX*5) < (wd/2)) {
                          
                            this.deleteSlider = &quot;transform:translateX(0px)&quot;;
                        }else{
                            //大于一半 滑动到最大值
                             this.deleteSlider = &quot;transform:translateX(-&quot;+wd+ &quot;px)&quot;;
                        }
                    }
                }      
     }
     }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script type=<span class="hljs-string">"text/ecmascript-6"</span>&gt;
  export <span class="hljs-keyword">default</span> {
     <span class="hljs-keyword">data</span>() {
     <span class="hljs-keyword">return</span> {
        startX:<span class="hljs-number">0</span>,   <span class="hljs-comment">//触摸位置</span>
        endX:<span class="hljs-number">0</span>,     <span class="hljs-comment">//结束位置</span>
        moveX: <span class="hljs-number">0</span>,   <span class="hljs-comment">//滑动时的位置</span>
        disX: <span class="hljs-number">0</span>,    <span class="hljs-comment">//移动距离</span>
        deleteSlider: <span class="hljs-string">''</span>,<span class="hljs-comment">//滑动时的效果,使用v-bind:style="deleteSlider"</span>
     }
    
     },
     methods:{
         touchStart(ev){
                ev= ev || event
          <span class="hljs-comment">//tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕</span>
    
            <span class="hljs-keyword">if</span>(ev.touches.length == <span class="hljs-number">1</span>){
                    <span class="hljs-comment">// 记录开始位置</span>
                    <span class="hljs-keyword">this</span>.startX = ev.touches[<span class="hljs-number">0</span>].clientX;
                }
            },
         touchMove(ev){
                ev = ev || event;
                   <span class="hljs-comment">//获取删除按钮的宽度，此宽度为滑块左滑的最大距离</span>
                let wd=<span class="hljs-keyword">this</span>.$refs.remove.offsetWidth;
                    <span class="hljs-keyword">if</span>(ev.touches.length == <span class="hljs-number">1</span>) {
                        <span class="hljs-comment">// 滑动时距离浏览器左侧实时距离</span>
                        <span class="hljs-keyword">this</span>.moveX = ev.touches[<span class="hljs-number">0</span>].clientX
                
                        <span class="hljs-comment">//起始位置减去 实时的滑动的距离，得到手指实时偏移距离</span>
                        <span class="hljs-keyword">this</span>.disX = <span class="hljs-keyword">this</span>.startX - <span class="hljs-keyword">this</span>.moveX;
                   console.log(<span class="hljs-keyword">this</span>.disX)
                        <span class="hljs-comment">// 如果是向右滑动或者不滑动，不改变滑块的位置</span>
                        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.disX &lt; <span class="hljs-number">0</span> || <span class="hljs-keyword">this</span>.disX == <span class="hljs-number">0</span>) {
                            <span class="hljs-keyword">this</span>.deleteSlider = <span class="hljs-string">"transform:translateX(0px)"</span>;
                        <span class="hljs-comment">// 大于0，表示左滑了，此时滑块开始滑动 </span>
                        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disX &gt; <span class="hljs-number">0</span>) {
                             <span class="hljs-comment">//具体滑动距离我取的是 手指偏移距离*5。</span>
                            <span class="hljs-keyword">this</span>.deleteSlider = <span class="hljs-string">"transform:translateX(-"</span> + <span class="hljs-keyword">this</span>.disX*<span class="hljs-number">5</span> + <span class="hljs-string">"px)"</span>;
                            
                            <span class="hljs-comment">// 最大也只能等于删除按钮宽度 </span>
                            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.disX*<span class="hljs-number">5</span> &gt;=wd) {
                                <span class="hljs-keyword">this</span>.deleteSlider = <span class="hljs-string">"transform:translateX(-"</span> +wd+ <span class="hljs-string">"px)"</span>;
                             
                            }
                        }
                    }
              },
         touchEnd(ev){
              ev = ev || event;
              let wd=<span class="hljs-keyword">this</span>.$refs.remove.offsetWidth;
              <span class="hljs-keyword">if</span> (ev.changedTouches.length == <span class="hljs-number">1</span>) {
                    let endX = ev.changedTouches[<span class="hljs-number">0</span>].clientX;
                      
                        <span class="hljs-keyword">this</span>.disX = <span class="hljs-keyword">this</span>.startX - endX;
                        console.log(<span class="hljs-keyword">this</span>.disX)
                        <span class="hljs-comment">//如果距离小于删除按钮一半,强行回到起点</span>
                        
                        <span class="hljs-keyword">if</span> ((<span class="hljs-keyword">this</span>.disX*<span class="hljs-number">5</span>) &lt; (wd/<span class="hljs-number">2</span>)) {
                          
                            <span class="hljs-keyword">this</span>.deleteSlider = <span class="hljs-string">"transform:translateX(0px)"</span>;
                        }<span class="hljs-keyword">else</span>{
                            <span class="hljs-comment">//大于一半 滑动到最大值</span>
                             <span class="hljs-keyword">this</span>.deleteSlider = <span class="hljs-string">"transform:translateX(-"</span>+wd+ <span class="hljs-string">"px)"</span>;
                        }
                    }
                }      
     }
     }
&lt;/script&gt;</code></pre>
<p>到这里就全部完成了，希望对大家有帮助！不足的希望大家能够指出来！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js移动端左滑删除组件

## 原文链接
[https://segmentfault.com/a/1190000011062124](https://segmentfault.com/a/1190000011062124)

