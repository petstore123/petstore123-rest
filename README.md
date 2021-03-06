# Teacher-Student

## About

Teacher-Student is a RESTful API App

## Prerequisites

* Git
* Node.js (with npm)
* MySQL
* [Optional] Docker


## Installation

* `git clone <repository url>` this repository
* `cd petstore123-rest`
* `npm install`
* create database `petstore123`
```
create database petstore123;
```
* create `.env` in application root with mysql user, password, host, port, and database
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=abcd1234
DB_DATABASE=petstore123
```
* create db table `registrations`
```
use petstore123;
create table registrations(
    teacher varchar(200) not null
  , student varchar(200) not null
  , primary key (teacher, student)
);
```
* create db table `students`
```
use petstore123;
create table students(
    student varchar(200) not null
  , suspended varchar(1) not null
  , primary key (student)
);
```

## Running

* `npm run start`, API will start on http://0.0.0.0:3000/api/{resources}

## Docker

* To build a container `docker build -t petstore123/petstore123-rest .`
* To run the container `docker run -p 3000:3000 -d petstore123/petstore123-rest`
* To enter the container `docker ps`, `docker exec -it <container id> /bin/bash`