---
title: 'Vue2.0利用vue-resource上传文件到七牛' 
date: 2019-01-26 2:30:18
hidden: true
slug: wkh9ro47m5
categories: [reprint]
---

{{< raw >}}

                    
<p>关于上传，总是有很多可以说道的。<br>16年底，公司项目<a href="https://fanqier.cn" rel="nofollow noreferrer" target="_blank">番茄表单</a>的前端部分，开始了从传统的<code>jquery</code>到<code>vue 2.0</code>的彻底重构。但是上传部分，无论是之前的传统版本，还是<code>Vue</code>新版本，都是在使用着<a href="https://github.com/mailru/FileAPI" rel="nofollow noreferrer" target="_blank">FileAPI</a>这款优秀的开源库，只是进行了简单的<code>directive</code>化。为什么呢？因为兼容性。没办法，公司项目不等同于个人项目，必须要考虑大多数浏览器。否则，上传部分完全可以利用<code>Vue-Resource</code>以及<code>FormData</code>来抛开对<a href="https://github.com/mailru/FileAPI" rel="nofollow noreferrer" target="_blank">FileAPI</a>的依赖。这让我深感遗憾，幸好这个简单的遗憾在个人博客<code>Vue</code>化重构的时候得以弥补。</p>
<h3 id="articleHeader0">上传流程</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008479701?w=929&amp;h=670" src="https://static.alili.tech/img/remote/1460000008479701?w=929&amp;h=670" alt="七牛上传流程" title="七牛上传流程" style="cursor: pointer; display: inline;"></span></p>
<p>图不重要看文字<br><code>input[type="file"]</code> <code>change</code>事件触发后，先去（如果是图片，可以同时通过<code>FileReader</code>以及<code>readAsDataURL</code>将图片预览在页面上）后台请求七牛的上传<code>token</code>，将拿到的<code>token</code>和<code>key</code>以及通过<code>change</code>传递过来的<code>files</code>一起<code>append</code>到<code>formData</code>中。然后将<code>formData</code>通过<code>post</code>传递给七牛，七牛在处理后将返回真正的文件地址</p>
<h3 id="articleHeader1">获取token</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const qiniu = require('qiniu')
const crypto = require('crypto')
const Config = require('qiniu-config')

exports.token = function*() {
    //构建一个保存文件名
    //这里没有处理文件后缀,需要自己传递过来,然后在这里处理加在key上,非必须
    const key = crypto.createHash('md5').update(((new Date()) * 1 + Math.floor(Math.random() * 10).toString())).digest('hex')
    //Config 七牛的秘钥等配置
    const [ACCESS_KEY, SECRET_KEY, BUCKET] = [Config.accessKey, Config.secretKey, Config.bucket] 
    qiniu.conf.ACCESS_KEY = ACCESS_KEY
    qiniu.conf.SECRET_KEY = SECRET_KEY
    const upToken = new qiniu.rs.PutPolicy(BUCKET + &quot;:&quot; + key)
    try {
        const token = upToken.token()
        return this.body = {
            key: key,
            token: token
        }
    } catch (e) {
        // throw error
    }
}

//假设api 地址是 /api/token " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> qiniu = <span class="hljs-built_in">require</span>(<span class="hljs-string">'qiniu'</span>)
<span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">'crypto'</span>)
<span class="hljs-keyword">const</span> Config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'qiniu-config'</span>)

exports.token = <span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//构建一个保存文件名</span>
    <span class="hljs-comment">//这里没有处理文件后缀,需要自己传递过来,然后在这里处理加在key上,非必须</span>
    <span class="hljs-keyword">const</span> key = crypto.createHash(<span class="hljs-string">'md5'</span>).update(((<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()) * <span class="hljs-number">1</span> + <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">10</span>).toString())).digest(<span class="hljs-string">'hex'</span>)
    <span class="hljs-comment">//Config 七牛的秘钥等配置</span>
    <span class="hljs-keyword">const</span> [ACCESS_KEY, SECRET_KEY, BUCKET] = [Config.accessKey, Config.secretKey, Config.bucket] 
    qiniu.conf.ACCESS_KEY = ACCESS_KEY
    qiniu.conf.SECRET_KEY = SECRET_KEY
    <span class="hljs-keyword">const</span> upToken = <span class="hljs-keyword">new</span> qiniu.rs.PutPolicy(BUCKET + <span class="hljs-string">":"</span> + key)
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> token = upToken.token()
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.body = {
            <span class="hljs-attr">key</span>: key,
            <span class="hljs-attr">token</span>: token
        }
    } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-comment">// throw error</span>
    }
}

