---
title: '用JSON-server模拟REST API(一) 安装运行' 
date: 2019-02-08 2:30:41
hidden: true
slug: 5w32vsphkrx
categories: [reprint]
---

{{< raw >}}

                    
<p>在开发过程中，前后端不论是否分离，接口多半是滞后于页面开发的。所以建立一个REST风格的API接口，给前端页面提供虚拟的数据，是非常有必要的。</p>
<p>对比过多种mock工具后，我最终选择了使用 <code>json server</code> 作为工具，因为它足够简单，写少量数据，即可使用。<br>也因为它足够强大，支持CORS和JSONP跨域请求，支持GET, POST, PUT, PATCH 和 DELETE 方法，更提供了一系列的查询方法，如limit，order等。下面我将详细介绍 <code>json server</code> 的使用。</p>
<h2 id="articleHeader0">安装</h2>
<p>首先你的电脑中需要安装nodejs，建议使用最新版本。然后全局安装json server.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm install json-server -g " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">  npm install json-server -g </code></pre>
<p>使用linux和macOS的电脑需要加上sudo</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  sudo npm install json-server -g " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">  sudo npm install json-server -g </code></pre>
<p>安装完成后可以用 <code>json-server -h</code> 命令检查是否安装成功，成功后会出现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server [options] <source>

选项：
  --config, -c       Path to config file            [默认值: &quot;json-server.json&quot;]
  --port, -p         Set port                                     [默认值: 3000]
  --host, -H         Set host                                [默认值: &quot;0.0.0.0&quot;]
  --watch, -w        Watch file(s)                                        [布尔]
  --routes, -r       Path to routes file
  --static, -s       Set static files directory
  --read-only, --ro  Allow only GET requests                              [布尔]
  --no-cors, --nc    Disable Cross-Origin Resource Sharing                [布尔]
  --no-gzip, --ng    Disable GZIP Content-Encoding                        [布尔]
  --snapshots, -S    Set snapshots directory                       [默认值: &quot;.&quot;]
  --delay, -d        Add delay to responses (ms)
  --id, -i           Set database id property (e.g. _id)          [默认值: &quot;id&quot;]
  --quiet, -q        Suppress log messages from output                    [布尔]
  --help, -h         显示帮助信息                                         [布尔]
  --version, -v      显示版本号                                           [布尔]

示例：
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json

https://github.com/typicode/json-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>json-server [options] &lt;source&gt;

选项：
  -<span class="ruby">-config, -c       Path to config file            [默认值: <span class="hljs-string">"json-server.json"</span>]
</span>  -<span class="ruby">-port, -p         Set port                                     [默认值: <span class="hljs-number">3000</span>]
</span>  -<span class="ruby">-host, -H         Set host                                [默认值: <span class="hljs-string">"0.0.0.0"</span>]
</span>  -<span class="ruby">-watch, -w        Watch file(s)                                        [布尔]
</span>  -<span class="ruby">-routes, -r       Path to routes file
</span>  -<span class="ruby">-static, -s       Set static files directory
</span>  -<span class="ruby">-read-only, --ro  Allow only GET requests                              [布尔]
</span>  -<span class="ruby">-no-cors, --nc    Disable Cross-Origin Resource Sharing                [布尔]
</span>  -<span class="ruby">-no-gzip, --ng    Disable GZIP Content-Encoding                        [布尔]
</span>  -<span class="ruby">-snapshots, -S    Set snapshots directory                       [默认值: <span class="hljs-string">"."</span>]
</span>  -<span class="ruby">-delay, -d        Add delay to responses (ms)
</span>  -<span class="ruby">-id, -i           Set database id property (e.g. _id)          [默认值: <span class="hljs-string">"id"</span>]
</span>  -<span class="ruby">-quiet, -q        Suppress log messages from output                    [布尔]
</span>  -<span class="ruby">-help, -h         显示帮助信息                                         [布尔]
</span>  -<span class="ruby">-version, -v      显示版本号                                           [布尔]
</span>
示例：
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json

