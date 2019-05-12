---
title: '[算法] 电话号码分身 （小米2017 秋招真题）[JavaScript]' 
date: 2018-12-31 2:30:30
hidden: true
slug: y3nfjf4a2do
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p><strong>题目描述</strong></p>
<p>继MIUI8推出手机分身功能，MIUI计划推出一个电话号码分身得功能：首先将电话号码中的每个数字加上8取个位，然后使用对应得大写字母代替 ("ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"), 然后随机打乱这些字母，所生成得字符串即为电话号码对应得分身。</p>
<p>例子: <br>输入 =&gt; 输出<br>EIGHT =&gt; 0<br>ZEROTWOONE =&gt; 234<br>OHWETENRTEO =&gt; 345<br>OHEWTIEGTHENRTEO =&gt; 0345</p>
</blockquote>
<p>这道题是输入一个字符串，映射到一个数字串。<br>映射题我的习惯是先尝试用字典的方式做，那么接下来开始做这道题：</p>
<p>10个数字与其英文单词一一对应，那么这些词能不能做些文章呢？</p>
<p>我们可以发现，在这十个数字的英文单词中，字符 <code>Z</code> 只存在于 <code>ZERO</code>，<code>W</code> 只存在于 <code>TWO</code>，以此类推。<br>所以现在一旦在字符串中发现 <code>Z</code>，我们就可以说存在 <code>0</code>。<br>我们在这里把 <code>Z</code> 称作 <code>特征字符</code>, <code>ZERO</code> 称作 <code>字符值</code>, <code>0</code> 称为 <code>数字值</code><br>那么，我们可以得到一组映射:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
    Z: ['ZERO', 0],
    W: ['TWO', 2],
    U: ['FOUR', 4],
    X: ['SIX', 6],
    G: ['EIGHT', 8]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
{
    <span class="hljs-attr">Z</span>: [<span class="hljs-string">'ZERO'</span>, <span class="hljs-number">0</span>],
    <span class="hljs-attr">W</span>: [<span class="hljs-string">'TWO'</span>, <span class="hljs-number">2</span>],
    <span class="hljs-attr">U</span>: [<span class="hljs-string">'FOUR'</span>, <span class="hljs-number">4</span>],
    <span class="hljs-attr">X</span>: [<span class="hljs-string">'SIX'</span>, <span class="hljs-number">6</span>],
    <span class="hljs-attr">G</span>: [<span class="hljs-string">'EIGHT'</span>, <span class="hljs-number">8</span>]
}
</code></pre>
<p>因此<code>0, 2, 4, 6, 8</code>已经处理好了，现在还剩下 <code>1, 3, 5, 7, 9</code>。<br>仔细分析可以发现，字符<code>O</code>在这五个数字的英文中，只存在于<code>ONE</code>；字符<code>F</code>只存在于<code>FIVE</code>中，以此类推。<br>那么，我们又可以得到一组映射：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
    O: ['ONE', 1],
    T: ['THREE', 3],
    F: ['FIVE', 5],
    S: ['SEVEN', 7]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
{
    <span class="hljs-attr">O</span>: [<span class="hljs-string">'ONE'</span>, <span class="hljs-number">1</span>],
    <span class="hljs-attr">T</span>: [<span class="hljs-string">'THREE'</span>, <span class="hljs-number">3</span>],
    <span class="hljs-attr">F</span>: [<span class="hljs-string">'FIVE'</span>, <span class="hljs-number">5</span>],
    <span class="hljs-attr">S</span>: [<span class="hljs-string">'SEVEN'</span>, <span class="hljs-number">7</span>]
}
</code></pre>
<p>为什么这里没有<code>9</code>的映射呢？因为 <code>NINE</code>中<code>N, I, E</code>在 <code>1, 3, 5, 7</code>中都有出现，这里我们就先空着。</p>
<blockquote><p><strong>注意</strong><br><strong>这里的两个映射关系是不可以合并的，想想为什么？</strong></p></blockquote>
<p>那么这些映射关系有什么用呢？这里就要用到字典(dict)啦。<br>我们可以把输入的字符串，转换为一个字典结构，<code>key</code> 是字符, <code>value</code> 是这个字符在整个字符串中出现的次数。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;OHEWTIEGTHENRTEO&quot;

