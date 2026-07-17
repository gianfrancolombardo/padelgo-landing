## ADDED Requirements

### Requirement: Primary landing CTAs drive booking conversion
On the B2C home page, the primary hero CTA and the primary bottom CTA SHALL route users toward booking (`/book`), sending unauthenticated users through login/register with a return path to `/book`.

#### Scenario: Logged-out hero CTA
- **WHEN** a logged-out visitor clicks the primary hero CTA
- **THEN** they are taken to auth with `next` (or equivalent) pointing to `/book`

#### Scenario: Logged-in hero CTA
- **WHEN** a logged-in visitor clicks the primary hero CTA
- **THEN** they are taken directly to `/book`

### Requirement: Header CTA aligns with booking intent
The B2C header primary CTA SHALL prioritize booking access (with the same auth+next behavior when logged out) rather than only generic “account” as the sole conversion action. Logged-in users MAY still reach account via a secondary control.

#### Scenario: Logged-out header promotes booking
- **WHEN** no session exists on the home page
- **THEN** the header primary CTA leads toward the booking funnel (via auth if needed)

### Requirement: Supporting sections reduce booking friction
The B2C landing SHALL include short support content for conversion: a how-it-works path consistent with reserve → train, and a concise FAQ covering session length/what is included and cancellation/no-show expectations at a high level.

#### Scenario: FAQ answers cancellation at high level
- **WHEN** a visitor reads the FAQ section
- **THEN** they see clear guidance that reservations can be cancelled subject to a notice window (without inventing unpaid legal policy text beyond what ops has approved)

### Requirement: Waitlist is not the primary conversion path
Email waitlist capture SHALL NOT be the primary hero conversion mechanism on the B2C home; booking (and auth-as-gate) SHALL take precedence.

#### Scenario: Hero does not lead with waitlist-only
- **WHEN** a visitor views the home hero
- **THEN** the primary action is booking-oriented, not waitlist email submit
