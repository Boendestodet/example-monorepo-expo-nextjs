# Tech Context: Expo + Next.js Monorepo

## Technology Stack

### Core Technologies

- **React 19.0.0**: Latest React version for both web and mobile
- **TypeScript 5.8.3**: Strong typing and modern JavaScript features
- **Node.js v20+**: Required runtime environment
- **pnpm 10.11.0**: Package manager with workspace support

### Frontend Frameworks

- **Next.js 15.3.3**: React framework for web applications
- **Expo ~53.0.9**: React Native development platform
- **React Native 0.79.2**: Native mobile development framework

### Styling & UI

- **Tailwind CSS 3.4.15**: Utility-first CSS framework
- **NativeWind 4.1.23**: Tailwind CSS for React Native
- **Gluestack UI**: Component library with platform adapters
- **React Native SVG 15.11.2**: SVG support for React Native

### Development Tools

- **Turbo**: Monorepo build system and caching
- **ESLint 8.57.0**: Code linting and quality enforcement
- **Prettier 3.5.3**: Code formatting
- **Jest 29.7.0**: Testing framework
- **SWC**: Fast JavaScript/TypeScript compiler

### Database & Backend

- **Prisma 6.14.0**: Database ORM and client
- **bcryptjs 3.0.2**: Password hashing
- **jose 6.0.13**: JWT handling and cryptography

### Mobile-Specific

- **Expo Router 5.0.7**: File-based routing for Expo
- **Expo Dev Client 5.1.8**: Development client for custom builds
- **Expo Secure Store 14.2.3**: Secure storage for sensitive data
- **Expo Updates 0.28.13**: Over-the-air updates
- **React Native Reanimated 3.17.5**: Native animations
- **React Native Gesture Handler 2.24.0**: Touch handling

### Web-Specific

- **PostCSS 8.4.49**: CSS processing
- **Autoprefixer 10.4.20**: CSS vendor prefixing

## Development Environment

### Prerequisites

- **Node.js**: Version 20.10.0 or higher
- **pnpm**: Version 10.11.0 or higher
- **Git**: Version control system
- **Code Editor**: VS Code with recommended extensions

### Platform Requirements

- **Mobile Development**:
  - Expo CLI
  - iOS Simulator (macOS) or Android Emulator
  - Physical device for testing
- **Web Development**:
  - Modern web browser
  - Node.js environment

### IDE Setup

- **VS Code**: Primary development environment
- **Extensions**: ESLint, Prettier, TypeScript, React Native Tools
- **Settings**: Auto-format on save, lint on save

## Project Structure

### Workspace Configuration

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/**/*"
```

### Package Dependencies

- **Root Dependencies**: Development tools and build configuration
- **App Dependencies**: Platform-specific libraries and frameworks
- **Shared Dependencies**: Common utilities and components
- **Peer Dependencies**: React and React Native compatibility

### Build Configuration

- **Turbo**: Monorepo build orchestration
- **Parallel Execution**: Concurrent development server startup
- **Caching**: Intelligent build artifact caching
- **Remote Caching**: Optional Vercel integration

## Development Workflow

### Installation

```bash
# Install dependencies
pnpm install

# Install platform-specific dependencies
cd apps/mobile && pnpm install
cd apps/web && pnpm install
```

### Development Commands

```bash
# Start all development servers
pnpm dev

# Start specific platform
cd apps/mobile && pnpm dev
cd apps/web && pnpm dev

# Build all applications
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

### Hot Reloading

- **Web**: Next.js fast refresh for instant updates
- **Mobile**: Expo hot reloading for rapid development
- **Shared**: Automatic rebuilds when shared code changes

## Testing Infrastructure

### Test Configuration

- **Jest**: Primary testing framework
- **React Native Testing**: Mobile component testing
- **Web Testing**: Web component and integration testing
- **Shared Testing**: Cross-platform component testing

### Test Commands

```bash
# Run all tests
pnpm test

# Run package tests
pnpm test:packages

# Run all tests with Jest
pnpm test:all
```

## Code Quality Tools

### Linting

- **ESLint**: JavaScript/TypeScript linting
- **Shared Config**: Common rules across all packages
- **Platform Rules**: Platform-specific linting rules
- **Auto-fix**: Automatic code style corrections

### Formatting

- **Prettier**: Code formatting
- **Shared Config**: Consistent formatting across packages
- **Auto-format**: Format on save and commit

### Type Checking

- **TypeScript**: Compile-time type checking
- **Shared Config**: Common TypeScript configuration
- **Strict Mode**: Enforced type safety
- **Type Generation**: Automatic type definitions

## Build & Deployment

### Build Process

1. **Dependency Resolution**: pnpm resolves workspace dependencies
2. **Type Checking**: TypeScript compilation across all packages
3. **Linting**: ESLint validation of code quality
4. **Building**: Platform-specific build processes
5. **Testing**: Jest test execution
6. **Output**: Platform-appropriate build artifacts

### Build Outputs

- **Web**: Next.js build output in `.next` directory
- **Mobile**: Expo build output in `build` directory
- **Packages**: Compiled TypeScript and bundled components

### Deployment Targets

- **Web**: Vercel, Netlify, or custom hosting
- **Mobile**: App Store (iOS) and Google Play (Android)
- **Packages**: npm registry for shared packages

## Performance Considerations

### Build Performance

- **Turbo Caching**: Intelligent build artifact caching
- **Parallel Execution**: Concurrent package builds
- **Incremental Builds**: Only rebuild changed packages
- **Remote Caching**: Team-wide build optimization

### Runtime Performance

- **React Native**: Native performance for mobile
- **Next.js**: SSR and static generation for web
- **Code Splitting**: Dynamic imports for better loading
- **Tree Shaking**: Remove unused code

### Development Performance

- **Hot Reloading**: Instant feedback during development
- **Type Checking**: Fast TypeScript compilation
- **Linting**: Efficient code quality validation
- **Testing**: Parallel test execution

## Security Considerations

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Secure Storage**: Platform-appropriate secure storage
- **Password Hashing**: bcryptjs for secure password storage

### Data Protection

- **Input Validation**: Comprehensive input sanitization
- **Output Encoding**: Prevent injection attacks
- **Secure Communication**: HTTPS and secure APIs

### Mobile Security

- **Expo Secure Store**: Encrypted storage for sensitive data
- **Code Signing**: Secure app distribution
- **OTA Updates**: Secure over-the-air updates

## Troubleshooting

### Common Issues

- **Dependency Conflicts**: Resolve with pnpm workspace management
- **Build Failures**: Check Turbo cache and rebuild
- **Type Errors**: Verify TypeScript configuration
- **Platform Issues**: Check platform-specific requirements

### Debug Tools

- **React DevTools**: Component inspection and debugging
- **Expo DevTools**: Mobile app debugging
- **Browser DevTools**: Web app debugging
- **Jest Debug**: Test debugging and inspection
