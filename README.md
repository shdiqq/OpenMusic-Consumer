# OpenMusic-Consumer

## Description
This is a message broker with a point to point message distribution pattern. This aims to handle export features which are carried out asynchronously and separately from the main server, [OpenMusic-API](https://github.com/shdiqq/OpenMusic-API.git). The request will be sent via email.

## Technology Used

- NodeJS

## Tools Used
- Nodemailer
- RabbitMQ
- Redis

## Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/shdiqq/OpenMusic-Consumer.git
```

Change into the project directory:

```bash
cd OpenMusic-Consumer
```

Install the necessary dependencies:

```bash
npm install
```

Create a .env file and add your database configuration:
- **HOST**: Host to be used by your application.
- **PORT**: Port to be used by your application.
- **PGUSER**: Your base data username.
- **PGPASSWORD**: Your basic data password.
- **PGDATABASE**: Database name to be used by your application.
- **PGHOST**: Your host base data (eg: `localhost` or IP address).
- **PGPORT**: The port used by your database (eg: `3306` for MySQL).
- **RABBITMQ_SERVER**: RabbitMQ host server value
- **MAIL_HOST**: Host value of the SMTP server
- **MAIL_PORT**: Port value of the SMTP server
- **MAIL_ADDRESS**: Sender email address credentials
- **MAIL_PASSWORD**: Sender's email password credentials
- **REDIS_SERVER**: Redis host server value

Make sure to populate these values with information appropriate to your development environment. All these configurations are very important to run the application properly.

Example `.env`:

```env
HOST=localhost
PORT=5432
PGUSER=my_username
PGPASSWORD=my_password
PGDATABASE=my_db_name
PGHOST=localhost
PGPORT=3306
RABBITMQ_SERVER=amqp://localhost
MAIL_HOST=my_mail_host
MAIL_PORT=my_mail_port
MAIL_ADDRESS=my_mail_address
MAIL_PASSWORD=my_mail_password
REDIS_SERVER=127.0.0.1
```

Run the project:

```bash
npm run start
```
