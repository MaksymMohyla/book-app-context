import st from './Footer.module.less';

const Footer = () => {
  return (
    <>
      <div className={st.placeholder} />{' '}
      {/* needed bc fixed footer doesn't have height */}
      <footer className={st.footer}>
        <ul className={st.footer__links}>
          <a
            href="https://github.com/MaksymMohyla"
            target="_blank"
            className={st.footer__link}
          >
            <li>GitHub</li>
          </a>

          <a
            href="https://www.linkedin.com/in/maksym-mohyla-781377351/"
            target="_blank"
            className={st.footer__link}
          >
            <li>LinkedIn</li>
          </a>

          <a
            href="https://t.me/MaxVinnytsky"
            target="_blank"
            className={st.footer__link}
          >
            <li>Telegram</li>
          </a>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
