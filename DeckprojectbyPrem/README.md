# Card Deck Manager

## Project Description
The **Card Deck Manager** is an Angular-based web application designed to manage and interact with a deck of cards. It leverages Angular's robust framework, Material Design for UI components, and Firebase for backend integration. This project demonstrates adherence to Angular best practices and SOLID principles.

## Setup Instructions

### Prerequisites
Before setting up the project, ensure the following tools are installed:
- **Node.js** (v16.x or later)
- **Angular CLI** (v15.x or later)
- **Git** (optional for cloning the repository)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/PremKalyanDavidRaj/Deckproject.git
   ```
2. Navigate to the project directory:
   ```bash
   cd repo-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   ng serve
   ```
5. Open your browser and visit [http://localhost:4200](http://localhost:4200) to view the app.

## Usage Instructions
- Navigate through the UI to manage and interact with the card deck.
- Use Material Design components for a seamless user experience.
- If configured, Firebase features will provide additional functionality.

## Development Approach
This project was developed with the following principles and technologies:
- **Angular Best Practices**: Organized module structure, reusable components, and efficient state management.
- **SOLID Principles**: Ensured modular, maintainable, and scalable code.
- **Material Design**: Used Angular Material for responsive and aesthetically pleasing UI.
- **Firebase Integration**: For optional deployment and backend services.

### Assumptions
- The Firebase project setup is pre-configured if backend integration is required.
- The app is designed to handle a single deck of cards for simplicity.

## Deployment
The application can be deployed using Firebase Hosting or other platforms:
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Initialize Firebase in the project:
   ```bash
   firebase init
   ```
4. Deploy the app:
   ```bash
   ng build --prod
   firebase deploy
   ```



## Folder Structure
Key directories and files:
- **`src/`**: Application source code, including components, modules, and services.
- **`.gitignore`**: Git ignored files.
- **`angular.json`**: Angular CLI configuration.
- **`package.json`**: Project dependencies and scripts.
- **`tsconfig.json`**: TypeScript configurations.

## Challenges and Solutions
- **Challenge**: Handling dynamic UI updates for deck management.
  **Solution**: Used Angular's reactive forms and lifecycle hooks.
- **Challenge**: Integrating Firebase with Angular.
  **Solution**: Leveraged AngularFire library for seamless Firebase integration.

## Future Enhancements
- Support for multiple decks.
- Enhanced card animations and transitions.
- Additional Firebase features like user authentication and real-time updates.

## Contributors
- ** Prem Kalyan David Raj Gai **