---
title: '移动端采用Flexible将PX转换REM适配及开发中Retina屏1px边框的两种解决方案' 
date: 2018-12-29 2:30:10
hidden: true
slug: bco2cesvug9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">移动端采用Flexible将PX转换REM适配及开发中Retina屏1px边框的两种解决方案</h1>
<blockquote><p>说明：两个方案均基于Webpack构建。</p></blockquote>
<h2 id="articleHeader1">
<a href="https://github.com/whidy/mobileweb2" rel="nofollow noreferrer" target="_blank">方案一</a>：</h2>
<h3 id="articleHeader2">搭建环境及相关配置</h3>
<ul>
<li>webpack 3，需要loader及说明</li>
<li>css-loader, style-loader 加载css文件</li>
<li>expose-loader 暴露全局例如jquery</li>
<li>url-loader 样式文件内的图片等资源</li>
<li>file-loader 字体等资源</li>
</ul>
<h3 id="articleHeader3">使用库和主要插件</h3>
<ul>
<li>jquery</li>
<li>normalize</li>
<li><a href="https://github.com/amfe/lib-flexible/tree/master" rel="nofollow noreferrer" target="_blank">lib-flexible 0.3.2</a></li>
<li>
<a href="https://github.com/songsiqi/px2rem" rel="nofollow noreferrer" target="_blank">px2rem</a> + <a href="https://github.com/Jinjiang/px2rem-loader" rel="nofollow noreferrer" target="_blank">px2rem-loader</a>
</li>
</ul>
<h3 id="articleHeader4">要解决一些问题</h3>
<p>自适应这里采用了旧版的<a href="https://github.com/whidy/mobileweb2/blob/master/src/script/flexible.js" rel="nofollow noreferrer" target="_blank">flexible</a>，并通过px2rem来进行单位转换，关于样式中的px值是否转换为rem或者输出多种对应不同dpr的px值，请查看插件说明进行对应的注释，例如<code>/*no*/</code>和<code>/*px*/</code>。这里有一点需要说明的是，与<strong><a href="https://github.com/whidy/mobileweb" rel="nofollow noreferrer" target="_blank">mobileweb</a></strong>不同的是，旧版的flexible具有最大宽度1080(540*dpr)的问题？也就是说当屏幕宽度大于1080的时候，两边会留出空白，而无法占满屏幕？如有错误，望指正截取一段<a href="https://github.com/whidy/mobileweb2/blob/master/src/script/flexible.js#L69" rel="nofollow noreferrer" target="_blank">flexible</a>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function refreshRem() {
  var width = docEl.getBoundingClientRect().width;
  if (width / dpr > 540) {
    width = 540 * dpr;
  }
  var rem = width / 10;
  docEl.style.fontSize = rem + 'px';
  flexible.rem = win.rem = rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">refreshRem</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> width = docEl.getBoundingClientRect().width;
  <span class="hljs-keyword">if</span> (width / dpr &gt; <span class="hljs-number">540</span>) {
    width = <span class="hljs-number">540</span> * dpr;
  }
  <span class="hljs-keyword">var</span> rem = width / <span class="hljs-number">10</span>;
  docEl.style.fontSize = rem + <span class="hljs-string">'px'</span>;
  flexible.rem = win.rem = rem;
}</code></pre>
<p>这里有个小小的建议就是给<a href="https://github.com/whidy/mobileweb2/blob/a1faf0ac6dcb5b96130669b5c9e236a68b7d38ab/src/style/index.scss#L5" rel="nofollow noreferrer" target="_blank">body</a>加上一段居中样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
  max-width: 750px; /* 设计稿最大宽度 */
  margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">750px</span>; <span class="hljs-comment">/* 设计稿最大宽度 */</span>
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p>这样当设备宽度大于设计稿的宽度时，则整体页面居中，更加美观。（再次强调mobileweb中用的最新的flexible会自动扩展到满屏，不存在该问题。）</p>
<h3 id="articleHeader5">附加：关于<a href="https://github.com/whidy/mobileweb2/blob/master/webpack.dev.js" rel="nofollow noreferrer" target="_blank">webpack配置</a>写法参考</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: &quot;style-loader&quot;,
        use: [{
          loader: &quot;css-loader&quot;
        }, {
          loader: &quot;px2rem-loader&quot;,
          options: {
            remUnit: 75,
            threeVersion: true
          }
        }, {
          loader: 'postcss-loader'
        }, {
          loader: &quot;sass-loader&quot;
        }, ]
      })
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 4096
        }
      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jQuery'
      }, {
        loader: 'expose-loader',
        options: '$'
      }]
    }
  ]
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">rules</span>: [{
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
      <span class="hljs-attr">use</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
      <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">"style-loader"</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">"px2rem-loader"</span>,
          <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">remUnit</span>: <span class="hljs-number">75</span>,
            <span class="hljs-attr">threeVersion</span>: <span class="hljs-literal">true</span>
          }
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'postcss-loader'</span>
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">"sass-loader"</span>
        }, ]
      })
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
      <span class="hljs-attr">use</span>: [{
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">4096</span>
        }
      }]
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff|woff2|eot|ttf|otf)$/</span>,
      <span class="hljs-attr">use</span>: [
        <span class="hljs-string">'file-loader'</span>
      ]
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'jquery'</span>),
      <span class="hljs-attr">use</span>: [{
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'expose-loader'</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-string">'jQuery'</span>
      }, {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'expose-loader'</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-string">'$'</span>
      }]
    }
  ]
},</code></pre>
<p>主要是px2rem-loader这里的对px2rem的相关配置，我这里设计稿750，因此设定75，其他参数可自行<a href="https://github.com/songsiqi/px2rem" rel="nofollow noreferrer" target="_blank">参考文档</a>。</p>
<blockquote>
<p><strong>注1：</strong></p>
<p>这个demo依然有引入PostCSS，因为webpack下没有一个很好autoprefixer的loader（其实有一个<a href="https://www.npmjs.com/package/autoprefixer-loader" rel="nofollow noreferrer" target="_blank">autoprefixer-loader</a>，该loader也提示了autoprefixer官方推荐使用postcss-loader替代），因此依然加入了PostCSS混合SASS开发。</p>
<p><strong>注2：</strong></p>
<p>不太确定如果单位写成PX是否会存在兼容性问题，不过在高级浏览器和我测试的几部手机观察来看未发生异常。</p>
<p>假设通过将单位故意大写为<code>PX</code>而避免转换的话，是不是相对尾部写<code>/*no*/</code>来进行过滤更为方便？</p>
<p>发现这个特征的是在学习postcss的时候用到<a href="https://github.com/cuth/postcss-pxtorem" rel="nofollow noreferrer" target="_blank">postcss-pxtorem</a>插件，碰巧测试出来的。</p>
<p>当然个人倒的确倾向于写<code>PX</code>，如果不存在兼容性问题。</p>
<p><strong>示例：</strong><br>转换前：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pic-txts {
  text-align: left;
  border:1px solid #ddd; /*px*/
  border-radius: 5PX;
  width:690px;
  display: block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.pic-txts</span> {
  <span class="hljs-attribute">text-align</span>: left;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>; <span class="hljs-comment">/*px*/</span>
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5PX</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">690px</span>;
  <span class="hljs-attribute">display</span>: block;
}</code></pre>
<p>转换后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pic-txts {
  text-align: left;
  border-radius: 5PX;
  width: 9.2rem;
  display: block;
}

[data-dpr=&quot;1&quot;] .pic-txts {
  border: 0.5px solid #ddd;
}

[data-dpr=&quot;2&quot;] .pic-txts {
  border: 1px solid #ddd;
}

[data-dpr=&quot;3&quot;] .pic-txts {
  border: 1.5px solid #ddd;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pic-txts</span> {
  <span class="hljs-attribute">text-align</span>: left;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5PX</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">9.2rem</span>;
  <span class="hljs-attribute">display</span>: block;
}

<span class="hljs-selector-attr">[data-dpr="1"]</span> <span class="hljs-selector-class">.pic-txts</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">0.5px</span> solid <span class="hljs-number">#ddd</span>;
}

