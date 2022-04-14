import { useQuery } from "@apollo/client";
import { Blog } from "@components/Blog";
import ArticleLayout from "@components/Layout/ArticleLayout";
import MainLayout from "@components/Layout/MainLayout";
import { useRouter } from "next/router";
import { GET_FILTERED_ARTICLES_BY_CATEGORY, GET_SUB_CATEGORIES } from "@utils/api";
import Skeleton from "react-loading-skeleton";

function FilteredCategory() {
  const router = useRouter();
  const { categoryName } = router.query;
  const { loading, data } = useQuery(GET_FILTERED_ARTICLES_BY_CATEGORY, {
    variables: { categoryName: categoryName },
  });

  return loading ? (
    <Skeleton className="h-full" containerClassName="block leading-none w-full h-40" inline />
  ) : data?.articles.length > 0 ? (
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