var dict = {
    E: 4,
    T: 3,
    O: 2,
    H: 2,
    I: 1,
    G: 1,
    W: 1,
    N: 1,
    R: 1
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"OHEWTIEGTHENRTEO"</span>

<span class="hljs-keyword">var</span> dict = {
    <span class="hljs-attr">E</span>: <span class="hljs-number">4</span>,
    <span class="hljs-attr">T</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">O</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">H</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">I</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">G</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">W</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">N</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">R</span>: <span class="hljs-number">1</span>
}
</code></pre>
<p>然后我们遍历这个字典:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
[{
    Z: ['ZERO', 0],
    W: ['TWO', 2],
    U: ['FOUR', 4],
    X: ['SIX', 6],
    G: ['EIGHT', 8]
},{
    O: ['ONE', 1],
    T: ['THREE', 3],
    F: ['FIVE', 5],
    S: ['SEVEN', 7]
}].map(map => {
    Object.keys(dict).map(key => {
        /** 检查当前字符是否在映射表中
         * 在的话检查字典中当前字符的数量是否仍然大于0
         */
        map[key] &amp;&amp; dict[key] > 0 &amp;&amp;
        /**
         * 把映射关系中的字面值取出并拆解为一个字符数组，
         * 遍历这个字符数组，将字典中该字符的计数减去1，即消化了这个字面值
         */
        map[key][0].split('').map(char => dict[char] -= 1) &amp;&amp;
        // 把消化的数字值打出来
        console.log(map[key][1])
    })
})

/**
 * 2
 * 8
 * 1
 * 3
 */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
[{
    <span class="hljs-attr">Z</span>: [<span class="hljs-string">'ZERO'</span>, <span class="hljs-number">0</span>],
    <span class="hljs-attr">W</span>: [<span class="hljs-string">'TWO'</span>, <span class="hljs-number">2</span>],
    <span class="hljs-attr">U</span>: [<span class="hljs-string">'FOUR'</span>, <span class="hljs-number">4</span>],
    <span class="hljs-attr">X</span>: [<span class="hljs-string">'SIX'</span>, <span class="hljs-number">6</span>],
    <span class="hljs-attr">G</span>: [<span class="hljs-string">'EIGHT'</span>, <span class="hljs-number">8</span>]
},{
    <span class="hljs-attr">O</span>: [<span class="hljs-string">'ONE'</span>, <span class="hljs-number">1</span>],
    <span class="hljs-attr">T</span>: [<span class="hljs-string">'THREE'</span>, <span class="hljs-number">3</span>],
    <span class="hljs-attr">F</span>: [<span class="hljs-string">'FIVE'</span>, <span class="hljs-number">5</span>],
    <span class="hljs-attr">S</span>: [<span class="hljs-string">'SEVEN'</span>, <span class="hljs-number">7</span>]
}].map(<span class="hljs-function"><span class="hljs-params">map</span> =&gt;</span> {
    <span class="hljs-built_in">Object</span>.keys(dict).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
        <span class="hljs-comment">/** 检查当前字符是否在映射表中
         * 在的话检查字典中当前字符的数量是否仍然大于0
         */</span>
        map[key] &amp;&amp; dict[key] &gt; <span class="hljs-number">0</span> &amp;&amp;
        <span class="hljs-comment">/**
         * 把映射关系中的字面值取出并拆解为一个字符数组，
         * 遍历这个字符数组，将字典中该字符的计数减去1，即消化了这个字面值
         */</span>
        map[key][<span class="hljs-number">0</span>].split(<span class="hljs-string">''</span>).map(<span class="hljs-function"><span class="hljs-params">char</span> =&gt;</span> dict[char] -= <span class="hljs-number">1</span>) &amp;&amp;
        <span class="hljs-comment">// 把消化的数字值打出来</span>
        <span class="hljs-built_in">console</span>.log(map[key][<span class="hljs-number">1</span>])
    })
})

<span class="hljs-comment">/**
 * 2
 * 8
 * 1
 * 3
 */</span>
