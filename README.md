# nova-estate-

# NOVA ESTATES — Professional Real Estate Platform

**Company Details:**
- **Name:** NOVA ESTATES
- **Tagline:** Building Trust. Creating Futures.
- **Location:** Mahbubnagar, Telangana, India
- **Business:** Residential Plots, Apartments and Villas
- **Corporate Brand Palette:** White, Light Slate (`#F8FAFC`), Primary Blue (`#2563EB`), Corporate Navy (`#142B4E`)

---

## How to Run & Preview the Website

You have two convenient options to run the website locally on Windows:

### Option 1: Direct Browser Launch (Simplest & Instant)
1. Navigate to the project directory:
   `C:\Users\CHIST\.gemini\antigravity\scratch\nova-estates\NOVA_ESTATES`
2. Double-click **`index.html`** to open it in **Google Chrome**, **Microsoft Edge**, or your default browser.
3. To open the admin management suite, open **`admin.html`** or click the **"Admin Demo ↗"** button in the website navigation.

### Option 2: Local HTTP Server (Zero Dependencies)
A lightweight PowerShell HTTP server has been included. It requires no Python or Node.js installation.
1. Double-click **`start-server.bat`** (or in PowerShell run `.\serve.ps1`).
2. The server will launch at:
   👉 **`http://localhost:8080/`**
3. It will automatically open in your default browser.
4. Press `Ctrl + C` in the console window to stop the server when finished.

---

## Key Features & Upgrades Implemented

### 1. Corporate Brand Identity & UI Design
- Premium corporate aesthetic designed with the specified `#2563EB` (blue) and `#142B4E` (navy) palette.
- Modern typography utilizing *Plus Jakarta Sans* and *Manrope* font families with clean system fallback.
- Polished components including badge tags, shadow elevations, interactive cards, and responsive grids.

### 2. Full Device Responsiveness
- Tailored responsive layouts across desktop (1200px+), laptop (1024px), tablet (768px), and mobile (320px–540px).
- Mobile off-canvas navigation drawer with hamburger toggle button and quick WhatsApp shortcut.

### 3. Dedicated Individual Property Detail Pages
- **`property.html?id=[ID]`** provides comprehensive detail for every listing:
  - Interactive multi-photo gallery with thumbnail strip.
  - Complete specifications matrix (facing direction, carpet area, BHK, reference ID).
  - Infrastructure and amenity checklist.
  - Location distance markers to key Mahbubnagar landmarks (Collectorate, NH-44, Railway Station).
  - Interactive EMI / Loan Estimator calculator.
  - Sticky direct enquiry sidebar with prefilled property data.
  - "Share Link" and "Print Summary" actions.
  - Similar properties recommendation carousel.

### 4. Advanced Property Search, Filtering & Sorting
- **Hero Quick Search:** Filter by property type tabs (Plots, Apartments, Villas), locality, and budget bracket.
- **Interactive Listings Toolbar:**
  - Real-time keyword search (title, locality, ref code).
  - Type filter dropdown (Plot, Apartment, Villa).
  - Locality filter (Yenugonda, New Town, Jadcherla Road, Collectorate Area, Station Road).
  - Budget brackets (Under ₹25L, ₹25L–₹50L, ₹50L–₹1Cr, Above ₹1Cr).
  - Status filter (Available, Under Offer, Sold).
  - Sorting options (Featured, Price Low-to-High, Price High-to-Low, Area Small-to-Large, Area Large-to-Small).
  - Active filter chips with one-click removal and "Clear all filters" button.
  - Results counter (`Showing X of Y properties`).
  - Friendly empty state with illustration and one-click filter reset button.

### 5. Configurable WhatsApp Enquiry Integration
- Direct WhatsApp enquiry buttons integrated into:
  - Every property card.
  - The dedicated property detail page.
  - The mobile navigation drawer.
  - A pulsing floating WhatsApp widget in the bottom-right corner.
- Generates `wa.me` links with polite pre-filled messages citing property name and reference code.
- **Configurable Phone Number:** Centralized in `data.js` and editable in the Admin Dashboard Settings (`NOVA_CONFIG.whatsappNumber = "910000000000"`). No real personal phone number is invented.

### 6. Enquiry Form with Real-Time Validation
- Client-side validation for:
  - Full Name (minimum 3 characters).
  - Mobile Phone (valid 8–16 digit phone format).
  - Email Address (valid syntax pattern).
- Dynamic selection of specific properties in the interest dropdown.
- Visual feedback states (green border when valid, red border with error text when invalid).
- Submitting updates the UI with an animated loading spinner, toast notification, and instant persistence to `localStorage`.

### 7. Professional Admin Dashboard (`admin.html`)
- **Key Performance Indicators (KPIs):**
  - Total Properties, Active for Sale, Sold / Under Offer, Total Leads, and Estimated Pipeline Value.
- **Property Management (CRUD):**
  - Add new properties with photo preset picker, pricing, area, and specifications.
  - Edit existing property records.
  - Toggle property status (`Available`, `Under Offer`, `Sold`).
  - Delete properties from demo storage.
  - "Restore Demo Properties" button to revert to default curated listings.
- **Lead & Enquiry Pipeline Management:**
  - Search leads by customer name, phone, or interested property.
  - Filter by pipeline status (`New`, `Contacted`, `Site Visit Scheduled`, `Converted`, `Closed`).
  - View full enquiry message and record internal sales notes.
  - One-click WhatsApp link to contact the customer.
  - Export all leads to a formatted `.csv` file (`nova_estates_leads.csv`).
  - Add test leads button for rapid QA.
  - "Clear Demo Enquiries" with safety confirmation.
- **Settings Tab:**
  - Configure the demo WhatsApp number, company name, address, and email directly from the browser.

### 8. Clean, Shared Data Architecture (`data.js`)
- Single source of truth (`NovaStore`) shared between `index.html`, `property.html`, and `admin.html`.
- Adding or editing a property in the Admin Dashboard immediately reflects on the public site and property detail page without reloading or database lag.

### 9. Demo Transparency & Disclaimers
- In compliance with ethical guidelines, no fake customer testimonials or unverified legal approvals are included.
- Prominent banners and modals clearly identify all properties, prices, layouts, and contact records as fictional demonstration examples for Mahbubnagar, Telangana.

---

## File Structure

```text
NOVA_ESTATES/
├── index.html              # Main corporate real estate website
├── property.html           # Dedicated property detail page
├── property-details.html   # Fallback redirect to property.html
├── admin.html              # Admin Dashboard (CRUD & Lead Pipeline)
├── data.js                 # Centralized data store, config & localStorage helper
├── app.js                  # Website interactivity, filters & validation
├── admin.js                # Admin dashboard controller & CSV exporter
├── style.css               # Unified responsive stylesheet
├── serve.ps1               # PowerShell local HTTP web server
├── start-server.bat        # Double-click launcher for Windows
├── README.md               # Detailed documentation & user guide
└── README.txt              # Quick preview guide
```
