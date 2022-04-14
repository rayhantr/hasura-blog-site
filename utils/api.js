import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query categoryList {
    categories {
      name
      sub_categories {
        name
      }
    }
  }
`;

export const GET_SUB_CATEGORIES = gql`
  query getFilteredSubCategory($categoryName: String!) {
    sub_category(where: { category_name: { _eq: $categoryName } }) {
      name
    }
  }
`;

export const CREATE_NEW_ARTICLE = gql`
  mutation postArticle($title: String!, $content: String!, $sub_category_name: String!) {
    insert_articles_one(object: { title: $title, content: $content, sub_category_name: $sub_category_name }) {
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
`;

export const GET_HOME_ARTICLES = gql`
  query getArticlesForHome {
    articles(order_by: { created_at: desc }) {
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
`;

export const GET_ARTICLE_BY_ID = gql`
  query getArticleById($articleId: uuid!) {
    articles_by_pk(id: $articleId) {
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
`;

export const GET_FILTERED_ARTICLES_BY_CATEGORY = gql`
  query filteredArticles($categoryName: String!) {
    articles(order_by: { created_at: desc }, where: { sub_category: { category: { name: { _eq: $categoryName } } } }) {
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
`;

export const GET_FILTERED_ARTICLES_BY_SUBCATEGORY = gql`
  query filteredArticles($subCategoryName: String!) {
    articles(where: { sub_category_name: { _eq: $subCategoryName } }, order_by: { created_at: desc }) {
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
`;

export const GET_FILTERED_ARTICLES_BY_USER = gql`
  query userArticles($id: uuid!) {
    user(id: $id) {
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
`;
