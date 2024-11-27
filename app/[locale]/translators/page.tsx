"use client";

import { groupBy } from "@acdh-oeaw/lib";
import type { MenuItem } from "instantsearch.js/es/connectors/menu/connectMenu";
import { useTranslations } from "next-intl";
import { useMenu } from "react-instantsearch";

import { InstantSearch } from "@/components/instantsearch";
import { MainContent } from "@/components/main-content";
import { SingleRefinementDropdown } from "@/components/single-refinement-dropdown";
import { TranslatorLink } from "@/components/translator-link";

function TranslatorsList() {
	const { items } = useMenu({
		attribute: "contains.translators.name",
		limit: 1000,
		sortBy: ["name"],
	});

	const groups = groupBy<MenuItem, string>(items, (item: MenuItem) => {
		return item.label[0]!.normalize("NFD").replace(/\p{Diacritic}/gu, "");
	});
	return (
		<div>
			{Object.keys(groups).map((key) => {
				return (
					<>
						<div key={key} className="mt-6 text-4xl font-medium">
							{key}
						</div>
						<div className="columns-4">
							{groups[key]!.map((item: MenuItem, i: number) => {
								return (
									<div key={i}>
										<TranslatorLink translatorName={item.label} />
									</div>
								);
							})}
						</div>
					</>
				);
			})}
		</div>
	);
}

export default function TranslatorsPage() {
	const t = useTranslations("TranslatorsPage");
	return (
		<MainContent className="mx-auto w-screen max-w-screen-lg p-6">
			<InstantSearch queryArgsToMenuFields={{ language: "language" }}>
				<div className="float-right w-60">
					<SingleRefinementDropdown allLabel={t("all languages")} attribute={"language"} />
				</div>
				<TranslatorsList />
			</InstantSearch>
		</MainContent>
	);
}