const User = require("../models/User");

class UserController {
  show(req, res, next) {
    User.findAll()
      .then((users) => {
        req.users = users; // Save users to request object
        res.redirect("/");
      })
      .catch((error) => {
        // handle error
      });
  }

  store(req, res, next) {
    const user = new User(req.body);
    user
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
}

module.exports = new UserController();

/** app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ Email: email });

    if (user) {
        // User exists, update with username and password
        user.Username = username;
        user.Password = password; // Make sure to hash the password before storing
    } else {
        // Create new user
        user = new User({ Email: email, Username: username, Password: password });
    }

    // Generate a verification token
    const token = crypto.randomBytes(20).toString('hex');

    // Save the verification token
    user.VerificationToken = token;

    await user.save();

    // Send verification email
    const verificationUrl = `http://your-app.com/verify-email?token=${token}`;
    await sendEmail(email, 'Verify your email', `Click the link to verify your email: ${verificationUrl}`);

    res.send('Account created/updated successfully. Please check your email to verify your account.');
});
 */
