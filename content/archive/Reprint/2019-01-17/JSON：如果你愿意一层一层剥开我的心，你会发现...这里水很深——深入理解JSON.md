---
title: 'JSON：如果你愿意一层一层剥开我的心，你会发现...这里水很深——深入理解JSON' 
date: 2019-01-17 2:30:25
hidden: true
slug: eh0ho40zymf
categories: [reprint]
---

{{< raw >}}

                    
<p>我们先来看一个JS中常见的JS对象序列化成JSON字符串的问题，请问，以下JS对象通过<code>JSON.stringify</code>后的字符串是怎样的？<strong>先不要急着复制粘贴到控制台，先自己打开一个代码编辑器或者纸，写写看，写完再去仔细对比你的控制台输出，如果有误记得看完全文并评论，哈哈。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var friend={
    firstName: 'Good',
    'lastName': 'Man',
    'address': undefined,
    'phone': [&quot;1234567&quot;,undefined],
    'fullName': function(){
        return this.firstName + ' ' + this.lastName;
    }
};

JSON.stringify(friend);//这一行返回什么呢？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> friend={
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">'Good'</span>,
    <span class="hljs-string">'lastName'</span>: <span class="hljs-string">'Man'</span>,
    <span class="hljs-string">'address'</span>: <span class="hljs-literal">undefined</span>,
    <span class="hljs-string">'phone'</span>: [<span class="hljs-string">"1234567"</span>,<span class="hljs-literal">undefined</span>],
    <span class="hljs-string">'fullName'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.firstName + <span class="hljs-string">' '</span> + <span class="hljs-keyword">this</span>.lastName;
    }
};

