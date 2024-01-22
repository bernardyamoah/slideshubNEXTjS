"use client";

import {
	FcEngineering,
	FcFilmReel,
	FcMultipleDevices,
	FcMusic,
	FcOldTimeCamera,
	FcSalesPerformance,
	FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { BiMath } from "react-icons/bi";
import { CategoryItem } from "./category-item";
type CategoryType = {
	id: string;
	label: string;
}[];

const Category: CategoryType = [
	{ id: "computer-science", label: "Computer Science" },
	{ id: "engineering", label: "Engineering" },
	{ id: "mathematics", label: "Mathematics" },
	{ id: "biology", label: "Biology" },
	{ id: "physics", label: "Physics" },
	{ id: "chemistry", label: "Chemistry" },
	{ id: "history", label: "History" },
	{ id: "literature", label: "Literature" },
	{ id: "art", label: "Art" },
	{ id: "psychology", label: "Psychology" },
	{ id: "business", label: "Business" },
	{ id: "medicine", label: "Medicine" },
	{ id: "law", label: "Law" },
	{ id: "environmental-science", label: "Environmental Science" },
	{ id: "economics", label: "Economics" },
	{ id: "political-science", label: "Political Science" },
	{ id: "sociology", label: "Sociology" },
	{ id: "philosophy", label: "Philosophy" },
	{ id: "geology", label: "Geology" },
	{ id: "astronomy", label: "Astronomy" },
	{ id: "languages", label: "Languages" },
	{ id: "music", label: "Music" },
	{ id: "education", label: "Education" },
	{ id: "social-work", label: "Social Work" },
	{ id: "nursing", label: "Nursing" },
	{ id: "architecture", label: "Architecture" },
	{ id: "design", label: "Design" },
	{ id: "anthropology", label: "Anthropology" },
	{ id: "public-health", label: "Public Health" },
	{ id: "statistics", label: "Statistics" },
	{ id: "accounting", label: "Accounting" },
	{ id: "marketing", label: "Marketing" },
	{ id: "management", label: "Management" },
	{ id: "chemical-engineering", label: "Chemical Engineering" },
	{ id: "electrical-engineering", label: "Electrical Engineering" },
	{ id: "mechanical-engineering", label: "Mechanical Engineering" },
	{ id: "civil-engineering", label: "Civil Engineering" },
	{ id: "environmental-engineering", label: "Environmental Engineering" },
	{ id: "robotics", label: "Robotics" },
	{ id: "data-science", label: "Data Science" },
	{ id: "graphic-design", label: "Graphic Design" },
	{ id: "environmental-studies", label: "Environmental Studies" },
	{ id: "criminal-justice", label: "Criminal Justice" },
	{ id: "biochemistry", label: "Biochemistry" },
	{ id: "religious-studies", label: "Religious Studies" },
	{ id: "filming", label: "Filming" },
	{ id: "urban-planning", label: "Urban Planning" },
	{ id: "health-sciences", label: "Health Sciences" },
	{ id: "nutrition", label: "Nutrition" },
	{ id: "oceanography", label: "Oceanography" },
	{ id: "fitness", label: "Fitness" },
];

const iconMap: Record<string, IconType> = {
	Music: FcMusic,
	Photography: FcOldTimeCamera,
	Fitness: FcSportsMode,
	Accounting: FcSalesPerformance,
	"Computer Science": FcMultipleDevices,
	Filming: FcFilmReel,
	Engineering: FcEngineering,
	Mathematics: BiMath,
};

export const CategoriesContainer = () => {
	return (
		<div className="flex items-center gap-x-2 overflow-x-auto pb-2">
			{Category.map((item) => (
				<CategoryItem
					key={item.id}
					label={item.label}
					icon={iconMap[item.label]}
					value={item.id}
				/>
			))}
		</div>
	);
};
