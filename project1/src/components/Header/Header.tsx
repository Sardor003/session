import { Link } from "react-router-dom";
import logo from "../../../public/logo.svg";

export const Header = () => {
  return (
    <>
      <div className="header">
        <div className="main">
          <div className="container__row">
            <div className="header__logo">
              <a href="#">
                <img src={logo} alt="logo" />
              </a>
            </div>
            <div className="nav__items">
              <ul>
                <li>
                  <Link to="/add">New Recipe</Link>
                </li>
                <li>
                  <a href="https://www.google.com/maps/@43.2339359,76.8869654,3a,75y,14.37h,91.13t/data=!3m7!1e1!3m5!1so2l-O408F1ARwdiN5zHtEQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3Do2l-O408F1ARwdiN5zHtEQ%26cb_client%3Dsearch.revgeo_and_fetch.gps%26w%3D96%26h%3D64%26yaw%3D80.57054%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?hl=ru&entry=ttu">Locations</a>
                </li>
                <li>
                  <a href="#"></a>
                </li>
                <li>
                  <a href="#">Sign in</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <section className="intro">
        <div className="main">
          <div className="title">
            <h1 className="intro__title">
            On my website you can find recipes      
             </h1>
          </div>
        </div>
      </section>
    </>
  );
};
