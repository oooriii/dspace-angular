# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **DSpace Angular v7.6.1**, a modern frontend for the DSpace institutional repository platform. It's configured as the University of Girona (UDG) customized repository interface, running on Angular 15.x with TypeScript and Angular Universal for server-side rendering.

**Current Configuration:**
- **Theme**: `udg` (University of Girona custom theme)
- **Backend**: REST API at `bibliodev.udg.edu:443/server`
- **Default Language**: Catalan (`ca`)
- **Branch**: `udg-theme` (main development branch)

## Development Commands

### Essential Commands
```bash
# Install dependencies
yarn install

# Development server with live reload
yarn start:dev              # Starts at http://localhost:4000

# Production build and serve
yarn start                  # Build + serve production with SSR

# Build only (no server)
yarn build:prod            # Production build to dist/

# Serve pre-built production
yarn serve:ssr             # Serve from dist/ directory
```

### Testing Commands
```bash
# Unit tests (Jasmine + Karma)
yarn test                  # Single run
yarn test:watch           # Watch mode
yarn test:headless        # Headless Chrome with coverage

# E2E tests (Cypress)
ng e2e                    # Requires local backend + test data
NODE_ENV=development ng e2e # Use dev config
```

### Linting and Code Quality
```bash
# ESLint
yarn lint                 # Check for linting errors
yarn lint-fix            # Auto-fix linting issues

# Check circular dependencies
yarn check-circ-deps     # Uses madge to detect circular imports
```

### Utility Commands
```bash
# Clean builds
yarn clean:dist          # Remove dist/ directory
yarn clean:prod          # Full production clean
yarn clean               # Complete clean (including node_modules)

# Internationalization
yarn sync-i18n           # Sync translation files
yarn merge-i18n          # Merge i18n files

# Documentation
yarn run docs            # Generate TypeDoc documentation
```

## Architecture Overview

### Theme System Architecture
The application uses a **multi-theme architecture** with the UDG theme as the active theme:

```
src/themes/
├── dspace/              # Base DSpace theme (fallback)
├── udg/                 # University of Girona theme (active)
│   ├── app/            # Component overrides
│   ├── assets/         # Theme-specific assets
│   └── styles/         # SCSS customizations
└── eager-themes.module.ts # Theme loading configuration
```

**Theme Override Priority:**
1. UDG theme components (`src/themes/udg/app/`)
2. Base DSpace theme (`src/themes/dspace/app/`)
3. Core application components (`src/app/`)

### Core Application Structure
```
src/app/
├── core/                # Services, data access, authentication
├── shared/              # Reusable components, pipes, directives
├── admin/               # Administrative interface
├── browse-by/           # Browse functionality
├── community-page/      # Community display
├── collection-page/     # Collection display
├── item-page/           # Item/publication display
├── search-page/         # Search interface
├── submission/          # Submission workflow
└── home-page/           # Homepage components
```

### Configuration Management
**Runtime Configuration** (`config/config.yml`):
- REST API endpoints
- UI settings and caching
- Theme selection
- Language configuration
- Authentication settings

**Build-time Configuration** (`src/environments/`):
- Environment-specific builds
- Server configuration
- Development vs production settings

## Key Technologies

### Frontend Stack
- **Angular 15.x** with TypeScript 4.8
- **Angular Universal** for SSR
- **NgRx** for state management
- **Bootstrap 4.x** + **ng-bootstrap** for UI
- **RxJS 7.x** for reactive programming
- **Sass** for styling

### Specialized Features
- **Multi-language Support**: Catalan (primary), Spanish, English
- **Leaflet Maps**: Geographic metadata integration
- **ORCID Integration**: Author identification
- **Markdown Rendering**: markdown-it with MathJax support
- **File Upload**: ng2-file-upload for bitstream handling

## Working with UDG Theme

### Theme Development Guidelines
1. **Always work within the `udg` theme directory** when customizing
2. **Component overrides**: Place in `src/themes/udg/app/[component-path]/`
3. **Assets**: Add to `src/themes/udg/assets/`
4. **Styles**: Modify `src/themes/udg/styles/` SCSS files
5. **Translations**: Update `src/themes/udg/assets/i18n/` JSON5 files

### UDG-Specific Features
- **Custom Homepage**: Specialized layout with news and community listings
- **Academic Focus**: Enhanced metadata for theses, publications, research
- **Geographic Integration**: Leaflet maps for geographic metadata
- **Institutional Branding**: UDG colors, logos, and styling
- **Multi-language Priority**: Catalan → Spanish → English

## Development Conventions

### Code Style (from .cursorrules)
- **TypeScript**: Strict typing, avoid `any`
- **File Naming**: kebab-case (e.g., `user-profile.component.ts`)
- **String Literals**: Single quotes
- **Indentation**: 2 spaces
- **Imports**: Organized by Angular core → RxJS → others → relative

### Angular Patterns
- **Components**: Use standalone components when applicable
- **Services**: Use `inject()` function for dependency injection
- **State Management**: NgRx for complex state, signals for reactive data
- **Templates**: Use async pipe for observables
- **Performance**: Implement trackBy for ngFor, use pure pipes

### DSpace-Specific Patterns
- **Data Services**: Follow DSpace REST API patterns in `src/app/core/data/`
- **Models**: Define interfaces for all data structures
- **Caching**: Utilize built-in caching mechanisms
- **Authorization**: Use DSpace authentication patterns

## Testing Guidelines

### Unit Testing
- **Framework**: Jasmine + Karma
- **Location**: `*.spec.ts` files alongside components
- **Coverage**: Target reports available at http://localhost:9876/ after `yarn run coverage`
- **Pattern**: Arrange-Act-Assert

### E2E Testing  
- **Framework**: Cypress
- **Requirement**: Local DSpace backend with test data
- **Test Data**: Requires DSpace Entities Test Data set
- **Files**: Located in `cypress/e2e/`

## Configuration Notes

### Environment Variables
Configuration priority: **environment variable** > **`.env` file** > **external config** > **`config.yml`**

Common variables:
```bash
DSPACE_REST_HOST=bibliodev.udg.edu
DSPACE_REST_PORT=443
DSPACE_REST_SSL=true
DSPACE_HOST=localhost
DSPACE_PORT=4000
```

### Multi-language Configuration
- **Default**: Catalan (`ca`)
- **Active Languages**: ca, es, en (+ 18 others available)
- **Translation Files**: JSON5 format in `src/themes/udg/assets/i18n/`

## Production Deployment

### Build Process
```bash
# Standard production build
yarn start               # Full build + SSR server

# Manual build steps
yarn build:prod         # Build only
yarn serve:ssr          # Serve pre-built
```

### Server-Side Rendering
- **Express.js** server included
- **Bot caching** enabled (1000 pages, 1 day TTL)
- **Compression** and **rate limiting** configured
- **Performance optimizations** for academic repository usage

## Common Troubleshooting

### Development Issues
- **Port conflicts**: Default port 4000, check `config.yml` ui.port
- **Memory issues**: Node.js heap size, consider `--max-old-space-size`
- **Build errors**: Clear Angular cache with `yarn clean:cli`

### Theme Issues
- **Component not overriding**: Check theme module loading
- **Assets not loading**: Verify theme-specific asset paths
- **Styling conflicts**: Check SCSS import order and theme precedence