# Figma Design Guidelines

## 1. Initial Setup

### Create Design System
1. Create a new Figma file named "Recipe Manager - Design System"
2. Set up the following pages:
   - 🎨 Style Guide
   - 🧩 Components
   - 📱 Screens
   - 🔄 Prototypes

### Style Guide Page Setup
1. Create frames for:
   - Colors
   - Typography
   - Spacing
   - Grid System
   - Components Overview

## 2. Color Styles

### Create Color Styles
```
Primary Colors:
- Background: #FDFBF7 (Light cream)
- Primary: #E07A5F (Warm terracotta)
- Secondary: #81B29A (Sage green)
- Accent: #3D405B (Deep blue)

Functional Colors:
- Success: #81B29A
- Warning: #F2CC8F
- Error: #E07A5F
- Info: #98C1D9
```

### Color Usage Guidelines
- Use light cream (#FDFBF7) as the main background to ensure good contrast for darker text and a clean, open feeling for the site.
- Apply terracotta (#E07A5F) for primary actions and highlights (e.g., buttons, links).
- Use sage green (#81B29A) for success states and secondary elements (e.g., cancel, learn more).
- Deep blue (#3D405B) for text and important UI elements (e.g., headings, navigation, icons).

## 3. Typography Setup

### Create Text Styles
```
Headers:
- H1: Montserrat Bold, 24px
- H2: Montserrat SemiBold, 20px
- H3: Montserrat Medium, 18px

Body:
- Body Regular: Open Sans Regular, 16px
- Body Small: Open Sans Regular, 14px

Measurements:
- Numbers: Roboto Mono Regular, 18px
```

## 4. Component Library

### Basic Components
1. Buttons
   - Primary (Solid)
   - Secondary (Outlined)
   - Icon Button
   - Toggle Button

2. Input Fields
   - Text Input
   - Number Input
   - Search Bar
   - Measurement Input (with unit selector)

3. Cards
   - Recipe Card
   - Category Card
   - Quick Action Card

### Complex Components
1. Recipe Creator
   - Mode Toggle
   - Ingredient List
   - Step List
   - Image Uploader

2. Measurement Converter
   - Unit Selector
   - Number Input
   - Convert Button
   - Results Display

## 5. Layout Guidelines

### Grid System
- Desktop: 12-column grid
- Tablet: 8-column grid
- Mobile: 4-column grid

### Spacing Scale
```
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px
```

## 6. Screen Designs

### Create Main Screens
1. Dashboard
   - Navigation
   - Quick Actions
   - Recent Recipes
   - Categories

2. Recipe Creation
   - Both Structured and Freestyle modes
   - Form elements
   - Image upload area

3. Recipe View
   - Header with actions
   - Ingredient list
   - Step-by-step instructions
   - Notes section

## 7. Interactive Prototypes

### Create Flows For
1. Recipe Creation
   - Mode selection
   - Adding ingredients
   - Adding steps
   - Uploading images

2. Recipe Conversion
   - Unit switching
   - Measurement conversion
   - Saving preferences

3. Recipe Viewing
   - Navigation between sections
   - Image viewing
   - Print preview

## 8. Mobile Considerations

### Mobile-Specific Components
1. Bottom Navigation Bar
2. Floating Action Button
3. Collapsible Sections
4. Touch-friendly Input Fields

### Mobile Adaptations
- Increase touch targets (minimum 44x44px)
- Simplify navigation
- Stack elements vertically
- Hide non-essential features

## 9. Kitchen Mode Features

### Special Considerations
1. Large Touch Targets
   - Buttons: minimum 56x56px
   - Input fields: 48px height
   - Spacing between elements: minimum 16px

2. High Contrast Elements
   - Use maximum contrast for text
   - Clear visual hierarchy
   - Distinct interactive elements

## 10. Accessibility Guidelines

### Implementation in Figma
1. Color Contrast
   - Use Figma's contrast checker
   - Maintain WCAG 2.1 AA standards

2. Text Sizes
   - Minimum 16px for body text
   - Scalable typography system

3. Focus States
   - Clear visual indicators
   - Consistent styling

## 11. File Organization

### Figma Pages Structure
```
📁 Recipe Manager
├── 🎨 Style Guide
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Grid System
├── 🧩 Components
│   ├── Basic
│   ├── Complex
│   └── Patterns
├── 📱 Screens
│   ├── Desktop
│   ├── Tablet
│   └── Mobile
└── 🔄 Prototypes
    ├── Creation Flow
    ├── Conversion Flow
    └── Viewing Flow
```

Start with the Style Guide page and build your components library before moving on to screen designs. This will ensure consistency throughout the design system.
