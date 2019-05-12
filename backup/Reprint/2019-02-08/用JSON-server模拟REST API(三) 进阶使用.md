---
title: '用JSON-server模拟REST API(三) 进阶使用' 
date: 2019-02-08 2:30:41
hidden: true
slug: l0oxiswr1v
categories: [reprint]
---

{{< raw >}}

                    
<p>前面演示了如何安装并运行 <code>json server</code> , 和使用第三方库真实化模拟数据 , 下面将展开更多的配置项和数据操作。</p>
<h2 id="articleHeader0">配置项</h2>
<p>在安装好json server之后，通过 <code>json-server -h</code> 可以看到如下配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server [options] <source>

Options:
  --config, -c       指定 config 文件                  [默认: &quot;json-server.json&quot;]
  --port, -p         设置端口号                                   [default: 3000]
  --host, -H         设置主机                                   [默认: &quot;0.0.0.0&quot;]
  --watch, -w        监控文件                                           [boolean]
  --routes, -r       指定路由文件
  --static, -s       设置静态文件
  --read-only, --ro  只允许 GET 请求                                    [boolean]
  --no-cors, --nc    禁止跨域资源共享                                   [boolean]
  --no-gzip, --ng    禁止GZIP                                          [boolean]
  --snapshots, -S    设置快照目录                                     [默认: &quot;.&quot;]
  --delay, -d        设置反馈延时 (ms)
  --id, -i           设置数据的id属性 (e.g. _id)                     [默认: &quot;id&quot;]
  --quiet, -q        不输出日志信息                                     [boolean]
  --help, -h         显示帮助信息                                       [boolean]
  --version, -v      显示版本号                                         [boolean]

Examples:
  bin db.json
  bin file.js
  bin http://example.com/db.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>json-server [options] &lt;source&gt;

Options:
  -<span class="ruby">-config, -c       指定 config 文件                  [默认: <span class="hljs-string">"json-server.json"</span>]
</span>  -<span class="ruby">-port, -p         设置端口号                                   [<span class="hljs-symbol">default:</span> <span class="hljs-number">3000</span>]
</span>  -<span class="ruby">-host, -H         设置主机                                   [默认: <span class="hljs-string">"0.0.0.0"</span>]
</span>  -<span class="ruby">-watch, -w        监控文件                                           [boolean]
</span>  -<span class="ruby">-routes, -r       指定路由文件
</span>  -<span class="ruby">-static, -s       设置静态文件
</span>  -<span class="ruby">-read-only, --ro  只允许 GET 请求                                    [boolean]
</span>  -<span class="ruby">-no-cors, --nc    禁止跨域资源共享                                   [boolean]
</span>  -<span class="ruby">-no-gzip, --ng    禁止GZIP                                          [boolean]
</span>  -<span class="ruby">-snapshots, -S    设置快照目录                                     [默认: <span class="hljs-string">"."</span>]
</span>  -<span class="ruby">-delay, -d        设置反馈延时 (ms)
</span>  -<span class="ruby">-id, -i           设置数据的id属性 (e.g. _id)                     [默认: <span class="hljs-string">"id"</span>]
</span>  -<span class="ruby">-quiet, -q        不输出日志信息                                     [boolean]
</span>  -<span class="ruby">-help, -h         显示帮助信息                                       [boolean]
</span>  -<span class="ruby">-version, -v      显示版本号                                         [boolean]
</span>
Examples:
  bin db.json
  bin file.js
  bin http://example.com/db.json</code></pre>
<p>既可以通过命令行方式单行配置，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server db.js -p 3003 -d 500 -q -r ./routes.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">json-server db<span class="hljs-selector-class">.js</span> -<span class="hljs-selector-tag">p</span> <span class="hljs-number">3003</span> -d <span class="hljs-number">500</span> -<span class="hljs-selector-tag">q</span> -r ./routes.json</code></pre>
<p>，也可以通过 <code>json-server.json</code> 文件进行配置后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /mock/json-server.json

