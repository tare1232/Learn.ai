const chatDiv = document.getElementById('chat');

async function sendQuestion() {
  const input = document.getElementById('userInput');
  const question = input.value.trim();
  if (!question) return;

  appendMessage('user', question);
  input.value = '';
  
  // Call OpenAI API here
  const answer = await getAnswerFromOpenAI(question);
  appendMessage('bot', answer);
}

function appendMessage(sender, text) {
  const p = document.createElement('p');
  p.className = sender;
  p.textContent = (sender === 'user' ? 'You: ' : 'Bot: ') + text;
  chatDiv.appendChild(p);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function getAnswerFromOpenAI(question) {
  // You need to put your own API key here
  const apiKey = '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';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: question}],
      max_tokens: 100
    })
  });

  const data = await response.json();
  return data.choices && data.choices[0].message.content.trim() || 'Sorry, no answer.';
}