---
title: '小程序的初次遇见,使用mpvue搭建模板' 
date: 2018-12-02 2:30:15
hidden: true
slug: ktwp69slk3a
categories: [reprint]
---

{{< raw >}}

                    
<p>由于公司业务需求的需要，在这一周需要开发小程序，加急看了下小程序的文档，发现用其原生来编写程序不是很顺手，公司前端用的技术栈是<code>vue</code>， 询问了谷哥和度娘发现大部分推荐了 <code>wepy</code>和 <code>mpvue</code>，对比了两个框架，还是选用了 <a href="http://mpvue.com/mpvue/#_1?_blank" rel="nofollow noreferrer" target="_blank">mpvue</a>, 因为 <code>mpvue</code> 继承自 <code>vue.js</code>，其技术规范和语法特点与 <strong><em>Vue.js</em></strong> 保持一致。</p>
<blockquote>快速搭建 <strong><em>mpvue</em></strong> 目录</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 全局安装 vue-cli
$ npm install --global vue-cli
// 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart wx-mpvue-demo
// 安装依赖
$ cd wx-mpvue-demo
$ npm install
// 启动构建
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 全局安装 vue-cli</span>
$ npm install --<span class="hljs-keyword">global</span> vue-<span class="hljs-keyword">cli</span>
<span class="hljs-comment">// 创建一个基于 mpvue-quickstart 模板的新项目</span>
$ vue init mpvue/mpvue-quickstart wx-mpvue-demo
<span class="hljs-comment">// 安装依赖</span>
$ <span class="hljs-keyword">cd</span> wx-mpvue-demo
$ npm install
<span class="hljs-comment">// 启动构建</span>
$ npm <span class="hljs-keyword">run</span> dev</code></pre>
<p>一个简单的工程目录就搭建完成了。</p>
<blockquote>封装自己的公用模块</blockquote>
<h5>1.封装<code>Totast</code>
</h5>
<p>由于小程序原生的消息提示实在是让人崩溃，所以我们先自己来封装下 <code>totast</code>， 在 <code>util</code>目录新建 <code>totast.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class toast {
  static msg (title, {icon = 1}) {
    wx.showToast({
      title,
      icon: ['success', 'none'][icon]
    })
  }
  static confirm ({title = '提示', content, callback}) {
    wx.showModal({
      title,
      content,
      success: function (res) {
        if (res.confirm) {
          callback(res.confirm)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
}

export default toast" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">toast</span> </span>{
  <span class="hljs-keyword">static</span> msg (title, {icon = <span class="hljs-number">1</span>}) {
    wx.showToast({
      title,
      <span class="hljs-attr">icon</span>: [<span class="hljs-string">'success'</span>, <span class="hljs-string">'none'</span>][icon]
    })
  }
  <span class="hljs-keyword">static</span> confirm ({title = <span class="hljs-string">'提示'</span>, content, callback}) {
    wx.showModal({
      title,
      content,
      <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
        <span class="hljs-keyword">if</span> (res.confirm) {
          callback(res.confirm)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.cancel) {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'用户点击取消'</span>)
        }
      }
    })
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> toast</code></pre>
<p>我们挂载到<strong><em>main.js</em></strong>中， 在组件里可以方便调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import toast from './utils/toast'
Vue.prototype.$totast = toast" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import toast from <span class="hljs-string">'./utils/toast'</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$totast</span> = toast</code></pre>
<h5>2.封装 <code>publicRequest</code>
</h5>
<p>小程序的网路请求不是很方便，我们也对其封装一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import totast from './toast'

const Authorization = 'Bearer xxx'
class publicRequest {
  static get ({url, data = {}, isJson = false, hasToken = true, header}) {
    let hasNetWork = checkNetWork()

    if (!hasNetWork) {
      totast.msg('网路异常', {})
      return false
    }

    let contentType = isJson ? 'application/json' : 'application/x-www-form-urlencoded'
    let _authorization = hasToken ? {'Authorization': Authorization} : {}
    let _header = Object.assign({'content-type': contentType}, _authorization, header)
    wx.showLoading({title: '加载中...'})
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        header: _header,
        dataType: 'json',
        method: 'GET',
        data,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          }
        },
        fail: (error) => {
          totast.msg(error.errMsg, {})
          reject(error)
        },
        complete: res => {
          if (res.statusCode !== 200) {
            totastMessage({
              statusCode: res.statusCode,
              message: res.data.msg
            })
          }
          wx.hideLoading()
        }
      })
    })
  }
  static post ({url, data = {}, isJson = false, hasToken = true, header}) {
    let hasNetWork = checkNetWork()

    if (!hasNetWork) {
      totast.msg('网路异常', {})
      return false
    }
    let contentType = isJson ? 'application/json' : 'application/x-www-form-urlencoded'
    let _authorization = hasToken ? {'Authorization': Authorization} : {}
    let _header = Object.assign({'content-type': contentType}, _authorization, header)
    wx.showLoading({title: '加载中...'})
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        header: _header,
        method: 'POST',
        data,
        dataType: 'json',
        success: (res) => {
          resolve(res.data)
        },
        fail: (error) => {
          totast.msg(error.errMsg, {})
          reject(error)
        },
        complete: res => {
          if (res.statusCode !== 200) {
            totastMessage({
              statusCode: res.statusCode,
              message: res.data.msg
            })
          }
          wx.hideLoading()
        }
      })
    })
  }
}
const checkNetWork = function () {
  return new Promise(resolve => {
    wx.getNetworkType({
      success: res => {
        let networkType = res.networkType;
        if (networkType === 'none' || networkType === 'unknown') {
          resolve(false)
        } else {
          resolve(true)
        }
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}
const totastMessage = function ({statusCode, message}) {
  switch (statusCode) {
    case 502:
      totast.msg('服务器异常', {})
      break
    default:
      totast.msg(message, {})
      break
  }
}
export default publicRequest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> totast <span class="hljs-keyword">from</span> <span class="hljs-string">'./toast'</span>

<span class="hljs-keyword">const</span> Authorization = <span class="hljs-string">'Bearer xxx'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">publicRequest</span> </span>{
  <span class="hljs-keyword">static</span> get ({url, data = {}, isJson = <span class="hljs-literal">false</span>, hasToken = <span class="hljs-literal">true</span>, header}) {
    <span class="hljs-keyword">let</span> hasNetWork = checkNetWork()

    <span class="hljs-keyword">if</span> (!hasNetWork) {
      totast.msg(<span class="hljs-string">'网路异常'</span>, {})
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }

    <span class="hljs-keyword">let</span> contentType = isJson ? <span class="hljs-string">'application/json'</span> : <span class="hljs-string">'application/x-www-form-urlencoded'</span>
    <span class="hljs-keyword">let</span> _authorization = hasToken ? {<span class="hljs-string">'Authorization'</span>: Authorization} : {}
    <span class="hljs-keyword">let</span> _header = <span class="hljs-built_in">Object</span>.assign({<span class="hljs-string">'content-type'</span>: contentType}, _authorization, header)
    wx.showLoading({<span class="hljs-attr">title</span>: <span class="hljs-string">'加载中...'</span>})
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      wx.request({
        url,
        <span class="hljs-attr">header</span>: _header,
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
        data,
        <span class="hljs-attr">success</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (res.statusCode === <span class="hljs-number">200</span>) {
            resolve(res.data)
          }
        },
        <span class="hljs-attr">fail</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
          totast.msg(error.errMsg, {})
          reject(error)
        },
        <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (res.statusCode !== <span class="hljs-number">200</span>) {
            totastMessage({
              <span class="hljs-attr">statusCode</span>: res.statusCode,
              <span class="hljs-attr">message</span>: res.data.msg
            })
          }
          wx.hideLoading()
        }
      })
    })
  }
  <span class="hljs-keyword">static</span> post ({url, data = {}, isJson = <span class="hljs-literal">false</span>, hasToken = <span class="hljs-literal">true</span>, header}) {
    <span class="hljs-keyword">let</span> hasNetWork = checkNetWork()

    <span class="hljs-keyword">if</span> (!hasNetWork) {
      totast.msg(<span class="hljs-string">'网路异常'</span>, {})
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">let</span> contentType = isJson ? <span class="hljs-string">'application/json'</span> : <span class="hljs-string">'application/x-www-form-urlencoded'</span>
    <span class="hljs-keyword">let</span> _authorization = hasToken ? {<span class="hljs-string">'Authorization'</span>: Authorization} : {}
    <span class="hljs-keyword">let</span> _header = <span class="hljs-built_in">Object</span>.assign({<span class="hljs-string">'content-type'</span>: contentType}, _authorization, header)
    wx.showLoading({<span class="hljs-attr">title</span>: <span class="hljs-string">'加载中...'</span>})
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      wx.request({
        url,
        <span class="hljs-attr">header</span>: _header,
        <span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
        data,
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
        <span class="hljs-attr">success</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
          resolve(res.data)
        },
        <span class="hljs-attr">fail</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
          totast.msg(error.errMsg, {})
          reject(error)
        },
        <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (res.statusCode !== <span class="hljs-number">200</span>) {
            totastMessage({
              <span class="hljs-attr">statusCode</span>: res.statusCode,
              <span class="hljs-attr">message</span>: res.data.msg
            })
          }
          wx.hideLoading()
        }
      })
    })
  }
}
<span class="hljs-keyword">const</span> checkNetWork = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    wx.getNetworkType({
      <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> networkType = res.networkType;
        <span class="hljs-keyword">if</span> (networkType === <span class="hljs-string">'none'</span> || networkType === <span class="hljs-string">'unknown'</span>) {
          resolve(<span class="hljs-literal">false</span>)
        } <span class="hljs-keyword">else</span> {
          resolve(<span class="hljs-literal">true</span>)
        }
      },
      <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        resolve(<span class="hljs-literal">false</span>)
      }
    })
  })
}
<span class="hljs-keyword">const</span> totastMessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{statusCode, message}</span>) </span>{
  <span class="hljs-keyword">switch</span> (statusCode) {
    <span class="hljs-keyword">case</span> <span class="hljs-number">502</span>:
      totast.msg(<span class="hljs-string">'服务器异常'</span>, {})
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">default</span>:
      totast.msg(message, {})
      <span class="hljs-keyword">break</span>
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> publicRequest</code></pre>
<p>我们呢也对其挂载到 <code>vue</code> 上去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import publicRequest from './utils/publicRequest'
Vue.prototype.$http = publicRequest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import publicRequest from <span class="hljs-string">'./utils/publicRequest'</span>
Vue<span class="hljs-selector-class">.prototype</span>.<span class="hljs-variable">$http</span> = publicRequest</code></pre>
<h5>3.扫一扫的调用</h5>
<p>我们先公用出扫一扫</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const handleScan = function () {
  return new Promise((resolve, reject) => {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        resolve(res)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}
export default handleScan" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> handleScan = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    wx.scanCode({
      <span class="hljs-attr">success</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(res)
        resolve(res)
      },
      <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        reject(error)
      }
    })
  })
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> handleScan</code></pre>
<p>公用出来后挂载到我们的 <code>vue</code> 上后可以在组件里直接调用 <code>this.$handleScan</code>，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  async scanCodeInfo () {
    let goods = await this.$handleScan()
    console.log(goods)
    this.codeInfo = goods.result
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>methods: {
  <span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">scanCodeInfo</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> goods = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.$handleScan()
    console.log(goods)
    <span class="hljs-keyword">this</span>.codeInfo = goods.result
  }
}</code></pre>
<h5>4.如何引入<code>iconfont</code>图标</h5>
<p>因为小程序的wxss文件的font-face的url不接受http地址作为参数,但可以接受base64,因此需将字体文件下载后,转换为base64，然后引用。<br>所以我们可以在阿里巴巴图标库下载下来，将<code>iconfont.ttf</code>转换。转换地址：<a href="https://transfonter.org/" rel="nofollow noreferrer" target="_blank">https://transfonter.org/</a> </p>
<p><span class="img-wrap"><img data-src="/img/bVbabYs?w=813&amp;h=552" src="https://static.alili.tech/img/bVbabYs?w=813&amp;h=552" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下载文件后解压得到<code>stylesheet.css</code>文件，将此文件引入到项目。最后写一个公用的样式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon:after{
  font-family: 'iconfont';
  font-weight: lighter;
  font-style: normal;
}

