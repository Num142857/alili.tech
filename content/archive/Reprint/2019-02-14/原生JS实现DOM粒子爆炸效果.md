---
title: '原生JS实现DOM粒子爆炸效果' 
date: 2019-02-14 2:30:37
hidden: true
slug: vor6r3vuvqc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">爆炸动效分享</h1>
<h2 id="articleHeader1">前言</h2>
<p>此次分享是一次自我组件开发的总结，还是有很多不足之处，望各位大大多提宝贵意见，互相学习交流。</p>
<h2 id="articleHeader2">分享内容介绍</h2>
<blockquote>通过原生js代码，实现粒子爆炸效果组件<br>组件开发过程中，使用到了公司内部十分高效的工程化环境，特此打个广告： 新浪移动诚招各种技术大大！可以私聊投简历哦！</blockquote>
<h2 id="articleHeader3">效果预览</h2>
<p><span class="img-wrap"><img data-src="/img/bVbiJF7?w=352&amp;h=640" src="https://static.alili.tech/img/bVbiJF7?w=352&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">效果分析</h2>
<ul>
<li>点击作为动画开始的起点,自动结束</li>
<li>每次效果产生多个抛物线粒子运动的元素，方向随机，展示内容不一样，有空间上Z轴的大小变化</li>
<li>需求上可以无间隔点击，即第一组动画未结束可播放第二组动画</li>
<li>动画基本执行时长一致</li>
</ul>
<h5>由以上四点分析后，动画实现有哪些实现方案呢？</h5>
<ul><li><h5>css操作态变换（如focus）使子元素执行动画</h5></li></ul>
<p><code>不可取，效果可多次连点，css状态变换与需求不符</code></p>
<ul>
<li>
<h5>Js 控制动画开始，事先写好css动画预置，通过class 包含选择器切换动画 例如： .active .items{animation:xxx ...;}</h5>
<p><code>不可取，单次执行动画没有问题，但是存在效果的固定，以及无法连续执行动画</code></p>
</li>
<li>
<h5>事先写好大量动画，隐藏大量dom元素，动画开始随机选取dom元素执行自己唯一的动画keyframes</h5>
<p><code>实现层面来说，行得通，但是评论列表长的时候，dom数量巨大，且css大量动画造成代码量沉重、无随机性</code></p>
</li>
<li>
<h5>抛弃css动画，使用canvas 绘制动画</h5>
<p><code>可行，但是canvas维护成本略高，且自定义功能难设计，屏幕适配也有一定成本</code></p>
</li>
<li>
<h5>js做dom创建，生成随机css @keyframes</h5>
<p><code>可行，但是创建style样式表，引发css重新渲染页面，会导致页面的性能下降，且抛物线css的复杂度不低，暂不作为首选</code></p>
</li>
<li>
<h5>js 刷帧 做dom渲染</h5>
<p><code>可行，但是刷帧操作会造成性能压力</code></p>
</li>
</ul>
<h5>结论</h5>
<p>canvas虽说可行，但由于其开发弊端 本次分享不以canvas为分享内容，而是使用最后一种 js刷帧的dom操作</p>
<h2 id="articleHeader5">组件结构</h2>
<p>由截图分享，动画可以分为两个模块，首先，随机发散的粒子具有共性：抛物线动画，淡出，渲染表情</p>
<p>而例子数量变多之后则为截图中的效果</p>
<p>但是，由于性能原因，我们需要做到粒子的掌控，实现资源再利用，那么还需要第二个模块，作为粒子的管控组件</p>
<p>所以： 此功能可使用两个模块进行开发： partical.js 粒子功能 与 boom.js 粒子管理</p>
<h2 id="articleHeader6">实现 Partical.js</h2>
<ol><li>
<p>前置资源：抛物线运动的物理曲线需要使用Tween.js提供的速度函数</p>
<p>若不想引入Tween.js 可以使用以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
      * Tween.js
      * t: current time（当前时间）；
      * b: beginning value（初始值）；
      * c: change in value（变化量）；
      * d: duration（持续时间）。
      * you can visit 'http://easings.net/zh-cn' to get effect" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code> 
      * Tween.js
      * t: current <span class="hljs-built_in">time</span>（当前时间）；
      * b: beginning <span class="hljs-built_in">value</span>（初始值）；
      * c: change <span class="hljs-keyword">in</span> <span class="hljs-built_in">value</span>（变化量）；
      * d: duration（持续时间）。
      * you can visit <span class="hljs-string">'http://easings.net/zh-cn'</span> <span class="hljs-built_in">to</span> <span class="hljs-built_in">get</span> effect</code></pre>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        *
    
        const Quad = {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d) {
                return -c *(t /= d)*(t-2) + b;  
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t-2) - 1) + b;
            }
        }
        const Linear = function(t, b, c, d) { 
            return c * t / d + b; 
        }
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>        *
    
        <span class="hljs-keyword">const</span> Quad = {
            easeIn: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(t, b, c, d)</span> </span>{
                <span class="hljs-keyword">return</span> c * (t /= d) * t + b;
            },
            easeOut: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(t, b, c, d)</span> </span>{
                <span class="hljs-keyword">return</span> -c *(t /= d)*(t<span class="hljs-number">-2</span>) + b;  
            },
            easeInOut: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(t, b, c, d)</span> </span>{
                <span class="hljs-keyword">if</span> ((t /= d / <span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> c / <span class="hljs-number">2</span> * t * t + b;
                <span class="hljs-keyword">return</span> -c / <span class="hljs-number">2</span> * ((--t) * (t<span class="hljs-number">-2</span>) - <span class="hljs-number">1</span>) + b;
            }
        }
        <span class="hljs-keyword">const</span> Linear = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(t, b, c, d)</span> </span>{ 
            <span class="hljs-keyword">return</span> c * t / d + b; 
        }
    
</code></pre>
<ol><li>
<p>粒子实现<br>实现思路：<br> 希望在粒子管控组件时，使用new partical的方式创建粒子，每个粒子存在自己的动画开始方法，动画结束回调。<br> 由于评论列表可能存在数量巨大的情况，我们希望只全局创建有限个数的粒子，那么则提供呢容器移除粒子功能以及容器添加粒子的功能，实现粒子的复用</p>
<p>partical_style.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     
     //粒子充满粒子容器，需要容器存在尺寸以及relative定位
     .Boom-Partical_Holder{
         position: absolute;
         left:0;
         right:0;
         top:0;
         bottom:0;
         margin:auto;
     }
     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>     
     <span class="hljs-comment">//粒子充满粒子容器，需要容器存在尺寸以及relative定位</span>
     <span class="hljs-selector-class">.Boom-Partical_Holder</span>{
         <span class="hljs-attribute">position</span>: absolute;
         <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
         <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
         <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
         <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
         <span class="hljs-attribute">margin</span>:auto;
     }
     </code></pre>
<p>particle.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
 import &quot;partical_style.css&quot;;
 
 class Partical{
     // dom为装载动画元素的容器 用于设置位置等样式
     dom = null;
     // 动画开始时间
     StartTime = -1;
     // 当前粒子的动画方向，区别上抛运动与下抛运动
     direction = &quot;UP&quot;;
     // 动画延迟
     delay = 0;
     // 三方向位移值
     targetZ = 0;
     targetY = 0;
     targetX = 0;
     // 缩放倍率
     scaleNum = 1;
     // 是否正在执行动画
     animating = false;
     // 粒子的父容器，标识此粒子被渲染到那个元素内
     parent = null;
     // 动画结束的回调函数列表
     animEndCBList = [];
     // 粒子渲染的内容容器 slot
     con = null;
     
     constructor(){
         //创建动画粒子dom
         this.dom = document.createElement(&quot;div&quot;);
         this.dom.classList.add(&quot;Boom-Partical_Holder&quot;);
         this.dom.innerHTML = `
             <div class=&quot;Boom-Partical_con&quot;>
                 Boom
             </div>
         `;
     }
     
     // 在哪里渲染
     renderIn(parent) {
         // dom判断此处省略
         parent.appendChild(this.dom);
         this.parent = parent;
         // 此处为初始化 slot 容器
         !this.con &amp;&amp; ( this.con = this.dom.querySelector(&quot;.Boom-Partical_con&quot;));
     }
     
     // 用于父容器移除当前粒子
     deleteEl(){
         // dom判断此处省略
         this.parent.removeChild(this.dom);
     }
     
     // 执行动画，需要此粒子执行动画的角度，动画的力度，以及延迟时间
     animate({ deg, pow, delay } = {}){
         // 后续补全
     }
     
     // 动画结束回调存储
     onAnimationEnd(cb) {
         if (typeof cb !== 'function') return;
         this.animEndCBList.push(cb);
     }
     
     // 动画结束回调执行
     emitEndCB() {
         this.dom.style.cssText += `;-webkit-transform:translate3d(0,0,0);opacity:1;`;
         this.animating = false;
         try {
             for (let cb  of this.animEndCBList) {
                 cb();
             }
         } catch (error) {
             console.warn(&quot;回调报错:&quot;,cb);
         }
     }
     
     // 简易实现slot功能，向粒子容器内添加元素
     insertChild(child){
         this.con.innerHTML = '';
         this.con.appendChild(child);
     }
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> 
 <span class="hljs-keyword">import</span> <span class="hljs-string">"partical_style.css"</span>;
 
 <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Partical</span></span>{
     <span class="hljs-comment">// dom为装载动画元素的容器 用于设置位置等样式</span>
     dom = <span class="hljs-literal">null</span>;
     <span class="hljs-comment">// 动画开始时间</span>
     StartTime = <span class="hljs-number">-1</span>;
     <span class="hljs-comment">// 当前粒子的动画方向，区别上抛运动与下抛运动</span>
     direction = <span class="hljs-string">"UP"</span>;
     <span class="hljs-comment">// 动画延迟</span>
     delay = <span class="hljs-number">0</span>;
     <span class="hljs-comment">// 三方向位移值</span>
     targetZ = <span class="hljs-number">0</span>;
     targetY = <span class="hljs-number">0</span>;
     targetX = <span class="hljs-number">0</span>;
     <span class="hljs-comment">// 缩放倍率</span>
     scaleNum = <span class="hljs-number">1</span>;
     <span class="hljs-comment">// 是否正在执行动画</span>
     animating = <span class="hljs-literal">false</span>;
     <span class="hljs-comment">// 粒子的父容器，标识此粒子被渲染到那个元素内</span>
     parent = <span class="hljs-literal">null</span>;
     <span class="hljs-comment">// 动画结束的回调函数列表</span>
     animEndCBList = [];
     <span class="hljs-comment">// 粒子渲染的内容容器 slot</span>
     con = <span class="hljs-literal">null</span>;
     
     <span class="hljs-keyword">constructor</span>(){
         <span class="hljs-comment">//创建动画粒子dom</span>
         <span class="hljs-keyword">this</span>.dom = document.createElement(<span class="hljs-string">"div"</span>);
         <span class="hljs-keyword">this</span>.dom.classList.add(<span class="hljs-string">"Boom-Partical_Holder"</span>);
         <span class="hljs-keyword">this</span>.dom.innerHTML = `
             &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">Boom</span>-<span class="hljs-title">Partical_con</span>"&gt;</span>
                 Boom
             &lt;/div&gt;
         `;
     }
     
     <span class="hljs-comment">// 在哪里渲染</span>
     renderIn(parent) {
         <span class="hljs-comment">// dom判断此处省略</span>
         parent.appendChild(<span class="hljs-keyword">this</span>.dom);
         <span class="hljs-keyword">this</span>.parent = parent;
         <span class="hljs-comment">// 此处为初始化 slot 容器</span>
         !<span class="hljs-keyword">this</span>.con &amp;&amp; ( <span class="hljs-keyword">this</span>.con = <span class="hljs-keyword">this</span>.dom.querySelector(<span class="hljs-string">".Boom-Partical_con"</span>));
     }
     
     <span class="hljs-comment">// 用于父容器移除当前粒子</span>
     deleteEl(){
         <span class="hljs-comment">// dom判断此处省略</span>
         <span class="hljs-keyword">this</span>.parent.removeChild(<span class="hljs-keyword">this</span>.dom);
     }
     
     <span class="hljs-comment">// 执行动画，需要此粒子执行动画的角度，动画的力度，以及延迟时间</span>
     animate({ deg, pow, delay } = {}){
         <span class="hljs-comment">// 后续补全</span>
     }
     
     <span class="hljs-comment">// 动画结束回调存储</span>
     onAnimationEnd(cb) {
         <span class="hljs-keyword">if</span> (typeof cb !== <span class="hljs-string">'function'</span>) <span class="hljs-keyword">return</span>;
         <span class="hljs-keyword">this</span>.animEndCBList.push(cb);
     }
     
     <span class="hljs-comment">// 动画结束回调执行</span>
     emitEndCB() {
         <span class="hljs-keyword">this</span>.dom.style.cssText += `;-webkit-transform:translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);opacity:<span class="hljs-number">1</span>;`;
         <span class="hljs-keyword">this</span>.animating = <span class="hljs-literal">false</span>;
         <span class="hljs-keyword">try</span> {
             <span class="hljs-keyword">for</span> (let cb  of <span class="hljs-keyword">this</span>.animEndCBList) {
                 cb();
             }
         } <span class="hljs-keyword">catch</span> (error) {
             console.warn(<span class="hljs-string">"回调报错:"</span>,cb);
         }
     }
     
     <span class="hljs-comment">// 简易实现slot功能，向粒子容器内添加元素</span>
     insertChild(child){
         <span class="hljs-keyword">this</span>.con.innerHTML = <span class="hljs-string">''</span>;
         <span class="hljs-keyword">this</span>.con.appendChild(child);
     }
 }
</code></pre>
</li></ol>
<p>致此，我们先创建了一个粒子对象的构造函数，现在考虑一下我们实现了我们的设计思路吗？</p>
<ul>
<li>使用构造函数new Partical( )粒子</li>
<li>粒子实力对象存在 animate 执行动画方法</li>
<li>有动画结束回调函数的存储和执行</li>
<li>设置粒子的父元素: renderIn 方法</li>
<li>父元素删除粒子: deleteEl 方法</li>
</ul>
<p>为了更好的展示粒子内容，我们特意在constructor里创建了一个 Boom-Partical_con 元素用于模拟slot功能:  insertChild方法，用于使用者展示不同的内容进行爆炸💥</p>
<p>接下来考虑一下动画的实现过程，动画毫无疑问为抛物线动画，这种动画在代码中实现可以使用物理公式，<br>但是我们也可以通过速度曲线实现，想想上抛过程可以想成 由于重力影响 ，变成一个速度逐渐减小的向上位移的过程，<br>而下抛过程可以理解为加速过程；<br>则可对应为速度曲线的easeOut 与 easeIn, <br>而水平方向可以理解为匀速运动，则是 linear；</p>
<p>我们以水平向右为X正方向0度，顺时针方向角度增加；<br>则 小于 180度为向下， 大于180度为向上<br>假设方向为<code>四点钟</code>方向，夹角则为 <code>30</code> 度，<br>按照高中物理，大小为N的力:<br><code> 在X轴的分量应为 cos(30) * N </code><br><code> 在Y轴的分量应为 sin(30) * N</code></p>
<p><span class="img-wrap"><img data-src="/img/bVbiJtz?w=600&amp;h=522" src="https://static.alili.tech/img/bVbiJtz?w=600&amp;h=522" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>也就是说 我们可以知道一个方向上的力在XY轴的分量大小，<br>假设我们将 力 的概念 转化为 视图中 位移的概念，<br>我们将 力量1 记为 10vh的大小<br>于是我们可以定义全局变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const POWER = 10; // 单位 vh 力的单位转化比例
const G = 5;      // 单位 vh 重力值
const DEG = Math.PI / 180;  
const Duration = .4e3; //假设动画执行时长400毫秒
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> POWER = <span class="hljs-number">10</span>; <span class="hljs-comment">// 单位 vh 力的单位转化比例</span>
<span class="hljs-keyword">const</span> G = <span class="hljs-number">5</span>;      <span class="hljs-comment">// 单位 vh 重力值</span>
<span class="hljs-keyword">const</span> DEG = Math.PI / <span class="hljs-number">180</span>;  
<span class="hljs-keyword">const</span> <span class="hljs-built_in">Duration</span> = <span class="hljs-number">.4e3</span>; <span class="hljs-comment">//假设动画执行时长400毫秒</span>
</code></pre>
<p>由此 我们补全 animate方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 执行动画 角度 ， 力 1 ~ 10 ; 1 = 10vh
animate({ deg, pow, delay } = {}) {
    this.direction = deg > 180 ? &quot;UP&quot; : &quot;DOWN&quot;;
    this.delay = delay || 0;
    let r = Math.random();
    this.targetZ = 0;
    this.targetY = Math.round(pow * Math.sin(deg * DEG) * POWER);
    this.targetX = Math.round(pow * Math.cos(deg * DEG) * POWER) * (r + 1);
    this.scaleNum = (r * 0.8) * (r < 0.5 ? -1 : 1);
    this.raf();
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 执行动画 角度 ， 力 1 ~ 10 ; 1 = 10vh</span>
animate({ deg, <span class="hljs-built_in">pow</span>, <span class="hljs-built_in">delay</span> } = {}) {
    <span class="hljs-keyword">this</span>.direction = deg &gt; <span class="hljs-number">180</span> ? <span class="hljs-string">"UP"</span> : <span class="hljs-string">"DOWN"</span>;
    <span class="hljs-keyword">this</span>.<span class="hljs-built_in">delay</span> = <span class="hljs-built_in">delay</span> || <span class="hljs-number">0</span>;
    let r = Math.<span class="hljs-built_in">random</span>();
    <span class="hljs-keyword">this</span>.targetZ = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.targetY = Math.round(<span class="hljs-built_in">pow</span> * Math.<span class="hljs-built_in">sin</span>(deg * DEG) * POWER);
    <span class="hljs-keyword">this</span>.targetX = Math.round(<span class="hljs-built_in">pow</span> * Math.<span class="hljs-built_in">cos</span>(deg * DEG) * POWER) * (r + <span class="hljs-number">1</span>);
    <span class="hljs-keyword">this</span>.scaleNum = (r * <span class="hljs-number">0.8</span>) * (r &lt; <span class="hljs-number">0.5</span> ? <span class="hljs-number">-1</span> : <span class="hljs-number">1</span>);
    <span class="hljs-keyword">this</span>.raf();
}

</code></pre>
<p>animte的思路为：通过传入的角度和力度 计算目标终点位置（因为力最终转化为位移值，力越大，目标位移越大）</p>
<p>使用随机数计算此次动画的缩放值变化范围（-0.8 ～ 0.8）</p>
<p>然后执行刷帧操作 raf</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="raf(){
    // 正在执行动画    
    this.animating = true;

    // 动画开始时间
    this.StartTime = +new Date();
    let StartTime = this.StartTime;
    
    // 获取延时
    let delay = this.delay;
    
    // 动画会在延时后开始，也就是真正开始动画的时间
    let StartTimeAfterDelay = StartTime + delay



    let animate = () => {
        // 获取从执行动画开始经过了多久
        let timeGap = +new Date() - StartTimeAfterDelay;
        // 大于0 证明过了delay时间
        if (timeGap >= 0) {
            // 大于Duration证明过了结束时间
            if (timeGap > Duration) {
                // 执行动画结束回调
                this.emitEndCB();
                return;
            }
            // 设置应该设置的位置的样式
            this.dom.style.cssText += `;will-change:transform;-webkit-transform:translate3d(${this.moveX(timeGap)}vh,${this.moveY(timeGap)}vh,0) scale(${this.scale(timeGap)});opacity:${this.opacity(timeGap)};`;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>raf(){
    <span class="hljs-comment">// 正在执行动画    </span>
    <span class="hljs-keyword">this</span>.animating = <span class="hljs-literal">true</span>;

    <span class="hljs-comment">// 动画开始时间</span>
    <span class="hljs-keyword">this</span>.StartTime = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    <span class="hljs-keyword">let</span> StartTime = <span class="hljs-keyword">this</span>.StartTime;
    
    <span class="hljs-comment">// 获取延时</span>
    <span class="hljs-keyword">let</span> delay = <span class="hljs-keyword">this</span>.delay;
    
    <span class="hljs-comment">// 动画会在延时后开始，也就是真正开始动画的时间</span>
    <span class="hljs-keyword">let</span> StartTimeAfterDelay = StartTime + delay



    <span class="hljs-keyword">let</span> animate = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 获取从执行动画开始经过了多久</span>
        <span class="hljs-keyword">let</span> timeGap = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() - StartTimeAfterDelay;
        <span class="hljs-comment">// 大于0 证明过了delay时间</span>
        <span class="hljs-keyword">if</span> (timeGap &gt;= <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// 大于Duration证明过了结束时间</span>
            <span class="hljs-keyword">if</span> (timeGap &gt; Duration) {
                <span class="hljs-comment">// 执行动画结束回调</span>
                <span class="hljs-keyword">this</span>.emitEndCB();
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-comment">// 设置应该设置的位置的样式</span>
            <span class="hljs-keyword">this</span>.dom.style.cssText += <span class="hljs-string">`;will-change:transform;-webkit-transform:translate3d(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.moveX(timeGap)}</span>vh,<span class="hljs-subst">${<span class="hljs-keyword">this</span>.moveY(timeGap)}</span>vh,0) scale(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.scale(timeGap)}</span>);opacity:<span class="hljs-subst">${<span class="hljs-keyword">this</span>.opacity(timeGap)}</span>;`</span>;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

</code></pre>
<p>刷帧操作中判断了delay时间的处理以及结束的时间处理回调</p>
<p>那么揭晓来就剩下 moveX，moveY，scale，opacity的设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 水平方向为匀速，所以使用Linear
moveX(currentDuration) {
    // 此处 * 2 是效果矫正后的处理，可根据自己的需求修改水平位移速度
    return Linear(currentDuration, 0, this.targetX, Duration) * 2;
}

// 缩放 使用了easeOut曲线， 可根据需求自行修改
scale(currentDuration) {
    return Quad.easeOut(currentDuration, 1, this.scaleNum, Duration);
}

// 透明度 使用了easeIn速度曲线，保证后消失
opacity(currentDuration) {
    return Quad.easeIn(currentDuration, 1, -1, Duration);
}

// 竖直方向上位移计算
moveY(currentDuration) {
    let direction = this.direction;
    if (direction === 'UP') {
        // G用于模拟上抛过程的重力
        // 如果是上抛运动
        if (currentDuration < Duration / 2) {
            // 上抛过程 我们使用easeOut速度逐渐减小，我们让动画在一半时移到最高点
            return Quad.easeOut(currentDuration, 0, this.targetY + G, Duration / 2);
        }
        // 上抛的下降过程，从最高点下降
        return this.targetY + G - Quad.easeIn(currentDuration - Duration / 2, 0, this.targetY / 2, Duration / 2);
    }
    // 下抛运动直接easeIn
    return Quad.easeIn(currentDuration, 0, this.targetY, Duration);
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 水平方向为匀速，所以使用Linear</span>
moveX(currentDuration) {
    <span class="hljs-comment">// 此处 * 2 是效果矫正后的处理，可根据自己的需求修改水平位移速度</span>
    <span class="hljs-keyword">return</span> Linear(currentDuration, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.targetX, Duration) * <span class="hljs-number">2</span>;
}

<span class="hljs-comment">// 缩放 使用了easeOut曲线， 可根据需求自行修改</span>
scale(currentDuration) {
    <span class="hljs-keyword">return</span> Quad.easeOut(currentDuration, <span class="hljs-number">1</span>, <span class="hljs-keyword">this</span>.scaleNum, Duration);
}

<span class="hljs-comment">// 透明度 使用了easeIn速度曲线，保证后消失</span>
opacity(currentDuration) {
    <span class="hljs-keyword">return</span> Quad.easeIn(currentDuration, <span class="hljs-number">1</span>, <span class="hljs-number">-1</span>, Duration);
}

<span class="hljs-comment">// 竖直方向上位移计算</span>
moveY(currentDuration) {
    let direction = <span class="hljs-keyword">this</span>.direction;
    <span class="hljs-keyword">if</span> (direction === <span class="hljs-string">'UP'</span>) {
        <span class="hljs-comment">// G用于模拟上抛过程的重力</span>
        <span class="hljs-comment">// 如果是上抛运动</span>
        <span class="hljs-keyword">if</span> (currentDuration &lt; Duration / <span class="hljs-number">2</span>) {
            <span class="hljs-comment">// 上抛过程 我们使用easeOut速度逐渐减小，我们让动画在一半时移到最高点</span>
            <span class="hljs-keyword">return</span> Quad.easeOut(currentDuration, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.targetY + G, Duration / <span class="hljs-number">2</span>);
        }
        <span class="hljs-comment">// 上抛的下降过程，从最高点下降</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.targetY + G - Quad.easeIn(currentDuration - Duration / <span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.targetY / <span class="hljs-number">2</span>, Duration / <span class="hljs-number">2</span>);
    }
    <span class="hljs-comment">// 下抛运动直接easeIn</span>
    <span class="hljs-keyword">return</span> Quad.easeIn(currentDuration, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.targetY, Duration);
}

</code></pre>
<p>至此，partical.js 结束，文件末尾加一行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default Partical; 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Partical; 

</code></pre>
<p>此时 我们的partical.js输出一个构造函数:</p>
<ul>
<li>new 的时候创建了粒子元素，</li>
<li>使用onAnimtionEnd可以实现动画结束的回调函数</li>
<li>insertChild可以向粒子内渲染使用者自定义的dom</li>
<li>renderIn 可以设置粒子父元素</li>
<li>deleteEl 可以从父元素删除粒子</li>
<li>animate 可以执行刷帧，渲染计算位置，触发回调</li>
</ul>
<p>于是对于粒子来说，只剩下在执行animte的时候 传入的力的大小，方向，以及延迟时间</p>
<h2 id="articleHeader7">粒子管理 Boom.js</h2>
<p><code>之所以叫Boom是因为一开始组件名叫Boom，其实叫ParticalController更好一些，哈哈😄</code></p>
<p>对于Boom.js的功能需求为</p>
<ul>
<li>创建粒子</li>
<li>执行粒子动画，赋予动画力、角度、延时</li>
<li>设置粒子容器</li>
</ul>
<p>可达到效果：</p>
<ul>
<li>不关心业务，业务使用者传入每个粒子slot内容数组</li>
<li>粒子组件可复用</li>
<li>易于维护（可能是哈哈哈）</li>
</ul>
<h5>于是粒子管理器构架为：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Partical from &quot;partical.js&quot;;

class Boom{
    // 实例化的粒子列表
    particalList = [];
    // 单次生成的粒子个数
    particalNumbers = 6;
    // 执行动画的间隔时间
    boomTimeGap = .1e3;
    boomTimer = 0;
    // 用户插入粒子的slot 的内容
    childList = [];
    // 默认旋转角度
    rotate = 120;
    // 默认的粒子发散范围
    spread = 180;
    // 默认随机延迟范围
    delayRange = 100;
    // 默认力度
    power = 3;
    // 此次执行粒子爆炸的是那个容器
    con = null;
    
    constructor({ childList , container , boomNumber , rotate , spread , delayRange , power} = {}){
        
        this.childList = childList || [];
        this.con = container || null;
        this.particalNumbers = boomNumber || 6;
        this.rotate = rotate || 120;
        this.spread = spread || 180;
        this.delayRange = delayRange || 100;
        this.power = power || 3;
        this.createParticals(this.particalNumbers);
    }
    setContainer(con){
        this.con = con;
    }
    // 创建粒子 存入内存数组中
    createParticals(num){
        for(let i = 0 ; i < num ; i++){
            let partical = new Partical();
            partical.onAnimationEnd(()=>{
                partical.deleteEl();
            });
            this.particalList.push(partical)
        }
    }
    // 执行动画
    boom(){
        // 限制动画执行间隔
        let lastBoomTimer = this.boomTimer;
        let now = +new Date();
        if(now - lastBoomTimer < this.boomTimeGap){
            // console.warn(&quot;点的太快了&quot;);
            return;
        }
        this.boomTimer = now;
        
        
        console.warn(&quot;粒子总数:&quot; , this.particalList.length)
        let boomNums = 0;
        // 在内存列表找，查找没有执行动画的粒子
        let unAnimateList = this.particalList.filter(partical => partical.animating == false);

        let childList = this.childList;
        let childListLength = childList.length;

        let rotate = this.rotate;
        let spread = this.spread;
        let delayRange = this.delayRange;
        let power = this.power;
        
        // 每有一个未执行动画的粒子，执行一次动画
        for(let partical of unAnimateList){
            if(boomNums >= this.particalNumbers) return ;
            
            boomNums++;
            let r = Math.random();
            // 设置粒子父容器
            partical.renderIn(this.con);
            // 随机选择粒子的slot内容
            partical.insertChild(childList[Math.floor(r * childListLength)].cloneNode(true));
            // 执行动画，在输入范围内随机角度、力度、延迟
            partical.animate({
                deg: (r * spread + rotate) % 360,
                pow: r * power + 1,
                delay: r * delayRange,
            });
        }
        // 如果粒子树木不够，则再次创建，防止下次不够用
        if(boomNums < this.particalNumbers){
            this.createParticals(this.particalNumbers - boomNums);
        }
    }
}


export default Boom;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Partical <span class="hljs-keyword">from</span> <span class="hljs-string">"partical.js"</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Boom</span></span>{
    <span class="hljs-comment">// 实例化的粒子列表</span>
    particalList = [];
    <span class="hljs-comment">// 单次生成的粒子个数</span>
    particalNumbers = <span class="hljs-number">6</span>;
    <span class="hljs-comment">// 执行动画的间隔时间</span>
    boomTimeGap = <span class="hljs-number">.1e3</span>;
    boomTimer = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 用户插入粒子的slot 的内容</span>
    childList = [];
    <span class="hljs-comment">// 默认旋转角度</span>
    rotate = <span class="hljs-number">120</span>;
    <span class="hljs-comment">// 默认的粒子发散范围</span>
    spread = <span class="hljs-number">180</span>;
    <span class="hljs-comment">// 默认随机延迟范围</span>
    delayRange = <span class="hljs-number">100</span>;
    <span class="hljs-comment">// 默认力度</span>
    power = <span class="hljs-number">3</span>;
    <span class="hljs-comment">// 此次执行粒子爆炸的是那个容器</span>
    con = <span class="hljs-literal">null</span>;
    
    <span class="hljs-keyword">constructor</span>({ childList , container , boomNumber , rotate , spread , delayRange , power} = {}){
        
        <span class="hljs-keyword">this</span>.childList = childList || [];
        <span class="hljs-keyword">this</span>.con = container || <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.particalNumbers = boomNumber || <span class="hljs-number">6</span>;
        <span class="hljs-keyword">this</span>.rotate = rotate || <span class="hljs-number">120</span>;
        <span class="hljs-keyword">this</span>.spread = spread || <span class="hljs-number">180</span>;
        <span class="hljs-keyword">this</span>.delayRange = delayRange || <span class="hljs-number">100</span>;
        <span class="hljs-keyword">this</span>.power = power || <span class="hljs-number">3</span>;
        <span class="hljs-keyword">this</span>.createParticals(<span class="hljs-keyword">this</span>.particalNumbers);
    }
    setContainer(con){
        <span class="hljs-keyword">this</span>.con = con;
    }
    <span class="hljs-comment">// 创建粒子 存入内存数组中</span>
    createParticals(num){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span> ; i &lt; num ; i++){
            <span class="hljs-keyword">let</span> partical = <span class="hljs-keyword">new</span> Partical();
            partical.onAnimationEnd(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                partical.deleteEl();
            });
            <span class="hljs-keyword">this</span>.particalList.push(partical)
        }
    }
    <span class="hljs-comment">// 执行动画</span>
    boom(){
        <span class="hljs-comment">// 限制动画执行间隔</span>
        <span class="hljs-keyword">let</span> lastBoomTimer = <span class="hljs-keyword">this</span>.boomTimer;
        <span class="hljs-keyword">let</span> now = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">if</span>(now - lastBoomTimer &lt; <span class="hljs-keyword">this</span>.boomTimeGap){
            <span class="hljs-comment">// console.warn("点的太快了");</span>
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.boomTimer = now;
        
        
        <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">"粒子总数:"</span> , <span class="hljs-keyword">this</span>.particalList.length)
        <span class="hljs-keyword">let</span> boomNums = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// 在内存列表找，查找没有执行动画的粒子</span>
        <span class="hljs-keyword">let</span> unAnimateList = <span class="hljs-keyword">this</span>.particalList.filter(<span class="hljs-function"><span class="hljs-params">partical</span> =&gt;</span> partical.animating == <span class="hljs-literal">false</span>);

        <span class="hljs-keyword">let</span> childList = <span class="hljs-keyword">this</span>.childList;
        <span class="hljs-keyword">let</span> childListLength = childList.length;

        <span class="hljs-keyword">let</span> rotate = <span class="hljs-keyword">this</span>.rotate;
        <span class="hljs-keyword">let</span> spread = <span class="hljs-keyword">this</span>.spread;
        <span class="hljs-keyword">let</span> delayRange = <span class="hljs-keyword">this</span>.delayRange;
        <span class="hljs-keyword">let</span> power = <span class="hljs-keyword">this</span>.power;
        
        <span class="hljs-comment">// 每有一个未执行动画的粒子，执行一次动画</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> partical <span class="hljs-keyword">of</span> unAnimateList){
            <span class="hljs-keyword">if</span>(boomNums &gt;= <span class="hljs-keyword">this</span>.particalNumbers) <span class="hljs-keyword">return</span> ;
            
            boomNums++;
            <span class="hljs-keyword">let</span> r = <span class="hljs-built_in">Math</span>.random();
            <span class="hljs-comment">// 设置粒子父容器</span>
            partical.renderIn(<span class="hljs-keyword">this</span>.con);
            <span class="hljs-comment">// 随机选择粒子的slot内容</span>
            partical.insertChild(childList[<span class="hljs-built_in">Math</span>.floor(r * childListLength)].cloneNode(<span class="hljs-literal">true</span>));
            <span class="hljs-comment">// 执行动画，在输入范围内随机角度、力度、延迟</span>
            partical.animate({
                <span class="hljs-attr">deg</span>: (r * spread + rotate) % <span class="hljs-number">360</span>,
                <span class="hljs-attr">pow</span>: r * power + <span class="hljs-number">1</span>,
                <span class="hljs-attr">delay</span>: r * delayRange,
            });
        }
        <span class="hljs-comment">// 如果粒子树木不够，则再次创建，防止下次不够用</span>
        <span class="hljs-keyword">if</span>(boomNums &lt; <span class="hljs-keyword">this</span>.particalNumbers){
            <span class="hljs-keyword">this</span>.createParticals(<span class="hljs-keyword">this</span>.particalNumbers - boomNums);
        }
    }
}


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Boom;

</code></pre>
<h5>使用demo</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let boomChildList = [];


for(let i = 0 ; i < 10; i++){
    let tempDom = document.createElement(&quot;div&quot;);
    tempDom.className = &quot;demoDom&quot;;
    tempDom.innerHTML = i;
    boomChildList.push(tempDom);
}

let boom = new Boom({
    childList: boomChildList,
    boomNumber: 6,
    rotate: 0,
    spread: 360,
    delayRange: 100,
    power: 3,
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>
let <span class="hljs-keyword">boomChildList </span>= []<span class="hljs-comment">;</span>


for(let i = <span class="hljs-number">0</span> <span class="hljs-comment">; i &lt; 10; i++){</span>
    let tempDom = document.createElement(<span class="hljs-string">"div"</span>)<span class="hljs-comment">;</span>
    tempDom.className = <span class="hljs-string">"demoDom"</span><span class="hljs-comment">;</span>
    tempDom.innerHTML = i<span class="hljs-comment">;</span>
    <span class="hljs-keyword">boomChildList.push(tempDom);
</span>}

let <span class="hljs-keyword">boom </span>= new <span class="hljs-keyword">Boom({
</span><span class="hljs-symbol">    childList:</span> <span class="hljs-keyword">boomChildList,
</span><span class="hljs-symbol">    boomNumber:</span> <span class="hljs-number">6</span>,
<span class="hljs-symbol">    rotate:</span> <span class="hljs-number">0</span>,
<span class="hljs-symbol">    spread:</span> <span class="hljs-number">360</span>,
<span class="hljs-symbol">    delayRange:</span> <span class="hljs-number">100</span>,
<span class="hljs-symbol">    power:</span> <span class="hljs-number">3</span>,
})<span class="hljs-comment">;</span>

</code></pre>
<h2 id="articleHeader8">代码资源</h2>
<p><a href="https://pan.baidu.com/s/1qBMZ12GuL71Ah_4dM7TBcQ" rel="nofollow noreferrer" target="_blank">源码网盘链接</a></p>
<h2 id="articleHeader9">组件效果预览</h2>
<p><span class="img-wrap"><img data-src="/img/bVbiJGO?w=352&amp;h=640" src="https://static.alili.tech/img/bVbiJGO?w=352&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">结尾</h2>
<p>，可能效果中实现的思维还有不妥和欠缺，欢迎各位大大提出宝贵意见，互相交流、学习！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生JS实现DOM粒子爆炸效果

## 原文链接
[https://segmentfault.com/a/1190000016818603](https://segmentfault.com/a/1190000016818603)

