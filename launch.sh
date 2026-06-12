#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Lloyds Clone — Web App${NC}"
echo "==============================="

# Check for .env file
if [ ! -f .env ]; then
  echo -e "${YELLOW}Warning: No .env file found.${NC}"
  echo "Creating .env from .env.example..."
  cp .env.example .env
  echo -e "${YELLOW}Please edit .env and set EXPO_PUBLIC_API_URL, then run this script again.${NC}"
  exit 1
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  pnpm install
fi

echo -e "${GREEN}Starting web app at http://localhost:8081${NC}"
pnpm web
