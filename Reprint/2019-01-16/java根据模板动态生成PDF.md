---
title: 'java根据模板动态生成PDF' 
date: 2019-01-16 2:30:08
hidden: true
slug: w7kq38rf7p7
categories: [reprint]
---

{{< raw >}}

                    
<p>一、需求说明：根据业务需要，需要在服务器端生成可动态配置的PDF文档，方便数据可视化查看。</p>
<p>二、解决方案：<br>iText+FreeMarker+JFreeChart生成可动态配置的PDF文档<br>iText有很强大的PDF处理能力，但是样式和排版不好控制，直接写PDF文档，数据的动态渲染很麻烦。<br>FreeMarker能配置动态的html模板，正好解决了样式、动态渲染和排版问题。<br>JFreeChart有这方便的画图API，能画出简单的折线、柱状和饼图，基本能满足需要。</p>
<p>三、实现功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   1、能动态配置PDF文档内容
   2、支持中文字体显示的动态配置
   3、设置自定义的页眉页脚信息
   4、能动态生成业务图片
   5、完成PDF的分页和图片的嵌入
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>   <span class="hljs-number">1</span>、能动态配置PDF文档内容
   <span class="hljs-number">2</span>、支持中文字体显示的动态配置
   <span class="hljs-number">3</span>、设置自定义的页眉页脚信息
   <span class="hljs-number">4</span>、能动态生成业务图片
   <span class="hljs-number">5</span>、完成PDF的分页和图片的嵌入
</code></pre>
<p>四、主要代码结构说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   1、component包：PDF生成的组件 对外提供的是PDFKit工具类和HeaderFooterBuilder接口，其中PDFKit负责PDF的生成，HeaderFooterBuilder负责自定义页眉页脚信息。
   2、builder包：负责PDF模板之外的额外信息填写，这里主要是页眉页脚的定制。
   3、chart包：JFreeChart的画图工具包，目前只有一个线形图。
   4、test包：测试工具类
   5、util包：FreeMarker等工具类。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>   <span class="hljs-number">1</span>、component包：PDF生成的组件 对外提供的是PDFKit工具类和HeaderFooterBuilder接口，其中PDFKit负责PDF的生成，HeaderFooterBuilder负责自定义页眉页脚信息。
   <span class="hljs-number">2</span>、builder包：负责PDF模板之外的额外信息填写，这里主要是页眉页脚的定制。
   <span class="hljs-number">3</span>、chart包：JFreeChart的画图工具包，目前只有一个线形图。
   <span class="hljs-number">4</span>、test包：测试工具类
   <span class="hljs-number">5</span>、util包：FreeMarker等工具类。
</code></pre>
<p>五、关键代码说明：</p>
<p>1、模板配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Strict//EN&quot;  &quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd&quot;>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=UTF-8&quot;/>
    <meta http-equiv=&quot;Content-Style-Type&quot; content=&quot;text/css&quot;/>
    <title></title>
    <style type=&quot;text/css&quot;>
        body {
            font-family: pingfang sc light;
        }
        .center{
            text-align: center;
            width: 100%;
        }
    </style>
</head>
<body>
<!--第一页开始-->
<div class=&quot;page&quot; >
    <div class=&quot;center&quot;><p>${templateName}</p></div>
    <div><p>iText官网:${ITEXTUrl}</p></div>
    <div><p>FreeMarker官网:${freeMarkerUrl}</p></div>
    <div><p>JFreeChart教程:${JFreeChartUrl}</p></div>
    <div>列表值:</div>
    <div>
        <#list scores as item>
            <div><p>${item}</p></div>
        </#list>
    </div>
</div>
<!--第一页结束-->
<!---分页标记-->
<span style=&quot;page-break-after:always;&quot;></span>
<!--第二页开始-->
<div class=&quot;page&quot;>
    <div>第二页开始了</div>
    <!--外部链接-->
    <p>百度图标</p>
    <div>
        <img src=&quot;${imageUrl}&quot; alt=&quot;百度图标&quot; width=&quot;270&quot; height=&quot;129&quot;/>
    </div>
    <!--动态生成的图片-->
    <p>气温变化对比图</p>
    <div>
        <img src=&quot;${picUrl}&quot; alt=&quot;我的图片&quot; width=&quot;500&quot; height=&quot;270&quot;/>
    </div>
