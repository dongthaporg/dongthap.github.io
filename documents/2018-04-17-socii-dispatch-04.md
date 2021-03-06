---
title:      Socii Dispatch 04
date:       2018-04-17
tags:       project
tldr:       If you want something done right...
color:
published:  true
---

In the almost two months since my last dispatch I moved my life from New England to Tennessee, started working on a new product, and learned of a couple other social networks in development. This might be a long read, make yourself comfortable.

### Why Move?
The rent was too damn high! Also, with my skills I can work anywhere. Why not live in a place where the weather is (generally) better and the price of living is more agreeable?

### New Product
While working on Socii, I made the conscious decision not to add an analytic script for two reasons:

1) **I** use ad blockers and it is safe to assume that the people who would join Socii do too. Therefore, my analytic script would be blocked. Why bother adding one in the first place?
2) Gauges (the analytics provider for all my other sites) has been sold at least three times. They could get sold to Google or Facebook at some point and I am fundamentally opposed to using their products.

However, this became a hindrance at some point because Socii would error on a route and crash (unhandled promise rejections are bad!). I started thinking about having a service that could plug into my codebase with **minimal change** while also showing me where things happen.

Enter Chew (analytics you can count on)!

![Homepage of Chew](/assets/images/2018/socii-dispatch-04-a.png)

It works by capturing the request object in your (Express 4) middleware and sending the relevant data to Chew. I spent a couple weeks working on this and it's _just about_ ready for private testing (basically, me using it on my own sites and fixing bugs that occur). All you need to get started is a free Chew account and two lines of code in your Express-based app: importing the Chew npm package and a single line in your middleware.

As usual, I learned some things along the way and I look forward to applying these new learnings to Socii. I tend to refactor (and write more code comments) as I develop so I can help my future self when something needs fixing (or removal, I love when I can remove code).

Naturally, I used Socii as a base for Chew and came up with a very basic SaaS boilerplate:

![My SaaS boilerplate, 1.0](/assets/images/2018/socii-dispatch-04-b.png)

The left side refers to self-explanatory services while the right side shows you the URLs each service would be reachable at.

The admin console is new to me and I haven't actually created one yet but I like the idea of a master interface being made available to admin users, instead of embedding admin controls inside the app. Separation of concerns, yes. More stuff to manage? Of course! The tradeoff is worth it to me.

Thanks to the power of Nginx and reverse proxies, you can run all of these on the same physical server! Probably shouldn't have the CDN there though. For Socii, I have a service that optimizes images before placing them in storage (DigitalOcean Spaces, their version of Amazon S3).

Once I have Chew launched and the notifications feature launched in Socii, I'll start working on open-sourcing my SaaS boilerplate. I just realized this is a great time to segue.

### Social Networks
I frequent HackerNews and commented on [a post](https://news.ycombinator.com/item?id=16821172) where someone listed their social network feature wishlist. Of course, I plugged Socii because it will match (most of) what they want when it is feature-complete. I fully expect downvotes and was pleasantly surprised to see the opposite occur! Furthermore, other people working on social networks reached out to me via LinkedIn and email. Unfortunately, aside from initial introductions I haven't conversed with these folks. I hope that changes soon, we could all learn from each other.

It is quite obvious that "social" is on the mind of everyone and I'm glad that people are trying their hand at improving the Internet. ????
