---
title: '简单说 JavaScript实现雪花飘落效果' 
date: 2018-12-24 2:30:07
hidden: true
slug: qeu0b5kq8ie
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>这次实现的雪花飘落的效果很简单，主要是为了练习练习JavaScript中的定时器，setTimeout 和 setInterval。</p>
<h3 id="articleHeader1">效果图</h3>
<p><span class="img-wrap"><img data-src="/img/bVZszF?w=680&amp;h=491" src="https://static.alili.tech/img/bVZszF?w=680&amp;h=491" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">解释</h3>
<p><strong>setTimeout()</strong>   <br>setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var timerId = setTimeout(func|code, delay)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">var timerId = <span class="hljs-built_in">setTimeout</span>(func|code, <span class="hljs-built_in">delay</span>)</code></pre>
<p>上面代码中，setTimeout函数接受两个参数，第一个参数func|code是将要推迟执行的函数名或者一段代码，第二个参数delay是推迟执行的毫秒数。  </p>
<p><strong>setInterval()</strong>  <br>setInterval函数的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。    </p>
<p><strong>clearTimeout()，clearInterval()</strong><br>setTimeout和setInterval函数，都返回一个表示计数器编号的整数值，将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var id1 = setTimeout(f,1000);
var id2 = setInterval(f,1000);

