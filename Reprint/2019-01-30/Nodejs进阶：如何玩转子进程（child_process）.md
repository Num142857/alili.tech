---
title: 'Nodejs进阶：如何玩转子进程（child_process）' 
date: 2019-01-30 2:30:23
hidden: true
slug: 3txhfn3ejcb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文摘录自《Nodejs学习笔记》，更多章节及更新，请访问 <a href="https://github.com/chyingp/nodejs-learning-guide" rel="nofollow noreferrer" target="_blank">github主页地址</a>。欢迎加群交流，群号 <a href="http://shang.qq.com/wpa/qunwpa?idkey=7e4f670e1cd9278f30003965a1cc068a4f30d8c73aa071c8da189f4842dbbee6" rel="nofollow noreferrer" target="_blank">197339705</a>。</p></blockquote>
<h2 id="articleHeader0">模块概览</h2>
<p>在node中，child_process这个模块非常重要。掌握了它，等于在node的世界开启了一扇新的大门。熟悉shell脚本的同学，可以用它来完成很多有意思的事情，比如文件压缩、增量部署等，感兴趣的同学，看文本文后可以尝试下。</p>
<p>举个简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
<span class="hljs-keyword">const</span> ls = spawn(<span class="hljs-string">'ls'</span>, [<span class="hljs-string">'-lh'</span>, <span class="hljs-string">'/usr'</span>]);

ls.stdout.on(<span class="hljs-string">'data'</span>, (data) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`stdout: <span class="hljs-subst">${data}</span>`</span>);
});

ls.stderr.on(<span class="hljs-string">'data'</span>, (data) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`stderr: <span class="hljs-subst">${data}</span>`</span>);
});

ls.on(<span class="hljs-string">'close'</span>, (code) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`child process exited with code <span class="hljs-subst">${code}</span>`</span>);
});</code></pre>
<h2 id="articleHeader1">几种创建子进程的方式</h2>
<p>注意事项：</p>
<ul>
<li><p>下面列出来的都是异步创建子进程的方式，每一种方式都有对应的同步版本。</p></li>
<li><p><code>.exec()</code>、<code>.execFile()</code>、<code>.fork()</code>底层都是通过<code>.spawn()</code>实现的。</p></li>
<li><p><code>.exec()</code>、<code>execFile()</code>额外提供了回调，当子进程停止的时候执行。</p></li>
</ul>
<blockquote><p>child_process.spawn(command, args)<br>child_process.exec(command, options)<br>child_process.execFile(file, args[, callback])<br>child_process.fork(modulePath, args)</p></blockquote>
<h3 id="articleHeader2">child_process.exec(command, options)</h3>
<p>创建一个shell，然后在shell里执行命令。执行完成后，将stdout、stderr作为参数传入回调方法。</p>
<blockquote><p>spawns a shell and runs a command within that shell, passing the stdout and stderr to a callback function when complete.</p></blockquote>
<p>例子如下：</p>
<ol>
<li><p>执行成功，<code>error</code>为<code>null</code>；执行失败，<code>error</code>为<code>Error</code>实例。<code>error.code</code>为错误码，</p></li>
<li><p><code>stdout</code>、<code>stderr</code>为标准输出、标准错误。默认是字符串，除非<code>options.encoding</code>为<code>buffer</code></p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var exec = require('child_process').exec;

// 成功的例子
exec('ls -al', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + typeof stderr);
});

// 失败的例子
exec('ls hello.txt', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).exec;

<span class="hljs-comment">// 成功的例子</span>
exec(<span class="hljs-string">'ls -al'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, stdout, stderr</span>)</span>{
    <span class="hljs-keyword">if</span>(error) {
        <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'error: '</span> + error);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'stdout: '</span> + stdout);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'stderr: '</span> + <span class="hljs-keyword">typeof</span> stderr);
});

