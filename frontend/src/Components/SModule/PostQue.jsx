import React, { useState } from "react";
import "./PostQue.css";
import { useParams } from "react-router-dom";

const PostQue = () => {
  const [que, setQue] = useState("");
  const [ans, setAns] = useState("");
  const { id } = useParams();
  async function handleSubmit() {
    if (!que || !ans) {
        alert("Please enter both question and answer.");
        return;
    }

    const payload = {
        company_id: id,
        question: que,
        answer: ans,
        created_by: 1, // Replace with dynamic user ID if needed
    };

    try {
        const response = await fetch(
            `http://localhost:5000/api/question/save/${id}`, // ✅ Fixed backticks
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();
        if (response.ok) {
            alert("Question posted successfully!");
            setQue("");
            setAns("");
        } else {
            alert(`Error: ${data.message}`); // ✅ Fixed template string
        }
    } catch (error) {
        console.error("Error posting question:", error);
        alert("Failed to post question. Try again later.");
    }
}

  return (
    <div id="main-container">
      <h1 className="heading">Post Your Question</h1>
      <div className="que-conatiner">
        <div id="que">
          <label htmlFor="question-id">Enter Question Here:</label>
          <textarea
            onChange={(e) => setQue(e.target.value)}
            className="que-textarea"
            name="question"
            id="question-id"
            cols={140}
            rows={3}
            placeholder="Enter Asked Question"
            value={que} // ✅ Bind state
          ></textarea>
        </div>
        <div id="ans">
          <label htmlFor="answer-id">Post Your Answer:</label>
          <textarea
            onChange={(e) => setAns(e.target.value)} // ✅ Correct setter for answer
            className="ans-textarea"
            name="answer"
            id="answer-id"
            cols={140}
            rows={15}
            placeholder="Write your Answer here"
            value={ans} // ✅ Bind state
          ></textarea>
        </div>
        <input
          id="btn-submit"
          onClick={handleSubmit} // ✅ Fix: Use onClick, not onSubmit
          type="submit"
          value="Post Question"
        />
      </div>
    </div>
  );
};

export default PostQue;
