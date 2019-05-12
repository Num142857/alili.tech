---
title: 'webpack@v4升级踩坑' 
date: 2018-12-05 2:30:09
hidden: true
slug: zuw4i9r8b5
categories: [reprint]
---

{{< raw >}}

                    
<p>之前看到各大公众号都在狂推 <strong>webpack</strong> 新版发布的相关内容，之前就尝试了升级，由于部分插件的原因，未能成功，现在想必过了这么久已经可以了，今天就来试一下在我的项目中升级会遇到哪些坑。</p>
<h2 id="articleHeader0">查阅更新日志</h2>
<p>在安装更新之前，先大致浏览了一下<a href="https://github.com/webpack/webpack/releases/tag/v4.0.0" rel="nofollow noreferrer" target="_blank">更新日志</a>，对大部分用户来说迁移上需要注意的应该就是这些点：</p>
<ul>
<li>在命令行界面运行打包指令需要安装 <code>webpack-cli</code> ；</li>
<li>打包需要指定打包模式 <code>production</code> or <code>development</code> ，在不同模式下会添加不同的默认配置， <code>webpack.DefinePlugin</code> 插件的 <code>process.env.NODE_ENV</code> 的值不需要再定义，将根据模式自动添加；</li>
<li>不再需要在 <code>plugin</code> 中设置 <code>new webpack.optimize.UglifyJsPlugin</code> ，只需要在配置中设置开关即可，并且 <code>production</code> 模式自动开启，可以通过 <code>optimization.minimizer</code> 指定其他压缩库；</li>
<li>删除了 <code>CommonsChunkPlugin</code> ，功能已迁移至 <code>optimization.splitChunks ，</code> <code>optimization.runtimeChunk</code>。</li>
</ul>
<h2 id="articleHeader1">迁移</h2>
<ol>
<li>安装最新的 <code>webpack</code> 、 <code>webpack-cli</code> 、 <code>webpack-dev-server</code> ；</li>
<li>为开发中和发布分别配置 <code>mode</code> ，删除 <code>webpack.DefinePlugin</code> 配置，并且去掉 <code>package.json</code> 中启动脚本的 <code>NODE_ENV</code> 区别环境变量定义；</li>
<li>去掉 <code>new webpack.optimize.UglifyJsPlugin</code> 、 <code>ModuleConcatenationPlugin</code> 配置。</li>
</ol>
<h2 id="articleHeader2">爬坑</h2>
<p><span class="img-wrap"><img data-src="/img/bV8zqy?w=198&amp;h=192" src="https://static.alili.tech/img/bV8zqy?w=198&amp;h=192" alt="别慌" title="别慌" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>
<p>在这些配置好之后我遇到的第一个问题就是打包时 <code>extract-text-webpack-plugin</code> 插件炸了！这里提供了这里有两种解决方案：</p>
<ul>
<li>方法一：安装指定 <code>extract-text-webpack-plugin</code> 版本 <code>@next</code> ；</li>
<li>
<p>方法二：使用 <code>mini-css-extract-plugin</code> 替代。</p>
<p>如果使用方法二注意在发布打包时需要指定 css 压缩库配置，并且需要同时写入 js 压缩库，因为你一旦指定了 <code>optimization.minimizer</code> 就会弃用内置的代码压缩：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  const config = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?importLoaders=1',
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader?importLoaders=1',
            'postcss-loader',
            'less-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.less']
    }
  };
  
  if (process.env.NODE_ENV === 'development') {
    config.module.rules[0].use = [
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      'css-loader?importLoaders=1',
      'postcss-loader'
    ];
    config.module.rules[1].use = [
      'css-hot-loader',
      MiniCssExtractPlugin.loader,
      'css-loader?importLoaders=1',
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          modifyVars: theme
        }
      }
    ];
  }

  return config;
};

