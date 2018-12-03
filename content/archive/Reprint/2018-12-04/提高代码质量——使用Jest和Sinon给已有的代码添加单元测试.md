---
title: '提高代码质量——使用Jest和Sinon给已有的代码添加单元测试' 
date: 2018-12-04 2:30:05
hidden: true
slug: vnnhg4z0lab
categories: [reprint]
---

{{< raw >}}

                    
<h1>概述</h1>
<p>在日常的功能开发中，我们的代码测试都依赖于自己或者QA进行测试。这些操作不仅费时费力，而且还依赖开发者自身的驱动。在开发一些第三方依赖的库时，我们也没有办法给第三方提供完整的代码质量报告。</p>
<p>现在，我们可以使用单元测试来提高自己的代码质量。下面，我将自己在使用Jest和Sinon.js配置和编写单元测试中的收获的经验和踩到的坑进行总结，根据从零开始配置和编写单元测试这一条线来进行分享。</p>
<p>通过本文，你可以解决以下问题：</p>
<ul>
<li>Jest与Sinon.js是什么？</li>
<li>如何配置Jest与Sinon.js，从而编写单元测试？</li>
<li>如何解决进行单元测试中遇到的常见问题？</li>
</ul>
<h1>Jest与Sinon.js是什么</h1>
<p><a href="https://facebook.github.io/jest/" rel="nofollow noreferrer">Jest</a>是FaceBook推出的一个针对JavaScript进行单元测试的库，它提供了断言、函数模拟等API来对你自己编写的业务逻辑代码进行测试后。</p>
<p><a href="http://sinonjs.org/" rel="nofollow noreferrer">Sinon.js</a>是一个用来做独立测试和模拟的JavaScript库。它在单元测试的编写中通常用来模拟HTTP等相关请求。</p>
<h2>为什么没有用其他的单元测试框架</h2>
<p>在最开始的框架选择中，我先尝试了能够并行测试，大大提高单元测试速度的<a href="https://github.com/avajs/ava" rel="nofollow noreferrer">ava</a>框架。它能满足日常的普通需求如utils工具集的测试，也能够配置Sinon.js来进行HTTP模拟测试。</p>
<p>但是，在处理webpack alias的问题时，通过官方<a href="https://github.com/avajs/ava/issues/1011" rel="nofollow noreferrer">issue</a>中的极其复杂的配置也没有能够解决出现<code>Cannot find module</code>的问题（其中一个解决此问题的插件<a href="https://github.com/istarkov/babel-plugin-webpack-loaders" rel="nofollow noreferrer">babel-plugin-webpack-loaders</a>中竟然是推荐直接使用Jest，囧）。</p>
<p>而在Jest中，可以很方便的通过一些简单配置，就能够识别在文件中使用的webpack alias，相关的具体方法将会在后面章节进行具体描述。</p>
<p>而对于其他的测试框架如：<a href="https://mochajs.org/" rel="nofollow noreferrer">Mocha</a>或者<a href="http://www.chaijs.com/" rel="nofollow noreferrer">Chai</a>等，没有进行具体的了解，因此在这里不多做评价。</p>
<h1>如何配置Jest与Sinon.js，从而编写单元测试？</h1>
<h2>Jest配置</h2>
<h3>安装依赖包</h3>
<p>需要使用Jest，首先你需要进行安装，执行以下命令:</p>
<pre><code>npm install jest -D</code></pre>
<p>如果你的项目中存在<code>.babelrc</code>文件（使用了babel 6）时，不论你测试的代码是否通过babel进行编译，你都需要安装额外的几个包：</p>
<pre><code>npm install babel-jest babel-core regenerator-runtime -D</code></pre>
<p>如果你使用的是babel 7，则需要安装下面几个包：</p>
<pre><code>npm install babel-jest 'babel-core@^7.0.0-0' @babel/core regenerator-runtime -D</code></pre>
<h3>package.json文件配置</h3>
<p>在安装完成依赖包以后，如果你有相关的jest配置项需要设置，你还可以在<code>package.json</code>文件中配置如下字段：</p>
<pre><code class="json">{
  "jest": {
    
  }
}</code></pre>
<p><code>.babelrc</code>文件只需要保存之前的配置，不需要做任何修改即可生效。</p>
<h2>Sinon.js配置</h2>
<h3>依赖包安装</h3>
<p>安装配置完了Jest，让我们来看下Sinon.js。需要使用Sinon.js，我们首先需要进行安装：</p>
<pre><code>npm install sinon -D</code></pre>
<p>配置完成后，需要在使用的地方进行引入，如下所示：</p>
<pre><code class="javascript">const sinon = require('sinon');</code></pre>
<p>在我的项目中，主要是使用Sinon.js来模拟HTTP请求。在Sinon.js的文档中，有专门关于<a href="http://sinonjs.org/releases/v4.5.0/fake-xhr-and-server/" rel="nofollow noreferrer">XMLHttpRequest对象的模拟</a>的章节，在下一章中，我们将会针对项目中sinon.js的使用进行简单的介绍。</p>
<h2>编写单元测试</h2>
<p>在本章中，我们会针对如何编写单元测试文件进行一个具体的讲解，其中包含：</p>
<ul>
<li>同步函数测试</li>
<li>异步函数测试</li>
<li>HTTP测试</li>
</ul>
<p>同时，我们会对当中使用到的Jest和Sinon.js的API会进行简单介绍，如果需要使用其他的API，可以自行阅读<a href="https://facebook.github.io/jest/" rel="nofollow noreferrer">Jest</a>和<a href="http://sinonjs.org/" rel="nofollow noreferrer">Sinon.js</a>的文档。</p>
<p>通过上面三类测试，我们基本能够覆盖现有项目中的所有代码。</p>
<h3>同步函数测试</h3>
<p>同步函数的测试过程是这几个中最简单的一部分，我们可以测试函数返回值，也能够<a href="https://facebook.github.io/jest/docs/en/mock-functions.html" rel="nofollow noreferrer">测试传入的高阶函数</a>。下面我们通过一个具体的例子来看下。</p>
<p>源代码文件，一个纯函数：</p>
<pre><code class="javascript">// user.js
export default function(obj) {
    return 'hjava';
}

