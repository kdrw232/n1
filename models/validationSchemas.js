const z = require('zod')

// Register Schema
 const registerSchema = z.object({
  username: z.string().min(3).max(34),
  email: z.string().min(9).max(100).email(),
  fullName: z.string().min(2).max(40),
  password: z.string().min(8),
});
module.exports = {
    registerSchema
}