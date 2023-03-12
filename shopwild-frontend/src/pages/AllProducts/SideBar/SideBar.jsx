const SideBar = (props) => {
  return (
    <div style={{ display: props.open ? "block" : "none" }}>
      <nav className="side-bar">{props.children}</nav>
    </div>
  );
};

export default SideBar;
