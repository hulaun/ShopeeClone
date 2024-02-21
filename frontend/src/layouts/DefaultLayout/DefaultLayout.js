import SettingsHeader from "../components/Header/SettingsHeader";
import DefaultHeader from "../components/Header/DefaultHeader";
import Footer from "../components/Footer";

function DefaultLayout({ children }) {
  return (
    <>
      <SettingsHeader />
      <DefaultHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