<span class="hljs-built_in">JSON</span>.stringify(friend);<span class="hljs-comment">//这一行返回什么呢？</span></code></pre>
<p>第二个问题，如果我想在最终JSON字符串将这个'friend'的姓名全部变成大写字母，也就是把"Good"变成"GOOD"，把"Man"变成"MAN"，那么可以怎么做？</p>
<p>基于以上两个问题，我们再追本溯源问一下，JSON究竟是什么东西？为什么JSON就是易于数据交换？JSON和JS对象的区别？JS中<code>JSON.parse</code>、<code>JSON.stringify</code>和不常见的<code>toJSON</code>，这几个函数的参数和处理细节到底是怎样的？</p>
<p>欢迎进入本次“深挖JSON之旅”，下文将从以下几个方面去理解JSON：</p>
<ul>
<li><p>首先是对“JSON是一种轻量的数据交换格式”的理解；</p></li>
<li><p>然后来看经常被混为一谈的JSON和JS对象的区别；</p></li>
<li><p>最后我们再来看JS中这几个JSON相关函数具体的执行细节。</p></li>
</ul>
<p>希望全文能让如之前的我一样对JSON一知半解的亲能说清楚JSON是什么，也能熟练运用JSON，不看控制台就知道JS对象序列化成JSON字符串后输出是啥。</p>
<h2 id="articleHeader0">一、JSON是一种格式，基于文本，优于轻量，用于交换数据</h2>
<p>如果没有去过JSON的官方介绍可以<a href="http://www.json.org/json-zh.html" rel="nofollow noreferrer" target="_blank">去一下这里</a>，官方介绍第一、二段已经很清楚地表述了JSON是什么，我将JSON是什么提炼成以下几个方面：</p>
<h3 id="articleHeader1">1. 一种数据格式</h3>
<p>什么是格式？就是规范你的数据要怎么表示，举个栗子，有个人叫“二百六”，身高“160cm”，体重“60kg”，现在你要将这个人的这些信息传给别人或者别的什么东西，你有很多种选择：</p>
<ul>
<li><p><code>姓名“二百六”，身高“160cm”，体重“60kg”</code></p></li>
<li><p><code>name="二百六"&amp;height="160cm"&amp;weight="60kg"</code></p></li>
<li><p><code>&lt;person&gt;&lt;name&gt;二百六&lt;/name&gt;&lt;height&gt;160&lt;/height&gt;&lt;weight&gt;60&lt;/weight&gt;&lt;/person&gt;</code></p></li>
<li><p><code>{"name":"二百六","height":160,"weight":60}</code></p></li>
<li><p>... ...</p></li>
</ul>
<p>以上所有选择，传递的数据是一样的，但是你可以看到形式是可以各式各样的，这就是各种不同格式化后的数据，JSON是其中一种表示方式。</p>
<h3 id="articleHeader2">2. 基于文本的数据格式</h3>
<p>JSON是基于文本的数据格式，相对于基于二进制的数据，所以JSON在传递的时候是传递符合JSON这种格式(至于JSON的格式是什么我们第二部分再说)的字符串，我们常会称为“JSON字符串”。</p>
<h3 id="articleHeader3">3. 轻量级的数据格式</h3>
<p>在JSON之前，有一个数据格式叫<code>xml</code>，现在还是广泛在用，但是JSON更加轻量，如<code>xml</code>需要用到很多标签，像上面的例子中，你可以明显看到<code>xml</code>格式的数据中标签本身占据了很多空间，而JSON比较轻量，即相同数据，以JSON的格式占据的带宽更小，这在有大量数据请求和传递的情况下是有明显优势的。</p>
<h3 id="articleHeader4">4. 被广泛地用于数据交换</h3>
<p>轻量已经是一个用于数据交换的优势了，但更重要的JSON是易于阅读、编写和机器解析的，即这个JSON对人和机器都是友好的，而且又轻，独立于语言（因为是基于文本的），所以JSON被广泛用于数据交换。</p>
<p>以前端JS进行ajax的POST请求为例，后端PHP处理请求为例：</p>
<ol>
<li><p>前端构造一个JS对象，用于包装要传递的数据，然后将JS对象转化为JSON字符串，再发送请求到后端；</p></li>
<li><p>后端PHP接收到这个JSON字符串，将JSON字符串转化为PHP对象，然后处理请求。</p></li>
</ol>
<p>可以看到，相同的数据在这里有3种不同的表现形式，分别是前端的JS对象、传输的JSON字符串、后端的PHP对象，JS对象和PHP对象明显不是一个东西，但是由于大家用的都是JSON来传递数据，大家都能理解这种数据格式，<strong>都能把JSON这种数据格式很容易地转化为自己能理解的数据结构</strong>，这就方便啦，在其他各种语言环境中交换数据都是如此。</p>
<h2 id="articleHeader5">二、JSON和JS对象之间的“八卦”</h2>
<p>很多时候都听到“JSON是JS的一个子集”这句话，而且这句话我曾经也一直这么认为，每个符合JSON格式的字符串你解析成js都是可以的，直到后来发现了一个奇奇怪怪的东西...</p>
<h3 id="articleHeader6">1. 两个本质不同的东西为什么那么密切</h3>
<p>JSON和JS对象本质上完全不是同一个东西，就像“斑马线”和“斑马”，“斑马线”基于“斑马”身上的条纹来呈现和命名，但是斑马是活的，斑马线是非生物。</p>
<p>同样，"JSON"全名"JavaScript Object Notation"，所以它的格式（语法）是基于JS的，但它就是一种格式，而JS对象是一个实例，是存在于内存的一个东西。</p>
<p>说句玩笑话，如果JSON是基于PHP的，可能就叫PON了，形式可能就是这样的了<code>['propertyOne' =&gt; 'foo', 'propertyTwo' =&gt; 42,]</code>，如果这样，那么JSON可能现在是和PHP比较密切了。</p>
<p>此外，JSON是可以传输的，因为它是文本格式，但是JS对象是没办法传输的，在语法上，JSON也会更加严格，但是JS对象就很松了。</p>
<p>那么两个不同的东西为什么那么密切，因为JSON毕竟是从JS中演变出来的，语法相近。</p>
<h3 id="articleHeader7">2. JSON格式别JS对象语法表现上严格在哪</h3>
<p>先就以“键值对为表现的对象”形式上，对比下两者的不同，至于JSON还能以怎样的形式表现，对比完后再罗列。</p>
<table>
<thead><tr>
<th>对比内容</th>
<th>JSON</th>
<th>JS对象</th>
</tr></thead>
<tbody>
<tr>
<td>键名</td>
<td>必须是加双引号</td>
<td>可允许不加、加单引号、加双引号</td>
</tr>
<tr>
<td>属性值</td>
<td>只能是数值（10进制）、字符串（双引号）、布尔值和null，<br>也可以是数组或者符合JSON要求的对象，<br>不能是函数、NaN, Infinity, -Infinity和undefined</td>
<td>爱啥啥</td>
</tr>
<tr>
<td>逗号问题</td>
<td>最后一个属性后面不能有逗号</td>
<td>可以</td>
</tr>
<tr>
<td>数值</td>
<td>前导0不能用，小数点后必须有数字</td>
<td>没限制</td>
</tr>
</tbody>
</table>
<p>可以看到，相对于JS对象，JSON的格式更严格，所以大部分写的JS对象是不符合JSON的格式的。</p>
<blockquote><p>以下代码引用自<a href="https://segmentfault.com/a/1190000005943794">这里</a></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {}; // 这只是 JS 对象

