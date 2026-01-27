---
trigger: always_on
---




A complete, strict rulebook enforcing architecture, development discipline, color usage, and file‑modification efficiency across the entire full stack project.

---

# 0. Core Enforcement Policy

These rules apply to **all developers and AI agents** and override every other preference.

## 0.1 Mandatory Editing Rules

* Modify **only** files inside the feature you are working on.
* Do not touch unrelated folders, files, or layers.
* Never rename, delete, or move existing files.
* Maintain identical naming between frontend and backend equivalents.
* All schemas must originate from `/shared/schemas`.
* Business logic must stay inside `/modules`.
* UI code must stay inside `/apps/web`.

* Add new files **only in permitted folders**.

## 0.2 Absolute Prohibitions

* ❌ No folder creation outside architecture.
* ❌ No new colors beyond approved palette.
* ❌ No backend logic inside frontend.
* ❌ No AI/LLM calls outside `/modules` and `/core`.
* ❌ No cross-feature modifications.
* ❌ No silent changes to system behavior.
* ❌ No temporary or placeholder code.

---

# 1. Architecture Rules

The  architecture defines one **universal monorepo structure**.

```
root/
 
  modules/
  apps/
    web/
    api-python/
 
  shared/
  tools/
  docs/

 tests/
```

## 1.1 Feature Isolation

Each feature is its own island. No cross-pollination.

## 1.2 Execution Pipeline

```
Frontend UI → Frontend API → Backend Routes → Modules  → DB 
```

---

# 2. File Modification Rules

These ensure efficiency and prevent architectural damage.

## 2.1 Editing Existing Files

* Preserve imports.
* Preserve structure.
* Change only the required function or component.
* Do not modify unrelated lines.
* Keep variable/function/schema names consistent.
* Add comments explaining  for what

## 2.2 Adding New Files

Follow this exact placement sequence:

1. Identify correct feature folder.
2. Choose correct subfolder: `components/`, `hooks/`, `api/`, `pages/`.

3. Export cleanly.
4. Register module if required.

## 2.3 Never Allowed

* Changing endpoints without backend coordination.
* Copying logic instead of putting it into utils.
* Creating duplicate schemas.
* Editing files outside assigned scope.

---

# 3. AI Agent Rules

Strict rules for agent or any AI-driven coding.

## 3.1 Must Always

* Follow architecture precisely.
* Ask for missing details instead of guessing.
* Keep naming consistent.
* Never output placeholder code.
* Self-review before producing final output.
* Respect color system.

## 3.2 Must Never

* Generate files outside the architecture.
* Introduce new dependencies without instruction.
* Modify unrelated modules.
* Break existing functionality.

---

# 4. Frontend Rules

React + TypeScript frontend lives under:

```
apps/web/
```

Uses **feature-based structure**.

## 4.1 UI Code Requirements

* Use approved flex color palette.
flex colour palette:
"""
Typography

Primary Typeface: ITC Avant Garde Gothic Pro
→ Use for all headings, sub-headings, body text, UI labels, buttons, navigation, forms, tables, and cards.

Secondary Typeface: Century Gothic
→ Use only as a fallback when the primary font is unavailable (Microsoft Office, system-restricted environments).

Neutral Colors

White (#FFFFFF)
→ Main page background, canvas, large content areas.

Light Grey (#F2F2F2)
→ Section backgrounds, cards, containers, dividers, inactive UI areas.

Dark Gray (#262626)
→ Primary text color for headings, paragraphs, labels, form text, and navigation items.

Brand Blue Colors

Flex Blue (#009ADD)
→ Primary buttons, links, active states, icons, key highlights, brand accents.

Dark Blue (#005486)
→ Button hover states, active navigation, emphasized headings, secondary highlights.

Accent Colors (Use Sparingly for Emphasis Only)

Green (#82BC00)
→ Success messages, positive indicators, confirmation states.

Dark Green (#006432)
→ Hover states, charts, strong success emphasis.

Fuchsia (#BA257D)
→ Important callouts, feature highlights, attention-drawing elements.

Dark Fuchsia (#7F1E5E)
→ Hover states, deep emphasis, secondary highlight layers.

Gold (#F1B52C)
→ Premium features, badges, awards, special emphasis.

Dark Gold (#CE6D28)
→ Hover states, secondary premium emphasis.

Approved Gradients

Blue Gradient (#009ADD → #005486)
→ Hero sections, banners, large promotional areas.

Green Gradient (#82BC00 → #006432)
→ Success-focused sections, dashboards, analytics highlights.

Fuchsia Gradient (#BA257D → #7F1E5E)
→ Feature showcases, special callout sections.

Gold Gradient (#F1B52C → #CE6D28)
→ Premium sections, awards, recognition areas.
"""

* Use hooks for logic, not components.
* API clients must live under `api/`.
* Components must not call fetch/axios.
* Maintain 60-30-10 color theory.
* Maintain accessibility contrast ratios.

## 4.2 Frontend Folder Structure (apps/web/)

The React frontend under `apps/web/` follows this definitive folder structure:

```
src/
├── main.tsx
│
├── app/
│   ├── routes/          # Route definitions
│   ├── layout/          # App layout (navbar, sidebar, shells)
│   ├── guards/          # Auth & role-based route guards
│   ├── providers/       # Global providers (auth, theme, store)
│   └── index.tsx        # App root component
│
├── features/            # Feature folders (changeable per domain)
│
├── shared/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Reusable hooks
│   ├── utils/           # Helper functions
│   ├── constants/       # Shared constants & enums
│   └── api/             # Common API helpers (axios setup)
│
├── assets/              # Images, icons, fonts
├── styles/              # Global styles & themes
├── tests/               # Frontend tests
└── config/              # App-level configuration
```