export function handleUserData(callback) {
    callback('hjava');
}</code></pre>
<p>针对上面的源代码文件编写的一个单元测试文件：</p>
<pre><code class="javascript">// user.test.js
import userFunc, {handleUserData} from './user';

// test是一个注册的全局方法
test('user', () =&gt; {
    expect(userFunc()).toBe('hjava'); // 判断userFunc的执行结果等于'hjava'
    
    let callback = jest.fn(); // jest是一个注册的全局变量
    handleUserData(callback);

    expect(callback.mock.calls.length).toBe(1); // 判断callback函数被调用了一次
    expect(callback.mock.calls[0][0]).toBe('hjava'); // 判断了callback函数的第一次被调用的第一个参数为'hjava'
});</code></pre>
<p>从上面的示例中我们可以看到，针对同步的纯函数，我们可以通过很简单的单元测试模型来验证它的功能。</p>
<h3>异步函数测试</h3>
<p>异步函数主要分为两种——Callback方式和Promise方式。这两种方式都很简单，下面我们对两种方式进行具体的介绍。详细内容可以见Jest文档中的<a href="https://facebook.github.io/jest/docs/en/asynchronous.html" rel="nofollow noreferrer">测试异步代码</a>。</p>
<h4>Callback方式</h4>
<pre><code class="javascript">// user.js
export default function(callback) {
    setTimeout(()=&gt;{
        callback({username: 'hjava'});
    }, 1000);
}</code></pre>
<pre><code class="javascript">// user.test.js
import userFunc from './user';

test('user', () =&gt; {
    userFunc((data) =&gt; {
        expect(data).toEqual({username: 'hjava'}); // 对象比较用beEqual()
    });
});</code></pre>
<h4>Promise方式</h4>
<pre><code class="javascript">// user.js
export default function(callback) {
    return Promise.resolve({username: 'hjava'});
}
</code></pre>
<pre><code class="javascript">// user.test.js
import userFunc from './user';

test('user', () =&gt; {
    userFunc().then((data) =&gt; {
        expect(data).toEqual({username: 'hjava'});
    });
});</code></pre>
<h3>HTTP测试</h3>
<p>在测试HTTP请求相关参数的过程中，我们需要模拟XMLHttpRequest对象，从而拦截相关的HTTP请求，获取请求数据。正好Sinon.js能够做到这一点。下面我们通过一个示例来看下相关的逻辑：</p>
<pre><code class="javascript">// user.js
export default function(callback) {
    this.sendRequest('/user/get', callback); // 发送请求来获取用户数据，成功后执行callback回调函数
}</code></pre>
<pre><code class="javascript">// user.test.js
import Sinon from 'sinon';
import userFunc from 'user';

let XHR;
let requests = [];
// beforeEach是Jest提供的函数，在每个测试执行前都会执行一次
beforeEach(() =&gt; {
    XHR = sinon.useFakeXMLHttpRequest(); //创建一个模拟的XMLHttpRequest对象

    XHR.onCreate = function (xhr) {
        requests.push(xhr);
    };
});

// afterEach是Jest提供的函数，在每个测试执行后都会执行一次
afterEach(() =&gt; {
    XHR.restore();
});

