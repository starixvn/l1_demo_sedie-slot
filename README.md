# Sedie Slot - PIXI.js Game

A high-performance slot game built with PIXI.js and TypeScript, optimized for both web and mobile platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - You should see a rotating white circle on a blue background

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── types/           # TypeScript type definitions
├── scenes/          # Game scenes (game-scene, menu-scene, etc.)
├── entities/        # Game entities (sprites, objects)
├── systems/         # Core systems (asset-manager, audio, etc.)
├── assets/          # Static assets (images, sounds, fonts)
├── utils/           # Utility functions
├── game-application.ts  # Main game application
└── main.ts          # Entry point
```

## 🎮 Features

- **TypeScript**: Full type safety and modern JavaScript features
- **Performance Optimized**: Following PIXI.js best practices
- **Modular Architecture**: Scene-based organization
- **Asset Management**: Centralized asset loading and caching
- **Mobile Ready**: Touch controls and responsive design
- **Development Tools**: Hot reload, TypeScript checking, linting

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Check TypeScript types
- `npm run lint` - Lint code
- `npm run test` - Run tests

## 📱 Mobile Optimization

The game is optimized for mobile devices with:
- Touch controls and gestures
- Responsive design for various screen sizes
- Efficient power management
- Optimized asset loading

## 🚀 Deployment

This project is ready for deployment on:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

Simply run `npm run build` and deploy the `dist` folder.

## 🔧 Development

The project follows PIXI.js best practices:
- Efficient rendering with sprite batching
- Object pooling to minimize garbage collection
- Proper asset management with texture atlases
- Scene-based architecture for easy scaling

## 📝 License

MIT License - see LICENSE file for details.