clearTimeout(id1);
clearInterval(id2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var id1 = setTimeout(<span class="hljs-name">f</span>,<span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
var id2 = setInterval(<span class="hljs-name">f</span>,<span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>

clearTimeout(<span class="hljs-name">id1</span>)<span class="hljs-comment">;</span>
clearInterval(<span class="hljs-name">id2</span>)<span class="hljs-comment">;</span></code></pre>
<p><strong>注意：</strong></p>
<blockquote>setTimeout 和 setInterval 必须要等到当前脚本的同步任务和“任务队列”中已有的事件，全部处理完以后，才会执行setTimeout指定的任务。</blockquote>
<p>这里就不细说 setTimeout 和 setInterval的概念了 ，    <br>想详细了解的请看<a href="http://javascript.ruanyifeng.com/advanced/timer.html#toc0" rel="nofollow noreferrer" target="_blank">这里，定时器</a>    </p>
<p>我们继续说实现雪花飘落的效果     <br><strong>主要是以下4步：</strong>   <br>1、定义一片雪花模板；<br>2、设置第一个定时器，周期性定时器，每隔一段时间生成一片雪花；  <br>3、设置第二个定时器，一次性定时器，当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；   <br>4、设置第三个定时器，当雪花落下后，删除雪花。   </p>
<p>上面是实现的思路，下面写出具体的代码，下面的代码是JS原生代码，最后会附上JQuery实现的代码，思路都一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <style>
        body {
            background-color: #000;
            /*防止出现向下滚动条*/
            overflow: hidden;
        }
    </style>
</head>

<body>
    <script>
        function snow() {
            //    1、定义一片雪花模板
            var flake = document.createElement('div');
            // 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺
            flake.innerHTML = '❆';
            flake.style.cssText = 'position:absolute;color:#fff;';

            //获取页面的高度 相当于雪花下落结束时Y轴的位置
            var documentHieght = window.innerHeight;
            //获取页面的宽度，利用这个数来算出，雪花开始时left的值
            var documentWidth = window.innerWidth;

            //定义生成一片雪花的毫秒数
            var millisec = 100;
            //2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；
            setInterval(function() { //页面加载之后，定时器就开始工作
                //随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置
                var startLeft = Math.random() * documentWidth;

                //随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置
                var endLeft = Math.random() * documentWidth;

                //随机生成雪花大小
                var flakeSize = 5 + 20 * Math.random();

                //随机生成雪花下落持续时间
                var durationTime = 4000 + 7000 * Math.random();

                //随机生成雪花下落 开始 时的透明度
                var startOpacity = 0.7 + 0.3 * Math.random();

                //随机生成雪花下落 结束 时的透明度
                var endOpacity = 0.2 + 0.2 * Math.random();

                //克隆一个雪花模板
                var cloneFlake = flake.cloneNode(true);

                //第一次修改样式，定义克隆出来的雪花的样式
                cloneFlake.style.cssText += `
                        left: ${startLeft}px;
                        opacity: ${startOpacity};
                        font-size:${flakeSize}px;
                        top:-25px;
                              transition:${durationTime}ms;
                      `;

                //拼接到页面中
                document.body.appendChild(cloneFlake);

                //设置第二个定时器，一次性定时器，
                //当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；
                setTimeout(function() {
                    //第二次修改样式
                    cloneFlake.style.cssText += `
                                left: ${endLeft}px;
                                top:${documentHieght}px;
                                opacity:${endOpacity};
                            `;

                    //4、设置第三个定时器，当雪花落下后，删除雪花。
                    setTimeout(function() {
                        cloneFlake.remove();
                    }, durationTime);
                }, 0);

            }, millisec);
        }
        snow();
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#000</span>;
            <span class="hljs-comment">/*防止出现向下滚动条*/</span>
            <span class="hljs-attribute">overflow</span>: hidden;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">snow</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//    1、定义一片雪花模板</span>
            <span class="hljs-keyword">var</span> flake = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
            <span class="hljs-comment">// 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺</span>
            flake.innerHTML = <span class="hljs-string">'❆'</span>;
            flake.style.cssText = <span class="hljs-string">'position:absolute;color:#fff;'</span>;

            <span class="hljs-comment">//获取页面的高度 相当于雪花下落结束时Y轴的位置</span>
            <span class="hljs-keyword">var</span> documentHieght = <span class="hljs-built_in">window</span>.innerHeight;
            <span class="hljs-comment">//获取页面的宽度，利用这个数来算出，雪花开始时left的值</span>
            <span class="hljs-keyword">var</span> documentWidth = <span class="hljs-built_in">window</span>.innerWidth;

            <span class="hljs-comment">//定义生成一片雪花的毫秒数</span>
            <span class="hljs-keyword">var</span> millisec = <span class="hljs-number">100</span>;
            <span class="hljs-comment">//2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；</span>
            setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//页面加载之后，定时器就开始工作</span>
                <span class="hljs-comment">//随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置</span>
                <span class="hljs-keyword">var</span> startLeft = <span class="hljs-built_in">Math</span>.random() * documentWidth;

                <span class="hljs-comment">//随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置</span>
                <span class="hljs-keyword">var</span> endLeft = <span class="hljs-built_in">Math</span>.random() * documentWidth;

                <span class="hljs-comment">//随机生成雪花大小</span>
                <span class="hljs-keyword">var</span> flakeSize = <span class="hljs-number">5</span> + <span class="hljs-number">20</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//随机生成雪花下落持续时间</span>
                <span class="hljs-keyword">var</span> durationTime = <span class="hljs-number">4000</span> + <span class="hljs-number">7000</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//随机生成雪花下落 开始 时的透明度</span>
                <span class="hljs-keyword">var</span> startOpacity = <span class="hljs-number">0.7</span> + <span class="hljs-number">0.3</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//随机生成雪花下落 结束 时的透明度</span>
                <span class="hljs-keyword">var</span> endOpacity = <span class="hljs-number">0.2</span> + <span class="hljs-number">0.2</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//克隆一个雪花模板</span>
                <span class="hljs-keyword">var</span> cloneFlake = flake.cloneNode(<span class="hljs-literal">true</span>);

                <span class="hljs-comment">//第一次修改样式，定义克隆出来的雪花的样式</span>
                cloneFlake.style.cssText += <span class="hljs-string">`
                        left: <span class="hljs-subst">${startLeft}</span>px;
                        opacity: <span class="hljs-subst">${startOpacity}</span>;
                        font-size:<span class="hljs-subst">${flakeSize}</span>px;
                        top:-25px;
                              transition:<span class="hljs-subst">${durationTime}</span>ms;
                      `</span>;

                <span class="hljs-comment">//拼接到页面中</span>
                <span class="hljs-built_in">document</span>.body.appendChild(cloneFlake);

                <span class="hljs-comment">//设置第二个定时器，一次性定时器，</span>
                <span class="hljs-comment">//当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；</span>
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">//第二次修改样式</span>
                    cloneFlake.style.cssText += <span class="hljs-string">`
                                left: <span class="hljs-subst">${endLeft}</span>px;
                                top:<span class="hljs-subst">${documentHieght}</span>px;
                                opacity:<span class="hljs-subst">${endOpacity}</span>;
                            `</span>;

                    <span class="hljs-comment">//4、设置第三个定时器，当雪花落下后，删除雪花。</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        cloneFlake.remove();
                    }, durationTime);
                }, <span class="hljs-number">0</span>);

            }, millisec);
        }
        snow();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>注意：</strong><br>因为定时器添加的事件，会在下一次Event Loop执行，所以第二个定时器的作用是为了让生成的雪花先拼接到页面中渲染出来后，再修改他的样式，这样才能让他动起来，如果没有这个定时器，浏览器会把所有的JS代码都执行完之后才渲染页面，这样的话后面的样式就直接覆盖前面的样式了，雪花就没法动了，这和浏览器的线程有关系。  </p>
