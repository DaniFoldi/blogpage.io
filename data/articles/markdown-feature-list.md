blogpage.io supports all the basic CommonMark Markdown styles, and much more:

# Headings

# H1

# H1 #

H1
===

## H2

## H2 ##

H2
---

### H3

### H3 ###

#### H4

#### H4 ####

##### H5

##### H5 #####

###### H6

###### H6 ######

# Text formatting

**Bold**
__Bold__

*Italic*

_Underline_

~~Strikethrough~~

***Bold italic***

**_Bold underline_**

*_Italic underline_*

*~~Italic strikethrough~~*

# Lists

* Unordered
* List

+ Unordered
+ List

- Unordered
- List
   * Indented
- Mixed
   1. With
   2. Numbered

1. One
2. Two
   3. Three

5. Offset
5. Ordered
5. List
   * Mixed

# Horizontal Rules

___

---

***

# Typographic replacements

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'

# Blockquotes

> Blockquote

# Links

[Text](href 'title')
[Text][id]

[id]: href
[Text](href)

# Images

![Alt](src 'title')
![Alt][id]

[id]: src

![Alt](src)

# Code

`inline code`

```javascript
block code
```

# Superscript, subscript

^superscript^ text ~subscript~

# Checklist

- [ ] Incomplete
- [x] Complete

# Custom features

## Links

#tag
@author
§article

## Emoji

:) :D ;)

:joy: :cactus: :abcd:

## Highlighting

[[kbd]]
==mark==

## Spoilers

!!spoiler!!

## Footnotes

Here is a footnote reference,[^1] and another.[^longnote]

## Abbreviations

*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification
is maintained by the W3C.

## Summary

+++ Summary
Details
+++

## Deflist

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2
    Third paragraph of definition 2.

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b

## Images with predefined size

![alt](src =widthxheight)
![alt](src =width)

## Katex

Inline $x = \pi$

$$x = \pi$$

## Figures

#1[caption](src [alt])

## Gauge

@[gauge](10, caption)

## Custom embeds

@[twitter](https://twitter.com/discord/status/1277935875456811008)

apple music, instagram, youtube, codesandbox, (custom) embed
[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.
