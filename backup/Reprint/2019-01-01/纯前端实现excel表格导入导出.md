---
title: '纯前端实现excel表格导入导出' 
date: 2019-01-01 2:30:07
hidden: true
slug: wopfkkbujh
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>github: <a href="https://github.com/stardew516/xlsxDwonload" rel="nofollow noreferrer" target="_blank">https://github.com/stardew516...</a></p>
<p>以往做excel表格下载功能的时候，都是后端生成好表格后，存储在某个地方，然后给前端一个链接，前端使用a标签加download下载，或者使用node。其实纯前端也是可以做表格下载的，有一个很好用的javascript插件叫js-xlsx。</p>
<h3 id="articleHeader1">js-xlsx</h3>
<p>github：<a href="https://github.com/tealeg/xlsx" rel="nofollow noreferrer" target="_blank">https://github.com/tealeg/xlsx</a><br>使用js-xlsx时，前端可以将后端返回的json数据拼接成自己需要导出的格式，下载到电脑中，完全不依赖后端。导入只需像平时一样选择文件，然后解析excel表格数据，转换成json格式。</p>
<p>目前js-xlsx对各浏览器的支持情况如下图所示：<br><span class="img-wrap"><img data-src="/img/remote/1460000011057154" src="https://static.alili.tech/img/remote/1460000011057154" alt="js-xlsx兼容性" title="js-xlsx兼容性" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">用法</h3>
<p>以vue使用为例</p>
<ol>
<li><p>vue-cli脚手架搭好框架</p></li>
<li><p>安装包xlsx<code>npm install xlsx --save</code></p></li>
<li>
<p>代码实现（全）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;index&quot; v-loading.fullscreen.lock=&quot;fullscreenLoading&quot; element-loading-text=&quot;拼命加载中...&quot;>
  <input type=&quot;file&quot; @change=&quot;importFile(this)&quot; id=&quot;imFile&quot; style=&quot;display: none&quot;
     accept=&quot;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel&quot;/>
  <a id=&quot;downlink&quot;></a>
  <el-button class=&quot;button&quot; @click=&quot;uploadFile()&quot;>导入</el-button>
  <el-button class=&quot;button&quot; @click=&quot;downloadFile(excelData)&quot;>导出</el-button>
  <!--错误信息提示-->
  <el-dialog title=&quot;提示&quot; v-model=&quot;errorDialog&quot; size=&quot;tiny&quot;>
<span>"{{"errorMsg"}}"</span>
  <span slot=&quot;footer&quot; class=&quot;dialog-footer&quot;>
    <el-button type=&quot;primary&quot; @click=&quot;errorDialog=false&quot;>确认</el-button>
  </span>
  </el-dialog>
  <!--展示导入信息-->
  <el-table :data=&quot;excelData&quot; tooltip-effect=&quot;dark&quot;>
<el-table-column label=&quot;名称&quot; prop=&quot;name&quot; show-overflow-tooltip></el-table-column>
<el-table-column label=&quot;分量&quot; prop=&quot;size&quot; show-overflow-tooltip></el-table-column>
<el-table-column label=&quot;口味&quot; prop=&quot;taste&quot; show-overflow-tooltip></el-table-column>
<el-table-column label=&quot;单价(元)&quot; prop=&quot;price&quot; show-overflow-tooltip></el-table-column>
<el-table-column label=&quot;剩余(份)&quot; prop=&quot;remain&quot; show-overflow-tooltip></el-table-column>
  </el-table>
