import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GC_PROJECT_ID,
  credentials: {
    client_email: process.env.GC_CLIENT_EMAIL,
    private_key: process.env.GC_PRIVATE_KEY,
  },
});

export default storage;
