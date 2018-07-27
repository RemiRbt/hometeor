import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Options } from '../api/options.js';

/* import, defs */

import './admin.html';


/* TEMPLATE CHOSE */

/* TEMPLATE ADMIN */

Template.admin.helpers({
  options() {
    return Options.find().fetch();
  },
});