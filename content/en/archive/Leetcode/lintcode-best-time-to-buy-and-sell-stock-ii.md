---
title: LintCode Best Time to Buy and Sell Stock II
tags: [LeetCode]
slug: n15zv1hxje
keywords: LeetCode
date: 2019-01-12 00:00:00
---

Given an array, its i-th element is the price of a given stock on day i.

Design an algorithm to calculate the maximum profit you can obtain. You can complete as many transactions as possible (buy and sell a stock multiple times).

Note: You cannot participate in multiple transactions simultaneously (you must sell the stock before buying again).

## Example 1:
```text
Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (stock price = 1) and sell on day 3 (stock price = 5), profit = 5-1 = 4.
Then buy on day 4 (stock price = 3) and sell on day 5 (stock price = 6), profit = 6-3 = 3.
```

## Example 2:

```text
Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (stock price = 1) and sell on day 5 (stock price = 5), profit = 5-1 = 4.
     Note that you cannot buy on day 1 and day 2 and then sell them later.
     Because this involves participating in multiple transactions simultaneously, you must sell the stock before buying again.
```
## Example 3:
```text
Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is completed, so maximum profit is 0.
```

# JavaScript

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let n = 0;
    prices.forEach((element,index) => {
        if(element < prices[index +1]){
            n =  prices[index +1] - element + n
        }
    });
    return n
}
```
