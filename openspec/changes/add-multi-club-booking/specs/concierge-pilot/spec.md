## MODIFIED Requirements

### Requirement: Customer journey is end-to-end
`docs/pilot/customer-journey.md` SHALL document: club QR/banner or social → VoleaBox web → **user account (login or register)** → **multi-club booking (club → day → time → confirm)** → **confirmation email** (+ welcome tutorial video link when available) → arrive → brief → train → end. Online payment SHALL remain documented as a follow-up step pending the open PSP/autónomo decision, not as a hard blocker to creating a confirmed booking in the MVP web flow.

#### Scenario: Product requirements derived from journey
- **WHEN** Gian scopes the booking MVP
- **THEN** the journey doc lists required capabilities (user authentication, multi-club slot selection, persisted booking, confirmation email with tutorial video link when available) and marks online payment as decision-pending

#### Scenario: Auth precedes booking in MVP sequence
- **WHEN** a player lands on the VoleaBox web from a club QR
- **THEN** they can create an account or sign in before accessing booking flows

#### Scenario: Booking does not require payment to confirm in MVP
- **WHEN** a logged-in player completes the booking confirmation step
- **THEN** the journey treats the booking as `confirmed` by default for ops/show-up tracking even if online payment is not yet enabled

#### Scenario: Pending confirmation is documented for future club validation
- **WHEN** the journey doc describes booking states
- **THEN** it notes `pending_confirmation` for clubs that require manual approval, with default auto-confirm for the pilot

### Requirement: Launch checklist tracks blockers
`docs/pilot/launch-checklist.md` SHALL track blockers and owners for: machine validation, written Tenniix co-branding, pressurizer partner, club agreements, **booking web (multi-club + email confirmation)**, payments (open decision), welcome email/video, T&Cs/cancellation policy, and civil liability insurance.

#### Scenario: Team knows what blocks first club contact
- **WHEN** the team reviews the launch checklist before contacting clubs
- **THEN** incomplete prerequisites (machine test, Tenniix written brand use, pressurizer) are visibly blocking

#### Scenario: Booking product item reflects multi-club scope
- **WHEN** the team reviews product checklist items
- **THEN** the booking web item explicitly covers multi-club selection and confirmation email, separate from the open payments decision
