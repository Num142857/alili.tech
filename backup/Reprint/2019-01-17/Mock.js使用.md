---
title: 'Mock.js使用' 
date: 2019-01-17 2:30:25
hidden: true
slug: lmsm660oor
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://mockjs.com" rel="nofollow noreferrer" target="_blank">Mock.js</a> 是一款前端开发中拦截<code>Ajax</code>请求再生成随机数据响应的工具.可以用来模拟服务器响应. 优点是非常简单方便, 无侵入性, 基本覆盖常用的接口数据类型.</p>
<p>大概记录下使用过程, 详细使用可以参见Mock文档 <a href="https://github.com/nuysoft/Mock/wiki" rel="nofollow noreferrer" target="_blank">Mock Wiki</a></p>
<h2 id="articleHeader0">安装</h2>
<p>使用npm安装: <code>npm install mockjs</code>; <br>或直接<code>&lt;script src="http://mockjs.com/dist/mock.js"&gt;&lt;/script&gt;</code>;</p>
<h2 id="articleHeader1">数据模板格式:</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'name|rule': value

属性名|生成规则: 属性值
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>'name<span class="hljs-string">|rule': value</span>

属性名<span class="hljs-string">|生成规则: 属性值</span>
</code></pre>
<h2 id="articleHeader2">GET请求</h2>
<p>发起get请求:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    url: 'http://test.com',
    type: 'get',
    dataType: 'json'
}).done(function(data, status, xhr) {
    console.log(JSON.stringify(data, null, 4));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'http://test.com'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'get'</span>,
    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>
}).done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, status, xhr</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(data, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>));
});</code></pre>
<p>Mock.js响应:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {'aa':'11', 'bb':'22', 'cc':'33', 'dd':'44'};

