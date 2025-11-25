---
title: What Are Browser Repaint and Reflow
tags: [HTML]
slug: browser-repaint-and-reflow
keywords: HTML,Browser Features,Repaint,Reflow
date: 2016-04-25 19:33:33
---
# Definition of Repaint and Reflow

- Repaint: When the style of the current element (background color, font color, etc.) changes, we only need to re-render the changed element. Repaint has less impact on browser performance, so it's generally not considered.
   Situations that cause repaint: changing container appearance styles, such as background: black, etc. Changing appearance without changing layout, not affecting other DOM elements.

- Reflow: The process by which the browser recalculates the position and geometric structure of elements in the document to re-render part or all of the document. Because reflow may cause the entire DOM tree to be reconstructed, it's a major performance killer. A reflow of one element causes subsequent reflows of all its child elements and ancestor elements that follow it in the DOM.
  


## Browser Rendering Process　　

Rendering: The process by which the browser displays HTML code according to CSS-defined rules in the browser window

## Basic Process of Browser Parsing HTML:


1. User enters URL, browser sends request to server, server returns HTML file

2. Browser loads HTML code, finds a tag referencing an external CSS file

3. Browser sends request for CSS file, server returns this CSS file

4. Browser continues loading part of the HTML code, and the CSS file is already obtained, can render the page

5. Browser finds a tag referencing an image in the code, sends request to server. At this point, the browser won't wait for the image to download, but continues rendering the following code

6. Server returns image file, since the image occupies a certain area, affecting the layout of subsequent paragraphs, the browser needs to go back and render this part of the code

7. Browser finds a script tag containing a line of JavaScript code, quickly runs it

8. JavaScript script executes this statement, commands browser to hide a certain element in the code, tragedy strikes, suddenly one element is missing, browser has to re-render this part of the code
9. Finally the closing tag arrives, browser tears streaming down

10. Wait, not done yet, user clicks a "change theme" button in the interface, JavaScript makes browser change the CSS path in a tag

11. Browser gathers everyone present: "Folks need to pack up, we have to start over", browser requests new CSS file from server, re-renders the page. When page layout changes, browser goes back to re-render, this is why pages become slow.



## Operations That Trigger Reflow

1. Resizing the window

2. Changing the font

3. Adding or removing stylesheets

4. Content changes, such as user typing text in an input box

5. Activating CSS pseudo-classes, such as :hover (in IE, activation of sibling pseudo-classes)

6. Manipulating the class attribute

7. Script manipulating the DOM

8. Calculating offsetWidth and offsetHeight properties

9. Setting values of style attribute properties

10. Elements with fixed positioning will continuously reflow when dragging the scrollbar


References:

[http://blog.sina.com.cn/s/blog_8dace7290102wezv.html](http://blog.sina.com.cn/s/blog_8dace7290102wezv.html)

[http://www.cnblogs.com/jyybeam/p/5776667.html](http://www.cnblogs.com/jyybeam/p/5776667.html)

