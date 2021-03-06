---
title:      Easy deployment with Vagrant
date:       2017-12-05
tags:       tutorial
tldr:       Quite irritated I wasn't doing this already
color:      blue
published:  true
---

> [Vagrant](https://www.vagrantup.com "Vagrant website") provides easy to configure, reproducible, and portable work environments built on top of industry-standard technology and controlled by a single consistent workflow to help maximize the productivity and flexibility of you and your team.

This is fine and dandy but, I'm not on a team with my side projects. I just want to _quickly push my code to a server and keep it moving_. Here's how I did it.



### Installation
Head on over to HashiCorp's [download page for Vagrant](https://www.vagrantup.com/downloads.html "Download Vagrant...to install it!") and select the build for your OS flavor of choice. After the installation is complete, open a Terminal and type `vagrant -v` to ensure installation was successful. If you see a version number, you're good to go.



### Setup
`cd` into the folder you want to deploy and initialize a Vagrant deployment script with `vagrant init`. This will automatically generate a `Vagrantfile` and it is in here that you'll customize your deployment strategies. [Here](https://www.vagrantup.com/docs/push/ftp.html "FTP/SFTP deployment strategy documentation for Vagrant") are all the parameters you can use for SFTP (which is the way I'm deploying my projects). There's documentation for Heroku and inline scripts as well. Here's my deployment script for `thewebb.blog`:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "base"

  config.push.define "ftp" do |push|
    push.host = "thewebb.blog"
    push.username = "root"
    push.password = "~/.ssh/id_rsa"
    push.secure = true
    push.destination = "/var/www/twb"
    push.exclude = ".DS_Store"
    push.exclude = ".git"
    push.exclude = ".gitignore"
    push.exclude = ".sass-cache"
    push.exclude = "[documents]"
    push.exclude = "node_modules"
    push.exclude = "package-lock.json"
    push.exclude = "Vagrantfile"
  end
end
```

You can probably guess what's going on here, but I'll walk you through it anyway.

I'm connected to `thewebb.blog` via secure FTP, or SFTP, with an SSH key (because passwords are lame). The directory I want to push data to on `thewebb.blog` has a path of `/var/www/twb`. There are a couple of files and folders I don't want/need on my server (mostly the contents of my `.gitignore`, along with that file itself).

Please refer to [the documentation](https://www.vagrantup.com/docs/index.html "Vagrant documentation") for in-depth descriptions about other parameters like `config.vm.box` (this line is required btw).



### Takeoff
I use Node.js for practically everything I do so I added a nifty deploy command to my `package.json`. Here's the relevant bit:

```json
{
  "scripts": {
    "deploy": "vagrant push"
  }
}
```

And that's it!

To be quite honest, me using Vagrant feels like the equivalent of buying an iMac Pro to browse the Internet but, their tagline is "Deployment environments made easy". And guess what? It works _damn good_. What's easier than `npm run deploy`?



### One more thing
When you deploy your project, you'll see a message in Terminal stating what's happening, but nothing else. It would be _nice_ to have a progress bar to indicate...well, progress but it doesn't take too long (for my projects). Also, automatic reading of my `.gitignore` file so I don't have to manually include what I want excluded.

Another thing that would be nice is something where my server could detect changes and run commands. For example, let's say I add new modules to this blog. I'll have to install them on my server as well. Currently, I have to SSH into it and run whatever extra steps to ensure updates and I _reeeeeally_ don't feel like doing that. You could argue that I could just use HashiCorp's other tools like Nomad and Consul but 1) it was too confusing to set up and I realized 2) those tools are **definitely** overkill for what I work on.

SO! I have caused myself **much** pain to create a system that allows these automatic updates to happen. Just deploy and your server will take care of the rest. During my failed attempts at utilizing other tools, I was inspired by the ease with which I deployed with Vagrant via a simple file. It's still in development but I've been working on it for the past day and a half. Great progress has been made, stay tuned! ????
