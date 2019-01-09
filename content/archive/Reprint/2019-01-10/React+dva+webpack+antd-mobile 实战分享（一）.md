---
title: 'React+dva+webpack+antd-mobile 实战分享（一）' 
date: 2019-01-10 2:30:08
hidden: true
slug: lo4g07u1vco
categories: [reprint]
---

{{< raw >}}

                    
<h5>再看本篇文章之前，本人还是建议想入坑react的童鞋可以选有create-react-app来创建react的项目，因为现在dva和roadhog还不成熟，坑相对要多一些，当然如果你已经做好跳坑的准备，那么请继续往下走；</h5>
<h3 id="articleHeader0">本文适合对 ES6+webpack 有一定了解的人。没有的了解的同学可以先看看下面的我分享的链接，</h3>
<p>ES6: <a href="http://www.jianshu.com/p/ebfeb687eb70" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/ebfe...</a><br>   Webpack: <a href="https://doc.webpack-china.org/guides/getting-started/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a><br>   react: <a href="https://facebook.github.io/react/docs/hello-world.html" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/re...</a><br>   antd-mobile:<a href="https://mobile.ant.design/docs/react/introduce" rel="nofollow noreferrer" target="_blank">https://mobile.ant.design/doc...</a></p>
<p>扯完啦，接下来就是正题啦，先看效果<br><span class="img-wrap"><img data-src="/img/bVP7Xc?w=636&amp;h=1132" src="https://static.alili.tech/img/bVP7Xc?w=636&amp;h=1132" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>今天主要是想给大家说一下怎么用dva来搭建react的项目</p>
<h4>第一步</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="安装 dva 和 roadhog；
    npm i dva-cli roadhog -g 
好啦～现在你已经学会了怎么安装dva和roadhog啦，接下来就可以创建项目啦" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>安装 dva 和 roadhog；
    npm <span class="hljs-selector-tag">i</span> dva-cli roadhog -g 
好啦～现在你已经学会了怎么安装dva和roadhog啦，接下来就可以创建项目啦</code></pre>
<h4>第二步</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="创建项目
dva new projectName
npm install
npm start

打开浏览器输入localhost:8000,看到欢迎界面证明第二步已经成功啦" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>创建项目
dva <span class="hljs-keyword">new</span> projectName
<span class="hljs-built_in">npm</span> install
<span class="hljs-built_in">npm</span> start

打开浏览器输入localhost:<span class="hljs-number">8000</span>,看到欢迎界面证明第二步已经成功啦</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVP72W?w=486&amp;h=698" src="https://static.alili.tech/img/bVP72W?w=486&amp;h=698" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>第三步</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="添加配置文件和安装webpack

安装 lodash babel-plugin webpack-plugin shim 并添加到package.json文件中

npm install --save-dev webpack 安装本地webpack配置文件

