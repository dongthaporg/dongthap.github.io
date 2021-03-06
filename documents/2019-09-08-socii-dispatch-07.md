---
title:      Socii Dispatch 07
date:       2019-09-08
tags:       socii
tldr:       It's been a LONG road to 2.0
color:
published:  true
---

The previous version of Socii consisted of seven "microservices" and two web apps that were eventually condensed to two APIs and (hopefully) a sensible stack. This post will detail the process and why the changes were made.



## TL;DR
Old Socii was busted and didn't feel good to use. Even _I_ didn't want to use it so changes had to be made. New Socii is super pleasant to use and I'm happy again. What follows is a deep-dive into the history of the architecture and why I made the changes I made.



## 1.0
### Microservices
**Horus**: the notifier
**Hu**: the authenticator (user management)
**Nemty**: the emailer
**Ra**: the one who knows all (GraphQL)
**Seshat**: the keeper of records (post management)
**Thoth**: the media converter

### Web Apps
**Marketing**: the pretty informational site
**Network**: the actual web app

### The Rest
**DigitalOcean**: the server
**Mailgun**: backend for email delivery
**MongoDB**: the database



## How it worked
User visited `socii.network` and liked what they saw so they decided to sign up. Being a new user, they were logged in immediately. On the backend, Hu created the user and pinged Nemty with the user's email address. Nemty created and sent a welcome email to the user.

If the user decided to make a post, Seshat would get those details and save it to the database. Thoth took care of uploading the user's profile picture. Horus facilitated details of post actions (favorite, reply, &c) to Nemty. Ra was the glue that held everything together.



## What didn't work
### Microservices
Adding a feature to one microservice often meant updating nearly all of them and that grew hella tedious. When Socii 1.0 was in development the web industry was super buzzed about microservices, everywhere! They would solve all your problems! In my case, they **added** more than removed problems. It is _fully possible_ that I did not write them in the way microservices are **supposed** to be written but when most of the tutorials on the subject came from the [Medium](https://medium.com) hive mind, you can understand how good information and examples (!!) are hard to come by.

### Web Apps
Like my microservices, I did not enjoy doing a lot of work on the Network and then realizing Marketing wasn't up to date with things ranging from a shade of blue to the modules powering the app. I did a **lot** of copy/pasting and it felt like I was doing something wrong. Tedium!

### The Rest
DigitalOcean and Mailgun have been doing well for me. In fact, I believe I'm grandfathered into Mailgun's free tier due to the low volume of Socii's email output. I've experienced zero issues with email deliverability so I'd gladly pay for it (make Socii popular y'all).

MongoDB? *Sigh*

