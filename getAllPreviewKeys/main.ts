require("dotenv").config({});

import { createClient } from "contentful-management";

const main = async () => {
  const client = createClient({ accessToken: process.env.ACCESS_TOKEN });
  const space = await client.getSpace(process.env.YOUR_SPACE_ID);

  const { items } = await space.getPreviewApiKeys();

  const previewApiKey = items[0];
  console.log(previewApiKey);

  // Is not allow us to use it, but we see in runtime another interface
  // @ts-ignore
  console.log(previewApiKey.accessToken);
};

main();
