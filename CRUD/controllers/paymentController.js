const Razorpay = require('razorpay');

const RazorPayConfig = {
    key_id: 'rzp_test_qmhD1HyAJTaQrl',
    key_secret: 'gMRA6QjlM7BhLWjFkwLeAVwI',
}

var instance = new Razorpay(RazorPayConfig);


module.exports = {instance, RazorPayConfig}



// var options = {
//     amount: 50000, // amount in the smallest currency unit
//     currency: "INR",
//     receipt: "order_rcptid_11"
// };

// instance.orders.create(options, function (err, order) {
//     console.log(order);
// });

// API signature
// {razorpayInstance}.{resourceName}.{methodName}(resourceId [, params])

// instance.payments.fetch(paymentId)

// instance.payments.all({
//     from: '2016-08-01',
//     to: '2016-08-20'
// }, (error, response) => {
//     if (error) {
//         // handle error
//     } else {
//         // handle success
//     }
// })



var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
};
instance.orders.create(options, function (err, order) {
    console.log(order);
});