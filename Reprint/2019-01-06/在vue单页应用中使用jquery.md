---
title: '在vue单页应用中使用jquery' 
date: 2019-01-06 2:30:10
hidden: true
slug: cv0qnof1nd5
categories: [reprint]
---

{{< raw >}}

                    
<p>记录一个今天用到的vue-cli建立的应用中引入jquery的方式。</p>
<ol><li>首选通过npm安装jquery</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install jquery --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code> npm <span class="hljs-keyword">install </span><span class="hljs-keyword">jquery </span>--save
</code></pre>
<ol><li>在build/webpack.base.conf文件当中引入jquery</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': path.resolve(__dirname, '../node_modules/jquery/src/jquery')
    }
  },
  ...
}
    
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {
  ...
  <span class="hljs-built_in">resolve</span>: {
    extension<span class="hljs-variable">s:</span> [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alia<span class="hljs-variable">s:</span> {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>),
      <span class="hljs-string">'jquery'</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../node_modules/jquery/src/jquery'</span>)
    }
  },
  ...
}
    
  </code></pre>
<p>3.在需要的地方</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted:function(){
    let test = $('#test').text()
    console.log(test)
  },
  methods:{

  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>
    }
  },
  <span class="hljs-attr">mounted</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">let</span> test = $(<span class="hljs-string">'#test'</span>).text()
    <span class="hljs-built_in">console</span>.log(test)
  },
  <span class="hljs-attr">methods</span>:{

  }
}
</code></pre>
<p>最后推荐下<a href="http://www.wheelsfactory.cn/" rel="nofollow noreferrer" target="_blank">轮子工厂</a>--一个分享vue,angular优秀组件的网站</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在vue单页应用中使用jquery

## 原文链接
[https://segmentfault.com/a/1190000010365705](https://segmentfault.com/a/1190000010365705)

