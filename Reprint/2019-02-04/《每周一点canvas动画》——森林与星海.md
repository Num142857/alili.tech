---
title: '《每周一点canvas动画》——森林与星海' 
date: 2019-02-04 2:30:58
hidden: true
slug: 1vgz64ydx0f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://github.com/supperjet/H5-Animation" rel="nofollow noreferrer" target="_blank">每周一点canvas动画代码文件</a></blockquote>
<p>在上一节<a href="https://segmentfault.com/a/1190000006730999">《每周一点canvas动画》——3D物理效果</a>中，我们介绍了3维环境下的速度与加速度效果。这一节，我们继续介绍另外两个物理效果：<strong>重力和屏幕环绕</strong>。</p>
<h3 id="articleHeader0">一、重力</h3>
<p>三维系统中实现重力效果的方式与二维的情况一样，设定一个重力值，比如<code>g=0.2</code>。然后，在动画循环中将它作用于物体竖直方向的速度上。虽然原理上没有什么大的变化，但是多了一个维度实现出来的效果确实相当具有视觉冲击力的。ok，一图胜千言，与其在这听我嘚吧嘚吧嘚，还不如直接上个效果图。</p>
<p><span class="img-wrap"><img data-src="/img/bVCJnE?w=394&amp;h=346" src="https://static.alili.tech/img/bVCJnE?w=394&amp;h=346" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在动画中，我们为小球的下落设置了一个边界——相当于地面，并与反弹的效果结合在一起，当小球触碰到地面发生反弹。与二维系统中的效果如出一辙。下面是核心代码，具体代码请看<code>gravity.html</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    。。。
    function move(ball){
        ball.vy += gravity;   //重力加速度
        
        ball.xpos += ball.vx;
        ball.ypos += ball.vy;
        ball.zpos += ball.vz;
               
         if (ball.ypos > floor) {  //触地反弹
               ball.ypos = floor;
               ball.vy *= bounce;
             }
         if(ball.zpos > -fl){   //3维场景设置
            var scale = fl/(fl + ball.zpos);
            ball.scaleX = ball.scaleY = scale;
            ball.x = vpX + ball.xpos * scale;
            ball.y = vpY + ball.ypos * scale;
            ball.visible = true;
         }else{
             ball.visible = false;
         }
 }
 。。。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">    。。。
    <span class="hljs-keyword">function</span> move(ball){
        ball.vy += gravity;   //重力加速度
        
        ball.xpos += ball.vx;
        ball.ypos += ball.vy;
        ball.zpos += ball.vz;
               
         <span class="hljs-keyword">if</span> (ball.ypos &gt; floor) {  //触地反弹
               ball.ypos = floor;
               ball.vy *= bounce;
             }
         <span class="hljs-keyword">if</span>(ball.zpos &gt; -fl){   //3维场景设置
            var scale = fl/(fl + ball.zpos);
            ball.scaleX = ball.scaleY = scale;
            ball.x = vpX + ball.xpos * scale;
            ball.y = vpY + ball.ypos * scale;
            ball.visible = <span class="hljs-literal">true</span>;
         }<span class="hljs-keyword">else</span>{
             ball.visible = <span class="hljs-literal">false</span>;
         }
 }
 。。。</code></pre>
<h3 id="articleHeader1">二、屏幕环绕</h3>
<p>屏幕环绕是我们今天的重头戏，与二维环境中的概念一样。所谓屏幕环绕就是从屏幕的这端消失，相应的从屏幕的另一边出来。对应到三维的环境中，我们就多了一个纬度的选择。下面我们介绍第一个效果——<strong>森林</strong></p>
<h4>1. hello！树先生</h4>
<p>绘制森林前我们要做的第一个准备工作是绘制森林的基本组成单元——tree。在这里我提供了3个树的类文件。</p>
<ol>
<li>tree.js           ——简单树</li>
<li>binaryTree.js     ——二叉树</li>
<li>natureTree.js     ——自然树</li>
</ol>
<p>与球类文件的引入和使用方式一样,下面我们展示一下三种文件的绘制效果。</p>
<h5>1.简单树</h5>
<p><span class="img-wrap"><img data-src="/img/bVCJox?w=499&amp;h=181" src="https://static.alili.tech/img/bVCJox?w=499&amp;h=181" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>简单树的绘制效果如图所示，如果你想要让它的枝条更多，再多加两条树枝就可以了。类文件<code>tree.js</code>,没有什么特别的，只是用到简单的<code>lineTo</code>,<code>moveTo</code> 等API。</p>
<h5>2.二叉树</h5>
<p>二叉树的类文件名为<code>binaryTree.js</code>。与简单树的原理不一样，二叉树的原理是采用递归的方法实现树枝与树干的绘制。绘制效果如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVCJnK?w=500&amp;h=202" src="https://static.alili.tech/img/bVCJnK?w=500&amp;h=202" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* gen: 树枝的节点代数，默认是6个节点*/
/* angle: 每次在节点树枝的旋转角度*/
/* branchLength: 树枝的长度*/

