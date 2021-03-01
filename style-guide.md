# Style Guide

## Naming

### Types

- All types should be named with `CapitalCamelCase`, no matter whether they're classes,
  enums, types etc.
- All types should be named according to what they represent, without any suffix
  denoting the type of type
  - good: `LoadingStatus`
  - bad: `LoadingStatusEnum`

### 'Current'

Everything is current, so variables should only start with `current` if there is some corresponding non-current variable

### Variables

#### Booleans

Booleans should always have names that _start_ with a predicate verb to minimize ambiguity.

- - good: `isVisible`, `shouldShowList`
  - bad: `visible`, `showList`

#### Event handlers

Event handler names should take the form `handle<Event>`.
