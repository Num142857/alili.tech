---
title: VS Code插件开发介绍
hidden: true
categories: [reprint]
slug: 5229f046
date: 2018-11-05 02:30:10
---

{{< raw >}}
<ul><li><h3 id="articleHeader0">&#x524D;&#x8A00;</h3></li></ul><p>&#x524D;&#x6BB5;&#x65F6;&#x95F4;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;&#x547D;&#x4EE4;&#x884C;&#x7684;&#x6548;&#x7387;&#x5DE5;&#x5177;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x52A8;&#x751F;&#x6210;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#x3002;&#x81EA;&#x5DF1;&#x7528;&#x8D77;&#x6765;&#x8FD8;&#x89C9;&#x5F97;&#x633A;&#x597D;&#xFF0C;&#x4F46;&#x5728;&#x7EC4;&#x5185;&#x6848;&#x4F8B;&#x51E0;&#x6B21;&#x540E;&#x5927;&#x5BB6;&#x90FD;&#x4E0D;&#x613F;&#x610F;&#x7528;&#xFF0C;&#x7A76;&#x5176;&#x539F;&#x56E0;&#x8FD8;&#x662F;&#x547D;&#x4EE4;&#x884C;&#x5DE5;&#x5177;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x95E8;&#x69DB;&#x6709;&#x70B9;&#x9AD8;&#xFF0C;&#x4E0D;&#x65B9;&#x4FBF;&#x3002;&#x7531;&#x4E8E;&#x7EC4;&#x5185;&#x5DF2;&#x7ECF;&#x7EDF;&#x4E00;&#x4F7F;&#x7528;VS Code&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E86;&#xFF0C;&#x4E8E;&#x662F;&#x51B3;&#x5B9A;&#x7814;&#x7A76;&#x4E0B;VS Code&#x7684;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#xFF0C;&#x8BA9;&#x6548;&#x7387;&#x5DE5;&#x5177;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x7528;&#x8D77;&#x6765;&#x3002;</p><ul><li><h3 id="articleHeader1">&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</h3></li></ul><p>&#x4E3A;&#x4E86;&#x964D;&#x4F4E;&#x5F00;&#x53D1;&#x95E8;&#x69DB;&#xFF0C;&#x5FAE;&#x8F6F;&#x505A;&#x4E86;&#x4E00;&#x4E2A;<code>Yeoman</code>&#x4EE3;&#x7801;&#x751F;&#x6210;&#x547D;&#x4EE4;&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x751F;&#x6210;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x9700;&#x8981;&#x7684;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B89;&#x88C5;
npm install -g yo generator-code

// &#x4F7F;&#x7528;
yo code" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code class="sh"><span class="hljs-comment">// &#x5B89;&#x88C5;</span>
npm install -g yo generator-<span class="hljs-keyword">code</span>

