import React from 'react';

const Footer = React.memo(() => {
  const year = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>© {year} Stock Portfolio Optimizer. All rights reserved.</p>
    </footer>
  );
});

export default Footer;