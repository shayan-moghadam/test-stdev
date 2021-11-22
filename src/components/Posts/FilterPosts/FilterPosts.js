import { useState } from "react";
import "./FilterPostsStyles.scss";
import SearchBar from "material-ui-search-bar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterPosts({ searchHandler, sortHandler }) {
  // Search
  const [searchValue, setSearchValue] = useState("");

  const searchFunc = () => {
    setSearchValue(searchValue);
    searchHandler(searchValue);
  };

  // Sort
  const [sortValue, setSortValue] = useState("");

  const sortFunc = (event) => {
    setSortValue(event.target.value);
    sortHandler(event.target.value);
  };

  return (
    <div className="col-12 col-sm-12 col-md-12 col-lg-7 py-3 px-3 my-3 d-flex align-items-center justify-content-between">
      {/* Search */}
      <SearchBar
        value={searchValue}
        onChange={(newValue) => setSearchValue(newValue)}
        onRequestSearch={() => searchFunc()}
      />
      {/* Sort */}
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={sortValue}
            onChange={sortFunc}
            label="Sort"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"asc"}>ASC DATE</MenuItem>
            <MenuItem value={"desc"}>DESC DATE</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
