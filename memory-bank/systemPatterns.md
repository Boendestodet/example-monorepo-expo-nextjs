# System Patterns: Expo + Next.js Monorepo

## Architecture Overview

### Monorepo Structure

```
example-monorepo-expo-nextjs/
├── apps/                    # Application layer
│   ├── mobile/             # Expo React Native app
│   └── web/                # Next.js React web app
├── packages/                # Shared layer
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── hello-ui/           # Shared UI components
│   └── tsconfig/           # Shared TypeScript configuration
└── root/                    # Infrastructure layer
    ├── turbo.json          # Build orchestration
    ├── tailwind.config.js  # Styling configuration
    └── jest.config.ts      # Testing configuration
```

### Layered Architecture

1. **Infrastructure Layer**: Build tools, testing, and development configuration
2. **Shared Layer**: Common components, utilities, and configurations
3. **Application Layer**: Platform-specific implementations
4. **Integration Layer**: APIs, services, and external dependencies

## Key Technical Decisions

### Package Management

- **pnpm**: Chosen for efficient workspace management and disk space optimization
- **Workspaces**: Enable seamless package sharing and dependency management
- **Peer Dependencies**: Configured to handle React Native and web compatibility

### Build System

- **Turbo**: Monorepo build orchestration with intelligent caching
- **Parallel Execution**: Development servers run concurrently for efficiency
- **Remote Caching**: Optional Vercel integration for team-wide build optimization

### Styling Strategy

- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **NativeWind**: Tailwind CSS for React Native, enabling cross-platform styling
- **Gluestack UI**: Component library with platform-specific adapters

### Type Safety

- **TypeScript**: 100% TypeScript implementation across all packages
- **Shared Configs**: Common TypeScript configuration in `packages/tsconfig`
- **Strict Mode**: Enforced type checking and strict compilation

## Design Patterns

### Component Architecture

- **Shared Components**: Platform-agnostic components in `hello-ui` package
- **Platform Adapters**: Platform-specific implementations when needed
- **Composition**: Favor composition over inheritance for flexibility

### State Management

- **React Hooks**: Primary state management approach
- **Context API**: For cross-component state sharing
- **Local State**: Component-level state when appropriate

### Data Flow

- **Unidirectional**: Data flows down, events flow up
- **Props Drilling**: Minimized through context and composition
- **Event Handling**: Consistent event handling across platforms

## Integration Patterns

### Cross-Platform Compatibility

- **React Native Web**: Enables web compatibility for React Native components
- **Platform Detection**: Runtime platform detection for conditional logic
- **Feature Flags**: Platform-specific feature enablement

### API Integration

- **Prisma Client**: Database access layer (present in web app)
- **JWT Authentication**: Token-based authentication with jose library
- **Secure Storage**: Expo SecureStore for mobile, localStorage for web

### External Services

- **Expo Services**: Push notifications, updates, and device features
- **Web APIs**: Browser-specific functionality and optimizations
- **Native Modules**: Platform-specific native functionality

## Development Patterns

### Code Organization

- **Feature-Based**: Organize by feature rather than platform
- **Shared First**: Prioritize shared code over platform-specific implementations
- **Clear Boundaries**: Well-defined interfaces between shared and platform code

### Testing Strategy

- **Jest**: Primary testing framework with React Native support
- **Component Testing**: Test shared components across platforms
- **Integration Testing**: Test platform-specific implementations
- **E2E Testing**: Platform-specific end-to-end testing

### Code Quality

- **ESLint**: Consistent code style and best practices
- **Prettier**: Automated code formatting
- **Type Checking**: Compile-time error detection
- **Linting**: Runtime error prevention

## Performance Patterns

### Build Optimization

- **Incremental Builds**: Turbo caches build artifacts for faster rebuilds
- **Tree Shaking**: Remove unused code during build process
- **Code Splitting**: Dynamic imports for better loading performance

### Runtime Performance

- **React Native**: Native performance for mobile applications
- **Next.js**: Server-side rendering and static generation for web
- **Lazy Loading**: On-demand component and route loading

### Caching Strategy

- **Build Cache**: Turbo caches build outputs
- **Runtime Cache**: Platform-specific caching strategies
- **Remote Cache**: Team-wide build artifact sharing

## Security Patterns

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Secure Storage**: Platform-appropriate secure storage
- **Token Refresh**: Automatic token renewal and validation

### Data Protection

- **Input Validation**: Comprehensive input sanitization
- **Output Encoding**: Prevent injection attacks
- **Secure Communication**: HTTPS and secure API endpoints

## Deployment Patterns

### Mobile Deployment

- **Expo Build**: Cloud-based build system for mobile apps
- **EAS**: Expo Application Services for distribution
- **OTA Updates**: Over-the-air updates for mobile apps

### Web Deployment

- **Next.js Export**: Static site generation capabilities
- **Vercel Integration**: Optimized deployment platform
- **CDN Distribution**: Global content delivery optimization
