export default async function handler(req, res) {
    let users = [
        { id: 1, name: "User1", email: "user1@example.com" },
    ];

    if (req.method === "GET") {
        // Return all users
        res.status(200).json(users);
    } else if (req.method === "POST") {
        const { name, email } = req.body;

        // Check if name and email are provided
        if (!name || !email) {
            return res.status(400).json({ error: "Missing required fields: name and email" });
        }

        // Check if the user already exists
        const userExists = users.some(user => user.name === name);
        if (userExists) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Create new user
        const newUser = {
            id: users.length + 1,
            name,
            email
        };

        users.push(newUser);
        res.status(201).json({ message: "User created", user: newUser });
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
