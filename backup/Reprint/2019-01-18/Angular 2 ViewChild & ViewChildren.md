---
title: 'Angular 2 ViewChild & ViewChildren' 
date: 2019-01-18 2:30:35
hidden: true
slug: 3fe6ru82bbb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<h3 id="articleHeader0">ViewChild</h3>
<p>ViewChild 是属性装饰器，用来从模板视图中获取匹配的元素。视图查询在 ngAfterViewInit 钩子函数调用前完成，因此在 ngAfterViewInit 钩子函数中，就能正确获取查询的元素。</p>
<p><strong>@ViewChild 使用模板变量名</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <p #greet>Hello "{{" name "}}"</p>
  `,
})
export class AppComponent {
  name: string = 'Semlinker';

  @ViewChild('greet')
  greetDiv: ElementRef;

  ngAfterViewInit() {
    console.dir(this.greetDiv);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, ElementRef, ViewChild, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h1&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h1&gt;
    &lt;p #greet&gt;Hello "{{" name "}}"&lt;/</span>p&gt;
  </span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>
  name: string = <span class="hljs-string">'Semlinker'</span>;

  @ViewChild(<span class="hljs-string">'greet'</span>)
  greetDiv: ElementRef;

  ngAfterViewInit() {
    <span class="hljs-built_in">console</span>.dir(<span class="hljs-keyword">this</span>.greetDiv);
  }
}
</code></pre>
<p><strong>@ViewChild 使用模板变量名及设置查询条件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <template #tpl>
      <span>I am span in template</span>
    </template>
  `,
})
export class AppComponent {

  @ViewChild('tpl')
  tplRef: TemplateRef<any>;

  @ViewChild('tpl', { read: ViewContainerRef })
  tplVcRef: ViewContainerRef;

  ngAfterViewInit() {
    console.dir(this.tplVcRef);
    this.tplVcRef.createEmbeddedView(this.tplRef);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h1&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h1&gt;
    &lt;template #tpl&gt;
      &lt;span&gt;I am span in template&lt;/</span>span&gt;
    <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
  </span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>

  @ViewChild(<span class="hljs-string">'tpl'</span>)
  tplRef: TemplateRef&lt;any&gt;;

  @ViewChild(<span class="hljs-string">'tpl'</span>, { read: ViewContainerRef })
  tplVcRef: ViewContainerRef;

  ngAfterViewInit() {
    <span class="hljs-built_in">console</span>.dir(<span class="hljs-keyword">this</span>.tplVcRef);
    <span class="hljs-keyword">this</span>.tplVcRef.createEmbeddedView(<span class="hljs-keyword">this</span>.tplRef);
  }
}
</code></pre>
<p><strong>@ViewChild 使用类型查询</strong></p>
<p>child.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'exe-child',
    template: `
      <p>Child Component</p>  
    `
})
export class ChildComponent {
    name: string = 'child-component';
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
    selector: <span class="hljs-string">'exe-child'</span>,
    template: `<span class="javascript">
      &lt;p&gt;Child Component&lt;<span class="hljs-regexp">/p&gt;  
    </span></span>`
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChildComponent</span> {</span>
    name: string = <span class="hljs-string">'child-component'</span>;
}
</code></pre>
<p>app.component.ts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'my-app',
  template: `
    <h4>Welcome to Angular World</h4>
    <exe-child></exe-child>
  `,
})
export class AppComponent {

  @ViewChild(ChildComponent)
  childCmp: ChildComponent;

  ngAfterViewInit() {
    console.dir(this.childCmp);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, ViewChild, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { ChildComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./child.component'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h4&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h4&gt;
    &lt;exe-child&gt;&lt;/</span>exe-child&gt;
  </span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>

  @ViewChild(ChildComponent)
  childCmp: ChildComponent;

  ngAfterViewInit() {
    <span class="hljs-built_in">console</span>.dir(<span class="hljs-keyword">this</span>.childCmp);
  }
}
</code></pre>
<p>以上代码运行后，控制台的输出结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVKEeC?w=568&amp;h=115" src="https://static.alili.tech/img/bVKEeC?w=568&amp;h=115" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">ViewChildren</h3>
<p>ViewChildren 用来从模板视图中获取匹配的多个元素，返回的结果是一个 QueryList 集合。</p>
<p><strong>@ViewChildren 使用类型查询</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'my-app',
  template: `
    <h4>Welcome to Angular World</h4>
    <exe-child></exe-child>
    <exe-child></exe-child>
  `,
})
export class AppComponent {

