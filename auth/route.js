import { signToken } from '../utils/jwt';

const users = [
    { id: '101', username: 'Bob', password: '1234' }
];

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return Response.json({ message: 'Username and password required' }, { status: 400 });
        }

        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
            return Response.json({ message: 'User  not found' }, { status: 401 });
        }

        const token = signToken({ id: user.id, username: user.username });

        return Response.json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        return Response.json({ message: 'Error logging in', error: error.message }, { status: 500 });
    }
}

let blogs = [
    {
        id: 1,
        title: 'A Growing Community',
        time: 'Sept 25, 2009 - 11:58 PM',
        view: '56',
        img: 'img.jpg',
        content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies,
        purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.`
    },
    {
        id: 2,
        title: 'Another Post',
        time: 'Oct 5, 2009 - 02:15 PM',
        view: '120',
        img: 'another.jpg',
        content: 'This is another example blog post.'
    }
];
export async function PUT(req) {
    try {
        const { id, title, time, view, img, content } = await req.json();

        if (!id || (!title && !time && !view && !img && !content)) {
            return Response.json(
                { message: "Blog ID and at least one field to update required" },
                { status: 400 }
            );
        }

        const blogIndex = blogs.findIndex(b => b.id === id);
        if (blogIndex === -1) {
            return Response.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        if (title) blogs[blogIndex].title = title;
        if (time) blogs[blogIndex].time = time;
        if (view) blogs[blogIndex].view = view;
        if (img) blogs[blogIndex].img = img;
        if (content) blogs[blogIndex].content = content;

        return Response.json({
            message: "Blog updated successfully",
            blog: blogs[blogIndex]
        });
    } catch (error) {
        return Response.json(
            { message: "Error updating blog", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return Response.json({ message: "Blog ID required" }, { status: 400 });
        }

        const index = blogs.findIndex(b => b.id === id);
        if (index === -1) {
            return Response.json({ message: "Blog not found" }, { status: 404 });
        }

        blogs.splice(index, 1);

        return Response.json({ message: "Blog deleted successfully" });
    } catch (error) {
        return Response.json({ message: "Error deleting blog", error: error.message }, { status: 500 });
    }
}

// export async function PUT(req) {
//     try {
//         const { id, username, password } = await req.json();

//         if (!id || (!username && !password)) {
//             return Response.json({ message: 'User  ID and at least one field to update required' }, { status: 400 });
//         }

//         const userIndex = users.findIndex(u => u.id === id);
//         if (userIndex === -1) {
//             return Response.json({ message: 'User  not found' }, { status: 404 });
//         }

//         if (username) {
//             users[userIndex].username = username;
//         }
//         if (password) {
//             users[userIndex].password = password;
//         }

//         return Response.json({ message: 'User  updated successfully', user: users[userIndex] });
//     } catch (error) {
//         return Response.json({ message: 'Error updating user', error: error.message }, { status: 500 });
//     }
// }

// export async function DELETE(req) {
//     try {
//         const { id } = await req.json();

//         if (!id) {
//             return Response.json({ message: 'User  ID required' }, { status: 400 });
//         }

//         const userIndex = users.findIndex(u => u.id === id);
//         if (userIndex === -1) {
//             return Response.json({ message: 'User  not found' }, { status: 404 });
//         }

//         users.splice(userIndex, 1);

//         return Response.json({ message: 'User  deleted successfully' });
//     } catch (error) {
//         return Response.json({ message: 'Error deleting user', error: error.message }, { status: 500 });
//     }
// }
