import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Options } from '../api/options.js';

/* ROUTING */

Router.route('/', function () {
  this.render('chose');
});

Router.route('/page', function () {
  this.render('page');
});

Router.route('/admin', function () {
  this.render('admin');
});

/* import, defs */

import './body.html';

import './admin.js';
import './chose.js';
import './page.js';
import './pageBus.js';
import './pageScreensaver.js';
import './pageYoutube.js';


moment.locale('fr');

/* GLOBAL HELPERS */

Template.registerHelper("equals", function (a, b) {
  return (a == b);
});
