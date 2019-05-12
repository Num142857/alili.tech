---
title: 'React 数据为什么要使用immutable方式？浅复制与深复制思考' 
date: 2019-02-05 2:30:09
hidden: true
slug: o4ae0jhqvpp
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><a href="https://www.zhihu.com/question/23031215" rel="nofollow noreferrer" target="_blank">深复制与浅复制</a></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    a: 1,
    arr: [1, 2]
};
let obj1 = obj;            //浅复制
obj1.a = 2

console.log(obj) // { a:2, arr: [1,2] };

//同样的方式
let obj = {
    a: 1,
    arr: [1, 2]
};
let obj2 = deepCopy(obj);  //深复制
obj2.a = 2
console.log(obj) // { a:1, arr: [1,2] };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
};
<span class="hljs-keyword">let</span> obj1 = obj;            <span class="hljs-comment">//浅复制</span>
obj1.a = <span class="hljs-number">2</span>

<span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">// { a:2, arr: [1,2] };</span>

<span class="hljs-comment">//同样的方式</span>
<span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
};
<span class="hljs-keyword">let</span> obj2 = deepCopy(obj);  <span class="hljs-comment">//深复制</span>
obj2.a = <span class="hljs-number">2</span>
<span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">// { a:1, arr: [1,2] };</span></code></pre>
<blockquote><p>因为JavaScript存储对象都是存地址的，所以浅复制会导致 obj 和 obj1<br>指向同一块内存地址，大概的示意图如下。而深复制一般都是开辟一块新的内存地址，将原对象的各个属性逐个复制出去。</p></blockquote>
<h2 id="articleHeader1">es6-Object.assign()方法</h2>
<p>深复制只有一层，之后为浅复制（除非再次使用Object.assign嵌套方式赋值）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    a: 1,
    arr: [1, 2]
};
let obj1 = Object.assign({}, obj);

obj1.a = 2
//不变
console.log(obj) // { a:1, arr: [1,2] };



let obj = {
    a: {
        b: 20
    },
    arr: [1, 2]
};
let obj1 = Object.assign({}, obj);

obj1.a.b = 2;
//除非再次使用Object.assign嵌套方式赋值
//变化
console.log(obj) // { a:{b:2}, arr: [1,2] };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
};
<span class="hljs-keyword">let</span> obj1 = <span class="hljs-built_in">Object</span>.assign({}, obj);

obj1.a = <span class="hljs-number">2</span>
<span class="hljs-comment">//不变</span>
<span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">// { a:1, arr: [1,2] };</span>



<span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: {
        <span class="hljs-attr">b</span>: <span class="hljs-number">20</span>
    },
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
};
<span class="hljs-keyword">let</span> obj1 = <span class="hljs-built_in">Object</span>.assign({}, obj);

obj1.a.b = <span class="hljs-number">2</span>;
<span class="hljs-comment">//除非再次使用Object.assign嵌套方式赋值</span>
<span class="hljs-comment">//变化</span>
<span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">// { a:{b:2}, arr: [1,2] };</span></code></pre>
<h2 id="articleHeader2">为什么使用不可变（immutable）的数据？</h2>
<h4>（pureRender结合immutable，见末尾）</h4>
<h5>下面是项目中实际的一个例子</h5>
<p>第一种方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//recduer.js（cart）第一种方式
case types.CART_PUT_MAIN + '_SUCCESS':
    //更新数据
    carts = state.main.carts; // carts 选中的id数组
    id = action.param.id;
    newState = {
        ...state,
        main:{
            ...state.main,
            itemObj:{
                ...state.main.itemObj,
                [id]:{
                    ...state.main.itemObj[id],
                    quantity:action.param.quantity
                    
                }
            }
        }
    };
    sum = sumCommon(carts, newState.main.itemObj);
    newState = {
        ...newState,
        main:{
            ...newState.main,
            ...sum
        }
    };
    return newState;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//recduer.js（cart）第一种方式</span>
