"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { Switch } from "react-aria-components";
import { SearchBox } from "react-instantsearch";

import { InfiniteScroll } from "./instantsearch/infinitescroll";
import { InstantSearchProvider } from "./instantsearch/instantsearchprovider";
import { PaginatedTable } from "./instantsearch/paginated-table";
import { SingleRefinementDropdown } from "./instantsearch/single-refinement-dropdown";
import { InstantSearchSortBy } from "./instantsearch/sortby";
import { InstantSearchStats } from "./instantsearch/stats";

interface InstantSearchProps {
	queryArgsToMenuFields: Record<string, string>;
	refinementDropdowns?: Record<string, string>;
	children?: ReactNode;
	filters?: string;
}

export function InstantSearchView(props: InstantSearchProps): ReactNode {
	const t = useTranslations("InstantSearch");

	// TODO encode current state in URL
	const [view, setView] = useState<"covers" | "detail">("covers");

	return (
		<InstantSearchProvider
			filters={props.filters}
			queryArgsToMenuFields={props.queryArgsToMenuFields}
		>
			<div className="grid h-full grid-cols-[25%_75%] p-2">
				<div className="relative mr-10 h-full">{props.children}</div>
				<div className="h-full">
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
						<Switch
							isSelected={view === "detail"}
							onChange={(isSelected) => {
								setView(isSelected ? "detail" : "covers");
							}}
						>
							<LayoutGrid size={18} />
							<div className="indicator" />
							<LayoutList size={18} />
							<span className="sr-only">{t("view.table")}</span>
						</Switch>
					</div>
					<div className="relative h-full">
						{view === "covers" ? <InfiniteScroll /> : <PaginatedTable />}
					</div>
				</div>
			</div>
		</InstantSearchProvider>
	);
}