.icon-saoyisao:after { content: &quot;\e7c7&quot;; }

.icon-hebingxingzhuang:after { content: &quot;\e61a&quot;; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.icon</span><span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'iconfont'</span>;
  <span class="hljs-attribute">font-weight</span>: lighter;
  <span class="hljs-attribute">font-style</span>: normal;
}

<span class="hljs-selector-class">.icon-saoyisao</span><span class="hljs-selector-pseudo">:after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e7c7"</span>; }

<span class="hljs-selector-class">.icon-hebingxingzhuang</span><span class="hljs-selector-pseudo">:after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">"\e61a"</span>; }</code></pre>
<p>就可以使用了。</p>
<p>现在我们可以愉快的使用其开发了，如果对 <code>vue</code>开发比较熟悉的话，完全迁移过来是没有问题的。最后附上<a href="https://github.com/one-pupil/wx-mpvue" rel="nofollow noreferrer" target="_blank">项目demo</a>和<a href="https://imondo.cn/blog/article/37" rel="nofollow noreferrer" target="_blank">原文地址</a><br>每个人都有第一次，哈哈~这就是我的第一次写文章，不到之处，望指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小程序的初次遇见,使用mpvue搭建模板

## 原文链接
[https://segmentfault.com/a/1190000014748397](https://segmentfault.com/a/1190000014748397)

