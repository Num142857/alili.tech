---
title: '发布 ng-alain 1.0.0 正式版' 
date: 2018-11-30 2:30:12
hidden: true
slug: f6k92ajjav
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://ng.ant.design/" rel="nofollow noreferrer" target="_blank">ng-zorro-antd</a> 0.7.0 发布时我就想说那得喝一杯，这个版本的等待其实在社区里反应是有点“忐忑”，所以当VTHINK跟我说来今天要发布 0.7 时我说那晚上得喝一杯。然而，为了将 ng-alain 也同步 0.7 一个晚上都在忙碌；直到倒头睡觉把喝一杯的事已经忘光了。</p>
<p>当然，今天也算是个不错的日子，ng-alain 也发布了 1.0.0 正式版。</p>
<p>从 0.8 到 1.0 并没有做了很多新的东西，一直以让开发者更加专注于业务的角度做了一些重构、抽离、测试等工作。</p>
<p>Angular6 发布没多久，带来了一些很酷的操作。当然 ng-alain 起点也比较激进，几乎总是第一时间保持 Angular 和 zorro 版本的同步。</p>
<p>在 1.0 里我们是这么开始 ng-alain 的……</p>
<h2 id="articleHeader0">如何开发</h2>
<p>1、需要一个空 Angular 项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng new myapp --style less" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng new myapp --style less</code></pre>
<p>2、加点料</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng add ng-alain" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng add ng-alain</code></pre>
<blockquote>更多细节参考<a href="https://ng-alain.com/docs/cli" rel="nofollow noreferrer" target="_blank">命令行工具</a>
</blockquote>
<p>是的，没有了，就这么简单。这一切都归于 Angular cli 的开放，早先 ng-alain 就提供一个叫 <code>@delon/cli</code> 的类库，其实二者在做的是同一件事。</p>
<p>当然，还可以做更多很酷的事，例如大部分情况下对中后台的列表都是比较常规的搜索加表格形式，而在 ng-alain 里可以生成一些比较通用列表页：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng generate ng-alain:list list
# 不介意再来一个编辑和查看页
ng generate ng-alain:edit edit
ng generate ng-alain:view view" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">ng generate ng-alain:list list
<span class="hljs-comment"># 不介意再来一个编辑和查看页</span>
ng generate ng-alain:edit edit
ng generate ng-alain:view view</code></pre>
<p>恩，好像有点烦，要不这样好了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng generate ng-alain:curd order" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng generate ng-alain:curd order</code></pre>
<h2 id="articleHeader1">新类库</h2>
<h3 id="articleHeader2">@delon/form</h3>
<p>ng-alain 最早的使用者们提出了一个蛮有价值的基于 JSON Schema 动态表单库，因此在另外几个人的帮忙下开发了 <a href="https://github.com/cipchk/nz-schema-form" rel="nofollow noreferrer" target="_blank">nz-schema-form</a>，非常仓促的在 <a href="https://github.com/makinacorpus/angular2-schema-form" rel="nofollow noreferrer" target="_blank">angular2-schema-form</a> 基础上引入 zorro 组件库，大体还是蛮好用的，只不过数据流混乱、标准的 JSON Schema 携带非标准的属性。</p>
<p>花了很长的时间重新开发并正式成为 @delon 系列库中的一员：<a href="https://ng-alain.com/form" rel="nofollow noreferrer" target="_blank">@delon/form</a>，构建一个表单只需这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: 'app-demo',
  template: `<sf [schema]=&quot;schema&quot; (formSubmit)=&quot;submit($event)&quot;
  (formChange)=&quot;change($event)&quot;></sf>`
})
export class DemoComponent {
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string',
      },
      password: {
        type: 'string'
      },
    },
  };
  submit(value: {}) { }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-demo'</span>,
  template: <span class="hljs-string">`&lt;sf [schema]="schema" (formSubmit)="submit($event)"
  (formChange)="change($event)"&gt;&lt;/sf&gt;`</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {
  schema: SFSchema = {
    properties: {
      name: {
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'string'</span>,
      },
      password: {
        <span class="hljs-keyword">type</span>: <span class="hljs-string">'string'</span>
      },
    },
  };
  submit(value: {}) { }
}</code></pre>
<h3 id="articleHeader3">@delon/util</h3>
<p>有一天我们发现 ng-alain 的使用者，出现了些 <code>@delon/abc/src/util/</code> 开头的引入，这些工具集大部分单纯是服务于 <code>@delon/abc</code> 内部组件的，一开始就弱化了这一部分的文档。</p>
<p>于是，把它抽离成：<a href="https://ng-alain.com/util" rel="nofollow noreferrer" target="_blank">@delon/util</a>，并为此强化了部分函数，比如：字符串类 <code>format</code>、延迟加载等。</p>
<h2 id="articleHeader4">新的开始</h2>
<p>ng-alain 会开始放缓基建类库的迭代，而未来将更多的时间去挖掘 <code>ng generate</code> 发挥的能力，它可以让我们完成很多很酷的开发体验。</p>
<p>希望 ng-alain 真正做到【<strong>让开发者更加专注于业务</strong>】。</p>
<p>今夜一定会去喝一杯！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
发布 ng-alain 1.0.0 正式版

## 原文链接
[https://segmentfault.com/a/1190000014891244](https://segmentfault.com/a/1190000014891244)

