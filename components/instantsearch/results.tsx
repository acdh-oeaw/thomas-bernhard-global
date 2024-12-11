"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, useState } from "react";
import { Switch } from "react-aria-components";
import { SearchBox } from "react-instantsearch";

import { InfiniteScroll } from "./infinitescroll";
import { PaginatedTable } from "./paginated-table";
import { InstantSearchSortBy } from "./sortby";
import { InstantSearchStats } from "./stats";

interface ResultsProps {
	className?: string;
	children?: ReactNode;
}

export function Results(props: ResultsProps): ReactNode {
	const t = useTranslations("InstantSearch");

	// TODO encode current state in URL
	const [view, setView] = useState<"covers" | "detail">("covers");

	return (
		<div className="grid h-full grid-rows-[auto_1fr] overflow-y-auto">
			<div className="mt-1 flex place-content-between items-center">
				<InstantSearchStats />
				<SearchBox placeholder={t("query_placeholder")} />
				<InstantSearchSortBy sortOptions={["year:asc", "year:desc", "title:asc"]} />
				{props.children}
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
			<div className="relative">{view === "covers" ? <InfiniteScroll /> : <PaginatedTable />}</div>
		</div>
	);
}