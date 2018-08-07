#!/bin/bash

curl -H "Content-Type: application/json" -X POST -d '{"email":"test@test.com","password":"abcd", "role":"2" }'     http://localhost:3000/api/signup
