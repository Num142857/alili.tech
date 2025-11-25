---
title: 'krpano各种Objects' 
date: 2019-02-07 2:30:15
hidden: true
slug: vjb93r8w8k
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>krpano中有好多object，krpano Plugin Interface, krpano Plugin Object, krpano Base Object, krpano Interface Object, krpano Javascript Interface... 真心觉得官方文档的组织形式太晦涩了，所以这里整理下</p></blockquote>
<h1 id="articleHeader0">krpano Plugin Interface</h1>
<p><strong>定义krpano plugin的时候需要遵循的接口。</strong><br><a href="http://krpano.com/docu/plugininterface" rel="nofollow noreferrer" target="_blank">http://krpano.com/docu/plugininterface</a></p>
<p>定义krpano插件的时候，基本上就是定义一个叫krpanoplugin的function，这个function会在krpano加载插件的时候调用到。</p>
<p>krpanoplugin的方法里，有几个特殊的地方：</p>
<ol>
<li><p><code>this</code>指向当前的plugin对象</p></li>
<li><p>需要按照<a href="http://krpano.com/docu/plugininterface/#plugininterface" rel="nofollow noreferrer" target="_blank">krpano Plugin Interface</a>，在this下定义并实现几个方法。<code>registerplugin</code>, <code>unloadplugin</code>必选；<code>onresize</code>可选</p></li>
</ol>
<p><code>registerplugin</code>当krpano要去加载该插件的时候被调用，调用时会传三个参数：依次是<a href="http://krpano.com/docu/plugininterface/#krpanointerface" rel="nofollow noreferrer" target="_blank">krpano Interface Object</a>, plugin path, <a href="http://krpano.com/docu/plugininterface/#krpanopluginobject" rel="nofollow noreferrer" target="_blank">krpano Plugin Object</a></p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
    krpano HTML5 Javascript Plugin Example
*/

