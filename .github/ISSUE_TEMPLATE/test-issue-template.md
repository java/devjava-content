name: Bug Report
description: Report a bug
labels: bug
body:
  - type: textarea
    id: problem
    attributes:
      label: What happened?
      description: |
        blah blah
    validations:
      required: false

  - type: textarea
    id: expected
    attributes:
      label: What did you expect to happen?
    validations:
      required: false

  - type: textarea
    id: repro
    attributes:
      label: How can we reproduce it (as minimally and precisely as possible)?
    validations:
      required: false

  - type: textarea
    id: additional
    attributes:
      label: Anything else we need to know?

  - type: textarea
    id: Version
    attributes:
      label: Version
      value: |
        <details>

        ```console
        $ gulp build
        # paste output here
        ```

        </details>
    validations:
      required: false