// Simulating a simple in-memory user database
let users = [
    { id: 1, username: 'user1', email: 'user1@example.com' }
  ];
  
  export default async function handler(req, res) {
    if (req.method === 'GET') {
      // Return all users
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const { username, email } = req.body;
      
      if (!username || !email) {
        res.status(400).json({ error: 'Missing required fields: username and email' });
        return;
      }
  
      const newUser = {
        id: users.length + 1,
        username,
        email
      };
  
      users.push(newUser);
      res.status(201).json({ message: 'User created', user: newUser });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  