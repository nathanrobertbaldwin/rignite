import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer-container">
      <ul id="footer-list">
        <div className="contributor-container">
          <span>Sebastian Stovall</span>
          <a
            href="https://github.com/SebastianStovall"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/sebastian-stovall-a17a8a211/"
            target="_blank"
            rel="noopener noreferer"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div className="contributor-container">
          <span>Casey O'Neil</span>
          <a
            href="https://github.com/Spoctex/Spoctex"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/casey-o-neil-993b7228a/"
            target="_blank"
            rel="noopener noreferer"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div className="contributor-container">
          <span>James Askelson</span>
          <a
            href="https://jamesaskelson.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/james-askelson-bb4b6928a/"
            target="_blank"
            rel="noopener noreferer"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
        <div className="contributor-container">
          <span>Nathan Baldwin</span>
          <a
            href="https://nathanrobertbaldwin.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-baldwin-48959714"
            target="_blank"
            rel="noopener noreferer"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </ul>
    </footer>
  );
}