webpack 文件
    // webpack配置
    import glob from 'glob';
    import webpack from 'webpack';
    import { isRegExp } from 'lodash';
    import pxtorem from 'postcss-pxtorem';
    import HtmlWebpackPlugin from 'html-webpack-plugin';
    import ExtractTextPlugin from 'extract-text-webpack-plugin';
    import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
    
    
    const path = require('path');
    export default ( webpackConfig, env ) => {
    
      const loaders = webpackConfig.module.loaders;
      const postcss = webpackConfig.postcss;
      webpackConfig.postcss = function () {
        const postcssArray = postcss();
        postcssArray.push( pxtorem( {
          rootValue: 100,
          propWhiteList: []
        } ) );
        return postcssArray;
      };
      const svgDirs = [
        require.resolve( 'antd-mobile' ).replace( /warn\.js$/, '' ), // antd-mobile 内置svg    // 引入antd-mobile
        path.resolve(__dirname, 'src/assets/icon'),
      ];
    
      loaders.forEach( ( loader ) => {
        if ( loader.test &amp;&amp; loader.test.toString() === '/\\.svg$/' ) {
          loader.exclude = svgDirs;
        }
      } );
    
      loaders.unshift( {
        test: /\.svg$/,
        loader: 'svg-sprite',
        include: svgDirs
      } );
      const noParse = webpackConfig.module.noParse;
      if ( Array.isArray( noParse ) ) {
        noParse.push( /moment.js/ );
      }
      else if ( noParse ) {
        webpackConfig.module.noParse = [ noParse, /moment.js/ ];
      }
      else {
        webpackConfig.module.noParse = [ /moment.js/ ];
      }
    
      // lodash
      webpackConfig.babel.plugins.push( 'lodash' );
      webpackConfig.plugins.push( new LodashModuleReplacementPlugin() );
    
      loaders.push( {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'file'
      } );
    
      // 打包配置
      if ( env === 'production' ) {            
         //添加hash
        webpackConfig.output.filename = '[name].[chunkhash:6].js';
        webpackConfig.output.chunkFilename = '[name].[chunkhash:6].js';
    
        webpackConfig.plugins.forEach( ( plugin, index, plugins ) => {
          if ( plugin instanceof ExtractTextPlugin ) {
            plugins[ index ] = new ExtractTextPlugin( '[name].[chunkhash:6].css', {
              disable: false,
              allChunks: true
            } );
          }
          else if ( plugin instanceof webpack.optimize.CommonsChunkPlugin ) {
            plugins[ index ] = new webpack.optimize.CommonsChunkPlugin(
                'common',
                'common.[chunkhash:6].js'
            );
          }
        } );
    
      }
      //HTML
      webpackConfig.module.loaders = loaders.filter(
              loader => isRegExp( loader.test ) &amp;&amp; loader.test.toString() !== '/\\.html$/'
      );
      webpackConfig.plugins.push(
          new HtmlWebpackPlugin( {
            // favicon: './src/logo/logo.ico',
            template: './src/index.html',
            filename: 'index.html',
            inject: true
          } )
      );
    
      return webpackConfig;
    };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>添加配置文件和安装webpack

安装 lodash babel-plugin webpack-plugin shim 并添加到package.json文件中

npm install --save-dev webpack 安装本地webpack配置文件

