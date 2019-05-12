---
title: '用javascript写一个emoji表情插件' 
date: 2019-01-14 2:30:07
hidden: true
slug: qzi4v7psu1o
categories: [reprint]
---

{{< raw >}}

                    
<p>很久没有写文章了，说实话本人现在受困于五月病已经快变成一条死咸鱼了(T_T)，本次就当写一个简单的js插件教程了。本项目的代码相对比较简单，至于里面有些变量命名的问题就请你们不要吐槽了Σ(ﾟдﾟlll)（好的，我承认我英语就小学水平好吧。除了hello和goodbye其他的都不会了____orz）。 废话就讲到这里，下面开始正文。</p>
<p>demo: <a href="http://lonelymoon.linux2.jiuhost.com/wantEmoji/" rel="nofollow noreferrer" target="_blank">我是demo</a><br>git : <a href="https://github.com/lonelymoon/projects/tree/master/wantPlugs/wantEmoji" rel="nofollow noreferrer" target="_blank">我是项目git</a><br>下载地址： <a href="http://lonelymoon.linux2.jiuhost.com/wantEmoji/wantEmoji.zip" rel="nofollow noreferrer" target="_blank">点我下载</a></p>
<h2 id="articleHeader0">1. 事前准备</h2>
<p>事实上在写一个插件前我们都需要事先想好你要实现哪些功能，怎么去实现，这些大方向的东西是需要事先考虑的，至于具体细节和优化选项我们可以在写代码的过程中再进行修改。</p>
<p>就以我们写的这个emoji插件为例，网上已经有一些相关的插件了，但你总感觉有些部分的需求不能被满足（如：可以自行添加新的表情包而不用去改源代码等等），这时我们就可以列出你想实现的功能项了：</p>
<ol>
<li><p>需要满足基本的表情插件的需求，包括图片和对应code的相互转换</p></li>
<li><p>希望可以通过参数来调整每行以及每列表情图片的显示个数，并且可以针对不同表情包单独调整</p></li>
<li><p>希望用户可以在不了解源代码的情况下也能自行主动添加新的表情包</p></li>
<li><p>模板界面简单，可以进行自适应，并且兼容移动端</p></li>
<li><p>尽可能只提供简单的api接口和方法，避免内部涉及其他不是很相关的功能（如绑定某个特定的元素或者在内部进行数据传输等等），保持插件的灵活性等等</p></li>
</ol>
<p>以上就是我们暂时能想到的功能和需求，下面就开始写一个完整的插件了（当然原生js插件某种程度来讲使用起来相对比较自由，因为不需要依赖某些特定库，而且也不需要按照某些库类的格式标准进行插件的编写，但少了一些封装好的方法也会使得插件写起来更费力，至于怎么取舍就需要看个人需求来定了）</p>
<h2 id="articleHeader1">2. 进行结构划分</h2>
<p>当我们正式开始代码编写的时候，当然想自己写出来的代码不敢说很强势，但至少结构清晰，易于读懂，而且代码的性能也需要保证。这时我们就需要回到前面的需求了，由上面列出的5点可以看出，大部分的功能需求都是在我们程序内部去实现的，唯一需要考虑的是上面的第3点。</p>
<p>这时我们可能已经想到办法了，比如说将新的表情包填好相关的参数后由接口传入程序内部去作处理。当然这是一个合理的选择，但考虑到代码的复杂度和使用的简易度，我们最好还是建立一个对应config文件。因为首先这样我们可以提供一些默认的表情包，并且配置好相关的参数并注释，后面的使用者只需要按照相关的格式复制然后修改就行了。而且将一些非逻辑性的数据单独隔离开来有利于维持清晰的代码结构，增加代码的易读性。所以到这里已经可以基本上确定我们需要的文件了：</p>
<ol><li><p>一个模板css文件; 2. 一个数据配置文件config.js; 3. 一个逻辑实现文件js;</p></li></ol>
<h2 id="articleHeader2">3. 填写配置文件</h2>
<p>这里先填写配置文件是为了有一个更明确的需求，以及防止在coding过程中忘记了某些需求（像我一样，老了，脑袋不好使ﾟﾟ(ﾟ´Д｀ﾟ)ﾟ），当然并不是所有插件都用配置文件比较好，新手请务必不要有这样的误区，下面是我写的配置代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    var path = &quot;http://localhost/wantEmoji/&quot;,  //项目所在的根地址
    emojis = {
        &quot;paopao&quot; : {
            &quot;name&quot; : &quot;泡泡&quot;, //名字
            &quot;col&quot; : 10, //每一行最大的表情个数(建议填选的时候值不要太大或太小)
            &quot;path&quot; : path+&quot;emojiSources/paopao/&quot;, //相对于项目根地址的路径
            &quot;enable&quot; : true, //是否启用本表情包
            &quot;sources&quot; : [&quot;1.jpg&quot;] //中间的值也支持{title:&quot;笑&quot;,url:&quot;1.jpg&quot;}的形式,且可单独设置
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>
    var <span class="hljs-built_in">path</span> = <span class="hljs-string">"http://localhost/wantEmoji/"</span>,  <span class="hljs-comment">//项目所在的根地址</span>
    emojis = {
        <span class="hljs-string">"paopao"</span> : {
            <span class="hljs-string">"name"</span> : <span class="hljs-string">"泡泡"</span>, <span class="hljs-comment">//名字</span>
            <span class="hljs-string">"col"</span> : <span class="hljs-number">10</span>, <span class="hljs-comment">//每一行最大的表情个数(建议填选的时候值不要太大或太小)</span>
            <span class="hljs-string">"path"</span> : <span class="hljs-built_in">path</span>+<span class="hljs-string">"emojiSources/paopao/"</span>, <span class="hljs-comment">//相对于项目根地址的路径</span>
            <span class="hljs-string">"enable"</span> : <span class="hljs-literal">true</span>, <span class="hljs-comment">//是否启用本表情包</span>
            <span class="hljs-string">"sources"</span> : [<span class="hljs-string">"1.jpg"</span>] <span class="hljs-comment">//中间的值也支持{title:"笑",url:"1.jpg"}的形式,且可单独设置</span>
        }
    }
</code></pre>
<p>这部分代码考虑了几个点：<br>一是考虑到可能会在不同路径的文件中调用同一个配置文件，所以为了保证路径不出错，需要确定每个包的绝对路径值。<br>二是考虑到某些表情包现在可能并不想用，但代码删来删去可能会很麻烦，所以提供了一个是否启用的接口。<br>三是考虑到不同表情包的图片尺寸可能不同，为了让每张图片尽可能清晰我们允许调整每行显示的图片个数（在程序中每个单项的size都是自动计算的）<br>四是考虑到每张表情图片可能有的需要设置title来提示用户这个表情是什么意思，所以允许sources项数组中的值可以为string也可以为object<br>最后也是主要考虑的问题，我们希望每个表情对应的code值能够自动生成而不是人为的对每个图片去进行单独设置，所以需要保证每个code的值都是唯一的，而且是容易被解析的。<br>这里emojis变量不是数组而是对象就是基于这个原因。 （我们最终生成的code值为[wem:emojis的key值_图片名_图片类型:wem]这种形式，如[wem:paopao_1_jpg:wem]，表示的是paopao表情包里面的1.jpg)</p>
<h2 id="articleHeader3">4. 插件开写</h2>
<p>前面的准备工作都做好后，现在我们终于可以开始写真正的代码了。虽然前面的内容不怎么多，但对于一个插件乃至一个项目来说都是必不可少的一个步骤，特别是初学者，开始动手写自己的插件时多想想该怎么做总是没错的。</p>
<p>首先我们需要创建一个对象（当然你通过闭包来写也是可以的），明确好哪些数据和函数是可以共用的，哪些是不能共用的。就我个人的经验来讲，一般对于用来保存数据用的变量，最好都放在函数体内，而方法则都放在原型上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var wantEmoji = function(options){
    options = options || {};
    var selector = options.wrapper || &quot;body&quot;;  

    this.wrapper = document.querySelector(selector);    //包裹元素
    this.row = options.row || 4;                          //每页表情的行数
    this.callback = options.callback || function(){};     //当表情被点击时的回调，返回表情的code值

    this.emojis = window.emojis || emojis;        //加载表情包配置

    this.content = null;                   //.wEmoji-content
    this.navRow = null;                    //.wEmoji-row
    this.currentWrapper = null;         //.wEmoji-wrapper[data-choose=&quot;true&quot;]

    this.activePage = 0;
    this.totalPage = 0;
    this.eachPartsNum = 4;                 //每一批显示的表情包数(导航栏的表情包的最大显示个数)

    this.wrapWidth = 0;
    this.count = this.getEMJPackageCount();
    
    if(options.autoInit) //当设置了autoInit之后会自动调用init函数，默认不会
    this.init();
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> wantEmoji = function(options){
    options = options || {};
    <span class="hljs-keyword">var</span> selector = options.wrapper || <span class="hljs-string">"body"</span>;  

    <span class="hljs-keyword">this</span>.wrapper = document.querySelector(selector);    <span class="hljs-comment">//包裹元素</span>
    <span class="hljs-keyword">this</span>.row = options.row || <span class="hljs-number">4</span>;                          <span class="hljs-comment">//每页表情的行数</span>
    <span class="hljs-keyword">this</span>.callback = options.callback || function(){};     <span class="hljs-comment">//当表情被点击时的回调，返回表情的code值</span>

    <span class="hljs-keyword">this</span>.emojis = window.emojis || emojis;        <span class="hljs-comment">//加载表情包配置</span>

    <span class="hljs-keyword">this</span>.content = <span class="hljs-literal">null</span>;                   <span class="hljs-comment">//.wEmoji-content</span>
    <span class="hljs-keyword">this</span>.navRow = <span class="hljs-literal">null</span>;                    <span class="hljs-comment">//.wEmoji-row</span>
    <span class="hljs-keyword">this</span>.currentWrapper = <span class="hljs-literal">null</span>;         <span class="hljs-comment">//.wEmoji-wrapper[data-choose="true"]</span>

    <span class="hljs-keyword">this</span>.activePage = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.totalPage = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.eachPartsNum = <span class="hljs-number">4</span>;                 <span class="hljs-comment">//每一批显示的表情包数(导航栏的表情包的最大显示个数)</span>

    <span class="hljs-keyword">this</span>.wrapWidth = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.count = <span class="hljs-keyword">this</span>.getEMJPackageCount();
    
    <span class="hljs-keyword">if</span>(options.autoInit) <span class="hljs-comment">//当设置了autoInit之后会自动调用init函数，默认不会</span>
    <span class="hljs-keyword">this</span>.init();
};
</code></pre>
<p>上面的代码我都加了注释就不做细说了，下面是各个功能部分的实现（马上就可以看到我英语捉急的地方了(｀・ω・´)）。</p>
<p>首先是init(): 完成某些数据的获取以及确认进入哪种情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="init : function(){
        //当表情包的实际启用个数大于设定值时，启用.wEmoji-more
        if(this.count > this.eachPartsNum)
        this.wrapper.className += &quot; wEmoji wEmoji-more&quot;;
        else
        this.wrapper.className += &quot; wEmoji&quot;;

        this.wrapWidth = this.wrapper.clientWidth;

        this.initTemplete();
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>init : function(){
        <span class="hljs-comment">//当表情包的实际启用个数大于设定值时，启用.wEmoji-more</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.count &gt; <span class="hljs-keyword">this</span>.eachPartsNum)
        <span class="hljs-keyword">this</span>.wrapper.className += <span class="hljs-string">" wEmoji wEmoji-more"</span>;
        <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">this</span>.wrapper.className += <span class="hljs-string">" wEmoji"</span>;

        <span class="hljs-keyword">this</span>.wrapWidth = <span class="hljs-keyword">this</span>.wrapper.clientWidth;

        <span class="hljs-keyword">this</span>.initTemplete();
},</code></pre>
<p>initTemplete(): 初始化模板，更新某些数据变量，并执行接下来的工作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initTemplete : function(){

        var wrapper = this.wrapper,
            tpl = '<div class=&quot;wEmoji-header&quot;>'+
                    '<div class=&quot;wEmoji-prev-btn&quot;>&amp;lt;</div>'+
                    '<div class=&quot;wEmoji-nav&quot;>'+
                        '<div class=&quot;wEmoji-row&quot;></div>'+
                    '</div>'+
                    '<div class=&quot;wEmoji-next-btn&quot;>&amp;gt;</div>'+
                '</div>'+
                '<div class=&quot;wEmoji-container&quot;>'+
                    '<div class=&quot;wEmoji-content&quot;></div>'+
                    '<div class=&quot;wEmoji-pages&quot;></div>'+
                '</div>';

        wrapper.innerHTML = tpl;

        this.content = wrapper.querySelector(&quot;.wEmoji-content&quot;);
        this.navRow = wrapper.querySelector(&quot;.wEmoji-row&quot;);

        this.__initData();
        this.__bindEvent();
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>initTemplete : function(){

        var wrapper = this.wrapper,
            tpl = '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-header"</span>&gt;'+
                    '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-prev-btn"</span>&gt;&amp;lt;&lt;/<span class="hljs-keyword">div</span>&gt;'+
                    '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-nav"</span>&gt;'+
                        '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-row"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;'+
                    '&lt;/<span class="hljs-keyword">div</span>&gt;'+
                    '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-next-btn"</span>&gt;&amp;gt;&lt;/<span class="hljs-keyword">div</span>&gt;'+
                '&lt;/<span class="hljs-keyword">div</span>&gt;'+
                '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-container"</span>&gt;'+
                    '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-content"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;'+
                    '&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wEmoji-pages"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;'+
                '&lt;/<span class="hljs-keyword">div</span>&gt;';

        wrapper.innerHTML = tpl;

        this.content = wrapper.querySelector(<span class="hljs-string">".wEmoji-content"</span>);
        this.navRow = wrapper.querySelector(<span class="hljs-string">".wEmoji-row"</span>);

        this.__initData();
        this.__bindEvent();
},</code></pre>
<p>接下来是__initData():生成具体的表情图片和导航等，这里需要注意的是进行dom操作时不要让重排发生多次，使需要操作的dom元素脱离文档流是减少重排的方法之一。另外这里还将许多属性保存为临时变量是为了提高程序性能（至于代码优化需要自己去找资料看，这里就简单提一下）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__initData : function(){
        var emojis = this.emojis,
            wrapper = this.wrapper,
            navRow = this.navRow,
            content = this.content,
            rowWidth = navRow.clientWidth,
            count = this.count;

        //减少重排
        wrapper.style.display = &quot;none&quot;;

        content.innerHTML = &quot;&quot;;
        navRow.style.width = count / this.eachPartsNum * 100 + &quot;%&quot;;

        for( var key in emojis ){
            var emj = emojis[key];

            if(!emj.enable)
            continue;
            //将每个生成的表情包的容器放入content中
            content.appendChild(this.__initContent(key,emj)); 
            navRow.innerHTML += '<div class=&quot;wEmoji-list&quot; data-eid=&quot;'+key+'&quot; style=&quot;width:'+(1/count*100)+'%;&quot;>'+emj.name+'</div>';
        }

        this.__initStyle();

        this.wrapper.style.display = &quot;block&quot;;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>__initData : function(){
        <span class="hljs-keyword">var</span> emojis = <span class="hljs-keyword">this</span>.emojis,
            wrapper = <span class="hljs-keyword">this</span>.wrapper,
            navRow = <span class="hljs-keyword">this</span>.navRow,
            content = <span class="hljs-keyword">this</span>.content,
            rowWidth = navRow.clientWidth,
            count = <span class="hljs-keyword">this</span>.count;

        <span class="hljs-comment">//减少重排</span>
        wrapper.style.display = <span class="hljs-string">"none"</span>;

        content.innerHTML = <span class="hljs-string">""</span>;
        navRow.style.width = count / <span class="hljs-keyword">this</span>.eachPartsNum * <span class="hljs-number">100</span> + <span class="hljs-string">"%"</span>;

        <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> emojis ){
            <span class="hljs-keyword">var</span> emj = emojis[key];

            <span class="hljs-keyword">if</span>(!emj.enable)
            <span class="hljs-keyword">continue</span>;
            <span class="hljs-comment">//将每个生成的表情包的容器放入content中</span>
            content.appendChild(<span class="hljs-keyword">this</span>.__initContent(key,emj)); 
            navRow.innerHTML += <span class="hljs-string">'&lt;div class="wEmoji-list" data-eid="'</span>+key+<span class="hljs-string">'" style="width:'</span>+(<span class="hljs-number">1</span>/count*<span class="hljs-number">100</span>)+<span class="hljs-string">'%;"&gt;'</span>+emj.name+<span class="hljs-string">'&lt;/div&gt;'</span>;
        }

        <span class="hljs-keyword">this</span>.__initStyle();

        <span class="hljs-keyword">this</span>.wrapper.style.display = <span class="hljs-string">"block"</span>;
},</code></pre>
<p>事件绑定：正常流程来走就行，注意某些地方需要用事件委托来提升性能，而这里没用addEventListener是为了防止多次初始化init的时候导致事件重复绑定，on+“event”事实上已经够用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="__bindEvent : function(){
        var _self = this,
            wrapper = this.wrapper,
            row = this.navRow,
            pageBox = wrapper.querySelector('.wEmoji-pages'),
            prev = wrapper.querySelector('.wEmoji-prev-btn'),
            next = wrapper.querySelector('.wEmoji-next-btn'),
            content = this.content,
            down = &quot;ontouchstart&quot; in document ? &quot;touchstart&quot; : &quot;mousedown&quot;,
            up = &quot;ontouchend&quot; in document ? &quot;touchend&quot; : &quot;mouseup&quot;,
            move = &quot;ontouchmove&quot; in document ? &quot;touchmove&quot; : &quot;mousemove&quot;,
            drag = false,
            x = 0;

        pageBox.onclick = function(e){
            e = e || event;
            var target = e.target || e.srcElement,
                idx = target.getAttribute(&quot;data-pageIdx&quot;);
            if(target.tagName.toLowerCase() != &quot;li&quot; || !idx){
                return false;
            }
            _self.showPage(idx-1);
        };

        row.onclick = function(e){
            e = e || event;
            var target = e.target || e.srcElement,
                eid = target.getAttribute(&quot;data-eid&quot;);

            if( eid &amp;&amp; _self.emojis[eid] ){
                _self.chooseEmoji(eid);
                _self.showPage(0);
            }
        };

        var parts = Math.ceil(this.count / this.eachPartsNum), //可以将表情包数分为N批（默认4个一批）
            partsIdx = 0,
            navWidth = wrapper.querySelector(&quot;.wEmoji-nav&quot;).clientWidth;

        prev.onclick = function(e){
            partsIdx = partsIdx - 1 < 0 ? 0 : partsIdx - 1;
            row.style.webkitTransform = &quot;translateX(&quot;+(-partsIdx * navWidth)+&quot;px) translateZ(0px)&quot;;
            row.style.transform = &quot;translateX(&quot;+(-partsIdx * navWidth)+&quot;px) translateZ(0px)&quot;;
        };

        next.onclick = function(e){
            partsIdx = partsIdx + 1 >= parts ? partsIdx : partsIdx + 1;
            row.style.webkitTransform = &quot;translateX(&quot;+(-partsIdx * navWidth)+&quot;px) translateZ(0px)&quot;;
            row.style.transform = &quot;translateX(&quot;+(-partsIdx * navWidth)+&quot;px) translateZ(0px)&quot;;
        };

        content.onclick = function(e){
            e = e || event;
            var target = e.target || e.srcElement,
                trueTarget = getTargetNode(target,&quot;.wEmoji-item&quot;),
                emjCode;

            if(trueTarget)
            emjCode = trueTarget.getAttribute(&quot;data-emj&quot;);

            if(!emjCode)
            return false;

            _self.callback.call(_self,emjCode);
            console.log(emjCode);
        };

        content[&quot;on&quot;+down] = function(e){
            e = e || event;
            drag = true;
            x = e.pageX || e.touches[0].pageX;
        };

        content[&quot;on&quot;+move] = function(e){
            e = e || event;
            e.stopPropagation();
            e.preventDefault();
        };

        content[&quot;on&quot;+up] = function(e){
            e = e || event;
            if(drag){
                drag = false;
                var endX = e.pageX || e.changedTouches[0].pageX,
                    dis = endX - x,
                    idx;

                if(dis > 50){
                    idx = Math.max(_self.activePage - 1,0);
                    _self.showPage(idx);
                } else if (dis < -50){
                    idx = Math.min(_self.activePage + 1,_self.totalPage - 1);
                    _self.showPage(idx);
                }
                x = 0;
            }
        };

}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>__bindEvent : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> _self = <span class="hljs-keyword">this</span>,
            wrapper = <span class="hljs-keyword">this</span>.wrapper,
            row = <span class="hljs-keyword">this</span>.navRow,
            pageBox = wrapper.querySelector(<span class="hljs-string">'.wEmoji-pages'</span>),
            prev = wrapper.querySelector(<span class="hljs-string">'.wEmoji-prev-btn'</span>),
            next = wrapper.querySelector(<span class="hljs-string">'.wEmoji-next-btn'</span>),
            content = <span class="hljs-keyword">this</span>.content,
            down = <span class="hljs-string">"ontouchstart"</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span> ? <span class="hljs-string">"touchstart"</span> : <span class="hljs-string">"mousedown"</span>,
            up = <span class="hljs-string">"ontouchend"</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span> ? <span class="hljs-string">"touchend"</span> : <span class="hljs-string">"mouseup"</span>,
            move = <span class="hljs-string">"ontouchmove"</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span> ? <span class="hljs-string">"touchmove"</span> : <span class="hljs-string">"mousemove"</span>,
            drag = <span class="hljs-literal">false</span>,
            x = <span class="hljs-number">0</span>;

        pageBox.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e = e || event;
            <span class="hljs-keyword">var</span> target = e.target || e.srcElement,
                idx = target.getAttribute(<span class="hljs-string">"data-pageIdx"</span>);
            <span class="hljs-keyword">if</span>(target.tagName.toLowerCase() != <span class="hljs-string">"li"</span> || !idx){
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            }
            _self.showPage(idx<span class="hljs-number">-1</span>);
        };

        row.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e = e || event;
            <span class="hljs-keyword">var</span> target = e.target || e.srcElement,
                eid = target.getAttribute(<span class="hljs-string">"data-eid"</span>);

            <span class="hljs-keyword">if</span>( eid &amp;&amp; _self.emojis[eid] ){
                _self.chooseEmoji(eid);
                _self.showPage(<span class="hljs-number">0</span>);
            }
        };

        <span class="hljs-keyword">var</span> parts = <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.count / <span class="hljs-keyword">this</span>.eachPartsNum), <span class="hljs-comment">//可以将表情包数分为N批（默认4个一批）</span>
            partsIdx = <span class="hljs-number">0</span>,
            navWidth = wrapper.querySelector(<span class="hljs-string">".wEmoji-nav"</span>).clientWidth;

        prev.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            partsIdx = partsIdx - <span class="hljs-number">1</span> &lt; <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : partsIdx - <span class="hljs-number">1</span>;
            row.style.webkitTransform = <span class="hljs-string">"translateX("</span>+(-partsIdx * navWidth)+<span class="hljs-string">"px) translateZ(0px)"</span>;
            row.style.transform = <span class="hljs-string">"translateX("</span>+(-partsIdx * navWidth)+<span class="hljs-string">"px) translateZ(0px)"</span>;
        };

        next.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            partsIdx = partsIdx + <span class="hljs-number">1</span> &gt;= parts ? partsIdx : partsIdx + <span class="hljs-number">1</span>;
            row.style.webkitTransform = <span class="hljs-string">"translateX("</span>+(-partsIdx * navWidth)+<span class="hljs-string">"px) translateZ(0px)"</span>;
            row.style.transform = <span class="hljs-string">"translateX("</span>+(-partsIdx * navWidth)+<span class="hljs-string">"px) translateZ(0px)"</span>;
        };

        content.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e = e || event;
            <span class="hljs-keyword">var</span> target = e.target || e.srcElement,
                trueTarget = getTargetNode(target,<span class="hljs-string">".wEmoji-item"</span>),
                emjCode;

            <span class="hljs-keyword">if</span>(trueTarget)
            emjCode = trueTarget.getAttribute(<span class="hljs-string">"data-emj"</span>);

            <span class="hljs-keyword">if</span>(!emjCode)
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;

            _self.callback.call(_self,emjCode);
            <span class="hljs-built_in">console</span>.log(emjCode);
        };

        content[<span class="hljs-string">"on"</span>+down] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e = e || event;
            drag = <span class="hljs-literal">true</span>;
            x = e.pageX || e.touches[<span class="hljs-number">0</span>].pageX;
        };

        content[<span class="hljs-string">"on"</span>+move] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e = e || event;
            e.stopPropagation();
            e.preventDefault();
        };

        content[<span class="hljs-string">"on"</span>+up] = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
            e = e || event;
            <span class="hljs-keyword">if</span>(drag){
                drag = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">var</span> endX = e.pageX || e.changedTouches[<span class="hljs-number">0</span>].pageX,
                    dis = endX - x,
                    idx;

                <span class="hljs-keyword">if</span>(dis &gt; <span class="hljs-number">50</span>){
                    idx = <span class="hljs-built_in">Math</span>.max(_self.activePage - <span class="hljs-number">1</span>,<span class="hljs-number">0</span>);
                    _self.showPage(idx);
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (dis &lt; <span class="hljs-number">-50</span>){
                    idx = <span class="hljs-built_in">Math</span>.min(_self.activePage + <span class="hljs-number">1</span>,_self.totalPage - <span class="hljs-number">1</span>);
                    _self.showPage(idx);
                }
                x = <span class="hljs-number">0</span>;
            }
        };

},</code></pre>
<p>下面是选择表情包的功能chooseEmoji()：封装好后只需要调用接口即可，不管是初始化的时候还是事件触发的时候，将表情包改变时会发生操作全都放一起，因为大部分操作都是同时变化的，所以没必要继续细分了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chooseEmoji : function(eid){
        var navRow = this.navRow,
            content = this.content,
            targetWrapper = content.querySelector(&quot;.wEmoji-wrapper[data-eid='&quot;+eid+&quot;']&quot;),
            targetList = navRow.querySelector(&quot;.wEmoji-list[data-eid='&quot;+eid+&quot;']&quot;),
            chooseWrapper = content.querySelector(&quot;.wEmoji-wrapper[data-choose='true']&quot;),
            chooseList = navRow.querySelector(&quot;.wEmoji-list[data-choose='true']&quot;);

        if(chooseWrapper){
            chooseList.setAttribute(&quot;data-choose&quot;,&quot;false&quot;);
            chooseWrapper.setAttribute(&quot;data-choose&quot;,&quot;false&quot;);
        }
        targetWrapper.setAttribute(&quot;data-choose&quot;,&quot;true&quot;);
        targetList.setAttribute(&quot;data-choose&quot;,&quot;true&quot;);

        this.currentWrapper = targetWrapper;
        this.__createPageList();
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>chooseEmoji : function(eid){
        <span class="hljs-keyword">var</span> navRow = <span class="hljs-keyword">this</span>.navRow,
            content = <span class="hljs-keyword">this</span>.content,
            targetWrapper = content.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">".wEmoji-wrapper[data-eid='"</span>+eid+<span class="hljs-string">"']"</span>),
            targetList = navRow.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">".wEmoji-list[data-eid='"</span>+eid+<span class="hljs-string">"']"</span>),
            chooseWrapper = content.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">".wEmoji-wrapper[data-choose='true']"</span>),
            chooseList = navRow.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">".wEmoji-list[data-choose='true']"</span>);

        <span class="hljs-keyword">if</span>(chooseWrapper){
            chooseList.setAttribute(<span class="hljs-string">"data-choose"</span>,<span class="hljs-string">"false"</span>);
            chooseWrapper.setAttribute(<span class="hljs-string">"data-choose"</span>,<span class="hljs-string">"false"</span>);
        }
        targetWrapper.setAttribute(<span class="hljs-string">"data-choose"</span>,<span class="hljs-string">"true"</span>);
        targetList.setAttribute(<span class="hljs-string">"data-choose"</span>,<span class="hljs-string">"true"</span>);

        <span class="hljs-keyword">this</span>.currentWrapper = targetWrapper;
        <span class="hljs-keyword">this</span>.__createPageList();
},</code></pre>
<p>下面是页面的切换showPage()：完成初始化和事件触发时页面的切换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="showPage : function(idx){
        this.activePage = idx;
        var wrapper = this.wrapper,
            currentWrapper = this.currentWrapper,
            pageTargetList = wrapper.querySelector(&quot;.wEmoji-page-list[data-pageIdx='&quot;+(idx+1)+&quot;']&quot;),
            pageChoose = wrapper.querySelector(&quot;.wEmoji-page-list[data-choose='true']&quot;);

        if(pageChoose)
        pageChoose.setAttribute(&quot;data-choose&quot;,&quot;false&quot;);
        pageTargetList.setAttribute(&quot;data-choose&quot;,&quot;true&quot;);

        currentWrapper.style.webkitTransform = &quot;translateX(&quot;+(-this.wrapWidth*idx)+&quot;px) translateZ(0px)&quot;;
        currentWrapper.style.transform = &quot;translateX(&quot;+(-this.wrapWidth*idx)+&quot;px) translateZ(0px)&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>showPage : function(idx){
        <span class="hljs-keyword">this</span>.activePage = idx;
        <span class="hljs-keyword">var</span> wrapper = <span class="hljs-keyword">this</span>.wrapper,
            currentWrapper = <span class="hljs-keyword">this</span>.currentWrapper,
            pageTargetList = wrapper.querySelector(<span class="hljs-string">".wEmoji-page-list[data-pageIdx='"</span>+(idx+<span class="hljs-number">1</span>)+<span class="hljs-string">"']"</span>),
            pageChoose = wrapper.querySelector(<span class="hljs-string">".wEmoji-page-list[data-choose='true']"</span>);

        <span class="hljs-keyword">if</span>(pageChoose)
        pageChoose.setAttribute(<span class="hljs-string">"data-choose"</span>,<span class="hljs-string">"false"</span>);
        pageTargetList.setAttribute(<span class="hljs-string">"data-choose"</span>,<span class="hljs-string">"true"</span>);

        currentWrapper.style.webkitTransform = <span class="hljs-string">"translateX("</span>+(-<span class="hljs-keyword">this</span>.wrapWidth*idx)+<span class="hljs-string">"px) translateZ(0px)"</span>;
        currentWrapper.style.transform = <span class="hljs-string">"translateX("</span>+(-<span class="hljs-keyword">this</span>.wrapWidth*idx)+<span class="hljs-string">"px) translateZ(0px)"</span>;
}</code></pre>
<p>最后一个是将code解释成img的功能函数explain(): 大家通过前面的介绍可以知道code的生成规则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="explain : function(str){
        var reg = /\[wem:(\w+):wem\]/g,
            _self = this;

        return str.replace(reg,function(str,target){
            var tempArr = target.split(&quot;_&quot;),
                eid = tempArr.shift(),
                type = tempArr.pop(),
                name = tempArr.join(&quot;_&quot;);
                path = _self.emojis[eid].path;
                url = name+&quot;.&quot;+type;

            return '<img src=&quot;'+path+url+'&quot; />';
        });
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-attribute">explain</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str</span>)</span>{
        <span class="hljs-built_in">var</span> reg = <span class="hljs-regexp">/\[wem:(\w+):wem\]/g</span>,
            _self = <span class="hljs-keyword">this</span>;

        <span class="hljs-keyword">return</span> str.replace(reg,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">str,target</span>)</span>{
            <span class="hljs-built_in">var</span> tempArr = target.split(<span class="hljs-string">"_"</span>),
                eid = tempArr.shift(),
                type = tempArr.pop(),
                name = tempArr.join(<span class="hljs-string">"_"</span>);
                path = _self.emojis[eid].path;
                <span class="hljs-built_in">url</span> = name+<span class="hljs-string">"."</span>+type;

            <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;img src="'</span>+path+<span class="hljs-built_in">url</span>+<span class="hljs-string">'" /&gt;'</span>;
        });
},</code></pre>
<p>基本上主要代码就这么多了，还有一部分代码可以看源代码来了解，因为我基本上都有写注释所以应该不怎么难理解。</p>
<h2 id="articleHeader4">5. 结语</h2>
<p>虽然我很想进一步把教程写完全，但基于本人身体已经被掏空的现实情况考虑，就不做打算了，效果的话可以点开上面的demo去看，大家有什么问题欢迎留言提问，以后会不定时写一些插件，到时候也欢迎大家来捧场，以上（写完要死了(ง ° ͜  °)ง)。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用javascript写一个emoji表情插件

## 原文链接
[https://segmentfault.com/a/1190000009455711](https://segmentfault.com/a/1190000009455711)