// Mock响应模板
Mock.mock('http://test.com', {
    &quot;user|1-3&quot;: [{   // 随机生成1到3个数组元素
        'name': '@cname',  // 中文名称
        'id|+1': 88,    // 属性值自动加 1，初始值为88
        'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
        'birthday': '@date(&quot;yyyy-MM-dd&quot;)',  // 日期
        'city': '@city(true)',   // 中国城市
        'color': '@color',  // 16进制颜色
        'isMale|1': true,  // 布尔值
        'isFat|1-2': true,  // true的概率是1/3
        'fromObj|2': obj,  // 从obj对象中随机获取2个属性
        'fromObj2|1-3': obj,  // 从obj对象中随机获取1至3个属性
        'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
        'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
        'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组
    },{
        'gf': '@cname'
    }]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {<span class="hljs-string">'aa'</span>:<span class="hljs-string">'11'</span>, <span class="hljs-string">'bb'</span>:<span class="hljs-string">'22'</span>, <span class="hljs-string">'cc'</span>:<span class="hljs-string">'33'</span>, <span class="hljs-string">'dd'</span>:<span class="hljs-string">'44'</span>};

<span class="hljs-comment">// Mock响应模板</span>
Mock.mock(<span class="hljs-string">'http://test.com'</span>, {
    <span class="hljs-string">"user|1-3"</span>: [{   <span class="hljs-comment">// 随机生成1到3个数组元素</span>
        <span class="hljs-string">'name'</span>: <span class="hljs-string">'@cname'</span>,  <span class="hljs-comment">// 中文名称</span>
        <span class="hljs-string">'id|+1'</span>: <span class="hljs-number">88</span>,    <span class="hljs-comment">// 属性值自动加 1，初始值为88</span>
        <span class="hljs-string">'age|18-28'</span>: <span class="hljs-number">0</span>,   <span class="hljs-comment">// 18至28以内随机整数, 0只是用来确定类型</span>
        <span class="hljs-string">'birthday'</span>: <span class="hljs-string">'@date("yyyy-MM-dd")'</span>,  <span class="hljs-comment">// 日期</span>
        <span class="hljs-string">'city'</span>: <span class="hljs-string">'@city(true)'</span>,   <span class="hljs-comment">// 中国城市</span>
        <span class="hljs-string">'color'</span>: <span class="hljs-string">'@color'</span>,  <span class="hljs-comment">// 16进制颜色</span>
        <span class="hljs-string">'isMale|1'</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 布尔值</span>
        <span class="hljs-string">'isFat|1-2'</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// true的概率是1/3</span>
        <span class="hljs-string">'fromObj|2'</span>: obj,  <span class="hljs-comment">// 从obj对象中随机获取2个属性</span>
        <span class="hljs-string">'fromObj2|1-3'</span>: obj,  <span class="hljs-comment">// 从obj对象中随机获取1至3个属性</span>
        <span class="hljs-string">'brother|1'</span>: [<span class="hljs-string">'jack'</span>, <span class="hljs-string">'jim'</span>], <span class="hljs-comment">// 随机选取 1 个元素</span>
        <span class="hljs-string">'sister|+1'</span>: [<span class="hljs-string">'jack'</span>, <span class="hljs-string">'jim'</span>, <span class="hljs-string">'lily'</span>], <span class="hljs-comment">// array中顺序选取元素作为结果</span>
        <span class="hljs-string">'friends|2'</span>: [<span class="hljs-string">'jack'</span>, <span class="hljs-string">'jim'</span>] <span class="hljs-comment">// 重复2次属性值生成一个新数组</span>
    },{
        <span class="hljs-string">'gf'</span>: <span class="hljs-string">'@cname'</span>
    }]
});</code></pre>
<p>可以看到结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;user&quot;: [
        {
            &quot;name&quot;: &quot;董静&quot;,
            &quot;id&quot;: 88,
            &quot;age&quot;: 25,
            &quot;birthday&quot;: &quot;2015-04-01&quot;,
            &quot;city&quot;: &quot;湖南省 怀化市&quot;,
            &quot;color&quot;: &quot;#c0f279&quot;,
            &quot;isMale&quot;: false,
            &quot;isFat&quot;: false,
            &quot;fromObj&quot;: {
                &quot;dd&quot;: &quot;44&quot;,
                &quot;aa&quot;: &quot;11&quot;
            },
            &quot;fromObj2&quot;: {
                &quot;bb&quot;: &quot;22&quot;,
                &quot;cc&quot;: &quot;33&quot;
            },
            &quot;brother&quot;: &quot;jack&quot;,
            &quot;sister&quot;: &quot;jack&quot;,
            &quot;friends&quot;: [
                &quot;jack&quot;,
                &quot;jim&quot;,
                &quot;jack&quot;,
                &quot;jim&quot;
            ]
        },
        {
            &quot;gf&quot;: &quot;田杰&quot;
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"user"</span>: [
        {
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"董静"</span>,
            <span class="hljs-attr">"id"</span>: <span class="hljs-number">88</span>,
            <span class="hljs-attr">"age"</span>: <span class="hljs-number">25</span>,
            <span class="hljs-attr">"birthday"</span>: <span class="hljs-string">"2015-04-01"</span>,
            <span class="hljs-attr">"city"</span>: <span class="hljs-string">"湖南省 怀化市"</span>,
            <span class="hljs-attr">"color"</span>: <span class="hljs-string">"#c0f279"</span>,
            <span class="hljs-attr">"isMale"</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">"isFat"</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">"fromObj"</span>: {
                <span class="hljs-attr">"dd"</span>: <span class="hljs-string">"44"</span>,
                <span class="hljs-attr">"aa"</span>: <span class="hljs-string">"11"</span>
            },
            <span class="hljs-attr">"fromObj2"</span>: {
                <span class="hljs-attr">"bb"</span>: <span class="hljs-string">"22"</span>,
                <span class="hljs-attr">"cc"</span>: <span class="hljs-string">"33"</span>
            },
            <span class="hljs-attr">"brother"</span>: <span class="hljs-string">"jack"</span>,
            <span class="hljs-attr">"sister"</span>: <span class="hljs-string">"jack"</span>,
            <span class="hljs-attr">"friends"</span>: [
                <span class="hljs-string">"jack"</span>,
                <span class="hljs-string">"jim"</span>,
                <span class="hljs-string">"jack"</span>,
                <span class="hljs-string">"jim"</span>
            ]
        },
        {
            <span class="hljs-attr">"gf"</span>: <span class="hljs-string">"田杰"</span>
        }
    ]
}</code></pre>
<p>响应时也可以是使用<code>function</code>, 如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mock.mock('http://test.com', 'get', function() {
    return Mock.mock({
        &quot;user|1-3&quot;: [{
            'name': '@cname',
            'id': 88
        }
      ]
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Mock.mock(<span class="hljs-string">'http://test.com'</span>, <span class="hljs-string">'get'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> Mock.mock({
        <span class="hljs-string">"user|1-3"</span>: [{
            <span class="hljs-string">'name'</span>: <span class="hljs-string">'@cname'</span>,
            <span class="hljs-string">'id'</span>: <span class="hljs-number">88</span>
        }
      ]
    });
});</code></pre>
<p>结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;user&quot;: [
        {
            &quot;name&quot;: &quot;许超&quot;,
            &quot;id&quot;: 88
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"user"</span>: [
        {
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"许超"</span>,
            <span class="hljs-attr">"id"</span>: <span class="hljs-number">88</span>
        }
    ]
}</code></pre>
<h2 id="articleHeader3">POST请求</h2>
<p>发起post请求:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    url: 'http://test.com',
    type: 'post',
    dataType: 'json',
    data: {
      account: 888,
      pwd: 'abc123'
    }
}).done(function(data, status, xhr) {
    console.log(JSON.stringify(data, null, 4));
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">'http://test.com'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'post'</span>,
    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">account</span>: <span class="hljs-number">888</span>,
      <span class="hljs-attr">pwd</span>: <span class="hljs-string">'abc123'</span>
    }
}).done(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, status, xhr</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(data, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>));
});</code></pre>
<p>Mock.js响应:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mock.mock('http://test.com', function(options) {
    console.log(options);
    return Mock.mock({
        &quot;user|1-3&quot;: [{
            'name': '@cname',
            'id|+1': 88
        }
      ]
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Mock.mock(<span class="hljs-string">'http://test.com'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-built_in">console</span>.log(options);
    <span class="hljs-keyword">return</span> Mock.mock({
        <span class="hljs-string">"user|1-3"</span>: [{
            <span class="hljs-string">'name'</span>: <span class="hljs-string">'@cname'</span>,
            <span class="hljs-string">'id|+1'</span>: <span class="hljs-number">88</span>
        }
      ]
    });
});</code></pre>
<p>可以看到结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{url: &quot;http://test.com&quot;, type: &quot;POST&quot;, body: &quot;account=888&amp;pwd=abc123&quot;}

{
    &quot;user&quot;: [
        {
            &quot;name&quot;: &quot;曾明&quot;,
            &quot;id&quot;: 88
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{url: <span class="hljs-string">"http://test.com"</span>, type: <span class="hljs-string">"POST"</span>, body: <span class="hljs-string">"account=888&amp;pwd=abc123"</span>}

{
    <span class="hljs-attr">"user"</span>: [
        {
            <span class="hljs-attr">"name"</span>: <span class="hljs-string">"曾明"</span>,
            <span class="hljs-attr">"id"</span>: <span class="hljs-number">88</span>
        }
    ]
}</code></pre>
<h2 id="articleHeader4">自定义响应时间</h2>
<p>可以自定义设置响应时间, 可以是绝对值, 也可以是区间.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置4秒后再响应
Mock.setup({ timeout: 4000 });  

// 设置1秒至4秒间响应
Mock.setup({ timeout: '1000-4000' });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 设置4秒后再响应</span>
Mock.setup({ <span class="hljs-attr">timeout</span>: <span class="hljs-number">4000</span> });  

<span class="hljs-comment">// 设置1秒至4秒间响应</span>
Mock.setup({ <span class="hljs-attr">timeout</span>: <span class="hljs-string">'1000-4000'</span> });</code></pre>
<h2 id="articleHeader5">数据集</h2>
<p><code>Mock.Random</code>是一个工具类，用于生成各种格式随机数据. 有两种写法:</p>
<p>第一种:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 生成一个email格式的字符串
console.log(Mock.mock('@email'));  // 结果: s.uorjeqdou@crqfpdypt.gw" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 生成一个email格式的字符串</span>
<span class="hljs-built_in">console</span>.log(Mock.mock(<span class="hljs-string">'@email'</span>));  <span class="hljs-comment">// 结果: s.uorjeqdou@crqfpdypt.gw</span></code></pre>
<p>第二种:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Random = Mock.Random;
console.log(Random.email());  // 结果: r.quyppn@yit.cv" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Random = Mock.Random;
<span class="hljs-built_in">console</span>.log(Random.email());  <span class="hljs-comment">// 结果: r.quyppn@yit.cv</span></code></pre>
<p>提供的种类有:</p>
<table>
<thead><tr>
<th>Type</th>
<th>Method</th>
</tr></thead>
<tbody>
<tr>
<td>Basic</td>
<td>boolean, natural, integer, float, character, string, range, date, time, datetime, now</td>
</tr>
<tr>
<td>Image</td>
<td>image, dataImage</td>
</tr>
<tr>
<td>Color</td>
<td>color</td>
</tr>
<tr>
<td>Text</td>
<td>paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle</td>
</tr>
<tr>
<td>Name</td>
<td>first, last, name, cfirst, clast, cname</td>
</tr>
<tr>
<td>Web</td>
<td>url, domain, email, ip, tld</td>
</tr>
<tr>
<td>Address</td>
<td>area, region</td>
</tr>
<tr>
<td>Helper</td>
<td>capitalize, upper, lower, pick, shuffle</td>
</tr>
<tr>
<td>Miscellaneous</td>
<td>guid, id</td>
</tr>
</tbody>
</table>
<p>如果上面没有你需要的种类, 还可以自定义扩展, 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Random.extend({
    weekday: function(date) {
        var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return this.pick(weekdays);
    },
    sex: function(date) {
        var sexes = ['男', '女', '中性', '未知'];
        return this.pick(sexes);
    }
});

console.log(Random.weekday());  // 结果: Saturday
console.log(Mock.mock('@weekday'));  // 结果: 112Tuesday
console.log(Random.sex());  // 结果: 男
console.log(Mock.mock('@sex'));  // 结果: 未知" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Random.extend({
    <span class="hljs-attr">weekday</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">date</span>) </span>{
        <span class="hljs-keyword">var</span> weekdays = [<span class="hljs-string">'Sunday'</span>, <span class="hljs-string">'Monday'</span>, <span class="hljs-string">'Tuesday'</span>, <span class="hljs-string">'Wednesday'</span>, <span class="hljs-string">'Thursday'</span>, <span class="hljs-string">'Friday'</span>, <span class="hljs-string">'Saturday'</span>];
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.pick(weekdays);
    },
    <span class="hljs-attr">sex</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">date</span>) </span>{
        <span class="hljs-keyword">var</span> sexes = [<span class="hljs-string">'男'</span>, <span class="hljs-string">'女'</span>, <span class="hljs-string">'中性'</span>, <span class="hljs-string">'未知'</span>];
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.pick(sexes);
    }
});

<span class="hljs-built_in">console</span>.log(Random.weekday());  <span class="hljs-comment">// 结果: Saturday</span>
<span class="hljs-built_in">console</span>.log(Mock.mock(<span class="hljs-string">'@weekday'</span>));  <span class="hljs-comment">// 结果: 112Tuesday</span>
<span class="hljs-built_in">console</span>.log(Random.sex());  <span class="hljs-comment">// 结果: 男</span>
<span class="hljs-built_in">console</span>.log(Mock.mock(<span class="hljs-string">'@sex'</span>));  <span class="hljs-comment">// 结果: 未知</span></code></pre>
<h2 id="articleHeader6">校验</h2>
<p><code>Mock.valid(template, data)</code>: 用来校验真实数据<code>data</code>是否与数据模板<code>template</code>匹配</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tempObj = { &quot;user|1-3&quot;: [{ 'name': '@cname', 'id|18-28': 88 } ]};
var realData = { &quot;user&quot;: [{ 'name': '张三', 'id': 90 } ]};
console.log(Mock.valid(tempObj, realData));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> tempObj = { <span class="hljs-string">"user|1-3"</span>: [{ <span class="hljs-string">'name'</span>: <span class="hljs-string">'@cname'</span>, <span class="hljs-string">'id|18-28'</span>: <span class="hljs-number">88</span> } ]};
<span class="hljs-keyword">var</span> realData = { <span class="hljs-string">"user"</span>: [{ <span class="hljs-string">'name'</span>: <span class="hljs-string">'张三'</span>, <span class="hljs-string">'id'</span>: <span class="hljs-number">90</span> } ]};
<span class="hljs-built_in">console</span>.log(Mock.valid(tempObj, realData));</code></pre>
<h2 id="articleHeader7">JSON Schema</h2>
<p><code>Mock.toJSONSchema(template)</code>: 用来把<code>Mock.js</code>风格的数据模板<code>template</code>转换成<code>JSON Schema</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tempObj = { &quot;user|1-3&quot;: [{ 'name': '@cname', 'id|18-28': 88 } ]};
console.log(Mock.toJSONSchema(tempObj));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> tempObj = { <span class="hljs-string">"user|1-3"</span>: [{ <span class="hljs-string">'name'</span>: <span class="hljs-string">'@cname'</span>, <span class="hljs-string">'id|18-28'</span>: <span class="hljs-number">88</span> } ]};
<span class="hljs-built_in">console</span>.log(Mock.toJSONSchema(tempObj));</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Mock.js使用

## 原文链接
[https://segmentfault.com/a/1190000008839142](https://segmentfault.com/a/1190000008839142)

