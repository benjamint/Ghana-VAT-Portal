#!/bin/bash

# Clean previous builds
rm -rf out
rm -rf .next

# Build the project
NODE_ENV=production npm run build

# Create a new branch for deployment
git checkout -b gh-pages

# Create necessary directories
mkdir -p Ghana-VAT-Portal

# Move the built files to the correct directory
cp -r out/* Ghana-VAT-Portal/

# Create a 404.html in the root
cp Ghana-VAT-Portal/404.html ./404.html

# Create .nojekyll file
touch .nojekyll

# Add all files
git add .

# Commit the changes
git commit -m "Deploy to GitHub Pages"

# Push to the gh-pages branch
git push origin gh-pages --force

# Switch back to the main branch
git checkout main

# Delete the gh-pages branch locally
git branch -D gh-pages

echo "Deployment completed successfully!" 