</code></pre>
<p>可是题目说明 <code>OHEWTIEGTHENRTEO</code> 的输出值应该是 <code>0345</code>呀，哪里出错了呢?</p>
<p>注意题目中的一句话</p>
<blockquote><p>首先将电话号码中的每个数字加上8取个位</p></blockquote>
<p>也就是说，我们打出来的值还需要对这个 <code>加8取个位</code> 进行逆向。<br>有几种方法，一是在打印时对 <code>map[key][1]</code> 进行处理:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="num => num - 8 >= 0 ? num - 8 : num + 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">num =&gt; num - <span class="hljs-number">8</span> &gt;= <span class="hljs-number">0</span> ? num - <span class="hljs-number">8</span> : num + <span class="hljs-number">2</span></code></pre>
<p>或者，我这里用了偷懒的办法，还记得我们映射表中有个数字值吗？我人工替换了 ：P</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
[{
    Z: ['ZERO', 2],
    W: ['TWO', 4],
    U: ['FOUR', 6],
    X: ['SIX', 8],
    G: ['EIGHT', 0]
},{
    O: ['ONE', 3],
    T: ['THREE', 5],
    F: ['FIVE', 7],
    S: ['SEVEN', 9
}].map(map => {
    Object.keys(dict).map(key => {
        map[key] &amp;&amp; dict[key] > 0 &amp;&amp;
        map[key][0].split('').map(char => dict[char] -= 1) &amp;&amp;
        console.log(map[key][1])
    })
})

/**
 * 4
 * 0
 * 3
 * 5
 */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
[{
    <span class="hljs-attr">Z</span>: [<span class="hljs-string">'ZERO'</span>, <span class="hljs-number">2</span>],
    <span class="hljs-attr">W</span>: [<span class="hljs-string">'TWO'</span>, <span class="hljs-number">4</span>],
    <span class="hljs-attr">U</span>: [<span class="hljs-string">'FOUR'</span>, <span class="hljs-number">6</span>],
    <span class="hljs-attr">X</span>: [<span class="hljs-string">'SIX'</span>, <span class="hljs-number">8</span>],
    <span class="hljs-attr">G</span>: [<span class="hljs-string">'EIGHT'</span>, <span class="hljs-number">0</span>]
},{
    <span class="hljs-attr">O</span>: [<span class="hljs-string">'ONE'</span>, <span class="hljs-number">3</span>],
    <span class="hljs-attr">T</span>: [<span class="hljs-string">'THREE'</span>, <span class="hljs-number">5</span>],
    <span class="hljs-attr">F</span>: [<span class="hljs-string">'FIVE'</span>, <span class="hljs-number">7</span>],
    <span class="hljs-attr">S</span>: [<span class="hljs-string">'SEVEN'</span>, <span class="hljs-number">9</span>
}].map(<span class="hljs-function"><span class="hljs-params">map</span> =&gt;</span> {
    <span class="hljs-built_in">Object</span>.keys(dict).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
        map[key] &amp;&amp; dict[key] &gt; <span class="hljs-number">0</span> &amp;&amp;
        map[key][<span class="hljs-number">0</span>].split(<span class="hljs-string">''</span>).map(<span class="hljs-function"><span class="hljs-params">char</span> =&gt;</span> dict[char] -= <span class="hljs-number">1</span>) &amp;&amp;
        <span class="hljs-built_in">console</span>.log(map[key][<span class="hljs-number">1</span>])
    })
})

<span class="hljs-comment">/**
 * 4
 * 0
 * 3
 * 5
 */</span>
</code></pre>
<p>那么现在只需要把输出值进行一下正序排序即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var output = [];

