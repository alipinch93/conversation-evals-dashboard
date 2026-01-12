# Setup Guide

Complete step-by-step instructions for setting up your Conversation Evals Dashboard.

## Table of Contents

1. [Get Your OpenAI API Key](#step-1-get-your-openai-api-key)
2. [Set Up Google Sheets](#step-2-set-up-google-sheets)
3. [Add the Apps Script Code](#step-3-add-the-apps-script-code)
4. [Configure Your API Key](#step-4-configure-your-api-key)
5. [Set Up Your Evaluation Criteria](#step-5-set-up-your-evaluation-criteria)
6. [Test the Dashboard](#step-6-test-the-dashboard)

---

## Step 1: Get Your OpenAI API Key

### 1.1 Create an OpenAI Account

1. Go to [platform.openai.com](https://platform.openai.com)
2. Click "Sign up" (or "Log in" if you already have an account)
3. Complete the registration process

### 1.2 Add Payment Method

OpenAI requires a payment method to use the API:

1. Once logged in, click on your profile icon (top right)
2. Select "Billing"
3. Click "Add payment method"
4. Enter your credit/debit card information
5. Consider setting a usage limit to control costs:
   - Go to "Usage limits"
   - Set a monthly budget (e.g., $10-20 for moderate use)

### 1.3 Generate Your API Key

1. From your OpenAI dashboard, click on your profile icon
2. Select "API keys" (or go directly to [platform.openai.com/api-keys](https://platform.openai.com/api-keys))
3. Click "Create new secret key"
4. Give it a name (e.g., "Conversation Evals Dashboard")
5. Click "Create secret key"
6. **IMPORTANT**: Copy the key immediately and save it somewhere safe
   - You'll only see this key once
   - If you lose it, you'll need to create a new one
7. Keep this key secure and never share it publicly

---

## Step 2: Set Up Google Sheets

### Option A: Copy the Original Template

1. Go to the [original dashboard](https://docs.google.com/spreadsheets/d/1uZF7H4xdBbdQWwxfYkwllkEI_iO3e9asKXnb9QHAOc4/)
2. Click "File" > "Make a copy"
3. Give it a name and choose where to save it
4. Click "Make a copy"

### Option B: Create a New Sheet from Scratch

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "+ Blank" to create a new spreadsheet
3. Name your sheet (e.g., "Conversation Evals Dashboard")
4. Set up your columns (example structure):
   - Column A: Conversation ID
   - Column B: Conversation Text
   - Column C: Criteria 1 Score
   - Column D: Criteria 2 Score
   - Column E: Criteria 3 Score
   - Column F: Criteria 4 Score
   - Column G: Criteria 5 Score
   - Column H: Total Score
   - Column I: Rank

---

## Step 3: Add the Apps Script Code

### 3.1 Open the Script Editor

1. In your Google Sheet, click "Extensions" in the menu bar
2. Select "Apps Script"
3. A new tab will open with the Apps Script editor

### 3.2 Add the Code

1. You'll see a default `myFunction()` in the editor
2. Delete all the default code
3. Copy the entire contents of `Code.gs` from this repository
4. Paste it into the script editor
5. Click the "Save" icon (or Ctrl/Cmd + S)
6. Name your project (e.g., "Evals Dashboard Script")

### 3.3 Verify the Code

Make sure the code looks correct:
- Function name: `ASK_AI`
- No syntax errors (no red underlines)
- The file is saved

---

## Step 4: Configure Your API Key

This is where you'll add your OpenAI API key securely.

### 4.1 Open Script Properties

1. In the Apps Script editor, click on "Project Settings" (gear icon on the left sidebar)
2. Scroll down to "Script Properties"
3. Click "Add script property"

### 4.2 Add Your API Key

1. In the "Property" field, enter exactly: `OPENAI_API_KEY`
   - **IMPORTANT**: Must be exactly this name, all caps, with underscores
2. In the "Value" field, paste your OpenAI API key
   - It should start with `sk-`
   - Example format: `sk-proj-xxxxxxxxxxxxxxxxxxxxx`
3. Click "Save script properties"

### 4.3 Verify the Setup

1. Go back to the "Editor" tab (< > icon on left sidebar)
2. Close the Apps Script tab
3. Return to your Google Sheet
4. You're now ready to use the `ASK_AI()` function

---

## Step 5: Set Up Your Evaluation Criteria

### 5.1 Define Your 5 Criteria

Decide what aspects you want to evaluate. Here are some examples:

**Customer Support Example:**
1. Helpfulness (1-10)
2. Empathy (1-10)
3. Clarity (1-10)
4. Resolution Quality (1-10)
5. Response Time Appropriateness (1-10)

**Sales Conversation Example:**
1. Rapport Building (1-10)
2. Needs Discovery (1-10)
3. Product Knowledge (1-10)
4. Objection Handling (1-10)
5. Closing Effectiveness (1-10)

**Content Quality Example:**
1. Accuracy (1-10)
2. Engagement (1-10)
3. Clarity (1-10)
4. Completeness (1-10)
5. Professionalism (1-10)

### 5.2 Create Evaluation Formulas

For each criterion, create a formula in your sheet. Assuming your conversation is in column B:

**Example for Criterion 1 (Helpfulness):**

In cell C2, enter:
```
=ASK_AI("Rate the helpfulness of this conversation on a scale of 1-10. Only respond with the number.", B2)
```

**Example for Criterion 2 (Empathy):**

In cell D2, enter:
```
=ASK_AI("Rate the empathy shown in this conversation on a scale of 1-10. Only respond with the number.", B2)
```

Repeat for all 5 criteria in columns C through G.

### 5.3 Calculate Total Score

In column H (assuming scores are in C2:G2), enter:
```
=SUM(C2:G2)
```

### 5.4 Add Ranking

In column I2, enter:
```
=RANK(H2, H:H, 0)
```

This will rank conversations with the highest score as #1.

### 5.5 Copy Formulas Down

1. Select cells C2:I2
2. Copy (Ctrl/Cmd + C)
3. Select the range where you want to evaluate (e.g., C3:I100)
4. Paste (Ctrl/Cmd + V)

---

## Step 6: Test the Dashboard

### 6.1 Add Test Data

1. In column A, add a conversation ID (e.g., "CONV-001")
2. In column B, add a sample conversation:

```
User: My internet isn't working.
Agent: I'm sorry to hear that. Let me help you troubleshoot. Can you tell me if the lights on your modem are on?
User: Yes, they're all green.
Agent: Great, that helps narrow it down. Let's try restarting your router...
```

### 6.2 Wait for Results

1. The formulas will automatically trigger
2. You'll see "Loading..." in the cells
3. After a few seconds, you should see scores appear
4. If you see an error, check the troubleshooting section below

### 6.3 Verify the Output

- Each criterion should show a number (1-10)
- Total score should be the sum
- Rank should show the ranking

---

## Troubleshooting

### Error: "API key not set"

**Problem**: The API key isn't configured in Script Properties

**Solution**:
1. Go to Extensions > Apps Script
2. Click Project Settings (gear icon)
3. Add the script property `OPENAI_API_KEY` with your API key
4. Make sure there are no extra spaces

### Error: "API ERROR: Incorrect API key"

**Problem**: The API key is invalid or incorrect

**Solution**:
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Update the Script Properties with the new key

### Error: "API ERROR: You exceeded your current quota"

**Problem**: You've run out of OpenAI credits

**Solution**:
1. Go to [platform.openai.com/billing](https://platform.openai.com/billing)
2. Add credits to your account
3. Check your usage limits

### Formulas Not Running

**Problem**: The `ASK_AI` function isn't recognized

**Solution**:
1. Make sure you saved the Apps Script code
2. Try refreshing your Google Sheet
3. Check that the function name in your formula matches exactly: `ASK_AI`
4. Grant permissions if prompted (Google will ask you to authorize the script the first time)

### Slow Performance

**Problem**: Evaluations are taking a long time

**Solution**:
- This is normal - each API call takes 2-5 seconds
- Evaluating 10 conversations with 5 criteria = 50 API calls = ~2-4 minutes
- Consider evaluating in batches rather than all at once
- You can adjust `max_tokens` in the script to make responses faster

### Permission Errors

**Problem**: "Authorization required" message appears

**Solution**:
1. Click "Continue" when prompted
2. Select your Google account
3. Click "Advanced" > "Go to [Project Name] (unsafe)"
4. Click "Allow"
5. This is normal for custom Apps Scripts you create yourself

---

## Advanced Configuration

### Changing the AI Model

In `Code.gs`, find this line:
```javascript
model: "gpt-4o",
```

You can change it to:
- `"gpt-4o-mini"` - Faster and cheaper, slightly less capable
- `"gpt-4o"` - Default, good balance
- `"gpt-4-turbo"` - More capable, more expensive

### Adjusting Response Length

In `Code.gs`, find this line:
```javascript
max_tokens: 500
```

- Increase for longer responses (more expensive)
- Decrease for shorter responses (cheaper, faster)
- For simple number ratings, 50-100 tokens is enough

### Adjusting Temperature

In `Code.gs`, find this line:
```javascript
temperature: 0.7
```

- Lower (0.1-0.3): More consistent, predictable scores
- Higher (0.7-1.0): More creative, varied responses
- For evaluation scoring, recommend keeping it low (0.2-0.5)

---

## Sharing with Others

When you share this dashboard with others:

1. **Each person needs their own OpenAI API key**
   - Script Properties are NOT shared when you share a sheet
   - Each user must follow Steps 1-4 of this guide

2. **To share the sheet:**
   - Click "Share" in Google Sheets
   - Add their email addresses
   - They'll need "Editor" access to use the formulas

3. **What gets shared:**
   - The spreadsheet data
   - The formulas
   - The Apps Script code

4. **What doesn't get shared:**
   - Your API key (Script Properties)
   - Your OpenAI account/credits

---

## Cost Estimation

Approximate costs for GPT-4o (check [OpenAI pricing](https://openai.com/api/pricing/) for current rates):

**Per evaluation:**
- Input: ~100-500 tokens (depending on conversation length)
- Output: ~50-100 tokens (for a simple score)
- Estimated cost: $0.01-0.05 per evaluation

**For 100 conversations with 5 criteria:**
- Total evaluations: 500
- Estimated cost: $5-25

**Tips to reduce costs:**
- Use shorter, more specific prompts
- Use `gpt-4o-mini` for simple scoring
- Reduce `max_tokens` to minimum needed
- Batch evaluations instead of real-time

---

## Next Steps

Now that your dashboard is set up:

1. Customize your evaluation criteria for your use case
2. Import your conversation data
3. Let the AI evaluate and rank
4. Analyze the results to improve your conversations

For questions or issues, refer back to the [README.md](README.md) or the Troubleshooting section above.
