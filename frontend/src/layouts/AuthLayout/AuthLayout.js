import AuthHeader from "../components/Header/AuthHeader";
import Footer from "../components/Footer";

function AuthLayout({ children, headline }) {
  return (
    <>
      <AuthHeader headline={headline} />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default AuthLayout;
