import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Options } from '../api/options.js';

/* import, defs */

import './page.html';


/* TEMPLATE PAGES */

Template.page.helpers({
  page() {
    return Options.findOne({ id: "page" });
  },
});