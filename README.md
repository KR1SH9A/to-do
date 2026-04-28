# Todo

A practice backend project by Me to learn:

- Singleton pattern

- Repository pattern

- Service layer architecture

### **Made in NodeJS, ExpressJS in Typescript with better-sqlite3.** 

---

## **!Yet to be done,**
- [x] Basic CRUD (create, read)
- [x] Remaining CRUD Operations
- [ ] Front-end


### **Get started,** 
1) git clone https://github.com/KR1SH9A/to-do.git 
2) cd todo-krishna
---
Install dependecies,
3) npm install

---
Start the server,
4) npm run dev

runs at - http://localhost:3000/todo

---

### Test example,

1) *creating a todo example,*

curl -X POST http://localhost:3000/todo \
-H "Content-Type: application/json" \
-d '{
  "name": "test the add todo",
  "priorityTag": "low",
  "entitiesInvolved": ["Me"]
}'

---

2) *checking the available todo's*

curl http://localhost:3000/todo
