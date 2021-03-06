---
title:      Using nginx and express-session
date:       2018-02-10
tags:       code, tutorial
tldr:       PSA for frustrated Internet searchers
color:      green
published:  true
---

When pushing [Socii](https://hub.socii.network "Socii, the better social network") to production, I ran into a couple of problems and I'm sharing them on my blog for you (learn from my mistakes!) and me (external memory source). This post will go over how I dealt with secure sessions not working out of the box with HTTPS.

Let's start with some code. I'm using Feathers with Express but this code will still work sans Feathers:

```javascript
const app = express(feathers())
  // above removed for brevity

  // Initialize session and restore auth state
  .use(session({
    store: store,     // your session store of choice
    secret: secret,   // this should be an environment variable
    proxy: process.env.NODE_ENV !== "development",
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: process.env.NODE_ENV !== "development",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      secure: process.env.NODE_ENV !== "development"
    }
  }))
;
```

The `process.env.NODE_ENV !== "development"` is a clever shortcut I found while troubleshooting this issue. If `process.env.NODE_ENV` does not equal `development`, the result will be true in a production environment. In a development environment, the result would be false. This is assuming of course, that your development script sets the environment. Something like this in your `package.json`:

```json
{
  ...above removed for brevity

  "scripts": {
    "build": "npm run clean && npm install && npm run build-server",
    "build-server": "babel -d build server",
    "clean": "rm -rf build package-lock.json && mkdir build",
    "deploy": "vagrant push",
    "dev": "NODE_ENV=development nodemon server/index.js --ignore 'public/' --exec babel-node --presets env,stage-2",
    "sass": "sass --watch sass:public/css --style compressed",
    "start": "npm run build && NODE_ENV=production node build/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

The scripts to pay attention are `dev` and `start`. You can see that I set the node environment before running my app. And there you have it, I hope you've found this post helpful!

<br/>

Going back to the `express-session` code above, I list what most of the parameters mean:



### proxy
Trust the reverse proxy when setting secure cookies (via the "X-Forwarded-Proto" header). The default value is undefined.

- `true` The "X-Forwarded-Proto" header will be used.
- `false` All headers are ignored and the connection is considered secure only if there is a direct TLS/SSL connection.
- `undefined` Uses the "trust proxy" setting from express



### resave
Forces the session to be saved back to the session store, even if the session was never modified during the request.



### rolling
Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown.

The default value is false.

**Note** When this option is set to `true` but the `saveUninitialized` option is set to `false`, the cookie will not be set on a response with an uninitialized session.



### saveUninitialized
Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.



### httpOnly
Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.



### secure
Ensures the browser only sends the cookie over HTTPS.
