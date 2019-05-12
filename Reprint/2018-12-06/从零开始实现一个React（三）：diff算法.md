---
title: '从零开始实现一个React（三）：diff算法' 
date: 2018-12-06 2:30:09
hidden: true
slug: j88v2tayp3
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>在<a href="https://github.com/hujiulong/blog/issues/5" rel="nofollow noreferrer" target="_blank">上一篇文章</a>，我们已经实现了React的组件功能，从功能的角度来说已经实现了React的核心功能了。</p>
<p>但是我们的实现方式有很大的问题：每次更新都重新渲染整个应用或者整个组件，DOM操作十分昂贵，这样性能损耗非常大。</p>
<p>为了减少DOM更新，我们需要找渲染前后真正变化的部分，只更新这一部分DOM。而对比变化，找出需要更新部分的算法我们称之为<strong>diff算法</strong>。</p>
<h1 id="articleHeader1">对比策略</h1>
<p>在前面两篇文章后，我们实现了一个render方法，它能将虚拟DOM渲染成真正的DOM，我们现在就需要改进它，让它不要再傻乎乎地重新渲染整个DOM树，而是找出真正变化的部分。</p>
<p>这部分很多类React框架实现方式都不太一样，有的框架会选择保存上次渲染的虚拟DOM，然后对比虚拟DOM前后的变化，得到一系列更新的数据，然后再将这些更新应用到真正的DOM上。</p>
<p>但也有一些框架会选择直接对比虚拟DOM和真实DOM，这样就不需要额外保存上一次渲染的虚拟DOM，并且能够一边对比一边更新，这也是我们选择的方式。</p>
<p>不管是DOM还是虚拟DOM，它们的结构都是一棵树，完全对比两棵树变化的算法时间复杂度是O(n^3)，但是考虑到我们很少会跨层级移动DOM，所以我们只需要对比同一层级的变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVZtTx?w=377&amp;h=199" src="https://static.alili.tech/img/bVZtTx?w=377&amp;h=199" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>只需要对比同一颜色框内的节点</p>
<p>总而言之，我们的diff算法有两个原则：</p>
<ul>
<li>对比当前真实的DOM和虚拟DOM，在对比过程中直接更新真实DOM</li>
<li>只对比同一层级的变化</li>
</ul>
<h1 id="articleHeader2">实现</h1>
<p>我们需要实现一个diff方法，它的作用是对比真实DOM和虚拟DOM，最后返回更新后的DOM</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @returns {HTMLElement} 更新后的DOM
 */
