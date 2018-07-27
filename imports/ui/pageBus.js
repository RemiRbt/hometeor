import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Options } from '../api/options.js';

/* import, defs */

import './pageBus.html';

var pageBus1;
var pageBus2;

/* TEMPLATE PAGES */

Template.pageBus.helpers({
  bus() {
    return Options.findOne({ id: "page.bus" });
  },
});

Template.pageBus.onRendered(function () {
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

  var busType = "";
  var busTypeCode = "";

  var getBusType = function () {
    switch (busType) {
      case 'ville':
        busTypeCode = "stopAreaId=1970324837186054";
        break;
      case 'travail':
        busTypeCode = "stopAreaId=1970324837184714&operatorCode=181&lineId=11821949021891662";
        break;
      default:
    }
  }
  
  var updateBus = function (busTypeCode) {
    // Bus 1 = Barcelone Leclerc
    $.ajax({
      url: 'http://api.tisseo.fr/v1/stops_schedules.json?'+busTypeCode+'&key=cc180a59-bcf2-4168-956a-e8f9287f2ff8',
      dataType: 'json',
      success: function (json) {
        var busName = json.departures.stop.name;
        var busArret = "Arrêt: " + busName + "";
        var busArray = "";
        $.each(json.departures.departure, function (index, value) {
          busArray += "<tr><td><b style='background: rgb" + value.line.color + ";'>" + value.line.shortName + "</b></td><td> " + moment(value.dateTime).format('LTS') + " </td><td> " + moment(value.dateTime).fromNow() + "</td></tr>"
        });
        $('h4').html(busArret);
        $('#bus table').html(busArray);
      }
    });
  };

  $(document).ready(function () {
    busType = $("#pageBus").attr("data-bus");
    getBusType(busType);
    updateBus(busTypeCode);

    pageBus1 = Meteor.setInterval(function(e) { 
      if($("#pageBus").attr("data-bus") != busType) {
        busType = $("#pageBus").attr("data-bus");
        getBusType(busType);
        updateBus(busTypeCode);
      }
    }, 1000);

    pageBus2 = Meteor.setInterval(function(e) { 
      busType = $("#pageBus").attr("data-bus");
      getBusType(busType);
      updateBus(busTypeCode); 
    }, 30000);
  });
});

Template.pageBus.onDestroyed(function () {
  clearInterval(pageBus1);
  clearInterval(pageBus2);
});