# TheCosmicStack Website

A modern, responsive website for TheCosmicStack - a software development and website design company. This project is built with React.js, features cosmic-themed animations, and is styled with Tailwind CSS.

## 🚀 Features

- **Cosmic-themed Design**: Dark mode design with space-inspired elements
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Animated UI**: Smooth animations powered by Framer Motion 
- **Modern Tech Stack**: Built with React.js and Tailwind CSS
- **Optimized Performance**: Fast loading and smooth transitions

## ✨ Pages

- **Home**: Main landing page with all key sections
- **About**: Company information, values, history, and team
- **Services**: Detailed descriptions of services offered
- **Portfolio**: Showcase of projects and case studies
- **Contact**: Contact form and information

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **Icons**: React Icons (Feather Icons set)
- **State Management**: React Hooks and Context API

## 📁 Project Structure

```
thecosmicstack/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
│           └── logo.svg
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── CosmoParticles.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── Contact.jsx
│   │   └── animations/
│   │       ├── FadeIn.jsx
│   │       ├── StarField.jsx
│   │       └── TextGlitch.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── animations.js
│   │   └── theme.js
│   └── context/
│       └── ThemeContext.jsx
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/thecosmicstack.git
   cd thecosmicstack
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🎨 Customization

### Colors and Theme

The color scheme and theme variables are defined in:
- `tailwind.config.js` - For Tailwind CSS configuration
- `src/styles/globals.css` - For global CSS styles
- `src/utils/theme.js` - For JavaScript theme utilities

### Content

Update content in the respective component files:
- Company information in `src/components/sections/` directory
- Page content in `src/pages/` directory

## 📱 Responsive Design

The website is designed to be fully responsive across all device sizes:
- Mobile-first approach
- Tailwind's responsive utility classes
- Custom responsive components

## 🏗️ Development Notes

- Use the `<FadeIn>` component to add consistent fade-in animations
- Add new pages in the `src/pages/` directory and update routes in `App.jsx`
- Use the `<Button>`, `<Card>`, and other common components for consistency

## 📄 License

This project is licensed under the MIT License.

## 🔗 Contact

For any questions or inquiries, please contact:
- Email: hello@thecosmicstack.com
- Website: [thecosmicstack.com](https://thecosmicstack.com)

---

Built with ❤️ by TheCosmicStack