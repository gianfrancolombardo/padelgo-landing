## ADDED Requirements

### Requirement: Authenticated multi-step booking flow
The B2C app SHALL expose a protected `/book` route that guides an authenticated user through selecting a club, then a day, then a time slot, then confirming the booking, optimized for mobile-first interaction (one primary step visible at a time on small viewports).

#### Scenario: Full happy path
- **WHEN** a logged-in user completes club → day → time → confirm with an available slot
- **THEN** the system creates a booking (default `confirmed`) and shows a success state with club, date, time, and status summary

#### Scenario: Pending confirmation success state
- **WHEN** a booking is created with status `pending_confirmation`
- **THEN** the success screen explains that the club will validate availability

#### Scenario: Unauthenticated user blocked from booking
- **WHEN** a visitor without a session opens `/book`
- **THEN** they are redirected to login (or register) with a return path back to `/book`

#### Scenario: Back navigation within the wizard
- **WHEN** the user is on the day or time step and goes back
- **THEN** their previous valid selection is preserved until they change club or day incompatibly

### Requirement: Club selection lists active clubs
The booking flow SHALL present active clubs from the data store with at least name and locality (city/area), and SHALL require an explicit club selection before showing days.

#### Scenario: Clubs available
- **WHEN** the user enters the booking flow and at least one active club exists
- **THEN** they see a selectable list of those clubs

#### Scenario: No clubs configured
- **WHEN** no active clubs exist
- **THEN** the UI shows an empty state explaining that booking is temporarily unavailable

### Requirement: Day and time selection only shows available inventory
The booking flow SHALL only offer days that have at least one available slot for the selected club, and SHALL only offer time slots still available for the selected day.

#### Scenario: Day with availability
- **WHEN** the user selects a club that has available slots on upcoming days
- **THEN** those days appear as selectable options

#### Scenario: Slot no longer available at confirm time
- **WHEN** the user attempts to confirm a slot that was taken by another booking
- **THEN** they see a clear error and are returned to pick another time

### Requirement: Confirmation step shows a clear summary
Before final submit, the UI SHALL show club name, date, start time, and duration (or end time), with a primary confirm action and a way to go back.

#### Scenario: Summary before commit
- **WHEN** the user reaches the confirmation step with valid selections
- **THEN** the summary displays the selected club, date, and time before any booking is created

### Requirement: Booking UX follows brand and accessibility baselines
The booking UI SHALL use VoleaBox visual tokens (dark surfaces, `volea-green` accents), large tap targets on mobile, loading and error states, and Spanish/English copy via the existing i18n pattern.

#### Scenario: Language toggle on booking
- **WHEN** the user switches site language during the booking flow
- **THEN** step labels, buttons, and errors update to the selected locale

### Requirement: Post-booking success guides next actions
After a successful booking, the UI SHALL offer navigation to the account (my bookings) and a path to book another session when inventory remains.

#### Scenario: Success actions
- **WHEN** booking creation succeeds
- **THEN** the success screen includes a link to the account bookings view

### Requirement: Automated tests cover the booking UI
The booking flow components SHALL have Vitest tests covering the happy path, unauthenticated redirect, slot conflict error, empty club list, and language toggle on at least one step.

#### Scenario: Wizard happy path test
- **WHEN** the booking wizard test suite runs
- **THEN** it verifies club → day → time → confirm → success without manual interaction

#### Scenario: Slot conflict test
- **WHEN** `create_booking` returns a conflict error in tests
- **THEN** the UI shows an error and allows picking another time
