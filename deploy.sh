#!/bin/bash

# Build the project
npm run build

# Create a new branch for deployment
git checkout -b gh-pages

# Move the built files to the root directory
cp -r out/* .

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