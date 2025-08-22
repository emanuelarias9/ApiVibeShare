<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# APIVIBESHARE

<em>Empower Connections, Ignite Social Innovation Effortlessly</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/license/emanuelarias9/ApiVibeShare?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/emanuelarias9/ApiVibeShare?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/emanuelarias9/ApiVibeShare?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/emanuelarias9/ApiVibeShare?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&logo=Mongoose&logoColor=white" alt="Mongoose">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">

</div>
<br>

---

## Table of Contents

- [Overview](#overview)
- [swagger documentation](#-swagger-documentation)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Features](#features)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

🚀 **ApiVibeShare** is a REST API developed with Node.js, Express, and MongoDB, designed to support a social network. 

This project provides a modular architecture, integrated security, and extensive documentation. The core features include:

- **🛡️ Security & Authentication:** JWT-based security ensures protected routes and secure user sessions.
- **📚 API Documentation:** Swagger integration offers comprehensive, auto-generated API docs for easy onboarding and maintenance.
- **🔧 Modular Routing & Controllers:** Clear separation of concerns facilitates scalable and maintainable code.
- **🧹 Utility Functions:** Built-in validation, media handling, and ownership verification streamline common tasks.
- **🗃️ Data Models & Pagination:** Robust schemas support scalable social interactions with efficient data management.

---
## 📚 Swagger Documentation
```
 https://apivibeshare.onrender.com/api-docs

 ```
## Features

|      | Component          | Details                                                                                     |
| :--- | :----------------- | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**   | <ul><li>RESTful API built with Express.js</li><li>Model-View-Controller (MVC) pattern</li><li>Separation of concerns between routes, controllers, and models</li></ul> |
| 🔩 | **Code Quality**   | <ul><li>Consistent code style with ESLint</li><li>Use of async/await for asynchronous operations</li><li>Modular folder structure for scalability</li></ul> |
| 📄 | **Documentation**  | <ul><li>Swagger UI integrated for API docs</li><li>JSDoc comments for functions and endpoints</li><li>README provides setup and usage instructions</li></ul> |
| 🔌 | **Integrations**    | <ul><li>MongoDB via Mongoose ODM</li><li>Swagger for API documentation</li><li>CORS middleware for cross-origin requests</li><li>dotenv for environment variables</li><li>JWT-simple for authentication tokens</li></ul> |
| 🧩 | **Modularity**      | <ul><li>Separate modules for user, auth, and file upload functionalities</li><li>Reusable middleware functions</li><li>Configurable environment-based settings</li></ul> |
| ⚡️  | **Performance**     | <ul><li>Use of mongoose-paginate-v2 for efficient data pagination</li><li>Asynchronous request handling</li></ul> |
| 🛡️ | **Security**        | <ul><li>Input validation with validator library</li><li>JWT for stateless authentication</li><li>Use of CORS middleware to restrict origins</li></ul> |
| 📦 | **Dependencies**    | <ul><li>Core: express, mongoose, cors, dotenv</li><li>Utilities: multer, moment, validator, bcrypt, jwt-simple</li><li>Documentation: swagger-jsdoc, swagger-ui-express</li><li>Development: nodemon</li></ul> |

---

### Project Index

<details open>
	<summary><b><code>APIVIBESHARE/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/index.js'>index.js</a></b></td>
					<td style='padding: 8px;'>- Sets up the core server infrastructure for VibeShare, establishing database connection, API routing, and middleware configurations<br>- Integrates Swagger for comprehensive API documentation and enforces security via JWT authentication<br>- Facilitates communication between client applications and backend services, enabling user management, content posting, and social interactions within the social media platform.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Defines the core configuration and dependencies for a RESTful social network API built with Node.js, Express, and MongoDB<br>- It establishes the project’s metadata, scripts, and essential libraries for user authentication, data management, and API documentation, serving as the foundation for the applications backend architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/LICENSE'>LICENSE</a></b></td>
					<td style='padding: 8px;'>Provides licensing information that governs the use, distribution, and modification of the entire software project, ensuring legal clarity and compliance across all components within the architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/jsconfig.json'>jsconfig.json</a></b></td>
					<td style='padding: 8px;'>- Defines the JavaScript project’s configuration settings, ensuring consistent compilation and module resolution across the codebase<br>- It facilitates seamless development by specifying language features, module types, and file inclusion, thereby supporting the overall architectures stability and maintainability within the project’s structure.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- database Submodule -->
	<details>
		<summary><b>database</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ database</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/database/connection.js'>connection.js</a></b></td>
					<td style='padding: 8px;'>- Establishes and manages the connection to the MongoDB database for VibeShare, ensuring reliable data storage and retrieval<br>- Facilitates seamless integration with the database layer, enabling other components to interact with persistent data efficiently<br>- Serves as a foundational element in the applications architecture, supporting data-driven features and overall system stability.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- routes Submodule -->
	<details>
		<summary><b>routes</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ routes</b></code>
			<!-- User Submodule -->
			<details>
				<summary><b>User</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ routes.User</b></code>
					<!-- V1 Submodule -->
					<details>
						<summary><b>V1</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ routes.User.V1</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/routes/User/V1/UserRoutes.js'>UserRoutes.js</a></b></td>
									<td style='padding: 8px;'>- Defines user-related API endpoints for account management, profile retrieval, and image uploads within the application<br>- Facilitates user registration, authentication, profile updates, and avatar handling, integrating middleware for security and file handling<br>- Serves as a key routing layer connecting client requests to user controller logic, supporting core user functionalities in the overall system architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- Follow Submodule -->
			<details>
				<summary><b>Follow</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ routes.Follow</b></code>
					<!-- V1 Submodule -->
					<details>
						<summary><b>V1</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ routes.Follow.V1</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/routes/Follow/V1/FollowRoutes.js'>FollowRoutes.js</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing user follow relationships, enabling functionalities such as following, unfollowing, and retrieving lists of followers and followings<br>- Integrates authentication middleware to secure these interactions, supporting the overall social connectivity features within the application’s architecture<br>- This routing layer facilitates seamless user engagement and relationship management.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- Post Submodule -->
			<details>
				<summary><b>Post</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ routes.Post</b></code>
					<!-- V1 Submodule -->
					<details>
						<summary><b>V1</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ routes.Post.V1</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/routes/Post/V1/PostRoutes.js'>PostRoutes.js</a></b></td>
									<td style='padding: 8px;'>- Defines API endpoints for managing social media posts, including creation, retrieval, deletion, image uploads, and user-specific feeds<br>- Integrates authentication and file handling to facilitate seamless post interactions within the application’s architecture, serving as the primary interface for post-related operations.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- middlewares Submodule -->
	<details>
		<summary><b>middlewares</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ middlewares</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/middlewares/auth.js'>auth.js</a></b></td>
					<td style='padding: 8px;'>- Implements authentication middleware to verify and decode JWT tokens, ensuring secure access control across the application<br>- It validates token presence, integrity, and expiration, attaching authenticated user data to requests<br>- This component is essential for safeguarding protected routes and maintaining secure user sessions within the overall system architecture.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- models Submodule -->
	<details>
		<summary><b>models</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ models</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/models/Follow.js'>Follow.js</a></b></td>
					<td style='padding: 8px;'>- Defines the schema and model for tracking user follow relationships within the application<br>- Facilitates recording, querying, and managing follow actions between users, enabling features like follower lists and activity feeds<br>- Integrates pagination support to efficiently handle large datasets, supporting scalable social interactions across the platform.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/models/User.js'>User.js</a></b></td>
					<td style='padding: 8px;'>- Defines the user data model within the applications architecture, facilitating user management and authentication processes<br>- It structures user information, including credentials, profile details, and roles, while integrating pagination capabilities for efficient data handling<br>- This schema serves as a foundational component for user-related functionalities across the system.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/models/Post.js'>Post.js</a></b></td>
					<td style='padding: 8px;'>- Defines the schema and model for social media posts, enabling storage, retrieval, and pagination of user-generated content within the application<br>- Facilitates efficient management of posts, including associated media files, timestamps, and user references, forming a core component of the platforms content management architecture.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- utilitario Submodule -->
	<details>
		<summary><b>utilitario</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ utilitario</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/utilitario/validateOwnership.js'>validateOwnership.js</a></b></td>
					<td style='padding: 8px;'>- Provides a utility to verify document ownership within the application, ensuring that access and modifications are restricted to authenticated users who are the rightful owners<br>- Integrates seamlessly into the broader architecture by validating user permissions at the data layer, thereby maintaining data integrity and security across the system.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/utilitario/CleanBody.js'>CleanBody.js</a></b></td>
					<td style='padding: 8px;'>- Provides a utility function to sanitize objects by removing properties with empty strings, null, or undefined values, and trimming string properties<br>- Integrates into the broader codebase to ensure data integrity and cleanliness before processing or storage, supporting consistent and reliable data handling across the application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/utilitario/ValidateImage.js'>ValidateImage.js</a></b></td>
					<td style='padding: 8px;'>- Provides utility functions for image validation and management within the application<br>- Ensures uploaded images meet format requirements and handles deletion of user avatars and post images, maintaining data integrity and storage hygiene across the project’s media handling architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/utilitario/HttpErrors.js'>HttpErrors.js</a></b></td>
					<td style='padding: 8px;'>- Defines a set of custom HTTP error classes aligned with standard HTTP status codes, facilitating consistent and descriptive error handling across the application<br>- These classes enable clear communication of specific error conditions, improving maintainability and debugging within the overall system architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/utilitario/jwt.js'>jwt.js</a></b></td>
					<td style='padding: 8px;'>- Generates JSON Web Tokens (JWT) for user authentication by encoding user identity, role, and timestamp information<br>- Facilitates secure, time-limited access control within the application’s architecture, enabling authenticated interactions across different components<br>- Serves as a core utility for managing user sessions and ensuring authorized access throughout the system.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- controllers Submodule -->
	<details>
		<summary><b>controllers</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ controllers</b></code>
			<!-- User Submodule -->
			<details>
				<summary><b>User</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ controllers.User</b></code>
					<!-- V1 Submodule -->
					<details>
						<summary><b>V1</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ controllers.User.V1</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/controllers/User/V1/UserController.js'>UserController.js</a></b></td>
									<td style='padding: 8px;'>- This code file, <code>UserController.js</code>, serves as the primary interface for managing user-related operations within the applications architecture<br>- It orchestrates user registration, authentication, profile management, and social interactions by coordinating various service functions<br>- Essentially, it acts as the central controller that processes incoming user requests, validates data, and delegates tasks to underlying services, thereby enabling seamless user account handling and social features across the system.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- Follow Submodule -->
			<details>
				<summary><b>Follow</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ controllers.Follow</b></code>
					<!-- V1 Submodule -->
					<details>
						<summary><b>V1</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ controllers.Follow.V1</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/controllers/Follow/V1/FollowController.js'>FollowController.js</a></b></td>
									<td style='padding: 8px;'>- Manages user follow relationships by providing endpoints to follow, unfollow, and retrieve lists of users being followed or followers<br>- Facilitates social connectivity within the platform, enabling users to build and explore their network, while ensuring proper authorization and pagination for scalable data access<br>- Integrates seamlessly into the overall architecture to support social interaction features.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<!-- Post Submodule -->
			<details>
				<summary><b>Post</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ controllers.Post</b></code>
					<!-- V1 Submodule -->
					<details>
						<summary><b>V1</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ controllers.Post.V1</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/controllers/Post/V1/PostController.js'>PostController.js</a></b></td>
									<td style='padding: 8px;'>- The <code>PostController.js</code> file serves as the primary interface for managing user-generated posts within the application<br>- It orchestrates core functionalities such as creating, retrieving, deleting, and updating posts, as well as handling associated media uploads and feeds<br>- By delegating business logic to dedicated services, this controller ensures a clean separation of concerns, facilitating scalable and maintainable interactions with the post-related features across the platform<br>- Overall, it acts as the central gateway for post operations, enabling seamless content management within the applications architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- services Submodule -->
	<details>
		<summary><b>services</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ services</b></code>
			<!-- User Submodule -->
			<details>
				<summary><b>User</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ services.User</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/services/User/UserService.js'>UserService.js</a></b></td>
							<td style='padding: 8px;'>- Provides core user management functionalities, including validation, retrieval, updating, and image handling within the broader application architecture<br>- Facilitates user registration, authentication, profile updates, and social interactions by ensuring data integrity and consistency across user-related operations<br>- Serves as a central service layer that supports user-centric features and maintains data validation standards.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- Follow Submodule -->
			<details>
				<summary><b>Follow</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ services.Follow</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/services/Follow/FollowService.js'>FollowService.js</a></b></td>
							<td style='padding: 8px;'>- Manages user follow relationships within the platform, enabling functionalities such as following and unfollowing users, retrieving followers and following lists with pagination, and verifying follow status<br>- Integrates validation and error handling to ensure data integrity, supporting social interaction features essential for user engagement and network building in the overall application architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
			<!-- Post Submodule -->
			<details>
				<summary><b>Post</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ services.Post</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='https://github.com/emanuelarias9/ApiVibeShare/blob/master/services/Post/PostService.js'>PostService.js</a></b></td>
							<td style='padding: 8px;'>- Provides core functionalities for managing user posts within the application, including creation, retrieval, updating images, deletion, and generating user feeds<br>- Facilitates interaction with the post data model, enforces ownership and validation rules, and supports media handling, thereby serving as the central service layer for post-related operations in the overall architecture.</td>
						</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

### Installation

Build ApiVibeShare from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/emanuelarias9/ApiVibeShare
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd ApiVibeShare
    ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### Testing

Apivibeshare uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## Roadmap

- [X] **`User`**: <strike>Implement user endpoints.</strike>
- [X] **`Follow`**: <strike>Implement follow endpoints.</strike>
- [X] **`Post`**: <strike>Implement post endpoints.</strike>
- [ ] **`languages`**: implement multiple languages.

---

## Contributing

- **💬 [Join the Discussions](https://github.com/emanuelarias9/ApiVibeShare/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/emanuelarias9/ApiVibeShare/issues)**: Submit bugs found or log feature requests for the `ApiVibeShare` project.
- **💡 [Submit Pull Requests](https://github.com/emanuelarias9/ApiVibeShare/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/emanuelarias9/ApiVibeShare
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/emanuelarias9/ApiVibeShare/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=emanuelarias9/ApiVibeShare">
   </a>
</p>
</details>

---

## License

Apivibeshare is protected under the MIT License. For more details, refer to the [LICENSE](./LICENSE) file.

---

<div align="left"><a href="#top">⬆ Return</a></div>

---
