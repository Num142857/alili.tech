---
title: '从零开始构建react应用（六）同构之样式直出' 
date: 2018-12-26 2:30:14
hidden: true
slug: yksuctz6wzf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>上文讲到通过同构服务端渲染，可以直出html结构，虽然讲解了样式，图片等静态资源在服务端引入问题的解决方案，但是并没有实际进行相关操作，这篇文章就讲解一下如何让样式像html一样直出。</p>
<p><code>PS: 直出，我的理解就是输入url发起get请求访问服务端，直接得到完整响应结果，而不是同过ajax异步去获取。</code></p>
<h1 id="articleHeader1">加入样式文件</h1>
<p>目前我们的项目中还不存在任何样式文件，所以需要先写一个，就给组件App写一个样式文件吧。</p>
<h2 id="articleHeader2">安装依赖</h2>
<p>下面这些依赖都是后续会用到的，先安装一下，下面会详细讲解每个依赖的作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install postcss-loader postcss-import postcss-cssnext postcss-nested postcss-functions css-loader style-loader isomorphic-style-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> postcss-loader postcss-<span class="hljs-keyword">import</span> postcss-cssnext postcss-<span class="hljs-keyword">nested</span> postcss-functions css-loader <span class="hljs-keyword">style</span>-loader isomorphic-<span class="hljs-keyword">style</span>-loader <span class="hljs-comment">--save-dev</span></code></pre>
<h2 id="articleHeader3">创建.pcss文件</h2>
<p>css文件的后缀是.css，less文件的后缀是.less，这里我选择使用PostCSS配合其插件来写样式，所以我就自己定义一个后缀.pcss好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/component/app/style.pcss

.root {
  color: red;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// ./src/client/component/app/style.pcss</span>

<span class="hljs-selector-class">.root</span> {
  <span class="hljs-attribute">color</span>: red;
}</code></pre>
<p>设定一个root类，样式就是简单的设置颜色为红色。然后在App组件里引用它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/component/app/index.tsx

...
import * as styles from './style.pcss';
...
  public render() {
    return (
      <div className={styles.root}>hello world</div>
    );
  }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./src/client/component/app/index.tsx</span>

...
import * <span class="hljs-keyword">as</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./style.pcss'</span>;
...
  public render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.root}</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
...</code></pre>
<p>这个时候你会发现编辑器里是这样的：<br><span class="img-wrap"><img data-src="/img/bVXQZ9?w=1068&amp;h=150" src="https://static.alili.tech/img/bVXQZ9?w=1068&amp;h=150" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>出现这个问题是因为ts不知道这种模块的类型定义，所以我们需要手动加入自定义模块类型定义。在项目根目录下新建@types文件夹，在此目录下建立index.d.ts文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./@types/index.d.ts

declare module '*.pcss' {
  const content: any;
  export = content;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// ./@types/index.d.ts</span>

<span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> '*.pcss' {
  <span class="hljs-keyword">const</span> content: <span class="hljs-built_in">any</span>;
  <span class="hljs-keyword">export</span> = content;
}</code></pre>
<p>保存之后就不会看到编辑器报错了，但是terminal里webpack打包会提示出错，因为我们还没有加对应的loader。</p>
<h2 id="articleHeader4">配置.pcss文件的解析规则</h2>
<p>js都组件化了，css模块化也是很有必要的，不用再为避免取重复类名而烦恼。我们在base配置里新导出一个方法用以获取postcss的规则。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/webpack/base.ts

...
export const getPostCssRule = (styleLoader) => ({
  test: /\.pcss$/,
  use: [
    styleLoader,
    {
      loader: 'css-loader',
      options: {
        camelCase: true,
        importLoaders: 1,
        localIdentName: '[path][name]---[local]---[hash:base64:5]',
        modules: true,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          require('postcss-import')({
            path: path.join(baseDir, './src/client/style'),
          }),
          require('postcss-cssnext'),
          require('postcss-nested'),
          require('postcss-functions')({
            functions: {
              x2(v, u) {
                return v * 2 + (u ? u : 'px');
              },
            },
          }),
        ],
      },
    },
  ],
});
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// ./src/webpack/base.ts</span>

