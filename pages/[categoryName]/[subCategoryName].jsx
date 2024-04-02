import { Blog } from "@components/Blog";
import ArticleLayout from "@components/Layout/ArticleLayout";
import MainLayout from "@components/Layout/MainLayout";
import { useRouter } from "next/router";
import { GET_FILTERED_ARTICLES_BY_SUBCATEGORY } from "@utils/api";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";

function FilteredCategory() {
  const router = useRouter();
  const { subCategoryName } = router.query;
  const { isLoading: loading, data } = useQuery({
    queryKey: ["articles", subCategoryName],
    queryFn: () => GET_FILTERED_ARTICLES_BY_SUBCATEGORY({ subCategoryName }),
  });

  return loading ? (
    <Skeleton
      className="h-full"
      containerClassName="block leading-none w-full h-40"
      inline
    />
  ) : data?.length > 0 ? (
    data.map((item) => {
      const { id, title, sub_category, user, updated_at } = item;

      return (
        <Blog
          key={id}
          articleId={id}
          title={title}
          user={user.displayName}
          time={updated_at}
          category={sub_category.category_name}
          subCategory={sub_category.name}
        />
      );
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
