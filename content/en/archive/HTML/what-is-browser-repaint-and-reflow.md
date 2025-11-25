---
title: What is Browser Repaint and Reflow
tags: [HTML]
slug: 45db7962
keywords: HTML,Browser Features,Repaint,Reflow
date: 2016-04-25 19:33:33
---

# Repaint and Reflow Definitions

- Repaint: When current element's style (background color, font color, etc.) changes, we only need to re-render the changed element, repaint has smaller impact on browser performance, so generally not considered.
　　Repaint situations: Changing container's appearance style, etc., like background: black, etc. Changing appearance, not changing layout, not affecting other dom.

- Reflow: Process where browser recalculates element positions and geometric structure in document to re-render part or all of document. Because reflow may cause entire dom tree reconstruction, it's a major performance killer. An element's reflow causes subsequent reflow of all its child elements and ancestors immediately following it in DOM.
  

## Browser Rendering Process　　

Rendering: Process where browser displays HTML code in browser window according to css defined rules 

## Browser Parsing HTML Basic Process:


1. User enters URL, browser sends request to server, server returns html file

2. Browser loads html code, finds a tag in tags referencing external css file

3. Browser sends css file request, server returns this css file

4. Browser continues loading html code, and css file already obtained, can render page

5. Browser finds a tag in code referencing an image, sends request to server. At this time browser won't wait for image download to complete, but continues rendering subsequent code

6. Server returns image file, because image occupies certain area, affects subsequent paragraph layout, so browser needs to go back and render this part of code

7. Browser finds a script tag containing a line of javascript code, quickly runs it

8. Javascript script executes this statement, commands browser to hide a certain element in code, tragedy, suddenly one element less, browser has to re-render this part of code
9. Finally </html> arrives, browser tears streaming 

10. Wait, not done yet, user clicks a "change theme" button in interface, javascript makes browser change css path in a tag

11. Browser gathers everyone present: "Everyone needs to pack up, we need to start over", browser requests new css file from server, re-renders page When page layout changes, browser goes back to re-render, this is why pages become slow.



##  Operations That Trigger Reflow

1. Resizing the window (Resizing the window)

2. Changing the font (Changing the font)

3. Adding or removing stylesheets (Adding or removing a stylesheet)

4. Content changes, like user typing text in input box (Content changes, such as a user typing text in an input box)

5. Activating CSS pseudo classes, like :hover (in IE activation of sibling node pseudo classes) (Activation of CSS pseudo classes such as :hover (in IE the activation of the pseudo class of a sibling)

6. Manipulating class attribute (Manipulating the class attribute)

7. Script manipulating DOM (A script manipulating the DOM)

8. Calculating offsetWidth and offsetHeight properties (Calculating offsetWidth and offsetHeight)

9. Setting style attribute values (Setting a property of the style attribute)

10. Fixed positioned elements, will continuously reflow when dragging scrollbar


Reference:

[http://blog.sina.com.cn/s/blog_8dace7290102wezv.html](http://blog.sina.com.cn/s/blog_8dace7290102wezv.html)

[http://www.cnblogs.com/jyybeam/p/5776667.html](http://www.cnblogs.com/jyybeam/p/5776667.html)

