import { Link } from "react-router-dom";
import { Header as IHeader } from "../../types/header";
import Button from "../Button";

const Header: React.FunctionComponent = () => {
  const _headerOptions: IHeader[] = [
    {
      title: "Home",
      key: "home",
      link: "/",
    },
    {
      title: "Pricing",
      key: "pricing",
      link: "/pricing",
    },
    {
      title: "Services",
      key: "services",
      link: "/services",
    },
    {
      title: "Contact Us",
      key: "contact",
      link: "/contact",
    },
  ];

  return (
    <header className="max-w-screen-xl mx-auto max-md:px-4 flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <div className="gradient-bottom relative w-10 h-10 rounded-full shadow-md">
          <span className="w-4 h-4 bg-white rounded-full z-10 absolute top-2 left-2"></span>
          <span className="w-1.5 h-1.5 bg-white rounded-full z-10 absolute top-6 right-3"></span>
        </div>
        <h1 className="text-xl font-semibold">Speaky</h1>
      </div>
      <ul className="text-base flex gap-10 font-medium items-center">
        {_headerOptions?.map((item: IHeader, index: number) => (
          <Link
            key={index + item.key}
            to={item.link}
            className="hover:text-slate-500"
          >
            {item.title}
          </Link>
        ))}
      </ul>
      <Button>Get Started</Button>
    </header>
  );
};

export default Header;