webpack 文件
    <span class="hljs-comment">// webpack配置</span>
    <span class="hljs-keyword">import</span> glob <span class="hljs-keyword">from</span> <span class="hljs-string">'glob'</span>;
    <span class="hljs-keyword">import</span> webpack <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack'</span>;
    <span class="hljs-keyword">import</span> { isRegExp } <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
    <span class="hljs-keyword">import</span> pxtorem <span class="hljs-keyword">from</span> <span class="hljs-string">'postcss-pxtorem'</span>;
    <span class="hljs-keyword">import</span> HtmlWebpackPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">'html-webpack-plugin'</span>;
    <span class="hljs-keyword">import</span> ExtractTextPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">'extract-text-webpack-plugin'</span>;
    <span class="hljs-keyword">import</span> LodashModuleReplacementPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash-webpack-plugin'</span>;
    
    
    <span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ( webpackConfig, env ) =&gt; {
    
      <span class="hljs-keyword">const</span> loaders = webpackConfig.module.loaders;
      <span class="hljs-keyword">const</span> postcss = webpackConfig.postcss;
      webpackConfig.postcss = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> postcssArray = postcss();
        postcssArray.push( pxtorem( {
          <span class="hljs-attr">rootValue</span>: <span class="hljs-number">100</span>,
          <span class="hljs-attr">propWhiteList</span>: []
        } ) );
        <span class="hljs-keyword">return</span> postcssArray;
      };
      <span class="hljs-keyword">const</span> svgDirs = [
        <span class="hljs-built_in">require</span>.resolve( <span class="hljs-string">'antd-mobile'</span> ).replace( <span class="hljs-regexp">/warn\.js$/</span>, <span class="hljs-string">''</span> ), <span class="hljs-comment">// antd-mobile 内置svg    // 引入antd-mobile</span>
        path.resolve(__dirname, <span class="hljs-string">'src/assets/icon'</span>),
      ];
    
      loaders.forEach( <span class="hljs-function">(<span class="hljs-params"> loader </span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> ( loader.test &amp;&amp; loader.test.toString() === <span class="hljs-string">'/\\.svg$/'</span> ) {
          loader.exclude = svgDirs;
        }
      } );
    
      loaders.unshift( {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.svg$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'svg-sprite'</span>,
        <span class="hljs-attr">include</span>: svgDirs
      } );
      <span class="hljs-keyword">const</span> noParse = webpackConfig.module.noParse;
      <span class="hljs-keyword">if</span> ( <span class="hljs-built_in">Array</span>.isArray( noParse ) ) {
        noParse.push( <span class="hljs-regexp">/moment.js/</span> );
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( noParse ) {
        webpackConfig.module.noParse = [ noParse, /moment.js/ ];
      }
      <span class="hljs-keyword">else</span> {
        webpackConfig.module.noParse = [ <span class="hljs-regexp">/moment.js/</span> ];
      }
    
      <span class="hljs-comment">// lodash</span>
      webpackConfig.babel.plugins.push( <span class="hljs-string">'lodash'</span> );
      webpackConfig.plugins.push( <span class="hljs-keyword">new</span> LodashModuleReplacementPlugin() );
    
      loaders.push( {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'file'</span>
      } );
    
      <span class="hljs-comment">// 打包配置</span>
      <span class="hljs-keyword">if</span> ( env === <span class="hljs-string">'production'</span> ) {            
         <span class="hljs-comment">//添加hash</span>
        webpackConfig.output.filename = <span class="hljs-string">'[name].[chunkhash:6].js'</span>;
        webpackConfig.output.chunkFilename = <span class="hljs-string">'[name].[chunkhash:6].js'</span>;
    
        webpackConfig.plugins.forEach( <span class="hljs-function">(<span class="hljs-params"> plugin, index, plugins </span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> ( plugin <span class="hljs-keyword">instanceof</span> ExtractTextPlugin ) {
            plugins[ index ] = <span class="hljs-keyword">new</span> ExtractTextPlugin( <span class="hljs-string">'[name].[chunkhash:6].css'</span>, {
              <span class="hljs-attr">disable</span>: <span class="hljs-literal">false</span>,
              <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>
            } );
          }
          <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( plugin <span class="hljs-keyword">instanceof</span> webpack.optimize.CommonsChunkPlugin ) {
            plugins[ index ] = <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(
                <span class="hljs-string">'common'</span>,
                <span class="hljs-string">'common.[chunkhash:6].js'</span>
            );
          }
        } );
    
      }
      <span class="hljs-comment">//HTML</span>
      webpackConfig.module.loaders = loaders.filter(
              <span class="hljs-function"><span class="hljs-params">loader</span> =&gt;</span> isRegExp( loader.test ) &amp;&amp; loader.test.toString() !== <span class="hljs-string">'/\\.html$/'</span>
      );
      webpackConfig.plugins.push(
          <span class="hljs-keyword">new</span> HtmlWebpackPlugin( {
            <span class="hljs-comment">// favicon: './src/logo/logo.ico',</span>
            template: <span class="hljs-string">'./src/index.html'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
            <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
          } )
      );
    
      <span class="hljs-keyword">return</span> webpackConfig;
    };
