import { gql } from '@apollo/client';

export const GET_CHAT_DATA = gql`
    query GetChatData {
        chatData {
            is_enabled
            api_space_id
            cookie_name
        }
    }
`;

export const UPDATE_CHAT_PROFILE = gql`
    mutation UpdateChatProfile(
        $profileId: String!
        $email: String
        $firstname: String
        $lastname: String
    ) {
        updateChatProfile(
            profileId: $profileId
            email: $email
            firstname: $firstname
            lastname: $lastname
        )
    }
`;

export const GET_CUSTOMER = gql`
    query GetCustomerForChat {
        customer {
            id
            email
            firstname
            lastname
        }
    }
`;

export default {
    getChatData: GET_CHAT_DATA,
    getCustomerData: GET_CUSTOMER,
    updateChatProfileMutation: UPDATE_CHAT_PROFILE
};