https://github.com/typicode/json-server</code></pre>
<h2 id="articleHeader1">运行</h2>
<p>安装完成后，可以在任一目录下建立一个 <code>xxx.json</code> 文件,例如在 <code>mock/</code> 文件夹下，建立一个 <code>db.json</code> 文件，并写入以下内容，并在 <code>mock/</code> 文件夹下执行 <code>json-server db.json -p 3003</code> 。<br><a></a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;news&quot;:[
    {
      &quot;id&quot;: 1,
      &quot;title&quot;: &quot;曹县宣布昨日晚间登日成功&quot;,
      &quot;date&quot;: &quot;2016-08-12&quot;,
      &quot;likes&quot;: 55,
      &quot;views&quot;: 100086
    },
    {
      &quot;id&quot;: 2,
      &quot;title&quot;: &quot;长江流域首次发现海豚&quot;,
      &quot;date&quot;: &quot;2016-08-12&quot;,
      &quot;likes&quot;: 505,
      &quot;views&quot;: 9800
    }
  ],
  &quot;comments&quot;:[
    {
      &quot;id&quot;: 1,
      &quot;news_id&quot;: 1,
      &quot;data&quot;: [
        {
          &quot;id&quot;: 1,
          &quot;content&quot;: &quot;支持党中央决定&quot;
        },
        {
          &quot;id&quot;: 2,
          &quot;content&quot;: &quot;抄写党章势在必行！&quot;
        }
      ]
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"news"</span>:[
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"title"</span>: <span class="hljs-string">"曹县宣布昨日晚间登日成功"</span>,
      <span class="hljs-attr">"date"</span>: <span class="hljs-string">"2016-08-12"</span>,
      <span class="hljs-attr">"likes"</span>: <span class="hljs-number">55</span>,
      <span class="hljs-attr">"views"</span>: <span class="hljs-number">100086</span>
    },
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">"title"</span>: <span class="hljs-string">"长江流域首次发现海豚"</span>,
      <span class="hljs-attr">"date"</span>: <span class="hljs-string">"2016-08-12"</span>,
      <span class="hljs-attr">"likes"</span>: <span class="hljs-number">505</span>,
      <span class="hljs-attr">"views"</span>: <span class="hljs-number">9800</span>
    }
  ],
  <span class="hljs-attr">"comments"</span>:[
    {
      <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"news_id"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">"data"</span>: [
        {
          <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
          <span class="hljs-attr">"content"</span>: <span class="hljs-string">"支持党中央决定"</span>
        },
        {
          <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
          <span class="hljs-attr">"content"</span>: <span class="hljs-string">"抄写党章势在必行！"</span>
        }
      ]
    }
  ]
}</code></pre>
<p>为了方便，再创建一个 <code>package.json</code> 文件，写入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;mock&quot;: &quot;json-server db.json --port 3003&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"mock"</span>: <span class="hljs-string">"json-server db.json --port 3003"</span>
  }
}
</code></pre>
<p>然后使用到 <code>/mock</code> 目录下执行 <code>npm run mock</code> 命令，如果成功会出现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> @ mock /你的电脑中mock文件夹所在目录的路径/mock
> json-server db.json -p 3003


  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3003/news
  http://localhost:3003/comments

  Home
  http://localhost:3003
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&gt; @ mock /你的电脑中mock文件夹所在目录的路径/mock
&gt; json-server db<span class="hljs-selector-class">.json</span> -<span class="hljs-selector-tag">p</span> <span class="hljs-number">3003</span>


  \{^_^}/ hi!

  Loading db<span class="hljs-selector-class">.json</span>
  Done

  Resources
  http:<span class="hljs-comment">//localhost:3003/news</span>
  http:<span class="hljs-comment">//localhost:3003/comments</span>

  Home
  http:<span class="hljs-comment">//localhost:3003</span>
