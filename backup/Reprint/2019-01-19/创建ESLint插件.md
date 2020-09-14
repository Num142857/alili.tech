---
title: '创建ESLint插件' 
date: 2019-01-19 2:30:10
hidden: true
slug: kvdkivrfy6
categories: [reprint]
---

{{< raw >}}

            <p><img src="https://p0.ssl.qhimg.com/t01d47c4cc9e391b349.jpg" alt=""></p>
<h1>创建ESLint插件</h1>
<p>现在已经有很多实用的ESLint插件了。在Tumblbug，我们是<a href="https://www.npmjs.com/package/eslint-config-airbnb">eslint-config-airbnb</a>和<a href="https://www.npmjs.com/package/eslint-plugin-react">eslint-plugin-react</a>的粉丝。然而，随着项目规模的扩大，你会感受到添加自定义规则来确保开发人员遵循好的实践的必要性。在这篇博客中，我将会讲述如何一步一步地创建一个ESLint插件，并且在这个插件里面写一个规则。</p>
<h3>设置</h3>
<p>首先，安装<a href="http://yeoman.io/">Yeoman</a>和方便的<a href="https://github.com/eslint/generator-eslint">generator-eslint</a>，它提供了创建插件所需要的所有模版代码。</p>
<pre><code class="hljs cmake">npm <span class="hljs-keyword">install</span> -g yonpm <span class="hljs-keyword">install</span> -g generator-eslint

</code></pre><p>接下来，为插件新建一个目录并且初始化这个目录：</p>
<pre><code class="hljs stata"><span class="hljs-keyword">mkdir</span> eslint-<span class="hljs-keyword">plugin</span>-tutorialcd eslint-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">tutorial</span>

</code></pre><pre><code class="hljs css"><span class="hljs-selector-tag">yo</span> <span class="hljs-selector-tag">eslint</span><span class="hljs-selector-pseudo">:plugin</span>

</code></pre><pre><code class="hljs routeros">? What is your name? <span class="hljs-built_in">..</span>.? What is the plugin ID? tutorial?<span class="hljs-built_in"> Type </span>a short description of this plugin: <span class="hljs-built_in">..</span>.? Does this plugin contain custom ESLint rules? <span class="hljs-literal">Yes</span>? Does this plugin contain one <span class="hljs-keyword">or</span> more processors? <span class="hljs-literal">No</span>

</code></pre><pre><code class="hljs cmake">npm <span class="hljs-keyword">install</span>

</code></pre><h3>创建规则</h3>
<p>现在，到了创建规则的时候了！我们将创建一个禁止下面代码的规则：</p>
<pre><code class="hljs haxe"><span class="hljs-keyword">var</span> <span class="hljs-literal">_</span> = require(<span class="hljs-string">'your favorite fp library'</span>);

</code></pre><p>因为这会给当前模块引入太多的代码，使得难以执行<a href="http://www.2ality.com/2015/12/webpack-tree-shaking.html">tree-shaking</a>。</p>
<p>让我们开始编写规则吧！<em>generator-eslint</em>插件也有生成规则模版的命令。</p>
<pre><code class="hljs crmsh">yo eslint:<span class="hljs-keyword">rule</span>

</code></pre><pre><code class="hljs livescript">? What <span class="hljs-keyword">is</span> your name? ...? Where will <span class="hljs-keyword">this</span> rule be published? ESLint Plugin? What <span class="hljs-keyword">is</span> the rule ID? <span class="hljs-literal">no</span>-full-fp-lib? Type a short description <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span> rule: ...? Type a short example <span class="hljs-keyword">of</span> the code <span class="hljs-literal">that</span> will fail: <span class="hljs-keyword">var</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'your favorite fp library'</span>);

