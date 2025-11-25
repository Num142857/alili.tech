---
title: LintCode Longest Common Prefix
tags: [LeetCode]
slug: an7l200dx1w
keywords: LeetCode
date: 2019-01-19 00:00:00
---

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

## Example 1:
```text
Input: ["flower","flow","flight"]
Output: "fl"
```

## Example 2:
```text
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```


Note:

All given inputs are in lowercase letters a-z.



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
    while (strs[0][index]) {     // Use first word as baseline
        current = strs[0][index]; // Use first word as baseline
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
