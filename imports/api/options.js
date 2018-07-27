import { Mongo } from 'meteor/mongo';
 
export const Options = new Mongo.Collection('options');

Meteor.methods({
    'options.setOption'(optionId, v) {
        Options.update(optionId, { $set: { value: v } });
    },
});