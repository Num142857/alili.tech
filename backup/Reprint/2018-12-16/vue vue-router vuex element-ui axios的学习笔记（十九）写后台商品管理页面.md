---
title: 'vue vue-router vuex element-ui axios的学习笔记（十九）写后台商品管理页面' 
date: 2018-12-16 2:30:10
hidden: true
slug: b8iv0fekim4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写后台商品页面的思路</h2>
<h3 id="articleHeader1">1、分析功能需求</h3>
<blockquote>管理商品必须要实现的几个功能</blockquote>
<ul>
<li>1、展示所有商品</li>
<li>2、添加商品</li>
<li>3、修改商品</li>
</ul>
<h3 id="articleHeader2">2、分析数据结构</h3>
<blockquote>先看一下数据结构</blockquote>
<p>首先商品分类</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033097" src="https://static.alili.tech/img/remote/1460000013033097" alt="选区_014.png" title="选区_014.png" style="cursor: pointer; display: inline;"></span></p>
<p>类下面的商品详情</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033098" src="https://static.alili.tech/img/remote/1460000013033098" alt="选区_016.png" title="选区_016.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">3、 实现功能步骤</h3>
<blockquote>思路：</blockquote>
<p>1、将添加商品类，添加商品，修改商品分离成单独的组件</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033099" src="https://static.alili.tech/img/remote/1460000013033099" alt="选区_017.png" title="选区_017.png" style="cursor: pointer; display: inline;"></span></p>
<p>2、添加路由</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033100" src="https://static.alili.tech/img/remote/1460000013033100" alt="选区_018.png" title="选区_018.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033101" src="https://static.alili.tech/img/remote/1460000013033101" alt="选区_019.png" title="选区_019.png" style="cursor: pointer;"></span></p>
<p>3、 先写出添加商品页面</p>
<p>挂在路由打开mangerprods.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <section class=&quot;box&quot;>
    <div class=&quot;head&quot;>
      <h3>"{{"this.$route.name"}}"</h3>
    </div>
    <!-- 商品管理路由 -->
    <div class=&quot;prodmenu&quot;>\
      <el-menu
        mode=&quot;horizontal&quot;
        :default-active=&quot;$router.path&quot;
        router>
          <el-menu-item 
            v-for=&quot;item in $router.options.routes[1].children[1].children&quot;
            :key=&quot;item.path&quot;
            :index=&quot;item.path&quot;>
            "{{"item.name"}}"
          </el-menu-item>
        </el-menu>
    </div>
    <!-- 渲染路由 -->
    <router-view></router-view>
  </section>