...
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getPostCssRule = <span class="hljs-function">(<span class="hljs-params">styleLoader</span>) =&gt;</span> ({
  test: <span class="hljs-regexp">/\.pcss$/</span>,
  use: [
    styleLoader,
    {
      loader: <span class="hljs-string">'css-loader'</span>,
      options: {
        camelCase: <span class="hljs-literal">true</span>,
        importLoaders: <span class="hljs-number">1</span>,
        localIdentName: <span class="hljs-string">'[path][name]---[local]---[hash:base64:5]'</span>,
        modules: <span class="hljs-literal">true</span>,
      },
    },
    {
      loader: <span class="hljs-string">'postcss-loader'</span>,
      options: {
        plugins: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> [
          <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-import'</span>)({
            path: path.join(baseDir, <span class="hljs-string">'./src/client/style'</span>),
          }),
          <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-cssnext'</span>),
          <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-nested'</span>),
          <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-functions'</span>)({
            <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-title">s</span>: </span>{
              x2(v, u) {
                <span class="hljs-keyword">return</span> v * <span class="hljs-number">2</span> + (u ? u : <span class="hljs-string">'px'</span>);
              },
            },
          }),
        ],
      },
    },
  ],
});
...</code></pre>
<p>我们可以从上面这个方法看到，要处理<code>.pcss</code>文件需要用到三个loader，按处理顺序从下往上分别是postcss-loader， css-loader， 还有一个变量styleLoader，至于这个变量是什么，我们可以看使用到该方法的地方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/webpack/client.ts

...
(clientDevConfig.module as webpack.NewModule).rules.push(
  ...
  getPostCssRule({
    loader: 'style-loader',
  }),
  ...
);
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// ./src/webpack/client.ts</span>

...
(clientDevConfig.<span class="hljs-keyword">module</span> <span class="hljs-keyword">as</span> webpack.NewModule).rules.push(
  ...
  getPostCssRule({
    loader: <span class="hljs-string">'style-loader'</span>,
  }),
  ...
);
...</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/webpack/server.ts

...
(clientDevConfig.module as webpack.NewModule).rules.push(
  ...
  getPostCssRule({
    loader: 'isomorphic-style-loader',
  }),
  ...
);
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// ./src/webpack/server.ts</span>

...
(clientDevConfig.<span class="hljs-keyword">module</span> <span class="hljs-keyword">as</span> webpack.NewModule).rules.push(
  ...
  getPostCssRule({
    loader: <span class="hljs-string">'isomorphic-style-loader'</span>,
  }),
  ...
);
...</code></pre>
<p>客户端和服务端处理样式文件需要使用到不同的styleLoader。</p>
<h2 id="articleHeader5">PostCSS简介</h2>
<p>PostCSS是一个使用js来转换css的工具，这个是官方介绍。其配合webpack使用的loader就是postcss-loader，但是只有单个postcss-loader其实没有什么用，需要配合其插件来实现强大的功能。</p>
<ol>
<li>postcss-import<br>这个插件我这里使用的原因是为了在样式文件中@import时避免复杂的路径编写，我设定好path值，那么我在其它任何层级下的样式文件中要引入path对应文件夹里的公共变量样式文件(假设叫"variables.pcss")时就非常方便，只需要写import 'variables.pcss';就可以了，当然如果找不到对应的文件，它会忽略path使用默认相对路径来查找。</li>
<li>postcss-cssnext<br>这个插件可以使用下一代css语法。</li>
<li>postcss-nested<br>这个插件可以嵌套编写样式。</li>
<li>postcss-functions<br>这个插件可以自定义函数，并在样式文件中调用。</li>
</ol>
<p>讲这么多，写代码举个栗子吧～<br>我们在client目录下新增style文件夹，用于存放一些样式reset，变量文件之类的东西。然后创建两个pcss文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/style/variables.pcss

