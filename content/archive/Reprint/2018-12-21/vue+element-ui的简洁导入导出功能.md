---
title: 'vue+element-ui的简洁导入导出功能' 
date: 2018-12-21 2:30:11
hidden: true
slug: xw95igllic
categories: [reprint]
---

{{< raw >}}

                    
<p>1.前段后台管理系统中数据展示一般都是用表格,表格会涉及到导入和导出;<br>2.导入是利用element-ui的Upload 上传组件;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload class=&quot;upload-demo&quot;
        :action=&quot;importUrl&quot;//上传的路径
        :name =&quot;name&quot;//上传的文件字段名
        :headers=&quot;importHeaders&quot;//请求头格式
        :on-preview=&quot;handlePreview&quot;//可以通过 file.response 拿到服务端返回数据
        :on-remove=&quot;handleRemove&quot;//文件移除
        :before-upload=&quot;beforeUpload&quot;//上传前配置
        :on-error=&quot;uploadFail&quot;//上传错误
        :on-success=&quot;uploadSuccess&quot;//上传成功
        :file-list=&quot;fileList&quot;//上传的文件列表
        :with-credentials=&quot;withCredentials&quot;>//是否支持cookie信息发送
</el-upload>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;el-upload <span class="hljs-keyword">class</span>=<span class="hljs-string">"upload-demo"</span>
        :action=<span class="hljs-string">"importUrl"</span><span class="hljs-comment">//上传的路径</span>
        :name =<span class="hljs-string">"name"</span><span class="hljs-comment">//上传的文件字段名</span>
        :headers=<span class="hljs-string">"importHeaders"</span><span class="hljs-comment">//请求头格式</span>
        :<span class="hljs-keyword">on</span>-preview=<span class="hljs-string">"handlePreview"</span><span class="hljs-comment">//可以通过 file.response 拿到服务端返回数据</span>
        :<span class="hljs-keyword">on</span>-remove=<span class="hljs-string">"handleRemove"</span><span class="hljs-comment">//文件移除</span>
        :before-upload=<span class="hljs-string">"beforeUpload"</span><span class="hljs-comment">//上传前配置</span>
        :<span class="hljs-keyword">on</span>-<span class="hljs-keyword">error</span>=<span class="hljs-string">"uploadFail"</span><span class="hljs-comment">//上传错误</span>
        :<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"uploadSuccess"</span><span class="hljs-comment">//上传成功</span>
        :<span class="hljs-keyword">file</span>-<span class="hljs-keyword">list</span>=<span class="hljs-string">"fileList"</span><span class="hljs-comment">//上传的文件列表</span>
        :with-credentials=<span class="hljs-string">"withCredentials"</span>&gt;<span class="hljs-comment">//是否支持cookie信息发送</span>
&lt;/el-upload&gt;
</code></pre>
<p>3.导出是利用file的一个对象blob;通过调用后台接口拿到数据,然后用数据来实例化blob,利用a标签的href属性链接到blob对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fileNames={
1:'模板一',
2:'模板二',
3:'模板三',
4:'模板四',
}
 export const downloadTemplate = function (scheduleType) {
        axios.get('/demo/template', {
            params: {
                &quot;demoType&quot;: demoType
            },
            responseType: 'arraybuffer'
        }).then((response) => {
            //创建一个blob对象,file的一种
            let blob = new Blob([response.data], { type: 'application/x-xls' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            //配置下载的文件名
            link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
            link.click()
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fileNames={
<span class="hljs-number">1</span>:<span class="hljs-string">'模板一'</span>,
<span class="hljs-number">2</span>:<span class="hljs-string">'模板二'</span>,
<span class="hljs-number">3</span>:<span class="hljs-string">'模板三'</span>,
<span class="hljs-number">4</span>:<span class="hljs-string">'模板四'</span>,
}
 <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> downloadTemplate = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">scheduleType</span>) </span>{
        axios.get(<span class="hljs-string">'/demo/template'</span>, {
            <span class="hljs-attr">params</span>: {
                <span class="hljs-string">"demoType"</span>: demoType
            },
            <span class="hljs-attr">responseType</span>: <span class="hljs-string">'arraybuffer'</span>
        }).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
            <span class="hljs-comment">//创建一个blob对象,file的一种</span>
            <span class="hljs-keyword">let</span> blob = <span class="hljs-keyword">new</span> Blob([response.data], { <span class="hljs-attr">type</span>: <span class="hljs-string">'application/x-xls'</span> })
            <span class="hljs-keyword">let</span> link = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>)
            link.href = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob)
            <span class="hljs-comment">//配置下载的文件名</span>
            link.download = fileNames[scheduleType] + <span class="hljs-string">'_'</span> + response.headers.datestr + <span class="hljs-string">'.xls'</span>
            link.click()
        })
    }</code></pre>