</code></pre><p>在正式开始规则的编写之前，我们需要了解一下JavaScript是如何被解析的。ESLint使用了一个叫做<a href="https://github.com/eslint/espree">Espree</a>的JavaScript解析器来把JavaScript代码解析为一个抽象语法树(AST) 。规则可以“监听”语法树中特定类型的结点，当发现一个匹配的结点的时候，规则就会被触发去检验是否需要采取某些行为。幸运地是，有一个非常方便的把JavaScript代码转化为抽象语法树的在线网站，叫做<a href="https://astexplorer.net/">astexplorer</a>。因为我们将会使用ESLint默认的Espree解析器去解析代码，所以最好把网站默认的‘Acorn’解析器改为‘Espree’。</p>
<p>下面的抽象语法树是由我们想要禁用的代码生成的：</p>
<p>抽象语法树提供了创建规则所需要的全部信息。首先，可以看到我们感兴趣的结点类型是<em>VariableDeclaration</em>，它包含了一系列的<em>VariableDeclarator</em>。可以通过查看每一个<em>VariableDeclarator</em>，然后检查_id_属性的<em>name</em>属性是否为___并且<em>init</em>属性的<em>callee</em>是否为<em>require</em>来实现这个规则。查看<a href="http://eslint.org/docs/developer-guide/working-with-rules">ESLint文档</a>获取编写规则更深入的解释。</p>
<p>把上面的规则逻辑转化为代码，我们得到：</p>
<h3>测试</h3>
<p>可以很容易地通过安装<a href="https://mochajs.org/">Mocha</a>并且在package.json文件里面编写测试脚本来测试我们的规则：</p>
<pre><code class="hljs jboss-cli">“scripts”: { “test”: “mocha <span class="hljs-string">./tests/</span>**/*<span class="hljs-string">.js</span>” },

</code></pre><p>我们已经有了一些通过generator-eslint生成的代码，所以我们要做的就是填充错误信息，类型以及添加一些测试用例！</p>
<p>使用下面的代码执行mocha测试：</p>
<pre><code class="hljs dockerfile">npm <span class="hljs-keyword">run</span><span class="bash"> <span class="hljs-built_in">test</span>
</span>
</code></pre><p>可以看到所有的测试用例都通过了！</p>
<h3>ES6+</h3>
<p>写一个ES6的校验规则要更困难些，因为需要额外的配置使得代码能正常运行。我们仍然可以使用上面的AST explorer网站生成一个抽象语法树，但是需要确保在parser选项里面使用了恰当的ECMAScript版本。</p>
<p>使用ES6的语法写与上面的等价代码，我们现在需要禁止下面的导入语句：</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'my favorite fp lib'</span>;

</code></pre><p>我们使用和上面同样的逻辑写这个ES6版本的规则，代码如下：</p>
<p>为了测试这个规则，我们需要给ESLint提供一些额外的配置使它知道如何去运行这个规则。首先，因为我们使用的是ES6的语法，所以需要把<em>ecmaVersion</em>设置成6，并且因为我们的规则使用了import语法，所以还需要设置一个标志去支持这个语法。关于更多可以使用的不同特性的列表可以在<a href="http://eslint.org/docs/user-guide/migrating-to-2.0.0#language-options">ESLint文档</a>中找到。</p>
<p>测试代码如下：</p>
<p>执行<em>npm run test</em>，可以看到规则正确运行了！</p>
<h4>打包</h4>
<p>既然我们的规则已经写完并且通过了测试，剩下的就是打包了。</p>
<p>因为ESLint默认不会开启任何规则，我们可能会想要导出一个配置来启用我们的规则：</p>
<p>推荐的配置项可以通过<a href="http://eslint.org/docs/user-guide/configuring">扩展来配置我们其它的项目</a>。</p>
<p>剩下的就是可选的把插件包发布到npm上，并且在我们其它的项目里面安装和使用！</p>
<p>查看<a href="https://github.com/tumblbug/eslint-plugin-tumblbug">Github上的项目仓库</a>。</p>
<p>快乐校验！</p>
<p><strong>更新：</strong> 非常感谢Ilya Volodin分享了很多有用的资源！这篇文章现在比原先要简洁的多！</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
创建ESLint插件

## 原文链接
[https://www.zcfy.cc/article/creating-an-eslint-plugin](https://www.zcfy.cc/article/creating-an-eslint-plugin)

