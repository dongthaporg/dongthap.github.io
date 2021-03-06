---
title:      In favor of small modules and plumbing
date:       2020-02-27
tags:       development, process
tldr:       Don't you want a beautiful chest of drawers?
color:      gold
published:  true
---

In the JavaScript/Node.js community there have been fiery debates over whether publishing super-focused modules to npm is a positive thing or not. Installing a module that consists of maybe 50 lines of code or so but does a specific thing you need **well** is a good thing. No need to copy/paste the same lines of code in all of your projects. Then again, does publishing such modules pollute the world's most popular JavaScript package manager and snatch awesome package names away from multi-faceted modules? As with most things, it boils down to *perspective*. This post examines how I used to be of the mindset that publishing a plethora of "focused" modules is a waste of time but now think is a fantastic idea.

## The `left-pad` incident, &c

Azer Koçulu, the developer of a module called `left-pad`, [unpublished](https://github.com/left-pad/left-pad/issues/4 "npmjs.org tells me that left-pad is not available (404 page)") this and the other 200+ modules he wrote from npm. It was a retaliatory move due to the fact that npm (the company) reverted ownership of another module of his, `kik`, to a company of the same name. To [quote](https://kodfabrik.com/journal/i-ve-just-liberated-my-modules "I've Just Liberated My Modules") the man himself:

> This situation made me realize that NPM is someone's private land where corporate is more powerful than the people, and I do open source because, Power To The People.

To be honest, I don't blame him. The `kik` situation was rather messed up in my opinion but when there are patent trolls involved, _someone_ is getting fucked (see npm's [response](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm "kik, left-pad, and npm")). Unfortunately, Azer's actions broke a significant amount of larger modules that depended upon the existence of `left-pad` and the Internet seemed to quite literally blow up for a day. Pundits published think pieces to Medium, Twitter threads proliferated, and insults/disdain toward Azer flew online for days. I'll admit, I got caught up in the frenzy and did a lot of [SMDH](https://www.urbandictionary.com/define.php?term=SMDH "Urband Dictionary definition for SMDH") towards Azer, npm, and kik.

At the time I was fully content with finding small utility modules like `left-pad` for inclusion within my projects and rather than installing them, I opted to extract the source code and place them in my projects directly. I did this for a few reasons:

1. Prevent potential fallout from an unpublish from happening to me.
2. Protection against a module creator giving up ownership to a spammer/hacker.
3. Quality control. Seriously, there is almost too much code out there that mixes tabs/spaces, single/double quotes, semi-colon/no semi-colon, snake/camel casing, and so on. Often in the same damn file! Gross.

This is not to say that my own code is flawless. I'll look back on my old code and think it's shit but at least it's _consistent_ shit.

## Turning Point

A couple weeks ago I was returning to work on an API rewrite in progress and something would not compile. I was befuddled because I have several API projects that more or less share the same core. That's when I thought, "Why **aren't** most of the these utility functions their own modules?" This question stuck in my mind as I browsed the web and I remembered to look up a rather prolific JavaScript developer by the name of Sindre Sorhus. The man has over one **_thousand_** modules published on npm and all of them are small and/or focused (does one thing well, no bells and whistles). [Here](https://github.com/sindresorhus/ama/issues/10#issuecomment-117766328 "One-line node modules") is his rationale for creating them:

> You make small focused modules for reusability and to make it possible to build larger more advanced things that are easier to reason about.

This made perfect sense to me and I had a chat with [Jesse](https://jesseyoungblood.com "Jesse's homepage") about it. He'd the same thought a year prior and started working on publishing modules from the code he was constantly copy/pasting between projects. Jesse's affirmation, coupled with Sindre's node module [boilerplate](https://github.com/sindresorhus/node-module-boilerplate "Boilerplate to kickstart creating a Node.js module") and [this tutorial](https://www.tsmean.com/articles/how-to-write-a-typescript-library "How to write a typescript library") on creating TypeScript libraries encouraged me to get started with publishing more focused modules than I had previously.

I am in the process of (hopefully) obtaining ownership of an unused (and empty) scope/organization on npm and once that happens, the nine focused modules I've written since my chat with Jesse will be live (these modules are currently published on my personal package registry). I see a couple advantages to [scoping](https://docs.npmjs.com/misc/scope "npm documentation on scopes") one's modules:

- Any cool name you can think of for your module is available
- At a glance, anyone can tell (roughly) who is responsible for the module
- Reputation building - become known for creating useful modules
- Doesn't "pollute" the npm namespace since everything's under an umbrella, so to speak

Some _disadvantages_ to this approach:

- Developers have to type extra to install your module
  - `npm i @yourScope/packageName` versus
  - `npm i packageName`
- If you have a truly unique package name and it's available, you'd be a fool to not take it

It's basically like choosing a gTLD over a classic TLD. If `webb.com` was available, I would have purchased that domain. It was not, so I purchased `webb.page`. These are both great but I was lucky that mine is a neat domain hack.

## The Bigger Picture

There's another reason I've decided to go through with all this. To quote Steve Jobs (emphasis mine):

> When you're a carpenter making a beautiful chest of drawers, you're not going to use a piece of plywood on the back, even though it faces the wall and nobody will ever see it. You'll know it's there, so you're going to use a beautiful piece of wood on the back. **For you to sleep well at night, the aesthetic, the quality, has to be carried all the way through.**

You remember that API project I mentioned earlier? I could not escape the nagging suspicion that my project could be, nay, _feel_ a helluva lot better if I knew the components used to create it were stronger. One way to ensure that is to write tests. Another way is to use a typed language...like TypeScript. And, that's exactly what I did for every module I've created leading up to this post. I suppose I just made the case for writing tests, period. 🤔

Regarding Jobs' quote, here's another way to look at it: the most beautiful hotel in the world wouldn't feel like such if all the toilets overflowed when flushed. I'm a serial creator but I've grown to enjoy working on the plumbing. 🕸

## &c

- My personal package registry is currently running on [Verdaccio](https://github.com/verdaccio/verdaccio "A lightweight private npm proxy registry") but I'm thinking of checking out [Entropic](https://github.com/entropic-dev/entropic "a package registry for anything, but mostly javascript"). We'll see.
- There's an [awesome](https://github.com/parro-it/awesome-micro-npm-packages "A curated list of small, focused npm packages.") list of other focused modules to get inspired by or use in your own projects.
- This new love of plumbing is at odds with my impatience to get at least three products I have out of beta (and to make money from them). The end goal is for these products to be as automated and fault-tolerant as possible so I can focus on customer experience. No amount of code can replace the human connection.
