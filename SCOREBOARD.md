# Scoreboard Setup Guide

A scoreboard tab provides a summary view of your evaluation results. This guide explains how to create an effective scoreboard that actually calculates properly (not just showing 0s).

## Common Reasons Your Scoreboard Shows 0

Before we start, here's why scoreboards often show 0:

1. **Referencing empty cells**: Formulas point to cells that don't have data yet
2. **Wrong sheet reference**: Formulas don't properly reference the evaluation sheet
3. **Text instead of numbers**: AI returned text like "8/10" instead of just "8"
4. **Formulas not triggered**: The evaluation formulas haven't run yet
5. **Incorrect range**: The range doesn't match where your actual data is

## Scoreboard Structure

### Recommended Layout

Create a new sheet tab called "Scoreboard" with the following structure:

```
Row 1: Title/Header
Row 3-8: Key Metrics (averages, counts, etc.)
Row 10+: Top/Bottom Performers
Row 20+: Detailed Breakdown (optional)
```

## Essential Formulas for Your Scoreboard

Assuming your main evaluation data is in a sheet called **"Evaluations"** with:
- Column A: Conversation ID
- Column B: Conversation Text
- Columns C-G: Criterion scores (1-10)
- Column H: Total Score
- Column I: Rank
- Column J: Pass/Fail (optional)

### 1. Average Score Per Criterion

**Criterion 1 Average (e.g., Helpfulness):**
```
=AVERAGE(Evaluations!C:C)
```

**Important:** This will show 0 if:
- Column C is empty
- Column C contains text instead of numbers
- The sheet name is wrong

**Better version (ignores errors):**
```
=IFERROR(AVERAGE(Evaluations!C2:C100), "No data")
```

**Even better (only counts numeric values):**
```
=AVERAGEIF(Evaluations!C2:C100, ">0")
```

### 2. Overall Average Score Across All Criteria

```
=AVERAGE(Evaluations!C2:G100)
```

Or if you want the average of total scores:
```
=AVERAGE(Evaluations!H2:H100)
```

**Better version:**
```
=IFERROR(ROUND(AVERAGE(Evaluations!H2:H100), 2), "No data")
```

### 3. Pass/Fail Counts

**Count of PASS:**
```
=COUNTIF(Evaluations!J:J, "PASS")
```

**Count of FAIL:**
```
=COUNTIF(Evaluations!J:J, "FAIL")
```

**Pass Rate Percentage:**
```
=IFERROR(COUNTIF(Evaluations!J:J, "PASS") / COUNTA(Evaluations!J2:J100) * 100, 0) & "%"
```

### 4. Total Conversations Evaluated

```
=COUNTA(Evaluations!A2:A1000)
```

This counts non-empty cells in column A (Conversation IDs).

### 5. Highest/Lowest Scores

**Highest Total Score:**
```
=MAX(Evaluations!H:H)
```

**Lowest Total Score:**
```
=MIN(Evaluations!H2:H100)
```

**Note:** Use H2:H100 (not H:H) to avoid including the header.

### 6. Top 5 Conversations

To show the top 5 conversations by score:

**Rank 1 Conversation ID:**
```
=INDEX(Evaluations!A:A, MATCH(1, Evaluations!I:I, 0))
```

**Rank 1 Score:**
```
=INDEX(Evaluations!H:H, MATCH(1, Evaluations!I:I, 0))
```

**Alternative (simpler but requires sorting):**

If your evaluation sheet is sorted by rank, you can just reference directly:
```
=Evaluations!A2    (for #1 conversation ID)
=Evaluations!H2    (for #1 score)
```

### 7. Individual Criterion Averages (Complete Set)

**Cell B3 - Helpfulness Average:**
```
=IFERROR(ROUND(AVERAGEIF(Evaluations!C2:C100, ">0"), 2), 0)
```

**Cell B4 - Empathy Average:**
```
=IFERROR(ROUND(AVERAGEIF(Evaluations!D2:D100, ">0"), 2), 0)
```

**Cell B5 - Clarity Average:**
```
=IFERROR(ROUND(AVERAGEIF(Evaluations!E2:E100, ">0"), 2), 0)
```

**Cell B6 - Resolution Quality Average:**
```
=IFERROR(ROUND(AVERAGEIF(Evaluations!F2:F100, ">0"), 2), 0)
```

**Cell B7 - Response Time Average:**
```
=IFERROR(ROUND(AVERAGEIF(Evaluations!G2:G100, ">0"), 2), 0)
```

## Complete Scoreboard Template

Here's a complete scoreboard layout you can copy:

