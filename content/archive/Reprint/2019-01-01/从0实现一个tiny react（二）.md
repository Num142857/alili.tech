---
title: '从0实现一个tiny react（二）' 
date: 2019-01-01 2:30:07
hidden: true
slug: 8lhmeamyell
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从0实现一个tiny react（二）</h1>
<p>ui = f(d)！ 这是react考虑ui的方式，开发者可以把重心放到d 数据上面来了。 从开发者的角度来讲 d一旦改变，react将会把ui重新渲染，使其再次满足<br>ui = f(d), 开发者没有任何dom操作， 交给react就好！！</p>
<p>怎么重新渲染呢？ (一)文 中我们实现了一种方式， state改变的时候，用新的dom树替换一下老的dom树， 这是完全可行的。<br>考虑一下这个例子 <a href="http://jsfiddle.net/yankang/z0e9ngwL/" rel="nofollow noreferrer" target="_blank">在线演示地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yankang/z0e9ngwL/" data-typeid="0">点击预览</button>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AppWithNoVDOM extends Component {
    constructor(props) {
        super(props)
    }

    testApp3() {
        let result = []
        for(let i = 0; i < 10000 ; i++) {
            result.push(<div style="{{"
                width: '30px',
                color: 'red',
                fontSize: '12px',
                fontWeight: 600,
                height: '20px',
                textAlign: 'center',
                margin:'5px',
                padding: '5px',
                border:'1px solid red',
                position: 'relative',
                left: '10px',
                top: '10px',
            "}}" title={i} >{i}</div>)
        }
        return result
    }

    render() {
        return (
            <div
                width={100}>
                <a  onClick={e => {
                    this.setState({})
                "}}">click me</a>
                {this.testApp3()}
            </div>
        )
    }
}

const startTime = new Date().getTime()
render(<App/>, document.getElementById(&quot;root&quot;))
console.log(&quot;duration:&quot;, new Date().getTime() - startTime)


...
setState(state) {
    setTimeout(() => {
        this.state = state
        const vnode = this.render()
        let olddom = getDOM(this)
        const startTime = new Date().getTime()
        render(vnode, olddom.parentNode, this, olddom)
        console.log(&quot;duration:&quot;, new Date().getTime() - startTime)
    }, 0)
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppWithNoVDOM</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props)
    }

    testApp3() {
        <span class="hljs-keyword">let</span> result = []
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10000</span> ; i++) {
            result.push(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>
                <span class="hljs-attr">width:</span> '<span class="hljs-attr">30px</span>',
                <span class="hljs-attr">color:</span> '<span class="hljs-attr">red</span>',
                <span class="hljs-attr">fontSize:</span> '<span class="hljs-attr">12px</span>',
                <span class="hljs-attr">fontWeight:</span> <span class="hljs-attr">600</span>,
                <span class="hljs-attr">height:</span> '<span class="hljs-attr">20px</span>',
                <span class="hljs-attr">textAlign:</span> '<span class="hljs-attr">center</span>',
                <span class="hljs-attr">margin:</span>'<span class="hljs-attr">5px</span>',
                <span class="hljs-attr">padding:</span> '<span class="hljs-attr">5px</span>',
                <span class="hljs-attr">border:</span>'<span class="hljs-attr">1px</span> <span class="hljs-attr">solid</span> <span class="hljs-attr">red</span>',
                <span class="hljs-attr">position:</span> '<span class="hljs-attr">relative</span>',
                <span class="hljs-attr">left:</span> '<span class="hljs-attr">10px</span>',
                <span class="hljs-attr">top:</span> '<span class="hljs-attr">10px</span>',
            "}}" <span class="hljs-attr">title</span>=<span class="hljs-string">{i}</span> &gt;</span>{i}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
        }
        <span class="hljs-keyword">return</span> result
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
                <span class="hljs-attr">width</span>=<span class="hljs-string">{100}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span>  <span class="hljs-attr">onClick</span>=<span class="hljs-string">{e</span> =&gt;</span> {
                    this.setState({})
                "}}"&gt;click me<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                {this.testApp3()}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">const</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span></span>, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"root"</span>))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"duration:"</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - startTime)


...
setState(state) {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.state = state
        <span class="hljs-keyword">const</span> vnode = <span class="hljs-keyword">this</span>.render()
        <span class="hljs-keyword">let</span> olddom = getDOM(<span class="hljs-keyword">this</span>)
        <span class="hljs-keyword">const</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
        render(vnode, olddom.parentNode, <span class="hljs-keyword">this</span>, olddom)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"duration:"</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() - startTime)
    }, <span class="hljs-number">0</span>)
}
...</code></pre>
<p>我们在 render, setState 设置下时间点。 在10000万个div的情况下， 第一次render和setState触发的render 耗时大概在180ms （可能跟机器配置有关）<br>当点击的时候， 由于调用<code>this.setState({})</code>, 页面将会重新渲染， 再次建立10000万个div， 但是实际上这里的DOM一点也没改。<br>应用越复杂， 无用功越多，卡顿越明显</p>
<p>为了解决这个问题， react提出了virtual-dom的概念：vnode(纯js对象) '代表' dom， 在渲染之前， 先比较出oldvnode和newvode的 区别。 然后增量的<br>更新dom。 virtual-dom 使得ui=f(d) 得以在实际项目上使用。 <br>（注意： virtual-dom 并不会加快应用速度， 只是让应用在不直接操作dom的情况下，通过暴力的比较，增量更新 让应用没有那么慢）</p>
<p>如何增量更新呢？</p>
<h3 id="articleHeader1">复用DOM</h3>
<p>回想一下, 在 <a href="https://segmentfault.com/a/1190000010822571">(一)</a> render函数 里面对于每一个判定为 dom类型的VDOM， 是直接创建一个新的DOM：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
else if(typeof vnode.nodeName == &quot;string&quot;) {
    dom = document.createElement(vnode.nodeName)
    ...
} 
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-params">...</span>
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(typeof vnode.nodeName == <span class="hljs-string">"string"</span>) {
    dom = document.createElement(vnode.nodeName)
    <span class="hljs-params">...</span>
} 
<span class="hljs-params">...</span></code></pre>
<p>一定要创建一个  新的DOM 结构吗？&lt;br/&gt;<br>考虑这种情况：假如一个组件， 初次渲染为 renderBefore， 调用setState再次渲染为 renderAfter  调用setState再再次渲染为 renderAfterAfter。 VNODE如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const renderBefore = {
    tagName: 'div',
    props: {
        width: '20px',
        className: 'xx'
    },
    children:[vnode1, vnode2, vnode3]
}
const renderAfter = {
    tagName: 'div',
    props: {
        width: '30px',
        title: 'yy'
    },
    children:[vnode1, vnode2]
}
const renderAfterAfter = {
    tagName: 'span',
    props: {
        className: 'xx'
    },
    children:[vnode1, vnode2, vnode3]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">renderBefore</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    tagName:</span> <span class="hljs-string">'div'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    props:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        width:</span> <span class="hljs-string">'20px'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        className:</span> <span class="hljs-string">'xx'</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    children:</span><span class="hljs-string">[vnode1,</span> <span class="hljs-string">vnode2,</span> <span class="hljs-string">vnode3]</span>
<span class="hljs-string">}</span>
<span class="hljs-string">const</span> <span class="hljs-string">renderAfter</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    tagName:</span> <span class="hljs-string">'div'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    props:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        width:</span> <span class="hljs-string">'30px'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        title:</span> <span class="hljs-string">'yy'</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    children:</span><span class="hljs-string">[vnode1,</span> <span class="hljs-string">vnode2]</span>
<span class="hljs-string">}</span>
<span class="hljs-string">const</span> <span class="hljs-string">renderAfterAfter</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    tagName:</span> <span class="hljs-string">'span'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    props:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        className:</span> <span class="hljs-string">'xx'</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    children:</span><span class="hljs-string">[vnode1,</span> <span class="hljs-string">vnode2,</span> <span class="hljs-string">vnode3]</span>
<span class="hljs-string">}</span></code></pre>
<p>renderBefore 和renderAfter 都是div， 只不过props和children有部分区别，那我们是不是可以通过修改DOM属性， 修改DOM子节点，把 rederBefore 变化为renderAfter呢？， 这样就避开了DOM创建。 而 renderAfter和renderAfterAfter<br>属于不同的DOM类型， 浏览器还没提供修改DOM类型的Api，是无法复用的， 是一定要创建新的DOM的。</p>
<p>原则如下：</p>
<ul>
<li>不同元素类型是无法复用的， span 是无法变成 div的。</li>
<li>
<p>对于相同元素:</p>
<ul>
<li>更新属性，</li>
<li>复用子节点。</li>
</ul>
</li>
</ul>
<p>所以，现在的代码可能是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
else if(typeof vnode.nodeName == &quot;string&quot;) {
    if(!olddom || olddom.nodeName != vnode.nodeName.toUpperCase()) {
        createNewDom(vnode, parent, comp, olddom)
    } else {
        diffDOM(vnode, parent, comp, olddom) // 包括 更新属性， 子节点复用
    }
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-params">...</span>
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(typeof vnode.nodeName == <span class="hljs-string">"string"</span>) {
    <span class="hljs-keyword">if</span>(!olddom || olddom.nodeName != vnode.nodeName.toUpperCase()) {
        createNewDom(vnode, <span class="hljs-keyword">parent</span>, comp, olddom)
    } <span class="hljs-keyword">else</span> {
        diffDOM(vnode, <span class="hljs-keyword">parent</span>, comp, olddom) <span class="hljs-comment">// 包括 更新属性， 子节点复用</span>
    }
}
<span class="hljs-params">...</span></code></pre>
<h4>更新属性</h4>
<p>对于 renderBefore =&gt; renderAfter 。 属性部分需要做3件事情。</p>
<ol>
<li>renderBefore 和 renderAfter 的属性交集  如果值不同， 更新值 updateAttr</li>
<li>renderBefore 和 renderAfter 的属性差集  置空  removeAttr</li>
<li>renderAfter 和 renderBefore 的属性差集  设置新值 setAttr</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {onlyInLeft, bothIn, onlyInRight} = diffObject(newProps, oldProps)
setAttrs(olddom, onlyInLeft)
removeAttrs(olddom, onlyInRight)
diffAttrs(olddom, bothIn.left, bothIn.right)

function diffObject(leftProps, rightProps) {
    const onlyInLeft = {}
    const bothLeft = {}
    const bothRight = {}
    const onlyInRight = {}

    for(let key in leftProps) {
        if(rightProps[key] === undefined) {
            onlyInLeft[key] = leftProps[key]
        } else {
            bothLeft[key] = leftProps[key]
            bothRight[key] = rightProps[key]
        }
    }

    for(let key in rightProps) {
        if(leftProps[key] === undefined) {
            onlyInRight[key] = rightProps[key]
        }
    }

    return {
        onlyInRight,
        onlyInLeft,
        bothIn: {
            left: bothLeft,
            right: bothRight
        }
    }
}

function setAttrs(dom, props) {
    const allKeys = Object.keys(props)
    allKeys.forEach(k => {
        const v = props[k]

        if(k == &quot;className&quot;) {
            dom.setAttribute(&quot;class&quot;, v)
            return
        }

        if(k == &quot;style&quot;) {
            if(typeof v == &quot;string&quot;) {
                dom.style.cssText = v //IE
            }

            if(typeof v == &quot;object&quot;) {
                for (let i in v) {
                    dom.style[i] =  v[i]
                }
            }
            return

        }

        if(k[0] == &quot;o&quot; &amp;&amp; k[1] == &quot;n&quot;) {
            const capture = (k.indexOf(&quot;Capture&quot;) != -1)
            dom.addEventListener(k.substring(2).toLowerCase(), v, capture)
            return
        }

        dom.setAttribute(k, v)
    })
}

function removeAttrs(dom, props) {
    for(let k in props) {
        if(k == &quot;className&quot;) {
            dom.removeAttribute(&quot;class&quot;)
            continue
        }

        if(k == &quot;style&quot;) {
            dom.style.cssText = &quot;&quot; //IE
            continue
        }


        if(k[0] == &quot;o&quot; &amp;&amp; k[1] == &quot;n&quot;) {
            const capture = (k.indexOf(&quot;Capture&quot;) != -1)
            const v = props[k]
            dom.removeEventListener(k.substring(2).toLowerCase(), v, capture)
            continue
        }

        dom.removeAttribute(k)
    }
}

/**
 *  调用者保证newProps 与 oldProps 的keys是相同的
 * @param dom
 * @param newProps
 * @param oldProps
 */
function diffAttrs(dom, newProps, oldProps) {
    for(let k in newProps) {
        let v = newProps[k]
        let ov = oldProps[k]
        if(v === ov) continue

        if(k == &quot;className&quot;) {
            dom.setAttribute(&quot;class&quot;, v)
            continue
        }

        if(k == &quot;style&quot;) {
            if(typeof v == &quot;string&quot;) {
                dom.style.cssText = v
            } else if( typeof v == &quot;object&quot; &amp;&amp; typeof ov == &quot;object&quot;) {
                for(let vk in v) {
                    if(v[vk] !== ov[vk]) {
                        dom.style[vk] = v[vk]
                    }
                }

                for(let ovk in ov) {
                    if(v[ovk] === undefined){
                        dom.style[ovk] = &quot;&quot;
                    }
                }
            } else {  //typeof v == &quot;object&quot; &amp;&amp; typeof ov == &quot;string&quot;
                dom.style = {}
                for(let vk in v) {
                    dom.style[vk] = v[vk]
                }
            }
            continue
        }

        if(k[0] == &quot;o&quot; &amp;&amp; k[1] == &quot;n&quot;) {
            const capture = (k.indexOf(&quot;Capture&quot;) != -1)
            let eventKey = k.substring(2).toLowerCase()
            dom.removeEventListener(eventKey, ov, capture)
            dom.addEventListener(eventKey, v, capture)
            continue
        }

        dom.setAttribute(k, v)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> {onlyInLeft, bothIn, onlyInRight} = diffObject(newProps, oldProps)
setAttrs(olddom, onlyInLeft)
removeAttrs(olddom, onlyInRight)
diffAttrs(olddom, bothIn.left, bothIn.right)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffObject</span>(<span class="hljs-params">leftProps, rightProps</span>) </span>{
    <span class="hljs-keyword">const</span> onlyInLeft = {}
    <span class="hljs-keyword">const</span> bothLeft = {}
    <span class="hljs-keyword">const</span> bothRight = {}
    <span class="hljs-keyword">const</span> onlyInRight = {}

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> leftProps) {
        <span class="hljs-keyword">if</span>(rightProps[key] === <span class="hljs-literal">undefined</span>) {
            onlyInLeft[key] = leftProps[key]
        } <span class="hljs-keyword">else</span> {
            bothLeft[key] = leftProps[key]
            bothRight[key] = rightProps[key]
        }
    }

    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> rightProps) {
        <span class="hljs-keyword">if</span>(leftProps[key] === <span class="hljs-literal">undefined</span>) {
            onlyInRight[key] = rightProps[key]
        }
    }

    <span class="hljs-keyword">return</span> {
        onlyInRight,
        onlyInLeft,
        <span class="hljs-attr">bothIn</span>: {
            <span class="hljs-attr">left</span>: bothLeft,
            <span class="hljs-attr">right</span>: bothRight
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAttrs</span>(<span class="hljs-params">dom, props</span>) </span>{
    <span class="hljs-keyword">const</span> allKeys = <span class="hljs-built_in">Object</span>.keys(props)
    allKeys.forEach(<span class="hljs-function"><span class="hljs-params">k</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> v = props[k]

        <span class="hljs-keyword">if</span>(k == <span class="hljs-string">"className"</span>) {
            dom.setAttribute(<span class="hljs-string">"class"</span>, v)
            <span class="hljs-keyword">return</span>
        }

        <span class="hljs-keyword">if</span>(k == <span class="hljs-string">"style"</span>) {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> v == <span class="hljs-string">"string"</span>) {
                dom.style.cssText = v <span class="hljs-comment">//IE</span>
            }

            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> v == <span class="hljs-string">"object"</span>) {
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> v) {
                    dom.style[i] =  v[i]
                }
            }
            <span class="hljs-keyword">return</span>

        }

        <span class="hljs-keyword">if</span>(k[<span class="hljs-number">0</span>] == <span class="hljs-string">"o"</span> &amp;&amp; k[<span class="hljs-number">1</span>] == <span class="hljs-string">"n"</span>) {
            <span class="hljs-keyword">const</span> capture = (k.indexOf(<span class="hljs-string">"Capture"</span>) != <span class="hljs-number">-1</span>)
            dom.addEventListener(k.substring(<span class="hljs-number">2</span>).toLowerCase(), v, capture)
            <span class="hljs-keyword">return</span>
        }

        dom.setAttribute(k, v)
    })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">removeAttrs</span>(<span class="hljs-params">dom, props</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> props) {
        <span class="hljs-keyword">if</span>(k == <span class="hljs-string">"className"</span>) {
            dom.removeAttribute(<span class="hljs-string">"class"</span>)
            <span class="hljs-keyword">continue</span>
        }

        <span class="hljs-keyword">if</span>(k == <span class="hljs-string">"style"</span>) {
            dom.style.cssText = <span class="hljs-string">""</span> <span class="hljs-comment">//IE</span>
            <span class="hljs-keyword">continue</span>
        }


        <span class="hljs-keyword">if</span>(k[<span class="hljs-number">0</span>] == <span class="hljs-string">"o"</span> &amp;&amp; k[<span class="hljs-number">1</span>] == <span class="hljs-string">"n"</span>) {
            <span class="hljs-keyword">const</span> capture = (k.indexOf(<span class="hljs-string">"Capture"</span>) != <span class="hljs-number">-1</span>)
            <span class="hljs-keyword">const</span> v = props[k]
            dom.removeEventListener(k.substring(<span class="hljs-number">2</span>).toLowerCase(), v, capture)
            <span class="hljs-keyword">continue</span>
        }

        dom.removeAttribute(k)
    }
}

