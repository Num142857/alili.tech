---
title: 'VUE使用element-ui的upload组件自定义文件列表' 
date: 2018-12-24 2:30:07
hidden: true
slug: tg6s2us0i6
categories: [reprint]
---

{{< raw >}}

                    
<p>emmm我又来了๑乛◡乛๑</p>
<blockquote><p>饿了么上传组件的文件列表<code>filelist</code>有个删除功能，我看源代码它是直接删除，并不会提示。<code>issue</code>上也有不少开发者提过这个问题，开发组还是建议自己写（想偷懒都不行……）<br>除了复写文件列表外，还加了一个上传状态的显示。</p></blockquote>
<p>先上效果图：<br><span class="img-wrap"><img data-src="/img/bVZrwI?w=1084&amp;h=616" src="https://static.alili.tech/img/bVZrwI?w=1084&amp;h=616" alt="文件列表" title="文件列表" style="cursor: pointer; display: inline;"></span></p>
<p>悬浮时的效果：<br><span class="img-wrap"><img data-src="/img/bVZrwU?w=978&amp;h=612" src="https://static.alili.tech/img/bVZrwU?w=978&amp;h=612" alt="鼠标悬浮可点击放大删除" title="鼠标悬浮可点击放大删除" style="cursor: pointer; display: inline;"></span></p>
<p>上传时的效果：<br><span class="img-wrap"><img data-src="/img/bVZrw9?w=998&amp;h=603" src="https://static.alili.tech/img/bVZrw9?w=998&amp;h=603" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>以下测试在vue(v2.5) + vue-router(v3.0) + element-ui(v2.0)环境下进行，一些细节（如icon）会与上述图片不相符。所以每个步骤都加个图片=。=</p></blockquote>
<h2 id="articleHeader0">步骤一：卡片化</h2>
<p>其实就是重写样式，写个类似<code>el-card</code>组件的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;img-list&quot;>
        <div class=&quot;img-content&quot; v-for=&quot;(item,key) in imagelist&quot; :key=&quot;key&quot;>
            <img :src=&quot;item.url&quot;>
            <div class=&quot;name&quot;>
                <div>"{{" item.name "}}"</div>
                <el-button type=&quot;text&quot; @click=&quot;handleFileName(item,key)&quot;>修改名字</el-button>
            </div>
<!-- 删除icon -->
            <div class=&quot;del&quot;>
                <i @click=&quot;handleFileRemove(item,key)&quot; class=&quot;el-icon-delete2&quot;></i>
            </div>
