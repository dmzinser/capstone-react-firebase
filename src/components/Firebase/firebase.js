import app from 'firebase/app';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  googleKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
  yelpKey: process.env.REACT_APP_YELP_KEY
};

class Firebase {
  constructor() {
    app.initializeApp(config)
  }
};

export default Firebase;