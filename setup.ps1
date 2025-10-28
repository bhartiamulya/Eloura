# Install Node.js dependencies
Write-Host "Installing Node.js dependencies..." -ForegroundColor Cyan
npm install

# Install Tailwind CSS and its peer dependencies
Write-Host "Installing Tailwind CSS and its peer dependencies..." -ForegroundColor Cyan
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install React Icons
Write-Host "Installing React Icons..." -ForegroundColor Cyan
npm install react-icons

# Install Framer Motion for animations
Write-Host "Installing Framer Motion..." -ForegroundColor Cyan
npm install framer-motion

# Install color extraction libraries
Write-Host "Installing color extraction libraries..." -ForegroundColor Cyan
npm install color-thief react-color-extractor

# Install React Swipeable for swipe gestures
Write-Host "Installing React Swipeable..." -ForegroundColor Cyan
npm install react-swipeable

Write-Host "\nSetup complete! Run 'npm run dev' to start the development server." -ForegroundColor Green
