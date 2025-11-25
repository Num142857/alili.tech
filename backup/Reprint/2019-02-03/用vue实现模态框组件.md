---
title: '用vue实现模态框组件' 
date: 2019-02-03 2:30:39
hidden: true
slug: qko7l8yqidh
categories: [reprint]
---

{{< raw >}}

                    
<p>基本上每个项目都需要用到模态框组件，由于在最近的项目中，alert组件和confirm是两套完全不一样的设计，所以我将他们分成了两个组件，本文主要讨论的是confirm组件的实现。</p>
<h2 id="articleHeader0">组件结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;modal&quot; v-show=&quot;show&quot; transition=&quot;fade&quot;>
        <div class=&quot;modal-dialog&quot;>
            <div class=&quot;modal-content&quot;>
                <!--头部-->
                <div class=&quot;modal-header&quot;>
                    <slot name=&quot;header&quot;>
                        <p class=&quot;title&quot;>"{{"modal.title"}}"</p>
                    </slot>
                    <a v-touch:tap=&quot;close(0)&quot; class=&quot;close&quot; href=&quot;javascript:void(0)&quot;></a>
                </div>
                <!--内容区域-->
                <div class=&quot;modal-body&quot;>
                    <slot name=&quot;body&quot;>
                        <p class=&quot;notice&quot;>"{{"modal.text"}}"</p>
                    </slot>
                </div>
                <!--尾部,操作按钮-->
                <div class=&quot;modal-footer&quot;>
                    <slot name=&quot;button&quot;>
                        <a v-if=&quot;modal.showCancelButton&quot; href=&quot;javascript:void(0)&quot; class=&quot;button "{{"modal.cancelButtonClass"}}"&quot; v-touch:tap=&quot;close(1)&quot;>"{{"modal.cancelButtonText"}}"</a>
                        <a v-if=&quot;modal.showConfirmButton&quot; href=&quot;javascript:void(0)&quot; class=&quot;button "{{"modal.confirmButtonClass"}}"&quot; v-touch:tap=&quot;submit&quot;>"{{"modal.confirmButtonText"}}"</a>
                    </slot>
                </div>
            </div>
        </div>
    </div>
    <div v-show=&quot;show&quot; class=&quot;modal-backup&quot; transition=&quot;fade&quot;></div>