function Tree(color, angle, genNum, branchLength){
    this.x = 0;
    this.y = 0;
    this.xpos = 0;
    this.ypos = 0;
    this.zpos = 0
    this.scaleX = 0.85;
    this.scaleY = 0.85;
    this.gen = 0;
    this.alpha = 1;
    this.color = utils.parseColor(color);
    this.angle = (angle === undefined) ? 0.3 : angle;
    this.genNum = (genNum === undefined) ? 6 : genNum;
    this.branchLength = (branchLength === undefined) ? 40 : branchLength;
    
}

Tree.prototype.draw = function(ctx){
    ctx.save()
    ctx.translate(this.x, this.y);
    this.branch(ctx, 0);           //初始角度为0， 绘制树干
    ctx.restore();
}

Tree.prototype.branch= function(ctx, initAngle){
    this.gen++;
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.rotate(initAngle);
    ctx.scale(this.scaleX, this.scaleY);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.translate(0, -this.branchLength);
    ctx.lineTo(0, 0);
    ctx.stroke();

    if(this.gen <= this.genNum){       //判断当前的节点代数是否大于设置的节点数
        this.branch(ctx, this.angle);   //画右边树枝
        this.branch(ctx, -this.angle);  //画左侧树枝
    }
    ctx.restore();

    this.gen--;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">/* gen: 树枝的节点代数，默认是6个节点*/
/* angle: 每次在节点树枝的旋转角度*/
/* branchLength: 树枝的长度*/

<span class="hljs-keyword">function</span> Tree(color, angle, genNum, branchLength){
    this.x = 0;
    this.y = 0;
    this.xpos = 0;
    this.ypos = 0;
    this.zpos = 0
    this.scaleX = 0.85;
    this.scaleY = 0.85;
    this.gen = 0;
    this.alpha = 1;
    this.color = utils.parseColor(color);
    this.angle = (angle === undefined) ? 0.3 : angle;
    this.genNum = (genNum === undefined) ? 6 : genNum;
    this.branchLength = (branchLength === undefined) ? 40 : branchLength;
    
}

Tree.prototype.draw = <span class="hljs-keyword">function</span>(ctx){
    ctx.save()
    ctx.translate(this.x, this.y);
    this.branch(ctx, 0);           //初始角度为0， 绘制树干
    ctx.restore();
}

Tree.prototype.branch= <span class="hljs-keyword">function</span>(ctx, initAngle){
    this.gen++;
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.rotate(initAngle);
    ctx.scale(this.scaleX, this.scaleY);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.translate(0, -this.branchLength);
    ctx.lineTo(0, 0);
    ctx.stroke();

    <span class="hljs-keyword">if</span>(this.gen &lt;= this.genNum){       //判断当前的节点代数是否大于设置的节点数
        this.branch(ctx, this.angle);   //画右边树枝
        this.branch(ctx, -this.angle);  //画左侧树枝
    }
    ctx.restore();

    this.gen--;
}</code></pre>
<p>二叉树的造型已经与我们现实中的树木结构有相似之处了。下一步我们就通过这种绘制二叉树的方法来实现自然树。</p>
<h5>3.自然树</h5>
<p>自然树的原理与二叉树的原理完全一样，不同之处在于对树枝的分叉设置了更多的随机性。也就是说，不会像我们上面看到的一样，树枝的分叉那么有对称性。并且，在树枝的末端绘制树叶。ok,下面展示一下用canvas绘制的艺术品。</p>
<p><span class="img-wrap"><img data-src="/img/bVCJnU?w=1038&amp;h=471" src="https://static.alili.tech/img/bVCJnU?w=1038&amp;h=471" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>怎么样，帅气吧！是不是跟真的树一模一样。代码有点长，我在这就不列出来了，具体代码请查看<code>binaryTree.js</code>。如果你想体验不同的绘制效果请查看<code>natureTree.html</code>。在这个文件中，你可以对一些主要的参数进行控制来实现不同的绘制效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVCJnX?w=800&amp;h=502" src="https://static.alili.tech/img/bVCJnX?w=800&amp;h=502" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>2.无限森林</h4>
<p>无限森林的效果，就是使用屏幕环绕的原理。<strong>当物体的<code>z</code>轴坐标超过设定的位置就回到初始位置</strong>。下面我们看看效果图。为了让动画的效果更流畅，我们采用第一种简单树来做，请各位看官原谅我的渣电脑实在是太老旧了。</p>
<p><span class="img-wrap"><img data-src="/img/bVMhvv?w=986&amp;h=380" src="https://static.alili.tech/img/bVMhvv?w=986&amp;h=380" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如果你的电脑配置不错，可以换成其他两种树试试。效果一定更好哦！核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
function move (tree) {
        tree.xpos += vx;
        tree.ypos += vy;
        tree.zpos += vz;
          
        if(tree.ypos < floor){  //让树的Y轴坐标落在设置好的地面上
            tree.ypos = floor;
        }
        
        if (tree.zpos < -fl) {  //如果z坐标超出了屏幕回到一个老远的位置
          tree.zpos += 10000;
        }
        if (tree.zpos > 10000 - fl) {  //如果z轴的坐标超过了我们设置的距离，
                                         让它回到一个近的位置
          tree.zpos -= 10000;
        }
                                        //3维环境设置
        var scale = fl / (fl + tree.zpos);
        tree.scaleX = tree.scaleY = scale;
        tree.x = vpX + tree.xpos * scale;
        tree.y = vpY + tree.ypos * scale;
        tree.alpha = scale;
      }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">...
<span class="hljs-keyword">function</span> move (tree) {
        tree.xpos += vx;
        tree.ypos += vy;
        tree.zpos += vz;
          
        <span class="hljs-keyword">if</span>(tree.ypos &lt; floor){  //让树的Y轴坐标落在设置好的地面上
            tree.ypos = floor;
        }
        
        <span class="hljs-keyword">if</span> (tree.zpos &lt; -fl) {  //如果z坐标超出了屏幕回到一个老远的位置
          tree.zpos += 10000;
        }
        <span class="hljs-keyword">if</span> (tree.zpos &gt; 10000 - fl) {  //如果z轴的坐标超过了我们设置的距离，
                                         让它回到一个近的位置
          tree.zpos -= 10000;
        }
                                        //3维环境设置
        var scale = fl / (fl + tree.zpos);
        tree.scaleX = tree.scaleY = scale;
        tree.x = vpX + tree.xpos * scale;
        tree.y = vpY + tree.ypos * scale;
        tree.alpha = scale;
      }
...</code></pre>
<p>森林的运动通过键盘的方向键来控制。具体代码请查看<code>tree-2.html</code>。</p>
<h4>3.星海</h4>
<p>星海使用的还是我们的球类文件，不同之处在于球体的着色上使用的是<code>canvas</code>的放射渐变来形成光晕效果。具体代码请看<code>ball3d-s.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
var gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.radius );
    gradient.addColorStop(0,&quot;rgba(255,255,255,1)&quot;);
    gradient.addColorStop(0.2,&quot;rgba(0,255,255,1)&quot;);
    gradient.addColorStop(0.3,&quot;rgba(0,0,100,1)&quot;);
    gradient.addColorStop(1,&quot;rgba(0,0,0,0.1)&quot;);
    context.fillStyle = gradient;
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">...
var gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.radius );
    gradient.addColorStop(0,<span class="hljs-string">"rgba(255,255,255,1)"</span>);
    gradient.addColorStop(0.2,<span class="hljs-string">"rgba(0,255,255,1)"</span>);
    gradient.addColorStop(0.3,<span class="hljs-string">"rgba(0,0,100,1)"</span>);
    gradient.addColorStop(1,<span class="hljs-string">"rgba(0,0,0,0.1)"</span>);
    context.fillStyle = gradient;
...</code></pre>
<p>效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVBUHJ?w=740&amp;h=440" src="https://static.alili.tech/img/bVBUHJ?w=740&amp;h=440" alt="4045028187-57b3de16c9415" title="4045028187-57b3de16c9415" style="cursor: pointer;"></span></p>
<p>默认情况下，小球是有一个竖直向上的速度，通过方向键来控制作用于球体上的加速度，以此来达到物体运动的效果。代码基本上没有变化，在这我就不列举了。详细代码请查看<code>star.html</code></p>
<p>本节的内容到这就结束了，下一节，我们介绍3维环境下的旋转与碰撞。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》——森林与星海

## 原文链接
[https://segmentfault.com/a/1190000006808616](https://segmentfault.com/a/1190000006808616)

