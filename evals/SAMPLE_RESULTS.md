# Sample Evaluation Results

Example evaluation output. Replace with actual results when evals are run.

## Individual Scores

| Prompt ID | Category | Readability | Composition | Consistency | Functionality | Visual Quality Avg | Notes |
|-----------|----------|-------------|-------------|-------------|----------------|--------------------|-------|
| pitch_tech_startup | business_pitch | 5 | 5 | 5 | Works | 5.0 | Excellent typography and layout |
| marketing_campaign | marketing | 4 | 4 | 4 | Works | 4.0 | Good, minor spacing inconsistency |
| training_python | educational | 3 | 3 | 4 | Works | 3.3 | Text hierarchy could be clearer |
| quarterly_financial | financial | 4 | 4 | 4 | Works | 4.0 | Charts well-formatted |
| product_roadmap | product | 4 | 5 | 4 | Works | 4.3 | Strong composition |
| climate_data | educational | 5 | 4 | 5 | Works | 4.7 | Visual emphasis well done |
| company_culture | internal | 4 | 4 | 4 | Works | 4.0 | Consistent branding |
| technical_architecture | technical | 3 | 3 | 3 | Works | 3.0 | Text-heavy, could use diagrams |
| event_proposal | event | 5 | 5 | 5 | Works | 5.0 | Concise and clear |
| minimal_brief | edge_case | 4 | 4 | 4 | Works | 4.0 | Handled vague brief well |
| text_heavy | edge_case | 2 | 2 | 3 | Works | 2.3 | Too cramped, hard to read |
| image_heavy | edge_case | 5 | 5 | 5 | Works | 5.0 | Professional visual handling |
| long_titles | edge_case | 3 | 2 | 3 | Works | 2.7 | Titles overflow, need wrapping |
| sales_deck | business_pitch | 4 | 4 | 4 | Works | 4.0 | 15 slides well-structured |
| nonprofit_annual | nonprofit | 4 | 4 | 4 | Works | 4.0 | Impact messaging clear |
| workshop_agenda | educational | 4 | 4 | 4 | Works | 4.0 | Good structure |
| product_demo | product | 5 | 5 | 5 | Works | 5.0 | Walkthrough flows naturally |
| research_findings | academic | 3 | 3 | 3 | Works | 3.0 | Data-heavy, needs better visualization |

## Summary Metrics

- **Average Visual Quality**: 4.0/5.0
- **Functionality Pass Rate**: 100% (18/18)
- **Consistency Average**: 4.1/5.0
- **Quality Std Dev**: 0.92 (moderate variance)

## Category Performance

| Category | Avg Visual Quality | Count |
|----------|-------------------|-------|
| Business Pitch | 4.5 | 2 |
| Marketing | 4.0 | 1 |
| Educational | 3.8 | 3 |
| Financial | 4.0 | 1 |
| Product | 4.7 | 2 |
| Internal | 4.0 | 1 |
| Technical | 3.0 | 1 |
| Event | 5.0 | 1 |
| Edge Case | 3.2 | 4 |
| Nonprofit | 4.0 | 1 |
| Academic | 3.0 | 1 |

## Key Findings

**Strengths**:
- Typography and readability excellent on well-structured content
- Visual consistency maintained across all slide sets
- 100% functionality pass rate (navigation, keyboard nav, presenter view all work)

**Areas for Improvement**:
- Edge cases struggle: very long titles, text-heavy content, minimal briefs
- Technical/academic slides (data-heavy) need better visualization
- Content density handling could be improved for multi-bullet slides

**Regression Tracking**:
- Baseline established: 4.0 average visual quality
- All functionality metrics at 100%
- Monitor consistency score for future releases