<p>4.贴上整个小demo的完整代码,在后台开发可以直接拿过去用(vue文件)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>

  <el-table
    ref=&quot;multipleTable&quot;
    :data=&quot;tableData3&quot;
    tooltip-effect=&quot;dark&quot;
    border
    style=&quot;width: 80%&quot;
    @selection-change=&quot;handleSelectionChange&quot;>
    <el-table-column
      type=&quot;selection&quot;
      width=&quot;55&quot;>
    </el-table-column>
    <el-table-column
      label=&quot;日期&quot;
      width=&quot;120&quot;>
      <template slot-scope=&quot;scope&quot;>"{{" scope.row.date "}}"</template>
    </el-table-column>
    <el-table-column
      prop=&quot;name&quot;
      label=&quot;姓名&quot;
      width=&quot;120&quot;>
    </el-table-column>
    <el-table-column
      prop=&quot;address&quot;
      label=&quot;地址&quot;
      show-overflow-tooltip>
    </el-table-column>
  </el-table>

  <div style=&quot;margin-top: 20px&quot;>
    <el-button @click=&quot;toggleSelection([tableData3[1], tableData3[2]])&quot;>切换第二、第三行的选中状态</el-button>
    <el-button @click=&quot;toggleSelection()&quot;>取消选择</el-button>
    <el-button type=&quot;primary&quot; @click=&quot;importData&quot;>导入</el-button>
    <el-button type=&quot;primary&quot; @click=&quot;outportData&quot;>导出</el-button>
  </div>

  <!-- 导入 -->
  <el-dialog title=&quot;导入&quot; :visible.sync=&quot;dialogImportVisible&quot; :modal-append-to-body=&quot;false&quot; :close-on-click-modal=&quot;false&quot; class=&quot;dialog-import&quot;>
      <div :class=&quot;{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}&quot;>
        <el-upload class=&quot;upload-demo&quot;
        :action=&quot;importUrl&quot;
        :name =&quot;name&quot;
        :headers=&quot;importHeaders&quot;
        :on-preview=&quot;handlePreview&quot;
        :on-remove=&quot;handleRemove&quot;
        :before-upload=&quot;beforeUpload&quot;
        :on-error=&quot;uploadFail&quot;
        :on-success=&quot;uploadSuccess&quot;
        :file-list=&quot;fileList&quot;
        :with-credentials=&quot;withCredentials&quot;>
        <!-- 是否支持发送cookie信息 -->
          <el-button size=&quot;small&quot; type=&quot;primary&quot; :disabled=&quot;processing&quot;>"{{"uploadTip"}}"</el-button>
          <div slot=&quot;tip&quot; class=&quot;el-upload__tip&quot;>只能上传excel文件</div>
        </el-upload>
        <div class=&quot;download-template&quot;>
          <a class=&quot;btn-download&quot; @click=&quot;download&quot;>
            <i class=&quot;icon-download&quot;></i>下载模板</a>
        </div>
      </div>
      <div :class=&quot;{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}&quot; >
        <div class=&quot;failure-tips&quot;>
          <i class=&quot;el-icon-warning&quot;></i>导入失败</div>
        <div class=&quot;failure-reason&quot;>
          <h4>失败原因</h4>
          <ul>
            <li v-for=&quot;(error,index) in errorResults&quot; :key=&quot;index&quot;>第"{{"error.rowIdx + 1"}}"行，错误："{{"error.column"}}","{{"error.value"}}","{{"error.errorInfo"}}"</li>
          </ul>
        </div>
      </div>
    </el-dialog>

  <!-- 导出 -->
