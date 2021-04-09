import { useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import chatWidgetOperations from '@dotdigital/pwa-studio-chat/lib/talons/ChatWidget/chatWidget.gql';
import BrowserPersistence from "@magento/peregrine/lib/util/simplePersistence";

const storage = new BrowserPersistence();

const wrapUseAccountChip = (original) => {
    return function useAccountChip(props, ...restArgs) {
        console.log("Calling useAccountChip() function!")

        // Run the original, wrapped function
        const { ...defaultReturnData } = original(props, ...restArgs);

        const [{ isSignedIn }] = useUserContext();
        const profileUpdateStatusKey = 'ddg_chat_profile_update_status';

        const {
            getCustomerData,
            updateChatProfileMutation
        } = chatWidgetOperations;

        const { data: customerData } = useQuery(
            getCustomerData,
            {
                skip: !isSignedIn,
                fetchPolicy: 'cache-and-network',
                nextFetchPolicy: 'cache-first'
            }
        );

        const [updateChatProfile] = useMutation(updateChatProfileMutation);

        const updateProfile = useCallback(
            async profileId => {
                try {
                    await updateChatProfile({
                        variables: {
                            profileId: profileId,
                            email: customerData.customer.email,
                            firstname: customerData.customer.firstname,
                            lastname: customerData.customer.lastname
                        }
                    });
                } catch (error) {
                    return;
                }
                saveHasUpdatedProfile(profileUpdateStatusKey, true);
            },
            [customerData, updateChatProfile]
        );

        useEffect(() => {
            if (isSignedIn && customerData) {
                if (!hasUpdatedProfile(profileUpdateStatusKey)) {
                    const profileId = getProfileId();
                    if (profileId) {
                        console.log("updating chat profile id: " + profileId);
                        updateProfile(profileId);
                    }
                }
            } else {
                if (hasUpdatedProfile(profileUpdateStatusKey)) {
                    saveHasUpdatedProfile(profileUpdateStatusKey, false); 
                }
            }
        },
        [customerData]
        );

        return { ...defaultReturnData };
    }
};

export default wrapUseAccountChip;

/* helpers */
export function getProfileId() {
    return storage.getItem('ddg_chat_profile_id');
}

export function saveHasUpdatedProfile(key, value) {
    return storage.setItem(key, value);
}

export function hasUpdatedProfile(key) {
    return storage.getItem(key);
}
