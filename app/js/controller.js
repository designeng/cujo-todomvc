define(function() {
  /*
  Self-optimizing function to set the text of a node
  */

  var setTextProp, textProp, updateRemainingCount;
  setTextProp = function(nodes, value) {
    var i;
    i = 0;
    while (i < nodes.length) {
      nodes[i][textProp] = '' + value;
      i++;
    }
  };
  'use strict';
  textProp = void 0;
  updateRemainingCount = void 0;
  updateRemainingCount = function(nodes, value) {
    textProp = ('textContent' in document.documentElement ? 'textContent' : 'innerText');
    updateRemainingCount = setTextProp;
    updateRemainingCount(nodes, value);
  };
  return {
    /*
    Create a new todo
    @injected
    @param todo {Object} data used to create new todo
    @param todo.text {String} text of the todo
    */

    createTodo: function() {},
    /*
    Remove an existing todo
    @injected
    @param todo {Object} existing todo, or object with same identifier, to remove
    */

    removeTodo: function() {},
    /*
    Update an existing todo
    @injected
    @param todo {Object} updated todo
    */

    updateTodo: function() {},
    /*
    Start inline editing a todo
    @param node {Node} Dom node of the todo
    */

    beginEditTodo: function(node) {
      this.querySelector('.edit', node).focus();
    },
    /*
    Finish editing a todo
    @param todo {Object} todo to finish editing and save changes
    */

    endEditTodo: function(todo) {
      if (/\S/.test(todo.text)) {
        this.updateTodo(todo);
      } else {
        this.removeTodo(todo);
      }
    },
    /*
    Remove all completed todos
    */

    removeCompleted: function() {
      var todos;
      todos = this.todos;
      todos.forEach(function(todo) {
        if (todo.complete) {
          todos.remove(todo);
        }
      });
    },
    /*
    Check/uncheck all todos
    */

    toggleAll: function() {
      var complete, todos;
      todos = void 0;
      complete = void 0;
      todos = this.todos;
      complete = this.masterCheckbox.checked;
      todos.forEach(function(todo) {
        todo.complete = complete;
        todos.update(todo);
      });
    },
    /*
    Update the remaining and completed counts, and update
    the check/uncheck all checkbox if all todos have become
    checked or unchecked.
    */

    updateCount: function() {
      var checked, total;
      total = void 0;
      checked = void 0;
      total = 0;
      checked = 0;
      this.todos.forEach(function(todo) {
        total++;
        if (todo.complete) {
          checked++;
        }
      });
      this.masterCheckbox.checked = total > 0 && checked === total;
      this.updateTotalCount(total);
      this.updateCompletedCount(checked);
      this.updateRemainingCount(total - checked);
    },
    updateTotalCount: function() {},
    updateCompletedCount: function(completed) {
      this.countNode.innerHTML = completed;
    },
    updateRemainingCount: function(remaining) {
      updateRemainingCount(this.remainingNodes, remaining);
    }
  };
});
