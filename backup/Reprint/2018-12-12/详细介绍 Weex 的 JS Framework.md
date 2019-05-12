---
title: '详细介绍 Weex 的 JS Framework' 
date: 2018-12-12 2:30:10
hidden: true
slug: n6h2bg4jbu
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>很久以前，我写过两篇文章（《<a href="https://yq.aliyun.com/articles/59934" rel="nofollow noreferrer" target="_blank">Weex 框架中 JS Framework 的结构</a>》，《<a href="https://yq.aliyun.com/articles/59935" rel="nofollow noreferrer" target="_blank">详解 Weex JS Framework 的编译过程</a>》）介绍过 JS Framework。但是文章写于 2016 年 8 月份，这都是一年半以前的事了，说是“详解”其实解释得并不详细，而且是基于旧版 .we 框架写的，DSL 和底层框架各部分的功能解耦得的并不是很清楚。这一年多以来 JS Framework 已经有了很大的变化，不仅支持了 Vue 和 Rax，原生容器和底层接口也做了大量改造，这里再重新介绍一遍。</blockquote>
<h2 id="articleHeader0">在 Weex 框架中的位置</h2>
<p>Weex 是一个既支持多个前端框架又能跨平台渲染的框架，JS Framework 介于前端框架和原生渲染引擎之间，处于承上启下的位置，也是跨框架跨平台的关键。无论你使用的是 Vue 还是 Rax，无论是渲染在 Android 还是 iOS，JS Framework 的代码都会运行到（如果是在浏览器和 WebView 里运行，则不依赖 JS Framework）。</p>
<p><span class="img-wrap"><img data-src="/img/bV4k1H?w=2444&amp;h=992" src="https://static.alili.tech/img/bV4k1H?w=2444&amp;h=992" alt="js framework position" title="js framework position" style="cursor: pointer; display: inline;"></span></p>
<p>像 Vue 和 Rax 这类前端框架虽然内部的渲染机制、Virtual DOM 的结构都是不同的，但是都是用来描述页面结构以及开发范式的，对 Weex 而言只属于语法层，或者称之为 DSL (Domain Specific Language)。无论前端框架里数据管理和组件管理的策略是什么样的，它们最终都将调用 JS Framework 提供的接口来调用原生功能并且渲染真实 UI。底层渲染引擎中也不必关心上层框架中组件化的语法和更新策略是怎样的，只需要处理 JS Framework 中统一定义的节点结构和渲染指令。多了这么一层抽象，有利于标准的统一，也使得跨框架和跨平台成为了可能。</p>
<blockquote>图虽然这么画，但是大部分人并不区分得这么细，喜欢把 Vue 和 Rax 以及下边这一层放一起称为 JS Framework。</blockquote>
<h2 id="articleHeader1">主要功能</h2>
<p>如果将 JS Framework 的功能进一步拆解，可以分为如下几个部分：</p>
<ul>
<li>适配前端框架</li>
<li>构建渲染指令树</li>
<li>JS-Native 通信</li>
<li>JS Service</li>
<li>准备环境接口</li>
</ul>
<h3 id="articleHeader2">适配前端框架</h3>
<p>前端框架在 Weex 和浏览器中的执行过程不一样，这个应该不难理解。如何让一个前端框架运行在 Weex 平台上，是 JS Framework 的一个关键功能。</p>
<p>以 Vue.js 为例，在浏览器上运行一个页面大概分这么几个步骤：首先要准备好页面容器，可以是浏览器或者是 WebView，容器里提供了标准的 Web API。然后给页面容器传入一个地址，通过这个地址最终获取到一个 HTML 文件，然后解析这个 HTML 文件，加载并执行其中的脚本。想要正确的渲染，应该首先加载执行 Vue.js 框架的代码，向浏览器环境中添加 <code>Vue</code> 这个变量，然后创建好挂载点的 DOM 元素，最后执行页面代码，从入口组件开始，层层渲染好再挂载到配置的挂载点上去。</p>
<p>在 Weex 里的执行过程也比较类似，不过 Weex 页面对应的是一个 js 文件，不是 HTML 文件，而且不需要自行引入 Vue.js 框架的代码，也不需要设置挂载点。过程大概是这样的：首先初始化好 Weex 容器，这个过程中会初始化 JS Framework，Vue.js 的代码也包含在了其中。然后给 Weex 容器传入页面地址，通过这个地址最终获取到一个 js 文件，客户端会调用 createInstance 来创建页面，也提供了刷新页面和销毁页面的接口。大致的渲染行为和浏览器一致，但是和浏览器的调用方式不一样，前端框架中至少要适配客户端打开页面、销毁页面（push、pop）的行为才可以在 Weex 中运行。</p>
<p><span class="img-wrap"><img data-src="/img/bV4k2h?w=2800&amp;h=1063" src="https://static.alili.tech/img/bV4k2h?w=2800&amp;h=1063" alt="js framework apis" title="js framework apis" style="cursor: pointer;"></span></p>
<p>在 JS Framework 里提供了如上图所示的接口来实现前端框架的对接。图左侧的四个接口与页面功能有关，分别用于获取页面节点、监听客户端的任务、注册组件、注册模块，目前这些功能都已经转移到 JS Framework 内部，在前端框架里都是可选的，有特殊处理逻辑时才需要实现。图右侧的四个接口与页面的生命周期有关，分别会在页面初始化、创建、刷新、销毁时调用，其中只有 <code>createInstance</code> 是必须提供的，其他也都是可选的（在新的 Sandbox 方案中，<code>createInstance</code> 已经改成了 <code>createInstanceContext</code>）。详细的初始化和渲染过程会在后续章节里展开。</p>
<h3 id="articleHeader3">构建渲染指令树</h3>
<p>不同的前端框架里 Virtual DOM 的结构、patch 的方式都是不同的，这也反应了它们开发理念和优化策略的不同，但是最终，在浏览器上它们都使用一致的 DOM API 把 Virtual DOM 转换成真实的 HTMLElement。在 Weex 里的逻辑也是类似的，只是在最后一步生成真实元素的过程中，不使用原生 DOM API，而是使用 JS Framework 里定义的一套 Weex DOM API 将操作转化成渲染指令发给客户端。</p>
<p><span class="img-wrap"><img data-src="/img/bV4k2Y?w=2658&amp;h=1098" src="https://static.alili.tech/img/bV4k2Y?w=2658&amp;h=1098" alt="patch virtual dom" title="patch virtual dom" style="cursor: pointer; display: inline;"></span></p>
<p>JS Framework 提供的 Weex DOM API 和浏览器提供的 DOM API 功能基本一致，在 Vue 和 Rax 内部对这些接口都做了适配，针对 Weex 和浏览器平台调用不同的接口就可以实现跨平台渲染。</p>
<p>此外 DOM 接口的设计相当复杂，背负了大量的历史包袱，也不是所有特性都适合移动端。JS Framework 里将这些接口做了大量简化，借鉴了 W3C 的标准，只保留了其中最常用到的一部分。目前的状态是够用、精简高效、和 W3C 标准有很多差异，但是已经成为 Vue 和 Rax 渲染原生 UI 的事实标准，后续还会重新设计这些接口，使其变得更标准一些。JS Framework 里 DOM 结构的关系如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV4k3u?w=1842&amp;h=1063" src="https://static.alili.tech/img/bV4k3u?w=1842&amp;h=1063" alt="Weex DOM" title="Weex DOM" style="cursor: pointer;"></span></p>
<p>前端框架调用这些接口会在 JS Framework 中构建一颗树，这颗树中的节点不包含复杂的状态和绑定信息，能够序列化转换成 JSON 格式的渲染指令发送给客户端。这棵树曾经有过很多名字：Virtual DOM Tree、Native DOM Tree，我觉的其实它应该算是一颗 “Render Directive Tree”，也就是渲染指令树。叫什么无所谓了，反正它就是 JS Framework 内部的一颗与 DOM 很像的树。</p>
<p>这颗树的层次结构和原生 UI 的层次结构是一致的，当前端的节点有更新时，这棵树也会跟着更新，然后把更新结果以渲染指令的形式发送给客户端。这棵树并不计算布局，也没有什么副作用，操作也都是很高效的，基本都是 O(1) 级别，偶尔有些 O(n) 的操作会遍历同层兄弟节点或者上溯找到根节点，不会遍历整棵树。</p>
<h3 id="articleHeader4">JS-Native 通信</h3>
<p>在开发页面过程中，除了节点的渲染以外，还有原生模块的调用、事件绑定、回调等功能，这些功能都依赖于 js 和 native 之间的通信来实现。</p>
<p><span class="img-wrap"><img data-src="/img/bV4k3W?w=2357&amp;h=1382" src="https://static.alili.tech/img/bV4k3W?w=2357&amp;h=1382" alt="js-native communication" title="js-native communication" style="cursor: pointer; display: inline;"></span></p>
<p>首先，页面的 js 代码是运行在 js 线程上的，然而原生组件的绘制、事件的捕获都发生在 UI 线程。在这两个线程之间的通信用的是 <code>callNative</code> 和 <code>callJS</code> 这两个底层接口（现在已经扩展到了很多个），它们默认都是异步的，在 JS Framework 和原生渲染器内部都基于这两个方法做了各种封装。</p>
<p><code>callNative</code> 是由客户端向 JS 执行环境中注入的接口，提供给 JS Framework 调用，界面的节点（上文提到的渲染指令树）、模块调用的方法和参数都是通过这个接口发送给客户端的。为了减少调用接口时的开销，其实现在已经开了更多更直接的通信接口，其中有些接口还支持同步调用（支持返回值），它们在原理上都和 <code>callNative</code> 是一样的。</p>
<p><code>callJS</code> 是由 JS Framework 实现的，并且也注入到了执行环境中，提供给客户端调用。事件的派发、模块的回调函数都是通过这个接口通知到 JS Framework，然后再将其传递给上层前端框架。</p>
<h3 id="articleHeader5">JS Service</h3>
<p>Weex 是一个多页面的框架，每个页面的 js bundle 都在一个独立的环境里运行，不同的 Weex 页面对应到浏览器上就相当于不同的“标签页”，普通的 js 库没办法实现在多个页面之间实现状态共享，也很难实现跨页通信。</p>
<p>在 JS Framework 中实现了 <a href="http://weex-project.io/cn/references/js-service.html" rel="nofollow noreferrer" target="_blank">JS Service</a> 的功能，主要就是用来解决跨页面复用和状态共享的问题的，例如 <a href="http://weex-project.io/cn/references/broadcast-channel.html" rel="nofollow noreferrer" target="_blank">BroadcastChannel</a> 就是基于 JS Service 实现的，它可以在多个 Weex 页面之间通信。</p>
<h3 id="articleHeader6">准备环境接口</h3>
<p>由于 Weex 运行环境和浏览器环境有很大差异，在 JS Framework 里还对一些环境变量做了封装，主要是为了解决解决原生环境里的兼容问题，底层使用渲染引擎提供的接口。主要的改动点是：</p>
<ul>
<li>console: 原生提供了 <code>nativeLog</code> 接口，将其封装成前端熟悉的 <code>console.xxx</code> 并可以控制日志的输出级别。</li>
<li>timer: 原生环境里 timer 接口不全，名称和参数不一致。目前来看有了原生 C/C++ 实现的 timer 后，这一层可以移除。</li>
<li>freeze: 冻结当前环境里全局变量的原型链（如 Array.prototype）。</li>
</ul>
<p>另外还有一些 ployfill：<code>Promise</code> 、<code>Arary.from</code> 、<code>Object.assign</code> 、<code>Object.setPrototypeOf</code> 等。</p>
<p>这一层里的东西可以说都是用来“填坑”的，也是与环境有关 Bug 的高发地带，如果你只看代码的话会觉得莫名奇妙，但是它很可能解决了某些版本某个环境中的某个神奇的问题，也有可能触发了一个更神奇的问题。随着对 JS 引擎本身的优化和定制越来越多，这一层代码可以越来越少，最终会全部移除掉。</p>
<h2 id="articleHeader7">执行过程</h2>
<p>上面是用空间角度介绍了 JS Framework 里包含了哪些部分，接下来从时间角度介绍一下某些功能在 JS Framework 里的处理流程。</p>
<h3 id="articleHeader8">框架初始化</h3>
<p>JS Framework 以及 Vue 和 Rax 的代码都是内置在了 Weex SDK 里的，随着 Weex SDK 一起初始化。SDK 的初始化一般在 App 启动时就已经完成了，只会执行一次。初始化过程中与 JS Framework 有关的是如下这三个操作：</p>
<ol>
<li>
<strong>初始化 JS 引擎</strong>，准备好 JS 执行环境，向其中注册一些变量和接口，如 <code>WXEnvironment</code>、<code>callNative</code>。</li>
<li>
<strong>执行 JS Framework 的代码</strong>。</li>
<li>
<strong>注册原生组件和原生模块</strong>。</li>
</ol>
<p>针对第二步，执行 JS Framework 的代码的过程又可以分成如下几个步骤：</p>
<ol>
<li>
<strong>注册上层 DSL 框架</strong>，如 Vue 和 Rax。这个过程只是告诉 JS Framework 有哪些 DSL 可用，适配它们提供的接口，如 <code>init</code>、<code>createInstance</code>，但是不会执行前端框架里的逻辑。</li>
<li>
<strong>初始化环境变量</strong>，并且会将原生对象的原型链冻结，此时也会注册内置的 JS Service，如 <code>BroadcastChannel</code>。</li>
<li>如果 DSL 框架里实现了 <code>init</code> 接口，会在此时调用。</li>
<li>
<strong>向全局环境中注入可供客户端调用的接口</strong>，如 <code>callJS</code>、<code>createInstance</code>、<code>registerComponents</code>，调用这些接口会同时触发 DSL 中相应的接口。</li>
</ol>
<p>再回顾看这两个过程，可以发现原生的组件和模块是注册进来的，DSL 也是注册进来的，Weex 做的比较灵活，组件模块是可插拔的，DSL 框架也是可插拔的，有很强的扩展能力。</p>
<h3 id="articleHeader9">JS Bundle 的执行过程</h3>
<p>在初始化好 Weex SDK 之后，就可以开始渲染页面了。通常 Weex 的一个页面对应了一个 js bundle 文件，页面的渲染过程也是加载并执行 js bundle 的过程，大概的步骤如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV4k4Y?w=2728&amp;h=1461" src="https://static.alili.tech/img/bV4k4Y?w=2728&amp;h=1461" alt="execute js bundle" title="execute js bundle" style="cursor: pointer;"></span></p>
<p>首先是调用原生渲染引擎里提供的接口来加载执行 js bundle，在 Android 上是 <code>renderByUrl</code>，在 iOS 上是 <code>renderWithURL</code>。在得到了 js bundle 的代码之后，会继续执行 SDK 里的原生 <code>createInstance</code> 方法，给当前页面生成一个唯一 id，并且把代码和一些配置项传递给 JS Framework 提供的 <code>createInstance</code> 方法。</p>
<p>在 JS Framework 接收到页面代码之后，会判断其中使用的 DSL 的类型（Vue 或者 Rax），然后找到相应的框架，执行 <code>createInstanceContext</code> 创建页面所需要的环境变量。</p>
<p><span class="img-wrap"><img data-src="/img/bV4k5r?w=1878&amp;h=1028" src="https://static.alili.tech/img/bV4k5r?w=1878&amp;h=1028" alt="create instance" title="create instance" style="cursor: pointer;"></span></p>
<p>在旧的方案中，JS Framework 会调用 <code>runInContex</code> 函数在特定的环境中执行 js 代码，内部基于 <code>new Function</code> 实现。<strong>在新的 Sandbox 方案中，js bundle 的代码不再发给 JS Framework，也不再使用 <code>new Function</code>，而是由客户端直接执行 js 代码。</strong></p>
<h3 id="articleHeader10">页面的渲染</h3>
<p>Weex 里页面的渲染过程和浏览器的渲染过程类似，整体可以分为【创建前端组件】-&gt; 【构建 Virtual DOM】-&gt;【生成“真实” DOM】-&gt;【发送渲染指令】-&gt;【绘制原生 UI】这五个步骤。前两个步骤发生在前端框架中，第三和第四个步骤在 JS Framework 中处理，最后一步是由原生渲染引擎实现的。下图描绘了页面渲染的大致流程：</p>
<p><span class="img-wrap"><img data-src="/img/bV4k5L?w=2711&amp;h=1080" src="https://static.alili.tech/img/bV4k5L?w=2711&amp;h=1080" alt="render process" title="render process" style="cursor: pointer; display: inline;"></span></p>
<h4>创建前端组件</h4>
<p>以 Vue.js 为例，页面都是以组件化的形式开发的，整个页面可以划分成多个层层嵌套和平铺的组件。Vue 框架在执行渲染前，会先根据开发时编写的模板创建相应的组件实例，可以称为 Vue Component，它包含了组件的内部数据、生命周期以及&nbsp;<code>render</code>&nbsp;函数等。</p>
<p>如果给同一个模板传入多条数据，就会生成多个组件实例，这可以算是组件的复用。如上图所示，假如有一个组件模板和两条数据，渲染时会创建两个 Vue Component 的实例，每个组件实例的内部状态是不一样的。</p>
<h4>构建 Virtual DOM</h4>
<p>Vue Component 的渲染过程，可以简单理解为组件实例执行 <code>render</code> 函数生成 <code>VNode</code> 节点树的过程，也就是构建 Virtual DOM 的生成过程。自定义的组件在这个过程中被展开成了平台支持的节点，例如图中的 <code>VNode</code> 节点都是和平台提供的原生节点一一对应的，它的类型必须在 <a href="http://weex-project.io/references/components/index.html" rel="nofollow noreferrer" target="_blank">Weex 支持的原生组件</a>范围内。</p>
<h4>生成“真实” DOM</h4>
<p>以上过程在 Weex 和浏览器里都是完全一样的，从生成真实 DOM 这一步开始，Weex 使用了不同的渲染方式。前面提到过 JS Framework 中提供了和 DOM 接口类似的 Weex DOM API，在 Vue 里会使用这些接口将 <code>VNode</code> 渲染生成适用于 Weex 平台的 <code>Element</code> 对象，和 DOM 很像，但并不是“真实”的 DOM。</p>
<h4>发送渲染指令</h4>
<p>在 JS Framework 内部和客户端渲染引擎约定了一系列的指令接口，对应了一个原子的 DOM 操作，如 <code>addElement</code> <code>removeElement</code> <code>updateAttrs</code> <code>updateStyle</code> 等。JS Framework 使用这些接口将自己内部构建的 Element 节点树以渲染指令的形式发给客户端。</p>
<h4>绘制原生 UI</h4>
<p>客户端接收 JS Framework 发送的渲染指令，创建相应的原生组件，最终调用系统提供的接口绘制原生 UI。具体细节这里就不展开了。</p>
<h3 id="articleHeader11">事件的响应过程</h3>
<p>无论是在浏览器还是 Weex 里，事件都是由原生 UI 捕获的，然而事件处理函数都是写在前端里的，所以会有一个传递的过程。</p>
<p><span class="img-wrap"><img data-src="/img/bV4k6i?w=1736&amp;h=956" src="https://static.alili.tech/img/bV4k6i?w=1736&amp;h=956" alt="fire event" title="fire event" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，如果在 Vue.js 里某个标签上绑定了事件，会在内部执行 <code>addEventListener</code> 给节点绑定事件，这个接口在 Weex 平台下调用的是 JS Framework 提供的 <code>addEvent</code> 方法向元素上添加事件，传递了事件类型和处理函数。JS Framework 不会立即向客户端发送添加事件的指令，而是把事件类型和处理函数记录下来，节点构建好以后再一起发给客户端，发送的节点中只包含了事件类型，不含事件处理函数。客户端在渲染节点时，如果发现节点上包含事件，就监听原生 UI 上的指定事件。</p>
<p>当原生 UI 监听到用户触发的事件以后，会派发 <code>fireEvent</code> 命令把节点的 ref、事件类型以及事件对象发给 JS Framework。JS Framework 根据 ref 和事件类型找到相应的事件处理函数，并且以事件对象 <code>event</code> 为参数执行事件处理函数。目前 Weex 里的事件模型相对比较简单，并不区分捕获阶段和冒泡阶段，而是只派发给触发了事件的节点，并不向上冒泡，类似 DOM 模型里 level 0 级别的事件。</p>
<p>上述过程里，事件只会绑定一次，但是很可能会触发多次，例如 <code>touchmove</code> 事件，在手指移动过程中，每秒可能会派发几十次，每次事件都对应了一次 <code>fireEvent</code> -&gt; <code>invokeHandler</code> 的处理过程，很容易损伤性能，浏览器也是如此。针对这种情况，可以使用用 expression binding 来将事件处理函数转成表达式，在绑定事件时一起发给客户端，这样客户端在监听到原生事件以后可以直接解析并执行绑定的表达式，而不需要把事件再派发给前端。</p>
<h2 id="articleHeader12">写在最后</h2>
<p>Weex 是一个跨端的技术，涉及的技术面比较多，只从前端或者客户端的某个角度去理解都是不全面的，本文只是以前端开发者的角度介绍了 Weex 其中一部分的功能。如果你对 Weex 的 JS Framework 有什么新的想法和建议，欢迎赐教；对 Weex 有使用心得或者踩坑经历，也欢迎分享。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详细介绍 Weex 的 JS Framework

## 原文链接
[https://segmentfault.com/a/1190000013388649](https://segmentfault.com/a/1190000013388649)