<!-- 放大icon -->
            <div class=&quot;layer&quot; @click=&quot;handleFileEnlarge(item.url)&quot;>
                <i class=&quot;el-icon-view&quot;></i>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: 'upload-list',
    data(){
        return {
            imagelist: [{
                url: 'http://img.hb.aicdn.com/723f8754f412debce188626d09cc0a1b2be6b7a6751a3-ICEp1E_fw658',
                name: 'lemon'
            },{
                url: 'http://img.hb.aicdn.com/38ab9e558bcba041be979f03bfd31bd67bf1e6f35815a-8PD8Eo_fw658',
                name: 'lemon2'
            },{
                url: 'http://img.hb.aicdn.com/0cd0dcc93f5b918e191dd84791101435136c7f9811e31-LRzYAQ_fw658',
                name: 'lemon3'
            }]
        }
    },
    methods: {
        handleFileEnlarge(_url){//放大图片
            console.log(_url)
        },
        handleFileName(file,i){//修改名字
            console.log(file,i)
        },
        handleFileRemove(file,i){//删除图片
            console.log(file,i)
        }
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-content"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,key) in imagelist"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"key"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item.url"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{" item.name "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleFileName(item,key)"</span>&gt;</span>修改名字<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 删除icon --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"del"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleFileRemove(item,key)"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-delete2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 放大icon --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"layer"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleFileEnlarge(item.url)"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-view"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'upload-list'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">imagelist</span>: [{
                <span class="hljs-attr">url</span>: <span class="hljs-string">'http://img.hb.aicdn.com/723f8754f412debce188626d09cc0a1b2be6b7a6751a3-ICEp1E_fw658'</span>,
                <span class="hljs-attr">name</span>: <span class="hljs-string">'lemon'</span>
            },{
                <span class="hljs-attr">url</span>: <span class="hljs-string">'http://img.hb.aicdn.com/38ab9e558bcba041be979f03bfd31bd67bf1e6f35815a-8PD8Eo_fw658'</span>,
                <span class="hljs-attr">name</span>: <span class="hljs-string">'lemon2'</span>
            },{
                <span class="hljs-attr">url</span>: <span class="hljs-string">'http://img.hb.aicdn.com/0cd0dcc93f5b918e191dd84791101435136c7f9811e31-LRzYAQ_fw658'</span>,
                <span class="hljs-attr">name</span>: <span class="hljs-string">'lemon3'</span>
            }]
        }
    },
    <span class="hljs-attr">methods</span>: {
        handleFileEnlarge(_url){<span class="hljs-comment">//放大图片</span>
            <span class="hljs-built_in">console</span>.log(_url)
        },
        handleFileName(file,i){<span class="hljs-comment">//修改名字</span>
            <span class="hljs-built_in">console</span>.log(file,i)
        },
        handleFileRemove(file,i){<span class="hljs-comment">//删除图片</span>
            <span class="hljs-built_in">console</span>.log(file,i)
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>放大按钮和删除按钮只有鼠标悬浮才显示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
    box-sizing: border-box;
}
.img-list{
    overflow:hidden;
    width:100%;
}
.img-list .img-content{
    float:left;
    position:relative;
    display:inline-block;
    width:200px;
    height:270px;
    padding:5px;
    margin:5px 20px 20px 0;
    border:1px solid #d1dbe5;
    border-radius:4px;
    transition:all .3s;
    box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.img-list .img-content img{
    display:block;
    width:100%;
    height:190px;
    margin:0 auto;
    border-radius:4px;
}
.img-list .img-content .name{
    margin-top:10px;
}
.img-list .img-content .name>div{
    width:90%;
    text-overflow:ellipsis;
    overflow:hidden;
    height:25px;
    line-height:25px;
}
.img-list .img-content:hover .del,
.img-list .img-content:hover .layer{
    opacity:1;
}
.img-list .img-content .del,
.img-list .img-content .layer{
    opacity:0;
    transition:all .3s;
}
.img-list .img-content .del{
    position:absolute;
    bottom:10px;
    right:10px;
    color:#8492a6;
    cursor:pointer;
    font-size:1.1em;
}
.img-list .img-content .layer{
    position:absolute;
    left:0;
    right:0;
    top:0;
    height:200px;
    color:#fff;
    text-align:center;
    z-index:5;
    background-color:rgba(0,0,0,.4);
}
.img-list .img-content .layer i{
    font-size:1.6em;
    margin-top:80px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{
    <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-class">.img-list</span>{
    <span class="hljs-attribute">overflow</span>:hidden;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">position</span>:relative;
    <span class="hljs-attribute">display</span>:inline-block;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">270px</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">5px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">5px</span> <span class="hljs-number">20px</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#d1dbe5</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">4px</span>;
    <span class="hljs-attribute">transition</span>:all .<span class="hljs-number">3s</span>;
    <span class="hljs-attribute">box-shadow</span>:<span class="hljs-number">0</span> <span class="hljs-number">2px</span> <span class="hljs-number">4px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(0,0,0,.12), <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-number">0</span> <span class="hljs-built_in">rgba</span>(0,0,0,.04);
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">190px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">4px</span>;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-class">.name</span>{
    <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-class">.name</span>&gt;<span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">90%</span>;
    <span class="hljs-attribute">text-overflow</span>:ellipsis;
    <span class="hljs-attribute">overflow</span>:hidden;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">25px</span>;
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">25px</span>;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.del</span>,
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.layer</span>{
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-class">.del</span>,
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-class">.layer</span>{
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">transition</span>:all .<span class="hljs-number">3s</span>;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-class">.del</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">bottom</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">right</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#8492a6</span>;
    <span class="hljs-attribute">cursor</span>:pointer;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">1.1em</span>;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-class">.layer</span>{
    <span class="hljs-attribute">position</span>:absolute;
    <span class="hljs-attribute">left</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">z-index</span>:<span class="hljs-number">5</span>;
    <span class="hljs-attribute">background-color</span>:<span class="hljs-built_in">rgba</span>(0,0,0,.4);
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-content</span> <span class="hljs-selector-class">.layer</span> <span class="hljs-selector-tag">i</span>{
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">1.6em</span>;
    <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">80px</span>;
}</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVZrE3?w=890&amp;h=395" src="https://static.alili.tech/img/bVZrE3?w=890&amp;h=395" alt="步骤一效果图" title="步骤一效果图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">步骤二：放大</h2>
<p>这个操作很简单，用<code>el-dialog</code>组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;img-list&quot;>
    ...
    <el-dialog title=&quot;&quot; :visible.sync=&quot;isEnlargeImage&quot; size=&quot;large&quot; :modal-append-to-body=&quot;false&quot; top=&quot;8%&quot; width=&quot;60%&quot;>
        <img @click=&quot;isEnlargeImage = false&quot; style=&quot;width:100%;&quot; :src=&quot;enlargeImage&quot;>
    </el-dialog>
</div>
<script>
export default{
    data(){
        return {
            isEnlargeImage: false,//放大图片
            enlargeImage: '',//放大图片地址
        }
    },
    methods: {
        handleFileEnlarge(_url){//放大图片
            console.log(_url)
            if(_url){
                this.enlargeImage = _url;
                this.isEnlargeImage = !this.isEnlargeImage;
            }
        }, 
    }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-list"</span>&gt;</span>
    ...
    <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">title</span>=<span class="hljs-string">""</span> <span class="hljs-attr">:visible.sync</span>=<span class="hljs-string">"isEnlargeImage"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"large"</span> <span class="hljs-attr">:modal-append-to-body</span>=<span class="hljs-string">"false"</span> <span class="hljs-attr">top</span>=<span class="hljs-string">"8%"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"60%"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"isEnlargeImage = false"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100%;"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"enlargeImage"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">isEnlargeImage</span>: <span class="hljs-literal">false</span>,<span class="hljs-comment">//放大图片</span>
            enlargeImage: <span class="hljs-string">''</span>,<span class="hljs-comment">//放大图片地址</span>
        }
    },
    <span class="hljs-attr">methods</span>: {
        handleFileEnlarge(_url){<span class="hljs-comment">//放大图片</span>
            <span class="hljs-built_in">console</span>.log(_url)
            <span class="hljs-keyword">if</span>(_url){
                <span class="hljs-keyword">this</span>.enlargeImage = _url;
                <span class="hljs-keyword">this</span>.isEnlargeImage = !<span class="hljs-keyword">this</span>.isEnlargeImage;
            }
        }, 
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVZrFg?w=1022&amp;h=626" src="https://static.alili.tech/img/bVZrFg?w=1022&amp;h=626" alt="放大效果图" title="放大效果图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">步骤三：删除和修改名字</h2>
<p>emmm还是个简单的操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleFileRemove(file,i){//删除图片
    console.log(file,i)
    if(!file.url){
        return false;
    }
    let that = this;
    this.$confirm('是否删除此附件？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        //可添加ajax
        this.$message.success(&quot;删除成功&quot;)
        this.$message({
            type: 'success',
            message: '删除成功',
            onClose: () => {
                that.imagelist.splice(i,1)
            }
        })
    }).catch((meg) => console.log(meg))
},
handleFileName(file,i){//修改名字
    console.log(file,i)
    let that = this;
    this.$prompt(&quot;请输入新文件名：&quot;,&quot;提示：&quot;,{
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(({ value }) => {
        console.log(value)
        if(!value){
            return false;
        }
        //可添加ajax
        this.$message.success(&quot;操作成功&quot;)
        that.imagelist[i].name = value
    }).catch(() => {})
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>handleFileRemove(file,i){<span class="hljs-regexp">//</span>删除图片
    <span class="hljs-built_in">console</span>.log(file,i)
    <span class="hljs-keyword">if</span>(!file.url){
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    let that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.$confirm(<span class="hljs-string">'是否删除此附件？'</span>,<span class="hljs-string">'提示'</span>,{
        confirmButtonText: <span class="hljs-string">'确定'</span>,
        cancelButtonText: <span class="hljs-string">'取消'</span>,
        type: <span class="hljs-string">'warning'</span>
    }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-regexp">//</span>可添加ajax
        <span class="hljs-keyword">this</span>.$message.success(<span class="hljs-string">"删除成功"</span>)
        <span class="hljs-keyword">this</span>.$message({
            type: <span class="hljs-string">'success'</span>,
            message: <span class="hljs-string">'删除成功'</span>,
            onClose: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                that.imagelist.splice(i,<span class="hljs-number">1</span>)
            }
        })
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(meg)</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(meg))
},
handleFileName(file,i){<span class="hljs-regexp">//</span>修改名字
    <span class="hljs-built_in">console</span>.log(file,i)
    let that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.$prompt(<span class="hljs-string">"请输入新文件名："</span>,<span class="hljs-string">"提示："</span>,{
        confirmButtonText: <span class="hljs-string">'确定'</span>,
        cancelButtonText: <span class="hljs-string">'取消'</span>
    }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">({ value })</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(value)
        <span class="hljs-keyword">if</span>(!value){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-regexp">//</span>可添加ajax
        <span class="hljs-keyword">this</span>.$message.success(<span class="hljs-string">"操作成功"</span>)
        that.imagelist[i].name = value
    }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {})
},</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVZrFu?w=1013&amp;h=422" src="https://static.alili.tech/img/bVZrFu?w=1013&amp;h=422" alt="重新命名效果图" title="重新命名效果图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">步骤四：上传进程</h2>
<p>emmm其实这篇文章的重点在这儿。</p>
<p>css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
...
.img-list .img-upload{
    float:left;
    width:200px;
    height:270px;
    display:table;
    text-align:center;
}
.img-list .uploader{
    width:100%;
    display:table-cell;
    vertical-align:middle;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
...
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-upload</span>{
    <span class="hljs-attribute">float</span>:left;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">270px</span>;
    <span class="hljs-attribute">display</span>:table;
    <span class="hljs-attribute">text-align</span>:center;
}
<span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.uploader</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>:table-cell;
    <span class="hljs-attribute">vertical-align</span>:middle;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
...
    <div class=&quot;img-upload&quot;>
        <el-upload class=&quot;uploader&quot; accept=&quot;image/*&quot;
          ref=&quot;upload&quot;
          list-type=&quot;picture-card&quot;
          :show-file-list=&quot;false&quot;
          :action=&quot;params.action&quot;
          :data=&quot;params.data&quot;
          :on-change=&quot;uploadOnChange&quot;
          :on-success=&quot;uploadOnSuccess&quot;
          :on-error=&quot;uploadOnError&quot;
          :on-progress=&quot;uploadOnProgress&quot;>
              <el-button type=&quot;primary&quot;>点击上传</el-button>
        </el-upload>
    </div>
</template>
<script>
...
data(){
    return {
        params: {
            action: 'http://jsonplaceholder.typicode.com/posts/',
            data: {}
        }
    }
},
...
methods: {
    uploadOnProgress(e,file){//开始上传
        console.log(e.percent,file)
    },
    uploadOnChange(file){
        console.log(&quot;——————————change——————————&quot;)
        // console.log(file)
        if(file.status == 'ready'){
            console.log(&quot;ready&quot;)
        }else if(file.status == 'fail'){
            this.$message.error(&quot;图片上传出错，请刷新重试！&quot;)
        }
    },
    uploadOnSuccess(e,file){//上传附件
        console.log(&quot;——————————success——————————&quot;)
        this.$message.success(&quot;上传成功&quot;)
    },
    uploadOnError(e,file){
        console.log(&quot;——————————error——————————&quot;)
        console.log(e)
    },
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;template&gt;</span>
...
    &lt;div class=<span class="hljs-string">"img-upload"</span>&gt;
        &lt;<span class="hljs-keyword">el</span>-upload class=<span class="hljs-string">"uploader"</span> accept=<span class="hljs-string">"image/*"</span>
          ref=<span class="hljs-string">"upload"</span>
          <span class="hljs-keyword">list</span>-<span class="hljs-built_in">type</span>=<span class="hljs-string">"picture-card"</span>
          :show-<span class="hljs-keyword">file</span>-<span class="hljs-keyword">list</span>=<span class="hljs-string">"false"</span>
          :action=<span class="hljs-string">"params.action"</span>
          :data=<span class="hljs-string">"params.data"</span>
          :<span class="hljs-keyword">on</span>-<span class="hljs-keyword">change</span>=<span class="hljs-string">"uploadOnChange"</span>
          :<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"uploadOnSuccess"</span>
          :<span class="hljs-keyword">on</span>-error=<span class="hljs-string">"uploadOnError"</span>
          :<span class="hljs-keyword">on</span>-progress=<span class="hljs-string">"uploadOnProgress"</span>&gt;
              &lt;<span class="hljs-keyword">el</span>-button <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span>&gt;点击上传&lt;/<span class="hljs-keyword">el</span>-button&gt;
        &lt;/<span class="hljs-keyword">el</span>-upload&gt;
    &lt;/div&gt;
&lt;/template&gt;
<span class="hljs-symbol">&lt;script&gt;</span>
...
data(){
    <span class="hljs-keyword">return</span> {
        param<span class="hljs-variable">s:</span> {
            action: <span class="hljs-string">'http://jsonplaceholder.typicode.com/posts/'</span>,
            dat<span class="hljs-variable">a:</span> {}
        }
    }
},
...
method<span class="hljs-variable">s:</span> {
    uploadOnProgress(<span class="hljs-keyword">e</span>,<span class="hljs-keyword">file</span>){//开始上传
        console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">e</span>.percent,<span class="hljs-keyword">file</span>)
    },
    uploadOnChange(<span class="hljs-keyword">file</span>){
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"——————————change——————————"</span>)
        // console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">file</span>)
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">file</span>.status == <span class="hljs-string">'ready'</span>){
            console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"ready"</span>)
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">file</span>.status == <span class="hljs-string">'fail'</span>){
            this.$message.error(<span class="hljs-string">"图片上传出错，请刷新重试！"</span>)
        }
    },
    uploadOnSuccess(<span class="hljs-keyword">e</span>,<span class="hljs-keyword">file</span>){//上传附件
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"——————————success——————————"</span>)
        this.$message.success(<span class="hljs-string">"上传成功"</span>)
    },
    uploadOnError(<span class="hljs-keyword">e</span>,<span class="hljs-keyword">file</span>){
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"——————————error——————————"</span>)
        console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">e</span>)
    },
}
&lt;/script&gt;</code></pre>
<hr>
<blockquote><p>插播一则tips：在项目中文件是直接上传到阿里云，上传参数<code>data</code>会动态变化。但是由于自动上传一直出错（上传参数<code>data</code>有些关键字不存在），后来用手动上传却是可行。所以测试了半天才采用以下方式：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload :auto-upload=&quot;false&quot;></el-upload>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;el-upload <span class="hljs-symbol">:auto-upload=<span class="hljs-string">"false"</span>&gt;&lt;/el-upload&gt;</span></code></pre>
<p>methods:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uploadOnChange(file){
    if(file.status == 'ready'){
        this.params.data = {
            //change
        }
        this.$nextTick(() => {
            this.$refs.upload.submit();
        })
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>uploadOnChange(file){
    <span class="hljs-keyword">if</span>(file.status == <span class="hljs-string">'ready'</span>){
        <span class="hljs-keyword">this</span>.params.<span class="hljs-keyword">data</span> = {
            <span class="hljs-comment">//change</span>
        }
        <span class="hljs-keyword">this</span>.$nextTick(() =&gt; {
            <span class="hljs-keyword">this</span>.$refs.upload.submit();
        })
    }
}</code></pre>
<hr>
<p>加个上传加载的过程，<code>el-progress</code>组件恰好适用<br>css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".img-list .img-progress{
    text-align:center;
    padding-top:50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.img-list</span> <span class="hljs-selector-class">.img-progress</span>{
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">padding-top</span>:<span class="hljs-number">50px</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-if=&quot;!pass &amp;&amp; progress !== 0&quot; class=&quot;img-content img-progress&quot;>
    <el-progress type=&quot;circle&quot; :percentage=&quot;progress&quot; :status=&quot;proStatus&quot;></el-progress>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;div v-if=<span class="hljs-string">"!pass &amp;&amp; progress !== 0"</span> class=<span class="hljs-string">"img-content img-progress"</span>&gt;
    &lt;el-progress type=<span class="hljs-string">"circle"</span> <span class="hljs-symbol">:percentage=<span class="hljs-string">"progress"</span></span> <span class="hljs-symbol">:status=<span class="hljs-string">"proStatus"</span>&gt;&lt;/el-progress&gt;</span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>data:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data(){
    return {
        progress: 0,//上传进度
        pass: null,//是否上传成功
    }
},
computed: {
    proStatus(){//上传状态
        if(this.pass){
            return 'success'
        }else if(this.pass == false){
            return 'exception'
        }else{
            return ''
        }
    }
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>(){
    <span class="hljs-keyword">return</span> {
        progress: <span class="hljs-number">0</span>,<span class="hljs-comment">//上传进度</span>
        pass: <span class="hljs-literal">null</span>,<span class="hljs-comment">//是否上传成功</span>
    }
},
computed: {
    proStatus(){<span class="hljs-comment">//上传状态</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.pass){
            <span class="hljs-keyword">return</span> <span class="hljs-string">'success'</span>
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.pass == <span class="hljs-literal">false</span>){
            <span class="hljs-keyword">return</span> <span class="hljs-string">'exception'</span>
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>
        }
    }
},
</code></pre>
<p>methods:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uploadOnProgress(e,file){//开始上传
    console.log(e.percent,file)
    this.progress = Math.floor(e.percent)
},
uploadOnChange(file){
    console.log(&quot;——————————change——————————&quot;)
    // console.log(file)
    if(file.status == 'ready'){
        console.log(&quot;ready&quot;)
        //重置progress组件
        this.pass = null;
        this.progress = 0;
    }else if(file.status == 'fail'){
        this.$message.error(&quot;图片上传出错，请刷新重试！&quot;)
    }
},
uploadOnSuccess(e,file){//上传附件
    console.log(&quot;——————————success——————————&quot;)
    this.pass = true;
    this.$message.success(&quot;上传成功&quot;)
    this.imagelist.push({
        url: file.url,
        name: '新增图片'
    })
},
uploadOnError(e,file){
    console.log(&quot;——————————error——————————&quot;)
    console.log(e)
    this.pass = false;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>uploadOnProgress(e,<span class="hljs-keyword">file</span>){<span class="hljs-comment">//开始上传</span>
    console.log(e.percent,<span class="hljs-keyword">file</span>)
    <span class="hljs-keyword">this</span>.progress = Math.floor(e.percent)
},
uploadOnChange(<span class="hljs-keyword">file</span>){
    console.log(<span class="hljs-string">"——————————change——————————"</span>)
    <span class="hljs-comment">// console.log(file)</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">file</span>.status == <span class="hljs-string">'ready'</span>){
        console.log(<span class="hljs-string">"ready"</span>)
        <span class="hljs-comment">//重置progress组件</span>
        <span class="hljs-keyword">this</span>.pass = <span class="hljs-keyword">null</span>;
        <span class="hljs-keyword">this</span>.progress = <span class="hljs-number">0</span>;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">file</span>.status == <span class="hljs-string">'fail'</span>){
        <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">"图片上传出错，请刷新重试！"</span>)
    }
},
uploadOnSuccess(e,<span class="hljs-keyword">file</span>){<span class="hljs-comment">//上传附件</span>
    console.log(<span class="hljs-string">"——————————success——————————"</span>)
    <span class="hljs-keyword">this</span>.pass = <span class="hljs-keyword">true</span>;
    <span class="hljs-keyword">this</span>.$message.success(<span class="hljs-string">"上传成功"</span>)
    <span class="hljs-keyword">this</span>.imagelist.<span class="hljs-keyword">push</span>({
        url: <span class="hljs-keyword">file</span>.url,
        name: <span class="hljs-string">'新增图片'</span>
    })
},
uploadOnError(e,<span class="hljs-keyword">file</span>){
    console.log(<span class="hljs-string">"——————————error——————————"</span>)
    console.log(e)
    <span class="hljs-keyword">this</span>.pass = <span class="hljs-keyword">false</span>;
},</code></pre>
<p>原本是用<code>this.progress</code>控制<code>status</code>，但是后来发现及时上传进度100%也不一定上传成功，所以改用<code>this.pass</code>。用饿了么的上传地址偶尔会跨域报错，上传多几次又成了=。=</p>
<p><span class="img-wrap"><img data-src="/img/bVZuR6?w=1121&amp;h=634" src="https://static.alili.tech/img/bVZuR6?w=1121&amp;h=634" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZuRX?w=1122&amp;h=635" src="https://static.alili.tech/img/bVZuRX?w=1122&amp;h=635" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>Github地址：<a href="https://github.com/xiaoniezi/uploadlist" rel="nofollow noreferrer" target="_blank">点我点我点我</a>（component/uploadlist.vue）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VUE使用element-ui的upload组件自定义文件列表

## 原文链接
[https://segmentfault.com/a/1190000012234747](https://segmentfault.com/a/1190000012234747)

