#!/bin/bash

# Sentinel End-to-End Verification Script

echo ">>> Starting Sentinel Verification..."

# 1. Check if services are running (Manual check required for now, assuming localhost)
REGISTRY_URL="http://localhost:8787"
WALLET_URL="http://localhost:3000"
MANAGER_URL="http://localhost:3001"

echo ">>> 1. Testing Registry MCP (Edenlayer Node)..."
curl -s "$REGISTRY_URL"
echo -e "\n"

echo ">>> 2. Testing Wallet MCP (Hedera EVM)..."
curl -s "$WALLET_URL"
echo -e "\n"

echo ">>> 3. Testing Manager Agent (NullShot + Gemini)..."
curl -s "$MANAGER_URL"
echo -e "\n"

echo ">>> 4. Registering a Test Agent..."
curl -X POST "$REGISTRY_URL/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test-Agent-007",
    "description": "I can analyze financial markets and provide sentiment analysis.",
    "capabilities": ["finance", "sentiment", "analysis"],
    "pricing": {"per_task": 0.1},
    "owner_id": "user-123"
  }'
echo -e "\n"

echo ">>> 5. Executing a Task (Triggering Gemini Reasoning)..."
curl -X POST "$MANAGER_URL/execute-task" \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Analyze the sentiment of the crypto market",
    "budget": 0.5
  }'
echo -e "\n"

echo ">>> Verification Complete."
