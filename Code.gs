/**
 * ASK_AI - Custom Google Sheets function to query OpenAI API
 *
 * Usage: =ASK_AI("Your prompt here", "Optional context")
 *
 * @param {string} prompt - The main question or instruction for the AI
 * @param {string} context - Optional additional context for the AI
 * @return {string} AI-generated response
 */
function ASK_AI(prompt, context) {
  // Get your OpenAI API key from Script Properties
  const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');

  if (!apiKey) {
    return "ERROR: API key not set. Add OPENAI_API_KEY to Script Properties";
  }

  // Build the full prompt
  let fullPrompt = prompt;
  if (context) {
    fullPrompt = prompt + "\n\nContext: " + context;
  }

  // OpenAI API endpoint
  const url = 'https://api.openai.com/v1/chat/completions';

  // Request payload
  const payload = {
    model: "gpt-4o", // Fast and cheap, or use "gpt-4o" for more power
    messages: [{
      role: "user",
      content: fullPrompt
    }],
    temperature: 0.7,
    max_tokens: 500 // Adjust based on how long you want responses
  };

  // API call options
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    // Make the API call
    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    // Check for error
    if (json.error) {
      return "API ERROR: " + json.error.message;
    }

    // Extract the response
    if (json.choices && json.choices.length > 0) {
      return json.choices[0].message.content.trim();
    }

    return "ERROR: Unexpected response format";

  } catch (error) {
    return "ERROR: " + error.toString();
  }
}
