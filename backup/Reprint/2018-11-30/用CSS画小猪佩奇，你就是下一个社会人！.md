---
title: '用CSS画小猪佩奇，你就是下一个社会人！' 
date: 2018-11-30 2:30:11
hidden: true
slug: li28evmt2t9
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>欢迎大家前往<a href="https://cloud.tencent.com/developer/?fromSource=waitui" rel="nofollow noreferrer" target="_blank">腾讯云+社区</a>，获取更多腾讯海量技术实践干货哦~</strong></p>
<blockquote>作者：江志耿 | 腾讯TEG网络工程师</blockquote>
<p>我是佩奇，哼，这是我的弟弟乔治，呱呱，这是我的妈妈，嚯，这是我的爸爸，嚯~</p>
<h1 id="articleHeader0">背景</h1>
<p>小猪佩奇已经火了好一阵了，其实一开始我是不屑的。纵观小朋友的历届动画，无论喜洋洋、熊出没还是小兔兵兵、小熊维尼，火过一阵便迅速陨落，回想起来也没多少沉淀的东西。所以一开始让我看小猪佩奇的时候我是拒绝的，因为你不能让我看，我就马上去看，第一我要试一下。深入了解之后发现，卧槽，世间竟有如此出尘绝艳的动画片！正如某个浙江人说过：你不喜欢小猪佩奇那是因为你不了解。</p>
<p>魔性的猪叫声，任性的踩泥坑。这不是一只简单的猪，从此路转粉。我在淘宝买了小猪佩奇贴纸贴上了社会人纹身、电脑桌面壁纸换上了佩奇全家福、买了小猪佩奇公仔。但真正给我工作上带来积极作用的是我偶然发掘出来的小猪佩奇调试法。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIOd?w=969&amp;h=613" src="https://static.alili.tech/img/bVbaIOd?w=969&amp;h=613" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>小猪佩奇调试法</strong>：在程序的调试、除错或测试过程中，操作人耐心地向小猪佩奇解释每一行程序的作用，以此来激发灵感与发现矛盾。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPa?w=533&amp;h=528" src="https://static.alili.tech/img/bVbaIPa?w=533&amp;h=528" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>“喜欢一个事情，而这个事情又正好能与工作结合，这是非常幸运的事情。小猪佩奇调试法给我带来了工作效率的提升，也带来了全天的好心情。” —— Cristiano Bottlejiang</p>
<p>很多人号称自己是社会人是佩奇粉，其实大部分都是路人粉。路人粉就是说路过认识成为了粉丝，就比如我回家看到小孩子在看小猪佩奇而知道了这个事。这里我举三个问题大概可以用来判断是路人粉还是真爱粉。</p>
<p><strong>1.先来个简单的，请说出小猪佩奇动画中的7个角色。</strong><br>这个问题考察的是人物的基本认识，大部分人都能说出小猪佩奇、弟弟乔治、猪爸爸、猪妈妈、猪爷爷、猪奶奶这六个，所以说出第7个才算过关，比如小马佩德罗，小羊苏西，小象艾米丽，小狗丹尼，小猫坎迪，小兔瑞贝卡。</p>
<p><strong>2.来个选择题，以下哪一句是小猪佩奇的开场动画台词：</strong><br>A. 你好我是小猪佩奇，哼，这是我的弟弟乔治，呱呱，这是我的妈妈，嚯，这是我的爸爸，嚯~<br>B. 我是佩奇，哼，这是我的弟弟乔治，呱呱，这是我的妈妈，嚯，这是我的爸爸，嚯~<br>C. 你好我是小猪佩奇，哼，这是我的弟弟乔治，呱呱，这是我的妈妈，哼，这是我的爸爸，嚯~<br>D. 我是佩奇，哼，这是我的弟弟乔治，呱呱，这是我的妈妈，哼，这是我的爸爸，嚯~<br>真爱粉是连开头动画都不会跳过而认真看的，答案是B。</p>
<p><strong>3.来个难的，请说出某一集的完整剧情。</strong><br>其实这道题对于真正看了小猪佩奇的人来说是送分题，就看是不是真的看了。</p>
<p>我必须承认，其实就上面三个问题来答，我只能算路人粉了！</p>
<h1 id="articleHeader1">预研</h1>
<p>找了腾讯视频上面<strong>小猪佩奇第四季纸飞机一集11秒处</strong>的画面作为绘画模板。出于习惯，我做了一个x轴的水平翻转。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPg?w=353&amp;h=440" src="https://static.alili.tech/img/bVbaIPg?w=353&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>观察这个图像可以发现，小猪佩奇在构图基本是各种曲线，类抛物线、类圆、类椭圆、类二次贝塞尔曲线。这里说的都是“类”，这也正是小猪佩奇的构图精髓，一种手绘风格，而不是标准刻板的线条。在前端技术选型上，画图首先想到的是svg、canvas，但它们本身就擅长画图，而且网上都有在线编辑svg的工具，这就没意思了，我想佩奇也不会答应的。于是我想用纯粹的css来做，这样更有挑战，因为画图画曲线不是css擅长的事情。</p>
<h2 id="articleHeader2">难点</h2>
<p>CSS是没法直接画曲线的，曲线救国的办法就是 border-radius。后面整个绘画都是围绕这个属性展开。</p>
<p>border-radius 的使用通常直接定一个具体像素去控制圆角的大小，比如<strong>border-radius:5px;</strong>此外可以单独指定水平和垂直半径，通过“/”分隔，接受长度值或百分比。border-radius:5px; 即<strong>border-radius: 5px 5px 5px 5px/ 5px 5px 5px 5px</strong>。依次是左上水平半径，右上，右下，左下，/，左上垂直半径，右上，右下，左下。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPj?w=867&amp;h=218" src="https://static.alili.tech/img/bVbaIPj?w=867&amp;h=218" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPm?w=803&amp;h=321" src="https://static.alili.tech/img/bVbaIPm?w=803&amp;h=321" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">画</h1>
<h2 id="articleHeader4">猪头</h2>
<p>了解了 border-radius 的用法之后就可以开始实战了。通过对线条的分段，猪头如下图拼凑而成，同时要注意图层的层级，以及用白色背景和粉色背景来交叉覆盖填补画面。难的在于头部大轮廓的 border-radius 参数设置。大体绘画步骤如下：</p>
<ol>
<li>画椭圆；</li>
<li>调 border-radius 参数；</li>
<li>上色；</li>
<li>调角度；</li>
<li>图层遮盖补充。</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVbaIPx?w=978&amp;h=515" src="https://static.alili.tech/img/bVbaIPx?w=978&amp;h=515" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>猪头轮廓样式代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    position: absolute;
    z-index: 100;
    box-sizing: border-box;
    width: 300px;
    height: 200px;
    top: 100px;
    left: 100px;
    border-radius: 92% 50% 50% 50%/ 87% 80% 68% 50%;
    border: 6px solid #ef96c2;
    background-color: #ffb3da;
    transform: rotate(30deg);
    transform-origin: left top;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">100</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">92%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>/ <span class="hljs-number">87%</span> <span class="hljs-number">80%</span> <span class="hljs-number">68%</span> <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">6px</span> solid <span class="hljs-number">#ef96c2</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ffb3da</span>;
    <span class="hljs-attribute">transform</span>: rotate(<span class="hljs-number">30deg</span>);
    <span class="hljs-attribute">transform-origin</span>: left top;</code></pre>
