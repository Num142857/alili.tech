---
title: '从0到1打造一款react-native App(三)Camera' 
date: 2018-11-27 2:30:13
hidden: true
slug: qz5lvv7yng
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5173;&#x8054;&#x6587;&#x7AE0;</h2><p><a href="https://blog.csdn.net/j_bleach/article/details/73028798" rel="nofollow noreferrer" target="_blank"><br>&#x4ECE;0&#x5230;1&#x6253;&#x9020;&#x4E00;&#x6B3E;react-native App(&#x4E00;)&#x73AF;&#x5883;&#x914D;&#x7F6E;</a><br><a href="https://segmentfault.com/a/1190000015308197">&#x4ECE;0&#x5230;1&#x6253;&#x9020;&#x4E00;&#x6B3E;react-native App(&#x4E8C;)Navigation+Redux</a></p><p>&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/jiwenjiang/react-native-nfc" rel="nofollow noreferrer" target="_blank">https://github.com/jiwenjiang...</a></p><h2 id="articleHeader1">&#x62CD;&#x7167;&#xFF08;&#x6444;&#x50CF;&#xFF09;&#x9700;&#x6C42;</h2><p>&#x62CD;&#x7167;&#x7684;&#x4E3B;&#x8981;&#x9700;&#x6C42;&#x662F;&#x5728;&#x62CD;&#x7167;&#x540E;&#xFF0C;&#x4E0D;&#x5C06;&#x7167;&#x7247;&#x5728;&#x7CFB;&#x7EDF;&#x76F8;&#x518C;&#x4E2D;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;android&#x62CD;&#x7167;&#x540E;&#x4F1A;&#x9ED8;&#x8BA4;&#x5B58;&#x50A8;&#x5728;DCIM&#x6587;&#x4EF6;&#x5939;&#x5F53;&#x4E2D;&#xFF0C;&#x800C;&#x8FD9;&#x6B21;&#x4E3B;&#x8981;&#x9700;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x628A;&#x7167;&#x7247;&#x653E;&#x5728;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x5F53;&#x4E2D;&#x3002;</p><h3 id="articleHeader2">react-native-camera</h3><p>&#x62CD;&#x7167;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5305;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x6BD4;&#x5982;<a href="https://github.com/react-community/react-native-image-picker" rel="nofollow noreferrer" target="_blank">react-native-image-picker</a>,&#x8FD9;&#x4E2A;&#x8C03;&#x7528;&#x7684;&#x662F;&#x7CFB;&#x7EDF;&#x76F8;&#x673A;&#xFF0C;&#x7528;&#x6CD5;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x662F;&#x62D3;&#x5C55;&#x6027;&#x8F83;&#x5DEE;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x8FD9;&#x6B21;&#x9879;&#x76EE;&#x4E3B;&#x8981;&#x7684;&#x9700;&#x6C42;&#xFF08;&#x62CD;&#x7167;&#x540E;&#x4E0D;&#x5728;&#x7CFB;&#x7EDF;&#x76F8;&#x518C;&#x663E;&#x793A;&#xFF09;&#xFF0C;&#x8FD8;&#x662F;&#x672C;&#x8EAB;&#x62CD;&#x7167;&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x5B9A;&#x5236;&#x5316;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x7C7B;&#x4F3C;&#x5FAE;&#x4FE1;&#x62CD;&#x7167;&#x90A3;&#x79CD;&#xFF0C;&#x90FD;&#x4E0D;&#x5BB9;&#x6613;&#x5B9E;&#x73B0;&#xFF0C;&#x56E0;&#x6B64;&#x9009;&#x62E9;&#x4E86;<a href="https://github.com/react-native-community/react-native-camera" rel="nofollow noreferrer" target="_blank">react-native-camera</a>&#x3002;</p><p>&#x6700;&#x65B0;&#x7248;&#x7684;react-native-camera&#xFF08;v 1.1.x&#xFF09;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#x4E86;&#x4EBA;&#x8138;&#x8BC6;&#x522B;&#xFF0C;&#x6587;&#x5B57;&#x8BC6;&#x522B;&#x7B49;&#x529F;&#x80FD;&#xFF0C;&#x8FD8;&#x662F;&#x5F88;&#x5F3A;&#x5927;&#x7684;&#xFF0C;&#x8FD9;&#x4E9B;&#x529F;&#x80FD;&#x53EF;&#x80FD;&#x65E5;&#x540E;&#x90FD;&#x4F1A;&#x7528;&#x5F97;&#x5230;&#xFF0C;<strong><em>&#x4E0D;&#x8FC7;&#x56E0;&#x4E3A;&#x4E00;&#x4E9B;&#x7248;&#x672C;&#x548C;&#x5E73;&#x53F0;&#x7684;&#x539F;&#x56E0;&#x4E4B;&#x540E;&#x4F1A;&#x6362;&#x6210;<a href="https://docs.expo.io/versions/v28.0.0/sdk/camera" rel="nofollow noreferrer" target="_blank">expo</a>&#x7684;camera&#xFF0C;</em></strong>&#x8FD9;&#x91CC;&#x6682;&#x65F6;&#x8FD8;&#x662F;&#x4ECB;&#x7ECD;rn&#x7684;camera&#xFF08;v 0.7&#xFF09;&#x3002;</p><p>&#x7EC4;&#x4EF6;&#x4E8C;&#x6B21;&#x5C01;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import {
    Dimensions,
    StyleSheet,
    Button,
    Text,
    ImageBackground,
    View,
    TouchableOpacity
} from &apos;react-native&apos;;
import Camera from &apos;react-native-camera&apos;;
import Icon from &apos;react-native-vector-icons/MaterialIcons&apos;;
import { deleteFile, mkdir, readPath } from &apos;../../service/utils/fileOperations&apos;;
import RNFS from &apos;react-native-fs&apos;;
import moment from &apos;moment/moment&apos;;

class RNCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            currentImage: null
        };
    }

    async takePicture() {
        const options = {};
        const { path: currentImage } = await this.camera.capture({ metadata: options });
        this.setState({ currentImage });
    }

    back() {
        this.setState({ currentImage: null, hidden: true });
    }

    async check() {
        const [date, unixTime] = [moment().format(&apos;YYYY/MM/DD&apos;), moment().unix()];
        const dir = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
        await mkdir(dir);
        const url = `${dir}/${unixTime}.jpg`;
        await RNFS.moveFile(this.state.currentImage, url);
        console.log(await readPath(dir));
        this.setState({ currentImage: null });
    }

    cancel() {
        deleteFile(this.state.currentImage);
        this.setState({ currentImage: null });
    }


    render() {
        const { currentImage, hidden } = this.state;
        return (
                &lt;View style={[styles.container, hidden &amp;&amp; styles.hidden]}&gt;
                    {currentImage ? &lt;ImageBackground style={styles.photo} source="{{" uri: currentImage "}}"&gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; this.cancel()}&gt;
                                &lt;Icon name=&quot;close&quot; size={30}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; this.check()}&gt;
                                &lt;Icon name=&quot;check&quot; size={30}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;/ImageBackground &gt;
                            : &lt;Camera ref={(cam) =&gt; {
                                this.camera = cam;
                            "}}"
                                      style={styles.preview}
                                      aspect={Camera.constants.Aspect.fill}
                                      captureTarget={Camera.constants.CaptureTarget.temp}
                            &gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; this.back()}&gt;
                                &lt;Icon name=&quot;expand-more&quot; size={30}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; this.takePicture()}&gt;
                                &lt;Icon name=&quot;camera-alt&quot; size={30}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;/Camera &gt;
                    }
                &lt;/View &gt;
        );
    }
}

const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                flexDirection: &apos;row&apos;
            },
            preview: {
                flex: 1,
                justifyContent: &apos;center&apos;,
                flexDirection: &apos;row&apos;,
                alignItems: &apos;flex-end&apos;
            },
            capture: {
                flex: 0,
                backgroundColor: &apos;rgba(255, 255, 255, 0.3)&apos;,
                borderRadius: 25,
                margin: 20,
                marginBottom: 30,
                width: 50,
                height: 50,
                alignItems: &apos;center&apos;,
                justifyContent: &apos;center&apos;,
                zIndex: 1
            },
            photo: {
                flex: 1,
                justifyContent: &apos;center&apos;,
                flexDirection: &apos;row&apos;,
                alignItems: &apos;flex-end&apos;
            },
            hidden: {
                display: &apos;none&apos;
            }
        }
);

