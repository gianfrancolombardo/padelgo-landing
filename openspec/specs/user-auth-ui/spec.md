## Requirements

### Requirement: Login page is available on the B2C landing
The B2C landing SHALL expose a `/login` route with email and password fields, submit action via `signInWithPassword`, loading state, and user-visible error messages.

#### Scenario: Successful login
- **WHEN** a user submits valid credentials on `/login`
- **THEN** they are redirected to `/account`

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
The application SHALL provide a logout action accessible from the account area.

#### Scenario: User logs out
- **WHEN** a logged-in user clicks logout
- **THEN** the session ends and they are redirected to the home page

### Requirement: Protected account route requires authentication
The application SHALL expose `/account` that displays the current user's email and SHALL redirect unauthenticated visitors to `/login`.

#### Scenario: Unauthenticated access blocked
- **WHEN** a visitor without a session opens `/account`
- **THEN** they are redirected to `/login`

### Requirement: Auth UI follows brand and i18n conventions
Auth pages SHALL use VoleaBox visual tokens (dark background, `volea-green` accents, rounded form controls, shared `max-w-[1440px]` shell) and SHALL provide Spanish and English copy via the existing `LanguageContext` / translations pattern.

#### Scenario: Language toggle applies to auth
- **WHEN** the user switches site language on an auth page
- **THEN** labels, buttons, and error messages update to the selected locale

### Requirement: Header and hero expose auth entry points
The B2C header SHALL show a single auth access CTA when logged out (linking to login) and account access when logged in. Hero and bottom CTA sections SHALL promote account creation and sign-in instead of email waitlist capture.

#### Scenario: Logged-out header
- **WHEN** no user session exists on the home page
- **THEN** the header shows a single access CTA linking to login

#### Scenario: Logged-in header
- **WHEN** a user session exists on the home page
- **THEN** the header shows account access

#### Scenario: Hero promotes registration
- **WHEN** a visitor views the home hero
- **THEN** they see primary and secondary CTAs for create account and sign in
