import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionList,setQuestionList]=useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then((r)=>r.json())
    .then((data)=>{
      console.log(data)
      
      setQuestionList(data)})
  },[])
  function questionAdd(formObj){
    setQuestionList((questions)=>{
      return [...questions,formObj]
    })
  }
  function handleDelete(id){
    setQuestionList((questions)=>{
      return questions.filter((question)=>{
        return question.id !==id
      })
    })
  }
  function updateAnswer(answer){
    setQuestionList((questions)=>{
      return questions.map((question)=>{
        if(question.id===answer.id){
          return answer
        }
        else{
          return question
        }
      })
    })

  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAdd={questionAdd} /> : <QuestionList onDelete={handleDelete} onUpdate={updateAnswer} questions={questionList} />}
    </main>
  );
}

export default App;