<span class="hljs-comment">// &#x4F7F;&#x7528;</span>
yo <span class="hljs-keyword">code</span></code></pre><p>&#x8FD0;&#x884C;&#x5B8C;&#x4EE5;&#x4E0A;&#x547D;&#x4EE4;&#x540E;&#x4F1A;&#x51FA;&#x73B0;&#x4E0B;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x754C;&#x9762;&#xFF0C;&#x586B;&#x5165;&#x9700;&#x8981;&#x7684;&#x4FE1;&#x606F;&#x5373;&#x53EF;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhZcK?w=589&amp;h=323" src="https://static.alili.tech/img/bVbhZcK?w=589&amp;h=323" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li><h3 id="articleHeader2">&#x8FD0;&#x884C;&#x793A;&#x4F8B;&#x4EE3;&#x7801;</h3></li></ul><p>&#x4EE3;&#x7801;&#x751F;&#x6210;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x6309;<code>F5</code>&#x5F00;&#x59CB;&#x8C03;&#x8BD5;&#x63D2;&#x4EF6;&#xFF0C;&#x6B64;&#x65F6;VS Code&#x4F1A;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5E76;&#x8FDB;&#x5165;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#xFF0C;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x63D2;&#x4EF6;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x65B0;&#x7684;&#x5B9E;&#x4F8B;&#x4E2D;&#x4F7F;&#x7528;&#x3002;&#x6A21;&#x7248;&#x4EE3;&#x7801;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;<code>Hello World</code>&#x7684;&#x547D;&#x4EE4;&#xFF0C;&#x6309;&#x4E0B;&#x21E7;&#x2318;P&#x8C03;&#x51FA;&#x547D;&#x4EE4;&#x8F93;&#x5165;&#x7A97;&#x53E3;&#xFF0C;&#x7136;&#x540E;&#x8F93;&#x5165;&apos;Hello World&apos;&#x8FD0;&#x884C;&#x547D;&#x4EE4;&#x3002;&#x5982;&#x679C;&#x627E;&#x4E0D;&#x5230;&#x547D;&#x4EE4;&#xFF0C;&#x91CD;&#x542F;&#x4E0B;VS Code&#x518D;&#x91CD;&#x65B0;&#x8FD0;&#x884C;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhZi3?w=1316&amp;h=845" src="https://static.alili.tech/img/bVbhZi3?w=1316&amp;h=845" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li><h3 id="articleHeader3">&#x4FEE;&#x6539;&#x4EE3;&#x7801;</h3></li></ul><p>&#x63D2;&#x4EF6;&#x7684;&#x5165;&#x53E3;&#x4EE3;&#x7801;&#x5728;<code>extension.js</code>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4FEE;&#x6539;<code>avtivate</code>&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(&apos;Congratulations, your extension &quot;my-first-extension&quot; is now active!&apos;);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(&apos;extension.sayHello&apos;, () =&gt; {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage(&apos;Hello World!&apos;);
    });

    context.subscriptions.push(disposable);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">activate</span>(<span class="hljs-params">context</span>) </span>{

    <span class="hljs-comment">// Use the console to output diagnostic information (console.log) and errors (console.error)</span>
    <span class="hljs-comment">// This line of code will only be executed once when your extension is activated</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Congratulations, your extension &quot;my-first-extension&quot; is now active!&apos;</span>);

    <span class="hljs-comment">// The command has been defined in the package.json file</span>
    <span class="hljs-comment">// Now provide the implementation of the command with  registerCommand</span>
    <span class="hljs-comment">// The commandId parameter must match the command field in package.json</span>
    <span class="hljs-keyword">let</span> disposable = vscode.commands.registerCommand(<span class="hljs-string">&apos;extension.sayHello&apos;</span>, () =&gt; {
        <span class="hljs-comment">// The code you place here will be executed every time your command is executed</span>

        <span class="hljs-comment">// Display a message box to the user</span>
        vscode.window.showInformationMessage(<span class="hljs-string">&apos;Hello World!&apos;</span>);
    });

    context.subscriptions.push(disposable);
}</code></pre><p>&#x6211;&#x63D2;&#x4EF6;&#x7684;&#x529F;&#x80FD;&#x662F;&#x7528;&#x6237;&#x901A;&#x8FC7;&#x53F3;&#x952E;&#x70B9;&#x51FB;&#x5BFC;&#x822A;&#x680F;&#xFF0C;&#x83B7;&#x53D6;&#x9009;&#x4E2D;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#xFF0C;&#x7136;&#x540E;&#x63D0;&#x793A;&#x7528;&#x6237;&#x8F93;&#x5165;&#x65B0;&#x7EC4;&#x4EF6;&#x7684;&#x540D;&#x5B57;&#xFF0C;&#x7136;&#x540E;&#x81EA;&#x52A8;&#x5E2E;&#x7528;&#x6237;&#x751F;&#x6210;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhZkG?w=408&amp;h=278" src="https://static.alili.tech/img/bVbhZkG?w=408&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbhZkZ?w=1980&amp;h=462" src="https://static.alili.tech/img/bVbhZkZ?w=1980&amp;h=462" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5F00;&#x53D1;&#x7684;&#x5173;&#x952E;&#x70B9;&#x662F;&#x5982;&#x4F55;&#x83B7;&#x53D6;&#x6587;&#x4EF6;&#x5939;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x548C;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x540D;&#x3002;&#x5C24;&#x5176;&#x662F;&#x83B7;&#x53D6;&#x8DEF;&#x5F84;&#xFF0C;&#x627E;&#x4E86;&#x5F88;&#x4E45;&#x624D;&#x627E;&#x5230;&#xFF0C;&#x5B98;&#x7F51;&#x7684;&#x6587;&#x6863;&#x53EA;&#x5B57;&#x672A;&#x63D0;&#x3002;&#x5148;&#x770B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function activate(context) {
    console.log(&apos;Congratulations, your extension &quot;react-template&quot; is now active!&apos;);

    // &#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;createFunctionalComponent&#x7684;&#x547D;&#x4EE4;
    const fc = vscode.commands.registerCommand(&apos;extension.createFunctionalComponent&apos;, function (param) {
        // &#x6587;&#x4EF6;&#x5939;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;
        const folderPath = param.fsPath;

        const options = {
            prompt: &quot;&#x8BF7;&#x8F93;&#x5165;&#x7EC4;&#x4EF6;&#x540D;: &quot;,
            placeHolder: &quot;&#x7EC4;&#x4EF6;&#x540D;&quot;
        }
        
        // &#x8C03;&#x51FA;&#x7CFB;&#x7EDF;&#x8F93;&#x5165;&#x6846;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x540D;
        vscode.window.showInputBox(options).then(value =&gt; {
            if (!value) return;

            const componentName = value;
            const fullPath = `${folderPath}/${componentName}`;

            // &#x751F;&#x6210;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x662F;&#x672C;&#x6587;&#x7684;&#x91CD;&#x70B9;&#xFF0C;&#x5148;&#x5FFD;&#x7565;
            generateComponent(componentName, fullPath, ComponentType.FUNCTIONAL_COMP);
        });
    });
    
    context.subscriptions.push(pc);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">activate</span>(<span class="hljs-params">context</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Congratulations, your extension &quot;react-template&quot; is now active!&apos;</span>);

    <span class="hljs-comment">// &#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;createFunctionalComponent&#x7684;&#x547D;&#x4EE4;</span>
    <span class="hljs-keyword">const</span> fc = vscode.commands.registerCommand(<span class="hljs-string">&apos;extension.createFunctionalComponent&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">param</span>) </span>{
        <span class="hljs-comment">// &#x6587;&#x4EF6;&#x5939;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;</span>
        <span class="hljs-keyword">const</span> folderPath = param.fsPath;

        <span class="hljs-keyword">const</span> options = {
            <span class="hljs-attr">prompt</span>: <span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x7EC4;&#x4EF6;&#x540D;: &quot;</span>,
            <span class="hljs-attr">placeHolder</span>: <span class="hljs-string">&quot;&#x7EC4;&#x4EF6;&#x540D;&quot;</span>
        }
        
        <span class="hljs-comment">// &#x8C03;&#x51FA;&#x7CFB;&#x7EDF;&#x8F93;&#x5165;&#x6846;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x540D;</span>
        vscode.window.showInputBox(options).then(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (!value) <span class="hljs-keyword">return</span>;

            <span class="hljs-keyword">const</span> componentName = value;
            <span class="hljs-keyword">const</span> fullPath = <span class="hljs-string">`<span class="hljs-subst">${folderPath}</span>/<span class="hljs-subst">${componentName}</span>`</span>;

            <span class="hljs-comment">// &#x751F;&#x6210;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x662F;&#x672C;&#x6587;&#x7684;&#x91CD;&#x70B9;&#xFF0C;&#x5148;&#x5FFD;&#x7565;</span>
            generateComponent(componentName, fullPath, ComponentType.FUNCTIONAL_COMP);
        });
    });
    
    context.subscriptions.push(pc);
}</code></pre><p>&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x4E0D;&#x505A;&#x8BB2;&#x89E3;&#x4E86;&#x3002;&#x4E3A;&#x4E86;&#x663E;&#x793A;<code>Create Functional Component</code>&#x8FD9;&#x4E2A;&#x83DC;&#x5355;&#x9879;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4FEE;&#x6539;<code>package.json</code>&#x6587;&#x4EF6;&#x7684;<code>contributes</code>&#x5B57;&#x6BB5;&#x3002;<code>activationEvents</code>&#x5B57;&#x6BB5;&#x4E5F;&#x8981;&#x76F8;&#x5E94;&#x7684;&#x6539;&#x4E0B;&#x3002;&#x540C;&#x65F6;&#x4E3A;&#x4E86;&#x7ED9;&#x63D2;&#x4EF6;&#x914D;&#x4E00;&#x4E2A;&#x56FE;&#x6807;&#xFF0C;&#x8981;&#x52A0;&#x4E00;&#x4E2A;icon&#x5B57;&#x6BB5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;icon&quot;: &quot;images/icon.png&quot;,
    &quot;activationEvents&quot;: [
        &quot;onCommand:extension.createFunctionalComponent&quot;
    ],
    &quot;contributes&quot;: {
        &quot;commands&quot;: [
            {
                &quot;command&quot;: &quot;extension.createFunctionalComponent&quot;,
                &quot;title&quot;: &quot;Create Functional Component&quot;
            }
        ],
        &quot;menus&quot;: {
            &quot;explorer/context&quot;: [
                {
                    &quot;command&quot;: &quot;extension.createFunctionalComponent&quot;,
                    &quot;group&quot;: &quot;1_modification&quot;
                }
            ]
        }
    }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-string">&quot;icon&quot;</span>: <span class="hljs-string">&quot;images/icon.png&quot;</span>,
    <span class="hljs-string">&quot;activationEvents&quot;</span>: [
        <span class="hljs-string">&quot;onCommand:extension.createFunctionalComponent&quot;</span>
    ],
    <span class="hljs-string">&quot;contributes&quot;</span>: {
        <span class="hljs-string">&quot;commands&quot;</span>: [
            {
                <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;extension.createFunctionalComponent&quot;</span>,
                <span class="hljs-string">&quot;title&quot;</span>: <span class="hljs-string">&quot;Create Functional Component&quot;</span>
            }
        ],
        <span class="hljs-string">&quot;menus&quot;</span>: {
            <span class="hljs-string">&quot;explorer/context&quot;</span>: [
                {
                    <span class="hljs-string">&quot;command&quot;</span>: <span class="hljs-string">&quot;extension.createFunctionalComponent&quot;</span>,
                    <span class="hljs-string">&quot;group&quot;</span>: <span class="hljs-string">&quot;1_modification&quot;</span>
                }
            ]
        }
    },</code></pre><p>&#x8BE6;&#x7EC6;&#x7684;<code>contributes</code>&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x770B;<a href="https://code.visualstudio.com/docs/extensionAPI/extension-points" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x3002;&#x914D;&#x7F6E;&#x597D;<code>menus</code>&#x4E4B;&#x540E;&#xFF0C;<code>registerCommand</code>&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x5C31;&#x80FD;&#x53D6;&#x5230;&#x6587;&#x4EF6;&#x6216;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x4E86;&#x3002;</p><ul><li><h3 id="articleHeader4">&#x53D1;&#x5E03;&#x63D2;&#x4EF6;</h3></li></ul><p>&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x5B8C;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x53D1;&#x5E03;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;<code>vsce</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vsce" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code class="sh" style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> -g vsce</code></pre><p>&#x5B89;&#x88C5;&#x5B8C;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x53BB;<a href="https://azure.microsoft.com/zh-cn/services/devops/" rel="nofollow noreferrer" target="_blank">Azure DevOps</a>&#x6CE8;&#x518C;&#x5E76;&#x751F;&#x6210;&#x4E00;&#x4E2A;access token&#x3002;&#x8BE6;&#x7EC6;&#x7684;&#x6D41;&#x7A0B;&#x53EF;&#x4EE5;&#x770B;<a href="https://code.visualstudio.com/docs/extensions/publish-extension" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x3002;&#x751F;&#x6210;toke&#x7684;&#x65F6;&#x5019;&#x6709;&#x4E24;&#x4E2A;&#x5730;&#x65B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhZnR?w=586&amp;h=390" src="https://static.alili.tech/img/bVbhZnR?w=586&amp;h=390" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>token&#x751F;&#x6210;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x767B;&#x5F55;&#x548C;&#x53D1;&#x5E03;&#x4E86;&#x3002;&#x5982;&#x679C;&#x6709;&#x4EFB;&#x4F55;&#x7684;&#x4FEE;&#x6539;&#xFF0C;&#x8981;&#x6CE8;&#x610F;&#x4FEE;&#x6539;<code>package.json</code>&#x91CC;&#x9762;&#x7248;&#x672C;&#x53F7;&#x624D;&#x80FD;&#x53D1;&#x5E03;&#x6210;&#x529F;&#x3002;&#x53D1;&#x5E03;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x5F88;&#x5FEB;&#x5C31;&#x80FD;&#x5728;VS Code&#x7684;&#x63D2;&#x4EF6;&#x5E02;&#x573A;&#x641C;&#x5230;&#x4E86;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhZou?w=1264&amp;h=370" src="https://static.alili.tech/img/bVbhZou?w=1264&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li><h3 id="articleHeader5">&#x603B;&#x7ED3;</h3></li></ul><p>&#x672C;&#x6587;&#x4ECB;&#x7ECD;&#x4E86;VS Code&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x7684;&#x57FA;&#x672C;&#x6D41;&#x7A0B;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x63D2;&#x4EF6;&#x3002;&#x672C;&#x6587;&#x53EA;&#x6D89;&#x53CA;&#x5230;VS Code&#x63D2;&#x4EF6;&#x7CFB;&#x7EDF;&#x7684;&#x51B0;&#x5C71;&#x4E00;&#x89D2;&#xFF0C;&#x66F4;&#x591A;&#x7684;&#x9AD8;&#x7EA7;&#x529F;&#x80FD;&#x4EE5;&#x540E;&#x63A5;&#x89E6;&#x5230;&#x7684;&#x65F6;&#x5019;&#x518D;&#x4F5C;&#x4ECB;&#x7ECD;&#x3002;&#x5982;&#x679C;&#x60F3;&#x518D;&#x4F5C;&#x8FDB;&#x4E00;&#x6B65;&#x7684;&#x4E86;&#x89E3;&#xFF0C;&#x53EF;&#x4EE5;&#x4ECE;<a href="https://code.visualstudio.com/docs/extensions/example-hello-world" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x5F00;&#x59CB;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VS Code插件开发介绍

## 原文链接
[https://segmentfault.com/a/1190000016641617](https://segmentfault.com/a/1190000016641617)