<span class="hljs-keyword">case</span> types.CART_PUT_MAIN + <span class="hljs-string">'_SUCCESS'</span>:
    <span class="hljs-comment">//更新数据</span>
    carts = state.main.carts; <span class="hljs-comment">// carts 选中的id数组</span>
    id = action.param.id;
    newState = {
        ...state,
        <span class="hljs-attr">main</span>:{
            ...state.main,
            <span class="hljs-attr">itemObj</span>:{
                ...state.main.itemObj,
                [id]:{
                    ...state.main.itemObj[id],
                    <span class="hljs-attr">quantity</span>:action.param.quantity
                    
                }
            }
        }
    };
    sum = sumCommon(carts, newState.main.itemObj);
    newState = {
        ...newState,
        <span class="hljs-attr">main</span>:{
            ...newState.main,
            ...sum
        }
    };
    <span class="hljs-keyword">return</span> newState;</code></pre>
<p>让我们来看一下对数据层的变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps){
    console.log(nextProps); 
    //next：顾名思义是接收到的next->props，输出的是上面方法中的newState的值
    console.log(this.props);
    //cur：是当前的props的值，因为使用的是类immutable的方式，所以数据不变；
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>componentWillReceiveProps(nextProps){
    console.<span class="hljs-built_in">log</span>(nextProps); 
    <span class="hljs-comment">//next：顾名思义是接收到的next-&gt;props，输出的是上面方法中的newState的值</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">this</span>.props);
    <span class="hljs-comment">//cur：是当前的props的值，因为使用的是类immutable的方式，所以数据不变；</span>
}</code></pre>
<p>第二种方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//recduer.js（cart）第一种方式
case types.CART_PUT_MAIN + '_SUCCESS':
    newState = Object.assign({}, state);
    carts = newState.main.carts; // carts 选中的id数组
    id = action.param.id;
    //浅复制
    newState.main.itemObj[id].quantity = action.param.quantity;;
    sum = sumCommon(carts, newState.main.itemObj);

    newState = Object.assign({}, newState, {
        main: Object.assign({}, newState.main, sum)
    });
    return newState;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//recduer.js（cart）第一种方式</span>
<span class="hljs-keyword">case</span> types.CART_PUT_MAIN + <span class="hljs-string">'_SUCCESS'</span>:
    newState = <span class="hljs-built_in">Object</span>.assign({}, state);
    carts = newState.main.carts; <span class="hljs-comment">// carts 选中的id数组</span>
    id = action.param.id;
    <span class="hljs-comment">//浅复制</span>
    newState.main.itemObj[id].quantity = action.param.quantity;;
    sum = sumCommon(carts, newState.main.itemObj);

    newState = <span class="hljs-built_in">Object</span>.assign({}, newState, {
        <span class="hljs-attr">main</span>: <span class="hljs-built_in">Object</span>.assign({}, newState.main, sum)
    });
    <span class="hljs-keyword">return</span> newState;</code></pre>
<p>让我们来再来看一下对数据层的变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillReceiveProps(nextProps){
    console.log(nextProps); 
    //next：顾名思义是接收到的next->props，输出的是上面方法中的newState的值
    console.log(this.props);
    //cur：是当前的props的值，而这个由于浅复制，这个值被改变了
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentWillReceiveProps(nextProps){
    <span class="hljs-built_in">console</span>.log(nextProps); 
    <span class="hljs-comment">//next：顾名思义是接收到的next-&gt;props，输出的是上面方法中的newState的值</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.props);
    <span class="hljs-comment">//cur：是当前的props的值，而这个由于浅复制，这个值被改变了</span>
}</code></pre>
<p>为了让数据变化更加可测，我们应当使用深复制相关，让我们自己的数据更加安全</p>
<h2 id="articleHeader3">处理方法一：es7 ... 的方式</h2>
<p>直接{...obj}赋值属于浅复制，在修改值时{...obj,a:1}就起到了类深复制的效果<br>更新一个 Object ，则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    a: 0,
    b: 20,
}
obj = {...obj, a: obj.a + 1}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">20</span>,
}
obj = {...obj, <span class="hljs-attr">a</span>: obj.a + <span class="hljs-number">1</span>}</code></pre>
<p>而不是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.a = obj.a + 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">obj.a = obj.a + <span class="hljs-number">1</span></code></pre>
<p>同样的为了避免对 Object 的 in-place editing，数组也是一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [
    { id: 1,a: 1}
]
arr = [...arr, { id: 2,a: 2} ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [
    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>}
]
arr = [...arr, { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,<span class="hljs-attr">a</span>: <span class="hljs-number">2</span>} ]</code></pre>
<p>而不是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [
    { id: 1, a:1}
]
arr.push({ id: 2, a,2});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [
    { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">a</span>:<span class="hljs-number">1</span>}
]
arr.push({ <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, a,<span class="hljs-number">2</span>});</code></pre>
<p>以这样的方式，无需 Immutable.js ，我们可以让应用程序状态是 不可变（Immutable） 的。</p>
<h4>...注意事项及要求</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {
    a: 20,
    arr: [1, 2]
};
let obj1 = { ...obj }; //于obj1=obj一样
// 保持统一，尽量不要使用这样的替换（有可能造成不必要的麻烦）
obj1.a = 2
//...尽量使用这样的赋值形式
obj1 = { ...obj1 , a:2 }
//深复制
console.log(obj) // { a:20, arr: [1,2] };
console.log(obj1) // { a:2, arr: [1,2] };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
};
<span class="hljs-keyword">let</span> obj1 = { ...obj }; <span class="hljs-comment">//于obj1=obj一样</span>
<span class="hljs-comment">// 保持统一，尽量不要使用这样的替换（有可能造成不必要的麻烦）</span>
obj1.a = <span class="hljs-number">2</span>
<span class="hljs-comment">//...尽量使用这样的赋值形式</span>
obj1 = { ...obj1 , <span class="hljs-attr">a</span>:<span class="hljs-number">2</span> }
<span class="hljs-comment">//深复制</span>
<span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">// { a:20, arr: [1,2] };</span>
<span class="hljs-built_in">console</span>.log(obj1) <span class="hljs-comment">// { a:2, arr: [1,2] };</span>
</code></pre>
<p>...与Object.assign属于一个道理(这里和层级相关)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//你可以将其转化为
let obj = {
    a: {
        b: 20
    },
    arr: [1, 2]
};
let obj1 = obj
obj1 = Object.assign({}, obj1, {
    a: Object.assign({}, obj1.a,{b:2})
});
console.log(obj) //{ a:{b:20}, arr: [1,2] }
console.log(obj) //{ a:{b:2}, arr: [1,2] }

