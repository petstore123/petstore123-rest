# Teacher-Student

## About

Teacher-Student is a RESTful API App

## Prerequisites

* Git
* Node.js (with npm)
* MySQL


## Installation

* `git clone <repository url>` this repository
* `cd petstore123-rest`
* `npm install`
* create database `petstore123`
```
create database petstore123
```
* create db table `registrations`
```
create table registrations(
    teacher varchar(200) not null
  , student varchar(200) not null
  , primary key (teacher, student)
);
```
* create db table `students`
```
create table students(
    student varchar(200) not null
  , suspended varchar(1) not null
  , primary key (student)
);
```

## Running / Development

* `npm run start`