/* webpack.config.prod.js */
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.config')();

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* webpack.config.js */</span>
<span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mini-css-extract-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> config = {
    <span class="hljs-attr">module</span>: {
      <span class="hljs-attr">rules</span>: [
        {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
          <span class="hljs-attr">use</span>: [
            MiniCssExtractPlugin.loader,
            <span class="hljs-string">'css-loader?importLoaders=1'</span>,
            <span class="hljs-string">'postcss-loader'</span>
          ]
        },
        {
          <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
          <span class="hljs-attr">use</span>: [
            MiniCssExtractPlugin.loader,
            <span class="hljs-string">'css-loader?importLoaders=1'</span>,
            <span class="hljs-string">'postcss-loader'</span>,
            <span class="hljs-string">'less-loader'</span>
          ]
        }
      ]
    },
    <span class="hljs-attr">resolve</span>: {
      <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.less'</span>]
    }
  };
  
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'development'</span>) {
    config.module.rules[<span class="hljs-number">0</span>].use = [
      <span class="hljs-string">'css-hot-loader'</span>,
      MiniCssExtractPlugin.loader,
      <span class="hljs-string">'css-loader?importLoaders=1'</span>,
      <span class="hljs-string">'postcss-loader'</span>
    ];
    config.module.rules[<span class="hljs-number">1</span>].use = [
      <span class="hljs-string">'css-hot-loader'</span>,
      MiniCssExtractPlugin.loader,
      <span class="hljs-string">'css-loader?importLoaders=1'</span>,
      <span class="hljs-string">'postcss-loader'</span>,
      {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'less-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">modifyVars</span>: theme
        }
      }
    ];
  }

  <span class="hljs-keyword">return</span> config;
};

<span class="hljs-comment">/* webpack.config.prod.js */</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mini-css-extract-plugin'</span>);
<span class="hljs-keyword">const</span> OptimizeCSSAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> webpackBaseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>)();

<span class="hljs-built_in">module</span>.exports = merge(webpackBaseConfig, {
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'production'</span>,
  <span class="hljs-attr">optimization</span>: {
    <span class="hljs-attr">minimizer</span>: [
      <span class="hljs-keyword">new</span> UglifyJsPlugin({
        <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">uglifyOptions</span>: {
          <span class="hljs-attr">compress</span>: {
            <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">drop_debugger</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">drop_console</span>: <span class="hljs-literal">false</span>
          }
        }
      }),
      <span class="hljs-keyword">new</span> OptimizeCSSAssetsPlugin({})
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> MiniCssExtractPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'css/[name].css'</span>
    })
  ]
});</code></pre>
</li>
</ul>
</li>
<li>
<code>happypack</code> 炸了，小场面，升级就好 <code>@5.0.0-beta.3</code>（<code>happypack</code> 和 <code>extract-text-webpack-plugin</code> 搭配使用更佳，<code>mini-css-extract-plugin</code> 未测试）。</li>
<li>
<code>webpack-browser-plugin</code> 炸了，小场面，弃用就好，然后在 <code>devServer</code> 中配置 <code>open</code> 和 <code>openPage</code> 。</li>
<li>
<p>上面的配置中可以看到我使用判断语句 <code>process.env.NODE_ENV === 'development'</code> 在开发配置中加入了 <code>css-hot-loader</code> ，但是这里实际上是获取到的是 <code>undefined</code> ，咦？这是什么鬼？查阅更新日志是怎么说的：</p>
<blockquote>
<code>process.env.NODE_ENV</code> are set to production or development (only in built code, not in config)</blockquote>
<p>意思就是说我们在使用的工程项目代码中会获取到这个变量，但是打包配置中使用这个变量还是获取不到的，我也实际验证了这个结果，so，我在 <code>package.json</code> 的开发启动脚本中还是加上了 <code>NODE_ENV='development'</code> 。</p>
</li>
</ol>
<h2 id="articleHeader3">最后</h2>
<p>总体来说现在的升级时机已经成熟，大多需要用到的功能和插件都有平滑的升级或替代方案，建议在开始升级前安装最新发布的插件版本，也可以参考下我的项目配置<a href="https://github.com/bingqichen/react-with-mobx-template.git" rel="nofollow noreferrer" target="_blank">react-with-mobx-template</a>。</p>
<p>还有对插件的一些 API 也做了一些更改，如果你是插件开发者也可以尝试发布新的插件版本，我在使用自己的版本号提取插件<a href="https://www.npmjs.com/package/webpack-version-plugin" rel="nofollow noreferrer" target="_blank">webpack-version-plugin</a>时发现 <code>compiler.plugin</code> 已经被提示过气了， <code>webpack@v4</code> 使用最新的 <code>compiler.hooks.emit.tap</code> 触发事件，嗯，最后的这部分广告真硬！</p>
<p><span class="img-wrap"><img data-src="/img/bV8zvb?w=100&amp;h=100" src="https://static.alili.tech/img/bV8zvb?w=100&amp;h=100" alt="23333" title="23333" style="cursor: pointer; display: inline;"></span></p>
<p>该文章首发于我的<a href="https://bingqichen.me/" rel="nofollow noreferrer" target="_blank">个人站点</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack@v4升级踩坑

## 原文链接
[https://segmentfault.com/a/1190000014396803](https://segmentfault.com/a/1190000014396803)