<span class="hljs-comment">// 失败的例子</span>
exec(<span class="hljs-string">'ls hello.txt'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, stdout, stderr</span>)</span>{
    <span class="hljs-keyword">if</span>(error) {
        <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'error: '</span> + error);
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'stdout: '</span> + stdout);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'stderr: '</span> + stderr);
});</code></pre>
<h4>参数说明：</h4>
<ul>
<li><p><code>cwd</code>：当前工作路径。</p></li>
<li><p><code>env</code>：环境变量。</p></li>
<li><p><code>encoding</code>：编码，默认是<code>utf8</code>。</p></li>
<li><p><code>shell</code>：用来执行命令的shell，unix上默认是<code>/bin/sh</code>，windows上默认是<code>cmd.exe</code>。</p></li>
<li><p><code>timeout</code>：默认是0。</p></li>
<li><p><code>killSignal</code>：默认是<code>SIGTERM</code>。</p></li>
<li><p><code>uid</code>：执行进程的uid。</p></li>
<li><p><code>gid</code>：执行进程的gid。</p></li>
<li><p><code>maxBuffer</code>：&lt;Number&gt; 标准输出、错误输出最大允许的数据量（单位为字节），如果超出的话，子进程就会被杀死。默认是200*1024（就是200k啦）</p></li>
</ul>
<p>备注：</p>
<ol>
<li><p>如果<code>timeout</code>大于0，那么，当子进程运行超过<code>timeout</code>毫秒，那么，就会给进程发送<code>killSignal</code>指定的信号（比如<code>SIGTERM</code>）。</p></li>
<li><p>如果运行没有出错，那么<code>error</code>为<code>null</code>。如果运行出错，那么，<code>error.code</code>就是退出代码（exist code），<code>error.signal</code>会被设置成终止进程的信号。（比如<code>CTRL+C</code>时发送的<code>SIGINT</code>）</p></li>
</ol>
<h4>风险项</h4>
<p>传入的命令，如果是用户输入的，有可能产生类似sql注入的风险，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exec('ls hello.txt; rm -rf *', function(error, stdout, stderr){
    if(error) {
        console.error('error: ' + error);
        // return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-built_in">exec</span>(<span class="hljs-string">'ls hello.txt; rm -rf *'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(error, stdout, stderr)</span>{</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">error</span>) {
        console.<span class="hljs-built_in">error</span>(<span class="hljs-string">'error: '</span> + <span class="hljs-built_in">error</span>);
        <span class="hljs-comment">// return;</span>
    }
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'stdout: '</span> + stdout);
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'stderr: '</span> + stderr);
});</code></pre>
<h4>备注事项</h4>
<p>Note: Unlike the exec(3) POSIX system call, child_process.exec() does not replace the existing process and uses a shell to execute the command.</p>
<h3 id="articleHeader3">child_process.execFile(file, args[, callback])</h3>
<p>跟<code>.exec()</code>类似，不同点在于，没有创建一个新的shell。至少有两点影响</p>
<ol>
<li><p>比<code>child_process.exec()</code>效率高一些。（实际待测试）</p></li>
<li><p>一些操作，比如I/O重定向，文件glob等不支持。</p></li>
</ol>
<blockquote><p>similar to child_process.exec() except that it spawns the command directly without first spawning a shell.</p></blockquote>
<p><code>file</code>：&lt;String&gt; 可执行文件的名字，或者路径。</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');

child_process.execFile('node', ['--version'], function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});

child_process.execFile('/Users/a/.nvm/versions/node/v6.1.0/bin/node', ['--version'], function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);

child_process.execFile(<span class="hljs-string">'node'</span>, [<span class="hljs-string">'--version'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, stdout, stderr</span>)</span>{
    <span class="hljs-keyword">if</span>(error){
        <span class="hljs-keyword">throw</span> error;
    }
    <span class="hljs-built_in">console</span>.log(stdout);
});

child_process.execFile(<span class="hljs-string">'/Users/a/.nvm/versions/node/v6.1.0/bin/node'</span>, [<span class="hljs-string">'--version'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, stdout, stderr</span>)</span>{
    <span class="hljs-keyword">if</span>(error){
        <span class="hljs-keyword">throw</span> error;
    }
    <span class="hljs-built_in">console</span>.log(stdout);
});</code></pre>
<p>====== 扩展阅读 =======</p>
<p>从node源码来看，<code>exec()</code>、<code>execFile()</code>最大的差别，就在于是否创建了shell。（execFile()内部，options.shell === false），那么，可以手动设置shell。以下代码差不多是等价的。win下的shell设置有所不同，感兴趣的同学可以自己试验下。</p>
<p>备注：execFile()内部最终还是通过spawn()实现的， 如果没有设置 {shell: '/bin/bash'}，那么 spawm() 内部对命令的解析会有所不同，execFile('ls -al .') 会直接报错。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');
var execFile = child_process.execFile;
var exec = child_process.exec;

exec('ls -al .', function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});

execFile('ls -al .', {shell: '/bin/bash'}, function(error, stdout, stderr){
    if(error){
        throw error;
    }
    console.log(stdout);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);
<span class="hljs-keyword">var</span> execFile = child_process.execFile;
<span class="hljs-keyword">var</span> exec = child_process.exec;

exec(<span class="hljs-string">'ls -al .'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, stdout, stderr</span>)</span>{
    <span class="hljs-keyword">if</span>(error){
        <span class="hljs-keyword">throw</span> error;
    }
    <span class="hljs-built_in">console</span>.log(stdout);
});

