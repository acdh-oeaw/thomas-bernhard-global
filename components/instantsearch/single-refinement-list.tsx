"use client";
import type { RefinementListItem } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import { useMenu, type UseMenuProps } from "react-instantsearch";

interface SingleRefinementListProps {
	attribute: string;
	allLabel?: string;
	refinementArgs?: Partial<UseMenuProps>;
	className?: string;
}

const defaultTransformItems = (items: Array<RefinementListItem>) => {
	return items.map((item) => {
		item.label = `${item.label} (${item.count.toString()})`;
		return item;
	});
};

// a refinement list that is alphabetically ordered and only allows filtering for one value
export function SingleRefinementList(props: SingleRefinementListProps) {
	const { items, refine } = useMenu({
		attribute: props.attribute,
		limit: 1000,
		sortBy: ["name"],
		transformItems: defaultTransformItems,
		...props.refinementArgs,
	});

	return (
		<div className="absolute mr-10 grid h-full grid-rows-[auto_1fr] overflow-y-auto">
			{props.allLabel ? (
				<div className="px-2">
					<label
						key="all"
						className={`block text-right focus-within:outline focus-within:outline-2 ${props.className ? props.className : ""}`}
					>
						<input
							checked={items.every((i) => {
								return !i.isRefined;
							})}
							className="sr-only"
							name="refinement"
							onChange={() => {
								refine("");
							}}
							type="radio"
						/>
						<span
							className={`text-xl hover:cursor-pointer ${
								items.every((i) => {
									return !i.isRefined;
								})
									? "font-medium text-[--color-link-active]"
									: "text-[--color-link]"
							}`}
						>
							{props.allLabel}
						</span>
					</label>
				</div>
			) : null}
			<div className="h-full p-2">
				{items.map((item) => {
					return (
						<label
							key={item.label}
							className={`block py-1 text-right leading-tight focus-within:outline focus-within:outline-2 ${props.className ? props.className : ""}`}
						>
							<input
								checked={item.isRefined}
								className="sr-only"
								name="refinement"
								onChange={() => {
									refine(item.value);
								}}
								type="radio"
							/>
							<span
								className={`hover:cursor-pointer ${item.isRefined ? "font-medium text-[--color-link-active]" : "text-[--color-link]"}`}
							>
								{item.label}
							</span>
						</label>
					);
				})}
			</div>
		</div>
	);
}