// 可把这个称做：JSON 格式的 JavaScript 对象 
var obj2 = {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;};

// 可把这个称做：JSON 格式的字符串
var str1 = '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;}';

// 这个可叫 JSON 格式的数组，是 JSON 的稍复杂一点的形式
var arr = [
    {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},
    {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},
    {&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},
];
        
// 这个可叫稍复杂一点的 JSON 格式的字符串     
var str2='['+
    '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},'+
    '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},'+
    '{&quot;width&quot;:100,&quot;height&quot;:200,&quot;name&quot;:&quot;rose&quot;},'+
']';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj1 = {}; <span class="hljs-comment">// 这只是 JS 对象</span>

<span class="hljs-comment">// 可把这个称做：JSON 格式的 JavaScript 对象 </span>
<span class="hljs-keyword">var</span> obj2 = {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>};

<span class="hljs-comment">// 可把这个称做：JSON 格式的字符串</span>
<span class="hljs-keyword">var</span> str1 = <span class="hljs-string">'{"width":100,"height":200,"name":"rose"}'</span>;

<span class="hljs-comment">// 这个可叫 JSON 格式的数组，是 JSON 的稍复杂一点的形式</span>
<span class="hljs-keyword">var</span> arr = [
    {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>},
    {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>},
    {<span class="hljs-string">"width"</span>:<span class="hljs-number">100</span>,<span class="hljs-string">"height"</span>:<span class="hljs-number">200</span>,<span class="hljs-string">"name"</span>:<span class="hljs-string">"rose"</span>},
];
        
<span class="hljs-comment">// 这个可叫稍复杂一点的 JSON 格式的字符串     </span>
<span class="hljs-keyword">var</span> str2=<span class="hljs-string">'['</span>+
    <span class="hljs-string">'{"width":100,"height":200,"name":"rose"},'</span>+
    <span class="hljs-string">'{"width":100,"height":200,"name":"rose"},'</span>+
    <span class="hljs-string">'{"width":100,"height":200,"name":"rose"},'</span>+
