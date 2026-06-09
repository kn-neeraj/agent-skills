# Installation Guide

## For Users

### Quick Install (npm)
```bash
npm install -g @agent-skills/sift
```

### Install from GitHub
```bash
npm install -g git+https://github.com/your-username/agent-skills.git#main --prefix=tools/sift
```

## For Developers

### Local Development
```bash
# Clone repository
git clone https://github.com/your-username/agent-skills.git
cd agent-skills/tools/sift

# Install dependencies
npm install

# Build TypeScript
npm run build

# Link globally
npm link

# Verify installation
sift --version
sift list
```

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Development mode (watch for changes)
npm run dev
```

### Publishing to npm
```bash
# Login to npm
npm login

# Publish package
npm publish

# Verify it's published
npm view @agent-skills/sift
```

### Publishing to GitHub Packages
```bash
# Configure npm to use GitHub Packages
npm config set @agent-skills:registry https://npm.pkg.github.com

# Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com

# Publish
npm publish

# Users install from GitHub Packages
npm install -g @agent-skills/sift --registry=https://npm.pkg.github.com
```

## Requirements

- Node.js >= 20.0.0
- npm >= 9.0.0
- Access to `docs/sessions/` directory in your project

## Troubleshooting

### "sift command not found"
```bash
# Make sure it's installed globally
npm list -g @agent-skills/sift

# Reinstall if needed
npm install -g @agent-skills/sift
```

### "No sessions found"
- Make sure you're in a directory with `docs/sessions/`
- Check that the directory exists: `ls docs/sessions/`

### Build errors
```bash
# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## Uninstallation

```bash
# Uninstall globally
npm uninstall -g @agent-skills/sift

# Or if using npm link
npm unlink -g sift
```