</div>
</template>

<script>
import * as scheduleApi from '@/api/schedule'
export default {
  data() {
    return {
      tableData3: [
        {
          date: &quot;2016-05-03&quot;,
          name: &quot;王小虎&quot;,
          address: &quot;上海市普陀区金沙江路 1518 弄&quot;
        },
        {
          date: &quot;2016-05-02&quot;,
          name: &quot;王小虎&quot;,
          address: &quot;上海市普陀区金沙江路 1518 弄&quot;
        },
        {
          date: &quot;2016-05-04&quot;,
          name: &quot;王小虎&quot;,
          address: &quot;上海市普陀区金沙江路 1518 弄&quot;
        },
        {
          date: &quot;2016-05-01&quot;,
          name: &quot;王小虎&quot;,
          address: &quot;上海市普陀区金沙江路 1518 弄&quot;
        },
        {
          date: &quot;2016-05-08&quot;,
          name: &quot;王小虎&quot;,
          address: &quot;上海市普陀区金沙江路 1518 弄&quot;
        },
        {
          date: &quot;2016-05-06&quot;,
          name: &quot;王小虎&quot;,
          address: &quot;上海市普陀区金沙江路 1518 弄&quot;
        },
        {
          date: &quot;2016-05-07&quot;,
          name: &quot;王小虎&quot;,
          address: &quot;上海市普陀区金沙江路 1518 弄&quot;
        }
      ],
      multipleSelection: [],
      importUrl:'www.baidu.com',//后台接口config.admin_url+'rest/schedule/import/'
      importHeaders:{
        enctype:'multipart/form-data',
        cityCode:''
      },
      name: 'import',
      fileList: [],
      withCredentials: true,
      processing: false,
      uploadTip:'点击上传',
      importFlag:1,
      dialogImportVisible:false,
      errorResults:[]
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      //复选框选择回填函数,val返回一整行的数据
      this.multipleSelection = val;
    },
    importData() {
      this.importFlag = 1
      this.fileList = []
      this.uploadTip = '点击上传'
      this.processing = false
      this.dialogImportVisible = true
    },
    outportData() {
      scheduleApi.downloadTemplate()
    },
    handlePreview(file) {
      //可以通过 file.response 拿到服务端返回数据
    },
    handleRemove(file, fileList) {
      //文件移除
    },
    beforeUpload(file){
      //上传前配置
      this.importHeaders.cityCode='上海'//可以配置请求头
      let excelfileExtend = &quot;.xls,.xlsx&quot;//设置文件格式
      let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
         this.$message.error('文件格式错误')
         return false
      }
      this.uploadTip = '正在处理中...'
      this.processing = true
    },
    //上传错误
    uploadFail(err, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      this.$message.error(err)
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      if (response.status === -1) {
        this.errorResults = response.data
        if (this.errorResults) {
          this.importFlag = 2
        } else {
          this.dialogImportVisible = false
          this.$message.error(response.errorMsg)
        }
      } else {
        this.importFlag = 3
        this.dialogImportVisible = false
        this.$message.info('导入成功')
        this.doSearch()
      }
    },
    //下载模板
    download() {
      //调用后台模板方法,和导出类似
      scheduleApi.downloadTemplate()
    },
  }
};
</script>

