# Keep

![](https://img.shields.io/badge/Release%20-%20v1.0.0-%23007EC6)
<a href="https://github.com/iamcarlosdaniel/Keep/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="Keep is released under the MIT license."></a>

![](docs/banner.png)

This API is part of a note-taking application designed with a three-tier architecture. The goal of this application is to provide those who are starting out in software development with a clear understanding of how an application can scale from a three-tier architecture to a microservices-based architecture. I hope you find it very useful.

> If you only wish to download and start the project, go directly to the [Getting Started](#getting-started) section.

## [Three-tier Architecture](https://www.ibm.com/topics/three-tier-architecture)

Three-tier architecture is a well-established software application architecture that organizes applications into three logical and physical computing tiers: the presentation tier, or user interface; the application tier, where data is processed; and the data tier, where application data is stored and managed.

### The three tiers in detail

- **Presentation Tier:** This is the user interface layer where end users interact with the application. It displays and collects information and can be implemented via web browsers, desktop applications, or GUIs using HTML, CSS, and JavaScript.

- **Application Tier:** Known as the logic or middle tier, this is the core of the application where data from the presentation tier is processed using business logic and rules. It also handles data modification in the data tier.

- **Data Tier:** Also called the database tier, this is where processed information is stored and managed, using either relational databases (e.g., PostgreSQL, MySQL) or NoSQL databases (e.g., MongoDB). Communication between the presentation and data tiers occurs exclusively through the application tier.

- **Tier vs. Layer:** The terms "tier" and "layer" are often confused. A "layer" refers to a functional division within the software, while a "tier" indicates a division that operates on separate infrastructure. For instance, a Contacts app is a three-layer but single-tier application since all layers run on the same device. Understanding this distinction is crucial, as layers do not provide the same benefits as tiers.

### Benefits of three-tier architecture

The chief benefit of three-tier architecture is its logical and physical separation of functionality. Each tier can run on a separate operating system and server platform - for example, web server, application server, database server - that best fits its functional requirements. And each tier runs on at least one dedicated server hardware or virtual server, so the services of each tier can be customized and optimized without impacting the other tiers.

Below is the diagram of our system based on a three-tier architecture:

![](docs/three-tier_architecture_diagram.PNG)

In the controller, we will manage everything related to HTTP, which means handling requests and responses from our endpoints. Additionally, we will use a lightweight Express router to direct requests to the corresponding controller.

All business logic will be implemented in the service layer, which will expose certain services (methods) to be used by the controller.

The third layer is the data access layer, where we will interact directly with the database.

---

You can learn more about the three-tier architecture in this [article from IBM.](https://www.ibm.com/topics/three-tier-architecture)

## Database

This will be the database we will use. Although we are utilizing MongoDB, which is a non-relational database, it is possible to represent an entity-relationship diagram similar to that of a SQL database to facilitate better data management.

Below is the entity-relationship diagram:

<div align="center">
<img src="docs/entity_relationship_diagram.svg" alt="Entity Relationship Diagram">
</div>

As can be seen, this is a relatively simple database, but it is sufficient for the needs of this project. We have the users table, which has a one-to-many relationship with both the sessions table and the notes table.

## Getting started

1. Clone the repository to your local machine:

   ```sh
   git clone https://github.com/iamcarlosdaniel/keep-server-api-three-tier
   ```

2. Navigate to the project directory:

   ```sh
   cd keep-server-api-three-tier
   ```

3. Install the necessary dependencies:

   ```sh
   npm install
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

> The project is configured to run on port 3000, so ensure that this port is available for use and check the database connection. You can find these and other options in the environment variables of the project located in the `.env` file.

> [!IMPORTANT]
> For the project to function correctly, an initial data load into the database is required. Before running the project, make sure to execute the following commands to complete this process.

- To populate the `colors` collection:

  ```sh
  npm run seed:colors
  ```

> [!NOTE]
> The project is configured to run on port 3000, so ensure that this port is available and that the database connection is properly set up. You can find these and other configuration options in the project's environment variables located in the `.env` file.

## API Documentation

<img src="docs/swagger_logo_banner.png" alt="Swagger Logo">

<br>

Swagger is an open-source toolkit that helps design, build, document, and consume RESTful APIs. It provides a standardized and visual way to interact with APIs, improving the understanding and usage of their endpoints.

Swagger is especially useful in environments where collaboration between development and testing teams is essential, as it offers a clear and standardized method for documenting and consuming APIs.

<img src="docs/scalar_logo_banner.png" alt="Scalar Logo">

We use Swagger as a tool for standardized documentation and implement a graphical interface using Scalar through its middleware [@scalar/express-api-reference](https://scalar.com).

You can access the API documentation at the following URL:

```
http://localhost:3000/api/v1/reference
```

Make sure the project is running and that port 3000 is not in use to access this route.

> [!NOTE]
> You can change the port number and other options in the project's environment variables located in the `.env` file.

## Dependencies

You can view the project’s dependencies along with their versions in the [package.json](package.json) file.
