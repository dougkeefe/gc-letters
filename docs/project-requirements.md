# GC Letters
A project to create an npm package that makes it easy for Government of Canada departments to export FIP compliant letters with ease. 


## Components
GC Letters provides 3 components for your use in generating FIP Standards compliant letters.

<GcLetter> - The main component that provides the foundation to the Letter being created.
<LetterBlock /> - A section of the letter.  Each section of the document may have it's own formatting needs, so you can define each block separately for the ease of customization.  
If you're confident that all your formatting will be satisfied with the document-level stylings combined with the markdown you provide, then you should only need one.  Often times however, you would like to control page breaks differently per section so practically speaking you'll often use at least a few of these per letter. 
<SeparatorLine /> - A convenience component to add a separator line to your document.

## How it works
After installing the gc-letters npm package you should include the relevant
parameters to optimize the output of a PDF document. 

Input is expected in markdown format. If you don't see any specific options within the gc-letters paramters, you should assume that is styling that can be provided by Markdown formatting. 

The <GcLetter> is the main wrapper component for your letter.  You can add as many <LetterBlock /> and <SeparatorLine /> components as you like within the <GcLetter> component.  

Place your markdown content within the <LetterBlock> component or use the content parameter

Do not nest components as this will cause errors or unexpected outputs (eg: Bad example of Nested components <GcLetter>
    <LetterBlock>
        <LetterBlock>
        </LetterBlock>
    </LetterBlock>
</GcLetter>
)

## How to install
npm --install gc-letters



## GCLetter Component

--file-name - required - Provide a file name for the document.  Full path is not required as it is a browser-based download. 

### Document-level layout settings
--dept-signature - required - should be a link to standard PNG of the Department's letterhead
--page-type - optional - default: letter
    Options are (letter, legal, a4)
--x-margin - optional - default: 38mm - sets the left-right margin at the page level
--y-margin - optional - default: 13mm - sets the top-botton margin at the page level


### Letter versioning
--letter-version - optional - provided for convenience for you to track the version of the letter
--letter-number - optional - provide the letter number as a part of the letter (if required by your Department)
--show-letter-number - optional - default: false - shows the Departmental letter number you have assigned for this letter.
--letter-number-location - optional - default: footer
    Options: header, footer
--letter-number-alignment - optional - default: right
    Options: left, center, right


### Document-level content settings
--font-face - optional - default: Helvetica Light (future enhancement, however FIP sets this as a standard)
--text-size-normal optional - default: 11pt
--text-size-heading-1 - optional - default: 16pt
--text-size-heading-2 - optional - default: 14pt
--text-size-heading-3 - optional - default: 12pt
--text-align - optional - default: left
    left, right, center, full
--paragraph-spacing - optional - default 11mm
--line-spacing - optional - default 7mm - sets the spacing between lines

### Page Numbers
--show-page-numbers - optional - default: false
    Options:  true, false, skip-first   
--page-number-format - optional - default: -#-
    The format requires you to indicate the page number with a # otherwise it will produce an error. The # will be replaced with the current page number value. 
--page-number-location - optional - default: header
    Options: header, footer
--page-number-alignment - optional - default: center
    Options: left, center, right

### Next Page Numbers
    Sometimes it's desirable to indicate to the reader that there is another page in the document.  This is often represented on the bottom right of a letter to guide the reader to move to the next page.  It can also serve as an important indicator to the reader if there is a page missing.  
--show-next-page - optional - default: false
    Options:  true, false, skip-first   
--next-page-number-format - optional - default: .../#
--next-page-number-location - optional - default: header
    Options: header, footer
--next-page-number-alignment - optional - default: center
    Options: left, center, right
    
## LetterBlock
Content block level parameters
--content - optional - you can provide the markdown content via parameter if you prefer.
--allow-pagebreak - optional - default: true
    Content within block is allowed to break page within the content block.
    false - If content breaks page, forces whole content block to new page. 
--paragraph-spacing - optional - default 11mm
--line-spacing - optional - sets the spacing between lines. If not set, defers back to document-level settings.
--font-face - optional - default: Helvetica Light (future enhancement, however FIP sets this as a standard)
--text-size-normal - optional - default: 11pt
--text-size-heading-1 - optional - default: 16pt
--text-size-heading-2 - optional - default: 14pt
--text-size-heading-3 - optional - default: 12pt
--text-align - optional - default: left
    left, right, center, full

## SeparatorLine
No parameters at this time. 

## Under the hood
    GC Letters uses jsPDF to create PDFs. It is a well-known npm package that does not require any additional hosting or configurations.  Letters are generated in-browser so does not present any additional security risk and operational 3rd party dependencies in a production environment. 

## Things to consider for the future
How would image work?
How would tables work?
Nested LetterBlocks will fail. 
Explain that versioning is provided as a convenience however they will still need to persist this along with the letter itself so ensure reproducability. 
Consider this as a server-side component as well as a browser-based one so that it could be exposed via API as well. 