</code></pre>
<p>如果不成功请检查 <code>db.json</code> 文件的格式是否正确。</p>
<h2 id="articleHeader2">操作数据</h2>
<h3 id="articleHeader3">GET</h3>
<p>这个时候访问 <code>http://localhost:3003/db</code> 可以查看 <code>db.json</code> 文件中所定义的全部数据。<br>使用浏览器地址栏，<code>jQuery.get</code> 或 <code>fecth({method: "get"})</code> 访问 <code>http://localhost:3003/news</code> ，则可以看到 <code>news</code> 对象下的数据,以Array格式返回:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    &quot;id&quot;: 1,
    &quot;title&quot;: &quot;曹县宣布昨日晚间登日成功&quot;,
    &quot;date&quot;: &quot;2016-08-12&quot;,
    &quot;likes&quot;: 55,
    &quot;views&quot;: 100086
  },
  {
    &quot;id&quot;: 2,
    &quot;title&quot;: &quot;长江流域首次发现海豚&quot;,
    &quot;date&quot;: &quot;2016-08-12&quot;,
    &quot;likes&quot;: 505,
    &quot;views&quot;: 9800
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
  {
    <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">"title"</span>: <span class="hljs-string">"曹县宣布昨日晚间登日成功"</span>,
    <span class="hljs-attr">"date"</span>: <span class="hljs-string">"2016-08-12"</span>,
    <span class="hljs-attr">"likes"</span>: <span class="hljs-number">55</span>,
    <span class="hljs-attr">"views"</span>: <span class="hljs-number">100086</span>
  },
  {
    <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">"title"</span>: <span class="hljs-string">"长江流域首次发现海豚"</span>,
    <span class="hljs-attr">"date"</span>: <span class="hljs-string">"2016-08-12"</span>,
    <span class="hljs-attr">"likes"</span>: <span class="hljs-number">505</span>,
    <span class="hljs-attr">"views"</span>: <span class="hljs-number">9800</span>
  }
]</code></pre>
<h3 id="articleHeader4">POST</h3>
<p>以jquery的 <code>$.ajax</code> 方法举例,以下代码会实时的向 <code>db.json</code> 中的 <code>news</code> 对象push一条新的数据再次用 <code>get</code> 方式访问 <code>http://localhost:3003/news</code> , 就可以看到它了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    type: 'post',
    url: 'http://localhost:3003/news',
    data: {
      &quot;id&quot;: 3,
      &quot;title&quot;: &quot;我是新加入的新闻&quot;,
      &quot;date&quot;: &quot;2016-08-12&quot;,
      &quot;likes&quot;: 0,
      &quot;views&quot;: 0
    }
  }
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>$.ajax({
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'pos</span>t',
    url: <span class="hljs-symbol">'http</span>:<span class="hljs-comment">//localhost:3003/news',</span>
    data: {
      <span class="hljs-string">"id"</span>: <span class="hljs-number">3</span>,
      <span class="hljs-string">"title"</span>: <span class="hljs-string">"我是新加入的新闻"</span>,
      <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-08-12"</span>,
      <span class="hljs-string">"likes"</span>: <span class="hljs-number">0</span>,
      <span class="hljs-string">"views"</span>: <span class="hljs-number">0</span>
    }
  }
)</code></pre>
<h3 id="articleHeader5">PUT</h3>
<p>同样以jquery的 <code>$.ajax</code> 方法举例,以下代码会实时的对 <code>db.json</code> 中的 <code>news</code> 对象中 <code>id=1</code> 数据进行修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    type: 'put',
    url: 'http://localhost:3003/news/1',
    data: {
      &quot;title&quot;: &quot;曹县宣布昨日晚间登日失败&quot;,
      &quot;date&quot;: &quot;2016-08-12&quot;,
      &quot;likes&quot;: 55,
      &quot;views&quot;: 100086
    }
  }
)

// 结果

[
  {
    &quot;id&quot;: 1,
    &quot;title&quot;: &quot;曹县宣布昨日晚间登日失败&quot;,
    &quot;date&quot;: &quot;2016-08-12&quot;,
    &quot;likes&quot;: 55,
    &quot;views&quot;: 100086
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>$.ajax({
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'pu</span>t',
    url: <span class="hljs-symbol">'http</span>:<span class="hljs-comment">//localhost:3003/news/1',</span>
    data: {
      <span class="hljs-string">"title"</span>: <span class="hljs-string">"曹县宣布昨日晚间登日失败"</span>,
      <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-08-12"</span>,
      <span class="hljs-string">"likes"</span>: <span class="hljs-number">55</span>,
      <span class="hljs-string">"views"</span>: <span class="hljs-number">100086</span>
    }
  }
)

<span class="hljs-comment">// 结果</span>

[
  {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">"title"</span>: <span class="hljs-string">"曹县宣布昨日晚间登日失败"</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-08-12"</span>,
    <span class="hljs-string">"likes"</span>: <span class="hljs-number">55</span>,
    <span class="hljs-string">"views"</span>: <span class="hljs-number">100086</span>
  }
]</code></pre>
<p><strong>PATCH 和 DELETE 使用方式同上，就不做演示了。</strong></p>
<h4>参考资料</h4>
<p>json-server源码 ： <a href="https://github.com/typicode/json-server" rel="nofollow noreferrer" target="_blank">json-server</a><br>mockjs源码 ： <a href="https://github.com/nuysoft/Mock" rel="nofollow noreferrer" target="_blank">mockjs</a><br>demo ： <a href="https://github.com/Iamlars/diaries/tree/master/demos/mock" rel="nofollow noreferrer" target="_blank">示例代码</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用JSON-server模拟REST API(一) 安装运行

## 原文链接
[https://segmentfault.com/a/1190000005793257](https://segmentfault.com/a/1190000005793257)

