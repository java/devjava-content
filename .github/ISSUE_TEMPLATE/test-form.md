name: Test name
about: Test about
description: test description
title: ''
labels: ''
assignees: ''
body:
  - type: input
    id: request
    attributes:
      label: Request Issue
      description: "Which request issue prompted this proposal?"
      placeholder: "eg Issue #123"
    validations:
      required: false