test('user', () =&gt; {
    let callback = jest.fn();

    HTTPCommon.deleteRemoteSession({
        data: {},
        success: callback
    });

    expect(requests.length).toBe(1);

    requests[0].respond(200, {"Content-Type": 'application/json'}, 'hjava'); // 模拟返回值

    expect(callback.mock.calls[0][0]).toBe('hjava');
});</code></pre>
<h1>如何解决进行单元测试中遇到的常见问题？</h1>
<p>在本章中，我们总结了如下问题来进行介绍，希望大家再遇到相同问题时能够快速解决：</p>
<ul>
<li>如何统计Jest单元测试覆盖率</li>
<li>如何设置单元测试文件不使用本地的babel配置</li>
<li>如何设置单元测试文件使用本地的babel配置</li>
<li>如何处理代码中引用的webpack alias问题</li>
</ul>
<h2>如何统计单元测试覆盖率？</h2>
<p>不像ava一样，需要使用syc来进行计算，Jest内置了统计单元测试覆盖率的工具，只需要简单配置即可达到相关的要求。具体配置如下：</p>
<pre><code class="json">// package.json
{
  "jest": {
    "collectCoverage": true, // 是否开启统计单元测试覆盖率
    "collectCoverageFrom": [ // 指定统计单元测试覆盖率文件
      "**/src/**.js"
    ],
  }
}</code></pre>
<h2>如何设置单元测试文件不使用ES2015配置</h2>
<p>如果你的项目中有<code>.babelrc</code>文件，而你不希望单元测试文件受到babel文件的影响，你可以在jest的配置项中增加<code>transform</code>字段，具体配置如下:</p>
<pre><code class="json">// package.json
{
  "jest": {
    "transform": {}
  }
}</code></pre>
<h2>如何设置单元测试使用ES2015配置</h2>
<p>如果你的单元测试文件中需要使用ES2015后通过babel来进行编译，那么需要对<code>.babelrc</code>文件的配置进行部分修改。</p>
<p>如果你之前在<code>.babelrc</code>文件中，把<code>modules</code>字段设置为false，那么你需要在<code>test</code>环境下重新开启，具体代码如下：</p>
<pre><code class="json">// .babelrc
{
  "presets": [["env", {"modules": false}]],
  "env": {
    "test": {
      "presets": [["env"]]
    }
  }
}</code></pre>
<p>如果你使用的是babel 7的话（安装时多安装过相关依赖包），你需要设置的<code>presets</code>字段的值应该为<code>@babel/env</code>，具体代码如下：</p>
<pre><code class="json">// .babelrc
{
  "presets": [["env", {"modules": false}]],
  "env": {
    "test": {
      "presets": [["@babel/env"]]
    }
  }
}</code></pre>
<h2>如何处理代码中引用的webpack alias问题</h2>
<p>如果我们在项目中使用了webpack，那么我们很大概率会使用到alias相关属性来定义路径。但是，在单元测试框架中，它并不能够识别这种路径，就会出现<code>Cannot find module 'xxx' from 'yyy'</code>的报错。</p>
<p>不像ava框架需要安装插件和进行复杂的配置，我们只需要在Jest中配置<code>moduleNameMapper</code>属性即可满足需求。具体示例如下：</p>
<pre><code class="json">// webpack.config.js
{
    alias: {
        '@__dir':process.cwd()
    }
}</code></pre>
<pre><code class="json">//package.json
{
    "jest": {
        "moduleNameMapper": {
        "@__dir(.*)$": "&lt;rootDir&gt;$1" //正则匹配方式，对应webpack alias
        }
    }
}</code></pre>
<h1>总结</h1>
<p>编写测试是一个很好的习惯。</p>
<p>很多人经常都说要对自己的代码进行质量监控，但是又不知道该如何下手。通过这篇文章，你应该学会了如何针对已有代码从零开始编写一套完整的单元测试用例。</p>
<p>如果有任何疑问，欢迎留言或者私信进行沟通与交流。</p>
<p>关于Jest是如何测试JavaScript代码以及Sinon是如何模拟XMLHttpRequest请求的，我们将会在后面几篇博客中给大家带来相关的源码解析，有兴趣的同学可以关注我，留意后续的文章。</p>
<h1>附录</h1>
<ul>
<li><a href="https://facebook.github.io/jest/" rel="nofollow noreferrer">Jest</a></li>
<li><a href="http://sinonjs.org/" rel="nofollow noreferrer">Sinon.js</a></li>
<li><a href="https://github.com/avajs/ava" rel="nofollow noreferrer">ava</a></li>
<li><a href="https://github.com/avajs/ava/issues/1011" rel="nofollow noreferrer">ava关于配置解决webpack alias的issue</a></li>
<li><a href="https://mochajs.org/" rel="nofollow noreferrer">Mocha</a></li>
<li><a href="http://www.chaijs.com/" rel="nofollow noreferrer">Chai</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
提高代码质量——使用Jest和Sinon给已有的代码添加单元测试

## 原文链接
[https://segmentfault.com/a/1190000014465282](https://segmentfault.com/a/1190000014465282)

