#global define 
define ->
    
    ###
    Self-optimizing function to set the text of a node
    ###
    
    # sniff for proper textContent property
    
    # resume normally
    setTextProp = (nodes, value) ->
        i = 0

        while i < nodes.length
            nodes[i][textProp] = '' + value
            i++
        return
    'use strict'
    textProp = undefined
    updateRemainingCount = undefined
    updateRemainingCount = (nodes, value) ->
        textProp = (if 'textContent' of document.documentElement then 'textContent' else 'innerText')
        updateRemainingCount = setTextProp
        updateRemainingCount nodes, value
        return

    
    ###
    Create a new todo
    @injected
    @param todo {Object} data used to create new todo
    @param todo.text {String} text of the todo
    ###
    createTodo: ->

    
    ###
    Remove an existing todo
    @injected
    @param todo {Object} existing todo, or object with same identifier, to remove
    ###
    removeTodo: ->

    
    ###
    Update an existing todo
    @injected
    @param todo {Object} updated todo
    ###
    updateTodo: ->

    
    ###
    Start inline editing a todo
    @param node {Node} Dom node of the todo
    ###
    beginEditTodo: (node) ->
        @querySelector('.edit', node).focus()
        return

    
    ###
    Finish editing a todo
    @param todo {Object} todo to finish editing and save changes
    ###
    endEditTodo: (todo) ->
        
        # As per application spec, todos edited to have empty
        # text should be removed.
        if /\S/.test(todo.text)
            @updateTodo todo
        else
            @removeTodo todo
        return

    
    ###
    Remove all completed todos
    ###
    removeCompleted: ->
        todos = @todos
        todos.forEach (todo) ->
            todos.remove todo    if todo.complete
            return

        return

    
    ###
    Check/uncheck all todos
    ###
    toggleAll: ->
        todos = undefined
        complete = undefined
        todos = @todos
        complete = @masterCheckbox.checked
        todos.forEach (todo) ->
            todo.complete = complete
            todos.update todo
            return

        return

    
    ###
    Update the remaining and completed counts, and update
    the check/uncheck all checkbox if all todos have become
    checked or unchecked.
    ###
    updateCount: ->
        total = undefined
        checked = undefined
        total = 0
        checked = 0
        @todos.forEach (todo) ->
            total++
            checked++    if todo.complete
            return

        @masterCheckbox.checked = total > 0 and checked is total
        @updateTotalCount total
        @updateCompletedCount checked
        @updateRemainingCount total - checked
        return

    updateTotalCount: ->

    updateCompletedCount: (completed) ->
        @countNode.innerHTML = completed
        return

    updateRemainingCount: (remaining) ->
        updateRemainingCount @remainingNodes, remaining
        return
