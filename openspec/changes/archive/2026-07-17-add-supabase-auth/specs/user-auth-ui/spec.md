## ADDED Requirements

### Requirement: Login page is available on the B2C landing
The B2C landing SHALL expose a `/login` route with email and password fields, submit action via `signInWithPassword`, loading state, and user-visible error messages.

#### Scenario: Successful login
- **WHEN** a user submits valid credentials on `/login`
- **THEN** they are redirected to `/account` (or home if account route is deferred)

#### Scenario: Invalid credentials
- **WHEN** a user submits wrong email or password
- **THEN** an inline error message is shown without exposing internal error details

#### Scenario: Already authenticated user visits login
- **WHEN** a logged-in user navigates to `/login`
- **THEN** they are redirected away from the login page

### Requirement: Registration page is available on the B2C landing
The B2C landing SHALL expose a `/register` route with email, password, and optional full name, using `signUp` and showing appropriate success or confirmation messaging.

#### Scenario: Successful registration
- **WHEN** a new user submits a valid registration form
- **THEN** they see a success or email-confirmation message and are guided to log in or check email

#### Scenario: Duplicate email
- **WHEN** a user registers with an email that already exists
- **THEN** a friendly error is displayed

### Requirement: Authenticated users can sign out
The application SHALL provide a logout action accessible from the account area or header when a session exists.

#### Scenario: User logs out
- **WHEN** a logged-in user clicks logout
- **THEN** the session ends and they are redirected to the home or login page

### Requirement: Protected account route requires authentication
The application SHALL expose `/account` (or equivalent) that displays the current user's email and SHALL redirect unauthenticated visitors to `/login`.

#### Scenario: Unauthenticated access blocked
- **WHEN** a visitor without a session opens `/account`
- **THEN** they are redirected to `/login`

### Requirement: Auth UI follows brand and i18n conventions
Auth pages SHALL use VoleaBox visual tokens (dark background, `volea-green` accents, rounded form controls) and SHALL provide Spanish and English copy via the existing `LanguageContext` / translations pattern.

#### Scenario: Language toggle applies to auth
- **WHEN** the user switches site language on an auth page
- **THEN** labels, buttons, and error messages update to the selected locale

### Requirement: Header exposes auth entry points
The B2C header SHALL show links to login and register when logged out, and account/logout when logged in, without removing the existing waitlist CTA from the hero.

#### Scenario: Logged-out header
- **WHEN** no user session exists
- **THEN** the header shows login and register links

#### Scenario: Logged-in header
- **WHEN** a user session exists
- **THEN** the header shows account access and logout instead of login/register
