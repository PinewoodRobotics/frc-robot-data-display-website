#!bin/bash

echo "Starting server using macOS"

echo "Installing dependencies for Rust..."

cd ReTranslator
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup update

echo "Building ReTranslator..."
cargo build --release

cd ../

echo "Downloading Server Deps..."

echo "Downloading Nodejs..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 20

echo "Downloading deps..."
npm install

echo "Starting ReTranslator and Server..."

killall ReTranslator
(cd ./ReTranslator && cargo run --release) & (npm run dev) && fg