</div>


<!--第二页结束-->
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-meta">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=UTF-8"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Style-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/css"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">font-family</span>: pingfang sc light;
        }
        <span class="hljs-selector-class">.center</span>{
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!--第一页开始--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page"</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"center"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>${templateName}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>iText官网:${ITEXTUrl}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>FreeMarker官网:${freeMarkerUrl}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>JFreeChart教程:${JFreeChartUrl}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>列表值:<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">#list</span> <span class="hljs-attr">scores</span> <span class="hljs-attr">as</span> <span class="hljs-attr">item</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>${item}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">#list</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--第一页结束--&gt;</span>
<span class="hljs-comment">&lt;!---分页标记--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"page-break-after:always;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-comment">&lt;!--第二页开始--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>第二页开始了<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--外部链接--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>百度图标<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"${imageUrl}"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"百度图标"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"270"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"129"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!--动态生成的图片--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>气温变化对比图<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"${picUrl}"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"我的图片"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"500"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"270"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-comment">&lt;!--第二页结束--&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>2、获取模板内容并填充数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @description 获取模板
 */
public static String getContent(String fileName,Object data){

    String templatePath=getPDFTemplatePath(fileName);//根据PDF名称查找对应的模板名称
    String templateFileName=getTemplateName(templatePath);
    String templateFilePath=getTemplatePath(templatePath);
    if(StringUtils.isEmpty(templatePath)){
        throw new FreeMarkerException(&quot;templatePath can not be empty!&quot;);
    }
    try{
        Configuration config = new Configuration(Configuration.VERSION_2_3_25);//FreeMarker配置
        config.setDefaultEncoding(&quot;UTF-8&quot;);
        config.setDirectoryForTemplateLoading(new File(templateFilePath));//注意这里是模板所在文件夹，不是文件
        config.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        config.setLogTemplateExceptions(false);
        Template template = config.getTemplate(templateFileName);//根据模板名称 获取对应模板
        StringWriter writer = new StringWriter();
        template.process(data, writer);//模板和数据的匹配
        writer.flush();
        String html = writer.toString();
        return html;
    }catch (Exception ex){
        throw new FreeMarkerException(&quot;FreeMarkerUtil process fail&quot;,ex);
    }
}
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">/**
 * @description 获取模板
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">String</span> getContent(<span class="hljs-keyword">String</span> fileName,Object data){

    <span class="hljs-keyword">String</span> templatePath=getPDFTemplatePath(fileName);<span class="hljs-comment">//根据PDF名称查找对应的模板名称</span>
    <span class="hljs-keyword">String</span> templateFileName=getTemplateName(templatePath);
    <span class="hljs-keyword">String</span> templateFilePath=getTemplatePath(templatePath);
    <span class="hljs-built_in">if</span>(StringUtils.isEmpty(templatePath)){
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> FreeMarkerException(<span class="hljs-string">"templatePath can not be empty!"</span>);
    }
    <span class="hljs-built_in">try</span>{
        Configuration <span class="hljs-built_in">config</span> = <span class="hljs-keyword">new</span> Configuration(Configuration.VERSION_2_3_25);<span class="hljs-comment">//FreeMarker配置</span>
        <span class="hljs-built_in">config</span>.setDefaultEncoding(<span class="hljs-string">"UTF-8"</span>);
        <span class="hljs-built_in">config</span>.setDirectoryForTemplateLoading(<span class="hljs-keyword">new</span> <span class="hljs-built_in">File</span>(templateFilePath));<span class="hljs-comment">//注意这里是模板所在文件夹，不是文件</span>
        <span class="hljs-built_in">config</span>.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        <span class="hljs-built_in">config</span>.setLogTemplateExceptions(false);
        Template <span class="hljs-keyword">template</span> = <span class="hljs-built_in">config</span>.getTemplate(templateFileName);<span class="hljs-comment">//根据模板名称 获取对应模板</span>
        StringWriter writer = <span class="hljs-keyword">new</span> StringWriter();
        <span class="hljs-keyword">template</span>.<span class="hljs-built_in">process</span>(data, writer);<span class="hljs-comment">//模板和数据的匹配</span>
        writer.<span class="hljs-built_in">flush</span>();
        <span class="hljs-keyword">String</span> html = writer.toString();
        <span class="hljs-built_in">return</span> html;
    }<span class="hljs-built_in">catch</span> (Exception ex){
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> FreeMarkerException(<span class="hljs-string">"FreeMarkerUtil process fail"</span>,ex);
    }
}
    </code></pre>
