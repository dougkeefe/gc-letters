/**
 * Multi-Page Example: Letter with Page Numbers
 *
 * This example demonstrates:
 * - Multi-page content
 * - Page numbering
 * - Next page indicators
 * - Letter tracking number
 */

import React, { useState } from 'react';
import { GcLetter, LetterBlock, SeparatorLine } from 'gc-letters';

function MultiPageExample() {
  const [downloadFn, setDownloadFn] = useState<(() => void) | null>(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Multi-Page Letter Example</h1>
      <p>This letter demonstrates page numbering and multi-page handling.</p>

      <button
        onClick={() => downloadFn?.()}
        disabled={!downloadFn}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: downloadFn ? 'pointer' : 'not-allowed',
          backgroundColor: downloadFn ? '#0066cc' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Download Multi-Page PDF
      </button>

      <GcLetter
        fileName="multi-page-letter"
        deptSignature="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-en.svg"
        showPageNumbers="skip-first"
        pageNumberFormat="Page #"
        pageNumberLocation="footer"
        pageNumberAlignment="center"
        showNextPage={true}
        nextPageNumberFormat="...continued on page #"
        nextPageNumberLocation="footer"
        nextPageNumberAlignment="right"
        showLetterNumber={true}
        letterNumber="DEPT-2024-00123"
        letterNumberLocation="footer"
        letterNumberAlignment="left"
        onReady={(download) => setDownloadFn(() => download)}
      >
        <LetterBlock content={`# Multi-Page Official Correspondence

Reference: DEPT-2024-00123
Date: ${new Date().toLocaleDateString()}

## Introduction

This letter demonstrates the multi-page capabilities of the gc-letters package, including:
- Automatic page numbering (starting from page 2)
- Next page continuation indicators
- Letter tracking number in the footer

## Section 1: Background

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Key Points

1. First important consideration
2. Second critical factor
3. Third essential element
4. Fourth significant aspect
5. Fifth vital component`} />

        <SeparatorLine />

        <LetterBlock content={`## Section 2: Detailed Analysis

This section provides detailed analysis of the matter at hand.

### Methodology

The approach taken includes:
- Comprehensive review of existing documentation
- Consultation with relevant stakeholders
- Analysis of applicable regulations and policies
- Consideration of best practices and precedents

### Findings

Based on the thorough review, the following findings have been identified:

1. **Finding One**: Detailed explanation of the first major finding with supporting evidence and analysis.

2. **Finding Two**: Comprehensive description of the second key discovery, including relevant data and observations.

3. **Finding Three**: Complete analysis of the third significant finding with contextual information.

4. **Finding Four**: Full exposition of the fourth important discovery with supporting details.`} />

        <SeparatorLine />

        <LetterBlock content={`## Section 3: Recommendations

Based on the findings outlined above, the following recommendations are proposed:

### Primary Recommendations

1. **Recommendation One**: Implement the first proposed action with the following steps:
   - Sub-step A
   - Sub-step B
   - Sub-step C

2. **Recommendation Two**: Execute the second suggested measure including:
   - Initial phase activities
   - Implementation activities
   - Follow-up activities

3. **Recommendation Three**: Undertake the third recommended initiative through:
   - Planning activities
   - Execution activities
   - Review activities

### Secondary Recommendations

- Additional consideration for future planning
- Supplementary action for ongoing improvement
- Further steps for long-term sustainability`} />

        <SeparatorLine />

        <LetterBlock content={`## Section 4: Conclusion

This comprehensive review has identified key areas requiring attention and has proposed actionable recommendations to address the identified issues.

### Next Steps

The following next steps are recommended:

1. Review and approval of recommendations by appropriate authorities
2. Development of detailed implementation plan
3. Allocation of necessary resources
4. Establishment of monitoring and evaluation framework
5. Regular progress reporting to stakeholders

### Timeline

- **Phase 1 (Months 1-3)**: Planning and preparation
- **Phase 2 (Months 4-9)**: Implementation of primary recommendations
- **Phase 3 (Months 10-12)**: Review and adjustment as needed

## Closing Remarks

We appreciate your attention to this matter and look forward to working collaboratively on the implementation of these recommendations.

Should you have any questions or require clarification on any points raised in this letter, please do not hesitate to contact us.

Sincerely,

[Signature]

[Name]
[Title]
Department Name`} />
      </GcLetter>
    </div>
  );
}

export default MultiPageExample;