<h2 id="articleHeader5">嘴巴</h2>
<p>三个半椭圆依次叠加即可~同样是图层遮盖来实现。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPM?w=579&amp;h=235" src="https://static.alili.tech/img/bVbaIPM?w=579&amp;h=235" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">五肢</h2>
<p>其实画到这里基本上对 border-radius 的使用很熟练了，参数的设置也大概心中有数，剩下的也就工作量的问题了。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPO?w=397&amp;h=213" src="https://static.alili.tech/img/bVbaIPO?w=397&amp;h=213" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">合体</h2>
<p>其余的部分画法大同小异，五官的摆放要特别注意比例和尺寸，比如身体就很容易因为大小不合适而成了胖佩奇/瘦佩奇，这里可以借助 photoshop 的标尺。同时用取色器拿到佩奇各部分颜色。接下来就是整体的调试了，对我这种绘画处于小鸡啄米水平的人来说，这个才是最难的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;pig_container&quot;>
    <!-- 尾巴 -->
    <div class=&quot;tail_left&quot;></div>
    <div class=&quot;tail_right&quot;></div>
    <div class=&quot;tail_blank&quot;></div>
    <div class=&quot;tail_middle&quot;></div>
    <div class=&quot;tail_circle&quot;></div>
    <!-- 底部阴影 -->
    <div class=&quot;pig_shadow&quot;></div>
    <!-- 左脚 -->
    <div class=&quot;left_foot&quot;></div>
    <div class=&quot;left_foot right_foot&quot;></div>
    <!-- 左鞋 -->
    <div class=&quot;left_shoes&quot;></div>
    <div class=&quot;left_shoes right_shoes&quot;></div>
    <!-- 左手 -->
    <div>
        <div class=&quot;hand_left_top&quot;></div>
        <div class=&quot;hand_left_bottom&quot;></div>
        <div class=&quot;hand_left_middle&quot;></div>
    </div>
    <!-- 身体 -->
    <div class=&quot;pig_body_bottom&quot;></div>
    <!-- 右手 -->
    <div>
        <div class=&quot;hand_right_top&quot;></div>
        <div class=&quot;hand_right_bottom&quot;></div>
        <div class=&quot;hand_right_middle&quot;></div>
    </div>

    <!-- 猪头 -->
    <div>
        <!-- 耳朵 -->
        <div class=&quot;ear_left&quot;></div>
        <div class=&quot;ear_right&quot;></div>
        <div class=&quot;pig_head&quot;>
            <div class=&quot;pig_head_white_left_bottom&quot;></div>
            <div class=&quot;pig_head_white_left_top&quot;></div>
        </div>
        <!-- 鼻子 -->
        <div class=&quot;pig_nose&quot;></div>
        <!-- 下巴 -->
        <div class=&quot;pig_jaw&quot;></div>
        <div class=&quot;pig_jaw_right&quot;></div>
        <div class=&quot;pig_nose_bottom&quot;></div>
        <!-- 鼻孔 -->
        <div class=&quot;nose_kong_left&quot;></div>
        <div class=&quot;nose_kong_right&quot;></div>
        <!-- 左眼 -->
        <div class=&quot;left_eye&quot;>
            <div class=&quot;left_eye_bg&quot;></div>
            <div class=&quot;left_eye_ball&quot;></div>
            <div class=&quot;left_eye_border&quot;></div>
        </div>
        <!-- 右眼 -->
        <div class=&quot;right_eye&quot;>
            <div class=&quot;right_eye_bg&quot;></div>
            <div class=&quot;right_eye_ball&quot;></div>
            <div class=&quot;right_eye_border&quot;></div>
        </div>
        <!-- 嘴巴 -->
        <div class=&quot;mouth&quot;>
            <div class=&quot;mouth_bottom&quot;></div>
            <div class=&quot;mouth_middle&quot;></div>
            <div class=&quot;mouth_top&quot;></div>
        </div>
        <!-- 脸颊 -->
        <div class=&quot;face&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"pig_container"</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- 尾巴 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tail_left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tail_right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tail_blank"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tail_middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tail_circle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 底部阴影 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_shadow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 左脚 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_foot"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_foot right_foot"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 左鞋 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_shoes"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_shoes right_shoes"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 左手 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hand_left_top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hand_left_bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hand_left_middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 身体 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_body_bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 右手 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hand_right_top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hand_right_bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hand_right_middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- 猪头 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 耳朵 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ear_left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ear_right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_head"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_head_white_left_bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_head_white_left_top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 鼻子 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_nose"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 下巴 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_jaw"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_jaw_right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pig_nose_bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 鼻孔 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nose_kong_left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nose_kong_right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 左眼 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_eye"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_eye_bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_eye_ball"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left_eye_border"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 右眼 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right_eye"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right_eye_bg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right_eye_ball"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right_eye_border"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 嘴巴 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mouth"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mouth_bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mouth_middle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mouth_top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 脸颊 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"face"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>最后合体如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPS?w=377&amp;h=479" src="https://static.alili.tech/img/bVbaIPS?w=377&amp;h=479" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>跟模板比对一下~</p>
