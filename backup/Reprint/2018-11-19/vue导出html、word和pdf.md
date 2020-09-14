---
title: 'vue导出html、word和pdf' 
date: 2018-11-19 2:32:04
hidden: true
slug: yt9r7q9dnu
categories: [reprint]
---

{{< raw >}}
<p>&#x5BFC;&#x51FA;&#x7684;&#x9875;&#x9762;&#x7EC4;&#x4EF6;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div id=&quot;resumeId&quot;&gt;
        &lt;resumeHtml  ref=&quot;resume&quot; @on-download=&quot;download&quot;/&gt;
    &lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;template&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;resumeId&quot;</span>&gt;
        &lt;resumeHtml  <span class="hljs-keyword">ref</span>=<span class="hljs-string">&quot;resume&quot;</span> @<span class="hljs-keyword">on</span>-download=<span class="hljs-string">&quot;download&quot;</span>/&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre><p>1&#x3001;&#x5BFC;&#x51FA;html<br>&#x65B9;&#x6CD5;&#xFF1A;<br>1&#xFF09;&#x83B7;&#x53D6;&#x8981;&#x5BFC;&#x51FA;&#x7684;&#x7EC4;&#x4EF6;&#x9875;&#x9762;&#x7684;css&#x628A;&#x5B83;&#x8BBE;&#x7F6E;&#x6210;js&#x53D8;&#x91CF;&#x4E00;&#x6587;&#x672C;&#x5E76;&#x901A;&#x8FC7;export&#x5BFC;&#x51FA;<br>2&#xFF09;&#x83B7;&#x53D6;&#x8981;&#x5BFC;&#x51FA;&#x7EC4;&#x4EF6;&#x9875;&#x9762;&#x7684;html&#x7684;dom&#x6807;&#x7B7E;&#x4EE3;&#x7801;&#xFF0C;&#x901A;&#x8FC7;this.$refs.resume.$el.innerHTML&#x83B7;&#x53D6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;document.getElementById(&apos;resumeId&apos;)&#x83B7;&#x5F97;<br>3&#xFF09;&#x6784;&#x9020;html&#x9875;&#x9762;&#xFF0C;&#x5E76;&#x4F7F;&#x7528;createObjectURL&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x6D41;&#x5E76;&#x4E0B;&#x8F7D;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = document.createElement(&apos;a&apos;);
    var url = window.URL.createObjectURL(new Blob([content],
        { type: (option.type || &quot;text/plain&quot;) + &quot;;charset=&quot; + (option.encoding || &apos;utf-8&apos;) }));
    a.href = url;
    a.download = fileName || &apos;file&apos;;
    a.click();
    window.URL.revokeObjectURL(url);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;a&apos;</span>);
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-built_in">window</span>.URL.createObjectURL(<span class="hljs-keyword">new</span> Blob([content],
        { <span class="hljs-attribute">type</span>: (option.type || <span class="hljs-string">&quot;text/plain&quot;</span>) + <span class="hljs-string">&quot;;charset=&quot;</span> + (option.encoding || <span class="hljs-string">&apos;utf-8&apos;</span>) }));
    a.href = <span class="hljs-built_in">url</span>;
    a.download = fileName || <span class="hljs-string">&apos;file&apos;</span>;
    a.click();
    <span class="hljs-built_in">window</span>.URL.revokeObjectURL(<span class="hljs-built_in">url</span>);</code></pre><p>&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from &apos;axios&apos;
import resumeHtml from &apos;./resume-html&apos;
import writer from &apos;file-writer&apos;;
import {resumecss} from &apos;@/assets/style/download/resume.css.js&apos;

...

 downloadHtml(name){               
            let html = this.getHtmlContent();
            let s = writer(`${name}&#x7684;&#x7B80;&#x5386;.html`, html, &apos;utf-8&apos;);
            console.log(&apos;s stream&apos;,s);
            
        },
getHtmlContent(){
            //&#x83B7;&#x53D6;html&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;this.$el.outerHTML
            const template = this.$refs.resume.$el.innerHTML;            
            let html = `&lt;!DOCTYPE html&gt;
                &lt;html&gt;
                &lt;head&gt;
                    &lt;meta charset=&quot;utf-8&quot;&gt;
                    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0&quot;&gt;
                    &lt;title&gt;X-Find&#x8FC5;&#x8058;&#x9009;&#x624D;&lt;/title&gt;
                    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.bootcss.com/iview/2.14.0/styles/iview.css&quot; /&gt;
                    &lt;style&gt;
                        ${resumecss}
                    &lt;/style&gt;
                &lt;/head&gt;
                &lt;body&gt;
                    &lt;div class=&quot;resume_preview_page&quot; style=&quot;margin:0 auto;width:1200px&quot;&gt;
                    ${template}
                    &lt;/div&gt;
                &lt;/body&gt;
                &lt;/html&gt;`;
            return html;
        }
      " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>import axios from &apos;axios&apos;
