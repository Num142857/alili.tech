---
title: '用typescript写react和node是怎样的一种体验' 
date: 2019-02-12 2:30:12
hidden: true
slug: zq6qh2ui8ys
categories: [reprint]
---

{{< raw >}}

                    
<p>还不知道<code>typescript</code>是啥的前端童鞋需要做下功课了。</p>
<p>接触<code>typescript</code>挺早的。13年底的时候，公司的牛人在团队内推广<code>typescript</code>，没多久我们就把<code>typescript</code>做的项目搞上了生产环境。玩新东西的初期都是很爽的，但没多久就变成了灾难。团队人员更替，培训/学习成本增加；开发工具不统一，效率极其低下；<code>ts</code>带来的利好被消耗的一干二净，只有无尽的坑。种种不顺，最后不得不把所有<code>ts</code>文件删除。</p>
<p>这是一次不好的经历，后面我很长一段时间都没再写过<code>typescript</code>了。但是，15年发生了两件事，让<code>typescript</code>再次回到我的视线。</p>
<p>一是<code>es6</code>规范的落地，二是<code>visual studio code</code>的发布。这两条正好解决了上面提到的两个主要痛点：语言和工具。</p>
<p>随着<code>es6</code>的普及，应该没几个前端童鞋会说自己不会点<code>es6</code>了吧。<code>typescript</code>最初就是基于<code>es6</code>的，箭头函数、模块、类等等，只不过是在<code>es6</code>的基础上加了个强类型（要是会<code>as</code>就更简单了）。放到现在的前端环境，<code>typescript</code>的学习成本已经很低了，比各种前端框架的学习成本都低，可以放心在团队内推广。</p>
<p>再说开发工具。<code>typescript</code>刚出的时候只有<code>vs</code>、<code>vim</code>、<code>webstorm</code>支持，除了微软自家<code>vs</code>系列，其他编辑器对<code>ts</code>的支持仅仅只有语法检测，智能提示、重命名什么的那是妄想。<br>而<code>visual studio</code>体积太大，轻量级的<code>express</code>也接近1G了，光这一点就能吓跑一拨童鞋了。然而，去年4月底，<code>visual studio code</code>横空出世，没有<code>vs</code>家族的庞大体积，性能又甩出同源的<code>atom</code>几条街，对<code>typescript</code>和<code>javascript</code>的支持相当给力，简直就是为前端童鞋而生的。今年4月中旬，<code>vs code</code>就会发布<code>1.0</code>版本，也就下周的事了。要不为什么说<code>ms</code>大法好？</p>
<p>除了语言和工具，<code>typescript</code>的生态也在不断完善，<a href="https://github.com/DefinitelyTyped/DefinitelyTyped" rel="nofollow noreferrer" target="_blank">DefinitelyTyped</a>上有各种主流框架/类库的头文件，满足各种各样的需求；头文件管理工具<a href="https://github.com/DefinitelyTyped/tsd" rel="nofollow noreferrer" target="_blank">tsd</a>(已经废弃，新的工具叫<a href="https://github.com/typings/typings" rel="nofollow noreferrer" target="_blank">typings</a>)也做的越来越好，<code>ts</code>项目管理一个<code>json</code>文件就搞定。</p>
<p>一门语言，有了良好的生态，要火起来那是迟早的事。</p>
<p>好了，说回正题。</p>
<h2 id="articleHeader0">react</h2>
<p>第一次看到<code>React.propTypes</code>的时候，心想这不就是<code>interface</code>么，<code>typescript</code>+<code>react</code>指日可待啊。果然，<code>typescript</code>从 <code>v1.6</code>开始支持<code>jsx</code>语法。组件的<code>props</code>和<code>state</code>都可以定义<code>interface</code>，类型检测有了，<code>propTypes</code>拜拜。</p>
<p>直接贴代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
interface Props {
    from: string;
    message: string;
}

