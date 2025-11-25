---
title: 'vuejs2.0 封装通用组件，build生成js，并发布到npm' 
date: 2018-12-25 2:30:11
hidden: true
slug: ps718ztwf3d
categories: [reprint]
---

{{< raw >}}

                    
<p>网上看了一些文章，一般都是把封装好的.vue格式的文件发布到npm，感觉不太像一般组件的封装形式，故特意书写此文，希望能帮助到各位码友。<br>   本文以封装一个分页组件为例，把它build生成目标js文件，pack生成压缩包测试，并发布到npm。<br><strong>项目初始化</strong><br>   封装vue的插件用webpack-simple很合适，<strong>vue init webpack-simple vue-gitment</strong> 此命令创建我们的项目的目录，创建文件夹和文件，最后结构是这样的<br><span class="img-wrap"><img data-src="/img/bVYU9o?w=357&amp;h=480" src="https://static.alili.tech/img/bVYU9o?w=357&amp;h=480" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>lib目录是我们的插件目录，其他的默认就好。</p>
<p><strong>组件内容</strong><br>  Pagination.vue 的内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;clearfix box_pagination&quot;>
      <div class=&quot;laypage_l&quot;>
        <label>第&amp;nbsp;</label>
        <label>"{{" current "}}"</label><label>/"{{" pagegroup "}}"&amp;nbsp;页，共"{{" total "}}"条，每页显示"{{" display "}}"条</label>
      </div>
      <div class=&quot;laypage_r&quot;>
        <ul class=&quot;pagination&quot;>
          <li :class=&quot;{'disabled': current == 1}&quot; v-show=&quot;isShowFirst&quot;><a href=&quot;javascript:;&quot; class=&quot;single&quot; @click=&quot;setCurrent(1)&quot;> 首页 </a></li>
          <li :class=&quot;{'disabled': current == 1}&quot; v-show=&quot;isShowPrev&quot;><a href=&quot;javascript:;&quot; class=&quot;prev&quot; @click=&quot;setCurrent(current - 1)&quot;> 上一页 </a></li>
          <li v-for=&quot;p in showPages&quot; :class=&quot;{'active': current == p.val}&quot;>
            <a href=&quot;javascript:;&quot; @click=&quot;setCurrent(p.val)&quot; v-if=&quot;p.text==='...'&quot; class=&quot;noBorder&quot;>"{{" p.text "}}"</a>
            <a href=&quot;javascript:;&quot; @click=&quot;setCurrent(p.val)&quot; v-else> "{{" p.text "}}" </a>
          </li>
          <li :class=&quot;{'disabled': current == page}&quot; v-show=&quot;isShowNext&quot;><a href=&quot;javascript:;&quot; class=&quot;next&quot; @click=&quot;setCurrent(current + 1)&quot;> 下一页 </a></li>
          <li :class=&quot;{'disabled': current == page}&quot; v-show=&quot;isShowLast&quot;><a href=&quot;javascript:;&quot; class=&quot;single&quot; @click=&quot;setCurrent(page)&quot;> 尾页 </a></li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default{
    data(){
      return {
        current: this.currentPage,
        showPages: [],
        isShowFirst: false,
        isShowPrev: false,
        isShowNext: true,
        isShowLast: true
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 1,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数
        return Math.ceil(this.total / this.display);
      }
    },
    methods: {
      getPagesList() {
        let self= this;
        let len = self.page, temp = [];
        if(len <= 5) {  // 当页数小于5
          while (len--) {
            temp.push({text: self.page - len, val: self.page - len});
          }
        } else {
          for(let i=0;i<5;i++) {
            len--;
            temp.push({text: self.page - len, val: self.page - len});
          }
          temp.push({text: '...', val: 6});
        }
        self.showPages = temp;
      },
      setCurrent: function (idx) {
        let self = this;
        if(self.current != idx &amp;&amp; idx > 0 &amp;&amp; idx < self.page + 1) {
          self.current = idx;
          if(idx === 1) {
            self.isShowFirst = false;
            self.isShowPrev = false;
            self.isShowNext = true;
            self.isShowLast = true;
          } else if (idx == self.page) {
            self.isShowFirst = true;
            self.isShowPrev = true;
            self.isShowNext = false;
            self.isShowLast = false;
          } else {
            self.isShowFirst = true;
            self.isShowPrev = true;
            self.isShowNext = true;
            self.isShowLast = true;
          }
          if(idx > 5) {
            let temp_arry = [], start = idx - 2, end = idx + 2;
            if(end>=self.page) {
              start = idx - (5 - (self.page-idx) - 1);
              end = self.page;
            }
            temp_arry.push({text: '...', val: idx - 3});
            for(let i=start;i<=end;i++) {
              temp_arry.push({text: i, val: i});
            }
            if(idx < (self.page-5/2)) {
              temp_arry.push({text: '...', val: idx + 3});
            }
            self.showPages = temp_arry;
          } else {
            let temp_arry = [];
            for(let i=1;i<=idx;i++) {
              temp_arry.push({text: i, val: i});
            }
            if(idx === 5) {
              temp_arry.push({text: '...', val: idx + 1});
            }
            self.showPages = temp_arry;
          }
          this.$emit('pagechange', this.current);
        }
      }
    },
    mounted() {
      this.getPagesList();
    },
  }
