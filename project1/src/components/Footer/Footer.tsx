import logo from "../../../public/logo.svg";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="container__full">
        <div className="footer-item">
          <div className="footer-logo">
            <img src={logo} alt="odigo" />
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About </a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Social Media</h4>
            <ul>
              <li>
                <a href="https://wa.me/77076017858">WhatsApp</a>
              </li>
              <li>
                <a href="https://twitter.com/SardorF55170">Twitter</a>
              </li>
              <li>
                <a href="https://www.instagram.com/frkhdv.s/">Instagram</a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCqh4OnyvV77mHedD-yiTfKQ">Youtube</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
