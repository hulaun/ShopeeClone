import SettingsHeader from "../components/Header/SettingsHeader";
import DefaultHeader from "../components/Header/DefaultHeader";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
  return (
    <>
      <SettingsHeader />
      <DefaultHeader />
      {children}
      <Footer />
    </>
  );
}

export default DefaultLayout;