execFile(<span class="hljs-string">'ls -al .'</span>, {<span class="hljs-attr">shell</span>: <span class="hljs-string">'/bin/bash'</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">error, stdout, stderr</span>)</span>{
    <span class="hljs-keyword">if</span>(error){
        <span class="hljs-keyword">throw</span> error;
    }
    <span class="hljs-built_in">console</span>.log(stdout);
});</code></pre>
<h3 id="articleHeader4">child_process.fork(modulePath, args)</h3>
<p><code>modulePath</code>：子进程运行的模块。</p>
<p>参数说明：（重复的参数说明就不在这里列举）</p>
<ul>
<li><p><code>execPath</code>：&lt;String&gt; 用来创建子进程的可执行文件，默认是<code>/usr/local/bin/node</code>。也就是说，你可通过<code>execPath</code>来指定具体的node可执行文件路径。（比如多个node版本）</p></li>
<li><p><code>execArgv</code>：&lt;Array&gt; 传给可执行文件的字符串参数列表。默认是<code>process.execArgv</code>，跟父进程保持一致。</p></li>
<li><p><code>silent</code>：&lt;Boolean&gt; 默认是<code>false</code>，即子进程的<code>stdio</code>从父进程继承。如果是<code>true</code>，则直接<code>pipe</code>向子进程的<code>child.stdin</code>、<code>child.stdout</code>等。</p></li>
<li><p><code>stdio</code>：&lt;Array&gt; 如果声明了<code>stdio</code>，则会覆盖<code>silent</code>选项的设置。</p></li>
</ul>
<p>例子1：silent</p>
<p><strong>parent.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');

// 例子一：会打印出 output from the child
// 默认情况，silent 为 false，子进程的 stdout 等
// 从父进程继承
child_process.fork('./child.js', {
    silent: false
});

// 例子二：不会打印出 output from the silent child
// silent 为 true，子进程的 stdout 等
// pipe 向父进程
child_process.fork('./silentChild.js', {
    silent: true
});

// 例子三：打印出 output from another silent child
var child = child_process.fork('./anotherSilentChild.js', {
    silent: true
});

child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data){
    console.log(data);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);

<span class="hljs-comment">// 例子一：会打印出 output from the child</span>
<span class="hljs-comment">// 默认情况，silent 为 false，子进程的 stdout 等</span>
<span class="hljs-comment">// 从父进程继承</span>
child_process.fork(<span class="hljs-string">'./child.js'</span>, {
    <span class="hljs-attr">silent</span>: <span class="hljs-literal">false</span>
});

<span class="hljs-comment">// 例子二：不会打印出 output from the silent child</span>
<span class="hljs-comment">// silent 为 true，子进程的 stdout 等</span>
<span class="hljs-comment">// pipe 向父进程</span>
child_process.fork(<span class="hljs-string">'./silentChild.js'</span>, {
    <span class="hljs-attr">silent</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// 例子三：打印出 output from another silent child</span>
<span class="hljs-keyword">var</span> child = child_process.fork(<span class="hljs-string">'./anotherSilentChild.js'</span>, {
    <span class="hljs-attr">silent</span>: <span class="hljs-literal">true</span>
});

child.stdout.setEncoding(<span class="hljs-string">'utf8'</span>);
child.stdout.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(data);
});</code></pre>
<p><strong>child.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('output from the child');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'output from the child'</span>);</code></pre>
<p><strong>silentChild.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('output from the silent child');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'output from the silent child'</span>);</code></pre>
<p><strong>anotherSilentChild.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('output from another silent child');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'output from another silent child'</span>);</code></pre>
<p>例子二：ipc</p>
<p>parent.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');

var child = child_process.fork('./child.js');

child.on('message', function(m){
    console.log('message from child: ' + JSON.stringify(m));
});

child.send({from: 'parent'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);

<span class="hljs-keyword">var</span> child = child_process.fork(<span class="hljs-string">'./child.js'</span>);

child.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'message from child: '</span> + <span class="hljs-built_in">JSON</span>.stringify(m));
});

child.send({<span class="hljs-attr">from</span>: <span class="hljs-string">'parent'</span>});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.on('message', function(m){
    console.log('message from parent: ' + JSON.stringify(m));
});

process.send({from: 'child'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">process.on(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">m</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'message from parent: '</span> + <span class="hljs-built_in">JSON</span>.stringify(m));
});

