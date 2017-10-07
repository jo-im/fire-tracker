/* global L */
import Ember from 'ember';

export default L.TimeDimension.Layer.GeoJson.extend({

    // CDrift data has property time in seconds, not in millis.
    _getFeatureTimes: function(feature) {
      if (!feature.properties) {
        return [];
      }
      if (feature.properties.hasOwnProperty('times')) {
        return feature.properties.times;
      }
      if (feature.properties.hasOwnProperty('time')) {
        return [feature.properties.time * 1000];
      }
      return [];
    },
    // ?? disabled this... seems to do nothing
    // // Do not modify features. Just return the feature if it intersects
    // // the time interval
    // _getFeatureBetweenDates: function(feature, minTime, maxTime) {
    //     var featureStringTimes = this._getFeatureTimes(feature);
    //     if (featureStringTimes.length == 0) {
    //       return feature;
    //     }
    //     var featureTimes = [];
    //     for (var i = 0, l = featureStringTimes.length; i < l; i++) {
    //         var time = featureStringTimes[i]
    //         if (typeof time == 'string' || time instanceof String) {
    //             time = Date.parse(time.trim());
    //         }
    //         featureTimes.push(time);
    //     }

    //     if (featureTimes[0] > maxTime || featureTimes[l - 1] < minTime) {
    //         return null;
    //     }
    //     return feature;
    // },

});

