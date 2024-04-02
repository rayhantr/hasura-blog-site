import { Categories } from "@components/Categories";
import Link from "next/link";
import { useRouter } from "next/router";
import { GET_SUB_CATEGORIES } from "@utils/api";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";

function ArticleLayout({ children }) {
  const router = useRouter();
  const { categoryName } = router.query;
  const { subCategoryName } = router.query;
  const { isLoading: loading, data: subCategories } = useQuery({
    queryKey: ["sub-categories", categoryName],
    queryFn: () =>
      GET_SUB_CATEGORIES({ categoryName: categoryName ? categoryName : "" }),
    enabled: !!categoryName,
  });

  return (
    <section className="container mx-auto p-5">
      <Categories />
      {router.asPath !== "/" && (
        <div className="flex gap-2 mt-5 items-center flex-wrap">
          <h2 className="border-r-2 pr-2">
            More from <span className="font-semibold">{categoryName}</span>
          </h2>
          {loading ? (
            <Skeleton
              className="h-full w-20"
              containerClassName="leading-none w-60 h-9 flex gap-2"
              count={3}
              inline
            />
          ) : (
            subCategories?.map((item) => (
              <Link
                key={item.name}
                href={`/${categoryName}/${item.name}`}
                className={`${
                  subCategoryName === item.name
                    ? "bg-violet-200 text-violet-700"
                    : "bg-slate-50 text-slate-700"
                } hover:bg-violet-100 hover:text-violet-500 px-2 py-1 rounded-md transition-colors`}
              >
                {item.name}
              </Link>
            ))
          )}
        </div>
      )}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {children}
      </div>
    </section>
  );
}

export default ArticleLayout;