{
    &quot;host&quot;: &quot;0.0.0.0&quot;,
    &quot;port&quot;: &quot;3003&quot;,
    &quot;watch&quot;: false,
    &quot;delay&quot;: 500,
    &quot;quiet&quot;: true,
    &quot;routes&quot;: &quot;./routes.json&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"># /mock/json-server.json

{
    <span class="hljs-attr">"host"</span>: <span class="hljs-string">"0.0.0.0"</span>,
    <span class="hljs-attr">"port"</span>: <span class="hljs-string">"3003"</span>,
    <span class="hljs-attr">"watch"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">"delay"</span>: <span class="hljs-number">500</span>,
    <span class="hljs-attr">"quiet"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"routes"</span>: <span class="hljs-string">"./routes.json"</span>
}</code></pre>
<p>运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server db.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">json-<span class="hljs-keyword">server</span> db.js</code></pre>
<h3 id="articleHeader1">返回静态文件</h3>
<p>在 <code>/mock</code> 下建立 <code>public</code> 目录，即可直接访问其下的所有静态文件，包括但不限于<br><code>js</code>, <code>css</code> ,<code>markdown</code> 文件等。</p>
<p>地址栏输入 <code>http://localhist:3003/readme.md</code>  即可访问以下文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /mock/public/readme.md

# hello Mr DJ,这节奏不要停" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"># /mock/public/readme.md

# hello Mr DJ,这节奏不要停</code></pre>
<h3 id="articleHeader2">移动设备访问</h3>
<p>通过 <code>json server</code> 建立的rest api服务默认可以在局域网中通过WIFI访问接口。<br>windows下面通过 <code>ipconfig</code> 查找到电脑的局域网地址.mac设备是通过 <code>ifconfig | grep "inet " | grep -v 127.0.0.1</code> 查看。<br>比如我的电脑局域网ip是 <code>192.168.0.6</code>,在手机上访问 <code>http://192.168.0.6:3003</code>  即可。</p>
<h3 id="articleHeader3">自定义路由</h3>
<p>可以通过自定义路由的形式，简化数据结构，或是建立高弹性的web api，例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /mock/routes.json

{
  &quot;/news/:id/show&quot;: &quot;/news/:id&quot;,
  &quot;/topics/:id/show&quot;: &quot;/news/:id&quot;,
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"># /mock/routes.json

{
  <span class="hljs-attr">"/news/:id/show"</span>: <span class="hljs-string">"/news/:id"</span>,
  <span class="hljs-attr">"/topics/:id/show"</span>: <span class="hljs-string">"/news/:id"</span>,
    
}</code></pre>
<p>访问 <code>/news/1/show</code> 和 <code>topics/1/show</code> 均返回指定的 <code>/news/1</code> 内容。</p>
<p><strong> * 需要注意的是，路由必须以 <code>/</code> 开头</strong></p>
<h2 id="articleHeader4">npm启动</h2>
<p>相比在终端中直接输入各种命令，我更喜欢利用 <code>node scripts</code> 来处理任务，在 <code>/mock</code> 下建立文件 <code>package.json</code>,然后运行 <code>npm run mock</code> 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /mock/package.json

{
  &quot;scripts&quot;: {
    &quot;mock&quot;: &quot;json-server db.js&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code># <span class="hljs-regexp">/mock/</span><span class="hljs-keyword">package</span>.json

{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"mock"</span>: <span class="hljs-string">"json-server db.js"</span>
  }
}
</code></pre>
<p><a></a></p>
<h2 id="articleHeader5">数据过滤</h2>
<p>数据过滤是 <code>json server</code> 中非常强力的功能。通过url上简单的query字段，即可过滤出各种各样的数据。<br>示例数据源:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        &quot;id&quot;: 0,
        &quot;title&quot;: &quot;元小总小把清保住影办历战资和总由&quot;,
        &quot;desc&quot;: &quot;共先定制向向圆适者定书她规置斗平相。要广确但教金更前三响角面等以白。眼查何参提适&quot;,
        &quot;tag&quot;: &quot;值集空&quot;,
        &quot;views&quot;: 3810,
        &quot;images&quot;: [
            &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;,
            &quot;http://dummyimage.com/200x100/f28279&amp;text=收面几容受取&quot;,
            &quot;http://dummyimage.com/200x100/7993f2&amp;text=做件&quot;
        ]
    },
    {
        &quot;id&quot;: 1,
        &quot;title&quot;: &quot;物器许条对越复术&quot;,
        &quot;desc&quot;: &quot;方江周是府整头书生权部部条。始克识史但给又约同段十子按者感律备。关长厂平难山从合&quot;,
        &quot;tag&quot;: &quot;分七眼术保&quot;,
        &quot;views&quot;: 4673,
        &quot;images&quot;: [
            &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;
        ]
    },
    {
        &quot;id&quot;: 2,
        &quot;title&quot;: &quot;但学却连质法计性想般最&quot;,
        &quot;desc&quot;: &quot;以群亲它天即资几行位具回同务度。场养验快但部光天火金时内我。任提教毛办结论感看还&quot;,
        &quot;tag&quot;: &quot;响六&quot;,
        &quot;views&quot;: 4131,
        &quot;images&quot;: [
            &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;,
            &quot;http://dummyimage.com/200x100/f28279&amp;text=收面几容受取&quot;,
            &quot;http://dummyimage.com/200x100/7993f2&amp;text=做件&quot;
        ]
    },
    ...
    {
        &quot;id&quot;: 99,
        &quot;title&quot;: &quot;则群起然线部其深我位价业红候院&quot;,
        &quot;desc&quot;: &quot;为高值务须西生型住断况里听。志置开用她你然始查她响元还。照员给门次府此据它后支越&quot;,
        &quot;tag&quot;: &quot;何你&quot;,
        &quot;views&quot;: 2952,
        &quot;images&quot;: [
            &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;
        ]
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"元小总小把清保住影办历战资和总由"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"共先定制向向圆适者定书她规置斗平相。要广确但教金更前三响角面等以白。眼查何参提适"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"值集空"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">3810</span>,
        <span class="hljs-attr">"images"</span>: [
            <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/f28279&amp;text=收面几容受取"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/7993f2&amp;text=做件"</span>
        ]
    },
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"物器许条对越复术"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"方江周是府整头书生权部部条。始克识史但给又约同段十子按者感律备。关长厂平难山从合"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"分七眼术保"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">4673</span>,
        <span class="hljs-attr">"images"</span>: [
            <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>
        ]
    },
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"但学却连质法计性想般最"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"以群亲它天即资几行位具回同务度。场养验快但部光天火金时内我。任提教毛办结论感看还"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"响六"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">4131</span>,
        <span class="hljs-attr">"images"</span>: [
            <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/f28279&amp;text=收面几容受取"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/7993f2&amp;text=做件"</span>
        ]
    },
    ...
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">99</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"则群起然线部其深我位价业红候院"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"为高值务须西生型住断况里听。志置开用她你然始查她响元还。照员给门次府此据它后支越"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"何你"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">2952</span>,
        <span class="hljs-attr">"images"</span>: [
            <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>
        ]
    }
]</code></pre>
<h3 id="articleHeader6">属性值(Filter)</h3>
<p>使用 <code>.</code> 操作对象属性值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取图片数量为3，且标签字数为2的新闻

