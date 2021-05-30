import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import 'Styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
      <div className="container">
        <Header />
        <main className="content_section" >
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </div>
  )
}

export default Layout;