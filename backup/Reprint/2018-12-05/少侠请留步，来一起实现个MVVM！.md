---
title: '少侠请留步，来一起实现个MVVM！' 
date: 2018-12-05 2:30:09
hidden: true
slug: eyve14cuhit
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一起来实现一个mvvm框架</h2>
<p>最近手痒，当然也是为了近阶段的跳槽做准备，利用周五时光，仿照vue用法，实现一下mvvm的双向绑定、数据代理、大胡子"{{""}}"模板、指令v-on，v-bind等。当然由于时间紧迫，里面的编码细节没有做优化，还请各位看官多多包涵！看招：</p>
<hr>
<h3 id="articleHeader1">实现原理</h3>
<ul>
<li>数据的劫持观察（observe）</li>
<li>观察者模式（watcher）</li>
<li>使用es6的类class实现（当然，没有考虑到兼容性，只是为了实现而已）</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV8DlH?w=500&amp;h=301" src="https://static.alili.tech/img/bV8DlH?w=500&amp;h=301" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h3 id="articleHeader2">代码：</h3>
<ul><li>数据劫持</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_observe(obj){
        // 递归遍历
        // let value;
        for (const key in obj) {
          let value;
          if (obj.hasOwnProperty(key)){
            // 利用原理 劫持数据---发布订阅

            value = obj[key];
            if (typeof value === 'object') {
              console.log('value', value)
              this._observe(value)
            }

            // 订阅(key)数据
            if (!this._binding[key]) {this._binding[key]= []};
            let binding = this._binding[key]
            // 重写getter, setter
            Object.defineProperty(obj, key, {
              enumerable: true,
              configurable: true,
              get() {
                return value
              },
              set(newVal) {
                if (value === newVal) return false;
                value = newVal
                console.log('newvalue', value)
                // 主要value更新，就发布通知(监听这个key的所有的)watcher更新（改变dom）
                binding.forEach(watcher => {
                  console.log('watcher', watcher)
                  watcher.update()
                });
              }
            })
          }
        }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>_observe(obj){
        <span class="hljs-comment">// 递归遍历</span>
        <span class="hljs-comment">// let value;</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> obj) {
          <span class="hljs-keyword">let</span> <span class="hljs-keyword">value</span>;
          <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)){
            <span class="hljs-comment">// 利用原理 劫持数据---发布订阅</span>

            <span class="hljs-keyword">value</span> = obj[key];
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">value</span> === <span class="hljs-string">'object'</span>) {
              console.log(<span class="hljs-string">'value'</span>, <span class="hljs-keyword">value</span>)
              <span class="hljs-keyword">this</span>._observe(<span class="hljs-keyword">value</span>)
            }

            <span class="hljs-comment">// 订阅(key)数据</span>
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._binding[key]) {<span class="hljs-keyword">this</span>._binding[key]= []};
            <span class="hljs-keyword">let</span> binding = <span class="hljs-keyword">this</span>._binding[key]
            <span class="hljs-comment">// 重写getter, setter</span>
            Object.defineProperty(obj, key, {
              enumerable: <span class="hljs-literal">true</span>,
              configurable: <span class="hljs-literal">true</span>,
              <span class="hljs-keyword">get</span>() {
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span>
              },
              <span class="hljs-keyword">set</span>(newVal) {
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">value</span> === newVal) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">value</span> = newVal
                console.log(<span class="hljs-string">'newvalue'</span>, <span class="hljs-keyword">value</span>)
                <span class="hljs-comment">// 主要value更新，就发布通知(监听这个key的所有的)watcher更新（改变dom）</span>
                binding.forEach(watcher =&gt; {
                  console.log(<span class="hljs-string">'watcher'</span>, watcher)
                  watcher.update()
                });
              }
            })
          }
        }
      }</code></pre>