Like many front-end developers, I gravitated to it for my projects because it was the "least scary" database available. Plenty of [ORM](https://stackoverflow.com/a/1279678)s are available for it and I used [mongoose](https://github.com/Automattic/mongoose) for a while before transitioning to [mongoist](https://github.com/saintedlama/mongoist) during one of the phases of the refactor (in total, there have been at least four phases).

The issue that stumped me for _at **least** a month_ before urging me to investigate other databases involved updating the schema of posts and users. I forget the details exactly but I had a defined schema and exported the data to perform a database migration. The migration kept failing due to permission checks of some sort and no amount of search engine kung fu rescued me from my woes. Mongo is super unhelpful when things go wrong.

I ended up cursing myself for being so reliant on a database with piss-poor error messages.



## The Search
### Microservices
I had been using [ZEIT](https://zeit.co)'s [micro](https://github.com/zeit/micro)/[micro-dev](https://github.com/zeit/micro-dev) modules as the basis for my microservices but the lack of updates/[interest from the maintainers](https://github.com/zeit/micro-dev/issues/41) urged me to look elsewhere.

I also read many articles about how companies like Airbnb and Netflix managed their software, to better inform my own decisions about the future of my microservices. In the realm of that research I learned about "monorepos" with the most popular NodeJS module being [Lerna](https://github.com/lerna/lerna). I decided not to use it but to implement one of the core features, which was to put all of my microservices into one API and go from there.

### Web Apps
The original Socii made extensive use of websockets in order to provide a responsive UI. That???worked???for a while. I soon realized I was merely replicating what single-page applications do.

The web industry's favorite framework for SPAs is (was?) React and I _despise_ React. It has always seemed too bulky and I'm allergic to packages with a boatload of dependencies.

Far too many times in my web development career I have been forced to stop using a useful package because of a dependency being out of date or suffering from a vulnerability and the author/maintainers of that dependency being unresponsive or plain not caring. Bulky packages also become targets for misuse. Companies like [Snyk](https://snyk.io/) exist to help mitigate this issue but the first step, IMHO, is to limit the attack area yourself by choosing smaller (often with full feature-parity) packages.

Anyhoo, I looked at [Preact](https://github.com/preactjs/preact), [Composi](https://github.com/composi), and a lot of interesting HyperScript mini-frameworks before settling on [Mithril](https://github.com/MithrilJS/mithril.js). I really thought this was **IT**. I found the perfect front-end framework! Right?! Heh, _no_.

The original codebase was server-side rendered which meant shared links in Apple Messages and elsewhere online showed rich metadata; title of the page, description, and Socii's icon image. With Mithril, I lost all that. Frustrated once more, it was back to the drawing board.

### The Rest
Your service is only as good as your database.

Your database of choice is the jewel, the Big Kahuna, the very _foundation_ of your service. So, I tested Apple's FoundationDB. Long story short, I found it relatively easy to setup but was confused about how I'd put data into it's Document Layer (document data model on FoundationDB, implementing MongoDB's wire protocol; I'd be able to plug 'n play, basically).

However, I did find an awesome NodeJS module written by Steve Korshakov, CEO of [Openland](https://openland.com): [@openland/foundationdb](https://fdb.openland.com). Unfortunately, it didn't have Document Layer support so my search continued.

No other database looked pleasant to use (to me). One of my developer friends espoused the beauty of MariaDB but I was spoiled by ORMs. I didn't want to learn how to write weird syntax just to interface with my database (I also didn't realize at the time that [TypeORM](https://github.com/typeorm/typeorm) was a thing, which renders my previous sentence null).



## 2.0
### Microservices
Five of the original six microservices I created were condensed into a single GraphQL API. The outlier was Thoth (media converter/file management) because as great as GraphQL is, it cannot handle file uploads as easy as a standard REST API could.

Instead, this is the process: when I need to upload something (like a profile picture for instance), the upload is happening in the background as soon as possible. The response from Thoth is the resulting URL from DigitalOcean's Spaces (basically AWS) that becomes a hidden input's value that will finally get sent to the API to be inserted into the database, after a user clicks "save"/"upload".

Kind of convoluted but it works for now.

So, I now have two APIs: a GraphQL-based one (primary) and a REST-based one (file uploads). Both are built upon the [restify](https://github.com/restify/node-restify) framework (it's like Express but focused on API creation).

### Web Apps
Back at the drawing board but _fully understanding_ what my requirements were for a front-end framework, it didn't take me long to find another one of ZEIT's open-source projects, [Next](https://github.com/zeit/next.js). Alas, it was built upon React but if I could have an SSR-powered SPA I'd swallow that. And so I did until approximately a week and a half later when I came across a [blog post](https://svelte.dev/blog/sapper-towards-the-ideal-web-app-framework) comparing Next and something called "Sapper". This section of the post blew my mind (emphasis mine):

> **The same ???hello world' app that took 204kb with React and Next weighs just 7kb with Sapper.** That number is likely to fall further in the future as we explore the space of optimisation possibilities, such as not shipping any JavaScript *at all* for pages that aren't interactive, beyond the tiny Sapper runtime that handles client-side routing.

Sapper has Express-compatible middleware, making it easy to understand and customize for people who are used to using Express (and Fastify, Restify, &c). It is built upon a framework that's not _really_ a framework: Svelte. Like the name implies, Svelte compiles code to tiny, framework-less vanilla JavaScript. Quite honestly, this is everything I've been looking for; a lightweight SPA with SSR support!

With the web app framework _finally_ figured out, I had to then figure out what I wanted to do about having two front-ends to manage. And???I didn't want to manage two of them. I decided to merge them instead and deprecate the use of a sub-domain for the Network. So, if you were logged-in you would see the global feed but if you were logged-out you would see the marketing homepage. The navigation would also change accordingly.

### The Rest
The database I settled upon is [RethinkDB](https://github.com/rethinkdb). An interesting choice considering that one of the most commented issues in one of its repos on Github is titled, "[is this project dead?](https://github.com/rethinkdb/rethinkdb/issues/6747)". Well, the original company behind it is but there's still a small, vibrant community around it that's been using Rethink in production for years.

One of the great things about Rethink is the [web interface](https://rethinkdb.com/docs/administration-tools) it comes with (you can disable this if you want). This interface has a feature called "Data Explorer" and like the name implies, it allows you to test database commands (or, quickly query something from your database). Coming from a database that effectively told you nothing via opaque errors to a database that gave you the tools to succeed was a breath of fresh air and made me question why the company behind Rethink failed in the first place. The founder of the company, Slava Akhmechet, [wrote about their failure](https://www.defmacro.org/2017/01/18/why-rethinkdb-failed.html) in depth and the TL;DR is: great product, wrong time.



## The Future
I believe I have created a stable foundation for the future of Socii's development. So, what's next? A laundry list of features: images in posts, more profile customization, groups, iOS app, re-enabled JSON Feed for profiles, end-to-end encryption, &c. I don't have experience with CI/CD (Continuous Integration/Development) workflows so maybe that'll be the next thing major thing I tackle. Of course, I'll share my experiences along the way.
