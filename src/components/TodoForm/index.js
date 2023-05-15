const TodoForm = ({
  handleSubmit,
  inputValues,
  handleInputChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="タイトルを入力してね"
        value={inputValues.title}
        onChange={handleInputChange}
      />
      <textarea
        name="detail"
        placeholder="詳細を入力してね"
        value={inputValues.detail}
        onChange={handleInputChange}
      />
      <input type="submit" value={inputValues.id ? '更新' : '追加'} />
    </form>
  );
}

export default TodoForm;