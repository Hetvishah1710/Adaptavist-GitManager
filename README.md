## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel
Clone and Modify Git Repository Application 

Program Implementation Workflow 

This application provides a simple and intuitive UI to clone, modify, and push changes to a GitHub repository. The workflow is as follows: 

npm run dev command to run the application 

## Initial State: 

The UI displays a text field for the GitHub URL. 

The "Clone Repository" button is enabled. 

The "Modify and Push" button is disabled. 

## Validation: 

If the user enters an invalid URL or leaves the field empty, an error message is displayed. 

## Cloning: 

If the specified cloning path already contains the project, the program replaces it with the new clone folder. 

The local cloning path is /tmpGitClonePath. 

## Post-Cloning: 

Upon successful cloning, a text field for entering a modification message is displayed. 

The "Modify and Push" button is enabled. 

## Modification and Push: 

The modification text field is optional. If the user provides a modification message, the program modifies a file with the provided content. 

If no message is entered, a default modification message is added to the file. 

The current implementation modifies the README file. 

The program then commits and pushes the changes back to the original repository. 

## Assumptions 

GitHub credentials are managed and stored in the GitHub credential manager for cloning a GitHub URL. 

For SSH URLs, the passkey is already set. 

## Program Installation Steps 

## Prerequisites: 

Node.js installed on machine. 

Git installed and configured on machine. 

GitHub credentials are set to allow the program to push changes to the repository. 

## Setup: 

Next.js application setup. 

Install the necessary packages. 

## Components: 

Created CloneForm.tsx component that handles the form components, including the text fields for the GitHub URL and modification message, along with their validations on the UI. 

## API Routes: 

Created reusable API routes Clone.ts and Push.ts to handle Git functions. 

Clone.ts handles the cloning functionality after providing the GitHub URL. 

Push.ts handles modification, commit, and push changes to the original repository. 

Used NextApiRequest and NextApiResponse to handle Git functionalities. 

## Design System 

The application utilizes Material-UI for consistent and efficient UI styling. Key components and custom styling include: 

Custom Styling: 

Theme.ts handles custom styling. 

## UI Components: 

Added a logo in the navigation bar. 

Used Material-UI components: 

TextField 

Button 

Typography 

Container 

Box 

Alert 

FormControl 

FormHelperText 

useTheme 

AppBar 

Toolbar 
