const TodoItem = ({
  todo,
  handleCompleted,
  handleClickEditButton,
  handleClickDeleteButton,
}) => {
  return (
    <li className={`item${todo.isCompleted ? ' completed' : ''}`}>
      <div className="col">
        <h2>title: {todo.title}</h2>
        <p>detail: {todo.detail}</p>
      </div>
      <div className="col">
        <input
          type="button"
          value="編集"
          onClick={() => handleClickEditButton(todo)}
        />
        <input
          type="button"
          value="削除"
          onClick={() => handleClickDeleteButton(todo.id)}
        />
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => handleCompleted(todo.id)}
        />
      </div>
    </li>
  )
}

export default TodoItem;
