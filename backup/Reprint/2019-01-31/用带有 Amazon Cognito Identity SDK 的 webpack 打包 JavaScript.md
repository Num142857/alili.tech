---
title: '用带有 Amazon Cognito Identity SDK 的 webpack 打包 JavaScript' 
date: 2019-01-31 2:31:16
hidden: true
slug: 74yvxrfyspv
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#用带有-amazon-cognito-identity-sdk-的-webpack-打包-javascript"></a>用带有 Amazon Cognito Identity SDK 的 webpack 打包 JavaScript</h1>
<p>这篇文章针对开发和部署基于 JavaScript 的应用（服务器端的 Node.js 或者客户端）的各种经验水平的开发者，通过本文，你将看到如何把 AWS SDK， Amazon Cognito Identity SDK 嵌入到 JavaScript 中，以及如何使用流行的 [webpack][1] 模块打包器。</p>
<p>2016 年 7 月， AWS [推出了 Amazon Cognito 用户库（user pool）][2]，这个新特性极大的方便了开发者在移动和 Web 应用程序上添加注册和登录功能。为了让开发者更容易在自己的应用程序中实现用户库功能，我们也发布了[用于 JavaScript 的 Amazon Cognito Identity SDK][3]。</p>
<p>Amazon Cognito 用户库可以让你在移动和 Web 应用程序上添加用户注册和登录功能更加容易。全托管用户库可以扩展到数以百万计的用户，你可以在每个 AWS 账户下有多重目录。创建一个用户库只需要几分钟的时间，并且你可以决定当一个新用户在你的应用程序或服务上注册时哪些属性（包括地址、邮箱、电话号码以及自定义属性）是强制的，哪些是可选择的。你的应用程序也可以指定所需的密码强度，指定用户需要进行多因素认证（MFA），以及通过电话号码或者邮件地址来验证新用户，从而进一步加强应用程序的安全性。</p>
<p>如果你是首次接触用于 JavaScript 的 Amazon Cognito Identity SDK，那么请先阅读[这篇 AWS 文章][4]作为开始。</p>
<h3><a href="#为什么在-javascript-上使用-asset-及模块捆绑的-amazon-cogtito-identity-sdk"></a>为什么在 JavaScript 上使用 Asset 及模块捆绑的 Amazon Cogtito Identity SDK</h3>
<p>今天，针对移动和桌面的现代 Web 应用程序都能为用户提供安全、快捷、灵敏以及类本地应用的体验。毫无疑问，现代的浏览器功能足够强大，能够肩负起大量可能的功能实现。许多流行的实现很大程度上依赖于 JavaScript 应用程序通过某种形式的 asset 封装和/或模块捆绑进行部署。这使得许多开发人员能够很好的维护自己的 JavaScript 应用程序，并且可以通过使用 script 标签创建一个或多个可以加载到客户端浏览器上的文件。</p>
<p>关于如何实现打包有许多争鸣，包括 [Grunt][5] 和 [Gulp][6] 这样的 task runner，以及 [Browserity][7] 这样的打包器。然而，一个普遍的共识是， asset 打包不仅可以改善加载时间 - 它可以在确保可测试性和健壮性的前提下使你的应用程序模块化。</p>
<h3><a href="#使用带有-amazon-cognito-identity-sdk-的-webpack-打包-javascript"></a>使用带有 Amazon Cognito Identity SDK 的 webpack 打包 JavaScript</h3>
<p>我们接到了许多请求，要求我们提供如何在 webpack 环境下整合用于 JavaScript 的 Amazon Cognito Identity SDK 的更多细节。我们特地要求确保 webpack 正确管理一下第三方的依赖包：</p>
<ul>
<li>[用于 BigInteger 计算的 JavaScript BN 库][8]（jsbn）</li>
<li>[jsbn 扩展][9]及包含大多数公共 BigInteger 方法的其它 jsbn 方法（jsbn2）</li>
<li>[Stanford JavaScript Crypto 库][10]（jscl）</li>
</ul>
<p>通过这些例子，可以看到，下面这些 bower 库都被 bower.json 使用</p>
<pre><code class="hljs 1c"><span class="hljs-string">"aws-cognito-sdk"</span>: <span class="hljs-string">"https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/master/dist/aws-cognito-sdk.js"</span>,
<span class="hljs-string">"amazon-cognito-identity"</span>: <span class="hljs-string">"https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/master/dist/amazon-cognito-identity.min.js"</span>,
<span class="hljs-string">"sjcl"</span>: <span class="hljs-string">"https://raw.githubusercontent.com/bitwiseshiftleft/sjcl/master/sjcl.js"</span>,
<span class="hljs-string">"jsbn"</span>: <span class="hljs-string">"https://raw.githubusercontent.com/andyperlitch/jsbn/master/index.js"</span>,