[{ Z: ['ZERO', 2], W: ['TWO', 4], U: ['FOUR', 6], X: ['SIX', 8], G: ['EIGHT', 0]
},{ O: ['ONE', 3], T: ['THREE', 5], F: ['FIVE', 7], S: ['SEVEN', 9}].map(map => {
    Object.keys(dict).map(key => {
        map[key] &amp;&amp; dict[key] > 0 &amp;&amp;
        map[key][0].split('').map(char => dict[char] -= 1) &amp;&amp;
        output.push(map[key][1])
    })
})

/* 
 * 还记得我们把 9 的处理留空了吗？现在要补上啦~
 * 9 的英文 NINE 你只需要随意检查前边过滤后的字典是否还存在 N I E 任意一个字符即可
 * 我选择的是判断 E
 * 输入的9对应的输出应该是1，还记得为什么吗？
 */
//if (dict['E'] &amp;&amp; dict['E'] > 0) output.push(1)

/**
 * 2017.09.19 08:36 更新：
 * 之前只判断了是否还存在9，但是忘了多个9同时存在的情况，那么需要做如下改进：
 */
 dist['E'] &amp;&amp; // 检查是否还存在特征字符 E，在经过前面的映射关系过滤后，还剩下几个E，就还有几个9
 (output = output.concat(Array(dist['E']).fill(1))) //纯js技巧，快速生成指定大小的数组并填充一个值

output.sort()
console.log(output) // 0 3 4 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> output = [];

[{ <span class="hljs-attr">Z</span>: [<span class="hljs-string">'ZERO'</span>, <span class="hljs-number">2</span>], <span class="hljs-attr">W</span>: [<span class="hljs-string">'TWO'</span>, <span class="hljs-number">4</span>], <span class="hljs-attr">U</span>: [<span class="hljs-string">'FOUR'</span>, <span class="hljs-number">6</span>], <span class="hljs-attr">X</span>: [<span class="hljs-string">'SIX'</span>, <span class="hljs-number">8</span>], <span class="hljs-attr">G</span>: [<span class="hljs-string">'EIGHT'</span>, <span class="hljs-number">0</span>]
},{ <span class="hljs-attr">O</span>: [<span class="hljs-string">'ONE'</span>, <span class="hljs-number">3</span>], <span class="hljs-attr">T</span>: [<span class="hljs-string">'THREE'</span>, <span class="hljs-number">5</span>], <span class="hljs-attr">F</span>: [<span class="hljs-string">'FIVE'</span>, <span class="hljs-number">7</span>], <span class="hljs-attr">S</span>: [<span class="hljs-string">'SEVEN'</span>, <span class="hljs-number">9</span>}].map(<span class="hljs-function"><span class="hljs-params">map</span> =&gt;</span> {
    <span class="hljs-built_in">Object</span>.keys(dict).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
        map[key] &amp;&amp; dict[key] &gt; <span class="hljs-number">0</span> &amp;&amp;
        map[key][<span class="hljs-number">0</span>].split(<span class="hljs-string">''</span>).map(<span class="hljs-function"><span class="hljs-params">char</span> =&gt;</span> dict[char] -= <span class="hljs-number">1</span>) &amp;&amp;
        output.push(map[key][<span class="hljs-number">1</span>])
    })
})

<span class="hljs-comment">/* 
 * 还记得我们把 9 的处理留空了吗？现在要补上啦~
 * 9 的英文 NINE 你只需要随意检查前边过滤后的字典是否还存在 N I E 任意一个字符即可
 * 我选择的是判断 E
 * 输入的9对应的输出应该是1，还记得为什么吗？
 */</span>
<span class="hljs-comment">//if (dict['E'] &amp;&amp; dict['E'] &gt; 0) output.push(1)</span>

<span class="hljs-comment">/**
 * 2017.09.19 08:36 更新：
 * 之前只判断了是否还存在9，但是忘了多个9同时存在的情况，那么需要做如下改进：
 */</span>
 dist[<span class="hljs-string">'E'</span>] &amp;&amp; <span class="hljs-comment">// 检查是否还存在特征字符 E，在经过前面的映射关系过滤后，还剩下几个E，就还有几个9</span>
 (output = output.concat(<span class="hljs-built_in">Array</span>(dist[<span class="hljs-string">'E'</span>]).fill(<span class="hljs-number">1</span>))) <span class="hljs-comment">//纯js技巧，快速生成指定大小的数组并填充一个值</span>

output.sort()
<span class="hljs-built_in">console</span>.log(output) <span class="hljs-comment">// 0 3 4 5</span></code></pre>
<p>虽然说本文标题有个 <code>[算法]</code> 前缀，不过这个写法完全没考虑什么复杂度之类的东西 ORZ</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[算法] 电话号码分身 （小米2017 秋招真题）[JavaScript]

## 原文链接
[https://segmentfault.com/a/1190000011223246](https://segmentfault.com/a/1190000011223246)

