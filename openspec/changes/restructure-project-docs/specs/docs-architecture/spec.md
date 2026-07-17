## ADDED Requirements

### Requirement: Canonical docs folder taxonomy
The project documentation system SHALL organize active docs under `docs/` with the folders `strategy/`, `brand/`, `partners/`, `pilot/`, `ops/`, and `archive/`, and SHALL expose a single entrypoint at `docs/README.md`.

#### Scenario: Contributor finds the source of truth
- **WHEN** a contributor opens `docs/README.md`
- **THEN** they see links to all active canonical docs and a clear note that `archive/` is historical only

### Requirement: Active vs archive separation
Historical or superseded documents SHALL live under `docs/archive/` and MUST NOT be presented as current operating truth in the docs index.

#### Scenario: Legacy locker analysis is archived
- **WHEN** the former `IDEA.md` / locker-era analyses are migrated
- **THEN** they are moved under `docs/archive/` and the index labels them as superseded by the concierge-pilot model

### Requirement: Minimal necessary content rule
Each active document SHALL declare owner, last-updated date, and status (`draft` | `active` | `superseded`), and SHALL avoid duplicating content that already exists in another canonical doc (link instead).

#### Scenario: Duplicate strategy text is rejected
- **WHEN** a new active doc would repeat the Lean Canvas value proposition in full
- **THEN** it MUST link to `strategy/lean-canvas.md` instead of copying the section

### Requirement: Repo README points to docs index
The repository root `README.md` SHALL include a short project identity blurb and a link to `docs/README.md` as the documentation entrypoint.

#### Scenario: New clone discovers docs
- **WHEN** a reader opens the root README
- **THEN** they can navigate to the documentation index in one click
