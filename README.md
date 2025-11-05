# Word Cloud App

A real-time word cloud application built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Features

- **Admin Panel** (`/admin`): Set the current question for word submissions
- **Main Display** (`/`): Submit words and view live updating word cloud
- **Real-time Updates**: Word cloud updates instantly when new submissions come in
- **Word Frequency**: Words appear larger based on how often they're submitted

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- Firebase Firestore (database + real-time listeners)
- d3-cloud (word cloud visualization)

## Setup

### 1. Firebase Configuration

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Get your Firebase config credentials
4. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Firestore Database Setup

In your Firebase console, create two collections:

1. **words** collection (will auto-create when first word is submitted)
   - Fields: `text` (string), `createdAt` (timestamp)

2. **settings** collection
   - Create a document with ID: `current`
   - Add field: `currentQuestion` (string)

### 3. Firestore Rules

Set up your Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /words/{document=**} {
      allow read: if true;
      allow write: if true;
    }
    match /settings/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### 4. Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the main page.

Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

## Usage

### Admin Panel
1. Navigate to `/admin`
2. Enter a question in the text input
3. Click "Save Question" to update

### Main Page
1. View the current question
2. Enter a word or phrase in the input box
3. Click "Submit" to add your word
4. Watch the word cloud update in real-time

## Project Structure

```
wordcloud/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin panel
│   └── page.tsx               # Main word cloud display
├── components/
│   └── WordCloud.tsx          # Word cloud visualization component
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   ├── actions.ts             # Server actions for database operations
│   ├── useWords.ts            # Hook for real-time word updates
│   └── useQuestion.ts         # Hook for real-time question updates
└── .env.local                 # Environment variables (create this)
```
