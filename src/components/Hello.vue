<template>
  <div>
      <h3>{{ msg }}</h3>
      <div>
          <button @click="addTodo()" >ADD TASK</button>
          <button @click="removeTodo()">DELETE FINISHED TASKS</button>
          <p>input: <input type="text" v-model="newTodo"></p>
          <p>task: {{ newTodo }} </p>
      </div>
      <div class="task-list">
          <label class="task-list__item" v-for="todo in todos" :key="todo.id"
              :class="{ 'task-list__item--checked': todo.done }">
              <input type="checkbox" v-model="todo.done" @change="updateTodo(todo)">
              <input type="text" v-if="todo.editing" v-model="todo.text"
                @keyup.enter="updateTodo(todo)" >
              <span v-else>{{ todo.text }}</span>
              <button @click="changeEditMode(todo)">EDIT</button>
          </label>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

const todoApiUrl = 'http://localhost:3000/todos/';

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to your Vue.js App',
      todos: [],
      newTodo: '',
    };
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      const res = await axios.get(todoApiUrl);
      this.todos = res.data;
    },
    async addTodo() {
      const todoText = this.newTodo && this.newTodo.trim();
      if (!todoText) {
        return;
      }

      await axios.post(todoApiUrl, {
        text: todoText,
        done: false,
        editing: false,
      });

      await this.fetchTodos();

      this.newTodo = '';
    },
    async removeTodo() {
      await this.todos.filter(todo => todo.done)
        .forEach(todo => axios.delete(todoApiUrl + todo.id));

      await this.fetchTodos();
    },
    async updateTodo(todo) {
      todo.editing = false;

      await axios.put(todoApiUrl + todo.id, {
        text: todo.text,
        done: todo.done,
        editing: todo.editing,
      });

      await this.fetchTodos();
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