process.send({<span class="hljs-attr">from</span>: <span class="hljs-string">'child'</span>});</code></pre>
<p>运行结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  ipc git:(master) ✗ node parent.js
message from child: {&quot;from&quot;:&quot;child&quot;}
message from parent: {&quot;from&quot;:&quot;parent&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">➜  ipc git:(master) ✗ node parent.js
message from child: {<span class="hljs-string">"from"</span>:<span class="hljs-string">"child"</span>}
message from parent: {<span class="hljs-string">"from"</span>:<span class="hljs-string">"parent"</span>}</code></pre>
<p>例子三：execArgv</p>
<p>首先，process.execArgv的定义，参考<a href="https://nodejs.org/api/process.html#process_process_execargv" rel="nofollow noreferrer" target="_blank">这里</a>。设置<code>execArgv</code>的目的一般在于，让子进程跟父进程保持相同的执行环境。</p>
<p>比如，父进程指定了<code>--harmony</code>，如果子进程没有指定，那么就要跪了。</p>
<p>parent.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');

console.log('parent execArgv: ' + process.execArgv);

child_process.fork('./child.js', {
    execArgv: process.execArgv
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'parent execArgv: '</span> + process.execArgv);

child_process.fork(<span class="hljs-string">'./child.js'</span>, {
    <span class="hljs-attr">execArgv</span>: process.execArgv
});</code></pre>
<p>child.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('child execArgv: ' + process.execArgv);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'child execArgv: '</span> + process.execArgv);</code></pre>
<p>运行结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  execArgv git:(master) ✗ node --harmony parent.js
parent execArgv: --harmony
child execArgv: --harmony" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">➜  execArgv git:(master) ✗ node --harmony parent.js
parent execArgv: --harmony
child execArgv: --harmony</code></pre>
<p>例子3：execPath（TODO 待举例子）</p>
<h3 id="articleHeader5">child_process.spawn(command, args)</h3>
<p><code>command</code>：要执行的命令</p>
<p>options参数说明：</p>
<ul>
<li><p><code>argv0</code>：[String] 这货比较诡异，在uninx、windows上表现不一样。有需要再深究。</p></li>
<li><p><code>stdio</code>：[Array] | [String] 子进程的stdio。参考<a href="https://nodejs.org/api/child_process.html#child_process_options_stdio" rel="nofollow noreferrer" target="_blank">这里</a></p></li>
<li><p><code>detached</code>：[Boolean] 让子进程独立于父进程之外运行。同样在不同平台上表现有差异，具体参考<a href="https://nodejs.org/api/child_process.html#child_process_options_detached" rel="nofollow noreferrer" target="_blank">这里</a></p></li>
<li><p><code>shell</code>：[Boolean] | [String] 如果是<code>true</code>，在shell里运行程序。默认是<code>false</code>。（很有用，比如 可以通过 /bin/sh -c xxx 来实现 .exec() 这样的效果）</p></li>
</ul>
<p>例子1：基础例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spawn = require('child_process').spawn;
var ls = spawn('ls', ['-al']);

ls.stdout.on('data', function(data){
    console.log('data from child: ' + data);
});


ls.stderr.on('data', function(data){
    console.log('error from child: ' + data);
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
<span class="hljs-keyword">var</span> ls = spawn(<span class="hljs-string">'ls'</span>, [<span class="hljs-string">'-al'</span>]);

ls.stdout.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'data from child: '</span> + data);
});


ls.stderr.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error from child: '</span> + data);
});

ls.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'child exists with code: '</span> + code);
});</code></pre>
<p>例子2：声明stdio</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spawn = require('child_process').spawn;
var ls = spawn('ls', ['-al'], {
    stdio: 'inherit'
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
<span class="hljs-keyword">var</span> ls = spawn(<span class="hljs-string">'ls'</span>, [<span class="hljs-string">'-al'</span>], {
    <span class="hljs-attr">stdio</span>: <span class="hljs-string">'inherit'</span>
});

ls.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'child exists with code: '</span> + code);
});</code></pre>
<p>例子3：声明使用shell</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spawn = require('child_process').spawn;

// 运行 echo &quot;hello nodejs&quot; | wc
var ls = spawn('bash', ['-c', 'echo &quot;hello nodejs&quot; | wc'], {
    stdio: 'inherit',
    shell: true
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;

<span class="hljs-comment">// 运行 echo "hello nodejs" | wc</span>
<span class="hljs-keyword">var</span> ls = spawn(<span class="hljs-string">'bash'</span>, [<span class="hljs-string">'-c'</span>, <span class="hljs-string">'echo "hello nodejs" | wc'</span>], {
    <span class="hljs-attr">stdio</span>: <span class="hljs-string">'inherit'</span>,
    <span class="hljs-attr">shell</span>: <span class="hljs-literal">true</span>
});

ls.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'child exists with code: '</span> + code);
});</code></pre>
<p>例子4：错误处理，包含两种场景，这两种场景有不同的处理方式。</p>
<ul>
<li><p>场景1：命令本身不存在，创建子进程报错。</p></li>
<li><p>场景2：命令存在，但运行过程报错。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spawn = require('child_process').spawn;
var child = spawn('bad_command');

child.on('error', (err) => {
  console.log('Failed to start child process 1.');
});

var child2 = spawn('ls', ['nonexistFile']);

child2.stderr.on('data', function(data){
    console.log('Error msg from process 2: ' + data);
});

