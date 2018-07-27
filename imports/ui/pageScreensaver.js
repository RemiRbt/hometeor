import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Options } from '../api/options.js';

/* import, defs */

import './pageScreensaver.html';

var pageScreensaverTimer1;
var pageScreensaverTimer2;

/* TEMPLATE PAGES */

Template.pageScreensaver.onRendered(function () {
  moment.locale('fr', {
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
      sameDay: '[Aujourd’hui à] LT',
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [dernier à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'un an',
      yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
    ordinal: function (number) {
      return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
      return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem: function (hours, minutes, isLower) {
      return hours < 12 ? 'PD' : 'MD';
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
  });

  var datetime = null,
    date = null;
  datetime2 = null;
  date2 = null;

  var updateDateTime = function () {
    date = moment();
    datetime.html(date.format('LTS'));
    date2 = moment();
    datetime2.html(date.format('LL'));
  };

  var updateWeather = function () {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?id=2972315&appid=41eb99d5af201041a378733f7f95aad7&units=metric',
      dataType: 'json',
      success: function (json) {
        var meteo = json.main.temp + "° - " + json.weather[0].description;
        $('#meteo').html(meteo);
      }
    });
  }

  $(document).ready(function () {
    datetime = $('#time')
    datetime2 = $('#datetime')
    updateDateTime();
    pageScreensaverTimer1 = Meteor.setInterval(updateDateTime, 1000);

    updateWeather();
    pageScreensaverTimer2 = Meteor.setInterval(updateWeather, 600000);
  });
});

Template.pageScreensaver.onDestroyed(function () {
  clearInterval(pageScreensaverTimer1);
  clearInterval(pageScreensaverTimer2);
});