  @ViewChildren(ChildComponent)
  childCmps: QueryList<ChildComponent>;

  ngAfterViewInit() {
    console.dir(this.childCmps);
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, ViewChildren, QueryList, AfterViewInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { ChildComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./child.component'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h4&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h4&gt;
    &lt;exe-child&gt;&lt;/</span>exe-child&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">exe-child</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">exe-child</span>&gt;</span>
  </span></span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>

  @ViewChildren(ChildComponent)
  childCmps: QueryList&lt;ChildComponent&gt;;

  ngAfterViewInit() {
    <span class="hljs-built_in">console</span>.dir(<span class="hljs-keyword">this</span>.childCmps);
  }
}
</code></pre>
<p>以上代码运行后，控制台的输出结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVKEeN?w=445&amp;h=148" src="https://static.alili.tech/img/bVKEeN?w=445&amp;h=148" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">ViewChild 详解</h3>
<p>@ViewChild 示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Welcome to Angular World</h1>
    <p #greet>Hello "{{" name "}}"</p>
  `,
})
export class AppComponent {
  name: string = 'Semlinker';
  @ViewChild('greet')
  greetDiv: ElementRef;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, ElementRef, ViewChild } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

@Component({
  selector: <span class="hljs-string">'my-app'</span>,
  template: `<span class="javascript">
    &lt;h1&gt;Welcome to Angular World&lt;<span class="hljs-regexp">/h1&gt;
    &lt;p #greet&gt;Hello "{{" name "}}"&lt;/</span>p&gt;
  </span>`,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> {</span>
  name: string = <span class="hljs-string">'Semlinker'</span>;
  @ViewChild(<span class="hljs-string">'greet'</span>)
  greetDiv: ElementRef;
}
</code></pre>
<p>编译后的 ES5 代码片段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var core_1 = require('@angular/core');

var AppComponent = (function () {
    function AppComponent() {
        this.name = 'Semlinker';
    }
    __decorate([
        core_1.ViewChild('greet'), // 设定selector为模板变量名
        __metadata('design:type', core_1.ElementRef)
], AppComponent.prototype, &quot;greetDiv&quot;, void 0);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> core_1 = <span class="hljs-built_in">require</span>(<span class="hljs-string">'@angular/core'</span>);

<span class="hljs-keyword">var</span> AppComponent = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">AppComponent</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'Semlinker'</span>;
    }
    __decorate([
        core_1.ViewChild(<span class="hljs-string">'greet'</span>), <span class="hljs-comment">// 设定selector为模板变量名</span>
        __metadata(<span class="hljs-string">'design:type'</span>, core_1.ElementRef)
], AppComponent.prototype, <span class="hljs-string">"greetDiv"</span>, <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>);
</code></pre>
<p>ViewChildDecorator 接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface ViewChildDecorator {
  // Type类型：@ViewChild(ChildComponent)
  // string类型：@ViewChild('tpl', { read: ViewContainerRef })
  (selector: Type<any>|Function|string, {read}?: {read?: any}): any;

  new (selector: Type<any>|Function|string, 
      {read}?: {read?: any}): ViewChild;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> ViewChildDecorator {
  <span class="hljs-comment">// Type类型：@ViewChild(ChildComponent)</span>
  <span class="hljs-comment">// string类型：@ViewChild('tpl', { read: ViewContainerRef })</span>
  (selector: Type&lt;<span class="hljs-built_in">any</span>&gt;|<span class="hljs-built_in">Function</span>|<span class="hljs-built_in">string</span>, {read}?: {read?: <span class="hljs-built_in">any</span>}): <span class="hljs-built_in">any</span>;

  <span class="hljs-keyword">new</span> (selector: Type&lt;<span class="hljs-built_in">any</span>&gt;|<span class="hljs-built_in">Function</span>|<span class="hljs-built_in">string</span>, 
      {read}?: {read?: <span class="hljs-built_in">any</span>}): ViewChild;
}
</code></pre>
<p>ViewChildDecorator</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const ViewChild: ViewChildDecorator = makePropDecorator(
    'ViewChild',
    [
      ['selector', undefined],
      {
        first: true,
        isViewQuery: true,
        descendants: true,
        read: undefined,
      }
    ],
Query);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">export</span> <span class="hljs-string">const</span> <span class="hljs-attr">ViewChild:</span> <span class="hljs-string">ViewChildDecorator</span> <span class="hljs-string">=</span> <span class="hljs-string">makePropDecorator(</span>
    <span class="hljs-string">'ViewChild'</span><span class="hljs-string">,</span>
    <span class="hljs-string">[</span>
      <span class="hljs-string">['selector',</span> <span class="hljs-string">undefined],</span>
      <span class="hljs-string">{</span>
<span class="hljs-attr">        first:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        isViewQuery:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        descendants:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        read:</span> <span class="hljs-string">undefined,</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">],</span>
<span class="hljs-string">Query);</span>
</code></pre>
<p>makePropDecorator函数片段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 创建PropDecorator工厂
 * 
 * 调用 makePropDecorator('ViewChild', [...]) 后返回ParamDecoratorFactory
 */
function makePropDecorator(name, props, parentClass) {
          // name: 'ViewChild'
          // props: [['selector', undefined], 
          //  { first: true, isViewQuery: true, descendants: true, read: undefined}]
  
          // 创建Metadata构造函数
        var metaCtor = makeMetadataCtor(props);
      
        function PropDecoratorFactory() {
            var args = [];
               ... // 转换arguments对象成args数组
            if (this instanceof PropDecoratorFactory) {
                metaCtor.apply(this, args);
                return this;
            }
            ...
            return function PropDecorator(target, name) {
                var meta = Reflect.getOwnMetadata('propMetadata', 
                    target.constructor) || {};
                meta[name] = meta.hasOwnProperty(name) &amp;&amp; meta[name] || [];
                meta[name].unshift(decoratorInstance);
                Reflect.defineMetadata('propMetadata', meta, target.constructor);
            };
            var _a;
        }
           if (parentClass) { // parentClass: Query
            PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
        }
          ...
        return PropDecoratorFactory;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">/*
 * 创建PropDecorator工厂
 * 
 * 调用 makePropDecorator('ViewChild', [...]) 后返回ParamDecoratorFactory
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makePropDecorator</span>(<span class="hljs-params">name, props, parentClass</span>) </span>{
          <span class="hljs-comment">// name: 'ViewChild'</span>
          <span class="hljs-comment">// props: [['selector', undefined], </span>
          <span class="hljs-comment">//  { first: true, isViewQuery: true, descendants: true, read: undefined}]</span>
  
          <span class="hljs-comment">// 创建Metadata构造函数</span>
        <span class="hljs-built_in">var</span> metaCtor = makeMetadataCtor(props);
      
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PropDecoratorFactory</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">var</span> args = [];
               ... <span class="hljs-comment">// 转换arguments对象成args数组</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> PropDecoratorFactory) {
                metaCtor.apply(<span class="hljs-keyword">this</span>, args);
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
            }
            ...
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">PropDecorator</span>(<span class="hljs-params">target, name</span>) </span>{
                <span class="hljs-built_in">var</span> meta = <span class="hljs-built_in">Reflect</span>.getOwnMetadata(<span class="hljs-string">'propMetadata'</span>, 
                    target.constructor) || {};
                meta[name] = meta.hasOwnProperty(name) &amp;&amp; meta[name] || [];
                meta[name].unshift(decoratorInstance);
                <span class="hljs-built_in">Reflect</span>.defineMetadata(<span class="hljs-string">'propMetadata'</span>, meta, target.constructor);
            };
            <span class="hljs-built_in">var</span> _a;
        }
           <span class="hljs-keyword">if</span> (parentClass) { <span class="hljs-comment">// parentClass: Query</span>
            PropDecoratorFactory.prototype = <span class="hljs-built_in">Object</span>.create(parentClass.prototype);
        }
          ...
        <span class="hljs-keyword">return</span> PropDecoratorFactory;
    }
</code></pre>
<p>makeMetadataCtor 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 生成Metadata构造函数: var metaCtor = makeMetadataCtor(props); 
// props: [['selector', undefined], 
// { first: true, isViewQuery: true, descendants: true, read: undefined }]
  function makeMetadataCtor(props) {
        // metaCtor.apply(this, args);
        return function ctor() {
            var _this = this;
            var args = [];
            ... // 转换arguments对象成args数组
            props.forEach(function (prop, i) { // prop: ['selector', undefined]
                var argVal = args[i]; 
                if (Array.isArray(prop)) { // argVal: 'greet'
                    _this[prop[0]] = argVal === undefined ? prop[1] : argVal;
                }
                else {
             // { first: true, isViewQuery: true, descendants: true, read: undefined }
             // 合并用户参数与默认参数，设置read属性值     
                    for (var propName in prop) { 
                        _this[propName] = 
                            argVal &amp;&amp; argVal.hasOwnProperty(propName) ? 
                          argVal[propName] : prop[propName];
                    }
                }
            });
        };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 生成Metadata构造函数: var metaCtor = makeMetadataCtor(props); </span>
<span class="hljs-comment">// props: [['selector', undefined], </span>
<span class="hljs-comment">// { first: true, isViewQuery: true, descendants: true, read: undefined }]</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeMetadataCtor</span>(<span class="hljs-params">props</span>) </span>{
        <span class="hljs-comment">// metaCtor.apply(this, args);</span>
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ctor</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">var</span> args = [];
            ... <span class="hljs-comment">// 转换arguments对象成args数组</span>
            props.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">prop, i</span>) </span>{ <span class="hljs-comment">// prop: ['selector', undefined]</span>
                <span class="hljs-keyword">var</span> argVal = args[i]; 
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(prop)) { <span class="hljs-comment">// argVal: 'greet'</span>
                    _this[prop[<span class="hljs-number">0</span>]] = argVal === <span class="hljs-literal">undefined</span> ? prop[<span class="hljs-number">1</span>] : argVal;
                }
                <span class="hljs-keyword">else</span> {
             <span class="hljs-comment">// { first: true, isViewQuery: true, descendants: true, read: undefined }</span>
             <span class="hljs-comment">// 合并用户参数与默认参数，设置read属性值     </span>
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> propName <span class="hljs-keyword">in</span> prop) { 
                        _this[propName] = 
                            argVal &amp;&amp; argVal.hasOwnProperty(propName) ? 
                          argVal[propName] : prop[propName];
                    }
                }
            });
        };
}
</code></pre>
<p>我们可以在控制台输入 window['__core-js_shared__'] ，查看通过 Reflect API 保存后的metadata信息</p>
<p><span class="img-wrap"><img data-src="/img/bVKEeT?w=604&amp;h=435" src="https://static.alili.tech/img/bVKEeT?w=604&amp;h=435" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接下来我们看一下编译后的 component.ngfactory.js  代码片段，查询条件 @ViewChild('greet')</p>
<p><span class="img-wrap"><img data-src="/img/bVKEe6?w=578&amp;h=188" src="https://static.alili.tech/img/bVKEe6?w=578&amp;h=188" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们再来看一下前面示例中，编译后 component.ngfactory.js 代码片段，查询条件分别为：</p>
<p>1.@ViewChild('tpl', { read: ViewContainerRef })</p>
<p><span class="img-wrap"><img data-src="/img/bVKEe8?w=665&amp;h=257" src="https://static.alili.tech/img/bVKEe8?w=665&amp;h=257" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2.@ViewChild(ChildComponent)</p>
<p><span class="img-wrap"><img data-src="/img/bVKEfc?w=635&amp;h=215" src="https://static.alili.tech/img/bVKEfc?w=635&amp;h=215" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>通过观察不同查询条件下，编译生成的 component.ngfactory.js 代码片段，我们发现 Angular 在创建 AppComponent 实例后，会自动调用 AppComponent 原型上的 createInternal 方法，才开始创建组件中元素，所以之前我们在构造函数中是获取不到通过 ViewChild 装饰器查询的视图元素。另外，配置的视图查询条件，默认都会创建一个 jit_QueryList 对象，然后根据 read 查询条件，创建对应的实例对象，然后添加至 QueryList 对象中，然后在导出对应的查询元素到组件对应的属性中。</p>
<h3 id="articleHeader3">总结</h3>
<p>ViewChild 装饰器用于获取模板视图中的元素，它支持 Type 类型或 string 类型的选择器，同时支持设置 read 查询条件，以获取不同类型的实例。而 ViewChildren 装饰器是用来从模板视图中获取匹配的多个元素，返回的结果是一个 QueryList 集合。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 2 ViewChild & ViewChildren

## 原文链接
[https://segmentfault.com/a/1190000008695459](https://segmentfault.com/a/1190000008695459)

