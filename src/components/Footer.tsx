import Image from "next/image";

const Footer = () => {
  return (
    <footer className="p-2 lg:p-4 lg:absolute lg:bottom-0">
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