</template>
<script>
export default {
  // ..
}
</script>
<style lang=&quot;less&quot; scoped>
@import '../../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .prodmenu {
    margin: 0 15px;

  }
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"head"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{"this.$route.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 商品管理路由 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"prodmenu"</span>&gt;</span>\
      <span class="hljs-tag">&lt;<span class="hljs-name">el-menu</span>
        <span class="hljs-attr">mode</span>=<span class="hljs-string">"horizontal"</span>
        <span class="hljs-attr">:default-active</span>=<span class="hljs-string">"$router.path"</span>
        <span class="hljs-attr">router</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-menu-item</span> 
            <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in $router.options.routes[1].children[1].children"</span>
            <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.path"</span>
            <span class="hljs-attr">:index</span>=<span class="hljs-string">"item.path"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-menu</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 渲染路由 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// ..</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
@import '../../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .prodmenu {
    margin: 0 15px;

  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>4、写添加商品类别页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <!-- 添加商品类 -->
  <div class=&quot;addprod&quot;>
    <h4>添加一个商品类</h4>
    <el-input
      placeholder=&quot;请输入商品类名&quot;
      v-model=&quot;prodtype&quot;
      clearable>
    </el-input>
    <el-input
      placeholder=&quot;请输入商品类简介&quot;
      v-model=&quot;prodsub&quot;
      type=&quot;textarea&quot;
      :rows=&quot;2&quot;
      clearable>
    </el-input>
    <el-button type=&quot;danger&quot; :disabled=&quot;disabled&quot; @click=&quot;addtype&quot; round>添加</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      prodtype: '',
      prodsub: ''
    }
  },
  computed: {
    disabled () {
      if (this.prodtype === '' || this.prodsub === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addtype () {
      console.log('do')
    }
  }
}
</script>
<style lang=&quot;less&quot; scoped>
@import '../../../common/less/index.less';
.addprod {
  .learncontent;
  .el-input {
    margin: 5px 0;
  }
  .el-button {
    margin: 10px 0;
    width: 100%;
  }
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 添加商品类 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addprod"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>添加一个商品类<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入商品类名"</span>
      <span class="hljs-attr">v-model</span>=<span class="hljs-string">"prodtype"</span>
      <span class="hljs-attr">clearable</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入商品类简介"</span>
      <span class="hljs-attr">v-model</span>=<span class="hljs-string">"prodsub"</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">"textarea"</span>
      <span class="hljs-attr">:rows</span>=<span class="hljs-string">"2"</span>
      <span class="hljs-attr">clearable</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"danger"</span> <span class="hljs-attr">:disabled</span>=<span class="hljs-string">"disabled"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addtype"</span> <span class="hljs-attr">round</span>&gt;</span>添加<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">prodtype</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">prodsub</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    disabled () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.prodtype === <span class="hljs-string">''</span> || <span class="hljs-keyword">this</span>.prodsub === <span class="hljs-string">''</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    addtype () {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'do'</span>)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
@import '../../../common/less/index.less';
.addprod {
  .learncontent;
  .el-input {
    margin: 5px 0;
  }
  .el-button {
    margin: 10px 0;
    width: 100%;
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>5、写添加商品页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <!-- 新增商品 -->
  <div class=&quot;addprod&quot;>
    <h4>新增商品</h4>
    <el-form ref=&quot;addprod&quot; :rules=&quot;prodrules&quot; :model=&quot;addprod&quot; label-width=&quot;80px&quot;>
      <el-form-item label=&quot;商品名&quot; prop=&quot;name&quot;>
        <el-input v-model=&quot;addprod.name&quot; placeholder=&quot;请输入商品名&quot;></el-input>
      </el-form-item>
      <el-form-item label=&quot;价格&quot; prop=&quot;price&quot;>
        <el-input v-model.number=&quot;addprod.price&quot; placeholder=&quot;请输入商品价格&quot;></el-input>
      </el-form-item>
      <el-form-item label=&quot;商品主图&quot; prop=&quot;image&quot;>
        <el-upload
          class=&quot;prod-image&quot;
          action=&quot;/learn/upload&quot;
          :show-file-list=&quot;false&quot;
          :on-success=&quot;handleSuccess&quot;
          :before-upload=&quot;beforeUpload&quot;>
          <img v-if=&quot;imageUrl&quot; :src=&quot;imageUrl&quot; class=&quot;cur-image&quot;>
          <i v-else class=&quot;el-icon-plus prod-uploader-icon&quot;></i>
        </el-upload>
      </el-form-item>
      <el-form-item label=&quot;商品类别&quot; prop=&quot;type&quot;>
        <el-select v-model=&quot;addprod.type&quot; placeholder=&quot;请选择商品类别&quot;>
          <el-option label=&quot;石榴&quot; value=&quot;shiliu&quot;></el-option>
          <el-option label=&quot;火腿&quot; value=&quot;ham&quot;></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label=&quot;是否上架&quot;>
        <el-switch v-model=&quot;addprod.selling&quot;></el-switch>
      </el-form-item>
      
      
      <el-form-item label=&quot;商品简介&quot; prop=&quot;desc&quot;>
        <el-input type=&quot;textarea&quot; v-model=&quot;addprod.desc&quot; placeholder=&quot;请请输入商品简介&quot;></el-input>
      </el-form-item>

      <el-form-item label=&quot;商品详情&quot; prop=&quot;info&quot;>
        <mavon-editor  ref=&quot;md&quot; @imgAdd=&quot;$imgAdd&quot; @imgDel=&quot;$imgDel&quot; v-model=&quot;addprod.info&quot;></mavon-editor>
      </el-form-item>

      <el-form-item>
        <el-button type=&quot;primary&quot; @click=&quot;newprod&quot;>立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {UploadFile} from '../../../api/api'
export default {
  data () {
    return {
      imageUrl: '',
      addprod: {
        name: '',
        price: '',
        type: '',
        selling: '',
        desc: '',
        info: ''
      },
      prodrules: {
        name: [
          {
            required: true,
            message: '请输入商品名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字',
            trigger: 'blur'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '价格必须是数字',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '商品必须选择一个类别',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入商品简介',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    newprod () {
      this.$refs.addprod.validate(valid => {
        if (valid) {
          // console.log('add prod!')
          // const prodFd = new FormData()
          // prodFd.append('name', this.addprod.name)
        } else {
          console.log('请先完成验证')
          return false
        }
      })
    },
    // mavoneditor图片上传并替换地址
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      let formdata = new FormData()
      formdata.append('file', $file)
      UploadFile(formdata)
      .then(url => {
        // console.log(url)
        console.log(this.addprod.info)
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        this.$refs.md.$img2Url(pos, url.data)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },
    // 获取商品主图上传成功后返回的图片
    handleSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 商品主图再上传前对文件进行判断
    beforeUpload (file) {
      const isPIC = file.type === 'image/jpeg' || 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isPIC) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isPIC &amp;&amp; isLt5M
    }
  }
}
</script>
<style lang=&quot;less&quot; scoped>
@import '../../../common/less/index.less';
.addprod {
  .learncontent;
  .el-form {
    text-align: left;
    .el-select {
      width: 100%;
    }
    .el-switch {
      margin: 10px 0 0 0;
    }
    .prod-image {
      width: 200px;
      height: 200px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .cur-image {
        width: 100%;
      }
      .prod-uploader-icon {
        font-size: 45px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
}
</style>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 新增商品 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addprod"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>新增商品<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"addprod"</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">"prodrules"</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">"addprod"</span> <span class="hljs-attr">label-width</span>=<span class="hljs-string">"80px"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"商品名"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"name"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"addprod.name"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入商品名"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"价格"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"price"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model.number</span>=<span class="hljs-string">"addprod.price"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入商品价格"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"商品主图"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"image"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-upload</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">"prod-image"</span>
          <span class="hljs-attr">action</span>=<span class="hljs-string">"/learn/upload"</span>
          <span class="hljs-attr">:show-file-list</span>=<span class="hljs-string">"false"</span>
          <span class="hljs-attr">:on-success</span>=<span class="hljs-string">"handleSuccess"</span>
          <span class="hljs-attr">:before-upload</span>=<span class="hljs-string">"beforeUpload"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"imageUrl"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"imageUrl"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cur-image"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-plus prod-uploader-icon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-upload</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"商品类别"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"type"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"addprod.type"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请选择商品类别"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"石榴"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"shiliu"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-option</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"火腿"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"ham"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-option</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-select</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
      
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"是否上架"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-switch</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"addprod.selling"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-switch</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
      
      
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"商品简介"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"desc"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"textarea"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"addprod.desc"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请请输入商品简介"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"商品详情"</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">"info"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mavon-editor</span>  <span class="hljs-attr">ref</span>=<span class="hljs-string">"md"</span> @<span class="hljs-attr">imgAdd</span>=<span class="hljs-string">"$imgAdd"</span> @<span class="hljs-attr">imgDel</span>=<span class="hljs-string">"$imgDel"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"addprod.info"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mavon-editor</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"newprod"</span>&gt;</span>立即添加<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {UploadFile} <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../api/api'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">imageUrl</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">addprod</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">price</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">selling</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">desc</span>: <span class="hljs-string">''</span>,
        <span class="hljs-attr">info</span>: <span class="hljs-string">''</span>
      },
      <span class="hljs-attr">prodrules</span>: {
        <span class="hljs-attr">name</span>: [
          {
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'请输入商品名'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span>
          },
          {
            <span class="hljs-attr">min</span>: <span class="hljs-number">3</span>,
            <span class="hljs-attr">max</span>: <span class="hljs-number">15</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'长度在 3 到 15 个字'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span>
          }
        ],
        <span class="hljs-attr">price</span>: [
          {
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'请输入商品价格'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span>
          },
          {
            <span class="hljs-attr">type</span>: <span class="hljs-string">'number'</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'价格必须是数字'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span>
          }
        ],
        <span class="hljs-attr">type</span>: [
          {
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'商品必须选择一个类别'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'change'</span>
          }
        ],
        <span class="hljs-attr">desc</span>: [
          {
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">'请输入商品简介'</span>,
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'blur'</span>
          }
        ]
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    newprod () {
      <span class="hljs-keyword">this</span>.$refs.addprod.validate(<span class="hljs-function"><span class="hljs-params">valid</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (valid) {
          <span class="hljs-comment">// console.log('add prod!')</span>
          <span class="hljs-comment">// const prodFd = new FormData()</span>
          <span class="hljs-comment">// prodFd.append('name', this.addprod.name)</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请先完成验证'</span>)
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        }
      })
    },
    <span class="hljs-comment">// mavoneditor图片上传并替换地址</span>
    <span class="hljs-comment">// 绑定@imgAdd event</span>
    $imgAdd (pos, $file) {
      <span class="hljs-comment">// 第一步.将图片上传到服务器.</span>
      <span class="hljs-keyword">let</span> formdata = <span class="hljs-keyword">new</span> FormData()
      formdata.append(<span class="hljs-string">'file'</span>, $file)
      UploadFile(formdata)
      .then(<span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span> {
        <span class="hljs-comment">// console.log(url)</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.addprod.info)
        <span class="hljs-comment">// 第二步.将返回的url替换到文本原位置![...](./0) -&gt; ![...](url)</span>
        <span class="hljs-keyword">this</span>.$refs.md.$img2Url(pos, url.data)
      })
    },
    $imgDel (pos) {
      <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>.img_file[pos]
    },
    <span class="hljs-comment">// 获取商品主图上传成功后返回的图片</span>
    handleSuccess (res, file) {
      <span class="hljs-keyword">this</span>.imageUrl = URL.createObjectURL(file.raw)
    },
    <span class="hljs-comment">// 商品主图再上传前对文件进行判断</span>
    beforeUpload (file) {
      <span class="hljs-keyword">const</span> isPIC = file.type === <span class="hljs-string">'image/jpeg'</span> || <span class="hljs-string">'image/png'</span>
      <span class="hljs-keyword">const</span> isLt5M = file.size / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span> &lt; <span class="hljs-number">5</span>

      <span class="hljs-keyword">if</span> (!isPIC) {
        <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'上传图片只能是 JPG或PNG 格式!'</span>)
      }
      <span class="hljs-keyword">if</span> (!isLt5M) {
        <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'上传图片大小不能超过 5MB!'</span>)
      }
      <span class="hljs-keyword">return</span> isPIC &amp;&amp; isLt5M
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
@import '../../../common/less/index.less';
.addprod {
  .learncontent;
  .el-form {
    text-align: left;
    .el-select {
      width: 100%;
    }
    .el-switch {
      margin: 10px 0 0 0;
    }
    .prod-image {
      width: 200px;
      height: 200px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .cur-image {
        width: 100%;
      }
      .prod-uploader-icon {
        font-size: 45px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>


</code></pre>
<p>6、引入markdown编辑器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm i mavon-editor --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">cnpm <span class="hljs-selector-tag">i</span> mavon-editor --save</code></pre>
<p>引用<br>main.js</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033102" src="https://static.alili.tech/img/remote/1460000013033102" alt="选区_020.png" title="选区_020.png" style="cursor: pointer;"></span></p>
<p>使用</p>
<p>再addprod.vue中直接使用</p>
<p>引用mavoneditor</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033103" src="https://static.alili.tech/img/remote/1460000013033103" alt="选区_025.png" title="选区_025.png" style="cursor: pointer; display: inline;"></span></p>
<p>mavonedior上传图片操作</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033104" src="https://static.alili.tech/img/remote/1460000013033104" alt="选区_026.png" title="选区_026.png" style="cursor: pointer; display: inline;"></span></p>
<p>与服务端进行交互的API</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033105" src="https://static.alili.tech/img/remote/1460000013033105" alt="选区_027.png" title="选区_027.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>因为markdown编辑器是具有实时预览功能，如果我们将本地图片插入，执行步骤是这样的<br>1、他会立即执行上传图片操作，并获取服务端返回的图片地址<br>2、获取到图片地址，mavon会立刻向服务端请求这个地址来获取这张图片，并渲染出来</blockquote>
<ul><li>7 写服务端代码</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033106" src="https://static.alili.tech/img/remote/1460000013033106" alt="选区_028.png" title="选区_028.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033107" src="https://static.alili.tech/img/remote/1460000013033107" alt="选区_029.png" title="选区_029.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">4、测试效果</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033108" src="https://static.alili.tech/img/remote/1460000013033108" alt="up.gif" title="up.gif" style="cursor: pointer;"></span></p>
<p>效果是合适的</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013033109" src="https://static.alili.tech/img/remote/1460000013033109" alt="选区_030.png" title="选区_030.png" style="cursor: pointer;"></span></p>
<p>同时后端也记录了3次上传和3次获取图片</p>
<h3 id="articleHeader5">5、遇见的坑</h3>
<blockquote>我当时写服务端代码的时候，再上传图片的地方，我将<br>const form = new formidable.IncomingForm()<br>写在了页面的开头，并没有将formidable的实例化卸载每一次上传的过程中，这导致了一个问题，上传第一张图片可以成功，但上传第二张开始就发生错误<br>Can't set headers after they are sent<br>这是因为我所有的req解析都在同一个实例化的form里面，第一次执行upload成功时，form会调用一次form.on('end')，第二次upload成功时，form也会调用一次form.on('end')，这样就产生了Can't set headers after they are sent这个错误</blockquote>
<h3 id="articleHeader6">6、感谢segmentfault的 @程序猿小卡_casper</h3>
<p>再此非常感谢segmentfault的 @程序猿小卡_casper，无私的帮助我解决了问题并细心的讲解错误原因，谢谢！！,同时也感谢其他真心帮助我解决问题的朋友！</p>
<p>又兴趣的朋友可以看看这个问题的原题</p>
<h5>用nodejs的formidable上传图片，第一张上传成功，再上传发生错误Can't set headers after they are sent</h5>
<p><a href="https://segmentfault.com/q/1010000012722383">https://segmentfault.com/q/10...</a></p>
<h3 id="articleHeader7">7 、github地址：</h3>
<p>learn：<a href="https://github.com/lyttonlee/learn" rel="nofollow noreferrer" target="_blank">https://github.com/lyttonlee/...</a><br>server：<a href="https://github.com/lyttonlee/express-server-for-learn" rel="nofollow noreferrer" target="_blank">https://github.com/lyttonlee/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue vue-router vuex element-ui axios的学习笔记（十九）写后台商品管理页面

## 原文链接
[https://segmentfault.com/a/1190000013033094](https://segmentfault.com/a/1190000013033094)

