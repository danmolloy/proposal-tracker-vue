# Proposal Tracker

Proposal Tracker is a responsive SPA built with Vue.js. It provides a dedicated interface for Proposal Tracker API.

## Tech Stack
- Framework: Vue 3 (Composition API)
- Routing: Vue Router (for role-based navigation guards)
- HTTP Client: Axios (configured with interceptors for Bearer Tokens)
- Styling: Vanilla CSS (custom-themed for a clean, professional look)
- Deployment: Vercel

## Core Views

1. Login / Register
   Access Level: Public
   Handles authentication via the /login and /register Identity endpoints.

2. Index
   Access level: Authorized
   The central dashboard for the app. 
   Using `v-if`, the dashboard conditionally renders an interface based on the user role:
   - Researcher View: Displays personal proposals with options to View, Edit, or Delete. It also provides a "Create" call-to-action.
   - Admin View: Provides a global overview of all system proposals with a primary action to Review.

3. Detail
   Access level: Admin/Creator
   A detail view of a single proposal.

4. Create
   Access level: Researcher
   Form interface for creating new proposals.
  To maintain parity with the `Proposal` model, the form contains some constraints and client side validation:
  - Title: Limited to 200 characters via maxlength.
  - Description: A textarea supporting up to 2000 characters.
  - Budget: Uses v-model.number to ensure numeric data types and enforces a logical range (0 to 10,000,000).

  The `UserId` is not sent in the payload. The backend associates the proposal with the authenticated user based on the Bearer Token.

  Upon success, the user is redirected back to Index using `vue-router`.

1. Edit
   Access level: Creator
   Allows researchers to update title, description or budget.

2. Review
   Access level: Admin
   Interface to approve/reject proposals and add notes.

## Shared Components 
- Layout: Manages the persistent navigation bar, footer, and login/logout functionality.

- Loading: A global spinner/skeleton state to handle async API calls via Axios.
Create

## Authentication

The login page communicates with the .Net MapIdentityApi endpoints using a JWT/Bearer Token approach.
Upon successful login, the accessToken is stored in localStorage. This allows the user to remain logged in after a page refresh. Additionally, the token is injected into the Axios common headers for seamless communication with the protected backend routes.

## Navigation Guards
To ensure security on the client side, the frontend uses Vue Router Guards. If a user attempts to access the /review path without the Admin role saved in their state/token, they are automatically redirected to the Index or an "Unauthorized" page. Similarly, if an unauthenticated user attempts to view a protected route, they are redirected to /login.

## Further Improvements
- Accessibility
- Testing