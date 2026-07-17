## ADDED Requirements

### Requirement: Pilot docs include MVP security posture
Pilot and ops documentation SHALL describe the Netlify + Supabase MVP security baseline (RLS, RPC grants, Edge Function ownership, Auth password protections, security headers, no service-role in the client) and link or include a short verification checklist.

#### Scenario: Operator finds security baseline in docs
- **WHEN** someone opens the pilot docs or ops decision log after this change
- **THEN** they can find the MVP security posture and checklist items to verify before launch

### Requirement: Payments remain open but technically prepared
The pilot docs SHALL continue to treat online payment / autónomo as an open product decision, while noting that the booking model and webhook contract are prepared for a future PSP integration without claiming live payments.

#### Scenario: Payments open question still visible
- **WHEN** someone reads the launch checklist or playbook
- **THEN** they see payments as decision-pending, with technical prep noted as done or in progress separately from “payments live”