<p>简单说，意思就是用了这个定时器，能把两次修改样式的代码分开执行，可以先把第一次修改的样式渲染后，在进行第二次的修改，雪花就会动了。    </p>
<p>如果想了解更详细的东西推荐看看下面的文章    <br><a href="http://www.cnblogs.com/yelongsan/p/6296700.html" rel="nofollow noreferrer" target="_blank">js setTimeOut()</a>   <br><a href="http://www.cnblogs.com/kuangke/p/7590507.html" rel="nofollow noreferrer" target="_blank">原来 CSS 与 JS 是这样阻塞 DOM 解析和渲染的</a>  <br><a href="http://blog.csdn.net/qiphon3650/article/details/78038266" rel="nofollow noreferrer" target="_blank">哪些地方会出现css阻塞，哪些地方会出现js阻塞？</a>   <br><a href="http://www.jianshu.com/p/e141d1543143" rel="nofollow noreferrer" target="_blank">浏览器~加载，解析，渲染</a></p>
<h3 id="articleHeader3">总结</h3>
<p>这次实现的雪花飘落效果，要说麻烦的地方，就是第二个定时器那里了，为什么用了这个定时器就能让雪花动起来，文中只是简单的说了一下，更加详细的还是看看推荐的那几篇文章吧！不过在这之前，要先弄明白定时器是怎么回事才可以。    <br>不明白定时器看<a href="http://javascript.ruanyifeng.com/advanced/timer.html#toc0" rel="nofollow noreferrer" target="_blank">这里，定时器</a>    <br>不明白为什么用第二个定时器看这几篇文章   <br><a href="http://www.cnblogs.com/yelongsan/p/6296700.html" rel="nofollow noreferrer" target="_blank">js setTimeOut()</a>   <br><a href="http://www.cnblogs.com/kuangke/p/7590507.html" rel="nofollow noreferrer" target="_blank">原来 CSS 与 JS 是这样阻塞 DOM 解析和渲染的</a>  <br><a href="http://blog.csdn.net/qiphon3650/article/details/78038266" rel="nofollow noreferrer" target="_blank">哪些地方会出现css阻塞，哪些地方会出现js阻塞？</a>   <br><a href="http://www.jianshu.com/p/e141d1543143" rel="nofollow noreferrer" target="_blank">浏览器~加载，解析，渲染</a></p>
<h3 id="articleHeader4">JQuery版</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <style>
        body {
            background-color: #000;
            /*防止出现向下滚动条*/
            overflow: hidden;
        }
    </style>
</head>

