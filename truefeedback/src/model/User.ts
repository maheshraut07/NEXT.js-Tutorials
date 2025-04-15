import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date; 
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

// Updated User schema
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);

export default UserModel;


/*

import mongoose, { Schema, Document } from 'mongoose';
mongoose: MongoDB object modeling tool.

Schema: Allows defining the shape of documents.

Document: Mongoose's interface representing a MongoDB document.

📩 Message Interface and Schema
ts
Copy
Edit
export interface Message extends Document {
  content: string;
  createdAt: Date;
}
Defines a TypeScript interface Message which extends Mongoose's Document.

It represents a single message with:

content: the text of the message.

createdAt: timestamp of when it was created.

ts
Copy
Edit
const MessageSchema: Schema<Message> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
Defines the actual Mongoose schema for Message.

createdAt is automatically set to the current date/time.

👤 User Interface and Schema
ts
Copy
Edit
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}
Defines the User interface representing a user document.

It includes fields like username, email, password, verification details, and an array of Messages.

ts
Copy
Edit
const UserSchema: Schema<User> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});
This is the actual schema used to define how User documents look in MongoDB.

messages is an array of embedded Message documents.

🏁 Creating the Model
ts
Copy
Edit
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>('User', UserSchema);
This line:

Checks if a model named "User" already exists (mongoose.models.User).

If it does, it reuses it to avoid redefinition errors (common in dev environments like Next.js).

If not, it creates a new one with mongoose.model().

🔚 Export
ts
Copy
Edit
export default UserModel;
Exports the final UserModel to be used in other parts of the application (e.g., for querying users).

🔎 Summary
✅ MessageSchema: defines a sub-document (used within the user schema).

✅ UserSchema: defines a user with authentication and messaging support.

✅ TypeScript interfaces help with type safety.

✅ Default values and validation (like email format) are set using schema options.

✅ Model reuse logic prevents issues in hot-reloading dev environments.

Let me know if you want this explained even more simply or visually!

*/