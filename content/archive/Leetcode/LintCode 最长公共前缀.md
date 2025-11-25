---
title: LintCode 最长公共前缀
tags: [LeetCode]
slug: an7l200dx1w
keywords: LeetCode
date: 2019-01-19 00:00:00
---

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

## 示例 1:
```text
输入: ["flower","flow","flight"]
输出: "fl"
```

## 示例 2:
```text
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```


说明:

所有输入只包含小写字母 a-z 。



# JavaScript

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if(strs.length === 0)return ""
    let current  = ""
    let prefix = ""
    let index = 0;
    let isTrue = true;
    while (strs[0][index]) {     //以第一个单词为基准
        current = strs[0][index]; // 以第一个单词为基准
        for(let i = 0; i < strs.length; i++){
            if((strs[i] || "")[index] !== current){
                isTrue = false;
                break
            }

        }
        if(isTrue){
            index ++;
            prefix = prefix + current;
         }else{
             break
         }
    }
    return prefix
};
```