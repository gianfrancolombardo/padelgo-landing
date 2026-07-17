## ADDED Requirements

### Requirement: Team and roles are explicit
`docs/ops/team-and-roles.md` SHALL state that the team has two members: Gian owns all technology/product engineering; Carlos owns all operations (partners, clubs, on-site concierge, legal/insurance prep).

#### Scenario: Ownership of a task is clear
- **WHEN** a task involves club outreach or on-site sessions
- **THEN** the roles doc assigns it to Carlos; when it involves booking web or integrations, it assigns it to Gian

### Requirement: AI-native principles are written
`docs/ops/ai-native-principles.md` SHALL define how the company uses the repo, OpenSpec, and AI agents: docs as source of truth, decisions logged, prefer automation after pilot validation, and keep secrets out of docs.

#### Scenario: Agent knows where truth lives
- **WHEN** an AI agent starts a new change
- **THEN** principles instruct it to read `docs/README.md` and relevant active docs before proposing product work

### Requirement: Decision log captures material choices
`docs/ops/decision-log.md` SHALL record dated decisions with context, options, choice, and owner — at minimum seeding entries for: concierge-first pilot, Tenniix hardware partner, two-person role split, and pending payments approach.

#### Scenario: Why concierge-first is discoverable
- **WHEN** a future contributor asks why lockers are not the current GTM
- **THEN** the decision log explains concierge-first validation before autonomous hub investment
