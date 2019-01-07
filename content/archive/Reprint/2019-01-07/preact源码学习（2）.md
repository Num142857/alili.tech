---
title: 'preact源码学习（2）' 
date: 2019-01-07 2:30:11
hidden: true
slug: g5l3ptw8769
categories: [reprint]
---

{{< raw >}}

                    
<p>本节我们看如何更新组件。在上一节也反复提到renderComponent这个方法了，这节直接从它入手吧。它位于<code>src/vdom/component.js</code>文件中。</p>
<p>从参数来看，我们会惊讶它竟然会有这么多参数，原来我们只看到它有两个参数，第二个为数字。第一个参数不用说，是组件的实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function renderComponent(component, opts, mountAll, isChild) {
    //如果它是_disable状态，立即返回，
    if (component._disable) return;
    //开始取出它前后的props, state,context, base
    //base是这个组件的render方法生成的虚拟DOM最后转化出来的真实DOM
    //如果有这个真实DOM，说明它已经mount了，现在是处于更新状态
    let props = component.props,
        state = component.state,
        context = component.context,
        previousProps = component.prevProps || props,
        previousState = component.prevState || state,
        previousContext = component.prevContext || context,
        isUpdate = component.base,
        nextBase = component.nextBase,
        //真实DOM
        initialBase = isUpdate || nextBase,
        //这个变早比较难理，它是component的render方法生成的虚拟DOM的type函数再实例化出来的子组件，相当于一个组件又return出另一个组件。通常情况下，组件会return出来的虚拟DOM的type为一个字符串，对应div, p, span这些真实存在的nodeName。而type为函数时，它就是一个组件。
        initialChildComponent = component._component,
        skip = false,
        rendered, inst, cbase;

    // 如果是更新状态，会经过shouldComponentUpdate，componentWillUpdate钩子
    if (isUpdate) {
        component.props = previousProps;
        component.state = previousState;
        component.context = previousContext;
        if (opts!==FORCE_RENDER
            &amp;&amp; component.shouldComponentUpdate
            &amp;&amp; component.shouldComponentUpdate(props, state, context) === false) {
            skip = true;
        }
        else if (component.componentWillUpdate) {
            component.componentWillUpdate(props, state, context);
        }
        component.props = props;
        component.state = state;
        component.context = context;
    }
    //GC
    component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
    component._dirty = false;
    
    if (!skip) {
        //mount与update都要调用render方法，这时与官方react有点不一样，官方react是没有传参，可能是早期官方文档没有规范render的参数吧。而后来的官方源码上，render是没有参数的。这个参数不应该preact来背。
        rendered = component.render(props, state, context);

        // 如果用户定义了getChildContext，那么用它与context生成孩子的context
        if (component.getChildContext) {
            context = extend(extend({}, context), component.getChildContext());
        }

        let childComponent = rendered &amp;&amp; rendered.nodeName,
            toUnmount, base;
        //判定render出来的虚拟DOM是否还是一个组件
        if (typeof childComponent==='function') {
            // set up high order component link

            let childProps = getNodeProps(rendered);
            inst = initialChildComponent;
            //如果前后两次的子组件的类型都一致，并且key也一样，则用setComponentProps方法更新这个子组件
            if (inst &amp;&amp; inst.constructor===childComponent &amp;&amp; childProps.key==inst.__key) {
                setComponentProps(inst, childProps, SYNC_RENDER, context, false);
            }
            else {
            //否则要替换原来的组件
            //toUnmount用来标识一会儿要进行unmount操作
                toUnmount = inst;
            //实例化另一个组件
                component._component = inst = createComponent(childComponent, childProps, context);
                //刷新真实DOM
                inst.nextBase = inst.nextBase || nextBase;
                inst._parentComponent = component;
                //更新子组件的属性，这里面调用WillRecieveProps钩子
                setComponentProps(inst, childProps, NO_RENDER, context, false);
                //异步渲染子组件，这招比较妙，这里你可以看到isChild参数的作用
                renderComponent(inst, SYNC_RENDER, mountAll, true);
            }
           
            base = inst.base;
        }
        else {
          //如果这次render出来的不是组件，而是普通虚拟DOM，
            cbase = initialBase;

            // destroy high order component link
            toUnmount = initialChildComponent;
            if (toUnmount) {
                cbase = component._component = null;
            }

            if (initialBase || opts===SYNC_RENDER) {
                if (cbase) cbase._component = null;
                base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase &amp;&amp; initialBase.parentNode, true);
            }
        }
        //如果元素节点不同，并且组件实例也不是一个
        if (initialBase &amp;&amp; base!==initialBase &amp;&amp; inst!==initialChildComponent) {
            let baseParent = initialBase.parentNode;
            if (baseParent &amp;&amp; base!==baseParent) {
                baseParent.replaceChild(base, initialBase);

                if (!toUnmount) {
                    initialBase._component = null;
                    recollectNodeTree(initialBase, false);
                }
            }
        }

        if (toUnmount) {
            unmountComponent(toUnmount);
        }
        //重写真实DOM
        component.base = base;
        if (base &amp;&amp; !isChild) {
            let componentRef = component,
                t = component;
         //由于组件能返回组件，可能经过N次render后才能返回一个能转换成为真实DOM的普通虚拟DOM，这些组件通过_parentComponent链接在一起，它们都是共享同一个真实DOM（base）, 这时我们需要为这些组件都重写base属性
            while ((t=t._parentComponent)) {
                (componentRef = t).base = base;
            }
            //在真实DOM上保存最初的那个组件与组件的构造器
            //在真实DOM上保存这么多对象其实是不太好的实现，因为会导致内存泄露，因此才有了recollectNodeTree这个方法
            base._component = componentRef;
            base._componentConstructor = componentRef.constructor;
        }
    }
    //如果是异步插入进行组件的单个render或者是ReactDOM.render，这些组件实例都会先放到mounts数组中。
    if (!isUpdate || mountAll) {
        mounts.unshift(component);
    }
    else if (!skip) {
         //更新完毕，调用componentDidUpdate，afterUpdate钩子
        if (component.componentDidUpdate) {
            component.componentDidUpdate(previousProps, previousState, previousContext);
        }
        if (options.afterUpdate){
           options.afterUpdate(component);
        }
    }
    //调用setState, forceUpdate钩子
    if (component._renderCallbacks!=null) {
        while (component._renderCallbacks.length) component._renderCallbacks.pop().call(component);
    }
    //执行其他组件的更新或插入，diffLevel为一个全局变量
    if (!diffLevel &amp;&amp; !isChild) flushMounts();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderComponent</span>(<span class="hljs-params">component, opts, mountAll, isChild</span>) </span>{
    <span class="hljs-comment">//如果它是_disable状态，立即返回，</span>
    <span class="hljs-keyword">if</span> (component._disable) <span class="hljs-keyword">return</span>;
    <span class="hljs-comment">//开始取出它前后的props, state,context, base</span>
    <span class="hljs-comment">//base是这个组件的render方法生成的虚拟DOM最后转化出来的真实DOM</span>
    <span class="hljs-comment">//如果有这个真实DOM，说明它已经mount了，现在是处于更新状态</span>
    <span class="hljs-keyword">let</span> props = component.props,
        state = component.state,
        context = component.context,
        previousProps = component.prevProps || props,
        previousState = component.prevState || state,
        previousContext = component.prevContext || context,
        isUpdate = component.base,
        nextBase = component.nextBase,
        <span class="hljs-comment">//真实DOM</span>
        initialBase = isUpdate || nextBase,
        <span class="hljs-comment">//这个变早比较难理，它是component的render方法生成的虚拟DOM的type函数再实例化出来的子组件，相当于一个组件又return出另一个组件。通常情况下，组件会return出来的虚拟DOM的type为一个字符串，对应div, p, span这些真实存在的nodeName。而type为函数时，它就是一个组件。</span>
        initialChildComponent = component._component,
        skip = <span class="hljs-literal">false</span>,
        rendered, inst, cbase;

    <span class="hljs-comment">// 如果是更新状态，会经过shouldComponentUpdate，componentWillUpdate钩子</span>
    <span class="hljs-keyword">if</span> (isUpdate) {
        component.props = previousProps;
        component.state = previousState;
        component.context = previousContext;
        <span class="hljs-keyword">if</span> (opts!==FORCE_RENDER
            &amp;&amp; component.shouldComponentUpdate
            &amp;&amp; component.shouldComponentUpdate(props, state, context) === <span class="hljs-literal">false</span>) {
            skip = <span class="hljs-literal">true</span>;
        }
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.componentWillUpdate) {
            component.componentWillUpdate(props, state, context);
        }
        component.props = props;
        component.state = state;
        component.context = context;
    }
    <span class="hljs-comment">//GC</span>
    component.prevProps = component.prevState = component.prevContext = component.nextBase = <span class="hljs-literal">null</span>;
    component._dirty = <span class="hljs-literal">false</span>;
    
    <span class="hljs-keyword">if</span> (!skip) {
        <span class="hljs-comment">//mount与update都要调用render方法，这时与官方react有点不一样，官方react是没有传参，可能是早期官方文档没有规范render的参数吧。而后来的官方源码上，render是没有参数的。这个参数不应该preact来背。</span>
        rendered = component.render(props, state, context);

        <span class="hljs-comment">// 如果用户定义了getChildContext，那么用它与context生成孩子的context</span>
        <span class="hljs-keyword">if</span> (component.getChildContext) {
            context = extend(extend({}, context), component.getChildContext());
        }

        <span class="hljs-keyword">let</span> childComponent = rendered &amp;&amp; rendered.nodeName,
            toUnmount, base;
        <span class="hljs-comment">//判定render出来的虚拟DOM是否还是一个组件</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> childComponent===<span class="hljs-string">'function'</span>) {
            <span class="hljs-comment">// set up high order component link</span>

            <span class="hljs-keyword">let</span> childProps = getNodeProps(rendered);
            inst = initialChildComponent;
            <span class="hljs-comment">//如果前后两次的子组件的类型都一致，并且key也一样，则用setComponentProps方法更新这个子组件</span>
            <span class="hljs-keyword">if</span> (inst &amp;&amp; inst.constructor===childComponent &amp;&amp; childProps.key==inst.__key) {
                setComponentProps(inst, childProps, SYNC_RENDER, context, <span class="hljs-literal">false</span>);
            }
            <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//否则要替换原来的组件</span>
            <span class="hljs-comment">//toUnmount用来标识一会儿要进行unmount操作</span>
                toUnmount = inst;
            <span class="hljs-comment">//实例化另一个组件</span>
                component._component = inst = createComponent(childComponent, childProps, context);
                <span class="hljs-comment">//刷新真实DOM</span>
                inst.nextBase = inst.nextBase || nextBase;
                inst._parentComponent = component;
                <span class="hljs-comment">//更新子组件的属性，这里面调用WillRecieveProps钩子</span>
                setComponentProps(inst, childProps, NO_RENDER, context, <span class="hljs-literal">false</span>);
                <span class="hljs-comment">//异步渲染子组件，这招比较妙，这里你可以看到isChild参数的作用</span>
                renderComponent(inst, SYNC_RENDER, mountAll, <span class="hljs-literal">true</span>);
            }
           
            base = inst.base;
        }
        <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">//如果这次render出来的不是组件，而是普通虚拟DOM，</span>
            cbase = initialBase;

            <span class="hljs-comment">// destroy high order component link</span>
            toUnmount = initialChildComponent;
            <span class="hljs-keyword">if</span> (toUnmount) {
                cbase = component._component = <span class="hljs-literal">null</span>;
            }

            <span class="hljs-keyword">if</span> (initialBase || opts===SYNC_RENDER) {
                <span class="hljs-keyword">if</span> (cbase) cbase._component = <span class="hljs-literal">null</span>;
                base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase &amp;&amp; initialBase.parentNode, <span class="hljs-literal">true</span>);
            }
        }
        <span class="hljs-comment">//如果元素节点不同，并且组件实例也不是一个</span>
        <span class="hljs-keyword">if</span> (initialBase &amp;&amp; base!==initialBase &amp;&amp; inst!==initialChildComponent) {
            <span class="hljs-keyword">let</span> baseParent = initialBase.parentNode;
            <span class="hljs-keyword">if</span> (baseParent &amp;&amp; base!==baseParent) {
                baseParent.replaceChild(base, initialBase);

                <span class="hljs-keyword">if</span> (!toUnmount) {
                    initialBase._component = <span class="hljs-literal">null</span>;
                    recollectNodeTree(initialBase, <span class="hljs-literal">false</span>);
                }
            }
        }

        <span class="hljs-keyword">if</span> (toUnmount) {
            unmountComponent(toUnmount);
        }
        <span class="hljs-comment">//重写真实DOM</span>
        component.base = base;
        <span class="hljs-keyword">if</span> (base &amp;&amp; !isChild) {
            <span class="hljs-keyword">let</span> componentRef = component,
                t = component;
         <span class="hljs-comment">//由于组件能返回组件，可能经过N次render后才能返回一个能转换成为真实DOM的普通虚拟DOM，这些组件通过_parentComponent链接在一起，它们都是共享同一个真实DOM（base）, 这时我们需要为这些组件都重写base属性</span>
            <span class="hljs-keyword">while</span> ((t=t._parentComponent)) {
                (componentRef = t).base = base;
            }
            <span class="hljs-comment">//在真实DOM上保存最初的那个组件与组件的构造器</span>
            <span class="hljs-comment">//在真实DOM上保存这么多对象其实是不太好的实现，因为会导致内存泄露，因此才有了recollectNodeTree这个方法</span>
            base._component = componentRef;
            base._componentConstructor = componentRef.constructor;
        }
    }
    <span class="hljs-comment">//如果是异步插入进行组件的单个render或者是ReactDOM.render，这些组件实例都会先放到mounts数组中。</span>
    <span class="hljs-keyword">if</span> (!isUpdate || mountAll) {
        mounts.unshift(component);
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!skip) {
         <span class="hljs-comment">//更新完毕，调用componentDidUpdate，afterUpdate钩子</span>
        <span class="hljs-keyword">if</span> (component.componentDidUpdate) {
            component.componentDidUpdate(previousProps, previousState, previousContext);
        }
        <span class="hljs-keyword">if</span> (options.afterUpdate){
           options.afterUpdate(component);
        }
    }
    <span class="hljs-comment">//调用setState, forceUpdate钩子</span>
    <span class="hljs-keyword">if</span> (component._renderCallbacks!=<span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">while</span> (component._renderCallbacks.length) component._renderCallbacks.pop().call(component);
    }
    <span class="hljs-comment">//执行其他组件的更新或插入，diffLevel为一个全局变量</span>
    <span class="hljs-keyword">if</span> (!diffLevel &amp;&amp; !isChild) flushMounts();
}</code></pre>
<p>这个函数出现的对象与关系太多了，究竟某某是某某的什么，看下图就知了。</p>
<p><span class="img-wrap"><img data-src="/img/bVRxOc?w=1212&amp;h=838" src="https://static.alili.tech/img/bVRxOc?w=1212&amp;h=838" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们需要知道，组件render后可能产生普通虚拟DOM与子组件，而只有普通虚拟DOM才能转化为真实DOM。组件的实例通过<code>_component</code>与<code>_parentComponent</code>联结在一块，方便上下回溯。而实例总是保存着最后转化出来的真实DOM（base, 也叫initialBase）。base上保存着最上面的那个组件实例，也就是_component，此外，为了方便比较，它的构造器也放在DOM节点上。</p>
<p><strong>renderComponent</strong>这个方法主要处理组件更新时的钩子，及建立父子组件间的联系。</p>
<p>这个方法的参数的起名也很奇葩，如果改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderComponent(componentInstance, renderModel, isRenderByReactDOM, isRenderChildComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">renderComponent</span><span class="hljs-params">(componentInstance, renderModel, isRenderByReactDOM, isRenderChildComponent)</span></span></code></pre>
<p>则好理解些。显示preact的作者不太想知道其奥秘，因此源码的注释也很少很少。</p>
<p>好了，我们看setComponentProps方法，它在renderComponent用了两次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//更新已有的子组件实例
setComponentProps(inst, childProps, SYNC_RENDER, context, false);
//新旧子组件的类型不一致，用新组件的实例进行替换
setComponentProps(inst, childProps, NO_RENDER, context, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//更新已有的子组件实例</span>
setComponentProps(inst, childProps, SYNC_RENDER, context, <span class="hljs-literal">false</span>);
<span class="hljs-comment">//新旧子组件的类型不一致，用新组件的实例进行替换</span>
setComponentProps(inst, childProps, NO_RENDER, context, <span class="hljs-literal">false</span>);</code></pre>
<p>setComponentProps的源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function setComponentProps(component, props, opts, context, mountAll) {
    if (component._disable) return;
    //_disable状态下阻止用户
    component._disable = true;

    if ((component.__ref = props.ref)) delete props.ref;
    if ((component.__key = props.key)) delete props.key;

    if (!component.base || mountAll) {
    //如果没有插入到DOM树或正在被ReactDOM.render渲染
        if (component.componentWillMount) component.componentWillMount();
    }
    else if (component.componentWillReceiveProps) {
    //如果是在更新过程中
        component.componentWillReceiveProps(props, context);
    }
    //下面依次设置provProps, props, prevContext, context
    if (context &amp;&amp; context!==component.context) {
        if (!component.prevContext) component.prevContext = component.context;
        component.context = context;
    }
    
    if (!component.prevProps) component.prevProps = component.props;
    component.props = props;

    component._disable = false;
    //=====================
    if (opts!==NO_RENDER) {
        if (opts===SYNC_RENDER || options.syncComponentUpdates!==false || !component.base) {
            renderComponent(component, SYNC_RENDER, mountAll);
        }
        else {
            enqueueRender(component);
        }
    }

    if (component.__ref) component.__ref(component);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setComponentProps</span>(<span class="hljs-params">component, props, opts, context, mountAll</span>) </span>{
    <span class="hljs-keyword">if</span> (component._disable) <span class="hljs-keyword">return</span>;
    <span class="hljs-comment">//_disable状态下阻止用户</span>
    component._disable = <span class="hljs-literal">true</span>;

    <span class="hljs-keyword">if</span> ((component.__ref = props.ref)) <span class="hljs-keyword">delete</span> props.ref;
    <span class="hljs-keyword">if</span> ((component.__key = props.key)) <span class="hljs-keyword">delete</span> props.key;

    <span class="hljs-keyword">if</span> (!component.base || mountAll) {
    <span class="hljs-comment">//如果没有插入到DOM树或正在被ReactDOM.render渲染</span>
        <span class="hljs-keyword">if</span> (component.componentWillMount) component.componentWillMount();
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.componentWillReceiveProps) {
    <span class="hljs-comment">//如果是在更新过程中</span>
        component.componentWillReceiveProps(props, context);
    }
    <span class="hljs-comment">//下面依次设置provProps, props, prevContext, context</span>
    <span class="hljs-keyword">if</span> (context &amp;&amp; context!==component.context) {
        <span class="hljs-keyword">if</span> (!component.prevContext) component.prevContext = component.context;
        component.context = context;
    }
    
    <span class="hljs-keyword">if</span> (!component.prevProps) component.prevProps = component.props;
    component.props = props;

    component._disable = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">//=====================</span>
    <span class="hljs-keyword">if</span> (opts!==NO_RENDER) {
        <span class="hljs-keyword">if</span> (opts===SYNC_RENDER || options.syncComponentUpdates!==<span class="hljs-literal">false</span> || !component.base) {
            renderComponent(component, SYNC_RENDER, mountAll);
        }
        <span class="hljs-keyword">else</span> {
            enqueueRender(component);
        }
    }

    <span class="hljs-keyword">if</span> (component.__ref) component.__ref(component);
}</code></pre>
<p>最后看 createComponent，这是创建一个组件实例。React的组件有三种，经典组件，纯组件，无状态组件，前两种都是类的形式，可以归为一种，最后一种是普通函数。但在<code>src/vdom/component-recycler.js</code>我们看到它们都是<code>new</code>出来的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function createComponent(Ctor, props, context) {
    let list = components[Ctor.name],
        inst;
    //类形式的组件
    if (Ctor.prototype &amp;&amp; Ctor.prototype.render) {
        inst = new Ctor(props, context);
        Component.call(inst, props, context);
    }else {//无状态组件
        inst = new Component(props, context);
        inst.constructor = Ctor;
        inst.render = doRender;
    }

    if (list) {
        for (let i=list.length; i--; ) {
            if (list[i].constructor===Ctor) {
                inst.nextBase = list[i].nextBase;
                list.splice(i, 1);
                break;
            }
        }
    }
    return inst;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>export function createComponent(Ctor, <span class="hljs-built_in">props</span>, <span class="hljs-built_in">context</span>) {
    <span class="hljs-built_in">let</span> list = <span class="hljs-built_in">components</span>[Ctor.name],
        inst;
    //类形式的组件
    <span class="hljs-keyword">if</span> (Ctor.prototype &amp;&amp; Ctor.prototype.render) {
        inst = <span class="hljs-built_in">new</span> Ctor(<span class="hljs-built_in">props</span>, <span class="hljs-built_in">context</span>);
        Component.call(inst, <span class="hljs-built_in">props</span>, <span class="hljs-built_in">context</span>);
    }<span class="hljs-keyword">else</span> {//无状态组件
        inst = <span class="hljs-built_in">new</span> Component(<span class="hljs-built_in">props</span>, <span class="hljs-built_in">context</span>);
        inst.constructor = Ctor;
        inst.render = doRender;
    }

    <span class="hljs-keyword">if</span> (list) {
        <span class="hljs-keyword">for</span> (<span class="hljs-built_in">let</span> i=list.<span class="hljs-built_in">length</span>; i--; ) {
            <span class="hljs-keyword">if</span> (list[i].constructor===Ctor) {
                inst.nextBase = list[i].nextBase;
                list.<span class="hljs-built_in">splice</span>(i, <span class="hljs-number">1</span>);
                <span class="hljs-built_in">break</span>;
            }
        }
    }
    <span class="hljs-built_in">return</span> inst;
}</code></pre>
<p>我们再看一下doRender,这时恍然大悟，原来preact是统一所有组件以后更新都要通过render方法生成它的普通虚拟DOM或子组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doRender(props, state, context) {
    return this.constructor(props, context);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doRender</span>(<span class="hljs-params">props, state, context</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.constructor(props, context);
}</code></pre>
<p>此外，preact还通过collectComponent来回收它的真实DOM，然后在createComponent中重复利用。这是它高效的缘由之一。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const components = {};

export function collectComponent(component) {
    let name = component.constructor.name;
    (components[name] || (components[name] = [])).push(component);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>const components = {};

export <span class="hljs-function"><span class="hljs-keyword">function</span></span> collectComponent(component) {
    let <span class="hljs-keyword">name</span> = component.constructor.<span class="hljs-keyword">name</span>;
    (components[<span class="hljs-keyword">name</span>] || (components[<span class="hljs-keyword">name</span>] = [])).push(component);
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
preact源码学习（2）

## 原文链接
[https://segmentfault.com/a/1190000010340534](https://segmentfault.com/a/1190000010340534)

