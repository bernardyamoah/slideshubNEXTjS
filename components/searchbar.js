import { connectSearchBox } from "react-instantsearch-dom";
import { Input } from "./ui/input";

function SearchBar({ currentRefinement, isSearchStalled, refine }) {
	return (
		<form noValidate action="" role="search">
			<Input
				value={currentRefinement}
				onChange={(event) => refine(event.currentTarget.value)}
				placeholder="Search any term"
		className="max-w-xl text-center rounded-full text-muted-foreground"
				title="Search bar"
				type="search"
			/>
		</form>
	);
}

export default connectSearchBox(SearchBar);
