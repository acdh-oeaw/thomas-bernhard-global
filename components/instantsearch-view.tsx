"use client";

import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { SearchBox } from "react-instantsearch";

import { InstantSearch } from "./instantsearch";
import { InfiniteScroll } from "./instantsearch-infinitescroll";
import { PaginatedTable } from "./instantsearch-paginated-table";
import { InstantSearchSortBy } from "./instantsearch-sortby";
import { InstantSearchStats } from "./instantsearch-stats";
import { SingleRefinementDropdown } from "./single-refinement-dropdown";

interface InstantSearchProps {
	queryArgsToMenuFields: Record<string, string>;
	refinementDropdowns?: Record<string, string>;
	children?: ReactNode;
	filters?: Record<string, string>; // ugly
}

export function InstantSearchView(props: InstantSearchProps): ReactNode {
	const t = useTranslations("InstantSearch");

	// TODO encode current state in URL
	const [view, setView] = useState<"covers" | "table">("covers");

	return (
		<InstantSearch filters={props.filters} queryArgsToMenuFields={props.queryArgsToMenuFields}>
			<div className="grid grid-cols-[25%_75%] p-2">
				<div className="mr-10">{props.children}</div>
				<div>
					<div className="flex place-content-between items-center">
						<InstantSearchStats />
						<SearchBox placeholder={t("query_placeholder")} />
						{props.refinementDropdowns
							? Object.keys(props.refinementDropdowns).map((attribute) => {
									return (
										<SingleRefinementDropdown
											key={attribute}
											allLabel={props.refinementDropdowns![attribute]!}
											attribute={attribute}
										/>
									);
								})
							: null}
						<InstantSearchSortBy sortOptions={["year:asc", "year:desc", "title:asc"]} />
						<label>
							<input
								checked={view === "table"}
								onChange={(e) => {
									setView(e.target.checked ? "table" : "covers");
								}}
								type="checkbox"
							/>{" "}
							<span>{t("view.table")}</span>
						</label>
					</div>
					{view === "covers" ? <InfiniteScroll /> : <PaginatedTable />}
				</div>
			</div>
		</InstantSearch>
	);
}