所以尽量使用...代替Object.assign" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//你可以将其转化为</span>
<span class="hljs-keyword">let</span> obj = {
    <span class="hljs-attr">a</span>: {
        <span class="hljs-attr">b</span>: <span class="hljs-number">20</span>
    },
    <span class="hljs-attr">arr</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]
};
<span class="hljs-keyword">let</span> obj1 = obj
obj1 = <span class="hljs-built_in">Object</span>.assign({}, obj1, {
    <span class="hljs-attr">a</span>: <span class="hljs-built_in">Object</span>.assign({}, obj1.a,{<span class="hljs-attr">b</span>:<span class="hljs-number">2</span>})
});
<span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">//{ a:{b:20}, arr: [1,2] }</span>
<span class="hljs-built_in">console</span>.log(obj) <span class="hljs-comment">//{ a:{b:2}, arr: [1,2] }</span>

所以尽量使用...代替<span class="hljs-built_in">Object</span>.assign</code></pre>
<h2 id="articleHeader4">处理方法二：使用immutable.js</h2>
<h6>为什么需要使用immutable.js</h6>
<p>之前方式的多层嵌套</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//深复制（类immutable）
newState = {
    ...state,
    main:{
        ...state.main,
        itemObj:{
            ...state.main.itemObj,
            [id]:{
                ...state.main.itemObj[id],
                prop:action.param.props_str,
                product_id:action.param.product_id,
                price:action.param.price
            }
        }
    }
};
//浅复制
newState.main.itemObj[id].prop = action.param.props_str;
//immutable.js方式
...参考immutable的api吧，暂时就不提供了--！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//深复制（类immutable）</span>
newState = {
    ...state,
    <span class="hljs-attr">main</span>:{
        ...state.main,
        <span class="hljs-attr">itemObj</span>:{
            ...state.main.itemObj,
            [id]:{
                ...state.main.itemObj[id],
                <span class="hljs-attr">prop</span>:action.param.props_str,
                <span class="hljs-attr">product_id</span>:action.param.product_id,
                <span class="hljs-attr">price</span>:action.param.price
            }
        }
    }
};
<span class="hljs-comment">//浅复制</span>
newState.main.itemObj[id].prop = action.param.props_str;
<span class="hljs-comment">//immutable.js方式</span>
...参考immutable的api吧，暂时就不提供了--！</code></pre>
<h2 id="articleHeader5">PureRenderMixin使用请参考以下内容</h2>
<blockquote><p>简单的说就是数据变化，比较前后两次的数据是否相同，判断是否重新render；否则你的父容器一改变数据，所有的子组件都重新渲染了，为了增加性能请使用pureRender；</p></blockquote>
<ul>
<li><a href="http://zhenhua-lee.github.io/react/Immutable.html" rel="nofollow noreferrer" target="_blank">Immutable.js及在React中的应用</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/20295971" rel="nofollow noreferrer" target="_blank">Immutable 详解及 React 中实践</a></li>
<li><a href="https://github.com/facebook/immutable-js/wiki/Immutable-as-React-state" rel="nofollow noreferrer" target="_blank">Immutable as React state</a></li>
</ul>
<p>（封装好的PureRender如下：）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

