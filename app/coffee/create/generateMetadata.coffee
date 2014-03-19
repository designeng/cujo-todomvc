#global define 

#jshint bitwise:false 
define ->
    
    # GUID-like generation, not actually a GUID, tho, from:
    # http://stackoverflow.com/questions/7940616/what-makes-this-pseudo-guid-generator-better-than-math-random
    s4 = ->
        (((1 + Math.random()) * 0x10000) | 0).toString(16).substring 1
    guidLike = ->
        s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
    'use strict'
    
    ###
    Since we're using a datastore (localStorage) that doesn't generate ids and
    such for us, this transform generates a GUID id and a dateCreated.  It can
    be injected into a pipeline for creating new todos.
    ###
    generateMetadata = (item) ->
        item.id = guidLike()
        item.dateCreated = new Date().getTime()
        item