function krpanoplugin () {
    var local = this;   // save the 'this' pointer from the current plugin object
    var krpano = null;  // the krpano and plugin interface objects
    var plugin = null;

    var xml_value = 100.0;   // the value for a custom xml attribute

    // registerplugin - startup point for the plugin (required)
    // - krpanointerface = krpano interface object
    // - pluginpath = the fully qualified plugin name (e.g. &quot;plugin[name]&quot;)
    // - pluginobject = the xml plugin object itself
    local.registerplugin = function (krpanointerface, pluginpath, pluginobject) {
        // get the krpano interface and the plugin object
        krpano = krpanointerface;
        plugin = pluginobject;

        // first - say hello
        krpano.trace(1, &quot;hello from plugin[&quot; + plugin.name + &quot;]&quot;);

        // add plugin attributes
        plugin.registerattribute(&quot;mode&quot;, &quot;normal&quot;);
        plugin.registerattribute(&quot;value&quot;, xml_value, value_setter, value_getter);

        // add plugin action (the attribute needs to be lowercase!)
        plugin.dosomething = action_dosomething;

        // optionally - add some graphical content:

        // register the size of the content
        plugin.registercontentsize(200,200);

        // use 100% width/height for automatic scaling with the plugin size
        var text = document.createElement(&quot;div&quot;);
        text.style.cssText = &quot;width:100%;height:100%;&quot;+
            &quot;display:flex;color:white;background:rgba(10,50,100,0.5);&quot;+
            &quot;align-items:center;justify-content:center;text-align:center;&quot;;
        text.innerHTML = &quot;HTML5<br>TEST PLUGIN<br>click me&quot;;

        // the plugin 'sprite' variable is the internal html element of the plugin
        plugin.sprite.appendChild(text);
    }

    // unloadplugin - exit point for the plugin (optionally)
    // - will be called from krpano when the plugin will be removed
    // - everything that was added by the plugin should be removed here
    local.unloadplugin = function() {
        plugin = null;
        krpano = null;
    }

    // onresize (optionally)
    // - width,height = the new size for the plugin
    // - when not defined then only the krpano plugin html element will be sized
    local.onresize = function(width,height) {
        // not used in this example
        // the plugin content will resize automatically because
        // of the width=100%, height=100% CSS style
        return false;
    }

    function value_setter(newvalue) {
        if (newvalue != xml_value) {
            krpano.trace(1, &quot;'value' will be changed from &quot; + xml_value + &quot; to &quot; + newvalue);
            xml_value = newvalue;
        }
    }

    function value_getter () {
        return xml_value;
    }

    function action_dosomething () {
        // trace the given action arguments
        krpano.trace(1, &quot;dosomething() was called with &quot; + arguments.length + &quot; arguments:&quot;);
        for (var i=0; i < arguments.length; i++)
            krpano.trace(1, &quot;arguments[&quot; + i + &quot;]=&quot; + arguments[i]);

        // trace some infos
        krpano.trace(1, &quot;mode=&quot; + plugin.mode);
        krpano.trace(1, &quot;lookat=&quot; + krpano.view.hlookat + &quot; / &quot; + krpano.view.vlookat);

        // call krpano actions
        plugin.accuracy = 1;    // disable grid fitting for smoother size changes
        krpano.call(&quot;tween(width|height, 500|100)&quot;, plugin);
        krpano.call(&quot;lookto(0,0,150); wait(1.0); lookto(90,0,90);&quot;);
        krpano.call(&quot;tween(width|height, 200|200)&quot;, plugin);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">/*
    krpano HTML5 Javascript Plugin Example
*/</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">krpanoplugin</span> </span>() {
    <span class="hljs-keyword">var</span> local = <span class="hljs-built_in">this</span>;   <span class="hljs-comment">// save the 'this' pointer from the current plugin object</span>
    <span class="hljs-keyword">var</span> krpano = <span class="hljs-literal">null</span>;  <span class="hljs-comment">// the krpano and plugin interface objects</span>
    <span class="hljs-keyword">var</span> plugin = <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">var</span> xml_value = <span class="hljs-number">100.0</span>;   <span class="hljs-comment">// the value for a custom xml attribute</span>

    <span class="hljs-comment">// registerplugin - startup point for the plugin (required)</span>
    <span class="hljs-comment">// - krpanointerface = krpano interface object</span>
    <span class="hljs-comment">// - pluginpath = the fully qualified plugin name (e.g. "plugin[name]")</span>
    <span class="hljs-comment">// - pluginobject = the xml plugin object itself</span>
    local.registerplugin = <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(krpanointerface, pluginpath, pluginobject) {
        <span class="hljs-comment">// get the krpano interface and the plugin object</span>
        krpano = krpanointerface;
        plugin = pluginobject;

        <span class="hljs-comment">// first - say hello</span>
        krpano.<span class="hljs-built_in">trace</span>(<span class="hljs-number">1</span>, <span class="hljs-string">"hello from plugin["</span> + plugin.name + <span class="hljs-string">"]"</span>);

        <span class="hljs-comment">// add plugin attributes</span>
        plugin.registerattribute(<span class="hljs-string">"mode"</span>, <span class="hljs-string">"normal"</span>);
        plugin.registerattribute(<span class="hljs-string">"value"</span>, xml_value, value_setter, value_getter);

        <span class="hljs-comment">// add plugin action (the attribute needs to be lowercase!)</span>
        plugin.dosomething = action_dosomething;

        <span class="hljs-comment">// optionally - add some graphical content:</span>

        <span class="hljs-comment">// register the size of the content</span>
        plugin.registercontentsize(<span class="hljs-number">200</span>,<span class="hljs-number">200</span>);

        <span class="hljs-comment">// use 100% width/height for automatic scaling with the plugin size</span>
        <span class="hljs-keyword">var</span> text = document.createElement(<span class="hljs-string">"div"</span>);
        text.style.cssText = <span class="hljs-string">"width:100%;height:100%;"</span>+
            <span class="hljs-string">"display:flex;color:white;background:rgba(10,50,100,0.5);"</span>+
            <span class="hljs-string">"align-items:center;justify-content:center;text-align:center;"</span>;
        text.innerHTML = <span class="hljs-string">"HTML5&lt;br&gt;TEST PLUGIN&lt;br&gt;click me"</span>;

        <span class="hljs-comment">// the plugin 'sprite' variable is the internal html element of the plugin</span>
        plugin.sprite.appendChild(text);
    }

    <span class="hljs-comment">// unloadplugin - exit point for the plugin (optionally)</span>
    <span class="hljs-comment">// - will be called from krpano when the plugin will be removed</span>
    <span class="hljs-comment">// - everything that was added by the plugin should be removed here</span>
    local.unloadplugin = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
        plugin = <span class="hljs-literal">null</span>;
        krpano = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">// onresize (optionally)</span>
    <span class="hljs-comment">// - width,height = the new size for the plugin</span>
    <span class="hljs-comment">// - when not defined then only the krpano plugin html element will be sized</span>
    local.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(width,height) {
        <span class="hljs-comment">// not used in this example</span>
        <span class="hljs-comment">// the plugin content will resize automatically because</span>
        <span class="hljs-comment">// of the width=100%, height=100% CSS style</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">value_setter</span></span>(<span class="hljs-keyword">new</span><span class="hljs-type">value</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">value</span> != xml_value) {
            krpano.<span class="hljs-built_in">trace</span>(<span class="hljs-number">1</span>, <span class="hljs-string">"'value' will be changed from "</span> + xml_value + <span class="hljs-string">" to "</span> + <span class="hljs-keyword">new</span><span class="hljs-type">value</span>);
            xml_value = <span class="hljs-keyword">new</span><span class="hljs-type">value</span>;
        }
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">value_getter</span> </span>() {
        <span class="hljs-keyword">return</span> xml_value;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">action_dosomething</span> </span>() {
        <span class="hljs-comment">// trace the given action arguments</span>
        krpano.<span class="hljs-built_in">trace</span>(<span class="hljs-number">1</span>, <span class="hljs-string">"dosomething() was called with "</span> + arguments.length + <span class="hljs-string">" arguments:"</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i &lt; arguments.length; i++)
            krpano.<span class="hljs-built_in">trace</span>(<span class="hljs-number">1</span>, <span class="hljs-string">"arguments["</span> + i + <span class="hljs-string">"]="</span> + arguments[i]);

        <span class="hljs-comment">// trace some infos</span>
        krpano.<span class="hljs-built_in">trace</span>(<span class="hljs-number">1</span>, <span class="hljs-string">"mode="</span> + plugin.mode);
        krpano.<span class="hljs-built_in">trace</span>(<span class="hljs-number">1</span>, <span class="hljs-string">"lookat="</span> + krpano.view.hlookat + <span class="hljs-string">" / "</span> + krpano.view.vlookat);

        <span class="hljs-comment">// call krpano actions</span>
        plugin.accuracy = <span class="hljs-number">1</span>;    <span class="hljs-comment">// disable grid fitting for smoother size changes</span>
        krpano.call(<span class="hljs-string">"tween(width|height, 500|100)"</span>, plugin);
        krpano.call(<span class="hljs-string">"lookto(0,0,150); wait(1.0); lookto(90,0,90);"</span>);
        krpano.call(<span class="hljs-string">"tween(width|height, 200|200)"</span>, plugin);
    }
}</code></pre>
<h1 id="articleHeader1">krpano Plugin Object</h1>
<p><strong> 在定义krpano plugin时，其中一个接口registerplugin中的第三个参数，指代plugin对象本身。</strong><br><a href="http://krpano.com/docu/plugininterface/#plugininterface" rel="nofollow noreferrer" target="_blank">http://krpano.com/docu/plugininterface/#plugininterface</a></p>
<p>在plugin定义时的registerplugin方法中的第三个参数krpano plugin object，实际上是xml文件中&lt;plugin&gt;元素的内部呈现。但是除了&lt;plugin&gt;元素的各种属性意外，plugin object还有几个特殊的属性和方法：</p>
<ol>
<li>
<p>sprite</p>
<ul>
<li><p>HTML5 - The HTML &lt;div&gt; element of the plugin object.</p></li>
<li><p>The sprite object can be used for adding custom display elements (DisplayList elements in Flash, HTML DOM elements in HTML5) to the plugin itself.<br>Note - when using the plugin as hotspot, then the sprite object is only available when rendering the hotspot via CSS3D (see the renderer setting)!</p></li>
</ul>
</li>
<li>
<p>videoDOM</p>
<ul>
<li><p>A special attribute to allow the plugin providing a HTML5 video object for rendering.</p></li>
<li><p>The krpano viewer will use that video object for rendering when using the plugin as hotspots or as pano image (via url="plugin:video").</p></li>
<li><p>Setup: videowidth and videoheight attributes with the size of the video need to be added to plugin object, and once the video is ready for rendering the onvideoreadyCB function of the plugin be called. For all details please see the example source code of the videoplayer plugin.</p></li>
<li><p>Special usage: with some tricks it's also possible to use a HTML5 canvas object as video source. Use the canvas as videoDOM and add these 'faked' properties to it: readyState=4, videoWidth=canvas.width, currentTime=time or frame number (should change when the content changes).</p></li>
</ul>
</li>
<li>
<p>registercontentsize(width, height)</p>
<ul>
<li><p>Define the 'default' size of the plugin display content.</p></li>
<li><p>This is the size that will be used when the user hasn't set the width or height.</p></li>
</ul>
</li>
<li>
<p>updatepos()</p>
<ul>
<li><p>Parse the position related settings and update the internal display object of the plugin.</p></li>
<li><p>After calling this function the pixelwidth and pixelheight variables will contain the final pixel sizes of the plugin element.</p></li>
</ul>
</li>
<li>
<p>getfullpath()</p>
<ul><li><p>Returns the xml embedding path/name - e.g. "plugin[name]" or "hotspot[name]".</p></li></ul>
</li>
<li><p>_assignEvents(htmlelement, mode)</p></li>
</ol>
<h1 id="articleHeader2">krpano Interface Object</h1>
<p><strong>在定义krpano plugin时，其中一个接口registerplugin中的第一个参数，是内部访问krpano的直接媒介（接口对象）。</strong><br><a href="http://krpano.com/docu/plugininterface/#krpanointerface" rel="nofollow noreferrer" target="_blank">http://krpano.com/docu/plugininterface/#krpanointerface</a></p>
<p>这个接口对象提供了访问整个krpano的所有结构和方法，之外还额外提供了一些方法来做数据访问，action调用等。</p>
<p>这些额外的方法有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. set(variable, value)
2. get(variable)
3. call(actioncode, callerobject*)
4. trace(code, message)
5. parsepath(path)
6. loadFile(file, donecallback, errorcallback*)
7. loadImage(fiel, donecallback, errorcallback*)
8. screentosphere(x, y)
9. spheretoscreen(v, h)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>set(variable, value)
<span class="hljs-bullet">2. </span>get(variable)
<span class="hljs-bullet">3. </span>call(actioncode, callerobject*)
<span class="hljs-bullet">4. </span>trace(code, message)
<span class="hljs-bullet">5. </span>parsepath(path)
<span class="hljs-bullet">6. </span>loadFile(file, donecallback, errorcallback*)
<span class="hljs-bullet">7. </span>loadImage(fiel, donecallback, errorcallback*)
<span class="hljs-bullet">8. </span>screentosphere(x, y)
<span class="hljs-bullet">9. </span>spheretoscreen(v, h)
</code></pre>
<h1 id="articleHeader3">krpano Base Object</h1>
<p><a href="http://krpano.com/docu/plugininterface/#baseobject" rel="nofollow noreferrer" target="_blank">http://krpano.com/docu/plugininterface/#baseobject</a></p>
<p>所有的xml中定义的元素、对象和数组对象，包括krpano Interface Object都是继承与<a href="http://krpano.com/docu/plugininterface/#baseobject" rel="nofollow noreferrer" target="_blank">krpano Base Object</a>。（上面说过krpano Plugin Interface就是xml中的&lt;plugin&gt;元素，所以它也继承了base）</p>
<p>Base提供了一些基础的添加/注册属性或者创建子数组结构的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. registerattribute(attributename, defaultvalue, setter*, getter*)
2. removeattribute(attributename)
3. getattributes()
4. createobject(objectname)
5. removeobject(objectname)
6. createarray(arrayname)
7. removearray(arrayname)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-number">1.</span> registerattribute(attributename, defaultvalue, setter*, getter*)
<span class="hljs-number">2.</span> <span class="hljs-comment">removeattribute(attributename)</span>
<span class="hljs-number">3.</span> getattributes()
<span class="hljs-number">4.</span> createobject(objectname)
<span class="hljs-number">5.</span> <span class="hljs-comment">removeobject(objectname)</span>
<span class="hljs-number">6.</span> createarray(arrayname)
<span class="hljs-number">7.</span> <span class="hljs-comment">removearray(arrayname)</span>
</code></pre>
<h1 id="articleHeader4">krpano Array and Array-Item Objects</h1>
<p><a href="http://krpano.com/docu/plugininterface/#array" rel="nofollow noreferrer" target="_blank">http://krpano.com/docu/plugininterface/#array</a></p>
<p>krpano中的数组对象，不同于javascript中的数组。当在xml中一个元素定义了name属性，那么其实就创建了一个krpano数组；或者是当给一个变量设置了array-path，即'arrayname[itemname].variable'时，也创建了krpano数组。</p>
<p>数组中的元素也是继承与krpano Base Object，并且额外提供了<code>name</code>和<code>index</code>属性。这些数组元素可以用来保存任何属性，方法或者是另外一个krpano数组。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var kr = document.getElementById('krSWFObject');
var hotspots = kr.get('hotspot');           // hotspots就是krpano array
var aHotspot = hotspot['spot1'];            // aHotspot就是krpano array item" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>var kr = document.getElementById('krSWFObject');
var hotspots = kr.get('hotspot');           // hotspots就是krpano<span class="hljs-built_in"> array
</span>var aHotspot = hotspot['spot1'];            // aHotspot就是krpano<span class="hljs-built_in"> array </span>item</code></pre>
<p>krpano Array Object提供的属性和方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. count
2. createItem(name or index)
3. getItem(name or index)
4. renameItem(oldname:String, newname:String)
5. removeItem(name or index) / removearrayitem(name or index)
6. getArray()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code><span class="hljs-number">1.</span> count
<span class="hljs-number">2.</span> createItem(<span class="hljs-keyword">name</span> <span class="hljs-keyword">or</span> index)
<span class="hljs-number">3.</span> getItem(<span class="hljs-keyword">name</span> <span class="hljs-keyword">or</span> index)
<span class="hljs-number">4.</span> renameItem(oldname:String, newname:String)
<span class="hljs-number">5.</span> <span class="hljs-comment">removeItem(name or index) / removearrayitem(name or index)</span>
<span class="hljs-number">6.</span> getArray()
</code></pre>
<p>krpano Array-item Object提供的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. name
2. count 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-number">1.</span> <span class="hljs-built_in">name</span>
<span class="hljs-number">2.</span> <span class="hljs-built_in">count</span> 
</code></pre>
<h1 id="articleHeader5">krpano Javascript Interface / krpano Javascript-Interface Object</h1>
<p><a href="http://krpano.com/docu/js/#top" rel="nofollow noreferrer" target="_blank">http://krpano.com/docu/js/#top</a></p>
<p><strong> 在krpano外部同步javascript操作krpano的接口，实现这个接口的对象就是krpano Javascript-Interface Object</strong></p>
<p>这个对象提供的接口有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. set(variable, value)
2. get(variable)
3. call(action)
4. spheretoscreen(h, v)
5. screentosphere(x, y)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>1. <span class="hljs-keyword">set</span>(<span class="hljs-keyword">variable</span>, <span class="hljs-keyword">value</span>)
<span class="hljs-number">2.</span> <span class="hljs-keyword">get</span>(<span class="hljs-keyword">variable</span>)
<span class="hljs-number">3.</span> <span class="hljs-keyword">call</span>(<span class="hljs-keyword">action</span>)
<span class="hljs-number">4.</span> spheretoscreen(h, v)
<span class="hljs-number">5.</span> screentosphere(x, y)
</code></pre>
<blockquote><p>ygjack: 可以看到这个接口是krpano Interface Object提供接口的子集</p></blockquote>
<p>获得krpano Javascript-Interface Object:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var kr = document.getElementById('krpanoSWFObject'); // 'krpanoSWFObject'是默认id" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> kr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'krpanoSWFObject'</span>); <span class="hljs-comment">// 'krpanoSWFObject'是默认id</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
krpano各种Objects

## 原文链接
[https://segmentfault.com/a/1190000006029464](https://segmentfault.com/a/1190000006029464)