GET /news?images.length=3&amp;tag.length=2
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs glsl"><code><span class="hljs-comment">// 获取图片数量为3，且标签字数为2的新闻</span>

GET /news?images.<span class="hljs-built_in">length</span>=<span class="hljs-number">3</span>&amp;tag.<span class="hljs-built_in">length</span>=<span class="hljs-number">2</span>
</code></pre>
<h3 id="articleHeader7">分割(Slice)</h3>
<p>使用 <code>_start</code> 和 <code>_end</code> 或者 <code>_limit</code> (response中会包含 <code>X-Total-Count</code>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取id=10开始的5篇新闻

GET /news?_start=10&amp;_limit=5

// 获取id=20开始,id=35结束的新闻

GET /news?_start=20&amp;_end=35" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 获取id=10开始的5篇新闻</span>

GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?_start=<span class="hljs-number">10</span>&amp;_limit=<span class="hljs-number">5</span>

<span class="hljs-comment">// 获取id=20开始,id=35结束的新闻</span>

GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?_start=<span class="hljs-number">20</span>&amp;_end=<span class="hljs-number">35</span></code></pre>
<h3 id="articleHeader8">排序(Sort)</h3>
<p>使用 <code>_sort</code> 和 <code>_order</code> (默认使用升序(ASC))</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 按照浏览数量降序排列

GET /news?_sort=views&amp;_order=DESC
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 按照浏览数量降序排列</span>

GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?_sort=views&amp;_order=DESC
</code></pre>
<h3 id="articleHeader9">运算符(Operators)</h3>
<p>使用 <code>_gte</code> 或 <code>_lte</code> 选取一个范围</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 选取浏览量在2000-2500之间的新闻

GET /news?views_gte=2000&amp;views_lte=2500" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 选取浏览量在2000-2500之间的新闻</span>

GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?views_gte=<span class="hljs-number">2000</span>&amp;views_lte=<span class="hljs-number">2500</span></code></pre>
<p>使用 <code>_ne</code> 排除一个值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 选择tag属性不是 &quot;国际新闻&quot; 的分类

GET /news?tag_ne=国际新闻" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 选择tag属性不是 "国际新闻" 的分类</span>

GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?tag_ne=国际新闻</code></pre>
<p>使用 <code>_like</code> 进行模糊查找 (支持正则表达式)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 查找title中含有 &quot;前端&quot; 字样的新闻 

GET /news?title_like=前端" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 查找title中含有 "前端" 字样的新闻 </span>

GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?title_like=前端</code></pre>
<h3 id="articleHeader10">全文检索(Full-text search)</h3>
<p>使用 <code>q</code>，在对象全部value中遍历查找包含指定值的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 查找新闻全部字段包含 &quot;强拆&quot; 字样的数据

GET /news?q=强拆" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 查找新闻全部字段包含 "强拆" 字样的数据</span>

GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?q=强拆</code></pre>
<h3 id="articleHeader11">关系图谱(Relationships)</h3>
<p>获取包含下级资源的数据, 使用 <code>_embed</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /news?_embed=comments
GET /news/1?_embed=comments" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?_embed=comments
GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>/<span class="hljs-number">1</span>?_embed=comments</code></pre>
<p>获取包含上级资源的数据, 使用 <code>_expand</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /news?_expand=post
GET /news/1?_expand=post" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>?_expand=post
GET /<span class="hljs-keyword">new</span><span class="hljs-type">s</span>/<span class="hljs-number">1</span>?_expand=post</code></pre>
<p><a></a></p>
<h2 id="articleHeader12">作为中间件</h2>
<p>除了独立作为rest api 服务器之外， <code>json server</code> 同样可以作为诸如 <code>Express</code> 之类框架的中间件使用，具体API详见 <a href="https://github.com/typicode/json-server#module" rel="nofollow noreferrer" target="_blank">json server模块</a></p>
<h4>参考资料</h4>
<p>json-server源码 ： <a href="https://github.com/typicode/json-server" rel="nofollow noreferrer" target="_blank">json-server</a><br>mockjs源码 ： <a href="https://github.com/nuysoft/Mock" rel="nofollow noreferrer" target="_blank">mockjs</a><br>demo ： <a href="https://github.com/Iamlars/diaries/tree/master/demos/mock" rel="nofollow noreferrer" target="_blank">示例代码</a></p>
<p><strong>全文完</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用JSON-server模拟REST API(三) 进阶使用

## 原文链接
[https://segmentfault.com/a/1190000005793520](https://segmentfault.com/a/1190000005793520)

