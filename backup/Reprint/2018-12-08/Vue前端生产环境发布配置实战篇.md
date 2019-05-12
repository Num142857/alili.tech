---
title: 'Vue前端生产环境发布配置实战篇' 
date: 2018-12-08 2:30:30
hidden: true
slug: 0nw1blacmwx
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>首先这篇文章是写给Vue新手的，老司机基本不用看了。</p>
<p>当我们刚接触vue的时候，特别是对于第一次用前端框架的同学来说，心情可以说是比较激动的，框架带来的种种新体验，是以前jQuery无法给你的兴奋和满足感。但是在体验了几个demo的新鲜感之后，我们就要考虑如何把框架结合到我们实际的开发中如何应用的问题了。</p>
<p>下面我主要总结三个和生产发布相关的问题：资源文件发布文件夹配置，图片文件的引用，以及后台接口调试方法。</p>
<h3 id="articleHeader1">一，资源文件发布配置</h3>
<p>一般项目都是用vue-cli脚手架搭建项目，然后编写自己的代码。vue-cli脚手架生成的配置，默认资源文件都在static文件夹下面，build发布的js和css文件也是在static文件夹下面，index.html文件则是和static形成相对路径关系。</p>
<p>而实际我们的生产发布环境中，页面文件和资源文件不一定在同一目录下，页面文件和js,css文件也不在同一目录下。</p>
<p>以php的Yii2环境为例，页面文件一般都放在<strong><em>views</em></strong>文件夹，页面访问路径可能是 “<a href="http://xxxx.com/index.php/sales-task/create" rel="nofollow noreferrer" target="_blank">http://xxxx.com/index.php/sal...</a>” 这样的url形式。而js,css,image等资源文件则需要放在<strong><em>web</em></strong>文件夹下，访问路径则是从<strong>根目录</strong>开始访问的。如果在<em>web</em>目录下新建static文件夹，访问路径是 “<a href="http://xxxx.com/static/images/logo.png" rel="nofollow noreferrer" target="_blank">http://xxxx.com/static/images...</a>” 这样的url形式。实际开发中我们不能把所有项目资源文件都放在<em>web</em>目录下的static文件夹，需要按项目新建不同的文件夹，在每个项目文件夹里再新建js,css,images等文件夹来安放各自的资源文件，访问路径应该是 “<a href="http://xxxx.com/sales-task/images/logo.png" rel="nofollow noreferrer" target="_blank">http://xxxx.com/sales-task/im...</a>” 这样的url形式。</p>
<p><strong>因此修改配置文件如下：</strong></p>
<ol>
<li>把vue项目下的static文件夹名称改成项目名称，名称由小写英文字母，横杠连接符“-”，数字组成，例如sales-task。</li>
<li>修改config/index.js，把dev和build属性里的assetsSubDirectorys的值都改成项目名称，例如sales-task。build的assetsPublicPath值改成“/”，这样所有资源文件的引用都从根目录引用，避免相对路径错误。</li>
<li>修改build/webpack.dev.conf.js，把plugins的new CopyWebpackPlugin那里的from: path.resolve(__dirname, '../static')，改为from: path.resolve(__dirname, '../sales-task')。</li>
<li>build/webpack.prod.conf.js里也做同样的修改。</li>
<li>上线前发布最终线上文件时，config/index.js里的build设置属性productionSourceMap: false,同时注释掉devtool: '#source-map',以避免产生.map映射文件。正式上线前这个还是要保留的，否则调试代码会很不方便。</li>
</ol>
<h3 id="articleHeader2">二，图片文件的引用方式</h3>
<p>vue项目中有2种图片引用方式，一种是静态引用，按照我们上面的资源文件夹配置，图片路径直接写到template的html代码里，格式示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;/sales-task/images/logo.png&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"/sales-task/images/logo.png"</span>&gt;</code></pre>
<p>这样在开发模式和发布模式下都能正常引用到图片，好处是和正常html代码格式一样，方便代码的编写和修改。缺点是图片文件地址是静态的，替换图片后如果不手动更换文件名无法解决缓存问题。</p>
<p>另一种方法就是更科学的模块化方式，用require引用图片，这样发布后图片文件名也会生成唯一识别码，图片修改后就会重新生成不同的文件名，从而能避免缓存问题，另外小图片还可以直接生成base64码，减少文件请求。require引用也有两种形式，直接写在:src属性上（注意这里和静态引用不一样，不是src而是:src了）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img :src=&quot;require('../assets/images/logo.png')&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;img <span class="hljs-symbol">:src=<span class="hljs-string">"require('../assets/images/logo.png')"</span>&gt;</span></code></pre>
<p>或者把图片引用数据写在data绑定数据里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img :src=&quot;logoImg&quot;>
...
<script>
export default
  {
    data()
    {
      return {
        logoImg:require('../assets/images/logo.png')
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"logoImg"</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>
  {
    data()
    {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">logoImg</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">'../assets/images/logo.png'</span>)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当然我还是推荐绑定数据的方法，代码看起来更清爽，也便于维护。</p>
<p>另外需要说明的是在vue的&lt;style&gt;&lt;/style&gt;块内的样式里定义的background-image引用图片不需要require引用，直接通过相对路径引入就可以实现上面相同的效果。</p>
<h3 id="articleHeader3">三，后台接口调试方法</h3>
<p>这里后台接口调试指的是在开发模式下的调试。</p>
<p>vue的开发模式是通过webpack-dev-server启动一个本地服务，所以在开发模式下调用后台接口就产生了跨域问题。这里要<strong>说明一下</strong>，如果要调用的后台接口本身就是跨域的接口，也就是说<strong>页面和接口文件不在同一个域名下</strong>，跨域问题需要在后端设置，这时其实vue项目不需要特殊配置了，因为本地访问和发布后访问都是跨域的，解决后端跨域就都解决了。所以我们这里要配置的，还是针对发布以后页面和接口不存在跨越问题，只是开发模式下本地服务和接口产生的跨越问题，如何解决。</p>
<p>首先还是打开config/index.js，找到module.exports里的dev，里面有一项proxyTable，默认是空的，我们要按照我们的接口路径，修改如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
        '/sales-task-api':{
            target:&quot;http://xxxxx.com/sales-task-api&quot;,
            changeOrigin:true,
            pathRewrite: {&quot;^/sales-task-api&quot; : &quot;/&quot;} 
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">proxyTable</span>: {
        <span class="hljs-string">'/sales-task-api'</span>:{
            <span class="hljs-attribute">target</span>:<span class="hljs-string">"http://xxxxx.com/sales-task-api"</span>,
            <span class="hljs-attribute">changeOrigin</span>:true,
            <span class="hljs-attribute">pathRewrite</span>: {<span class="hljs-string">"^/sales-task-api"</span> : <span class="hljs-string">"/"</span>} 
        }
    }</code></pre>
<p>注意上面3个地方的接口路径名称（示例中的"sales-task-api"）要保持一致。<br>例如实际要调用的接口地址是：<a href="http://xxxxx.com/sales-task-api/get-user-list" rel="nofollow noreferrer" target="_blank">http://xxxxx.com/sales-task-a...</a> ,经过这样配置设置后，我们在vue中就可以通过 "/sales-task-api/get-user-list" 这样的地址调用，也不会产生跨域问题。同时因为是采用的根目录访问路径，在生产发布以后也不会产生接口访问路径错误问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue前端生产环境发布配置实战篇

## 原文链接
[https://segmentfault.com/a/1190000014047020](https://segmentfault.com/a/1190000014047020)

