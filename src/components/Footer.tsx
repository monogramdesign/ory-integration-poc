import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Configuration, V0alpha2Api, Session, Identity } from "@ory/client";
import { edgeConfig } from "@ory/integrations/next";

const ory = new V0alpha2Api(new Configuration(edgeConfig));

// Returns either the email or the username depending on the user's Identity Schema
const getUserName = (identity: Identity) =>
  identity.traits.email || identity.traits.username;

const Footer = () => {
  return (
    <footer className="absolute bottom-0 text-center p-4">
      <a
        href="https://www.ory.sh/docs/welcome"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <Image src="/ory.png" alt="Vercel Logo" width={100} height={50} />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
