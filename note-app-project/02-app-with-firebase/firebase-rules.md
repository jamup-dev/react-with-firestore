To understand what is happening, go to
[this link](https://firebase.google.com/docs/rules/basics?authuser=0#content-owner_only_access).

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated content owners access
    match /data/{userId} {
      allow read, update, delete: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
    match /data/{userId}/notes/{noteId} {
    	allow read, update, delete, create: if request.auth.uid == userId;
    }
  }
}
```
