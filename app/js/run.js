define(['curl'], function(curl) {
  'use strict';
  curl({
    main: 'wire!app/js/main',
    packages: [
      {
        name: 'curl',
        location: 'bower_components/curl/src/curl'
      }, {
        name: 'wire',
        location: 'bower_components/wire',
        main: 'wire'
      }, {
        name: 'when',
        location: 'bower_components/when',
        main: 'when'
      }, {
        name: 'meld',
        location: 'bower_components/meld',
        main: 'meld'
      }, {
        name: 'cola',
        location: 'bower_components/cola',
        main: 'cola'
      }, {
        name: 'poly',
        location: 'bower_components/poly',
        main: 'poly'
      }
    ],
    preloads: ['poly/es5'],
    locale: false
  });
});
