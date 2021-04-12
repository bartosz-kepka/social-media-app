import Vue from 'vue';
import moment from 'moment';

export function registerDatetimeFilter() {
  Vue.filter('datetime', function(datetime) {
    if (!datetime) {
      return '';
    }
    return moment(String(datetime)).format('hh:mm - DD/MM/YYYY');
  });
}