<p>3、导出模板到PDF文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
     * @description     导出pdf到文件
     * @param fileName  输出PDF文件名
     * @param data      模板所需要的数据
     *
     */
public String exportToFile(String fileName,Object data){
     String htmlData= FreeMarkerUtil.getContent(fileName, data);//获取FreeMarker的模板数据
    if(StringUtils.isEmpty(saveFilePath)){
        saveFilePath=getDefaultSavePath(fileName);//设置PDF文件输出路径
    }
    File file=new File(saveFilePath);
    if(!file.getParentFile().exists()){
        file.getParentFile().mkdirs();
    }
    FileOutputStream outputStream=null;
    try{
        //设置输出路径
        outputStream=new FileOutputStream(saveFilePath);
        //设置文档大小
        Document document = new Document(PageSize.A4);//IText新建PDF文档
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);//设置文档和输出流的关系

        //设置页眉页脚
        PDFBuilder builder = new PDFBuilder(headerFooterBuilder,data);
        builder.setPresentFontSize(10);
        writer.setPageEvent(builder);

        //输出为PDF文件
        convertToPDF(writer,document,htmlData);
    }catch(Exception ex){
        throw new PDFException(&quot;PDF export to File fail&quot;,ex);
    }finally{
        IOUtils.closeQuietly(outputStream);
    }
    return saveFilePath;

}
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">/**
     * @description     导出pdf到文件
     * @param fileName  输出PDF文件名
     * @param data      模板所需要的数据
     *
     */</span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">String</span> exportToFile(<span class="hljs-keyword">String</span> fileName,Object data){
     <span class="hljs-keyword">String</span> htmlData= FreeMarkerUtil.getContent(fileName, data);<span class="hljs-comment">//获取FreeMarker的模板数据</span>
    <span class="hljs-keyword">if</span>(StringUtils.isEmpty(saveFilePath)){
        saveFilePath=getDefaultSavePath(fileName);<span class="hljs-comment">//设置PDF文件输出路径</span>
    }
    File file=<span class="hljs-keyword">new</span> <span class="hljs-type">File</span>(saveFilePath);
    <span class="hljs-keyword">if</span>(!file.getParentFile().exists()){
        file.getParentFile().mkdirs();
    }
    FileOutputStream outputStream=<span class="hljs-literal">null</span>;
    <span class="hljs-keyword">try</span>{
        <span class="hljs-comment">//设置输出路径</span>
        outputStream=<span class="hljs-keyword">new</span> <span class="hljs-type">FileOutputStream</span>(saveFilePath);
        <span class="hljs-comment">//设置文档大小</span>
        Document document = <span class="hljs-keyword">new</span> <span class="hljs-type">Document</span>(PageSize.A4);<span class="hljs-comment">//IText新建PDF文档</span>
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);<span class="hljs-comment">//设置文档和输出流的关系</span>

        <span class="hljs-comment">//设置页眉页脚</span>
        PDFBuilder builder = <span class="hljs-keyword">new</span> <span class="hljs-type">PDFBuilder</span>(headerFooterBuilder,data);
        builder.setPresentFontSize(<span class="hljs-number">10</span>);
        writer.setPageEvent(builder);

        <span class="hljs-comment">//输出为PDF文件</span>
        convertToPDF(writer,document,htmlData);
    }<span class="hljs-keyword">catch</span>(Exception ex){
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">PDFException</span>(<span class="hljs-string">"PDF export to File fail"</span>,ex);
    }finally{
        IOUtils.closeQuietly(outputStream);
    }
    <span class="hljs-keyword">return</span> saveFilePath;

}
    
