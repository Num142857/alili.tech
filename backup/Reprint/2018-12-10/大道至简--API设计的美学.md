---
title: '大道至简--API设计的美学' 
date: 2018-12-10 2:30:07
hidden: true
slug: y0n8iwoku3p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>对于前端开发而言，肯定会和API打交道，大家也都会想过怎么设计自己的API。优秀的 API 之于代码，就如良好内涵对于每个人。好的 API 不但利于使用者理解，开发时也会事半功倍，后期维护更是顺风顺水。至于怎么设计API，今天就提下我自己的一些建议。如果大家有什么好的想法，欢迎指点。</p>
<h2 id="articleHeader1">2.命名</h2>
<p>良好的一个命名习惯，就是效率开发的第一步。如果命名规范，对自己而言，文件整理有很大的帮助，后期修改文件、可以快速的定位文件，命名规范，也显得自己专业。对团队而言，如果有统一的规范命名，交接时可以减少大量的学习和沟通成本。</p>
<p>关于命名，下面提点几个小建议</p>
<h3 id="articleHeader2">2-1.正确拼写</h3>
<p>这个应该说是命名的一个底线了，经常性出现，单词拼写错误，搞得自己或者团队的人都一头雾水的情况不再少数。我遇到情况比较深刻的有</p>
<table>
<thead><tr>
<th>中文大意</th>
<th>期望</th>
<th>实际</th>
</tr></thead>
<tbody>
<tr>
<td>表单</td>
<td>form</td>
<td>from</td>
</tr>
<tr>
<td>报名</td>
<td>sign-up</td>
<td>sign-in</td>
</tr>
<tr>
<td>采纳</td>
<td>adopt</td>
<td>adept</td>
</tr>
<tr>
<td>内容</td>
<td>content</td>
<td>contend</td>
</tr>
<tr>
<td>测试</td>
<td>test</td>
<td>text</td>
</tr>
<tr>
<td>联系</td>
<td>contact</td>
<td>contract</td>
</tr>
<tr>
<td>高度</td>
<td>height</td>
<td>heigth</td>
</tr>
<tr>
<td>宽度</td>
<td>width</td>
<td>widht</td>
</tr>
<tr>
<td>移动</td>
<td>mobile</td>
<td>moblie</td>
</tr>
<tr>
<td>标签</td>
<td>tab</td>
<td>tap</td>
</tr>
</tbody>
</table>
<p>这些单词，如果是拼写错误还好，至少编辑器都会提醒。但是如果写错了，但是单词又是正确的单词就可大可小了（表单，报名，采纳，内容这些例子，单词写错了，意思变了，但是单词是正确的，编辑器都不会提醒）。</p>
<p><strong>试过挖坑比较深的一次就是：一个活动，有报名，有签到的功能！处理方法如下</strong></p>
<p>获取已报名用户信息：getSignUpUserList，<br>重置报名的数据：resetSignUpUser，<br>提交报名操作：signInDo</p>
<p>获取已签到用户信息：getSignInUserList，<br>重置签到的表单数据：resetSignInUser，<br>提交签到的操作：signUpDo</p>
<p>修改bug的时候，完全懵逼了，原因大家懂的。</p>
<h3 id="articleHeader3">2-2.注意单复数</h3>
<p>所有涉及遍历，操作对象，数组,集合的函数，建议都采用复数。</p>
<blockquote>对于展现复数，不同公司有不同的习惯，但是得统一，比如产品列表-<code>productList</code>。这里用了list表示复数，再其它地方，就不建议使用<code>products</code>这种方式表示复数了</blockquote>
<h3 id="articleHeader4">2-3.用词准确</h3>
<p>这个主要的两方面的内容</p>
<h4>2-3-1.单词意思搞错</h4>
<p>比如弹窗上面的信息，有些时候见到，使用包含<code>notice</code>的字样，但是实际上，<code>notice</code>的中文意思，准确的应该是‘公告，告示，声明’之类。<br>一个弹窗这样的会话消息，建议使用<code>message</code>这个字样。<code>notice</code>应该像‘公告，告示，声明’之类的情况使用。</p>
<h4>2-3-2.正反词义单词错用</h4>
<p>比如关闭弹窗的方法，的方法是<code>closeDialog</code>，然后显示弹窗用的又是<code>showDialog</code>。<code>show</code>的意思是‘显示’，反义词应该是<code>hide</code>‘隐藏’。而<code>close</code>意思是关闭，反义词应该是<code>open</code>。</p>
<p>附常用反义词组（有些带缩写）</p>
<table><tbody>
<tr>
<td>in</td>
<td>out</td>
</tr>
<tr>
<td>on</td>
<td>off</td>
</tr>
<tr>
<td>prev</td>
<td>next</td>
</tr>
<tr>
<td>show</td>
<td>hide</td>
</tr>
<tr>
<td>close</td>
<td>open</td>
</tr>
<tr>
<td>success</td>
<td>fail</td>
</tr>
<tr>
<td>before</td>
<td>after</td>
</tr>
<tr>
<td>begin</td>
<td>end</td>
</tr>
</tbody></table>
<h3 id="articleHeader5">2-4.命名意义</h3>
<p>这一块，本来打算放在2-2里面讲的，因为命名如果有意义也是一个底线。但是最后放在这里，是因为这个情况在函数里面出现得不多，更多应该出现在普通变量里面(相信很多人会遇到过这样的命名：var n1,n2,n3;)。关于命名，还是建议大家要起有意义名称，不使用没意义的命名。</p>
<p>遇到最多的情况，就是图标的命名方面。</p>
<p>比如下面的图标（选自某平台的底部导航栏），点击不同的图标出发不同的方法。</p>
<p><span class="img-wrap"><img data-src="/img/bV56G8?w=303&amp;h=55" src="https://static.alili.tech/img/bV56G8?w=303&amp;h=55" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>很多人喜欢下面的命名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//版本1
function handle1(){

}
function handle2(){

}
//版本2
function handleA(){

}
function handleB(){

}
//版本3
function handleOne(){

}
function handleTwo(){

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//版本1</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle1</span><span class="hljs-params">()</span></span>{

}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handle2</span><span class="hljs-params">()</span></span>{

}
<span class="hljs-comment">//版本2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleA</span><span class="hljs-params">()</span></span>{

}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleB</span><span class="hljs-params">()</span></span>{

}
<span class="hljs-comment">//版本3</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleOne</span><span class="hljs-params">()</span></span>{

}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleTwo</span><span class="hljs-params">()</span></span>{

}
</code></pre>
<p>这样的命名，别人函数了，就算是元素的 class 。这样的命名在后期维护绝对增加了难度。甚至可能导致重构。</p>
<p>建议的姿势</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function handleHome(){

}
function handleCollect(){

}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleHome</span><span class="hljs-params">()</span></span>{

}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleCollect</span><span class="hljs-params">()</span></span>{

}

