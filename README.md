# Éloura – AI-Powered Fashion Styling Assistant

An intelligent fashion styling web application that uses AI to analyze your clothing items and suggest perfectly matched outfits from real e-commerce products.

##  Key Features

### Core Functionality
- **AI Image Analysis**: Gemini 1.5 Flash analyzes uploaded clothing photos
- **Dynamic Product Fetching**: Integrates with e-commerce APIs for real products
- **Smart Matching**: AI scores products based on style compatibility
- **Swipeable Cards**: Tinder-style interface for browsing matches
- **Saved Items**: Dedicated page to view and manage saved outfits

### UI/UX
- **Cinematic Background**: Video background with vignette and film grain effects
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive Design**: Works on desktop and mobile
- **Loading States**: Clear feedback during AI processing
- **Category Selection**: 15+ specific clothing categories (tops, pants, skirts, jewelry, etc.)

##  Technology Stack

### Frontend
- **React 18** with **TypeScript** for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### AI & APIs
- **Google Gemini AI** (gemini-1.5-flash) for image analysis
- **RapidAPI** for e-commerce product data
- Fallback to curated fashion catalog when APIs unavailable

##  How to Use

1. **Upload**: Click "Choose an Image" and upload a photo of your clothing item
2. **Categorize**: Select the item type (top, pants, dress, etc.)
3. **Choose Color**: Pick the primary color of your item
4. **Select Pairings**: Choose what you want to match with (e.g., shoes, bags, jewelry)
5. **Wait for AI**: The app analyzes your item and fetches matches
6. **Browse**: Swipe through product cards:
   -  **Save** items you like
   -  **Skip** items you don't want
   -  **Buy** directly from the product page
   -  **Navigate** back and forth
7. **View Saved**: Click "Saved" button to see all your saved items

##  Project Structure

```
Eloura/
├── src/
│   ├── App.tsx                    # Main application component with all UI logic
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles and Tailwind directives
│   ├── types.ts                   #  (Outfit, Filters)
│   ├── assets/
│   │   └── background.mp4         # Video background
│   ├── data/
│   │   └── fashionCatalog.ts      # Fallback catalog when APIs fail
│   └── services/
│       ├── geminiAI.ts            # Gemini AI integration for image analysis
│       └── ecommerceAPI.ts        # E-commerce API integration
├── .env                           # Environment variables 
├── .gitignore                     # Git ignore 
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── vite.config.ts                 # Vite build configuration
```

## Tools

- **Google Gemini AI** for image analysis capabilities
- **RapidAPI** for e-commerce data access
- **Unsplash** for placeholder images in fallback catalog
- **Framer Motion** for smooth animations
