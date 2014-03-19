#global define 
define ->
    'use strict'
    
    ###
    Validate a todo
    ###
    validateTodo = (todo) ->
        
        # Must be a valid object, and have a text property that is non-empty
        valid = todo and 'text' of todo and todo.text.trim()
        result = valid: !!valid
        unless valid
            result.errors = [
                property: 'text'
                message: 'missing'
            ]
        result
