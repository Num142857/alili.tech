---
title: '中文输入法与React文本输入框的问题与解决方案' 
date: 2019-01-28 2:30:09
hidden: true
slug: 9pvtwgjarlq
categories: [reprint]
---

{{< raw >}}

                    
<p>问题来源是来自这个React官方存储库的issue <a href="https://github.com/facebook/react/issues/3926" rel="nofollow noreferrer" target="_blank">#3926</a>，与这个议题关联的有很多其他的issue，来自许多项目，有些是与React相关，有些则是vue或其它JS套件。也已经有其他的项目是专注于解决这个问题，例如<a href="https://github.com/fast-flow/react-composition" rel="nofollow noreferrer" target="_blank">react-composition</a>，不过它是一个使用ES5语法的React组件。在其他的讨论区上也有类似的<a href="http://react-china.org/t/onchange-input/3385" rel="nofollow noreferrer" target="_blank">问题与解答</a>。本文的目的是希望能针对这个问题提供一些说明、现在暂时性的解决方案。</p>
<p>下图为目前解决React中"Controlled"(受控制的)input元件的演示，可以到<a href="https://eyesofkids.github.io/" rel="nofollow noreferrer" target="_blank">这里</a>去测试:</p>
<p><span class="img-wrap"><img data-src="/img/bVHPqj?w=601&amp;h=535" src="https://static.alili.tech/img/bVHPqj?w=601&amp;h=535" alt="input元件的演示" title="input元件的演示" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>注意事项: 目前的解决方案我认为是暂时性的，结果都放在这个<a href="https://github.com/eyesofkids/react-compositionevent" rel="nofollow noreferrer" target="_blank">github库</a>上。这要分为"Controlled"(受控制的)与"Uncontrolled"(不受控制的)两个种类的组件，影响的主要是input与textarea两个组件，输入法(IME, input method editor)的问题，不只会发生在中文，同样的在日文、韩文或其它使用输入法的语言应该都有同样问题。</p></blockquote>
<h2 id="articleHeader0">问题何来</h2>
<p>React组件主要使用<code>onChange</code>人造事件，作为文本输入框(input)或文字输入区(textarea)触发文字输入时的事件，这个事件用起来很直觉，理应当是如此。但<code>onChange</code>在浏览器上，只要在这个文本输入框上，有任何的键盘动作它都会触发，也就是如果你是使用了中文、日文、韩文输入法(IME)，不论是哪一种，拼音的、笔划的还是其他的，只要有按下一个键盘的动作，就会触发一次浏览器上这个元素的<code>change</code>事件，对于原本就使用键盘上的英文字符作为输入的语言来说，这没什么太大的问题，但对于要使用输入法的语言用户来说，不停的触发<code>change</code>事件，可能会造成程序功能上的运行逻辑问题。</p>
<p>举出一个实际的应用情况，一个使用React撰写的搜索计算机书籍的功能，用户可以在文本输入框里输入要搜索的书名，程序中是利用<code>onChange</code>事件触发，进行比对数据库中的书籍标题，当你想搜索一本名为"林哥的Java教程"，第一个字为"林"，拼音输入法需要输入"lin"三个键盘上的字符，在"林"这个字从输入法编辑器中加到真正的input元素前，<code>onChange</code>已经捕捉到"lin"三个字符，在列表中已搜索出一大堆有关"linux"的书籍。细节就不说了，还有可能对字符数量的的检查之类的问题。不过，这是正确的程序运作逻辑吗?很明显的这是一个大问题。</p>
<p>当然，你也可以用对中文字词检查的修正方式，或是干脆不要用<code>change</code>事件，改用其他按钮触发之类的事件来作这事情，或是不要用React中的"Controlled"(受控制的)input或textare组件，但这会局限住在程序开发应用上的自由，要如何选择就看你自己了，是不要使用它还是想办法正视问题来解决它。</p>
<h2 id="articleHeader1">网页上的DOM元素与"Uncontrolled"(不受控制的)的组件</h2>
<p>这个问题在浏览器中，早就已经有了可应对的解决方法，DOM事件中有一组额外的<a href="https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent" rel="nofollow noreferrer" target="_blank">CompositionEvent</a>(组成事件)可以辅助开发者，它可以在可编辑的DOM元素上触发，主要是input与textarea上，所以可以用来辅助解决<code>change</code>事件的输入法问题。CompositionEvent(组成事件)共有三个事件，分别为<code>compositionstart</code>、<code>compositionupdate</code>与<code>compositionend</code>，它们代表的是开始进行字的组成、刷新与结束，也就是代表开始以输入法编辑器来组合键盘上的英文字符，选字或刷新字的组合，到最后输出字到真实DOM中的文本输入框中，实务上每个中文字在输入时，<code>compositionstart</code>与<code>compositionend</code>都只会会被触发一次，而<code>compositionupdate</code>则是有可能多次触发。</p>
<p>藉由CompositionEvent的辅助来解决的方式，也就是说在网页上的input元素，可以利用CompositionEvent作为一个信号，如果正在使用IME输入中文时，<code>change</code>事件中的代码就先不要运行，等<code>compositionend</code>触发时，接着的<code>change</code>事件才可以运行其中的代码，运作的原理就是这样简单而已。</p>
<p>在React应用中，如果是一个"Uncontrolled"(不受控制的)的input组件，它与网页上真实DOM中的input元素的事件行为无差异，也就是说，直接使用CompositionEvent的解决方式，就可以解决这个输入法的问题，以下面的代码为例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// @flow
import React from 'react'

