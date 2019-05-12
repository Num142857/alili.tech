---
title: '动手写一款简单的chrome天气插件' 
date: 2019-02-10 2:30:42
hidden: true
slug: 1lqh198dvh6
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">极简天气</h2>
<p>一款简单的chrome天气插件。</p>
<p><a href="https://github.com/yohnz/weather/" rel="nofollow noreferrer" target="_blank">github</a> <a href="https://github.com/yohnz/weather" rel="nofollow noreferrer" target="_blank">https://github.com/yohnz/weather</a><br>如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVvH67" src="https://static.alili.tech/img/bVvH67" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">创建文件</h3>
<p>新建weather文件夹，里面包含manifest.json，popup.html和images文件夹。images文件夹放16,48,128三种不同尺寸的图标</p>
<p>manifest.json内代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;manifest_version&quot;:2,
  &quot;name&quot;:&quot;极简天气&quot;,
  &quot;description&quot;:&quot;极简天气预报&quot;,
  &quot;version&quot;:&quot;1.0&quot;,
  &quot;icons&quot;: {
        &quot;16&quot;: &quot;images/sun16.png&quot;,
        &quot;48&quot;: &quot;images/sun48.png&quot;,
        &quot;128&quot;: &quot;images/sun128.png&quot;
   },
  &quot;browser_action&quot;:{
      &quot;default_icon&quot;:&quot;images/sun48.png&quot;,
      &quot;default_title&quot;:&quot;天气预报&quot;,
      &quot;default_popup&quot;:&quot;popup.html&quot;
  },
   
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"manifest_version"</span>:<span class="hljs-number">2</span>,
  <span class="hljs-attr">"name"</span>:<span class="hljs-string">"极简天气"</span>,
  <span class="hljs-attr">"description"</span>:<span class="hljs-string">"极简天气预报"</span>,
  <span class="hljs-attr">"version"</span>:<span class="hljs-string">"1.0"</span>,
  <span class="hljs-attr">"icons"</span>: {
        <span class="hljs-attr">"16"</span>: <span class="hljs-string">"images/sun16.png"</span>,
        <span class="hljs-attr">"48"</span>: <span class="hljs-string">"images/sun48.png"</span>,
        <span class="hljs-attr">"128"</span>: <span class="hljs-string">"images/sun128.png"</span>
   },
  <span class="hljs-attr">"browser_action"</span>:{
      <span class="hljs-attr">"default_icon"</span>:<span class="hljs-string">"images/sun48.png"</span>,
      <span class="hljs-attr">"default_title"</span>:<span class="hljs-string">"天气预报"</span>,
      <span class="hljs-attr">"default_popup"</span>:<span class="hljs-string">"popup.html"</span>
  },
   
}</code></pre>
<p>popup.html的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>天气</title>
</head>
<body>
 <div class=&quot;weather&quot;>    
    Test    
 </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>天气<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weather"</span>&gt;</span>    
    Test    
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader2">文件说明</h3>
<p><strong>manifest.json</strong></p>
<p>必需文件，是整个扩展的入口，每个Chrome扩展都包含一个Manifest文件。Manifest必须包含name、version和manifest_version属性。</p>
<p>属性说明：</p>
<ul>
<li><p><code>manifest_version</code>指定文件格式的版本，在Chrome18之后，应该都是2</p></li>
<li><p><code>name</code>扩展名称</p></li>
<li><p><code>version</code> 扩展版本号</p></li>
<li><p><code>version</code>扩展的版本</p></li>
<li><p><code>icons</code>扩展列表图标</p></li>
<li><p><code>browser_action</code>指定扩展在Chrome工具栏中的显示信息。</p></li>
<li><p><code>default_icon</code>、<code>default_title</code>、<code>default_popup</code>依次指定图标、标题、对应的页面</p></li>
</ul>
<p><strong>Popup页面</strong></p>
<p>Popup页面是当用户点击扩展图标时，展示在图标下面的页面。</p>
<p>打开chrome扩展程序界面，勾选"开发者模式",拖入weather文件夹，然后就可以看到weather扩展已经出现在chrome扩展程序列表了</p>
<p><span class="img-wrap"><img data-src="/img/bVvH7n" src="https://static.alili.tech/img/bVvH7n" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>同时，工具栏也出现了weather的图标，点击之后会弹出popup界面:</p>
<p><span class="img-wrap"><img data-src="/img/bVvH7o" src="https://static.alili.tech/img/bVvH7o" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">完善页面和样式</h3>
<p>完善静态popup页面,模拟天气数据:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>天气</title>
</head>
<body>
    <div class=&quot;weather&quot;>
        <div class=&quot;today&quot; id=&quot;today&quot;>
            <h1 class=&quot;city&quot;>厦门</h1>
            <div class=&quot;row_detail&quot;><img src=&quot;http://files.heweather.com/cond_icon/104.png&quot;>
                <h1>19<span>℃</span></h1></div>
            <div class=&quot;wind&quot;>
                <h2>阴</h2>
                <h4>风速 20   湿度 89%</h4></div>
        </div>
        <div class=&quot;content&quot;>
            <div class=&quot;wrap&quot; id=&quot;wrap&quot;>
                <div class=&quot;row&quot;>
                    <h4>2016-05-16</h4><img src=&quot;http://files.heweather.com/cond_icon/104.png&quot;>
                    <h1>19~24</h1>
                    <h4>阴</h4>
                </div>               
            </div>
        </div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>天气<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"weather"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"today"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"today"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"city"</span>&gt;</span>厦门<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row_detail"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://files.heweather.com/cond_icon/104.png"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>19<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>℃<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wind"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>阴<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>风速 20   湿度 89%<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"row"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>2016-05-16<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://files.heweather.com/cond_icon/104.png"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>19~24<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>阴<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>               
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>新建CSS文件，并在popup页面引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    width:740px;
    height:400px;
    font-family: 'Microsoft Yahei';
    color:#333;
    background:#fefefe;
    text-shadow:1px 1px 6px #333;
}

