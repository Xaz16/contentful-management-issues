require("dotenv").config({});

import { createClient } from "contentful-management";
import { CreateUIExtensionProps } from "contentful-management/types";

const main = async () => {
  const client = createClient({ accessToken: process.env.ACCESS_TOKEN });
  const space = await client.getSpace(process.env.YOUR_SPACE_ID);
  const environment = await space.getEnvironment(process.env.YOUR_ENV_ID);
  const extension: CreateUIExtensionProps = {
    name: "test extension",
    fieldTypes: [{ type: "Symbol" }],
    sidebar: false,
    srcdoc: "",
  };
  const extensionId = "anyIdAsYouWish";

  const notWorkingOne = async () => {
    await environment.createUiExtensionWithId(extensionId, extension);
  };
  const workingOne = async () => {
    await environment.createUiExtensionWithId(extensionId, {
      extension,
    } as any);
  };

  try {
    await notWorkingOne();
  } catch (e) {
    console.error("Right interface, but error");
    console.error(e);
  }

  await workingOne();
  console.log("Success!");
};

main();
