---
title: '【转】HTML的HEAD中放啥？' 
date: 2019-02-11 2:30:49
hidden: true
slug: uy58695cb4
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">HEAD</h1>
<p>一系列的你需要放在<code>&lt;head&gt;</code>标签里的东西</p>
<h2 id="articleHeader1">Elements</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<title>Page Title</title>
<base href=&quot;https://example.com/page.html&quot;>
<style>
  body { color: red; }
</style>
<script src=&quot;script.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Page Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/page.html"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">color</span>: red; }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"script.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader2">Meta Element</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta charset=&quot;utf-8&quot;>
<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
<meta name=&quot;keywords&quot; content=&quot;your,keywords,here,comma,separated,no,spaces&quot;>
<meta name=&quot;description&quot; content=&quot;150 chars&quot;>
<meta name=&quot;subject&quot; content=&quot;your website's subject&quot;>
<meta name=&quot;language&quot; content=&quot;en&quot;>
<meta name=&quot;robots&quot; content=&quot;index,follow&quot;>
<meta name=&quot;revised&quot; content=&quot;Sunday, July 18th, 2010, 5:15 pm&quot;>
<meta name=&quot;abstract&quot; content=&quot;&quot;>
<meta name=&quot;topic&quot; content=&quot;&quot;>
<meta name=&quot;summary&quot; content=&quot;&quot;>
<meta name=&quot;classification&quot; content=&quot;business&quot;>
<meta name=&quot;author&quot; content=&quot;name, email@example.com&quot;>
<meta name=&quot;designer&quot; content=&quot;&quot;>
<meta name=&quot;reply-to&quot; content=&quot;email@example.com&quot;>
<meta name=&quot;owner&quot; content=&quot;&quot;>
<meta name=&quot;url&quot; content=&quot;https://example.com/&quot;>
<meta name=&quot;identifier-URL&quot; content=&quot;https://example.com/&quot;>
<meta name=&quot;directory&quot; content=&quot;submission&quot;>
<meta name=&quot;category&quot; content=&quot;&quot;>
<meta name=&quot;coverage&quot; content=&quot;Worldwide&quot;>
<meta name=&quot;distribution&quot; content=&quot;Global&quot;>
<meta name=&quot;rating&quot; content=&quot;General&quot;>
<meta name=&quot;revisit-after&quot; content=&quot;7 days&quot;>
<meta http-equiv=&quot;refresh&quot; content=&quot;300;url=https://example.com/&quot;>
<meta name=&quot;theme-color&quot; content=&quot;#E64545&quot;>

