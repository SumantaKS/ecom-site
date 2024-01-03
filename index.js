if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const methodOver = require("method-override");
//import express library
const exp = require("express");
//to use the library
const app = exp();
//to encypt password
const crypt = require("bcrypt");

const flash = require("express-flash");
const session = require("express-session");

app.use(exp.json());

//to store users
//not safe storing here
//move to database later
const accounts = [];

//for user authentication
const passport = require("passport");
const initPassport = require("./passport-config");
initPassport(
  passport,
  (email) => {
    return accounts.find((user) => user.email === email);
  },
  (id) => accounts.find((user) => user.id === id)
);
// function initPassport(passport) {
//   const authenticate = async (email, password, done) => {
//     const user = getUser(email);
//     if (user == null) {
//       return done(null, false, { message: "User not found. Sign UP to join" });
//     }
//     try {
//       if (await crypt.compare(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, {
//           message: "Incorrect Password. Please try again!",
//         });
//       }
//     } catch (e) {
//       return done(e);
//     }
//   };
//   passport.use(new localStrategy({ usernameField: "email" }), authenticate);
//   passport.serializeUser((user, done) => {});
//   passport.deserializeUser((id, done) => {});
// }

//static files and middlewares
app.use(exp.static("public"));
app.use("/css", exp.static(__dirname + "public/css"));
app.use("/js", exp.static(__dirname + "public/js"));
app.use("/img", exp.static(__dirname + "public/img"));

app.set("views", "./views");

app.use(methodOver("_method"));
app.use(exp.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view-engine", "ejs");

//localhost port
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is runnnig!");
});

app.get("/", checkAuth, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});
app.get("/products", checkAuth, (req, res) => {
  res.render("products.ejs");
});
app.get("/phone", checkAuth, (req, res) => {
  res.render("phone.ejs", { name: req.user.name });
});
app.get("/console", checkAuth, (req, res) => {
  res.render("console.ejs", { name: req.user.name });
});
app.get("/laptop", checkAuth, (req, res) => {
  res.render("laptop.ejs", { name: req.user.name });
});
app.get("/gamepad", checkAuth, (req, res) => {
  res.render("gamepad.ejs", { name: req.user.name });
});
app.get("/gpu", checkAuth, (req, res) => {
  res.render("gpu.ejs", { name: req.user.name });
});
app.get("/monitor", checkAuth, (req, res) => {
  res.render("monitor.ejs", { name: req.user.name });
});
app.get("/about", checkAuth, (req, res) => {
  res.render("about.ejs", { name: req.user.name });
});
app.get("/contact", checkAuth, (req, res) => {
  res.render("contact.ejs", { name: req.user.name });
});
app.get("/login", checkNotAuth, (req, res) => {
  res.render("login.ejs");
});
app.get("/signup", checkNotAuth, (req, res) => {
  res.render("signup.ejs");
});

app.post(
  "/login",
  checkNotAuth,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/signup", checkNotAuth, async (req, res) => {
  try {
    const cryptPassword = await crypt.hash(req.body.password, 10);
    accounts.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: cryptPassword,
    });
    res.redirect("/login");
  } catch (err) {
    res.send(400);
  }
  console.log(accounts);
});

app.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

//to prevent signingup multiple times
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
// const bodyParser = require("body-parser");

// const morgan = require("morgan");

// const cors = require("cors"); //to sync front and backend
// app.use(cors());
// app.options("*", cors());

// //to hide & secure url of the database
// require("dotenv/config");

// //for connecting to mongodb
//connect is a promise, so we can use then and catch
// const mongodb = require("mongoose");
// mongodb
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "ecom",
//   })
//   .then(console.log("Connection to db is successfull"))
//   .catch((err) => {
//     console.log(err);
//   });

//middleware
// app.use(bodyParser.json());
// app.use(morgan("tiny"));

//routes
// const routerProducts = require("./routes/product");
// const routerUsers = require("./routes/user");
// const routerOrders = require("./routes/order");
// app.use("/products", routerProducts);
// app.use("/users", routerUsers);
// app.use("/orders", routerOrders);

// //to use auth
// const authRoute = require("./routes/authentication");
// //to use routes
// const userRoute = require("./routes/user");
// //to run the server set a port number
// app.listen(process.env.PORT || 5000, () => {
//   console.log("Server is runnnig!");
// });
// //for hiding urls
// dotenv.config();
// //since it is a promise we use then to print on successfull operation and catch to catch any errors
// mongodb
//   .connect(process.env.MONGO_URL)

// //to pass any json files
// expApp.use(exp.json());

// //using end-points through routes
// expApp.use("/api/auth", authRoute);
// expApp.use("/api/users", userRoute);
// console.log("hell");

//importing Products model
// const Product = require("./models/Product");
// console.log("hell");

//implementing stripe payment
const stripe = require("stripe")(process.env.STRIPE_KEY);
//not safe storing here
//move to database later
const products = new Map([
  [1, { price: 59900, name: "Octane ROG 7s" }],
  [2, { price: 49900, name: "Octane Console Pro" }],
  [3, { price: 9900, name: "Octane Gamepad ZR" }],
  [4, { price: 89900, name: "Octane Laptop Predator" }],
  [5, { price: 29900, name: "Octane Monitor 4k" }],
  [6, { price: 39900, name: "Octane GPU RTX4000" }],
]);

app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const product = products.get(item.id);
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER_URL}/`,
      cancel_url: `${process.env.SERVER_URL}/`,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
