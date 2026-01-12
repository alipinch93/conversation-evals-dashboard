# Conversation Evals Dashboard

A Google Sheets-based evaluation dashboard that uses AI to score and rank conversations according to customizable criteria.

## What It Does

This dashboard allows you to:
- Evaluate conversations using AI-powered analysis
- Score conversations across 5 customizable evaluation criteria
- Automatically rank conversations based on their scores
- Use OpenAI's GPT-4o model for intelligent, context-aware evaluation

## Features

- **AI-Powered Evaluation**: Uses OpenAI's API to intelligently assess conversations
- **Customizable Criteria**: Define your own 5 evaluation issues/criteria based on your needs
- **Automated Scoring**: Simply input conversation data and let AI handle the scoring
- **Ranking System**: Automatically ranks conversations from best to worst
- **Google Sheets Integration**: Familiar spreadsheet interface with custom `=ASK_AI()` function
- **Secure API Key Storage**: Your OpenAI API key is stored securely in Script Properties

## Quick Start

1. Copy the Google Sheets template (or create a new sheet)
2. Add the Apps Script code to your sheet
3. Configure your OpenAI API key
4. Customize your 5 evaluation criteria
5. Start evaluating conversations

For detailed setup instructions, see [SETUP.md](SETUP.md)

## How to Use the Dashboard

### Basic Usage

1. **Input Conversations**: Add your conversation data to the sheet
2. **Define Evaluation Prompts**: Set up formulas using `=ASK_AI()` to evaluate each conversation
3. **View Scores**: AI will analyze and score each conversation
4. **Review Rankings**: Conversations are automatically ranked

### The `ASK_AI()` Function

The core of this dashboard is a custom Google Sheets function that calls OpenAI's API:

```javascript
=ASK_AI(prompt, context)
```

**Parameters:**
- `prompt` (required): Your question or instruction for the AI
- `context` (optional): Additional context to help the AI understand what to analyze

**Examples:**

```javascript
// Simple evaluation
=ASK_AI("Rate this conversation's helpfulness from 1-10", A2)

// Detailed analysis with context
=ASK_AI("Does this conversation show empathy? Answer YES or NO.", A2)

// Custom criteria
=ASK_AI("On a scale of 1-10, how well does this address the user's concern?", A2)
```

### Customizing Your 5 Evaluation Criteria

Your dashboard should score conversations on 5 different criteria. Common examples include:

1. **Helpfulness**: Does the response solve the user's problem?
2. **Clarity**: Is the response clear and easy to understand?
3. **Empathy**: Does it show understanding of the user's situation?
4. **Accuracy**: Is the information provided correct?
5. **Professionalism**: Is the tone appropriate and professional?

You can customize these to fit your specific use case (e.g., sales, support, education, etc.)

## Configuration

### OpenAI API Settings

The script uses GPT-4o by default with these settings:
- **Model**: `gpt-4o` (fast and cost-effective)
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Max Tokens**: 500 (adjust based on response length needs)

To change these settings, edit the `Code.gs` file.

## Costs

This dashboard uses the OpenAI API, which charges per token used:
- GPT-4o pricing: Check [OpenAI's pricing page](https://openai.com/api/pricing/)
- Each evaluation call uses tokens based on your prompt and response length
- Monitor your usage in your OpenAI account dashboard

## Requirements

- Google account with access to Google Sheets
- OpenAI API key (get one at [platform.openai.com](https://platform.openai.com))
- Basic familiarity with Google Sheets formulas

## Support

If you encounter issues:
1. Check that your API key is correctly set in Script Properties
2. Verify you have OpenAI API credits available
3. Review the error messages in the cells (they'll tell you what went wrong)
4. Check the Apps Script execution log: Extensions > Apps Script > Executions

## Security Notes

- Never share your OpenAI API key publicly
- The Script Properties storage keeps your key secure
- Don't hardcode the API key in the script
- When sharing the sheet, Script Properties are not shared with others (each user needs their own key)

## File Structure

```
conversation-evals-dashboard/
├── README.md          # This file
├── SETUP.md          # Detailed setup instructions
└── Code.gs           # Apps Script code to add to Google Sheets
```

## License

Free to use and modify for your own purposes.

## Original Sheet

Original dashboard: [Google Sheets link](https://docs.google.com/spreadsheets/d/1uZF7H4xdBbdQWwxfYkwllkEI_iO3e9asKXnb9QHAOc4/)
