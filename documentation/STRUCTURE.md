# Project Structure

This project follows a feature-based architecture within a standard React SPA structure.

## Root Directory
- `App.tsx`: Main entry point handling routing and layout composition.
- `index.tsx`: Bootstraps React root.
- `types.ts`: Global TypeScript interfaces based on the DB schema.
- `constants.ts`: Configuration, mock data, and navigation structure.

## /components
Reusable UI building blocks and domain-specific widgets.

### /components/Layout
- `Sidebar.tsx`: The main "Tactical" navigation rail.
- `Header.tsx`: Top bar containing search and user profile summary.

### /components/Dashboard
- `StatCard.tsx`: Glassmorphism cards for high-level metrics.
- `ActivityGraph.tsx`: Recharts implementation for campaign performance.
- `ActiveAgents.tsx`: List of "Ghost Workers" currently operating.
- `TacticalLog.tsx`: Terminal-style feed of system actions.

## /services
- `geminiService.ts`: Integration with Google GenAI SDK (Gemini 1.5 Pro/Flash).

## /pages
- `DashboardPage.tsx`: The main landing view assembling dashboard components.
- `VaultPage.tsx`: (Placeholder) Marketplace view.

## Styling
- **Tailwind CSS**: Used exclusively. No CSS modules.
- **Theme**: Defined in `index.html` script tag for colors extension.
