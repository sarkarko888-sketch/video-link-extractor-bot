#!/bin/bash

echo "🚀 Starting Installation..."

# 1. System update (Optional but good for VPS/Colab)
apt-get update -y

# 2. Install dependencies
echo "📦 Installing Node Modules..."
npm install

# 3. Install Playwright Browser & System Dependencies
echo "🌐 Installing Chromium Browser..."
npx playwright install chromium
npx playwright install-deps chromium

# 4. Permissions
chmod +x run.sh

echo "✅ Installation Complete! Now run: bash run.sh"
