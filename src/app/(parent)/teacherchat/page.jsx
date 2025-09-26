// ... existing code ...
import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';

const DUMMY_TEACHER_EMAILS = [
  'teacher1@example.com',
  'teacher2@example.com',
  'teacher3@example.com',
];

const ParentTeacherChat = () => {
  const { user } = useAuth();
  const [studentId, setStudentId] = useState('');
  const [teacherEmail, setTeacherEmail] = useState(DUMMY_TEACHER_EMAILS[0]);
  const [subject, setSubject] = useState(''); // Now editable
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // Threaded messages
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Voice-to-text setup
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported');
      return;
    }
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        setMessage(prev => prev + event.results[0][0].transcript);
        setListening(false);
      };
      recognition.onerror = () => setListening(false);
      recognitionRef.current = recognition;
    }
    setListening(true);
    recognitionRef.current.start();
  };

  // Audio recording state and refs
  const [audioURL, setAudioURL] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  // Start recording
  const startRecording = async () => {
    if (!navigator.mediaDevices) {
      alert('Audio recording not supported');
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream);
    let chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudioBlob(blob);
      setAudioURL(URL.createObjectURL(blob));
      setRecording(false);
    };
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // Handle sending message or audio
  const handleSend = (e) => {
    e.preventDefault();
    if (audioBlob) {
      setMessages([...messages, {
        sender: 'parent',
        audio: audioURL,
        timestamp: new Date().toISOString(),
      }]);
      setAudioURL('');
      setAudioBlob(null);
    } else if (message.trim()) {
      setMessages([...messages, {
        sender: 'parent',
        message,
        timestamp: new Date().toISOString(),
      }]);
      setMessage('');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Parent-Teacher Chat</h2>
      <form onSubmit={handleSend}>
        <div className="mb-2">
          <label>Student ID</label>
          <input className="form-control" value={studentId} onChange={e => setStudentId(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Teacher Email</label>
          <select
            className="form-control"
            value={teacherEmail}
            onChange={e => setTeacherEmail(e.target.value)}
            required
          >
            {DUMMY_TEACHER_EMAILS.map(email => (
              <option key={email} value={email}>{email}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label>Subject</label>
          <input
            className="form-control"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label>Message</label>
          <textarea
            className="form-control"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required={!audioBlob}
            disabled={!!audioBlob}
          />
          <button
            type="button"
            className="btn btn-secondary mt-1 me-2"
            onClick={handleVoiceInput}
            disabled={listening || recording}
          >
            {listening ? 'Listening...' : 'Voice to Text'}
          </button>
          {!recording ? (
            <button
              type="button"
              className="btn btn-warning mt-1 me-2"
              onClick={startRecording}
              disabled={listening}
            >
              Record Voice Message
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger mt-1 me-2"
              onClick={stopRecording}
            >
              Stop Recording
            </button>
          )}
          {audioURL && (
            <div className="mt-2">
              <audio src={audioURL} controls />
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => {
                  setAudioURL('');
                  setAudioBlob(null);
                }}
              >
                Remove Audio
              </button>
            </div>
          )}
        </div>
        <button className="btn btn-primary" type="submit" disabled={(!message.trim() && !audioBlob)}>
          Send
        </button>
      </form>
      <hr />
      <h4>Conversation</h4>
      <div style={{ maxHeight: 300, overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'parent' ? 'text-end' : 'text-start'}`}>
            <div>
              <strong>{msg.sender}</strong> <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
            {msg.message && <div>{msg.message}</div>}
            {msg.audio && (
              <div>
                <audio src={msg.audio} controls />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentTeacherChat;