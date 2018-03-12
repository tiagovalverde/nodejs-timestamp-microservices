# Timestamp Microservices

A node.js API that accepts a string representing a date. This service recognized the data, either as a Unix timestamp or natural language and returns JSON data with both date formats.

This project is part of the FreecodeCamp Back End certification.

### User Stories

1. I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
2. If it does, it returns both the Unix timestamp and the natural language form of that date.
3. If it does not contain a date or Unix timestamp, it returns null for those properties.

### Modules used

* Moment.js
* Pug
* Bower
* Boostrap