</code></pre>
<p>4、测试工具类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" public  String createPDF(Object data, String fileName){
            //pdf保存路径
            try {
                //设置自定义PDF页眉页脚工具类
                PDFHeaderFooter headerFooter=new PDFHeaderFooter();
                PDFKit kit=new PDFKit();
                kit.setHeaderFooterBuilder(headerFooter);
                //设置输出路径
                kit.setSaveFilePath(&quot;/Users/fgm/Desktop/pdf/hello.pdf”);//设置出书路径
                String saveFilePath=kit.exportToFile(fileName,data);
                return  saveFilePath;
            } catch (Exception e) {
                log.error(&quot;PDF生成失败{}&quot;, ExceptionUtils.getFullStackTrace(e));
                return null;
            }
        
        }
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code> public  <span class="hljs-type">String</span> createPDF(<span class="hljs-type">Object</span> <span class="hljs-class"><span class="hljs-keyword">data</span>, <span class="hljs-type">String</span> fileName){
            //<span class="hljs-title">pdf</span>保存路径
            <span class="hljs-title">try</span> {
                //设置自定义<span class="hljs-type">PDF</span>页眉页脚工具类
                <span class="hljs-type">PDFHeaderFooter</span> <span class="hljs-title">headerFooter</span>=<span class="hljs-title">new</span> <span class="hljs-type">PDFHeaderFooter</span>();
                <span class="hljs-type">PDFKit</span> <span class="hljs-title">kit</span>=<span class="hljs-title">new</span> <span class="hljs-type">PDFKit</span>();
                <span class="hljs-title">kit</span>.<span class="hljs-title">setHeaderFooterBuilder</span>(<span class="hljs-title">headerFooter</span>);
                //设置输出路径
                <span class="hljs-title">kit</span>.<span class="hljs-title">setSaveFilePath</span>("/<span class="hljs-type">Users</span>/<span class="hljs-title">fgm</span>/<span class="hljs-type">Desktop</span>/<span class="hljs-title">pdf</span>/<span class="hljs-title">hello</span>.<span class="hljs-title">pdf</span>”);//设置出书路径
                <span class="hljs-type">String</span> <span class="hljs-title">saveFilePath</span>=<span class="hljs-title">kit</span>.<span class="hljs-title">exportToFile</span>(<span class="hljs-title">fileName</span>,<span class="hljs-title">data</span>);
                <span class="hljs-title">return</span>  <span class="hljs-title">saveFilePath</span>;
            } catch (<span class="hljs-type">Exception</span> <span class="hljs-title">e</span>) {
                <span class="hljs-title">log</span>.<span class="hljs-title">error</span>("<span class="hljs-type">PDF</span>生成失败{}", <span class="hljs-type">ExceptionUtils</span>.getFullStackTrace(<span class="hljs-title">e</span>));</span>
                return null;
            }
        
        }
    
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  public static void main(String[] args) {
         ReportKit360 kit=new ReportKit360();
                TemplateBO templateBO=new TemplateBO();//配置模板数据
                templateBO.setTemplateName(&quot;Hello iText! Hello freemarker! Hello jFreeChart!&quot;);
                templateBO.setFreeMarkerUrl(&quot;http://www.zheng-hang.com/chm/freemarker2_3_24/ref_directive_if.html&quot;);
                templateBO.setITEXTUrl(&quot;http://developers.itextpdf.com/examples-itext5&quot;);
    
    templateBO.setJFreeChartUrl(&quot;http://www.yiibai.com/jfreechart/jfreechart_referenced_apis.html&quot;);
        templateBO.setImageUrl(&quot;https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png&quot;);
        
        
             List<String> scores=new ArrayList<String>();
                scores.add(&quot;90&quot;);
                scores.add(&quot;95&quot;);
                scores.add(&quot;98&quot;);
                templateBO.setScores(scores);
                List<Line> lineList=getTemperatureLineList();
                TemperatureLineChart lineChart=new TemperatureLineChart();
                String picUrl=lineChart.draw(lineList,0);//自定义的数据画图
                templateBO.setPicUrl(picUrl);
                String path= kit.createPDF(templateBO,&quot;hello.pdf&quot;);
            System.out.println(path);
        
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>  <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">void</span> main(<span class="hljs-keyword">String</span>[] args) {
         ReportKit360 kit=<span class="hljs-keyword">new</span> ReportKit360();
                TemplateBO templateBO=<span class="hljs-keyword">new</span> TemplateBO();<span class="hljs-comment">//配置模板数据</span>
                templateBO.setTemplateName(<span class="hljs-string">"Hello iText! Hello freemarker! Hello jFreeChart!"</span>);
                templateBO.setFreeMarkerUrl(<span class="hljs-string">"http://www.zheng-hang.com/chm/freemarker2_3_24/ref_directive_if.html"</span>);
                templateBO.setITEXTUrl(<span class="hljs-string">"http://developers.itextpdf.com/examples-itext5"</span>);
    
    templateBO.setJFreeChartUrl(<span class="hljs-string">"http://www.yiibai.com/jfreechart/jfreechart_referenced_apis.html"</span>);
        templateBO.setImageUrl(<span class="hljs-string">"https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"</span>);
        
        
             List&lt;<span class="hljs-keyword">String</span>&gt; scores=<span class="hljs-keyword">new</span> ArrayList&lt;<span class="hljs-keyword">String</span>&gt;();
                scores.<span class="hljs-built_in">add</span>(<span class="hljs-string">"90"</span>);
                scores.<span class="hljs-built_in">add</span>(<span class="hljs-string">"95"</span>);
                scores.<span class="hljs-built_in">add</span>(<span class="hljs-string">"98"</span>);
                templateBO.setScores(scores);
                List&lt;Line&gt; lineList=getTemperatureLineList();
                TemperatureLineChart lineChart=<span class="hljs-keyword">new</span> TemperatureLineChart();
                <span class="hljs-keyword">String</span> picUrl=lineChart.<span class="hljs-title">draw</span>(lineList,<span class="hljs-number">0</span>);<span class="hljs-comment">//自定义的数据画图</span>
                templateBO.setPicUrl(picUrl);
                <span class="hljs-keyword">String</span> path= kit.createPDF(templateBO,<span class="hljs-string">"hello.pdf"</span>);
            System.out.<span class="hljs-built_in">println</span>(path);
        
        }
</code></pre>
<p>六、生成效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVMA8j?w=1655&amp;h=1018" src="https://static.alili.tech/img/bVMA8j?w=1655&amp;h=1018" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>七、项目完整代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、github地址：https://github.com/superad/pdf-kit
2、项目git地址：git@github.com:superad/pdf-kit.git
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>、github地址：https:<span class="hljs-comment">//github.com/superad/pdf-kit</span>
<span class="hljs-number">2</span>、项目git地址：git@github<span class="hljs-selector-class">.com</span>:superad/pdf-kit<span class="hljs-selector-class">.git</span>
</code></pre>
<p>八、遇到的坑：</p>
<p>1、FreeMarker配置模板文件样式，在实际PDF生成过程中，可能会出现一些不一致的情形，目前解决方法，就是换种方式调整样式。</p>
<p>2、字体文件放在resource下，在打包时会报错，运行mvn -X compile 会看到详细错误：<br>  这是字体文件是二进制的，而maven项目中配置了资源文件的过滤，不能识别二进制文件导致的，<br>  plugins中增加下面这个配置就好了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
    </resources>
    <!--增加的配置,过滤ttf文件的匹配-->
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-resources-plugin</artifactId>
            <version>2.7</version>
            <configuration>
                <encoding>UTF-8</encoding>
                <nonFilteredFileExtensions>
                    <nonFilteredFileExtension>ttf</nonFilteredFileExtension>
                </nonFilteredFileExtensions>
            </configuration>
        </plugin>
    </plugins>
</build>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">build</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">resources</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">resource</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">directory</span>&gt;</span>src/main/resources<span class="hljs-tag">&lt;/<span class="hljs-name">directory</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">filtering</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">filtering</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">resource</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">resources</span>&gt;</span>
    <span class="hljs-comment">&lt;!--增加的配置,过滤ttf文件的匹配--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">plugins</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">plugin</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.apache.maven.plugins<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>maven-resources-plugin<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.7<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">configuration</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">encoding</span>&gt;</span>UTF-8<span class="hljs-tag">&lt;/<span class="hljs-name">encoding</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">nonFilteredFileExtensions</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">nonFilteredFileExtension</span>&gt;</span>ttf<span class="hljs-tag">&lt;/<span class="hljs-name">nonFilteredFileExtension</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">nonFilteredFileExtensions</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">configuration</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">plugin</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">plugins</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">build</span>&gt;</span>
</code></pre>
<p>3、PDF分页配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  在ftl文件中，增加分页标签： <span style=&quot;page-break-after:always;&quot;></span>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  在ftl文件中，增加分页标签： <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"page-break-after:always;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</code></pre>
<p>九、 完整maven配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--pdf生成 itext-->
  
 <dependency>
        <groupId>com.itextpdf</groupId>
        <artifactId>itextpdf</artifactId>
        <version>5.4.2</version>
     </dependency>
 <dependency>
    <groupId>com.itextpdf.tool</groupId>
    <artifactId>xmlworker</artifactId>
    <version>5.4.1</version>
</dependency>
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itext-asian</artifactId>
    <version>5.2.0</version>
</dependency>
<dependency>
    <groupId>org.xhtmlrenderer</groupId>
    <artifactId>flying-saucer-pdf</artifactId>
    <version>9.0.3</version>
</dependency>
<!--freemarker-->
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.26-incubating</version>
</dependency>
<!--jfreechart-->
<dependency>
    <groupId>jfreechart</groupId>
    <artifactId>jfreechart</artifactId>
    <version>1.0.0</version>
</dependency>
<!--log-->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-core</artifactId>
    <version>1.0.13</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.0.13</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-access</artifactId>
    <version>1.0.13</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.5</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>log4j-over-slf4j</artifactId>
    <version>1.7.21</version>
</dependency>
<!--util-->
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>20.0</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.14.8</version>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-io</artifactId>
    <version>1.3.2</version>
</dependency>
<dependency>
    <groupId>commons-lang</groupId>
    <artifactId>commons-lang</artifactId>
    <version>2.6</version>
</dependency>
<!--servlet-->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
</dependency>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--pdf生成 itext--&gt;</span>
  
 <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.itextpdf<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>itextpdf<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>5.4.2<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.itextpdf.tool<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>xmlworker<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>5.4.1<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.itextpdf<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>itext-asian<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>5.2.0<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.xhtmlrenderer<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>flying-saucer-pdf<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>9.0.3<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-comment">&lt;!--freemarker--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.freemarker<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>freemarker<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.3.26-incubating<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-comment">&lt;!--jfreechart--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>jfreechart<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>jfreechart<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.0.0<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-comment">&lt;!--log--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>ch.qos.logback<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>logback-core<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.0.13<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>ch.qos.logback<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>logback-classic<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.0.13<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>ch.qos.logback<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>logback-access<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.0.13<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.slf4j<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>slf4j-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.7.5<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.slf4j<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>log4j-over-slf4j<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.7.21<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-comment">&lt;!--util--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.google.guava<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>guava<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>20.0<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.projectlombok<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>lombok<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.14.8<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.apache.commons<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>commons-io<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.3.2<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>commons-lang<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>commons-lang<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.6<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
<span class="hljs-comment">&lt;!--servlet--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>javax.servlet<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>servlet-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.5<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
java根据模板动态生成PDF

## 原文链接
[https://segmentfault.com/a/1190000009160184](https://segmentfault.com/a/1190000009160184)