<span class="hljs-comment">//假设api 地址是 /api/token </span></code></pre>
<h3 id="articleHeader2">上传组件 upload.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <label class=&quot;mo-upload&quot;>
        <input type=&quot;file&quot; :accept=&quot;accepts&quot; @change=&quot;upload&quot;>
        <slot></slot>
    </label>
</template>
<style lang=&quot;scss&quot;>
    .mo-upload {
        display: inline-block;
        position: relative;
        margin-bottom: 0;
        input[type=&quot;file&quot;] {
            display: none;
        }
        .mo-upload--label {
            display: inline-block;
            position: relative;
        }
    }
</style>
<script>
    export default {
        name : 'MoUpload',
        props : {
            accepts : { //允许的上传类型
                type : String,
                default : 'image/jpeg,image/jpg,image/png,image/gif'
            },
            flag : [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
            maxSize : {
                type : Number,
                default : 0 //上传大小限制
            }, 
        },
        methods: {
            upload (event) {
                let file = event.target.files[0]
                const self = this
                const flag = this.flag
                if (file) {
                    if (this.maxSize) {
                        //todo filter file
                    }
                    //filter file, 文件大小,类型等过滤
                    //如果是图片文件
                    // const reader = new FileReader()
                    // const imageUrl = reader.readAsDataURL(file)
                    // img.src = imageUrl //在预览区域插入图片

                    const formData = new FormData()
                    formData.append('file', file)
                    
                    //获取token
                    this.$http.get(`/api/token/`)
                    .then(response => {
                        const result = response.body
                        formData.append('token', result.token)
                        formData.append('key', result.key)
                        //提交给七牛处理
                        self.$http.post('https://up.qbox.me/', formData, {
                            progress(event) {
                                //传递给父组件的progress方法
                                self.$emit('progress', parseFloat(event.loaded / event.total * 100), flag) 
                            }
                        })
                        .then(response => {
                            const result = response.body
                            if (result.hash &amp;&amp; result.key) {
                                //传递给父组件的complete方法
                                self.$emit('complete', 200 , result, flag)
                                //让当前target可以重新选择
                                event.target.value = null
                            } else {
                                self.$emit('complete', 500, result, flag)
                            }
                        }, error => self.$emit('complete', 500, error.message), flag)
                    })
                }
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mo-upload"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">:accept</span>=<span class="hljs-string">"accepts"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"upload"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
    .mo-upload {
        display: inline-block;
        position: relative;
        margin-bottom: 0;
        input[type="file"] {
            display: none;
        }
        .mo-upload--label {
            display: inline-block;
            position: relative;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span> : <span class="hljs-string">'MoUpload'</span>,
        <span class="hljs-attr">props</span> : {
            <span class="hljs-attr">accepts</span> : { <span class="hljs-comment">//允许的上传类型</span>
                type : <span class="hljs-built_in">String</span>,
                <span class="hljs-attr">default</span> : <span class="hljs-string">'image/jpeg,image/jpg,image/png,image/gif'</span>
            },
            <span class="hljs-attr">flag</span> : [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>], <span class="hljs-comment">//当前上传标识,以便于在同一个监听函数中区分不同的上传域</span>
            maxSize : {
                <span class="hljs-attr">type</span> : <span class="hljs-built_in">Number</span>,
                <span class="hljs-attr">default</span> : <span class="hljs-number">0</span> <span class="hljs-comment">//上传大小限制</span>
            }, 
        },
        <span class="hljs-attr">methods</span>: {
            upload (event) {
                <span class="hljs-keyword">let</span> file = event.target.files[<span class="hljs-number">0</span>]
                <span class="hljs-keyword">const</span> self = <span class="hljs-keyword">this</span>
                <span class="hljs-keyword">const</span> flag = <span class="hljs-keyword">this</span>.flag
                <span class="hljs-keyword">if</span> (file) {
                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.maxSize) {
                        <span class="hljs-comment">//todo filter file</span>
                    }
                    <span class="hljs-comment">//filter file, 文件大小,类型等过滤</span>
                    <span class="hljs-comment">//如果是图片文件</span>
                    <span class="hljs-comment">// const reader = new FileReader()</span>
                    <span class="hljs-comment">// const imageUrl = reader.readAsDataURL(file)</span>
                    <span class="hljs-comment">// img.src = imageUrl //在预览区域插入图片</span>

                    <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData()
                    formData.append(<span class="hljs-string">'file'</span>, file)
                    
                    <span class="hljs-comment">//获取token</span>
                    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">`/api/token/`</span>)
                    .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                        <span class="hljs-keyword">const</span> result = response.body
                        formData.append(<span class="hljs-string">'token'</span>, result.token)
                        formData.append(<span class="hljs-string">'key'</span>, result.key)
                        <span class="hljs-comment">//提交给七牛处理</span>
                        self.$http.post(<span class="hljs-string">'https://up.qbox.me/'</span>, formData, {
                            progress(event) {
                                <span class="hljs-comment">//传递给父组件的progress方法</span>
                                self.$emit(<span class="hljs-string">'progress'</span>, <span class="hljs-built_in">parseFloat</span>(event.loaded / event.total * <span class="hljs-number">100</span>), flag) 
                            }
                        })
                        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                            <span class="hljs-keyword">const</span> result = response.body
                            <span class="hljs-keyword">if</span> (result.hash &amp;&amp; result.key) {
                                <span class="hljs-comment">//传递给父组件的complete方法</span>
                                self.$emit(<span class="hljs-string">'complete'</span>, <span class="hljs-number">200</span> , result, flag)
                                <span class="hljs-comment">//让当前target可以重新选择</span>
                                event.target.value = <span class="hljs-literal">null</span>
                            } <span class="hljs-keyword">else</span> {
                                self.$emit(<span class="hljs-string">'complete'</span>, <span class="hljs-number">500</span>, result, flag)
                            }
                        }, error =&gt; self.$emit(<span class="hljs-string">'complete'</span>, <span class="hljs-number">500</span>, error.message), flag)
                    })
                }
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader3">父组件调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <section>
        ...
        <figure class=&quot;upload-preview&quot;>
            <img :src=&quot;thumbnail&quot; v-if=&quot;thumbnail&quot;/>
        </figure>
        <mo-upload flag=&quot;'thumbnail'&quot; @complete=&quot;uploadComplete&quot; @progress=&quot;uploadProgress&quot;>
            <a>选择图片文件<i class=&quot;progress&quot; :style=&quot;{width:progress + '%'}&quot;></i></a>
        </mo-upload>
        ...
    </section>
</template>
<script>
    import MoUpload from 'upload'
    export default {
        components : {
            MoUpload,
        },
        data () {
            return {
                thumbnail : null,
                progress : 0 //上传进度
            }
        },
        methods : {
            uploadProgress (progress, flag) {
                //这里可以通过回调的flag对不同上传域做处理
                this.progress = progress < 100 ? progress : 0;
            },
            uploadComplete(status, result, flag) {
                if (status == 200) { //
                    this.thumbnail = `domain.com/${result.key}` //七牛域名 + 返回的key 组成文件url
                } else {
                    //失败处理
                }
            },
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
        ...
        <span class="hljs-tag">&lt;<span class="hljs-name">figure</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"upload-preview"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"thumbnail"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"thumbnail"</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">figure</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mo-upload</span> <span class="hljs-attr">flag</span>=<span class="hljs-string">"'thumbnail'"</span> @<span class="hljs-attr">complete</span>=<span class="hljs-string">"uploadComplete"</span> @<span class="hljs-attr">progress</span>=<span class="hljs-string">"uploadProgress"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>选择图片文件<span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progress"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{width:progress + '%'}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mo-upload</span>&gt;</span>
        ...
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> MoUpload <span class="hljs-keyword">from</span> <span class="hljs-string">'upload'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span> : {
            MoUpload,
        },
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">thumbnail</span> : <span class="hljs-literal">null</span>,
                <span class="hljs-attr">progress</span> : <span class="hljs-number">0</span> <span class="hljs-comment">//上传进度</span>
            }
        },
        <span class="hljs-attr">methods</span> : {
            uploadProgress (progress, flag) {
                <span class="hljs-comment">//这里可以通过回调的flag对不同上传域做处理</span>
                <span class="hljs-keyword">this</span>.progress = progress &lt; <span class="hljs-number">100</span> ? progress : <span class="hljs-number">0</span>;
            },
            uploadComplete(status, result, flag) {
                <span class="hljs-keyword">if</span> (status == <span class="hljs-number">200</span>) { <span class="hljs-comment">//</span>
                    <span class="hljs-keyword">this</span>.thumbnail = <span class="hljs-string">`domain.com/<span class="hljs-subst">${result.key}</span>`</span> <span class="hljs-comment">//七牛域名 + 返回的key 组成文件url</span>
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">//失败处理</span>
                }
            },
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader4">小结</h3>
<p>相比于<code>FILEApi</code> 或者其他上传组件，这种方法代码量最小。但是缺点也是显而易见的，大量<code>html5 API</code>的使用，势必会回到兼容性这个老大难上来，慎重的选择性使用吧</p>
<p>本文首发于<strong><a href="https://smohan.im/blog/ygbey7" rel="nofollow noreferrer" target="_blank">我的博客</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0利用vue-resource上传文件到七牛

## 原文链接
[https://segmentfault.com/a/1190000008479698](https://segmentfault.com/a/1190000008479698)