export default RNCamera;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> {
    Dimensions,
    StyleSheet,
    Button,
    Text,
    ImageBackground,
    View,
    TouchableOpacity
} from <span class="hljs-string">&apos;react-native&apos;</span>;
<span class="hljs-keyword">import</span> Camera from <span class="hljs-string">&apos;react-native-camera&apos;</span>;
<span class="hljs-keyword">import</span> Icon from <span class="hljs-string">&apos;react-native-vector-icons/MaterialIcons&apos;</span>;
<span class="hljs-keyword">import</span> { deleteFile, mkdir, readPath } from <span class="hljs-string">&apos;../../service/utils/fileOperations&apos;</span>;
<span class="hljs-keyword">import</span> RNFS from <span class="hljs-string">&apos;react-native-fs&apos;</span>;
<span class="hljs-keyword">import</span> moment from <span class="hljs-string">&apos;moment/moment&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RNCamera</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            hidden: <span class="hljs-keyword">false</span>,
            currentImage: <span class="hljs-keyword">null</span>
        };
    }

    <span class="hljs-keyword">async</span> takePicture() {
        <span class="hljs-keyword">const</span> options = {};
        <span class="hljs-keyword">const</span> { path: currentImage } = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.camera.capture({ metadata: options });
        <span class="hljs-keyword">this</span>.setState({ currentImage });
    }

    back() {
        <span class="hljs-keyword">this</span>.setState({ currentImage: <span class="hljs-keyword">null</span>, hidden: <span class="hljs-keyword">true</span> });
    }

    <span class="hljs-keyword">async</span> check() {
        <span class="hljs-keyword">const</span> [date, unixTime] = [moment().format(<span class="hljs-string">&apos;YYYY/MM/DD&apos;</span>), moment().unix()];
        <span class="hljs-keyword">const</span> dir = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
        <span class="hljs-keyword">await</span> mkdir(dir);
        <span class="hljs-keyword">const</span> url = `${dir}/${unixTime}.jpg`;
        <span class="hljs-keyword">await</span> RNFS.moveFile(<span class="hljs-keyword">this</span>.state.currentImage, url);
        console.log(<span class="hljs-keyword">await</span> readPath(dir));
        <span class="hljs-keyword">this</span>.setState({ currentImage: <span class="hljs-keyword">null</span> });
    }

    cancel() {
        deleteFile(<span class="hljs-keyword">this</span>.state.currentImage);
        <span class="hljs-keyword">this</span>.setState({ currentImage: <span class="hljs-keyword">null</span> });
    }


    render() {
        <span class="hljs-keyword">const</span> { currentImage, hidden } = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">return</span> (
                &lt;View style={[styles.container, hidden &amp;&amp; styles.hidden]}&gt;
                    {currentImage ? &lt;ImageBackground style={styles.photo} source="{{" uri: currentImage "}}"&gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; <span class="hljs-keyword">this</span>.cancel()}&gt;
                                &lt;Icon name=<span class="hljs-string">&quot;close&quot;</span> size={<span class="hljs-number">30</span>}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; <span class="hljs-keyword">this</span>.check()}&gt;
                                &lt;Icon name=<span class="hljs-string">&quot;check&quot;</span> size={<span class="hljs-number">30</span>}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;/ImageBackground &gt;
                            : &lt;Camera ref={(cam) =&gt; {
                                <span class="hljs-keyword">this</span>.camera = cam;
                            "}}"
                                      style={styles.preview}
                                      aspect={Camera.constants.Aspect.fill}
                                      captureTarget={Camera.constants.CaptureTarget.temp}
                            &gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; <span class="hljs-keyword">this</span>.back()}&gt;
                                &lt;Icon name=<span class="hljs-string">&quot;expand-more&quot;</span> size={<span class="hljs-number">30</span>}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;TouchableOpacity style={styles.capture} onPress={() =&gt; <span class="hljs-keyword">this</span>.takePicture()}&gt;
                                &lt;Icon name=<span class="hljs-string">&quot;camera-alt&quot;</span> size={<span class="hljs-number">30</span>}/&gt;
                            &lt;/TouchableOpacity &gt;
                            &lt;/Camera &gt;
                    }
                &lt;/View &gt;
        );
    }
}

