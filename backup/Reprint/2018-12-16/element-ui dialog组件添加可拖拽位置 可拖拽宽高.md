---
title: 'element-ui dialog组件添加可拖拽位置 可拖拽宽高' 
date: 2018-12-16 2:30:10
hidden: true
slug: 50b2gs66eay
categories: [reprint]
---

{{< raw >}}

                    
<p>最近公司新加需求, 实现弹窗可拖拽, 还要拖拽宽高变化.</p>
<p><strong>国际惯例先上图</strong>:</p>
<p>edge浏览器下作的gif<br><a href="http://www.lanourteam.com/%E6%A1%8C%E9%9D%A2.gif" rel="nofollow noreferrer" target="_blank">http://www.lanourteam.com/%E6...</a></p>
<p>有几个点需要注意一下</p>
<ul>
<li>每个弹窗都要有唯一dom可操作 指令可以做到</li>
<li>拖拽时要添加可拖拽区块 header</li>
<li>由于element-ui dialog组件在设计时宽度用了百分比, 这里不同浏览器有兼容性问题</li>
<li>实现拖拽宽高时 获取边缘问题 div定位 设置模拟边缘</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <el-dialog
        v-dialogDrag
        ref=&quot;dialog__wrapper&quot;>
        <div class=&quot;dialog-body&quot;>
            
            <div 
                class=&quot;line&quot;
                v-dialogDragWidth=&quot;$refs.dialog__wrapper&quot;></div>
        </div>
    </el-dialog>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span>
        <span class="hljs-attr">v-dialogDrag</span>
        <span class="hljs-attr">ref</span>=<span class="hljs-string">"dialog__wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-body"</span>&gt;</span>
            
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> 
                <span class="hljs-attr">class</span>=<span class="hljs-string">"line"</span>
                <span class="hljs-attr">v-dialogDragWidth</span>=<span class="hljs-string">"$refs.dialog__wrapper"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>dialog组件的其它属性这里就不写了. 项目中的指令都定义directives.js中集中管理, 全局注册.<br>directives.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header');
        const dragDom = el.querySelector('.el-dialog');
        dialogHeaderEl.style.cursor = 'move';

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        
        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft;
            const disY = e.clientY - dialogHeaderEl.offsetTop;
            
            // 获取到的值带px 正则匹配替换
            let styL, styT;

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if(sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
                styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
            }else {
                styL = +sty.left.replace(/\px/g, '');
                styT = +sty.top.replace(/\px/g, '');
            };
            
            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                const t = e.clientY - disY;

                // 移动当前元素  
                dragDom.style.left = `${l + styL}px`;
                dragDom.style.top = `${t + styT}px`;

                //将此时的位置传出去
                //binding.value({x:e.pageX,y:e.pageY})
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})