<body>
    <script src=&quot;https://cdn.bootcss.com/jquery/3.2.1/jquery.js&quot;></script>
    <script>
        function snow() {
            //1、定义一片雪花模板
            var flake = $(&quot;<div>&quot;).css({
                &quot;position&quot;: &quot;absolute&quot;,
                &quot;color&quot;: &quot;#fff&quot;
            }).html(&quot;❄&quot;);

            //获取页面的宽度，利用这个数来算出，雪花开始时left的值
            var documentWidth = $(document).width();

            //获取页面的高度 相当于雪花下落结束时Y轴的位置
            var documentHieght = $(document).height();

            //定义生成一片雪花的毫秒数
            var millisec = 100;
            //2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；
            setInterval(function() {
                //随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置
                var startLeft = Math.random() * documentWidth;

                //随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置
                var endLeft = Math.random() * documentWidth;

                //随机生成雪花大小
                var flakeSize = 5 + 20 * Math.random();

                //随机生成雪花下落持续时间
                var durationTime = 4000 + 7000 * Math.random();

                //随机生成雪花下落 开始 时的透明度
                var startOpacity = 0.7 + 0.3 * Math.random();

                //随机生成雪花下落 结束 时的透明度
                var endOpacity = 0.2 + 0.2 * Math.random();

                //3、克隆一个雪花模板,定义雪花的初始样式，拼接到页面中
                flake.clone().appendTo($(&quot;body&quot;)).css({
                    &quot;left&quot;: startLeft,
                    &quot;opacity&quot;: startOpacity,
                    &quot;font-size&quot;: flakeSize,
                    &quot;top&quot;: &quot;-25px&quot;,
                }).animate({ //执行动画
                    &quot;left&quot;: endLeft,
                    &quot;opacity&quot;: endOpacity,
                    &quot;top&quot;: documentHieght
                }, durationTime, function() {
                    //4、当雪花落下后，删除雪花。
                    $(this).remove(); 
                });
            }, millisec);
        };
        snow();
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#000</span>;
            <span class="hljs-comment">/*防止出现向下滚动条*/</span>
            <span class="hljs-attribute">overflow</span>: hidden;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/jquery/3.2.1/jquery.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">snow</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">//1、定义一片雪花模板</span>
            <span class="hljs-keyword">var</span> flake = $(<span class="hljs-string">"&lt;div&gt;"</span>).css({
                <span class="hljs-string">"position"</span>: <span class="hljs-string">"absolute"</span>,
                <span class="hljs-string">"color"</span>: <span class="hljs-string">"#fff"</span>
            }).html(<span class="hljs-string">"❄"</span>);

            <span class="hljs-comment">//获取页面的宽度，利用这个数来算出，雪花开始时left的值</span>
            <span class="hljs-keyword">var</span> documentWidth = $(<span class="hljs-built_in">document</span>).width();

            <span class="hljs-comment">//获取页面的高度 相当于雪花下落结束时Y轴的位置</span>
            <span class="hljs-keyword">var</span> documentHieght = $(<span class="hljs-built_in">document</span>).height();

            <span class="hljs-comment">//定义生成一片雪花的毫秒数</span>
            <span class="hljs-keyword">var</span> millisec = <span class="hljs-number">100</span>;
            <span class="hljs-comment">//2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；</span>
            setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">//随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置</span>
                <span class="hljs-keyword">var</span> startLeft = <span class="hljs-built_in">Math</span>.random() * documentWidth;

                <span class="hljs-comment">//随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置</span>
                <span class="hljs-keyword">var</span> endLeft = <span class="hljs-built_in">Math</span>.random() * documentWidth;

                <span class="hljs-comment">//随机生成雪花大小</span>
                <span class="hljs-keyword">var</span> flakeSize = <span class="hljs-number">5</span> + <span class="hljs-number">20</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//随机生成雪花下落持续时间</span>
                <span class="hljs-keyword">var</span> durationTime = <span class="hljs-number">4000</span> + <span class="hljs-number">7000</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//随机生成雪花下落 开始 时的透明度</span>
                <span class="hljs-keyword">var</span> startOpacity = <span class="hljs-number">0.7</span> + <span class="hljs-number">0.3</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//随机生成雪花下落 结束 时的透明度</span>
                <span class="hljs-keyword">var</span> endOpacity = <span class="hljs-number">0.2</span> + <span class="hljs-number">0.2</span> * <span class="hljs-built_in">Math</span>.random();

                <span class="hljs-comment">//3、克隆一个雪花模板,定义雪花的初始样式，拼接到页面中</span>
                flake.clone().appendTo($(<span class="hljs-string">"body"</span>)).css({
                    <span class="hljs-string">"left"</span>: startLeft,
                    <span class="hljs-string">"opacity"</span>: startOpacity,
                    <span class="hljs-string">"font-size"</span>: flakeSize,
                    <span class="hljs-string">"top"</span>: <span class="hljs-string">"-25px"</span>,
                }).animate({ <span class="hljs-comment">//执行动画</span>
                    <span class="hljs-string">"left"</span>: endLeft,
                    <span class="hljs-string">"opacity"</span>: endOpacity,
                    <span class="hljs-string">"top"</span>: documentHieght
                }, durationTime, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">//4、当雪花落下后，删除雪花。</span>
                    $(<span class="hljs-keyword">this</span>).remove(); 
                });
            }, millisec);
        };
        snow();
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="前端简单说" title="前端简单说" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单说 JavaScript实现雪花飘落效果

## 原文链接
[https://segmentfault.com/a/1190000012225458](https://segmentfault.com/a/1190000012225458)