</script>
<style>
  .box_pagination {
    padding: 20px 0px;
  }
  .laypage_l {
    float: left;
    width: 30%;
  }
  .laypage_l label {
    color: #999;
  }
  .laypage_r {
    float: right;
    width: 70%;
  }
  .pagination {
    overflow: hidden;
    margin: 0 auto;
    height: 50px;
    text-align: right;
  }
  .pagination li {
    display: inline-block;
    height: 34px;
    margin: 0px 3px;
    color: #666;
  }
  .pagination li .noBorder {
    border: none;
  }
  .pagination li:hover {
  }
  .pagination li:hover a {
    color: #25aae1;
    background: #ebfaff;
  }
  .pagination li a {
    display: block;
    width: 34px;
    height: 34px;
    color: #333;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    text-decoration: none;
    border: 2px solid #ddd;
    background-color: #f9fbfc;
  }
  .pagination li a.single {
    width: 54px;
  }
  .pagination li a.prev {
    width: 68px;
  }
  .pagination li a.next {
    width: 68px;
  }
  .pagination .active a {
    color: #25aae1;
    background: #ebfaff;
    border: 2px solid #b8dbea;
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearfix box_pagination"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"laypage_l"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>第&amp;nbsp;<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span></span><span class="hljs-template-variable">"{{" current "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>/</span><span class="hljs-template-variable">"{{" pagegroup "}}"</span><span class="xml">&amp;nbsp;页，共</span><span class="hljs-template-variable">"{{" total "}}"</span><span class="xml">条，每页显示</span><span class="hljs-template-variable">"{{" display "}}"</span><span class="xml">条<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"laypage_r"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pagination"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'disabled': current == 1}"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShowFirst"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"setCurrent(1)"</span>&gt;</span> 首页 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'disabled': current == 1}"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShowPrev"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"prev"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"setCurrent(current - 1)"</span>&gt;</span> 上一页 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"p in showPages"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'active': current == p.val}"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"setCurrent(p.val)"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"p.text==='...'"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"noBorder"</span>&gt;</span></span><span class="hljs-template-variable">"{{" p.text "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"setCurrent(p.val)"</span> <span class="hljs-attr">v-else</span>&gt;</span> </span><span class="hljs-template-variable">"{{" p.text "}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'disabled': current == page}"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShowNext"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"next"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"setCurrent(current + 1)"</span>&gt;</span> 下一页 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'disabled': current == page}"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isShowLast"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"single"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"setCurrent(page)"</span>&gt;</span> 尾页 <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">current</span>: <span class="hljs-keyword">this</span>.currentPage,
        <span class="hljs-attr">showPages</span>: [],
        <span class="hljs-attr">isShowFirst</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">isShowPrev</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">isShowNext</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">isShowLast</span>: <span class="hljs-literal">true</span>
      }
    },
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">total</span>: {<span class="hljs-comment">// 数据总条数</span>
        type: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
      },
      <span class="hljs-attr">display</span>: {<span class="hljs-comment">// 每页显示条数</span>
        type: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-number">10</span>
      },
      <span class="hljs-attr">currentPage</span>: {<span class="hljs-comment">// 当前页码</span>
        type: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-number">1</span>
      },
      <span class="hljs-attr">pagegroup</span>: {<span class="hljs-comment">// 分页条数</span>
        type: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">coerce</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{
          v = v &gt; <span class="hljs-number">0</span> ? v : <span class="hljs-number">5</span>;
          <span class="hljs-keyword">return</span> v % <span class="hljs-number">2</span> === <span class="hljs-number">1</span> ? v : v + <span class="hljs-number">1</span>;
        }
      }
    },
    <span class="hljs-attr">computed</span>: {
      <span class="hljs-attr">page</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 总页数</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.total / <span class="hljs-keyword">this</span>.display);
      }
    },
    <span class="hljs-attr">methods</span>: {
      getPagesList() {
        <span class="hljs-keyword">let</span> self= <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">let</span> len = self.page, temp = [];
        <span class="hljs-keyword">if</span>(len &lt;= <span class="hljs-number">5</span>) {  <span class="hljs-comment">// 当页数小于5</span>
          <span class="hljs-keyword">while</span> (len--) {
            temp.push({<span class="hljs-attr">text</span>: self.page - len, <span class="hljs-attr">val</span>: self.page - len});
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">5</span>;i++) {
            len--;
            temp.push({<span class="hljs-attr">text</span>: self.page - len, <span class="hljs-attr">val</span>: self.page - len});
          }
          temp.push({<span class="hljs-attr">text</span>: <span class="hljs-string">'...'</span>, <span class="hljs-attr">val</span>: <span class="hljs-number">6</span>});
        }
        self.showPages = temp;
      },
      <span class="hljs-attr">setCurrent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">idx</span>) </span>{
        <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">if</span>(self.current != idx &amp;&amp; idx &gt; <span class="hljs-number">0</span> &amp;&amp; idx &lt; self.page + <span class="hljs-number">1</span>) {
          self.current = idx;
          <span class="hljs-keyword">if</span>(idx === <span class="hljs-number">1</span>) {
            self.isShowFirst = <span class="hljs-literal">false</span>;
            self.isShowPrev = <span class="hljs-literal">false</span>;
            self.isShowNext = <span class="hljs-literal">true</span>;
            self.isShowLast = <span class="hljs-literal">true</span>;
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (idx == self.page) {
            self.isShowFirst = <span class="hljs-literal">true</span>;
            self.isShowPrev = <span class="hljs-literal">true</span>;
            self.isShowNext = <span class="hljs-literal">false</span>;
            self.isShowLast = <span class="hljs-literal">false</span>;
          } <span class="hljs-keyword">else</span> {
            self.isShowFirst = <span class="hljs-literal">true</span>;
            self.isShowPrev = <span class="hljs-literal">true</span>;
            self.isShowNext = <span class="hljs-literal">true</span>;
            self.isShowLast = <span class="hljs-literal">true</span>;
          }
          <span class="hljs-keyword">if</span>(idx &gt; <span class="hljs-number">5</span>) {
            <span class="hljs-keyword">let</span> temp_arry = [], start = idx - <span class="hljs-number">2</span>, end = idx + <span class="hljs-number">2</span>;
            <span class="hljs-keyword">if</span>(end&gt;=self.page) {
              start = idx - (<span class="hljs-number">5</span> - (self.page-idx) - <span class="hljs-number">1</span>);
              end = self.page;
            }
            temp_arry.push({<span class="hljs-attr">text</span>: <span class="hljs-string">'...'</span>, <span class="hljs-attr">val</span>: idx - <span class="hljs-number">3</span>});
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=start;i&lt;=end;i++) {
              temp_arry.push({<span class="hljs-attr">text</span>: i, <span class="hljs-attr">val</span>: i});
            }
            <span class="hljs-keyword">if</span>(idx &lt; (self.page<span class="hljs-number">-5</span>/<span class="hljs-number">2</span>)) {
              temp_arry.push({<span class="hljs-attr">text</span>: <span class="hljs-string">'...'</span>, <span class="hljs-attr">val</span>: idx + <span class="hljs-number">3</span>});
            }
            self.showPages = temp_arry;
          } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">let</span> temp_arry = [];
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">1</span>;i&lt;=idx;i++) {
              temp_arry.push({<span class="hljs-attr">text</span>: i, <span class="hljs-attr">val</span>: i});
            }
            <span class="hljs-keyword">if</span>(idx === <span class="hljs-number">5</span>) {
              temp_arry.push({<span class="hljs-attr">text</span>: <span class="hljs-string">'...'</span>, <span class="hljs-attr">val</span>: idx + <span class="hljs-number">1</span>});
            }
            self.showPages = temp_arry;
          }
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'pagechange'</span>, <span class="hljs-keyword">this</span>.current);
        }
      }
    },
    mounted() {
      <span class="hljs-keyword">this</span>.getPagesList();
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.box_pagination</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0px</span>;
  }
  <span class="hljs-selector-class">.laypage_l</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30%</span>;
  }
  <span class="hljs-selector-class">.laypage_l</span> <span class="hljs-selector-tag">label</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
  }
  <span class="hljs-selector-class">.laypage_r</span> {
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">70%</span>;
  }
  <span class="hljs-selector-class">.pagination</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">text-align</span>: right;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span> <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#666</span>;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-class">.noBorder</span> {
    <span class="hljs-attribute">border</span>: none;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#25aae1</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ebfaff</span>;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">32px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
    <span class="hljs-attribute">text-decoration</span>: none;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f9fbfc</span>;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.single</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">54px</span>;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.prev</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">68px</span>;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.next</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">68px</span>;
  }
  <span class="hljs-selector-class">.pagination</span> <span class="hljs-selector-class">.active</span> <span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#25aae1</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ebfaff</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid <span class="hljs-number">#b8dbea</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>index.js 用来安装组件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Pagination from './Pagination.vue'

