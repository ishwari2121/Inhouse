import React, { useState, useEffect } from 'react';
import './ViewQues.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewQues = () => {
    const [ques, setQues] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [openIndex, setOpenIndex] = useState(null); // Track the currently opened details

    useEffect(() => {
        const fetchQues = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/question/view/${id}`);
                console.log("API Response:", res.data);
                setQues(res.data.data || []); 
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQues();
    }, [id]);

    if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

    return (
        <div className='view-container'>
            <h1 id='heading'>All Questions And Answers</h1>
            <div className="all-ques">
                {ques.length > 0 ? (
                    ques.map((que, index) => (
                        <details 
                            key={que._id} 
                            className={`question-item ${openIndex === index ? 'open' : ''}`} 
                            open={openIndex === index} // Ensure only one is open at a time
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default toggle behavior
                                setOpenIndex(openIndex === index ? null : index); // Toggle open/close
                            }}
                        >
                            <summary>{index + 1}. {que.question}</summary>
                            <p><span id="ans-span">Answer</span><br/>{que.answer}</p>
                        </details>
                    ))
                ) : (
                    <p>No questions found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewQues;
