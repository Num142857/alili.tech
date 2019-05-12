---
title: '也来扯扯 Vue 单元测试' 
date: 2018-12-07 2:30:10
hidden: true
slug: 2r127ceofhl
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014112450" src="https://static.alili.tech/img/remote/1460000014112450" alt="file" title="file" style="cursor: pointer; display: inline;"></span><br>从使用 Vue 写出第一个 <code>Hello world</code> 到现在已经有近两年时间了，期间利用业余时间折腾了一套组件 we-vue，起初是出于实践学到的新知识，更多的是玩的意思，不过后来维护的过程中渐渐积累了一些经验，并开始享受这种过程。</p>
<p>在 we-vue 更新到 v2.0 的时候，开始全面地编写单元测试。起先使用 karma + mocha + chrome-headless 这种组合完成的行级覆盖率达到 96% 的测试。但最近，我又放弃了这种组合，转而使用 Jest。在这连番的折腾中，入过不少坑（当然，很多时候是自己挖坑自己跳），也解锁了不少新姿势。</p>
<p>本文主要扯一扯自己在完成这些单元测试，以及迁移到 Jest 过程中的一些收获。文中并不会涉及非常具体的测试写法，因为这些教程官方文档已经做得很好了。希望文中的一些内容对于正准备做 Vue （其实也不仅限于 Vue） 单元测试的人能有所帮助。</p>
<h2 id="articleHeader0">为什么要做单元测试</h2>
<p>作为一个程序员，单元测试或许是一个绕不开的坎。我大致总结了一下当初决定做单元测试的原因：</p>
<ol>
<li>有单元测试的项目，显得更专业，更有 B 格。真的，认真回忆下，这确实是当初自己的首要动机，可能这算是动机不纯吧？ <img src="https://static.alili.techundefined" class="emoji" alt="smile" title="smile">
</li>
<li>懒！受不了每次调整之后，得不断地检查代码，甚至查看页面源码是否符合预期。不断修改各种参数并刷新以测试不同情况下的结果。而这里面的一大部分工作其实可以让单元测试来完成。所以说，懒人让世界更美好！</li>
<li>单元测试能避免出现一些代码运行结果与预期不符的错误，通常是一些比较低级但又难以发现的问题。</li>
<li>单元测试能够避免在升级更新、修复 BUG 的时候引入一些意料之外的问题。<strong>有时候自以为小修改小优化无大碍，其实不然！</strong>
</li>
<li>单元测试对提高代码质量很有帮助。因为，好的代码一般是便于测试的。如果在进行单元测试过程中发现自己的一些代码不方便进行测试，那么你可能需要重新审视这些代码，看是否有一些设计上不合理或者可以优化的地方。<strong>当然，这也并不是说代码应该“迁就”于单元测试，如果这样就有点儿本末倒置了。</strong>
</li>
</ol>
<p>总之，单元测试能提高程序的可靠性，让开发者在发布时更有底气，让使用者更有安全感。虽然编写单元测试需要花费一些时间，但相比于它所带来的优势，这些时间和精力上的花费还是值得的。</p>
<p>另外值得注意的是，单元测试并不能完全代替功能测试，因为程序本身设计的逻辑错误或者其它的一些环境因素所造成的影响，单元测试可能无能为力。所以，单元测试只是保证你想让程序模块输出一只猪，它不会整出一头驴来。至于进一步的功能测试或者说“肉测”，仍然是有必要的。</p>
<h2 id="articleHeader1">用到的一些工具（软件）</h2>
<h4>趁手的家伙 -- WebStorm / Visual Studio Code</h4>
<p>去打群架，得操个趁手的家伙，板砖极好，大木头棒子也不错。</p>
<p>而写代码，一个好用的 IDE 或者编辑器，能让效率飞升。就我个人而言，做前端时大部分时间使用 WebStorm，其本身对 Vue.js 就有很好的支持（内置了相关的插件）同时也支持的各种测试框架，适当的配置之后，可以很方便的进行断点、查看规模之类的调试工作。</p>
<p>此外，Visual Studio Code 也是个不错的选择，目前已不有少 Vue.js 开发和测试相关的插件了，只需要搜索加点击但可安装。</p>
<blockquote>当然，这里我无意挑起各种 IDE 或者编辑器流派之争端，提到的两个只是自己个人喜好。大家可自行选择合适的，甚至只要自己喜欢且觉得方便，用记事本开干也没问题。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014112451" src="https://static.alili.tech/img/remote/1460000014112451" alt="file" title="file" style="cursor: pointer; display: inline;"></span></p>
<h4>用成熟好用的测试工具库 -- vue-test-utils</h4>
<p><a href="https://github.com/vuejs/vue-test-utils" rel="nofollow noreferrer" target="_blank">vue-test-utils</a> 是 Vue 生态圈中的一个开源项目，其前身是 <a href="https://github.com/eddyerburgh/avoriaz" rel="nofollow noreferrer" target="_blank">avoriaz</a>，avoriaz 也是一个不错的包，但其 README 中有说明，当 vue-test-utils 正式发布的时候， 它将会被废弃。</p>
<p>vue-test-utils 能极大地简化 Vue.js 单元测试。</p>
<p>例如，网上一搜 Vue 单元测试，得到的例子一般是像下面这样的（包括 vue-cli 提供的模板里默认也是这样）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span>

