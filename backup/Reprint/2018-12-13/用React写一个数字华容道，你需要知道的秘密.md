---
title: '用React写一个数字华容道，你需要知道的秘密' 
date: 2018-12-13 2:30:07
hidden: true
slug: ik2skfkdbg
categories: [reprint]
---

{{< raw >}}

                    
<p>还在上班？很无聊？<strong><a href="http://closertb.site/Klotski/#/" rel="nofollow noreferrer" target="_blank">数字华容道畅玩地址</a></strong></p>
<p><strong><a href="https://github.com/closertb/firstRect" rel="nofollow noreferrer" target="_blank">开发源码地址</a></strong></p>
<h2 id="articleHeader0">这个叫前言</h2>
<p>年末了。哦，不，要过年了。以前只能一路站到公司的我，今早居然是坐着过来的。新的一年，总要学一个新东西来迎接新的未来吧，所以选择了一直未碰的那个据说是全宇宙最牛逼的前端框架-React，在上下班的地铁上看了两天官方教程，so what。光看不练假把式，于是就想着做个什么，偶然看到一个妹妹发了一条关于玩数字华容道，根本停不下来的朋友圈，这游戏我在今年的最强大脑看过，但是就看两小天才在滑呀滑呀滑，感觉还不错，程序猿就该多玩益智类，少玩什么跳一跳。于是去商店下了个，玩着还行，就是广告太多，而且只能玩五阶以下的，看起不难，一个想法涌于脑上，何不拿这练练手做个Demo，毕竟我们属于智慧家族的。闲话扯完，进入正题。本文包含但不仅包括以下内容:</p>
<ul>
<li>Demo 开发环境</li>
<li>数字华容道里的秘密</li>
<li>讲一讲里面算法的实现</li>
<li>React的使用感受及易错点</li>
</ul>
<h2 id="articleHeader1">Demo 开发环境</h2>
<p>React：16.2.0</p>
<p>react-router-dom：4.2.2</p>
<p>webpack：3.8.1</p>
<p>JS：ES6</p>
<p>CSS：Scss</p>
<p><a href="https://doc.react-china.org/docs/hello-world.html" rel="nofollow noreferrer" target="_blank">React教程</a></p>
<p><a href="https://github.com/closertb/firstRect" rel="nofollow noreferrer" target="_blank">项目目录</a>结构（很适合React入门 如果感觉不错，请留下你的star）：如下图所示<br><span class="img-wrap"><img data-src="/img/remote/1460000013344207?w=800&amp;h=404" src="https://static.alili.tech/img/remote/1460000013344207?w=800&amp;h=404" alt="项目目录结构" title="项目目录结构" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">数字华容道里的秘密</h2>
<h3 id="articleHeader3">玩法说明</h3>
<p>数字华容道里在外国被称为puzzle,译为数字推盘，最经典的就是puzzle15的高价悬赏13 15 14局面的解。怎么玩，一图胜千言，简单来说就是讲左图的乱选状态，滑成右图所示的顺序状态。个人感觉和小时候玩的推箱子有点类似。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013284277?w=796&amp;h=360" src="https://static.alili.tech/img/remote/1460000013284277?w=796&amp;h=360" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">你不知道的秘密</h3>
<p>其实写完Demo的随机序列页面生成和操作交互就用了一个周天和一个周一晚上，但到现在线上这个样子，又多用了三四个晚上(白天上班，晚上学习，这就是前端的日常)，为什么？因为当时基础版部署到线上，让女朋友试一把，结果玩个三阶的，都两分钟了还在折腾(我最快是18秒还原)，怎么这么笨，于是抢过来，捣腾，再捣腾，怎么回事，感觉无解啊，于是去百度了一下，在知乎里看到了这个问题，还真的有无解的情况，<a href="https://www.zhihu.com/question/266065256/" rel="nofollow noreferrer" target="_blank">问题地址</a>。看图，后面还要讲(敲黑板)</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013284278?w=711&amp;h=628" src="https://static.alili.tech/img/remote/1460000013284278?w=711&amp;h=628" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>噢，原来是酱紫。光随机生成一个乱序数列是不够的，还得保证这个数列的逆序数为偶数，嗦嘎。于是在随机序列的生成中又多加一个过程，判断序列逆序数奇偶性，并调整。早上地铁上自己又不断玩玩测试，三阶ok，四阶ok，五阶ok，然后又一遍，一遍。原以为这样就大功告成了，但是出现了这样的画面。有图。谁刚说的四阶ok。。。。于是又测试了多次，发现三阶，五阶确实ok，但四阶确实有Bug。Why，后面自己每开一局，截一张图，无解的，标记下来，下面就是几张立功的图片。<br><span class="img-wrap"><img data-src="/img/remote/1460000013284279?w=800&amp;h=286" src="https://static.alili.tech/img/remote/1460000013284279?w=800&amp;h=286" alt="立了大功的几张图" title="立了大功的几张图" style="cursor: pointer; display: inline;"></span><br>下午年会，领导上面讲，自己下面睡。睡得天昏地暗，时过境迁，居然还在叨叨叨，自己就拿起酒店提供的纸和笔找这些数字间的秘密。首先，这几组数字都是偶逆序列，前一晚写的调整奇逆序列为偶逆序列的代码是没有问题的，那问题出在哪了。抓脑抠鼻，抖脚摇头，那一组图片来回翻阅，灵光一闪，水哥附身，原来是这样:空格项都出现在第三行，哦，不，应该是奇数行。为什么呢？又去百度，又看到了上面知乎和豆瓣的正经说瞎话的大神（此生最讨此类人，害死个仙人），看到这，我开始怀疑，这句话的正确性。奇数阶，格子上下左右移动确实不会改变数列的逆序奇偶性。但偶数阶，格子的上下移动是会改变序列的奇偶性的，简单总结一下：</p>
<p>奇数阶(3x3,5x5)：上移或下移一个数字，其调换的位置是偶数，所以不改变数列逆序数的奇偶性，所以奇数阶，生成的初始随机数列的逆序数必须为偶数；</p>
<p>偶数阶(4x4,6x6)：上移或下移一个数字，其调换的位置是奇数，所以会改变数列逆序数的奇偶性，上下交换一次改变一次奇偶性，交换两次就回到初始状态。所以可以大致这样理解，偶数的平方仍然为偶数，其有数字的滑块个数为奇数个，所以有一个数字必然会和空滑块产生位置交换，如果空滑块位于奇数行（空滑块是不参于数字序列的逆序数计算的），就会产生2n-1次交换，其会改变数列逆序数的奇偶性；而位于偶数行，就会产生2n次交换，不会改变数列逆序数的奇偶性，所以用一个公式总结就是：（数列初始状态是否为偶数） === （空行是否为偶数），简单来讲就是求这两个数的异或。最后的代码流程的实现<br><span class="img-wrap"><img data-src="/img/remote/1460000013284280?w=737&amp;h=274" src="https://static.alili.tech/img/remote/1460000013284280?w=737&amp;h=274" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">讲一讲里面算法的实现</h2>
<h3 id="articleHeader6">生成一个乱序不重复的1~n数组数列</h3>
<p>方法有很多，但我知道的两种，这里分享一下，有知道其他的，请留言做个评论，让大家一起进步。<br>顺序数组随机性调换<br>思路基本就是，先生成一个顺序的1~n的顺序数组，然后再通过一个1~n的循环来打乱这个数组，其时间复杂度是O(n)。代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export const disorganize = (length) => {
        const arr = [];
        let temp;
        for (var i = 1; i < length; i++) {
            arr.push(i);
        }
        for (i = 0; i < length; i++) {
            let random = Math.round(Math.random() * (length - 2));
            temp = arr[random];
            arr[random] = arr[i];
            arr[i] = temp;
        }
        return arr;
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    export const disorganize = (<span class="hljs-built_in">length</span>) =&gt; {
        const arr = [];
        <span class="hljs-built_in">let</span> temp;
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">length</span>; i++) {
            arr.<span class="hljs-built_in">push</span>(i);
        }
        <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">length</span>; i++) {
            <span class="hljs-built_in">let</span> <span class="hljs-built_in">random</span> = Math.<span class="hljs-built_in">round</span>(Math.<span class="hljs-built_in">random</span>() * (<span class="hljs-built_in">length</span> - <span class="hljs-number">2</span>));
            temp = arr[<span class="hljs-built_in">random</span>];
            arr[<span class="hljs-built_in">random</span>] = arr[i];
            arr[i] = temp;
        }
        <span class="hljs-built_in">return</span> arr;
    };</code></pre>
