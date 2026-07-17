## ADDED Requirements

### Requirement: Account shows the user's bookings
The `/account` page SHALL list the current user's upcoming active bookings (`confirmed` and `pending_confirmation`) with club, date, time, and status badge. It SHALL provide a primary action to start a new booking at `/book` and replace “coming soon” placeholder copy.

#### Scenario: Upcoming confirmed booking visible
- **WHEN** a logged-in user with a future `confirmed` booking opens `/account`
- **THEN** they see that booking's club, date, time, and confirmed status

#### Scenario: Pending confirmation booking visible
- **WHEN** a logged-in user has a `pending_confirmation` booking
- **THEN** account shows it with copy indicating club validation is pending

#### Scenario: Empty bookings state
- **WHEN** a logged-in user with no upcoming active bookings opens `/account`
- **THEN** they see an empty state and a CTA to `/book`

### Requirement: Account supports cancelling an eligible booking
From the account bookings list, the user SHALL be able to cancel a `confirmed` or `pending_confirmation` booking only when `canCancelBooking` from booking config returns true, with confirmation of the destructive action.

#### Scenario: Cancel from account
- **WHEN** the user confirms cancellation of an eligible booking from `/account`
- **THEN** the booking is removed from the upcoming list (or shown as cancelled) and inventory is restored

#### Scenario: Cancel disabled inside cut-off
- **WHEN** a booking is inside `MIN_CANCELLATION_HOURS`
- **THEN** the cancel action is disabled or hidden with explanatory copy

### Requirement: Post-auth redirect honors booking intent
When login or registration is initiated with a return path to `/book`, a successful auth SHALL redirect the user to `/book` instead of only `/account`.

#### Scenario: Login with next=/book
- **WHEN** an unauthenticated user signs in after following a booking CTA
- **THEN** they land on `/book` after successful authentication

## MODIFIED Requirements

### Requirement: Header and hero expose auth entry points
The B2C header SHALL expose booking-oriented primary conversion (see landing-booking-conversion) and account access when logged in. Hero and bottom CTA sections SHALL promote **booking** (with auth gate) as the primary conversion, with sign-in/register as supporting paths when needed—not waitlist capture and not “create account” as the sole primary CTA.

#### Scenario: Logged-out header
- **WHEN** no user session exists on the home page
- **THEN** the header shows a primary CTA that leads toward the booking funnel (via auth if needed)

#### Scenario: Logged-in header
- **WHEN** a user session exists on the home page
- **THEN** the header shows account access and a clear path to booking

#### Scenario: Hero promotes booking
- **WHEN** a visitor views the home hero
- **THEN** they see a primary CTA oriented to reserving a session (and secondary auth or learn-more as appropriate)