.city{
    text-align:center
}
.today{
    padding-bottom:30px;
}
.row_detail{
    display: flex;
    direction: row;
    justify-content:center;
    align-items: center;
}
.row_detail img{
    width:80px;    
}
.row_detail h1{
    font-size:60px;
}
.wind{
    text-align: center;
}
.content{
    display: flex;
    direction: column
}

.wrap{
    display: flex;
    direction: row;
    flex: 1;
    justify-content:space-around;
    align-items: center;
}
.row{
    background:#fff;
    border:1px solid #ccc;
    padding:10px;
    box-shadow: 0 2px 10px rgba(0,0,0,.3);
}
.row img{
    width:80px;
}
.row h1{
    font-size:18px;
}
h1,h4{
    text-align: center;
    margin:0;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">740px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">400px</span>;
    <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Microsoft Yahei'</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#333</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#fefefe</span>;
    <span class="hljs-attribute">text-shadow</span>:<span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">6px</span> <span class="hljs-number">#333</span>;
}

<span class="hljs-selector-class">.city</span>{
    <span class="hljs-attribute">text-align</span>:center
}
<span class="hljs-selector-class">.today</span>{
    <span class="hljs-attribute">padding-bottom</span>:<span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.row_detail</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">direction</span>: row;
    <span class="hljs-attribute">justify-content</span>:center;
    <span class="hljs-attribute">align-items</span>: center;
}
<span class="hljs-selector-class">.row_detail</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">80px</span>;    
}
<span class="hljs-selector-class">.row_detail</span> <span class="hljs-selector-tag">h1</span>{
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">60px</span>;
}
<span class="hljs-selector-class">.wind</span>{
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">direction</span>: column
}

