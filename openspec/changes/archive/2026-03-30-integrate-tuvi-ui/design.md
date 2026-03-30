## Context

The project uses a .NET 10 Blazor Server application with Bootstrap for styling. The current page has basic form functionality for entering birth information to generate Tử Vi (Vietnamese Horoscope) charts. The goal is to integrate a modern dark-themed UI design to improve the user experience.

Current state:
- Bootstrap-based styling with custom CSS variables
- Single-column layout
- Basic form with Date, Hour, Gender fields
- Article cards with pagination

## Goals / Non-Goals

**Goals:**
- Implement dark-themed UI matching "Lá Số Tử Vi" design
- Create NavMenu component for header navigation with mobile hamburger menu
- Create Footer component for footer
- Create 3-column layout (sidebar, main content, decorative sidebar)
- Expand form with Full Name and Calendar Type fields
- Use traditional Vietnamese zodiac hours (12 Chi) for time picker
- Add decorative Bagua placeholder section

**Non-Goals:**
- Backend logic changes (form handling, horoscope calculation)
- Authentication/user management UI
- Mobile-responsive optimizations beyond basic Tailwind classes
- Actual horoscope chart rendering (placeholder only)

## Decisions

### 1. Tailwind CSS Integration
**Decision:** Extend existing Tailwind configuration with custom colors
**Rationale:** Project already has vite-project with Tailwind. Adding custom colors to config is cleaner than inline styles.

### 2. Layout Structure
**Decision:** 3-column grid layout using Tailwind grid (col-lg-3, col-lg-6, col-lg-3)
**Rationale:** Matches design pattern, provides clear content hierarchy

### 3. Component-Based Architecture
**Decision:** Create separate NavMenu and Footer components
**Rationale:** Better code organization, reusability, follows Blazor best practices

### 4. Form Field Order
**Decision:** Full Name → Date → Calendar Type → Hour → Gender
**Rationale:** Follows logical flow: identity → birth details → submit

### 5. Calendar Type Toggle
**Decision:** Two-button toggle (Dương Lịch / Âm Lịch) with active state styling
**Rationale:** Clear visual indication of selected option

### 6. Time Picker
**Decision:** Dropdown with 12 traditional Chi hours (Tý, Sửu, Dần, Mão, etc.)
**Rationale:** Traditional Vietnamese horoscope uses these divisions

### 7. Mobile Navigation
**Decision:** Use Blazor @onclick to toggle mobile menu state
**Rationale:** More reliable than CSS checkbox hack in Blazor

## Risks / Trade-offs

- [Risk] Dark theme may have accessibility issues with contrast → Mitigation: Use high-contrast colors from design
- [Risk] Tailwind config conflicts with existing styles → Mitigation: Use specific class names
- [Risk] Large layout change may break existing page functionality → Mitigation: This is UI-only, no backend changes

## Migration Plan

1. Update tailwind.config.js with custom colors
2. Create NavMenu component with header and mobile menu
3. Create Footer component
4. Update MainLayout to use NavMenu and Footer
5. Create User/Home.razor with new 3-column layout design
6. Test locally with `dotnet run`

No rollback needed - old files can be restored from git if needed.

## Open Questions

- Should the navigation links be implemented with actual routes now?
- Do we need to add more footer content (newsletter signup)?
