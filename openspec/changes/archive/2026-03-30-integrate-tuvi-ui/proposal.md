## Why

The current User.razor page has a basic Bootstrap-style form for entering birth information. We need to integrate a modern dark-themed UI design (Lá Số Tử Vi) to provide a more polished and engaging user experience for the Tử Vi (Vietnamese Horoscope) application.

## What Changes

- Update Tailwind CSS configuration with custom dark theme colors matching the design
- Create NavMenu component for header navigation
- Create Footer component for footer
- Update MainLayout to use NavMenu and Footer components
- Create User/Home.razor page with 3-column layout matching the code.html design
- Add new form fields: Full name, Calendar type toggle (Solar/Lunar)
- Update time picker to use traditional Vietnamese zodiac hours (12 Chi)
- Add decorative Bagua placeholder section
- Update article cards styling to match new theme
- Remove pagination from articles section

## Capabilities

### New Capabilities

- **tuvi-ui-theme**: Custom Tailwind CSS theme configuration with dark mode colors
- **tuvi-nav-menu**: Header navigation component with mobile hamburger menu
- **tuvi-footer**: Footer component with navigation links
- **tuvi-main-layout**: Main layout integrating NavMenu and Footer
- **tuvi-user-page**: Redesigned user page at User/Home.razor with 3-column layout and expanded form

### Modified Capabilities

- None. This is a new UI implementation without backend changes.

## Impact

- Files Modified:
  - `Web/Web/vite-project/tailwind.config.js` - Add custom colors
  - `Web/Web/Components/Layout/MainLayout.razor` - Integrate NavMenu and Footer
  - `Web/Web/Components/Layout/NavMenu.razor` - New header component
  - `Web/Web/Components/Layout/Footer.razor` - New footer component
  - `Web/Web/Components/Pages/User/Home.razor` - New main page

- Dependencies:
  - Tailwind CSS v3+ (already in project via vite-project)
  - Google Fonts (Noto Serif, Manrope, Material Symbols)

- No breaking changes to existing functionality - this is a UI-only enhancement.
