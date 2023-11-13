import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const authenticated = true;
  return (
    <>
      <header className="dark:bg-secondary bg-primary/20 p-2">
        <nav className="flex justify-between w-[92%] mx-auto gap-2">
          <h1 className="bg-gradient font-bold md:text-4xl text-2xl transition hover:translate-x-4 p-1">
            Full-Stack Community
          </h1>
          <div
            className={`md:static ${
              menuOpen
                ? " transition-shadow absolute left-0 top-14 min-h-[50vh] w-60 justify-center"
                : " transition-all hidden"
            } bg-primary/30 md:w-auto md:min-h-fit flex items-center px-5 rounded-md`}
          >
            <ul className=" text-white text-center md:static absolute flex md:flex-row  flex-col gap-8 mx-auto md:justify-between md:gap-5 text-lg font-bold">
              <li >
                <Link to={"/"} className="hover:text-primary">
                  Inicio
                </Link>
                <Separator className="bg-pink-500 w-32"/>
              </li>
              <li>
                <Link to={"/"} className="hover:text-primary" >togle</Link>
                <Separator className="bg-pink-500 w-32"/>

              </li>
              <li>
                <Link to={"/"} className="hover:text-primary">about</Link>
                <Separator className="bg-pink-500 w-32"/>

              </li>
              <li>
                <Link to={"/"} className="hover:text-primary">contact</Link>
                <Separator className="bg-pink-500 w-32"/>

              </li>
            </ul>
          </div>
          <div className="flex items-center gap-5">
            {authenticated ? (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Button variant={"default"}>Login</Button>
            )}
            <div className="md:hidden">
            {menuOpen ? (
              <X
                className="transition-all cursor-pointer"
                color="#d30d5c"
                size={38}
                onClick={() => setMenuOpen(!menuOpen)}
              />
            ) : (
              <AlignJustify
                className="bg-gradient font-bold transition-all cursor-pointer"
                color="#d30d5c"
                size={38}
                onClick={() => setMenuOpen(!menuOpen)}
              />
            )}
            </div>
            
            <ModeToggle />
          </div>
        </nav>
      </header>
      <Separator className="bg-pink-500 w-full"/>

    </>

  );
};

export default Navbar;
