## ADDED Requirements

### Requirement: Booking model is payment-provider ready
The booking data model SHALL support a future online payment flow without requiring a redesign of core tables. This includes the existing `pending_payment` status in the active-slot uniqueness rules and nullable payment metadata columns on `bookings` (amount, currency, provider, provider payment id, paid timestamp) added in a forward-compatible migration.

#### Scenario: Pending payment reserves the slot
- **WHEN** a booking exists with status `pending_payment` for a slot
- **THEN** no second active booking may claim that same slot under the unique active-booking index

#### Scenario: Payment metadata columns exist and are unused by current create flow
- **WHEN** the current MVP `create_booking` path creates a booking
- **THEN** payment metadata columns remain null and status remains the non-payment MVP default (`confirmed` or `pending_confirmation` per club config)

### Requirement: Future payment confirmation is webhook-driven and server-authoritative
The design and docs SHALL specify that payment confirmation MUST occur via a server-side webhook (Edge Function) that verifies provider signatures, is idempotent on provider payment id, and transitions `pending_payment` → `confirmed` using privileged server credentials—not via trusting client-reported payment success.

#### Scenario: Client cannot self-confirm payment
- **WHEN** a future payment integration is implemented per this prep
- **THEN** there is no client-callable path that sets `confirmed` solely because the browser claims payment succeeded

#### Scenario: Duplicate webhook is safe
- **WHEN** the provider retries the same successful payment notification
- **THEN** the booking remains confirmed once and side effects are idempotent

### Requirement: Price source of truth is server-side
Payment prep docs SHALL require that chargeable amounts come from server-side configuration (e.g. club or global price), never from an amount field supplied solely by the client at checkout time.

#### Scenario: Client-supplied amount is not authoritative
- **WHEN** a payment session is created in a future integration
- **THEN** the amount charged is taken from server configuration, not from unchecked client input

### Requirement: Pilot docs record payment as prepared not shipped
Pilot / ops documentation SHALL state that online payment is prepared at the data/contract level but not implemented, and that the autónomo / PSP decision remains an open checklist item.

#### Scenario: Launch checklist distinguishes prep vs live payments
- **WHEN** someone reads the launch checklist or decision log after this change
- **THEN** they see payment integration as prepared-for, not live, with owner and open decision visible
