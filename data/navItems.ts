export interface NavItem {
    label: string;
    path: string;
  }
  
  const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];
  
  export default navItems;
  