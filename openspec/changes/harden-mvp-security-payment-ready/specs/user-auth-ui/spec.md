## ADDED Requirements

### Requirement: Registration enforces minimum password length of eight
The registration form SHALL require a password of at least 8 characters (`minLength` and matching validation copy) before calling `signUp`.

#### Scenario: Password too short
- **WHEN** a user enters a password with fewer than 8 characters on `/register`
- **THEN** the form does not call `signUp` and shows validation feedback

#### Scenario: Password meets minimum length
- **WHEN** a user submits registration with a password of 8 or more characters and otherwise valid fields
- **THEN** `signUp` is invoked with those credentials