<!-- Cache Control -->
<meta http-equiv=&quot;Expires&quot; content=&quot;0&quot;>
<meta http-equiv=&quot;Pragma&quot; content=&quot;no-cache&quot;>
<meta http-equiv=&quot;Cache-Control&quot; content=&quot;no-cache&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"keywords"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"your,keywords,here,comma,separated,no,spaces"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"150 chars"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"subject"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"your website's subject"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"language"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"robots"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"index,follow"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"revised"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Sunday, July 18th, 2010, 5:15 pm"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"abstract"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"topic"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"summary"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"classification"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"business"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"author"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"name, email@example.com"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"designer"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"reply-to"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"email@example.com"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"owner"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"url"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"https://example.com/"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"identifier-URL"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"https://example.com/"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"directory"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"submission"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"category"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"coverage"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Worldwide"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"distribution"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Global"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"rating"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"General"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"revisit-after"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"7 days"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"refresh"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"300;url=https://example.com/"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"theme-color"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"#E64545"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Cache Control --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Expires"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Pragma"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Cache-Control"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no-cache"</span>&gt;</span></code></pre>
<h2 id="articleHeader3">Link Element</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;copyright&quot; href=&quot;copyright.html&quot;>
<link rel=&quot;stylesheet&quot; href=&quot;https://example.com/styles.css&quot;>
<link rel=&quot;alternate&quot; href=&quot;https://feeds.feedburner.com/martini&quot; type=&quot;application/rss+xml&quot; title=&quot;RSS&quot;>
<link rel=&quot;alternate&quot; href=&quot;https://example.com/feed.atom&quot; type=&quot;application/atom+xml&quot; title=&quot;Atom 0.3&quot;>
<link rel=&quot;me&quot; href=&quot;https://google.com/profiles/thenextweb&quot; type=&quot;text/html&quot;>
<link rel=&quot;archives&quot; href=&quot;https://example.com/2003/05/&quot; title=&quot;May 2003&quot;>
<link rel=&quot;index&quot; href=&quot;https://example.com/&quot; title=&quot;DeWitt Clinton&quot;>
<link rel=&quot;start&quot; href=&quot;https://example.com/photos/pattern_recognition_1_about/&quot; title=&quot;Pattern Recognition 1&quot;>
<link rel=&quot;prev&quot; href=&quot;https://example.com/opensearch/opensearch-and-openid-a-sure-way-to-get-my-attention/&quot; title=&quot;OpenSearch and OpenID? A sure way to get my attention.&quot;>
<link rel=&quot;search&quot; href=&quot;/search.xml&quot; type=&quot;application/opensearchdescription+xml&quot; title=&quot;Viatropos&quot;>
<link rel=&quot;self&quot; type=&quot;application/atom+xml&quot; href=&quot;https://example.com/atomFeed.php?page=3&quot;>
<link rel=&quot;first&quot; href=&quot;https://example.com/atomFeed.php&quot;>
<link rel=&quot;next&quot; href=&quot;https://example.com/atomFeed.php?page=4&quot;>
<link rel=&quot;previous&quot; href=&quot;https://example.com/atomFeed.php?page=2&quot;>
<link rel=&quot;last&quot; href=&quot;https://example.com/atomFeed.php?page=147&quot;>
<link rel=&quot;shortlink&quot; href=&quot;https://example.com/?p=43625&quot;>
<link rel=&quot;canonical&quot; href=&quot;https://example.com/2010/06/9-things-to-do-before-entering-social-media.html&quot;>
<link rel=&quot;EditURI&quot; href=&quot;https://example.com/xmlrpc.php?rsd&quot; type=&quot;application/rsd+xml&quot; title=&quot;RSD&quot;>
<link rel=&quot;pingback&quot; href=&quot;https://example.com/xmlrpc.php&quot;>
<link rel=&quot;webmention&quot; href=&quot;https://example.com/webmention&quot;>
<link rel=&quot;manifest&quot; href=&quot;manifest.json&quot;>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"copyright"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"copyright.html"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/styles.css"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"alternate"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://feeds.feedburner.com/martini"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"application/rss+xml"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"RSS"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"alternate"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/feed.atom"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"application/atom+xml"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Atom 0.3"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"me"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://google.com/profiles/thenextweb"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/html"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"archives"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/2003/05/"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"May 2003"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"index"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"DeWitt Clinton"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"start"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/photos/pattern_recognition_1_about/"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Pattern Recognition 1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"prev"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/opensearch/opensearch-and-openid-a-sure-way-to-get-my-attention/"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"OpenSearch and OpenID? A sure way to get my attention."</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/search.xml"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"application/opensearchdescription+xml"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Viatropos"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"self"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"application/atom+xml"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/atomFeed.php?page=3"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"first"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/atomFeed.php"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"next"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/atomFeed.php?page=4"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"previous"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/atomFeed.php?page=2"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"last"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/atomFeed.php?page=147"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"shortlink"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/?p=43625"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"canonical"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/2010/06/9-things-to-do-before-entering-social-media.html"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"EditURI"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/xmlrpc.php?rsd"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"application/rsd+xml"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"RSD"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"pingback"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/xmlrpc.php"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"webmention"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://example.com/webmention"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"manifest"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"manifest.json"</span>&gt;</span>

</code></pre>
<h3 id="articleHeader4">Favicons</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- For IE 10 and below -->  
<!-- No link, just place a file called favicon.ico in the root directory -->

<!-- For IE 11, Chrome, Firefox, Safari, Opera -->  
<link rel=&quot;icon&quot; href=&quot;path/to/favicon-16.png&quot; sizes=&quot;16x16&quot; type=&quot;image/png&quot;>  
<link rel=&quot;icon&quot; href=&quot;path/to/favicon-32.png&quot; sizes=&quot;32x32&quot; type=&quot;image/png&quot;>  
<link rel=&quot;icon&quot; href=&quot;path/to/favicon-48.png&quot; sizes=&quot;48x48&quot; type=&quot;image/png&quot;>  
<link rel=&quot;icon&quot; href=&quot;path/to/favicon-62.png&quot; sizes=&quot;62x62&quot; type=&quot;image/png&quot;>
<!-- More info: https://bitsofco.de/all-about-favicons-and-touch-icons/ -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- For IE 10 and below --&gt;</span>  
<span class="hljs-comment">&lt;!-- No link, just place a file called favicon.ico in the root directory --&gt;</span>

