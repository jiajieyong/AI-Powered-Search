# 📚 AI Knowledge Base

## 1 Project

### 1.1 Project Stack

| Layer      | Tech Stack                   |
|------------|------------------------------|
| Frontend   | React, TypeScript            |
| Backend    | NestJS, MikroORM, TypeScript |
| Workspace  | pnpm, pnpm workspaces, concurrently |

---

### 1.2 Project Structure
/ai-knowledge-base ├── backend/ # NestJS backend app │ ├── src/ │ └── package.json ├── frontend/ # React frontend app │ ├── src/ │ └── package.json ├── package.json # Root: workspace scripts & devDependencies ├── pnpm-workspace.yaml └── README.md

---

## 2 Getting Started

### 2.1 Prerequisites

- Node.js (v18 or later)
- pnpm (`npm install -g pnpm`)

---

### 2.2 Installation

Clone the repository
```
bash
git clone https://github.com/your-username/ai-knowledge-base.git
cd ai-knowledge-base
```

Install dependencies for all apps:
```
pnpm install
```


## 3 Guide

### 3.1 Starting the Application
🖥️ Start Frontend (React)
```
pnpm --filter frontend dev
```
Runs on http://localhost:3000.


🛠️ Start Backend (NestJS)
```
pnpm --filter backend start:dev
```
Runs on http://localhost:3001.


🚀 Start Both Frontend & Backend (Monorepo mode)
```
pnpm dev
```
This runs both apps concurrently.

### 3.2 Running unit test

For Frontend:
```
pnpm --filter frontend test
```

For Backend:
```
pnpm --filter backend test
```

For all tests:
```
pnpm test
```