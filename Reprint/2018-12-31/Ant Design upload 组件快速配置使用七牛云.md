---
title: 'Ant Design upload 组件快速配置使用七牛云' 
date: 2018-12-31 2:30:30
hidden: true
slug: 5hwfl3kiccw
categories: [reprint]
---

{{< raw >}}

                    
<p>在使用<code>ant design</code>开发后台业务过程中，遇到了给<code>upload</code>组件配置后台服务器的问题。因为用习惯了七牛云的快速易用，以及喜欢它的自动压缩接口，因此第一反应就是想怎么配置上传到七牛云上面。<br>不过经过多番搜寻，并没找到好的解决方案。官方推荐参考的<a href="https://github.com/blueimp/jQuery-File-Upload/wiki" rel="nofollow noreferrer" target="_blank">jQuery-File-Upload服务端上传接口实现</a>测试了几个<code>nodejs</code>的实现，发现很久没有维护了，存在一些问题。于是只能从阅读<code>ant design</code>源代码来看能不能怎么修改<code>upload</code>的上传方式，从而实现提交图片过去。</p>
<p>首先从<a href="https://github.com/ant-design/ant-design/blob/master/components/upload/Upload.tsx" rel="nofollow noreferrer" target="_blank">ant design的upload组件源码</a>可以看到，它是基于<a href="https://github.com/react-component/upload" rel="nofollow noreferrer" target="_blank">这个upload组件</a>编写的。再看该upload组件，得到具体的<a href="https://github.com/react-component/upload/blob/master/src/request.js" rel="nofollow noreferrer" target="_blank">request实现</a>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getError(option, xhr) {
  const msg = `cannot post ${option.action} ${xhr.status}'`;
  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = option.action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

// option {
//  onProgress: (event: { percent: number }): void,
//  onError: (event: Error, body?: Object): void,
//  onSuccess: (body: Object): void,
//  data: Object,
//  filename: String,
//  file: File,
//  withCredentials: Boolean,
//  action: String,
//  headers: Object,
// }
export default function upload(option) {
  const xhr = new XMLHttpRequest();

  if (option.onProgress &amp;&amp; xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).map(key => {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    // allow success when 2xx status
    // see https://github.com/react-component/upload/issues/34
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };


  xhr.open('post', option.action, true);

  // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
  if (option.withCredentials &amp;&amp; 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  // when set headers['X-Requested-With'] = null , can close default XHR header
  // see https://github.com/react-component/upload/issues/33
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  for (const h in headers) {
    if (headers.hasOwnProperty(h) &amp;&amp; headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getError</span>(<span class="hljs-params">option, xhr</span>) </span>{
  <span class="hljs-keyword">const</span> msg = <span class="hljs-string">`cannot post <span class="hljs-subst">${option.action}</span> <span class="hljs-subst">${xhr.status}</span>'`</span>;
  <span class="hljs-keyword">const</span> err = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(msg);
  err.status = xhr.status;
  err.method = <span class="hljs-string">'post'</span>;
  err.url = option.action;
  <span class="hljs-keyword">return</span> err;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBody</span>(<span class="hljs-params">xhr</span>) </span>{
  <span class="hljs-keyword">const</span> text = xhr.responseText || xhr.response;
  <span class="hljs-keyword">if</span> (!text) {
    <span class="hljs-keyword">return</span> text;
  }

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(text);
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-keyword">return</span> text;
  }
}

<span class="hljs-comment">// option {</span>
<span class="hljs-comment">//  onProgress: (event: { percent: number }): void,</span>
<span class="hljs-comment">//  onError: (event: Error, body?: Object): void,</span>
<span class="hljs-comment">//  onSuccess: (body: Object): void,</span>
<span class="hljs-comment">//  data: Object,</span>
<span class="hljs-comment">//  filename: String,</span>
<span class="hljs-comment">//  file: File,</span>
<span class="hljs-comment">//  withCredentials: Boolean,</span>
<span class="hljs-comment">//  action: String,</span>
<span class="hljs-comment">//  headers: Object,</span>
<span class="hljs-comment">// }</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">upload</span>(<span class="hljs-params">option</span>) </span>{
  <span class="hljs-keyword">const</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();

  <span class="hljs-keyword">if</span> (option.onProgress &amp;&amp; xhr.upload) {
    xhr.upload.onprogress = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">progress</span>(<span class="hljs-params">e</span>) </span>{
      <span class="hljs-keyword">if</span> (e.total &gt; <span class="hljs-number">0</span>) {
        e.percent = e.loaded / e.total * <span class="hljs-number">100</span>;
      }
      option.onProgress(e);
    };
  }

  <span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData();

  <span class="hljs-keyword">if</span> (option.data) {
    <span class="hljs-built_in">Object</span>.keys(option.data).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file);

  xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">error</span>(<span class="hljs-params">e</span>) </span>{
    option.onError(e);
  };

  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onload</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// allow success when 2xx status</span>
    <span class="hljs-comment">// see https://github.com/react-component/upload/issues/34</span>
    <span class="hljs-keyword">if</span> (xhr.status &lt; <span class="hljs-number">200</span> || xhr.status &gt;= <span class="hljs-number">300</span>) {
      <span class="hljs-keyword">return</span> option.onError(getError(option, xhr), getBody(xhr));
    }

    option.onSuccess(getBody(xhr), xhr);
  };


  xhr.open(<span class="hljs-string">'post'</span>, option.action, <span class="hljs-literal">true</span>);

  <span class="hljs-comment">// Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179</span>
  <span class="hljs-keyword">if</span> (option.withCredentials &amp;&amp; <span class="hljs-string">'withCredentials'</span> <span class="hljs-keyword">in</span> xhr) {
    xhr.withCredentials = <span class="hljs-literal">true</span>;
  }

  <span class="hljs-keyword">const</span> headers = option.headers || {};

  <span class="hljs-comment">// when set headers['X-Requested-With'] = null , can close default XHR header</span>
  <span class="hljs-comment">// see https://github.com/react-component/upload/issues/33</span>
  <span class="hljs-keyword">if</span> (headers[<span class="hljs-string">'X-Requested-With'</span>] !== <span class="hljs-literal">null</span>) {
    xhr.setRequestHeader(<span class="hljs-string">'X-Requested-With'</span>, <span class="hljs-string">'XMLHttpRequest'</span>);
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> h <span class="hljs-keyword">in</span> headers) {
    <span class="hljs-keyword">if</span> (headers.hasOwnProperty(h) &amp;&amp; headers[h] !== <span class="hljs-literal">null</span>) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }
  xhr.send(formData);

  <span class="hljs-keyword">return</span> {
    abort() {
      xhr.abort();
    },
  };
}
</code></pre>
<p>至此上传的逻辑一目了然，那么可以怎么改造呢？再翻阅一下七牛云的文档，得到<a href="http://jsfiddle.net/gh/get/jquery/1.9.1/icattlecoder/jsfiddle/tree/master/ajaxupload" rel="nofollow noreferrer" target="_blank">一个利用js上传的实现</a>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 *   本示例演示七牛云存储表单上传
 *
 *   按照以下的步骤运行示例：
 *
 *   1. 填写token。需要您不知道如何生成token，可以点击右侧的链接生成，然后将结果复制粘贴过来。
 *   2. 填写key。如果您在生成token的过程中指定了key，则将其输入至此。否则留空。
 *   3. 姓名是一个自定义的变量，如果生成token的过程中指定了returnUrl和returnBody，
 *      并且returnBody中指定了期望返回此字段，则七牛会将其返回给returnUrl对应的业务服务器。
 *      callbackBody亦然。
 *   4. 选择任意一张照片，然后点击提交即可
 *
 *   实际开发中，您可以通过后端开发语言动态生成这个表单，将token的hidden属性设置为true并对其进行赋值。
 *
 *  **********************************************************************************
 *  * 贡献代码：
 *  * 1. git clone git@github.com:icattlecoder/jsfiddle
 *  * 2. push代码到您的github库
 *  * 3. 测试效果，访问 http://jsfiddle.net/gh/get/jquery/1.9.1/<Your GitHub Name>/jsfiddle/tree/master/ajaxupload
 *  * 4. 提pr
 *   **********************************************************************************
 */
$(document).ready(function() {
    var Qiniu_UploadUrl = &quot;http://up.qiniu.com&quot;;
    var progressbar = $(&quot;#progressbar&quot;),
        progressLabel = $(&quot;.progress-label&quot;);
    progressbar.progressbar({
        value: false,
        change: function() {
            progressLabel.text(progressbar.progressbar(&quot;value&quot;) + &quot;%&quot;);
        },
        complete: function() {
            progressLabel.text(&quot;Complete!&quot;);
        }
    });
    $(&quot;#btn_upload&quot;).click(function() {
        //普通上传
        var Qiniu_upload = function(f, token, key) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', Qiniu_UploadUrl, true);
            var formData, startDate;
            formData = new FormData();
            if (key !== null &amp;&amp; key !== undefined) formData.append('key', key);
            formData.append('token', token);
            formData.append('file', f);
            var taking;
            xhr.upload.addEventListener(&quot;progress&quot;, function(evt) {
                if (evt.lengthComputable) {
                    var nowDate = new Date().getTime();
                    taking = nowDate - startDate;
                    var x = (evt.loaded) / 1024;
                    var y = taking / 1000;
                    var uploadSpeed = (x / y);
                    var formatSpeed;
                    if (uploadSpeed > 1024) {
                        formatSpeed = (uploadSpeed / 1024).toFixed(2) + &quot;Mb\/s&quot;;
                    } else {
                        formatSpeed = uploadSpeed.toFixed(2) + &quot;Kb\/s&quot;;
                    }
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    progressbar.progressbar(&quot;value&quot;, percentComplete);
                    // console &amp;&amp; console.log(percentComplete, &quot;,&quot;, formatSpeed);
                }
            }, false);

            xhr.onreadystatechange = function(response) {
                if (xhr.readyState == 4 &amp;&amp; xhr.status == 200 &amp;&amp; xhr.responseText != &quot;&quot;) {
                    var blkRet = JSON.parse(xhr.responseText);
                    console &amp;&amp; console.log(blkRet);
                    $(&quot;#dialog&quot;).html(xhr.responseText).dialog();
                } else if (xhr.status != 200 &amp;&amp; xhr.responseText) {

                }
            };
            startDate = new Date().getTime();
            $(&quot;#progressbar&quot;).show();
            xhr.send(formData);
        };
        var token = $(&quot;#token&quot;).val();
        if ($(&quot;#file&quot;)[0].files.length > 0 &amp;&amp; token != &quot;&quot;) {
            Qiniu_upload($(&quot;#file&quot;)[0].files[0], token, $(&quot;#key&quot;).val());
        } else {
            console &amp;&amp; console.log(&quot;form input error&quot;);
        }
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 *   本示例演示七牛云存储表单上传
 *
 *   按照以下的步骤运行示例：
 *
 *   1. 填写token。需要您不知道如何生成token，可以点击右侧的链接生成，然后将结果复制粘贴过来。
 *   2. 填写key。如果您在生成token的过程中指定了key，则将其输入至此。否则留空。
 *   3. 姓名是一个自定义的变量，如果生成token的过程中指定了returnUrl和returnBody，
 *      并且returnBody中指定了期望返回此字段，则七牛会将其返回给returnUrl对应的业务服务器。
 *      callbackBody亦然。
 *   4. 选择任意一张照片，然后点击提交即可
 *
 *   实际开发中，您可以通过后端开发语言动态生成这个表单，将token的hidden属性设置为true并对其进行赋值。
 *
 *  **********************************************************************************
 *  * 贡献代码：
 *  * 1. git clone git@github.com:icattlecoder/jsfiddle
 *  * 2. push代码到您的github库
 *  * 3. 测试效果，访问 http://jsfiddle.net/gh/get/jquery/1.9.1/&lt;Your GitHub Name&gt;/jsfiddle/tree/master/ajaxupload
 *  * 4. 提pr
 *   **********************************************************************************
 */</span>
$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> Qiniu_UploadUrl = <span class="hljs-string">"http://up.qiniu.com"</span>;
    <span class="hljs-keyword">var</span> progressbar = $(<span class="hljs-string">"#progressbar"</span>),
        progressLabel = $(<span class="hljs-string">".progress-label"</span>);
    progressbar.progressbar({
        <span class="hljs-attr">value</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">change</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            progressLabel.text(progressbar.progressbar(<span class="hljs-string">"value"</span>) + <span class="hljs-string">"%"</span>);
        },
        <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            progressLabel.text(<span class="hljs-string">"Complete!"</span>);
        }
    });
    $(<span class="hljs-string">"#btn_upload"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//普通上传</span>
        <span class="hljs-keyword">var</span> Qiniu_upload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f, token, key</span>) </span>{
            <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
            xhr.open(<span class="hljs-string">'POST'</span>, Qiniu_UploadUrl, <span class="hljs-literal">true</span>);
            <span class="hljs-keyword">var</span> formData, startDate;
            formData = <span class="hljs-keyword">new</span> FormData();
            <span class="hljs-keyword">if</span> (key !== <span class="hljs-literal">null</span> &amp;&amp; key !== <span class="hljs-literal">undefined</span>) formData.append(<span class="hljs-string">'key'</span>, key);
            formData.append(<span class="hljs-string">'token'</span>, token);
            formData.append(<span class="hljs-string">'file'</span>, f);
            <span class="hljs-keyword">var</span> taking;
            xhr.upload.addEventListener(<span class="hljs-string">"progress"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
                <span class="hljs-keyword">if</span> (evt.lengthComputable) {
                    <span class="hljs-keyword">var</span> nowDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
                    taking = nowDate - startDate;
                    <span class="hljs-keyword">var</span> x = (evt.loaded) / <span class="hljs-number">1024</span>;
                    <span class="hljs-keyword">var</span> y = taking / <span class="hljs-number">1000</span>;
                    <span class="hljs-keyword">var</span> uploadSpeed = (x / y);
                    <span class="hljs-keyword">var</span> formatSpeed;
                    <span class="hljs-keyword">if</span> (uploadSpeed &gt; <span class="hljs-number">1024</span>) {
                        formatSpeed = (uploadSpeed / <span class="hljs-number">1024</span>).toFixed(<span class="hljs-number">2</span>) + <span class="hljs-string">"Mb\/s"</span>;
                    } <span class="hljs-keyword">else</span> {
                        formatSpeed = uploadSpeed.toFixed(<span class="hljs-number">2</span>) + <span class="hljs-string">"Kb\/s"</span>;
                    }
                    <span class="hljs-keyword">var</span> percentComplete = <span class="hljs-built_in">Math</span>.round(evt.loaded * <span class="hljs-number">100</span> / evt.total);
                    progressbar.progressbar(<span class="hljs-string">"value"</span>, percentComplete);
                    <span class="hljs-comment">// console &amp;&amp; console.log(percentComplete, ",", formatSpeed);</span>
                }
            }, <span class="hljs-literal">false</span>);

            xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
                <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span> &amp;&amp; xhr.responseText != <span class="hljs-string">""</span>) {
                    <span class="hljs-keyword">var</span> blkRet = <span class="hljs-built_in">JSON</span>.parse(xhr.responseText);
                    <span class="hljs-built_in">console</span> &amp;&amp; <span class="hljs-built_in">console</span>.log(blkRet);
                    $(<span class="hljs-string">"#dialog"</span>).html(xhr.responseText).dialog();
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (xhr.status != <span class="hljs-number">200</span> &amp;&amp; xhr.responseText) {

                }
            };
            startDate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime();
            $(<span class="hljs-string">"#progressbar"</span>).show();
            xhr.send(formData);
        };
        <span class="hljs-keyword">var</span> token = $(<span class="hljs-string">"#token"</span>).val();
        <span class="hljs-keyword">if</span> ($(<span class="hljs-string">"#file"</span>)[<span class="hljs-number">0</span>].files.length &gt; <span class="hljs-number">0</span> &amp;&amp; token != <span class="hljs-string">""</span>) {
            Qiniu_upload($(<span class="hljs-string">"#file"</span>)[<span class="hljs-number">0</span>].files[<span class="hljs-number">0</span>], token, $(<span class="hljs-string">"#key"</span>).val());
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span> &amp;&amp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"form input error"</span>);
        }
    })
})</code></pre>
<p>通过审阅其中的核心逻辑可以知道，*它的上传逻辑与antd 的upload组件的<strong>核心区别就是<code>formData</code>增加了七牛云上传token</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append('token', token);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">formData.append(<span class="hljs-string">'token'</span>, token);</code></pre>
<p>而通过upload的request源码又可以知道，可以通过option.data传过来的参数执行<code>formData.append('token', token);</code>，该部分的源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).map(key => {
      formData.append(key, option.data[key]);
    });
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> formData = <span class="hljs-keyword">new</span> FormData();

  <span class="hljs-keyword">if</span> (option.data) {
    <span class="hljs-built_in">Object</span>.keys(option.data).map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> {
      formData.append(key, option.data[key]);
    });
  }</code></pre>
