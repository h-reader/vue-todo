<template>
  <div>
      {{ msg }}
      <form>
          <button v-on:click="addTodo()" >ADD TASK</button>
          <button>DELETE FINISHED TASKS</button>
          <p>input: <input type="text" v-model="newTodo"></p>
          <p>task: {{ newTodo }} </p>
      </form>
      <div class="task-list">
          <label class="task-list__item" v-for="todo in todos" :key="todo.id" >
            <input type="checkbox"><button>EDIT</button>{{ todo.text }}
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
        { id: 1, text: 'vue-router', done: false },
        { id: 2, text: 'vuex', done: false },
        { id: 3, text: 'vue-loader', done: false },
        { id: 4, text: 'awesome-vue', done: true },
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
        id: this.todos.length + 1,
        text: todoText,
        done: false,
      });

      this.newTodo = '';
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
        width: 270px;
        text-align: left;
        $element: #{&};
        &--checked {
            @extend #{$element};
            color: #85a6c6;
        }
    }
}
</style>
