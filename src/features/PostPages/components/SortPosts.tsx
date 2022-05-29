import { Dispatch } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";

const SortPosts = ({
  setSortingMethod,
  sortingMethod,
}: {
  setSortingMethod: Dispatch<React.SetStateAction<string>>;
  sortingMethod: string;
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSortingMethod(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Sort By</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={sortingMethod}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value="Latest">Latest</MenuItem>
        <MenuItem value="Trending">Trending</MenuItem>
      </Select>
    </FormControl>
  );
};

export { SortPosts };
