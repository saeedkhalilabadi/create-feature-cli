# create-feature-cli

**create-feature-cli** is a command-line tool for quickly creating feature folders in a TypeScript-based project. It helps developers by automating the process of generating well-structured feature directories, including components, hooks, queries, types, and pages, with files named in PascalCase.

## Features

- Automatically generates feature folders for a project.
- Creates `components`, `hook`, `query`, `types`, and `pages` subdirectories.
- Generates basic template files for each subdirectory in PascalCase (e.g., `MyNewFeatureComponent.tsx`).
- Fully written in TypeScript.

## Installation

To install the package globally, use the following command:

```bash
npm install -g create-feature-cli
```

## Usage

**Creating a New Feature**

To create a new feature folder, run the following command in your terminal:

```
create-feature <feature-name>
```

This will create the following folder structure inside src/features/my-new-feature:

```
src/features/my-new-feature/
  ├── components/
  │   └── MyNewFeatureComponent.tsx
  ├── query/
  │   └── MyNewFeatureQuery.ts
  ├── hook/
  │   └── useMyNewFeature.ts
  ├── types/
  │   └── MyNewFeatureTypes.ts
  └── pages/
      └── MyNewFeaturePage.tsx

```

## Folder Structure

- **components**: Contains React components for the feature.

- **query**: Includes any query logic for data fetching or manipulation.

- **hook**: Contains hooks specific to the feature.

- **types**: Holds TypeScript types for the feature.

- **pages**: Contains page components that can be used in routing.


## Example of Generated Files

**MyNewFeatureComponent.tsx**
```import React from 'react';

const MyNewFeatureComponent = () => {
  return <div>MyNewFeature Component</div>;
};

export default MyNewFeatureComponent;
```
**useMyNewFeature.ts**
```
import { useState } from 'react';

const useMyNewFeature = () => {
  const [data, setData] = useState<null | any>(null);

  return [data, setData];
};

export default useMyNewFeature;
```
**MyNewFeatureTypes.ts**
```
export type MyNewFeature = {
  id: string;
  name: string;
};
```
**MyNewFeaturePage.tsx**
```
import React from 'react';
import MyNewFeatureComponent from '../components/MyNewFeatureComponent';

const MyNewFeaturePage = () => {
  return <MyNewFeatureComponent />;
};

export default MyNewFeaturePage;
```