<span class="hljs-string">']'</span>;</code></pre>
<p>另外，除了常见的“正常的”JSON格式，要么表现为一个对象形式<code>{...}</code>，要么表现为一个数组形式<code>[...]</code>，任何单独的一个10进制数值、双引号字符串、布尔值和null都是有效符合JSON格式的。</p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON" rel="nofollow noreferrer" target="_blank">这里有完整的JSON语法参考</a></p>
<h3 id="articleHeader8">3. 一个有意思的地方，JSON不是JS的子集</h3>
<p>首先看下面的代码，你可以copy到控制台执行下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = '&quot;\u2028\u2029&quot;';
JSON.parse(code); // works fine
eval(code); // fails" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> code = <span class="hljs-string">'"\u2028\u2029"'</span>;
<span class="hljs-built_in">JSON</span>.parse(code); <span class="hljs-comment">// works fine</span>
<span class="hljs-built_in">eval</span>(code); <span class="hljs-comment">// fails</span></code></pre>
<p>这两个字符<code>\u2028</code>和<code>\u2029</code>分别表示行分隔符和段落分隔符，JSON.parse可以正常解析，但是当做js解析时会报错。</p>
<h2 id="articleHeader9">三、这几个JS中的JSON函数，弄啥嘞</h2>
<p>在JS中我们主要会接触到两个和JSON相关的函数，分别用于JSON字符串和JS数据结构之间的转化，一个叫<code>JSON.stringify</code>，它很聪明，聪明到你写的不符合JSON格式的JS对象都能帮你处理成符合JSON格式的字符串，所以你得知道它到底干了什么，免得它只是自作聪明，然后让你Debug long time；另一个叫<code>JSON.parse</code>，用于转化json字符串到JS数据结构，它很严格，你的JSON字符串如果构造地不对，是没办法解析的。</p>
<p>而它们的参数不止一个，虽然我们经常用的时候只传入一个参数。</p>
<p>此外，还有一个<code>toJSON</code>函数，我们较少看到，但是它会影响<code>JSON.stringify</code>。</p>
<h3 id="articleHeader10">1. 将JS数据结构转化为JSON字符串 —— JSON.stringify</h3>
<p>这个函数的函数签名是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON.stringify(value[, replacer [, space]])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">JSON</span>.stringify(value[, replacer [, space]])</code></pre>
<p>下面将分别展开带1~3个参数的用法，最后是它在序列化时做的一些“聪明”的事，要特别注意。</p>
<h4>1.1 基本使用 —— 仅需一个参数</h4>
<p>这个大家都会使用，传入一个JSON格式的JS对象或者数组，<code>JSON.stringify({"name":"Good Man","age":18})</code>返回一个字符串<code>"{"name":"Good Man","age":18}"</code>。</p>
<p>可以看到本身我们传入的这个JS对象就是符合JSON格式的，用的双引号，也没有JSON不接受的属性值，那么如果像开头那个例子中的一样，how to play？不急，我们先举简单的例子来说明这个函数的几个参数的意义，再来说这个问题。</p>
<h4>1.2 第二个参数可以是函数，也可以是一个数组</h4>
<ul>
<li><p>如果第二个参数是一个函数，那么序列化过程中的每个属性都会被这个函数转化和处理</p></li>
<li><p>如果第二个参数是一个数组，那么只有包含在这个数组中的属性才会被序列化到最终的JSON字符串中</p></li>
<li><p>如果第二个参数是null，那作用上和空着没啥区别，但是不想设置第二个参数，只是想设置第三个参数的时候，就可以设置第二个参数为null</p></li>
</ul>
<p><strong>这第二个参数若是函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var friend={
    &quot;firstName&quot;: &quot;Good&quot;,
    &quot;lastName&quot;: &quot;Man&quot;,
    &quot;phone&quot;:&quot;1234567&quot;,
    &quot;age&quot;:18
};

var friendAfter=JSON.stringify(friend,function(key,value){
    if(key===&quot;phone&quot;)
        return &quot;(000)&quot;+value;
    else if(typeof value === &quot;number&quot;)
        return value + 10;
    else
        return value; //如果你把这个else分句删除，那么结果会是undefined
});

console.log(friendAfter);
//输出：{&quot;firstName&quot;:&quot;Good&quot;,&quot;lastName&quot;:&quot;Man&quot;,&quot;phone&quot;:&quot;(000)1234567&quot;,&quot;age&quot;:28}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> friend={
    <span class="hljs-string">"firstName"</span>: <span class="hljs-string">"Good"</span>,
    <span class="hljs-string">"lastName"</span>: <span class="hljs-string">"Man"</span>,
    <span class="hljs-string">"phone"</span>:<span class="hljs-string">"1234567"</span>,
    <span class="hljs-string">"age"</span>:<span class="hljs-number">18</span>
};

<span class="hljs-keyword">var</span> friendAfter=<span class="hljs-built_in">JSON</span>.stringify(friend,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key,value</span>)</span>{
    <span class="hljs-keyword">if</span>(key===<span class="hljs-string">"phone"</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-string">"(000)"</span>+value;
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">"number"</span>)
        <span class="hljs-keyword">return</span> value + <span class="hljs-number">10</span>;
    <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">return</span> value; <span class="hljs-comment">//如果你把这个else分句删除，那么结果会是undefined</span>
});

