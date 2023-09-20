import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/**
 * @param {string} id
 * @param {React.ReactNode} children
 * @note <i>The id of the element should be unique and present in the DOM</i>
 * @info This is a portal that renders the children in the element with the given id
 * @example
 * <MyPortal id="portal">
 *   <div>Some content</div>
 * </MyPortal>
 */
interface MyPortalProps {
  id: string;
  children: React.ReactNode;
}

const MyPortal: React.FC<MyPortalProps> = ({ children, id }) => {
  const portal = document.getElementById(id);
  const [domReady, setDomReady] = useState<boolean>(false);

  useEffect(() => {
    setDomReady(true);
    console.log("DOM Ready");
  }, []);

  return domReady && portal
    ? ReactDOM.createPortal(children, portal)
    : null;
};

export default MyPortal;