<span class="hljs-keyword">const</span> styles = StyleSheet.create(
        {
            container: {
                flex: <span class="hljs-number">1</span>,
                flexDirection: <span class="hljs-string">&apos;row&apos;</span>
            },
            preview: {
                flex: <span class="hljs-number">1</span>,
                justifyContent: <span class="hljs-string">&apos;center&apos;</span>,
                flexDirection: <span class="hljs-string">&apos;row&apos;</span>,
                alignItems: <span class="hljs-string">&apos;flex-end&apos;</span>
            },
            capture: {
                flex: <span class="hljs-number">0</span>,
                backgroundColor: <span class="hljs-string">&apos;rgba(255, 255, 255, 0.3)&apos;</span>,
                borderRadius: <span class="hljs-number">25</span>,
                margin: <span class="hljs-number">20</span>,
                marginBottom: <span class="hljs-number">30</span>,
                width: <span class="hljs-number">50</span>,
                height: <span class="hljs-number">50</span>,
                alignItems: <span class="hljs-string">&apos;center&apos;</span>,
                justifyContent: <span class="hljs-string">&apos;center&apos;</span>,
                zIndex: <span class="hljs-number">1</span>
            },
            photo: {
                flex: <span class="hljs-number">1</span>,
                justifyContent: <span class="hljs-string">&apos;center&apos;</span>,
                flexDirection: <span class="hljs-string">&apos;row&apos;</span>,
                alignItems: <span class="hljs-string">&apos;flex-end&apos;</span>
            },
            hidden: {
                display: <span class="hljs-string">&apos;none&apos;</span>
            }
        }
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> RNCamera;</code></pre><p>&#x6CA1;&#x6709;&#x5BF9;react-native-camera&#x505A;&#x8FC7;&#x591A;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x914D;&#x7F6E;&#x662F;captureTarget&#x5C5E;&#x6027;&#x3002;&#x5728;v0.7&#x7248;&#x672C;&#x7684;camera&#x5F53;&#x4E2D;&#xFF0C;captureTarget&#x7684;&#x53EF;&#x9009;&#x914D;&#x7F6E;&#x9879;&#x6709;4&#x79CD;&#x3002;</p><ul><li><em>Camera.constants.CaptureTarget.cameraRoll</em>&#xFF08;&#x9ED8;&#x8BA4;&#xFF0C;&#x5B58;&#x50A8;&#x5728;&#x7CFB;&#x7EDF;&#x76F8;&#x518C;&#x4E2D;&#xFF09;</li><li><em>Camera.constants.CaptureTarget.disk</em>&#xFF08;&#x5B58;&#x50A8;&#x5728;&#x78C1;&#x76D8;&#x4E2D;&#xFF0C;&#x8FD9;&#x662F;&#x5B98;&#x65B9;&#x63A8;&#x8350;&#x7684;&#x5B58;&#x50A8;&#x65B9;&#x5F0F;&#xFF0C;&#x4F1A;&#x63D0;&#x5347;&#x62CD;&#x7167;&#x7684;&#x54CD;&#x5E94;&#x901F;&#x5EA6;&#xFF09;</li><li><em>Camera.constants.CaptureTarget.temp</em> &#xFF08;&#x5B58;&#x50A8;&#x5728;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5F53;&#x524D;&#x9879;&#x76EE;&#x9009;&#x62E9;&#x65B9;&#x6848;&#xFF09;</li><li><em>Camera.constants.CaptureTarget.memory</em> &#xFF08;&#x4EE5;base64&#x7684;&#x5F62;&#x5F0F;&#x5B58;&#x50A8;&#x5728;&#x5185;&#x5B58;&#x5F53;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x5728;&#x4E4B;&#x540E;&#x7684;&#x7248;&#x672C;&#x5DF2;&#x7ECF;&#x88AB;&#x5E9F;&#x5F03;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;0.7&#x7248;&#x672C;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x7528;&#x7684;&#xFF09;</li></ul><p>&#x5B9E;&#x73B0;&#x57FA;&#x672C;&#x601D;&#x8DEF;&#x662F;&#xFF0C;&#x901A;&#x8FC7;&#x5916;&#x5C42;&#x8C03;&#x7528;&#x6765;&#x63A7;&#x5236;&#x6574;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;&#x503C;&#xFF0C;&#x6765;&#x7BA1;&#x7406;&#x7EC4;&#x4EF6;&#x7684;&#x663E;&#x793A;&#x4E0E;&#x9690;&#x85CF;&#xFF0C;&#x5373;&#x7EC4;&#x4EF6;state&#x7684;hidden&#x5C5E;&#x6027;&#x3002;&#x5F53;&#x7EC4;&#x4EF6;&#x88AB;&#x6210;&#x529F;&#x8C03;&#x7528;&#x663E;&#x793A;&#x65F6;&#xFF0C;&#x7EC4;&#x4EF6;&#x4E3B;&#x8981;&#x5206;&#x4E3A;&#x4E24;&#x5757;&#xFF0C;&#x62CD;&#x7167;&#x548C;&#x9884;&#x89C8;&#x3002;&#x7ED9;&#x5B9A;&#x4E00;&#x4E2A;&#x62CD;&#x7167;&#x7167;&#x7247;&#x7684;&#x8DEF;&#x5F84;&#x503C;&#xFF0C;&#x5373;&#x7EC4;&#x4EF6;state&#x7684;currentImage&#xFF0C;&#x5982;&#x679C;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x7167;&#x7247;&#x7684;&#x5B58;&#x50A8;&#x8DEF;&#x5F84;&#xFF0C;&#x5C31;&#x663E;&#x793A;&#x9884;&#x89C8;&#x754C;&#x9762;&#xFF0C;&#x5982;&#x4E0D;&#x5B58;&#x5728;&#x5C31;&#x663E;&#x793A;&#x62CD;&#x7167;&#x754C;&#x9762;&#x3002;&#x800C;currentImage&#x7684;&#x503C;&#x901A;&#x8FC7;&#x62CD;&#x7167;&#x6210;&#x529F;&#x7684;Promise&#x6216;&#x8005;&#x53D6;&#x6D88;&#x7684;&#x72B6;&#x6001;&#x53BB;&#x63A7;&#x5236;&#x521B;&#x5EFA;&#x4E0E;&#x5220;&#x9664;&#x3002;</p><p><strong>&#x62CD;&#x7167;&#x65F6;&#x53BB;&#x521B;&#x5EFA;currentImage</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async takePicture() {
        const options = {};
        const { path: currentImage } = await this.camera.capture({ metadata: options });
        this.setState({ currentImage });
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">async</span> <span class="hljs-title">takePicture</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> options = {};
        <span class="hljs-keyword">const</span> { path: currentImage } = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.camera.capture({ metadata: options });
        <span class="hljs-keyword">this</span>.setState({ currentImage });
    }</code></pre><p><strong>&#x9690;&#x85CF;&#x7EC4;&#x5EFA;&#xFF0C;&#x8FD4;&#x56DE;&#x8C03;&#x7528;&#x754C;&#x9762;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" back() {
        this.setState({ currentImage: null, hidden: true });
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code> <span class="hljs-string">back()</span> <span class="hljs-string">{</span>
        <span class="hljs-string">this.setState({</span> <span class="hljs-attr">currentImage:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span> <span class="hljs-attr">hidden:</span> <span class="hljs-literal">true</span> <span class="hljs-string">});</span>
    <span class="hljs-string">}</span></code></pre><p><strong>&#x62CD;&#x7167;&#x5B8C;&#x6210;&#x540E;&#x9884;&#x89C8;&#x7167;&#x7247;&#x53CA;&#x786E;&#x8BA4;&#x5B58;&#x50A8;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async check() {
        const [date, unixTime] = [moment().format(&apos;YYYY/MM/DD&apos;), moment().unix()];
        const dir = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
        await mkdir(dir);
        const url = `${dir}/${unixTime}.jpg`;
        await RNFS.moveFile(this.state.currentImage, url);
        console.log(await readPath(dir));
        this.setState({ currentImage: null });
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">async</span> check() {
        <span class="hljs-keyword">const</span> [<span class="hljs-built_in">date</span>, unixTime] = [moment().format(<span class="hljs-string">&apos;YYYY/MM/DD&apos;</span>), moment().unix()];
        <span class="hljs-keyword">const</span> dir = <span class="hljs-string">`<span class="hljs-subst">${RNFS.DocumentDirectoryPath}</span>/photo/<span class="hljs-subst">${date}</span>`</span>;
        <span class="hljs-keyword">await</span> mkdir(dir);
        <span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">`<span class="hljs-subst">${dir}</span>/<span class="hljs-subst">${unixTime}</span>.jpg`</span>;
        <span class="hljs-keyword">await</span> RNFS.moveFile(<span class="hljs-keyword">this</span>.state.currentImage, <span class="hljs-built_in">url</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> readPath(dir));
        <span class="hljs-keyword">this</span>.setState({ <span class="hljs-attribute">currentImage</span>: <span class="hljs-literal">null</span> });
    }</code></pre><p>&#x5B58;&#x50A8;&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;<a href="https://github.com/itinance/react-native-fs" rel="nofollow noreferrer" target="_blank">react-native-fs</a>&#xFF0C;&#x8FD9;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#x5305;&#x5C31;&#x4E0D;&#x8FC7;&#x591A;&#x4ECB;&#x7ECD;&#x4E86;&#xFF0C;&#x90FD;&#x662F;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x7684;&#x6587;&#x4EF6;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x8F83;&#x597D;&#x7406;&#x89E3;&#x3002;&#x901A;&#x8FC7;&#x5728;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x4E0B;&#x65B0;&#x5EFA;photo/xxxx-xx-xx&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x786E;&#x4FDD;&#x6BCF;&#x5929;&#x62CD;&#x6444;&#x7684;&#x7167;&#x7247;&#x5B58;&#x653E;&#x5728;&#x5F53;&#x65E5;&#x7684;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x65B9;&#x4FBF;&#x540E;&#x7EED;&#x7684;&#x6587;&#x4EF6;&#x9884;&#x89C8;&#x65F6;&#x7684;&#x7B5B;&#x9009;&#x3002;&#x5728;&#x7167;&#x7247;&#x62CD;&#x6444;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;react-native-camera&#x4F1A;&#x5C06;&#x62CD;&#x6444;&#x7684;&#x7167;&#x7247;&#x5B58;&#x653E;&#x81F3;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x800C;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x5C06;&#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x7167;&#x7247;&#x79FB;&#x52A8;&#x81F3;&#x6211;&#x4EEC;&#x7684;&#x76EE;&#x6807;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x8FD9;&#x91CC;&#x987A;&#x4FBF;&#x8BF4;&#x4E00;&#x4E0B;&#xFF0C;&#x6587;&#x4EF6;move&#x64CD;&#x4F5C;&#x7684;&#x6027;&#x80FD;&#x662F;&#x4F18;&#x4E8E;read+write&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x5207;&#x8BB0;&#x7528;move&#x3002;&#x5173;&#x4E8E;android&#x6587;&#x4EF6;&#x5B58;&#x50A8;&#x8FD9;&#x91CC;&#x63A8;&#x8350;&#x4E00;&#x7BC7;&#x4ECB;&#x7ECD;&#x7684;&#x6BD4;&#x8F83;&#x8BE6;&#x7EC6;&#x7684;&#x6587;&#x7AE0;<a href="https://juejin.im/post/58b557de128fe10065e93cc8" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/58b557...</a>&#x3002;</p><p><strong>&#x62CD;&#x7167;&#x5B8C;&#x6210;&#x540E;&#x9884;&#x89C8;&#x7167;&#x7247;&#x53CA;&#x653E;&#x5F03;&#x5B58;&#x50A8;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cancel() {
        deleteFile(this.state.currentImage);
        this.setState({ currentImage: null });
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>cancel() {
        deleteFile(this.<span class="hljs-keyword">state</span>.currentImage);
        this.<span class="hljs-built_in">set</span>State({ currentImage: null });
    }</code></pre><p>&#x64CD;&#x4F5C;&#x9884;&#x89C8;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbcpYy?w=1500&amp;h=862" src="https://static.alili.tech/img/bVbcpYy?w=1500&amp;h=862" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbcpYA?w=1000&amp;h=590" src="https://static.alili.tech/img/bVbcpYA?w=1000&amp;h=590" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader3">&#x7167;&#x7247;&#x56DE;&#x663E;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;View style={styles.container}&gt;
      &lt;Image style={styles.photo}
           source="{{" uri: `file://${files[0].path}` "}}" //&#x663E;&#x793A;&#x7B2C;&#x4E00;&#x5F20;&#x7167;&#x7247;
      /&gt;              
