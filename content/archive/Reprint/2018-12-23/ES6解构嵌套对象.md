---
title: 'ES6解构嵌套对象' 
date: 2018-12-23 2:30:07
hidden: true
slug: uszuatag488
categories: [reprint]
---

{{< raw >}}

                    
<p>让我们先回忆一下ES6的对象解构，本文介绍各种ES6的对象解构用法，你用过哪一种？</p>
<h3 id="articleHeader0">最基本的解构</h3>
<p>在对象中提取某个字段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};
const {name} = user;
console.log(name); //prints: hehe" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};
<span class="hljs-keyword">const</span> {name} = user;
<span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">//prints: hehe</span></code></pre>
<h3 id="articleHeader1">解构并使用别名</h3>
<p>有时接口定义的字段往往带有下划线，但我们的前端更便好于驼峰式命名，那么可以使用别名(rename)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  nick_name: 'hehe'
};
const {nick_name: nickName} = user;
console.log(nickName); //prints: hehe" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">nick_name</span>: <span class="hljs-string">'hehe'</span>
};
<span class="hljs-keyword">const</span> {<span class="hljs-attr">nick_name</span>: nickName} = user;
<span class="hljs-built_in">console</span>.log(nickName); <span class="hljs-comment">//prints: hehe</span></code></pre>
<h3 id="articleHeader2">解构嵌套对象</h3>
<p>有时我们会遇到嵌套对象，如果我们了解未足够多时，会写出这种解构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe',
  education: {
    degree: 'Masters'
  }
};

// 假设我们要提取degree
const {education} = user;
const {degree} = education;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>,
  <span class="hljs-attr">education</span>: {
    <span class="hljs-attr">degree</span>: <span class="hljs-string">'Masters'</span>
  }
};

<span class="hljs-comment">// 假设我们要提取degree</span>
<span class="hljs-keyword">const</span> {education} = user;
<span class="hljs-keyword">const</span> {degree} = education;
</code></pre>
<p>我们会写两行，一层层的剥开，明显繁琐，如果这个对象有三四层结构那简直无法入目。其实可以用解构一步到位的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe',
  education: {
    degree: 'Masters'
  }
};
const {education: {degree"}}" = user;
console.log(degree); //prints: Masters" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>,
  <span class="hljs-attr">education</span>: {
    <span class="hljs-attr">degree</span>: <span class="hljs-string">'Masters'</span>
  }
};
<span class="hljs-keyword">const</span> {<span class="hljs-attr">education</span>: {degree"}}" = user;
<span class="hljs-built_in">console</span>.log(degree); <span class="hljs-comment">//prints: Masters</span></code></pre>
<p>没错，就是比别名方法多了一个{ }</p>
<h3 id="articleHeader3">如果没有外层怎么办</h3>
<p>假设要解构的数据是由接口返回的，由于某种原因会导致某个字段丢失。我们会往往遇到这种意外：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};
const {education: {degree"}}" = user;  // TypeError: Cannot match against 'undefined' or 'null'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};
<span class="hljs-keyword">const</span> {<span class="hljs-attr">education</span>: {degree"}}" = user;  <span class="hljs-comment">// TypeError: Cannot match against 'undefined' or 'null'.</span></code></pre>
<p>这时你是否会觉得还是我们原始的方法好使：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const education = user || {};
const degree = education.degree;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> education = user || {};
<span class="hljs-keyword">const</span> degree = education.degree;</code></pre>
<p>其实，神奇的解构可以让你定义一个缺省值，这样，我们不仅可以达到数据防御的目的，而且告别啰嗦的写法了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};

const {
    education: {
        degree
    } = {}
} = user;
console.log(degree); //prints: undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};

<span class="hljs-keyword">const</span> {
    <span class="hljs-attr">education</span>: {
        degree
    } = {}
} = user;
<span class="hljs-built_in">console</span>.log(degree); <span class="hljs-comment">//prints: undefined</span></code></pre>
<p>这明显是一股清流啊。</p>
<h3 id="articleHeader4">更深层次的对象怎么办？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};

const {
    education: {
        school: {
            name
        }
    } = {}
} = user;  // TypeError: Cannot match against 'undefined' or 'null'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};

<span class="hljs-keyword">const</span> {
    <span class="hljs-attr">education</span>: {
        <span class="hljs-attr">school</span>: {
            name
        }
    } = {}
} = user;  <span class="hljs-comment">// TypeError: Cannot match against 'undefined' or 'null'.</span></code></pre>
<p>这里外层对education设置缺省值，但里面的school不存在，依然会报错。  <br>我们第一种办法就是继续对school设置缺省值为{}：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};
const {
    education: {
        school: {
            name
        } = {}
    } = {}
} = user;
console.log(name); //prints: undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};
<span class="hljs-keyword">const</span> {
    <span class="hljs-attr">education</span>: {
        <span class="hljs-attr">school</span>: {
            name
        } = {}
    } = {}
} = user;
<span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">//prints: undefined</span></code></pre>
<p>另一种办法就是直接给education缺省值设置为{school: {"}}"：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};
const {
    education: {
        school: {
            name
        }
    } = {school: {"}}"
} = user;
console.log(name); //prints: undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};
<span class="hljs-keyword">const</span> {
    <span class="hljs-attr">education</span>: {
        <span class="hljs-attr">school</span>: {
            name
        }
    } = {<span class="hljs-attr">school</span>: {"}}"
} = user;
<span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">//prints: undefined</span></code></pre>
<p>这两种方法看似都可以，但如果要给学校名称school.name一个缺省值呢？如果是第一种方法，会写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};
const {
    education: {
        school: {
            name = 'NB'
        } = {}
    } = {}
} = user;
console.log(name); //prints: NB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};
<span class="hljs-keyword">const</span> {
    <span class="hljs-attr">education</span>: {
        <span class="hljs-attr">school</span>: {
            name = <span class="hljs-string">'NB'</span>
        } = {}
    } = {}
} = user;
<span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">//prints: NB</span></code></pre>
<p>你数数看，这有多少个“=”号吗？啰嗦得不行，再看第二种方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {
  id: 123,
  name: 'hehe'
};
const {
    education: {
        school: {
            name
        }
    } = {
        school: {
            name: 'NB'
        }
    }
} = user;
console.log(name); //prints: NB" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> user = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hehe'</span>
};
<span class="hljs-keyword">const</span> {
    <span class="hljs-attr">education</span>: {
        <span class="hljs-attr">school</span>: {
            name
        }
    } = {
        <span class="hljs-attr">school</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'NB'</span>
        }
    }
} = user;
<span class="hljs-built_in">console</span>.log(name); <span class="hljs-comment">//prints: NB</span></code></pre>
<p>这样整体给education设置一个缺省值，可读性更强，这又是一股清流。  <br>在代码中灵活使用解构不仅可以使代码简洁可读，而且逼格大大提升。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6解构嵌套对象

## 原文链接
[https://segmentfault.com/a/1190000012280806](https://segmentfault.com/a/1190000012280806)

