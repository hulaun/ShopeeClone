const db = require("../../config/db");

class customerController {
  async show(req, res, next) {
    try {
      const pool = await db.connect();
      const result = await pool.request().query("SELECT * FROM customer"); // Use the customers table
      const customers = result.recordset;
      res.json({ customers });
    } catch (error) {
      console.log(error);
    }
  }
  async store(req, res, next) {
    console.log(req.body);
  }
  async login(req, res, next) {
    console.log(req.body);
    res.json({ message: "Login successful!" });
  }
}

module.exports = new customerController();

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