<span class="hljs-built_in">console</span>.log(friendAfter);
<span class="hljs-comment">//输出：{"firstName":"Good","lastName":"Man","phone":"(000)1234567","age":28}</span></code></pre>
<p>如果制定了第二个参数是函数，那么这个函数必须对每一项都有返回，这个函数接受两个参数，一个键名，一个是属性值，函数必须针对每一个原来的属性值都要有新属性值的返回。</p>
<p>那么问题来了，<strong>如果传入的不是键值对的对象形式，而是方括号的数组形式呢？</strong>，比如上面的<code>friend</code>变成这样：<code>friend=["Jack","Rose"]</code>，那么这个逐属性处理的函数接收到的key和value又是什么？如果是数组形式，那么key是索引，而value是这个数组项，你可以在控制台在这个函数内部打印出来这个key和value验证，记得要返回value，不然会出错。</p>
<p><strong>这第二个参数若是数组</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var friend={
    &quot;firstName&quot;: &quot;Good&quot;,
    &quot;lastName&quot;: &quot;Man&quot;,
    &quot;phone&quot;:&quot;1234567&quot;,
    &quot;age&quot;:18
};

//注意下面的数组有一个值并不是上面对象的任何一个属性名
var friendAfter=JSON.stringify(friend,[&quot;firstName&quot;,&quot;address&quot;,&quot;phone&quot;]);

console.log(friendAfter);
//{&quot;firstName&quot;:&quot;Good&quot;,&quot;phone&quot;:&quot;1234567&quot;}
//指定的“address”由于没有在原来的对象中找到而被忽略" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> friend={
    <span class="hljs-string">"firstName"</span>: <span class="hljs-string">"Good"</span>,
    <span class="hljs-string">"lastName"</span>: <span class="hljs-string">"Man"</span>,
    <span class="hljs-string">"phone"</span>:<span class="hljs-string">"1234567"</span>,
    <span class="hljs-string">"age"</span>:<span class="hljs-number">18</span>
};

<span class="hljs-comment">//注意下面的数组有一个值并不是上面对象的任何一个属性名</span>
<span class="hljs-keyword">var</span> friendAfter=<span class="hljs-built_in">JSON</span>.stringify(friend,[<span class="hljs-string">"firstName"</span>,<span class="hljs-string">"address"</span>,<span class="hljs-string">"phone"</span>]);

<span class="hljs-built_in">console</span>.log(friendAfter);
<span class="hljs-comment">//{"firstName":"Good","phone":"1234567"}</span>
<span class="hljs-comment">//指定的“address”由于没有在原来的对象中找到而被忽略</span></code></pre>
<p>如果第二个参数是一个数组，那么只有在数组中出现的属性才会被序列化进结果字符串，只要在这个提供的数组中找不到的属性就不会被包含进去，而这个数组中存在但是源JS对象中不存在的属性会被忽略，不会报错。</p>
<h4>1.3 第三个参数用于美化输出 —— 不建议用</h4>
<p>指定缩进用的空白字符，可以取以下几个值：</p>
<ul>
<li><p>是1-10的某个数字，代表用几个空白字符</p></li>
<li><p>是字符串的话，就用该字符串代替空格，最多取这个字符串的前10个字符</p></li>
<li><p>没有提供该参数 等于 设置成null 等于 设置一个小于1的数</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var friend={
    &quot;firstName&quot;: &quot;Good&quot;,
    &quot;lastName&quot;: &quot;Man&quot;,
    &quot;phone&quot;:{&quot;home&quot;:&quot;1234567&quot;,&quot;work&quot;:&quot;7654321&quot;}
};

//直接转化是这样的：
//{&quot;firstName&quot;:&quot;Good&quot;,&quot;lastName&quot;:&quot;Man&quot;,&quot;phone&quot;:{&quot;home&quot;:&quot;1234567&quot;,&quot;work&quot;:&quot;7654321&quot;"}}"

var friendAfter=JSON.stringify(friend,null,4);
console.log(friendAfter);
/*
{
    &quot;firstName&quot;: &quot;Good&quot;,
    &quot;lastName&quot;: &quot;Man&quot;,
    &quot;phone&quot;: {
        &quot;home&quot;: &quot;1234567&quot;,
        &quot;work&quot;: &quot;7654321&quot;
    }
}
*/

var friendAfter=JSON.stringify(friend,null,&quot;HAHAHAHA&quot;);
console.log(friendAfter);
/*
{
HAHAHAHA&quot;firstName&quot;: &quot;Good&quot;,
HAHAHAHA&quot;lastName&quot;: &quot;Man&quot;,
HAHAHAHA&quot;phone&quot;: {
HAHAHAHAHAHAHAHA&quot;home&quot;: &quot;1234567&quot;,
HAHAHAHAHAHAHAHA&quot;work&quot;: &quot;7654321&quot;
HAHAHAHA}
}
*/

