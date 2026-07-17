## ADDED Requirements

### Requirement: Clubs are stored with operational configuration
The system SHALL persist clubs with at least: stable id, display name, locality, active flag, optional address/notes, `opening_time`, `closing_time`, `slot_duration_minutes` (default 60), `contact_email`, and `requires_confirmation` (default false). Only active clubs SHALL be offered in the public booking UI.

#### Scenario: Active club is bookable
- **WHEN** a club row is marked active
- **THEN** authenticated users can select it in the booking flow

#### Scenario: Inactive club is hidden
- **WHEN** a club is marked inactive
- **THEN** it does not appear in the booking club list

#### Scenario: Club contact email is stored
- **WHEN** a club is configured with `contact_email`
- **THEN** the value is available for server-side notifications (e.g. future club-confirmation flow)

#### Scenario: Slot duration defaults to one hour
- **WHEN** a club has no explicit `slot_duration_minutes`
- **THEN** generated slots use the default of 60 minutes from booking config

### Requirement: Time slots represent bookable inventory per club
The system SHALL persist concrete time slots per club with start and end timestamps derived from the club's opening hours and slot duration, and a status of `available`, `booked`, or `blocked`.

#### Scenario: Available slot appears in UI
- **WHEN** a slot is `available`, within the club's operating hours, and its start time is in the future
- **THEN** it can be offered for the matching club and day

#### Scenario: Blocked slot is not offered
- **WHEN** a slot is `blocked`
- **THEN** it is not selectable in the booking UI

#### Scenario: Slots respect club hours
- **WHEN** slots are generated for a club with opening 09:00 and closing 22:00 and 60-minute duration
- **THEN** no slot starts before opening or ends after closing

### Requirement: Bookings link user, club, and slot with extensible status
The system SHALL persist bookings with user id, club id, slot id, status, and timestamps. Supported statuses in MVP: `confirmed`, `pending_confirmation`, `cancelled`. The schema SHALL reserve `pending_payment` for a future payment phase without using it in the default create path. At most one active booking (`confirmed`, `pending_confirmation`, or future `pending_payment`) SHALL exist per slot.

#### Scenario: Default confirmed booking
- **WHEN** `create_booking` is invoked for an available slot on a club with `requires_confirmation = false`
- **THEN** a `confirmed` booking is inserted, the slot becomes `booked`, and the caller receives the booking id

#### Scenario: Pending confirmation when club requires it
- **WHEN** `create_booking` is invoked on a club with `requires_confirmation = true`
- **THEN** a `pending_confirmation` booking is inserted and the slot is held as booked

#### Scenario: Double booking prevented
- **WHEN** two create attempts target the same available slot concurrently
- **THEN** only one active booking succeeds and the other fails without leaving inconsistent slot state

### Requirement: Row Level Security protects booking data
RLS SHALL allow authenticated users to read active clubs and available/future slot metadata needed to book, to create bookings only as themselves via the approved RPC path, and to read/cancel only their own bookings. Users SHALL NOT update arbitrary slot rows from the client outside the RPC.

#### Scenario: User reads own bookings
- **WHEN** an authenticated user queries bookings
- **THEN** they only receive rows where they are the owner

#### Scenario: User cannot read others bookings
- **WHEN** a user attempts to select another user's booking by id
- **THEN** the row is not returned under RLS

### Requirement: Cancellation restores inventory within configured notice window
The system SHALL provide a cancellation path that sets the booking to `cancelled` and returns the slot to `available` when the slot start time is farther away than `MIN_CANCELLATION_HOURS` from booking config.

#### Scenario: Cancel allowed
- **WHEN** the owner cancels a `confirmed` or `pending_confirmation` booking outside the cut-off window
- **THEN** the booking is `cancelled` and the slot is `available` again

#### Scenario: Cancel denied inside cut-off
- **WHEN** the owner tries to cancel inside the cut-off window
- **THEN** the cancellation is rejected and the booking keeps its current status