<ul><li>实例代理数据</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_proxyData(data, vm) {
        // data身上的所有属性全部挂载到vm实例上
        for (const key in data) {
          // let val = data[key];
          // ctx.key = val;
          Object.defineProperty(vm, key, {
            configurable: true,
            enumerable: true,
            get() {
              return data[key];
            },
            set(newVal) {
              data[key] = newVal;
              vm._observe(newVal)
            }
          })
        }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>_proxyData(<span class="hljs-keyword">data</span>, vm) {
        <span class="hljs-comment">// data身上的所有属性全部挂载到vm实例上</span>
        <span class="hljs-keyword">for</span> (const key <span class="hljs-keyword">in</span> <span class="hljs-keyword">data</span>) {
          <span class="hljs-comment">// let val = data[key];</span>
          <span class="hljs-comment">// ctx.key = val;</span>
          Object.defineProperty(vm, key, {
            configurable: <span class="hljs-literal">true</span>,
            enumerable: <span class="hljs-literal">true</span>,
            <span class="hljs-keyword">get</span>() {
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span>[key];
            },
            <span class="hljs-keyword">set</span>(newVal) {
              <span class="hljs-keyword">data</span>[key] = newVal;
              vm._observe(newVal)
            }
          })
        }
      }</code></pre>
<ul><li>模板编译，添加发布订阅</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_compile(root){
        // 获取所有节点
        let nodes = root.childNodes
        
        // 递归编译
        Array.from(nodes).forEach(node => {
          // 针对每一个节点进行处理

          // 元素节点
          if (node.nodeType === 1) {//只考虑绑定了一个指令
            // 获取节点的属性集合
            
            const attributes = Array.from(node.attributes);

            // 指令进行编译
            if (hasDirective(attributes, 'v-bind')) {
              const attrVal = getDirectiveValue(node, attributes, 'v-bind');
              const exp = getDirectiveParams(attributes, 'v-bind');
              // const 
              node.setAttribute(exp, this.$data[attrVal])
              this._binding[attrVal].push(new watcher({
                vm: this, 
                el: node,
                exp,
                attr: attrVal
              }))
            }
            if (hasDirective(attributes, 'v-on')) {
              const eventName = getDirectiveParams(attributes, 'v-on');
              node.addEventListener(eventName, (e) => {
                this.$methods[getDirectiveValue(node, attributes, 'v-on')].call(this)
              })
            }
            if (node.hasAttribute('v-model') &amp;&amp; node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
              let attrVal = node.getAttribute('v-model');
              this._binding[attrVal].push(new Watcher({
                  vm: this,
                  el: node,
                  attr: attrVal,
                  name: 'v-model'
                }))
              node.addEventListener('input', e=> {
                this.$data[attrVal] = node.value;
              })
              node.value = this.$data[attrVal]
            }

            // 递归接着处理
            if (node.hasChildNodes()) {
              this._compile(node)
            }
          }

          // 文本节点
          if (node.nodeType === 3) {
            let text = node.textContent;

            let keyArr = [];
            // 获取"{{"变量"}}"，用正则去匹配；watcher去观察"{{"变量"}}"(包裹元素)，
            let newText = text.replace(/\{\{(\w+)\}\}/g, (match, p0)=> {
              keyArr = [...keyArr, p0];
              // 替换属性为真正的属性值
              return this.$data[p0]
            })
            node.textContent = newText;

            // 把整个文本节点进行监控"{{"v1"}}"-----"{{"v2"}}"；添加到订阅到数组里等待通知
            keyArr.forEach(key => {
              // !this._binding[key] &amp;&amp; (this._binding[key] = [])
              this._binding[key].push(new Watcher({
                vm: this,
                el: node,
                attr: text
              }))
            })
          }
        })
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>_compile(root){
        // 获取所有节点
        let nodes = root.childNodes
        
        // 递归编译
        Array.from(nodes).forEach(<span class="hljs-keyword">node</span> <span class="hljs-title">=&gt; {
          // 针对每一个节点进行处理

          // 元素节点
          if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">nodeType</span> === <span class="hljs-number">1</span>) {//只考虑绑定了一个指令
            // 获取节点的属性集合
            
            const <span class="hljs-keyword">attributes</span> = Array.from(<span class="hljs-keyword">node</span>.<span class="hljs-title">attributes</span>);

            // 指令进行编译
            if (hasDirective(<span class="hljs-keyword">attributes</span>, 'v-bind')) {
              const attrVal = getDirectiveValue(<span class="hljs-keyword">node</span><span class="hljs-title">, attributes</span>, 'v-bind');
              const exp = getDirectiveParams(<span class="hljs-keyword">attributes</span>, 'v-bind');
              // const 
              <span class="hljs-keyword">node</span>.<span class="hljs-title">setAttribute</span>(exp, this.$data[attrVal])
              this._binding[attrVal].push(new watcher({
                vm: this, 
                el: <span class="hljs-keyword">node</span><span class="hljs-title">,
                exp</span>,
                attr: attrVal
              }))
            }
            if (hasDirective(<span class="hljs-keyword">attributes</span>, 'v-on')) {
              const eventName = getDirectiveParams(<span class="hljs-keyword">attributes</span>, 'v-on');
              <span class="hljs-keyword">node</span>.<span class="hljs-title">addEventListener</span>(eventName, (e) =&gt; {
                this.$methods[getDirectiveValue(<span class="hljs-keyword">node</span><span class="hljs-title">, attributes</span>, 'v-on')].call(this)
              })
            }
            if (<span class="hljs-keyword">node</span>.<span class="hljs-title">hasAttribute</span>('v-model') &amp;&amp; <span class="hljs-keyword">node</span>.<span class="hljs-title">tagName</span> === 'INPUT' || <span class="hljs-keyword">node</span>.<span class="hljs-title">tagName</span> === 'TEXTAREA') {
              let attrVal = <span class="hljs-keyword">node</span>.<span class="hljs-title">getAttribute</span>('v-model');
              this._binding[attrVal].push(new Watcher({
                  vm: this,
                  el: <span class="hljs-keyword">node</span><span class="hljs-title">,
                  attr</span>: attrVal,
                  name: 'v-model'
                }))
              <span class="hljs-keyword">node</span>.<span class="hljs-title">addEventListener</span>('input', e=&gt; {
                this.$data[attrVal] = <span class="hljs-keyword">node</span>.<span class="hljs-title">value</span>;
              })
              <span class="hljs-keyword">node</span>.<span class="hljs-title">value</span> = this.$data[attrVal]
            }

            // 递归接着处理
            if (<span class="hljs-keyword">node</span>.<span class="hljs-title">hasChildNodes</span>()) {
              this._compile(<span class="hljs-keyword">node</span><span class="hljs-title">)
            }
          }

          // 文本节点
          if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">nodeType</span> === <span class="hljs-number">3</span>) {
            let text = <span class="hljs-keyword">node</span>.<span class="hljs-title">textContent</span>;

            let keyArr = [];
            // 获取"{{"变量"}}"，用正则去匹配；watcher去观察"{{"变量"}}"(包裹元素)，
            let newText = text.replace(/\{\{(\w+)\}\}/g, (match, p0)=&gt; {
              keyArr = [...keyArr, p0];
              // 替换属性为真正的属性值
              return this.$data[p0]
            })
            <span class="hljs-keyword">node</span>.<span class="hljs-title">textContent</span> = newText;

            // 把整个文本节点进行监控"{{"v1"}}"-----"{{"v2"}}"；添加到订阅到数组里等待通知
            keyArr.forEach(key =&gt; {
              // !this._binding[key] &amp;&amp; (this._binding[key] = [])
              this._binding[key].push(new Watcher({
                vm: this,
                el: <span class="hljs-keyword">node</span><span class="hljs-title">,
                attr</span>: text
              }))
            })
          }
        })
      }</code></pre>