var friendAfter=JSON.stringify(friend,null,&quot;WhatAreYouDoingNow&quot;);
console.log(friendAfter);
/* 最多只取10个字符
{
WhatAreYou&quot;firstName&quot;: &quot;Good&quot;,
WhatAreYou&quot;lastName&quot;: &quot;Man&quot;,
WhatAreYou&quot;phone&quot;: {
WhatAreYouWhatAreYou&quot;home&quot;: &quot;1234567&quot;,
WhatAreYouWhatAreYou&quot;work&quot;: &quot;7654321&quot;
WhatAreYou}
}
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> friend={
    <span class="hljs-string">"firstName"</span>: <span class="hljs-string">"Good"</span>,
    <span class="hljs-string">"lastName"</span>: <span class="hljs-string">"Man"</span>,
    <span class="hljs-string">"phone"</span>:{<span class="hljs-string">"home"</span>:<span class="hljs-string">"1234567"</span>,<span class="hljs-string">"work"</span>:<span class="hljs-string">"7654321"</span>}
};

<span class="hljs-comment">//直接转化是这样的：</span>
<span class="hljs-comment">//{"firstName":"Good","lastName":"Man","phone":{"home":"1234567","work":"7654321""}}"</span>

<span class="hljs-keyword">var</span> friendAfter=<span class="hljs-built_in">JSON</span>.stringify(friend,<span class="hljs-literal">null</span>,<span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(friendAfter);
<span class="hljs-comment">/*
{
    "firstName": "Good",
    "lastName": "Man",
    "phone": {
        "home": "1234567",
        "work": "7654321"
    }
}
*/</span>

<span class="hljs-keyword">var</span> friendAfter=<span class="hljs-built_in">JSON</span>.stringify(friend,<span class="hljs-literal">null</span>,<span class="hljs-string">"HAHAHAHA"</span>);
<span class="hljs-built_in">console</span>.log(friendAfter);
<span class="hljs-comment">/*
{
HAHAHAHA"firstName": "Good",
HAHAHAHA"lastName": "Man",
HAHAHAHA"phone": {
HAHAHAHAHAHAHAHA"home": "1234567",
HAHAHAHAHAHAHAHA"work": "7654321"
HAHAHAHA}
}
*/</span>

