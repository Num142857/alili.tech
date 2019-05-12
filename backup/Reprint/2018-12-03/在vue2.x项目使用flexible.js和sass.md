---
title: '在vue2.x项目使用flexible.js和sass' 
date: 2018-12-03 2:30:08
hidden: true
slug: wylgf5m2z3k
categories: [reprint]
---

{{< raw >}}

                    
<h3>1.首先创建一个vue项目：</h3>
<pre><code>vue init webpack myproject</code></pre>
<h3>2.安装完成后进入项目</h3>
<pre><code>cd myproject
npm install</code></pre>
<h3>3.使用flexible.js适配</h3>
<p>安装lib-flexible：</p>
<pre><code>npm install lib-flexible --save</code></pre>
<p>在main.js里引入：</p>
<pre><code>import 'lib-flexible/flexible'</code></pre>
<h3>4.将px自动转为rem</h3>
<p>安装postcss-px2rem：</p>
<pre><code>npm install postcss-px2rem --save-dev</code></pre>
<p>在webpack.dev.conf.js的plugins里添加代码：</p>
<pre><code>new webpack.LoaderOptionsPlugin({
  vue: {
    postcss: [require('postcss-px2rem')({remUnit: 75})]
  },
})</code></pre>
<p>remUnit的值可根据设计稿自行修改，一般750的图就设置成75，这样写750px就正好是100%宽度。</p>
<h3>5.使用sass</h3>
<p>安装依赖：</p>
<pre><code>npm install sass-loader node-sass --save-dev</code></pre>
<p>在webpack.base.conf.js的rules里添加代码：</p>
<pre><code>{
  test: /\.sass$/,
  loaders: ['style', 'css', 'sass']
}</code></pre>
<p>在.vue文件里：</p>
<pre><code>&lt;style lang="scss"&gt;</code></pre>
<p>这样就可以使用sass了~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在vue2.x项目使用flexible.js和sass

## 原文链接
[https://segmentfault.com/a/1190000014649718](https://segmentfault.com/a/1190000014649718)

