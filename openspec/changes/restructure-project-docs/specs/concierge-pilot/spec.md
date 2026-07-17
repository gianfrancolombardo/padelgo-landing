## ADDED Requirements

### Requirement: Concierge playbook documents the operating model
`docs/pilot/concierge-playbook.md` SHALL describe how Carlos runs an on-site session (setup, 5-minute briefing, train, pack-down) and the pre-launch ops gates (machine testing, insurance, T&Cs, cancellation/no-show policy).

#### Scenario: Session day checklist is usable
- **WHEN** Carlos arrives at a club for a booked session
- **THEN** the playbook lists the minimum steps from setup through pack-down

### Requirement: Customer journey is end-to-end
`docs/pilot/customer-journey.md` SHALL document: club QR/banner or social → VoleaBox web → choose slot → pay online → confirmation + welcome tutorial video (basic strokes: volea, drive, lob) → arrive → brief → train → end.

#### Scenario: Product requirements derived from journey
- **WHEN** Gian scopes the booking MVP
- **THEN** the journey doc lists required capabilities (slot selection, online payment, confirmation email with tutorial video link)

### Requirement: Launch checklist tracks blockers
`docs/pilot/launch-checklist.md` SHALL track blockers and owners for: machine validation, written Tenniix co-branding, pressurizer partner, club agreements, booking+payments web, welcome email/video, T&Cs/cancellation policy, and civil liability insurance.

#### Scenario: Team knows what blocks first club contact
- **WHEN** the team reviews the launch checklist before contacting clubs
- **THEN** incomplete prerequisites (machine test, Tenniix written brand use, pressurizer) are visibly blocking

### Requirement: Payments decision is documented as open with options
The pilot docs SHALL record that Carlos may not yet be registered as autónomo and MUST list payment approach options (register now vs temporary collection method) with a clear “decision pending” owner, without prescribing illegal workarounds.

#### Scenario: Payments open question is visible
- **WHEN** someone reads the pilot launch checklist or playbook
- **THEN** they see the payments/autónomo decision as an explicit open item owned by Carlos+Gian