</code></pre>
<h3 id="articleHeader6">2-5.命名格式</h3>
<p>文章说的API，主要针对的是函数，但是在这一小块里面，也列举一下其它的目标的建议命名方式。</p>
<table>
<thead><tr>
<th>待命名对象</th>
<th>推荐名称</th>
</tr></thead>
<tbody>
<tr>
<td>图片</td>
<td>‘-’   ‘_’ 分割</td>
</tr>
<tr>
<td>class,id</td>
<td>‘-’ 分割</td>
</tr>
<tr>
<td>文件，变量</td>
<td>驼峰命名</td>
</tr>
<tr>
<td>临时变量</td>
<td>‘_’ 开头，驼峰命名</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader7">2-6.处理中文拼音</h3>
<p>对于中文拼音，应该说只有一种情况，被中国人创造出来，没有英文翻译的。</p>
<table>
<thead><tr>
<th>命名</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>taobao</td>
<td>淘宝</td>
</tr>
<tr>
<td>weibo</td>
<td>微博</td>
</tr>
<tr>
<td>zongzi</td>
<td>粽子</td>
</tr>
<tr>
<td>pinyin</td>
<td>拼音</td>
</tr>
</tbody>
</table>
<blockquote>在一年多以前，遇到一个中二的命名-dengluDo。当时一直不知道是什么玩意，后来向那个人打听才知道，是执行登录的操作，denglu是中文拼音，do又是英文，这样的命名。后期如果维护，他不哭，算我输。</blockquote>
<h3 id="articleHeader8">2-7.命名潜规则</h3>
<p>有些情况，给特定的对象命名，还要用特定的名字，可以说是潜规则吧。印象最清楚的就是给按钮命名要么全拼，要么写btn。很清楚的记得我一个老师说过：写but，bto的程序也能正常运行，也没人说你错，但是我做面试官，就是不录用你，就说你不专业。</p>
<table>
<thead><tr>
<th>待命名对象</th>
<th>推荐名称</th>
<th>错误示范</th>
</tr></thead>
<tbody>
<tr>
<td>按钮</td>
<td>btn</td>
<td>but  bto</td>
</tr>
<tr>
<td>背景</td>
<td>bg</td>
<td>back background</td>
</tr>
<tr>
<td>模板</td>
<td>tpl</td>
<td>tem</td>
</tr>
<tr>
<td>提示信息</td>
<td>msg</td>
<td>mes</td>
</tr>
<tr>
<td>标签栏</td>
<td>tab</td>
<td>tit</td>
</tr>
<tr>
<td>网站大图（广告宣传图）</td>
<td>banner</td>
<td>ban</td>
</tr>
<tr>
<td>注册</td>
<td>register</td>
<td>sign-in</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader9">3.参数</h2>
<p>对于函数而言，参数是用户设置最频繁，也是最关心的部分，合理设计函数参数，这一步很重要，直接影响函数的使用。</p>
<h3 id="articleHeader10">3-1.const入参</h3>
<p>这个应该说是一个习惯吧，不要直接改变入参的值。这个规则的初衷是解决函数副作用问题。如果参数是一个引用类型的数据，如果在函数内修改了参数，到时候将会使得原本的数据发生改变，往往会发生难以追踪的问题。</p>
<h3 id="articleHeader11">3-2.控制参数数量</h3>
<p>参数的数量，个人建议就是，超过3个，使用对象进行封装。因为如果API参数越多，那么使用对于这个API的记忆成本就越大，易用性也很受影响。</p>
<p>比如下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="encryptStr: function (str, regArr, type, replacement) {
    var regtext = '',
        Reg = null,
        _type=type||0,
        replaceText = replacement || '*';
    //ecDo.encryptStr('18819322663',[3,5,3],0)
    //result：188*****663
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 &amp;&amp; type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    //ecDo.encryptStr('asdasdasdaa',[3,5,3],1)
    //result：***asdas***
    else if (regArr.length === 3 &amp;&amp; type === 1) {
        regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
        Reg = new RegExp(regtext);
        var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
        var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
        return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    //ecDo.encryptStr('1asd88465asdwqe3',[5],0)
    //result：*****8465asdwqe3
    else if (regArr.length === 1 &amp;&amp; type === 0) {
        regtext = '(^\\w{' + regArr[0] + '})'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
    //ecDo.encryptStr('1asd88465asdwqe3',[5],1,'+')
    //result：&quot;1asd88465as+++++&quot;
    else if (regArr.length === 1 &amp;&amp; type === 1) {
        regtext = '(\\w{' + regArr[0] + '}$)'
        Reg = new RegExp(regtext);
        var replaceCount = this.repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>encryptStr: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">str, regArr, <span class="hljs-keyword">type</span>, replacement</span>) </span>{
    <span class="hljs-keyword">var</span> regtext = <span class="hljs-string">''</span>,
        Reg = <span class="hljs-literal">null</span>,
        _type=<span class="hljs-keyword">type</span>||<span class="hljs-number">0</span>,
        replaceText = replacement || <span class="hljs-string">'*'</span>;
    <span class="hljs-comment">//ecDo.encryptStr('18819322663',[3,5,3],0)</span>
    <span class="hljs-comment">//result：188*****663</span>
    <span class="hljs-comment">//repeatStr是在上面定义过的（字符串循环复制），大家注意哦</span>
    <span class="hljs-keyword">if</span> (regArr.length === <span class="hljs-number">3</span> &amp;&amp; <span class="hljs-keyword">type</span> === <span class="hljs-number">0</span>) {
        regtext = <span class="hljs-string">'(\\w{'</span> + regArr[<span class="hljs-number">0</span>] + <span class="hljs-string">'})\\w{'</span> + regArr[<span class="hljs-number">1</span>] + <span class="hljs-string">'}(\\w{'</span> + regArr[<span class="hljs-number">2</span>] + <span class="hljs-string">'})'</span>
        Reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regtext);
        <span class="hljs-keyword">var</span> replaceCount = <span class="hljs-keyword">this</span>.repeatStr(replaceText, regArr[<span class="hljs-number">1</span>]);
        <span class="hljs-keyword">return</span> str.replace(Reg, <span class="hljs-string">'$1'</span> + replaceCount + <span class="hljs-string">'$2'</span>)
    }
    <span class="hljs-comment">//ecDo.encryptStr('asdasdasdaa',[3,5,3],1)</span>
    <span class="hljs-comment">//result：***asdas***</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (regArr.length === <span class="hljs-number">3</span> &amp;&amp; <span class="hljs-keyword">type</span> === <span class="hljs-number">1</span>) {
        regtext = <span class="hljs-string">'\\w{'</span> + regArr[<span class="hljs-number">0</span>] + <span class="hljs-string">'}(\\w{'</span> + regArr[<span class="hljs-number">1</span>] + <span class="hljs-string">'})\\w{'</span> + regArr[<span class="hljs-number">2</span>] + <span class="hljs-string">'}'</span>
        Reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regtext);
        <span class="hljs-keyword">var</span> replaceCount1 = <span class="hljs-keyword">this</span>.repeatStr(replaceText, regArr[<span class="hljs-number">0</span>]);
        <span class="hljs-keyword">var</span> replaceCount2 = <span class="hljs-keyword">this</span>.repeatStr(replaceText, regArr[<span class="hljs-number">2</span>]);
        <span class="hljs-keyword">return</span> str.replace(Reg, replaceCount1 + <span class="hljs-string">'$1'</span> + replaceCount2)
    }
    <span class="hljs-comment">//ecDo.encryptStr('1asd88465asdwqe3',[5],0)</span>
    <span class="hljs-comment">//result：*****8465asdwqe3</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (regArr.length === <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-keyword">type</span> === <span class="hljs-number">0</span>) {
        regtext = <span class="hljs-string">'(^\\w{'</span> + regArr[<span class="hljs-number">0</span>] + <span class="hljs-string">'})'</span>
        Reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regtext);
        <span class="hljs-keyword">var</span> replaceCount = <span class="hljs-keyword">this</span>.repeatStr(replaceText, regArr[<span class="hljs-number">0</span>]);
        <span class="hljs-keyword">return</span> str.replace(Reg, replaceCount)
    }
    <span class="hljs-comment">//ecDo.encryptStr('1asd88465asdwqe3',[5],1,'+')</span>
    <span class="hljs-comment">//result："1asd88465as+++++"</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (regArr.length === <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-keyword">type</span> === <span class="hljs-number">1</span>) {
        regtext = <span class="hljs-string">'(\\w{'</span> + regArr[<span class="hljs-number">0</span>] + <span class="hljs-string">'}$)'</span>
        Reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regtext);
        <span class="hljs-keyword">var</span> replaceCount = <span class="hljs-keyword">this</span>.repeatStr(replaceText, regArr[<span class="hljs-number">0</span>]);
        <span class="hljs-keyword">return</span> str.replace(Reg, replaceCount)
    }
}
</code></pre>
<p>大家可以看上面的注释，就知道这段代码的具体作用了，如果想想就找个参数，我必须要除了记得4个参数的作用，还要记得参数的顺序。</p>
<p>如果使用对象记录参数，用户只需要记得4个参数的作用，不需要记参数的顺序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="encryptStr: function (obj) {
        var _default={
            type:0,
            replacement:'*'
        };
        for(var key in obj){
            _default[key]=obj[key];
        }
},

