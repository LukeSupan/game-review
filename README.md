# THE HOLE - BLOG

## DESCRIPTION
Hole is my username on pretty much everything, that's where the name comes from if you were curious.

It can basically just act as a personal blog. Currently, it just allows posts by admins that can be made, updated, and deleted. Users can just read them.

It isn't hosted anywhere so no one can see any posts, if I expand on it (which I actually do plan on doing, I've always wanted a blog) it will be.

I'd like to add a sorting feature. I'd also probably remove the author section of the posts, but it fits the requirements of the project (one-to-many relationship, admins can create many posts, but each post belongs to one admin).
I could also keep the author feature and add sorting by author to let my friends post as well after I give them an admin role in the DB. A lot would need to change for me to be comfortable hosting this though, but I may.

## STARTUP GUIDE (GRADER LOOK HERE HI!)
1. Unzip everything.
2. cd into client and server on different terminals
3. npm install in both to install dependencies
4. Create a .env in both client and server.
5. In the client .env, paste this or change the port it's fine:
    - VITE_BACKEND_URL=http://localhost:8080

6. In the server .env, paste this:
    - PORT=8080
    - JWT_SECRET=whatever
    - MONGO_URI=mongodb://localhost:27017/
    - DB_NAME=HoleDB

For the PORT, do whatever PORT you used with VITE_BACKEND_URL (technically, VITE is doing what you do here, but regardless).

For JWT_SECRET, put whatever (as in anything you want that works); it doesn't matter, I just used the word whatever. You can generate one if you'd like. I had one for a bit, then lost it and did this.

For MONGO_URI, that is probably what you need to put. Check connection info on your connection and use that though. You set it.

For DB_NAME, make it whatever the name of the DB you end up using. I used HoleDB


7. Open MongoDB Compass, create a Connection, in it create a database, name it whatever (HoleDB if following exactly).
8. Create a collection named posts and a collection named users
9. In server, type npm run server.
10. In client, type npm run dev
11. Ctrl+M1 the link, sign up, hit register, go to users in MongoDB, and set "admin" to true. I don't have any built-in admin making features, and I imagine this is easiest for everyone.
12. You can now make another account, then login with one or the other to test the average user vs the admin.

### The one-to-many relationship is that admins can create many posts, but each post belongs to one admin. This shows up in the database for each post, I could use this to sort by author name, but I didn't for now.
