# fair.teknikfokus.se
A CMS system for doing digital career fairs

## Installation

Install and setup a PostgreSQL database.

Install npm dependencies.
```bash
$ npm install
```

Copy ```.env.example``` to ```.env```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker

Change ```POSTGRES_HOST``` to ```postgres-db``` in ```.env```.

Then start the project with Docker Compose, the default ```docker-compose.yml``` is setup for development and includes a PostgreSQL database.

```bash
# run docker-compose
$ docker-compose up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Send e-mail through SMTP

Change ```MAIL_TRANSPORT``` in ```.env``` to your SMTP server, optionally with an username and password.

If you want to use [MailHog](https://github.com/mailhog/MailHog) for testing purposes and you're running the default ```docker-compose.yml```, change ```MAIL_TRANSPORT``` to ```mailhog:1025```.

## License

fair.teknikfokus.se is [MIT licensed](LICENSE).
