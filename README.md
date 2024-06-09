# Gmail Classifeir

How to run locally.

## Prerequisites

Before running this project, make sure you have the following installed on your machine:

- Node.js
- npm

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yawar-abass/gmail-classifier.git
   ```

2. Set Up Environment Variables

Create a new file named .env.local in the root of your project and add the following content:

```bash
  AUTH_SECRET=secret
  AUTH_GOOGLE_ID=GOOGLE_ID
  AUTH_GOOGLE_SECRET=GOOGLE_SECRET

```

3. Navigate to the project directory:

   ```bash
   cd gmail-classifier
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the running application.

7. To access the dashboard, Insert your api key and login with google account. and Please allow access of emails as it is not stored in the database.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready application.
- `npm run start`: Starts the production server.

## Learn More

To learn more about Next.js, check out the [Next.js documentation](https://nextjs.org/docs).
