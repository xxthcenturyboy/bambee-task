CONTAINER_WEB := $(shell docker-compose ps -q web)
CONTAINER_PG := $(shell docker-compose ps -q postgres)

## start server
serve:
	docker exec -it ${CONTAINER_WEB} npm start

## start "prod" server
serve-prod:
	docker exec -it -e NODE_ENV=production ${CONTAINER_WEB} npm start

## start workers
work:
	docker exec -it ${CONTAINER_WEB} npm run start:workers

## Run dbmigrations
migrate:
	docker exec -it -e NODE_ENV=development ${CONTAINER_WEB} npm run migrate

## Runs webpack (development)
webpack:
	docker exec -it ${CONTAINER_WEB} npm run dev

## start docker shell
shell:
	docker exec -it ${CONTAINER_WEB} /bin/bash

## Run test (one file)
test-file:
	./node_modules/.bin/webpack --config=scripts/webpack/webpack.standalone.js ${FILE} -o .test.file.js  && \
	docker exec -it ${CONTAINER_WEB} npm run test:file

## Run tests
test:
	docker exec -it ${CONTAINER_WEB} npm test

## Run tests
test-client:
	docker exec -it ${CONTAINER_WEB} npm run test-client

## Fill local db with some bootstrapped data
seed:
	docker exec -it -e PGPASSWORD=password ${CONTAINER_PG} sh -c "pg_restore -h localhost -U pguser -p 5432 -d app -c /host-db/pgdump_seed.dump"

export-seed:
	rm -rf scripts/db/pgdump_seed.sql && \
	docker exec -it -e PGPASSWORD=password ${CONTAINER_PG} sh -c "pg_dump -h localhost -U pguser -p 5432 -d app -Fc > /host-db/pgdump_seed.dump"