child2.on('error', (err) => {
  console.log('Failed to start child process 2.');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
<span class="hljs-keyword">var</span> child = spawn(<span class="hljs-string">'bad_command'</span>);

child.on(<span class="hljs-string">'error'</span>, (err) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Failed to start child process 1.'</span>);
});

<span class="hljs-keyword">var</span> child2 = spawn(<span class="hljs-string">'ls'</span>, [<span class="hljs-string">'nonexistFile'</span>]);

child2.stderr.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error msg from process 2: '</span> + data);
});

child2.on(<span class="hljs-string">'error'</span>, (err) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Failed to start child process 2.'</span>);
});</code></pre>
<p>运行结果如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  spawn git:(master) ✗ node error/error.js
Failed to start child process 1.
Error msg from process 2: ls: nonexistFile: No such file or directory" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">➜  spawn git:(master) ✗ node error/error.js
Failed to start child <span class="hljs-keyword">process</span> <span class="hljs-number">1</span>.
Error msg from <span class="hljs-keyword">process</span> <span class="hljs-number">2</span>: ls: nonexistFile: No such file or directory</code></pre>
<p>例子5：echo "hello nodejs" | grep "nodejs"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// echo &quot;hello nodejs&quot; | grep &quot;nodejs&quot;
var child_process = require('child_process');

var echo = child_process.spawn('echo', ['hello nodejs']);
var grep = child_process.spawn('grep', ['nodejs']);

grep.stdout.setEncoding('utf8');

echo.stdout.on('data', function(data){
    grep.stdin.write(data);
});

echo.on('close', function(code){
    if(code!==0){
        console.log('echo exists with code: ' + code);
    }
    grep.stdin.end();
});

grep.stdout.on('data', function(data){
    console.log('grep: ' + data);
});

grep.on('close', function(code){
    if(code!==0){
        console.log('grep exists with code: ' + code);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// echo "hello nodejs" | grep "nodejs"</span>
<span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);

<span class="hljs-keyword">var</span> echo = child_process.spawn(<span class="hljs-string">'echo'</span>, [<span class="hljs-string">'hello nodejs'</span>]);
<span class="hljs-keyword">var</span> grep = child_process.spawn(<span class="hljs-string">'grep'</span>, [<span class="hljs-string">'nodejs'</span>]);

grep.stdout.setEncoding(<span class="hljs-string">'utf8'</span>);

echo.stdout.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    grep.stdin.write(data);
});

echo.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>)</span>{
    <span class="hljs-keyword">if</span>(code!==<span class="hljs-number">0</span>){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'echo exists with code: '</span> + code);
    }
    grep.stdin.end();
});

grep.stdout.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'grep: '</span> + data);
});

grep.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>)</span>{
    <span class="hljs-keyword">if</span>(code!==<span class="hljs-number">0</span>){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'grep exists with code: '</span> + code);
    }
});</code></pre>
<p>运行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  spawn git:(master) ✗ node pipe/pipe.js
grep: hello nodejs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">➜  spawn git:(master) ✗ node pipe/pipe.js
grep: hello nodejs</code></pre>
<h2 id="articleHeader6">关于<code>options.stdio</code>
</h2>
<p>默认值：['pipe', 'pipe', 'pipe']，这意味着：</p>
<ol>
<li><p>child.stdin、child.stdout 不是<code>undefined</code></p></li>
<li><p>可以通过监听 <code>data</code> 事件，来获取数据。</p></li>
</ol>
<h3 id="articleHeader7">基础例子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spawn = require('child_process').spawn;
var ls = spawn('ls', ['-al']);

ls.stdout.on('data', function(data){
    console.log('data from child: ' + data);
});

ls.on('close', function(code){
    console.log('child exists with code: ' + code);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
<span class="hljs-keyword">var</span> ls = spawn(<span class="hljs-string">'ls'</span>, [<span class="hljs-string">'-al'</span>]);

ls.stdout.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'data from child: '</span> + data);
});

ls.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'child exists with code: '</span> + code);
});</code></pre>
<h3 id="articleHeader8">通过child.stdin.write()写入</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spawn = require('child_process').spawn;
var grep = spawn('grep', ['nodejs']);

setTimeout(function(){
    grep.stdin.write('hello nodejs \n hello javascript');
    grep.stdin.end();
}, 2000);

grep.stdout.on('data', function(data){
    console.log('data from grep: ' + data);
});

grep.on('close', function(code){
    console.log('grep exists with code: ' + code);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
<span class="hljs-keyword">var</span> grep = spawn(<span class="hljs-string">'grep'</span>, [<span class="hljs-string">'nodejs'</span>]);

setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    grep.stdin.write(<span class="hljs-string">'hello nodejs \n hello javascript'</span>);
    grep.stdin.end();
}, <span class="hljs-number">2000</span>);

