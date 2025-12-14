'use client';

import { useEffect, useState } from 'react';
import './styles.css';

interface Message {
  sender: string;
  name: string;
  avatar: string;
  message: string;
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'AI',
      name: 'ChatBot',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AI',
      message: 'Hello! How can I assist you today?'
    },
    {
      sender: 'user',
      name: 'John',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      message: 'Hi! I need help with my account.'
    },
    {
      sender: 'admin',
      name: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Admin',
      message: 'I can help with that. What seems to be the issue?'
    },
    {
      sender: 'user',
      name: 'John',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      message: 'I cannot reset my password.'
    },
    {
      sender: 'AI',
      name: 'ChatBot',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AI',
      message: 'Let me guide you through the password reset process.'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState<'user' | 'AI' | 'admin'>('user');
  const [senderName, setSenderName] = useState('Guest');

  useEffect(() => {
    renderMessages();
  }, [messages]);

  const renderMessages = () => {
    const container = document.querySelector('#chat-container');
    if (!container) return;

    container.innerHTML = '';

    messages.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.classList.add('chat-bubble');
      bubble.innerText = msg.message;

      const avatar = document.createElement('img');
      avatar.src = msg.avatar;
      avatar.classList.add('avatar');

      const nameTag = document.createElement('span');
      nameTag.innerText = msg.name;
      nameTag.classList.add('chat-name');

      if (msg.sender === 'AI') {
        bubble.classList.add('ai-message');
        avatar.style.float = 'left';
      } else if (msg.sender === 'admin') {
        bubble.classList.add('admin-message');
        avatar.style.float = 'right';
      } else {
        bubble.classList.add('user-message');
        avatar.style.float = 'right';
      }

      // Append avatar, name, and bubble for all users including normal user
      container.appendChild(avatar);
      container.appendChild(nameTag);
      container.appendChild(bubble);
    });

    // Auto-scroll to bottom
    container.scrollTop = container.scrollHeight;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const avatarSeeds = {
      user: senderName,
      AI: 'AI',
      admin: 'Admin'
    };

    const newMsg: Message = {
      sender: senderType,
      name: senderType === 'user' ? senderName : senderType === 'AI' ? 'ChatBot' : 'Admin',
      avatar: `https://api.dicebear.com/7.x/${senderType === 'AI' ? 'bottts' : senderType === 'admin' ? 'personas' : 'avataaars'}/svg?seed=${avatarSeeds[senderType]}`,
      message: newMessage
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="app-container">
      <div className="chat-header">
        <h1>Chat Application</h1>
        <p>AI • Admin • Users</p>
      </div>

      <div id="chat-container" className="chat-container"></div>

      <div className="input-container">
        <div className="sender-controls">
          <select
            value={senderType}
            onChange={(e) => setSenderType(e.target.value as 'user' | 'AI' | 'admin')}
            className="sender-select"
          >
            <option value="user">User</option>
            <option value="AI">AI</option>
            <option value="admin">Admin</option>
          </select>

          {senderType === 'user' && (
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your name"
              className="name-input"
            />
          )}
        </div>

        <div className="message-input-wrapper">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="message-input"
            rows={2}
          />
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