//调用方式
ecDo.encryptStr({str:'18819266335',regArr:[5],type:0,replacement:'-'});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>encryptStr: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
        <span class="hljs-keyword">var</span> _default={
            <span class="hljs-keyword">type</span>:<span class="hljs-number">0</span>,
            replacement:<span class="hljs-string">'*'</span>
        };
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj){
            _default[key]=obj[key];
        }
},

<span class="hljs-comment">//调用方式</span>
ecDo.encryptStr({str:<span class="hljs-string">'18819266335'</span>,regArr:[<span class="hljs-number">5</span>],<span class="hljs-keyword">type</span>:<span class="hljs-number">0</span>,replacement:<span class="hljs-string">'-'</span>});
</code></pre>
<p>这样还有一个好处就是，比如像刚才的函数，type这个参数，我想保留默认值，偷懒不传。原来的方案，就得这样传。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ecDo.encryptStr('1asd88465asdwqe3',[5],'','+');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.encryptStr</span>(<span class="hljs-string">'1asd88465asdwqe3'</span>,[<span class="hljs-number">5</span>],<span class="hljs-string">''</span>,<span class="hljs-string">'+'</span>);
</code></pre>
<p>这样肯定是会激起不少有代码洁癖的开发者，比如我。如果使用对象，就很好避免了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ecDo.encryptStr({str:'18819266335',regArr:[5],replacement:'-'});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.encryptStr</span>({<span class="hljs-attribute">str</span>:<span class="hljs-string">'18819266335'</span>,regArr:[<span class="hljs-number">5</span>],replacement:<span class="hljs-string">'-'</span>});
</code></pre>
<h3 id="articleHeader12">3-3.前置相关性高的参数</h3>
<p>这个应该没什么可能，就一个意思：必填重要的参数前置，可省略的参数后置。</p>
<p>比如下面的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/格式化处理字符串
//ecDo.formatText('1234asda567asd890')
//result：&quot;12,34a,sda,567,asd,890&quot;
//ecDo.formatText('1234asda567asd890',4,' ')
//result：&quot;1 234a sda5 67as d890&quot;
//ecDo.formatText('1234asda567asd890',4,'-')
//result：&quot;1-234a-sda5-67as-d890&quot;
formatText: function (str, size, delimiter) {
    var _size = size || 3, _delimiter = delimiter || ',';
    var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    var reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>/格式化处理字符串
<span class="hljs-comment">//ecDo.formatText('1234asda567asd890')</span>
<span class="hljs-comment">//result："12,34a,sda,567,asd,890"</span>
<span class="hljs-comment">//ecDo.formatText('1234asda567asd890',4,' ')</span>
<span class="hljs-comment">//result："1 234a sda5 67as d890"</span>
<span class="hljs-comment">//ecDo.formatText('1234asda567asd890',4,'-')</span>
<span class="hljs-comment">//result："1-234a-sda5-67as-d890"</span>
<span class="hljs-attribute">formatText</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">str, size, delimiter</span>) </span>{
    <span class="hljs-built_in">var</span> _size = <span class="hljs-built_in">size</span> || <span class="hljs-number">3</span>, _delimiter = delimiter || <span class="hljs-string">','</span>;
    <span class="hljs-built_in">var</span> regText = <span class="hljs-string">'\\B(?=(\\w{'</span> + _size + <span class="hljs-string">'})+(?!\\w))'</span>;
    <span class="hljs-built_in">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regText, <span class="hljs-string">'g'</span>);
    <span class="hljs-keyword">return</span> str.replace(reg, _delimiter);
},
</code></pre>
<p>调用大家都看得出来。如果API这样设计</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formatText: function (size, delimiter, str) {
    var _size = size || 3, _delimiter = delimiter || ',';
    var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    var reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-attribute">formatText</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">size, delimiter, str</span>) </span>{
    <span class="hljs-built_in">var</span> _size = <span class="hljs-built_in">size</span> || <span class="hljs-number">3</span>, _delimiter = delimiter || <span class="hljs-string">','</span>;
    <span class="hljs-built_in">var</span> regText = <span class="hljs-string">'\\B(?=(\\w{'</span> + _size + <span class="hljs-string">'})+(?!\\w))'</span>;
    <span class="hljs-built_in">var</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(regText, <span class="hljs-string">'g'</span>);
    <span class="hljs-keyword">return</span> str.replace(reg, _delimiter);
},</code></pre>
<p>就得这样调用，如果这样写API，被批斗的可能性很大！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ecDo.formatText('','','1234asda567asd890')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">ecDo</span><span class="hljs-selector-class">.formatText</span>(<span class="hljs-string">''</span>,<span class="hljs-string">''</span>,<span class="hljs-string">'1234asda567asd890'</span>)
</code></pre>
<h2 id="articleHeader13">4.作用</h2>
<h3 id="articleHeader14">4-1.支持批量处理</h3>
<p>比如这个例子，页面有这样的元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;div1&quot;></div>
<div class=&quot;div1&quot;></div>
<div id=&quot;div2&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"div1"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"div1"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;div id=<span class="hljs-string">"div2"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>有一个类似jQuery的css这个API的API。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="css: function (dom, json) {
    for (var attr in json) {
        dom.style[attr] = json[attr];
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>css: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(dom, json)</span> </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> attr <span class="hljs-keyword">in</span> json) {
        dom.style[attr] = json[attr];
    }
}</code></pre>
<p>然后给这些div设置样式的时候，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oDiv1 =document.querySelectorAll(&quot;.div1&quot;);
var oDiv2=document.querySelector(&quot;#div1&quot;);
ecDo.css(oDiv2,{'height':'100px','width':'100px','background':'#333'});
ecDo.css(oDiv1,{'height':'100px','width':'100px','background':'#09f'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> oDiv1 =<span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelectorAll</span>(<span class="hljs-string">".div1"</span>);
<span class="hljs-keyword">var</span> oDiv2=<span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">"#div1"</span>);
ecDo.css(oDiv2,{<span class="hljs-string">'height'</span>:<span class="hljs-string">'100px'</span>,<span class="hljs-string">'width'</span>:<span class="hljs-string">'100px'</span>,<span class="hljs-string">'background'</span>:<span class="hljs-string">'#333'</span>});
ecDo.css(oDiv1,{<span class="hljs-string">'height'</span>:<span class="hljs-string">'100px'</span>,<span class="hljs-string">'width'</span>:<span class="hljs-string">'100px'</span>,<span class="hljs-string">'background'</span>:<span class="hljs-string">'#09f'</span>});</code></pre>
<p>当运行到<code>ecDo.css(oDiv1,{'height':'100px','width':'100px','background':'#09f'});</code>会提示报错，原因大家也知道。css这个API里面，只处理了单个元素，并没有处理元素的集合。</p>
<p>建议的方式是把 css 这个API改成可批量处理元素集合的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="css: function (dom, json) {
    if (dom.length) {
        for (var i = 0; i < dom.length; i++) {
            for (var attr in json) {
                dom[i].style[attr] = json[attr];
            }
        }
    }
    else {
        for (var attr in json) {
            dom.style[attr] = json[attr];
        }
    }
},    
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>css: function (dom, json) {
    <span class="hljs-keyword">if</span> (dom.<span class="hljs-built_in">length</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; dom.<span class="hljs-built_in">length</span>; i++) {
            <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> attr <span class="hljs-keyword">in</span> json) {
                dom[i].<span class="hljs-built_in">style</span>[attr] = json[attr];
            }
        }
    }
    <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> attr <span class="hljs-keyword">in</span> json) {
            dom.<span class="hljs-built_in">style</span>[attr] = json[attr];
        }
    }
},    
   </code></pre>
<h3 id="articleHeader15">4-2.多态处理</h3>
<p>一个类似jQuery的html这个API的API-html</p>
<p>之前遇到一个开发者的处理方式是：获取元素的innerHTML和设置元素innerHTML分开为两个方法-getHtml，setHtml。这样的问题又在于记忆的成本比原生的 innerHTML 还要高。建议的姿势就是，获取和设置用同一个API。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html: function (dom) {
    if (arguments.length === 1) {
        return dom.innerHTML;
    } else if (arguments.length === 2) {
        dom.innerHTML = arguments[1];
    }
}

ecDo.html(oDiv);//获取
ecDo.html(oDiv,'守候');//设置
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>html: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dom</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">return</span> dom.innerHTML;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">2</span>) {
        dom.innerHTML = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
    }
}

ecDo.html(oDiv);<span class="hljs-comment">//获取</span>
ecDo.html(oDiv,<span class="hljs-string">'守候'</span>);<span class="hljs-comment">//设置</span>
</code></pre>
<h3 id="articleHeader16">4-3.可扩展性</h3>
<p>可扩展性，就是建议遵守开放-封闭原则。对扩展开放，对修改关闭。比如jQuery的$.fn和$.fn.extend()。</p>
<p>说一个简单的例子-计算加薪额度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addMoney = (function () {
    //定义策略类
    var strategies = {
        A:function(money){
            return money + 2000;
        },
        B:function(money){
            return money + 1000;
        }
    };
    //暴露接口
    return {
        //根据等级和现工资，输入加薪后的工资
        compute:function(lv,money){
            return strategies[lv](money)
        }
    };
})();