<span class="hljs-keyword">var</span> friendAfter=<span class="hljs-built_in">JSON</span>.stringify(friend,<span class="hljs-literal">null</span>,<span class="hljs-string">"WhatAreYouDoingNow"</span>);
<span class="hljs-built_in">console</span>.log(friendAfter);
<span class="hljs-comment">/* 最多只取10个字符
{
WhatAreYou"firstName": "Good",
WhatAreYou"lastName": "Man",
WhatAreYou"phone": {
WhatAreYouWhatAreYou"home": "1234567",
WhatAreYouWhatAreYou"work": "7654321"
WhatAreYou}
}
*/</span></code></pre>
<p>笑笑就好，<strong>别这样用，序列化是为了传输，传输就是能越小越好，加莫名其妙的缩进符，解析困难（如果是字符串的话），也弱化了轻量化这个特点。</strong>。</p>
<h4>1.4 注意这个函数的“小聪明”（重要）</h4>
<p>如果有其他不确定的情况，那么最好的办法就是"Have a try"，控制台做下实验就明了。</p>
<ul>
<li><p>键名不是双引号的（包括没有引号或者是单引号），会自动变成双引号；字符串是单引号的，会自动变成双引号</p></li>
<li><p>最后一个属性后面有逗号的，会被自动去掉</p></li>
<li><p>非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中  <br>这个好理解，也就是对非数组对象在最终字符串中不保证属性顺序和原来一致</p></li>
<li><p>布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值  <br>也就是你的什么<code>new String("bala")</code>会变成<code>"bala"</code>，<code>new Number(2017)</code>会变成<code>2017</code></p></li>
<li>
<p>undefined、任意的函数（<strong>其实有个函数会发生神奇的事，后面会说</strong>）以及 symbol 值（symbol详见ES6对symbol的介绍）</p>
<ul>
<li><p>出现在<strong>非数组对象的属性值</strong>中：在序列化过程中会被忽略</p></li>
<li><p>出现在<strong>数组中</strong>时：被转换成 null</p></li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON.stringify({x: undefined, y: function(){return 1;}, z: Symbol(&quot;&quot;)});
//出现在非数组对象的属性值中被忽略：&quot;{}&quot;
JSON.stringify([undefined, Object, Symbol(&quot;&quot;)]);
//出现在数组对象的属性值中，变成null：&quot;[null,null,null]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">JSON</span>.stringify({<span class="hljs-attr">x</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">y</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;}, <span class="hljs-attr">z</span>: <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">""</span>)});
<span class="hljs-comment">//出现在非数组对象的属性值中被忽略："{}"</span>
<span class="hljs-built_in">JSON</span>.stringify([<span class="hljs-literal">undefined</span>, <span class="hljs-built_in">Object</span>, <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">""</span>)]);
<span class="hljs-comment">//出现在数组对象的属性值中，变成null："[null,null,null]"</span></code></pre>
<ul>
<li><p>NaN、Infinity和-Infinity，不论在数组还是非数组的对象中，都被转化为null</p></li>
<li><p>所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们</p></li>
<li><p>不可枚举的属性会被忽略</p></li>
</ul>
<h3 id="articleHeader11">2. 将JSON字符串解析为JS数据结构 —— JSON.parse</h3>
<p>这个函数的函数签名是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON.parse(text[, reviver])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">JSON</span>.parse(text[, reviver])</code></pre>
<p>如果第一个参数，即JSON字符串不是合法的字符串的话，那么这个函数会抛出错误，所以如果你在写一个后端返回JSON字符串的脚本，最好调用语言本身的JSON字符串相关序列化函数，而如果是自己去拼接实现的序列化字符串，那么就尤其要注意序列化后的字符串是否是合法的，<strong>合法指这个JSON字符串完全符合JSON要求的严格格式</strong>。</p>
<p>值得注意的是这里有一个可选的第二个参数，这个参数必须是一个函数，这个函数作用在属性已经被解析但是还没返回前，将属性处理后再返回。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var friend={
    &quot;firstName&quot;: &quot;Good&quot;,
    &quot;lastName&quot;: &quot;Man&quot;,
    &quot;phone&quot;:{&quot;home&quot;:&quot;1234567&quot;,&quot;work&quot;:[&quot;7654321&quot;,&quot;999000&quot;]}
};

//我们先将其序列化
var friendAfter=JSON.stringify(friend);
//'{&quot;firstName&quot;:&quot;Good&quot;,&quot;lastName&quot;:&quot;Man&quot;,&quot;phone&quot;:{&quot;home&quot;:&quot;1234567&quot;,&quot;work&quot;:[&quot;7654321&quot;,&quot;999000&quot;]"}}"'

//再将其解析出来，在第二个参数的函数中打印出key和value
JSON.parse(friendAfter,function(k,v){
    console.log(k);
    console.log(v);
    console.log(&quot;----&quot;);
});
/*
firstName
Good
----
lastName
Man
----
home
1234567
----
0
7654321
----
1
999000
----
work
[]
----
phone
Object
----

Object
----
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> friend={
    <span class="hljs-string">"firstName"</span>: <span class="hljs-string">"Good"</span>,
    <span class="hljs-string">"lastName"</span>: <span class="hljs-string">"Man"</span>,
    <span class="hljs-string">"phone"</span>:{<span class="hljs-string">"home"</span>:<span class="hljs-string">"1234567"</span>,<span class="hljs-string">"work"</span>:[<span class="hljs-string">"7654321"</span>,<span class="hljs-string">"999000"</span>]}
};

<span class="hljs-comment">//我们先将其序列化</span>
<span class="hljs-keyword">var</span> friendAfter=<span class="hljs-built_in">JSON</span>.stringify(friend);
<span class="hljs-comment">//'{"firstName":"Good","lastName":"Man","phone":{"home":"1234567","work":["7654321","999000"]"}}"'</span>

<span class="hljs-comment">//再将其解析出来，在第二个参数的函数中打印出key和value</span>
<span class="hljs-built_in">JSON</span>.parse(friendAfter,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k,v</span>)</span>{
    <span class="hljs-built_in">console</span>.log(k);
    <span class="hljs-built_in">console</span>.log(v);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"----"</span>);
});
<span class="hljs-comment">/*
firstName
Good
----
lastName
Man
----
home
1234567
----
0
7654321
----
1
999000
----
work
[]
----
phone
Object
----

Object
----
*/</span></code></pre>
<p>仔细看一下这些输出，可以发现这个遍历是由内而外的，可能由内而外这个词大家会误解，最里层是内部数组里的两个值啊，但是输出是从第一个属性开始的，怎么就是由内而外的呢？</p>
<p>这个由内而外指的是对于<strong>复合属性</strong>来说的，通俗地讲，遍历的时候，从头到尾进行遍历，如果是简单属性值（数值、字符串、布尔值和null），那么直接遍历完成，如果是遇到属性值是对象或者数组形式的，那么暂停，先遍历这个<strong>子JSON</strong>，而遍历的原则也是一样的，等这个<strong>复合属性遍历完成</strong>，那么再完成对这个属性的遍历返回。</p>
<p><strong>本质上，这就是一个深度优先的遍历。</strong></p>
<p>有两点需要注意：</p>
<ul>
<li><p>如果 reviver 返回 undefined，则当前属性会从所属对象中删除，如果返回了其他值，则返回的值会成为当前属性新的属性值。</p></li>
<li><p>你可以注意到上面例子最后一组输出看上去没有key，其实这个key是一个空字符串，而最后的object是最后解析完成对象，因为到了最上层，已经没有真正的属性了。</p></li>
</ul>
<h3 id="articleHeader12">3. 影响 JSON.stringify 的神奇函数 —— object.toJSON</h3>
<p>如果你在一个JS对象上实现了<code>toJSON</code>方法，那么调用<code>JSON.stringify</code>去序列化这个JS对象时，<code>JSON.stringify</code>会把这个对象的<code>toJSON</code>方法返回的值作为参数去进行序列化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var info={
    &quot;msg&quot;:&quot;I Love You&quot;,
    &quot;toJSON&quot;:function(){
        var replaceMsg=new Object();
        replaceMsg[&quot;msg&quot;]=&quot;Go Die&quot;;
        return replaceMsg;
    }
};

JSON.stringify(info);
//出si了，返回的是：'&quot;{&quot;msg&quot;:&quot;Go Die&quot;}&quot;',说好的忽略函数呢" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> info={
    <span class="hljs-string">"msg"</span>:<span class="hljs-string">"I Love You"</span>,
    <span class="hljs-string">"toJSON"</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> replaceMsg=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
        replaceMsg[<span class="hljs-string">"msg"</span>]=<span class="hljs-string">"Go Die"</span>;
        <span class="hljs-keyword">return</span> replaceMsg;
    }
};