<span class="hljs-selector-class">.wrap</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">direction</span>: row;
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">justify-content</span>:space-around;
    <span class="hljs-attribute">align-items</span>: center;
}
<span class="hljs-selector-class">.row</span>{
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">10px</span> <span class="hljs-built_in">rgba</span>(0,0,0,.3);
}
<span class="hljs-selector-class">.row</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">80px</span>;
}
<span class="hljs-selector-class">.row</span> <span class="hljs-selector-tag">h1</span>{
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;
}
<span class="hljs-selector-tag">h1</span>,<span class="hljs-selector-tag">h4</span>{
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
}
</code></pre>
<p>点击工具栏weather图标，此时界面如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVvH7I" src="https://static.alili.tech/img/bVvH7I" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">获取真实天气数据</h3>
<p>Google允许Chrome扩展应用不必受限于跨域限制。但出于安全考虑，需要在Manifest的permissions属性中声明需要跨域的权限。<br>这里以<a href="http://www.heweather.com/" rel="nofollow noreferrer" target="_blank">和风天气API</a>为例.<br>首先，在Manifest里添加要请求的API接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;permissions&quot;:[
     &quot;http://api.openweathermap.org/data/2.5/forecast?q=*&quot;,   
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"permissions"</span>:[
     <span class="hljs-string">"http://api.openweathermap.org/data/2.5/forecast?q=*"</span>,   
  ]</code></pre>
<p>然后新建popup.js并在popup页面中引入<br>简单的ajax函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function httpRequest(url,callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4){
            callback(xhr.responseText);
        }
    }
    xhr.send();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">httpRequest</span></span>(url,<span class="hljs-keyword">callback</span>) {
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
    xhr.open(<span class="hljs-string">'GET'</span>,url,<span class="hljs-literal">true</span>);
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
        <span class="hljs-keyword">if</span>(xhr.readyState === <span class="hljs-number">4</span>){
            <span class="hljs-keyword">callback</span>(xhr.responseText);
        }
    }
    xhr.send();
}</code></pre>
<p>和风天气API可以通过城市名称，城市代码,IP三种方式来获取指定城市天气数据，不过经过测试发现，IP获取的方式不准确，城市有偏差，所以，直接用城市名称来获取。这里借用<code>http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json</code>获取城市名称。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="httpRequest('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json',function(data) {
    if(!data) return;
    data = JSON.parse(data);
    var city = data.city;
    var url = 'https://api.heweather.com/x3/weather?city='+city+'&amp;key=youkey';
        httpRequest(url,function(data) {
            data = JSON.parse(data);
            var result = data[&quot;HeWeather data service 3.0&quot;][0];        
            showWeather(city,result);            
        });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>httpRequest('http<span class="hljs-symbol">://int</span>.dpool.sina.com.cn/iplookup/iplookup.php?format=json',function(<span class="hljs-name">data</span>) {
    if(!data) return<span class="hljs-comment">;</span>
    data = JSON.parse(<span class="hljs-name">data</span>)<span class="hljs-comment">;</span>
    var city = data.city<span class="hljs-comment">;</span>
    var url = 'https<span class="hljs-symbol">://api</span>.heweather.com/x3/weather?city='+city+'&amp;key=youkey'<span class="hljs-comment">;</span>
        httpRequest(<span class="hljs-name">url</span>,function(<span class="hljs-name">data</span>) {
            data = JSON.parse(<span class="hljs-name">data</span>)<span class="hljs-comment">;</span>
            var result = data[<span class="hljs-string">"HeWeather data service 3.0"</span>][<span class="hljs-number">0</span>]<span class="hljs-comment">;        </span>
            showWeather(<span class="hljs-name">city</span>,result)<span class="hljs-comment">;            </span>
        })<span class="hljs-comment">;</span>
})<span class="hljs-comment">;</span></code></pre>
<p>为了方便的解析图片，构建一个json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cond_info = {
100:&quot;http://files.heweather.com/cond_icon/100.png&quot;,
101:&quot;http://files.heweather.com/cond_icon/101.png&quot;,
102:&quot;http://files.heweather.com/cond_icon/102.png&quot;,
103:&quot;http://files.heweather.com/cond_icon/103.png&quot;,
104:&quot;http://files.heweather.com/cond_icon/104.png&quot;,
200:&quot;http://files.heweather.com/cond_icon/200.png&quot;,
201:&quot;http://files.heweather.com/cond_icon/201.png&quot;,
202:&quot;http://files.heweather.com/cond_icon/202.png&quot;,
203:&quot;http://files.heweather.com/cond_icon/203.png&quot;,
204:&quot;http://files.heweather.com/cond_icon/204.png&quot;,
205:&quot;http://files.heweather.com/cond_icon/205.png&quot;,
206:&quot;http://files.heweather.com/cond_icon/206.png&quot;,
207:&quot;http://files.heweather.com/cond_icon/207.png&quot;,
208:&quot;http://files.heweather.com/cond_icon/208.png&quot;,
209:&quot;http://files.heweather.com/cond_icon/209.png&quot;,
210:&quot;http://files.heweather.com/cond_icon/210.png&quot;,
211:&quot;http://files.heweather.com/cond_icon/211.png&quot;,
212:&quot;http://files.heweather.com/cond_icon/212.png&quot;,
213:&quot;http://files.heweather.com/cond_icon/213.png&quot;,
300:&quot;http://files.heweather.com/cond_icon/300.png&quot;,
301:&quot;http://files.heweather.com/cond_icon/301.png&quot;,
302:&quot;http://files.heweather.com/cond_icon/302.png&quot;,
303:&quot;http://files.heweather.com/cond_icon/303.png&quot;,
304:&quot;http://files.heweather.com/cond_icon/304.png&quot;,
305:&quot;http://files.heweather.com/cond_icon/305.png&quot;,
306:&quot;http://files.heweather.com/cond_icon/306.png&quot;,
307:&quot;http://files.heweather.com/cond_icon/307.png&quot;,
308:&quot;http://files.heweather.com/cond_icon/308.png&quot;,
309:&quot;http://files.heweather.com/cond_icon/309.png&quot;,
310:&quot;http://files.heweather.com/cond_icon/310.png&quot;,
311:&quot;http://files.heweather.com/cond_icon/311.png&quot;,
312:&quot;http://files.heweather.com/cond_icon/312.png&quot;,
313:&quot;http://files.heweather.com/cond_icon/313.png&quot;,
400:&quot;http://files.heweather.com/cond_icon/400.png&quot;,
401:&quot;http://files.heweather.com/cond_icon/401.png&quot;,
402:&quot;http://files.heweather.com/cond_icon/402.png&quot;,
403:&quot;http://files.heweather.com/cond_icon/403.png&quot;,
404:&quot;http://files.heweather.com/cond_icon/404.png&quot;,
405:&quot;http://files.heweather.com/cond_icon/405.png&quot;,
406:&quot;http://files.heweather.com/cond_icon/406.png&quot;,
407:&quot;http://files.heweather.com/cond_icon/407.png&quot;,
500:&quot;http://files.heweather.com/cond_icon/500.png&quot;,
501:&quot;http://files.heweather.com/cond_icon/501.png&quot;,
502:&quot;http://files.heweather.com/cond_icon/502.png&quot;,
503:&quot;http://files.heweather.com/cond_icon/503.png&quot;,
504:&quot;http://files.heweather.com/cond_icon/504.png&quot;,
506:&quot;http://files.heweather.com/cond_icon/506.png&quot;,
507:&quot;http://files.heweather.com/cond_icon/507.png&quot;,
508:&quot;http://files.heweather.com/cond_icon/508.png&quot;,
900:&quot;http://files.heweather.com/cond_icon/900.png&quot;,
901:&quot;http://files.heweather.com/cond_icon/901.png&quot;,
999:&quot;http://files.heweather.com/cond_icon/999.png&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>var cond_info = {
100:"<span class="hljs-attribute">http</span>://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/100<span class="hljs-variable">.png</span>",
101:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/101<span class="hljs-variable">.png</span>",
102:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/102<span class="hljs-variable">.png</span>",
103:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/103<span class="hljs-variable">.png</span>",
104:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/104<span class="hljs-variable">.png</span>",
200:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/200<span class="hljs-variable">.png</span>",
201:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/201<span class="hljs-variable">.png</span>",
202:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/202<span class="hljs-variable">.png</span>",
203:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/203<span class="hljs-variable">.png</span>",
204:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/204<span class="hljs-variable">.png</span>",
205:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/205<span class="hljs-variable">.png</span>",
206:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/206<span class="hljs-variable">.png</span>",
207:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/207<span class="hljs-variable">.png</span>",
208:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/208<span class="hljs-variable">.png</span>",
209:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/209<span class="hljs-variable">.png</span>",
210:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/210<span class="hljs-variable">.png</span>",
211:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/211<span class="hljs-variable">.png</span>",
212:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/212<span class="hljs-variable">.png</span>",
213:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/213<span class="hljs-variable">.png</span>",
300:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/300<span class="hljs-variable">.png</span>",
301:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/301<span class="hljs-variable">.png</span>",
302:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/302<span class="hljs-variable">.png</span>",
303:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/303<span class="hljs-variable">.png</span>",
304:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/304<span class="hljs-variable">.png</span>",
305:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/305<span class="hljs-variable">.png</span>",
306:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/306<span class="hljs-variable">.png</span>",
307:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/307<span class="hljs-variable">.png</span>",
308:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/308<span class="hljs-variable">.png</span>",
309:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/309<span class="hljs-variable">.png</span>",
310:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/310<span class="hljs-variable">.png</span>",
311:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/311<span class="hljs-variable">.png</span>",
312:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/312<span class="hljs-variable">.png</span>",
313:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/313<span class="hljs-variable">.png</span>",
400:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/400<span class="hljs-variable">.png</span>",
401:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/401<span class="hljs-variable">.png</span>",
402:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/402<span class="hljs-variable">.png</span>",
403:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/403<span class="hljs-variable">.png</span>",
404:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/404<span class="hljs-variable">.png</span>",
405:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/405<span class="hljs-variable">.png</span>",
406:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/406<span class="hljs-variable">.png</span>",
407:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/407<span class="hljs-variable">.png</span>",
500:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/500<span class="hljs-variable">.png</span>",
501:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/501<span class="hljs-variable">.png</span>",
502:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/502<span class="hljs-variable">.png</span>",
503:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/503<span class="hljs-variable">.png</span>",
504:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/504<span class="hljs-variable">.png</span>",
506:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/506<span class="hljs-variable">.png</span>",
507:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/507<span class="hljs-variable">.png</span>",
508:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/508<span class="hljs-variable">.png</span>",
900:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/900<span class="hljs-variable">.png</span>",
901:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/901<span class="hljs-variable">.png</span>",
999:"http://files<span class="hljs-variable">.heweather</span><span class="hljs-variable">.com</span>/cond_icon/999<span class="hljs-variable">.png</span>"
}</code></pre>
<p>showWeather()函数构建DOM;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showWeather(city,result) { 
    var daily = result.daily_forecast;
    var now = result.now;
    var dailyDom='';
    for(var i=0;i<daily.length;i++){
        var day = daily[i];
         dailyDom += '<div class=&quot;row&quot;>'
            +'<h4>'+day.date+'</h4>'
            +'<img src=&quot;'+cond_info[day.cond.code_d]+'&quot; />'
            +'<h1>'+day.tmp.min+'~'+day.tmp.max+'</h1>'
            +'<h4>'+day.cond.txt_d+'</h4>'     
        +'</div>'       
    }
    var today = '<h1 class=&quot;city&quot;>'+city+'</h1>'
                +'<div class=&quot;row_detail&quot;>'
                    +'<img src=&quot;'+cond_info[now.cond.code]+'&quot; />'
                    +'<h1>'+now.tmp+'<span>℃</span></h1>'            
                +'</div>'
                +'<div class=&quot;wind&quot;>'
                    +'<h2>'+now.cond.txt+'</h2>'
                    +'<h4>风速 '+now.wind.spd+'   湿度 '+now.hum+'%</h4>'            
                +'</div>'
    
    document.getElementById('today').innerHTML = today;
    document.getElementById('wrap').innerHTML = dailyDom; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showWeather</span><span class="hljs-params">(city,result)</span> { </span>
    var daily = result.daily_forecast;
    var now = result.now;
    var dailyDom=<span class="hljs-string">''</span>;
    <span class="hljs-keyword">for</span>(var i=<span class="hljs-number">0</span>;i&lt;daily.<span class="hljs-built_in">length</span>;i++){
        var day = daily[i];
         dailyDom += <span class="hljs-string">'&lt;div class="</span>row<span class="hljs-string">"&gt;'</span>
            +<span class="hljs-string">'&lt;h4&gt;'</span>+day.date+<span class="hljs-string">'&lt;/h4&gt;'</span>
            +<span class="hljs-string">'&lt;img src="</span><span class="hljs-string">'+cond_info[day.cond.code_d]+'</span><span class="hljs-string">" /&gt;'</span>
            +<span class="hljs-string">'&lt;h1&gt;'</span>+day.tmp.<span class="hljs-built_in">min</span>+<span class="hljs-string">'~'</span>+day.tmp.<span class="hljs-built_in">max</span>+<span class="hljs-string">'&lt;/h1&gt;'</span>
            +<span class="hljs-string">'&lt;h4&gt;'</span>+day.cond.txt_d+<span class="hljs-string">'&lt;/h4&gt;'</span>     
        +<span class="hljs-string">'&lt;/div&gt;'</span>       
    }
    var today = <span class="hljs-string">'&lt;h1 class="</span>city<span class="hljs-string">"&gt;'</span>+city+<span class="hljs-string">'&lt;/h1&gt;'</span>
                +<span class="hljs-string">'&lt;div class="</span>row_detail<span class="hljs-string">"&gt;'</span>
                    +<span class="hljs-string">'&lt;img src="</span><span class="hljs-string">'+cond_info[now.cond.code]+'</span><span class="hljs-string">" /&gt;'</span>
                    +<span class="hljs-string">'&lt;h1&gt;'</span>+now.tmp+<span class="hljs-string">'&lt;span&gt;℃&lt;/span&gt;&lt;/h1&gt;'</span>            
                +<span class="hljs-string">'&lt;/div&gt;'</span>
                +<span class="hljs-string">'&lt;div class="</span>wind<span class="hljs-string">"&gt;'</span>
                    +<span class="hljs-string">'&lt;h2&gt;'</span>+now.cond.txt+<span class="hljs-string">'&lt;/h2&gt;'</span>
                    +<span class="hljs-string">'&lt;h4&gt;风速 '</span>+now.wind.spd+<span class="hljs-string">'   湿度 '</span>+now.hum+<span class="hljs-string">'%&lt;/h4&gt;'</span>            
                +<span class="hljs-string">'&lt;/div&gt;'</span>
    
    document.getElementById(<span class="hljs-string">'today'</span>).innerHTML = today;
    document.getElementById(<span class="hljs-string">'wrap'</span>).innerHTML = dailyDom; 
}</code></pre>
<p>这时，再点击weather图标，天气扩展基本上就完成了，不过因为和风API有请求次数限制，也为了减少请求，这里做一下数据缓存。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _time = new Date().getTime()-(60*60*1000*2); //接口次数有限，两小时请求一次
var storageTime = localStorage.updateTime||0;

httpRequest('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json',function(data) {
    if(!data) return;
    data = JSON.parse(data);
    var city = data.city;
    var url = 'https://api.heweather.com/x3/weather?city='+city+'&amp;key=youkey';
    if(_time>storageTime){
        httpRequest(url,function(data) {
            data = JSON.parse(data);
            var result = data[&quot;HeWeather data service 3.0&quot;][0];        
            showWeather(city,result);
            localStorage.updateTime = new Date().getTime();  
            localStorage.data = JSON.stringify(result);    
        });
    }else{
        var result = JSON.parse(localStorage.data);
        showWeather(city,result);
    }

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> _time = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()-(<span class="hljs-number">60</span>*<span class="hljs-number">60</span>*<span class="hljs-number">1000</span>*<span class="hljs-number">2</span>); <span class="hljs-comment">//接口次数有限，两小时请求一次</span>
<span class="hljs-built_in">var</span> storageTime = localStorage.updateTime||<span class="hljs-number">0</span>;

httpRequest(<span class="hljs-string">'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">if</span>(!data) <span class="hljs-keyword">return</span>;
    data = <span class="hljs-built_in">JSON</span>.parse(data);
    <span class="hljs-built_in">var</span> city = data.city;
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'https://api.heweather.com/x3/weather?city='</span>+city+<span class="hljs-string">'&amp;key=youkey'</span>;
    <span class="hljs-keyword">if</span>(_time&gt;storageTime){
        httpRequest(<span class="hljs-built_in">url</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
            data = <span class="hljs-built_in">JSON</span>.parse(data);
            <span class="hljs-built_in">var</span> result = data[<span class="hljs-string">"HeWeather data service 3.0"</span>][<span class="hljs-number">0</span>];        
            showWeather(city,result);
            localStorage.updateTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();  
            localStorage.data = <span class="hljs-built_in">JSON</span>.stringify(result);    
        });
    }<span class="hljs-title">else</span>{
        <span class="hljs-built_in">var</span> result = <span class="hljs-built_in">JSON</span>.parse(localStorage.data);
        showWeather(city,result);
    }

});</code></pre>
<p>至此，一个简单的chrome天气扩展就完成了，是不是比想象中更简单?如果觉得本文有帮助，请github赏个star~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
动手写一款简单的chrome天气插件

## 原文链接
[https://segmentfault.com/a/1190000005135445](https://segmentfault.com/a/1190000005135445)

