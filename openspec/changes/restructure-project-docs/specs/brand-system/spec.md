## ADDED Requirements

### Requirement: Brand book is the single visual source of truth
The documentation set SHALL include `docs/brand/brandbook.md` covering personality, color tokens, typography, UI motifs, iconography, photography direction, motion, and layout constraints aligned with the live landings where still valid.

#### Scenario: Designer implements a CTA
- **WHEN** a designer or engineer needs CTA colors and type
- **THEN** they can obtain hex values and font roles from `brandbook.md` without consulting archive docs

### Requirement: Voice and imagery guidelines exist
`docs/brand/voice-and-imagery.md` SHALL define brand voice (tone, do/don’t), partner co-branding rules (including “Powered by Tenniix” once confirmed), and imagery rules for club/QR/marketing assets used in the pilot.

#### Scenario: Club banner copy is on-brand
- **WHEN** Carlos prepares a QR banner for a club
- **THEN** voice-and-imagery guidelines specify tone, co-branding, and visual constraints for that asset

### Requirement: Brand docs mark deprecated choices
If a previous brand choice is no longer desired (e.g. default Inter-only body stack called out as tech-SaaS default), the brand docs SHALL state the current rule explicitly so agents do not reinstate deprecated patterns from old copy.

#### Scenario: Agent avoids deprecated type guidance
- **WHEN** an AI agent reads the brand system to style UI
- **THEN** it follows the current typography rules in `brandbook.md`, not superseded text from archive