<span class="hljs-selector-attr">[data-dpr="2"]</span> <span class="hljs-selector-class">.pic-txts</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
}

<span class="hljs-selector-attr">[data-dpr="3"]</span> <span class="hljs-selector-class">.pic-txts</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1.5px</span> solid <span class="hljs-number">#ddd</span>;
}</code></pre>
</blockquote>
<h2 id="articleHeader6">
<a href="https://github.com/whidy/mobileweb" rel="nofollow noreferrer" target="_blank">方案二</a>（之前<a href="https://segmentfault.com/a/1190000010947054">SF笔记</a>上有，此处有更新）：</h2>
<h3 id="articleHeader7">搭建环境及相关配置</h3>
<ul>
<li>webpack 3，需要loader及说明</li>
<li>css-loader, style-loader 加载css文件</li>
<li>postcss-loader 对css进行转换处理</li>
<li>expose-loader 暴露全局例如jquery</li>
<li>url-loader 样式文件内的图片等资源</li>
<li>file-loader 字体等资源</li>
</ul>
<h3 id="articleHeader8">使用库</h3>
<ul>
<li>jquery</li>
<li>normalize</li>
<li><a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">amfe-flexible</a></li>
</ul>
<h3 id="articleHeader9">PostCSS相关的插件</h3>
<ul>
<li>autoprefixer</li>
<li>postcss-advanced-variables</li>
<li>postcss-nested</li>
<li>postcss-partial-import</li>
<li>postcss-pxtorem</li>
<li>postcss-scss</li>
<li>postcss-sorting</li>
<li>cssnano</li>
<li>postcss-property-lookup</li>
<li>
<a href="https://github.com/songsiqi/postcss-adaptive" rel="nofollow noreferrer" target="_blank">postcss-adaptive</a>（该插件实际上与pxtorem功能相似，似乎是px2rem的改进版，需配合<a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">lib-flexible</a>该插件为了解决1px边框问题而生，其实是配合类名对dpr2进行px/2的处理。如果需求不高可以直接采用该插件，而放弃同时使用postcss-pxtorem和postcss-adaptive，我之所以同时使用主要是因为postcss-pxtorem的<code>minPixelValue: 6</code>比较方便，以及对于不想转换的px处理的规则使用非常便捷！）</li>
</ul>
<h3 id="articleHeader10">要解决一些问题</h3>
<p>快速开发自适应的移动端专题站点或简单页面</p>
<p>解决<del>字体和</del>边框不进行rem转换（根据考究并未找到合理有效的证据证明font-size建议使用px，个人认为如果rem计算合理不应该存在明显的重大问题。自然就不需要用到px2rem的dpr扩展转换功能了）</p>
<p>该分支采用<a href="https://github.com/cuth/postcss-pxtorem" rel="nofollow noreferrer" target="_blank">postcss-pxtorem</a>避免了postcss-nested注释问题,具体配置大致如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('postcss-pxtorem')({
  rootValue: 75,
  unitPrecision: 5,
  propList: ['*'],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 12
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-pxtorem'</span>)({
  <span class="hljs-attr">rootValue</span>: <span class="hljs-number">75</span>,
  <span class="hljs-attr">unitPrecision</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">propList</span>: [<span class="hljs-string">'*'</span>],
  <span class="hljs-attr">selectorBlackList</span>: [],
  <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">mediaQuery</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">minPixelValue</span>: <span class="hljs-number">12</span>
})</code></pre>
<p>假设设计稿750宽，这里设置简单说明一下（没说的是我还没弄明白或者是不重要的?）：</p>
<ul>
<li>rootValue为75，说是对根元素大小进行设置。可能类似<a href="https://www.npmjs.com/package/px2rem" rel="nofollow noreferrer" target="_blank">px2rem</a>中的remUnit参数吧</li>
<li>unitPrecision为5，起初我真不知道这个官方说的<em>The decimal numbers to allow the REM units to grow to.</em>是啥意思，搞了半天才观察出来，原来是<strong>转换成rem后保留的小数点位数</strong>。。。</li>
<li>propList是一个存储哪些将被转换的属性列表，这里设置为<code>['*']</code>全部，假设需要仅对边框进行设置，可以写<code>['*', '!border*']</code>意思是排除带有border的属性，当然这里会有一个问题，也许有时候不想对border其他样式处理例如<code>border-radius</code>所以也不是很好。</li>
<li>selectorBlackList则是一个对css选择器进行过滤的数组，比如你设置为<code>['fs']</code>，那例如<code>fs-xl</code>类名，里面有关px的样式将不被转换，这里也支持正则写法。</li>
<li>minPixelValue是一个非常不错的选项，我设置了12，意思是所有小于12px的样式都不被转换，那么border之类的属性自然会保留px值了。而刚才提到的border-radius如果为了创造圆形等特殊较大圆弧时则还是会转换成rem，来配合对应的width和height（当然，你也可以用继承width或者height的变量来设置radius）。</li>
</ul>
<blockquote>
<p>需要注意的是，以下情况并不会保留为px！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".test-radius {
  width:20px;
  height:20px;
  border-radius: calc(@width / 2);
  background-color:#ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.test-radius</span> {
  <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">20px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-built_in">calc</span>(@width / 2);
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#ccc</span>;
}</code></pre>
<p>根据反复测试，calc运算是来自cssnano插件，然而<a href="http://cssnano.co/" rel="nofollow noreferrer" target="_blank">cssnano</a>有必要放在最后执行，所以无法满足计算后的10px在进行pxtorem转换，不过这种情况也是比较合理的。假设width和height转换为rem，而圆角是px，个人感觉不可避免的会造成圆形错误的情况（是否有可能改圆角px值实际上永远大于转换后的rem的50%？有待考究！），所以这种情况暂时就不考虑了，让其单位均保持一致即可。</p>
</blockquote>
<p>写到这里我又陷入了沉思，因为有个问题不明白了。根据postcss.config.js配置cssnano是在最后面，pxtorem是在其前面，那么如何做到对此段样式转换的顺序。</p>
<p>这段代码应该先是postcss-property-lookup对@width进行处理，然后进行calc(@width / 2)计算，最后对px检测转换，再进行cssnano压缩。而实际上有点诡异。<strong>难道postcss.config.js中插件的执行顺序并非单纯的从上而下！</strong>希望不久的将来这个疑问将被解决，或者我也怀疑postcss官方文档实际有指出，只是个人英文能力较差被我忽略掉了?。</p>
<p>另一方面，关于此段CSS在画圆上有一些需要注意的，其实这里如果写圆用50%即可，我发现某些情况下（可能是圆形很小）如果按照除以2的写法转换成rem似乎不圆，所以在现代开发来看移动端画圆就50%了！所以上例仅做测试好了~</p>
<p>额外阅读，关于<a href="https://caniuse.com/#search=border-radius" rel="nofollow noreferrer" target="_blank">border-radius</a>的一些事项。</p>
<p>对了忘了说了，css样式代码中将px写成<code>Px</code>或者<code>PX</code>他也不会转换成rem的~</p>
<h3 id="articleHeader11">附加：前文提到了一个插件postcss-adaptive说明</h3>
<p>在PostCSS的配置文件中，我加入了这个插件并放在了postcss-pxtorem的后面引入，这样在第一次转换后，postcss-adaptive的默认参数就不会影响到上一个插件的配置而造成的混乱情况。实际上前面也提到过，这个插件的大部分功能和postcss-pxtorem相似，区别在于对于转换规则的条件过滤，而postcss-pxtorem这点有极大的优势，使用这个插件主要是解决retina屏（iPhone4以上？）需要对1px边框处理为0.5px。具体测试可以看一下DEMO中的<em>pic-txts结构</em>，以下是该结构部分说明：</p>
<blockquote>
<p>这是一个pic-txts结构的wrap，展示小圆角边框在两个rem &gt; px 转换插件的作用下的影响因为在postcss-pxtorem配置中的minPixelValue设置为6，当圆角为5px时，他不进行转换，而postcss-adaptive却要对px属性进行操作，这是我们不希望的，合理的操作有两种：</p>
<ol>
<li>将圆角值按照设计稿（假设设计稿时10px）设定，并重新调整postcss-pxtorem配置中的minPixelValue为两倍安全值，例如12</li>
<li>将圆角5px值改成postcss-pxtorem不处理的规则例如5PX，通过实验，发现postcss-adaptive并不会处理该属性</li>
</ol>
</blockquote>
<h2 id="articleHeader12">总结：</h2>
<p>当然如果项目容易改造的话，还是建议使用方案二，在适配上面已经做得非常完善了，方案二中1px的问题通过类名提高CSS优先级非常方便，也不需要更复杂的操作。PostCSS在这两年来依旧是发展趋势，在新的项目中可以大胆尝试。</p>
<blockquote>
<p>方案三：</p>
<p>其实关于1px适配的问题，我想到了一个特别的方法，那就是在媒体查询中，声明一个变量例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$borderWidth: 1px;
@media (max-resolution: 2dppx) {
  $borderWidth: 0.5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-variable">$borderWidth</span>: <span class="hljs-number">1px</span>;
@<span class="hljs-keyword">media</span> (max-resolution: 2dppx) {
  <span class="hljs-variable">$borderWidth</span>: <span class="hljs-number">0.5px</span>;
}</code></pre>
<p>我希望css变量能在符合该媒体查询规则的情况下覆盖之前声明的变量，然而这种操作是无法实现的！！！</p>
<p>当然，我后来只有这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".test {
  border:1px solid #ccc;
  @media (max-resolution: 2dppx) {
    border-width:0.5px;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss"><span class="hljs-selector-class">.test</span> {
  <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
  @<span class="hljs-keyword">media</span> (max-resolution: 2dppx) {
    <span class="hljs-attribute">border-width</span>:<span class="hljs-number">0.5px</span>;
  }
}</code></pre>
<p>可是你知道这样写有多么麻烦吗，大型项目中大量的代码需要批量处理的时候，这是不可能实现的，虽然我当时的确在项目里手动替换了超过50个地方。。。然后过了几天思考，又全部还原了采用了方案一（因为项目不方便转换为方案二）。</p>
<p>因此，方案三只是留给大家思考一下，也就没有什么实际的使用价值了。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端采用Flexible将PX转换REM适配及开发中Retina屏1px边框的两种解决方案

## 原文链接
[https://segmentfault.com/a/1190000011492987](https://segmentfault.com/a/1190000011492987)

