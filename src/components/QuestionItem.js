import React from "react";

function QuestionItem({ question,onDelete,onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
function deleteQuestion(){
  fetch(`http://localhost:4000/questions/${id}`,{
    method:'DELETE',
  })
  .then((r)=>r.json())
  .then(()=>onDelete(id))
}
function updateAnswer(e){
  fetch(`http://localhost:4000/questions/${id}`,{
    method:'PATCH',
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({"correctIndex":e.target.value})
  })
  .then((r)=>r.json)
  .then((data)=>onUpdate(data))
}
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={updateAnswer}>{options}</select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