<p>由此，再参阅<a href="https://ant.design/components/upload-cn/" rel="nofollow noreferrer" target="_blank">ant design官方文档</a>可以知道，使用<code>Upload</code>组件时，可以通过data API传入自定义的data,那么自此就可以得到一个简洁的办法，通过以下sample code就可以实现<code>Upload</code>组件上传图片到七牛云：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const QINIU_SERVER = 'http://up.qiniu.com'
data = {
    token: 'PUT-YOUR-TOKEN-HERE',
  }
<Upload
    action={QINIU_SERVER}
    listType=&quot;picture-card&quot;
    className=&quot;upload-list-inline&quot;
    onChange={this.onChange}
    onPreview={this.handlePreview}
    fileList={fileList}
    data={this.data}
    >
        {uploadButton}
</Upload>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> QINIU_SERVER = <span class="hljs-string">'http://up.qiniu.com'</span>
data = {
    <span class="hljs-attr">token</span>: <span class="hljs-string">'PUT-YOUR-TOKEN-HERE'</span>,
  }
&lt;Upload
    action={QINIU_SERVER}
    listType=<span class="hljs-string">"picture-card"</span>
    className=<span class="hljs-string">"upload-list-inline"</span>
    onChange={<span class="hljs-keyword">this</span>.onChange}
    onPreview={<span class="hljs-keyword">this</span>.handlePreview}
    fileList={fileList}
    data={<span class="hljs-keyword">this</span>.data}
    &gt;
        {uploadButton}
&lt;<span class="hljs-regexp">/Upload&gt;</span></code></pre>
<p>最后划重点：</p>
<ul>
<li>action='<a href="http://up.qiniu.com" rel="nofollow noreferrer" target="_blank">http://up.qiniu.com</a>'</li>
<li>data={ token: 'PUT-YOUR-TOKEN-HERE' }</li>
</ul>
<p>BTW, 如果使用的是七牛云其他地区如华南地区的Bucket，需要替换使用其他地区的上传域名进action,具体可参考<a href="https://developer.qiniu.com/kodo/manual/1671/region-endpoint" rel="nofollow noreferrer" target="_blank">这里</a>。<br><code>Enjoy it!</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ant Design upload 组件快速配置使用七牛云

## 原文链接
[https://segmentfault.com/a/1190000011174923](https://segmentfault.com/a/1190000011174923)