<style scoped>
.hide-dialog{
  display:none;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">el-table</span>
    <span class="hljs-attr">ref</span>=<span class="hljs-string">"multipleTable"</span>
    <span class="hljs-attr">:data</span>=<span class="hljs-string">"tableData3"</span>
    <span class="hljs-attr">tooltip-effect</span>=<span class="hljs-string">"dark"</span>
    <span class="hljs-attr">border</span>
    <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 80%"</span>
    @<span class="hljs-attr">selection-change</span>=<span class="hljs-string">"handleSelectionChange"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">"selection"</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">"55"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
      <span class="hljs-attr">label</span>=<span class="hljs-string">"日期"</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">"120"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"scope"</span>&gt;</span></span><span class="hljs-template-variable">"{{" scope.row.date "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
      <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span>
      <span class="hljs-attr">label</span>=<span class="hljs-string">"姓名"</span>
      <span class="hljs-attr">width</span>=<span class="hljs-string">"120"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-table-column</span>
      <span class="hljs-attr">prop</span>=<span class="hljs-string">"address"</span>
      <span class="hljs-attr">label</span>=<span class="hljs-string">"地址"</span>
      <span class="hljs-attr">show-overflow-tooltip</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-table-column</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">el-table</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-top: 20px"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleSelection([tableData3[1], tableData3[2]])"</span>&gt;</span>切换第二、第三行的选中状态<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggleSelection()"</span>&gt;</span>取消选择<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"importData"</span>&gt;</span>导入<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"outportData"</span>&gt;</span>导出<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- 导入 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"导入"</span> <span class="hljs-attr">:visible.sync</span>=<span class="hljs-string">"dialogImportVisible"</span> <span class="hljs-attr">:modal-append-to-body</span>=<span class="hljs-string">"false"</span> <span class="hljs-attr">:close-on-click-modal</span>=<span class="hljs-string">"false"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dialog-import"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-upload</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"upload-demo"</span>
        <span class="hljs-attr">:action</span>=<span class="hljs-string">"importUrl"</span>
        <span class="hljs-attr">:name</span> =<span class="hljs-string">"name"</span>
        <span class="hljs-attr">:headers</span>=<span class="hljs-string">"importHeaders"</span>
        <span class="hljs-attr">:on-preview</span>=<span class="hljs-string">"handlePreview"</span>
        <span class="hljs-attr">:on-remove</span>=<span class="hljs-string">"handleRemove"</span>
        <span class="hljs-attr">:before-upload</span>=<span class="hljs-string">"beforeUpload"</span>
        <span class="hljs-attr">:on-error</span>=<span class="hljs-string">"uploadFail"</span>
        <span class="hljs-attr">:on-success</span>=<span class="hljs-string">"uploadSuccess"</span>
        <span class="hljs-attr">:file-list</span>=<span class="hljs-string">"fileList"</span>
        <span class="hljs-attr">:with-credentials</span>=<span class="hljs-string">"withCredentials"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 是否支持发送cookie信息 --&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"small"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">"processing"</span>&gt;</span></span><span class="hljs-template-variable">"{{"uploadTip"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"tip"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-upload__tip"</span>&gt;</span>只能上传excel文件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-upload</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"download-template"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-download"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"download"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-download"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>下载模板<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}"</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"failure-tips"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-warning"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>导入失败<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"failure-reason"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>失败原因<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(error,index) in errorResults"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>第</span><span class="hljs-template-variable">"{{"error.rowIdx + 1"}}"</span><span class="xml">行，错误：</span><span class="hljs-template-variable">"{{"error.column"}}"</span><span class="xml">,</span><span class="hljs-template-variable">"{{"error.value"}}"</span><span class="xml">,</span><span class="hljs-template-variable">"{{"error.errorInfo"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>

  <span class="hljs-comment">&lt;!-- 导出 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> scheduleApi <span class="hljs-keyword">from</span> <span class="hljs-string">'@/api/schedule'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">tableData3</span>: [
        {
          <span class="hljs-attr">date</span>: <span class="hljs-string">"2016-05-03"</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">"王小虎"</span>,
          <span class="hljs-attr">address</span>: <span class="hljs-string">"上海市普陀区金沙江路 1518 弄"</span>
        },
        {
          <span class="hljs-attr">date</span>: <span class="hljs-string">"2016-05-02"</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">"王小虎"</span>,
          <span class="hljs-attr">address</span>: <span class="hljs-string">"上海市普陀区金沙江路 1518 弄"</span>
        },
        {
          <span class="hljs-attr">date</span>: <span class="hljs-string">"2016-05-04"</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">"王小虎"</span>,
          <span class="hljs-attr">address</span>: <span class="hljs-string">"上海市普陀区金沙江路 1518 弄"</span>
        },
        {
          <span class="hljs-attr">date</span>: <span class="hljs-string">"2016-05-01"</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">"王小虎"</span>,
          <span class="hljs-attr">address</span>: <span class="hljs-string">"上海市普陀区金沙江路 1518 弄"</span>
        },
        {
          <span class="hljs-attr">date</span>: <span class="hljs-string">"2016-05-08"</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">"王小虎"</span>,
          <span class="hljs-attr">address</span>: <span class="hljs-string">"上海市普陀区金沙江路 1518 弄"</span>
        },
        {
          <span class="hljs-attr">date</span>: <span class="hljs-string">"2016-05-06"</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">"王小虎"</span>,
          <span class="hljs-attr">address</span>: <span class="hljs-string">"上海市普陀区金沙江路 1518 弄"</span>
        },
        {
          <span class="hljs-attr">date</span>: <span class="hljs-string">"2016-05-07"</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">"王小虎"</span>,
          <span class="hljs-attr">address</span>: <span class="hljs-string">"上海市普陀区金沙江路 1518 弄"</span>
        }
      ],
      <span class="hljs-attr">multipleSelection</span>: [],
      <span class="hljs-attr">importUrl</span>:<span class="hljs-string">'www.baidu.com'</span>,<span class="hljs-comment">//后台接口config.admin_url+'rest/schedule/import/'</span>
      importHeaders:{
        <span class="hljs-attr">enctype</span>:<span class="hljs-string">'multipart/form-data'</span>,
        <span class="hljs-attr">cityCode</span>:<span class="hljs-string">''</span>
      },
      <span class="hljs-attr">name</span>: <span class="hljs-string">'import'</span>,
      <span class="hljs-attr">fileList</span>: [],
      <span class="hljs-attr">withCredentials</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">processing</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">uploadTip</span>:<span class="hljs-string">'点击上传'</span>,
      <span class="hljs-attr">importFlag</span>:<span class="hljs-number">1</span>,
      <span class="hljs-attr">dialogImportVisible</span>:<span class="hljs-literal">false</span>,
      <span class="hljs-attr">errorResults</span>:[]
    };
  },

  <span class="hljs-attr">methods</span>: {
    toggleSelection(rows) {
      <span class="hljs-keyword">if</span> (rows) {
        rows.forEach(<span class="hljs-function"><span class="hljs-params">row</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.$refs.multipleTable.toggleRowSelection(row);
        });
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      <span class="hljs-comment">//复选框选择回填函数,val返回一整行的数据</span>
      <span class="hljs-keyword">this</span>.multipleSelection = val;
    },
    importData() {
      <span class="hljs-keyword">this</span>.importFlag = <span class="hljs-number">1</span>
      <span class="hljs-keyword">this</span>.fileList = []
      <span class="hljs-keyword">this</span>.uploadTip = <span class="hljs-string">'点击上传'</span>
      <span class="hljs-keyword">this</span>.processing = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.dialogImportVisible = <span class="hljs-literal">true</span>
    },
    outportData() {
      scheduleApi.downloadTemplate()
    },
    handlePreview(file) {
      <span class="hljs-comment">//可以通过 file.response 拿到服务端返回数据</span>
    },
    handleRemove(file, fileList) {
      <span class="hljs-comment">//文件移除</span>
    },
    beforeUpload(file){
      <span class="hljs-comment">//上传前配置</span>
      <span class="hljs-keyword">this</span>.importHeaders.cityCode=<span class="hljs-string">'上海'</span><span class="hljs-comment">//可以配置请求头</span>
      <span class="hljs-keyword">let</span> excelfileExtend = <span class="hljs-string">".xls,.xlsx"</span><span class="hljs-comment">//设置文件格式</span>
      <span class="hljs-keyword">let</span> fileExtend = file.name.substring(file.name.lastIndexOf(<span class="hljs-string">'.'</span>)).toLowerCase();
      <span class="hljs-keyword">if</span> (excelfileExtend.indexOf(fileExtend) &lt;= <span class="hljs-number">-1</span>) {
         <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'文件格式错误'</span>)
         <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
      <span class="hljs-keyword">this</span>.uploadTip = <span class="hljs-string">'正在处理中...'</span>
      <span class="hljs-keyword">this</span>.processing = <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">//上传错误</span>
    uploadFail(err, file, fileList) {
      <span class="hljs-keyword">this</span>.uploadTip = <span class="hljs-string">'点击上传'</span>
      <span class="hljs-keyword">this</span>.processing = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">this</span>.$message.error(err)
    },
    <span class="hljs-comment">//上传成功</span>
    uploadSuccess(response, file, fileList) {
      <span class="hljs-keyword">this</span>.uploadTip = <span class="hljs-string">'点击上传'</span>
      <span class="hljs-keyword">this</span>.processing = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">if</span> (response.status === <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">this</span>.errorResults = response.data
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.errorResults) {
          <span class="hljs-keyword">this</span>.importFlag = <span class="hljs-number">2</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.dialogImportVisible = <span class="hljs-literal">false</span>
          <span class="hljs-keyword">this</span>.$message.error(response.errorMsg)
        }
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.importFlag = <span class="hljs-number">3</span>
        <span class="hljs-keyword">this</span>.dialogImportVisible = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.$message.info(<span class="hljs-string">'导入成功'</span>)
        <span class="hljs-keyword">this</span>.doSearch()
      }
    },
    <span class="hljs-comment">//下载模板</span>
    download() {
      <span class="hljs-comment">//调用后台模板方法,和导出类似</span>
      scheduleApi.downloadTemplate()
    },
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.hide-dialog</span>{
  <span class="hljs-attribute">display</span>:none;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>5.js文件,调用接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'

// 下载模板

    export const downloadTemplate = function (scheduleType) {
        axios.get('/rest/schedule/template', {
            params: {
                &quot;scheduleType&quot;: scheduleType
            },
            responseType: 'arraybuffer'
        }).then((response) => {
            //创建一个blob对象,file的一种
            let blob = new Blob([response.data], { type: 'application/x-xls' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
            link.click()
        })
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

<span class="hljs-comment">// 下载模板</span>

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> downloadTemplate = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">scheduleType</span>) </span>{
        axios.get(<span class="hljs-string">'/rest/schedule/template'</span>, {
            <span class="hljs-attr">params</span>: {
                <span class="hljs-string">"scheduleType"</span>: scheduleType
            },
            <span class="hljs-attr">responseType</span>: <span class="hljs-string">'arraybuffer'</span>
        }).then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
            <span class="hljs-comment">//创建一个blob对象,file的一种</span>
            <span class="hljs-keyword">let</span> blob = <span class="hljs-keyword">new</span> Blob([response.data], { <span class="hljs-attr">type</span>: <span class="hljs-string">'application/x-xls'</span> })
            <span class="hljs-keyword">let</span> link = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>)
            link.href = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob)
            link.download = fileNames[scheduleType] + <span class="hljs-string">'_'</span> + response.headers.datestr + <span class="hljs-string">'.xls'</span>
            link.click()
        })
    }
</code></pre>
<p>6.感谢看到这里,很实用的导入导出功能代码,欢迎交流!<br>圣诞节快到了,祝大家Merry Christmas!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+element-ui的简洁导入导出功能

## 原文链接
[https://segmentfault.com/a/1190000012526934](https://segmentfault.com/a/1190000012526934)

