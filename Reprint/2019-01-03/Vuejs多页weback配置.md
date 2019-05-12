---
title: 'Vuejs多页weback配置' 
date: 2019-01-03 2:30:11
hidden: true
slug: tod24hoztkg
categories: [reprint]
---

{{< raw >}}

                    
<p><code>webpack</code>的流行给前端开发减少了许多不必要的工作，<code>webpack</code>可以让我们更纯粹的关注我们的代码，但是很多人认为它更适合单页应用，主要有以下一些痛点</p>
<ul>
<li>如果模板是后台管理的生成的怎么办</li>
<li>我目前没有使用任何模块化的开发方式，或使用了模块加载器（如<code>seajs</code>、<code>requireJs</code>等）</li>
</ul>
<p>其实第二点我已经在上篇文章中讲过了，如果平滑的过渡到<code>webpack</code>，痛点一也解释过，只是没有详细的说明，此次分享一个完整的配置，来应对你的多页项目。不管是<code>jsp</code>、<code>php</code>、<code>html</code>、<code>xshtml</code>都可以通过具体的配置来使用<code>webpack</code>，为什么如此青睐<code>webpack</code>，在我看来热<strong>更新技术</strong>、<code>less</code>、<code>sass</code>、<code>es6</code>、<code>es7</code>的引入是最吸引我的（尝试过使用<code>gulp</code>、但是感觉并没有<code>webpack</code>这种一站式服务来得顺手），下面我详细讲述下下面一些配置的用途，部分代码来自<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─build                 // webpack的配置文件存放目录
├─Public                // 我们的前端资源存放目录
│  ├─dev                // 源码存放目录（可以改名为src）
│  │  ├─css             // 一些共用的css文件，共用才放这里哦
│  │  ├─font            // 字体文件
│  │  ├─images          // 图片文件
│  │  └─js              // js文件
│  │      ├─libs        // npm里没有的第三方插件或库
│  │      ├─modules     // 项目的业务组件存放目录
│  │      └─page        // 页面的目录
│  │          └─Index   // 具体的页面名称
│  └─dist               // 编译后的存放目录
└─static                // 好像是拿来缓存文件用的？vue-cli存在的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>├─build                 <span class="hljs-comment">// webpack的配置文件存放目录</span>
├─<span class="hljs-keyword">Public</span>                <span class="hljs-comment">// 我们的前端资源存放目录</span>
│  ├─dev                <span class="hljs-comment">// 源码存放目录（可以改名为src）</span>
│  │  ├─css             <span class="hljs-comment">// 一些共用的css文件，共用才放这里哦</span>
│  │  ├─font            <span class="hljs-comment">// 字体文件</span>
│  │  ├─images          <span class="hljs-comment">// 图片文件</span>
│  │  └─js              <span class="hljs-comment">// js文件</span>
│  │      ├─libs        <span class="hljs-comment">// npm里没有的第三方插件或库</span>
│  │      ├─modules     <span class="hljs-comment">// 项目的业务组件存放目录</span>
│  │      └─page        <span class="hljs-comment">// 页面的目录</span>
│  │          └─<span class="hljs-keyword">Index</span>   <span class="hljs-comment">// 具体的页面名称</span>
│  └─dist               <span class="hljs-comment">// 编译后的存放目录</span>
└─<span class="hljs-keyword">static</span>                <span class="hljs-comment">// 好像是拿来缓存文件用的？vue-cli存在的</span></code></pre>
<p>当然，我目前开发的项目是半路引入<code>webpack</code>的，大部分都还是<code>jQuery</code>那套东西、但是我还是秉着<strong>关注点分离</strong>的原则，将<code>html</code>、<code>css</code>、<code>js</code>按页面来放了，不再使用老掉牙的按文件类型来放、那是因为有了<code>webpack</code>的打包才可以这么随意。除了分离出来的模板（<code>ThinkPHP</code>用<code>&lt;include file=""/&gt;</code>标签来引入模板）文件，js和css都是放到同模板名的Public/dev/js/modules目录里了，这样一来可以直接像这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require( './style.less' );
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>( <span class="hljs-string">'./style.less'</span> );
...</code></pre>
<p>先在js文件的头部引入这个组件的样式文件，再来写js代码，至少我们在使用组件的时候不必关心css了（下篇文章会讲讲重构后如何连html也不关注了）</p>
<h4>images</h4>
<p>这里为什么会有一个<code>images</code>目录看起来很多余呢，那是因为我们的php模板里的图片标签<code>src</code>前面都带了一个<code>php</code>的系统变量，<code>webpack</code>插件的静态分析是无法识别这里的路径的，所以保留了这个目录，在打包后用插件拷贝到打包目录里</p>
<h4>page</h4>
<p>然后是<code>page</code>这个目录，这个目录是拿来存放我们页面的三剑客的，比如有一个叫<code>index</code>的目录，里面有<code>css</code>、<code>js</code>、<code>html</code>文件，这里的<code>index</code>可以看作是一个页面目录，也可以看作是一个分类，如果是分类，那下面就应该是页面了，html里不应该引用<code>css</code>文件和<code>js</code>文件，因为webpack会帮我们插入生成新的html到我们指定的目录里</p>
<p>最重要的就是<code>build</code>目录下的了</p>
<h4>config.js</h4>
<p><code>proxyTable</code>项我已经在上篇文章中讲过了，这里就不赘述了</p>
<h4>mapping.js</h4>
<p>这个文件就是描述我们<code>entry</code>也就是入口文件和html模板之间的关系映射的文件的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  // 微知首页
  'Index': {
    // 对应到Public/dev/js/page的文件夹名称
    file: 'main',
    // 视图层的文件名称，默认为index
    viewFile: 'index',
    disable: false,
    templateOutput: 'Index'
  },
  'EditText': {
    chunks: [ 'editor' ],
    disable: false
  },
  // 编辑模板
  'Template': {
    chunks: [ 'editor' ],
    disable: true
  },
  // 默认模板
  'GzhArtStyle': {
    chunks: [ 'editor' ],
    disable: true
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 微知首页</span>
  <span class="hljs-string">'Index'</span>: {
    <span class="hljs-comment">// 对应到Public/dev/js/page的文件夹名称</span>
    file: <span class="hljs-string">'main'</span>,
    <span class="hljs-comment">// 视图层的文件名称，默认为index</span>
    viewFile: <span class="hljs-string">'index'</span>,
    <span class="hljs-attr">disable</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">templateOutput</span>: <span class="hljs-string">'Index'</span>
  },
  <span class="hljs-string">'EditText'</span>: {
    <span class="hljs-attr">chunks</span>: [ <span class="hljs-string">'editor'</span> ],
    <span class="hljs-attr">disable</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-comment">// 编辑模板</span>
  <span class="hljs-string">'Template'</span>: {
    <span class="hljs-attr">chunks</span>: [ <span class="hljs-string">'editor'</span> ],
    <span class="hljs-attr">disable</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-comment">// 默认模板</span>
  <span class="hljs-string">'GzhArtStyle'</span>: {
    <span class="hljs-attr">chunks</span>: [ <span class="hljs-string">'editor'</span> ],
    <span class="hljs-attr">disable</span>: <span class="hljs-literal">true</span>
  }
};</code></pre>
<p>这里导出的每个对象的键值都对应了<code>page</code>目录里的名字，下面的<code>file</code>字段对应的入口js文件名称，默认为<code>main</code>，<code>viewFile</code>对应的是html模板名称，默认为<code>index</code>，这里很有用，因为在<code>ThinkPHP</code>的<code>View</code>目录里模板部分文件夹的，所以我们配合<code>templateOutput</code>把html输出过去就不存在目录了，<code>templateOutput</code>的默认值为这个对象的键值如Index默认为Index。<code>disable</code>字段是开发模式使用的，当运行<code>npm run dev</code>命令时会自动扫描这个字段，若为<code>false</code>才会启动，如果全部都为false，那么你页面越多造成性能开销就越大，所以除非你同时去开发几个页面，这里建议启动的页面不超过5个，其他页面若要运行，提前<code>npm run build</code>一次让它跑编译后的代码就好了。<code>chunks</code>字段是用来标记当前页面依赖的除了共有<code>chunks</code>需要依赖的其他<code>chunks</code>，上面的有chunks字段的三个页面都是引用了百度编辑器，因为百度编辑器的包都太大了，所以不建议抽取到公用的chunk里，这里的配置在<code>webpack.prod.cfg.js</code>文件里有单独配置。</p>
<h4>utils.js</h4>
<p>这个文件主要是<code>getHtmlWebpackPlugins</code>方法，配合注释您就能看懂刚才的mapping配置都怎么用的了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.getHtmlWebpackPlugins = ( rename ) => {
  let HtmlWebpackPlugins = [];
  Object.keys( mapping ).forEach( function( name ) {
    // 如果不是开发环境 就全部打包
    // 如果是开发环境 就根据disable来进行打包
    ( process.env.NODE_ENV !== 'development' ||
      !mapping[ name ].disable ) &amp;&amp;
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin( {
        alwaysWriteToDisk: true,
        // php端使用到的模板
        // 如果是其他目录在此修改路径
        filename: `${ROOT}/Application/Home/View/${mapping[ name ].templateOutput ? mapping[ name ].templateOutput : name}/${mapping[name].viewFile || 'index'}.html`,
        // 插件用的模板文件
        template: `${ROOT}/${config.$d}/js/page/${name}/${mapping[name].viewFile || 'index'}.${mapping[name].templateType || 'html'}`,
        chunks: ( function() {
          if ( !rename ) {
            //let chunks = [ 'vendor.npm', 'vendor.TP', 'manifest', 'vendor.modules' ];
            let chunks = [ 'vendor.modules', 'vendor', 'manifest' ];
            if ( mapping[ name ].chunks ) {
              chunks = chunks.concat( mapping[ name ].chunks );
            }
            return chunks;
          }
          return [];
        }() ).concat( [ `${rename ? config.dev.entryPrefix : ''}${name}` ] ),
        // 手工排序
        chunksSortMode: 'manual',
        inject: true,
        showErrors: false
      } ) );
  } );
  return HtmlWebpackPlugins;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.getHtmlWebpackPlugins = <span class="hljs-function">(<span class="hljs-params"> rename </span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> HtmlWebpackPlugins = [];
  <span class="hljs-built_in">Object</span>.keys( mapping ).forEach( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> name </span>) </span>{
    <span class="hljs-comment">// 如果不是开发环境 就全部打包</span>
    <span class="hljs-comment">// 如果是开发环境 就根据disable来进行打包</span>
    ( process.env.NODE_ENV !== <span class="hljs-string">'development'</span> ||
      !mapping[ name ].disable ) &amp;&amp;
    HtmlWebpackPlugins.push(
      <span class="hljs-keyword">new</span> HtmlWebpackPlugin( {
        <span class="hljs-attr">alwaysWriteToDisk</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">// php端使用到的模板</span>
        <span class="hljs-comment">// 如果是其他目录在此修改路径</span>
        filename: <span class="hljs-string">`<span class="hljs-subst">${ROOT}</span>/Application/Home/View/<span class="hljs-subst">${mapping[ name ].templateOutput ? mapping[ name ].templateOutput : name}</span>/<span class="hljs-subst">${mapping[name].viewFile || <span class="hljs-string">'index'</span>}</span>.html`</span>,
        <span class="hljs-comment">// 插件用的模板文件</span>
        template: <span class="hljs-string">`<span class="hljs-subst">${ROOT}</span>/<span class="hljs-subst">${config.$d}</span>/js/page/<span class="hljs-subst">${name}</span>/<span class="hljs-subst">${mapping[name].viewFile || <span class="hljs-string">'index'</span>}</span>.<span class="hljs-subst">${mapping[name].templateType || <span class="hljs-string">'html'</span>}</span>`</span>,
        <span class="hljs-attr">chunks</span>: ( <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">if</span> ( !rename ) {
            <span class="hljs-comment">//let chunks = [ 'vendor.npm', 'vendor.TP', 'manifest', 'vendor.modules' ];</span>
            <span class="hljs-keyword">let</span> chunks = [ <span class="hljs-string">'vendor.modules'</span>, <span class="hljs-string">'vendor'</span>, <span class="hljs-string">'manifest'</span> ];
            <span class="hljs-keyword">if</span> ( mapping[ name ].chunks ) {
              chunks = chunks.concat( mapping[ name ].chunks );
            }
            <span class="hljs-keyword">return</span> chunks;
          }
          <span class="hljs-keyword">return</span> [];
        }() ).concat( [ <span class="hljs-string">`<span class="hljs-subst">${rename ? config.dev.entryPrefix : <span class="hljs-string">''</span>}</span><span class="hljs-subst">${name}</span>`</span> ] ),
        <span class="hljs-comment">// 手工排序</span>
        chunksSortMode: <span class="hljs-string">'manual'</span>,
        <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">showErrors</span>: <span class="hljs-literal">false</span>
      } ) );
  } );
  <span class="hljs-keyword">return</span> HtmlWebpackPlugins;
}</code></pre>
<p><code>alwaysWriteToDisk</code>这个字段是我们能前后端结合开发的关键，没有使用后端模板的项目真的做到前后分离时是不需要这个字段的，因为PHP会读这个文件再渲染数据出来给浏览器</p>
<h4>webpack.base.cfg.js、webpack.dev.cfg.js</h4>
<p>都是些老生常谈的配置，这里就不赘述了。值得注意的是<code>dev.client.js</code>这个文件被我删了，因为使用了<code>alwaysWriteToDisk</code>实时写入的功能，改变css文件和js文件都会强制刷新，那热更新完全就没法用了，所以html文件的变化还是需要手动刷新的</p>
<h4>webpack.prod.cfg.js</h4>
<p><code>HtmlWebpackPlugin</code>这个插件确实是有多少页面就要插入多少个实例进去的，所以直接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...utils.getHtmlWebpackPlugins( false )," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">...utils.getHtmlWebpackPlugins( <span class="hljs-literal">false</span> ),</code></pre>
<p>展开这个数组就好了，这里传入的布尔参数是为了区分开发模式和build模式，传入<code>true</code>只会有一个chunk被包含进来，就是当前页面依赖的所有js和css等<br>然后是<code>chunks</code></p>
<h5>manifest</h5>
<p>有的页面因为太简单并没有依赖太多共用的js，但是依赖了共用的css，所以这个chunk仅仅是为了抽取css文件用，造成引用了一个空的js，暂时没有想到好的解决办法，欢迎再issues提出改进建议</p>
<h5>vendor.modules</h5>
<p>这个chunk是为了抽取我们自己写的业务组件、在修改业务组件后能够很好的利用缓存只更新这一个文件</p>
<h5>commonChunk</h5>
<p>上文<code>mapping</code>里的chunks字段就是这里配置的，如果还有其他局部共用的大chunk可以在这里再配置一个</p>
<h5>vendor</h5>
<p>vendor就是拿来放置第三方插件的，这里抽取了npm和lib里面的，当项目稳定后处于一个稳定的维护期，没有较大改动时，这个文件就可以长期缓存在用户的电脑里了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new CopyWebpackPlugin( [ {
  from: path.resolve( __dirname, `../${config.$d}/images` ),
  to: `${config.build.assetsSubDirectory}/images`,
  ignore: [ '.*' ]
} ] )," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> CopyWebpackPlugin( [ {
  <span class="hljs-attr">from</span>: path.resolve( __dirname, <span class="hljs-string">`../<span class="hljs-subst">${config.$d}</span>/images`</span> ),
  <span class="hljs-attr">to</span>: <span class="hljs-string">`<span class="hljs-subst">${config.build.assetsSubDirectory}</span>/images`</span>,
  <span class="hljs-attr">ignore</span>: [ <span class="hljs-string">'.*'</span> ]
} ] ),</code></pre>
<p>上面的代码就是拷贝images这个目录到我们打包生成的目录里，防止资源丢失的问题</p>
<hr>
<p>这个脚手架很可能无法直接运行在你的项目里，但是能为你的多页入口的<code>website</code>提供一个很好的引入<code>webpack</code>的思路</p>
<p>嗯，留下仓库<a href="https://github.com/Ryuurock/vue-muilt-page-config" rel="nofollow noreferrer" target="_blank">传送门</a><br>和<a href="http://ryuurock.me/2017/08/17/vue-muilt-page-config" rel="nofollow noreferrer" target="_blank">博客地址</a><br>have fun ~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuejs多页weback配置

## 原文链接
[https://segmentfault.com/a/1190000010753734](https://segmentfault.com/a/1190000010753734)