import resumeHtml from &apos;./resume-html&apos;
import writer from &apos;file-writer&apos;;
import {resumecss} from &apos;@/assets/style/download/resume.css.js&apos;

...

 downloadHtml(name){               
            let html = this.getHtmlContent();
            let s = writer(`${name}&#x7684;&#x7B80;&#x5386;.html`, html, &apos;utf-8&apos;);
            console.log(&apos;s stream&apos;,s);
            
        },
getHtmlContent(){
            //&#x83B7;&#x53D6;html&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;this.$el.outerHTML
            const template = this.$refs.resume.$el.innerHTML;            
            let html = `<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width,initial-scale=1.0&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>X-Find&#x8FC5;&#x8058;&#x9009;&#x624D;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/iview/2.14.0/styles/iview.css&quot;</span> /&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
                        ${resumecss}
                    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;resume_preview_page&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;margin:0 auto;width:1200px&quot;</span>&gt;</span>
                    ${template}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>`;
            return html;
        }
      </code></pre><p>&#x5BFC;&#x51FA;&#x7684;&#x6837;&#x5F0F;js&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const resumecss =`
html,
body {
    position: relative;
    height: 100%;
}

.page_layout {
    position: relative;
    height: 100%;
    display: flex;
    &amp; .layout_content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
}
..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>export const resumecss =`
<span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.page_layout</span> {
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    &amp; <span class="hljs-selector-class">.layout_content</span> {
        <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">flex-direction</span>: column;
    }
}
...</code></pre><p>2&#x3001;&#x5BFC;&#x51FA;Word<br>&#x65B9;&#x6CD5;&#xFF1A;<br>1&#xFF09;&#x4F7F;&#x7528;&#x4E0A;&#x9762;&#x6784;&#x9020;&#x597D;&#x7684;html&#x6587;&#x672C;&#xFF0C;&#x4EE5;&#x6587;&#x4EF6;&#x6D41;&#x7684;&#x5F62;&#x5F0F;&#x53D1;&#x9001;&#x5230;&#x540E;&#x53F0;&#xFF0C;&#x540E;&#x53F0;&#x901A;&#x8FC7;&#x8F6C;&#x6362;&#x5F97;&#x5230;word&#x6D41;&#x4F20;&#x7ED9;&#x524D;&#x7AEF;&#x5E76;&#x4E0B;&#x8F7D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let url = `${this.$url}/uploadFile/uploadResume`;
            let html = this.getHtmlContent();
            // &#x6784;&#x9020;blob&#x6587;&#x4EF6;&#x6D41;
            let html_ = new Blob([html],{ &quot;type&quot; : &quot;text/html;charset=utf-8&quot; })
            let formdata = new FormData();
            formdata.append(&apos;file&apos;, html_, `sdf.html`);//sdf.html&#x662F;&#x8BBE;&#x7F6E;&#x6587;&#x4EF6;&#x540D;
            axios({
                method: &apos;post&apos;,
                url: url,
                data:formdata,
                responseType:&apos;blob&apos;,//&#x8FD9;&#x91CC;&#x5982;&#x679C;&#x4E0D;&#x8BBE;&#x7F6E;&#xFF0C;&#x4E0B;&#x8F7D;&#x4F1A;&#x6253;&#x4E0D;&#x5F00;&#x6587;&#x4EF6;
            })
            .then(res=&gt;{
                console.log(&apos;download res&apos;,res);
                //&#x901A;&#x8FC7;&#x540E;&#x53F0;&#x8FD4;&#x56DE; &#x7684;word&#x6587;&#x4EF6;&#x6D41;&#x8BBE;&#x7F6E;&#x6587;&#x4EF6;&#x540D;&#x5E76;&#x4E0B;&#x8F7D;
                var blob = new Blob([res.data], { type: &apos;application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8&apos;}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document&#x8FD9;&#x91CC;&#x8868;&#x793A;doc&#x7C7B;&#x578B;
                var downloadElement = document.createElement(&apos;a&apos;);
                var href = window.URL.createObjectURL(blob); //&#x521B;&#x5EFA;&#x4E0B;&#x8F7D;&#x7684;&#x94FE;&#x63A5;
                downloadElement.href = href;
                downloadElement.download =&apos;s.doc&apos;; //&#x4E0B;&#x8F7D;&#x540E;&#x6587;&#x4EF6;&#x540D;
                document.body.appendChild(downloadElement);
                downloadElement.click(); //&#x70B9;&#x51FB;&#x4E0B;&#x8F7D;
                document.body.removeChild(downloadElement); //&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#x79FB;&#x9664;&#x5143;&#x7D20;
                window.URL.revokeObjectURL(href); //&#x91CA;&#x653E;&#x6389;blob&#x5BF9;&#x8C61;
            })" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> url = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-keyword">this</span>.$url}</span>/uploadFile/uploadResume`</span>;
            <span class="hljs-keyword">let</span> html = <span class="hljs-keyword">this</span>.getHtmlContent();
            <span class="hljs-comment">// &#x6784;&#x9020;blob&#x6587;&#x4EF6;&#x6D41;</span>
            <span class="hljs-keyword">let</span> html_ = <span class="hljs-keyword">new</span> Blob([html],{ <span class="hljs-string">&quot;type&quot;</span> : <span class="hljs-string">&quot;text/html;charset=utf-8&quot;</span> })
            <span class="hljs-keyword">let</span> formdata = <span class="hljs-keyword">new</span> FormData();
            formdata.append(<span class="hljs-string">&apos;file&apos;</span>, html_, <span class="hljs-string">`sdf.html`</span>);<span class="hljs-comment">//sdf.html&#x662F;&#x8BBE;&#x7F6E;&#x6587;&#x4EF6;&#x540D;</span>
            axios({
                <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;post&apos;</span>,
                <span class="hljs-attr">url</span>: url,
                <span class="hljs-attr">data</span>:formdata,
                <span class="hljs-attr">responseType</span>:<span class="hljs-string">&apos;blob&apos;</span>,<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5982;&#x679C;&#x4E0D;&#x8BBE;&#x7F6E;&#xFF0C;&#x4E0B;&#x8F7D;&#x4F1A;&#x6253;&#x4E0D;&#x5F00;&#x6587;&#x4EF6;</span>
            })
            .then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;download res&apos;</span>,res);
                <span class="hljs-comment">//&#x901A;&#x8FC7;&#x540E;&#x53F0;&#x8FD4;&#x56DE; &#x7684;word&#x6587;&#x4EF6;&#x6D41;&#x8BBE;&#x7F6E;&#x6587;&#x4EF6;&#x540D;&#x5E76;&#x4E0B;&#x8F7D;</span>
                <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([res.data], { <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8&apos;</span>}); <span class="hljs-comment">//application/vnd.openxmlformats-officedocument.wordprocessingml.document&#x8FD9;&#x91CC;&#x8868;&#x793A;doc&#x7C7B;&#x578B;</span>
                <span class="hljs-keyword">var</span> downloadElement = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;a&apos;</span>);
                <span class="hljs-keyword">var</span> href = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob); <span class="hljs-comment">//&#x521B;&#x5EFA;&#x4E0B;&#x8F7D;&#x7684;&#x94FE;&#x63A5;</span>
                downloadElement.href = href;
                downloadElement.download =<span class="hljs-string">&apos;s.doc&apos;</span>; <span class="hljs-comment">//&#x4E0B;&#x8F7D;&#x540E;&#x6587;&#x4EF6;&#x540D;</span>
                <span class="hljs-built_in">document</span>.body.appendChild(downloadElement);
                downloadElement.click(); <span class="hljs-comment">//&#x70B9;&#x51FB;&#x4E0B;&#x8F7D;</span>
                <span class="hljs-built_in">document</span>.body.removeChild(downloadElement); <span class="hljs-comment">//&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#x79FB;&#x9664;&#x5143;&#x7D20;</span>
                <span class="hljs-built_in">window</span>.URL.revokeObjectURL(href); <span class="hljs-comment">//&#x91CA;&#x653E;&#x6389;blob&#x5BF9;&#x8C61;</span>
            })</code></pre><p>3&#x3001;&#x5BFC;&#x51FA;PDF<br>&#x65B9;&#x6CD5;&#xFF1A;<br>1&#xFF09;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;htmlToPdf.js&#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x4E0B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0B;&#x9762;&#x4E24;&#x4E2A;package&#x8981;&#x5355;&#x72EC;&#x5B89;&#x88C5;
