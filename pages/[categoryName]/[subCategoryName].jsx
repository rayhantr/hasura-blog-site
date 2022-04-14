import { useQuery } from "@apollo/client";
import Blog from "@components/Blog";
import ArticleLayout from "@components/Layout/ArticleLayout";
import MainLayout from "@components/Layout/MainLayout";
import { useRouter } from "next/router";
import { GET_FILTERED_ARTICLES_BY_SUBCATEGORY } from "utils/api";

function FilteredCategory() {
	const router = useRouter();
	const { subCategoryName } = router.query;
	const { loading, data } = useQuery(GET_FILTERED_ARTICLES_BY_SUBCATEGORY, {
		variables: { subCategoryName: subCategoryName },
	});

	if (loading) return <p>Loading...</p>;

	return data?.articles.length > 0 ? (
		data.articles.map((item) => {
			const { id, title, sub_category, user, updated_at } = item;

			return <Blog key={id} articleId={id} title={title} user={user.displayName} time={updated_at} category={sub_category.category_name} subCategory={sub_category.name} />;
		})
	) : (
		<p>No articles to show!</p>
	);
}

FilteredCategory.getLayout = (page) => (
	<MainLayout>
		<ArticleLayout>{page}</ArticleLayout>
	</MainLayout>
);

export default FilteredCategory;
