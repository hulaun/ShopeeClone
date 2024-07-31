const sql = require("mssql");
const db = require("../../config/db");
const crypto = require("crypto");
class userController {
  async show(req, res, next) {
    try {
      const pool = await db.connect();
      const result = await pool.request().query("SELECT * FROM [User]"); // Use the customers table
      const users = result.recordset;
      res.json({ users });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userController();

/** app.post('/register', async (req, res) => {
    const { email, customername, password } = req.body;

    // Check if customer already exists
    let customer = await customer.findOne({ Email: email });

    if (customer) {
        // customer exists, update with customername and password
        customer.customername = customername;
        customer.Password = password; // Make sure to hash the password before storing
    } else {
        // Create new customer
        customer = new customer({ Email: email, customername: customername, Password: password });
    }

    // Generate a verification token
    const token = crypto.randomBytes(20).toString('hex');

    // Save the verification token
    customer.VerificationToken = token;

    await customer.save();

    // Send verification email
    const verificationUrl = `http://your-app.com/verify-email?token=${token}`;
    await sendEmail(email, 'Verify your email', `Click the link to verify your email: ${verificationUrl}`);

    res.send('Account created/updated successfully. Please check your email to verify your account.');
});
 */

// for example, if a user has 2 accounts first he used username and password, second he used google Oauth authentication. how do i merge them to 1 account
