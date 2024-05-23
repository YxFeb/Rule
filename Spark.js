const responseHandler = {};
const responseBody = typeof $response !== "undefined" && $response.body ? JSON.parse($response.body) : null;

if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  responseHandler.headers = $request.headers;
} else if (responseBody && responseBody.subscriber) {
  const { subscriber } = responseBody;
  subscriber.subscriptions = subscriber.subscriptions || {};
  subscriber.entitlements = subscriber.entitlements || {};

  const subscriptionData = {
    "expires_date": "2029-12-31T00:00:00Z",
    "original_purchase_date": "2022-11-18T03:57:16Z",
    "purchase_date": "2022-11-18T04:00:12Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };

  subscriber.subscriptions["spark_5999_1y_1w0"] = subscriptionData;
  subscriber.entitlements["premium"] = { ...subscriptionData, product_identifier: "spark_5999_1y_1w0" };

  responseHandler.body = JSON.stringify(responseBody);
}

$done(responseHandler);