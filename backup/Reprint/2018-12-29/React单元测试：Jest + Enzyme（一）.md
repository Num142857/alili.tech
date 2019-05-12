---
title: 'React单元测试：Jest + Enzyme（一）' 
date: 2018-12-29 2:30:10
hidden: true
slug: 0yzugmch1vli
categories: [reprint]
---

{{< raw >}}

                    
<h2>前言</h2>
<p>前端的单元测试在很多人看来都是一个可有可无的东西，理由一般有下面几条（以下内容统一称单元测试为单测）：</p>
<ul>
<li>写单测比较费时，有这个时间不如多做几个需求</li>
<li>测试在验收的时候对页面的功能都会操作一遍，写单测相当于做无用功</li>
<li>后端提供给前端的接口需要保证质量，因此需要做单测，但前端很少需要提供接口给其他人</li>
</ul>
<p>其实，我大体上是同意以上观点的。在大部分的情况下，如果公司的业务不复杂，是完全没必要做单测的。但如果涉及到以下几个方面，你就要考虑是否有必要引入单测了：</p>
<ul>
<li>业务比较复杂，前端参与的人员超过3人</li>
<li>公司非常注重代码质量，想尽一切办法杜绝线上出bug</li>
<li>你是跨项目组件的提供方</li>
<li>你在做一个开源项目</li>
</ul>
<h2>React项目如何做单测</h2>
<p>目前比较流行的React单测组合是Jest+Enzyme，下面我们先对它们做一个简单的了解。</p>
<p><a href="https://facebook.github.io/jest/" rel="nofollow noreferrer">Jest</a>是Facebook开发的一个测试框架，它集成了测试执行器、断言库、spy、mock、snapshot和测试覆盖率报告等功能。React项目本身也是使用Jest进行单测的，因此它们俩的契合度相当高。</p>
<p><a href="http://airbnb.io/enzyme/" rel="nofollow noreferrer">Enzyme</a>是由airbnb开发的React单测工具。它扩展了React的TestUtils并通过支持类似jQuery的find语法可以很方便的对render出来的结果做各种断言。</p>
<p>这将会是一个系列教程，作为教程的第一篇，我们先定一个小目标：将Jest应用到已有的React项目中并跑一个简单的单测（假设打包工具为webpack）。</p>
<h2>Jest的安装与配置</h2>
<pre><code class="javascript">npm install --save-dev jest jest-cli babel-jest</code></pre>
<p>其中，babel-jest的作用是让单测代码支持ES6。安装完后，在项目的根目录新建__jest__文件夹和__tests__文件夹，此时__mocks__文件夹我们暂时不管，如下图所示：<br><span class="img-wrap"><img data-src="/img/bVWhvI?w=340&amp;h=196" src="https://static.alili.tech/img/bVWhvI?w=340&amp;h=196" alt="clipboard.png" title="clipboard.png"></span></p>
<p>mudules文件夹将存放各个模块的单测代码，而utils文件夹里面是对一些公用的函数写的测试代码。</p>
<p>由于我的项目使用webpack作为打包工具，于是我在package.json里面做了以下的配置：</p>
<pre><code class="javascript">"jest": {
    "moduleFileExtensions": [
      "js",
      "jsx"
    ],
    "moduleDirectories": [
      "node_modules"
    ],
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "&lt;rootDir&gt;/__jest__/__mocks__/fileMock.js",
      "\\.(css|scss)$": "identity-obj-proxy",
      "^cpn(.*)$": "&lt;rootDir&gt;/src/components$1"
    }
  }</code></pre>
<p>moduleFileExtensions对应webpack中的extensions；moduleDirectories对应webpack中的modulesDirectories；moduleNameMapper对应webpack中的alias。这里的&lt;rootDir&gt;对应我们项目的根目录。</p>
<p>对于多媒体文件(jpg/png等)，我们可以简单的手动mock一下：</p>
<pre><code class="javascript">// &lt;rootDir&gt;/__jest__/__mocks__/fileMock.js
module.exports = 'test-file-stub';</code></pre>
<p>对于css和scss文件，我们使用<a href="https://github.com/keyanzhang/identity-obj-proxy" rel="nofollow noreferrer">identity-obj-proxy</a>来mock，它会在引用到class的地方直接返回class的类名：</p>
<pre><code class="javascript">npm install --save-dev identity-obj-proxy</code></pre>
<p>剩下的只是对一些简写路径的配置。</p>
<p>更详细的说明可以看<a href="https://facebook.github.io/jest/docs/en/webpack.html" rel="nofollow noreferrer">这里</a>。</p>
<p>至此，Jest已经安装配置完毕。为了验证安装配置是否成功，我们写一个简单的测试代码：</p>
<pre><code class="javascript">import {add} from 'common/utils/math.js'

test('adds 1 + 2 to equal 3', () =&gt; {
    expect(add(1, 2)).toBe(3);
});</code></pre>
<p>同时，在package.json文件中，加入以下script：</p>
<pre><code class="javascript">  "scripts": {
    "test": "jest __jest__/__tests__"
  }</code></pre>
<p>此时在命令行输入npm run test，出现以下结果，说明Jes安装成功并通过第一个测试<span class="emoji emoji-clap"></span>：<br><span class="img-wrap"><img data-src="/img/bVWhwV?w=826&amp;h=340" src="https://static.alili.tech/img/bVWhwV?w=826&amp;h=340" alt="clipboard.png" title="clipboard.png"></span></p>
<h2>总结</h2>
<p>按照上面说的步骤，如果一切顺利，你的第一个单测用例应该成功跑起来了！我们来回顾下我们都做了些什么：</p>
<ul>
<li>安装Jest并让其支持ES6语法</li>
<li>新建对应的单测文件夹并新建一个单测文件</li>
<li>针对项目的webpack做相应的Jest配置</li>
<li>配置运行测试脚本</li>
</ul>
<p>万事开头难，你已经踏出万里长征的第一步了！在下一篇文章中，我将会详细介绍如何使用Jest来mock方法和数据，敬请期待。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React单元测试：Jest + Enzyme（一）

## 原文链接
[https://segmentfault.com/a/1190000011468620](https://segmentfault.com/a/1190000011468620)

