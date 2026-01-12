---
name: skill-creator
description: Create and structure Claude Skills. Use when the user wants to create a new skill, needs help with skill structure, wants to format SKILL.md files, or needs guidance on skill development best practices.
---

# Skill Creator

A comprehensive guide and assistant for creating Claude Skills. This skill helps you structure, format, and develop custom skills that extend Claude's capabilities.

## Overview

Claude Skills are folders containing instructions, scripts, and resources that Claude can load when needed. Skills make Claude better at specialized tasks by providing structured knowledge and executable code.

## Skill Structure

A Skill consists of:

1. **SKILL.md** - Required file with YAML frontmatter and instructions
2. **Scripts** - Optional executable code (Python, JavaScript, etc.)
3. **Resources** - Optional reference materials, templates, or data files

## Creating a New Skill

### Step 1: Create the Directory Structure

Choose the appropriate location:

- **Personal Skills**: `~/.claude/skills/your-skill-name/`
- **Project Skills**: `.claude/skills/your-skill-name/` (in your project root)
- **Team Skills**: Share via version control or the skills marketplace

### Step 2: Create SKILL.md with YAML Frontmatter

The SKILL.md file must start with YAML frontmatter:

```yaml
---
name: your-skill-name
description: A clear, specific description of when Claude should use this skill. Include keywords and use cases. Be specific about triggers.
---
```

**Description Best Practices:**
- Include specific keywords that match user queries
- Mention use cases and scenarios
- Be explicit about when the skill should be invoked
- Example: "Process Excel spreadsheets, create formulas, analyze data. Use when working with .xlsx files, spreadsheets, or when the user mentions Excel, formulas, or data analysis."

### Step 3: Write Instructions

After the frontmatter, provide clear instructions in Markdown:

```markdown
# Your Skill Name

## Overview
Brief description of what this skill does.

## Quick Start
Step-by-step guide for common use cases.

## Detailed Instructions
Comprehensive guidance for advanced scenarios.

## Examples
Code examples or usage patterns.
```

### Step 4: Add Scripts (Optional)

If your skill needs executable code:

- Place scripts in the skill directory
- Reference them in SKILL.md
- Use appropriate file extensions (.py, .js, etc.)
- Include error handling and documentation

### Step 5: Add Resources (Optional)

Include any necessary:
- Templates
- Reference documents
- Configuration files
- Sample data

## SKILL.md Template

Use this template when creating a new skill:

```markdown
---
name: skill-name
description: When to use this skill. Include keywords, use cases, and specific triggers.
---

# Skill Name

## Overview
[What this skill does and why it's useful]

## Quick Start
[Simple, common use case with example]

## Detailed Instructions

### Use Case 1
[Detailed instructions]

### Use Case 2
[Detailed instructions]

## Code Examples

\`\`\`python
# Example code
\`\`\`

## Best Practices
[Tips and recommendations]

## Troubleshooting
[Common issues and solutions]
```

## Best Practices

1. **Clear Descriptions**: Make the YAML description specific and keyword-rich
2. **Structured Instructions**: Use clear headings and sections
3. **Code Examples**: Include practical, runnable examples
4. **Error Handling**: Document potential errors and solutions
5. **Composability**: Design skills to work well with other skills
6. **Efficiency**: Only include what's necessary - Claude loads skills on-demand
7. **Portability**: Use relative paths and avoid hardcoded dependencies

## Skill Types

### Instruction-Only Skills
Skills that provide guidance without code execution:
- Brand guidelines
- Writing style guides
- Workflow documentation

### Code-Execution Skills
Skills that include executable scripts:
- File processing (Excel, PDF, etc.)
- Data transformation
- API integrations

### Hybrid Skills
Skills combining instructions and code:
- Template generators
- Format converters
- Analysis tools

## Testing Your Skill

1. **Verify Structure**: Ensure SKILL.md has valid YAML frontmatter
2. **Test Triggers**: Ask Claude questions that should invoke your skill
3. **Check Loading**: Verify Claude loads the skill when relevant
4. **Validate Code**: Test any executable scripts independently
5. **Review Output**: Ensure the skill produces expected results

## Common Issues

### Skill Not Loading
- Check YAML syntax (no tabs, proper indentation)
- Verify description includes relevant keywords
- Ensure file is in correct directory
- Check file permissions

### Code Not Executing
- Verify Code Execution Tool is enabled
- Check script syntax and dependencies
- Ensure proper file paths
- Review error messages

### Skill Too Broad/Narrow
- Refine description to be more specific
- Add or remove keywords
- Adjust use case examples
- Test with various queries

## Interactive Skill Creation

When helping users create skills, follow this workflow:

1. **Understand the Goal**: Ask about the skill's purpose and use cases
2. **Identify Triggers**: Determine keywords and scenarios
3. **Design Structure**: Plan the skill's organization
4. **Generate SKILL.md**: Create properly formatted file
5. **Add Resources**: Include scripts, templates, or examples as needed
6. **Review and Refine**: Ensure clarity and completeness

## Example Skills

### Simple Instruction Skill
```markdown
---
name: brand-voice
description: Apply brand voice guidelines. Use when creating content, writing copy, or when the user mentions brand voice, tone, or style guidelines.
---

# Brand Voice Guide

Our brand voice is professional yet approachable, clear and concise.
```

### Code-Execution Skill
```markdown
---
name: excel-processor
description: Process Excel files, create formulas, analyze data. Use when working with .xlsx files, spreadsheets, or when the user mentions Excel, formulas, or data analysis.
---

# Excel Processor

## Quick Start

Use openpyxl to read Excel files:

\`\`\`python
from openpyxl import load_workbook

wb = load_workbook('file.xlsx')
ws = wb.active
\`\`\`
```

## Version Control

For team collaboration:
- Commit skills to version control
- Use semantic versioning
- Document changes in CHANGELOG.md
- Tag releases appropriately

## Distribution

- **Personal**: Install in `~/.claude/skills/`
- **Project**: Include in `.claude/skills/` directory
- **Team**: Share via Git repository
- **Public**: Publish to anthropics/skills marketplace

## Next Steps

After creating a skill:
1. Test it thoroughly
2. Document any dependencies
3. Share with your team (if applicable)
4. Consider publishing if it's generally useful
5. Maintain and update as needed

Remember: Skills are composable, portable, and efficient. Design them to work well independently and together.

