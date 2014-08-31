---
layout: post
title:  "Compile Vim on Mac OS Mavericks"
date:   2014-08-05 00:00:00
categories: programming
---

os_unix.c

patch

{% highlight bash %}
+--- a/src/os_unix.c  2013-06-13 16:50:33.000000000 +0200
++++ b/src/os_unix.c  2013-06-13 16:50:40.000000000 +0200
+@@ -18,6 +18,10 @@
++#if defined(__APPLE__)
++#include <AvailabilityMacros.h>
++#endif
{% endhighlight %}

{% highlight bash %}
--- a/src/os_unix.c     Fri Jun 14 22:48:54 2013 +0200
+++ b/src/os_unix.c     Sat Jun 15 09:04:55 2013 -0500
@@ -827,7 +827,7 @@
-       extern int sigaltstack __ARGS((const struct sigaltstack *ss, struct sigaltstack *oss));
+       extern int sigaltstack __ARGS((const stack_t *restrict ss, stack_t *restrict oss));
{% endhighlight %}

configure
install at /opt/local
{% highlight bash %}
./configure --with-features=huge \
            --enable-multibyte \
            --enable-rubyinterp \
            --enable-pythoninterp \
            --with-python-config-dir=/usr/lib/python2.7/config \
            --enable-cscope --prefix=/opt/local
{% endhighlight %}
