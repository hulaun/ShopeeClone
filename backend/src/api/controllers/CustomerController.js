const sql = require("mssql");
const db = require("../../config/db");
const crypto = require("crypto");
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
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;
      const phoneNumber = req.body.phoneNumber;

      const pool = await db.connect();

      const salt = crypto.randomBytes(16).toString("hex");
      const passwordHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");

      let column;
      if (/^\d+$/.test(loginKey)) {
        return res
          .status(400)
          .json({ error: "The loginKey field cannot be a phone number." });
      } else if (loginKey.includes("@")) {
        column = "Email";
      } else {
        column = "Username";
      }

      // Check if there is an account with this phone number
      const checkPhoneNumberQuery = `
        SELECT * FROM Customer 
        WHERE PhoneNumber = @PhoneNumber
      `;
      const phoneNumberResult = await pool
        .request()
        .input("PhoneNumber", sql.VarChar(50), phoneNumber)
        .query(checkPhoneNumberQuery);

      if (phoneNumberResult.recordset.length > 0) {
        return res.status(400).json({
          error: "There is already an account with this phone number.",
        });
      }

      const query = `
        INSERT INTO Customer (${column}, Password, Salt, PhoneNumber)
        VALUES (@LoginKey, @PasswordHash, @Salt, @PhoneNumber)
      `;

      await pool
        .request()
        .input("LoginKey", sql.VarChar(255), loginKey)
        .input("PasswordHash", sql.VarChar(255), passwordHash)
        .input("Salt", sql.VarChar(255), salt)
        .input("PhoneNumber", sql.VarChar(50), phoneNumber)
        .query(query);

      res.status(200).json({ status: "success" });
      console.log("User created successfully.");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async signin(req, res, next) {
    try {
      const loginKey = req.body.loginKey;
      const password = req.body.password;

      if (!loginKey || typeof loginKey !== "string") {
        throw new Error(loginKey + "is null " + password);
      }

      const pool = await db.connect();

      let column;
      if (loginKey.indexOf("@") > -1) {
        column = "Email";
      } else if (/^\d+$/.test(loginKey)) {
        column = "PhoneNumber";
      } else {
        column = "Username";
      }

      const query = `
        SELECT * FROM Customer 
        WHERE ${column} = @LoginKey
      `;

      const result = await pool
        .request()
        .input("LoginKey", sql.VarChar(255), loginKey)
        .query(query);

      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        const passwordHash = crypto
          .pbkdf2Sync(password, user.Salt, 1000, 64, "sha512")
          .toString("hex");

        if (passwordHash === user.Password) {
          res.json("User logged in successfully.");
        } else {
          res.json("Invalid password.");
        }
      } else {
        res.json("User not found.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
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

// for example, if a user has 2 accounts first he used username and password, second he used google Oauth authentication. how do i merge them to 1 account