// v-dialogDragWidth: 弹窗宽度拖大 拖小
Vue.directive('dialogDragWidth', {
    bind(el, binding, vnode, oldVnode) {
        const dragDom = binding.value.$el.querySelector('.el-dialog');

        el.onmousedown = (e) => {
            
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - el.offsetLeft;
            
            document.onmousemove = function (e) {
                e.preventDefault(); // 移动时禁用默认事件

                // 通过事件委托，计算移动的距离 
                const l = e.clientX - disX;
                dragDom.style.width = `${l}px`;
            };

            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }  
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

<span class="hljs-comment">// v-dialogDrag: 弹窗拖拽</span>
Vue.directive(<span class="hljs-string">'dialogDrag'</span>, {
    bind(el, binding, vnode, oldVnode) {
        <span class="hljs-keyword">const</span> dialogHeaderEl = el.querySelector(<span class="hljs-string">'.el-dialog__header'</span>);
        <span class="hljs-keyword">const</span> dragDom = el.querySelector(<span class="hljs-string">'.el-dialog'</span>);
        dialogHeaderEl.style.cursor = <span class="hljs-string">'move'</span>;

        <span class="hljs-comment">// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);</span>
        <span class="hljs-keyword">const</span> sty = dragDom.currentStyle || <span class="hljs-built_in">window</span>.getComputedStyle(dragDom, <span class="hljs-literal">null</span>);
        
        dialogHeaderEl.onmousedown = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
            <span class="hljs-comment">// 鼠标按下，计算当前元素距离可视区的距离</span>
            <span class="hljs-keyword">const</span> disX = e.clientX - dialogHeaderEl.offsetLeft;
            <span class="hljs-keyword">const</span> disY = e.clientY - dialogHeaderEl.offsetTop;
            
            <span class="hljs-comment">// 获取到的值带px 正则匹配替换</span>
            <span class="hljs-keyword">let</span> styL, styT;

            <span class="hljs-comment">// 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px</span>
            <span class="hljs-keyword">if</span>(sty.left.includes(<span class="hljs-string">'%'</span>)) {
                styL = +<span class="hljs-built_in">document</span>.body.clientWidth * (+sty.left.replace(<span class="hljs-regexp">/\%/g</span>, <span class="hljs-string">''</span>) / <span class="hljs-number">100</span>);
                styT = +<span class="hljs-built_in">document</span>.body.clientHeight * (+sty.top.replace(<span class="hljs-regexp">/\%/g</span>, <span class="hljs-string">''</span>) / <span class="hljs-number">100</span>);
            }<span class="hljs-keyword">else</span> {
                styL = +sty.left.replace(<span class="hljs-regexp">/\px/g</span>, <span class="hljs-string">''</span>);
                styT = +sty.top.replace(<span class="hljs-regexp">/\px/g</span>, <span class="hljs-string">''</span>);
            };
            
            <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-comment">// 通过事件委托，计算移动的距离 </span>
                <span class="hljs-keyword">const</span> l = e.clientX - disX;
                <span class="hljs-keyword">const</span> t = e.clientY - disY;

                <span class="hljs-comment">// 移动当前元素  </span>
                dragDom.style.left = <span class="hljs-string">`<span class="hljs-subst">${l + styL}</span>px`</span>;
                dragDom.style.top = <span class="hljs-string">`<span class="hljs-subst">${t + styT}</span>px`</span>;

                <span class="hljs-comment">//将此时的位置传出去</span>
                <span class="hljs-comment">//binding.value({x:e.pageX,y:e.pageY})</span>
            };

            <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;
                <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
            };
        }  
    }
})

<span class="hljs-comment">// v-dialogDragWidth: 弹窗宽度拖大 拖小</span>
Vue.directive(<span class="hljs-string">'dialogDragWidth'</span>, {
    bind(el, binding, vnode, oldVnode) {
        <span class="hljs-keyword">const</span> dragDom = binding.value.$el.querySelector(<span class="hljs-string">'.el-dialog'</span>);

        el.onmousedown = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
            
            <span class="hljs-comment">// 鼠标按下，计算当前元素距离可视区的距离</span>
            <span class="hljs-keyword">const</span> disX = e.clientX - el.offsetLeft;
            
            <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                e.preventDefault(); <span class="hljs-comment">// 移动时禁用默认事件</span>

                <span class="hljs-comment">// 通过事件委托，计算移动的距离 </span>
                <span class="hljs-keyword">const</span> l = e.clientX - disX;
                dragDom.style.width = <span class="hljs-string">`<span class="hljs-subst">${l}</span>px`</span>;
            };

            <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-built_in">document</span>.onmousemove = <span class="hljs-literal">null</span>;
                <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
            };
        }  
    }
})</code></pre>
<p><strong>main.js:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入自定义指令
import './directives.js';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 引入自定义指令</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> './directives.js';</span></code></pre>
<p>这样便实现了需求功能.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
element-ui dialog组件添加可拖拽位置 可拖拽宽高

## 原文链接
[https://segmentfault.com/a/1190000012940145](https://segmentfault.com/a/1190000012940145)

