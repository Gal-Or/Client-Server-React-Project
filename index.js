////////////////////////////////////////////////////////////////////////////////////////
/////                                                                              /////
/////                 GAL OR          ID -> 316083690                              /////
/////                 KORAL NATAF     ID -> 208726257                              /////
/////                                                                              /////
////////////////////////////////////////////////////////////////////////////////////////
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://koralnataf:Koral123@cluster0.81bwx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 9002;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

//-------------------------------------------USER----------------------------------------------------//
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  money: {
    type: Number,
    required: false,
    default: 1000,
  },
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});



//-------------------------------------------SURFACE----------------------------------------------------//
const surfaceSchema = new mongoose.Schema({
  id: Number,
  surfaceType: Number, //0-regular , 1-park , 2-road
  forSale: {
    type: Boolean,
    default: true,
  },
  isConnected: {
    type: Boolean,
    default: false,
  },
  price: Number,
  ownerEmail: String,
});

const Surface = new mongoose.model("Surface", surfaceSchema);

app.post("/getSurfaceById", (req, res) => {
  //console.log("in get by id server");
  const { id } = req.body;
  console.log("id: ", id);
  Surface.findOne({ id: id }, (err, surface) => {
    if (surface) {
      res.json({ message: "found", surface: surface });
    } else {
      res.send({ message: "not found" });
    }
  });
});

app.post("/getAllSurfaces", (req, res) => {
  //console.log("in get all server");
  Surface.find((err, surfaces) => {
    if (surfaces) {
      res.json({ message: "found", surfaces: surfaces });
    } else {
      res.send({ message: "not found" });
    }
  });
});

app.post("/updateSurfaceOwner", (req, res) => {
  
  const { id, ownerEmail } = req.body;
  Surface.updateOne(
    { id: id }, //find the surfece by id
    { $set: { ownerEmail: ownerEmail } }, // update the attribute ownerEmail
    (err, surface) => {
      if (surface) {
        res.json({ message: "update ownerEmail succsess.", surface: surface });
      } else {
        res.send({ message: "ownerEmail not update" });
      }
    }
  );
});

app.post("/updateSurfacePrice", (req, res) => {
  
  const { id, price } = req.body;
  Surface.updateOne(
    { id: id }, //find the surfece by id
    { $set: { price: price } }, // update the attribute price
    (err, surface) => {
      if (surface) {
        res.json({ message: "update price succsess.", surface: surface });
      } else {
        res.send({ message: "price not update" });
      }
    }
  );
});


app.post("/updateSurfaceForSale", (req, res) => {
  //console.log("in update server");
  const { id, forSale } = req.body;
  Surface.updateOne(
    { id: id }, //find the surfece by id
    { $set: { forSale: forSale } }, // update the attribute ownerEmail
    (err, surface) => {
      if (surface) {
        res.json({ message: "update forSale succsess.", surface: surface });
      } else {
        res.send({ message: "forSale not update" });
      }
    }
  );
});

app.post("/updateUserMoney", (req, res) => {
  //console.log("in update server");
  const { email, money } = req.body;
  User.updateOne(
    { email: email }, //find the surfece by id
    { $set: { money: money } }, // update the attribute ownerEmail
    (err, user) => {
      if (user) {
        res.json({ message: "update user money succsess.", user: user });
      } else {
        res.send({ message: "user money not update" });
      }
    }
  );
});



app.post("/updateSurfaceConnection", (req, res) => {
  const { id, isConnected } = req.body;
  Surface.updateOne(
    { id: id }, //find the surfece by id
    { $set: { isConnected: isConnected } }, // update the attribute ownerEmail
    (err, surface) => {
      if (surface) {
        res.json({ message: "update connection succsess.", surface: surface });
      } else {
        res.send({ message: "update connection failed." });
      }
    }
  );
});



function init() {
  let precent = Math.floor(Math.random() * (20 - 10 + 1) + 10); //precent of surfaces that are not for sale (10% - 20%)
  //console.log("precent: " + precent);
  let notForSale = parseInt((precent * 900) / 100); // amount of surface that are not for sale
  //console.log("not for sale: " + notForSale);
  let parks = 2;
  let roads = notForSale - parks;
  //console.log("roads: " + roads);

  for (let i = 0; i < 30 * 30; i++) {
    var isForSale = 1; // default is true
    var type = 0; //default is regular
    if (parks > 0 || roads > 0) {
      isForSale = Math.random() < 0.5;
      if (!isForSale) {
        if (parks > 0) {
          type = 1; // park
          parks--;
        } else {
          type = 2; // road
          roads--;
        }
      }
    }

    const surface = new Surface({
      id: i,
      surfaceType: type,
      forSale: isForSale,
      price: Math.floor(Math.random() * (200 - 15 + 1) + 15),
      ownerEmail: "G&K.ltd@gmail.com", // owner is Gal & Koral.ltd
    });
    surface.save((err) => {
      if (err) {
        console.log(err);
      } else {
        //console.log("success");
      }
    });
  }
}

//init();
