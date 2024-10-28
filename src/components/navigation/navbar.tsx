"use client";

import Container from "../container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./userMenu";
import Categories from "./categories";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm text-[#222222]">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};
export default Navbar;
