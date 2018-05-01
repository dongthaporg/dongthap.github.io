"use strict";



//  P A C K A G E S

import glob from "glob";
import root from "app-root-path";

const log = console.log; // eslint-disable-line
const yaml = require(`${root}/server/modules/yaml-front-matter`);



//  P R O G R A M

module.exports = (req, res) => {

  const matches = [];
  const foundTags = [];

  let posts = "";

  glob("./_posts/**/*.md", (err, files) => {
    if (err) log(err);

    for (const file of files) {
      const entry = yaml.loadFront(file);
      matches.push(entry);
    }

    for (const key in matches) {
      if (matches[key].title !== undefined) {
        const tags = matches[key].tags.split(/[\s,]+/);

        for (let t = 0; t < tags.length; t++) {
          foundTags.push(tags[t]);
        }
      }
    }

    // Sort alphabetically
    foundTags.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;

      return 0;
    });

    const finalTagArray = uniq(foundTags);

    posts += `<ul class="archive__list">`;
    for (let v = 0; v < finalTagArray.length; v++) {
      posts += `
<li class="archive__list__item" itemprop="name headline">
  <a href="/tags/${finalTagArray[v]}" itemprop="url">${finalTagArray[v]}</a>
</li>
      `;
    }
    posts += "</ul>";

    res.render("pages/archive", Object.assign({
      layout: "layouts/default",
      PageTitle: "Tags",
      Content: posts
    }));
  });



  //  ~       R E M O V E
  //  D U P L I C A T E S

  function uniq(a) {
    return Array.from(new Set(a));
  }

};