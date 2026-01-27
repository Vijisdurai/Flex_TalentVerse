# Flex Talentverse – Project Structure & Implementation Guide

## Purpose
This document defines the **mandatory project structure** for Flex Talentverse. It is designed to be **clear, concise, and easy to implement**, with strict separation of responsibilities and a **single, centralized location for tests**.

Only the following top-level folders are allowed:
- `apps/`
- `modules/`
- `shared/`
- `tests/`
- `tools/`
- `docs/`

---

## Top-Level Structure

```
flex-talentverse/
├── apps/
├── modules/
├── shared/
├── tests/
├── tools/
├── docs/
└── README.md
```

---

## apps/ — Runtime Applications

### What goes here
- Application bootstrap code
- Framework setup (FastAPI, React)
- Routing and middleware wiring
- Environment and runtime configuration

### What does NOT go here
- Business logic
- Authentication rules
- Role-based decisions
- Database logic

### Rule
`apps/` may call modules, but **modules must never depend on apps**.

---

## modules/ — Business Logic

### Purpose
Each folder inside `modules/` represents **one independent business capability**. All system rules, workflows, and permissions live here.

### Modules in Flex Talentverse
- `auth` – Authentication (Google OAuth, credentials, tokens)
- `users` – User identity and role mapping
- `students` – Student profiles
- `hr` – HR operations
- `colleges` – College profiles
- `jobs` – Job postings and eligibility
- `events` – Recruitment events
- `applications` – Applications and registrations
- `evaluations` – Evaluation and shortlisting
- `reports` – Analytics and reporting
- `notifications` – Email and SMS notifications

### Rules
- Modules do not import other modules
- Each module enforces its own RBAC rules
- Modules expose clear input/output contracts
- Modules are framework-independent

---

## shared/ — System Contracts

### Purpose
`shared/` contains **common definitions used across all modules and apps**.

### Contains
- Schemas (data contracts)
- Role and permission definitions
- Status constants
- Shared messages and enums

### Does NOT contain
- Business logic
- Services
- Database queries

---

## tests/ — Centralized Testing

### Purpose
All tests for the entire system live in **one place**.

### Structure
- Tests are grouped by target (`apps` or `modules`)
- Business rules are tested at the module level
- Request flows are tested at the app level

### Rule
No test files are allowed inside `apps/` or `modules/`.

---

## tools/ — Development Utilities

### Purpose
Support development, automation, and operations.

### Examples
- Database migrations
- Code and schema generators
- CI/CD configuration
- Seed and demo data

---

## docs/ — Documentation

### Purpose
System documentation for development, review, and evaluation.

### Recommended Sections
- Architecture
- Module responsibilities
- API specifications
- Database design
- Security and RBAC

---

## Implementation Rules (Mandatory)

1. No business logic in `apps/`
2. No cross-module imports
3. All shared contracts must live in `shared/`
4. All tests must live in `tests/`
5. New features must be implemented as new modules

---

## Summary

This structure ensures that Flex Talentverse is:
- Easy to understand
- Easy to scale
- Easy to test
- Easy to review

All contributors must follow this structure exactly.

