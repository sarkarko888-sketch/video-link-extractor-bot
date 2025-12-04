#!/bin/bash

if [ ! -f ".env" ]; then
    echo "⚠ ERROR: .env file missing!"
    echo "Create .env file with:"
    echo "BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN"
    exit 1
fi

echo "🚀 Starting bot..."
node bot.js
