import { z } from 'zod'

export const AcceptMessageSchema = z.object({
  acceptMessages: z.boolean(),
});


/*
info about zod



import { z } from 'zod';

// Define a schema
const UserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().int().positive(),
});

// Validate data
const result = UserSchema.safeParse({
  username: "Mahesh",
  email: "mahesh@example.com",
  age: 22,
});

if (!result.success) {
  console.log("Validation failed:", result.error.issues);
} else {
  console.log("Valid data:", result.data);
}
🧠 Type Inference from Schema
Zod can automatically infer TypeScript types:

ts
Copy
Edit
type User = z.infer<typeof UserSchema>;
This gives you:

ts
Copy
Edit
type User = {
  username: string;
  email: string;
  age: number;
}
🧱 Nested Objects & Arrays
ts
Copy
Edit
const MessageSchema = z.object({
  content: z.string(),
  createdAt: z.date(),
});

const FullUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  messages: z.array(MessageSchema),
});
🔁 Integration with APIs
When receiving JSON data (e.g., from a frontend):

ts
Copy
Edit
app.post('/register', (req, res) => {
  const parsed = UserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.issues });
  }
  // Proceed with parsed.data
});
⚡ Why Use Zod?
✅ Clean, composable syntax

✅ Strong TypeScript support

✅ Replaces Joi, Yup, and even manual validations

✅ No runtime dependencies

*/