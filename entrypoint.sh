#!/bin/sh

FLAG_FILE="/server_data/.initialized"

if [ ! -f "$FLAG_FILE" ]; then
  echo "First time setup..."

  # Install project dependencies
  npm install

  # Process and import dataset into the database
  npm run data:process
  npm run data:import

  # Create flag file to mark setup as complete
  touch "$FLAG_FILE"
else
  echo "Skipping setup..."
fi

# Start the development server
npm start