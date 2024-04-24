import { useContext } from "react"
import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa"
import DataContext from "./context/DataContext";

const Header = ({ title }) => {
  const { width } = useContext(DataContext);
  return (
    <header className='Header'>
      <h1>{title}</h1>
      {width < 768 ? <FaMobileAlt />
        : width < 992 ? <FaTabletAlt />
         : <FaLaptop />}
     
    </header>
  )
}


// it will show the default title when the title is not passed.
Header.defaultProps = {
  title: "Blog Posts"
}

export default Header