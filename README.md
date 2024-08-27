# MERN Stack Project

## Description

This project is a full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to create, read, update, and delete posts, as well as comment on and like posts. It includes user authentication and authorization features.

## Installation Instructions

To install and set up the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set up the client:**

   ```bash
   cd client
   npm install
   npm run build
   ```

3. **Set up the server:**

   ```bash
   cd ../server
   npm install
   ```

4. **Run the application using Docker:**
   ```bash
   docker-compose up --build
   ```

## Usage

To use the application, follow these steps:

1. **Start the server:**

   ```bash
   cd server
   npm start
   ```

2. **Access the client application:** Open your browser and navigate to `http://localhost:8080`.

## Features

- **User Authentication:** Sign up and sign in using JWT tokens.
- **Post Management:** Create, read, update, and delete posts.
- **Comment Management:** Add, edit, delete, and like comments on posts.
- **Search Functionality:** Search posts by title and tags.
- **Pagination:** View posts with pagination.
- **Responsive Design:** The application is designed to be responsive and user-friendly.

## API Endpoints

The client communicates with the server using the following API endpoints:

### Posts:

- `GET /posts?page={page}`: Fetch posts with pagination.
- `GET /posts/{id}`: Fetch a single post by ID.
- `GET /posts/search?searchQuery={search}&tags={tags}`: Search posts by title and tags.
- `POST /posts`: Create a new post.
- `PATCH /posts/{id}/likePost`: Like a post.
- `PATCH /posts/{id}`: Update a post.
- `DELETE /posts/{id}`: Delete a post.
- `POST /posts/{id}/commentPost`: Add a comment to a post.
- `PATCH /posts/{id}/likeComment/{comment_id}`: Like a comment.
- `PATCH /posts/{id}/editComment/{comment_id}`: Edit a comment.
- `DELETE /posts/{post_id}/commentPost/{comment_id}`: Delete a comment.

### User Authentication:

- `POST /user/signin`: Sign in a user.
- `POST /user/signup`: Sign up a new user.

## Contributing

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact Information

For any questions or support, please contact [omar7.first@gmail.com].
