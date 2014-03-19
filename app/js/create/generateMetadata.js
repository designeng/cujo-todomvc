define(function() {
  var generateMetadata, guidLike, s4;
  s4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  guidLike = function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
  'use strict';
  /*
  Since we're using a datastore (localStorage) that doesn't generate ids and
  such for us, this transform generates a GUID id and a dateCreated.  It can
  be injected into a pipeline for creating new todos.
  */

  return generateMetadata = function(item) {
    item.id = guidLike();
    item.dateCreated = new Date().getTime();
    return item;
  };
});
