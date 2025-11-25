---
title: 'node.js与比特币' 
date: 2018-12-08 2:30:30
hidden: true
slug: 7zxx6cdr24t
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">BTC中的utxo模型</h2>
<p>BTC中引入了许多创新的概念与技术，<strong>区块链、PoW共识、RSA加密、萌芽阶段的智能合约</strong>等名词是经常被圈内人所提及，诚然这些创新的实现使得BTC变成了一种有可靠性和安全性保证的封闭生态系统，但是在这个BTC生态中如果没有搭配区块链模式的转账模块，那么货币的流通属性也就无从谈起了。若要实现转账交易模块， “是否采用传统的账户模型实现交易；如何在区块链上存储交易信息，如何实现信息压缩；如何验证交易信息；系统的最大交易并发量”等问题确实值得思考。</p>
<p>BTC一一解决了这些，它放弃了传统的基于账户的交易模型，而是采用基于区块链存储的utxo（unspent transaction output）模型。笔者尝试分析了为什么不使用传统的账户模型：</p>
<ol>
<li>BTC的存储单元为区块链，区块链的数据结构本质上是单向链表，它并不是传统的关系型数据库，无法新建账户表</li>
<li>存储压力。如果采用传统的方式，则账户表会随着时间的推移不停地增大，为后续的表的分片与备份造成很大困难</li>
<li>易造成隐私泄露。账户表的信息会直观的暴露余额等敏感信息</li>
</ol>
<p>utxo模型则很有技巧的避免了这些，在utxo模型下实现的每一笔交易，都不需要显式的提供转账地址和接收地址（utxo中没有账户，也不需要提供地址），只需提供这比交易的 <strong>交易输入</strong> 和 <strong>交易输出</strong> 即可，而交易输入与交易输出又是什么？</p>
<p>交易输入指向一笔交易输出，而且 “这笔交易输出是可以供转账者消费的，因此这笔交易输出也被称作utxo（未花费交易输出）”，它包括“某一笔交易、指向这笔交易的某个可用交易输出的索引值和一个解锁脚本”。这个解锁脚本用来验证某笔可用的消费输出是否可以被提供解锁脚本的人所使用。</p>
<p>交易输出则是存储BTC“余额”的一个数据结构，它广义上包括两部分：BTC的数量和一个锁定脚本。 BTC的数量可以理解为余额，表示这笔交易产生的结果；而锁定脚本则是用某种算法锁定这个BTC余额，直到某人可以提供解锁该脚本的数据钥匙，这比数额BTC才会被这个人所消费。</p>
<p>从这个角度看，一笔交易会包含若干个交易输入，同时产生若干个交易输出。这些交易输入都会指向之前某笔交易的未被消费输出（utxo），并提供各自的解锁脚本以证明这些utxo里的BTC是属于转账方；同时将转账产生的所有交易输出用对应方的公钥进行加密（此处是为了更好的理解才解释为公钥加密，实质上是公钥哈希，即btc地址进行逆向base58编码的一段字符串），锁定这几笔交易输出，等待交易输入中的解锁脚本解锁。</p>
<p>所以，BTC没有账户的概念，所有的“余额”都在区块链上，不过这些余额都已经被加密了，只有提供私钥和签名的人才可以使用对应的utxo的余额，因此这就是为什么BTC持有者必须保存好自己的私钥的原因。</p>
<h2 id="articleHeader1">UTXO的node.js实现</h2>
<h3 id="articleHeader2">交易输入</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Input {
    private txId: string;
    private outputIndex: number;
    private unlockScript: string;

    public get $txId(): string {
        return this.txId;
    }

    public set $txId(value: string) {
        this.txId = value;
    }
    
    public get $outputIndex(): number {
        return this.outputIndex;
    }

    public set $outputIndex(value: number) {
        this.outputIndex = value;
    }

    public get $unlockScript(): string {
        return this.unlockScript;
    }

    public set $unlockScript(value: string) {
        this.unlockScript = value;
    }
    
    constructor(txId: string, index: number, unlockScript: string){
        this.txId = txId;
        this.outputIndex = index;
        this.unlockScript = unlockScript;
    }

    // 反序列化，进行类型转换
    public static createInputsFromUnserialize(objs: Array<Input>){
        let ins = [];
        objs.forEach((obj)=>{
            ins.push(new Input(obj.txId,obj.outputIndex,obj.unlockScript));
        });
        return ins;
    }
    
    canUnlock (privateKey: string): boolean{
        if(privateKey == this.unlockScript){
            return true;
        }else{
            return false;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Input {
    <span class="hljs-keyword">private</span> txId: <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">private</span> outputIndex: <span class="hljs-built_in">number</span>;
    <span class="hljs-keyword">private</span> unlockScript: <span class="hljs-built_in">string</span>;

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $txId(): <span class="hljs-built_in">string</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.txId;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $txId(value: <span class="hljs-built_in">string</span>) {
        <span class="hljs-keyword">this</span>.txId = value;
    }
    
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $outputIndex(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.outputIndex;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $outputIndex(value: <span class="hljs-built_in">number</span>) {
        <span class="hljs-keyword">this</span>.outputIndex = value;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $unlockScript(): <span class="hljs-built_in">string</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.unlockScript;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $unlockScript(value: <span class="hljs-built_in">string</span>) {
        <span class="hljs-keyword">this</span>.unlockScript = value;
    }
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">txId: <span class="hljs-built_in">string</span>, index: <span class="hljs-built_in">number</span>, unlockScript: <span class="hljs-built_in">string</span></span>){
        <span class="hljs-keyword">this</span>.txId = txId;
        <span class="hljs-keyword">this</span>.outputIndex = index;
        <span class="hljs-keyword">this</span>.unlockScript = unlockScript;
    }

    <span class="hljs-comment">// 反序列化，进行类型转换</span>
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> createInputsFromUnserialize(objs: <span class="hljs-built_in">Array</span>&lt;Input&gt;){
        <span class="hljs-keyword">let</span> ins = [];
        objs.forEach(<span class="hljs-function">(<span class="hljs-params">obj</span>)=&gt;</span>{
            ins.push(<span class="hljs-keyword">new</span> Input(obj.txId,obj.outputIndex,obj.unlockScript));
        });
        <span class="hljs-keyword">return</span> ins;
    }
    
    canUnlock (privateKey: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">boolean</span>{
        <span class="hljs-keyword">if</span>(privateKey == <span class="hljs-keyword">this</span>.unlockScript){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
}</code></pre>
<p>私有属性txId标识 “某个可用的utxo所属的交易”，是一串sha256编码的字符串；<br>outputIndex表示 “这个可用的utxo在对应交易的序号值”；<br>unlockScript则是解锁脚本，此处并未完全按照BTC的原型去实现，而是简单的验证使用者的私钥来实现鉴权，原理上仍遵从BTC的思想。</p>
<h3 id="articleHeader3">交易输出</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as rsaConfig from '../../rsa.json';
export class Output {
    private value: number;
    // 锁定脚本，需要使用UTXO归属者用私钥进行签名通过
    // 当解锁UTXO成功后，此UTXO变为下一个交易的交易输入，同时使用接收方的地址（公钥）锁定本次交易的交易输出，
    // 等待接收方使用私钥签名使用该UTXO
    // 因此，btc没有账户的概念，所有的“钱”由自己的公钥所加密保存，只有用自己的私钥才能使用这些钱（即解锁了UTXO的解锁脚本）
    private lockScript: string;

    // 该属性仅仅在交易时使用，设置属性
    private txId: string;

    // 该属性仅仅在交易时使用，设置属性
    private index: number;

    public get $index(): number {
        return this.index;
    }

    public set $index(value: number) {
        this.index = value;
    }
    
    public get $txId(): string {
        return this.txId;
    }

    public set $txId(value: string) {
        this.txId = value;
    }
    

    public get $value(): number {
        return this.value;
    }

    public set $value(value: number) {
        this.value = value;
    }

    /* public get $lockScript(): string {
        return this.lockScript;
    }

    public set $lockScript(value: string) {
        this.lockScript = value;
    } */
    
    constructor(value: number,publicKey: string){
        this.value = value;
        this.lockScript = publicKey;
    }

    // 反序列化，进行类型转换
    public static createOnputsFromUnserialize(objs: Array<Output>){
        let outs = [];
        objs.forEach((obj)=>{
            outs.push(new Output(obj.value,obj.lockScript));
        });
        return outs;
    }

    public canUnlock(privateKey: string): boolean{
        if(privateKey == rsaConfig[this.lockScript]){
            return true;
        }else{
            return false;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>import * <span class="hljs-keyword">as</span> rsaConfig <span class="hljs-keyword">from</span> <span class="hljs-string">'../../rsa.json'</span>;
export <span class="hljs-keyword">class</span> <span class="hljs-title">Output</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">value</span>: number;
    <span class="hljs-comment">// 锁定脚本，需要使用UTXO归属者用私钥进行签名通过</span>
    <span class="hljs-comment">// 当解锁UTXO成功后，此UTXO变为下一个交易的交易输入，同时使用接收方的地址（公钥）锁定本次交易的交易输出，</span>
    <span class="hljs-comment">// 等待接收方使用私钥签名使用该UTXO</span>
    <span class="hljs-comment">// 因此，btc没有账户的概念，所有的“钱”由自己的公钥所加密保存，只有用自己的私钥才能使用这些钱（即解锁了UTXO的解锁脚本）</span>
    <span class="hljs-keyword">private</span> lockScript: <span class="hljs-keyword">string</span>;

    <span class="hljs-comment">// 该属性仅仅在交易时使用，设置属性</span>
    <span class="hljs-keyword">private</span> txId: <span class="hljs-keyword">string</span>;

    <span class="hljs-comment">// 该属性仅仅在交易时使用，设置属性</span>
    <span class="hljs-keyword">private</span> index: number;

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $index(): number {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.index;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $index(<span class="hljs-keyword">value</span>: number) {
        <span class="hljs-keyword">this</span>.index = <span class="hljs-keyword">value</span>;
    }
    
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $txId(): <span class="hljs-keyword">string</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.txId;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $txId(<span class="hljs-keyword">value</span>: <span class="hljs-keyword">string</span>) {
        <span class="hljs-keyword">this</span>.txId = <span class="hljs-keyword">value</span>;
    }
    

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $<span class="hljs-keyword">value</span>(): number {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span>;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $<span class="hljs-keyword">value</span>(<span class="hljs-keyword">value</span>: number) {
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
    }

    <span class="hljs-comment">/* public get $lockScript(): string {
        return this.lockScript;
    }

    public set $lockScript(value: string) {
        this.lockScript = value;
    } */</span>
    
    constructor(<span class="hljs-keyword">value</span>: number,publicKey: <span class="hljs-keyword">string</span>){
        <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
        <span class="hljs-keyword">this</span>.lockScript = publicKey;
    }

    <span class="hljs-comment">// 反序列化，进行类型转换</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-title">createOnputsFromUnserialize</span>(<span class="hljs-params">objs: Array&lt;Output&gt;</span>)</span>{
        <span class="hljs-keyword">let</span> outs = [];
        objs.forEach((obj)=&gt;{
            outs.push(<span class="hljs-keyword">new</span> Output(obj.<span class="hljs-keyword">value</span>,obj.lockScript));
        });
        <span class="hljs-keyword">return</span> outs;
    }

    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-title">canUnlock</span>(<span class="hljs-params">privateKey: <span class="hljs-keyword">string</span></span>): boolean</span>{
        <span class="hljs-keyword">if</span>(privateKey == rsaConfig[<span class="hljs-keyword">this</span>.lockScript]){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
}</code></pre>
<p>交易输出中的value属性标识当前utxo的余额，即BTC个数；<br>lockScript属性为锁定脚本，在我们的简易实现中就为接收方的公钥，并不是BTC中的逆波兰式，但大体原理相同，都需要提供私钥来进行解密。</p>
<h2 id="articleHeader4">一笔交易</h2>
<p>一笔交易，包含了若干个交易输入和交易输出，同时也提供了一个txId唯一的标识这比交易。从结构上看是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class Transaction {
    private txId: string;
    private inputTxs: Array<Input>;
    private outputTxs: Array<Output>;

    constructor(txId: string, inputs: Array<Input>, outputs: Array<Output>){
        this.txId = txId;
        this.inputTxs = inputs;
        this.outputTxs = outputs;
    }

    public get $txId(): string {
        return this.txId;
    }

    public set $txId(value: string) {
        this.txId = value;
    }

    public get $inputTxs(): Array<Input> {
        return this.inputTxs;
    }

    public set $inputTxs(value: Array<Input>) {
        this.inputTxs = value;
    }

    public get $outputTxs(): Array<Output> {
        return this.outputTxs;
    }

    public set $outputTxs(value: Array<Output>) {
        this.outputTxs = value;
    }
    /* 
        1.交易结构各字段序列化为字节数组
        2.把字节数组拼接为支付串
        3.对支付串计算两次SHA256 得到交易hash 
    */
    public setTxId(){
        let sha256 = crypto.createHash('sha256');
        sha256.update(JSON.stringify(this.inputTxs) + JSON.stringify(this.outputTxs) + Date.now(),'utf8');
        this.txId = sha256.digest('hex');
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Transaction {
    <span class="hljs-keyword">private</span> txId: <span class="hljs-built_in">string</span>;
    <span class="hljs-keyword">private</span> inputTxs: <span class="hljs-built_in">Array</span>&lt;Input&gt;;
    <span class="hljs-keyword">private</span> outputTxs: <span class="hljs-built_in">Array</span>&lt;Output&gt;;

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">txId: <span class="hljs-built_in">string</span>, inputs: <span class="hljs-built_in">Array</span>&lt;Input&gt;, outputs: <span class="hljs-built_in">Array</span>&lt;Output&gt;</span>){
        <span class="hljs-keyword">this</span>.txId = txId;
        <span class="hljs-keyword">this</span>.inputTxs = inputs;
        <span class="hljs-keyword">this</span>.outputTxs = outputs;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $txId(): <span class="hljs-built_in">string</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.txId;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $txId(value: <span class="hljs-built_in">string</span>) {
        <span class="hljs-keyword">this</span>.txId = value;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $inputTxs(): <span class="hljs-built_in">Array</span>&lt;Input&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.inputTxs;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $inputTxs(value: <span class="hljs-built_in">Array</span>&lt;Input&gt;) {
        <span class="hljs-keyword">this</span>.inputTxs = value;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> $outputTxs(): <span class="hljs-built_in">Array</span>&lt;Output&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.outputTxs;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">set</span> $outputTxs(value: <span class="hljs-built_in">Array</span>&lt;Output&gt;) {
        <span class="hljs-keyword">this</span>.outputTxs = value;
    }
    <span class="hljs-comment">/* 
        1.交易结构各字段序列化为字节数组
        2.把字节数组拼接为支付串
        3.对支付串计算两次SHA256 得到交易hash 
    */</span>
    <span class="hljs-keyword">public</span> setTxId(){
        <span class="hljs-keyword">let</span> sha256 = crypto.createHash(<span class="hljs-string">'sha256'</span>);
        sha256.update(<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.inputTxs) + <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.outputTxs) + <span class="hljs-built_in">Date</span>.now(),<span class="hljs-string">'utf8'</span>);
        <span class="hljs-keyword">this</span>.txId = sha256.digest(<span class="hljs-string">'hex'</span>);
    }

}</code></pre>
<p>其中 txId的计算这里并没有严格按照BTC实现的那样进行计算，而是简单的进行对象序列化进行一次sha256。</p>
<h3 id="articleHeader5">coinbase交易</h3>
<p>我们都知道得到比特币需要挖矿，其实挖矿也属于一种交易，不过是一种没有确定交易输入的一种交易，它也被称作coinbase交易。coinbase交易在每一个区块中都会存在，它的总额包括了系统针对矿工打包交易过程的奖励以及其他转账方提供的手续费，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014088254?w=2378&amp;h=1230" src="https://static.alili.tech/img/remote/1460000014088254?w=2378&amp;h=1230" alt="coinbase交易" title="coinbase交易" style="cursor: pointer; display: inline;"></span></p>
<p>因此，创建一个coinbase交易也很容易</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // coinbase交易用于给矿工奖励，input为空，output为矿工报酬
    public static createCoinbaseTx(pubKey: string, info: string){
        let input = new Input('',-1,info);
        let output = new Output(AWARD, pubKey);
        let tx = new Transaction('',[input],[output])
        tx.setTxId();
        return tx;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>    <span class="hljs-comment">// coinbase交易用于给矿工奖励，input为空，output为矿工报酬</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-title">createCoinbaseTx</span>(<span class="hljs-params">pubKey: <span class="hljs-keyword">string</span>, info: <span class="hljs-keyword">string</span></span>)</span>{
        <span class="hljs-keyword">let</span> input = <span class="hljs-keyword">new</span> Input(<span class="hljs-string">''</span>,<span class="hljs-number">-1</span>,info);
        <span class="hljs-keyword">let</span> output = <span class="hljs-keyword">new</span> Output(AWARD, pubKey);
        <span class="hljs-keyword">let</span> tx = <span class="hljs-keyword">new</span> Transaction(<span class="hljs-string">''</span>,[input],[output])
        tx.setTxId();
        <span class="hljs-keyword">return</span> tx;
    }</code></pre>
<p>在我们的实现中，只需提供锁定utxo的公钥以及一串描述字符串即可，最后设置交易的txId，完成coinbase交易的创建。</p>
<p>也提供了识别coinbase交易的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public static isCoinbaseTx(tx: Transaction){
    if(tx.$inputTxs.length == 1 &amp;&amp; tx.$inputTxs[0].$outputIndex == -1 &amp;&amp; tx.$inputTxs[0].$txId == ''){
        return true;
    }else{
        return false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> isCoinbaseTx(tx: Transaction){
    <span class="hljs-keyword">if</span>(tx.$inputTxs.length == <span class="hljs-number">1</span> &amp;&amp; tx.$inputTxs[<span class="hljs-number">0</span>].$outputIndex == <span class="hljs-number">-1</span> &amp;&amp; tx.$inputTxs[<span class="hljs-number">0</span>].$txId == <span class="hljs-string">''</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
    }
}</code></pre>
<p>至此，coinbase交易就完成了，这是最简单的一种交易，并没有涉及到转账方，也就是交易输入。</p>
<h3 id="articleHeader6">转账交易</h3>
<p>使用BTC就避免不了转账，转账事务在utxo模型的实现就是添加了一笔Transaction到某个区块而已。每一笔交易都需要交易输入和交易输出，因此在BTC中，转账的核心就是找到转账方的utxo进行消费，同时将指定数量的BTC划到指定的消费输出上，如果仍有剩余，则找零至自己的消费输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建转账交易
public static createTransaction(from: string, fromPubkey: string, fromKey: string, to: string, toPubkey: string, coin: number){
    let outputs = this.findUTXOToTransfer(fromKey, coin);
    console.log(`UTXOToTransfer： ${JSON.stringify(outputs)}, from: ${from} to ${to} transfer ${coin}`)
    let inputTx = [], sum = 0, outputTx = [];
    outputs.forEach((o)=>{
        sum += o.$value;
        inputTx.push(new Input(o.$txId,o.$index,fromKey));
    });

    if(sum < coin){
        throw Error(`余额不足，转账失败! from ${from} to ${to} transfer ${coin}btc, but only have ${sum}btc`);
    }

    // 公钥锁住脚本
    outputTx.push(new Output(coin,toPubkey));
    if(sum > coin){
        outputTx.push(new Output(sum-coin,fromPubkey));
    }
    let tx = new Transaction('',inputTx,outputTx);
    tx.setTxId();
    return tx;
}   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 创建转账交易</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> createTransaction(<span class="hljs-keyword">from</span>: <span class="hljs-built_in">string</span>, fromPubkey: <span class="hljs-built_in">string</span>, fromKey: <span class="hljs-built_in">string</span>, to: <span class="hljs-built_in">string</span>, toPubkey: <span class="hljs-built_in">string</span>, coin: <span class="hljs-built_in">number</span>){
    <span class="hljs-keyword">let</span> outputs = <span class="hljs-keyword">this</span>.findUTXOToTransfer(fromKey, coin);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`UTXOToTransfer： <span class="hljs-subst">${JSON.stringify(outputs)}</span>, from: <span class="hljs-subst">${from}</span> to <span class="hljs-subst">${to}</span> transfer <span class="hljs-subst">${coin}</span>`</span>)
    <span class="hljs-keyword">let</span> inputTx = [], sum = <span class="hljs-number">0</span>, outputTx = [];
    outputs.forEach(<span class="hljs-function">(<span class="hljs-params">o</span>)=&gt;</span>{
        sum += o.$value;
        inputTx.push(<span class="hljs-keyword">new</span> Input(o.$txId,o.$index,fromKey));
    });

    <span class="hljs-keyword">if</span>(sum &lt; coin){
        <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`余额不足，转账失败! from <span class="hljs-subst">${from}</span> to <span class="hljs-subst">${to}</span> transfer <span class="hljs-subst">${coin}</span>btc, but only have <span class="hljs-subst">${sum}</span>btc`</span>);
    }

    <span class="hljs-comment">// 公钥锁住脚本</span>
    outputTx.push(<span class="hljs-keyword">new</span> Output(coin,toPubkey));
    <span class="hljs-keyword">if</span>(sum &gt; coin){
        outputTx.push(<span class="hljs-keyword">new</span> Output(sum-coin,fromPubkey));
    }
    <span class="hljs-keyword">let</span> tx = <span class="hljs-keyword">new</span> Transaction(<span class="hljs-string">''</span>,inputTx,outputTx);
    tx.setTxId();
    <span class="hljs-keyword">return</span> tx;
}   </code></pre>
<p>创建一个交易，需要提供转账方的地址（公钥哈希）、转账方的公钥和私钥、接收方的地址、接收方的公钥以及转账的BTC数量。这笔交易由转账发发起，因此需要提供转账方的私钥进行解锁脚本。</p>
<p>首先，通过 <strong>findUTXOToTransfer</strong> 找到满足转账数量的可用的utxo，它需要提供转账方的私钥以及转账数量；<br>接下来根据获得的可用utxo，进行创建对应的交易输入；<br>然后用接收方的公钥加密交易输出，同时如果有余额的化找零给自己，用自己的公钥加密；<br>最后根据得到的交易输入与交易输出，创建一笔交易，计算txId，加入到区块中（我们的demo是在单机下进行模拟，并未实现多播），等待挖矿。</p>
<p>转账的核心在于 <strong>findUTXOToTransfer</strong>，在findUTXOToTransfer中，通过调用 <strong>getAllUnspentOutputTx</strong>拿到所有的可用的utxo，并筛选出满足给定数量BTC的utxo。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public static getAllUnspentOutputTx(secreteKey: string): Array<Transaction>{
    let outputIndexHash: Object = this.getAllSpentOutput(secreteKey);
    let unspentOutputsTx = [];
    let keys = Object.keys(outputIndexHash);
    let block = BlockDao.getSingletonInstance().getBlock(chain.$lastACKHash);
    while(block &amp;&amp; block instanceof Block){
        block.$txs &amp;&amp; block.$txs.forEach((tx)=>{
            if(keys.includes(tx.$txId)){
                tx.$outputTxs.forEach((output,i)=>{
                    // 过滤已消费的output
                    if(i == outputIndexHash[tx.$txId])
                        return;
                    
                    if(output.canUnlock(secreteKey)){
                        unspentOutputsTx.push(tx);
                    }    
                });
            }else{
                for(let i=0,len=tx.$outputTxs.length;i<len;i++){
                    let output = tx.$outputTxs[i];
                    if(output.canUnlock(secreteKey)){
                        unspentOutputsTx.push(tx);
                        break;
                    }    
                }
            }
        });
        block = BlockDao.getSingletonInstance().getBlock(block.$prevHash);
    }
    return unspentOutputsTx;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> getAllUnspentOutputTx(secreteKey: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">Array</span>&lt;Transaction&gt;{
    <span class="hljs-keyword">let</span> outputIndexHash: <span class="hljs-built_in">Object</span> = <span class="hljs-keyword">this</span>.getAllSpentOutput(secreteKey);
    <span class="hljs-keyword">let</span> unspentOutputsTx = [];
    <span class="hljs-keyword">let</span> keys = <span class="hljs-built_in">Object</span>.keys(outputIndexHash);
    <span class="hljs-keyword">let</span> block = BlockDao.getSingletonInstance().getBlock(chain.$lastACKHash);
    <span class="hljs-keyword">while</span>(block &amp;&amp; block <span class="hljs-keyword">instanceof</span> Block){
        block.$txs &amp;&amp; block.$txs.forEach(<span class="hljs-function">(<span class="hljs-params">tx</span>)=&gt;</span>{
            <span class="hljs-keyword">if</span>(keys.includes(tx.$txId)){
                tx.$outputTxs.forEach(<span class="hljs-function">(<span class="hljs-params">output,i</span>)=&gt;</span>{
                    <span class="hljs-comment">// 过滤已消费的output</span>
                    <span class="hljs-keyword">if</span>(i == outputIndexHash[tx.$txId])
                        <span class="hljs-keyword">return</span>;
                    
                    <span class="hljs-keyword">if</span>(output.canUnlock(secreteKey)){
                        unspentOutputsTx.push(tx);
                    }    
                });
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>,len=tx.$outputTxs.length;i&lt;len;i++){
                    <span class="hljs-keyword">let</span> output = tx.$outputTxs[i];
                    <span class="hljs-keyword">if</span>(output.canUnlock(secreteKey)){
                        unspentOutputsTx.push(tx);
                        <span class="hljs-keyword">break</span>;
                    }    
                }
            }
        });
        block = BlockDao.getSingletonInstance().getBlock(block.$prevHash);
    }
    <span class="hljs-keyword">return</span> unspentOutputsTx;
}</code></pre>
<p>在getAllUnspentOutputTx中，通过 <strong>getAllSpentOutput</strong> 遍历本地持久化的区块链，拿到所有的可供消费utxo，这些utxo并不仅仅属于转账方，因此需要在针对每个utxo尝试进行验证逻辑，即output.canUnlock(secreteKey)。验证通过则证明这是属于转账方的BTC，可以用于交易。</p>
<p>在getAllSpentOutput中，通过遍历每一个交易输入获取它指向前面交易的某个utxo来得到所有的utxo，当然对于coinbase交易我们无法找到他的交易输入，因此会进行过滤。</p>
<p>至此，utxo的转账流程已经完成，下面需要做的就是把这比交易加入到区块中了，这已不是本文的核心。</p>
<h2 id="articleHeader7">尾声</h2>
<p>本文所讲的utxo示例是基于作者对BTC实现的基础上的简单实现，有不当之处还请读者指出。另外，本文的代码开源在 <a href="https://github.com/royalrover/ts-btc" rel="nofollow noreferrer" target="_blank">https://github.com/royalrover...</a> 的 <strong>feature/utxo分支</strong> 上，希望大家一起提建议！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node.js与比特币

## 原文链接
[https://segmentfault.com/a/1190000014088249](https://segmentfault.com/a/1190000014088249)

