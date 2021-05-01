# 1 - Assignment

1. Create a repository on Github for the task.
2. Create an Express.js app that accomplishes the following:
	- a. Connects to the iTunes Search API: https://tinyurl.com/itunes-search-api
	- b. Pulls back a list of albums for a specified artist
	- c. Filters the results so there are no duplicate albums (based on album name)
	- d. Serves the filtered results to the front-end via a route
3. Create a Vue.js app that accomplishes the following:
	- a. Makes an API request to the above route to fetch the albums
	- b. Displays the albums (as thumbnail &amp; title) in a grid
	- c. Has a live search box to filter (on client-side) the currently displayed albums
4. Create unit tests as appropriate, with the testing framework of your choice.

### Installation with Docker
Make sure you have Docker and docker compose installed on your pc.

```bash
$ docker-compose build
```

### Running the app

```bash
$ docker-compose up
```
```bash
# development
make sure switch to Dockerfile.dev

# production mode
$ make sure switch to Dockerfile
```

### Tests
```bash
# i-tunes-service
$ npm run test

# i-tunes-client
$ npm run test:unit
$ npm run test:e2e
```

### Description
After running the app, next services will be available for use:
- i-tunes-client is available under http://localhost:80
- i-tunes-service is available under http://localhost:3000, you can find API documentation under
http://localhost:3000/swagger

# 2 - Assignment

Analyse the function below and provide answers to the following questions:
(pls find answers below each question)
- What do you think is wrong with the code, if anything?
  ***if it's an express middleware  as written in assignment, there should be a next() function, otherwise it wouldn't passes control to the next matching route***
- Can you see any potential problems that could lead to exceptions
  ***- in case that Shop is not found you probably want to rollback User changes***
  ***- in case that indexOf return 0, then "if" statement is meanless and wrong, aslo probably if invatation already exists into shop invitations you don't want to push duplicated one...***
  ***- no success save validation made here for Shop entity***
- How would you refactor this code to:
    - Make it easier to read
      ***use async/await instead of callbacks***
    - Increase code reusability
      ***resuce repeatable functions like "search" which was made with indexOf functions***
    - Improve the stability of the system
      ***revise your bussness logic so no data is lost or worngly updated or use transactions and rollbacks***
    - Improve the testability of the code
      ***decouple logic to the different functions, so it would be easy to test them separately***
- How might you use the latest JavaScript features to refactor the code?
  ***use linting, formatting and force unit testing on commit (with husky for example)***

### Sample refactor with changes and improvements:

```bash

/* let's assume it's not a middlware, but end service
we gonna revise logic instead of using transactions and rollbacks
so it will promise us not to lose or update unecessary data */
exports.inviteUser = async function (req, res) {
  const invitationBody = req.body;
  const shopId = req.params.shopId;
  const authUrl = "https://url.to.auth.system.com/invitation";

  try {
    const invitation = await sendInvitation(invitationBody);
    if (invitation) {
      const shop = await findShop(shopId);
      if (shop) {
        const user = await updateUser(
          invitationBody.email,
          invitation.body.authId
        );
        if (user) {
            const invitationId = invitation.body.invitationId;
            const userId = user._id;
            const shopInvite = findItem(invitationId, shop.invitations);
            const shopUser = findItem(user._id, shop.users);
            if (!shopInvite && !shopUser) {
                shop.invitations.push(invitationId);
                shop.users.push(userId);
                await updateShop(shop);
            }
        }
      }
    }
  } catch (error) {
    // log error and send response
    res.status(error.status).send(error.msg);
  }
};

// sending http request to get invitation
async function sendInvitation(body) {
  try {
    const invitation = await superagent.post(authUrl).send(body);
    const { status } = invitation;
    // you probably want to keep status factory instead of if/else
    if (status === StatusEnum.FOUND) {
      return invitation;
    } else if (status === StatusEnum.EXISTS) {
      throw new Error({
        msg: "User already invited to this shop",
        status: 400,
      });
    }
  } catch (error) {
    throw new Error({ msg: "Error while sending invitation", status: 500 });
  }
}

// query shop entity from db
function findShop(shopId) {
  try {
    return Shop.findById(shopId).exec();
  } catch (error) {
    throw new Error({ msg: "Shop not found", status: 500 });
  }
}

// update mongoose entity with save()
function updateShop(entity) {
    try {
      return entity.save();
    } catch (error) {
      throw new Error({ msg: "Shop not saved", status: 500 });
    }
  }

//update user entity
function updateUser(email, authId) {
  try {
    return User.findOneAndUpdate(
      {
        authId,
      },
      {
        authId,
        email,
      },
      {
        upsert: true,
        new: true,
      }
    );
  } catch (error) {
    throw new Error({ msg: "User update error", status: 500 });
  }
}

// simple find in array of items
function findItem(id, list) {
  return list.find((item) => item === id);
}
```