<span class="hljs-comment">/**
 *  调用者保证newProps 与 oldProps 的keys是相同的
 * @param dom
 * @param newProps
 * @param oldProps
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffAttrs</span>(<span class="hljs-params">dom, newProps, oldProps</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> newProps) {
        <span class="hljs-keyword">let</span> v = newProps[k]
        <span class="hljs-keyword">let</span> ov = oldProps[k]
        <span class="hljs-keyword">if</span>(v === ov) <span class="hljs-keyword">continue</span>

        <span class="hljs-keyword">if</span>(k == <span class="hljs-string">"className"</span>) {
            dom.setAttribute(<span class="hljs-string">"class"</span>, v)
            <span class="hljs-keyword">continue</span>
        }

        <span class="hljs-keyword">if</span>(k == <span class="hljs-string">"style"</span>) {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> v == <span class="hljs-string">"string"</span>) {
                dom.style.cssText = v
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>( <span class="hljs-keyword">typeof</span> v == <span class="hljs-string">"object"</span> &amp;&amp; <span class="hljs-keyword">typeof</span> ov == <span class="hljs-string">"object"</span>) {
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> vk <span class="hljs-keyword">in</span> v) {
                    <span class="hljs-keyword">if</span>(v[vk] !== ov[vk]) {
                        dom.style[vk] = v[vk]
                    }
                }

                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> ovk <span class="hljs-keyword">in</span> ov) {
                    <span class="hljs-keyword">if</span>(v[ovk] === <span class="hljs-literal">undefined</span>){
                        dom.style[ovk] = <span class="hljs-string">""</span>
                    }
                }
            } <span class="hljs-keyword">else</span> {  <span class="hljs-comment">//typeof v == "object" &amp;&amp; typeof ov == "string"</span>
                dom.style = {}
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> vk <span class="hljs-keyword">in</span> v) {
                    dom.style[vk] = v[vk]
                }
            }
            <span class="hljs-keyword">continue</span>
        }

        <span class="hljs-keyword">if</span>(k[<span class="hljs-number">0</span>] == <span class="hljs-string">"o"</span> &amp;&amp; k[<span class="hljs-number">1</span>] == <span class="hljs-string">"n"</span>) {
            <span class="hljs-keyword">const</span> capture = (k.indexOf(<span class="hljs-string">"Capture"</span>) != <span class="hljs-number">-1</span>)
            <span class="hljs-keyword">let</span> eventKey = k.substring(<span class="hljs-number">2</span>).toLowerCase()
            dom.removeEventListener(eventKey, ov, capture)
            dom.addEventListener(eventKey, v, capture)
            <span class="hljs-keyword">continue</span>
        }

        dom.setAttribute(k, v)
    }
}</code></pre>
<p>'新'的dom结构 属性和  renderAfter对应了。&lt;br/&gt;<br>但是 children部分 还是之前的</p>
<h4>操作子节点</h4>
<p>之前 操作子节点的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let i = 0; i < vnode.children.length; i++) {
    render(vnode.children[i], dom, null, null)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-keyword">for</span>(let <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; vnode.children.<span class="hljs-built_in">length</span>; <span class="hljs-built_in">i</span>++) {
    render(vnode.children[i], dom, null, null)
}</code></pre>
<p>render 的第3个参数comp '谁渲染了我'， 第4个参数olddom '之前的旧dom元素'。现在复用旧的dom， 所以第4个参数可能是有值的 代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let olddomChild = olddom.firstChild
for(let i = 0; i < vnode.children.length; i++) {
    render(vnode.children[i], olddom, null, olddomChild)
    olddomChild = olddomChild &amp;&amp; olddomChild.nextSibling
}

//删除多余的子节点
while (olddomChild) {
    let next = olddomChild.nextSibling
    olddom.removeChild(olddomChild)
    olddomChild = next
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let olddomChild = olddom<span class="hljs-selector-class">.firstChild</span>
<span class="hljs-function"><span class="hljs-title">for</span><span class="hljs-params">(let i = <span class="hljs-number">0</span>; i &lt; vnode.children.length; i++)</span></span> {
    render(vnode<span class="hljs-selector-class">.children</span>[i], olddom, null, olddomChild)
    olddomChild = olddomChild &amp;&amp; olddomChild<span class="hljs-selector-class">.nextSibling</span>
}

<span class="hljs-comment">//删除多余的子节点</span>
while (olddomChild) {
    let next = olddomChild<span class="hljs-selector-class">.nextSibling</span>
    olddom.removeChild(olddomChild)
    olddomChild = next
}</code></pre>
<p>综上所述  完整的diffDOM 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function diffDOM(vnode, parent, comp, olddom) {
    const {onlyInLeft, bothIn, onlyInRight} = diffObject(vnode.props, olddom.__vnode.props)
    setAttrs(olddom, onlyInLeft)
    removeAttrs(olddom, onlyInRight)
    diffAttrs(olddom, bothIn.left, bothIn.right)


    let olddomChild = olddom.firstChild
    for(let i = 0; i < vnode.children.length; i++) {
        render(vnode.children[i], olddom, null, olddomChild)
        olddomChild = olddomChild &amp;&amp; olddomChild.nextSibling
    }

    while (olddomChild) { //删除多余的子节点
        let next = olddomChild.nextSibling
        olddom.removeChild(olddomChild)
        olddomChild = next
    }
    olddom.__vnode = vnode  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffDOM</span>(<span class="hljs-params">vnode, parent, comp, olddom</span>) </span>{
    <span class="hljs-keyword">const</span> {onlyInLeft, bothIn, onlyInRight} = diffObject(vnode.props, olddom.__vnode.props)
    setAttrs(olddom, onlyInLeft)
    removeAttrs(olddom, onlyInRight)
    diffAttrs(olddom, bothIn.left, bothIn.right)


    <span class="hljs-keyword">let</span> olddomChild = olddom.firstChild
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; vnode.children.length; i++) {
        render(vnode.children[i], olddom, <span class="hljs-literal">null</span>, olddomChild)
        olddomChild = olddomChild &amp;&amp; olddomChild.nextSibling
    }

    <span class="hljs-keyword">while</span> (olddomChild) { <span class="hljs-comment">//删除多余的子节点</span>
        <span class="hljs-keyword">let</span> next = olddomChild.nextSibling
        olddom.removeChild(olddomChild)
        olddomChild = next
    }
    olddom.__vnode = vnode  
}</code></pre>
<p>由于需要在diffDOM的时候 从olddom获取 oldVNODE（即 diffObject(vnode.props, olddom.__vnode.props)）。 所以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在创建的时候
...
let dom = document.createElement(vnode.nodeName)
dom.__vnode = vnode
...


// diffDOM
...
const {onlyInLeft, bothIn, onlyInRight} = diffObject(vnode.props, olddom.__vnode.props)
...
olddom.__vnode = vnode  // 更新完之后， 需要把__vnode的指向 更新
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// 在创建的时候</span>
...
<span class="hljs-keyword">let</span> dom = document.createElement(vnode.nodeName)
dom.__vnode = vnode
...


<span class="hljs-comment">// diffDOM</span>
...
const {onlyInLeft, bothIn, onlyInRight} = diffObject(vnode.props, olddom.__vnode.props)
...
olddom.__vnode = vnode  <span class="hljs-comment">// 更新完之后， 需要把__vnode的指向 更新</span>
...</code></pre>
<p>另外 对于 TextNode的复用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
if(typeof vnode == &quot;string&quot; || typeof vnode == &quot;number&quot;) {
        if(olddom &amp;&amp; olddom.splitText) {
            if(olddom.nodeValue !== vnode) {
                olddom.nodeValue = vnode
            }
        } else {
            dom = document.createTextNode(vnode)
            if(olddom) {
                parent.replaceChild(dom, olddom)
            } else {
                parent.appendChild(dom)
            }
        }
    }
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>...
<span class="hljs-function"><span class="hljs-title">if</span><span class="hljs-params">(typeof vnode == <span class="hljs-string">"string"</span> || typeof vnode == <span class="hljs-string">"number"</span>)</span></span> {
        <span class="hljs-keyword">if</span>(olddom &amp;&amp; olddom.splitText) {
            <span class="hljs-keyword">if</span>(olddom<span class="hljs-selector-class">.nodeValue</span> !== vnode) {
                olddom<span class="hljs-selector-class">.nodeValue</span> = vnode
            }
        } <span class="hljs-keyword">else</span> {
            dom = document.createTextNode(vnode)
            <span class="hljs-keyword">if</span>(olddom) {
                parent.replaceChild(dom, olddom)
            } <span class="hljs-keyword">else</span> {
                parent.appendChild(dom)
            }
        }
    }
...</code></pre>
<p>重新 跑一下开头 的例子 <a href="http://jsfiddle.net/yankang/cyc4ss5c/" rel="nofollow noreferrer" target="_blank">新的复用DOM演示</a><button class="btn btn-xs btn-default ml10 preview" data-url="yankang/cyc4ss5c/" data-typeid="0">点击预览</button> setState后渲染时间变成了 20ms 左右。 从 180ms 到20ms 差不多快有一个数量级的差距了。 <br>到底快了多少，取决于前后结构的相似程度， 如果前后结构基本相同，diff是有意义的减少了DOM操作。</p>
<h4>复用子节点 - <strong>key</strong>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="初始渲染
...
render() {
    return (
        <div>
            <WeightCompA/>
            <WeightCompB/>
            <WeightCompC/>
        </div>
    )
}
...

setState再次渲染
...
render() {
    return (
        <div>
            <span>hi</span>
            <WeightCompA/>
            <WeightCompB/>
            <WeightCompC/>
        </div>
    )
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>初始渲染
...
render() {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">WeightCompA</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">WeightCompB</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">WeightCompC</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
}
...

setState再次渲染
...
render() {
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>hi<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">WeightCompA</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">WeightCompB</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">WeightCompC</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
}
...</code></pre>
<p>我们之前的子节点复用顺序就是按照DOM顺序， 显然这里如果这样处理的话， 可能导致组件都复用不了。 针对这个问题， React是通过给每一个子组件提供一个 "key"属性来解决的<br>对于拥有 同样key的节点， 认为结构相同。 所以问题变成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="f([{key: 'wca'}, {key: 'wcb}, {key: 'wcc}]) = [{key:'spanhi'}, {key: 'wca'}, {key: 'wcb}, {key: 'wcc}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">f([{<span class="hljs-string">key:</span> <span class="hljs-string">'wca'</span>}, {<span class="hljs-string">key:</span> <span class="hljs-string">'wcb}, {key: '</span>wcc}]) = [{<span class="hljs-string">key:</span><span class="hljs-string">'spanhi'</span>}, {<span class="hljs-string">key:</span> <span class="hljs-string">'wca'</span>}, {<span class="hljs-string">key:</span> <span class="hljs-string">'wcb}, {key: '</span>wcc}]</code></pre>
<p>函数f 通过删除， 插入操作，把olddom的children顺序， 改为和 newProps里面的children一样 （按照key值一样）。类似与 <a href="https://en.wikipedia.org/wiki/Edit_distance" rel="nofollow noreferrer" target="_blank">字符串距离</a>,<br>对于这个问题， 我将会另开一篇文章</p>
<h3 id="articleHeader2">总结</h3>
<p>通过 diff 比较渲染前后 DOM的差别来复用实际的， 我们的性能得到了提高。现在 render方法的描述： &lt;br/&gt;<br>render 方法是根据的vnode， 渲染到实际的dom，如果存在olddom会先尝试复用的 一个递归方法 (由于组件 最终一定会render html的标签。 所以这个递归一定是能够正常返回的)</p>
<ul>
<li>vnode是字符串， 如果存在olddom， 且可以复用， 复用之。否则创建textNode节点</li>
<li>当vnode.nodeName是 字符串的时候， 如果存在olddom， 且可以复用， 复用之。否则创建dom节点， 根据props设置节点属性， 遍历render children</li>
<li>当vnode.nodeName是 function的时候， 获取render方法的返回值 vnode'， 执行render(vnode')</li>
</ul>
<p><a href="https://github.com/ykforerlang/tinyreact" rel="nofollow noreferrer" target="_blank">代码git地址</a></p>
<h3 id="articleHeader3">相关文章</h3>
<ul>
<li><a href="https://segmentfault.com/a/1190000010822571">从0实现一个tiny react(一)</a></li>
<li><a href="https://segmentfault.com/a/1190000011052656" target="_blank">从0实现一个tiny react（二)</a></li>
<li><a href="https://segmentfault.com/a/1190000011156505">从0实现一个tiny react（三）生命周期</a></li>
<li><a href="https://segmentfault.com/a/1190000012696920" target="_blank">从0开始实现 react-router</a></li>
<li><a href="https://segmentfault.com/a/1190000011304634">从0实现一个tinyredux</a></li>
<li><a href="https://segmentfault.com/a/1190000011633971" target="_blank">从0实现一个tiny react-redux</a></li>
<li><a href="https://segmentfault.com/a/1190000011936772">为什么我们需要reselect</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从0实现一个tiny react（二）

## 原文链接
[https://segmentfault.com/a/1190000011052656](https://segmentfault.com/a/1190000011052656)

