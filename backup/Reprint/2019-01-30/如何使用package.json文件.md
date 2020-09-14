---
title: '如何使用package.json文件' 
date: 2019-01-30 2:30:22
hidden: true
slug: ytynfyc3k8c
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">如何使用package.json文件</h1>
<p><em>最近在整理之前写的模块的时候，发现很多模块的package.json写的并不是那么规范，所以查阅了一些资料，了解了一下关于如何使用package.json，列出来供大家参考</em></p>
<p><em>本文参考了这三篇文章</em></p>
<ul>
<li><p><a href="https://docs.npmjs.com/files/package.json#dependencies" rel="nofollow noreferrer" target="_blank">https://docs.npmjs.com/files/...</a></p></li>
<li><p><a href="http://www.cnblogs.com/tzyy/p/5193811.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/tzyy/p...</a></p></li>
<li><p><a href="http://javascript.ruanyifeng.com/nodejs/packagejson.html" rel="nofollow noreferrer" target="_blank">http://javascript.ruanyifeng....</a></p></li>
</ul>
<h4>属性列表</h4>
<h3 id="articleHeader1">概述</h3>
<p>这篇文档告诉了你package.json里面，包含了那些字段。这个文件必须是个json文件，而不仅是一个js对象。文档中很多属性和设置可以通过<a href="https://docs.npmjs.com/misc/config" rel="nofollow noreferrer" target="_blank">npm-config</a>来生成。</p>
<h3 id="articleHeader2">name（必填字段）</h3>
<p>package.json中有两个字段是必填字段。name字段和version字段。缺少这两个字段则无法安装npm模块。每个npm模块也是依赖这两个字段作为唯一标识。如果你的npm模块有所修改，那么对应的version字段也应该有所改变。</p>
<p>name字段就是你的npm模块的名称。</p>
<p>name字段需要符合以下规则：</p>
<ul>
<li><p>name必须&lt;= 214 个字节，包括模块的前缀</p></li>
<li><p>不得以“_” 或者 “.” 作为name的开头</p></li>
<li><p>不能有大写字符</p></li>
<li><p>因为name字段会成为URL的一部分，或是命令行的一个实参，也有可能是个文件夹的名字，所以不能包含no-URL-safe(URL非法)字符。</p></li>
</ul>
<p>一些建议：</p>
<ul>
<li><p>不要用和node核心模块一样的名称</p></li>
<li><p>不要把“js”和”node”字段包含在name中。因为你实际在编写json文件，而包含这些字段会被认为是个js文件而非npm模块，如果你需要指定某些引擎的话，可以在“engines”字段中填写。</p></li>
<li><p>name会被写在require()的参数中，所以name最好简短且明确。</p></li>
<li><p>创建一个name的时候，最好去<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/</a>查查名称是否被占用。</p></li>
</ul>
<p>name可以有一些前缀如 例如 @myorg/mypackage.可以在<a href="https://docs.npmjs.com/misc/scope" rel="nofollow noreferrer" target="_blank">npm-scope</a>的中查看详情。</p>
<h3 id="articleHeader3">version（必填字段）</h3>
<p>package.json中有两个字段是必填字段。name字段和version字段。缺少这两个字段则无法安装npm模块。每个npm模块也是依赖这两个字段作为唯一标识。如果你的npm模块有所修改，那么对应的version字段也应该有所改变。</p>
<p>version字段必须可以被node-semver这个模块解析，是个和npm捆绑在一起的包。</p>
<p>这里有关于版本号形式的含义<a href="https://segmentfault.com/a/1190000007787025">nodejs中每个版本形式的含义</a></p>
<h3 id="articleHeader4">description</h3>
<p>一段字符串，用来描述这个npm模块的作用，通过npm search的时候回用到。</p>
<h3 id="articleHeader5">keywords</h3>
<p>一个由字符串组成的数组，也有助于别人通过npm search的时候快速找到你的包。</p>
<h3 id="articleHeader6">homepage</h3>
<p>这个项目的主页URL。 注意：这里和url属性不是一个东西，如果你填了url属性，npm的注册工具会认为你把项目发布到别的地方了，就不会去npm官方仓库去找。</p>
<h3 id="articleHeader7">bugs</h3>
<p>包含你的项目的issue和email地址，如果别人在使用你的包的时候遇到了问题，可以通过这里找到你并提交问题。</p>
<p>它的格式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{     
  &quot;url&quot; : &quot;https://github.com/owner/project/issues&quot;,    
  &quot;email&quot; : &quot;project@hostname.com&quot;    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{     
  <span class="hljs-attr">"url"</span> : <span class="hljs-string">"https://github.com/owner/project/issues"</span>,    
  <span class="hljs-attr">"email"</span> : <span class="hljs-string">"project@hostname.com"</span>    
}
</code></pre>
<p>url和email你可以选填其中一个或者两个，如果只填一个，可以直接写成字符串，而不是一个对象。</p>
<p>如果提供了url, 使用npm bugs命令的时候会用到。</p>
<h3 id="articleHeader8">license</h3>
<p>给你的模块定一个协议，让大家知道这个模块的使用权限。例如：遵循BSD-2-Clause or MIT协议。添加一个SPDX许可如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{ &quot;license&quot; : &quot;BSD-3-Clause&quot; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>
{ <span class="hljs-attr">"license"</span> : <span class="hljs-string">"BSD-3-Clause"</span> }
</code></pre>
<p>这里查看<a href="https://spdx.org/licenses/" rel="nofollow noreferrer" target="_blank">SPDX协议完整列表</a>。理想情况下，你应该选一个<a href="https://opensource.org/licenses/alphabetical" rel="nofollow noreferrer" target="_blank">OSI</a>许可（开源许可）。</p>
<p>如果你的模块遵循多种许可，可以使用<a href="https://npmjs.com/package/spdx" rel="nofollow noreferrer" target="_blank">SPDX协议2.0的语法</a>，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{ &quot;license&quot; : &quot;(ISC OR GPL-3.0)&quot; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>
{ <span class="hljs-attr">"license"</span> : <span class="hljs-string">"(ISC OR GPL-3.0)"</span> }
</code></pre>
<p>如果你使用的是许可证还没有分配一个SPDX标识符,或者如果您使用的是一个定制的许可证,使用这样的字符串值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{ &quot;license&quot; : &quot;SEE LICENSE IN <filename>&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>
{ <span class="hljs-attr">"license"</span> : <span class="hljs-string">"SEE LICENSE IN &lt;filename&gt;"</span> }</code></pre>
<p>然后在模块的顶部include 这个&lt;filename&gt;的文件。</p>
<p>一些旧的模块使用许可对象或一个“许可证”属性,其中包含许可对象数组:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Not valid metadata
{ &quot;license&quot; :
  { &quot;type&quot; : &quot;ISC&quot;
  , &quot;url&quot; : &quot;http://opensource.org/licenses/ISC&quot;
  }
}
// Not valid metadata
{ &quot;licenses&quot; :
  [
    { &quot;type&quot;: &quot;MIT&quot;
    , &quot;url&quot;: &quot;http://www.opensource.org/licenses/mit-license.php&quot;
    }
  , { &quot;type&quot;: &quot;Apache-2.0&quot;
    , &quot;url&quot;: &quot;http://opensource.org/licenses/apache2.0.php&quot;
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// Not valid metadata
{ <span class="hljs-string">"license"</span> :
  { <span class="hljs-string">"type"</span> : <span class="hljs-string">"ISC"</span>
  , <span class="hljs-string">"url"</span> : <span class="hljs-string">"http://opensource.org/licenses/ISC"</span>
  }
}
// Not valid metadata
{ <span class="hljs-string">"licenses"</span> :
  [
    { <span class="hljs-string">"type"</span>: <span class="hljs-string">"MIT"</span>
    , <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://www.opensource.org/licenses/mit-license.php"</span>
    }
  , { <span class="hljs-string">"type"</span>: <span class="hljs-string">"Apache-2.0"</span>
    , <span class="hljs-string">"url"</span>: <span class="hljs-string">"http://opensource.org/licenses/apache2.0.php"</span>
    }
  ]
}</code></pre>
<p>上面的样式现在已经弃用。现在使用SPDX表达式,是这样的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;license&quot;: &quot;ISC&quot; }
{ &quot;license&quot;: &quot;(MIT OR Apache-2.0)&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span> }
{ <span class="hljs-attr">"license"</span>: <span class="hljs-string">"(MIT OR Apache-2.0)"</span> }</code></pre>
<p>最后,如果你不希望别人在任何条件下有任何使用你的包的权限，你可以这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;license&quot;: &quot;UNLICENSED&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attr">"license"</span>: <span class="hljs-string">"UNLICENSED"</span>}</code></pre>
<p>也考虑设置"private": true,来防止模块的意外发布</p>
<h3 id="articleHeader9">people fields: author, contributors</h3>
<p>用户相关的属性：author是一个作者，contributors是一个包含一堆作者的数组。每个person有一些描述的字段，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;name&quot; : &quot;Barney Rubble&quot;
, &quot;email&quot; : &quot;b@rubble.com&quot;
, &quot;url&quot; : &quot;http://barnyrubble.tumblr.com/&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"name"</span> : <span class="hljs-string">"Barney Rubble"</span>
, <span class="hljs-attr">"email"</span> : <span class="hljs-string">"b@rubble.com"</span>
, <span class="hljs-attr">"url"</span> : <span class="hljs-string">"http://barnyrubble.tumblr.com/"</span>
}</code></pre>
<p>也可以用下面的格式简写，npm会自动解析:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">"<span class="hljs-selector-tag">Barney</span> <span class="hljs-selector-tag">Rubble</span> &lt;<span class="hljs-selector-tag">b</span>@<span class="hljs-keyword">rubble</span>.<span class="hljs-keyword">com</span>&gt; (http://barnyrubble.tumblr.com/)<span class="hljs-string">"</span></code></pre>
<p>email和url属性实际上都是可以省略的。描述用户信息的还有一个"maintainers"（维护者）属性。</p>
<h3 id="articleHeader10">files</h3>
<p>file字段是一个包含在你项目里的文件的数组，里面的内容是文件名或者文件夹名。如果是文件夹，那么里面的文件也会被包含进来,除非你设置了ignore规则。<br>你也可以在模块根目录下创建一个".npmignore"文件（windows下无法直接创建以"."开头的文件，使用linux命令行工具创建如git bash），写在这个文件里边的文件即便被写在files属性里边也会被排除在外，这个文件的写法".gitignore"类似。</p>
<p>以下文件始终包含在内，无论是否设置：</p>
<ul>
<li><p>package.json</p></li>
<li><p>README (and its variants)</p></li>
<li><p>CHANGELOG (and its variants)</p></li>
<li><p>LICENSE / LICENCE</p></li>
</ul>
<p>相反，以下文件通常会被忽略：</p>
<ul>
<li><p>.git</p></li>
<li><p>CVS</p></li>
<li><p>.svn</p></li>
<li><p>.hg</p></li>
<li><p>.lock-wscript</p></li>
<li><p>.wafpickle-N</p></li>
<li><p>*.swp</p></li>
<li><p>.DS_Store</p></li>
<li><p>._*</p></li>
<li><p>npm-debug.log</p></li>
</ul>
<h3 id="articleHeader11">main</h3>
<p>main字段规定了程序的主入口文件。如果你的模块命名为foo,用户安装后，就会通过require("foo")来引用该模块，返回的内容就是你的模块的 module.exports指向的对象。</p>
<p>这是一个相对于你的模块文件夹的模块ID，对于大多数的模块，有个主脚本就足够了。</p>
<h3 id="articleHeader12">bin</h3>
<p>很多模块有一个或多个可执行文件需要配置到PATH路径下。npm就是通过这个特性安装，使得npm可执行。</p>
<p>要用这个功能，给package.json中的bin字段一个命令名到文件位置的map。初始化的时候npm会将他链接到prefix/bin（全局初始化）或者./node_modules/.bin/（本地初始化）。</p>
<p>例如：一个myapp模块可能是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;bin&quot; : { &quot;myapp&quot; : &quot;./cli.js&quot; } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attr">"bin"</span> : { <span class="hljs-attr">"myapp"</span> : <span class="hljs-string">"./cli.js"</span> } }</code></pre>
<p>所以，当你安装myapp，npm会从cli.js文件创建一个到/usr/local/bin/myapp路径下。</p>
<p>如果你只有一个可执行文件，并且名字和包名一样。那么你可以只用一个字符串，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;name&quot;: &quot;my-program&quot;
, &quot;version&quot;: &quot;1.2.5&quot;
, &quot;bin&quot;: &quot;./path/to/program&quot; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"name"</span>: <span class="hljs-string">"my-program"</span>
, <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.2.5"</span>
, <span class="hljs-attr">"bin"</span>: <span class="hljs-string">"./path/to/program"</span> }</code></pre>
<p>和下面是一样的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=", &quot;version&quot;: &quot;1.2.5&quot;
, &quot;bin&quot; : { &quot;my-program&quot; : &quot;./path/to/program&quot; } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>, <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.2.5"</span>
, <span class="hljs-string">"bin"</span> : { <span class="hljs-string">"my-program"</span> : <span class="hljs-string">"./path/to/program"</span> } }</code></pre>
<h3 id="articleHeader13">man</h3>
<p>用来给Linux下的man命令查找文档地址，是个单一文件或者文件数组。 如果是单一文件，安装完成后，他就是man + &lt;pkgname&gt;的结果，和此文件名无关，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;name&quot; : &quot;foo&quot;
, &quot;version&quot; : &quot;1.2.3&quot;
, &quot;description&quot; : &quot;A packaged foo fooer for fooing foos&quot;
, &quot;main&quot; : &quot;foo.js&quot;
, &quot;man&quot; : &quot;./man/doc.1&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"name"</span> : <span class="hljs-string">"foo"</span>
, <span class="hljs-attr">"version"</span> : <span class="hljs-string">"1.2.3"</span>
, <span class="hljs-attr">"description"</span> : <span class="hljs-string">"A packaged foo fooer for fooing foos"</span>
, <span class="hljs-attr">"main"</span> : <span class="hljs-string">"foo.js"</span>
, <span class="hljs-attr">"man"</span> : <span class="hljs-string">"./man/doc.1"</span>
}</code></pre>
<p>通过man foo命令会得到 ./man/doc.1 文件的内容。<br>如果man文件名称不是以模块名称开头的，安装的时候会给加上模块名称前缀。因此，下面这段配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;name&quot; : &quot;foo&quot;
, &quot;version&quot; : &quot;1.2.3&quot;
, &quot;description&quot; : &quot;A packaged foo fooer for fooing foos&quot;
, &quot;main&quot; : &quot;foo.js&quot;
, &quot;man&quot; : [ &quot;./man/foo.1&quot;, &quot;./man/bar.1&quot; ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"name"</span> : <span class="hljs-string">"foo"</span>
, <span class="hljs-attr">"version"</span> : <span class="hljs-string">"1.2.3"</span>
, <span class="hljs-attr">"description"</span> : <span class="hljs-string">"A packaged foo fooer for fooing foos"</span>
, <span class="hljs-attr">"main"</span> : <span class="hljs-string">"foo.js"</span>
, <span class="hljs-attr">"man"</span> : [ <span class="hljs-string">"./man/foo.1"</span>, <span class="hljs-string">"./man/bar.1"</span> ]</code></pre>
<p>会创建一些文件来作为man foo和man foo-bar命令的结果。<br>man文件必须以数字结尾，或者如果被压缩了，以.gz结尾。数字表示文件将被安装到man的哪个部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;name&quot; : &quot;foo&quot;
, &quot;version&quot; : &quot;1.2.3&quot;
, &quot;description&quot; : &quot;A packaged foo fooer for fooing foos&quot;
, &quot;main&quot; : &quot;foo.js&quot;
, &quot;man&quot; : [ &quot;./man/foo.1&quot;, &quot;./man/foo.2&quot; ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"name"</span> : <span class="hljs-string">"foo"</span>
, <span class="hljs-attr">"version"</span> : <span class="hljs-string">"1.2.3"</span>
, <span class="hljs-attr">"description"</span> : <span class="hljs-string">"A packaged foo fooer for fooing foos"</span>
, <span class="hljs-attr">"main"</span> : <span class="hljs-string">"foo.js"</span>
, <span class="hljs-attr">"man"</span> : [ <span class="hljs-string">"./man/foo.1"</span>, <span class="hljs-string">"./man/foo.2"</span> ]
}</code></pre>
<p>会创建 man foo 和 man 2 foo 两条命令。</p>
<h3 id="articleHeader14">directories</h3>
<p>CommonJs通过directories来制定一些方法来描述模块的结构，看看npm的package.json文件<a href="https://registry.npmjs.org/npm/latest" rel="nofollow noreferrer" target="_blank">npm's package.json</a> ，会看到有directories标示出doc, lib, and man。</p>
<p>目前这个配置没有任何作用，将来可能会整出一些花样来。</p>
<h4>directories.lib</h4>
<p>告诉用户模块中lib目录在哪，这个配置目前没有任何作用，但是对使用模块的人来说是一个很有用的信息。</p>
<h4>directories.bin</h4>
<p>如果你在这里指定了bin目录，这个配置下面的文件会被加入到bin路径下，如果你已经在package.json中配置了bin目录，那么这里的配置将不起任何作用。</p>
<h4>directories.man</h4>
<p>指定一个目录，目录里边都是man文件，这是一种配置man文件的语法糖。</p>
<h4>directories.doc</h4>
<p>在这个目录里边放一些markdown文件，可能最终有一天它们会被友好的展现出来（应该是在npm的网站上）</p>
<h4>directories.example</h4>
<p>放一些示例脚本，或许某一天会有用 - -！</p>
<h3 id="articleHeader15">repository</h3>
<p>指定你的代码存放的地方。这个对希望贡献的人有帮助。如果git仓库在github上，那么npm docs命令能找到你。</p>
<p>如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;repository&quot; :
  { &quot;type&quot; : &quot;git&quot;
  , &quot;url&quot; : &quot;https://github.com/npm/npm.git&quot;
  }
&quot;repository&quot; :
  { &quot;type&quot; : &quot;svn&quot;
  , &quot;url&quot; : &quot;https://v8.googlecode.com/svn/trunk/&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"repository"</span> :
  { <span class="hljs-string">"type"</span> : <span class="hljs-string">"git"</span>
  , <span class="hljs-string">"url"</span> : <span class="hljs-string">"https://github.com/npm/npm.git"</span>
  }
<span class="hljs-string">"repository"</span> :
  { <span class="hljs-string">"type"</span> : <span class="hljs-string">"svn"</span>
  , <span class="hljs-string">"url"</span> : <span class="hljs-string">"https://v8.googlecode.com/svn/trunk/"</span>
  }</code></pre>
<p>URL应该是公开的（即便是只读的）能直接被未经过修改的版本控制程序处理的url。不应该是一个html的项目页面。因为它是给计算机看的。</p>
<p>若你的模块放在GitHub, GitHub gist, Bitbucket, or GitLab的仓库里，npm install的时候可以使用缩写标记来完成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;repository&quot;: &quot;npm/npm&quot;
&quot;repository&quot;: &quot;gist:11081aaa281&quot;
&quot;repository&quot;: &quot;bitbucket:example/repo&quot;
&quot;repository&quot;: &quot;gitlab:another/repo&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"repository"</span>: <span class="hljs-string">"npm/npm"</span>
<span class="hljs-string">"repository"</span>: <span class="hljs-string">"gist:11081aaa281"</span>
<span class="hljs-string">"repository"</span>: <span class="hljs-string">"bitbucket:example/repo"</span>
<span class="hljs-string">"repository"</span>: <span class="hljs-string">"gitlab:another/repo"</span></code></pre>
<h3 id="articleHeader16">scripts</h3>
<p>scripts属性是一个对象，里边指定了项目的生命周期个各个环节需要执行的命令。key是生命周期中的事件，value是要执行的命令。<br>具体的内容有 install start stop 等，详见<a href="https://docs.npmjs.com/misc/scripts" rel="nofollow noreferrer" target="_blank">npm-scripts</a>.</p>
<h3 id="articleHeader17">config</h3>
<p>用来设置一些项目不怎么变化，跨版本的项目配置，例如port等。<br>用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;name&quot; : &quot;foo&quot;
, &quot;config&quot; : { &quot;port&quot; : &quot;8080&quot; } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"name"</span> : <span class="hljs-string">"foo"</span>
, <span class="hljs-attr">"config"</span> : { <span class="hljs-attr">"port"</span> : <span class="hljs-string">"8080"</span> } }</code></pre>
<p>然后有一个start命令引用npm_package_config_port环境变量，用户也可以用如下方式改写：<code>npm config set foo:port 8001</code></p>
<p>See <a href="https://docs.npmjs.com/misc/config" rel="nofollow noreferrer" target="_blank">npm-config</a> and <a href="https://docs.npmjs.com/misc/config" rel="nofollow noreferrer" target="_blank">npm-scripts</a> for more on package configs.</p>
<h3 id="articleHeader18">dependencies</h3>
<p>dependencies属性是一个对象，配置模块依赖的模块列表，key是模块名称，value是版本范围，版本范围是一个字符，可以被一个或多个空格分割。</p>
<p>dependencies也可以被指定为一个git地址或者一个压缩包地址。</p>
<p><em>不要把测试工具或transpilers写到dependencies中。</em> 对比下面的devDependencies。</p>
<p>下面是一些写法，详见<a href="https://docs.npmjs.com/misc/semver" rel="nofollow noreferrer" target="_blank">https://docs.npmjs.com/misc/s...</a></p>
<ul>
<li><p>version 精确匹配版本</p></li>
<li><p>&gt;version 必须大于某个版本</p></li>
<li><p>&gt;=version 大于等于</p></li>
<li><p>&lt;version 小于</p></li>
<li><p>&lt;=versionversion 小于</p></li>
<li><p>~version "约等于"，具体规则详见semver文档</p></li>
<li><p>^version "兼容版本"具体规则详见semver文档</p></li>
<li><p>1.2.x 仅一点二点几的版本</p></li>
<li><p>http://... 见下面url作为denpendencies的说明</p></li>
<li><p>*任何版本</p></li>
<li><p>"" 空字符，和*相同</p></li>
<li><p>version1 - version2 相当于 &gt;=version1 &lt;=version2.</p></li>
<li><p>range1 || range2 范围1和范围2满足任意一个都行</p></li>
<li><p>git... 见下面git url作为denpendencies的说明</p></li>
<li><p>user/repo See 见下面GitHub仓库的说明</p></li>
<li><p>tag 发布的一个特殊的标签，见npm-tag的文档 <a href="https://docs.npmjs.com/getting-started/using-tags" rel="nofollow noreferrer" target="_blank">https://docs.npmjs.com/gettin...</a></p></li>
<li><p>path/path/path 见下面本地模块的说明</p></li>
</ul>
<p>下面的写法都是可行的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;dependencies&quot; :
  { &quot;foo&quot; : &quot;1.0.0 - 2.9999.9999&quot;
  , &quot;bar&quot; : &quot;>=1.0.2 <2.1.2&quot;
  , &quot;baz&quot; : &quot;>1.0.2 <=2.3.4&quot;
  , &quot;boo&quot; : &quot;2.0.1&quot;
  , &quot;qux&quot; : &quot;<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0&quot;
  , &quot;asd&quot; : &quot;http://asdf.com/asdf.tar.gz&quot;
  , &quot;til&quot; : &quot;~1.2&quot;
  , &quot;elf&quot; : &quot;~1.2.3&quot;
  , &quot;two&quot; : &quot;2.x&quot;
  , &quot;thr&quot; : &quot;3.3.x&quot;
  , &quot;lat&quot; : &quot;latest&quot;
  , &quot;dyl&quot; : &quot;file:../dyl&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"dependencies"</span> :
  { <span class="hljs-attr">"foo"</span> : <span class="hljs-string">"1.0.0 - 2.9999.9999"</span>
  , <span class="hljs-attr">"bar"</span> : <span class="hljs-string">"&gt;=1.0.2 &lt;2.1.2"</span>
  , <span class="hljs-attr">"baz"</span> : <span class="hljs-string">"&gt;1.0.2 &lt;=2.3.4"</span>
  , <span class="hljs-attr">"boo"</span> : <span class="hljs-string">"2.0.1"</span>
  , <span class="hljs-attr">"qux"</span> : <span class="hljs-string">"&lt;1.0.0 || &gt;=2.3.1 &lt;2.4.5 || &gt;=2.5.2 &lt;3.0.0"</span>
  , <span class="hljs-attr">"asd"</span> : <span class="hljs-string">"http://asdf.com/asdf.tar.gz"</span>
  , <span class="hljs-attr">"til"</span> : <span class="hljs-string">"~1.2"</span>
  , <span class="hljs-attr">"elf"</span> : <span class="hljs-string">"~1.2.3"</span>
  , <span class="hljs-attr">"two"</span> : <span class="hljs-string">"2.x"</span>
  , <span class="hljs-attr">"thr"</span> : <span class="hljs-string">"3.3.x"</span>
  , <span class="hljs-attr">"lat"</span> : <span class="hljs-string">"latest"</span>
  , <span class="hljs-attr">"dyl"</span> : <span class="hljs-string">"file:../dyl"</span>
  }
}</code></pre>
<h4>URLs依赖</h4>
<p>在版本范围的地方可以写一个url指向一个压缩包，模块安装的时候会把这个压缩包下载下来安装到模块本地。</p>
<h4>Git URLs依赖</h4>
<p>git URL可以写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+ssh://user@hostname/project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>git://github.com/user/<span class="hljs-keyword">project</span>.git<span class="hljs-comment">#commit-ish</span>
git+ssh://user@hostname:<span class="hljs-keyword">project</span>.git<span class="hljs-comment">#commit-ish</span>
git+ssh://user@hostname/<span class="hljs-keyword">project</span>.git<span class="hljs-comment">#commit-ish</span>
git+http://user@hostname/<span class="hljs-keyword">project</span>/blah.git<span class="hljs-comment">#commit-ish</span>
git+https://user@hostname/<span class="hljs-keyword">project</span>/blah.git<span class="hljs-comment">#commit-ish</span></code></pre>
<p>commit-ish 可以是任意tag，hash，或者可以检出的分支，默认是master分支。</p>
<h4>github URLs</h4>
<p>支持github的 username/modulename 的写法，#后边可以加后缀写明分支hash或标签,如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;foo&quot;,
  &quot;version&quot;: &quot;0.0.0&quot;,
  &quot;dependencies&quot;: {
    &quot;express&quot;: &quot;visionmedia/express&quot;,
    &quot;mocha&quot;: &quot;visionmedia/mocha#4727d357ea&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"foo"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.0.0"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"express"</span>: <span class="hljs-string">"visionmedia/express"</span>,
    <span class="hljs-attr">"mocha"</span>: <span class="hljs-string">"visionmedia/mocha#4727d357ea"</span>
  }
}</code></pre>
<h4>本地路径</h4>
<p>npm2.0.0版本以上可以提供一个本地路径来安装一个本地的模块，通过npm install xxx --save 来安装，格式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="../foo/bar
~/foo/bar
./foo/bar
/foo/bar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>..<span class="hljs-regexp">/foo/</span>bar
~<span class="hljs-regexp">/foo/</span>bar
.<span class="hljs-regexp">/foo/</span>bar
<span class="hljs-regexp">/foo/</span>bar</code></pre>
<p>package.json 生成的相对路径如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;baz&quot;,
  &quot;dependencies&quot;: {
    &quot;bar&quot;: &quot;file:../foo/bar&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"baz"</span>,
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"bar"</span>: <span class="hljs-string">"file:../foo/bar"</span>
  }</code></pre>
<p>这种属性在离线开发或者测试需要用npm install的情况，又不想自己搞一个npm server的时候有用，但是发布模块到公共仓库时不应该使用这种属性。</p>
<h3 id="articleHeader19">devDependencies</h3>
<p>如果别人只想使用你的模块，而不需要开发和测试所需要的依赖的时候，这种情况下，可以将开发测试依赖的包，写到devDependencies中。</p>
<p>这些模块会在npm link或者npm install的时候被安装，也可以像其他npm配置一样被管理，详见npm的config文档。<br>对于一些跨平台的构建任务，例如把CoffeeScript编译成JavaScript，就可以通过在package.json的script属性里边配置prepublish脚本来完成这个任务，然后需要依赖的coffee-script模块就写在devDependencies属性种。<br>例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;name&quot;: &quot;ethopia-waza&quot;,
  &quot;description&quot;: &quot;a delightfully fruity coffee varietal&quot;,
  &quot;version&quot;: &quot;1.2.3&quot;,
  &quot;devDependencies&quot;: {
    &quot;coffee-script&quot;: &quot;~1.6.3&quot;
  },
  &quot;scripts&quot;: {
    &quot;prepublish&quot;: &quot;coffee -o lib/ -c src/waza.coffee&quot;
  },
  &quot;main&quot;: &quot;lib/waza.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{ <span class="hljs-attr">"name"</span>: <span class="hljs-string">"ethopia-waza"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"a delightfully fruity coffee varietal"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.2.3"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"coffee-script"</span>: <span class="hljs-string">"~1.6.3"</span>
  },
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"prepublish"</span>: <span class="hljs-string">"coffee -o lib/ -c src/waza.coffee"</span>
  },
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"lib/waza.js"</span>
}</code></pre>
<p>prepublish脚本会在publishing前运行，这样用户就不用自己去require来编译就能使用。并且在开发模式中（比如本地运行npm install）会运行这个脚本以便更好地测试。</p>
<h3 id="articleHeader20">peerDependencies</h3>
<p>有时，你的项目和所依赖的模块，都会同时依赖另一个模块，但是所依赖的版本不一样。比如，你的项目依赖A模块和B模块的1.0版，而A模块本身又依赖B模块的2.0版。</p>
<p>大多数情况下，这不构成问题，B模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。</p>
<p>最典型的场景就是插件，比如A模块是B模块的插件。用户安装的B模块是1.0版本，但是A插件只能和2.0版本的B模块一起使用。这时，用户要是将1.0版本的B的实例传给A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果A和B一起安装，那么B必须是2.0模块。</p>
<p>peerDependencies字段，就是用来供插件指定其所需要的主工具的版本。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;tea-latte&quot;,
  &quot;version&quot;: &quot;1.3.5&quot;,
  &quot;peerDependencies&quot;: {
    &quot;tea&quot;: &quot;2.x&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"tea-latte"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.3.5"</span>,
  <span class="hljs-attr">"peerDependencies"</span>: {
    <span class="hljs-attr">"tea"</span>: <span class="hljs-string">"2.x"</span>
  }
}</code></pre>
<p>上面这个配置确保再npm install的时候tea-latte会和2.x版本的tea一起安装，而且它们两个的依赖关系是同级的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── tea-latte@1.3.5
└── tea@2.2.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>├── tea-latte@<span class="hljs-number">1.3</span><span class="hljs-number">.5</span>
└── tea@<span class="hljs-number">2.2</span><span class="hljs-number">.0</span></code></pre>
<p>这个配置的目的是让npm知道，如果要使用此插件模块，请确保安装了兼容版本的宿主模块。</p>
<h3 id="articleHeader21">bundledDependencies</h3>
<p>指定发布的时候会被一起打包的模块。</p>
<h3 id="articleHeader22">optionalDependencies</h3>
<p>如果一个依赖模块可以被使用， 但你也希望在该模块找不到或无法获取时npm不中断运行，你可以把这个模块依赖放到optionalDependencies配置中。这个配置的写法和dependencies的写法一样，不同的是这里边写的模块安装失败不会导致npm install失败。<br>但是需要自己处理模块缺失的情况，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  var foo = require('foo')
  var fooVersion = require('foo/package.json').version
} catch (er) {
  foo = null
}
if ( notGoodFooVersion(fooVersion) ) {
  foo = null
}
// .. then later in your program ..
if (foo) {
  foo.doFooThings()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">var</span> foo = <span class="hljs-built_in">require</span>(<span class="hljs-string">'foo'</span>)
  <span class="hljs-keyword">var</span> fooVersion = <span class="hljs-built_in">require</span>(<span class="hljs-string">'foo/package.json'</span>).version
} <span class="hljs-keyword">catch</span> (er) {
  foo = <span class="hljs-literal">null</span>
}
<span class="hljs-keyword">if</span> ( notGoodFooVersion(fooVersion) ) {
  foo = <span class="hljs-literal">null</span>
}
<span class="hljs-comment">// .. then later in your program ..</span>
<span class="hljs-keyword">if</span> (foo) {
  foo.doFooThings()
}</code></pre>
<p>optionalDependencies 中的配置会覆盖dependencies中同名的配置，最好只在一个地方写。</p>
<h3 id="articleHeader23">engines</h3>
<p>你可以指定项目的node的版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;engines&quot; : { &quot;node&quot; : &quot;>=0.10.3 <0.12&quot; } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attr">"engines"</span> : { <span class="hljs-attr">"node"</span> : <span class="hljs-string">"&gt;=0.10.3 &lt;0.12"</span> } }</code></pre>
<p>和dependencies一样，如果你不指定版本范围或者指定为*，任何版本的node都可以。<br>也可以指定一些npm版本可以正确的安装你的模块，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ &quot;engines&quot; : { &quot;npm&quot; : &quot;~1.0.20&quot; } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code style="word-break: break-word; white-space: initial;">{ <span class="hljs-attr">"engines"</span> : { <span class="hljs-attr">"npm"</span> : <span class="hljs-string">"~1.0.20"</span> } }</code></pre>
<p>记住，除非用户设置engine-strict标记，F否则这个字段只是建议值。</p>
<h3 id="articleHeader24">engineStrict</h3>
<p>注意：这个属性已经弃用，将在npm 3.0.0 版本干掉。</p>
<h3 id="articleHeader25">os</h3>
<p>指定你的模块只能在哪个操作系统上跑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;os&quot; : [ &quot;darwin&quot;, &quot;linux&quot; ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"os"</span> : [ <span class="hljs-string">"darwin"</span>, <span class="hljs-string">"linux"</span> ]</code></pre>
<p>也可以指定黑名单而不是白名单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;os&quot; : [ &quot;!win32&quot; ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"os"</span> : [ <span class="hljs-string">"!win32"</span> ]</code></pre>
<p>操作系统是由process.platform来判断的，这个属性允许黑白名单同时存在，虽然没啥必要.</p>
<h3 id="articleHeader26">cpu</h3>
<p>如果你的代码只能运行在特定的cpu架构下，你可以指定一个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;cpu&quot; : [ &quot;x64&quot;, &quot;ia32&quot; ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"cpu"</span> : [ <span class="hljs-string">"x64"</span>, <span class="hljs-string">"ia32"</span> ]</code></pre>
<p>也可以设置黑名单:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;cpu&quot; : [ &quot;!arm&quot;, &quot;!mips&quot; ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"cpu"</span> : [ <span class="hljs-string">"!arm"</span>, <span class="hljs-string">"!mips"</span> ]</code></pre>
<p>cpu架构通过 process.arch 判断</p>
<h3 id="articleHeader27">preferGlobal</h3>
<p>如果你的模块主要是需要全局安装的命令行程序，就设置它为true，就会提供一个warning，这样来只在局部安装的人会得到这个warning。</p>
<p>它不会真正的防止用户在局部安装，只是防止该模块被错误的使用引起一些问题。</p>
<h3 id="articleHeader28">private</h3>
<p>如果这个属性被设置为true，npm将不会发布它。</p>
<p>这是为了防止一个私有模块被无意间发布出去。如果你想让模块被发布到一个特定的npm仓库，如一个内部的仓库，可与在下面的publishConfig中配置仓库参数。</p>
<h3 id="articleHeader29">publishConfig</h3>
<p>这是一个在publish-time时会用到的配置集合。当你想设置tag、registry或access时特别有用，所以你可以确保一个给定的包无法在没有被打上"latest"标记时就被发布到全局公共的registry。</p>
<p>任何配置都可以被覆盖，当然可能只有"tag", "registry"和"access"和发布意图有关。</p>
<p>参考<a href="https://docs.npmjs.com/misc/config" rel="nofollow noreferrer" target="_blank">npm-config</a>来查看那些可以被覆盖的配置项列表。</p>
<h3 id="articleHeader30">DEFAULT VALUES</h3>
<p>npm会根据包的内容设置一些默认值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {&quot;start&quot;: &quot;node server.js&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"scripts"</span>: {<span class="hljs-string">"start"</span>: <span class="hljs-string">"node server.js"</span>}</code></pre>
<p>如果模块根目录下有一个server.js文件，那么npm start会默认运行这个文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;:{&quot;preinstall&quot;: &quot;node-gyp rebuild&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"scripts"</span>:{<span class="hljs-string">"preinstall"</span>: <span class="hljs-string">"node-gyp rebuild"</span>}</code></pre>
<p>如果模块根目录下有binding.gyp, npm将默认用node-gyp来编译preinstall的脚本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;contributors&quot;: [...]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"contributors"</span>: <span class="hljs-string">[...]</span></code></pre>
<p>若模块根目录下有AUTHORS 文件，则npm会按Name (url)格式解析每一行的数据添加到contributors中，可以用#添加行注释</p>
<p>参考资料</p>
<ul>
<li><p><a href="https://docs.npmjs.com/misc/semver" rel="nofollow noreferrer" target="_blank">semver</a></p></li>
<li><p><a href="https://docs.npmjs.com/cli/init" rel="nofollow noreferrer" target="_blank">npm-init</a></p></li>
<li><p><a href="https://docs.npmjs.com/cli/version" rel="nofollow noreferrer" target="_blank">npm-version</a></p></li>
<li><p><a href="https://docs.npmjs.com/cli/config" rel="nofollow noreferrer" target="_blank">npm-config</a></p></li>
<li><p><a href="https://docs.npmjs.com/misc/config" rel="nofollow noreferrer" target="_blank">npm-config</a></p></li>
<li><p><a href="https://docs.npmjs.com/cli/help" rel="nofollow noreferrer" target="_blank">npm-help</a></p></li>
<li><p><a href="https://docs.npmjs.com/misc/faq" rel="nofollow noreferrer" target="_blank">npm-faq</a></p></li>
<li><p><a href="https://docs.npmjs.com/cli/install" rel="nofollow noreferrer" target="_blank">npm-install</a></p></li>
<li><p><a href="https://docs.npmjs.com/cli/publish" rel="nofollow noreferrer" target="_blank">npm-publish</a></p></li>
<li><p><a href="https://docs.npmjs.com/cli/uninstall" rel="nofollow noreferrer" target="_blank">npm-uninstall</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用package.json文件

## 原文链接
[https://segmentfault.com/a/1190000007777410](https://segmentfault.com/a/1190000007777410)

