---
title: '我的 Vue.js 学习日记 （十一） - 父子组件间的互相传值' 
date: 2018-11-30 2:30:11
hidden: true
slug: swiwedu3cy9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">上节回顾</h1>
<p>上节我用<code>element-ui</code> 与 <code>vue-router</code> 实现了页面跳转的功能。</p>
<p>回想一下，<code>vue-router</code>实现组件之间的切换关键也就俩东西，一个<code>router-link</code>一个<code>router-view</code>，所以说总体来说上一节也没学啥。</p>
<h1 id="articleHeader1">本节目标</h1>
<p><code>props</code>父组件向子组件传值</p>
<p><code>$emit</code>子组件向父组件传值</p>
<p>基于上一节的例子，脑子里构思了一个点击<code>table</code>的<code>row</code>，弹出框显示本行信息这样一个画面</p>
<h1 id="articleHeader2">1.创建表单弹出框</h1>
<p>要点：</p>
<ul>
<li>
<code>props: ['student']</code>告诉父组件我（弹出框组件）需要一个<code>student</code>
</li>
<li>
<code>this.$emit('confirm', this.form)</code>触发父组件中，弹出框组件上定义的<code>confirm</code>事件，并将<code>this.form</code>传递过去</li>
</ul>
<p><code>student-list-info</code>组件完整代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <el-button icon=&quot;el-icon-more&quot; @click=&quot;dialogFormVisible = true&quot; circle></el-button>
    <el-dialog title=&quot;查询&quot; :visible.sync=&quot;dialogFormVisible&quot;>
      <el-form :model=&quot;student&quot;>
        <el-form-item label=&quot;姓名&quot;>
          <el-input v-model=&quot;student.name&quot;></el-input>
        </el-form-item>
        <el-form-item label=&quot;性别&quot;>
          <el-input v-model=&quot;student.sex&quot;></el-input>
        </el-form-item>
        <el-form-item label=&quot;年龄&quot;>
          <el-input v-model.number=&quot;student.age&quot; type=&quot;number&quot;></el-input>
        </el-form-item>
      </el-form>
      <div slot=&quot;footer&quot; class=&quot;dialog-footer&quot;>
        <el-button @click=&quot;dialogFormVisible = false&quot;>取 消</el-button>
        <el-button type=&quot;primary&quot; @click=&quot;doConfirm(student)&quot;>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'student-list-info',
  props: ['student'],
  data () {
    return {
      dialogFormVisible: false
    }
  },
  methods: {
    doConfirm (student) {
      this.$emit('confirm', student)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-more"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"dialogFormVisible = true"</span> <span class="hljs-attr">circle</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"查询"</span> <span class="hljs-attr">:visible.sync</span>=<span class="hljs-string">"dialogFormVisible"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">"student"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"姓名"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"student.name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"性别"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"student.sex"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"年龄"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"student.age"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-footer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"dialogFormVisible = false"</span>&gt;</span>取 消<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"doConfirm(student)"</span>&gt;</span>确 定<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'student-list-info'</span>,
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'student'</span>],
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">dialogFormVisible</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    doConfirm (student) {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'confirm'</span>, student)
      <span class="hljs-keyword">this</span>.dialogFormVisible = <span class="hljs-literal">false</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h1 id="articleHeader3">2.将弹出框引入List页面</h1>
<p><code>student-list</code>页面需要注意的只有这里：<br>&lt;student-list-info style="float: left" <code>@confirm="onConfirm"</code> <code>:student="this.student"</code>&gt;&lt;/student-list-info&gt;</p>
<p><code>:student</code>：中的<code>student</code>对应<code>props: ['student']</code>中的<code>student</code></p>
<p><code>@confirm</code>：@后面的<code>confirm</code>对应<code>this.$emit('confirm', this.form)</code>中的<code>confirm</code></p>
<p>完整代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <el-row>
    <student-list-info style=&quot;float: left&quot; @confirm=&quot;onConfirm&quot; :student=&quot;this.student&quot;></student-list-info>
    </el-row>
    <hr>
    <h3>学员列表</h3>
  <el-table
    :data=&quot;tableData&quot;
    @row-click=&quot;onRowClick&quot;
    border
    stripe
    style=&quot;width: 100%&quot;>
    <el-table-column
      prop=&quot;name&quot;
      label=&quot;姓名&quot;
      width=&quot;180&quot;>
    </el-table-column>
    <el-table-column
      prop=&quot;sex&quot;
      label=&quot;性别&quot;
      width=&quot;180&quot;>
    </el-table-column>
    <el-table-column
      prop=&quot;age&quot;
      label=&quot;年龄&quot;>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import studentListInfo from './student-list-info'

export default {
  name: 'student-list',
  components: {
    studentListInfo
  },
  data () {
    return {
      tableData: [{
        name: '张楚岚',
        sex: '男',
        age: '23'
      },
      {
        name: '冯宝宝',
        sex: '女',
        age: '99'
      },
      {
        name: '赵方旭',
        sex: '男',
        age: '59'
      },
      {
        name: '肖自在',
        sex: '男',
        age: '36'
      }
      ],
      student: {
        name: '',
        sex: '',
        age: 0
      }
    }
  },

  methods: {
    onConfirm (item) {
      this.tableData.push(item)
    },
    onRowClick (row) {
      this.student = {
        name: row.name,
        sex: row.sex,
        age: row.age
      }
    }
  }
}
</script>

<style scoped>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">student-list-info</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float: left"</span> @<span class="hljs-attr">confirm</span>=<span class="hljs-string">"onConfirm"</span> <span class="hljs-attr">:student</span>=<span class="hljs-string">"this.student"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">student-list-info</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>学员列表<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span>
    <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData"</span>
    @<span class="hljs-attr">row-click</span>=<span class="hljs-string">"onRowClick"</span>
    <span class="hljs-attr">border</span>
    <span class="hljs-attr">stripe</span>
    <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
      <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span>
      <span class="hljs-attr">label</span>=<span class="hljs-string">"姓名"</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
      <span class="hljs-attr">prop</span>=<span class="hljs-string">"sex"</span>
      <span class="hljs-attr">label</span>=<span class="hljs-string">"性别"</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">"180"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
      <span class="hljs-attr">prop</span>=<span class="hljs-string">"age"</span>
      <span class="hljs-attr">label</span>=<span class="hljs-string">"年龄"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> studentListInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'./student-list-info'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'student-list'</span>,
  <span class="hljs-attr">components</span>: {
    studentListInfo
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">tableData</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'张楚岚'</span>,
        <span class="hljs-attr">sex</span>: <span class="hljs-string">'男'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-string">'23'</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'冯宝宝'</span>,
        <span class="hljs-attr">sex</span>: <span class="hljs-string">'女'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-string">'99'</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'赵方旭'</span>,
        <span class="hljs-attr">sex</span>: <span class="hljs-string">'男'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-string">'59'</span>
      },
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'肖自在'</span>,
        <span class="hljs-attr">sex</span>: <span class="hljs-string">'男'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-string">'36'</span>
      }
      ],
      <span class="hljs-attr">student</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">sex</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">0</span>
      }
    }
  },

  <span class="hljs-attr">methods</span>: {
    onConfirm (item) {
      <span class="hljs-keyword">this</span>.tableData.push(item)
    },
    onRowClick (row) {
      <span class="hljs-keyword">this</span>.student = {
        <span class="hljs-attr">name</span>: row.name,
        <span class="hljs-attr">sex</span>: row.sex,
        <span class="hljs-attr">age</span>: row.age
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h1 id="articleHeader4">3.查看效果</h1>
<h2 id="articleHeader5">1.添加学员信息</h2>
<p><span class="img-wrap"><img data-src="/img/bVbaJIE?w=623&amp;h=627" src="https://static.alili.tech/img/bVbaJIE?w=623&amp;h=627" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbaJIP?w=599&amp;h=519" src="https://static.alili.tech/img/bVbaJIP?w=599&amp;h=519" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">2.查看学员信息</h2>
<p>查看功能一直没有思路，只能先记录一下现在的想法，拿已有的知识来实现他啦</p>
<p>先选中要查看的行，然后点击按钮展示选中的学员信息。<br><span class="img-wrap"><img data-src="/img/bVbaJI2?w=599&amp;h=593" src="https://static.alili.tech/img/bVbaJI2?w=599&amp;h=593" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader7">小节</h1>
<p>现在的能力真的很有限，再加上知识面太窄，目前没有找到好的方式可以直接点击行弹出表单信息而不报错的方式，不过我相信用不了多久就可以实现啦，1点了，累，睡啦...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的 Vue.js 学习日记 （十一） - 父子组件间的互相传值

## 原文链接
[https://segmentfault.com/a/1190000014913046](https://segmentfault.com/a/1190000014913046)

