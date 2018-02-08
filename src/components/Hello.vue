<template>
  <div>
      <h3>{{ msg }}</h3>
      <form>
          <button @click="addTodo()" >ADD TASK</button>
          <button @click="removeTodo()">DELETE FINISHED TASKS</button>
          <p>input: <input type="text" v-model="newTodo"></p>
          <p>task: {{ newTodo }} </p>
      </form>
      <div class="task-list">
          <label class="task-list__item" v-for="todo in todos" :key="todo.id"
              :class="{ 'task-list__item--checked': todo.done }">
              <input type="checkbox" v-model="todo.done">
              <input type="text" v-if="todo.editing" v-model="todo.text"
                @keyup.enter="todo.editing = !todo.editing" >
              <span v-else>{{ todo.text }}</span>
              <button @click="changeEditMode(todo)">EDIT</button>
          </label>
      </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to your Vue.js App',
      todos: [
        { id: 1, text: 'vue-router', done: false, editing: false },
        { id: 2, text: 'vuex', done: false, editing: false },
        { id: 3, text: 'vue-loader', done: false, editing: false },
        { id: 4, text: 'awesome-vue', done: true, editing: false },
      ],
      newTodo: '',
    };
  },
  methods: {
    addTodo() {
      const todoText = this.newTodo && this.newTodo.trim();
      if (!todoText) {
        return;
      }

      this.todos.push({
        id: Math.max(this.todos.map((todo) => {
          const id = todo.id;
          return id;
        })) + 1,
        text: todoText,
        done: false,
        editing: false,
      });

      this.newTodo = '';
    },
    removeTodo() {
      for (let i = this.todos.length - 1; i >= 0; i -= 1) {
        if (this.todos[i].done) {
          this.todos.splice(i, 1);
        }
      }
    },
    changeEditMode(todo) {
      const todoModel = todo;
      todoModel.editing = !todoModel.editing;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin flex-vender() {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
}

.task-list {
    @include flex-vender();
    flex-direction: column;
    align-items: center;
    &__item {
        width: 370px;
        text-align: left;
        $element: #{&};
        &--checked {
            @extend #{$element};
            color: #85a6c6;
        }
    }
}
</style>
