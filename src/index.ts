import * as fs from 'fs';
import * as path from 'path';
import * as readlineSync from 'readline-sync';
import { program } from 'commander';



// Helper function to convert string to PascalCase (Upper CamelCase)
const toPascalCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
      index === 0 ? match.toUpperCase() : match.toLowerCase()
    )
    .replace(/\s+/g, '');
}

// Function to create the feature folder structure
const createFeatureFolder = (featureName: string): void => {
  const featurePath = path.join(process.cwd(), 'src', 'features', featureName);



  // Check if the feature folder already exists
  if (fs.existsSync(featurePath)) {
    console.log(`Feature "${featureName}" already exists.`);
    return addNewFeatureToExistingFolder(featureName);
  }

  // Create the feature directory
  fs.mkdirSync(featurePath, { recursive: true });
  console.log(`Created feature folder: ${featurePath}`);

  // Create subdirectories for components, query, hook, types, and pages
  const dirs: string[] = ['components', 'query', 'hook', 'types', 'pages'];
  dirs.forEach((dir) => {
    const dirPath = path.join(featurePath, dir);
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  });

  // Optionally, create basic files for each directory
  createBasicFiles(featurePath, featureName);
};

// Create basic files (e.g., basic components, hooks)
const createBasicFiles = (featurePath: string, featureName: string): void => {
  const pascalFeatureName = toPascalCase(featureName);

  // Component file (uppercase PascalCase)
  const componentFile = path.join(featurePath, 'components', `${pascalFeatureName}Component.tsx`);
  fs.writeFileSync(componentFile, `import React from 'react';\n\nconst ${pascalFeatureName}Component = () => {\n  return <div>${pascalFeatureName} Component</div>;\n};\n\nexport default ${pascalFeatureName}Component;`);
  console.log(`Created file: ${componentFile}`);

  // Query file (e.g., MyNewFeatureQuery.ts)
  const queryFile = path.join(featurePath, 'query', `${pascalFeatureName}Query.ts`);
  fs.writeFileSync(queryFile, `// ${pascalFeatureName} query logic goes here`);
  console.log(`Created file: ${queryFile}`);

  // Hook file (e.g., useMyNewFeature.ts)
  const hookFile = path.join(featurePath, 'hook', `${pascalFeatureName}Hook.ts`);
  fs.writeFileSync(hookFile, `import { useState } from 'react';\n\nconst use${pascalFeatureName} = () => {\n  const [data, setData] = useState<null | any>(null);\n\n  return [data, setData];\n};\n\nexport default use${pascalFeatureName};`);
  console.log(`Created file: ${hookFile}`);

  // Types file (e.g., MyNewFeatureTypes.ts)
  const typesFile = path.join(featurePath, 'types', `${pascalFeatureName}Types.ts`);
  fs.writeFileSync(typesFile, `export type ${pascalFeatureName} = {\n  id: string;\n  name: string;\n};`);
  console.log(`Created file: ${typesFile}`);

  // Page file (e.g., MyNewFeaturePage.tsx)
  const pageFile = path.join(featurePath, 'pages', `${pascalFeatureName}Page.tsx`);
  fs.writeFileSync(pageFile, `import React from 'react';\nimport ${pascalFeatureName}Component from '../components/${pascalFeatureName}Component';\n\nconst ${pascalFeatureName}Page = () => {\n  return <${pascalFeatureName}Component />;\n};\n\nexport default ${pascalFeatureName}Page;`);
  console.log(`Created file: ${pageFile}`);
};

// Function to add a new feature to an existing feature folder
const addNewFeatureToExistingFolder = (featureName: string): void => {
  const newFeatureName = promptForNewFeatureName();
  const featurePath = path.join(process.cwd(), 'src', 'features', featureName, newFeatureName);

  if (!fs.existsSync(featurePath)) {
    fs.mkdirSync(featurePath, { recursive: true });
    console.log(`Created feature folder: ${featurePath}`);

    // Create subdirectories and files inside the new feature folder
    createBasicFiles(path.join(process.cwd(), 'src', 'features', featureName, newFeatureName), newFeatureName);
  } else {
    console.log(`Feature "${newFeatureName}" already exists inside "${featureName}".`);
  }
};

// Function to prompt the user for a new feature name
const promptForNewFeatureName = (): string => {
  return readlineSync.question('Enter the name of the new feature to add: ');
};

// Define the CLI command
program
  .command('create-feature <name>')
  .description('Create a new feature folder with components, services, and hooks')
  .action((name) => {
    createFeatureFolder(name);
  });

program.parse(process.argv);
