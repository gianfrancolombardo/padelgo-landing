## MODIFIED Requirements

### Requirement: Customer journey is end-to-end
`docs/pilot/customer-journey.md` SHALL document: club QR/banner or social → VoleaBox web → **user account (login or register)** → choose slot → pay online → confirmation + welcome tutorial video (basic strokes: volea, drive, lob) → arrive → brief → train → end.

#### Scenario: Product requirements derived from journey
- **WHEN** Gian scopes the booking MVP
- **THEN** the journey doc lists required capabilities (user authentication, slot selection, online payment, confirmation email with tutorial video link)

#### Scenario: Auth precedes booking in MVP sequence
- **WHEN** a player lands on the VoleaBox web from a club QR
- **THEN** they can create an account or sign in before accessing booking flows
