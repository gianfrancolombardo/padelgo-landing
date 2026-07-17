## ADDED Requirements

### Requirement: Booking business rules live in one config module
The application SHALL define shared booking constants in a single module (`lib/bookingConfig.ts`), including at minimum `DEFAULT_SLOT_DURATION_MINUTES` (default `60`) and `MIN_CANCELLATION_HOURS` (default `12`). UI copy, eligibility checks, and server-side cancellation logic SHALL derive from these values, not hard-coded literals scattered across the codebase.

#### Scenario: Changing cancellation window in one place
- **WHEN** `MIN_CANCELLATION_HOURS` is updated in `bookingConfig.ts` (and the paired RPC constant is updated per migration comment)
- **THEN** the account cancel button, FAQ text, and `cancel_booking` RPC enforce the same notice window

#### Scenario: Default slot duration is centralized
- **WHEN** a new club is seeded without an explicit `slot_duration_minutes`
- **THEN** slot generation uses `DEFAULT_SLOT_DURATION_MINUTES` from the config module

### Requirement: Cancellation eligibility is testable
The config module SHALL expose a pure helper (e.g. `canCancelBooking(slotStartsAt, now)`) used by the UI and covered by unit tests.

#### Scenario: Inside cut-off
- **WHEN** `canCancelBooking` is called with a slot starting sooner than `MIN_CANCELLATION_HOURS` from now
- **THEN** it returns false

#### Scenario: Outside cut-off
- **WHEN** `canCancelBooking` is called with a slot starting later than `MIN_CANCELLATION_HOURS` from now
- **THEN** it returns true