describe(<span class="hljs-string">'HelloWorld.vue'</span>, () =&gt; {
  it(<span class="hljs-string">'should render correct contents'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> Constructor = Vue.extend(HelloWorld)
    <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Constructor().$mount()
    expect(vm.$el.querySelector(<span class="hljs-string">'.hello h1'</span>).textContent)
      .toEqual(<span class="hljs-string">'Welcome to Your Vue.js App'</span>)
  })
})</code></pre>
<p>使用 vue-test-utils 后，你可以像下面这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { shallow } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(HelloWorld, {
      attachToDocument: ture
    })

    expect(wrapper.find('.hello h1').text()).to.equal('Welcome to Your Vue.js App')
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { shallow } <span class="hljs-keyword">from</span> <span class="hljs-string">'@vue/test-utils'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span>

describe(<span class="hljs-string">'HelloWorld.vue'</span>, () =&gt; {
  it(<span class="hljs-string">'should render correct contents'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = shallow(HelloWorld, {
      <span class="hljs-attr">attachToDocument</span>: ture
    })

    expect(wrapper.find(<span class="hljs-string">'.hello h1'</span>).text()).to.equal(<span class="hljs-string">'Welcome to Your Vue.js App'</span>)
  })
})</code></pre>
<p>可以看到代码更加简洁了。wrapper 内含许多有用的方法，上面的例子中所使用的 find() 其中最简单不过的一个。vue-test-utils 还有 createLocalVue() 等方法以及 stub 之类的功能，基本上可以完成绝大部分情况下的测试用例。</p>
<blockquote>需要注意的是，截至日前（2018-03-21）仍然处于 Beta 阶段。在正式版发布之前可能会有大的更改，例如新增或废弃一些方法。同时也可能存在一些 BUG（自己就曾<a href="https://github.com/vuejs/vue-test-utils/issues/263" rel="nofollow noreferrer" target="_blank">修复过一个</a> <img src="https://static.alili.techundefined" class="emoji" alt="smile" title="smile">）。但目前总体来说已趋于稳定，推荐使用，需要留意其最新更改。</blockquote>
<h4>选择一个好用的断言库</h4>
<p>通常是 chai，有时候结合 sinon 一起使用。chai 是一个优秀的库，里面的方法十分完善。网上相关的教程更是不计其数，这也反映出它很受欢迎。</p>
<p>不过个人并不太中意 chai 的语法，比如比较常用的 <code>to.be.ok</code>,<code>to.not.be.ok</code>,<code>expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b')</code>，为啥要那么长？为啥要那么多句点？顺序忘了怎么弄？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014112452" src="https://static.alili.tech/img/remote/1460000014112452" alt="file" title="file" style="cursor: pointer; display: inline;"></span></p>
<p>所以一开始我就选择了 expect.js (expect 是 Jest 的一部分，可以单独安装使用)，主要是它的语法更符合我的口味，这也为后期迁移到 Jest 省了不少事。</p>
<h4>一个合适测试框架 -- Jest</h4>
<p>这里只提到了 Jest，当然也是个人喜好而已，这也是自己最终决定的方案。当然此前使用的 karma + mocha + chai + chrome... 那一套也有其适用场景和可取之处。后面将会提到 Jest 的一些优点和缺点。</p>
<h2 id="articleHeader2">利用 CI 服务自动进行单元测试、构建以及发布</h2>
<p>现在已经有不少平台提供 CI 服务，例如 TravisCI 和 CircleCI。对于开源的项目，能免费使用这些平台的服务持续集成一些日常构建、测试工作。</p>
<p>自己目前使用 CircleCI，具体原因就不多说了，使用哪个取决于自身喜好和具体业务情况，甚至可以考虑自己搭建 CI 服务器。</p>
<h2 id="articleHeader3">为自己的项目加入测试覆盖率徽标</h2>
<p>在自己开源项目的 README 中加入一个显示单元测试覆盖率的徽标，会增进用户的第一印象。高覆盖率的徽标，会使项目显得更专业可靠，也能让用户进一步了解整个项目并最终选用。</p>
<p>CodeCov 能提供这种服务，并可以结合前面提到的 CI 使用，通过 CI 在代码推送后自动执行单元测试，通过后将代码覆盖率相关数据发送给 CodeCov，这样，在 README 中加入的覆盖率徽标就能自动更新了。</p>
<p>为此，你需要一个 codecov 账号（通常用 GitHub 账号登录即可）并安装 <code>codecov</code> 包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ yarn add -D codecov" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell" style="word-break: break-word; white-space: initial;">$ yarn <span class="hljs-keyword">add</span><span class="bash"> -D codecov</span></code></pre>
<p>然后在 CI 的任务配置里加入上传代码测试覆盖率数据的步骤，例如 CircleCI 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="steps:
    ## 前面部分任务省略

    # run tests!
    - run: yarn test

    # update codecov stats
    - run: ./node_modules/.bin/codecov" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">steps:</span>
    <span class="hljs-comment">## 前面部分任务省略</span>

    <span class="hljs-comment"># run tests!</span>
