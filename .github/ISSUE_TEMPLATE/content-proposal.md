---
name: Content Proposal
about: Proposal for new content on Dev.java
title: '[Proposal]: '
labels: proposal
assignees: ''
body:
  - type: markdown
    attributes:
      value: |
        Thank you for showing interest in contributing to Dev.java. Getting your content featured and seen by hundreds of thousands of developers worldwide, and the endorsement of the Java Platform Group, is very exciting but will require some effort.
        Please read this repo's README before submitting a proposal.
  - type: input
    id: request
    attributes:
      label: Request Issue
      description: "Which request issue prompted this proposal?"
      placeholder: "eg Issue #123"
    validations:
      required: false
  - type: input
    id: section
    attributes:
      label: Website Section
      description: "What section will your content be placed?"
      placeholder: "eg Learn --> Tutorials --> Getting to Know the Language"
    validations:
      required: false
  - type: textarea
    id: details
    attributes:
      label: Proposal Details
      description: Please provide an outline of your content
      placeholder: Tell us what you see!
    validations:
      required: true
  - type: textarea
    id: examples
    attributes:
      label: Author References
      description: Please include links to other public content you have created. (If you are a new writer, that is great, just let us know.)
      placeholder: "eg. https://www.mygreatblog.com/"
    validations:
      required: false

---