<p><span class="img-wrap"><img data-src="/img/bVbaIPU?w=529&amp;h=326" src="https://static.alili.tech/img/bVbaIPU?w=529&amp;h=326" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>哪个是真的佩奇？</p>
<h1 id="articleHeader8">最后</h1>
<p>演示效果猛戳这里哦！<a href="https://www.doverr.com/peppa.html" rel="nofollow noreferrer" target="_blank">https://www.doverr.com/peppa....</a></p>
<blockquote>
<strong>问答</strong><br><a href="https://cloud.tencent.com/developer/ask/55658?fromSource=waitui" rel="nofollow noreferrer" target="_blank">如何验证CSS颜色名称？</a><br><strong>相关阅读</strong><br><a href="https://cloud.tencent.com/developer/article/1114128?fromSource=waitui" rel="nofollow noreferrer" target="_blank">CSS3动画-抛物线运动</a><br><a href="https://cloud.tencent.com/developer/article/1104152?fromSource=waitui" rel="nofollow noreferrer" target="_blank">CSS实战训练之图片点击放大</a><br><a href="https://cloud.tencent.com/developer/article/1122404?fromSource=waitui" rel="nofollow noreferrer" target="_blank">9个独特的 CSS 背景视觉效果</a>
</blockquote>
<p><strong>此文已由作者授权腾讯云+社区发布，原文链接：<a href="https://cloud.tencent.com/developer/article/1128472?fromSource=waitui" rel="nofollow noreferrer" target="_blank">https://cloud.tencent.com/dev...</a></strong><br><span class="img-wrap"><img data-src="/img/bV9SBq?w=800&amp;h=450" src="https://static.alili.tech/img/bV9SBq?w=800&amp;h=450" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用CSS画小猪佩奇，你就是下一个社会人！

## 原文链接
[https://segmentfault.com/a/1190000014909658](https://segmentfault.com/a/1190000014909658)