const pagination={
  install:function (Vue) {
    Vue.component('vPagination',Pagination)
  }
};
// 这里的判断很重要
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  window.Vue.use(pagination)
}
export default pagination
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Pagination <span class="hljs-keyword">from</span> <span class="hljs-string">'./Pagination.vue'</span>

<span class="hljs-keyword">const</span> pagination={
  <span class="hljs-attr">install</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue</span>) </span>{
    Vue.component(<span class="hljs-string">'vPagination'</span>,Pagination)
  }
};
<span class="hljs-comment">// 这里的判断很重要</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  <span class="hljs-built_in">window</span>.Vue.use(pagination)
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> pagination
</code></pre>
<p><strong>配置文件</strong><br>package.json 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;pagination&quot;,
  &quot;description&quot;: &quot;A Vue.js project&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;author&quot;: &quot;author&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;private&quot;: false,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --hot&quot;,
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;
  },
  &quot;directories&quot;: {
    &quot;dist&quot;: &quot;dist&quot;
  },
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.4.4&quot;
  },
  &quot;browserslist&quot;: [
    &quot;> 1%&quot;,
    &quot;last 2 versions&quot;,
    &quot;not ie <= 8&quot;
  ],
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.26.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.2&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.6.0&quot;,
    &quot;babel-preset-stage-3&quot;: &quot;^6.24.1&quot;,
    &quot;cross-env&quot;: &quot;^5.0.5&quot;,
    &quot;css-loader&quot;: &quot;^0.28.7&quot;,
    &quot;file-loader&quot;: &quot;^1.1.4&quot;,
    &quot;vue-loader&quot;: &quot;^13.0.5&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.4.4&quot;,
    &quot;webpack&quot;: &quot;^3.6.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.9.1&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"pagination"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"A Vue.js project"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"author"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"private"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development webpack-dev-server --open --hot"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --progress --hide-modules"</span>
  },
  <span class="hljs-attr">"directories"</span>: {
    <span class="hljs-attr">"dist"</span>: <span class="hljs-string">"dist"</span>
  },
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.4.4"</span>
  },
  <span class="hljs-attr">"browserslist"</span>: [
    <span class="hljs-string">"&gt; 1%"</span>,
    <span class="hljs-string">"last 2 versions"</span>,
    <span class="hljs-string">"not ie &lt;= 8"</span>
  ],
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.26.0"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^7.1.2"</span>,
    <span class="hljs-attr">"babel-preset-env"</span>: <span class="hljs-string">"^1.6.0"</span>,
    <span class="hljs-attr">"babel-preset-stage-3"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-attr">"cross-env"</span>: <span class="hljs-string">"^5.0.5"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.28.7"</span>,
    <span class="hljs-attr">"file-loader"</span>: <span class="hljs-string">"^1.1.4"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^13.0.5"</span>,
    <span class="hljs-attr">"vue-template-compiler"</span>: <span class="hljs-string">"^2.4.4"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^3.6.0"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^2.9.1"</span>
  }
}
</code></pre>
<p>webpack.config.js 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './src/lib/index.js',
  output: {
    path: path.resolve(__dirname, './dist/js'),
    publicPath: '/dist/',
    filename: 'pagination.js',
    library: 'pagination',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
 // 其余默认就好 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: <span class="hljs-string">'./src/lib/index.js'</span>,
  output: {
    path: path.resolve(__dirname, <span class="hljs-string">'./dist/js'</span>),
    publicPath: <span class="hljs-string">'/dist/'</span>,
    filename: <span class="hljs-string">'pagination.js'</span>,
    library: <span class="hljs-string">'pagination'</span>,
    libraryTarget: <span class="hljs-string">'umd'</span>,
    umdNamedDefine: <span class="hljs-keyword">true</span>
  }
 <span class="hljs-comment">// 其余默认就好 </span>
};</code></pre>
<p>entry：修改打包的入口文件。<br>output：修改输出文件到 dist/js下，生成文件名为pagination.js。<br>library：指定的就是你使用require时的模块名，这里便是require("pagination")。<br>libraryTarget：会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。<br>umdNamedDefine：会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。</p>
<p><strong>build</strong><br>控制台输入 npm run build，会生成下列文件：<br><span class="img-wrap"><img data-src="/img/bVYVdH?w=309&amp;h=112" src="https://static.alili.tech/img/bVYVdH?w=309&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>pack打包生成压缩包</strong><br>修改package.json 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;pagination&quot;,
  &quot;description&quot;: &quot;A vue.js 2.0 project on asynchronous paging &quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;author&quot;: &quot;y&quot;,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;private&quot;: false,
  &quot;main&quot;: &quot;dist/js/pagination.js&quot;,
  &quot;directories&quot;: {
    &quot;dist&quot;: &quot;dist&quot;
  },
  &quot;files&quot;: [
    &quot;dist&quot;,
    &quot;src&quot;
  ],
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
  },
  &quot;repository&quot;: {
    &quot;type&quot;: &quot;git&quot;,
    &quot;url&quot;: &quot;git+https://github.com/yanzilingyan/vue.git&quot;
  },
  &quot;keywords&quot;: [
    &quot;vue&quot;,
    &quot;pagination&quot;,
    &quot;ajax pagination&quot;
  ],
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.4.4&quot;
  },
  &quot;browserslist&quot;: [
    &quot;> 1%&quot;,
    &quot;last 2 versions&quot;,
    &quot;not ie <= 8&quot;
  ],
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.26.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.2&quot;,
    &quot;babel-preset-env&quot;: &quot;^1.6.0&quot;,
    &quot;babel-preset-stage-3&quot;: &quot;^6.24.1&quot;,
    &quot;cross-env&quot;: &quot;^5.0.5&quot;,
    &quot;css-loader&quot;: &quot;^0.28.7&quot;,
    &quot;file-loader&quot;: &quot;^1.1.4&quot;,
    &quot;vue-loader&quot;: &quot;^13.0.5&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.4.4&quot;,
    &quot;webpack&quot;: &quot;^3.6.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.9.1&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"pagination"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"A vue.js 2.0 project on asynchronous paging "</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"y"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-attr">"private"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"dist/js/pagination.js"</span>,
  <span class="hljs-attr">"directories"</span>: {
    <span class="hljs-attr">"dist"</span>: <span class="hljs-string">"dist"</span>
  },
  <span class="hljs-attr">"files"</span>: [
    <span class="hljs-string">"dist"</span>,
    <span class="hljs-string">"src"</span>
  ],
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
  },
  <span class="hljs-attr">"repository"</span>: {
    <span class="hljs-attr">"type"</span>: <span class="hljs-string">"git"</span>,
    <span class="hljs-attr">"url"</span>: <span class="hljs-string">"git+https://github.com/yanzilingyan/vue.git"</span>
  },
  <span class="hljs-attr">"keywords"</span>: [
    <span class="hljs-string">"vue"</span>,
    <span class="hljs-string">"pagination"</span>,
    <span class="hljs-string">"ajax pagination"</span>
  ],
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.4.4"</span>
  },
  <span class="hljs-attr">"browserslist"</span>: [
    <span class="hljs-string">"&gt; 1%"</span>,
    <span class="hljs-string">"last 2 versions"</span>,
    <span class="hljs-string">"not ie &lt;= 8"</span>
  ],
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.26.0"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^7.1.2"</span>,
    <span class="hljs-attr">"babel-preset-env"</span>: <span class="hljs-string">"^1.6.0"</span>,
    <span class="hljs-attr">"babel-preset-stage-3"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-attr">"cross-env"</span>: <span class="hljs-string">"^5.0.5"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.28.7"</span>,
    <span class="hljs-attr">"file-loader"</span>: <span class="hljs-string">"^1.1.4"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^13.0.5"</span>,
    <span class="hljs-attr">"vue-template-compiler"</span>: <span class="hljs-string">"^2.4.4"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^3.6.0"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^2.9.1"</span>
  }
}
</code></pre>
<p>控制台输入 npm pack，会看到在当前工程目录下生成了一个文件  pagination-0.1.0.tgz<br><span class="img-wrap"><img data-src="/img/bVYVeB?w=87&amp;h=121" src="https://static.alili.tech/img/bVYVeB?w=87&amp;h=121" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>项目测试引入</strong><br>另外新建一个工程项目，<strong>vue init webpack vue-ptest</strong> 此命令创建我们的项目的目录，创建文件夹和文件，类似如下结构：<br><span class="img-wrap"><img data-src="/img/bVYVfj?w=366&amp;h=548" src="https://static.alili.tech/img/bVYVfj?w=366&amp;h=548" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>把刚才打包好的 pagination-0.1.0.tgz 这个压缩包放到E盘目录下（当然哪个位置都行，这里个人只是觉得方便些）。在当前 vue-ptest 这个工程目录下，打开控制台，输入 npm install --save-dev E:pagination-0.1.0.tgz ， 安装刚才打包好的文件包。<br>修改main.js文件，引入此包，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import router from './router'
import vPagination from 'pagination'

