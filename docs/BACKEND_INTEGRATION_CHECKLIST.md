# PayVoice — Future Backend & Provider Integration Checklist

> **Disclaimer**: The current codebase provides a verified, production-grade frontend architecture with simulated demo data. Real payment alerts, live ad SDK networks, and subscription collection require authorized banking contracts, publisher approvals, and regulatory compliance.

---

## 1. Authorized Payment Alerts & Bank Integration
- [ ] **NPCI / UPI Provider Agreement**: Establish authorized merchant acquirer or payment aggregator integration (e.g. Yes Bank, Axis Bank, ICICI, Razorpay, Cashfree, or PhonePe Merchant APIs).
- [ ] **Webhook Gateway**:
  - Secure HTTPS endpoint with HMAC-SHA256 signature verification.
  - Idempotency key handling to prevent duplicate voice announcements for replayed webhook retries.
  - Payer VPA masking and PII protection conforming to RBI guidelines.
- [ ] **Real-time WebSockets / SSE**: Replace local simulation in `AppContext.tsx` with authenticated WebSocket or Server-Sent Events channel authenticated with short-lived JWT tokens.
- [ ] **Soundbox Hardware Firmware API**: Interface with 4G LTE cellular IoT hardware module via MQTT/CoAP for hardware speaker synchronization.

---

## 2. Policy-Safe Ad Network Integration (Google AdMob / GAM)
- [ ] **Publisher Policy Verification**: Review [Google AdMob and AdSense Publisher Policies](https://support.google.com/admob/answer/6128543).
- [ ] **App/Site Eligibility**: Complete domain ownership verification and app store listing review.
- [ ] **Consent Management Platform (CMP)**: Deploy Google-certified CMP for GDPR/DPDP user consent collection before initializing ads.
- [ ] **Adapter Migration**:
  - Implement `AndroidAdMobAdapter` inside `apps/android` using Google Mobile Ads SDK (`com.google.android.gms:play-services-ads`).
  - Implement `WebAdNetworkAdapter` inside `apps/web` using Google Publisher Tag (GPT) or AdSense script loader.
- [ ] **Continuous Policy Audit**:
  - Verify `AdPolicyGuard.isPlacementAllowed()` continues to prevent any ads on payment success, voice controls, active games, or login screens.
  - Ensure zero forced ads, countdown locks, or deceptive clicks.

---

## 3. Business Premium Subscription Billing
- [ ] **Recurring Mandate Provider**: Integrate e-Mandate / UPI Autopay / Card recurring billing via RBI-approved Payment Aggregator (PA).
- [ ] **Webhook Synchronization**:
  - `subscription.charged`: Extend merchant premium expiration timestamp.
  - `subscription.cancelled`: Grace period handling, restore non-premium tier cleanly.
- [ ] **Server-Side Entitlement Authority**: Do not rely on `localStorage` for premium feature gating in production. Validate JWT claims on every protected API call.
- [ ] **Tax Invoicing**: Automatic GST invoice generation with West Bengal SGST/CGST breakdown.

---

## 4. Security, Auth & Data Privacy
- [ ] **Multi-Factor Merchant Auth**: Replace demo OTP with secure SMS/WhatsApp OTP via telecom DLT-registered sender ID.
- [ ] **Zero PIN Storage**: Reaffirm that UPI PINs, bank passwords, and sensitive card CVVs are NEVER captured or stored anywhere on the client or server.
- [ ] **Role-Based Access Control (RBAC)**: Enforce counter staff permissions (e.g. sound receiver vs manager vs owner) via server-side session tokens.
- [ ] **Legal Review**: Complete draft review of `PrivacyPage.tsx` and `TermsPage.tsx` with qualified Indian corporate and fintech legal counsel.