<ul><li>观察者实例</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Watcher {
      constructor({
        vm,
        name,
        el,
        exp,
        attr,
      }) {
        this.vm = vm;
        this.el = el;
        this.name = name;
        this.exp = exp;
        this.attr = attr;
      }
      // 更新text,或更新属性
      update() {
        // 改变节点的属性
        if (this.el.nodeType === 1) {
          // this.el.value = this.vm.$data[this.exp]
          if (this.name === 'v-model') {
            console.log('value', this.el)
            this.el.value = this.vm.$data[this.attr]
          }
          this.el[this.attr] = this.vm.$data[this.exp]
        }
        // 文本节点
        else {
          let text = this.attr;
          // 获取"{{"变量"}}"，用正则去匹配；watcher去观察"{{"变量"}}"(包裹元素)，
          let newText = text.replace(/\{\{(\w+)\}\}/g, (match, p0)=> {
            // 替换属性为真正的属性值
            return this.vm.$data[p0]
          })
          this.el.textContent = newText;
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
      <span class="hljs-keyword">constructor</span>({
        vm,
        name,
        el,
        exp,
        attr,
      }) {
        <span class="hljs-keyword">this</span>.vm = vm;
        <span class="hljs-keyword">this</span>.el = el;
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.exp = exp;
        <span class="hljs-keyword">this</span>.attr = attr;
      }
      <span class="hljs-comment">// 更新text,或更新属性</span>
      update() {
        <span class="hljs-comment">// 改变节点的属性</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.el.nodeType === <span class="hljs-number">1</span>) {
          <span class="hljs-comment">// this.el.value = this.vm.$data[this.exp]</span>
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.name === <span class="hljs-string">'v-model'</span>) {
            console.log(<span class="hljs-string">'value'</span>, <span class="hljs-keyword">this</span>.el)
            <span class="hljs-keyword">this</span>.el.value = <span class="hljs-keyword">this</span>.vm.$<span class="hljs-keyword">data</span>[<span class="hljs-keyword">this</span>.attr]
          }
          <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.attr] = <span class="hljs-keyword">this</span>.vm.$<span class="hljs-keyword">data</span>[<span class="hljs-keyword">this</span>.exp]
        }
        <span class="hljs-comment">// 文本节点</span>
        <span class="hljs-keyword">else</span> {
          let text = <span class="hljs-keyword">this</span>.attr;
          <span class="hljs-comment">// 获取"{{"变量"}}"，用正则去匹配；watcher去观察"{{"变量"}}"(包裹元素)，</span>
          let newText = text.replace(/\{\{(\w+)\}\}/g, (match, p0)=&gt; {
            <span class="hljs-comment">// 替换属性为真正的属性值</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.vm.$<span class="hljs-keyword">data</span>[p0]
          })
          <span class="hljs-keyword">this</span>.el.textContent = newText;
        }
      }
    }</code></pre>