const Cinput = (props: Object) => {
  // record if is on Composition
  let isOnComposition: boolean = false

  const handleComposition = (e: KeyboardEvent) => {
    if (e.type === 'compositionend') {
      // composition is end
      isOnComposition = false
    } else {
      // in composition
      isOnComposition = true
    }
  }

  const handleChange = (e: KeyboardEvent) => {
    // only when onComposition===false to fire onChange
    if (e.target instanceof HTMLInputElement &amp;&amp; !isOnComposition) {
      props.onChange(e)
    }
  }

  return (
    <input
      {...props}
      onCompositionStart={handleComposition}
      onCompositionUpdate={handleComposition}
      onCompositionEnd={handleComposition}
      onChange={handleChange}
    />
  )
}

export default Cinput" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// @flow</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>

<span class="hljs-keyword">const</span> Cinput = <span class="hljs-function">(<span class="hljs-params">props: <span class="hljs-built_in">Object</span></span>) =&gt;</span> {
  <span class="hljs-comment">// record if is on Composition</span>
  <span class="hljs-keyword">let</span> isOnComposition: boolean = <span class="hljs-literal">false</span>

  <span class="hljs-keyword">const</span> handleComposition = <span class="hljs-function">(<span class="hljs-params">e: KeyboardEvent</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (e.type === <span class="hljs-string">'compositionend'</span>) {
      <span class="hljs-comment">// composition is end</span>
      isOnComposition = <span class="hljs-literal">false</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// in composition</span>
      isOnComposition = <span class="hljs-literal">true</span>
    }
  }

  <span class="hljs-keyword">const</span> handleChange = <span class="hljs-function">(<span class="hljs-params">e: KeyboardEvent</span>) =&gt;</span> {
    <span class="hljs-comment">// only when onComposition===false to fire onChange</span>
    <span class="hljs-keyword">if</span> (e.target <span class="hljs-keyword">instanceof</span> HTMLInputElement &amp;&amp; !isOnComposition) {
      props.onChange(e)
    }
  }

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      {<span class="hljs-attr">...props</span>}
      <span class="hljs-attr">onCompositionStart</span>=<span class="hljs-string">{handleComposition}</span>
      <span class="hljs-attr">onCompositionUpdate</span>=<span class="hljs-string">{handleComposition}</span>
      <span class="hljs-attr">onCompositionEnd</span>=<span class="hljs-string">{handleComposition}</span>
      <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleChange}</span>
    /&gt;</span>
  )
}

