---
title: 'Element 默认勾选表格 toggleRowSelection' 
date: 2019-01-16 2:30:08
hidden: true
slug: wr9bm1wv9e9
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://element.eleme.io/#/zh-CN/component/table#table-methods" rel="nofollow noreferrer" target="_blank">官网</a>尽管提供了toggleRowSelection方法，但没有提供demo实例。<br>通过了解，结合vue的特殊属性ref引用到Dom元素上，再执行dom上的toggleRowSelection方法。</p>
<p><span class="img-wrap"><img data-src="/img/bVMlSa?w=907&amp;h=260" src="https://static.alili.tech/img/bVMlSa?w=907&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>以下通过三种不同的数据来源实现table默认勾选对应的列：</p>
<h3 id="articleHeader0">1、固定写在data数据里：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意el-table上有一个ref=&quot;table&quot;的属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code style="word-break: break-word; white-space: initial;">注意el-<span class="hljs-keyword">table</span>上有一个<span class="hljs-keyword">ref</span>=<span class="hljs-string">"table"</span>的属性</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
<template>
  <el-table :data=&quot;tableData3&quot; border ref=&quot;table&quot; style=&quot;width: 100%&quot; @selection-change=&quot;handleSelectionChange&quot;>
    <el-table-column type=&quot;selection&quot; width=&quot;55&quot;>
    </el-table-column>
    <el-table-column label=&quot;日期&quot; width=&quot;120&quot;>
      <template scope=&quot;scope&quot;>"{{" scope.row.date "}}"</template>
    </el-table-column>
    <el-table-column prop=&quot;name&quot; label=&quot;姓名&quot; width=&quot;120&quot;>
    </el-table-column>
    <el-table-column prop=&quot;address&quot; label=&quot;地址&quot; show-overflow-tooltip>
    </el-table-column>
  </el-table>
