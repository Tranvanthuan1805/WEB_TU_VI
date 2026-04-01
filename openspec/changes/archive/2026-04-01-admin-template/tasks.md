## 1. Admin Layout Foundation

- [x] 1.1 Create AdminLayout.razor.css with admin theme CSS variables (primary: #1E3A8A, secondary: #64748B, surface colors)
- [x] 1.2 Implement AdminLayout.razor with sidebar navigation (logo, Dashboard, Articles, Config, Users, Settings links)
- [x] 1.3 Add top header with search input, notification icon, user avatar
- [x] 1.4 Implement responsive sidebar toggle (hamburger menu on mobile < 768px)
- [x] 1.5 Add active state styling for current navigation item

## 2. Theme System Implementation

- [x] 2.1 Create theme.css in vite-project/src/css/ with :root theme (main site - dark + gold)
- [x] 2.2 Add [data-theme="admin"] selector in theme.css (admin - light blue #1E3A8A)
- [x] 2.3 Import theme.css in style.css
- [x] 2.4 Add data-theme="admin" attribute to AdminLayout.razor
- [x] 2.5 Update MainLayout.razor.css to use CSS custom properties from :root

## 3. Dashboard Implementation

- [x] 3.1 Update Dashboard.razor to use @layout AdminLayout
- [x] 3.2 Add 4 stats cards: Total Users, Total Articles, Monthly Views, Active Sessions (with trend indicators)
- [x] 3.3 Implement Chart.js line chart for traffic analysis in OnAfterRender
- [x] 3.4 Add View/Users toggle buttons for chart
- [x] 3.5 Create recent activity list component with 4+ items
- [x] 3.6 Build system users table with Member, Role, Status, Activity, Actions columns
- [x] 3.7 Update Dashboard.razor.css to use CSS custom properties (--primary, --secondary, etc.) instead of hardcoded admin-* values

## 4. Manager Implementation

- [x] 4.1 Update Manager.razor to use @layout AdminLayout
- [x] 4.2 Add search bar with filtering (search by title/author)
- [x] 4.3 Add category dropdown filter (All Categories, Urbanism, Interiors, Sustainability, Theory)
- [x] 4.4 Build article data table with thumbnail, title, category, author, status badge, date, action buttons
- [x] 4.5 Add pagination component with page numbers and prev/next
- [x] 4.6 Integrate TinyMCE editor for create/edit article form (Title, Content, Cover Image)
- [x] 4.7 Update Manager.razor.css to use CSS custom properties instead of hardcoded admin-* values

## 5. Config Implementation

- [x] 5.1 Update Config.razor to use @layout AdminLayout
- [x] 5.2 Build General Settings section: Site Name input, Primary Email input, Logo upload with preview
- [x] 5.3 Build Admin Profile section: Avatar with change button, Full Name input, New Password input
- [x] 5.4 Build SEO Configuration section: Meta Title input, Keywords tags (with add/remove), Meta Description textarea with char count
- [x] 5.5 Add sticky save bar at bottom with "Discard Changes" and "Deploy Configurations" buttons
- [x] 5.6 Update Config.razor.css to use CSS custom properties instead of hardcoded admin-* values

## 6. Integration & Testing

- [x] 6.1 Ensure all admin pages use AdminLayout via @layout directive
- [x] 6.2 Verify admin theme colors don't affect main site (gold/yellow theme intact)
- [x] 6.3 Test responsive layout at mobile breakpoint (< 768px)
- [x] 6.4 Verify Chart.js renders correctly on Dashboard
- [x] 6.5 Verify TinyMCE editor works on Manager page
- [x] 6.6 Verify data-theme="admin" correctly applies blue theme colors