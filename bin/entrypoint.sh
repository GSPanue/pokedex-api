#!/bin/sh

FLAG_FILE="/server_data/.initialized"
MIGRATIONS_DIR="/server/src/migrations"

if [ ! -f "$FLAG_FILE" ]; then
  echo "First time setup..."

  # Install project dependencies
  echo "Installing project dependencies..."
  npm install

  # Check if migrations exist
  if [ -z "$(ls -A $MIGRATIONS_DIR)" ]; then
    echo "No migrations found. Generating initial schema..."
    npm run migration:generate /server/src/migrations/InitialSchema
  fi

  # Run migrations and import dataset into database
  echo "Running migrations..."
  npm run migration:run

  echo "Importing dataset into database..."
  npm run data:process
  npm run data:import

  # Create flag file to mark setup as complete
  touch "$FLAG_FILE"
else
  # Run migrations
  echo "Running migrations..."
  npm run migration:run
fi

# Start the development server
echo "Starting development server..."
npm start