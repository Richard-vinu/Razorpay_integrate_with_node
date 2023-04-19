import React from "react";
import { Box, Center, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://www.localhost:4000/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Zysk-Tech",
      description: "integrate of RazorPay",
      image: "https://www.zysk.tech/img/logo.png",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/paymentverification",
      prefill: {
        name: "richard",
        email: "richard@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Box>
      <Stack
        h={"100vh"}
        alignItems="center"
        justifyContent="center"
        direction={["column", "row"]}
      >
        <Card
          amount={5000}
          img={
            "https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"
          }
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={80000}
          img={
            "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRYFQ8KdC7L4KLM38nkLLUtQORS7ZN1kyOsmBaVUZW-tSJA8GE9wqfYlHBcswAs1Oh7xURxA_7D14lZ3kxFQLkMwsxQvvTGQRuA9fHdnKP-NBt4RCEr18Bv1wAISZ6_l2lk8i4&usqp=CAc"
          }
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={17000}
          img={
            "data:image/webp;base64,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"
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Home;
