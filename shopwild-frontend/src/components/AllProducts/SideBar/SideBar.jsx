import { useData } from "../../../context/data-context";
import { useFilter } from "../../../context/filter-context";

const SideBar = (props) => {
  const { state } = useData();
  const { state: filterState, dispatch } = useFilter();

  const sortHandler = (e) => {
    dispatch({ type: "SORT", payload: e.target.value });
  };

  return (
    <div style={{ display: props.open ? "block" : "none" }}>
      <nav className="side-bar">{props.children}</nav>
    </div>
  );
};

export default SideBar;
