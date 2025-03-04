import React, { useState, useEffect } from 'react';
import './ViewQues.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast  from 'react-hot-toast';

const ViewQues = () => {
    const [ques, setQues] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [openIndex, setOpenIndex] = useState(null); 

    useEffect(() => {
        const fetchQues = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/question/view/${id}`);
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
                            open={openIndex === index}
                            onClick={(e) => {
                                e.preventDefault(); 
                                setOpenIndex(openIndex === index ? null : index); 
                            }}
                        >
                            <summary>{index + 1}. {que.question}</summary>
                            <div>
                                <div className="ans-header">
                                    <span id="ans-span">Answer</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); 
                                            navigator.clipboard.writeText(que.answer);
                                            toast.success("Copied to Clipboard");
                                        }}
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                                    </svg></button>
                                </div>  
                                <br/>
                                <p><pre>{que.answer}</pre></p>
                            </div>
                        </details>
                    ))
                ) : 
                (
                    <p>No questions found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewQues;
