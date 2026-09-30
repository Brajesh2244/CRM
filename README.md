# K12 Hunar - Scholarship Management CRM Demo

A modern, responsive frontend demo for the **Scholarship Management CRM** built for the **K12 Hunar Frontend Developer Assessment**.

---

## 🌟 Live Demo & Highlights

- **Live URL**: [Deployable directly to Vercel / Netlify / GitHub Pages]
- **Framework**: React 19 + Vite 8 + Tailwind CSS v4 + Lucide React
- **Data Store**: Seeded with the 9 official assessment records (`src/data/initialScholarships.json`), with persistent `localStorage` support across page refreshes.

---

## 📋 Evaluation Criteria & Features Implemented

| Assessment Requirement | Weight | Implementation Details |
| :--- | :--- | :--- |
| **Required Features Work** | **40%** | • **4 Summary Cards**: Total (9), Published (3), Draft (3), Expired (3) computed dynamically with `useMemo`.<br>• **State Filter**: Multi-state filter for Bihar, Haryana, and Jharkhand.<br>• **Status Change**: Quick inline dropdown to switch status between Published, Draft, and Expired.<br>• **Add / Edit Form**: Modal supporting all 9 required fields.<br>• **Student Preview**: Interactive student-facing scholarship card modeled after `k12hunar.com/scholarships`. |
| **Simple & Clear Interface** | **25%** | Modern dashboard layout with clear status badges, typography, subtle animations, and clean contrast. |
| **Organized & Understandable Code** | **20%** | Modular component structure (`SummaryCards`, `FilterBar`, `ScholarshipTable`, `ScholarshipCardView`, `ScholarshipModal`, `StudentPreviewModal`) and custom hook (`useScholarships`). |
| **Mobile View & Basic Validation** | **10%** | • Fully responsive layout with automatic card view fallback on mobile devices.<br>• Form validation for required fields, character lengths, and URL formats. |
| **README & Explanation** | **5%** | Comprehensive documentation, architecture breakdown, and explanation of key flows. |

---

## 🚀 How to Run the Project Locally

### Prerequisites
- Node.js (v18 or higher recommended, tested on Node.js v24)
- npm or yarn

### Steps

1. **Clone or Extract the Repository:**
   ```bash
   git clone <repo-url>
   cd CRM
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🧭 How Core Features Work

### 1. Summary Metric Cards
- The `useScholarships` custom hook scans the current scholarship array using `useMemo`.
- Calculates counts for **Total Scholarships**, **Published**, **Draft**, and **Expired**.
- **Interactive shortcut**: Clicking any summary card automatically applies that status filter to the table.

### 2. State & Status Filtering
- Located in `src/components/FilterBar.jsx`.
- Supports filtering by:
  - **State**: All States, Bihar, Haryana, Jharkhand.
  - **Status**: All Statuses, Published, Draft, Expired.
  - **Search Query**: Real-time substring search against scholarship name, provider name, or class level.
- Filter criteria are combined cleanly in `App.jsx` using `useMemo` for optimal performance.

### 3. Inline Status Change
- In `src/components/StatusBadge.jsx`, each table row and mobile card has an interactive dropdown.
- Employees can change status directly from the table or card without opening a full edit form.
- Updates are saved to state and synced to `localStorage` immediately, accompanied by a toast notification.

### 4. Add / Edit Scholarship Form
- Located in `src/components/ScholarshipModal.jsx`.
- Handles all **9 required fields**:
  1. `Scholarship name` (Required, min 3 chars)
  2. `State` (Bihar, Haryana, Jharkhand, Other)
  3. `Provider name` (e.g. Welfare Department)
  4. `Applicable class` (Class 1-10, Class 9-10, Class 11-12, etc.)
  5. `Eligibility criteria` (Textarea with requirements)
  6. `Scholarship amount or benefit` (e.g. ₹10,000 / tuition fee)
  7. `Application deadline` (e.g. 30 Sep 2026 or Not stated)
  8. `Official application link` (Valid URL protocol check)
  9. `Status` (Published, Draft, Expired)
- Includes live field validation before form submission.

### 5. Student Card Preview
- Located in `src/components/StudentPreviewModal.jsx`.
- Matches the design language of `https://www.k12hunar.com/scholarships`.
- Renders how a student sees the scholarship:
  - State & class badges
  - Highlighted scholarship award/benefit card
  - Eligibility criteria list
  - Deadline urgency indicator
  - "Apply on Official Portal" direct external link (or closed notice if expired).

### 6. Reset Sample Data
- A **"Reset Sample Data"** button in the top navigation allows the evaluator to restore the exact 9 test records anytime.

---

## 🗂️ Project Structure

```
CRM/
├── index.html                   # HTML entry point with Plus Jakarta Sans font
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite + Tailwind CSS plugin config
└── src/
    ├── main.jsx                 # React root render
    ├── App.jsx                  # Main dashboard controller & state orchestration
    ├── index.css                # Tailwind CSS v4 styling rules
    ├── data/
    │   └── initialScholarships.json # 9 test records from the assessment PDF
    ├── hooks/
    │   └── useScholarships.js   # State management, localStorage persistence & CRUD
    └── components/
        ├── Header.jsx           # Brand header with reset button & links
        ├── SummaryCards.jsx     # 4 metric cards with interactive filter shortcuts
        ├── FilterBar.jsx        # Search, state filter, status filter, and view toggle
        ├── StatusBadge.jsx      # Color-coded badge with inline status switcher
        ├── ScholarshipTable.jsx # Clean desktop table view with actions
        ├── ScholarshipCardView.jsx # Mobile-friendly responsive card grid
        ├── ScholarshipModal.jsx # Add/Edit modal with 9 fields & validation
        └── StudentPreviewModal.jsx # Student view preview matching K12 Hunar style
```

---

## 🤖 Note on AI Tools & References Used

As requested in the submission instructions:
- **AI Tools Used**: Used Google Antigravity / Claude / Gemini as an AI coding assistant for scaffolding boilerplate components, drafting sample data schemas, and refining accessibility and CSS styles.
- **Online References**:
  - [K12 Hunar Scholarships](https://www.k12hunar.com/scholarships) (for understanding student-facing scholarship card layouts, eligibility details, and application link flows).
  - [Tailwind CSS v4 Documentation](https://tailwindcss.com) (for responsive styling and color palettes).
  - [Lucide Icons](https://lucide.dev) (for iconography).