:root {
  --fontSizeValue: 16;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> .<span class="hljs-regexp">/src/</span>client<span class="hljs-regexp">/style/</span>variables.pcss

:root {
  --fontSizeValue: <span class="hljs-number">16</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/style/index.pcss

@import 'variables.pcss';

body {
  margin: 0;
  font-size: x2(var(--fontSizeValue));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">// ./src/client/style/index.pcss</span>

@<span class="hljs-keyword">import</span> <span class="hljs-string">'variables.pcss'</span>;

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font-size</span>: x2(var(--fontSizeValue));
}</code></pre>
<p>引入我们刚写的index.pcss</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/index.tsx
...
import './style/index.pcss';
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// ./src/client/index.tsx</span>
...
<span class="hljs-keyword">import</span> <span class="hljs-string">'./style/index.pcss'</span>;
...</code></pre>
<h2 id="articleHeader6">CSS Modules简介</h2>
<p>简单来说就是css模块化，不用再担心全局类名的问题。我们根据上述css-loader的options来看：</p>
<ol>
<li>camelCase为true运行使用驼峰写法来写类名</li>
<li>importLoaders的值为N是因为在css-loader之前有N个loader已经处理过文件了，这里的N值是1，因为之前有一个postcss-loader，这个值一定要设置对，否则会影响@import语句，我的这个表述可能不是太正确，详细可参见<a href="https://github.com/webpack-contrib/css-loader/issues/228" rel="nofollow noreferrer" target="_blank">Clarify importLoaders documentation？</a>这个地方详细讲解了，我翻译一下大概意思是，这个属性的值N代表的是对于@import的文件要经过css-loader后面的N个loader的处理，英文不太好，大家可以自行理解。</li>
<li>localIdentName这个就是指生成的类名啦，具体看后续结果截图就一目了然了。</li>
<li>modules为true即启用模块化</li>
</ol>
<h2 id="articleHeader7">isomorphic-style-loader</h2>
<p>在客户端，使用style-loader，它会动态的往dom里插入style元素，而服务端由于缺少客户端的相关对象及API，所以需要isomorphic-style-loader，目前用到它只是为了避免报错哈哈，后续还有大作用，样式直出全靠它。</p>
<h2 id="articleHeader8">打包运行</h2>
<p>注意：打包运行之前不要忘了给tsconfig.client.json和tsconfig.server.json引入我们的自定义模块定义文件index.d.ts，不然webpack编译就会报找不到pcss这种模块啦。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/webpack/tsconfig.client(server).json
...
&quot;include&quot;: [
    ...
    &quot;../../@types/**/*&quot;,
    ...
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// ./src/webpack/tsconfig.client(server).json</span>
...
<span class="hljs-string">"include"</span>: [
    ...
    <span class="hljs-string">"../../@types/**/*"</span>,
    ...
]
...</code></pre>
<p>运行结果如下：<br><span class="img-wrap"><img data-src="/img/bVXSov?w=1758&amp;h=634" src="https://static.alili.tech/img/bVXSov?w=1758&amp;h=634" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>虽然style元素已经存在，但是这个是由style-loader生成的，并不是服务端直出的，看page source就知道了。<br><span class="img-wrap"><img data-src="/img/bVXSpf?w=1978&amp;h=392" src="https://static.alili.tech/img/bVXSpf?w=1978&amp;h=392" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>而且在刷新页面的时候能很明显的看到样式变化闪烁的效果。</p>
<h1 id="articleHeader9">直出样式</h1>
<p>我们利用isomorphic-style-loader来实现服务端直出样式，原理的话根据官方介绍就是利用了react的context api来实现，在服务端渲染的过程中，利用注入的insertCss方法和高阶组件（hoc high-order component）来获取样式代码。</p>
<h2 id="articleHeader10">安装依赖</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install prop-types --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-keyword">prop</span>-types <span class="hljs-comment">--save-dev</span></code></pre>
<h2 id="articleHeader11">改写App组件</h2>
<p>根据其官方介绍，我们在不使用其整合完毕的isomorphic router的情况下，需要写一个Provider给App组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/component/app/provider.tsx

import * as React from 'react';

import * as PropTypes from 'prop-types';

class AppProvider extends React.PureComponent<any, any> {
  public static propTypes = {
    context: PropTypes.object,
  };

  public static defaultProps = {
    context: {
      insertCss: () => '',
    },
  };

  public static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  public getChildContext() {
    return this.props.context;
  }

  public render() {
    return this.props.children || null;
  }
}

export default AppProvider;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// ./src/client/component/app/provider.tsx</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;

<span class="hljs-keyword">class</span> AppProvider <span class="hljs-keyword">extends</span> React.PureComponent&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> propTypes = {
    context: PropTypes.object,
  };

  <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> defaultProps = {
    context: {
      insertCss: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-string">''</span>,
    },
  };

  <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  <span class="hljs-keyword">public</span> getChildContext() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.context;
  }

  <span class="hljs-keyword">public</span> render() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.children || <span class="hljs-literal">null</span>;
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> AppProvider;
</code></pre>
<p>将原App组件里的具体内容迁移到AppContent组件里去：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/component/app/content.tsx

import * as React from 'react';

import * as styles from './style.pcss';

/* tslint:disable-next-line no-submodule-imports */
import withStyles from 'isomorphic-style-loader/lib/withStyles';

@withStyles(styles)
class AppContent extends React.PureComponent {
  public render() {
    return (
      <div className={styles.root}>hello world</div>
    );
  }
}

export default AppContent;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./src/client/component/app/content.tsx</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./style.pcss'</span>;

<span class="hljs-comment">/* tslint:disable-next-line no-submodule-imports */</span>
<span class="hljs-keyword">import</span> withStyles <span class="hljs-keyword">from</span> <span class="hljs-string">'isomorphic-style-loader/lib/withStyles'</span>;

@withStyles(styles)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppContent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span> </span>{
  public render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.root}</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> AppContent;
</code></pre>
<p>新的App组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/client/component/app/index.tsx

import * as React from 'react';

import AppProvider from './provider';

import AppContent from './content';

class App extends React.PureComponent {
  public render() {
    return (
      <AppProvider>
        <AppContent />
      </AppProvider>
    );
  }
}

export default App;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./src/client/component/app/index.tsx</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">import</span> AppProvider <span class="hljs-keyword">from</span> <span class="hljs-string">'./provider'</span>;

<span class="hljs-keyword">import</span> AppContent <span class="hljs-keyword">from</span> <span class="hljs-string">'./content'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span> </span>{
  public render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppProvider</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">AppContent</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">AppProvider</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;
</code></pre>
<h3 id="articleHeader12"><code>疑问一：AppProvider组件是做什么的？</code></h3>
<p>答：Provider的意思是<code>供应者，提供者</code>。顾名思义，AppProvider为其后代组件提供了一些东西，这个东西就是context，它有一个insertCss方法。根据其定义，该方法拥有默认值，返回空字符串的函数，即默认没什么作用，但是可以通过props传入context来达到自定义的目的。通过设定childContextTypes和getChildContext，该组件后代凡是设定了contextTypes的组件都会拥有this.context对象，而这个对象正是getChildContext的返回值。</p>
<h3 id="articleHeader13"><code>疑问二：AppContent为何要独立出去？</code></h3>
<p>答：接上一疑问，AppProvider组件render其子组件，而要使得context这个api生效，其子组件必须是定义了contextTypes的，但是我们并没有看见AppContent有这个定义，这个是因为这个定义在高阶组件withStyles里面（参见其<a href="https://github.com/kriasoft/isomorphic-style-loader/blob/master/src/withStyles.js#L14-L16" rel="nofollow noreferrer" target="_blank">源码</a>）。</p>
<h3 id="articleHeader14"><code>疑问三：@withStyles是什么语法？</code></h3>
<p>答：这个是装饰器，属于es7，具体概念内容可参见<a href="http://www.liuhaihua.cn/archives/115548.html" rel="nofollow noreferrer" target="_blank">Decorators in ES7</a>。使用该语法，需要配置tsconfig:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./tsconfig.json
// ./src/webpack/tsconfig.client(server).json

{
  ...
  &quot;compilerOptions&quot;: {
    ...
    &quot;experimentalDecorators&quot;: true,
    ...
  },
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// ./tsconfig.json</span>
<span class="hljs-comment">// ./src/webpack/tsconfig.client(server).json</span>

{
  <span class="hljs-params">...</span>
  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-params">...</span>
    <span class="hljs-string">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-params">...</span>
  },
  <span class="hljs-params">...</span>
}</code></pre>
<h2 id="articleHeader15">改写服务端bundle文件</h2>
<p>由于App组件的改写，服务端不能再复用该组件，但是AppProvider和AppContent目前还是可以复用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/server/bundle.tsx

import * as React from 'react';

/* tslint:disable-next-line no-submodule-imports */
import { renderToString } from 'react-dom/server';

import AppProvider from '../client/component/app/provider';

import AppContent from '../client/component/app/content';

export default {
  render() {
    const css = [];
    const context = { insertCss: (...styles) => styles.forEach((s) => css.push(s._getCss())) };
    const html = renderToString(
      <AppProvider context={context}>
        <AppContent />
      </AppProvider>,
    );
    const style = css.join('');
    return {
      html,
      style,
    };
  },
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./src/server/bundle.tsx</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-comment">/* tslint:disable-next-line no-submodule-imports */</span>
<span class="hljs-keyword">import</span> { renderToString } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom/server'</span>;

<span class="hljs-keyword">import</span> AppProvider <span class="hljs-keyword">from</span> <span class="hljs-string">'../client/component/app/provider'</span>;

<span class="hljs-keyword">import</span> AppContent <span class="hljs-keyword">from</span> <span class="hljs-string">'../client/component/app/content'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  render() {
    <span class="hljs-keyword">const</span> css = [];
    <span class="hljs-keyword">const</span> context = { <span class="hljs-attr">insertCss</span>: <span class="hljs-function">(<span class="hljs-params">...styles</span>) =&gt;</span> styles.forEach(<span class="hljs-function">(<span class="hljs-params">s</span>) =&gt;</span> css.push(s._getCss())) };
    <span class="hljs-keyword">const</span> html = renderToString(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">AppProvider</span> <span class="hljs-attr">context</span>=<span class="hljs-string">{context}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">AppContent</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">AppProvider</span>&gt;</span></span>,
    );
    <span class="hljs-keyword">const</span> style = css.join(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">return</span> {
      html,
      style,
    };
  },
};
</code></pre>
<p>这里我们传入了自定义的context对象，通过css这个变量来存储style信息。我们原先render函数直接返回renderToString的html字符串，而现在多了一个style，所以我们返回拥有html和style属性的对象。</p>
<h3 id="articleHeader16"><code>疑问四：官方示例css是一个Set类型实例，这里怎么是一个数组类型实例？</code></h3>
<p>答：Set是es6中新的数据结构，类似数组，但可以保证无重复值，只有tsconfig的编译选项中的target为es6时，且加入es2017的lib时才不会报错，由于我们的target是es5，所以是数组，且使用数组并没有太大问题。</p>
<h2 id="articleHeader17">处理服务端入口文件</h2>
<p>由于bundle的render值变更，所以我们也要处理一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/server/index.tsx

...
router.get('/*', (ctx: Koa.Context, next) => { // 配置一个简单的get通配路由
  const renderResult = bundle ? bundle.render() : {}; // 获得渲染出的结果对象
  const { html = '', style = '' } = renderResult;
  ...
  ctx.body = `
    ...
    <head>
      ...
      ${style ? `<style>${style}</style>` : ''}
      ...
    </head>
    ...
  `;
  ...
});
...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// ./src/server/index.tsx</span>

...
router.get(<span class="hljs-string">'/*'</span>, (ctx: Koa.Context, next) =&gt; { <span class="hljs-comment">// 配置一个简单的get通配路由</span>
  const renderResult = bundle ? bundle.render() : {}; <span class="hljs-comment">// 获得渲染出的结果对象</span>
  const { html = <span class="hljs-string">''</span>, style = <span class="hljs-string">''</span> } = renderResult;
  ...
  ctx.body = `
    ...
    &lt;head&gt;
      ...
      ${style ? `&lt;style&gt;${style}&lt;/style&gt;` : <span class="hljs-string">''</span>}
      ...
    &lt;/head&gt;
    ...
  `;
  ...
});
...
</code></pre>
<h2 id="articleHeader18">直出结果</h2>
<p>样式直出后的page source：<br><span class="img-wrap"><img data-src="/img/bVXZ8q?w=1974&amp;h=484" src="https://static.alili.tech/img/bVXZ8q?w=1974&amp;h=484" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader19">找回丢失的公共样式文件</h2>
<p>从上面的直出结果来看，缺少./src/style/index.pcss这个样式代码，原因显而易见，它不属于任何一个组件，它是公共的，我们在客户端入口文件里引入了它。对于公共样式文件，服务端要直出这部分内容，可以这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./src/server/bundle.tsx

...
import * as commonStyles from '../client/style/index.pcss';
...
const css = [commonStyles._getCss()];
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>./src/server/bundle.tsx

...
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> commonStyles <span class="hljs-keyword">from</span> <span class="hljs-string">'../client/style/index.pcss'</span>;
...
const css = [commonStyles._getCss()];
...</code></pre>
<p>我们利用isomorphic-style-loader提供的api可以得到这部分样式代码字符串。这样就可以得到完整的直出样式了。</p>
<h1 id="articleHeader20">Thanks</h1>
<p>By <a href="https://github.com/devlee" rel="nofollow noreferrer" target="_blank">devlee</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始构建react应用（六）同构之样式直出

## 原文链接
[https://segmentfault.com/a/1190000011878570](https://segmentfault.com/a/1190000011878570)

