# 📋 System & Architecture Audit Report
**Project:** M/s Shreshtanshi Construction & Suppliers (Shresthanshi Solar Solutions)  
**Live Production URL:** [https://shresthanshisolarsolutions.vercel.app](https://shresthanshisolarsolutions.vercel.app)  
**Owner Portal URL:** [https://shresthanshisolarsolutions.vercel.app/owner-portal](https://shresthanshisolarsolutions.vercel.app/owner-portal)  
**Date of Audit:** November 2026  
**Status:** Operational (Production Verified)

---

## Executive Summary

The website is fully built, styled according to the 3-color brand guideline (Forest Green `#174B35`, Soft Green `#E8F2E8`, White `#FFFFFF`), and successfully deployed on Vercel. Both the public client site and the owner management console run from a single unified deployment.

This audit evaluates the codebase across **6 core categories**:
1. **Cross-Device Lead Capture & Data Persistence** *(Critical)*
2. **Authentication & Access Security** *(High)*
3. **Brand & Identity Consistency** *(Medium)*
4. **Frontend Bundle Performance & Code Splitting** *(Medium)*
5. **Form Spam Protection & Validation** *(Low to Medium)*
6. **SEO, OpenGraph & Social Sharing** *(Low to Medium)*

---

## 1. Audit Findings & Prioritized Action Items

### 🔴 Category 1: Cross-Device Lead Capture & Data Persistence (Priority: CRITICAL)

| Item | Current State | The Limitation / Problem | Recommended Change / Solution |
| :--- | :--- | :--- | :--- |
| **Lead Submissions Storage** | Inquiries from Contact Form, Quote Modal, and Guide Modal are stored in browser `localStorage`. | **Client vs Owner Isolation:** If an external client in Kalahandi visits the site from their smartphone and submits a quote request, the data is saved in **their phone's browser storage**. The owner checking the portal on their laptop **will not see that lead** unless both are on the same machine/browser. | **Connect a Central Cloud Backend:**<br>1. Connect **Supabase** (Free Tier PostgreSQL) or Firebase Firestore for real-time remote cloud sync.<br>2. Alternatively, add a free notification service like **Resend / EmailJS / Webhook to WhatsApp/Telegram** so whenever a lead submits, the owner receives an instant alert on their phone + the lead is inserted into the cloud database. |
| **Site Settings Sync** | Section visibility toggles and announcement text sync via `localStorage` and custom events. | Changes made in the owner portal currently apply only to visitors on the same browser instance. | Store global site settings in a light cloud KV store (e.g. Vercel KV or Supabase table `site_settings`). |

---

### 🟠 Category 2: Owner Portal Authentication & Security (Priority: HIGH)

| Item | Current State | The Limitation / Problem | Recommended Change / Solution |
| :--- | :--- | :--- | :--- |
| **Owner Credentials Verification** | Checked on the client side in `src/features/owner/OwnerPortalPage.tsx` (`admin` / `shresthanshi2026`). | A tech-savvy user inspecting the compiled JavaScript bundle (`index-xxxx.js`) could theoretically view the login string in source code. | **Serverless API Authentication:**<br>Move authentication to a Vercel Serverless Function `/api/auth/login`. Passwords are verified on the server side using bcrypt and issue a secure HTTP-Only session cookie or JWT. |
| **Route Masking** | Portal path is `/owner-portal` without public links in the navigation bar. | Route name is guessable by anyone typing the URL. | Keep the path unlisted, or allow configuring a customized private slug (e.g. `/admin-shresthanshi-console`). |

---

### 🟡 Category 3: Brand & Identity Alignment (Priority: MEDIUM)

| Item | Current State | The Limitation / Problem | Recommended Change / Solution |
| :--- | :--- | :--- | :--- |
| **Proprietor Fallback Data** | `src/data/company.ts` line 43 still has `founder.name: 'Mrs. Sinjita Shikha Mohapatra'`, while `proprietor` is `'Mr. Shubham Pratap Singh'`. | If a footer or legal snippet falls back to `companyConfig.founder.name`, it could display the removed name. | Update `companyConfig.founder.name` to match `Mr. Shubham Pratap Singh` or align strictly with the proprietor name throughout all configuration files. |

---

### 🟡 Category 4: Performance & Vite Bundle Splitting (Priority: MEDIUM)

| Item | Current State | The Limitation / Problem | Recommended Change / Solution |
| :--- | :--- | :--- | :--- |
| **Vite Bundle Size** | Main bundle `dist/assets/index-3qbyf0u2.js` is **1,096 kB** (uncompressed). | Rural users in Kalahandi and western Odisha on slower 3G/4G connections might experience an extra 0.5–1.0s delay on first load. | Configure `manualChunks` in `vite.config.ts`:<br>Split vendor libraries (`react`, `react-dom`, `react-router-dom`, `lucide-react`, `html2canvas`) into a separate `vendor.js` chunk. Use dynamic `React.lazy()` for the Owner Portal so regular site visitors never download the Owner Portal bundle. |

---

### 🟢 Category 5: Form Spam Protection (Priority: LOW-MEDIUM)

| Item | Current State | The Limitation / Problem | Recommended Change / Solution |
| :--- | :--- | :--- | :--- |
| **Form Protection** | Client-side input validation and error prompts. | Public forms on Vercel can occasionally receive automated spam bot submissions. | Add a hidden **Honeypot field** (`website_url_check`) in `src/features/contact/ContactPage.tsx` and `src/components/common/QuoteModal.tsx`. If filled by a bot, silently reject the submission without disturbing real human users. |

---

### 🟢 Category 6: SEO & Social Share Previews (Priority: LOW)

| Item | Current State | The Limitation / Problem | Recommended Change / Solution |
| :--- | :--- | :--- | :--- |
| **OpenGraph Meta Tags** | Canonical URL was pointing to `https://shresthanshi.com` in some tags. | When sharing `https://shresthanshisolarsolutions.vercel.app` on WhatsApp, the link thumbnail may fall back to default metadata. | Ensure `og:image` has an absolute URL pointing to a clean 1200x630 banner and canonical tags reflect the active production domain. |

---

## 2. Immediate Recommended Next Steps

1. **Step 1 (Immediate):** Align `companyConfig.founder.name` with `companyConfig.proprietor` to eliminate any lingering references to previous profile names.
2. **Step 2 (Immediate):** Implement code splitting in `vite.config.ts` to shrink the main bundle from ~1.1MB to under ~300KB for lightning-fast loading across Odisha.
3. **Step 3 (Next Phase):** Connect Supabase or a serverless webhook so inquiries from any visitor's phone in India flow into the owner's database and trigger an instant WhatsApp/Email alert to the proprietor.

