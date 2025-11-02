# 🎨 DropLink UI Components

A comprehensive set of reusable UI components built with **TypeScript**, **Ant Design**, **Tailwind CSS**, and **class-variance-authority**.

## 📦 Components

### Core Components
- **Button** - Primary action buttons with multiple variants
- **Card** - Container component for content
- **Input** - Text input fields
- **Textarea** - Multi-line text inputs
- **Select** - Dropdown selection component
- **Modal** - Dialog/popup component
- **Badge** - Status and notification badges
- **Label** - Form labels with variants
- **Switch** - Toggle switches
- **Spinner** - Loading indicators
- **Avatar** - User profile images
- **Divider** - Content separators
- **Alert** - Message notifications
- **Logo** - Brand logo with image and text variations

---

## 🚀 Usage

### Import Components

```typescript
import { Button, Card, Input, Badge } from '@/components/ui';
```

---

## 📘 Component API

### Button

```typescript
<Button variant="primary" size="lg" fullWidth>
  Click Me
</Button>
```

**Variants:** `default`, `primary`, `secondary`, `outline`, `ghost`, `link`, `destructive`, `subtle`  
**Sizes:** `sm`, `md`, `lg`, `xl`, `icon`  
**Props:** `fullWidth`, `isLoading`

---

### Card

```typescript
<Card variant="elevated" padding="lg" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

**Variants:** `default`, `elevated`, `ghost`, `outline`, `gradient`  
**Padding:** `none`, `sm`, `md`, `lg`, `xl`  
**Props:** `hover`

---

### Input

```typescript
<Input 
  variant="default" 
  inputSize="md" 
  placeholder="Enter text..."
  state="default"
/>
```

**Variants:** `default`, `filled`, `ghost`  
**Sizes:** `sm`, `md`, `lg`  
**States:** `default`, `error`, `success`, `warning`

---

### Select

```typescript
<Select
  variant="default"
  selectSize="md"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ]}
/>
```

**Variants:** `default`, `filled`, `ghost`  
**Sizes:** `sm`, `md`, `lg`

---

### Badge

```typescript
<Badge variant="success" size="md">
  Active
</Badge>
```

**Variants:** `default`, `secondary`, `success`, `warning`, `error`, `outline`, `ghost`  
**Sizes:** `sm`, `md`, `lg`

---

### Modal

```typescript
<Modal
  variant="centered"
  size="lg"
  open={isOpen}
  onCancel={handleClose}
  title="Modal Title"
>
  Modal content
</Modal>
```

**Variants:** `default`, `centered`, `fullscreen`  
**Sizes:** `sm`, `md`, `lg`, `xl`, `full`

---

### Avatar

```typescript
<Avatar 
  variant="gradient" 
  size="lg"
  src="/path/to/image.jpg"
/>
```

**Variants:** `default`, `secondary`, `gradient`, `outline`  
**Sizes:** `sm`, `md`, `lg`, `xl`, `2xl`

---

### Alert

```typescript
<Alert
  variant="success"
  size="md"
  message="Success!"
  description="Operation completed successfully"
  closable
/>
```

**Variants:** `default`, `info`, `success`, `warning`, `error`, `primary`  
**Sizes:** `sm`, `md`, `lg`

---

### Logo

```typescript
<Logo 
  size="md" 
  variant="default"
  showText={true}
  showImage={true}
  animated={true}
  href="/"
/>
```

**Usage Examples:**

```typescript
<Logo size="lg" />

<Logo size="sm" showText={false} />

<Logo size="xl" variant="gradient" animated />

<Logo size="md" showImage={false} />
```

**Variants:** `default`, `gradient`, `muted`  
**Sizes:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`  
**Props:** `showText`, `showImage`, `animated`, `href`, `onClick`

---

## 🎨 Design Tokens

All components use the color tokens defined in `tailwind.config.js`:

- **Primary**: Pink/Rose accent (`#f8c4dc`)
- **Background**: Dark base (`#121214`)
- **Surface**: Card backgrounds (`#1b1b1d`)
- **Text**: Primary (`#fafafa`) & Secondary (`#a5a5a6`)
- **Border**: Subtle borders (`#28282c`)

---

## 🔧 Utilities

### cn() Function

Combines Tailwind classes with proper precedence:

```typescript
import { cn } from '@/utils/cn';

<div className={cn('base-class', conditionalClass && 'active-class')} />
```

---

## ✨ Features

- ✅ **TypeScript** - Full type safety
- ✅ **Dark Mode** - Built-in dark theme
- ✅ **Accessible** - ARIA labels and keyboard navigation
- ✅ **Responsive** - Mobile-first design
- ✅ **Customizable** - Easy to override styles
- ✅ **Consistent** - Uses design tokens throughout
- ✅ **Monospace Font** - Fira Code by default

---

## 📖 Best Practices

1. **Always use Tailwind color tokens** - Never use raw hex codes
2. **Prefer composition** - Combine small components
3. **Type everything** - Use TypeScript interfaces
4. **Follow naming conventions** - Use camelCase for props
5. **Check for reuse** - Don't rebuild existing components

---

> Built with ❤️ for DropLink

