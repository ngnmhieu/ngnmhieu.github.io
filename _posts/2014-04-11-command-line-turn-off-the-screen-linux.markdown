---
layout: post
title:  "Command-line turn off the screen in Linux"
date:   2014-04-11 23:30:06
categories: linux
---

I usually using 2 machines at a time - a desktop and a laptop, keep them side by side with synergy as the "bridge". My laptop doesn't have a button for turning off the monitor when I don't need it. And the command for doing that in linux is so long. Here it is:

{% highlight bash %}
~$ xset dpms force off
{% endhighlight %}

I prefer making a shortcut for it so that I could execute it quickly from a app launcher (Alt-F2 in ubuntu). Here's how I do that:

{% highlight bash %}
~$ echo "xset dpms force off" > scroff
~$ chmod +x scroff
~$ sudo mv scroff /usr/bin
{% endhighlight %}

The script is named "scroff",  which you can change to whatever name you want. I want to keep it short-and-simple. It works locally, but for it to work via ssh, you need to export the display first:

{% highlight bash %}
~$ echo "export DISPLAY=:0;xset dpms force off" > scroff
~$ chmod +x scroff
~$ sudo mv scroff /usr/bin
{% endhighlight %}

Now you can turn the monitor off/on remotely via ssh like so:

{% highlight bash %}
~$ ssh [user]@[machine_ip] scroff
{% endhighlight %}

and turn on:

{% highlight bash %}
~$ ssh [user]@[machine_ip] scron
{% endhighlight %}

Note that the scron is similar to scroff, just replace all the "off" => "on". 
