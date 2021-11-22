import "./FooterStyles.scss";

export default function Footer() {
  return (
    <footer className="footer d-flex align-items-center mt-auto">
      <span>
        © {new Date().getFullYear()} Copyright Test Website. Allright reverved.
      </span>
    </footer>
  );
}
