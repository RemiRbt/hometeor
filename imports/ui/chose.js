import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Options } from '../api/options.js';

/* import, defs */

import './chose.html';


/* TEMPLATE CHOSE */

Template.chose.events({
  'click button'(event, instance) {
    Meteor.call('options.setOption', { id: "page" }, event.currentTarget.id);

    if (event.currentTarget.id == "bus") {
      Meteor.call('options.setOption', { id: "page.bus" }, event.currentTarget.dataset.bus);
    }
  },
});