class Greeting extends React.Component<Props,any> {
    render () {
        const {from,message} = this.props;
        return (
            <div>
                <p>来自{from}的消息</p>
                <p>{message}</p>
            </div>
        )
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code class="typescript">
<span class="hljs-keyword">interface</span> Props {
    <span class="hljs-keyword">from</span>: <span class="hljs-built_in">string</span>;
    message: <span class="hljs-built_in">string</span>;
}

<span class="hljs-keyword">class</span> Greeting <span class="hljs-keyword">extends</span> React.Component&lt;Props,<span class="hljs-built_in">any</span>&gt; {
    render () {
        <span class="hljs-keyword">const</span> {<span class="hljs-keyword">from</span>,message} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;p&gt;来自{<span class="hljs-keyword">from</span>}的消息&lt;<span class="hljs-regexp">/p&gt;
                &lt;p&gt;{message}&lt;/</span>p&gt;
            &lt;<span class="hljs-regexp">/div&gt;
        )
    }
}
</span></code></pre>
<p>配上<code>vs code</code>,到哪都有的智能提示简直不能再爽，贴张gif感受下。</p>
<p><span class="img-wrap"><img data-src="//dn-cnode.qbox.me/FulU2oXkDONjFkOT-1lsKwFJ_bk5" src="https://static.alili.tech//dn-cnode.qbox.me/FulU2oXkDONjFkOT-1lsKwFJ_bk5" alt="react.gif" title="react.gif" style="cursor: pointer;"></span></p>
<p><code>Greeting</code>这个组件有两个<code>prop</code>，<code>from</code>和<code>message</code>，不传这两个<code>prop</code>或者类型搞错，编辑器都会有提示，<code>state</code>也是一样的道理。这tm就是生产力啊！！！</p>
<p><span class="img-wrap"><img data-src="//dn-cnode.qbox.me/FrJ4mx50R7m1_PhtQ81cNUEAC699" src="https://static.alili.tech//dn-cnode.qbox.me/FrJ4mx50R7m1_PhtQ81cNUEAC699" alt="compile.png" title="compile.png" style="cursor: pointer;"></span></p>
<p>最终编译出来的文件长这个样子,再搭配<code>webpack</code>简直完美。</p>
<p>前一阵子写的web版<a href="http://cnoder.herokuapp.com/" rel="nofollow noreferrer" target="_blank">cnode</a>就是用<a href="https://cnodejs.org/topic/56f50aac9753c3386fd24f09" rel="nofollow noreferrer" target="_blank"><code>typescript</code>+<code>react</code></a>写的。</p>
<h2 id="articleHeader1">node</h2>
<p><code>js</code>不是<code>java</code>之类的静态语言，很多错误都只能在运行的时候才发现，而<code>typescript</code>正好弥补了这一点，强类型让很多错误在开发的时候就能被发现。再有人吐槽<code>node</code>不能搞大型应用，<code>typescript</code>+<code>node</code>分分钟打脸。</p>
<p>除了强类型外，用<code>typescript</code>还可以体验<code>node</code>暂时不支持的<code>es6</code>特性，现在有很多童鞋都是直接写再用<code>babel</code>编译，而<code>typescript</code>生来就具备这一能力，在一定程度上取代了<code>babel</code>的作用。</p>
<p><code>v1.7</code>的<code>typescript</code>已经支持<code>async/await</code>，异步流程控制不再是问题。<code>koa2</code>发布了，对应的<code>koa.d.ts</code>也有人写好了（感谢<a href="https://segmentfault.com/u/caicaicaiwei">DavidCai1993</a>童鞋），现在就是<code>typescript</code>+<code>node</code>的最好时机。</p>
<p>直接看图：</p>
<p><span class="img-wrap"><img data-src="//dn-cnode.qbox.me/Fl4G2BHH2HjKErRQdjTI_bJkDJui" src="https://static.alili.tech//dn-cnode.qbox.me/Fl4G2BHH2HjKErRQdjTI_bJkDJui" alt="node.gif" title="node.gif" style="cursor: pointer;"></span></p>
<p>代码和用<code>js</code>写没什么两样，通过头文件，可以很清楚地知道变量类型、函数返回值等信息，不用查<code>api</code>，不怕会写错。</p>
<p>那只剩调试的问题了，<code>typescript</code>和<code>babel</code>一样，都可以通过<code>sourcemap</code>来调试，做好配置，和调试<code>js</code>一毛一样。</p>
<p><span class="img-wrap"><img data-src="//dn-cnode.qbox.me/Fq9ZWgzFfQbzrFLvir_kXSIq8mKG" src="https://static.alili.tech//dn-cnode.qbox.me/Fq9ZWgzFfQbzrFLvir_kXSIq8mKG" alt="debug.png" title="debug.png" style="cursor: pointer; display: inline;"></span></p>
<p>以<code>koa2</code>为例：</p>
<p><span class="img-wrap"><img data-src="//dn-cnode.qbox.me/Fr6KilWUpHjygkZxd3LHymF3q7xp" src="https://static.alili.tech//dn-cnode.qbox.me/Fr6KilWUpHjygkZxd3LHymF3q7xp" alt="debug.gif" title="debug.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">结语</h2>
<p><code>typescript</code>是好东西，大家快搞起！</p>
<p><code>typescript</code>是好东西，大家快搞起！</p>
<p><code>typescript</code>是好东西，大家快搞起！</p>
<p>最后，贴一下<code>typescript</code>的<a href="https://github.com/Microsoft/TypeScript/wiki/Roadmap" rel="nofollow noreferrer" target="_blank">roadmap</a>，中文版的在<a href="https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Roadmap.html" rel="nofollow noreferrer" target="_blank">这里</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用typescript写react和node是怎样的一种体验

## 原文链接
[https://segmentfault.com/a/1190000004880645](https://segmentfault.com/a/1190000004880645)