<span class="hljs-comment">&lt;!-- For IE 11, Chrome, Firefox, Safari, Opera --&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"path/to/favicon-16.png"</span> <span class="hljs-attr">sizes</span>=<span class="hljs-string">"16x16"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/png"</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"path/to/favicon-32.png"</span> <span class="hljs-attr">sizes</span>=<span class="hljs-string">"32x32"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/png"</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"path/to/favicon-48.png"</span> <span class="hljs-attr">sizes</span>=<span class="hljs-string">"48x48"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/png"</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"path/to/favicon-62.png"</span> <span class="hljs-attr">sizes</span>=<span class="hljs-string">"62x62"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/png"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- More info: https://bitsofco.de/all-about-favicons-and-touch-icons/ --&gt;</span></code></pre>
<p><a href="https://bitsofco.de/all-about-favicons-and-touch-icons/" rel="nofollow noreferrer" target="_blank">All About Favicons (And Touch Icons)</a></p>
<h2 id="articleHeader5">Social</h2>
<h3 id="articleHeader6">Facebook / Open Graph</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta property=&quot;og:url&quot; content=&quot;https://www.example.com/&quot;>
<meta property=&quot;og:title&quot; content=&quot;Content Title&quot;>
<meta property=&quot;og:description&quot; content=&quot;Description Here&quot;>
<meta property=&quot;og:site_name&quot; content=&quot;Site Name&quot;>
<meta property=&quot;og:image&quot; content=&quot;https://example.com/image.jpg&quot;>
<meta property=&quot;og:type&quot; content=&quot;website&quot;>
<meta property=&quot;og:locale&quot; content=&quot;en_US&quot;>
<meta property=&quot;fb:app_id&quot; content=&quot;Facebook numeric ID&quot;>
<meta property=&quot;fb:admins&quot; content=&quot;Facebook numeric ID&quot;>
<!-- Facebook: https://developers.facebook.com/docs/sharing/webmasters#markup -->
<!-- Open Graph: http://ogp.me/ -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"og:url"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"https://www.example.com/"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"og:title"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Content Title"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"og:description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Description Here"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"og:site_name"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Site Name"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"og:image"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"https://example.com/image.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"og:type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"website"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"og:locale"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"en_US"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"fb:app_id"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Facebook numeric ID"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">"fb:admins"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Facebook numeric ID"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Facebook: https://developers.facebook.com/docs/sharing/webmasters#markup --&gt;</span>
<span class="hljs-comment">&lt;!-- Open Graph: http://ogp.me/ --&gt;</span></code></pre>
<p><a href="https://developers.facebook.com/docs/sharing/webmasters#markup" rel="nofollow noreferrer" target="_blank">Facebook Open Graph Markup</a><br><a href="http://ogp.me/" rel="nofollow noreferrer" target="_blank">Open Graph protocol</a></p>
<h3 id="articleHeader7">Twitter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot;>
<meta name=&quot;twitter:site&quot; content=&quot;@publisher_handle&quot;>
<meta name=&quot;twitter:creator&quot; content=&quot;@author_handle&quot;>
<meta name=&quot;twitter:title&quot; content=&quot;Content Title&quot;>
<meta name=&quot;twitter:description&quot; content=&quot;Content description less than 200 characters&quot;>
<meta name=&quot;twitter:image&quot; content=&quot;https://example.com/image.jpg&quot;>
<!-- Twitter summary card with large image must be at least 280x150px -->
<!-- More info: https://dev.twitter.com/cards/getting-started -->
<!-- Validate: https://dev.twitter.com/docs/cards/validation/validator -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"twitter:card"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"summary_large_image"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"twitter:site"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"@publisher_handle"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"twitter:creator"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"@author_handle"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"twitter:title"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Content Title"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"twitter:description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Content description less than 200 characters"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"twitter:image"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"https://example.com/image.jpg"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- Twitter summary card with large image must be at least 280x150px --&gt;</span>
<span class="hljs-comment">&lt;!-- More info: https://dev.twitter.com/cards/getting-started --&gt;</span>
<span class="hljs-comment">&lt;!-- Validate: https://dev.twitter.com/docs/cards/validation/validator --&gt;</span></code></pre>
<p><a href="https://dev.twitter.com/cards/getting-started" rel="nofollow noreferrer" target="_blank">Twitter Cards: Getting Started Guide</a><br><a href="https://dev.twitter.com/docs/cards/validation/validator" rel="nofollow noreferrer" target="_blank">Twitter Card Validator</a></p>
<h3 id="articleHeader8">Google+ / Schema.org</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta itemprop=&quot;name&quot; content=&quot;Content Title&quot;>
<meta itemprop=&quot;description&quot; content=&quot;Content description less than 200 characters&quot;>
<meta itemprop=&quot;image&quot; content=&quot;https://example.com/image.jpg&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">itemprop</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Content Title"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">itemprop</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"Content description less than 200 characters"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">itemprop</span>=<span class="hljs-string">"image"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"https://example.com/image.jpg"</span>&gt;</span></code></pre>
<h2 id="articleHeader9">Browser/Platform</h2>
<h4>Apple iOS</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;format-detection&quot; content=&quot;telephone=no&quot;>
<meta name=&quot;apple-mobile-web-app-title&quot; content=&quot;My App&quot;>
<meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot;>
<meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot;>
<meta name=&quot;apple-touch-fullscreen&quot; content=&quot;yes&quot;>
<link rel=&quot;apple-touch-icon&quot; href=&quot;apple-touch-icon.png&quot;>
<link rel=&quot;apple-touch-icon-precomposed&quot; href=&quot;apple-touch-icon-precomposed.png&quot;>
<link rel=&quot;apple-touch-startup-image&quot; href=&quot;startup.png&quot;>
<!-- More info: https://developer.apple.com/safari/library/documentation/appleapplications/reference/safarihtmlref/articles/metatags.html -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telephone=no"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-title"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"My App"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-touch-fullscreen"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"apple-touch-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"apple-touch-icon.png"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"apple-touch-icon-precomposed"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"apple-touch-icon-precomposed.png"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"apple-touch-startup-image"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"startup.png"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- More info: https://developer.apple.com/safari/library/documentation/appleapplications/reference/safarihtmlref/articles/metatags.html --&gt;</span></code></pre>
<p><a href="https://developer.apple.com/safari/library/documentation/appleapplications/reference/safarihtmlref/articles/metatags.html" rel="nofollow noreferrer" target="_blank">Apple Meta Tags</a></p>
<h4>Internet Explorer</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;x-ua-compatible&quot; content=&quot;ie=edge&quot;>
<meta http-equiv=&quot;cleartype&quot; content=&quot;on&quot;>

