---
title: slipthrough
layout: home
---

Hello, I write code and stuff.

Here are some things to look at:

{% for page in site.categories.experiments %} - 
  [{{ page.title }}]({{ page.url }}) – {{ page.date | date_to_string }}
{% endfor %}

Here are some rambling anecdotes:

{% for page in site.categories.fragments %} - 
  [{{ page.title }}]({{ page.url }}) – {{ page.date | date_to_string }}
{% endfor %}

Here I am elsewhere:

- [Twitter](http://www.twitter.com/gb_r)
- [GitHub](http://github.com/garyb)
- [Tumblr](http://things.slipthrough.net)