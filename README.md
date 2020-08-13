Welcome to Steezy Coding Challenge!

The app is deployed here: [https://steezy.vercel.app/classes](https://steezy.vercel.app/classes)

To run it in development: 
1. Clone this repo
2. Copy the `.env.local` file to the root directory
3. Run `npm run dev`
4. View the site at `localhost:3000`

# Architecture
- [Next.js](https://nextjs.org/) is chosen for speed of development and its out-of-the-box features such as code-splitting, static/SSR/Serverless Functions, CSS-in-JS, and dynamic routing capabilites.
- [Firestore](https://firebase.google.com/docs/firestore) is chosen as the database.
- [Algolia](https://www.algolia.com/) handles the search indexing.
- [Auth0](https://auth0.com/) handles the user authorization. Basic user information is also stored here.
- [Cloudinary](https://cloudinary.com/) handles all of the image assets.

# Assumptions
- Paginated data is currently memoized indefinitely after retrieval for the current page session. The cache needs to be invalidated when classes are updated.
- In general, pagination is not a good practice because:
  - Performance: Most database engines do not perform well on offset pagination. 
  - UX: There is rarely a use case where a user needs to jump to a specific number of page. Additionally, if the data changes frequently, the paginated would often be inaccurate.
- Google Cloud Functions need to be written to update Firestore `classes` metadata onWrite (to update number of classes).
- Google Cloud Functions need to be written to sync Algolia index with Firestore.

# API
GET `/api/class`
Retrieve list of classes.

Param:
- `start` One-based index at which to start retrieval
- `count` The number of results to return

GET `/api/class/[id]`
Retrieve a class.

GET `/api/user`
Retrieve the current user object. Create a user if it doesn't exist. 
*This API is auth-protected.*

GET `/api/user/[classes]`
Retrieve classes watched by current user. `[classes]` is a comma-delimited class ids. Max 10 classes for now (due to Firestore limitation). Any ids past the 10th will be excluded.
*This API is auth-protected.*

GET `/api/user/class/[id]`
Set class metadata given a class id for this user. TODO: change to POST

Param:
- `playedSeconds`: Where user left off in seconds.
- `playedFractions`: Where user left off in fractions (0 to 1)
- `totalTimeSpent`: Total time user spent *after* a video has started. It will keep tracking until a user leaves the page.
*This API is auth-protected.*

# TODO
Unfortunately, there are some features I didn't get to implement due to time restrictions. 

Here is the list:
- Search does not currently work for middle-of-the-word query. 
- Need to track percentage of class user actually watched.
- Display progress for all videos in `/classes`
- Lazy-load all images. Use WebP and srcset to optimize for smaller screen.
- TDD
- PropTypes in all React components