</div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
export default {
  name: 'Index',
  data () {
return {
  fullscreenLoading: false, // 加载中
  imFile: '', // 导入文件el
  outFile: '',  // 导出文件el
  errorDialog: false, // 错误信息弹窗
  errorMsg: '', // 错误信息内容
  excelData: [  // 测试数据
    {
      name: '红烧鱼', size: '大', taste: '微辣', price: '40', remain: '100'
    },
    {
      name: '麻辣小龙虾', size: '大', taste: '麻辣', price: '138', remain: '200'
    },
    {
      name: '清蒸小龙虾', size: '大', taste: '清淡', price: '138', remain: '200'
    },
    {
      name: '香辣小龙虾', size: '大', taste: '特辣', price: '138', remain: '200'
    },
    {
      name: '十三香小龙虾', size: '大', taste: '中辣', price: '138', remain: '108'
    },
    {
      name: '蒜蓉小龙虾', size: '大', taste: '中辣', price: '138', remain: '100'
    },
    {
      name: '凉拌牛肉', size: '中', taste: '中辣', price: '48', remain: '60'
    },
    {
      name: '虾仁寿司', size: '大', taste: '清淡', price: '29', remain: '无限'
    },
    {
      name: '海苔寿司', size: '大', taste: '微辣', price: '26', remain: '无限'
    },
    {
      name: '金针菇寿司', size: '大', taste: '清淡', price: '23', remain: '无限'
    },
    {
      name: '泡菜寿司', size: '大', taste: '微辣', price: '24', remain: '无限'
    },
    {
      name: '鳗鱼寿司', size: '大', taste: '清淡', price: '28', remain: '无限'
    },
    {
      name: '肉松寿司', size: '大', taste: '清淡', price: '22', remain: '无限'
    },
    {
      name: '三文鱼寿司', size: '大', taste: '清淡', price: '30', remain: '无限'
    },
    {
      name: '蛋黄寿司', size: '大', taste: '清淡', price: '20', remain: '无限'
    }
  ]
}
  },
  mounted () {
this.imFile = document.getElementById('imFile')
this.outFile = document.getElementById('downlink')
  },
  methods: {
uploadFile: function () { // 点击导入按钮
  this.imFile.click()
},
downloadFile: function (rs) { // 点击导出按钮
  let data = [{}]
  for (let k in rs[0]) {
    data[0][k] = k
  }
  data = data.concat(rs)
  this.downloadExl(data, '菜单')
},
importFile: function () { // 导入excel
  this.fullscreenLoading = true
  let obj = this.imFile
  if (!obj.files) {
    this.fullscreenLoading = false
    return
  }
  var f = obj.files[0]
  var reader = new FileReader()
  let $t = this
  reader.onload = function (e) {
    var data = e.target.result
    if ($t.rABS) {
      $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
        type: 'base64'
      })
    } else {
      $t.wb = XLSX.read(data, {
        type: 'binary'
      })
    }
    let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
    console.log(typeof json)
    $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
  }
  if (this.rABS) {
    reader.readAsArrayBuffer(f)
  } else {
    reader.readAsBinaryString(f)
  }
},
downloadExl: function (json, downName, type) {  // 导出到excel
  let keyMap = [] // 获取键
  for (let k in json[0]) {
    keyMap.push(k)
  }
  console.info('keyMap', keyMap, json)
  let tmpdata = [] // 用来保存转换好的json
  json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    v: v[k],
    position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
  }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
    tmpdata[v.position] = {
      v: v.v
    }
  })
  let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
  let tmpWB = {
    SheetNames: ['mySheet'], // 保存的表标题
    Sheets: {
      'mySheet': Object.assign({},
        tmpdata, // 内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
        })
    }
  }
  let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
    {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
  ))], {
    type: ''
  })  // 创建二进制对象写入转换好的字节流
  var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
  this.outFile.download = downName + '.xlsx'  // 下载名称
  this.outFile.href = href  // 绑定a标签
  this.outFile.click()  // 模拟点击实现下载
  setTimeout(function () {  // 延时释放
    URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
  }, 100)
},
analyzeData: function (data) {  // 此处可以解析导入数据
  return data
},
dealFile: function (data) {   // 处理导入的数据
  console.log(data)
  this.imFile.value = ''
  this.fullscreenLoading = false
  if (data.length <= 0) {
    this.errorDialog = true
    this.errorMsg = '请导入正确信息'
  } else {
    this.excelData = data
  }
},
s2ab: function (s) { // 字符串转字符流
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) &amp; 0xFF
  }
  return buf
},
getCharCol: function (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
  let s = ''
  let m = 0
  while (n > 0) {
    m = n % 26 + 1
    s = String.fromCharCode(m + 64) + s
    n = (n - m) / 26
  }
  return s
},
fixdata: function (data) {  // 文件流转BinaryString
  var o = ''
  var l = 0
  var w = 10240
  for (; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  }
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
  return o
}
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style>
.el-table th>.cell {
  text-align: center;
}
.button {
  margin-bottom: 20px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">v-loading.fullscreen.lock</span>=<span class="hljs-string">"fullscreenLoading"</span> <span class="hljs-attr">element-loading-text</span>=<span class="hljs-string">"拼命加载中..."</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"importFile(this)"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"imFile"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none"</span>
     <span class="hljs-attr">accept</span>=<span class="hljs-string">"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"downlink"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"uploadFile()"</span>&gt;</span>导入<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"downloadFile(excelData)"</span>&gt;</span>导出<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
  <span class="hljs-comment">&lt;!--错误信息提示--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"提示"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"errorDialog"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"tiny"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"errorMsg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-footer"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"errorDialog=false"</span>&gt;</span>确认<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
  <span class="hljs-comment">&lt;!--展示导入信息--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">"excelData"</span> <span class="hljs-attr">tooltip-effect</span>=<span class="hljs-string">"dark"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"名称"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"分量"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"size"</span> <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"口味"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"taste"</span> <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"单价(元)"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"price"</span> <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"剩余(份)"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"remain"</span> <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 引入xlsx</span>
<span class="hljs-keyword">var</span> XLSX = <span class="hljs-built_in">require</span>(<span class="hljs-string">'xlsx'</span>)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Index'</span>,
  data () {
<span class="hljs-keyword">return</span> {
  <span class="hljs-attr">fullscreenLoading</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 加载中</span>
  imFile: <span class="hljs-string">''</span>, <span class="hljs-comment">// 导入文件el</span>
  outFile: <span class="hljs-string">''</span>,  <span class="hljs-comment">// 导出文件el</span>
  errorDialog: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 错误信息弹窗</span>
  errorMsg: <span class="hljs-string">''</span>, <span class="hljs-comment">// 错误信息内容</span>
  excelData: [  <span class="hljs-comment">// 测试数据</span>
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'红烧鱼'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'微辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'40'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'100'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'麻辣小龙虾'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'麻辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'138'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'200'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'清蒸小龙虾'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'清淡'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'138'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'200'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'香辣小龙虾'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'特辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'138'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'200'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'十三香小龙虾'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'中辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'138'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'108'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'蒜蓉小龙虾'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'中辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'138'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'100'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'凉拌牛肉'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'中'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'中辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'48'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'60'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'虾仁寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'清淡'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'29'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'海苔寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'微辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'26'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'金针菇寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'清淡'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'23'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'泡菜寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'微辣'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'24'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'鳗鱼寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'清淡'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'28'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'肉松寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'清淡'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'22'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'三文鱼寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'清淡'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'30'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    },
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'蛋黄寿司'</span>, <span class="hljs-attr">size</span>: <span class="hljs-string">'大'</span>, <span class="hljs-attr">taste</span>: <span class="hljs-string">'清淡'</span>, <span class="hljs-attr">price</span>: <span class="hljs-string">'20'</span>, <span class="hljs-attr">remain</span>: <span class="hljs-string">'无限'</span>
    }
  ]
}
  },
  mounted () {
<span class="hljs-keyword">this</span>.imFile = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'imFile'</span>)
<span class="hljs-keyword">this</span>.outFile = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'downlink'</span>)
  },
  <span class="hljs-attr">methods</span>: {
<span class="hljs-attr">uploadFile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 点击导入按钮</span>
  <span class="hljs-keyword">this</span>.imFile.click()
},
<span class="hljs-attr">downloadFile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">rs</span>) </span>{ <span class="hljs-comment">// 点击导出按钮</span>
  <span class="hljs-keyword">let</span> data = [{}]
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> rs[<span class="hljs-number">0</span>]) {
    data[<span class="hljs-number">0</span>][k] = k
  }
  data = data.concat(rs)
  <span class="hljs-keyword">this</span>.downloadExl(data, <span class="hljs-string">'菜单'</span>)
},
<span class="hljs-attr">importFile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 导入excel</span>
  <span class="hljs-keyword">this</span>.fullscreenLoading = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">let</span> obj = <span class="hljs-keyword">this</span>.imFile
  <span class="hljs-keyword">if</span> (!obj.files) {
    <span class="hljs-keyword">this</span>.fullscreenLoading = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">var</span> f = obj.files[<span class="hljs-number">0</span>]
  <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader()
  <span class="hljs-keyword">let</span> $t = <span class="hljs-keyword">this</span>
  reader.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> data = e.target.result
    <span class="hljs-keyword">if</span> ($t.rABS) {
      $t.wb = XLSX.read(btoa(<span class="hljs-keyword">this</span>.fixdata(data)), {  <span class="hljs-comment">// 手动转化</span>
        type: <span class="hljs-string">'base64'</span>
      })
    } <span class="hljs-keyword">else</span> {
      $t.wb = XLSX.read(data, {
        <span class="hljs-attr">type</span>: <span class="hljs-string">'binary'</span>
      })
    }
    <span class="hljs-keyword">let</span> json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[<span class="hljs-number">0</span>]])
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> json)
    $t.dealFile($t.analyzeData(json)) <span class="hljs-comment">// analyzeData: 解析导入数据</span>
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.rABS) {
    reader.readAsArrayBuffer(f)
  } <span class="hljs-keyword">else</span> {
    reader.readAsBinaryString(f)
  }
},
<span class="hljs-attr">downloadExl</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">json, downName, type</span>) </span>{  <span class="hljs-comment">// 导出到excel</span>
  <span class="hljs-keyword">let</span> keyMap = [] <span class="hljs-comment">// 获取键</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> k <span class="hljs-keyword">in</span> json[<span class="hljs-number">0</span>]) {
    keyMap.push(k)
  }
  <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'keyMap'</span>, keyMap, json)
  <span class="hljs-keyword">let</span> tmpdata = [] <span class="hljs-comment">// 用来保存转换好的json</span>
  json.map(<span class="hljs-function">(<span class="hljs-params">v, i</span>) =&gt;</span> keyMap.map(<span class="hljs-function">(<span class="hljs-params">k, j</span>) =&gt;</span> <span class="hljs-built_in">Object</span>.assign({}, {
    <span class="hljs-attr">v</span>: v[k],
    <span class="hljs-attr">position</span>: (j &gt; <span class="hljs-number">25</span> ? <span class="hljs-keyword">this</span>.getCharCol(j) : <span class="hljs-built_in">String</span>.fromCharCode(<span class="hljs-number">65</span> + j)) + (i + <span class="hljs-number">1</span>)
  }))).reduce(<span class="hljs-function">(<span class="hljs-params">prev, next</span>) =&gt;</span> prev.concat(next)).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v</span>) </span>{
    tmpdata[v.position] = {
      <span class="hljs-attr">v</span>: v.v
    }
  })
  <span class="hljs-keyword">let</span> outputPos = <span class="hljs-built_in">Object</span>.keys(tmpdata)  <span class="hljs-comment">// 设置区域,比如表格从A1到D10</span>
  <span class="hljs-keyword">let</span> tmpWB = {
    <span class="hljs-attr">SheetNames</span>: [<span class="hljs-string">'mySheet'</span>], <span class="hljs-comment">// 保存的表标题</span>
    Sheets: {
      <span class="hljs-string">'mySheet'</span>: <span class="hljs-built_in">Object</span>.assign({},
        tmpdata, <span class="hljs-comment">// 内容</span>
        {
          <span class="hljs-string">'!ref'</span>: outputPos[<span class="hljs-number">0</span>] + <span class="hljs-string">':'</span> + outputPos[outputPos.length - <span class="hljs-number">1</span>] <span class="hljs-comment">// 设置填充区域</span>
        })
    }
  }
  <span class="hljs-keyword">let</span> tmpDown = <span class="hljs-keyword">new</span> Blob([<span class="hljs-keyword">this</span>.s2ab(XLSX.write(tmpWB,
    {<span class="hljs-attr">bookType</span>: (type === <span class="hljs-literal">undefined</span> ? <span class="hljs-string">'xlsx'</span> : type), <span class="hljs-attr">bookSST</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'binary'</span>} <span class="hljs-comment">// 这里的数据是用来定义导出的格式类型</span>
  ))], {
    <span class="hljs-attr">type</span>: <span class="hljs-string">''</span>
  })  <span class="hljs-comment">// 创建二进制对象写入转换好的字节流</span>
  <span class="hljs-keyword">var</span> href = URL.createObjectURL(tmpDown)  <span class="hljs-comment">// 创建对象超链接</span>
  <span class="hljs-keyword">this</span>.outFile.download = downName + <span class="hljs-string">'.xlsx'</span>  <span class="hljs-comment">// 下载名称</span>
  <span class="hljs-keyword">this</span>.outFile.href = href  <span class="hljs-comment">// 绑定a标签</span>
  <span class="hljs-keyword">this</span>.outFile.click()  <span class="hljs-comment">// 模拟点击实现下载</span>
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  <span class="hljs-comment">// 延时释放</span>
    URL.revokeObjectURL(tmpDown) <span class="hljs-comment">// 用URL.revokeObjectURL()来释放这个object URL</span>
  }, <span class="hljs-number">100</span>)
},
<span class="hljs-attr">analyzeData</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{  <span class="hljs-comment">// 此处可以解析导入数据</span>
  <span class="hljs-keyword">return</span> data
},
<span class="hljs-attr">dealFile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{   <span class="hljs-comment">// 处理导入的数据</span>
  <span class="hljs-built_in">console</span>.log(data)
  <span class="hljs-keyword">this</span>.imFile.value = <span class="hljs-string">''</span>
  <span class="hljs-keyword">this</span>.fullscreenLoading = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">if</span> (data.length &lt;= <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">this</span>.errorDialog = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">this</span>.errorMsg = <span class="hljs-string">'请导入正确信息'</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.excelData = data
  }
},
<span class="hljs-attr">s2ab</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">s</span>) </span>{ <span class="hljs-comment">// 字符串转字符流</span>
  <span class="hljs-keyword">var</span> buf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(s.length)
  <span class="hljs-keyword">var</span> view = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(buf)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) &amp; <span class="hljs-number">0xFF</span>
  }
  <span class="hljs-keyword">return</span> buf
},
<span class="hljs-attr">getCharCol</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">n</span>) </span>{ <span class="hljs-comment">// 将指定的自然数转换为26进制表示。映射关系：[0-25] -&gt; [A-Z]。</span>
  <span class="hljs-keyword">let</span> s = <span class="hljs-string">''</span>
  <span class="hljs-keyword">let</span> m = <span class="hljs-number">0</span>
  <span class="hljs-keyword">while</span> (n &gt; <span class="hljs-number">0</span>) {
    m = n % <span class="hljs-number">26</span> + <span class="hljs-number">1</span>
    s = <span class="hljs-built_in">String</span>.fromCharCode(m + <span class="hljs-number">64</span>) + s
    n = (n - m) / <span class="hljs-number">26</span>
  }
  <span class="hljs-keyword">return</span> s
},
<span class="hljs-attr">fixdata</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{  <span class="hljs-comment">// 文件流转BinaryString</span>
  <span class="hljs-keyword">var</span> o = <span class="hljs-string">''</span>
  <span class="hljs-keyword">var</span> l = <span class="hljs-number">0</span>
  <span class="hljs-keyword">var</span> w = <span class="hljs-number">10240</span>
  <span class="hljs-keyword">for</span> (; l &lt; data.byteLength / w; ++l) {
    o += <span class="hljs-built_in">String</span>.fromCharCode.apply(<span class="hljs-literal">null</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(data.slice(l * w, l * w + w)))
  }
  o += <span class="hljs-built_in">String</span>.fromCharCode.apply(<span class="hljs-literal">null</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(data.slice(l * w)))
  <span class="hljs-keyword">return</span> o
}
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.el-table</span> <span class="hljs-selector-tag">th</span>&gt;<span class="hljs-selector-class">.cell</span> {
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.button</span> {
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
</li>
<li><p>启动项目<code>npm run dev</code></p></li>
</ol>
<h3 id="articleHeader3">效果图</h3>
<p><span class="img-wrap"><img data-src="/img/bVUxSk?w=1916&amp;h=1326" src="https://static.alili.tech/img/bVUxSk?w=1916&amp;h=1326" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯前端实现excel表格导入导出

## 原文链接
[https://segmentfault.com/a/1190000011057149](https://segmentfault.com/a/1190000011057149)