//比如：等级为A，5000+2000
console.log(addMoney.compute('A',5000))//7000
//比如：等级为B，20000+1000
console.log(addMoney.compute('B',20000))//21000
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> addMoney = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//定义策略类</span>
    <span class="hljs-keyword">var</span> strategies = {
        <span class="hljs-attr">A</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">money</span>)</span>{
            <span class="hljs-keyword">return</span> money + <span class="hljs-number">2000</span>;
        },
        <span class="hljs-attr">B</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">money</span>)</span>{
            <span class="hljs-keyword">return</span> money + <span class="hljs-number">1000</span>;
        }
    };
    <span class="hljs-comment">//暴露接口</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">//根据等级和现工资，输入加薪后的工资</span>
        compute:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">lv,money</span>)</span>{
            <span class="hljs-keyword">return</span> strategies[lv](money)
        }
    };
})();

<span class="hljs-comment">//比如：等级为A，5000+2000</span>
<span class="hljs-built_in">console</span>.log(addMoney.compute(<span class="hljs-string">'A'</span>,<span class="hljs-number">5000</span>))<span class="hljs-comment">//7000</span>
<span class="hljs-comment">//比如：等级为B，20000+1000</span>
<span class="hljs-built_in">console</span>.log(addMoney.compute(<span class="hljs-string">'B'</span>,<span class="hljs-number">20000</span>))<span class="hljs-comment">//21000</span>
</code></pre>
<p>代码看着没有问题，但是如果以后需求要增加C等级呢？这就不得不修改strategies。在里面增加方法。<br>如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var strategies = {
    A:function(money){
        return money + 2000;
    },
    B:function(money){
        return money + 1000;
    },
    C:function(money){
        return money + 500;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> strategies = {
    A:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(money)</span></span>{
        <span class="hljs-keyword">return</span> money + <span class="hljs-number">2000</span>;
    },
    B:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(money)</span></span>{
        <span class="hljs-keyword">return</span> money + <span class="hljs-number">1000</span>;
    },
    C:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(money)</span></span>{
        <span class="hljs-keyword">return</span> money + <span class="hljs-number">500</span>;
    }
};</code></pre>
<p>这样实现也简单，如果以后要增加S等级呢？又得改strategies。这里还有一个问题就是，如果增加的C等级只有在A模块需要用到，在B模块不会出现，那么在B模块引用addMoney的时候，又会把C等级的计算方式也引入进去，造成不必要的资源浪费。<br>建议的方式是，设置一个接口，扩展strategies。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addMoney = (function () {
    //定义策略类
    let strategies = {
        A:function(money){
            return money + 2000;
        },
        B:function(money){
            return money + 1000;
        }
    };
    //暴露接口
    return {
        //根据等级和现工资，输入加薪后的工资
        compute:function(lv,money){
            return strategies[lv](money)
        },
        //扩展等级
        addRule:function(lv,fn){
            strategies[lv]=fn;
        }
    };
})();
//增加C等级的调用
addMoney.addRule('C',function(money){
    return money + 500;
});
console.log(addMoney.compute('C',20000))//20500    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> addMoney = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//定义策略类</span>
    <span class="hljs-keyword">let</span> strategies = {
        <span class="hljs-attr">A</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">money</span>)</span>{
            <span class="hljs-keyword">return</span> money + <span class="hljs-number">2000</span>;
        },
        <span class="hljs-attr">B</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">money</span>)</span>{
            <span class="hljs-keyword">return</span> money + <span class="hljs-number">1000</span>;
        }
    };
    <span class="hljs-comment">//暴露接口</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">//根据等级和现工资，输入加薪后的工资</span>
        compute:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">lv,money</span>)</span>{
            <span class="hljs-keyword">return</span> strategies[lv](money)
        },
        <span class="hljs-comment">//扩展等级</span>
        addRule:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">lv,fn</span>)</span>{
            strategies[lv]=fn;
        }
    };
})();
<span class="hljs-comment">//增加C等级的调用</span>
addMoney.addRule(<span class="hljs-string">'C'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">money</span>)</span>{
    <span class="hljs-keyword">return</span> money + <span class="hljs-number">500</span>;
});
<span class="hljs-built_in">console</span>.log(addMoney.compute(<span class="hljs-string">'C'</span>,<span class="hljs-number">20000</span>))<span class="hljs-comment">//20500    </span></code></pre>
<h3 id="articleHeader17">4-4.避免副作用</h3>
<p>函数的副作用，相信很多人都会遇到过，比如在一个函数体内修改一个外部作用域的变量，或者全局变量，在函数体内修改引用类型的参数，这些情况多少都会遇到过。</p>
<p>如何避免呢？主要是以下两个写代码习惯。</p>
<p>1.函数体内可以使用参数，进行操作，但是不能修改。如果修改，用一个临时变量记录参数（如果是引用类型，需要用深拷贝记录）。这样可以避免直接修改参数。</p>
<p>2.对于函数外的变量，如全局变量。函数体内可以访问，但是不能修改。</p>
<p>3.如果需要给函数外的变量赋值，不能在函数体内操作，把值返回到外部，在外部进行赋值。（感觉这里有点啰嗦，因为赋值了，就是修改了外部变量，就违反了第二点）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//不好做法
var myName='';
function setName(firstName,lastName){
    myName=firstName+lastName;
}
setName('守','侯');
//推荐做法
var myName='';
function setName(firstName,lastName){
    return firstName+lastName;
}
myName=setName('守','侯');


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">//不好做法</span>
<span class="hljs-keyword">var</span> myName=<span class="hljs-string">''</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setName</span><span class="hljs-params">(firstName,lastName)</span><span class="hljs-comment">{
    myName=firstName+lastName;
}</span>
<span class="hljs-title">setName</span><span class="hljs-params">(<span class="hljs-string">'守'</span>,<span class="hljs-string">'侯'</span>)</span>;</span>
<span class="hljs-comment">//推荐做法</span>
<span class="hljs-keyword">var</span> myName=<span class="hljs-string">''</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setName</span><span class="hljs-params">(firstName,lastName)</span><span class="hljs-comment">{
    return firstName+lastName;
}</span>
<span class="hljs-title">myName</span>=<span class="hljs-title">setName</span><span class="hljs-params">(<span class="hljs-string">'守'</span>,<span class="hljs-string">'侯'</span>)</span>;</span>


