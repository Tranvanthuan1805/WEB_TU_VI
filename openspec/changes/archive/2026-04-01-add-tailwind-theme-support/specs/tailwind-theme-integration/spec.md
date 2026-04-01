## ADDED Requirements

### Requirement: Tailwind theme integration via @theme block
Web app SHALL use `@theme` block in theme.css to enable Tailwind CSS v4 to recognize CSS custom properties as utility classes.

#### Scenario: @theme block defines color mappings
- **WHEN** theme.css is loaded by Tailwind v4
- **THEN** all color CSS variables from :root and [data-theme="admin"] are accessible as utility classes (e.g., `text-primary`, `bg-surface`)

### Requirement: Main theme (dark + gold) colors work
The default dark + gold theme colors defined in `:root` SHALL be accessible via Tailwind utility classes.

#### Scenario: Background utility class works
- **WHEN** element has `class="bg-background"`
- **THEN** background color is `#131013` (from `--background` in :root)

#### Scenario: Surface utility classes work
- **WHEN** element has `class="bg-surface"` or `class="bg-surface-container-lowest"`
- **THEN** background is `--surface` or `--surface-container-lowest` color from :root

#### Scenario: Text utility classes work
- **WHEN** element has `class="text-primary"`, `class="text-on-surface-variant"`, or `class="text-primary-container"`
- **THEN** text color is `--primary`, `--on-surface-variant`, or `--primary-container` from :root

#### Scenario: Border utility classes work
- **WHEN** element has `class="border-outline"` or `class="border-outline-variant"`
- **THEN** border color is `--outline` or `--outline-variant` from :root

### Requirement: Admin theme (light) colors work
The admin light theme colors defined in `[data-theme="admin"]` SHALL be accessible via Tailwind utility classes when theme is active.

#### Scenario: Admin background utility class works
- **WHEN** parent has `data-theme="admin"` and element has `class="bg-background"`
- **THEN** background color is `#F8FAFC` (from `--background` in [data-theme="admin"])

#### Scenario: Admin text utility classes work
- **WHEN** parent has `data-theme="admin"` and element has `class="text-primary"`
- **THEN** text color is `#1E3A8A` (from `--primary` in [data-theme="admin"])

#### Scenario: Admin surface utility classes work
- **WHEN** parent has `data-theme="admin"` and element has `class="bg-surface"`
- **THEN** background color is `#F8FAFC` (from `--surface` in [data-theme="admin"])