Vue.config.productionTip = false;
Vue.use(vPagination);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> vPagination <span class="hljs-keyword">from</span> <span class="hljs-string">'pagination'</span>

Vue.config.productionTip = <span class="hljs-literal">false</span>;
Vue.use(vPagination);

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
});
</code></pre>
<p>修改HelloWorld.vue文件，引入分页组件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>Essential Links</h2>
    <vPagination :total=&quot;total&quot; :current-page='current' :pagegroup=&quot;pagegroup&quot; @pagechange=&quot;pagechange&quot; v-if=&quot;isShowPagination&quot;></vPagination>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      total: 1,
      current: 1,
      pagegroup: 10,
      isShowPagination: true
    }
  },
  methods: {
    pagechange(currentPage) {
      console.log('currentPage=',currentPage);
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Essential Links<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">vPagination</span> <span class="hljs-attr">:total</span>=<span class="hljs-string">"total"</span> <span class="hljs-attr">:current-page</span>=<span class="hljs-string">'current'</span> <span class="hljs-attr">:pagegroup</span>=<span class="hljs-string">"pagegroup"</span> @<span class="hljs-attr">pagechange</span>=<span class="hljs-string">"pagechange"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isShowPagination"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vPagination</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>,
      <span class="hljs-attr">total</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">current</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">pagegroup</span>: <span class="hljs-number">10</span>,
      <span class="hljs-attr">isShowPagination</span>: <span class="hljs-literal">true</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    pagechange(currentPage) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'currentPage='</span>,currentPage);
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}
<span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">list-style-type</span>: none;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#42b983</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>打开控制台，输入 npm run dev ，启动。<br>看到界面如下显示：<br><span class="img-wrap"><img data-src="/img/bVYViI?w=1355&amp;h=538" src="https://static.alili.tech/img/bVYViI?w=1355&amp;h=538" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br> OK，分页组件显示正常。</p>
<p><strong>发布到npm</strong><br>完成测试工作后我们就可以发布到npm了，这个就比较见到了，注册个npm账号，在你要发布的项目目录执行npm login，输入账号密码和邮箱，然后npm publish就发布成功了。<br>代码更多的详细信息请查看  <a href="https://github.com/yanzilingyan/vue_learn/tree/master/vue-p" rel="nofollow noreferrer" target="_blank">此文提供的项目源码</a>。</p>
<p>以上就是本文的全部内容，希望能对大家有所帮助。如果有更好的建议或优化，欢迎大家多多评论~~ ^_^ ~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs2.0 封装通用组件，build生成js，并发布到npm

## 原文链接
[https://segmentfault.com/a/1190000012097778](https://segmentfault.com/a/1190000012097778)