</code></pre>
<h2 id="articleHeader18">5.向下兼容</h2>
<p>这个建议主要就是为了兼顾以前的写法。还是拿上面的那个例子吧！<br>原本传参方式是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="encryptStr: function (str, regArr, type, replacement) {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;">encryptStr: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(str, regArr, <span class="hljs-keyword">type</span>, replacement)</span> <span class="hljs-comment">{}</span>;</span></code></pre>
<p>后来升级改成这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="encryptStr: function (obj){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">encryptStr: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(obj)</span></span>{}</code></pre>
<p>这样问题就来了，一个项目里面，因为历史的原因难免会使用这个API，并且使用了第一种方式传参。现在API改了，解决的方案有两个，要么把整个项目使用的这个API的方式，都改成第二种的传参方式，要么就是对接口进行向下兼容，兼容以前的方案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="encryptStr: function (obj) {
    var _default={
        type:0,
        replacement:'*'
    };
    //如果还是以之前的方式调用函数，兼容性判断
    if(arguments.length>1){
        _default.str=arguments[0];
        _default.regArr=arguments[1];
        _default.type=arguments[2]||0;
        _default.replacement=arguments[3]||'*';
    }
    else{
        for(var key in obj){
            _default[key]=obj[key];
        }
    }
    //下面代码略
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>encryptStr: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> _default={
        <span class="hljs-attr">type</span>:<span class="hljs-number">0</span>,
        <span class="hljs-attr">replacement</span>:<span class="hljs-string">'*'</span>
    };
    <span class="hljs-comment">//如果还是以之前的方式调用函数，兼容性判断</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">arguments</span>.length&gt;<span class="hljs-number">1</span>){
        _default.str=<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
        _default.regArr=<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
        _default.type=<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]||<span class="hljs-number">0</span>;
        _default.replacement=<span class="hljs-built_in">arguments</span>[<span class="hljs-number">3</span>]||<span class="hljs-string">'*'</span>;
    }
    <span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj){
            _default[key]=obj[key];
        }
    }
    <span class="hljs-comment">//下面代码略</span>
},</code></pre>
<blockquote>如果API已经准备来一个大版本的更新，（比如从1.0.0升级到2.0.0，不是1.0.0升级到1.0.1，或者1.0.0升级到1.1.0）。不打算兼容以前的版本了。可以忽略这一步，毕竟兼容性的代码可能也很多。</blockquote>
<h2 id="articleHeader19">6.简单</h2>
<p>这一步可以说是API设计最高级的一步，也是最难开发的一步，这就是为什么这篇文章会带有‘大道至简’的字样，即使API的实现很难，但使用起来简单感觉就是高级的API。这一步也直接影响API的好用与否。简单的API不但是用起来简单，试试可以一看就懂的API。这样的API更易理解、记忆、调试和变更使用方式。</p>
<p>原生的API，比如Date，some、map、find等所有数组遍历操作函数，es6提供的Object.assign，Object.keys，Object.values等。</p>
<p>曾经的霸主jQuery，现在的王者react，黑马vue。这些项目让人拍手称赞的原因虽然有很多，但也不可否认的，那便是它们的API设计非常的巧妙。如：jQuery的$,siblings,toogleClass,animate等，react的cloneElement,replaceProps等，vue的nextTick,set等。</p>
<blockquote>jQuery对于现在而言，虽然是过时了，但里面的知识还是值得学习，比如使用的淋漓尽致的 js 写作技巧，设计模式，以及 API 设计等。</blockquote>
<p>自己写的API，我也是把API写得尽量的简单，最高境界就是让别人扫一眼文档，就知道记牢了API的使用方式。这个是我追求的目标，只是现在距离还是有点远。大家看我<code>encryptStr</code>这个API就知道（此处尴尬一天）。</p>
<h2 id="articleHeader20">7.小结</h2>
<p>在我的眼里，一个好的API，会有一个一看就懂的名字，一个强大的功能，一个简单的调用方式。虽然只有三个条件，但是这三个条件结合起来，可不是那么容易做到的。一个好的API，无论是对自己，对团队，对项目开发都是一个很好的帮助。</p>
<p>对于设计API的一些个人建议，就到这里了，如果以后有更好的想法，会第一时间分享，和大家交流意见。如果大家有什么想法，欢迎指点迷津。</p>
<p>---------------------------华丽的分割线--------------------------------</p>
<p>想了解更多，关注我的微信公众号-守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV55El?w=258&amp;h=258" src="https://static.alili.tech/img/bV55El?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
大道至简--API设计的美学

## 原文链接
[https://segmentfault.com/a/1190000013818583](https://segmentfault.com/a/1190000013818583)

