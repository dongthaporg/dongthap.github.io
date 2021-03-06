---
title:      Socii Dispatch 03
date:       2018-02-24
tags:       project
tldr:       Ship often!
color:
published:  true
---

I have been cranking out features and improvements over the past month. As I gear up for a major feature release, I'd like to quickly run through what's in production now and what I've learned since my last dispatch.



### Top 8
From the ashes of Myspace comes a feature I've missed dearly in every social network since. Why is this important to me? Well, sometimes I forget my friends' usernames. I never forget a face. With Socii you can change your username whenever you want so for people you _really_ want to keep in contact with (outside of real-life phone numbers and such), adding them to your top 8 is the way to go.

![🎶 I'm bringing Myspace back, yeah!](/assets/images/2018/socii-dispatch-03-a.jpg)



### Performance
Three notable changes fall under this section.

First, [I got rid of the WebP decoder](https://hub.socii.network/NetOpWibby/status/jdnns5gm000zhxbk97iymsgc "my post on Socii about the removal of the WebP decoder") (and fixed an issue that arose on account of me doing too much in one commit). It was a bit slow in development which should have made me realize it'd be MUCH too slow for production (even the WebAssembly-based/-compiled decoder I found wasn't good enough). Blink-based browsers (Chrome, Opera, Vivaldi, &c) were unaffected but Firefox and Safari suffered _greatly_. Personally, I use Firefox as my main browser so I felt this pain and **hated** it.

![Bye bye WebP...for now](/assets/images/2018/socii-dispatch-03-b.jpg)

Second, I implemented pagination. Prior to this, the hub (homepage of [the actual network](https://hub.socii.network "Socii, the social network"), not [the marketing site](https://socii.network "Socii, the marketing site for the social network")) was loading every. Single. Post. It was a friggin' _mess_ tbh. Now, I'd like to have done this in my GraphQL service but I don't understand enough about it to implement cursor-based paging so the solution I came up with is kinda hacky. It works _for now_ but I'm on the lookout for tutorials or code samples that implement **proper** GraphQL pagination with `graphql.js` (even the official "[how to](https://www.howtographql.com "How to GraphQL")" site is devoid of this information).

Finally, I created a custom script bundler to minify and combine front-end JavaScript so there would be far less render-blocking scripts to deal with. All the bundling frameworks like Rollup, Webpack, &c, do too much while also not being flexible enough to do what I wanted to do.

I'm still working on improving performance. No one wants to visit a sluggish site, it's a waste of your time.



### Timelines
You can now toggle between the global timeline and your top 8 timeline (well, if you've _added_ anyone to that list).



### Responsiveness
As a front-end designer, it hurt me to publish something that didn't work well at smaller browser widths/breakpoints. I was _finally_ able to get a **lot** of the stylistic things that were bothering me taken care of. Looking at these screenshots though, I gotta rethink the post footer. It looks too fat, I think both bits of info can fit on the same line.

![Ooh, dat sweet responsive network](/assets/images/2018/socii-dispatch-03-c.png)



### Things I've learned
1. Ship small features often. Not only do you get a sense of progression, but you can find issues quickly should you accidentally push errors into production.
2. Image uploading ~~in a [performant](http://boulter.com/blog/2004/08/19/performant-is-not-a-word "Performant is not a word") way~~ that performs well with WebSockets is harder than I thought. I _think_ I have something figured out but I have some non-Socii work to catch up on before I test my theory.



That's all for now, see ya! 🕸
