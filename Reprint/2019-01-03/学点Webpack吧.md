---
title: '学点Webpack吧' 
date: 2019-01-03 2:30:11
hidden: true
slug: tn6nd0xnyld
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">开始webpack之旅</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>这里如果没有指定-g全局安装，那么需要调用node_modules下的webpack.js来执行，因为非全局安装没有添加环境变量</p>
<h3 id="articleHeader1">尝尝鲜，运行webpack</h3>
<ul>
<li>
<p>必须的第一步：编写webpack.config.js</p>
<ul><li>
<p>两个必须参数：</p>
<ul>
<li><p>entry 入口文件，写路径即可</p></li>
<li>
<p>output 打包后文件，有两个参数：</p>
<ul>
<li><p>filename 文件名，'[name]'表示使用原名，'[hash]'使用哈希值</p></li>
<li><p>path 文件夹路径，对着官方敲,path.resolve(__dirname, '文件夹名'),需先导入</p></li>
<li><p>publicPath 上线地址，例如<a href="http://ningtaostudy.cn" rel="nofollow noreferrer" target="_blank">http://ningtaostudy.cn</a></p></li>
</ul>
</li>
</ul>
</li></ul>
</li>
<li>
<p>现在碗和米饭有了，怎么端起来吃呢</p>
<ul>
<li>
<p>直接在命令行运行webpack，再加点料：</p>
<ul>
<li><p>--display-reasons</p></li>
<li><p>--progress</p></li>
<li><p>--colors</p></li>
<li><p>--display-modules</p></li>
<li><p>--config webpack配置文件名（换个碗吃饭）</p></li>
</ul>
</li>
<li>
<p>在npm脚本里运行(偷懒让别人帮你盛饭)：</p>
<ul><li><p>在package.json里找到scripts项，添加键"webpack"，值"webpack ····(上步的命令)",然            后在命令行里运行，npm run webpack</p></li></ul>
</li>
</ul>
</li>
</ul>
<h3 id="articleHeader2">饭吃到了，没有菜（webpack插件）怎么行呢</h3>
<ul><li><p>打包html的插件 html-webpack-plugin, 惯例第一步npm install,接着在webpack.config.js里配置插件，有了entry和output出头鸟，我们知道该写一个plugin了：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        plugins: [
            new htmlWebpackPlugin({
                filename: '[name]-[hash].html',
                template: 'index.html',
                inject: 'head',
                kill: 'bill',
            })
        ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>        <span class="hljs-attribute">plugins</span>: [
            new htmlWebpackPlugin({
                <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name]-[hash].html'</span>,
                <span class="hljs-attribute">template</span>: <span class="hljs-string">'index.html'</span>,
                <span class="hljs-attribute">inject</span>: <span class="hljs-string">'head'</span>,
                <span class="hljs-attribute">kill</span>: <span class="hljs-string">'bill'</span>,
            })
        ]</code></pre>
<ul>
<li>
<p>让我们来品品小当家的菜：</p>
<ul>
<li><p>filename 很好，不就入口文件吗</p></li>
<li><p>template 你不用说，我知道是模板，相对于配置文件的路径</p></li>
<li><p>inject 我就不遵从开发最佳实践，就要在head里加载js文件，打我呀</p></li>
<li>
<p>kill 杀死比尔，纯属虚构。这是自定义的模板，模板里调用，下面举个栗子：</p>
<ul>
<li>
<p>template里的文件是index.html，使用自定义模板来确定标题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <title><%= htmlWebpackPlugin.options.kill %><title>
  <title>bill</title>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml">  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.kill </span><span class="xml"><span class="hljs-tag">%&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>bill<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span></span></code></pre>
</li>
<li><p>上面代码一样一样的。老夫斗胆说一句，这里模板引擎类似jsp，但还是js语法</p></li>
</ul>
</li>
</ul>
</li>
<li><p>小当家：<a href="https://www.npmjs.com/package/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p></li>
</ul>
<h3 id="articleHeader3">来瓶酒（loaders）吧，生活美滋滋</h3>
<ul>
<li><p>loader用来加载资源文件，诸如图片，css之类的，这样我们就可以在js里导入css，你没听错，用来我也没有在蒙你</p></li>
<li><p>最简单常用的加载css的两个loader:</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        npm install style-loader css-loader --save-dev
        style-loader 用来插入style标签
        css-loader 用来加载css代码，此loade居下" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>        npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader css-loader <span class="hljs-comment">--save-dev</span>
        <span class="hljs-keyword">style</span>-loader 用来插入<span class="hljs-keyword">style</span>标签
        css-loader 用来加载css代码，此loade居下</code></pre>
