#!/bin/bash

echo "📦 Installing required packages..."

apt update -y
apt install -y nodejs npm

npm install telegraf dotenv playwright fs-extra
npx playwright install chromium

echo "BOT INSTALLED SUCCESSFULLY!"
