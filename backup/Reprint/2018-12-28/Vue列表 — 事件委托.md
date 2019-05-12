---
title: 'Vue列表 — 事件委托' 
date: 2018-12-28 2:30:10
hidden: true
slug: igkenm2gei
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>作为疯狂的操纵dom转到vue这样通过数据驱动的程序员来说，姿势的转换也自然产生了很多疑问。<br>比如，事件委托。<br>包括我看现在公司的前端代码，发现所有列表的绑定形式都是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
    <li v-for=&quot;(item, index) in data&quot; @click=&quot;handleClick(index)&quot;>
        Click Me
    </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in data"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleClick(index)"</span>&gt;</span>
        Click Me
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>然后这样的话，结果就是所有的li元素都绑定了事件。</p>
<p>比如下图就是一个失败案例</p>
<p><span class="img-wrap"><img data-src="/img/bVXftr?w=2614&amp;h=1156" src="https://static.alili.tech/img/bVXftr?w=2614&amp;h=1156" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>我们都知道，过多的事件对于<code>性能</code>来说是很糟糕的，尤其在移动端，可以说是无法容忍。</strong></p>
<h2 id="articleHeader1">解决方案</h2>
<p>直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <div id=&quot;app&quot;>
    <my-component></my-component>
  </div>
  
  <script src=&quot;./vue.js&quot;></script>
  <script>
    let component = {
      template: `
        <ul @click=&quot;handleClick&quot;>
          <li v-for=&quot;(item, index) in data&quot; :data-index=&quot;index&quot;>
            "{{" item.text "}}"
          </li>
        </ul>
      `,
      data() {
        return {
          data: [
            {
              id: 0,
              text: '0',
            },
            {
              id: 1,
              text: '1',
            },
            {
              id: 2,
              text: '2',
            }
          ]
        }
      },
      methods: {
        handleClick(e) {
          // 多谢 `@微醺岁月` 提醒，要过滤掉ul，不然会出问题
          if (e.target.nodeName.toLowerCase() === 'li') {
            const index = parseInt(e.target.dataset.index)
            // 获得引索后，只需要修改data数据就能改变UI了
            this.doSomething(index)
          }
        },
        doSomething(index) {
          // do what you want
          alert(index)
        }
      }
    }

    new Vue({
      el: '#app',
      components: {
        'my-component': component
      }
    })
  </script>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    let component = {
      template: `
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleClick"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in data"</span> <span class="hljs-attr">:data-index</span>=<span class="hljs-string">"index"</span>&gt;</span>
            </span></span></span><span class="hljs-template-variable">"{{" item.text "}}"</span><span class="xml"><span class="actionscript">
          &lt;/li&gt;
        &lt;/ul&gt;
      `,
      data() {
        <span class="hljs-keyword">return</span> {
          data: [
            {
              id: <span class="hljs-number">0</span>,
              text: <span class="hljs-string">'0'</span>,
            },
            {
              id: <span class="hljs-number">1</span>,
              text: <span class="hljs-string">'1'</span>,
            },
            {
              id: <span class="hljs-number">2</span>,
              text: <span class="hljs-string">'2'</span>,
            }
          ]
        }
      },
      methods: {
        handleClick(e) {
          <span class="hljs-comment">// 多谢 `@微醺岁月` 提醒，要过滤掉ul，不然会出问题</span>
          <span class="hljs-keyword">if</span> (e.target.nodeName.toLowerCase() === <span class="hljs-string">'li'</span>) {
            <span class="hljs-keyword">const</span> index = parseInt(e.target.dataset.index)
            <span class="hljs-comment">// 获得引索后，只需要修改data数据就能改变UI了</span>
            <span class="hljs-keyword">this</span>.doSomething(index)
          }
        },
        doSomething(index) {
          <span class="hljs-comment">// do what you want</span>
          alert(index)
        }
      }
    }

    <span class="hljs-keyword">new</span> Vue({
      el: <span class="hljs-string">'#app'</span>,
      components: {
        <span class="hljs-string">'my-component'</span>: component
      }
    })
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span></code></pre>
<p>通过在li元素中额外加一个<code>data-index</code>就可以实现委托啦~</p>
<p>最后，让我们再看一下结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVXfxa?w=2182&amp;h=726" src="https://static.alili.tech/img/bVXfxa?w=2182&amp;h=726" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue列表 — 事件委托

## 原文链接
[https://segmentfault.com/a/1190000011698763](https://segmentfault.com/a/1190000011698763)