### Section 1: Overview (Rows 1-10)

| A | B |
|---|---|
| **CONVERSATION EVALUATIONS SCOREBOARD** | |
| | |
| **Total Conversations Evaluated** | `=COUNTA(Evaluations!A2:A1000)` |
| **Overall Average Score** | `=IFERROR(ROUND(AVERAGE(Evaluations!H2:H100), 2), 0)` |
| **Pass Rate** | `=IFERROR(TEXT(COUNTIF(Evaluations!J:J, "PASS") / COUNTA(Evaluations!J2:J100), "0%"), "N/A")` |
| **Total PASS** | `=COUNTIF(Evaluations!J:J, "PASS")` |
| **Total FAIL** | `=COUNTIF(Evaluations!J:J, "FAIL")` |
| **Highest Score** | `=MAX(Evaluations!H2:H100)` |
| **Lowest Score** | `=MIN(Evaluations!H2:H100)` |

### Section 2: Criterion Averages (Rows 12-18)

| A | B |
|---|---|
| **AVERAGE SCORES BY CRITERION** | |
| Helpfulness | `=IFERROR(ROUND(AVERAGEIF(Evaluations!C2:C100, ">0"), 2), 0)` |
| Empathy | `=IFERROR(ROUND(AVERAGEIF(Evaluations!D2:D100, ">0"), 2), 0)` |
| Clarity | `=IFERROR(ROUND(AVERAGEIF(Evaluations!E2:E100, ">0"), 2), 0)` |
| Resolution Quality | `=IFERROR(ROUND(AVERAGEIF(Evaluations!F2:F100, ">0"), 2), 0)` |
| Response Time | `=IFERROR(ROUND(AVERAGEIF(Evaluations!G2:G100, ">0"), 2), 0)` |

### Section 3: Top Performers (Rows 20-26)

| A | B | C |
|---|---|---|
| **TOP 5 CONVERSATIONS** | **ID** | **Score** |
| #1 | `=INDEX(Evaluations!A:A, MATCH(1, Evaluations!I:I, 0))` | `=INDEX(Evaluations!H:H, MATCH(1, Evaluations!I:I, 0))` |
| #2 | `=INDEX(Evaluations!A:A, MATCH(2, Evaluations!I:I, 0))` | `=INDEX(Evaluations!H:H, MATCH(2, Evaluations!I:I, 0))` |
| #3 | `=INDEX(Evaluations!A:A, MATCH(3, Evaluations!I:I, 0))` | `=INDEX(Evaluations!H:H, MATCH(3, Evaluations!I:I, 0))` |
| #4 | `=INDEX(Evaluations!A:A, MATCH(4, Evaluations!I:I, 0))` | `=INDEX(Evaluations!H:H, MATCH(4, Evaluations!I:I, 0))` |
| #5 | `=INDEX(Evaluations!A:A, MATCH(5, Evaluations!I:I, 0))` | `=INDEX(Evaluations!H:H, MATCH(5, Evaluations!I:I, 0))` |

### Section 4: Bottom Performers (Rows 28-34)

| A | B | C |
|---|---|---|
| **LOWEST 5 CONVERSATIONS** | **ID** | **Score** |
| Last | `=INDEX(Evaluations!A:A, MATCH(MAX(Evaluations!I:I), Evaluations!I:I, 0))` | `=INDEX(Evaluations!H:H, MATCH(MAX(Evaluations!I:I), Evaluations!I:I, 0))` |

## Troubleshooting: Why Your Scoreboard Shows 0

### Issue 1: Wrong Sheet Name

**Problem:** Formula shows 0 or #REF!

**Solution:** Make sure your sheet name matches exactly. If your evaluation sheet is called "Evals" not "Evaluations", update all formulas:
```
=AVERAGE(Evals!C2:C100)
```

**To check your sheet name:**
- Look at the tab name at the bottom of your spreadsheet
- Sheet names are case-sensitive

### Issue 2: AI Returns Text Instead of Numbers

**Problem:** AI returns "8/10" or "8 out of 10" instead of just "8"

**Solution:** Update your evaluation prompts to be more specific:

❌ Bad prompt:
```
=ASK_AI("Rate the helpfulness", B2)
```

✅ Good prompt:
```
=ASK_AI("Rate the helpfulness on a scale of 1-10. Only respond with the number, nothing else.", B2)
```

### Issue 3: Empty Data Range

**Problem:** Scoreboard shows 0 because evaluation formulas haven't run yet

