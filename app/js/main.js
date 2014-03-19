define({
  theme: {
    module: 'css!theme/base.css'
  },
  root: {
    $ref: 'dom!todoapp'
  },
  createView: {
    render: {
      template: {
        module: 'text!app/js/create/template.html'
      },
      replace: {
        module: 'i18n!app/js/create/strings'
      }
    },
    insert: {
      first: 'root'
    }
  },
  createForm: {
    element: {
      $ref: 'dom.first!form',
      at: 'createView'
    },
    connect: {
      'todos.onAdd': 'reset'
    }
  },
  listView: {
    render: {
      template: {
        module: 'text!app/js/list/template.html'
      },
      replace: {
        module: 'i18n!app/js/list/strings'
      },
      css: {
        module: 'css!app/js/list/structure.css'
      }
    },
    insert: {
      after: 'createView'
    },
    bind: {
      to: {
        $ref: 'todos'
      },
      comparator: 'dateCreated',
      bindings: {
        text: 'label, .edit',
        complete: [
          '.toggle', {
            attr: 'classList',
            handler: {
              module: 'app/js/list/setCompletedClass'
            }
          }
        ]
      }
    }
  },
  controlsView: {
    render: {
      template: {
        module: 'text!app/js/controls/template.html'
      },
      replace: {
        module: 'i18n!app/js/controls/strings'
      },
      css: {
        module: 'css!app/js/controls/structure.css'
      }
    },
    insert: {
      after: 'listView'
    }
  },
  footerView: {
    render: {
      template: {
        module: 'text!app/js/footer/template.html'
      },
      replace: {
        module: 'i18n!app/js/footer/strings'
      }
    },
    insert: {
      after: 'root'
    }
  },
  todoStore: {
    create: {
      module: 'cola/adapter/LocalStorage',
      args: 'todos-cujo'
    },
    bind: {
      to: {
        $ref: 'todos'
      }
    }
  },
  todos: {
    create: {
      module: 'cola/Collection',
      args: {
        strategyOptions: {
          validator: {
            module: 'app/js/create/validateTodo'
          }
        }
      }
    },
    before: {
      add: 'cleanTodo | generateMetadata',
      update: 'cleanTodo'
    }
  },
  todoController: {
    create: 'app/js/controller',
    properties: {
      todos: {
        $ref: 'todos'
      },
      createTodo: {
        compose: 'form.getValues | todos.add'
      },
      removeTodo: {
        compose: 'todos.remove'
      },
      updateTodo: {
        compose: 'todos.update'
      },
      querySelector: {
        $ref: 'dom.first!'
      },
      masterCheckbox: {
        $ref: 'dom.first!#toggle-all',
        at: 'listView'
      },
      countNode: {
        $ref: 'dom.first!.count',
        at: 'controlsView'
      },
      remainingNodes: {
        $ref: 'dom.all!#todo-count strong',
        at: 'controlsView'
      }
    },
    on: {
      createView: {
        'submit:form': 'createTodo'
      },
      listView: {
        'click:.destroy': 'removeTodo',
        'change:.toggle': 'updateTodo',
        'click:#toggle-all': 'toggleAll',
        'dblclick:label': 'todos.edit',
        'change,focusout:.edit': 'todos.submit',
        'submit:form': 'todos.submit'
      },
      controlsView: {
        'click:#clear-completed': 'removeCompleted'
      }
    },
    connect: {
      updateTotalCount: 'setTodosTotalState',
      updateRemainingCount: 'setTodosRemainingState',
      updateCompletedCount: 'setTodosCompletedState',
      'todos.onChange': 'updateCount',
      'todos.onEdit': 'todos.findNode | toggleEditingState.add | beginEditTodo',
      'todos.onSubmit': 'todos.findNode | toggleEditingState.remove | todos.findItem | endEditTodo'
    }
  },
  form: {
    module: 'cola/dom/form'
  },
  cleanTodo: {
    module: 'app/js/create/cleanTodo'
  },
  generateMetadata: {
    module: 'app/js/create/generateMetadata'
  },
  toggleEditingState: {
    create: {
      module: 'wire/dom/transform/toggleClasses',
      args: {
        classes: 'editing'
      }
    }
  },
  setTodosTotalState: {
    create: {
      module: 'wire/dom/transform/cardinality',
      args: {
        node: {
          $ref: 'root'
        },
        prefix: 'todos'
      }
    }
  },
  setTodosRemainingState: {
    create: {
      module: 'wire/dom/transform/cardinality',
      args: {
        node: {
          $ref: 'root'
        },
        prefix: 'remaining'
      }
    }
  },
  setTodosCompletedState: {
    create: {
      module: 'wire/dom/transform/cardinality',
      args: {
        node: {
          $ref: 'root'
        },
        prefix: 'completed'
      }
    }
  },
  plugins: ['wire/dom', 'wire/dom/render', 'wire/on', 'wire/aop', 'wire/connect', 'cola']
});
