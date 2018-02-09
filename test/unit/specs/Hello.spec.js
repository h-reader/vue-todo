import Vue from 'vue';
import Hello from '@/components/Hello';

describe('Hello.vue', () => {
  const Constructor = Vue.extend(Hello);
  const vm = new Constructor().$mount();

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('h3').textContent)
      .to.equal('Welcome to your Vue.js App');
  });

  it('Todoの初期表示件数確認', () => {
    const todoCount = vm.todos.length;
    expect(vm.$el.getElementsByClassName('task-list__item').length).to.equal(todoCount);
  });

  it('入力値無しのTodoの追加', () => {
    const beforeTodoCount = vm.todos.length;
    vm.addTodo();
    expect(vm.todos.length).to.equal(beforeTodoCount);
  });

  it('入力値ありのTodoの追加', () => {
    const beforeTodoCount = vm.todos.length;
    const todoMessage = 'New Todo!';
    vm.newTodo = todoMessage;
    vm.addTodo();
    expect(vm.todos.length).to.equal(beforeTodoCount + 1);
  });

  it('Todoの0件削除', () => {
    const beforeTodoCount = vm.todos.length;
    vm.todos.map(todo => todo.done = false);
    expect(vm.todos.filter(todo => todo.done).length).to.equal(0);
    vm.removeTodo();
    expect(vm.todos.length).to.equal(beforeTodoCount);
  });

  it('Todoの削除', () => {
    const beforeTodoCount = vm.todos.length;
    vm.todos[vm.todos.length - 1].done = true;
    const doneCount = vm.todos.filter(todo => todo.done).length;

    expect(doneCount).to.above(0);
    vm.removeTodo();
    expect(vm.todos.length).to.equal(beforeTodoCount - doneCount);
  });

  it('Todoの編集状態を変更', () => {
    const editTodo = vm.todos[0];
    editTodo.editing = false;
    vm.changeEditMode(editTodo);
    expect(editTodo.editing).to.equal(true);

    vm.changeEditMode(editTodo);
    expect(editTodo.editing).to.equal(false);
  });
});
