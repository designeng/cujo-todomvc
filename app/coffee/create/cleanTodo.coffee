#global define 
define ->
    'use strict'
    (todo) ->
        todo.text = todo.text and todo.text.trim() or ''
        todo.complete = !!todo.complete
        todo
