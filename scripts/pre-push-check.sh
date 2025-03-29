#!/bin/bash

# Exit on any error
set -e

echo "🔍 Running pre-push checks..."

# Clean up any existing build artifacts
echo "🧹 Cleaning up old build artifacts..."
rm -rf _site
rm -rf bazel-bin

# Build the project
echo "🏗️  Building project..."
bazel build //src:gh_pages

# Create local test directory
echo "📁 Setting up local test environment..."
mkdir -p _site
cp bazel-bin/src/bundle.js _site/
cp bazel-bin/src/bundle.js.map _site/
cp bazel-bin/src/index.html _site/
cp bazel-bin/src/styles.css _site/

# Start local server in background
echo "🚀 Starting local server..."
cd _site
python3 -m http.server 8000 &
SERVER_PID=$!

# Wait for server to start
sleep 2

# Check if the server is responding
echo "🔍 Checking if server is responding..."
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Server is responding"
else
    echo "❌ Server is not responding"
    kill $SERVER_PID
    exit 1
fi

# Check if bundle.js exists and is accessible
echo "🔍 Checking bundle.js..."
if curl -s http://localhost:8000/bundle.js > /dev/null; then
    echo "✅ bundle.js is accessible"
else
    echo "❌ bundle.js is not accessible"
    kill $SERVER_PID
    exit 1
fi

# Stop the server
echo "🛑 Stopping local server..."
kill $SERVER_PID

echo "✅ All checks passed! Safe to push." 