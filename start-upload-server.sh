#!/bin/bash
echo "Starting upload server..."
node upload-server.js &
echo "Upload server started on port 3001"
echo "Now start your Next.js app with: npm run dev"