import { useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useEventListener } from '@magento/peregrine/lib/hooks/useEventListener';
import { useUserContext } from "@magento/peregrine/lib/context/user";

import chatWidgetOperations from './chatWidget.gql';
import BrowserPersistence from "@magento/peregrine/lib/util/simplePersistence";

const storage = new BrowserPersistence();

const useChatWidget = () => {

    const [{ currentUser }] = useUserContext();
    const operations = chatWidgetOperations;

    const {
        getChatData,
        updateChatProfileMutation
    } = operations;

    const { data } = useQuery(getChatData);
    const [updateChatProfile] = useMutation(updateChatProfileMutation);

    // check local storage for existing api_space_id
    if (!retrieveChatData()) {
        saveChatData(data);
    }

    const chatData = retrieveChatData();

    useEffect(() => {
        if (chatData && chatData.chatData.is_enabled) {
            const script = document.createElement('script');

            script.dangerouslySetInnerHTML = (
                window._ddgChatConfig = {
                    apiSpace: chatData.chatData.api_space_id,
                    urlBase: 'https://webchat.dotdigital.com'
                },
                (function(d, s, id){
                    var js, cjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = 'https://webchat.dotdigital.com/widget/bootstrap.js';
                    cjs.parentNode.insertBefore(js, cjs);
                }(document, 'script', 'ddg-chat-widget'))
            )

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            }
        }
    }, [chatData]);

    const storageKey = chatData.chatData.cookie_name;

    const updateProfile = useCallback(
        async event => {
            try {
                if (event.data.type !== 'SetWidgetState') {
                    return;
                }
                if (event.data.show === 'hidden') {
                    // user has closed the chat
                    clearProfileId(storageKey);

                } else if (getProfileId(storageKey) == null) {
                    const profile = await window.COMAPI_WIDGET_API.profile.getProfile();
                    saveProfileId(storageKey, profile.id);

                    if (currentUser && currentUser.email) {
                        await updateChatProfile({
                            variables: {
                                profileId: profile.id,
                                email: currentUser.email,
                                firstname: currentUser.firstname,
                                lastname: currentUser.lastname
                            }
                        });
                    }
                }
            } catch {
                return;
            }
        },
        [chatData, updateChatProfile]
    );
    useEventListener(window, 'message', updateProfile);
};

export default useChatWidget;

/* helpers */
export function retrieveChatData() {
    return storage.getItem('chatData');
}

export function saveChatData(data) {
    return storage.setItem('chatData', data);
}

export function saveProfileId(key, id) {
    return storage.setItem(key, id);
}

export function getProfileId(key) {
    return storage.getItem(key);
}

export function clearProfileId(key) {
    return storage.removeItem(key);
}