</code></pre><p>出于我们前面给出的关于 asset 打包对于开发过程的重要性的原因，除非你的应用程序非常小，否则使用像 webpack 这样的 asset 打包工具几乎总是必须的。当然，还有一个方法是可以通过使用标签简单的处理所有依赖关系。然而，这会污染全局命名空间，而且不能够提供最优的资源管理和加载方式。许多开发者首次使用的是具有标准 babel 加载器的标准 webpack.config.js 文件，像下面展示的这样。</p>
<pre><code class="hljs vim">{
  /** test <span class="hljs-keyword">for</span> <span class="hljs-keyword">file</span> ending in js <span class="hljs-built_in">or</span> jsx 
   * exclude node_module <span class="hljs-built_in">and</span> bower_components - we dont want <span class="hljs-keyword">to</span> babel these 
   * use the babel loader 
   * apply the react <span class="hljs-built_in">and</span> es2015 (es6) transformations **/

  tes<span class="hljs-variable">t:</span> /\.jsx?$/,
  exclude: /(node_modules|bower_components)/,
  loader: <span class="hljs-string">'babel'</span>,
  query: {
    preset<span class="hljs-variable">s:</span> [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
  }
}

</code></pre><p>需要重点记住的是，这个配置没有考虑一些第三方依赖关系，这些被用于 JavaScript 的 Amazon Cognito Identity SDK 所使用的第三方依赖目前没有使用 [JavaScript 通用模块定义(UMD)][11]。</p>
<p>UMD 模式试图提供与 [RequireJS][12] 和 [CommonJS][13] 这些当前最流行的脚本加载器的异步模块定义 [AMD] 的基本兼容。</p>
<p>这是 webpack 所依赖的模式，为了让 webpack 能够工作，我们必须进行一些改变。不做这些改变，你可能会遇到下面这些错误。</p>
<pre><code class="hljs maxima">amazon-cognito-<span class="hljs-built_in">identity</span>.<span class="hljs-built_in">min</span>.js:<span class="hljs-number">19</span> Uncaught ReferenceError: BigInteger <span class="hljs-built_in">is</span> <span class="hljs-keyword">not</span> defined

</code></pre><p>这样一个错误可能会在调用 AWSCognito.CognitoIdentityServiceProvider.CognitoUser property authenticateUser 的时候出现。在这个错误例子中，我们可以利用 webpack 的 import 和 export 加载器的能力来解决这个错误。</p>
<h3><a href="#使用-webpack-加载器"></a>使用 webpack 加载器</h3>
<p>根据 [webpack 文档]，“加载器允许你通过 require() 或 load 来预处理文件。加载器是一种类似其它构建工具中 “tasks” 的工具，它可以提供一个处理前端构建步骤的强大方法。加载器可以把一个文件从一种语言转化成另一种语言，比如把 CoffeeScript 转化成 JavaScript ，或者把图像转换为 data URL。“</p>
<p>为了解决 UMD 的兼容性缺乏的问题，你必须依赖两个具体的加载器， import 和 export 加载器。</p>
<h4><a href="#使用-export-加载器"></a>使用 export 加载器</h4>
<p>在使用用于 JavaScript 的 Amazon Cognito Identity SDK 的情况下，我们需要确保把 theAWSCognito 变量导出到 require /import 它们的模块的变量范围内（针对 ES6）。</p>
<pre><code class="hljs css">{
  <span class="hljs-attribute">test</span>: /aws-cognito-sdk\/index\.js/,
  loader: <span class="hljs-string">'exports?AWSCognito'</span>
}

</code></pre><p>在由 webpack 创建的捆绑中，使用 export 加载器会有导出模块方法的效果。因此， 在 require 和 import 后，AWSCognito 和 AWS 是可访问的（针对 ES6）。</p>
<pre><code class="hljs stylus"><span class="hljs-selector-tag">var</span> AWSCognito = require(<span class="hljs-string">'aws-cognito-sdk'</span>)

<span class="hljs-comment">/*** EXPORTS from export-loader ***/</span> 
module<span class="hljs-selector-class">.exports</span> = AWSCongito

</code></pre><p>[这儿][18]可以找到更多关于 export 加载器的信息。</p>
<h4><a href="#使用-import-加载器"></a>使用 import 加载器</h4>
<p>import 加载器主要用于把变量注入（import）到另一个模块的变量范围内。当第三方模块需要依赖全局变量的时候， import 加载器非常有用，比如针对 JavaScript 的 Amazon Cognito Identity SDK 需要依赖 BigInteger 或者 sjcl 的时候。</p>
<p>如果你不使用 webpack 加载器，下面这些内容会在一个捆绑中生成。</p>
<pre><code class="hljs gcode">__webpack_require__<span class="hljs-comment">(431)</span>;       <span class="hljs-comment">// refers to jsbin</span>
__webpack_require__<span class="hljs-comment">(432)</span>;       <span class="hljs-comment">// refers to sjcl</span>

</code></pre><p>因为 jsbin 和 sjcl 都不能 export 任何东西，因此任何依赖于这些模块的调用都会导致一个错误。</p>
<p>为了解决这个问题，我们需要使用下面的 webpack 加载器配置：</p>
<pre><code class="hljs css">{
  <span class="hljs-attribute">test</span>: /amazon-cognito-identity\/index\.js/,
  loader: <span class="hljs-string">'imports?jsbn,BigInteger=&gt;jsbn.BigInteger,sjcl'</span>
},
{
  <span class="hljs-attribute">test</span>: /sjcl\/index\.js/,
  loader: <span class="hljs-string">'imports?sjcl'</span>
}

</code></pre><p>这个配置把下面的这些内容嵌入到了由 webpack 创建的捆绑中（此时是 bundle.js）。</p>
<pre><code class="hljs mipsasm"><span class="hljs-comment">/*** IMPORTS FROM imports-loader ***/</span>
var <span class="hljs-keyword">jsbn </span>= __webpack_require__(<span class="hljs-number">431</span>)<span class="hljs-comment">;</span>
var <span class="hljs-keyword">BigInteger </span>= <span class="hljs-keyword">jsbn.BigInteger;
</span>var sjcl = __webpack_require__(<span class="hljs-number">432</span>)<span class="hljs-comment">;</span>
</code></pre><p>结果，jsbn、BigInteger 和 sjcl 都被从它们各自的模块中导入到了用于 JavaScript 的 Amazon Cognito Identity SDK 中。</p>
<p>有关 import 加载器的更多信息可以在<a href="https://github.com/webpack/imports-loader">这儿</a>找到。</p>
<h3>下一步</h3>
<p>我们鼓励你下载<a href="https://github.com/aws/amazon-cognito-identity-js">用于 JavaScript 的 Amazon Cognito Identity SDK</a> 并开始构建你的应用，并在这篇文章的指导下通过 webpack 能够迅速掌握。</p>
<p>如果你有任何意见或问题，请在下面自由评论，也可以发邮件到 <a href="mailto:teichtah@amazon.com">teichtah@amazon.com</a> 或者在<a href="https://github.com/aws/amazon-cognito-identity-js/issues">这儿</a>提出问题。</p>
<h3>引用</h3>
<p>这篇文章引用了下面这些第三方资源：</p>
<ul>
<li>webpack - <a href="https://webpack.github.io/">https://webpack.github.io/</a></li>
<li>webpack 文件 - <a href="http://webpack.github.io/docs/what-is-webpack.html">http://webpack.github.io/docs/what-is-webpack.html</a></li>
<li>webpack export 加载器 - <a href="https://github.com/webpack/exports-loader">https://github.com/webpack/exports-loader</a></li>
<li>webpack import 加载器 - <a href="https://github.com/webpack/imports-loader">https://github.com/webpack/imports-loader</a></li>
<li>用于 BigInteger 计算的 JavaScript BN 库- <a href="http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js">http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js</a></li>
<li>jsbns - <a href="http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn2.js">http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn2.js</a></li>
<li>Stanford JavaScript Crypto 库 - <a href="https://github.com/bitwiseshiftleft/sjcl">https://github.com/bitwiseshiftleft/sjcl</a></li>
<li>RequireJS - <a href="http://requirejs.org/">http://requirejs.org/</a></li>
<li>CommonJS - <a href="http://www.commonjs.org/">http://www.commonjs.org/</a></li>
</ul>
<hr>
<p>via: <a href="https://mobile.awsblog.com/post/Tx1A84CLMDJ744T/Using-webpack-with-the-Amazon-Cognito-Identity-SDK-for-JavaScript">https://mobile.awsblog.com/post/Tx1A84CLMDJ744T/Using-webpack-with-the-Amazon-Cognito-Identity-SDK-for-JavaScript</a></p>
<p>作者：<a href="https://mobile.awsblog.com/blog/author/Marc+Teichtahl">Marc Teichtahl</a>
译者：<a href="https://github.com/ucasFL">ucasFL</a>
校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>
<p><code>`</code></p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用带有 Amazon Cognito Identity SDK 的 webpack 打包 JavaScript

## 原文链接
[https://www.zcfy.cc/article/using-webpack-with-the-amazon-cognito-identity-sdk-for-javascript](https://www.zcfy.cc/article/using-webpack-with-the-amazon-cognito-identity-sdk-for-javascript)