<!-- Pinned Site -->
<!-- IE 10 / Windows 8 -->
<meta name=&quot;msapplication-TileImage&quot; content=&quot;pinned-tile-144.png&quot;>  
<meta name=&quot;msapplication-TileColor&quot; content=&quot;#009900&quot;>
<!-- IE 11 / Windows 9.1 -->
<meta name=&quot;msapplication-config&quot; content=&quot;ieconfig.xml&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"x-ua-compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"cleartype"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"on"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Pinned Site --&gt;</span>
<span class="hljs-comment">&lt;!-- IE 10 / Windows 8 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"msapplication-TileImage"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"pinned-tile-144.png"</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"msapplication-TileColor"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"#009900"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- IE 11 / Windows 9.1 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"msapplication-config"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ieconfig.xml"</span>&gt;</span></code></pre>
<h4>Internet Explorer (LEGACY DO NOT USE)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Legacy Tags (DO NOT USE) -->
<meta name=&quot;mssmarttagspreventparsing&quot; content=&quot;true&quot;>
<meta http-equiv=&quot;page-enter&quot; content=&quot;revealtrans(duration=2,transition=2)&quot;>
<meta http-equiv=&quot;page-exit&quot; content=&quot;revealtrans(duration=3,transition=12)&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- Legacy Tags (DO NOT USE) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"mssmarttagspreventparsing"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"true"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"page-enter"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"revealtrans(duration=2,transition=2)"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"page-exit"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"revealtrans(duration=3,transition=12)"</span>&gt;</span></code></pre>
<h5>Safari 9: Pinned tabs in El Capitan</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;mask-icon&quot; href=&quot;icon.svg&quot; color=&quot;red&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"mask-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"icon.svg"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"red"</span>&gt;</span></code></pre>
<h2 id="articleHeader10">Other Resources</h2>
<ul><li><p><a href="https://github.com/h5bp/html5-boilerplate/blob/master/dist/doc/html.md" rel="nofollow noreferrer" target="_blank">HTML5 Boilerplate Docs: The HTML</a></p></li></ul>
<h2 id="articleHeader11">Contributing</h2>
<p>Open an issue or a pull request to suggest changes or additions.</p>
<h2 id="articleHeader12">License</h2>
<p><a>MIT License</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【转】HTML的HEAD中放啥？

## 原文链接
[https://segmentfault.com/a/1190000004989872](https://segmentfault.com/a/1190000004989872)