</code></pre>
<p>到现在你已经完成了一半啦  是不是觉得很简单。对啦 这里有一点要注意，复制 <code>es5-shim.min.js</code> <code>es5-sham.min.js</code> <code>console-polyfill/index.js</code> 文件到 <code>public</code> 文件夹<code>console-polyfill/index.js</code> 改名为 <code>console-polyfill.js</code></p>
<h4>第四步 roadhog、proxy配置和antd-mobile引入</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="废话不说 这步直接上代码（对应的是目录中的.roadhogrc.js，大学按步骤下来的话这应该是.roadhogrc.json的文件，但是本人还是比较喜欢js语法，所以做了修改，此处因人而异）
     import path from 'path';
    
    export default {
     '/api': {
        target:'localhost',//这里是你的接口地址，我随便写的
        changeOrigin: true
      },
      multipage: true,
      theme: 'antd.config.js',
      entry: [ 'src/common.js', 'src/index.js' ],
      env: { //下面是在开发环境和生产环境都引入antd-mobile
        development: {
          extraBabelPlugins: [
            'dva-hmr',
            'transform-runtime',
            [ 'import', { libraryName: 'antd-mobile', style: true }]
          ]
        },
        production: {
          extraBabelPlugins: [
            'transform-runtime',
            [ 'import', { libraryName: 'antd-mobile', style: true }]
          ]
        }
      }
    };
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>废话不说 这步直接上代码（对应的是目录中的.roadhogrc.js，大学按步骤下来的话这应该是.roadhogrc.json的文件，但是本人还是比较喜欢js语法，所以做了修改，此处因人而异）
     <span class="hljs-keyword">import</span> path from <span class="hljs-string">'path'</span>;
    
    export <span class="hljs-keyword">default</span> {
     <span class="hljs-string">'/api'</span>: {
<span class="hljs-symbol">        target:</span><span class="hljs-string">'localhost'</span>,<span class="hljs-comment">//这里是你的接口地址，我随便写的</span>
<span class="hljs-symbol">        changeOrigin:</span> <span class="hljs-literal">true</span>
      },
<span class="hljs-symbol">      multipage:</span> <span class="hljs-literal">true</span>,
<span class="hljs-symbol">      theme:</span> <span class="hljs-string">'antd.config.js'</span>,
<span class="hljs-symbol">      entry:</span> [ <span class="hljs-string">'src/common.js'</span>, <span class="hljs-string">'src/index.js'</span> ],
<span class="hljs-symbol">      env:</span> { <span class="hljs-comment">//下面是在开发环境和生产环境都引入antd-mobile</span>
<span class="hljs-symbol">        development:</span> {
<span class="hljs-symbol">          extraBabelPlugins:</span> [
            <span class="hljs-string">'dva-hmr'</span>,
            <span class="hljs-string">'transform-runtime'</span>,
            [ <span class="hljs-string">'import'</span>, { <span class="hljs-string">libraryName:</span> <span class="hljs-string">'antd-mobile'</span>, <span class="hljs-string">style:</span> <span class="hljs-literal">true</span> }]
          ]
        },
<span class="hljs-symbol">        production:</span> {
<span class="hljs-symbol">          extraBabelPlugins:</span> [
            <span class="hljs-string">'transform-runtime'</span>,
            [ <span class="hljs-string">'import'</span>, { <span class="hljs-string">libraryName:</span> <span class="hljs-string">'antd-mobile'</span>, <span class="hljs-string">style:</span> <span class="hljs-literal">true</span> }]
          ]
        }
      }
    };
    </code></pre>
<p>好啦，以上四步差不多就可以用dva把react的项目架子搭建起来，再有就是eslint的配置啦，此处不做讲解（<a href="http://eslint.org/docs/user-guide/configuring" rel="nofollow noreferrer" target="_blank">http://eslint.org/docs/user-g...</a>）,接下来你可以在src中尝试着运行一下Hello World啦</p>
<h3 id="articleHeader1">还有一个点需要注意的是，dva 建项目的时候会默认安装redux和react-router，所以在开发中千万不要在去安装，会因为版本不兼容而导致项目无法运行；</h3>
<p>最后给大家分享一些用到的资料<br>antd主题制定: <a href="https://ant.design/docs/react/customize-theme-cn" rel="nofollow noreferrer" target="_blank">https://ant.design/docs/react...</a><br>roadhog: <a href="https://github.com/sorrycc/roadhog" rel="nofollow noreferrer" target="_blank">https://github.com/sorrycc/ro...</a><br>webpack中proxy配置: <a href="https://webpack.github.io/docs/webpack-dev-server.html#proxy" rel="nofollow noreferrer" target="_blank">https://webpack.github.io/doc...</a><br>redux: <a href="http://www.redux.org.cn/" rel="nofollow noreferrer" target="_blank">http://www.redux.org.cn/</a><br>react-router: <a href="http://react-guide.github.io/react-router-cn/" rel="nofollow noreferrer" target="_blank">http://react-guide.github.io/...</a></p>
<p>项目地址：<a href="https://github.com/tengwei30/Noodle_react.git" rel="nofollow noreferrer" target="_blank">https://github.com/tengwei30/...</a></p>
<h3 id="articleHeader2">更多精彩敬请期待。。。</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React+dva+webpack+antd-mobile 实战分享（一）

## 原文链接
[https://segmentfault.com/a/1190000010002714](https://segmentfault.com/a/1190000010002714)

