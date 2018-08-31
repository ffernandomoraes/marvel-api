import React from 'react';
import './index.css';

const Layout = (props) => {  
   return (
      <React.Fragment>
         <header>
            <div className="header__content">
               <img src="/images/logos/marvel-logo.jpg" alt="Logo Marvel"/>
            </div>
         </header>

         <div className="marvel">
            <div className="marvel__content">
               {props.children}
            </div>
         </div>
      </React.Fragment>
   );
}

export default Layout;
