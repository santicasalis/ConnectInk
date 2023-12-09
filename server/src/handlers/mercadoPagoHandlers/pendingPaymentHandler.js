const pendingPaymentHandler = async (req, res) => {
 
    res.status(202).redirect("http://localhost:3000/user-dashboard/reservas");
  
};

module.exports = pendingPaymentHandler;