</template>  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-dialog"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-content"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--头部--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-header"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span></span><span class="hljs-template-variable">"{{"modal.title"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-touch:tap</span>=<span class="hljs-string">"close(0)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"close"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-comment">&lt;!--内容区域--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-body"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"body"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"notice"</span>&gt;</span></span><span class="hljs-template-variable">"{{"modal.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-comment">&lt;!--尾部,操作按钮--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-footer"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"button"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"modal.showCancelButton"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button </span></span></span><span class="hljs-template-variable">"{{"modal.cancelButtonClass"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">v-touch:tap</span>=<span class="hljs-string">"close(1)"</span>&gt;</span></span><span class="hljs-template-variable">"{{"modal.cancelButtonText"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"modal.showConfirmButton"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button </span></span></span><span class="hljs-template-variable">"{{"modal.confirmButtonClass"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">v-touch:tap</span>=<span class="hljs-string">"submit"</span>&gt;</span></span><span class="hljs-template-variable">"{{"modal.confirmButtonText"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"modal-backup"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>  
</span></code></pre>
<p>模态框结构分为三部分，分别为头部、内部区域和操作区域，都提供了slot，可以根据需要定制。</p>
<h2 id="articleHeader1">样式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    overflow: scroll;
    margin: 30/@rate auto;
}
.modal-dialog {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%,0);
    width: 690/@rate;
    padding: 50/@rate 40/@rate;
    background: #fff;
}
.modal-backup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.modal</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1001</span>;
    <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">overflow</span>: scroll;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">30</span>/@rate auto;
}
<span class="hljs-selector-class">.modal-dialog</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%,0);
    <span class="hljs-attribute">width</span>: <span class="hljs-number">690</span>/@rate;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">50</span>/@rate <span class="hljs-number">40</span>/@rate;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.modal-backup</span> {
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1000</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
}
</code></pre>
<p>这里只是一些基本样式，没什么好说的，这次项目是在移动端，用了淘宝的<a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">自适应布局方案</a>，@rate是切稿时候的转换率。</p>
<h2 id="articleHeader2">接口定义</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * modal 模态接口参数
 * @param {string} modal.title 模态框标题
 * @param {string} modal.text 模态框内容
 * @param {boolean} modal.showCancelButton 是否显示取消按钮
 * @param {string} modal.cancelButtonClass 取消按钮样式
 * @param {string} modal.cancelButtonText 取消按钮文字
 * @param {string} modal.showConfirmButton 是否显示确定按钮
 * @param {string} modal.confirmButtonClass 确定按钮样式
 * @param {string} modal.confirmButtonText 确定按钮标文字
 */
props: ['modalOptions'],
computed: {
    /**
     * 格式化props进来的参数,对参数赋予默认值
     */
    modal: {
        get() {
            let modal = this.modalOptions;
            modal = {
                title: modal.title || '提示',
                text: modal.text,
                showCancelButton: typeof modal.showCancelButton === 'undefined' ? true : modal.showCancelButton,
                cancelButtonClass: modal.cancelButtonClass ? modal.showCancelButton : 'btn-default',
                cancelButtonText: modal.cancelButtonText ? modal.cancelButtonText : '取消',
                showConfirmButton: typeof modal.showConfirmButton === 'undefined' ? true : modal.cancelButtonClass,
                confirmButtonClass: modal.confirmButtonClass ? modal.confirmButtonClass : 'btn-active',
                confirmButtonText: modal.confirmButtonText ? modal.confirmButtonText : '确定',
            };
            return modal;
        },
    },
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">/**
 * modal 模态接口参数
 * <span class="hljs-doctag">@param</span> {string} modal.title 模态框标题
 * <span class="hljs-doctag">@param</span> {string} modal.text 模态框内容
 * <span class="hljs-doctag">@param</span> {boolean} modal.showCancelButton 是否显示取消按钮
 * <span class="hljs-doctag">@param</span> {string} modal.cancelButtonClass 取消按钮样式
 * <span class="hljs-doctag">@param</span> {string} modal.cancelButtonText 取消按钮文字
 * <span class="hljs-doctag">@param</span> {string} modal.showConfirmButton 是否显示确定按钮
 * <span class="hljs-doctag">@param</span> {string} modal.confirmButtonClass 确定按钮样式
 * <span class="hljs-doctag">@param</span> {string} modal.confirmButtonText 确定按钮标文字
 */</span>
<span class="hljs-string">props:</span> [<span class="hljs-string">'modalOptions'</span>],
<span class="hljs-string">computed:</span> {
    <span class="hljs-comment">/**
     * 格式化props进来的参数,对参数赋予默认值
     */</span>
<span class="hljs-symbol">    modal:</span> {
        get() {
            let modal = <span class="hljs-keyword">this</span>.modalOptions;
            modal = {
<span class="hljs-symbol">                title:</span> modal.title || <span class="hljs-string">'提示'</span>,
<span class="hljs-symbol">                text:</span> modal.text,
<span class="hljs-symbol">                showCancelButton:</span> typeof modal.showCancelButton === <span class="hljs-string">'undefined'</span> ? true : modal.showCancelButton,
<span class="hljs-symbol">                cancelButtonClass:</span> modal.cancelButtonClass ? modal.showCancelButton : <span class="hljs-string">'btn-default'</span>,
<span class="hljs-symbol">                cancelButtonText:</span> modal.cancelButtonText ? modal.cancelButtonText : <span class="hljs-string">'取消'</span>,
<span class="hljs-symbol">                showConfirmButton:</span> typeof modal.showConfirmButton === <span class="hljs-string">'undefined'</span> ? true : modal.cancelButtonClass,
<span class="hljs-symbol">                confirmButtonClass:</span> modal.confirmButtonClass ? modal.confirmButtonClass : <span class="hljs-string">'btn-active'</span>,
<span class="hljs-symbol">                confirmButtonText:</span> modal.confirmButtonText ? modal.confirmButtonText : <span class="hljs-string">'确定'</span>,
            };
            <span class="hljs-keyword">return</span> modal;
        },
    },
},
</code></pre>
<p>这里定义了接口的参数，可以自定义标题、内容、是否显示按钮和按钮的样式，用一个computed来做参数默认值的控制。</p>
<h2 id="articleHeader3">模态框内部方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
    return {
        show: false,   // 是否显示模态框
        resolve: '',
        reject: '',
        promise: '',  // 保存promise对象
    };
},
methods: {
    /**
     * 确定,将promise断定为完成态
     */
    submit() {
        this.resolve('submit');
    },
    /**
     * 关闭,将promise断定为reject状态
     * @param type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
     */
    close(type) {
        this.show = false;
        this.reject(type);
    },
    /**
     * 显示confirm弹出,并创建promise对象
     * @returns {Promise}
     */
    confirm() {
        this.show = true;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        return this.promise;   //返回promise对象,给父级组件调用
    },
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
        show: <span class="hljs-literal">false</span>,   <span class="hljs-comment">// 是否显示模态框</span>
        resolve: <span class="hljs-string">''</span>,
        reject: <span class="hljs-string">''</span>,
        promise: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 保存promise对象</span>
    };
},
methods: {
    <span class="hljs-comment">/**
     * 确定,将promise断定为完成态
     */</span>
    submit() {
        <span class="hljs-keyword">this</span>.resolve(<span class="hljs-string">'submit'</span>);
    },
    <span class="hljs-comment">/**
     * 关闭,将promise断定为reject状态
     * <span class="hljs-doctag">@param</span> type {number} 关闭的方式 0表示关闭按钮关闭,1表示取消按钮关闭
     */</span>
    close(type) {
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.reject(type);
    },
    <span class="hljs-comment">/**
     * 显示confirm弹出,并创建promise对象
     * <span class="hljs-doctag">@returns</span> {Promise}
     */</span>
    confirm() {
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">this</span>.promise = new Promise((resolve, reject) =&gt; {
            <span class="hljs-keyword">this</span>.resolve = resolve;
            <span class="hljs-keyword">this</span>.reject = reject;
        });
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.promise;   <span class="hljs-comment">//返回promise对象,给父级组件调用</span>
    },
},
</code></pre>
<p>在模态框内部定义了三个方法，最核心部分confirm方法，这是一个定义在模态框内部，但是是给使用模态框的父级组件调用的方法，该方法返回的是一个promise对象，并将resolve和reject存放于modal组件的data中，点击取消按钮时，断定为reject状态，并将模态框关闭掉，点确定按钮时，断定为resolve状态，模态框没有关闭，由调用modal组件的父级组件的回调处理完成后手动控制关闭模态框。</p>
<h2 id="articleHeader4">调用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- template -->
<confirm v-ref:dialog :modal-options.sync=&quot;modal&quot;></confirm>
<!-- methods -->
this.$refs.dialog.confirm().then(() => {
    // 点击确定按钮的回调处理
    callback();
    this.$refs.dialog.show = false; 
}).catch(() => {
    // 点击取消按钮的回调处理
    callback();
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- template --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">confirm</span> <span class="hljs-attr">v-ref:dialog</span> <span class="hljs-attr">:modal-options.sync</span>=<span class="hljs-string">"modal"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">confirm</span>&gt;</span>
<span class="hljs-comment">&lt;!-- methods --&gt;</span>
this.$refs.dialog.confirm().then(() =&gt; {
    // 点击确定按钮的回调处理
    callback();
    this.$refs.dialog.show = false; 
}).catch(() =&gt; {
    // 点击取消按钮的回调处理
    callback();
});
</code></pre>
<p>用<a href="http://cn.vuejs.org/api/#v-ref" rel="nofollow noreferrer" target="_blank">v-ref</a>创建一个索引,就很方便拿到模态框组件内部的方法了。这样一个模态框组件就完成了。</p>
<h2 id="articleHeader5">其他实现方法</h2>
<p>在模态框组件中，比较难实现的应该是点击确定和取消按钮时，父级的回调处理，我在做这个组件时，也参考了一些其实实现方案。</p>
<h3 id="articleHeader6">使用事件转发</h3>
<p>这个方法是我的同事实现的，用在上一个项目，采用的是$dispatch和$broadcast来派发或广播事件。</p>
<p>首先在根组件接收dispatch过来的transmit事件，再将transmit事件传递过来的eventName广播下去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="events: {
    /**
     * 转发事件
     * @param  {string} eventName 事件名称
     * @param  {object} arg       事件参数
     * @return {null}
     */
    'transmit': function (eventName, arg) {
        this.$broadcast(eventName, arg);
    }
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>events: {
    <span class="hljs-comment">/**
     * 转发事件
     * <span class="hljs-doctag">@param</span>  {string} eventName 事件名称
     * <span class="hljs-doctag">@param</span>  {object} arg       事件参数
     * <span class="hljs-doctag">@return</span> {null}
     */</span>
    <span class="hljs-string">'transmit'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(eventName, arg)</span> </span>{
        this.$broadcast(eventName, arg);
    }
},
</code></pre>
<p>其次是模态框组件内部接收从父级组件传递过来的确定和取消按钮所触发的事件名，点击取消和确定按钮的时候触发</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接收事件，获得需要取消和确定按钮的事件名
events: {
    'tip': function(obj) {
        this.events = {
            cancel: obj.events.cancel,
            confirm: obj.events.confirm
        }
    }
}
// 取消按钮
cancel：function() {
    this.$dispatch('transmit',this.events.cancel);
}
// 确定按钮
submit: function() {
    this.$dispatch('transmit',this.events.submit);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 接收事件，获得需要取消和确定按钮的事件名</span>
events: {
    <span class="hljs-string">'tip'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(obj)</span> </span>{
        <span class="hljs-keyword">this</span>.events = {
            cancel: obj.events.cancel,
            confirm: obj.events.confirm
        }
    }
}
<span class="hljs-comment">// 取消按钮</span>
cancel：<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">'transmit'</span>,<span class="hljs-keyword">this</span>.events.cancel);
}
<span class="hljs-comment">// 确定按钮</span>
submit: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">'transmit'</span>,<span class="hljs-keyword">this</span>.events.submit);
}
</code></pre>
<p>在父级组件中调用模态框如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$dispatch('transmit','tip',{
    events: {
        confirm: 'confirmEvent'
    }
});
this.$once('confirmEvent',function() {
    callback();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>this.$dispatch(<span class="hljs-string">'transmit'</span>,<span class="hljs-string">'tip'</span>,{
    events: {
        confirm: <span class="hljs-string">'confirmEvent'</span>
    }
});
this.$once(<span class="hljs-string">'confirmEvent'</span>,<span class="hljs-keyword">function</span>() {
    callback();
}
</code></pre>
<p>先是传递tip事件，将事件名传递给模态框，再用$once监听确定或取消按钮所触发的事件，事件触发后进行回调。</p>
<p>这种方法看起来是不是很晕？所以vue 2.0取消了$dispatch和$broadcast，我们在最近的项目中虽然还在用1.0，但是也不再用$dispatch和$broadcast，方便以后的升级。</p>
<h3 id="articleHeader7">使用emit来触发</h3>
<p>这种方法来自<a href="https://github.com/Coffcer/vue-bootstrap-modal" rel="nofollow noreferrer" target="_blank">vue-bootstrap-modal</a>,点击取消和确定按钮的时候分别emit一个事件，直接在组件上监听这个事件，这种做法的好处是事件比较容易追踪。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 确定按钮
ok () {
    this.$emit('ok');
    if (this.closeWhenOK) {
        this.show = false;
    }
},
// 取消按钮
cancel () {
    this.$emit('cancel');
    this.show = false;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 确定按钮</span>
ok () {
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'ok'</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.closeWhenOK) {
        <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
    }
},
<span class="hljs-comment">// 取消按钮</span>
cancel () {
    <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'cancel'</span>);
    <span class="hljs-keyword">this</span>.show = <span class="hljs-literal">false</span>;
},
</code></pre>
<p>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<modal title=&quot;Modal Title&quot; :show.sync=&quot;show&quot; @ok=&quot;ok&quot; @cancel=&quot;cancel&quot;>
    Modal Text
</modal>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>&lt;modal title=<span class="hljs-string">"Modal Title"</span> :show.<span class="hljs-keyword">sync</span>=<span class="hljs-string">"show"</span> <span class="hljs-meta">@ok</span>=<span class="hljs-string">"ok"</span> <span class="hljs-meta">@cancel</span>=<span class="hljs-string">"cancel"</span>&gt;
    Modal Text
&lt;/modal&gt;
</code></pre>
<p>但是我们在使用的时候经常会遇到这样的场景，在一个组件的内部，经常会用到多个对话框，对话框可能只是文字有点区别，回调不同，这时就需要在template中为每个对话框都写一次&lt;modal&gt;&lt;/modal&gt;，有点麻烦。不想每次写，可以用v-for来遍历，这篇文章<a href="https://segmentfault.com/a/1190000006849814">关于 vue 弹窗组件的一些感想</a>有我与作者的讨论，可以参考一下。</p>
<h2 id="articleHeader8">参考资料</h2>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000005132807" target="_blank">vue.js dynamic create nest modal</a></p></li>
<li><p><a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">es6 Promise对象</a></p></li>
<li><p><a href="https://github.com/Coffcer/vue-bootstrap-modal" rel="nofollow noreferrer" target="_blank">vue-bootstrap-modal</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006849814">关于 vue 弹窗组件的一些感想</a></p></li>
</ul>
<p>照例放张公众号的二维码,欢迎关注：</p>
<p><span class="img-wrap"><img data-src="/img/bVCJ55?w=430&amp;h=430" src="https://static.alili.tech/img/bVCJ55?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue实现模态框组件

## 原文链接
[https://segmentfault.com/a/1190000006971054](https://segmentfault.com/a/1190000006971054)