import html2Canvas from &apos;html2canvas&apos;
import JsPDF from &apos;jspdf&apos;

export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function (id,title) {
      html2Canvas(document.querySelector(`#${id}`), {
        // allowTaint: true
        useCORS:true//&#x770B;&#x60C5;&#x51B5;&#x9009;&#x7528;&#x4E0A;&#x9762;&#x8FD8;&#x662F;&#x4E0B;&#x9762;&#x7684;&#xFF0C;
      }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL(&apos;image/jpeg&apos;, 1.0)
            let PDF = new JsPDF(&apos;&apos;, &apos;pt&apos;, &apos;a4&apos;)
            if (leftHeight &lt; pageHeight) {
                PDF.addImage(pageData, &apos;JPEG&apos;, 0, 0, imgWidth, imgHeight)
            } else {
            while (leftHeight &gt; 0) {
                  PDF.addImage(pageData, &apos;JPEG&apos;, 0, position, imgWidth, imgHeight)
                  leftHeight -= pageHeight
                  position -= 841.89
                  if (leftHeight &gt; 0) {
                      PDF.addPage()
                  }
              }
            }
            PDF.save(title + &apos;.pdf&apos;)
        }
      )
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4E0B;&#x9762;&#x4E24;&#x4E2A;package&#x8981;&#x5355;&#x72EC;&#x5B89;&#x88C5;</span>
<span class="hljs-keyword">import</span> html2Canvas <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;html2canvas&apos;</span>
<span class="hljs-keyword">import</span> JsPDF <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;jspdf&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
  install (Vue, options) {
    Vue.prototype.getPdf = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id,title</span>) </span>{
      html2Canvas(<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">`#<span class="hljs-subst">${id}</span>`</span>), {
        <span class="hljs-comment">// allowTaint: true</span>
        useCORS:<span class="hljs-literal">true</span><span class="hljs-comment">//&#x770B;&#x60C5;&#x51B5;&#x9009;&#x7528;&#x4E0A;&#x9762;&#x8FD8;&#x662F;&#x4E0B;&#x9762;&#x7684;&#xFF0C;</span>
      }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">canvas</span>) </span>{
            <span class="hljs-keyword">let</span> contentWidth = canvas.width
            <span class="hljs-keyword">let</span> contentHeight = canvas.height
            <span class="hljs-keyword">let</span> pageHeight = contentWidth / <span class="hljs-number">592.28</span> * <span class="hljs-number">841.89</span>
            <span class="hljs-keyword">let</span> leftHeight = contentHeight
            <span class="hljs-keyword">let</span> position = <span class="hljs-number">0</span>
            <span class="hljs-keyword">let</span> imgWidth = <span class="hljs-number">595.28</span>
            <span class="hljs-keyword">let</span> imgHeight = <span class="hljs-number">592.28</span> / contentWidth * contentHeight
            <span class="hljs-keyword">let</span> pageData = canvas.toDataURL(<span class="hljs-string">&apos;image/jpeg&apos;</span>, <span class="hljs-number">1.0</span>)
            <span class="hljs-keyword">let</span> PDF = <span class="hljs-keyword">new</span> JsPDF(<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-string">&apos;pt&apos;</span>, <span class="hljs-string">&apos;a4&apos;</span>)
            <span class="hljs-keyword">if</span> (leftHeight &lt; pageHeight) {
                PDF.addImage(pageData, <span class="hljs-string">&apos;JPEG&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, imgWidth, imgHeight)
            } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">while</span> (leftHeight &gt; <span class="hljs-number">0</span>) {
                  PDF.addImage(pageData, <span class="hljs-string">&apos;JPEG&apos;</span>, <span class="hljs-number">0</span>, position, imgWidth, imgHeight)
                  leftHeight -= pageHeight
                  position -= <span class="hljs-number">841.89</span>
                  <span class="hljs-keyword">if</span> (leftHeight &gt; <span class="hljs-number">0</span>) {
                      PDF.addPage()
                  }
              }
            }
            PDF.save(title + <span class="hljs-string">&apos;.pdf&apos;</span>)
        }
      )
    }
  }
}</code></pre><p>2&#xFF09;main.js&#x6587;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import htmlToPdf from &apos;@/utils/htmlToPdf&apos;
Vue.use(htmlToPdf)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> htmlToPdf <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/htmlToPdf&apos;</span>
Vue.use(htmlToPdf)</code></pre><p>3&#xFF09;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x8981;&#x5BFC;&#x51FA;pdf&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x6DFB;&#x52A0; &#x5982;&#x4E0B; &#x4EE3;&#x7801;&#x5373;&#x53EF;&#x5BFC;&#x51FA;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.getPdf(&apos;resumeId&apos;,name)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">this</span>.getPdf(<span class="hljs-string">&apos;resumeId&apos;</span>,name)</code></pre><p><span class="img-wrap"><img data-src="/img/bVbexSt?w=2878&amp;h=1608" src="https://static.alili.tech/img/bVbexSt?w=2878&amp;h=1608" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbexQE?w=2878&amp;h=912" src="https://static.alili.tech/img/bVbexQE?w=2878&amp;h=912" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbexQR?w=2878&amp;h=1538" src="https://static.alili.tech/img/bVbexQR?w=2878&amp;h=1538" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbexQ1?w=2876&amp;h=1614" src="https://static.alili.tech/img/bVbexQ1?w=2876&amp;h=1614" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x603B;&#x7ED3;&#xFF1A;<br>1&#x3001;&#x867D;&#x7136;&#x5B8C;&#x6210;&#x4E86;&#x4E09;&#x79CD;&#x6587;&#x4EF6;&#x7684;&#x5BFC;&#x51FA;&#x4F46;&#x662F;&#x6211;&#x5BF9;word&#x548C;html&#x5BFC;&#x51FA;&#x8FD8;&#x662F;&#x4E0D;&#x6EE1;&#x610F;&#xFF0C;&#x4E0D;&#x662F;&#x6700;&#x4F73;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x679C; &#x6709;&#x4EBA;&#x6709;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;<br>2&#x3001;&#x5BFC;&#x51FA;&#x7684;word&#x6CA1;&#x6709;&#x4E86;&#x6837;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x5757;&#x8FD8;&#x662F;&#x6709;&#x95EE;&#x9898;<br>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x5E2E;&#x52A9;&#x5230;&#x4F60;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x6253;&#x8D4F;&#x6211;&#x66F4;&#x6709;&#x52A8;&#x529B;&#x6765;&#x66F4;&#x65B0;&#x6587;&#x7AE0;</p><p><span class="img-wrap"><img data-src="/img/bVbhA0O?w=900&amp;h=1350" src="https://static.alili.tech/img/bVbhA0O?w=900&amp;h=1350" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x5F15;&#x7528; &#xFF1A;<br>1&#x3001;<a>https://stackoverflow.com/questions/43537121/how-to-get-html-content-of-component-in-vue-js</a><br>2&#x3001;<a href="https://segmentfault.com/q/1010000015816137">file-writer</a><br>3&#x3001;<a href="https://segmentfault.com/a/1190000013729797" target="_blank">nodejs(officegen)+vue(axios)&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x5BFC;&#x51FA;word&#x6587;&#x6863;</a><br>4&#x3001;<a href="http://www.cnblogs.com/zichi/p/html5-file-api.html" rel="nofollow noreferrer" target="_blank">HTML5 File API &#x2014; &#x8BA9;&#x524D;&#x7AEF;&#x64CD;&#x4F5C;&#x6587;&#x4EF6;&#x53D8;&#x7684;&#x53EF;&#x80FD;</a><br>5&#x3001;<a href="https://blog.csdn.net/mr_wuch/article/details/70141674" rel="nofollow noreferrer" target="_blank">Html5&#x2014;&#x2014;File&#x3001;FileReader&#x3001;Blob&#x3001;Fromdata&#x5BF9;&#x8C61;</a><br>6&#x3001;<a href="https://blog.csdn.net/pratise/article/details/79249943" rel="nofollow noreferrer" target="_blank">Vue&#x5BFC;&#x51FA;&#x9875;&#x9762;&#x4E3A;PDF&#x683C;&#x5F0F;</a><br>7&#x3001;<a href="https://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer" target="_blank">axios&#x4E2D;&#x6587;&#x8BF4;&#x660E;</a><br>8&#x3001;<a href="https://blog.csdn.net/yanzisu_congcong/article/details/80840152" rel="nofollow noreferrer" target="_blank">vue&#x5B9E;&#x73B0;word&#xFF0C;pdf&#x6587;&#x4EF6;&#x7684;&#x5BFC;&#x51FA;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue导出html、word和pdf

## 原文链接
[https://segmentfault.com/a/1190000015820792](https://segmentfault.com/a/1190000015820792)