import { is } from 'immutable';

let hasOwnProperty = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
    if (objA === objB || is(objA, objB)) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }
    let bHasOwnProperty = hasOwnProperty.bind(objB);
    for (let i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}
function shallowCompare(instance, nextProps, nextState) {
    return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}
function shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
}
function pureRenderDecorator(component) {
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}
module.exports = pureRenderDecorator;

/*使用方式*/
import pureRender from 'pure-render-decorator';
//babel配置中引入一个transform-decorators-legacy插件
@pureRender
class XXX extends React.Component {
    //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">import</span> { is } <span class="hljs-keyword">from</span> <span class="hljs-string">'immutable'</span>;

<span class="hljs-keyword">let</span> hasOwnProperty = <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowEqual</span>(<span class="hljs-params">objA, objB</span>) </span>{
    <span class="hljs-keyword">if</span> (objA === objB || is(objA, objB)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> objA !== <span class="hljs-string">'object'</span> || objA === <span class="hljs-literal">null</span> || <span class="hljs-keyword">typeof</span> objB !== <span class="hljs-string">'object'</span> || objB === <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-keyword">let</span> keysA = <span class="hljs-built_in">Object</span>.keys(objA);
    <span class="hljs-keyword">let</span> keysB = <span class="hljs-built_in">Object</span>.keys(objB);

    <span class="hljs-keyword">if</span> (keysA.length !== keysB.length) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">let</span> bHasOwnProperty = hasOwnProperty.bind(objB);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keysA.length; i++) {
        <span class="hljs-keyword">if</span> (!bHasOwnProperty(keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }

    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowCompare</span>(<span class="hljs-params">instance, nextProps, nextState</span>) </span>{
    <span class="hljs-keyword">return</span> !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shouldComponentUpdate</span>(<span class="hljs-params">nextProps, nextState</span>) </span>{
    <span class="hljs-keyword">return</span> shallowCompare(<span class="hljs-keyword">this</span>, nextProps, nextState);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pureRenderDecorator</span>(<span class="hljs-params">component</span>) </span>{
    component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}
<span class="hljs-built_in">module</span>.exports = pureRenderDecorator;

<span class="hljs-comment">/*使用方式*/</span>
<span class="hljs-keyword">import</span> pureRender <span class="hljs-keyword">from</span> <span class="hljs-string">'pure-render-decorator'</span>;
<span class="hljs-comment">//babel配置中引入一个transform-decorators-legacy插件</span>
@pureRender
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">XXX</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">//...</span>
}</code></pre>
<p>PureRender的使用要求：对于子组件需要什么参数传递什么，不要把一大块无用的数据引入，否则两次传入的this.props可能始终会不一样，导致PureRender无效</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 数据为什么要使用immutable方式？浅复制与深复制思考

## 原文链接
[https://segmentfault.com/a/1190000006729489](https://segmentfault.com/a/1190000006729489)