grep.stdout.on(<span class="hljs-string">'data'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'data from grep: '</span> + data);
});

grep.on(<span class="hljs-string">'close'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'grep exists with code: '</span> + code);
});</code></pre>
<h2 id="articleHeader9">异步 vs 同步</h2>
<p>大部分时候，子进程的创建是异步的。也就是说，它不会阻塞当前的事件循环，这对于性能的提升很有帮助。</p>
<p>当然，有的时候，同步的方式会更方便（阻塞事件循环），比如通过子进程的方式来执行shell脚本时。</p>
<p>node同样提供同步的版本，比如：</p>
<ul>
<li><p>spawnSync()</p></li>
<li><p>execSync()</p></li>
<li><p>execFileSync()</p></li>
</ul>
<h2 id="articleHeader10">关于<code>options.detached</code>
</h2>
<p>由于木有在windows上做测试，于是先贴原文</p>
<blockquote><p>On Windows, setting options.detached to true makes it possible for the child process to continue running after the parent exits. The child will have its own console window. Once enabled for a child process, it cannot be disabled.</p></blockquote>
<p>在非window是平台上的表现</p>
<blockquote><p>On non-Windows platforms, if options.detached is set to true, the child process will be made the leader of a new process group and session. Note that child processes may continue running after the parent exits regardless of whether they are detached or not. See setsid(2) for more information.</p></blockquote>
<h3 id="articleHeader11">默认情况：父进程等待子进程结束。</h3>
<p>子进程。可以看到，有个定时器一直在跑</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var times = 0;
setInterval(function(){
    console.log(++times);
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> times = <span class="hljs-number">0</span>;
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(++times);
}, <span class="hljs-number">1000</span>);</code></pre>
<p>运行下面代码，会发现父进程一直hold着不退出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');
child_process.spawn('node', ['child.js'], {
    // stdio: 'inherit'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>var child_process = <span class="hljs-keyword">require</span>(<span class="hljs-string">'child_process'</span>);
child_process.spawn(<span class="hljs-string">'node'</span>, [<span class="hljs-string">'child.js'</span>], {
    <span class="hljs-regexp">//</span> <span class="hljs-symbol">stdio:</span> <span class="hljs-string">'inherit'</span>
});</code></pre>
<h3 id="articleHeader12">通过child.unref()让父进程退出</h3>
<p>调用<code>child.unref()</code>，将子进程从父进程的事件循环中剔除。于是父进程可以愉快的退出。这里有几个要点</p>
<ol>
<li><p>调用<code>child.unref()</code></p></li>
<li><p>设置<code>detached</code>为<code>true</code></p></li>
<li><p>设置<code>stdio</code>为<code>ignore</code>（这点容易忘）</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');
var child = child_process.spawn('node', ['child.js'], {
    detached: true,
    stdio: 'ignore'  // 备注：如果不置为 ignore，那么 父进程还是不会退出
    // stdio: 'inherit'
});

child.unref();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);
<span class="hljs-keyword">var</span> child = child_process.spawn(<span class="hljs-string">'node'</span>, [<span class="hljs-string">'child.js'</span>], {
    <span class="hljs-attr">detached</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">stdio</span>: <span class="hljs-string">'ignore'</span>  <span class="hljs-comment">// 备注：如果不置为 ignore，那么 父进程还是不会退出</span>
    <span class="hljs-comment">// stdio: 'inherit'</span>
});

child.unref();</code></pre>
<h3 id="articleHeader13">将<code>stdio</code>重定向到文件</h3>
<p>除了直接将stdio设置为<code>ignore</code>，还可以将它重定向到本地的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child_process = require('child_process');
var fs = require('fs');

var out = fs.openSync('./out.log', 'a');
var err = fs.openSync('./err.log', 'a');

var child = child_process.spawn('node', ['child.js'], {
    detached: true,
    stdio: ['ignore', out, err]
});

child.unref();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> child_process = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">var</span> out = fs.openSync(<span class="hljs-string">'./out.log'</span>, <span class="hljs-string">'a'</span>);
<span class="hljs-keyword">var</span> err = fs.openSync(<span class="hljs-string">'./err.log'</span>, <span class="hljs-string">'a'</span>);

<span class="hljs-keyword">var</span> child = child_process.spawn(<span class="hljs-string">'node'</span>, [<span class="hljs-string">'child.js'</span>], {
    <span class="hljs-attr">detached</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">stdio</span>: [<span class="hljs-string">'ignore'</span>, out, err]
});

child.unref();</code></pre>
<h2 id="articleHeader14">exec()与execFile()之间的区别</h2>
<p>首先，exec() 内部调用 execFile() 来实现，而 execFile() 内部调用 spawn() 来实现。</p>
<blockquote><p>exec() -&gt; execFile() -&gt; spawn()</p></blockquote>
<p>其次，execFile() 内部默认将 options.shell 设置为false，exec() 默认不是false。</p>
<h2 id="articleHeader15">Class: ChildProcess</h2>
<ul>
<li><p>通过<code>child_process.spawn()</code>等创建，一般不直接用构造函数创建。</p></li>
<li><p>继承了<code>EventEmitters</code>，所以有<code>.on()</code>等方法。</p></li>
</ul>
<h3 id="articleHeader16">各种事件</h3>
<h3 id="articleHeader17">close</h3>
<p>当stdio流关闭时触发。这个事件跟<code>exit</code>不同，因为多个进程可以共享同个stdio流。   <br>参数：code（退出码，如果子进程是自己退出的话），signal（结束子进程的信号）<br>问题：code一定是有的吗？（从对code的注解来看好像不是）比如用<code>kill</code>杀死子进程，那么，code是？</p>
<h3 id="articleHeader18">exit</h3>
<p>参数：code、signal，如果子进程是自己退出的，那么<code>code</code>就是退出码，否则为null；如果子进程是通过信号结束的，那么，<code>signal</code>就是结束进程的信号，否则为null。这两者中，一者肯定不为null。<br>注意事项：<code>exit</code>事件触发时，子进程的stdio stream可能还打开着。（场景？）此外，nodejs监听了SIGINT和SIGTERM信号，也就是说，nodejs收到这两个信号时，不会立刻退出，而是先做一些清理的工作，然后重新抛出这两个信号。（目测此时js可以做清理工作了，比如关闭数据库等。）</p>
<p>SIGINT：interrupt，程序终止信号，通常在用户按下CTRL+C时发出，用来通知前台进程终止进程。<br>SIGTERM：terminate，程序结束信号，该信号可以被阻塞和处理，通常用来要求程序自己正常退出。shell命令kill缺省产生这个信号。如果信号终止不了，我们才会尝试SIGKILL（强制终止）。</p>
<blockquote><p>Also, note that Node.js establishes signal handlers for SIGINT and SIGTERM and Node.js processes will not terminate immediately due to receipt of those signals. Rather, Node.js will perform a sequence of cleanup actions and then will re-raise the handled signal.</p></blockquote>
<h3 id="articleHeader19">error</h3>
<p>当发生下列事情时，error就会被触发。当error触发时，exit可能触发，也可能不触发。（内心是崩溃的）</p>
<ul>
<li><p>无法创建子进程。</p></li>
<li><p>进程无法kill。（TODO 举例子）</p></li>
<li><p>向子进程发送消息失败。（TODO  举例子）</p></li>
</ul>
<h3 id="articleHeader20">message</h3>
<p>当采用<code>process.send()</code>来发送消息时触发。<br>参数：<code>message</code>，为json对象，或者primitive value；<code>sendHandle</code>，net.Socket对象，或者net.Server对象（熟悉cluster的同学应该对这个不陌生）</p>
<p><strong>.connected</strong>：当调用<code>.disconnected()</code>时，设为false。代表是否能够从子进程接收消息，或者对子进程发送消息。</p>
<p><strong>.disconnect()</strong>：关闭父进程、子进程之间的IPC通道。当这个方法被调用时，<code>disconnect</code>事件就会触发。如果子进程是node实例（通过child_process.fork()创建），那么在子进程内部也可以主动调用<code>process.disconnect()</code>来终止IPC通道。参考<a href="https://nodejs.org/api/process.html#process_process_disconnect" rel="nofollow noreferrer" target="_blank">process.disconnect</a>。</p>
<h2 id="articleHeader21">非重要的备忘点</h2>
<h3 id="articleHeader22">windows平台上的<code>cmd</code>、<code>bat</code>
</h3>
<blockquote><p>The importance of the distinction between child_process.exec() and child_process.execFile() can vary based on platform. On Unix-type operating systems (Unix, Linux, OSX) child_process.execFile() can be more efficient because it does not spawn a shell. On Windows, however, .bat and .cmd files are not executable on their own without a terminal, and therefore cannot be launched using child_process.execFile(). When running on Windows, .bat and .cmd files can be invoked using child_process.spawn() with the shell option set, with child_process.exec(), or by spawning cmd.exe and passing the .bat or .cmd file as an argument (which is what the shell option and child_process.exec() do).</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// On Windows Only ...
const spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

bat.stdout.on('data', (data) => {
  console.log(data);
});

bat.stderr.on('data', (data) => {
  console.log(data);
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

// OR...
const exec = require('child_process').exec;
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// On Windows Only ...</span>
<span class="hljs-keyword">const</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).spawn;
<span class="hljs-keyword">const</span> bat = spawn(<span class="hljs-string">'cmd.exe'</span>, [<span class="hljs-string">'/c'</span>, <span class="hljs-string">'my.bat'</span>]);

bat.stdout.on(<span class="hljs-string">'data'</span>, (data) =&gt; {
  <span class="hljs-built_in">console</span>.log(data);
});

bat.stderr.on(<span class="hljs-string">'data'</span>, (data) =&gt; {
  <span class="hljs-built_in">console</span>.log(data);
});

bat.on(<span class="hljs-string">'exit'</span>, (code) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Child exited with code <span class="hljs-subst">${code}</span>`</span>);
});

<span class="hljs-comment">// OR...</span>
<span class="hljs-keyword">const</span> exec = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).exec;
exec(<span class="hljs-string">'my.bat'</span>, (err, stdout, stderr) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-built_in">console</span>.error(err);
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-built_in">console</span>.log(stdout);
});</code></pre>
<h3 id="articleHeader23">进程标题</h3>
<p>Note: Certain platforms (OS X, Linux) will use the value of argv[0] for the process title while others (Windows, SunOS) will use command.</p>
<p>Note: Node.js currently overwrites argv[0] with process.execPath on startup, so process.argv[0] in a Node.js child process will not match the argv0 parameter passed to spawn from the parent, retrieve it with the process.argv0 property instead.</p>
<h3 id="articleHeader24">代码运行次序的问题</h3>
<p><strong>p.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);

console.log('1');

n.on('message', (m) => {
  console.log('PARENT got message:', m);
});

console.log('2');

n.send({ hello: 'world' });

console.log('3');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> cp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>);
<span class="hljs-keyword">const</span> n = cp.fork(<span class="hljs-string">`<span class="hljs-subst">${__dirname}</span>/sub.js`</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1'</span>);

n.on(<span class="hljs-string">'message'</span>, (m) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'PARENT got message:'</span>, m);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2'</span>);

n.send({ <span class="hljs-attr">hello</span>: <span class="hljs-string">'world'</span> });

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'3'</span>);</code></pre>
<p><strong>sub.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('4');
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});

process.send({ foo: 'bar' });
console.log('5');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'4'</span>);
process.on(<span class="hljs-string">'message'</span>, (m) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'CHILD got message:'</span>, m);
});

process.send({ <span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span> });
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'5'</span>);</code></pre>
<p>运行<code>node p.js</code>，打印出来的内容如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="➜  ch node p.js       
1
2
3
4
5
PARENT got message: { foo: 'bar' }
CHILD got message: { hello: 'world' }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="powershell hljs"><code class="powershell">➜  ch node p.js       
<span class="hljs-number">1</span>
<span class="hljs-number">2</span>
<span class="hljs-number">3</span>
<span class="hljs-number">4</span>
<span class="hljs-number">5</span>
PARENT got message: { foo: <span class="hljs-string">'bar'</span> }
CHILD got message: { hello: <span class="hljs-string">'world'</span> }</code></pre>
<p>再来个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// p2.js
var fork = require('child_process').fork;

console.log('p: 1');

fork('./c2.js');

console.log('p: 2');

// 从测试结果来看，同样是70ms，有的时候，定时器回调比子进程先执行，有的时候比子进程慢执行。
const t = 70;
setTimeout(function(){
    console.log('p: 3 in %s', t);
}, t);


// c2.js
console.log('c: 1');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// p2.js</span>
<span class="hljs-keyword">var</span> fork = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).fork;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p: 1'</span>);

fork(<span class="hljs-string">'./c2.js'</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p: 2'</span>);

<span class="hljs-comment">// 从测试结果来看，同样是70ms，有的时候，定时器回调比子进程先执行，有的时候比子进程慢执行。</span>
<span class="hljs-keyword">const</span> t = <span class="hljs-number">70</span>;
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'p: 3 in %s'</span>, t);
}, t);


<span class="hljs-comment">// c2.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'c: 1'</span>);</code></pre>
<h3 id="articleHeader25">关于NODE_CHANNEL_FD</h3>
<p>child_process.fork()时，如果指定了execPath，那么父、子进程间通过NODE_CHANNEL_FD 进行通信。</p>
<blockquote><p>Node.js processes launched with a custom execPath will communicate with the parent process using the file descriptor (fd) identified using the environment variable NODE_CHANNEL_FD on the child process. The input and output on this fd is expected to be line delimited JSON objects.</p></blockquote>
<h2 id="articleHeader26">写在后面</h2>
<p>内容较多，如有错漏及建议请指出。</p>
<h2 id="articleHeader27">相关链接</h2>
<p>官方文档：<a href="https://nodejs.org/api/child_process.html" rel="nofollow noreferrer" target="_blank">https://nodejs.org/api/child_...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nodejs进阶：如何玩转子进程（child_process）

## 原文链接
[https://segmentfault.com/a/1190000007735211](https://segmentfault.com/a/1190000007735211)