<ul><li><p>话不多说，开：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        modules: {
            rules: [
                {
                    test: /.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                }
            ]
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        <span class="hljs-selector-tag">modules</span>: {
            <span class="hljs-attribute">rules</span>: [
                {
                    test: /.css$/,
                    use: [
                        <span class="hljs-string">'style-loader'</span>,
                        <span class="hljs-string">'css-loader'</span>,
                    ],
                }
            ]
        }</code></pre>
<ul><li><p>看起来嵌套挺多的哈，不过很简单。modules下的rules包含很多匹配规则（正则表达式），每一条代表加载什么类型的资源文件，上面写的就是加载.css样式文件，并使用style-loader和css-loader加载，现在问题来了，我想喝瓶茅台（自动添加浏览器产商前缀）。没问题，强大的webpack生态圈给你提供了postcss-loader，一个更高大上的loader。这个时候我们都知道只需要改一下use数组：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1
                },
            },
            'postcss-loader'
        ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>        [
            <span class="hljs-symbol">'style-loader</span>',
            {
                loader: <span class="hljs-symbol">'css-loader</span>',
                options: {
                    importLoaders: <span class="hljs-number">1</span>
                },
            },
            <span class="hljs-symbol">'postcss-loader</span>'
        ]</code></pre>
<ul>
<li>
<p>数组的项可以是对象，这样我们的loader就能带options里的参数，等同于：</p>
<ul><li><p>loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'</p></li></ul>
</li>
<li><p>至于为什么要带这样的参数，这是因为一个@import引发的血案</p></li>
</ul>
<h3 id="articleHeader4">webpack-dev-server大厨来也</h3>
<ul>
<li><p>我是谁，我从哪里来，我又该到哪里去</p></li>
<li>
<p>　　日益繁重的前端工作下，没有人能阻挡我们偷懒的步伐。。webpack只是一个打包工具，即使我们能带--watch自动编译，但浏览器还得手动刷新（心中一个卧槽，尼玛还有这种操作，曾经学习的一年里自己起码动手刷新浏览器点了10000次，忍不住吐槽浏览器刷新按钮就不能做一个浮动的吗，还得移动大半个屏幕，我鼠标少说走了1000米了）。很好，在灵长类动物面前都不是问题：</p>
<ul><li><p>npm install webpack-dev-server -D(这个不是重点，缩写而已)</p></li></ul>
</li>
<li><p>接下来配置webpack，其实官网很详细了，还带中文的，比个赞</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        + devServer: {
            contentBase: './dist',     //  根目录，就像apache的www文件夹
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>        + <span class="hljs-selector-tag">devServer</span>: {
            <span class="hljs-attribute">contentBase</span>: <span class="hljs-string">'./dist'</span>,     //  根目录，就像apache的www文件夹
        }</code></pre>
<ul>
<li>
<p>然后呢卧槽？没错，好了，输入吧肿瘤君：</p>
<ul><li><p>webpack-dev-server --open</p></li></ul>
</li>
<li><p>偷懒神(package.json)在此：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        &quot;script&quot;: {
             + “start”: &quot;webpack-dev-server --open --color&quot;,
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>        <span class="hljs-string">"script"</span>: {
             + “<span class="hljs-literal">start</span>”: <span class="hljs-string">"webpack-dev-server --open --color"</span>,
        }</code></pre>
<ul><li>
<p>再运行：</p>
<ul><li><p>npm start (这次连run 都省了，，，)</p></li></ul>
</li></ul>
<h4>好了，以上就是初步了解webpack了，再总结一下吧</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ● entry
  ● output
  ● modules.rules
  ● plugins
  ● devServer
  ● devtool: 'inline-source-map'（开发环境下调试专用，快速定位错误文件位置）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  ● entry
  ● output
  ● modules<span class="hljs-selector-class">.rules</span>
  ● plugins
  ● devServer
  ● devtool: <span class="hljs-string">'inline-source-map'</span>（开发环境下调试专用，快速定位错误文件位置）
</code></pre>
<ul>
<li><p>加载html: html-webpack-plugin，html-loader</p></li>
<li><p>加载css: style-loader，css-loader，sass/less-loader</p></li>
<li><p>加载es6: babel-loader</p></li>
<li><p>加载图片, json等文件: file-loader，url-loader（转base64），image-loader（压缩），json-loader</p></li>
</ul>
<p>上面的这些loader都可以去npmjs官网上查看详细的配置<br>注: -loader在webpack 2+不能省略；html插件和loader（加载模板）不能混着用</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学点Webpack吧

## 原文链接
[https://segmentfault.com/a/1190000010809511](https://segmentfault.com/a/1190000010809511)