<p>随机数生成乱序数组<br>生成一个随机数，并判断其是否在目标数组中已存在，当数组个数为n时，目的达到。其时间复杂度我不知，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export const randomArr = (length) => {
        const arr = [];
        let temp;
        while(arr.length<(length-1)){
            let random = 1+Math.round(Math.random() * (length - 2));
            if(random<length &amp;&amp; arr.indexOf(random)===-1){
                arr.push(random);
            }
        }
        return arr;
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    export const randomArr = (<span class="hljs-built_in">length</span>) =&gt; {
        const arr = [];
        <span class="hljs-built_in">let</span> temp;
        <span class="hljs-keyword">while</span>(arr.<span class="hljs-built_in">length</span>&lt;(<span class="hljs-built_in">length</span>-<span class="hljs-number">1</span>)){
            <span class="hljs-built_in">let</span> <span class="hljs-built_in">random</span> = <span class="hljs-number">1</span>+Math.<span class="hljs-built_in">round</span>(Math.<span class="hljs-built_in">random</span>() * (<span class="hljs-built_in">length</span> - <span class="hljs-number">2</span>));
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">random</span>&lt;<span class="hljs-built_in">length</span> &amp;&amp; arr.indexOf(<span class="hljs-built_in">random</span>)===-<span class="hljs-number">1</span>){
                arr.<span class="hljs-built_in">push</span>(<span class="hljs-built_in">random</span>);
            }
        }
        <span class="hljs-built_in">return</span> arr;
    };</code></pre>