&lt;/View &gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Image</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.photo}</span>
           <span class="hljs-attr">source</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">uri:</span> `<span class="hljs-attr">file:</span>//${<span class="hljs-attr">files</span>[<span class="hljs-attr">0</span>]<span class="hljs-attr">.path</span>}` "}}" //&#x663E;&#x793A;&#x7B2C;&#x4E00;&#x5F20;&#x7167;&#x7247;
      /&gt;</span>              
<span class="hljs-tag">&lt;/<span class="hljs-name">View</span> &gt;</span></code></pre><p>&#x5728;&#x7167;&#x7247;&#x56DE;&#x663E;&#x65F6;&#xFF0C;&#x68C0;&#x6D4B;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x8BFB;&#x53D6;&#x7167;&#x7247;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mkdir = async (url) =&gt; {
    const dirExists = await RNFS.exists(url);
    if (dirExists) {
        return new Promise(resolve =&gt; resolve(dirExists));
    }
    await RNFS.mkdir(url);
    return new Promise(resolve =&gt; resolve(url));
};
async function storageFile() {
    const date = moment().format(&apos;YYYY/MM/DD&apos;);
    const url = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
    await mkdir(url);
    const files = await readPath(url);
    return files;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> mkdir = <span class="hljs-keyword">async</span> (<span class="hljs-built_in">url</span>) =&gt; {
    <span class="hljs-keyword">const</span> dirExists = <span class="hljs-keyword">await</span> RNFS.exists(<span class="hljs-built_in">url</span>);
    <span class="hljs-keyword">if</span> (dirExists) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(resolve =&gt; resolve(dirExists));
    }
    <span class="hljs-keyword">await</span> RNFS.mkdir(<span class="hljs-built_in">url</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Promise(resolve =&gt; resolve(<span class="hljs-built_in">url</span>));
};
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">storageFile</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">date</span> = moment().format(<span class="hljs-string">&apos;YYYY/MM/DD&apos;</span>);
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">`<span class="hljs-subst">${RNFS.DocumentDirectoryPath}</span>/photo/<span class="hljs-subst">${date}</span>`</span>;
    <span class="hljs-keyword">await</span> mkdir(<span class="hljs-built_in">url</span>);
    <span class="hljs-keyword">const</span> files = <span class="hljs-keyword">await</span> readPath(<span class="hljs-built_in">url</span>);
    <span class="hljs-keyword">return</span> files;
}</code></pre><h3 id="articleHeader4">&#x4E8C;&#x7EF4;&#x7801;&#x626B;&#x63CF;</h3><p>react-native-camera&#x652F;&#x6301;&#x5BF9;&#x5404;&#x79CD;&#x6761;&#x5F62;&#x7801;&#x7684;&#x626B;&#x63CF;&#x8BC6;&#x522B;&#xFF0C;&#x4E3B;&#x8981;&#x7684;&#x5C5E;&#x6027;&#x6709;&#x4E24;&#x4E2A;<br>barCodeTypes={[Camera.constants.BarCodeType.qr]} //&#x626B;&#x7801;&#x7684;&#x7C7B;&#x578B;<br>onBarCodeRead={this.props.onScanResultReceived} //&#x626B;&#x7801;&#x6210;&#x529F;&#x540E;&#x7684;&#x56DE;&#x8C03;</p><p>&#x9879;&#x76EE;&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x628A;<a href="https://www.jianshu.com/p/347ccf787d62" rel="nofollow noreferrer" target="_blank">https://www.jianshu.com/p/347...</a> &#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x4E8C;&#x6B21;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x4E00;&#x4E2A;&#x4E8C;&#x7EF4;&#x7801;&#x626B;&#x63CF;&#x7684;&#x7EC4;&#x4EF6;&#x590D;&#x5236;&#x4E86;&#x8FC7;&#x6765;&#x3002;&#x4E3B;&#x8981;&#x662F;&#x89C6;&#x56FE;&#x5C42;&#x7684;&#x4E8C;&#x6B21;&#x5C01;&#x88C5;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x3002;</p><p>&#x4E4B;&#x540E;&#x4F1A;&#x628A;react-native-camera&#x66FF;&#x6362;&#x6210;expo&#x4E2D;&#x7684;camera&#xFF0C;&#x6362;&#x5B8C;&#x4E4B;&#x540E;&#x4F1A;&#x7EE7;&#x7EED;&#x5728;&#x8FD9;&#x7BC7;camera&#x7684;&#x6587;&#x7AE0;&#x4E2D;&#x66F4;&#x65B0;&#xFF0C;&#x4E5F;&#x6B22;&#x8FCE;&#x6B63;&#x5728;&#x5B66;&#x4E60;&#x7684;&#x540C;&#x5B66;&#x4E00;&#x8D77;&#x4EA4;&#x6D41;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从0到1打造一款react-native App(三)Camera

## 原文链接
[https://segmentfault.com/a/1190000015313783](https://segmentfault.com/a/1190000015313783)