export default Cinput</span></code></pre>
<p>上面这是一个典型的"Uncontrolled"(不受控制的)input组件，主要是它不用<code>value</code>这个属性。但如果它有来自上层组件的<code>value</code>属性与值，也就是上层组件用props传递给它<code>value</code>属性的值，就成了"Controlled"(受控制的)组件，它的事件整个模式就会与网页上的真实DOM中的input元素不一样，这后面再说明。</p>
<p>这个解决方案在几乎所有能支持CompositionEvent的浏览器(IE9以上)都可以运行得很好，不过在Google Chrome浏览器在2016年的版本53之后，更动了<code>change</code>与<code>compositionend</code>的<a href="https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/" rel="nofollow noreferrer" target="_blank">触发顺序</a>，所以需要针对Chrome浏览器调整一下，如果是在Chrome浏览器中触发<code>compositionend</code>时，也要运行一次在原本在<code>change</code>要运行的代码，就改成这样而已。下面在上个代码中的<code>handleComposition</code>函数中，多加了侦测是否为Chrome浏览器，与触发原本的onChange方法代码，修改过的代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// detect it is Chrome browser?
const isChrome = !!window.chrome &amp;&amp; !!window.chrome.webstore

const handleComposition = (e: KeyboardEvent) => {
  if (e.type === 'compositionend') {
    // composition is end
    isOnComposition = false

    // fixed for Chrome v53+ and detect all Chrome
    // https://chromium.googlesource.com/chromium/src/
    // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
    if (e.target instanceof HTMLInputElement &amp;&amp; !isOnComposition &amp;&amp; isChrome) {
      // fire onChange
      props.onChange(e)
    }
  } else {
    // in composition
    isOnComposition = true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// detect it is Chrome browser?</span>
<span class="hljs-keyword">const</span> isChrome = !!<span class="hljs-built_in">window</span>.chrome &amp;&amp; !!<span class="hljs-built_in">window</span>.chrome.webstore

<span class="hljs-keyword">const</span> handleComposition = <span class="hljs-function">(<span class="hljs-params">e: KeyboardEvent</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (e.type === <span class="hljs-string">'compositionend'</span>) {
    <span class="hljs-comment">// composition is end</span>
    isOnComposition = <span class="hljs-literal">false</span>

    <span class="hljs-comment">// fixed for Chrome v53+ and detect all Chrome</span>
    <span class="hljs-comment">// https://chromium.googlesource.com/chromium/src/</span>
    <span class="hljs-comment">// +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/</span>
    <span class="hljs-keyword">if</span> (e.target <span class="hljs-keyword">instanceof</span> HTMLInputElement &amp;&amp; !isOnComposition &amp;&amp; isChrome) {
      <span class="hljs-comment">// fire onChange</span>
      props.onChange(e)
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// in composition</span>
    isOnComposition = <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>"Uncontrolled"(不受控制的)input或textarea组件，解决方式就是这么简单而已，利用CompositionEvent过滤掉不必要的<code>change</code>事件。</p>
<blockquote><p>注: 其它的解决方式还有，像<a href="https://developer.mozilla.org/en-US/docs/Web/API/InputEvent" rel="nofollow noreferrer" target="_blank">InputEvent</a>中有一个<code>isComposing</code>属性，它也可以作为侦测目前是否正在进行输入法的组字工作，但InputEvent事件目前只有Firefox中可以用，看起来没什么前景。另外，W3C新提出的<a href="https://www.w3.org/TR/ime-api/" rel="nofollow noreferrer" target="_blank">IME API</a>或许是一个未来较佳的解决方案，但目前只有<a href="https://blogs.msdn.microsoft.com/ie/2014/03/31/building-better-input-experience-for-east-asian-users-with-the-ime-api-in-ie11/" rel="nofollow noreferrer" target="_blank">IE11 有实作</a>，其他浏览器品牌都没有。</p></blockquote>
<h2 id="articleHeader2">"Controlled"(受控制的)的组件</h2>
<p>在React应用中，使用"Controlled"(受控制的)的input或textarea组件是另一回事，它会开始复杂起来。</p>
<p>"Controlled"(受控制的)的组件并不是只有加上<code>value</code>这个属性这么简单，input或textarea组件所呈现的值，主要会来自state，state有可能是上层组件的，利用props一层层传递过来的，或是这个组件中本身就有的state，直接赋给在这个组件中的render中的input或textarea组件。也就是说，input最后呈现的文字如果要进行改变，就需要改变到组件(不论在何处)的state，要改变state只有透过setState方法，而setState方法有可能是个异步(延时)运行的情况。</p>
<p>把这整个流程串接在一起后，我相信事件触发的不连续情况会变得很严重，需要对不同情况下作测试与评估。目前我所作的测试还只是最基本的组件运用而已，复杂的组件情况还没有开始进行。因为state有很多种用途，有时候内部使用，有时候要对外部用户输入介面的事件，或是有时候要对服务器端的数据接收或传送，不论是不是要使用Redux、MobX或Flux之类的state容器函数库或框架，最终要进行重新渲染的工作，还是得调用React中的setState方法才行。</p>
<p>在基本的测试时，我发现"Controlled"(受控制的)的input组件，它不仅事件触发不连续的情况严重，而且有可能在不同浏览器上会有不同的结果。完全不会有问题的只有一个浏览器，就是上面注释中所说的已经实作出<a href="https://www.w3.org/TR/ime-api/" rel="nofollow noreferrer" target="_blank">IME API</a>的IE11，IE11上可能根本不需要任何解决方案，它的输入法编辑器是独立于浏览器上的文本输入框之外的。</p>
<p>目前已测试的结果是有三种情况，"Chrome, Opera, IE, Edge"为一种，"Firefox"为一种，"Safari"为一种。我为这三种情况分别写了不同的解决方式的代码，但这个事件触发的不连续情况，现在无法有一致性的解决方案，我只能推测这大概可能是React内部设计的问题。</p>
<p>不论是三种的那一种解决方案，有一个重点是你不能像上面的一般性解决方案，阻挡<code>change</code>事件时要运行的代码，也就是阻挡<code>setState</code>变动<code>state</code>值，因为只要一经阻挡，<code>input</code>组件的<code>value</code>值就赋不到值，而且也不会触发重新渲染。所以你只能让<code>change</code>事件不断触发，就像往常一样。</p>
<blockquote><p>那么要如何解决程序逻辑运作的问题？</p></blockquote>
<p>我使用了另一个内部的state对象中的值，称为<code>innerValue</code>，它是对比在input组件上不断因触发<code>change</code>事件而输入的值，称为<code>inputValue</code>。<code>innerValue</code>是个会经过CompositionEvent修正过的值，所以它永远不会带有在输入法组字过程的字符串值。</p>
<p>这个解决方案，是一个"挂羊头卖狗肉"的用法，不论用户在input组件如何输入，输入的过程都会改变<code>inputValue</code>而已，<code>inputValue</code>是一个暂存与呈现用的值，最终用来进行程序逻辑运算的是<code>innerValue</code>。以最一开始的例子来说，用户输入"林哥的Java教程"，在一开始的"林"字输入时，<code>inputValue</code>是从"lin"到输入完成变为"林"，而<code>innerValue</code>是在输入期间是空字符串值，输入完成才会变为"林"。所以，搜索功能可以用<code>innerValue</code>来作为运算的依据，用这个值来搜索对应的数据，这才是正确的运算逻辑，因为<code>innerValue</code>才是真正的不带输入法组字过程的值。</p>
<p>大致上说明一下解决方式的代码，首先它有两个在这个模块作用域中的全局变量，一个用来记录是否在输入法的组字过程中，另一个是给专给Safari浏览器用的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// if now is in composition session
let isOnComposition = false

// for safari use only, innervalue can't setState when compositionend occurred
let isInnerChangeFromOnChange = false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// if now is in composition session</span>
<span class="hljs-keyword">let</span> isOnComposition = <span class="hljs-literal">false</span>

<span class="hljs-comment">// for safari use only, innervalue can't setState when compositionend occurred</span>
<span class="hljs-keyword">let</span> isInnerChangeFromOnChange = <span class="hljs-literal">false</span></code></pre>
<p>在专门处理<code>change</code>事件的<code>handleChange</code>方法中，判断<code>isInnerChangeFromOnChange</code>这一段是专门为了解决Safari浏览器的问题所写，Safari浏览器的行为是CompositionEvent在触发时，其中的<code>event.target.value</code>居然是组字过程中的英文字符，而不是触发这个事件的input元素的所有字符串，这也是特别怪异的地方，所以才会利用在<code>compositionend</code>后会再触发一次<code>change</code>的特性，在这里刷新<code>innerValue</code>。</p>
<p>后面的代码，是代表在输入法的组字过程中，setState方法使用的差异，在组字过程中(<code>isOnComposition === true</code>)的话，只会更动<code>inputValue</code>值，而不会更动到<code>innerValue</code>的值，这对应了上述所说的一个运作过程，一般的输入键盘上的字符时不会有输入法的问题，则是两个值一并更动。代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleChange = (e: Event) => {
   // console.log('change type ', e.type, ', target ', e.target, ', target.value ', e.target.value)

  // Flow check
  if (!(e.target instanceof HTMLInputElement)) return

  if (isInnerChangeFromOnChange) {
    this.setState({ inputValue: e.target.value, innerValue: e.target.value })
    isInnerChangeFromOnChange = false
    return
  }

  // when is on composition, change inputValue only
  // when not in composition change inputValue and innerValue both
  if (!isOnComposition) {
    this.setState({
      inputValue: e.target.value,
      innerValue: e.target.value,
    })
  } else {
    this.setState({ inputValue: e.target.value })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleChange = <span class="hljs-function">(<span class="hljs-params">e: Event</span>) =&gt;</span> {
   <span class="hljs-comment">// console.log('change type ', e.type, ', target ', e.target, ', target.value ', e.target.value)</span>

  <span class="hljs-comment">// Flow check</span>
  <span class="hljs-keyword">if</span> (!(e.target <span class="hljs-keyword">instanceof</span> HTMLInputElement)) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">if</span> (isInnerChangeFromOnChange) {
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">inputValue</span>: e.target.value, <span class="hljs-attr">innerValue</span>: e.target.value })
    isInnerChangeFromOnChange = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// when is on composition, change inputValue only</span>
  <span class="hljs-comment">// when not in composition change inputValue and innerValue both</span>
  <span class="hljs-keyword">if</span> (!isOnComposition) {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">inputValue</span>: e.target.value,
      <span class="hljs-attr">innerValue</span>: e.target.value,
    })
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">inputValue</span>: e.target.value })
  }
}</code></pre>
<p>在专门处理<code>composition</code>事件的<code>handleComposition</code>方法中，主要是为了在<code>compositionend</code>触发时，进行刷新<code>innerValue</code>所撰写的一些代码。在第一种情况时，也就是在Chrome, IE, Edge, Opera浏览器时，只需要直接用<code>e.target.value</code>刷新<code>innerValue</code>即可。在第二种情况是Firefox，它不知道为什么会掉值，所以还需要帮它再一并刷新<code>innerValue</code>一次。第三种情况，上面有说过了，特别的怪异情况，所以对<code>innerValue</code>的刷新改到<code>compositionend</code>之后的那个<code>change</code>事件去作了。代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleComposition = (e: Event) => {
   // console.log('type ', e.type, ', target ', e.target, ',target.value ', e.target.value, ', data', e.data)

   // Flow check
  if (!(e.target instanceof HTMLInputElement)) return

  if (e.type === 'compositionend') {
    // Chrome is ok for only setState innerValue
    // Opera, IE and Edge is like Chrome
    if (isChrome || isIE || isEdge || isOpera) {
      this.setState({ innerValue: e.target.value })
    }

    // Firefox need to setState inputValue again...
    if (isFirefox) {
      this.setState({ innerValue: e.target.value, inputValue: e.target.value })
    }

    // Safari think e.target.value in composition event is keyboard char,
    //  but it will fire another change after compositionend
    if (isSafari) {
       // do change in the next change event
      isInnerChangeFromOnChange = true
    }

    isOnComposition = false
  } else {
    isOnComposition = true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">handleComposition = <span class="hljs-function">(<span class="hljs-params">e: Event</span>) =&gt;</span> {
   <span class="hljs-comment">// console.log('type ', e.type, ', target ', e.target, ',target.value ', e.target.value, ', data', e.data)</span>

   <span class="hljs-comment">// Flow check</span>
  <span class="hljs-keyword">if</span> (!(e.target <span class="hljs-keyword">instanceof</span> HTMLInputElement)) <span class="hljs-keyword">return</span>

  <span class="hljs-keyword">if</span> (e.type === <span class="hljs-string">'compositionend'</span>) {
    <span class="hljs-comment">// Chrome is ok for only setState innerValue</span>
    <span class="hljs-comment">// Opera, IE and Edge is like Chrome</span>
    <span class="hljs-keyword">if</span> (isChrome || isIE || isEdge || isOpera) {
      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">innerValue</span>: e.target.value })
    }

    <span class="hljs-comment">// Firefox need to setState inputValue again...</span>
    <span class="hljs-keyword">if</span> (isFirefox) {
      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attr">innerValue</span>: e.target.value, <span class="hljs-attr">inputValue</span>: e.target.value })
    }

    <span class="hljs-comment">// Safari think e.target.value in composition event is keyboard char,</span>
    <span class="hljs-comment">//  but it will fire another change after compositionend</span>
    <span class="hljs-keyword">if</span> (isSafari) {
       <span class="hljs-comment">// do change in the next change event</span>
      isInnerChangeFromOnChange = <span class="hljs-literal">true</span>
    }

    isOnComposition = <span class="hljs-literal">false</span>
  } <span class="hljs-keyword">else</span> {
    isOnComposition = <span class="hljs-literal">true</span>
  }
}</code></pre>
<blockquote><p>注: 目前这个暂时的解决方式，其方式并不是参考自<a href="https://github.com/fast-flow/react-composition" rel="nofollow noreferrer" target="_blank">react-composition</a>项目，解决方式虽然有些类似，但react-composition用的是ES5的React工厂样式组件语法，我对这种语法并不熟悉。在写这篇文档时，才仔细看了一下react-composition的代码，只能说它的作者实际上也有测试过这个问题，也知道只有用另一个state中的值才能解决这问题。</p></blockquote>
<h2 id="articleHeader3">总结</h2>
<p>如果你是使用"Uncontrolled"(不受控制的)的组件，那么解决方法很简单，就如同上面所说的，像一般的网页上的DOM元素的解决方式即可。</p>
<p>但对于"Controlled"(受控制的)的组件来说，目前的解决方案是一种try-and-error(试误法)的暂时性解决方案，我目前只能按照已测试的平台与浏览器去修正，没测过的浏览器与平台，就不得而知了。</p>
<p>关于这个"Controlled"(受控制的)的组件的事件触发，目前看到有在不同浏览器上的事件触发不连续情况，我也有发一个<a href="https://github.com/facebook/react/issues/8683" rel="nofollow noreferrer" target="_blank">议题(Issue)</a>给React官方。或许比较好的治本方案，是需要从state更动方式的内部代码，或是人造事件触发的顺序，进行一些调整，这超出我的能力范围，就有待开发团队的回应了。</p>
<p>最后，如果你正好有需要到这个功能，或是你认为这个功能有需要，你可以帮忙测试看看或是提供一些建议。我已经把所有的代码、演示、线上测试、解决方案都集中到这个Github库的<a href="https://github.com/eyesofkids/react-compositionevent" rel="nofollow noreferrer" target="_blank">react-compositionevent</a>中。或许你现在需要一个解决方案，你可以用里面目前的暂时性解决方式试试也可以。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
中文输入法与React文本输入框的问题与解决方案

## 原文链接
[https://segmentfault.com/a/1190000008023476](https://segmentfault.com/a/1190000008023476)