<ul><li>整体代码</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>vue实现</title>
  <style>
  </style>
</head>
<body>
  <div id=&quot;app&quot;>
    <!-- <form> -->
    <h2>"{{"title"}}"</h2>
    <p>"{{"text"}}"</p>
    <input type=&quot;text&quot; v-model=&quot;number&quot;>
    <button v-on:click=&quot;increase&quot;>增加</button>
    <button v-on:click=&quot;decrease&quot;>减少</button>
    <!-- </form> -->
    <p>我点的时候就会变化"{{"number"}}"---"{{"number"}}"</h2>
  </div>
  <script>
    // 构造watcher类，用来观察数据变化来（本质更新dom的指令属性或innertext)
    /**
     * vm: vue实例 
     * name: 指令名
     * el: 节点
     * exp: 指令对应的参数
     * attr: 指令值（绑定的属性名）
    **/ 
    class Watcher {
      constructor({
        vm,
        name,
        el,
        exp,
        attr,
      }) {
        this.vm = vm;
        this.el = el;
        this.name = name;
        this.exp = exp;
        this.attr = attr;
      }
      // 更新text,或更新属性
      update() {
        // 改变节点的属性
        if (this.el.nodeType === 1) {
          // this.el.value = this.vm.$data[this.exp]
          if (this.name === 'v-model') {
            console.log('value', this.el)
            this.el.value = this.vm.$data[this.attr]
          }
          this.el[this.attr] = this.vm.$data[this.exp]
        }
        // 文本节点
        else {
          let text = this.attr;
          // 获取"{{"变量"}}"，用正则去匹配；watcher去观察"{{"变量"}}"(包裹元素)，
          let newText = text.replace(/\{\{(\w+)\}\}/g, (match, p0)=> {
            // 替换属性为真正的属性值
            return this.vm.$data[p0]
          })
          this.el.textContent = newText;
        }
      }
    }


    function hasDirective(attrs, dir) {
      return attrs.some(attr => attr.name.indexOf(dir) !== -1)
    }
    function getDirectiveParams(attrs, dir) {
      dir = attrs.find(attr => attr.name.indexOf(dir) !== -1).name
      return dir.split(':')[1] ? dir.split(':')[1].split('.')[0] : '';
    }
    function getDirectiveValue(node, attrs, dir) {
      return attrs.find(attr => attr.name.indexOf(dir) !== -1).value;
    }

    class DuVue {
      constructor(options) {
        this._init(options);
      }
      _init(options) {
        this.$options = options
        this.$data = options.data
        this.$methods = options.methods
        this.$el = document.querySelector(options.el)

        this._binding = {}
        this._observe(this.$data)
        // 代理所有数据
        this._proxyData(this.$data, this)

        this._compile(this.$el)
      }
      _observe(obj){
        // 递归遍历
        // let value;
        for (const key in obj) {
          let value;
          if (obj.hasOwnProperty(key)){
            // 利用原理 劫持数据---发布订阅

            value = obj[key];
            if (typeof value === 'object') {
              console.log('value', value)
              this._observe(value)
            }

            // 订阅(key)数据
            if (!this._binding[key]) {this._binding[key]= []};
            let binding = this._binding[key]
            // 重写getter, setter
            Object.defineProperty(obj, key, {
              enumerable: true,
              configurable: true,
              get() {
                return value
              },
              set(newVal) {
                if (value === newVal) return false;
                value = newVal
                console.log('newvalue', value)
                // 主要value更新，就发布通知(监听这个key的所有的)watcher更新（改变dom）
                binding.forEach(watcher => {
                  console.log('watcher', watcher)
                  watcher.update()
                });
              }
            })
          }
        }
      }
      // 实例代理数据
      _proxyData(data, vm) {
        // data身上的所有属性全部挂载到vm实例上
        for (const key in data) {
          // let val = data[key];
          // ctx.key = val;
          Object.defineProperty(vm, key, {
            configurable: true,
            enumerable: true,
            get() {
              return data[key];
            },
            set(newVal) {
              data[key] = newVal;
              vm._observe(newVal)
            }
          })
        }
      }
      _compile(root){
        // 获取所有节点
        let nodes = root.childNodes
        
        // 递归编译
        Array.from(nodes).forEach(node => {
          // 针对每一个节点进行处理

          // 元素节点
          if (node.nodeType === 1) {//只考虑绑定了一个指令
            // 获取节点的属性集合
            
            const attributes = Array.from(node.attributes);

            // 指令进行编译
            if (hasDirective(attributes, 'v-bind')) {
              const attrVal = getDirectiveValue(node, attributes, 'v-bind');
              const exp = getDirectiveParams(attributes, 'v-bind');
              // const 
              node.setAttribute(exp, this.$data[attrVal])
              this._binding[attrVal].push(new watcher({
                vm: this, 
                el: node,
                exp,
                attr: attrVal
              }))
            }
            if (hasDirective(attributes, 'v-on')) {
              const eventName = getDirectiveParams(attributes, 'v-on');
              node.addEventListener(eventName, (e) => {
                this.$methods[getDirectiveValue(node, attributes, 'v-on')].call(this)
              })
            }
            if (node.hasAttribute('v-model') &amp;&amp; node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
              let attrVal = node.getAttribute('v-model');
              this._binding[attrVal].push(new Watcher({
                  vm: this,
                  el: node,
                  attr: attrVal,
                  name: 'v-model'
                }))
              node.addEventListener('input', e=> {
                this.$data[attrVal] = node.value;
              })
              node.value = this.$data[attrVal]
            }

            // 递归接着处理
            if (node.hasChildNodes()) {
              this._compile(node)
            }
          }

          // 文本节点
          if (node.nodeType === 3) {
            let text = node.textContent;

            let keyArr = [];
            // 获取"{{"变量"}}"，用正则去匹配；watcher去观察"{{"变量"}}"(包裹元素)，
            let newText = text.replace(/\{\{(\w+)\}\}/g, (match, p0)=> {
              keyArr = [...keyArr, p0];
              // 替换属性为真正的属性值
              return this.$data[p0]
            })
            node.textContent = newText;

            // 把整个文本节点进行监控"{{"v1"}}"-----"{{"v2"}}"；添加到订阅到数组里等待通知
            keyArr.forEach(key => {
              // !this._binding[key] &amp;&amp; (this._binding[key] = [])
              this._binding[key].push(new Watcher({
                vm: this,
                el: node,
                attr: text
              }))
            })
          }
        })
      }
    }
    window.onload = function(){
      var duVue = new DuVue({
        el: '#app',
        data: {
          number: 0,
          title: '手写vue',
          text: '用到es6 class',
          obj: {a:1}
        },
        methods: {
          increase() {
            console.log('click-increase')
            this.number++
          },
          decrease() {
            this.number--
          }
        }
      })
      console.log(duVue)
    }
  </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue实现<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;form&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{"title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"number"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"increase"</span>&gt;</span>增加<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"decrease"</span>&gt;</span>减少<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;/form&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>我点的时候就会变化</span><span class="hljs-template-variable">"{{"number"}}"</span><span class="xml">---</span><span class="hljs-template-variable">"{{"number"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 构造watcher类，用来观察数据变化来（本质更新dom的指令属性或innertext)</span>
    <span class="hljs-comment">/**
     * vm: vue实例 
     * name: 指令名
     * el: 节点
     * exp: 指令对应的参数
     * attr: 指令值（绑定的属性名）
    **/</span> 
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Watcher</span> </span>{
      <span class="hljs-keyword">constructor</span>({
        vm,
        name,
        el,
        exp,
        attr,
      }) {
        <span class="hljs-keyword">this</span>.vm = vm;
        <span class="hljs-keyword">this</span>.el = el;
        <span class="hljs-keyword">this</span>.name = name;
        <span class="hljs-keyword">this</span>.exp = exp;
        <span class="hljs-keyword">this</span>.attr = attr;
      }
      <span class="hljs-comment">// 更新text,或更新属性</span>
      update() {
        <span class="hljs-comment">// 改变节点的属性</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.el.nodeType === <span class="hljs-number">1</span>) {
          <span class="hljs-comment">// this.el.value = this.vm.$data[this.exp]</span>
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.name === <span class="hljs-string">'v-model'</span>) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'value'</span>, <span class="hljs-keyword">this</span>.el)
            <span class="hljs-keyword">this</span>.el.value = <span class="hljs-keyword">this</span>.vm.$data[<span class="hljs-keyword">this</span>.attr]
          }
          <span class="hljs-keyword">this</span>.el[<span class="hljs-keyword">this</span>.attr] = <span class="hljs-keyword">this</span>.vm.$data[<span class="hljs-keyword">this</span>.exp]
        }
        <span class="hljs-comment">// 文本节点</span>
        <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">let</span> text = <span class="hljs-keyword">this</span>.attr;
          <span class="hljs-comment">// 获取</span></span></span><span class="hljs-template-variable">"{{"变量"}}"</span><span class="xml"><span class="undefined">，用正则去匹配；watcher去观察</span></span><span class="hljs-template-variable">"{{"变量"}}"</span><span class="xml"><span class="javascript">(包裹元素)，
          <span class="hljs-keyword">let</span> newText = text.replace(<span class="hljs-regexp">/\{\{(\w+)\}\}/g</span>, (match, p0)=&gt; {
            <span class="hljs-comment">// 替换属性为真正的属性值</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.vm.$data[p0]
          })
          <span class="hljs-keyword">this</span>.el.textContent = newText;
        }
      }
    }


    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hasDirective</span>(<span class="hljs-params">attrs, dir</span>) </span>{
      <span class="hljs-keyword">return</span> attrs.some(<span class="hljs-function"><span class="hljs-params">attr</span> =&gt;</span> attr.name.indexOf(dir) !== <span class="hljs-number">-1</span>)
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDirectiveParams</span>(<span class="hljs-params">attrs, dir</span>) </span>{
      dir = attrs.find(<span class="hljs-function"><span class="hljs-params">attr</span> =&gt;</span> attr.name.indexOf(dir) !== <span class="hljs-number">-1</span>).name
      <span class="hljs-keyword">return</span> dir.split(<span class="hljs-string">':'</span>)[<span class="hljs-number">1</span>] ? dir.split(<span class="hljs-string">':'</span>)[<span class="hljs-number">1</span>].split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">0</span>] : <span class="hljs-string">''</span>;
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDirectiveValue</span>(<span class="hljs-params">node, attrs, dir</span>) </span>{
      <span class="hljs-keyword">return</span> attrs.find(<span class="hljs-function"><span class="hljs-params">attr</span> =&gt;</span> attr.name.indexOf(dir) !== <span class="hljs-number">-1</span>).value;
    }

    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DuVue</span> </span>{
      <span class="hljs-keyword">constructor</span>(options) {
        <span class="hljs-keyword">this</span>._init(options);
      }
      _init(options) {
        <span class="hljs-keyword">this</span>.$options = options
        <span class="hljs-keyword">this</span>.$data = options.data
        <span class="hljs-keyword">this</span>.$methods = options.methods
        <span class="hljs-keyword">this</span>.$el = <span class="hljs-built_in">document</span>.querySelector(options.el)

        <span class="hljs-keyword">this</span>._binding = {}
        <span class="hljs-keyword">this</span>._observe(<span class="hljs-keyword">this</span>.$data)
        <span class="hljs-comment">// 代理所有数据</span>
        <span class="hljs-keyword">this</span>._proxyData(<span class="hljs-keyword">this</span>.$data, <span class="hljs-keyword">this</span>)

        <span class="hljs-keyword">this</span>._compile(<span class="hljs-keyword">this</span>.$el)
      }
      _observe(obj){
        <span class="hljs-comment">// 递归遍历</span>
        <span class="hljs-comment">// let value;</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> obj) {
          <span class="hljs-keyword">let</span> value;
          <span class="hljs-keyword">if</span> (obj.hasOwnProperty(key)){
            <span class="hljs-comment">// 利用原理 劫持数据---发布订阅</span>

            value = obj[key];
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value === <span class="hljs-string">'object'</span>) {
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'value'</span>, value)
              <span class="hljs-keyword">this</span>._observe(value)
            }

            <span class="hljs-comment">// 订阅(key)数据</span>
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._binding[key]) {<span class="hljs-keyword">this</span>._binding[key]= []};
            <span class="hljs-keyword">let</span> binding = <span class="hljs-keyword">this</span>._binding[key]
            <span class="hljs-comment">// 重写getter, setter</span>
            <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
              <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
              <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
              get() {
                <span class="hljs-keyword">return</span> value
              },
              set(newVal) {
                <span class="hljs-keyword">if</span> (value === newVal) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                value = newVal
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'newvalue'</span>, value)
                <span class="hljs-comment">// 主要value更新，就发布通知(监听这个key的所有的)watcher更新（改变dom）</span>
                binding.forEach(<span class="hljs-function"><span class="hljs-params">watcher</span> =&gt;</span> {
                  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'watcher'</span>, watcher)
                  watcher.update()
                });
              }
            })
          }
        }
      }
      <span class="hljs-comment">// 实例代理数据</span>
      _proxyData(data, vm) {
        <span class="hljs-comment">// data身上的所有属性全部挂载到vm实例上</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> data) {
          <span class="hljs-comment">// let val = data[key];</span>
          <span class="hljs-comment">// ctx.key = val;</span>
          <span class="hljs-built_in">Object</span>.defineProperty(vm, key, {
            <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
            get() {
              <span class="hljs-keyword">return</span> data[key];
            },
            set(newVal) {
              data[key] = newVal;
              vm._observe(newVal)
            }
          })
        }
      }
      _compile(root){
        <span class="hljs-comment">// 获取所有节点</span>
        <span class="hljs-keyword">let</span> nodes = root.childNodes
        
        <span class="hljs-comment">// 递归编译</span>
        <span class="hljs-built_in">Array</span>.from(nodes).forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
          <span class="hljs-comment">// 针对每一个节点进行处理</span>

          <span class="hljs-comment">// 元素节点</span>
          <span class="hljs-keyword">if</span> (node.nodeType === <span class="hljs-number">1</span>) {<span class="hljs-comment">//只考虑绑定了一个指令</span>
            <span class="hljs-comment">// 获取节点的属性集合</span>
            
            <span class="hljs-keyword">const</span> attributes = <span class="hljs-built_in">Array</span>.from(node.attributes);

            <span class="hljs-comment">// 指令进行编译</span>
            <span class="hljs-keyword">if</span> (hasDirective(attributes, <span class="hljs-string">'v-bind'</span>)) {
              <span class="hljs-keyword">const</span> attrVal = getDirectiveValue(node, attributes, <span class="hljs-string">'v-bind'</span>);
              <span class="hljs-keyword">const</span> exp = getDirectiveParams(attributes, <span class="hljs-string">'v-bind'</span>);
              <span class="hljs-comment">// const </span>
              node.setAttribute(exp, <span class="hljs-keyword">this</span>.$data[attrVal])
              <span class="hljs-keyword">this</span>._binding[attrVal].push(<span class="hljs-keyword">new</span> watcher({
                <span class="hljs-attr">vm</span>: <span class="hljs-keyword">this</span>, 
                <span class="hljs-attr">el</span>: node,
                exp,
                <span class="hljs-attr">attr</span>: attrVal
              }))
            }
            <span class="hljs-keyword">if</span> (hasDirective(attributes, <span class="hljs-string">'v-on'</span>)) {
              <span class="hljs-keyword">const</span> eventName = getDirectiveParams(attributes, <span class="hljs-string">'v-on'</span>);
              node.addEventListener(eventName, (e) =&gt; {
                <span class="hljs-keyword">this</span>.$methods[getDirectiveValue(node, attributes, <span class="hljs-string">'v-on'</span>)].call(<span class="hljs-keyword">this</span>)
              })
            }
            <span class="hljs-keyword">if</span> (node.hasAttribute(<span class="hljs-string">'v-model'</span>) &amp;&amp; node.tagName === <span class="hljs-string">'INPUT'</span> || node.tagName === <span class="hljs-string">'TEXTAREA'</span>) {
              <span class="hljs-keyword">let</span> attrVal = node.getAttribute(<span class="hljs-string">'v-model'</span>);
              <span class="hljs-keyword">this</span>._binding[attrVal].push(<span class="hljs-keyword">new</span> Watcher({
                  <span class="hljs-attr">vm</span>: <span class="hljs-keyword">this</span>,
                  <span class="hljs-attr">el</span>: node,
                  <span class="hljs-attr">attr</span>: attrVal,
                  <span class="hljs-attr">name</span>: <span class="hljs-string">'v-model'</span>
                }))
              node.addEventListener(<span class="hljs-string">'input'</span>, e=&gt; {
                <span class="hljs-keyword">this</span>.$data[attrVal] = node.value;
              })
              node.value = <span class="hljs-keyword">this</span>.$data[attrVal]
            }

            <span class="hljs-comment">// 递归接着处理</span>
            <span class="hljs-keyword">if</span> (node.hasChildNodes()) {
              <span class="hljs-keyword">this</span>._compile(node)
            }
          }

          <span class="hljs-comment">// 文本节点</span>
          <span class="hljs-keyword">if</span> (node.nodeType === <span class="hljs-number">3</span>) {
            <span class="hljs-keyword">let</span> text = node.textContent;

            <span class="hljs-keyword">let</span> keyArr = [];
            <span class="hljs-comment">// 获取</span></span></span><span class="hljs-template-variable">"{{"变量"}}"</span><span class="xml"><span class="undefined">，用正则去匹配；watcher去观察</span></span><span class="hljs-template-variable">"{{"变量"}}"</span><span class="xml"><span class="javascript">(包裹元素)，
            <span class="hljs-keyword">let</span> newText = text.replace(<span class="hljs-regexp">/\{\{(\w+)\}\}/g</span>, (match, p0)=&gt; {
              keyArr = [...keyArr, p0];
              <span class="hljs-comment">// 替换属性为真正的属性值</span>
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$data[p0]
            })
            node.textContent = newText;

            <span class="hljs-comment">// 把整个文本节点进行监控</span></span></span><span class="hljs-template-variable">"{{"v1"}}"</span><span class="xml"><span class="undefined">-----</span></span><span class="hljs-template-variable">"{{"v2"}}"</span><span class="xml"><span class="javascript">；添加到订阅到数组里等待通知
            keyArr.forEach(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
              <span class="hljs-comment">// !this._binding[key] &amp;&amp; (this._binding[key] = [])</span>
              <span class="hljs-keyword">this</span>._binding[key].push(<span class="hljs-keyword">new</span> Watcher({
                <span class="hljs-attr">vm</span>: <span class="hljs-keyword">this</span>,
                <span class="hljs-attr">el</span>: node,
                <span class="hljs-attr">attr</span>: text
              }))
            })
          }
        })
      }
    }
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">var</span> duVue = <span class="hljs-keyword">new</span> DuVue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: {
          <span class="hljs-attr">number</span>: <span class="hljs-number">0</span>,
          <span class="hljs-attr">title</span>: <span class="hljs-string">'手写vue'</span>,
          <span class="hljs-attr">text</span>: <span class="hljs-string">'用到es6 class'</span>,
          <span class="hljs-attr">obj</span>: {<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>}
        },
        <span class="hljs-attr">methods</span>: {
          increase() {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click-increase'</span>)
            <span class="hljs-keyword">this</span>.number++
          },
          decrease() {
            <span class="hljs-keyword">this</span>.number--
          }
        }
      })
      <span class="hljs-built_in">console</span>.log(duVue)
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
少侠请留步，来一起实现个MVVM！

## 原文链接
[https://segmentfault.com/a/1190000014411980](https://segmentfault.com/a/1190000014411980)

