## ADDED Requirements

### Requirement: Transactional emails use a shared brand layout
All transactional emails sent by VoleaBox SHALL be rendered through a shared layout (`renderVoleaEmail`) that applies brand tokens (dark background, `#3BFF76` accent, VoleaBox header/footer) documented in `docs/brand/email-templates.md` and `docs/brand/brandbook.md`.

#### Scenario: Booking email uses shared layout
- **WHEN** a booking confirmation email is generated
- **THEN** the HTML includes the VoleaBox shell (brand label, headline block, footer) from the shared layout module

#### Scenario: New template follows layout contract
- **WHEN** a new transactional template is added under `lib/email/templates/`
- **THEN** it is registered in `lib/email/registry.ts` and uses `renderVoleaEmail` rather than ad-hoc HTML

### Requirement: Email template catalog tracks live and planned templates
The repository SHALL maintain a catalog of email template IDs with status (`live`, `planned`, `deprecated`) covering at minimum: booking confirmation, booking pending confirmation, booking cancelled, club booking request, welcome tutorial.

#### Scenario: Catalog lists booking templates as live
- **WHEN** a developer reads `lib/email/registry.ts`
- **THEN** booking confirmation and pending confirmation templates are marked `live`

#### Scenario: Future templates are documented before implementation
- **WHEN** a new email type is proposed (e.g. cancellation)
- **THEN** its template ID appears in the registry as `planned` before code ships
