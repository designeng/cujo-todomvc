#global define 
define ->
    'use strict'
    
    ###
    Custom data linking handler for setting the "completed" class.
    The intent here is just to show that you can implement custom
    handlers for data/dom linking to do anything that isn't provided
    by default.
    ###
    (node, data, info) ->
        
        # Simple-minded implementation just to show custom data linking handler
        node.className = (if data[info.prop] then 'completed' else '')
        return
