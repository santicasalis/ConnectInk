const failurePaymentHandler = async (req, res) => {
  
    res.status(200).redirect("http://localhost:3000/user-dashboard/home");
 
};

module.exports = failurePaymentHandler;
