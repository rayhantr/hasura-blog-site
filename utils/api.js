import { nhostReq } from "./nhost";

export const GET_CATEGORIES = async () =>
  await nhostReq({
    query: `
      query categoryList {
        payload: categories {
          name
          sub_categories {
            name
          }
        }
      }
    `,
  });

export const GET_SUB_CATEGORIES = async (variables) =>
  await nhostReq({
    query: `
      query getFilteredSubCategory($categoryName: String!) {
        payload: sub_category(where: { category_name: { _eq: $categoryName } }) {
          name
        }
      }
    `,
    variables,
  });

export const CREATE_NEW_ARTICLE = async (variables) =>
  await nhostReq({
    query: `
      mutation postArticle($title: String!, $content: String!, $sub_category_name: String!) {
        payload: insert_articles_one(object: { title: $title, content: $content, sub_category_name: $sub_category_name }) {
          id
          title
          content
          sub_category {
            category_name
          }
          sub_category_name
          updated_at
        }
      }
    `,
    variables,
  });

export const GET_HOME_ARTICLES = async () =>
  await nhostReq({
    query: `
      query getArticlesForHome {
        payload: articles(order_by: { created_at: desc }) {
          id
          title
          sub_category {
            category_name
            name
          }
          user {
            displayName
          }
          updated_at
        }
      }
    `,
  });

export const GET_ARTICLE_BY_ID = async (variables) =>
  await nhostReq({
    query: `
      query getArticleById($articleId: uuid!) {
        payload: articles_by_pk(id: $articleId) {
          title
          content
          updated_at
          user {
            displayName
          }
          sub_category {
            category_name
            name
          }
        }
      }
    `,
    variables,
  });

export const GET_FILTERED_ARTICLES_BY_CATEGORY = async (variables) =>
  await nhostReq({
    query: `
      query filteredArticles($categoryName: String!) {
        payload: articles(order_by: { created_at: desc }, where: { sub_category: { category: { name: { _eq: $categoryName } } } }) {
          id
          title
          sub_category {
            category_name
            name
          }
          user {
            displayName
          }
          updated_at
        }
      }
    `,
    variables,
  });

export const GET_FILTERED_ARTICLES_BY_SUBCATEGORY = async (variables) =>
  await nhostReq({
    query: `
      query filteredArticles($subCategoryName: String!) {
        payload: articles(where: { sub_category_name: { _eq: $subCategoryName } }, order_by: { created_at: desc }) {
          id
          title
          sub_category {
            category_name
            name
          }
          user {
            displayName
          }
          updated_at
        }
      }
    `,
    variables,
  });

export const GET_FILTERED_ARTICLES_BY_USER = async (variables) =>
  await nhostReq({
    query: `
      query userArticles($id: uuid!) {
        payload: user(id: $id) {
          articles {
            id
            title
            updated_at
            sub_category {
              category_name
              name
            }
          }
        }
      }
    `,
    variables,
  });