<span class="hljs-built_in">JSON</span>.stringify(info);
<span class="hljs-comment">//出si了，返回的是：'"{"msg":"Go Die"}"',说好的忽略函数呢</span></code></pre>
<p>这个函数就是这样子的。</p>
<p>其实<code>Date</code>类型可以直接传给<code>JSON.stringify</code>做参数，其中的道理就是，<code>Date</code>类型内置了<code>toJSON</code>方法。</p>
<h2 id="articleHeader13">四、小结以及关于兼容性的问题</h2>
<p>到这里终于把，JSON和JS中的JSON，梳理了一遍，也对里面的细节和注意点进行了一次遍历，知道JSON是一种语法上衍生于JS语言的一种轻量级的数据交换格式，也明白了JSON相对于一般的JS数据结构（尤其是对象）的差别，更进一步，仔细地讨论了JS中关于JSON处理的3个函数和细节。</p>
<p>不过遗憾的是，以上所用的3个函数，不兼容IE7以及IE7之前的浏览器。有关兼容性的讨论，留待之后吧。如果想直接在应用上解决兼容性，那么可以套用JSON官方的js，可以解决。</p>
<p>如有纰漏，欢迎留言指出。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JSON：如果你愿意一层一层剥开我的心，你会发现...这里水很深——深入理解JSON

## 原文链接
[https://segmentfault.com/a/1190000008832185](https://segmentfault.com/a/1190000008832185)