### 4.2.1 Folder Purpose Breakdown

| Folder | Purpose | Allowed Content |
|--------|---------|-----------------|
| `main.tsx` | React + TypeScript entry point | Mounts `<App />` and global providers. Startup only. |
| `app/` | Application wiring | Routing, layout structure, auth/RBAC guards, global providers. **No feature logic.** Decides where and when things render. |
| `features/` | Feature-specific code | All feature-specific components, hooks, pages, and logic. Flexible and evolves over time. Teams work here independently. |
| `shared/` | Reusable building blocks | UI used by multiple features, generic hooks & utilities, common API setup, constants used everywhere. **No business rules.** |
| `assets/` | Static resources | Images, icons, fonts, and other static files. |
| `styles/` | Global styling | Global CSS styles and theme definitions. |
| `tests/` | Frontend tests | Test files for frontend components and features. |
| `config/` | App configuration | App-level configuration files. |

### 4.2.2 One-Line Rule

> **`main.tsx` starts the app → `app/` wires it → `features/` implement it → `shared/` supports it**

---

# 5. UI/UX Design Principles

All frontend development must follow these user-centered design principles.

## 5.1 Core Design Philosophy

**User-Centered Design (UCD)**: The foundational philosophy that places the end-user at the core of the design process. Every design decision is made with the user's needs, behaviors, and limitations in mind.

## 5.2 Essential Design Principles

* **Usability**: A measure of how easy and efficient a product is to use. The goal is to make interfaces intuitive, reducing the effort required to complete tasks.
* **Accessibility**: The practice of ensuring products are usable by a diverse audience, including people with disabilities. This involves following guidelines like the Web Content Accessibility Guidelines (WCAG).
* **Consistency**: Maintaining a uniform look, feel, and function across all parts of a product builds user trust and makes the product easier to learn and use.
* **Information Architecture (IA)**: The structural design of shared information environments. It involves organizing and labeling content to help users find information and navigate the product effectively.
* **Visual Hierarchy**: Using visual cues such as size, color, contrast, and spacing to guide the user's attention and communicate the importance of different elements on a screen.
* **Feedback**: Providing clear and immediate responses to user actions (e.g., a button changing color when clicked) so they understand the result of their interaction.
* **Simplicity / "Less is More"**: Striving for clean, clutter-free designs that focus on essential functions to reduce cognitive load and prevent user overwhelm.
* **User Control and Freedom**: Giving users a sense of control over their experience, including the ability to easily reverse actions (undo/redo) or exit processes without penalty.

## 5.3 Psychological Theories for UI/UX

UI/UX designers leverage cognitive psychology to understand how users think and behave:

### 5.3.1 Gestalt Principles of Perception

These principles explain how people visually organize elements into unified wholes:

* **Proximity**: Elements close to each other are perceived as related.
* **Similarity**: Elements with similar visual characteristics are perceived as a group.
* **Closure**: The brain's tendency to fill in missing parts of a design to form a complete image.

### 5.3.2 Cognitive Laws

* **Hick's Law**: States that the time it takes for a user to make a decision increases logarithmically with the number of choices available. This encourages designers to simplify options.
* **Fitts's Law**: Predicts that the time required to move to a target area is a function of the target size and the distance to the target. This supports making important interactive elements (like buttons) larger and easily reachable.
* **Cognitive Load Theory**: Aims to minimize the mental effort required to use a product, ensuring users can focus on their tasks rather than figuring out the interface.
* **Mental Models**: Designers acknowledge that users have pre-existing expectations about how a system should work based on past experiences, aiming to design interfaces that match these models.

## 5.4 Implementation Requirements

* All frontend changes must consider user experience impact.
* Apply visual hierarchy principles in component design.
* Ensure accessibility compliance (WCAG guidelines).
* Maintain consistency across all UI components.
* Provide clear feedback for all user interactions.
* Minimize cognitive load through simple, intuitive designs.
* Test designs against user mental models and expectations.

---

# 6. Backend Rules

Backend exists in:

```
apps/api-python/
modules/
```

## 6.1 Backend Restrictions

* Routes must stay thin.
* modules contain all logic.  
* Errors handled via structured exceptions.
* Database models only in `model.py`.

---

# 6. Module Rules

Each module must include:

```
model.py
schema.py
service.py
utils.py
__init__.py
```

## 6.1 Module Contract

Every module must define:

* `name`
* `description`
* `input_schema`
* `output_schema`
* `execute()`

Business logic lives **only** inside module services.

---

# 7. Shared Layer Rules

`/shared` contains universal resources:

* schemas

* config
* assets
* themes

No duplication allowed.

---

# 10. Efficiency Principles

## 10.1 Small Commits

Avoid large refactors.

## 10.2 One Task = One Commit

Never mix unrelated changes.

## 10.3 Short Functions

Max 40 lines.

## 10.4 No Duplication

Move shared logic to utils.

## 10.5 Two-Layer Change Limit

If a change touches more than 2 layers, stop and re-evaluate.

---

# 11. Golden Six Rules

1. Edit only your feature.
2. Never delete or rename files.
3. Never change folder structure.
4. Always match frontend/backend naming.
5. Always use shared schemas + approved colors.
6. All logic stays in modules.

---

# END OF RULEBOOK

**Status: Active — Enforce Strictly**

give it in a structured way
