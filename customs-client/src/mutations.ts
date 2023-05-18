import { gql } from '@apollo/client';

export const getUserByUsernameAndPassword = gql`
  query getUserByUsernameAndPassword($username: String!, $password: String!) {
    getUserByUsernameAndPassword(username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

export const createUserByUsernameAndPassword = gql`
  mutation createUserByUsernameAndPassword($username: String!, $password: String!) {
    createUserByUsernameAndPassword(username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

export const createSensitiveRule = gql`
  mutation createSensitiveRule($input: CreateSensitiveRuleInput!) {
    createSensitiveRule(input: $input) {
      id
      keyword
      replace_word
    }
  }
`;

export const getAllSensitiveRules = gql`
  query getAllSensitiveRules {
    getAllSensitiveRules {
      id
      sensitive_rules_name
      sensitive_rules_detail
      sensitive_rules_content
      sensitive_rules_create_time
    }
  }
`;

export const getAllSensitiveRulesBySensitive_rules_detail = gql`
  query getAllSensitiveRulesBySensitive_rules_detail($sensitive_rules_detail: String!) {
    getAllSensitiveRulesBySensitive_rules_detail(sensitive_rules_detail: $sensitive_rules_detail) {
      id
      sensitive_rules_name
      sensitive_rules_detail
      sensitive_rules_content
      sensitive_rules_create_time
    }
  }
`;

export const deleteSensitiveRuleById = gql`
  mutation deleteSensitiveRuleById($id: Int!) {
    deleteSensitiveRuleById(id: $id) {
      id
      sensitive_rules_name
      sensitive_rules_detail
      sensitive_rules_content
      sensitive_rules_create_time
    }
  }
`;