<span class="hljs-attr">    - run:</span> <span class="hljs-string">yarn</span> <span class="hljs-string">test</span>

    <span class="hljs-comment"># update codecov stats</span>
<span class="hljs-attr">    - run:</span> <span class="hljs-string">./node_modules/.bin/codecov</span></code></pre>
<p>最后在 README 里加入微标图片就可以了,就像这样。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014112453" src="https://static.alili.tech/img/remote/1460000014112453" alt="code cov" title="code cov" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">Jest 相对于 karma + mocha + Chrome 组合的优缺点</h2>
<p>前面提到，我最终转向了使用 Jest，这并非一时脑热，而是经过多次权衡和尝试之后才作的决定。主要是由于 Jest 相对于之前的方案有着不少优势，一些特性让测试变得更轻松愉快，更有效率。</p>
<p>我大致做了下对比，粗略总结如下：</p>
<h3 id="articleHeader5">优点</h3>
<ol>
<li>一站式的解决方案<p>在使用 Jest 之前，我需要一个测试框架（mocha），需要一个测试运行器（karma），需要一个断言库（chai），需要一个用来做 spies/stubs/mocks 的工具（sinon 以及 sinon-chai 插件），一个用于测试的浏览器环境（可以是 Chrome 浏览器，也可以用 PhantomJS）。</p>
<p>而使用 Jest 后，只要安装它，全都搞定了。</p>
</li>
<li>全面的官方文档，易于学习和使用<p>Jest 的官方文档很完善，对着文档很快就能上手。而在之前，我需要学习好几个插件的用法，至少得知道 mocha 用处和原理吧 我得学会 karma 的配置和命令，chai 的各种断言方法……，经常得周旋于不同的文档站之间，其实是件很烦也很低效的事。</p>
</li>
<li>配置简单方便</li>
<li>更直观明确的测试信息提示</li>
<li>
<p>方便的命令行工具</p>
<p>全局安装 Jest 后，可以在命令行执行单元测试，配合各种命令参数，可以方便地实现执行单个测试、监视文件变化并自动执行等功能。特别是对于监视文件变化并执行，它提供多种模式，可以只执行修改过的测试。记得初次读到这部分文档时，我不禁仰天长啸，竟然有这么骚气凌人的操作？</p>
<blockquote>Jest 甚至提供了 jest-codemods 这一工具，用来将使用其它包的测试迁移为使用 Jest</blockquote>
</li>
</ol>
<h3 id="articleHeader6">缺点</h3>
<ol>
<li>jsdom 的一些局限性<p>因为 Jest 是基于 jsdom 的，jsdom 毕竟不是真实的浏览器环境，它在测试过程中其实并不真正的“渲染”组件。这会导致一些问题，例如，如果组件代码中有一些根据实际渲染后的属性值进行计算（比如元素的 clientWidth）就可能出问题，因为 jsdom 中这些参数通常默认是 0.</p>
<p>所以有些情况下，测试中可能要施以一些骚操作，比如自行 mock（实例上就是伪造，但合理地伪造）一些中间值，来满足测试用例。如果你的项目中这样的情况很多，还是建议使用 karma + mocha + chrome 这一组合。</p>
</li>
<li>周边相关的包可能还不完善<p>例如 vue-jest，目前的版本并不能完全实现 vue-loader 的功能。比如，使用 sass，postcss 之类的功能，它会抛出警告信息。代码中直接 import 实际的 css 文件，则有可能报错，这时则需要使用 mock 来模拟 css 文件。这些问题，在使用 karma-mocha Chrome 的时候是没有的，因为测试运行于真实的浏览器环境中。</p>
</li>
</ol>
<h2 id="articleHeader7">ChromeHeadless vs. PhantomJS?</h2>
<p>较新版本的 Chrome 支持以 headless 模式运行，这对于测试这种不需要显示界面的任务来说是很合适了（其实也可以使用常规模式，只不过执行测试的时候 Chrome 会弹出窗口）。</p>
<p>而在 Chrome 推出 headless 模式功能之前。我们通常用 PhantomJS 的 headless WebKit 环境来进行测试，但它有着一些久未解决的问题，而且更新进度越来越慢。不欠前（2018-03-05），因为开发组内部意见不合，PhantomJS 项目已经封存了代码暂停开发了。</p>
<p>Chrome headless 对于 PhantomJS 来说算是一个致命的打击，特别是 <br>Chrome 官方推出的 puppeteer 在短时间内已经被广泛接受和使用。但其实 PhantomJS 还是有一些适用场景的，例如一些服务器并不支持 Chrome，这种情况下 PhantomJS 就有用武之地了。不过目前看来，对手的碾压以及自身维护团队的涣散，让我有理由放弃它了。</p>
<h2 id="articleHeader8">后记</h2>
<p>实践总是最有效率的学习方式，不停地折腾才能不断的进步，特别是对于编程这事上，每天都有新的东西出现。</p>
<p>编写单元测试可能比较枯燥，因为它并不像做新功能一样让人兴奋。但只要耐心调试，当全部测试用例都通过，当最后测试覆盖率慢慢提升时，那种成就感也不亚于开发出了新功能！</p>
<h2 id="articleHeader9">广告</h2>
<p>最后，无耻地为自己的 we-vue 打个小广告 <img src="https://static.alili.techundefined" class="emoji" alt="smile" title="smile">  ，虽然目前不成气候，也还有不少需要完善的地方。但自己会做下去，也希望能有更多的人支持和参与。里面可以看到一些觉的组件测试套路，目前组件部分的单元测试覆盖率已经超过 99%。</p>
<p>项目地址: <a href="https://github.com/tianyong90/we-vue" rel="nofollow noreferrer" target="_blank">https://github.com/tianyong90/we-vue</a>  <br>在线文档: <a href="https://wevue.org" rel="nofollow noreferrer" target="_blank">https://wevue.org</a>  <br>在线示例: <a href="https://demo.wevue.org" rel="nofollow noreferrer" target="_blank">https://demo.wevue.org</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
也来扯扯 Vue 单元测试

## 原文链接
[https://segmentfault.com/a/1190000014112447](https://segmentfault.com/a/1190000014112447)

