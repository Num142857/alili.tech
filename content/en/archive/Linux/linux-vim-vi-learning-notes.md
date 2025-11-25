---
title: Linux - vim vi Learning Notes
tags: [Linux]
slug: linux-vim-vi-learning-notes
keywords: Linux,Centos,vi,vim
date: 2018-02-17 20:32:05
---
Often on Mac or Linux, because we frequently need to use it, but its operations differ greatly from other editors, so I'll specifically learn it. When using it, won't be too confused. In learning, need to practice more and use more to become proficient.


# Three Modes of vim/vi

* Command mode
* Insert mode
* Last line mode

## Command Mode
When we use vim to open a file, we enter command mode. In command mode, we cannot input/edit text.
In command mode, we can input the following to switch to other modes

### Switch to Insert Mode
```
i
```
To return to command mode, press the esc key.

### Switch to Last Line Mode

```
:
```
To return to command mode, press the esc key.

# Specific Operations

## Cursor Movement
For cursor movement, we can use regular arrow keys, or vi's unique way

| Key | Action |
| --- | --- |
| h or Left Arrow (←) | Move cursor left one character |
| j or Down Arrow (↓) | Move cursor down one character |
| k or Up Arrow (↑) | Move cursor up one character |
| l or Right Arrow (→) | Move cursor right one character |


## Various Insert Mode Switching

| Key | Action |
| --- | --- |
| i, I | Enter insert mode: i is 'input from current cursor position', I is 'start input at first non-space character of current line' |
| a A | a is 'start input from next character after current cursor', A is 'start input from last character of current line'. (Common) |
| o, O | Enter insert mode. This is uppercase/lowercase of letter o. o is 'input new line below current cursor line'; O is input new line above current cursor line! (Common) |
| r, R | Replace mode: r only replaces the character at cursor once; R continuously replaces text at cursor until ESC is pressed; (Common) |
| [Esc] | Exit edit mode, return to normal mode (Common) |


## Copy and Delete
| Key | Action |
| --- | --- |
| x, X | In a line, x deletes one character backward (equivalent to [del] key), X deletes one character forward (equivalent to [backspace] key) (Common) |
| nx | n is a number, continuously delete n characters backward. For example, to continuously delete 10 characters, '10x'. |
| dd | Delete the entire line where cursor is (Common) |
| ndd | n is a number. Delete n lines downward from cursor, e.g. 20dd deletes 20 lines (Common) |
| d1G | Delete all data from cursor to first line |
| dG | Delete all data from cursor to last line |
| d$ | Delete from cursor position to last character of the line |
| d0 | That's number 0, delete from cursor position to first character of the line |
| yy | Copy the line where cursor is (Common) |
| nyy | n is a number. Copy n lines downward from cursor, e.g. 20yy copies 20 lines (Common) |
| y1G | Copy all data from cursor line to first line |
| yG | Copy all data from cursor line to last line |
| y0 | Copy all data from character at cursor to beginning of line |
| y$ | Copy all data from character at cursor to end of line |
| p, P | p pastes copied data on next line after cursor, P pastes on line before cursor! For example, if cursor is on line 20, and 10 lines are copied. After pressing p, those 10 lines will be pasted after original line 20, i.e. starting from line 21. But if P is pressed? Then original line 20 will be pushed to become line 30. (Common) |
| J | Combine cursor line and next line data into same line |
| c | Repeat delete multiple data, e.g. delete 10 lines downward, [ 10cj ] |
| u | Undo previous action. (Common) |
| [Ctrl]+r | Redo previous action. (Common) |
| . | Don't doubt! This is a period! Means repeat previous action. If you want to repeat delete, repeat paste, etc., just press period '.'! (Common) |

> u and [Ctrl]+r are very commonly used commands! One is undo, the other is redo～ Using these two function keys, your editing, hehe! Very happy!


## Save Exit
| Key | Action |
| --- | --- |
| :w | Write edited data to hard disk file (Common) |
| :w! | If file attribute is 'read-only', force write to file. However, whether it can be written still depends on your file permissions for that file! |
| :q | Leave vi (Common) |
| :q! | If file was modified but don't want to save, use ! to force exit without saving file. |
| :wq | Save then exit, if :wq! then force save then exit (Common) |
| ZZ | This is uppercase Z! If file hasn't changed, exit without saving, if file has been changed, save then exit! |
| :w [filename] | Save edited data as another file (similar to save as) |
| :r [filename] | In edited data, read in another file's data. That is, add 'filename' file content after cursor line |
| :n1,n2 w [filename] | Save content from n1 to n2 as filename file. |
| :! command | Temporarily leave vi to command line mode to execute command's display result! For example |
| ':! ls /home' | Can view /home directory ls output file information in vi! |

> Note, that exclamation mark (!) in vi often has the meaning of 'force'～



## Line Number Display/Hide
| Key | Action |
| --- | --- |
| :set nu | Display line numbers, after setting, will display line number prefix on each line |
| :set nonu | Opposite of set nu, cancel line numbers!