<p>虽然代码看起比上面的简单，但其时间复杂度最由是O(f(n)，最差情况未知，所以，方法一更推荐，如果说的有什么毛病，还请及时指出。</p>
<h3 id="articleHeader7">数列逆序性的奇偶性判断</h3>
<p>最先想到的就是冒泡排序，因为冒泡排序过程就是判断两个数是否逆序，是，就交换，不是，继续下一组判断。所以，我们直接将交换的次数，记为数列逆序数个数，就达到了想要的效果。当然这个题用其他排序方法也能达到目的，理解了其排序的原理，就很容易计算数列的逆序性，我这里是直接用的以前冒泡排序的算法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bubbleOrder=(arr)=>{
    let i ,j ,count=0;
    const swap=(tar,lastIndex,newIndex)=>{
        let temp = tar[lastIndex];
        tar[lastIndex] =tar[newIndex];
        tar[newIndex] = temp;
        count++;
    }
    for(i=0;i<arr.length;i++){
        for(j=arr.length-1;j>i;j--){
            (arr[j]<arr[j-1])&amp;&amp;swap(arr,j-1,j);
        }
    }
    return count;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>const <span class="hljs-keyword">bubbleOrder=(arr)=&gt;{
</span>    let i ,<span class="hljs-keyword">j </span>,<span class="hljs-built_in">count</span>=<span class="hljs-number">0</span><span class="hljs-comment">;</span>
    const <span class="hljs-keyword">swap=(tar,lastIndex,newIndex)=&gt;{
</span>        let temp = tar[lastIndex]<span class="hljs-comment">;</span>
        tar[lastIndex] =tar[newIndex]<span class="hljs-comment">;</span>
        tar[newIndex] = temp<span class="hljs-comment">;</span>
        <span class="hljs-built_in">count</span>++<span class="hljs-comment">;</span>
    }
    for(i=<span class="hljs-number">0</span><span class="hljs-comment">;i&lt;arr.length;i++){</span>
        for(<span class="hljs-keyword">j=arr.length-1;j&gt;i;j--){
</span>            (arr[<span class="hljs-keyword">j]&lt;arr[j-1])&amp;&amp;swap(arr,j-1,j);
</span>        }
    }
    return <span class="hljs-built_in">count</span><span class="hljs-comment">;</span>
}</code></pre>
<h3 id="articleHeader8">JS写一个秒表</h3>
<p>秒表是啥，start-pause-stop-reset，中间的步骤不是必须的，但前后两步必须。当然方法有很多，但都离不开setTimeout或则setInterval两个方法，requestAnimation应该也可以。这里提供一个自己写的，当然思路来源于网上，只是用自己的思路表达出来。基于setInterval和Date对象。源码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const timer=(offsetTime)=>{  //offsetTime为0时，表示从0开始计,不为0，表示是暂停后继续计时
    const formatter=(t)=>{
        const res =t>9 ? t : '0'+t
        return res;
    }
    let startTime = new Date().getTime(),tPass=0,tOffset=offsetTime||0;
    this.interId = setInterval(()=> {   //this.interId 是组件下面建的一个保持定时器值的,用于暂停和停止
        let tNew = new Date().getTime(),ms,sec,min,timeStr;
        tPass = tOffset +tNew - startTime;
        ms = Math.floor(tPass/10 % 100);
        sec = Math.floor((tPass / 1000) % 60);
        min = Math.floor((tPass / 1000 / 60) % 60);
        timeStr = formatter(min)+':'+formatter(sec)+':'+formatter(ms);
        this.tick(timeStr,tPass);
    },100)
}

tick(timeStr,tPass){  //这是游戏页面一个react组件中的一个用于更新显示dom的触发器
    this.setState({
        timePass:tPass,
        time:timeStr
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> timer=<span class="hljs-function">(<span class="hljs-params">offsetTime</span>)=&gt;</span>{  <span class="hljs-comment">//offsetTime为0时，表示从0开始计,不为0，表示是暂停后继续计时</span>
    <span class="hljs-keyword">const</span> formatter=<span class="hljs-function">(<span class="hljs-params">t</span>)=&gt;</span>{
        <span class="hljs-keyword">const</span> res =t&gt;<span class="hljs-number">9</span> ? t : <span class="hljs-string">'0'</span>+t
        <span class="hljs-keyword">return</span> res;
    }
    <span class="hljs-keyword">let</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(),tPass=<span class="hljs-number">0</span>,tOffset=offsetTime||<span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.interId = setInterval(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {   <span class="hljs-comment">//this.interId 是组件下面建的一个保持定时器值的,用于暂停和停止</span>
        <span class="hljs-keyword">let</span> tNew = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(),ms,sec,min,timeStr;
        tPass = tOffset +tNew - startTime;
        ms = <span class="hljs-built_in">Math</span>.floor(tPass/<span class="hljs-number">10</span> % <span class="hljs-number">100</span>);
        sec = <span class="hljs-built_in">Math</span>.floor((tPass / <span class="hljs-number">1000</span>) % <span class="hljs-number">60</span>);
        min = <span class="hljs-built_in">Math</span>.floor((tPass / <span class="hljs-number">1000</span> / <span class="hljs-number">60</span>) % <span class="hljs-number">60</span>);
        timeStr = formatter(min)+<span class="hljs-string">':'</span>+formatter(sec)+<span class="hljs-string">':'</span>+formatter(ms);
        <span class="hljs-keyword">this</span>.tick(timeStr,tPass);
    },<span class="hljs-number">100</span>)
}

tick(timeStr,tPass){  <span class="hljs-comment">//这是游戏页面一个react组件中的一个用于更新显示dom的触发器</span>
    <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">timePass</span>:tPass,
        <span class="hljs-attr">time</span>:timeStr
    })
}</code></pre>
<h2 id="articleHeader9">React的使用感受及易错点(大神留步)</h2>
<p>用Vue与用React的区别，抱头痛哭，Vue半年没上项目了，忘得差不多了，个人观点（非喜勿喷）。</p>
<ul>
<li>直接感受就是，Vue确实比React容易上手,其模板，js，css的组件式的开发方式，更接近我们以前工作中常用的template ＋ requireJs的开发模式。</li>
<li>React更强调js的编程和项目的整体架构，state放在哪一级，哪一级通过props来控制,当然route 4.0的组件化设计更强调这一点；</li>
<li>React在国内还是不像Vue那么大众，比方说，出了问题，很多只有在stackOverflow有相关答案；</li>
<li>不过，不论是Vue还是React，熟悉ES6和面向对象的编程，两者上手都是很快的(装个逼,别打我)。</li>
</ul>
<p>在整个学习过程中，将很多教程中敲黑板指出来的坑，又结结实实踩了一遍，现在可以说影响深刻。自己整理了一下，做个小分享，愿和我一样刚入门的，遇见下面的错误，不会那么迷茫<br>不要在</p>
<h3 id="articleHeader10">Cannot read property 'setState' of undefined'</h3>
<p>解释：这个问题，主要是组件对象的构造constructor中，未在constructor绑定事件处理函数的this指向。这个在教程中是有明确说明的，解决办法就是constructor()中添加：this.resetClick = this.resetClick.bind(this);<br><span class="img-wrap"><img data-src="/img/remote/1460000013284281?w=800&amp;h=234" src="https://static.alili.tech/img/remote/1460000013284281?w=800&amp;h=234" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">Cannot read property 'size' of undefined'</h3>
<p>解释：这个问题，主要是组件对象的构造constructor中，未传入props对象，导致整个组件对象无props属性;其实除了理解继承，理解React组件的<a href="https://juejin.im/entry/587de1b32f301e0057a28897" rel="nofollow noreferrer" target="_blank">生命周期</a>也很重要。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013284282?w=800&amp;h=121" src="https://static.alili.tech/img/remote/1460000013284282?w=800&amp;h=121" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">you are adding a new property in the Synthetic event Object</h3>
<p>解释：可以简单理解为<a href="https://doc.react-china.org/docs/events.html" rel="nofollow noreferrer" target="_blank">SyntheticEvent</a>是react为浏览器兼容写的一个dom事件代理，除了她原有的那些属性，你不能私自为其添加属性。<br><span class="img-wrap"><img data-src="/img/remote/1460000013284283?w=792&amp;h=64" src="https://static.alili.tech/img/remote/1460000013284283?w=792&amp;h=64" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013284284?w=800&amp;h=166" src="https://static.alili.tech/img/remote/1460000013284284?w=800&amp;h=166" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">其他，后面持续补充</h3>
<h2 id="articleHeader14">一个疑问</h2>
<p>一开始我的游戏盒子是用的flex布局，但一考虑，盒子里面的方块要滑动效果，我要做滑动的缓动效果，于是又改用了绝对定位布局，每个<br>方块计算其定位点。但事实证明，我当时确实太菜，我用了state来管理每个方块在盒子的位置，但我调整state时，React的virtualDom<br>会自动计算，并更新dom节点，那我保持整个项目，怎么才能自己做出缓动效果呢？纯CSS不行，请各位大神给点建议。</p>
<h2 id="articleHeader15">结束语</h2>
<p>在放假的前几个小时，把拖了几天的文章写完，有点赶，有不足的地方还请及时指出。关于这个项目，后期自己想继续优化，做一些功能拓展，比如接入数据记录,NxM阶这样的玩法，有思路的，还请能分享给我，邮箱：closertb@163.com。在最后，送给2017未曾放弃努力的自己一些鼓励，愿2018年能用更好的发展。也祝各位战友2018新年快乐，年后再见！！！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用React写一个数字华容道，你需要知道的秘密

## 原文链接
[https://segmentfault.com/a/1190000013284274](https://segmentfault.com/a/1190000013284274)

