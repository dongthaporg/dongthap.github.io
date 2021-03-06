---
title:      A personal API
date:       2019-12-02
tags:       digtal sharecropping, ownership, self-host
tldr:       You are the operating system
color:      red
published:  true
---

## Inspiration

Shortly after [revisiting](/2019/future-of-the-operating-system-revisited-i "The Future of the Operating System: Revisited, Part 1") my thoughts about the future of operating systems I was pestered with a recurring thought; what if one had a personal API sitting on a $5/month VPS (virtual private server) and interfaced with it for nearly everything they do online? It wasn't far-fetched for me to then imagine this personal API becoming more of a personal OS in a way (or maybe stylized, personalOS). With that in mind I realized that when thinking about updating [my personal web page](https://webb.page "My web page is Webb.Page! Hehehe") I didn't want to update the content manually. Rather, I'd want to update an API and have my site(s) automatically update. **Oh yeah**, why _not_ have multiple sites update?

A personal API would make it easy for people to decentralize parts of their digital lives. There are companies built upon the concept of decentralization and that's promising. A rising tide raises all ships, as they say, and I can see a day where non-technical people are spinning up servers as much as they're migrating data to a new smartphone (well, if they did all this via a nice UI).

## Use Cases

Here's a use case: I'm signed up to several social networks, forums, and I have a couple websites. I'm a digital tastemaker and pride myself on being current and relevant. However, updating my account bio across these platforms is a 20-minute task that I dread doing. Never fear for my API has a biography module! Realistically, all the platforms I frequent won't have an API I can connect my own to, but a handful will. My personal API sends out update requests to the platforms it is connected to and updates my bio section when I publish the relevant changes to my API.

That example may be a little contrived so let's try another one: I'm a developer who prefers to self-host things whenever possible. I am also quite lazy and live by DRY (don't repeat yourself) and KISS (keep it simple, silly) principles to the extent I can without much difficulty. I'm also fatigued and distrustful of the capability of online services in general to keep my data safe. If I trust nothing else I at least trust myself and a code base I can peruse.

## Version Alpha

_Please keep in mind that this is still a super early idea and the purpose of this post is to get the particulars fleshed out._

What follows is my proposed folder structure of the personal API. Modules come in two types: purpose and utility. Utility modules allow the purpose modules to do their thing, like retrieving/modifying/storing data (on DigitalOcean's Spaces, Amazon's S3, or your own storage location). Ideally you should never have to touch those modules unless you wanted to improve upon it or fork your own version. Purpose modules can be anything you think of and the examples I listed could be your personal Medium, Pinboard/Pinterest, Things, Spotify, Flickr/Instagram, Last.fm, and so on.

```text
api
?????? ???
?????? modules
???  ?????? purpose
???  ???  ?????? blog
???  ???  ?????? bookmarks
???  ???  ?????? music
???  ???  ?????? photos
???  ???  ?????? portfolio
???  ???  ?????? reminders
???  ???  ?????? scrobbler
???  ???  ?????? status
???  ?????? utility
???     ?????? database
???     ?????? storage
?????? ???
```

The purpose functions would be able to call the utility functions to, well, function. `webb.page` will be the guinea pig for the initial release of personalOS. Once it works there I will update parts of `inc.sh` and `dsgn.agency` to take advantage of it as well.

## Why Bother?

You, dear reader, are probably not terribly interested in self-hosting and dev ops. Even developers/engineers who know _how_ to do it aren't interested. Some of the common reasons against self-hosting are fear (of the work involved), apathy ("my data isn't super important anyway"), time (the only valid reason IMHO), or a combination of the three. While I understand I also think **it is incredibly important to claim your space on the Internet**. We're all [digital sharecroppers](https://info.ideagrove.com/knowledgebase/digital-marketing/what-is-digital-sharecropping-and-why-is-it-a-bad-thing "What is 'digital sharecropping' and why is it a bad thing?") so why not tend to _our own space on the 'Net_?

It's a helluva lot easier to monetize your content when it lives on your platform, or personalOS in this case. Monetization doesn't have to be your focus though. How about this: something that irritates me about Apple's Music app and iOS 13 is that I have no idea how to get my music that used to live in iTunes, onto my phone anymore. Once I build a music module for personalOS I can upload my music library to my own server and stream it on the go. The major streaming services are great and all but my music collection has rips from video game soundtracks, anime, and otherwise defunct groups with no content on these streaming services. Why would I give that up? Why **should** I?!

## Business Opportunity?

Y'know what would be nice? Having an easy way to share any files that you're hosting. Although, you may not want to expose your personal API server to the public. For this purpose, you could use a third-party site like `personal.sh` to generate shareable links (probably via `personal.sh/are`, I'm a fan of [domain hacking](https://en.wikipedia.org/wiki/Domain_hack "Explanation of 'Domain hack' on Wikipedia")).

Because the Internet is open to all, there will inevitably be disturbing/disgusting/morally-bankrupt content shared through `personal.sh`. If/when that happens, the offending user will have their IP address blacklisted and put on display at `personal.sh/it`. It's no secret that anonymity gives some people courage to behave in a way that's unbecoming.

## Prior Art

There's a company named Urbit whose mission is quite similar:

> An Urbit is a networked personal server that runs your apps and stores your data, serves as your permanent online identity and puts you back in control of your digital life under a single login.
>
> When you???re ready.
> ??? [urbit live](https://twitter.com/urbitlive/status/1192262246384230400 "'urbit live' account on Twitter")

Only problem is, their official site makes their mission [quite](https://news.ycombinator.com/item?id=21672481) [confusing](https://news.ycombinator.com/item?id=18908051) [to many](https://news.ycombinator.com/item?id=6438320). I don't know about you but if I'm entrusting my data to something I run, I want to have more than a *general idea* of how it works.

**EDIT (2019.12.05):** This post has generated lively discussion on [HackerNews](https://news.ycombinator.com/item?id=21684949) and as a result we now have more examples of prior art!

- [cjdns](https://github.com/cjdelisle/cjdns)
- [Dogsheep](https://dogsheep.github.io), by Simon Willisons
- [Islet](https://www.infoq.com/presentations/strong-types-actor-iot), by Carl Hewitt
- [libp2p](https://libp2p.io)
- [me-api](https://github.com/danfang/me-api), by Daniel Fang
- [my](https://github.com/karlicoss/my), by Dmitrii Gerasimov
- [Perkeep](https://perkeep.org)
- [SOLID (Social Linked Data)](https://solid.mit.edu), by Tim Berners-Lee
- [Syte2](https://github.com/rigoneri/Syte2) / [Syte2 for Zeit Now v2](https://github.com/jake-101/Syte2-4-Zeit2.0), by Rodrigo Neri and Jake Peterson
- [Unwalled Garden](https://unwalled.garden)
- [Yggdrasil Network](https://github.com/yggdrasil-network/yggdrasil-go)

## FIN

Elsewhere, there exists portions of the personalOS concept of various development maturation levels. To me, this is proof of the worthwhile nature of this idea. Will this likely end up sitting in a repo for years after months of initial work? Probably. Hopefully not...we'll see how it goes. ????
