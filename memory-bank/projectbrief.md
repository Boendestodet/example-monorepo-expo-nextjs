# Project Brief: Expo + Next.js Monorepo

## Project Overview

This is a **monorepo** that combines **Expo (React Native)** and **Next.js (React for Web)** to enable seamless cross-platform development using shared components and code.

## Core Requirements

### Primary Goals

1. **Cross-Platform Development**: Enable development of applications that work on both mobile (iOS/Android) and web platforms
2. **Code Sharing**: Maximize code reuse between mobile and web applications through shared packages
3. **Type Safety**: Maintain 100% TypeScript implementation across all packages and applications
4. **Modern Development Experience**: Provide fast, efficient development workflow with hot reloading and modern tooling

### Technical Requirements

- **Package Manager**: pnpm for workspace management
- **Build System**: Turbo for monorepo orchestration and caching
- **Styling**: Tailwind CSS with NativeWind for cross-platform styling
- **Testing**: Jest configuration for comprehensive testing
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Type Safety**: Shared TypeScript configurations across the monorepo

## Project Scope

### What's Included

- **Mobile App**: Expo-based React Native application
- **Web App**: Next.js-based React web application
- **Shared UI Package**: `hello-ui` components used by both platforms
- **Shared Configurations**: ESLint, TypeScript, and other development tooling
- **Development Infrastructure**: Hot reloading, testing, linting, and building

### What's NOT Included

- Backend services (though Prisma client is present for potential database integration)
- Authentication system (though bcryptjs and jose suggest JWT-based auth is planned)
- Production deployment configurations
- CI/CD pipelines (though GitHub Actions structure exists)

## Success Criteria

1. **Seamless Development**: Developers can work on both platforms with minimal context switching
2. **Code Reuse**: Significant reduction in duplicate code between mobile and web
3. **Performance**: Fast development builds and efficient production builds
4. **Maintainability**: Clean, well-structured codebase that's easy to understand and modify
5. **Developer Experience**: Modern tooling that enhances productivity

## Constraints

- Must support Node.js v20+
- Must use pnpm as package manager
- Must maintain TypeScript throughout
- Must support both Expo and Next.js ecosystems
- Must enable efficient monorepo development with Turbo

## Key Stakeholders

- **Developers**: Need efficient cross-platform development workflow
- **Users**: Expect consistent experience across mobile and web platforms
- **Maintainers**: Require clean, maintainable codebase structure

## Timeline & Phases

This appears to be an established project with core infrastructure in place. The focus is on ongoing development and enhancement rather than initial setup.