**Solution:**
1. Make sure you have conversation data in column B
2. Wait for the ASK_AI formulas to complete (they show "Loading..." while running)
3. Don't reference empty rows in your scoreboard formulas
4. Use specific ranges like C2:C100 instead of C:C if you know you have fewer than 100 conversations

### Issue 4: Formulas Don't Update

**Problem:** You added new conversations but scoreboard still shows old values

**Solution:**
- Press Ctrl+Shift+F9 (Windows) or Cmd+Shift+F9 (Mac) to force recalculation
- Or go to Extensions > Apps Script > Run > Refresh (if you have a refresh function)
- Or simply edit a scoreboard formula and press Enter to trigger recalculation

### Issue 5: #VALUE! or #N/A Errors

**Problem:** Formulas show error messages

**Solution:** Use IFERROR to handle missing data gracefully:
```
=IFERROR(AVERAGE(Evaluations!H2:H100), "No data yet")
```

## Best Practices for Effective Scoreboards

### 1. Use Named Ranges (Advanced)

Instead of `Evaluations!C2:C100`, create a named range:
1. Select Evaluations!C2:C100
2. Go to Data > Named ranges
3. Name it "Helpfulness_Scores"
4. Use in formulas: `=AVERAGE(Helpfulness_Scores)`

This makes formulas easier to read and maintain.

### 2. Use Conditional Formatting

Make your scoreboard visual:
- **Green** for averages above 8
- **Yellow** for averages 6-7.9
- **Red** for averages below 6

1. Select the cells with averages
2. Format > Conditional formatting
3. Set up color scales based on values

### 3. Add Sparklines for Trends

If you're tracking evaluations over time, add sparklines to show trends:
```
=SPARKLINE(Evaluations!H2:H100)
```

### 4. Separate Scoreboards for Different Time Periods

Create multiple scoreboard tabs:
- **Scoreboard - All Time**
- **Scoreboard - This Month**
- **Scoreboard - This Week**

Use date-based filtering in your formulas (requires adding a date column).

### 5. Keep It Simple

Don't overcomplicate your scoreboard. Focus on:
- Overall average
- Pass/fail rate
- Top 5 and bottom 5
- Individual criterion averages

## Advanced: Dynamic Scoreboard with Filters

If you want to filter by date, agent, or other criteria:

**Average score for conversations this month:**
```
=AVERAGEIFS(Evaluations!H:H, Evaluations!K:K, ">="&DATE(2026,1,1))
```
(Assumes column K has dates)

**Average score for a specific agent:**
```
=AVERAGEIF(Evaluations!L:L, "Agent Name", Evaluations!H:H)
```
(Assumes column L has agent names)

## Quick Setup Checklist

- [ ] Create a new sheet tab called "Scoreboard"
- [ ] Verify your evaluation sheet name (check the tab)
- [ ] Add "Total Conversations" formula first to test sheet reference
- [ ] Add overall average formula
- [ ] Add individual criterion averages
- [ ] Add pass/fail counts (if using pass/fail)
- [ ] Add top 5 performers
- [ ] Test with sample data
- [ ] Format cells for readability (bold headers, number formatting)
- [ ] Add conditional formatting for visual impact

## Example: Step-by-Step Setup

1. **Create the Scoreboard tab**
   - Click the "+" at the bottom of your sheet
   - Rename it to "Scoreboard"

2. **Add the title** (Cell A1)
   - Type: "CONVERSATION EVALUATIONS SCOREBOARD"
   - Format: Bold, size 14

3. **Add your first metric** (Cell A3)
   - Type: "Total Conversations"
   - In B3, enter: `=COUNTA(Evaluations!A2:A100)`
   - If it shows a number (not 0), your reference is working!

4. **Add average score** (Cell A4)
   - Type: "Overall Average Score"
   - In B4, enter: `=IFERROR(ROUND(AVERAGE(Evaluations!H2:H100), 2), "No data")`
   - If it shows a number, you're on track!

5. **Continue adding metrics** using the formulas from the template above

## Summary

Your scoreboard should:
- Reference the correct sheet name
- Use specific ranges (not entire columns if possible)
- Include IFERROR to handle missing data
- Show meaningful metrics (averages, counts, top/bottom performers)
- Be visually clear with formatting

If your scoreboard still shows 0 after following this guide:
1. Check that the evaluation sheet name matches your formulas exactly
2. Verify that the evaluation formulas have actually run (column C-G should have numbers)
3. Make sure your ranges include the actual data (e.g., if data is in rows 2-50, use C2:C50, not C2:C100)
4. Check that ASK_AI is returning numbers, not text

For more help, check the [SETUP.md](SETUP.md) troubleshooting section.