</template>
<el-button type=&quot;primary&quot; @click=&quot;get()&quot;>ajax</el-button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData3"</span> <span class="hljs-attr">border</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"table"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100%"</span> @<span class="hljs-attr">selection-change</span>=<span class="hljs-string">"handleSelectionChange"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"selection"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"55"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"日期"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"120"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"scope"</span>&gt;</span></span><span class="hljs-template-variable">"{{" scope.row.date "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"姓名"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"120"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"address"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"地址"</span> <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"get()"</span>&gt;</span>ajax<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>在勾子函数mounted里执行checked方法，可以自行测试在实例挂载之前beforeMount和挂载后mounted均使用。<br>this.$refs.table.toggleRowSelection(this.tableData3[0],true);就是本文的默认勾选的重点，toggleRowSelection(row, selected)接受两个参数，row传递被勾选行的数据，selected设置是否选中，这个官网写得很清楚就不多说了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Main = {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    mounted(){
        this.checked();//每次更新了数据，触发这个函数即可。
    },
    methods: {
        checked(){
              //首先el-table添加ref=&quot;table&quot;引用标识
            this.$refs.table.toggleRowSelection(this.tableData3[0],true);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> Main = {
    <span class="hljs-keyword">data</span>() {
      <span class="hljs-keyword">return</span> {
        tableData3: [{
          date: <span class="hljs-string">'2016-05-03'</span>,
          name: <span class="hljs-string">'王小虎'</span>,
          address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
        }, {
          date: <span class="hljs-string">'2016-05-02'</span>,
          name: <span class="hljs-string">'王小虎'</span>,
          address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
        }, {
          date: <span class="hljs-string">'2016-05-04'</span>,
          name: <span class="hljs-string">'王小虎'</span>,
          address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
        }, {
          date: <span class="hljs-string">'2016-05-01'</span>,
          name: <span class="hljs-string">'王小虎'</span>,
          address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
        }, {
          date: <span class="hljs-string">'2016-05-08'</span>,
          name: <span class="hljs-string">'王小虎'</span>,
          address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
        }, {
          date: <span class="hljs-string">'2016-05-06'</span>,
          name: <span class="hljs-string">'王小虎'</span>,
          address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
        }, {
          date: <span class="hljs-string">'2016-05-07'</span>,
          name: <span class="hljs-string">'王小虎'</span>,
          address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
        }],
        multipleSelection: []
      }
    },
    mounted(){
        <span class="hljs-keyword">this</span>.checked();<span class="hljs-comment">//每次更新了数据，触发这个函数即可。</span>
    },
    methods: {
        checked(){
              <span class="hljs-comment">//首先el-table添加ref="table"引用标识</span>
            <span class="hljs-keyword">this</span>.$refs.table.toggleRowSelection(<span class="hljs-keyword">this</span>.tableData3[<span class="hljs-number">0</span>],<span class="hljs-literal">true</span>);
      },
      handleSelectionChange(<span class="hljs-keyword">val</span>) {
        <span class="hljs-keyword">this</span>.multipleSelection = <span class="hljs-keyword">val</span>;
      }
    }
  }
<span class="hljs-keyword">var</span> Ctor = Vue.extend(Main)
new Ctor().$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<h3 id="articleHeader1">2、页面一加载使用ajax获得数据：</h3>
<p>这里使用定时器摸拟了一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Main = {
    data() {
      return {
        tableData3: [],
        multipleSelection: []
      }
    },
    mounted(){
        var _this = this;
          setTimeout(function(){
              _this.tableData3 = [{
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-08',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-06',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-07',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }];
            _this.$nextTick(function(){
                _this.checked();//每次更新了数据，触发这个函数即可。
        });       
      },3000);
    },
    methods: {
        checked(){
              //首先el-table添加ref=&quot;table&quot;引用标识
            this.$refs.table.toggleRowSelection(this.tableData3[0],true);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>var Main = {
    data() {
      return {
        tableData3: [],
        multipleSelection: []
      }
    },
    mounted(){
        var <span class="hljs-variable">_this</span> = this;
          setTimeout(function(){
              <span class="hljs-variable">_this</span>.tableData3 = [{
              <span class="hljs-built_in">date</span>: <span class="hljs-string">'2016-05-03'</span>,
              <span class="hljs-built_in">name</span>: <span class="hljs-string">'王小虎'</span>,
              address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
            }, {
              <span class="hljs-built_in">date</span>: <span class="hljs-string">'2016-05-02'</span>,
              <span class="hljs-built_in">name</span>: <span class="hljs-string">'王小虎'</span>,
              address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
            }, {
              <span class="hljs-built_in">date</span>: <span class="hljs-string">'2016-05-04'</span>,
              <span class="hljs-built_in">name</span>: <span class="hljs-string">'王小虎'</span>,
              address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
            }, {
              <span class="hljs-built_in">date</span>: <span class="hljs-string">'2016-05-01'</span>,
              <span class="hljs-built_in">name</span>: <span class="hljs-string">'王小虎'</span>,
              address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
            }, {
              <span class="hljs-built_in">date</span>: <span class="hljs-string">'2016-05-08'</span>,
              <span class="hljs-built_in">name</span>: <span class="hljs-string">'王小虎'</span>,
              address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
            }, {
              <span class="hljs-built_in">date</span>: <span class="hljs-string">'2016-05-06'</span>,
              <span class="hljs-built_in">name</span>: <span class="hljs-string">'王小虎'</span>,
              address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
            }, {
              <span class="hljs-built_in">date</span>: <span class="hljs-string">'2016-05-07'</span>,
              <span class="hljs-built_in">name</span>: <span class="hljs-string">'王小虎'</span>,
              address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
            }];
            <span class="hljs-variable">_this</span>.$nextTick(function(){
                <span class="hljs-variable">_this</span>.checked();<span class="hljs-comment">//每次更新了数据，触发这个函数即可。</span>
        });       
      },<span class="hljs-number">3000</span>);
    },
    methods: {
        checked(){
              <span class="hljs-comment">//首先el-table添加ref="table"引用标识</span>
            this.$refs.table.toggleRowSelection(this.tableData3[<span class="hljs-number">0</span>],<span class="hljs-literal">true</span>);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<h3 id="articleHeader2">3、一开始并没有数据时：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Main = {
            data() {
                return {
                    tableData3: [],
                    multipleSelection: []
                }
            },
            beforeMount() {
            },
            methods: {
                checked(){
                      //首先el-table添加ref=&quot;table&quot;引用标识
                    this.$refs.table.toggleRowSelection(this.tableData3[2],true);
                  },
                  handleSelectionChange(val) {
                       this.multipleSelection = val;
                  },
                get(){
                    var datas=[{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }];
                    this.tableData3 = datas;
                    this.$nextTick(function(){
                        this.checked();//每次更新了数据，触发这个函数即可。
                     })
                    
                }
            }
        }
        var Ctor = Vue.extend(Main)
        new Ctor().$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> Main = {
            <span class="hljs-keyword">data</span>() {
                <span class="hljs-keyword">return</span> {
                    tableData3: [],
                    multipleSelection: []
                }
            },
            beforeMount() {
            },
            methods: {
                checked(){
                      <span class="hljs-comment">//首先el-table添加ref="table"引用标识</span>
                    <span class="hljs-keyword">this</span>.$refs.table.toggleRowSelection(<span class="hljs-keyword">this</span>.tableData3[<span class="hljs-number">2</span>],<span class="hljs-literal">true</span>);
                  },
                  handleSelectionChange(<span class="hljs-keyword">val</span>) {
                       <span class="hljs-keyword">this</span>.multipleSelection = <span class="hljs-keyword">val</span>;
                  },
                <span class="hljs-keyword">get</span>(){
                    <span class="hljs-keyword">var</span> datas=[{
                        date: <span class="hljs-string">'2016-05-03'</span>,
                        name: <span class="hljs-string">'王小虎'</span>,
                        address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                    }, {
                        date: <span class="hljs-string">'2016-05-02'</span>,
                        name: <span class="hljs-string">'王小虎'</span>,
                        address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                    }, {
                        date: <span class="hljs-string">'2016-05-04'</span>,
                        name: <span class="hljs-string">'王小虎'</span>,
                        address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                    }, {
                        date: <span class="hljs-string">'2016-05-01'</span>,
                        name: <span class="hljs-string">'王小虎'</span>,
                        address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                    }, {
                        date: <span class="hljs-string">'2016-05-08'</span>,
                        name: <span class="hljs-string">'王小虎'</span>,
                        address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                    }, {
                        date: <span class="hljs-string">'2016-05-06'</span>,
                        name: <span class="hljs-string">'王小虎'</span>,
                        address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                    }, {
                        date: <span class="hljs-string">'2016-05-07'</span>,
                        name: <span class="hljs-string">'王小虎'</span>,
                        address: <span class="hljs-string">'上海市普陀区金沙江路 1518 弄'</span>
                    }];
                    <span class="hljs-keyword">this</span>.tableData3 = datas;
                    <span class="hljs-keyword">this</span>.$nextTick(function(){
                        <span class="hljs-keyword">this</span>.checked();<span class="hljs-comment">//每次更新了数据，触发这个函数即可。</span>
                     })
                    
                }
            }
        }
        <span class="hljs-keyword">var</span> Ctor = Vue.extend(Main)
        new Ctor().$mount(<span class="hljs-string">'#app'</span>)</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Element 默认勾选表格 toggleRowSelection

## 原文链接
[https://segmentfault.com/a/1190000009101950](https://segmentfault.com/a/1190000009101950)