function diff( dom, vnode ) {
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * @param {HTMLElement} dom 真实DOM
 * @param {vnode} vnode 虚拟DOM
 * @returns {HTMLElement} 更新后的DOM
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span>(<span class="hljs-params"> dom, vnode </span>) </span>{
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>接下来就要实现这个方法。<br>在这之前先来回忆一下我们虚拟DOM的结构:<br>虚拟DOM的结构可以分为三种，分别表示文本、原生DOM节点以及组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 原生DOM节点的vnode
{
    tag: 'div',
    attrs: {
        className: 'container'
    },
    children: []
}

// 文本节点的vnode
&quot;hello,world&quot;

// 组件的vnode
{
    tag: ComponentConstrucotr,
    attrs: {
        className: 'container'
    },
    children: []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 原生DOM节点的vnode</span>
{
    <span class="hljs-attr">tag</span>: <span class="hljs-string">'div'</span>,
    <span class="hljs-attr">attrs</span>: {
        <span class="hljs-attr">className</span>: <span class="hljs-string">'container'</span>
    },
    <span class="hljs-attr">children</span>: []
}

<span class="hljs-comment">// 文本节点的vnode</span>
<span class="hljs-string">"hello,world"</span>

<span class="hljs-comment">// 组件的vnode</span>
{
    <span class="hljs-attr">tag</span>: ComponentConstrucotr,
    <span class="hljs-attr">attrs</span>: {
        <span class="hljs-attr">className</span>: <span class="hljs-string">'container'</span>
    },
    <span class="hljs-attr">children</span>: []
}</code></pre>
<h2 id="articleHeader3">对比文本节点</h2>
<p>首先考虑最简单的文本节点，如果当前的DOM就是文本节点，则直接更新内容，否则就新建一个文本节点，并移除掉原来的DOM。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// diff text node
if ( typeof vnode === 'string' ) {

    // 如果当前的DOM就是文本节点，则直接更新内容
    if ( dom &amp;&amp; dom.nodeType === 3 ) {    // nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
        if ( dom.textContent !== vnode ) {
            dom.textContent = vnode;
        }
    // 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的
    } else {
        out = document.createTextNode( vnode );
        if ( dom &amp;&amp; dom.parentNode ) {
            dom.parentNode.replaceChild( out, dom );
        }
    }

    return out;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// diff text node</span>
<span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> vnode === <span class="hljs-string">'string'</span> ) {

    <span class="hljs-comment">// 如果当前的DOM就是文本节点，则直接更新内容</span>
    <span class="hljs-keyword">if</span> ( dom &amp;&amp; dom.nodeType === <span class="hljs-number">3</span> ) {    <span class="hljs-comment">// nodeType: https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType</span>
        <span class="hljs-keyword">if</span> ( dom.textContent !== vnode ) {
            dom.textContent = vnode;
        }
    <span class="hljs-comment">// 如果DOM不是文本节点，则新建一个文本节点DOM，并移除掉原来的</span>
    } <span class="hljs-keyword">else</span> {
        out = <span class="hljs-built_in">document</span>.createTextNode( vnode );
        <span class="hljs-keyword">if</span> ( dom &amp;&amp; dom.parentNode ) {
            dom.parentNode.replaceChild( out, dom );
        }
    }

    <span class="hljs-keyword">return</span> out;
}</code></pre>
<p>文本节点十分简单，它没有属性，也没有子元素，所以这一步结束后就可以直接返回结果了。</p>
<h2 id="articleHeader4">对比非文本DOM节点</h2>
<p>如果vnode表示的是一个非文本的DOM节点，那就要分几种情况了：<br>如果真实DOM和虚拟DOM的类型不同，例如当前真实DOM是一个div，而vnode的tag的值是'button'，那么原来的div就没有利用价值了，直接新建一个button元素，并将div的所有子节点移到button下，然后用replaceChild方法将div替换成button。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ( !dom || dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase() ) {
    out = document.createElement( vnode.tag );

    if ( dom ) {
        [ ...dom.childNodes ].map( out.appendChild );    // 将原来的子节点移到新节点下

        if ( dom.parentNode ) {
            dom.parentNode.replaceChild( out, dom );    // 移除掉原来的DOM对象
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> ( !dom || dom.nodeName.toLowerCase() !== vnode.tag.toLowerCase() ) {
    out = <span class="hljs-built_in">document</span>.createElement( vnode.tag );

    <span class="hljs-keyword">if</span> ( dom ) {
        [ ...dom.childNodes ].map( out.appendChild );    <span class="hljs-comment">// 将原来的子节点移到新节点下</span>

        <span class="hljs-keyword">if</span> ( dom.parentNode ) {
            dom.parentNode.replaceChild( out, dom );    <span class="hljs-comment">// 移除掉原来的DOM对象</span>
        }
    }
}</code></pre>
<p>如果真实DOM和虚拟DOM是同一类型的，那我们暂时不需要做别的，只需要等待后面对比属性和对比子节点。</p>
<h2 id="articleHeader5">对比属性</h2>
<p>实际上diff算法不仅仅是找出节点类型的变化，它还要找出来节点的属性以及事件监听的变化。我们将对比属性单独拿出来作为一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function diffAttributes( dom, vnode ) {

    const old = dom.attributes;    // 当前DOM的属性
    const attrs = vnode.attrs;     // 虚拟DOM的属性

    // 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）
    for ( let name in old ) {

        if ( !( name in attrs ) ) {
            setAttribute( dom, name, undefined );
        }

    }

    // 更新新的属性值
    for ( let name in attrs ) {

        if ( old[ name ] !== attrs[ name ] ) {
            setAttribute( dom, name, attrs[ name ] );
        }

    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffAttributes</span>(<span class="hljs-params"> dom, vnode </span>) </span>{

    <span class="hljs-keyword">const</span> old = dom.attributes;    <span class="hljs-comment">// 当前DOM的属性</span>
    <span class="hljs-keyword">const</span> attrs = vnode.attrs;     <span class="hljs-comment">// 虚拟DOM的属性</span>

    <span class="hljs-comment">// 如果原来的属性不在新的属性当中，则将其移除掉（属性值设为undefined）</span>
    <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> name <span class="hljs-keyword">in</span> old ) {

        <span class="hljs-keyword">if</span> ( !( name <span class="hljs-keyword">in</span> attrs ) ) {
            setAttribute( dom, name, <span class="hljs-literal">undefined</span> );
        }

    }

    <span class="hljs-comment">// 更新新的属性值</span>
    <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> name <span class="hljs-keyword">in</span> attrs ) {

        <span class="hljs-keyword">if</span> ( old[ name ] !== attrs[ name ] ) {
            setAttribute( dom, name, attrs[ name ] );
        }

    }

}</code></pre>
<p>setAttribute方法的实现参见<a href="https://github.com/hujiulong/blog/issues/4" rel="nofollow noreferrer" target="_blank">第一篇文章</a></p>
<h2 id="articleHeader6">对比子节点</h2>
<p>节点本身对比完成了，接下来就是对比它的子节点。<br>这里会面临一个问题，前面我们实现的不同diff方法，都是明确知道哪一个真实DOM和虚拟DOM对比，但是子节点是一个数组，它们可能改变了顺序，或者数量有所变化，我们很难确定要和虚拟DOM对比的是哪一个。<br>为了简化逻辑，我们可以让用户提供一些线索：给节点设一个key值，重新渲染时对比key值相同的节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// diff方法
if ( vnode.children &amp;&amp; vnode.children.length > 0 || ( out.childNodes &amp;&amp; out.childNodes.length > 0 ) ) {
    diffChildren( out, vnode.children );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// diff方法</span>
<span class="hljs-keyword">if</span> ( vnode.children &amp;&amp; vnode.children.length &gt; <span class="hljs-number">0</span> || ( out.childNodes &amp;&amp; out.childNodes.length &gt; <span class="hljs-number">0</span> ) ) {
    diffChildren( out, vnode.children );
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function diffChildren( dom, vchildren ) {

    const domChildren = dom.childNodes;
    const children = [];

    const keyed = {};

    // 将有key的节点和没有key的节点分开
    if ( domChildren.length > 0 ) {
        for ( let i = 0; i < domChildren.length; i++ ) {
            const child = domChildren[ i ];
            const key = child.key;
            if ( key ) {
                keyedLen++;
                keyed[ key ] = child;
            } else {
                children.push( child );
            }
        }
    }

    if ( vchildren &amp;&amp; vchildren.length > 0 ) {

        let min = 0;
        let childrenLen = children.length;

        for ( let i = 0; i < vchildren.length; i++ ) {

            const vchild = vchildren[ i ];
            const key = vchild.key;
            let child;

            // 如果有key，找到对应key值的节点
            if ( key ) {

                if ( keyed[ key ] ) {
                    child = keyed[ key ];
                    keyed[ key ] = undefined;
                }

            // 如果没有key，则优先找类型相同的节点
            } else if ( min < childrenLen ) {

                for ( let j = min; j < childrenLen; j++ ) {

                    let c = children[ j ];

                    if ( c &amp;&amp; isSameNodeType( c, vchild ) ) {

                        child = c;
                        children[ j ] = undefined;

                        if ( j === childrenLen - 1 ) childrenLen--;
                        if ( j === min ) min++;
                        break;

                    }

                }

            }

            // 对比
            child = diff( child, vchild );

            // 更新DOM
            const f = domChildren[ i ];
            if ( child &amp;&amp; child !== dom &amp;&amp; child !== f ) {
                if ( !f ) {
                    dom.appendChild(child);
                } else if ( child === f.nextSibling ) {
                    removeNode( f );
                } else {
                    dom.insertBefore( child, f );
                }
            }

        }
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffChildren</span>(<span class="hljs-params"> dom, vchildren </span>) </span>{

    <span class="hljs-keyword">const</span> domChildren = dom.childNodes;
    <span class="hljs-keyword">const</span> children = [];

    <span class="hljs-keyword">const</span> keyed = {};

    <span class="hljs-comment">// 将有key的节点和没有key的节点分开</span>
    <span class="hljs-keyword">if</span> ( domChildren.length &gt; <span class="hljs-number">0</span> ) {
        <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; domChildren.length; i++ ) {
            <span class="hljs-keyword">const</span> child = domChildren[ i ];
            <span class="hljs-keyword">const</span> key = child.key;
            <span class="hljs-keyword">if</span> ( key ) {
                keyedLen++;
                keyed[ key ] = child;
            } <span class="hljs-keyword">else</span> {
                children.push( child );
            }
        }
    }

    <span class="hljs-keyword">if</span> ( vchildren &amp;&amp; vchildren.length &gt; <span class="hljs-number">0</span> ) {

        <span class="hljs-keyword">let</span> min = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">let</span> childrenLen = children.length;

        <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; vchildren.length; i++ ) {

            <span class="hljs-keyword">const</span> vchild = vchildren[ i ];
            <span class="hljs-keyword">const</span> key = vchild.key;
            <span class="hljs-keyword">let</span> child;

            <span class="hljs-comment">// 如果有key，找到对应key值的节点</span>
            <span class="hljs-keyword">if</span> ( key ) {

                <span class="hljs-keyword">if</span> ( keyed[ key ] ) {
                    child = keyed[ key ];
                    keyed[ key ] = <span class="hljs-literal">undefined</span>;
                }

            <span class="hljs-comment">// 如果没有key，则优先找类型相同的节点</span>
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( min &lt; childrenLen ) {

                <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> j = min; j &lt; childrenLen; j++ ) {

                    <span class="hljs-keyword">let</span> c = children[ j ];

                    <span class="hljs-keyword">if</span> ( c &amp;&amp; isSameNodeType( c, vchild ) ) {

                        child = c;
                        children[ j ] = <span class="hljs-literal">undefined</span>;

                        <span class="hljs-keyword">if</span> ( j === childrenLen - <span class="hljs-number">1</span> ) childrenLen--;
                        <span class="hljs-keyword">if</span> ( j === min ) min++;
                        <span class="hljs-keyword">break</span>;

                    }

                }

            }

            <span class="hljs-comment">// 对比</span>
            child = diff( child, vchild );

            <span class="hljs-comment">// 更新DOM</span>
            <span class="hljs-keyword">const</span> f = domChildren[ i ];
            <span class="hljs-keyword">if</span> ( child &amp;&amp; child !== dom &amp;&amp; child !== f ) {
                <span class="hljs-keyword">if</span> ( !f ) {
                    dom.appendChild(child);
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ( child === f.nextSibling ) {
                    removeNode( f );
                } <span class="hljs-keyword">else</span> {
                    dom.insertBefore( child, f );
                }
            }

        }
    }

}</code></pre>
<h2 id="articleHeader7">对比组件</h2>
<p>如果vnode是一个组件，我们也单独拿出来作为一个方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function diffComponent( dom, vnode ) {

    let c = dom &amp;&amp; dom._component;
    let oldDom = dom;

    // 如果组件类型没有变化，则重新set props
    if ( c &amp;&amp; c.constructor === vnode.tag ) {
        setComponentProps( c, vnode.attrs );
        dom = c.base;
    // 如果组件类型变化，则移除掉原来组件，并渲染新的组件
    } else {

        if ( c ) {
            unmountComponent( c );
            oldDom = null;
        }

        c = createComponent( vnode.tag, vnode.attrs );

        setComponentProps( c, vnode.attrs );
        dom = c.base;

        if ( oldDom &amp;&amp; dom !== oldDom ) {
            oldDom._component = null;
            removeNode( oldDom );
        }

    }

    return dom;

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffComponent</span>(<span class="hljs-params"> dom, vnode </span>) </span>{

    <span class="hljs-keyword">let</span> c = dom &amp;&amp; dom._component;
    <span class="hljs-keyword">let</span> oldDom = dom;

    <span class="hljs-comment">// 如果组件类型没有变化，则重新set props</span>
    <span class="hljs-keyword">if</span> ( c &amp;&amp; c.constructor === vnode.tag ) {
        setComponentProps( c, vnode.attrs );
        dom = c.base;
    <span class="hljs-comment">// 如果组件类型变化，则移除掉原来组件，并渲染新的组件</span>
    } <span class="hljs-keyword">else</span> {

        <span class="hljs-keyword">if</span> ( c ) {
            unmountComponent( c );
            oldDom = <span class="hljs-literal">null</span>;
        }

        c = createComponent( vnode.tag, vnode.attrs );

        setComponentProps( c, vnode.attrs );
        dom = c.base;

        <span class="hljs-keyword">if</span> ( oldDom &amp;&amp; dom !== oldDom ) {
            oldDom._component = <span class="hljs-literal">null</span>;
            removeNode( oldDom );
        }

    }

    <span class="hljs-keyword">return</span> dom;

}</code></pre>
<p>下面是相关的工具方法的实现，和<a href="https://github.com/hujiulong/blog/issues/5" rel="nofollow noreferrer" target="_blank">上一篇文章</a>的实现相比，只需要修改renderComponent方法其中的一行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderComponent( component ) {
    
    // ...

    // base = base = _render( renderer );          // 将_render改成diff
    base = diff( component.base, renderer );

    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderComponent</span>(<span class="hljs-params"> component </span>) </span>{
    
    <span class="hljs-comment">// ...</span>

    <span class="hljs-comment">// base = base = _render( renderer );          // 将_render改成diff</span>
    base = diff( component.base, renderer );

    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>完整diff实现看<a href="https://github.com/hujiulong/simple-react/blob/chapter-3/src/react-dom/diff.js" rel="nofollow noreferrer" target="_blank">这个文件</a></p>
<h1 id="articleHeader8">渲染</h1>
<p>现在我们实现了diff方法，我们尝试渲染<a href="https://github.com/hujiulong/blog/issues/5" rel="nofollow noreferrer" target="_blank">上一篇文章</a>中定义的Counter组件，来感受一下有无diff方法的不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            num: 1
        }
    }

    onClick() {
        this.setState( { num: this.state.num + 1 } );
    }

    render() {
        return (
            <div>
                <h1>count: { this.state.num }</h1>
                <button onClick={ () => this.onClick()}>add</button>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx">class Counter extends React.Component {
    constructor( props ) {
        super( props );
        this.<span class="hljs-keyword">state</span> = {
            num: <span class="hljs-number">1</span>
        }
    }

    <span class="hljs-keyword">on</span>Click() {
        this.<span class="hljs-built_in">set</span>State( { num: this.<span class="hljs-keyword">state</span>.num + <span class="hljs-number">1</span> } );
    }

    render() {
        return (
            <span class="hljs-variable">&lt;div&gt;</span>
                <span class="hljs-variable">&lt;h1&gt;</span>count: { this.<span class="hljs-keyword">state</span>.num }&lt;/h1&gt;
                <span class="hljs-variable">&lt;button onClick={ () =&gt;</span> this.<span class="hljs-keyword">on</span>Click()}&gt;add&lt;/button&gt;
            &lt;/div&gt;
        );
    }
}</code></pre>
<h2 id="articleHeader9">不使用diff</h2>
<p>使用上一篇文章的实现，从chrome的调试工具中可以看到，闪烁的部分是每次更新的部分，每次点击按钮，都会重新渲染整个组件。<br><span class="img-wrap"><img data-src="/img/bV7YLh?w=488&amp;h=328" src="https://static.alili.tech/img/bV7YLh?w=488&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">使用diff</h2>
<p>而实现了diff方法后，每次点击按钮，都只会重新渲染变化的部分。<br><span class="img-wrap"><img data-src="/img/bV7YLg?w=488&amp;h=328" src="https://static.alili.tech/img/bV7YLg?w=488&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader11">后话</h1>
<p>在这篇文章中我们实现了diff算法，通过它做到了每次只更新需要更新的部分，极大地减少了DOM操作。React实现远比这个要复杂，特别是在React 16之后还引入了Fiber架构，但是主要的思想是一致的。</p>
<p>实现diff算法可以说性能有了很大的提升，但是在别的地方仍然后很多改进的空间：每次调用setState后会立即调用renderComponent重新渲染组件，但现实情况是，我们可能会在极短的时间内多次调用setState。<br>假设我们在上文的Counter组件中写出了这种代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onClick() {
    for ( let i = 0; i < 100; i++ ) {
        this.setState( { num: this.state.num + 1 } );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">onClick() {
    <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++ ) {
        <span class="hljs-keyword">this</span>.setState( { <span class="hljs-attr">num</span>: <span class="hljs-keyword">this</span>.state.num + <span class="hljs-number">1</span> } );
    }
}</code></pre>
<p>那以目前的实现，每次点击都会渲染100次组件，对性能肯定有很大的影响。<br>下一篇文章我们就要来改进setState方法</p>
<p>这篇文章的代码：<a href="https://github.com/hujiulong/simple-react/tree/chapter-3" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a></p>
<h1 id="articleHeader12">从零开始实现React系列</h1>
<p>React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。</p>
<p>整个系列大概会有四篇，我每周会更新一到两篇，我会第一时间在github上更新，有问题需要探讨也请在github上回复我~</p>
<blockquote>博客地址: <a href="https://github.com/hujiulong/blog" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a><br>关注点star，订阅点watch</blockquote>
<h2 id="articleHeader13">上一篇文章</h2>
<p><a href="https://github.com/hujiulong/blog/issues/5" rel="nofollow noreferrer" target="_blank">从零开始实现一个React（二）：组件和生命周期 </a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始实现一个React（三）：diff算法

## 原文链接
[https://segmentfault.com/a/1190000014307795](https://segmentfault.com/a/1190000014307795)

